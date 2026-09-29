import { supabaseAdmin } from '@/lib/supabase'
import { priceForTier } from '@/lib/pricing'
import { formatDate, formatShortDate } from '@/lib/formatDate'
import { KeyRound, MonitorCheck, Activity, ArrowUpRight, DollarSign, Clock, Webhook, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { ActivationsChart, RevenueChart } from '@/components/DashboardCharts'

export const dynamic = 'force-dynamic' // Disable caching for the admin dashboard

const TREND_DAYS = 14
const DAY_MS = 86_400_000

// All UTC-based throughout — `created_at`/`activated_at` are UTC timestamps
// from Postgres, so bucketing must also use UTC, not the server process's
// local timezone, or buckets shift by a day depending on where this runs.
function lastNDays(n: number): string[] {
  const days: string[] = []
  const todayUTC = Date.now() - (Date.now() % DAY_MS)
  for (let i = n - 1; i >= 0; i--) {
    days.push(new Date(todayUTC - i * DAY_MS).toISOString().slice(0, 10))
  }
  return days
}

function bucketByDay<T>(rows: T[], dateField: keyof T, days: string[]): Map<string, T[]> {
  const buckets = new Map<string, T[]>(days.map((d) => [d, []]))
  for (const row of rows) {
    const day = String(row[dateField]).slice(0, 10)
    buckets.get(day)?.push(row)
  }
  return buckets
}

function shortLabel(isoDate: string): string {
  return formatShortDate(isoDate + 'T00:00:00.000Z')
}

export default async function AdminDashboard() {
  const days = lastNDays(TREND_DAYS)
  const windowStart = `${days[0]}T00:00:00.000Z`
  const soonCutoff = new Date()
  soonCutoff.setDate(soonCutoff.getDate() + 7)

  const [
    { count: totalKeys },
    { count: activeKeys },
    { count: totalActivations },
    { data: allKeys },
    { data: recentKeys },
    { data: recentActivations },
    { data: expiringSoon },
  ] = await Promise.all([
    supabaseAdmin.from('license_keys').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('license_keys').select('*', { count: 'exact', head: true }).eq('is_revoked', false),
    supabaseAdmin.from('activations').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('license_keys').select('tier, payment_provider, created_at'),
    supabaseAdmin.from('license_keys').select('*').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('activations').select('activated_at').gte('activated_at', windowStart),
    supabaseAdmin
      .from('license_keys')
      .select('key, customer_email, tier, expires_at')
      .eq('is_revoked', false)
      .not('expires_at', 'is', null)
      .lte('expires_at', soonCutoff.toISOString())
      .order('expires_at', { ascending: true })
      .limit(5),
  ])

  // Best-effort: the migration adding webhook_events may not have run yet,
  // so a missing table must never break the dashboard — just show "unknown".
  let lastWebhook: { created_at: string; event_type: string } | null = null
  try {
    const { data } = await supabaseAdmin
      .from('webhook_events')
      .select('created_at, event_type')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    lastWebhook = data
  } catch {
    lastWebhook = null
  }

  const totalRevenue = allKeys?.reduce((acc, key) => {
    if (key.payment_provider === 'manual_admin') return acc
    return acc + priceForTier(key.tier)
  }, 0) || 0

  // Trend data for the last 14 days.
  const keysInWindow = (allKeys || []).filter((k) => k.created_at >= windowStart)
  const revenueBuckets = bucketByDay(keysInWindow, 'created_at', days)
  const revenueData = days.map((d) => ({
    date: shortLabel(d),
    value: (revenueBuckets.get(d) || []).reduce(
      (acc, k: any) => (k.payment_provider === 'manual_admin' ? acc : acc + priceForTier(k.tier)),
      0
    ),
  }))

  const activationBuckets = bucketByDay(recentActivations || [], 'activated_at', days)
  const activationsData = days.map((d) => ({
    date: shortLabel(d),
    value: (activationBuckets.get(d) || []).length,
  }))

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    {
      name: 'Total License Keys',
      value: totalKeys || 0,
      icon: KeyRound,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      name: 'Active Keys',
      value: activeKeys || 0,
      icon: Activity,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      name: 'Total Activations',
      value: totalActivations || 0,
      icon: MonitorCheck,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-4"
            >
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Webhook health */}
      <WebhookHealthBanner lastWebhook={lastWebhook} />

      {/* Trend charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Activations — last {TREND_DAYS} days</h3>
          <ActivationsChart data={activationsData} />
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue — last {TREND_DAYS} days</h3>
          <RevenueChart data={revenueData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Keys */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent License Keys</h3>
            <Link
              href="/keys"
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentKeys?.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                <div>
                  <p className="font-mono text-sm text-gray-200">{key.key.substring(0, 16)}...</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(key.created_at)} • {key.tier}
                  </p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  key.is_revoked
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                  {key.is_revoked ? 'Revoked' : 'Active'}
                </div>
              </div>
            ))}

            {(!recentKeys || recentKeys.length === 0) && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No license keys found.
              </div>
            )}
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Expiring Soon
            </h3>
            <span className="text-xs text-gray-500">Next 7 days</span>
          </div>

          <div className="space-y-4">
            {expiringSoon?.map((key) => (
              <div key={key.key} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="min-w-0">
                  <p className="text-sm text-gray-200 truncate">{key.customer_email || <span className="italic text-gray-600">No email</span>}</p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">{key.key}</p>
                </div>
                <div className="text-xs font-medium text-amber-400 whitespace-nowrap">
                  {formatDate(key.expires_at)}
                </div>
              </div>
            ))}

            {(!expiringSoon || expiringSoon.length === 0) && (
              <div className="text-center py-8 text-gray-400 text-sm">
                Nothing expiring in the next 7 days.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

function WebhookHealthBanner({ lastWebhook }: { lastWebhook: { created_at: string; event_type: string } | null }) {
  if (!lastWebhook) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
        <Webhook className="w-4 h-4 text-gray-500" />
        <p className="text-sm text-gray-400">No webhook activity logged yet.</p>
      </div>
    )
  }

  const ageMs = Date.now() - new Date(lastWebhook.created_at).getTime()
  const ageHours = ageMs / 3_600_000
  // Dodo can go quiet for legitimately long stretches (no sales that day),
  // so this flags "stale" rather than claiming something is actually wrong —
  // it's a nudge to check the Dodo dashboard, not a hard alert.
  const stale = ageHours > 72
  const ageLabel =
    ageHours < 1 ? `${Math.max(1, Math.round(ageMs / 60_000))} min ago`
    : ageHours < 48 ? `${Math.round(ageHours)}h ago`
    : `${Math.round(ageHours / 24)}d ago`

  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${stale ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/5 border-white/10'}`}>
      {stale ? <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
      <p className="text-sm text-gray-300">
        Last Dodo webhook: <span className="font-medium text-gray-100">{lastWebhook.event_type}</span> · {ageLabel}
        {stale && <span className="text-amber-400"> — no webhook in over 3 days, worth checking the Dodo dashboard.</span>}
      </p>
    </div>
  )
}
