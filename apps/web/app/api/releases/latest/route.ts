import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import latestFile from '@/public/downloads/latest.json'

export const dynamic = 'force-dynamic'

// The next app version reads this (AppConfig.latestReleaseURL). It serves
// whichever release the admin panel marked "current" — so a release note
// fix or a rollback to a previous version needs no new app build. Falls
// back to the static file (kept up to date by release.sh) if the table is
// empty or unreachable, so this can never be a hard dependency.
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('app_releases')
    .select('version, build, released_at, notes, dmg_path, sha256, size_bytes, min_macos')
    .eq('is_current', true)
    .maybeSingle()

  if (error || !data) {
    return NextResponse.json(latestFile, { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } })
  }

  return NextResponse.json(
    {
      version: data.version,
      build: data.build,
      releasedAt: data.released_at,
      notes: data.notes,
      url: `https://www.macdiskcleaner.com${data.dmg_path}`,
      sha256: data.sha256,
      sizeBytes: data.size_bytes,
      minMacOS: data.min_macos,
    },
    { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } }
  )
}
