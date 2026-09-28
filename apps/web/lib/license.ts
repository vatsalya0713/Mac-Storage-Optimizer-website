import { randomInt } from 'node:crypto'
import { Resend } from 'resend'
import { supabaseAdmin } from './supabase'

// One key = one Mac. A key can be moved by deactivating it on the old Mac.
export const MAX_ACTIVATIONS = 1

// Unambiguous alphabet (no 0/O, 1/I/L) so keys are easy to read and type.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

// MSO-XXXX-XXXX-XXXX from a cryptographic RNG (Math.random is predictable).
export function generateLicenseKeyString() {
  const segment = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('')
  return `MSO-${segment()}-${segment()}-${segment()}`
}

export async function findKeyByOrder(orderId: string) {
  const { data } = await supabaseAdmin
    .from('license_keys')
    .select('key, customer_email, is_revoked')
    .eq('order_id', orderId)
    .maybeSingle()
  return data
}

export async function createLicenseKey({
  tier,
  maxActivations = MAX_ACTIVATIONS,
  customerEmail,
  customerName,
  paymentProvider,
  orderId,
  claimMachineId,
}: {
  tier: 'basic' | 'pro' | 'lifetime'
  maxActivations?: number
  customerEmail: string
  customerName?: string | null
  paymentProvider: string
  orderId?: string | null
  /** Machine that started checkout in the app; lets the app auto-claim the key. */
  claimMachineId?: string | null
}): Promise<{ key: string; created: boolean }> {
  const key = generateLicenseKeyString()

  const row: Record<string, unknown> = {
    key,
    tier,
    max_activations: maxActivations,
    is_revoked: false,
    customer_email: customerEmail,
    customer_name: customerName ?? null,
    payment_provider: paymentProvider,
    order_id: orderId ?? null,
  }
  if (claimMachineId) row.claim_machine_id = claimMachineId

  let { error } = await supabaseAdmin.from('license_keys').insert([row])

  // The claim columns come from a SQL migration. If it hasn't been applied
  // yet, never lose a paid customer's key over it — store without the claim
  // tag (the emailed key still works) and log so it gets fixed.
  if (error && claimMachineId && /claim_machine_id/.test(error.message)) {
    console.error('claim_machine_id column missing — run the license_keys migration. Saving key without it.')
    delete row.claim_machine_id
    ;({ error } = await supabaseAdmin.from('license_keys').insert([row]))
  }

  // A concurrent webhook delivery for the same payment already created the key
  // (unique index on order_id): hand back that one instead of minting a second.
  if (error && error.code === '23505' && orderId) {
    const existing = await findKeyByOrder(orderId)
    if (existing) return { key: existing.key, created: false }
  }

  if (error) throw new Error(error.message)
  return { key, created: true }
}

export async function revokeByOrder(orderId: string, reason: string) {
  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .update({ is_revoked: true })
    .eq('order_id', orderId)
    .select('key')
  if (error) throw new Error(error.message)
  console.log(`Revoked ${data?.length ?? 0} license(s) for order ${orderId}: ${reason}`)
}

const SUPPORT_EMAIL = 'support@macdiskcleaner.com'

export async function sendLicenseEmail({ to, licenseKey }: { to: string; licenseKey: string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Loud on purpose: the webhook fails, the payment provider retries, and the
    // customer can still get the key from the success page or the app.
    throw new Error('RESEND_API_KEY is not set — license email not sent')
  }

  const resend = new Resend(apiKey)

  // Falls back to Resend's shared sandbox sender until macdiskcleaner.com is
  // verified in Resend (sending from an unverified custom domain fails) —
  // set RESEND_FROM_EMAIL once the domain's DNS records are added and
  // verified, no code change needed then.
  const from = process.env.RESEND_FROM_EMAIL || 'MacDiskCleaner <onboarding@resend.dev>'

  const text = [
    'Thanks for going Pro!',
    '',
    'Your MacDiskCleaner Pro license key:',
    licenseKey,
    '',
    'If you bought from inside the app it unlocks by itself. Otherwise: open MacDiskCleaner, click "Unlock Pro" > "I already have a license key", paste the key and press Activate.',
    '',
    'This key works on one Mac. To move it to a new Mac, choose Deactivate License in the old app first (or reply to this email and we will help).',
    '',
    `30-day refund, no questions asked: just reply. Support: ${SUPPORT_EMAIL}`,
  ].join('\n')

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: SUPPORT_EMAIL,
    subject: 'Your MacDiskCleaner Pro license key',
    text,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-size: 20px; color: #1D1D1F; margin-bottom: 8px;">Thanks for going Pro!</h1>
        <p style="font-size: 15px; color: #6E6E73; line-height: 1.6;">Your MacDiskCleaner Pro license key is below.</p>
        <div style="background: #F5F5F7; border-radius: 12px; padding: 16px 20px; margin: 20px 0; font-family: monospace; font-size: 18px; font-weight: 600; color: #007AFF; text-align: center; letter-spacing: 0.02em;">
          ${licenseKey}
        </div>
        <p style="font-size: 14px; color: #1D1D1F; line-height: 1.6;"><strong>Bought from inside the app?</strong> It unlocks by itself &mdash; nothing to paste.</p>
        <p style="font-size: 14px; color: #1D1D1F; line-height: 1.6;"><strong>Otherwise:</strong> open MacDiskCleaner, click <em>Unlock Pro</em> &rarr; <em>I already have a license key</em>, paste the key and press Activate.</p>
        <p style="font-size: 13px; color: #6E6E73; line-height: 1.6;">This key works on <strong>one Mac</strong>. To move it to a new Mac, choose <em>Deactivate License</em> in the old app first &mdash; or just reply to this email and we&rsquo;ll help.</p>
        <p style="font-size: 13px; color: #9A9A9E;">30-day refund, no questions asked. Support: ${SUPPORT_EMAIL}</p>
      </div>
    `,
  })

  if (error) throw new Error(`Resend rejected the license email: ${error.message}`)
}
