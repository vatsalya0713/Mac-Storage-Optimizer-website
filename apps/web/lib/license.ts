import { Resend } from 'resend'
import { supabaseAdmin } from './supabase'

// Same MSO-XXXX-XXXX-XXXX format as apps/admin/app/keys/actions.ts so keys
// look identical whether generated manually by an admin or by the webhook.
export function generateLicenseKeyString() {
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase()
  return `MSO-${segment()}-${segment()}-${segment()}`
}

export async function createLicenseKey({
  tier,
  maxActivations,
  customerEmail,
  customerName,
  paymentProvider,
  orderId,
}: {
  tier: 'basic' | 'pro' | 'lifetime'
  maxActivations: number
  customerEmail: string
  customerName?: string | null
  paymentProvider: string
  orderId?: string | null
}) {
  const key = generateLicenseKeyString()

  const { error } = await supabaseAdmin.from('license_keys').insert([
    {
      key,
      tier,
      max_activations: maxActivations,
      is_revoked: false,
      customer_email: customerEmail,
      customer_name: customerName ?? null,
      payment_provider: paymentProvider,
      order_id: orderId ?? null,
    },
  ])

  if (error) throw new Error(error.message)
  return key
}

export async function sendLicenseEmail({
  to,
  licenseKey,
}: {
  to: string
  licenseKey: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — skipping license email send')
    return
  }

  const resend = new Resend(apiKey)

  // Falls back to Resend's shared sandbox sender until macdiskcleaner.com is
  // verified in Resend (sending from an unverified custom domain fails) —
  // set RESEND_FROM_EMAIL once the domain's DNS records are added and
  // verified, no code change needed then.
  const from = process.env.RESEND_FROM_EMAIL || 'MacDiskCleaner <onboarding@resend.dev>'

  await resend.emails.send({
    from,
    to,
    subject: 'Your MacDiskCleaner Pro license key',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-size: 20px; color: #1D1D1F; margin-bottom: 8px;">Thanks for going Pro!</h1>
        <p style="font-size: 15px; color: #6E6E73; line-height: 1.6;">Your MacDiskCleaner Pro license key is below. Paste it into MacDiskCleaner &rarr; Settings &rarr; License to activate.</p>
        <div style="background: #F5F5F7; border-radius: 12px; padding: 16px 20px; margin: 20px 0; font-family: monospace; font-size: 18px; font-weight: 600; color: #007AFF; text-align: center; letter-spacing: 0.02em;">
          ${licenseKey}
        </div>
        <p style="font-size: 13px; color: #9A9A9E;">Keep this email — you can always reuse this key on up to your plan's device limit. Reply to this email if you need help.</p>
      </div>
    `,
  })
}
