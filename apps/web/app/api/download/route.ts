import { NextResponse } from 'next/server'
import { getLatestRelease } from '@/lib/latestRelease'

export const dynamic = 'force-dynamic'

// Canonical "always the current version" download link, used by every
// download button/CTA on the site and by install.sh's manual fallback.
export async function GET() {
  const release = await getLatestRelease()
  return NextResponse.redirect(release.url, { status: 302, headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } })
}
