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
