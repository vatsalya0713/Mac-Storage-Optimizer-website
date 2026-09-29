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

// Uploads a built .dmg straight from the browser and publishes it as the
// current release — no CLI, no git commit. sha256 is computed server-side
// from the uploaded bytes so it can't be typed wrong.
export async function publishRelease(formData: FormData) {
  const file = formData.get('file') as File | null
  const version = (formData.get('version') as string | null)?.trim()
  const notesRaw = (formData.get('notes') as string | null) ?? ''
  const minMacOS = (formData.get('minMacOS') as string | null)?.trim() || '14'

  if (!file || file.size === 0) throw new Error('Choose a .dmg file to upload')
  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Version must look like 1.2.3')
  if (file.size > 50 * 1024 * 1024) throw new Error('File is over the 50 MB storage limit — raise it in Supabase Storage first')

  const { data: existing } = await supabaseAdmin.from('app_releases').select('id').eq('version', version).maybeSingle()
  if (existing) throw new Error(`Version ${version} already exists — use a new version number`)

  const bytes = new Uint8Array(await file.arrayBuffer())
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const sha256 = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')

  const objectPath = `MacDiskCleaner-${version}.dmg`
  const { error: uploadError } = await supabaseAdmin.storage
    .from('releases')
    .upload(objectPath, bytes, { contentType: 'application/x-apple-diskimage', upsert: false })
  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

  const { data: pub } = supabaseAdmin.storage.from('releases').getPublicUrl(objectPath)
  const notes = notesRaw.split('\n').map((n) => n.trim()).filter(Boolean)

  await supabaseAdmin.from('app_releases').update({ is_current: false }).eq('is_current', true)
  const { error: insertError } = await supabaseAdmin.from('app_releases').insert([
    {
      version,
      build: null,
      notes,
      dmg_path: pub.publicUrl,
      sha256,
      size_bytes: file.size,
      min_macos: minMacOS,
      is_current: true,
    },
  ])
  if (insertError) {
    // Don't leave an orphaned, unreferenced file in storage.
    await supabaseAdmin.storage.from('releases').remove([objectPath])
    throw new Error(insertError.message)
  }

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
