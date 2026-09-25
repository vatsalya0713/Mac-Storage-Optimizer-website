import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Called by the desktop app when the user pastes a license key and clicks
// Activate. Body: { key: string, machine_id: string, machine_name?: string }
//
// Response shape is dictated by the desktop app's LicenseManager.swift:
// it only parses `valid`/`tier`/`expiresAt`/`reason`, and only when the
// HTTP status is exactly 200 — anything else is shown as a generic server
// error. So every business-logic outcome (invalid key, revoked, activation
// limit) returns 200 with `valid: false` and a `reason` string; only actual
// server failures return a non-200 status.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const key = body?.key as string | undefined
  const machineId = body?.machine_id as string | undefined
  const machineName = (body?.machine_name as string | undefined) ?? null

  if (!key || !machineId) {
    return NextResponse.json({ error: 'key and machine_id are required' }, { status: 400 })
  }

  const { data: license, error: licenseError } = await supabaseAdmin
    .from('license_keys')
    .select('id, tier, is_revoked, max_activations, expires_at')
    .eq('key', key)
    .maybeSingle()

  if (licenseError) {
    return NextResponse.json({ error: licenseError.message }, { status: 500 })
  }
  if (!license) {
    return NextResponse.json({ valid: false, reason: 'Invalid license key' })
  }
  if (license.is_revoked) {
    return NextResponse.json({ valid: false, reason: 'License has been revoked' })
  }
  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, reason: 'License expired' })
  }

  const success = () =>
    NextResponse.json({ valid: true, tier: license.tier, expiresAt: license.expires_at ?? null })

  // Already activated on this machine? Treat as idempotent success.
  const { data: existing } = await supabaseAdmin
    .from('activations')
    .select('id, is_active')
    .eq('license_key', key)
    .eq('machine_id', machineId)
    .maybeSingle()

  if (existing) {
    const { error: touchError } = await supabaseAdmin
      .from('activations')
      .update({
        is_active: true,
        last_validated: new Date().toISOString(),
        ...(existing.is_active ? {} : { activated_at: new Date().toISOString() }),
      })
      .eq('id', existing.id)
    if (touchError) {
      return NextResponse.json({ error: touchError.message }, { status: 500 })
    }
    return success()
  }

  const { count: activeCount, error: countError } = await supabaseAdmin
    .from('activations')
    .select('*', { count: 'exact', head: true })
    .eq('license_key', key)
    .eq('is_active', true)

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 })
  }

  if ((activeCount ?? 0) >= license.max_activations) {
    return NextResponse.json({ valid: false, reason: 'max_activations reached' })
  }

  const { error: insertError } = await supabaseAdmin.from('activations').insert([
    {
      license_key: key,
      machine_id: machineId,
      machine_name: machineName,
      is_active: true,
    },
  ])

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return success()
}
