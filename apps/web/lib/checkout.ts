// Shared Dodo Payments checkout-session creation, used by the pricing-page
// form (POST) and the desktop app's direct link (GET ?mid=...).

export const MACHINE_ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; status: number; error: string }

export async function createCheckoutSession({
  origin,
  machineId,
}: {
  origin: string
  machineId?: string | null
}): Promise<CheckoutResult> {
  const productId = process.env.DODO_PRODUCT_ID_PRO
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live' : 'test'
  const baseUrl = environment === 'live' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com'

  if (!productId || !apiKey) {
    return {
      ok: false,
      status: 500,
      error: 'Dodo Payments is not configured (missing DODO_PRODUCT_ID_PRO or DODO_PAYMENTS_API_KEY)',
    }
  }

  const validMachineId = machineId && MACHINE_ID_PATTERN.test(machineId) ? machineId : null

  const baseReturn = process.env.DODO_PAYMENTS_RETURN_URL || `${origin}/success`
  const returnUrl = validMachineId
    ? `${baseReturn}${baseReturn.includes('?') ? '&' : '?'}from=app`
    : baseReturn

  const body: Record<string, unknown> = {
    product_cart: [{ product_id: productId, quantity: 1 }],
    return_url: returnUrl,
    cancel_url: `${origin}/pricing`,
  }
  // Rides along to the payment.succeeded webhook so the purchase can be
  // matched back to the Mac that started it (auto-activation).
  if (validMachineId) body.metadata = { machine_id: validMachineId }

  const response = await fetch(`${baseUrl}/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('Dodo Payments checkout session creation failed:', response.status, text)
    return { ok: false, status: 502, error: 'Could not start checkout' }
  }

  const { checkout_url } = (await response.json()) as { checkout_url: string }
  return { ok: true, url: checkout_url }
}
