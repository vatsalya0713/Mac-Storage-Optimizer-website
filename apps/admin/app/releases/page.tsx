import { getReleases } from './actions'
import ReleasesClient from './ReleasesClient'

export const dynamic = 'force-dynamic'

export default async function ReleasesPage() {
  let releases: Awaited<ReturnType<typeof getReleases>> = []
  let migrationMissing = false
  try {
    releases = await getReleases()
  } catch (error) {
    // PGRST205 = table not found — the licensing-hardening SQL migration
    // hasn't been run against this Supabase project yet.
    migrationMissing = error instanceof Error && /app_releases|PGRST205|does not exist/i.test(error.message)
    if (!migrationMissing) throw error
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">App Releases</h2>
        <p className="text-gray-400 text-sm mt-1">
          What the desktop app&apos;s self-updater offers. Edit release notes, or roll the &quot;current&quot; pointer
          back to an earlier version — no new build needed. Building and publishing a new .dmg itself still runs
          from the app repo (<code className="text-gray-300">./release.sh</code>), which adds its row here automatically.
        </p>
      </div>
      {migrationMissing ? (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-sm text-yellow-200">
          The <code>app_releases</code> table doesn&apos;t exist yet — run{' '}
          <code>supabase/migrations/2026-09-licensing-hardening.sql</code> in the Supabase SQL editor, then reload
          this page.
        </div>
      ) : (
        <ReleasesClient releases={releases} />
      )}
    </div>
  )
}
