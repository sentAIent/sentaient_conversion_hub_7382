import React, { useState, useEffect } from 'react';
import { Calendar, Search, ArrowUpRight, ArrowDownRight, RefreshCw } from '@/components/icons';
import { SosRecord } from '@/types/models';

export default function StrengthOfSchedule() {
  const [sosData, setSosData] = useState<SosRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = selectedPosition !== 'ALL' 
          ? `/api/sos?position=${selectedPosition}`
          : '/api/sos';
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && json.data) {
          setSosData(json.data);
        }
      } catch (err) {
        console.error("Error fetching SoS data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedPosition]);

  const filteredData = sosData.filter(record => 
    record.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Strength of Schedule (SoS) Analyzer</h2>
        <p className="text-sm text-gray-400 mt-1">
          Evaluate how player schedules change year-over-year. Compare historical difficulty vs upcoming adjusted defensive metrics to identify major values.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Filters */}
        <div className="flex bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl gap-1 w-full sm:w-auto">
          {['ALL', 'QB', 'RB', 'WR', 'TE'].map(pos => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedPosition === pos 
                  ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-60 text-gray-500 text-sm gap-2">
          <RefreshCw size={16} className="animate-spin text-blue-400" /> Loading Strength of Schedule data...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="p-12 border border-white/5 bg-white/[0.02] rounded-xl text-center text-gray-500 text-sm">
          No records match your filters.
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider">Player</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Team</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Pos</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Last Year Rank</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Last Year SoS</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Upcoming SoS</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Season Heatmap</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-center">Adj. Def Score</th>
                  <th className="p-4 text-gray-400 font-bold uppercase tracking-wider text-right">Schedule Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredData.map((row, idx) => {
                  const isSofter = row.schedule_delta.includes('Softer') || row.schedule_delta.includes('Neutral');
                  const deltaColor = isSofter ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-orange-400 bg-orange-500/10 border-orange-500/20';
                  
                  return (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white text-sm">{row.player_name}</td>
                      <td className="p-4 text-center font-mono text-gray-400">{row.team}</td>
                      <td className="p-4 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border ${
                          row.position === 'QB' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                          row.position === 'RB' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                          row.position === 'WR' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                          'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                        }`}>
                          {row.position}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-gray-300">{row.historical_player_rank}</td>
                      <td className="p-4 text-center text-gray-400">#{row.historical_sos_rank} <span className="text-[10px] text-gray-600">(1=Easiest)</span></td>
                      <td className="p-4 text-center font-bold text-blue-400">#{row.upcoming_sos_rank} <span className="text-[10px] text-blue-500/70">(1=Easiest)</span></td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-0.5">
                          {row.weekly_matchups?.map((matchup) => {
                            const bg = matchup.difficulty === 'hard' ? 'bg-red-500' :
                                       matchup.difficulty === 'neutral' ? 'bg-yellow-500' :
                                       'bg-green-500';
                            return (
                              <div
                                key={matchup.week}
                                className={`w-3 h-4 sm:w-4 sm:h-5 rounded-sm ${bg} opacity-80 hover:opacity-100 hover:scale-125 transition-transform cursor-pointer relative group`}
                              >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 border border-gray-700 rounded shadow-xl text-[10px] text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                                  <div className="font-bold text-gray-300 mb-0.5">Week {matchup.week}</div>
                                  <div>{matchup.is_home ? 'vs' : '@'} {matchup.opponent}</div>
                                  <div className="text-gray-400">Def Rank: #{matchup.opponent_rank}</div>
                                </div>
                              </div>
                            );
                          }) || <span className="text-[10px] text-gray-600">No data</span>}
                        </div>
                      </td>
                      <td className="p-4 text-center text-white font-semibold">
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{row.upcoming_adjusted_score.toFixed(1)}</span>
                          <span className="text-[10px] text-gray-500">/ 100</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${deltaColor}`}>
                          {isSofter ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                          {row.schedule_delta}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
