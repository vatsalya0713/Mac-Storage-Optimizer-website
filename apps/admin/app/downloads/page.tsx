import { getDownloadStats } from './actions'
import { Download, Globe2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}

export default async function DownloadsPage() {
  let stats: Awaited<ReturnType<typeof getDownloadStats>> | null = null
  let migrationMissing = false
  try {
    stats = await getDownloadStats()
  } catch (error) {
    migrationMissing = error instanceof Error && /download_logs|PGRST205|does not exist/i.test(error.message)
    if (!migrationMissing) throw error
  }

  if (migrationMissing || !stats) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Downloads</h2>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-sm text-yellow-200">
          The <code>download_logs</code> table doesn&apos;t exist yet — run{' '}
          <code>supabase/migrations/2026-09-licensing-hardening.sql</code> in the Supabase SQL editor, then reload
          this page. New downloads start being counted from that point on.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Downloads</h2>
        <p className="text-gray-400 text-sm mt-1">
          Every hit on the site&apos;s download button/link and every <code>install.sh</code> run. No raw IP is
          stored — country/city come from Vercel&apos;s edge headers, and visitors are only hashed for rough
          counting.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-xs text-gray-500 mb-1">All time</p>
          <p className="text-3xl font-semibold">{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-xs text-gray-500 mb-1">Last 7 days</p>
          <p className="text-3xl font-semibold">{stats.last7.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-xs text-gray-500 mb-1">Last 30 days</p>
          <p className="text-3xl font-semibold">{stats.last30.toLocaleString()}</p>
        </div>
      </div>

      {stats.topCountries.length > 0 && (
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-4 h-4 text-purple-400" />
            <p className="text-sm font-medium text-gray-300">Top countries (last 5,000 logged)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.topCountries.map(([country, count]) => (
              <span key={country} className="text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                {country} · {count}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
          <Download className="w-4 h-4 text-purple-400" />
          <p className="text-sm font-medium text-gray-300">Recent (last 100)</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-white/5">
              <th className="px-6 py-3 font-medium">When</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Version</th>
              <th className="px-6 py-3 font-medium">Location</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                <td className="px-6 py-3 text-gray-300">{formatWhen(row.created_at)}</td>
                <td className="px-6 py-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-300">{row.source}</span>
                </td>
                <td className="px-6 py-3 text-gray-400">{row.version ?? '—'}</td>
                <td className="px-6 py-3 text-gray-400">
                  {[row.city, row.region, row.country].filter(Boolean).join(', ') || '—'}
                </td>
              </tr>
            ))}
            {stats.recent.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No downloads logged yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
