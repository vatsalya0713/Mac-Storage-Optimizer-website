import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Called by the desktop app when the user deactivates this machine (e.g.
// to free up a seat before activating on a different Mac).
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const key = body?.key as string | undefined
  const machineId = body?.machine_id as string | undefined

  if (!key || !machineId) {
    return NextResponse.json({ error: 'key and machine_id are required' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('activations')
    .update({ is_active: false })
    .eq('license_key', key)
    .eq('machine_id', machineId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ deactivated: true })
}
