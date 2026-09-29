-- MacDiskCleaner — Supabase schema (documentation / version control).
--
-- license_keys and activations are verified against the live project
-- (reqrnjinsjxvyasimzwa.supabase.co) via its PostgREST OpenAPI schema — this
-- file matches reality, not a guess. Both tables were empty (0 rows) at the
-- time of writing. contact_submissions does not exist live yet — run this
-- file once in the Supabase SQL Editor to create it.
--
-- This same project is shared by apps/admin, apps/web, and the Swift
-- desktop app (Mac-Storage-Optimizer, see its own supabase/schema.sql,
-- which this file supersedes as the canonical version going forward).
--
-- Safe to run against the existing project: every statement is
-- `if not exists` / `add column if not exists`, so it won't touch existing
-- data or fail if some of this already exists.

create table if not exists license_keys (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  tier text not null default 'pro' check (tier in ('basic', 'pro', 'lifetime')),
  max_activations int not null default 2,
  expires_at timestamptz, -- null = lifetime
  is_revoked boolean not null default false,
  customer_email text,
  customer_name text,
  order_id text, -- payment provider's order/payment id, used by /api/license/by-payment
  payment_provider text default 'dodo', -- 'dodo' | 'stripe' | 'appstore' | 'manual_admin'
  created_at timestamptz not null default now()
);

create index if not exists license_keys_order_id_idx on license_keys (order_id);

-- One payment can only ever create one key (protects against concurrent
-- webhook deliveries minting duplicates).
create unique index if not exists license_keys_order_id_unique on license_keys (order_id) where order_id is not null;

-- One key = one Mac. Applies the current policy to any existing keys.
update license_keys set max_activations = 1 where max_activations > 1;
alter table license_keys alter column max_activations set default 1;

-- Auto-activation: a purchase started from the desktop app is tagged with that
-- Mac's machine ID so the app can claim its key (POST /api/license/claim).
alter table license_keys
  add column if not exists claim_machine_id text,
  add column if not exists claimed_at timestamptz;
create index if not exists license_keys_claim_machine_idx on license_keys (claim_machine_id);

create table if not exists activations (
  id uuid primary key default gen_random_uuid(),
  license_key text not null references license_keys (key),
  machine_id text not null,
  machine_name text,
  is_active boolean not null default true,
  activated_at timestamptz not null default now(),
  last_validated timestamptz not null default now(),
  unique (license_key, machine_id)
);

