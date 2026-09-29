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
