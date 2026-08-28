'use client'

import { useState, useEffect } from 'react'
import { Trophy, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock, Copy, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useBetSlip } from '@/components/social/BetSlipContext'
import { createClient } from '@/utils/supabase/client'

type FeedItem = {
  id: string
  user: string
  market: string
  target: string
  selection: string
  line: number | null
  wager: number
  timeAgo: string
  result: 'won' | 'lost' | 'pending'
}

const MOCK_FEED: FeedItem[] = [
  { id: '1', user: 'SharkBait_88', market: 'passing_yds', target: 'Patrick Mahomes', selection: 'OVER', line: 265.5, wager: 5000, timeAgo: '2m ago', result: 'pending' },
  { id: '2', user: 'DFS_King', market: 'spread', target: 'KC Chiefs', selection: 'HOME', line: -3.5, wager: 10000, timeAgo: '5m ago', result: 'pending' },
  { id: '3', user: 'ValueHunter', market: 'rec_yds', target: 'Travis Kelce', selection: 'UNDER', line: 65.5, wager: 1500, timeAgo: '12m ago', result: 'pending' },
  { id: '4', user: 'PropGod', market: 'anytime_td', target: 'Christian McCaffrey', selection: 'YES', line: null, wager: 25000, timeAgo: '2h ago', result: 'won' },
  { id: '5', user: 'GridironGuru', market: 'spread', target: 'Las Vegas Raiders', selection: 'AWAY', line: +7.5, wager: 2000, timeAgo: '4h ago', result: 'lost' },
]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed')
  const [feed, setFeed] = useState<FeedItem[]>(MOCK_FEED)
  const { openBetSlip } = useBetSlip()
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to new paper bets
    const channel = supabase
      .channel('public:paper_bets')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'paper_bets' },
        (payload) => {
          const newBet = payload.new;
          // Format into our FeedItem structure
          const feedItem: FeedItem = {
            id: newBet.id,
            user: newBet.user_id.substring(0, 8), // Masked for demo
            market: newBet.market || 'Unknown',
            target: newBet.target_name || 'Unknown',
            selection: newBet.selection || 'OVER',
            line: newBet.line,
            wager: newBet.wager_amount,
            timeAgo: 'Just now',
            result: 'pending'
          }
          
          setFeed(prev => [feedItem, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])


  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
            <Trophy className="text-blue-400" /> Sentaient Social
          </h1>
          <p className="text-gray-400 mt-1">Paper bet, track your ROI, and compete with friends.</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-900 border border-gray-800 rounded-xl">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'feed' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            Live Feed
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'leaderboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Global Action
          </div>

          {feed.map(item => (
            <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex gap-4 hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-400 flex-shrink-0">
                {item.user.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-blue-400">{item.user}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> {item.timeAgo}
                  </div>
                </div>
                <div className="text-gray-300">
                  Placed <span className="font-bold text-white">{item.wager.toLocaleString()} Coins</span> on
                </div>
                <div className="mt-2 inline-flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm">
                  <span className="font-bold text-white">{item.target}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{item.market.replace('_', ' ').toUpperCase()}</span>
                  <span className={`font-bold ${item.selection === 'OVER' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.selection} {item.line}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between ml-auto pl-4 border-l border-gray-800">
                {item.result === 'pending' ? (
                  <button 
                    onClick={() => openBetSlip({
                      market: item.market,
                      targetName: item.target,
                      selection: item.selection,
                      line: item.line,
                      odds: -110 // Mock standard odds
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Copy size={12} /> Tail Bet
                  </button>
                ) : item.result === 'won' ? (
                  <div className="flex items-center gap-1 text-green-400 text-xs font-bold px-2 py-1 bg-green-400/10 rounded-md">
                    <CheckCircle size={12} /> WON
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-400 text-xs font-bold px-2 py-1 bg-red-400/10 rounded-md">
                    <XCircle size={12} /> LOST
                  </div>
                )}
                
                {item.result !== 'pending' && (
                  <div className={`text-xs font-bold mt-2 ${item.result === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.result === 'won' ? `+${(item.wager * 0.91).toFixed(0)}` : `-${item.wager}`} Coins
                  </div>
                )}
              </div>
            </div>
          ))}

          <button className="w-full py-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors font-semibold">
            Load More Action
          </button>
          
          <div className="text-center pt-4">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Simulated Paper Trading Only</p>
            <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">No real money is wagered. "Coins" hold no real-world cash value and cannot be redeemed.</p>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-blue-900/30 rounded-xl p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-400 mb-1">Your Rank</div>
              <div className="text-3xl font-black text-white">#42</div>
              <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><ArrowUpRight size={12} /> +3 this week</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-400 mb-1">Total ROI</div>
              <div className="text-3xl font-black text-green-400">+14.2%</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-400 mb-1">Total Winnings</div>
              <div className="text-3xl font-black text-white">12,450</div>
              <div className="text-xs text-gray-500 mt-1">FantasyCoins</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 border-b border-gray-800">
                <tr>
                  <th className="p-4 text-gray-400 font-medium">Rank</th>
                  <th className="p-4 text-gray-400 font-medium">User</th>
                  <th className="p-4 text-gray-400 font-medium text-right">Bankroll</th>
                  <th className="p-4 text-gray-400 font-medium text-right hidden md:table-cell">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[
                  { rank: 1, user: 'WhaleTracker', bankroll: 845000, roi: '+45.2%' },
                  { rank: 2, user: 'PropGod', bankroll: 312000, roi: '+28.4%' },
                  { rank: 3, user: 'GridironGuru', bankroll: 185000, roi: '+19.1%' },
                ].map((u) => (
                  <tr key={u.rank} className="hover:bg-gray-800/20 transition-colors">
                    <td className="p-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        u.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                        u.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                        'bg-orange-600/20 text-orange-500'
                      }`}>
                        #{u.rank}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">{u.user}</td>
                    <td className="p-4 text-right font-mono text-green-400">{u.bankroll.toLocaleString()}</td>
                    <td className="p-4 text-right hidden md:table-cell text-green-400">{u.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
