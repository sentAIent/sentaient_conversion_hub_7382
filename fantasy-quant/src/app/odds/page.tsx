'use client'

import { useState } from 'react'
import { Trophy, Shield, Zap, CircleDollarSign } from 'lucide-react'
import { useBetSlip } from '@/components/social/BetSlipContext'
import Link from 'next/link'

const GAMES = [
  { id: 'g1', home: 'Kansas City Chiefs', away: 'Baltimore Ravens', spread: -3.0, homeMoneyline: -150, awayMoneyline: 130, total: 46.5 },
  { id: 'g2', home: 'Philadelphia Eagles', away: 'Green Bay Packers', spread: -2.5, homeMoneyline: -135, awayMoneyline: 115, total: 48.5 },
  { id: 'g3', home: 'Detroit Lions', away: 'Los Angeles Rams', spread: -3.5, homeMoneyline: -175, awayMoneyline: 150, total: 51.0 },
]

const SUPERBOWL_FUTURES = [
  { team: 'San Francisco 49ers', odds: +500 },
  { team: 'Kansas City Chiefs', odds: +550 },
  { team: 'Baltimore Ravens', odds: +950 },
  { team: 'Detroit Lions', odds: +1200 },
  { team: 'Cincinnati Bengals', odds: +1300 },
]

const MOCK_PROPS = [
  { id: 'p1', player: 'Patrick Mahomes', market: 'passing_yds', over: 265.5, under: 265.5, overOdds: -115, underOdds: -115 },
  { id: 'p2', player: 'Christian McCaffrey', market: 'rush_yds', over: 85.5, under: 85.5, overOdds: -110, underOdds: -110 },
  { id: 'p3', player: 'Tyreek Hill', market: 'rec_yds', over: 92.5, under: 92.5, overOdds: -120, underOdds: -110 },
  { id: 'p4', player: 'Lamar Jackson', market: 'rush_yds', over: 55.5, under: 55.5, overOdds: -115, underOdds: -115 },
]

