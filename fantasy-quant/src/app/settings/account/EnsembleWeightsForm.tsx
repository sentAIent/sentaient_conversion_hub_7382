'use client'

import { useState } from 'react'

export default function EnsembleWeightsForm({ initialWeights }: { initialWeights: Record<string, number> | null }) {
  const [weights, setWeights] = useState<Record<string, number>>(initialWeights || { ETR: 0.5, STK: 0.3, SIM: 0.2 })
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
        body: JSON.stringify({ ensemble_weights: weights })
      })
      if (!res.ok) throw new Error('Failed to save ensemble weights')
      setMessage('Weights saved successfully!')
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (source: string, val: string) => {
    const num = parseFloat(val)
    setWeights(prev => ({ ...prev, [source]: isNaN(num) ? 0 : num }))
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0)
  const isError = Math.abs(total - 1.0) > 0.01

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-md">
      {Object.entries(weights).map(([source, weight]) => (
        <div key={source} className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-300 w-24">
            {source}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={weight}
            onChange={(e) => handleChange(source, e.target.value)}
            className="mt-1 block w-24 px-3 py-1 border border-slate-700 rounded-lg shadow-sm placeholder-slate-400 bg-slate-800/50 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
          />
        </div>
      ))}
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Total:</span>
        <span className={isError ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
          {(total * 100).toFixed(0)}%
        </span>
      </div>
      {isError && (
        <p className="text-xs text-red-400">Weights must sum exactly to 1.0 (100%)</p>
      )}
      
      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          disabled={loading || isError}
          className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Weights'}
        </button>
        {message && <span className="text-sm text-slate-300">{message}</span>}
      </div>
    </form>
  )
}
