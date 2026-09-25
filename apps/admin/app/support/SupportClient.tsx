'use client'

import { useState, useTransition } from 'react'
import { markRead } from './actions'
import { Search, Mail, MailOpen, ChevronDown } from 'lucide-react'

const CATEGORY_STYLE: Record<string, string> = {
  general: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  support: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  bug: 'bg-red-500/10 text-red-400 border-red-500/20',
  suggestion: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function SupportClient({ initialSubmissions }: { initialSubmissions: any[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = submissions.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.message?.toLowerCase().includes(search.toLowerCase())
  )

  const toggleRead = (id: string, current: boolean) => {
    startTransition(async () => {
      await markRead(id, !current)
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, is_read: !current } : s)))
    })
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((s) => {
          const isOpen = expanded === s.id
          return (
            <div key={s.id} className={`border rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-colors ${s.is_read ? 'border-white/10' : 'border-purple-500/30'}`}>
              <button
                onClick={() => setExpanded(isOpen ? null : s.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {s.is_read ? (
                    <MailOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-200 truncate">{s.name} <span className="text-gray-500 font-normal">— {s.email}</span></p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(s.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${CATEGORY_STYLE[s.category] || ''}`}>
                    {s.category}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap bg-black/20 rounded-xl p-4 border border-white/5">{s.message}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <a href={`mailto:${s.email}`} className="text-xs font-medium text-purple-400 hover:text-purple-300">
                      Reply by email
                    </a>
                    <button
                      onClick={() => toggleRead(s.id, s.is_read)}
                      disabled={isPending}
                      className="text-xs font-medium text-gray-400 hover:text-white"
                    >
                      Mark as {s.is_read ? 'unread' : 'read'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm border border-white/10 rounded-2xl bg-white/5">
            No messages found.
          </div>
        )}
      </div>
    </div>
  )
}
