import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Periodic check-in from the desktop app to confirm a key/machine pair is
// still valid (e.g. hasn't been revoked or deactivated from the admin panel).
// Response shape matches activate/route.ts — see the comment there.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const key = body?.key as string | undefined
  const machineId = body?.machine_id as string | undefined

  if (!key || !machineId) {
    return NextResponse.json({ error: 'key and machine_id are required' }, { status: 400 })
  }

  const { data: license, error: licenseError } = await supabaseAdmin
    .from('license_keys')
    .select('is_revoked, tier, expires_at')
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

  const { data: activation } = await supabaseAdmin
    .from('activations')
    .select('id, is_active')
    .eq('license_key', key)
    .eq('machine_id', machineId)
    .maybeSingle()

  if (!activation?.is_active) {
    return NextResponse.json({ valid: false, reason: 'License revoked or not activated on this machine' })
  }

  await supabaseAdmin
    .from('activations')
    .update({ last_validated: new Date().toISOString() })
    .eq('id', activation.id)

  return NextResponse.json({ valid: true, tier: license.tier, expiresAt: license.expires_at ?? null })
}
