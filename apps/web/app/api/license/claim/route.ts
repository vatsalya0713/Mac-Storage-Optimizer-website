import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { MACHINE_ID_PATTERN } from '@/lib/checkout'

const CLAIMABLE_AGE_MS = 7 * 24 * 3600_000 // a purchase can be claimed for 7 days
const RECLAIM_WINDOW_MS = 30 * 60_000 // ...and re-fetched for 30 min after the first claim (flaky network)

// Called by the desktop app after it opens checkout: "did a purchase tagged
// with my machine ID complete?". Returns { found: true, key } once the Dodo
// webhook has minted the key, so the app can activate itself with no copy/paste.
// The emailed key always remains the fallback.
export async function POST(request: NextRequest) {
  if (!rateLimit(`claim:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ found: false, reason: 'Too many attempts, try again shortly' })
  }

  const body = await request.json().catch(() => null)
  const machineId = body?.machine_id as string | undefined
  if (!machineId || !MACHINE_ID_PATTERN.test(machineId)) {
    return NextResponse.json({ error: 'A valid machine_id is required' }, { status: 400 })
  }
  if (!rateLimit(`claim-machine:${machineId}`, 40, 60_000)) {
    return NextResponse.json({ found: false })
  }

  const since = new Date(Date.now() - CLAIMABLE_AGE_MS).toISOString()
  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .select('id, key, claimed_at')
    .eq('claim_machine_id', machineId)
    .eq('is_revoked', false)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // Migration not applied yet (column missing) or transient DB error: report
  // "nothing to claim" so the app quietly falls back to the emailed key.
  if (error || !data) {
    if (error) console.error('license claim lookup failed:', error.message)
    return NextResponse.json({ found: false })
  }

  if (data.claimed_at) {
    if (Date.now() - new Date(data.claimed_at).getTime() > RECLAIM_WINDOW_MS) {
      return NextResponse.json({ found: false })
    }
  } else {
    await supabaseAdmin
      .from('license_keys')
      .update({ claimed_at: new Date().toISOString() })
      .eq('id', data.id)
      .is('claimed_at', null)
  }

  return NextResponse.json({ found: true, key: data.key })
}