export default function OddsPage() {
  const [activeTab, setActiveTab] = useState<'games' | 'futures' | 'props'>('games')
  const [liveGames, setLiveGames] = useState<typeof GAMES>(GAMES)
  const [loading, setLoading] = useState(false)
  const { openBetSlip } = useBetSlip()

  // Live fetching architecture
  // In a real app, you would fetch from /api/odds which securely calls The-Odds-API
  // using process.env.NEXT_PUBLIC_ODDS_API_KEY
  /*
  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/odds')
        const data = await res.json()
        if (data.games) setLiveGames(data.games)
      } catch (e) {
        console.error('Failed to fetch live odds, falling back to mock data')
      } finally {
        setLoading(false)
      }
    }
    fetchOdds()
  }, [])
  */

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-gray-950/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold cursor-pointer">
            FQ
          </Link>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
            <CircleDollarSign size={20} className="text-emerald-400" /> Odds & Betting
          </h1>
        </div>
        <div className="flex gap-4">
          <Link href="/social" className="text-gray-400 hover:text-white font-semibold text-sm transition-colors">Social Feed</Link>
          <Link href="/profile" className="text-gray-400 hover:text-white font-semibold text-sm transition-colors">My Bankroll</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1 bg-gray-900 border border-gray-800 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('games')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'games' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap size={16} /> Game Lines
          </button>
          <button 
            onClick={() => setActiveTab('props')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'props' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CircleDollarSign size={16} /> Player Props
          </button>
          <button 
            onClick={() => setActiveTab('futures')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'futures' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy size={16} /> Futures
          </button>
        </div>

        {activeTab === 'games' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">NFL Week 1 Lines</h2>
            
            <div className="space-y-4">
              {GAMES.map(game => (
                <div key={game.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-3 bg-gray-800/50 border-b border-gray-800 flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <span>Teams</span>
                    <div className="flex gap-12 pr-8">
                      <span className="w-20 text-center">Spread</span>
                      <span className="w-20 text-center">Total</span>
                      <span className="w-20 text-center">Moneyline</span>
                    </div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="p-4 border-b border-gray-800/50 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="font-bold text-lg text-gray-300">{game.away} <span className="text-xs font-normal text-gray-500 ml-2">Away</span></div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => openBetSlip({ market: 'spread', targetName: game.away, selection: 'Spread', line: game.spread > 0 ? -game.spread : Math.abs(game.spread), odds: -110 })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">{game.spread > 0 ? -game.spread : '+' + Math.abs(game.spread)}</span>
                        <span className="text-xs text-gray-500">-110</span>
                      </button>
                      <button 
                        onClick={() => openBetSlip({ market: 'total', targetName: `${game.away} @ ${game.home}`, selection: 'OVER', line: game.total, odds: -110 })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">O {game.total}</span>
                        <span className="text-xs text-gray-500">-110</span>
                      </button>
                      <button 
                        onClick={() => openBetSlip({ market: 'moneyline', targetName: game.away, selection: 'Moneyline', line: null, odds: game.awayMoneyline })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">{game.awayMoneyline > 0 ? '+' : ''}{game.awayMoneyline}</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Home Team */}
                  <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="font-bold text-lg text-white">{game.home} <span className="text-xs font-normal text-gray-500 ml-2">Home</span></div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => openBetSlip({ market: 'spread', targetName: game.home, selection: 'Spread', line: game.spread, odds: -110 })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">{game.spread > 0 ? '+' : ''}{game.spread}</span>
                        <span className="text-xs text-gray-500">-110</span>
                      </button>
                      <button 
                        onClick={() => openBetSlip({ market: 'total', targetName: `${game.away} @ ${game.home}`, selection: 'UNDER', line: game.total, odds: -110 })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">U {game.total}</span>
                        <span className="text-xs text-gray-500">-110</span>
                      </button>
                      <button 
                        onClick={() => openBetSlip({ market: 'moneyline', targetName: game.home, selection: 'Moneyline', line: null, odds: game.homeMoneyline })}
                        className="w-20 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                      >
                        <span className="text-emerald-400">{game.homeMoneyline > 0 ? '+' : ''}{game.homeMoneyline}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'futures' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2"><Shield className="text-blue-500" /> Super Bowl LIX Winner</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUPERBOWL_FUTURES.map(future => (
                <div key={future.team} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-700 transition-colors">
                  <div className="font-bold text-gray-200">{future.team}</div>
                  <button 
                    onClick={() => openBetSlip({ market: 'superbowl_winner', targetName: future.team, selection: 'To Win', line: null, odds: future.odds })}
                    className="px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm font-bold text-emerald-400 hover:border-emerald-500/50 transition-colors"
                  >
                    {future.odds > 0 ? '+' : ''}{future.odds}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-6 mt-8 border border-dashed border-gray-800 rounded-xl text-center text-gray-500">
              More futures (Division Winners, MVP, OPOY) coming soon.
            </div>
          </div>
        )}

        {activeTab === 'props' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2"><CircleDollarSign className="text-emerald-500" /> Player Props</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {MOCK_PROPS.map(prop => (
                <div key={prop.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-800 bg-gray-800/20 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg text-white">{prop.player}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{prop.market.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="p-4 flex gap-4">
                    <button 
                      onClick={() => openBetSlip({ market: prop.market, targetName: prop.player, selection: 'OVER', line: prop.over, odds: prop.overOdds })}
                      className="flex-1 py-3 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                    >
                      <span className="text-gray-400 mb-1">OVER</span>
                      <span className="text-emerald-400 text-lg font-bold">{prop.over}</span>
                      <span className="text-xs text-gray-500 mt-1">{prop.overOdds > 0 ? '+' : ''}{prop.overOdds}</span>
                    </button>
                    <button 
                      onClick={() => openBetSlip({ market: prop.market, targetName: prop.player, selection: 'UNDER', line: prop.under, odds: prop.underOdds })}
                      className="flex-1 py-3 bg-gray-950 border border-gray-800 rounded-lg text-sm font-medium hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center"
                    >
                      <span className="text-gray-400 mb-1">UNDER</span>
                      <span className="text-emerald-400 text-lg font-bold">{prop.under}</span>
                      <span className="text-xs text-gray-500 mt-1">{prop.underOdds > 0 ? '+' : ''}{prop.underOdds}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
