import { supabaseAdmin } from '@/lib/supabase'
import SalesClient from './SalesClient'

export const dynamic = 'force-dynamic'

export default async function SalesPage() {
  const { data: sales, error } = await supabaseAdmin
    .from('license_keys')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching sales:', error)
  }
  
  // Format the sales data with calculated amounts
  const formattedSales = (sales || []).map(sale => {
    let amount = 0
    if (sale.payment_provider !== 'manual_admin') {
      if (sale.tier === 'pro' || sale.tier === 'lifetime') amount = 12.99
    }
    
    return {
      ...sale,
      amount
    }
  })
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sales & Customers</h2>
      </div>
      
      <SalesClient initialSales={formattedSales} />
    </div>
  )
}
