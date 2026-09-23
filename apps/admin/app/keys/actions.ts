'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getKeys() {
  const { data, error } = await supabaseAdmin
    .from('license_keys')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
}

export async function revokeKey(id: string) {
  const { error } = await supabaseAdmin
    .from('license_keys')
    .update({ is_revoked: true })
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  revalidatePath('/admin/keys')
  revalidatePath('/admin')
}

export async function generateKey(tier: string, maxActivations: number) {
  // Generate a random key (e.g., MSO-XXXX-XXXX-XXXX)
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase()
  const keyString = `MSO-${segment()}-${segment()}-${segment()}`

  const { error } = await supabaseAdmin
    .from('license_keys')
    .insert([
      {
        key: keyString,
        tier: tier,
        max_activations: maxActivations,
        is_revoked: false,
        payment_provider: 'manual_admin'
      }
    ])
    
  if (error) throw new Error(error.message)
  revalidatePath('/admin/keys')
  revalidatePath('/admin')
}
