'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

const PAGE_SIZE = 25

export async function getActivationsPaged(page: number, q?: string) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  // !inner so the cross-table `license_keys.customer_email` filter below
  // can apply as a real WHERE clause (PostgREST only supports embedded-
  // resource filters on inner joins).
  let query = supabaseAdmin
    .from('activations')
    .select(
      `*, license_keys!inner ( customer_email, tier )`,
      { count: 'exact' }
    )
    .order('activated_at', { ascending: false })

  if (q) {
    query = query.or(
      `machine_name.ilike.%${q}%,license_key.ilike.%${q}%,license_keys.customer_email.ilike.%${q}%`
    )
  }

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  return { data: data ?? [], count: count ?? 0 }
}

export async function deactivateInstance(id: string) {
  const { error } = await supabaseAdmin
    .from('activations')
    .update({ is_active: false })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/activations')
  revalidatePath('/')
}
