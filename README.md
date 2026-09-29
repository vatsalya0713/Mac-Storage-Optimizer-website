# MacDiskCleaner — website, license/payment API, admin panel

- `apps/web` — marketing site (macdiskcleaner.com) + the license/payment API
  the desktop app talks to (`/api/license/*`, `/api/checkout`, `/api/webhook/dodo-payments`,
  `/api/usage`, `/api/releases/latest`, `/api/download`).
- `apps/admin` — internal admin panel (license keys, activations, sales, support, **app releases**).
- `supabase/` — canonical schema (`schema.sql`) + one-time migrations (`migrations/`).

**For the full picture — how this repo, the desktop app repo, licensing,
the self-updater and Supabase all fit together — read
[`../Mac-Storage-Optimizer/SYSTEM.md`](../Mac-Storage-Optimizer/SYSTEM.md)
first.** This README only orients you inside this specific repo.

## Local dev

Each app has its own `.env.example` — copy to `.env.local`, fill in Supabase
service-role key, Dodo Payments keys, Resend key, and `LICENSE_SIGNING_KEY`
(generate with `node apps/web/scripts/generate-license-keypair.mjs`; the
matching public key must also be updated in the Swift app).

```bash
cd apps/web && npm run dev     # :3000
cd apps/admin && npm run dev   # separate port, set in package.json
```

## Database

Run `supabase/schema.sql` once against a fresh project. After that, run any
new files added to `supabase/migrations/` in date order — they're all
idempotent (safe to re-run), and several app/website features degrade
gracefully (not crash) if a migration hasn't landed yet, but stay inactive
until it has.
