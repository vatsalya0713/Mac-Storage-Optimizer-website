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
