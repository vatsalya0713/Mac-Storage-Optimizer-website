'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { randomInt } from 'node:crypto'

const PAGE_SIZE = 25

export async function getKeysPaged(page: number, q?: string) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabaseAdmin
    .from('license_keys')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (q) {
    const safe = q.replace(/[,()%*\\]/g, ' ').trim()
    if (safe) query = query.or(`key.ilike.%${safe}%,customer_email.ilike.%${safe}%`)
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

// Frees every seat on a key (e.g. the customer replaced their Mac). The old Mac
// loses Pro at its next license check; the customer can activate on the new one.
export async function resetActivations(licenseKey: string) {
  const { error } = await supabaseAdmin
    .from('activations')
    .update({ is_active: false })
    .eq('license_key', licenseKey)

  if (error) throw new Error(error.message)
  revalidatePath('/keys')
  revalidatePath('/activations')
}

export async function generateKey(tier: string, maxActivations: number) {
  // MSO-XXXX-XXXX-XXXX from a cryptographic RNG, same alphabet as the website.
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  const segment = () => Array.from({ length: 4 }, () => alphabet[randomInt(alphabet.length)]).join('')
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
