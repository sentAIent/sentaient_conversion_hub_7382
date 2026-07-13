'use client'

import { useState } from 'react'

export default function ApiKeysForm({ initialApiSportsKey, initialSportsDataIOKey }: { initialApiSportsKey: string | null, initialSportsDataIOKey: string | null }) {
  const [apiSportsKey, setApiSportsKey] = useState(initialApiSportsKey || '')
  const [sportsDataIOKey, setSportsDataIOKey] = useState(initialSportsDataIOKey || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          api_sports_key: apiSportsKey, 
          sportsdataio_key: sportsDataIOKey 
        })
      })
      if (!res.ok) throw new Error('Failed to save API keys')
      setMessage('API Keys saved successfully!')
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="apiSportsKey" className="block text-sm font-medium text-slate-300">
          API-Sports Key
        </label>
        <input
          id="apiSportsKey"
          type="password"
          value={apiSportsKey}
          onChange={(e) => setApiSportsKey(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-400 bg-slate-800/50 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter API-Sports Key"
        />
      </div>
      <div>
        <label htmlFor="sportsDataIOKey" className="block text-sm font-medium text-slate-300">
          SportsDataIO Key
        </label>
        <input
          id="sportsDataIOKey"
          type="password"
          value={sportsDataIOKey}
          onChange={(e) => setSportsDataIOKey(e.target.value)}
          className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-700 rounded-lg shadow-sm placeholder-slate-400 bg-slate-800/50 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter SportsDataIO Key"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save API Keys'}
        </button>
        {message && <span className="text-sm text-slate-300">{message}</span>}
      </div>
    </form>
  )
}
