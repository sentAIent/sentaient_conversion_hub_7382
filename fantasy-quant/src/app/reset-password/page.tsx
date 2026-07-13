import { updatePassword } from './actions'
import { Zap } from 'lucide-react'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-black text-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Zap className="w-12 h-12 text-blue-500 mb-4" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Set new password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 py-8 px-4 shadow sm:rounded-xl sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-400 bg-slate-800/50 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                formAction={updatePassword}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
