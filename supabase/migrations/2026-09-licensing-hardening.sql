-- Run once in the Supabase SQL editor (safe to re-run).
-- 1) auto-activation after in-app purchase
alter table license_keys
  add column if not exists claim_machine_id text,
  add column if not exists claimed_at timestamptz;
create index if not exists license_keys_claim_machine_idx on license_keys (claim_machine_id);

-- 2) one payment can only ever create one key
create unique index if not exists license_keys_order_id_unique on license_keys (order_id) where order_id is not null;

-- 3) one key = one Mac
update license_keys set max_activations = 1 where max_activations > 1;
alter table license_keys alter column max_activations set default 1;

-- 4) free-tier usage per Mac (stops resetting the 2 GB allowance by wiping local data)
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


-- Release management (admin-editable release notes / rollback; see schema.sql
-- for the full comment). Safe to run even if already applied.
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


-- Download tracking (admin panel "Downloads" page). No raw IP is stored —
-- only a one-way hash (for rough distinct-visitor counting) plus coarse
-- geo (country/region/city) read from Vercel's edge request headers.
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
