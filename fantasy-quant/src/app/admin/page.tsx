import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Settings, Users, ShieldAlert, Cpu, Share2, Activity } from 'lucide-react'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is an admin via environment variable
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
  const isEnvAdmin = user.email && adminEmails.includes(user.email.toLowerCase());

  if (!isEnvAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-2xl max-w-md text-center">
          <ShieldAlert size={48} className="mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Access Denied</h1>
          <p className="text-sm">You do not have administrative privileges. Please ensure your email is added to the ADMIN_EMAILS environment variable.</p>
          <Link href="/" className="mt-6 inline-block text-indigo-400 hover:text-indigo-300">Return to Dashboard</Link>
        </div>
      </div>
    )
  }

  // Fetch some basic stats for the dashboard
  const { count: usersCount } = await supabase.from('user_settings').select('*', { count: 'exact', head: true })
  const { count: sharedLineupsCount } = await supabase.from('shared_lineups').select('*', { count: 'exact', head: true })
  
  // Calculate active DFS users
  // We'll approximate this by checking users with a non-null dfs_preferences (or just use total users for now if the field doesn't exist)
  // Let's check how many users have max_exposure set, which indicates they've used DFS tools
  const { count: dfsUsersCount } = await supabase.from('user_settings').select('*', { count: 'exact', head: true }).not('mme_config', 'is', null)

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <ShieldAlert className="text-indigo-500" />
              Admin Command Center
            </h1>
            <p className="text-gray-400 mt-1">Manage users, override projections, and view system health.</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors">
            Exit Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Users size={20} />
              <h3 className="font-semibold">Total Registered Users</h3>
            </div>
            <div className="text-4xl font-black">{usersCount || 0}</div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Share2 size={20} />
              <h3 className="font-semibold">Total Shared Lineups</h3>
            </div>
            <div className="text-4xl font-black text-emerald-400">{sharedLineupsCount || 0}</div>
            <div className="text-xs text-gray-500 mt-1">Viral hooks created</div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Activity size={20} />
              <h3 className="font-semibold">Active DFS Users</h3>
            </div>
            <div className="text-4xl font-black text-indigo-400">{dfsUsersCount || 0}</div>
            <div className="text-xs text-gray-500 mt-1">Saved MME configurations</div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Manual Projection Overrides</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            The data table for manually tweaking `projected_pts` before kickoff will be populated here.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all">
            Open Projections Editor
          </button>
        </div>
      </div>
    </div>
  )
}
