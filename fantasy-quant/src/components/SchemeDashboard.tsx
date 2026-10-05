'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, Loader2, AlertTriangle, Shield, Sword } from '@/components/icons';
import { motion } from 'framer-motion';

interface SchemeStat {
  coverage_type: string;
  play_type: string;
  plays: number;
  success_rate: number;
  epa_per_play: number;
  yards_per_play: number;
}

interface Coach {
  coach_name: string;
  team: string;
  season: number;
  role: string;
}

export default function SchemeDashboard() {
  const [searchInput, setSearchInput] = useState('Ben Johnson');
  const [activeCoach, setActiveCoach] = useState('Ben Johnson');
  const [season, setSeason] = useState('2023');
  
  const [coach, setCoach] = useState<Coach | null>(null);
  const [stats, setStats] = useState<SchemeStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchemeData = useCallback(async (name: string, s: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/schemes?coachName=${encodeURIComponent(name)}&season=${s}`);
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch scheme data');
      }
      
      setCoach(json.coach);
      setStats(json.stats || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchemeData(activeCoach, season);
  }, [activeCoach, season, fetchSchemeData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveCoach(searchInput.trim());
    }
  };

  const passStats = stats.filter(s => s.play_type === 'pass').sort((a, b) => b.plays - a.plays);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl shadow-2xl z-50 min-w-[180px]">
          <div className="font-bold text-white mb-2 text-xs uppercase tracking-wider">{data.coverage_type}</div>
          <div className="flex justify-between items-center gap-4 text-gray-400 text-sm mb-1.5">
            <span>Success Rate:</span>
            <span className={`font-bold ${data.success_rate > 50 ? 'text-indigo-400' : 'text-rose-400'}`}>{data.success_rate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-gray-400 text-sm mb-1.5">
            <span>Plays:</span>
            <span className="text-white">{data.plays}</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-gray-400 text-sm">
            <span>EPA/Play:</span>
            <span className="text-white font-mono">{data.epa_per_play.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="flex flex-col h-full min-h-screen bg-[#050505] text-[#E0E0E0] p-6 lg:p-12 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header Area */}
        <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800/60 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Scheme Analysis</h1>
            </div>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed mt-4">
              Coordinator tendencies, coverage success rates, and playcalling distributions.
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search coach (e.g. Ben Johnson)"
                className="w-full sm:w-64 pl-11 pr-4 py-3 bg-[#111111] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 shadow-inner placeholder:text-gray-600 transition-shadow"
              />
            </div>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="px-4 py-3 bg-[#111111] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 appearance-none cursor-pointer shadow-inner transition-shadow"
            >
              <option value="2023">2023 Season</option>
              <option value="2022">2022 Season</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
            >
              Analyze
            </button>
          </form>
        </motion.header>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="w-full">
          {loading ? (
            <div className="h-64 flex items-center justify-center bg-[#111111] border border-gray-800 rounded-2xl shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center bg-[#111111] border border-gray-800 rounded-2xl shadow-xl">
              <div className="max-w-md p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex flex-col items-center text-center gap-3">
                <AlertTriangle className="w-8 h-8 opacity-80" />
                <div>
                  <h3 className="font-bold text-rose-300 mb-1">Analysis Error</h3>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Coach Meta */}
              {coach && (
                <div className="flex items-center gap-5 bg-[#111111] border border-gray-800 p-5 rounded-2xl shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl font-bold text-indigo-400">
                    {coach.coach_name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{coach.coach_name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mt-1">
                      <span className="text-gray-300">{coach.team}</span>
                      <span>&bull;</span>
                      <span>{coach.role}</span>
                      <span>&bull;</span>
                      <span>{coach.season}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Pass Success vs Coverage */}
                <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/60">
                    <h3 className="font-semibold text-white tracking-wide">Pass Success Rate vs Coverage</h3>
                    <div className="p-2 rounded-lg bg-gray-800/50">
                      <Sword className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>
                  {passStats.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={passStats} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#222" />
                          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                          <YAxis dataKey="coverage_type" type="category" tick={{ fill: '#888', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
                          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.02 }} />
                          <Bar dataKey="success_rate" radius={[0, 4, 4, 0]}>
                            {passStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.success_rate > 50 ? '#6366f1' : '#f43f5e'} className="transition-all duration-300" />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">No pass scheme data found</div>
                  )}
                </div>

                {/* Data Table */}
                <div className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                  <div className="p-6 pb-4 border-b border-gray-800/60">
                    <h3 className="font-semibold text-white tracking-wide">Coverage Breakdown (Pass)</h3>
                  </div>
                  <div className="overflow-x-auto flex-1 p-2">
                    <table className="w-full text-sm text-right">
                      <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                          <th className="text-left py-3 px-4">Coverage</th>
                          <th className="py-3 px-4">Plays</th>
                          <th className="py-3 px-4">Success %</th>
                          <th className="py-3 px-4">EPA/Play</th>
                          <th className="py-3 px-4">Yds/Play</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60">
                        {passStats.map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-4 text-left font-medium text-white">{row.coverage_type}</td>
                            <td className="py-4 px-4 text-gray-400">{row.plays}</td>
                            <td className={`py-4 px-4 font-semibold ${row.success_rate > 50 ? 'text-indigo-400' : 'text-rose-400'}`}>
                              {row.success_rate.toFixed(1)}%
                            </td>
                            <td className="py-4 px-4 font-mono text-gray-300">{row.epa_per_play.toFixed(2)}</td>
                            <td className="py-4 px-4 text-gray-300">{row.yards_per_play.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
