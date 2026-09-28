import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, MACHINE_ID_PATTERN } from '@/lib/checkout'
import { rateLimit, clientIp } from '@/lib/rateLimit'

// Plain HTML form POST from the Pricing button (no JS required) — we create
// the Dodo Payments checkout session server-side and 303-redirect the
// browser straight to Dodo's hosted checkout page.
export async function POST(request: NextRequest) {
  if (!rateLimit(`checkout:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts, try again shortly' }, { status: 429 })
  }
  const result = await createCheckoutSession({ origin: request.nextUrl.origin })
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
  return NextResponse.redirect(result.url, { status: 303 })
}

// Opened by the desktop app in the user's browser: /api/checkout?mid=<machine id>.
// The machine ID is attached to the checkout so the app can pick up its key
// automatically after payment. Failures land on the pricing page rather than
// showing raw JSON to a customer.
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin
  if (!rateLimit(`checkout:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.redirect(`${origin}/pricing`, { status: 303 })
  }

  const mid = request.nextUrl.searchParams.get('mid')
  const machineId = mid && MACHINE_ID_PATTERN.test(mid) ? mid : null

  const result = await createCheckoutSession({ origin, machineId })
  if (!result.ok) return NextResponse.redirect(`${origin}/pricing`, { status: 303 })
  return NextResponse.redirect(result.url, { status: 303 })
}
