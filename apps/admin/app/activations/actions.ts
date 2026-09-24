'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getActivations() {
  const { data, error } = await supabaseAdmin
    .from('activations')
    .select(`
      *,
      license_keys:license_key (
        customer_email,
        tier
      )
    `)
    .order('activated_at', { ascending: false })
  
  if (error) throw new Error(error.message)
  return data
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
