'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Loader2, MonitorCheck } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(searchParams.get('from') || '/')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4">
            <MonitorCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold">MSO Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              autoFocus
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
