'use server'

import { supabaseAdmin } from '@/lib/supabase'

export async function getDownloadStats() {
  const now = new Date()
  const since7 = new Date(now.getTime() - 7 * 86400_000).toISOString()
  const since30 = new Date(now.getTime() - 30 * 86400_000).toISOString()

  const [{ count: total }, { count: last7 }, { count: last30 }, { data: recent }, { data: countryRows }] = await Promise.all([
    supabaseAdmin.from('download_logs').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('download_logs').select('id', { count: 'exact', head: true }).gte('created_at', since7),
    supabaseAdmin.from('download_logs').select('id', { count: 'exact', head: true }).gte('created_at', since30),
    supabaseAdmin.from('download_logs').select('created_at, source, version, country, region, city').order('created_at', { ascending: false }).limit(100),
    supabaseAdmin.from('download_logs').select('country').not('country', 'is', null).limit(5000),
  ])

  const byCountry = new Map<string, number>()
  for (const row of countryRows ?? []) {
    const c = row.country as string
    byCountry.set(c, (byCountry.get(c) ?? 0) + 1)
  }
  const topCountries = Array.from(byCountry.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8)

  return {
    total: total ?? 0,
    last7: last7 ?? 0,
    last30: last30 ?? 0,
    recent: recent ?? [],
    topCountries,
  }
}
