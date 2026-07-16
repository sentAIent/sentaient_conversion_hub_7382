'use client'

import { useState } from 'react'
import { Wallet, PieChart, History, Plus, BarChart2 } from 'lucide-react'

type Bankroll = {
  id: string
  name: string
  balance: number
}

const MOCK_BANKROLLS: Bankroll[] = [
  { id: '1', name: 'Main Account', balance: 12450 },
  { id: '2', name: 'Player Props Only', balance: 5200 },
  { id: '3', name: 'NFL Spreads', balance: 800 },
]

export default function ProfilePage() {
  const [bankrolls, setBankrolls] = useState<Bankroll[]>(MOCK_BANKROLLS)

  const handleRefill = (id: string) => {
    setBankrolls(prev => prev.map(b => b.id === id ? { ...b, balance: b.balance + 10000 } : b))
  }

  const handleCreateBankroll = () => {
    setBankrolls(prev => [...prev, { id: Date.now().toString(), name: 'New Bankroll', balance: 10000 }])
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-5xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
            <PieChart className="text-blue-400" /> My Action Profile
          </h1>
          <p className="text-gray-400 mt-1">Manage your virtual bankrolls and view your betting analytics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bankrolls Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2"><Wallet size={20} /> Virtual Bankrolls</h2>
            <button 
              onClick={handleCreateBankroll}
              className="p-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {bankrolls.map(br => (
              <div key={br.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 transition-all hover:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-gray-300">{br.name}</div>
                  <div className="text-xs text-gray-500">ID: {br.id.substring(0, 4)}</div>
                </div>
                <div className="text-2xl font-black text-green-400 mb-4">
                  {br.balance.toLocaleString()} <span className="text-sm font-medium text-gray-500">Coins</span>
                </div>
                {br.balance < 1000 && (
                  <button 
                    onClick={() => handleRefill(br.id)}
                    className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-sm font-bold text-gray-300 rounded-lg transition-colors"
                  >
                    Refill 10,000 Coins
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Analytics & History Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><BarChart2 size={20} /> Universal Pick Analytics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-400 mb-1">Total Picks</div>
              <div className="text-2xl font-bold">142</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-400 mb-1">Win %</div>
              <div className="text-2xl font-bold text-green-400">58.4%</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-400 mb-1">Overall ROI</div>
              <div className="text-2xl font-bold text-green-400">+14.2%</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-400 mb-1">Best Market</div>
              <div className="text-sm font-bold text-blue-400 mt-1">Passing Yds</div>
              <div className="text-xs text-gray-500">68% WR</div>
            </div>
          </div>

          <h3 className="text-lg font-bold flex items-center gap-2 mt-8 mb-4"><History size={18} /> Recent Action</h3>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-950 border-b border-gray-800">
                <tr>
                  <th className="p-4 text-gray-400 font-medium">Date</th>
                  <th className="p-4 text-gray-400 font-medium">Pick</th>
                  <th className="p-4 text-gray-400 font-medium text-right">Wager</th>
                  <th className="p-4 text-gray-400 font-medium text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[
                  { date: 'Today', pick: 'Patrick Mahomes OVER 265.5 Pass Yds', wager: 5000, result: 'WON', payout: '+4545' },
                  { date: 'Yesterday', pick: 'Travis Kelce UNDER 65.5 Rec Yds', wager: 2000, result: 'LOST', payout: '-2000' },
                  { date: 'Yesterday', pick: 'KC Chiefs -3.5', wager: 10000, result: 'PENDING', payout: '--' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-800/20">
                    <td className="p-4 text-gray-400">{row.date}</td>
                    <td className="p-4 font-medium">{row.pick}</td>
                    <td className="p-4 text-right">{row.wager.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      {row.result === 'WON' ? <span className="text-green-400 font-bold">{row.payout}</span> :
                       row.result === 'LOST' ? <span className="text-red-400 font-bold">{row.payout}</span> :
                       <span className="text-yellow-400 font-bold">Pending</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
