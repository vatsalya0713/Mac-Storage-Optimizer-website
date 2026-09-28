import { supabaseAdmin } from '@/lib/supabase'
import { priceForTier } from '@/lib/pricing'
import SalesClient from './SalesClient'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 25

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const { page: pageParam, q } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let pageQuery = supabaseAdmin
    .from('license_keys')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Lightweight query (2 columns only) across the FULL filtered set, used
  // just to compute total revenue — there's no `amount` column in the DB,
  // so revenue is derived from tier, but we don't want to pull every full
  // row (with customer PII) just to sum it.
  let revenueQuery = supabaseAdmin.from('license_keys').select('tier, payment_provider')

  if (q) {
    const filter = `customer_email.ilike.%${q}%,customer_name.ilike.%${q}%,order_id.ilike.%${q}%`
    pageQuery = pageQuery.or(filter)
    revenueQuery = revenueQuery.or(filter)
  }

  const [{ data: sales, count }, { data: revenueRows }] = await Promise.all([
    pageQuery.range(from, to),
    revenueQuery,
  ])

  const formattedSales = (sales || []).map((sale) => ({
    ...sale,
    amount: sale.payment_provider === 'manual_admin' ? 0 : priceForTier(sale.tier),
  }))

  const totalRevenue = (revenueRows || []).reduce((acc, row) => {
    if (row.payment_provider === 'manual_admin') return acc
    return acc + priceForTier(row.tier)
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sales & Customers</h2>
      </div>

      <SalesClient
        sales={formattedSales}
        page={page}
        pageSize={PAGE_SIZE}
        total={count ?? 0}
        totalRevenue={totalRevenue}
      />
    </div>
  )
}
