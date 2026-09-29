import { supabaseAdmin } from './supabase'
import latestFile from '@/public/downloads/latest.json'

export type LatestRelease = {
  version: string
  build: number | null
  releasedAt: string
  notes: string[]
  url: string
  sha256: string
  sizeBytes: number
  minMacOS: string | null
}

// Shared by /api/releases/latest (what the app's updater calls) and the
// downloads page (what visitors see) so both always agree, whether the
// current release came from an admin upload or the CLI release script.
export async function getLatestRelease(): Promise<LatestRelease> {
  const { data } = await supabaseAdmin
    .from('app_releases')
    .select('version, build, released_at, notes, dmg_path, sha256, size_bytes, min_macos')
    .eq('is_current', true)
    .maybeSingle()

  if (!data) return latestFile as LatestRelease

  return {
    version: data.version,
    build: data.build,
    releasedAt: data.released_at,
    notes: data.notes,
    url: data.dmg_path.startsWith('http') ? data.dmg_path : `https://www.macdiskcleaner.com${data.dmg_path}`,
    sha256: data.sha256,
    sizeBytes: data.size_bytes,
    minMacOS: data.min_macos,
  }
}
