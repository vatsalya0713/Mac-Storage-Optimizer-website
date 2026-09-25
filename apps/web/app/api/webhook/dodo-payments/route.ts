import { Webhooks } from '@dodopayments/nextjs'
import { createLicenseKey, sendLicenseEmail } from '@/lib/license'

// Falls back to a placeholder so builds don't fail before the real webhook
// key is configured (same pattern as apps/admin/lib/supabase.ts) — requests
// will simply fail signature verification until DODO_PAYMENTS_WEBHOOK_KEY is
// set for real.
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY || 'placeholder',
  onPaymentSucceeded: async (payload) => {
    const { email, name } = payload.data.customer

    const key = await createLicenseKey({
      tier: 'pro',
      maxActivations: 2,
      customerEmail: email,
      customerName: name,
      paymentProvider: 'dodo',
      orderId: payload.data.payment_id,
    })

    await sendLicenseEmail({ to: email, licenseKey: key })
  },
})
