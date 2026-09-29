import { Settings, Shield, Key, ShieldAlert } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'
import { formatDateTime } from '@/lib/formatDate'

export const dynamic = 'force-dynamic'

async function getRecentLoginAttempts() {
  try {
    const { data } = await supabaseAdmin
      .from('login_attempts')
      .select('created_at, ip, success')
      .order('created_at', { ascending: false })
      .limit(15)
    return data ?? []
  } catch {
    return []
  }
}

export default async function SettingsPage() {
  const attempts = await getRecentLoginAttempts()
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Security Settings */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Security Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Admin Password</label>
              <div className="px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-300 font-mono text-sm">
                ••••••••
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Set via the <code className="text-gray-400">ADMIN_PASSWORD</code> environment variable in this
                project's Vercel settings — to change it, update that value there and redeploy.
              </p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">System Configuration</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Supabase Database URL</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-300 font-mono text-sm">
                <Key className="w-4 h-4 text-gray-500" />
                <span>{process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Environment</label>
              <div className="px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-300 font-mono text-sm capitalize">
                {process.env.NODE_ENV || 'production'}
              </div>
            </div>
          </div>
        </div>


        {/* Login Attempts */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Recent Login Attempts</h3>
          </div>

          {attempts.length === 0 ? (
            <p className="text-sm text-gray-500">
              None logged yet — this starts recording once{' '}
              <code className="text-gray-400">supabase/migrations/2026-09-licensing-hardening.sql</code> has been run.
            </p>
          ) : (
            <div className="space-y-2">
              {attempts.map((a, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-sm text-gray-300 font-mono">{a.ip || 'unknown'}</span>
                  <span className="text-xs text-gray-500">{formatDateTime(a.created_at)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {a.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
