'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getSubmissions(): Promise<{ submissions: any[]; tableMissing: boolean }> {
  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // PGRST205 = table not found in schema cache — i.e. supabase/schema.sql
    // hasn't been run against this project yet. Don't crash the page for
    // this expected pre-setup state; show a helpful message instead.
    if (error.code === 'PGRST205') {
      return { submissions: [], tableMissing: true }
    }
    throw new Error(error.message)
  }

  return { submissions: data ?? [], tableMissing: false }
}

export async function markRead(id: string, isRead: boolean) {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ is_read: isRead })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/support')
}
