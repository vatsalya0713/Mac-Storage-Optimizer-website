import { Webhooks } from '@dodopayments/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { createLicenseKey, sendLicenseEmail } from '@/lib/license'
import { supabaseAdmin } from '@/lib/supabase'

const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY

// SECURITY: no fallback secret here. A fallback like `|| 'placeholder'`
// would be a real vulnerability once this source is public on GitHub —
// anyone could read the fallback string, sign a forged `payment.succeeded`
// body with it, and get a free license key with no payment at all. If the
// real secret isn't configured, every request is rejected outright instead.
const handler = webhookKey
  ? Webhooks({
      webhookKey,
      onPaymentSucceeded: async (payload) => {
        const { email, name } = payload.data.customer
        const orderId = payload.data.payment_id

        // Idempotency: payment providers retry webhook delivery, and a
        // captured payload could be replayed. Without this check a retry
        // would mint a second free license key for the same payment.
        const { data: existing } = await supabaseAdmin
          .from('license_keys')
          .select('key')
          .eq('order_id', orderId)
          .maybeSingle()

        if (existing) {
          console.log(`Order ${orderId} already has key ${existing.key} — skipping duplicate`)
          return
        }

        const key = await createLicenseKey({
          tier: 'pro',
          maxActivations: 2,
          customerEmail: email,
          customerName: name,
          paymentProvider: 'dodo',
          orderId,
        })

        await sendLicenseEmail({ to: email, licenseKey: key })
      },
    })
  : null

export async function POST(request: NextRequest) {
  if (!handler) {
    console.error('DODO_PAYMENTS_WEBHOOK_KEY is not set — rejecting webhook request')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }
  return handler(request)
}
