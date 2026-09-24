import { Settings, Shield, Key } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
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
              <div className="flex gap-4">
                <input 
                  type="password" 
                  value="********" 
                  disabled
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 w-full text-gray-300" 
                />
                <button className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                  Change Password
                </button>
              </div>
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

      </div>
    </div>
  )
}
