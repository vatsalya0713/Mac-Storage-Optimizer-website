import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { priceForTier } from '@/lib/pricing'
import { toCsv } from '@/lib/csv'

export const dynamic = 'force-dynamic'

// Protected the same way every other admin page is — proxy.ts's matcher
// covers /api/export/* too, so this requires a valid admin session cookie.
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .select('key, tier, max_activations, is_revoked, customer_email, customer_name, payment_provider, order_id, created_at, expires_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const headers = [
    'key', 'tier', 'max_activations', 'is_revoked', 'customer_email', 'customer_name',
    'payment_provider', 'order_id', 'amount_usd', 'created_at', 'expires_at',
  ]
  const rows = (data ?? []).map((r) => [
    r.key, r.tier, r.max_activations, r.is_revoked, r.customer_email, r.customer_name,
    r.payment_provider, r.order_id,
    r.payment_provider === 'manual_admin' ? 0 : priceForTier(r.tier),
    r.created_at, r.expires_at,
  ])

  const csv = toCsv(headers, rows)
  const filename = `license-keys-${new Date().toISOString().slice(0, 10)}.csv`
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
