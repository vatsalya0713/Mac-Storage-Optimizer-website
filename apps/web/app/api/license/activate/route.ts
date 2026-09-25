import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'

// Called by the desktop app when the user pastes a license key and clicks
// Activate. Body: { key: string, machine_id: string, machine_name?: string }
//
// The actual check-then-insert logic runs inside the `activate_license`
// Postgres function (see supabase/schema.sql) rather than here, because
// doing it as separate select/count/insert calls from application code has
// a race condition: two concurrent activation requests for the same key
// could both pass the "under max_activations" check before either had
// written its row, activating a key on more machines than it should allow.
// The Postgres function locks the license row for the transaction so
// concurrent activations for the same key are serialized.
//
// Response shape is dictated by the desktop app's LicenseManager.swift: it
// only parses `valid`/`tier`/`expiresAt`/`reason`, and only when the HTTP
// status is exactly 200 — anything else is shown as a generic server
// error. So every business-logic outcome (invalid key, revoked, activation
// limit) returns 200 with `valid: false` and a `reason` string; only actual
// server failures return a non-200 status.
export async function POST(request: NextRequest) {
  // Keyspace is huge enough that brute-forcing a valid key is impractical,
  // but this still blocks naive scripted guessing from a single source.
  if (!rateLimit(`activate:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.json({ valid: false, reason: 'Too many attempts, try again shortly' })
  }

  const body = await request.json().catch(() => null)
  const key = body?.key as string | undefined
  const machineId = body?.machine_id as string | undefined
  const machineName = (body?.machine_name as string | undefined) ?? null

  if (!key || !machineId) {
    return NextResponse.json({ error: 'key and machine_id are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.rpc('activate_license', {
    p_key: key,
    p_machine_id: machineId,
    p_machine_name: machineName,
  })

  if (error) {
    // PGRST202 = function not found — supabase/schema.sql hasn't been run
    // against this project yet.
    if (error.code === 'PGRST202') {
      console.error('activate_license Postgres function is missing — run supabase/schema.sql')
      return NextResponse.json({ error: 'Server not fully configured' }, { status: 500 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
