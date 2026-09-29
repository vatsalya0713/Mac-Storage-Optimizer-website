import { NextResponse } from 'next/server'
import { getLatestRelease } from '@/lib/latestRelease'

export const dynamic = 'force-dynamic'

// The next app version reads this (AppConfig.latestReleaseURL). It serves
// whichever release the admin panel marked "current" — so a release note
// fix or a rollback to a previous version needs no new app build. Falls
// back to the static file (kept up to date by release.sh) if the table is
// empty or unreachable, so this can never be a hard dependency.
export async function GET() {
  const release = await getLatestRelease()
  return NextResponse.json(release, { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } })
}
