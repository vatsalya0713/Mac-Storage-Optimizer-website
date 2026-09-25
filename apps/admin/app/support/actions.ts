'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getSubmissions() {
  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function markRead(id: string, isRead: boolean) {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ is_read: isRead })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/support')
}
