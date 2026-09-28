import { Webhooks } from '@dodopayments/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { createLicenseKey, findKeyByOrder, revokeByOrder, sendLicenseEmail } from '@/lib/license'
import { MACHINE_ID_PATTERN } from '@/lib/checkout'

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
        const data = payload.data
        const orderId = data.payment_id
        const email = data.customer?.email
        if (!email) throw new Error(`Payment ${orderId} has no customer email`)

        // Only our Pro product mints a key (guards against other products on
        // the same Dodo account).
        const proProduct = process.env.DODO_PRODUCT_ID_PRO
        const cart = data.product_cart ?? []
        if (proProduct && cart.length > 0 && !cart.some((item) => item.product_id === proProduct)) {
          console.log(`Payment ${orderId} is not for the Pro product — ignoring`)
          return
        }

        // Idempotency: providers retry deliveries, and a captured payload could
        // be replayed. A retry never mints a second key — but it does re-send the
        // email, because the usual reason for a retry is that the first attempt
        // created the key and then failed to send the email.
        const existing = await findKeyByOrder(orderId)
        if (existing) {
          console.log(`Order ${orderId} already has a key — re-sending email only`)
          if (!existing.is_revoked) await sendLicenseEmail({ to: existing.customer_email ?? email, licenseKey: existing.key })
          return
        }

        const rawMachineId = data.metadata?.machine_id
        const claimMachineId =
          typeof rawMachineId === 'string' && MACHINE_ID_PATTERN.test(rawMachineId) ? rawMachineId : null

        const { key, created } = await createLicenseKey({
          tier: 'pro',
          customerEmail: email,
          customerName: data.customer?.name,
          paymentProvider: 'dodo',
          orderId,
          claimMachineId,
        })

        // If this throws, the delivery fails and is retried; the retry above
        // finds the key and sends only the email.
        if (created) await sendLicenseEmail({ to: email, licenseKey: key })
      },

      // A refunded or charged-back payment must stop unlocking Pro.
      onRefundSucceeded: async (payload) => {
        if (payload.data.is_partial) return
        await revokeByOrder(payload.data.payment_id, 'full refund')
      },
      onDisputeOpened: async (payload) => {
        await revokeByOrder(payload.data.payment_id, 'dispute opened')
      },
      onDisputeLost: async (payload) => {
        await revokeByOrder(payload.data.payment_id, 'dispute lost')
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
