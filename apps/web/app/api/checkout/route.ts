import { NextRequest, NextResponse } from 'next/server'

// Plain HTML form POST from the Pricing button (no JS required) — we create
// the Dodo Payments checkout session server-side and 303-redirect the
// browser straight to Dodo's hosted checkout page.
export async function POST(request: NextRequest) {
  const productId = process.env.DODO_PRODUCT_ID_PRO
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live' : 'test'
  const baseUrl = environment === 'live' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com'

  if (!productId || !apiKey) {
    return NextResponse.json(
      { error: 'Dodo Payments is not configured (missing DODO_PRODUCT_ID_PRO or DODO_PAYMENTS_API_KEY)' },
      { status: 500 }
    )
  }

  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL || `${request.nextUrl.origin}/success`

  const dodoResponse = await fetch(`${baseUrl}/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: returnUrl,
    }),
  })

  if (!dodoResponse.ok) {
    const text = await dodoResponse.text()
    console.error('Dodo Payments checkout session creation failed:', dodoResponse.status, text)
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 502 })
  }

  const { checkout_url } = (await dodoResponse.json()) as { checkout_url: string }

  return NextResponse.redirect(checkout_url, { status: 303 })
}
