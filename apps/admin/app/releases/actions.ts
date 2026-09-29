'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getReleases() {
  const { data, error } = await supabaseAdmin
    .from('app_releases')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateReleaseNotes(id: string, notes: string[]) {
  const { error } = await supabaseAdmin.from('app_releases').update({ notes }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/releases')
}

// Rolls the app's self-update back (or forward) to a previously built
// version — no new binary needed, since every row already has its own
// verified .dmg on the website. Only one row can be "current" at a time.
export async function setCurrentRelease(id: string) {
  const { error: clearError } = await supabaseAdmin.from('app_releases').update({ is_current: false }).eq('is_current', true)
  if (clearError) throw new Error(clearError.message)
  const { error } = await supabaseAdmin.from('app_releases').update({ is_current: true }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/releases')
}
