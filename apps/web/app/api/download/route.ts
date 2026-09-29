import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { getLatestRelease } from '@/lib/latestRelease'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Canonical "always the current version" download link, used by every
// download button/CTA on the site and by install.sh. Also the single place
// a download is counted for the admin panel's Downloads page — logs a row
// (best-effort, never blocks the redirect) with coarse geo from Vercel's
// edge headers and a one-way IP hash (never the raw IP) for rough
// distinct-visitor counting.
export async function GET(request: NextRequest) {
  const release = await getLatestRelease()

  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
  const salt = process.env.LICENSE_SIGNING_KEY || 'mdc-download-log'
  const ipHash = ip ? createHash('sha256').update(`${salt}|${ip}`).digest('hex').slice(0, 24) : null

  // Awaited (with a timeout) rather than fire-and-forget: a serverless
  // function can be frozen the instant it returns a response, so a
  // background write started after the redirect isn't guaranteed to finish.
  // The insert itself is a few ms; the timeout just stops a slow/unreachable
  // database from ever delaying the actual download.
  const logInsert = supabaseAdmin
    .from('download_logs')
    .insert([
      {
        source: request.nextUrl.searchParams.get('src') || 'dmg',
        version: release.version,
        country: request.headers.get('x-vercel-ip-country'),
        region: request.headers.get('x-vercel-ip-country-region'),
        city: request.headers.get('x-vercel-ip-city') ? decodeURIComponent(request.headers.get('x-vercel-ip-city')!) : null,
        ip_hash: ipHash,
        referrer: request.headers.get('referer')?.slice(0, 300) || null,
      },
    ])
    .then(({ error }) => {
      // Table not created yet, or any other hiccup: never let logging break downloads.
      if (error) console.error('download_logs insert failed:', error.message)
    })
  await Promise.race([logInsert, new Promise((resolve) => setTimeout(resolve, 1500))])

  return NextResponse.redirect(release.url, { status: 302, headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } })
}
