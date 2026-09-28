'use client'

import { PaginatedSearch } from '@/components/PaginatedSearch'
import { formatDateTime } from '@/lib/formatDate'

export default function SalesClient({
  sales,
  page,
  pageSize,
  total,
  totalRevenue,
}: {
  sales: any[]
  page: number
  pageSize: number
  total: number
  totalRevenue: number
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <PaginatedSearch
          placeholder="Search by email, name, or order ID..."
          total={total}
          page={page}
          pageSize={pageSize}
        />
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap">
          Revenue (filtered): ${totalRevenue.toFixed(2)}
        </div>
      </div>

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
              {sales.map((sale) => (
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
                    {formatDateTime(sale.created_at)}
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

              {sales.length === 0 && (
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
