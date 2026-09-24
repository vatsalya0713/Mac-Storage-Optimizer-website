import { supabaseAdmin } from '@/lib/supabase'
import { KeyRound, MonitorCheck, Activity, ArrowUpRight, DollarSign } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic' // Disable caching for the admin dashboard

export default async function AdminDashboard() {
  // Fetch stats from Supabase
  const [
    { count: totalKeys },
    { count: activeKeys },
    { count: totalActivations },
    { data: allKeys },
    { data: recentKeys }
  ] = await Promise.all([
    supabaseAdmin.from('license_keys').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('license_keys').select('*', { count: 'exact', head: true }).eq('is_revoked', false),
    supabaseAdmin.from('activations').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('license_keys').select('tier, payment_provider'),
    supabaseAdmin.from('license_keys').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  // Calculate Total Revenue
  // Assuming Pro/Lifetime = $12.99, Basic = $0
  // Ignore manual admin generations if payment_provider is 'manual_admin'
  const totalRevenue = allKeys?.reduce((acc, key) => {
    if (key.payment_provider === 'manual_admin') return acc
    if (key.tier === 'pro' || key.tier === 'lifetime') return acc + 12.99
    return acc
  }, 0) || 0

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    {
      name: 'Total License Keys',
      value: totalKeys || 0,
      icon: KeyRound,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      name: 'Active Keys',
      value: activeKeys || 0,
      icon: Activity,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      name: 'Total Activations',
      value: totalActivations || 0,
      icon: MonitorCheck,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.name}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-4"
            >
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Keys */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent License Keys</h3>
            <Link 
              href="/admin/keys" 
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentKeys?.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                <div>
                  <p className="font-mono text-sm text-gray-200">{key.key.substring(0, 16)}...</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(key.created_at).toLocaleDateString()} • {key.tier}
                  </p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  key.is_revoked 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                  {key.is_revoked ? 'Revoked' : 'Active'}
                </div>
              </div>
            ))}
            
            {(!recentKeys || recentKeys.length === 0) && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No license keys found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
