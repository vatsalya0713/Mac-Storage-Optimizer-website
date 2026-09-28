import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { MACHINE_ID_PATTERN } from '@/lib/checkout'

// The desktop app reports how many bytes of free-tier cleanup this Mac has
// used; the server keeps the highest value ever seen and returns it, so
// deleting the local counter can't reset the 2 GB allowance. Only a machine
// ID (a one-way hash) and a byte count are stored.
export async function POST(request: NextRequest) {
  if (!rateLimit(`usage:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const machineId = typeof body?.machine_id === 'string' ? body.machine_id : ''
  const bytes = Number(body?.bytes)

  if (!MACHINE_ID_PATTERN.test(machineId) || !Number.isFinite(bytes) || bytes < 0 || bytes > 1e13) {
    return NextResponse.json({ error: 'machine_id and bytes are required' }, { status: 400 })
  }
  if (!rateLimit(`usage-machine:${machineId}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const { data, error } = await supabaseAdmin.rpc('record_free_usage', {
    p_machine_id: machineId,
    p_bytes: Math.floor(bytes),
  })

  if (error) {
    // Migration not applied yet, or a transient DB error: the app keeps using
    // its local counters.
    console.error('record_free_usage failed:', error.message)
    return NextResponse.json({ error: 'Usage sync unavailable' }, { status: 503 })
  }

  return NextResponse.json({ bytes: Number(data) })
}