-- Contact Us form submissions (apps/web /contact page -> /api/contact).
-- Does not exist live yet as of this writing.
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  category text not null check (category in ('general', 'support', 'bug', 'suggestion')),
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security: every read/write in this codebase goes through the
-- Supabase service-role key on the server (apps/admin, apps/web API routes,
-- and the Swift app's calls to apps/web), which bypasses RLS entirely. RLS
-- is still enabled here as defense in depth — if the anon/public key is
-- ever used by mistake (e.g. in a client component), it should see and
-- change nothing.
alter table license_keys enable row level security;
alter table activations enable row level security;
alter table contact_submissions enable row level security;

drop policy if exists "no public access to license_keys" on license_keys;
create policy "no public access to license_keys" on license_keys
  for all using (false) with check (false);

drop policy if exists "no public access to activations" on activations;
create policy "no public access to activations" on activations
  for all using (false) with check (false);

drop policy if exists "no public access to contact_submissions" on contact_submissions;
create policy "no public access to contact_submissions" on contact_submissions
  for all using (false) with check (false);

-- ============================================================
-- activate_license — atomic activation, race-condition-safe
-- ============================================================
-- app/api/license/activate/route.ts used to do this as separate
-- select-count-then-insert steps. Two activation requests for the same key
-- arriving at the same moment (e.g. someone scripting concurrent requests
-- to burn through a key's device limit, or just an unlucky coincidence)
-- could both pass the "is count < max_activations" check before either had
-- inserted its row, letting a key end up active on MORE machines than
-- max_activations allows.
--
-- `select ... for update` locks the license_keys row for the rest of the
-- transaction, so a second concurrent call for the same key blocks until
-- the first one finishes — the count-then-insert becomes atomic. Different
-- keys don't block each other (different rows, different locks).
create or replace function activate_license(
  p_key text,
  p_machine_id text,
  p_machine_name text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_license license_keys%rowtype;
  v_existing activations%rowtype;
  v_active_count int;
begin
  select * into v_license from license_keys where key = p_key for update;

  if not found then
    return jsonb_build_object('valid', false, 'reason', 'Invalid license key');
  end if;

  if v_license.is_revoked then
    return jsonb_build_object('valid', false, 'reason', 'License has been revoked');
  end if;

  if v_license.expires_at is not null and v_license.expires_at < now() then
    return jsonb_build_object('valid', false, 'reason', 'License expired');
  end if;

  select * into v_existing from activations
    where license_key = p_key and machine_id = p_machine_id;

  if found then
    update activations
      set is_active = true,
          last_validated = now(),
          activated_at = case when not v_existing.is_active then now() else v_existing.activated_at end
      where id = v_existing.id;

    return jsonb_build_object('valid', true, 'tier', v_license.tier, 'expiresAt', v_license.expires_at);
  end if;

  select count(*) into v_active_count from activations
    where license_key = p_key and is_active = true;

  if v_active_count >= v_license.max_activations then
    return jsonb_build_object('valid', false, 'reason', 'max_activations reached');
  end if;

  insert into activations (license_key, machine_id, machine_name, is_active)
  values (p_key, p_machine_id, p_machine_name, true);

  return jsonb_build_object('valid', true, 'tier', v_license.tier, 'expiresAt', v_license.expires_at);
end;
$$;

-- Callable only via the service-role key (server-side), same as every
-- other table here — not exposed to the anon/public role.
revoke all on function activate_license(text, text, text) from public, anon, authenticated;


-- ============================================================
-- Free-tier usage per Mac (stops "delete the local counter to reset the
-- 2 GB free allowance"). The app reports how many bytes it has cleaned;
-- the server keeps the highest value ever seen for that machine.
-- ============================================================
create table if not exists free_usage (
  machine_id text primary key,
  bytes bigint not null default 0,
  updated_at timestamptz not null default now()
);
alter table free_usage enable row level security;
drop policy if exists "no public access to free_usage" on free_usage;
create policy "no public access to free_usage" on free_usage for all using (false) with check (false);

create or replace function record_free_usage(p_machine_id text, p_bytes bigint)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_bytes bigint;
begin
  insert into free_usage (machine_id, bytes) values (p_machine_id, greatest(p_bytes, 0))
  on conflict (machine_id) do update
    set bytes = greatest(free_usage.bytes, excluded.bytes), updated_at = now()
  returning bytes into v_bytes;
  return v_bytes;
end;
$$;
revoke all on function record_free_usage(text, bigint) from public, anon, authenticated;

-- ============================================================
-- Release management: the admin panel edits release notes and can roll the
-- "current" version back without a new app build. The desktop app's updater
-- (from the next app version onward) reads /api/releases/latest, which
-- serves the row marked is_current. Older app versions keep reading the
-- static /downloads/latest.json file, which the release script still writes.
-- ============================================================
create table if not exists app_releases (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  build int,
  released_at date not null default current_date,
  notes jsonb not null default '[]'::jsonb,
  dmg_path text not null,
  sha256 text not null,
  size_bytes bigint not null,
  min_macos text,
  is_current boolean not null default false,
  created_at timestamptz not null default now()
);
create unique index if not exists app_releases_one_current on app_releases (is_current) where is_current;

alter table app_releases enable row level security;
drop policy if exists "no public access to app_releases" on app_releases;
create policy "no public access to app_releases" on app_releases for all using (false) with check (false);


-- ============================================================
-- Download tracking: see supabase/migrations/2026-09-licensing-hardening.sql
-- for the full comment. No raw IP stored — hash + coarse geo only.
-- ============================================================
create table if not exists download_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'dmg',
  version text,
  country text,
  region text,
  city text,
  ip_hash text,
  referrer text
);
create index if not exists download_logs_created_at_idx on download_logs (created_at desc);

alter table download_logs enable row level security;
drop policy if exists "no public access to download_logs" on download_logs;
create policy "no public access to download_logs" on download_logs for all using (false) with check (false);


-- Webhook health (admin panel shows "last webhook received"). Logs every
-- Dodo event regardless of type via onPayload, which the SDK calls before
-- any specific handler — so this insert is wrapped defensively in the route
-- itself and must NEVER throw, or it would block real payment processing.
create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  payment_id text
);
create index if not exists webhook_events_created_at_idx on webhook_events (created_at desc);

alter table webhook_events enable row level security;
drop policy if exists "no public access to webhook_events" on webhook_events;
create policy "no public access to webhook_events" on webhook_events for all using (false) with check (false);

-- Admin login attempts (security visibility — brute-force patterns, etc.)
create table if not exists login_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip text,
  success boolean not null
);
create index if not exists login_attempts_created_at_idx on login_attempts (created_at desc);

alter table login_attempts enable row level security;
drop policy if exists "no public access to login_attempts" on login_attempts;
create policy "no public access to login_attempts" on login_attempts for all using (false) with check (false);
