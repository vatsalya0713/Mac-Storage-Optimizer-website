'use client'

import { useState, useTransition } from 'react'
import { deactivateInstance } from './actions'
import { Search, MonitorOff, Copy, Check } from 'lucide-react'

export default function ActivationsClient({ initialActivations }: { initialActivations: any[] }) {
  const [activations, setActivations] = useState(initialActivations)
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const filteredActivations = activations.filter(a => 
    a.machine_name?.toLowerCase().includes(search.toLowerCase()) || 
    a.license_key?.toLowerCase().includes(search.toLowerCase()) ||
    a.license_keys?.customer_email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeactivate = async (id: string) => {
    if (confirm('Are you sure you want to deactivate this instance?')) {
      startTransition(async () => {
        await deactivateInstance(id)
        setActivations(activations.map(a => a.id === id ? { ...a, is_active: false } : a))
      })
    }
  }

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text"
            placeholder="Search activations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400">Machine</th>
                <th className="px-6 py-4 font-medium text-gray-400">License Key</th>
                <th className="px-6 py-4 font-medium text-gray-400">Customer</th>
                <th className="px-6 py-4 font-medium text-gray-400">Activated At</th>
                <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredActivations.map((activation) => (
                <tr key={activation.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-200">{activation.machine_name || 'Unknown Machine'}</span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">{activation.machine_id?.substring(0, 16)}...</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs flex items-center gap-2">
                    {activation.license_key}
                    <button 
                      onClick={() => copyToClipboard(activation.id, activation.license_key)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      {copiedId === activation.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {activation.license_keys?.customer_email || <span className="italic text-gray-600">None</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(activation.activated_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                      !activation.is_active 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {!activation.is_active ? 'Deactivated' : 'Active'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {activation.is_active && (
                      <button 
                        onClick={() => handleDeactivate(activation.id)}
                        disabled={isPending}
                        className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                        title="Deactivate Instance"
                      >
                        <MonitorOff className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredActivations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No activations found matching your search.
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
