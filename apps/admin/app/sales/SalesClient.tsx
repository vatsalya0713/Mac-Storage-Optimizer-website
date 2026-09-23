'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SalesClient({ initialSales }: { initialSales: any[] }) {
  const [search, setSearch] = useState('')
  
  const filteredSales = initialSales.filter(sale => 
    sale.customer_email?.toLowerCase().includes(search.toLowerCase()) || 
    sale.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    sale.order_id?.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.amount, 0)

  return (
    <div className="space-y-6">
      
      {/* Stats & Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text"
            placeholder="Search by email, name, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
          />
        </div>
        
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-medium">
          Revenue (Filtered): ${totalRevenue.toFixed(2)}
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400">Customer Info</th>
                <th className="px-6 py-4 font-medium text-gray-400">Order ID</th>
                <th className="px-6 py-4 font-medium text-gray-400">Purchase Date</th>
                <th className="px-6 py-4 font-medium text-gray-400">Tier</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-right">Amount Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    {sale.customer_email ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-200">{sale.customer_name || 'Anonymous User'}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{sale.customer_email}</span>
                      </div>
                    ) : (
                      <span className="text-gray-600 italic">Manually Generated (Admin)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                    {sale.order_id || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(sale.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {sale.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-emerald-400">
                    ${sale.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No sales found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
