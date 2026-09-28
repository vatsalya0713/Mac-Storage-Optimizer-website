'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

const PAGE_SIZE = 20

export async function getSubmissionsPaged(
  page: number,
  q?: string
): Promise<{ submissions: any[]; count: number; unreadCount: number; tableMissing: boolean }> {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabaseAdmin
    .from('contact_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%`)
  }

  const [{ data, error, count }, unreadResult] = await Promise.all([
    query.range(from, to),
    supabaseAdmin.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ])

  if (error) {
    // PGRST205 = table not found in schema cache — i.e. supabase/schema.sql
    // hasn't been run against this project yet. Don't crash the page for
    // this expected pre-setup state; show a helpful message instead.
    if (error.code === 'PGRST205') {
      return { submissions: [], count: 0, unreadCount: 0, tableMissing: true }
    }
    throw new Error(error.message)
  }

  return {
    submissions: data ?? [],
    count: count ?? 0,
    unreadCount: unreadResult.count ?? 0,
    tableMissing: false,
  }
}

export async function markRead(id: string, isRead: boolean) {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ is_read: isRead })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/support')
}
