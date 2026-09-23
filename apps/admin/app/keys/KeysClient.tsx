'use client'

import { useState, useTransition } from 'react'
import { revokeKey, generateKey } from './actions'
import { Plus, Search, Ban, Loader2, Copy, Check } from 'lucide-react'

export default function KeysClient({ initialKeys }: { initialKeys: any[] }) {
  const [keys, setKeys] = useState(initialKeys)
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [tier, setTier] = useState('pro')
  const [maxActivations, setMaxActivations] = useState(2)

  const filteredKeys = keys.filter(k => 
    k.key.toLowerCase().includes(search.toLowerCase()) || 
    k.customer_email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleRevoke = async (id: string) => {
    if (confirm('Are you sure you want to revoke this key? This cannot be undone.')) {
      startTransition(async () => {
        await revokeKey(id)
        setKeys(keys.map(k => k.id === id ? { ...k, is_revoked: true } : k))
      })
    }
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await generateKey(tier, maxActivations)
      setShowModal(false)
      // For simplicity, we just reload the page to get the fresh list from server, 
      // or we can just window.location.reload()
      window.location.reload()
    })
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
            placeholder="Search keys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
          />
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Generate Key
        </button>
      </div>

      {/* Table */}
      <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-400">License Key</th>
                <th className="px-6 py-4 font-medium text-gray-400">Customer</th>
                <th className="px-6 py-4 font-medium text-gray-400">Tier</th>
                <th className="px-6 py-4 font-medium text-gray-400">Activations</th>
                <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredKeys.map((key) => (
                <tr key={key.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono flex items-center gap-2">
                    {key.key}
                    <button 
                      onClick={() => copyToClipboard(key.id, key.key)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      {copiedId === key.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {key.customer_email ? (
                      <div className="flex flex-col">
                        <span>{key.customer_email}</span>
                        {key.customer_name && <span className="text-xs text-gray-500">{key.customer_name}</span>}
                      </div>
                    ) : (
                      <span className="text-gray-600 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {key.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {key.max_activations}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                      key.is_revoked 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {key.is_revoked ? 'Revoked' : 'Active'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!key.is_revoked && (
                      <button 
                        onClick={() => handleRevoke(key.id)}
                        disabled={isPending}
                        className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                        title="Revoke Key"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredKeys.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No keys found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Generate License Key</h3>
              <form onSubmit={handleGenerate} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tier</label>
                  <select 
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <option value="pro">Pro</option>
                    <option value="basic">Basic</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Max Activations</label>
                  <input 
                    type="number" 
                    min="1"
                    value={maxActivations}
                    onChange={(e) => setMaxActivations(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 mt-6 border-t border-white/5">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 text-sm font-medium bg-white text-black rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
