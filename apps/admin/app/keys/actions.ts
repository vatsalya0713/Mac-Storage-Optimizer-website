'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

const PAGE_SIZE = 25

export async function getKeysPaged(page: number, q?: string) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabaseAdmin
    .from('license_keys')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (q) {
    query = query.or(`key.ilike.%${q}%,customer_email.ilike.%${q}%`)
  }

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  return { data: data ?? [], count: count ?? 0 }
}

export async function revokeKey(id: string) {
  const { error } = await supabaseAdmin
    .from('license_keys')
    .update({ is_revoked: true })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/keys')
  revalidatePath('/')
}

export async function generateKey(tier: string, maxActivations: number) {
  // Generate a random key (e.g., MSO-XXXX-XXXX-XXXX)
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase()
  const keyString = `MSO-${segment()}-${segment()}-${segment()}`

  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .insert([
      {
        key: keyString,
        tier: tier,
        max_activations: maxActivations,
        is_revoked: false,
        payment_provider: 'manual_admin',
      },
    ])
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/keys')
  revalidatePath('/')
  return data
}
