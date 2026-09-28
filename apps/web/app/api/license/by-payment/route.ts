import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { boundedString, LIMITS } from '@/lib/validate'

// Polled by the /success page right after checkout. The Dodo webhook that
// creates the license key can land a moment after the browser redirect, so
// this may 404 for the first second or two — the client retries.
export async function GET(request: NextRequest) {
  if (!rateLimit(`by-payment:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ error: 'not_ready' }, { status: 429 })
  }
  const paymentId = boundedString(request.nextUrl.searchParams.get('payment_id'), LIMITS.paymentId)
  if (!paymentId) {
    return NextResponse.json({ error: 'payment_id is required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .select('key')
    .eq('order_id', paymentId)
    .maybeSingle()

  if (error) {
    console.error('by-payment lookup failed:', error.message)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'not_ready' }, { status: 404 })
  }

  return NextResponse.json({ key: data.key })
}
