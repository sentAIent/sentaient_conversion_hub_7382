import { updatePassword } from '@/app/reset-password/actions'
import { terminateAccount } from './actions'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AlertTriangle, Settings, ShieldAlert, Key, SlidersHorizontal } from 'lucide-react'
import ApiKeysForm from './ApiKeysForm'
import EnsembleWeightsForm from './EnsembleWeightsForm'
import BillingPortalButton from './BillingPortalButton'

export default async function AccountSettingsPage() {
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

  const { data: settings } = await supabase
    .from('user_settings')
    .select('api_sports_key, sportsdataio_key, ensemble_weights')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-black text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-extrabold text-white">Account Settings</h1>
        </div>

        {/* Profile Info */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-white mb-4">Profile Details</h2>
          <div className="text-slate-400">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-white mb-4">Update Password</h2>
          <form className="space-y-4 max-w-md">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-400 bg-slate-800/50 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              formAction={updatePassword}
              className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* API Keys */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 p-6 rounded-xl shadow">
          <div className="flex items-center space-x-2 text-emerald-400 mb-4">
            <Key className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Live Data API Keys</h2>
          </div>
          <p className="text-slate-400 mb-4 text-sm">
            Configure your commercial provider API keys here. Sleeper and the NFL Scraper do not require keys.
          </p>
          <ApiKeysForm 
            initialApiSportsKey={settings?.api_sports_key || null}
            initialSportsDataIOKey={settings?.sportsdataio_key || null}
          />
        </div>

        {/* Ensemble Projections */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 p-6 rounded-xl shadow">
          <div className="flex items-center space-x-2 text-blue-400 mb-4">
            <SlidersHorizontal className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Ensemble Projection Weights</h2>
          </div>
          <p className="text-slate-400 mb-4 text-sm">
            Configure how much weight each prediction source holds when building lineups. Must sum to 100%.
          </p>
          <EnsembleWeightsForm initialWeights={settings?.ensemble_weights || null} />
        </div>

        {/* Subscription / Billing */}
        <div className="bg-[#11141a] border border-white/[0.04] p-6 rounded-xl shadow mt-8">
          <h2 className="text-xl font-bold mb-2">Subscription & Billing</h2>
          <p className="text-slate-400 mb-6 text-sm">
            View your current plan, update your payment method, or download invoices.
          </p>
          <BillingPortalButton />
        </div>

        {/* Danger Zone */}
        <div className="bg-red-950/20 backdrop-blur-xl border border-red-900/50 p-6 rounded-xl shadow mt-12">
          <div className="flex items-center space-x-2 text-red-500 mb-4">
            <ShieldAlert className="w-6 h-6" />
            <h2 className="text-xl font-bold">Danger Zone</h2>
          </div>
          <p className="text-slate-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
            All your data, settings, and saved models will be permanently wiped.
          </p>
          <form>
            <button
              formAction={terminateAccount}
              className="flex items-center justify-center space-x-2 py-2 px-4 border border-red-700 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600/80 hover:bg-red-600 transition-colors"
              onClick={(e) => {
                if (!confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
                  e.preventDefault()
                }
              }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Permanently Delete Account</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
