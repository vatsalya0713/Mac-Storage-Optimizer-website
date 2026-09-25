import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const CATEGORIES = ['general', 'support', 'bug', 'suggestion'] as const
const MAX_MESSAGE_LENGTH = 5000

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many messages, please try again in a minute' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const name = (body?.name as string | undefined)?.trim()
  const email = (body?.email as string | undefined)?.trim()
  const category = body?.category as string | undefined
  const message = (body?.message as string | undefined)?.trim()

  if (!name || !email || !message || !category || !CATEGORIES.includes(category as any)) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Message must be under ${MAX_MESSAGE_LENGTH} characters` }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('contact_submissions').insert([
    { name, email, category, message, is_read: false },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL
  const apiKey = process.env.RESEND_API_KEY
  if (notifyTo && apiKey) {
    const resend = new Resend(apiKey)
    const from = process.env.RESEND_FROM_EMAIL || 'MacDiskCleaner <onboarding@resend.dev>'
    await resend.emails
      .send({
        from,
        to: notifyTo,
        replyTo: email,
        subject: `[${category}] New contact form message from ${escapeHtml(name)}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p><strong>Category:</strong> ${escapeHtml(category)}</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      })
      .catch((err) => console.error('Contact notification email failed:', err))
  }

  return NextResponse.json({ success: true })
}
