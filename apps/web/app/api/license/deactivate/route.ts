import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { boundedString, LIMITS } from '@/lib/validate'

// Called by the desktop app when the user deactivates this machine (e.g.
// to free up a seat before activating on a different Mac).
export async function POST(request: NextRequest) {
  if (!rateLimit(`deactivate:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts, try again shortly' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const key = boundedString(body?.key, LIMITS.key)
  const machineId = boundedString(body?.machine_id, LIMITS.machineId)

  if (!key || !machineId) {
    return NextResponse.json({ error: 'key and machine_id are required' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('activations')
    .update({ is_active: false })
    .eq('license_key', key)
    .eq('machine_id', machineId)

  if (error) {
    console.error('deactivate failed:', error.message)
    return NextResponse.json({ error: 'Deactivation is temporarily unavailable' }, { status: 500 })
  }

  return NextResponse.json({ deactivated: true })
}
