'use client'

import { useBetSlip } from './BetSlipContext'
import { useState, useEffect } from 'react'

export function BetSlip() {
  const { isOpen, activeBet, closeBetSlip } = useBetSlip()
  const [wager, setWager] = useState<number | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedBankroll, setSelectedBankroll] = useState<string>('bankroll_1')

  // Mock bankrolls (would fetch from API in production)
  const bankrolls = [
    { id: 'bankroll_1', name: 'Main NFL Bets', balance: 10000 },
    { id: 'bankroll_2', name: 'Player Props Only', balance: 5200 },
    { id: 'bankroll_3', name: 'Degenerate Parlays', balance: 150 },
  ]

  // Reset state when opening a new bet
  useEffect(() => {
    if (isOpen) {
      setWager('')
      setSuccess(false)
    }
  }, [isOpen, activeBet])

  if (!isOpen && !activeBet) return null;

  const toWin = typeof wager === 'number' && activeBet ? 
    (activeBet.odds < 0 ? (wager * 100) / Math.abs(activeBet.odds) : (wager * activeBet.odds) / 100)
    : 0

  const handlePlaceBet = async () => {
    if (!wager || !activeBet) return
    setIsSubmitting(true)
    
    // In a real app, this would be a fetch to /api/bets/place
    // Mocking for now to simulate success
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        closeBetSlip()
      }, 1500)
    }, 800)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeBetSlip}
        />
      )}
      
      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🎟️</span> Bet Slip
          </h2>
          <button 
            onClick={closeBetSlip}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {activeBet ? (
          <div className="p-6 flex-1 overflow-y-auto">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-green-500">✓</span>
                </div>
                <h3 className="text-xl font-bold text-white">Bet Placed!</h3>
                <p className="text-gray-400">Your pick has been added to your bankroll.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Bet Details */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">
                    {activeBet.market.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-lg font-bold text-white flex justify-between">
                    <span>{activeBet.targetName}</span>
                    <span className="text-blue-400">
                      {activeBet.selection} {activeBet.line !== null ? activeBet.line : ''}
                    </span>
                  </div>
                  <div className="text-right mt-1 text-sm text-gray-300">
                    {activeBet.odds > 0 ? '+' : ''}{activeBet.odds}
                  </div>
                </div>

                {/* Bankroll Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Select Bankroll</label>
                  <select
                    value={selectedBankroll}
                    onChange={(e) => setSelectedBankroll(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
                  >
                    {bankrolls.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} (Balance: {b.balance} Coins)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Wager Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-400">Wager Amount (Coins)</label>
                    <span className="text-sm text-gray-500">
                      Available: {bankrolls.find(b => b.id === selectedBankroll)?.balance || 0}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">C</span>
                    <input 
                      type="number" 
                      value={wager}
                      onChange={(e) => setWager(e.target.value ? Number(e.target.value) : '')}
                      placeholder="100"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[100, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setWager(amount)}
                        className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300 transition-colors"
                      >
                        +{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout Calculation */}
                <div className="bg-gray-950 rounded-xl p-4 flex justify-between items-center border border-gray-800">
                  <span className="text-gray-400 font-medium">To Win</span>
                  <span className="text-xl font-bold text-green-400">
                    {toWin > 0 ? `+${toWin.toFixed(0)}` : '0'} Coins
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-gray-400 flex-1 flex items-center justify-center">
            No active bet.
          </div>
        )}

        {/* Action Button */}
        {!success && activeBet && (
          <div className="p-6 border-t border-gray-800 bg-gray-900">
            <button
              onClick={handlePlaceBet}
              disabled={!wager || isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Placing Bet...</span>
              ) : (
                `Place ${wager ? wager + ' Coin' : ''} Bet`
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
