'use client';

import React, { useState, useEffect } from 'react';
import { 
  History, Trophy, TrendingUp, RefreshCw, BarChart3, AlertCircle, 
  HelpCircle, ArrowRight, UserCheck, Play, Sparkles, AlertTriangle
} from '@/components/icons';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { DraftPick, AlternateOption, WeeklyMatchup } from '@/types/models';

export default function RetroPage() {
  const [initialPicks, setInitialPicks] = useState<DraftPick[]>([]);
  const [alternatives, setAlternatives] = useState<Record<number, AlternateOption[]>>({});
  const [swappedPicks, setSwappedPicks] = useState<Record<number, string>>({});
  
  // Simulation results
  const [baseline, setBaseline] = useState<any>(null);
  const [simulated, setSimulated] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load initial baseline
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch('/api/retro/simulator');
        const json = await res.json();
        if (json.success) {
          setInitialPicks(json.initialDraftPicks);
          setAlternatives(json.roundAlternatives);
          setBaseline(json.baseline);
          setSimulated(json.baseline);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle swapping player in a round
  const handleSwap = async (round: number, playerName: string) => {
    const newSwaps = { ...swappedPicks };
    const originalPick = initialPicks.find(p => p.round === round);
    
    if (playerName === originalPick?.player) {
      delete newSwaps[round];
    } else {
      newSwaps[round] = playerName;
    }
    setSwappedPicks(newSwaps);

    // Call simulator backend to recalculate H2H scores
    try {
      const res = await fetch('/api/retro/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ swappedPicks: newSwaps })
      });
      const json = await res.json();
      if (json.success && json.simulation) {
        setSimulated(json.simulation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetSwaps = () => {
    setSwappedPicks({});
    setSimulated(baseline);
  };

  if (loading || !baseline || !simulated) {
    return (
      <div className="min-h-screen bg-[#070809] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <p className="text-gray-400 text-sm font-semibold">Simulating Historical Seasons...</p>
        </div>
      </div>
    );
  }

  // Count active swaps
  const activeSwapsCount = Object.keys(swappedPicks).length;

  // Chart data
  const chartData = simulated.matchups.map((m: WeeklyMatchup) => ({
    name: `Wk ${m.week}`,
    "Your Actual Score": baseline.matchups[m.week - 1].simulatedUserScore,
    "Your Simulated Score": m.simulatedUserScore,
    "Opponent Score": m.opponentScore
  }));

  // Compare totals
  const totalDiff = +(simulated.totalPoints - baseline.totalPoints).toFixed(1);
  const ppgDiff = +(simulated.ppg - baseline.ppg).toFixed(1);

  return (
    <div className="min-h-screen bg-[#070809] text-white p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
            <History className="text-blue-400" /> Draft Retrospective & "What-If" Simulator
          </h1>
          <p className="text-gray-400 mt-1">Plug-and-play alternate draft picks from last year's draft to simulate retrospectively how your roster would have performed.</p>
        </div>

        {activeSwapsCount > 0 && (
          <button 
            onClick={resetSwaps}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white rounded-xl text-xs font-black transition-all"
          >
            <RefreshCw size={14} /> Reset Roster to Baseline
          </button>
        )}
      </div>

      {/* Simulator Metrics Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Metric 1: Standings shift */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-950 border border-white/[0.05] rounded-2xl p-5 relative overflow-hidden space-y-2">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">H2H Record Outlook</div>
          <div className="flex items-baseline gap-3">
            <div className="text-3xl font-black text-gray-400 font-mono">{baseline.record}</div>
            <ArrowRight size={18} className="text-gray-600" />
            <div className="text-3xl font-black text-white font-mono bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{simulated.record}</div>
          </div>
          <div className="text-xs text-gray-400">Regular season weekly matchups.</div>
        </div>

        {/* Metric 2: Playoffs status */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-950 border border-white/[0.05] rounded-2xl p-5 relative overflow-hidden space-y-2">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Playoff Finish</div>
          <div className="text-xl font-black text-indigo-400 truncate flex items-center gap-1.5">
            <Trophy size={18} className="text-indigo-400 shrink-0" />
            {simulated.playoffStatus}
          </div>
          <div className="text-xs text-gray-500">
            Actual: <span className="font-semibold text-gray-400">{baseline.playoffStatus}</span>
          </div>
        </div>

        {/* Metric 3: Total Points */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-950 border border-white/[0.05] rounded-2xl p-5 relative overflow-hidden space-y-2">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Total Season Points</div>
          <div className="text-3xl font-black text-white font-mono">{simulated.totalPoints} fpts</div>
          <div className="text-xs flex items-center gap-1">
            {totalDiff >= 0 ? (
              <span className="text-emerald-400 font-bold">+{totalDiff} fpts</span>
            ) : (
              <span className="text-rose-400 font-bold">{totalDiff} fpts</span>
            )}
            <span className="text-gray-600">vs actual draft picks</span>
          </div>
        </div>

        {/* Metric 4: PPG */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-950 border border-white/[0.05] rounded-2xl p-5 relative overflow-hidden space-y-2">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Points Per Game (PPG)</div>
          <div className="text-3xl font-black text-white font-mono">{simulated.ppg} PPG</div>
          <div className="text-xs flex items-center gap-1">
            {ppgDiff >= 0 ? (
              <span className="text-emerald-400 font-bold">+{ppgDiff} PPG</span>
            ) : (
              <span className="text-rose-400 font-bold">{ppgDiff} PPG</span>
            )}
            <span className="text-gray-600">avg weekly variance</span>
          </div>
        </div>

      </div>

      {/* Main split: Left side Draft Board, Right side Chart & weekly log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Draft retro picks list (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <UserCheck size={18} className="text-blue-400" /> Draft Round Swapper
          </h2>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {initialPicks.map((pick) => {
              const currentSwappedName = swappedPicks[pick.round];
              const isSwapped = !!currentSwappedName;
              
              // Get active stats (either original or swapped option)
              let activePlayerName = pick.player;
              let activePts = pick.points;
              let activePpg = pick.ppg;

              if (isSwapped) {
                const alt = alternatives[pick.round]?.find(a => a.player === currentSwappedName);
                if (alt) {
                  activePlayerName = alt.player;
                  activePts = alt.points;
                  activePpg = alt.ppg;
                }
              }

              const hasAlts = alternatives[pick.round] && alternatives[pick.round].length > 0;

              return (
                <div key={pick.round} className={`p-4 rounded-xl border transition-all ${
                  isSwapped 
                    ? 'bg-purple-950/20 border-purple-500/30' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] bg-white/[0.06] text-gray-400 px-2 py-0.5 rounded font-mono">
                        Round {pick.round} • Pick {pick.pick} (ADP {pick.adp})
                      </span>
                      <h3 className="text-base font-black text-white mt-1.5 flex items-center gap-1.5">
                        {activePlayerName}
                        {isSwapped && <Sparkles size={12} className="text-purple-400 animate-pulse" />}
                      </h3>
                      <div className="text-[11px] text-gray-500">
                        Position: <span className="text-gray-400 font-semibold">{pick.position}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-white">{activePts} fpts</div>
                      <div className="text-[10px] text-gray-500">{activePpg} PPG</div>
                    </div>
                  </div>

                  {/* Swap select controller */}
                  {hasAlts && (
                    <div className="mt-3.5 pt-3.5 border-t border-white/[0.04] flex items-center justify-between gap-4">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Swap Selection:</label>
                      <select
                        value={currentSwappedName || pick.player}
                        onChange={(e) => handleSwap(pick.round, e.target.value)}
                        className="bg-[#0f1115] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500/50 text-gray-300"
                      >
                        <option value={pick.player}>{pick.player} (Original)</option>
                        {alternatives[pick.round].map((alt) => (
                          <option key={alt.player} value={alt.player}>
                            {alt.player} (+{+(alt.points - pick.points).toFixed(0)} fpts)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {!hasAlts && (
                    <div className="mt-2 text-[9px] text-gray-600 italic">No alternative high-value options available in this round.</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive chart & Weekly log (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Weekly Performance comparison chart */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-400" /> Weekly Score Comparison
            </h3>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#555" fontSize={10} />
                  <YAxis stroke="#555" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Your Actual Score" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="Your Simulated Score" stroke="#a855f7" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Opponent Score" stroke="#ff0055" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Results Ledger List */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Play size={16} className="text-emerald-400" /> Weekly Matchups Ledger
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulated.matchups.map((m: WeeklyMatchup) => {
                const isWon = m.simulatedUserScore > m.opponentScore;
                const wasActualWon = m.actualUserScore > m.opponentScore;

                return (
                  <div key={m.week} className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white">Week {m.week}</div>
                      <div className="text-[10px] text-gray-500">vs {m.opponent}</div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-mono">
                        <span className="text-gray-300 font-bold">{m.simulatedUserScore}</span>
                        <span className="text-gray-600 mx-1">vs</span>
                        <span className="text-gray-500">{m.opponentScore}</span>
                      </div>
                      <div className="flex gap-1.5 justify-end">
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase ${
                          isWon ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {isWon ? 'Win' : 'Loss'}
                        </span>
                        {isWon !== wasActualWon && (
                          <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded">
                            {isWon ? '▲ Swapped Win' : '▼ Swapped Loss'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Playoff Matchups List (If qualified) */}
          {simulated.playoffMatchups && simulated.playoffMatchups.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-purple-400 flex items-center gap-2">
                <Trophy size={16} className="text-purple-400" /> Playoff Bracket Simulation
              </h3>

              <div className="space-y-3">
                {simulated.playoffMatchups.map((m: WeeklyMatchup, i: number) => {
                  const isWon = m.simulatedUserScore > m.opponentScore;
                  return (
                    <div key={i} className="p-4 bg-purple-950/5 border border-purple-500/15 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-white uppercase tracking-wider text-[10px] text-purple-300">
                          {m.opponent}
                        </div>
                        <div className="text-gray-500">Week {m.week} Playoff Matchup</div>
                      </div>

                      <div className="text-right space-y-1 font-mono">
                        <div>
                          <span className="text-white font-bold">{m.simulatedUserScore}</span>
                          <span className="text-gray-600 mx-1">vs</span>
                          <span className="text-gray-400">{m.opponentScore}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase inline-block ${
                          isWon ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {isWon ? 'Advanced' : 'Eliminated'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
