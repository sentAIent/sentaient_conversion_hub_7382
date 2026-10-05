'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Shield, TrendingUp, TrendingDown, ArrowRight, Activity, Database } from '@/components/icons';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

export default function PositionalSOSPage() {
  const [data, setData] = useState<any[]>([]);
  const [position, setPosition] = useState('QB');
  const [metric, setMetric] = useState<'projected_fpa' | 'historic_fpa'>('projected_fpa');

  useEffect(() => {
    fetch('/data/positional_sos.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, []);

  const chartData = useMemo(() => {
    if (!data.length) return [];
    
    // Filter by selected position
    let filtered = data.filter(d => d.position === position);
    
    // Sort so easiest matchups (most points allowed) are rank 1
    filtered = filtered.sort((a, b) => b[metric] - a[metric]);
    
    return filtered.map((d, index) => ({
      ...d,
      rank: index + 1,
      // Calculate delta to show if it got easier or harder
      delta: d.projected_fpa - d.historic_fpa
    }));
  }, [data, position, metric]);

  const averageFPA = useMemo(() => {
    if (!chartData.length) return 0;
    const sum = chartData.reduce((acc, curr) => acc + curr[metric], 0);
    return sum / chartData.length;
  }, [chartData, metric]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl shadow-2xl z-50 min-w-[200px]">
          <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            VS {data.team} Defense
          </div>
          <div className="flex justify-between items-center gap-4 text-gray-400 text-sm mb-1.5">
            <span>Projected FPA:</span>
            <span className="text-white font-bold">{data.projected_fpa.toFixed(2)} pts</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-gray-500 text-sm mb-3">
            <span>Historic 2026 FPA:</span>
            <span className="text-gray-400">{data.historic_fpa.toFixed(2)} pts</span>
          </div>
          <div className="flex justify-between items-center gap-4 pt-3 border-t border-gray-800/60 text-sm">
            <span className="text-gray-500">Coaching Impact:</span>
            <span className={`font-semibold ${data.delta > 0 ? 'text-emerald-400' : data.delta < 0 ? 'text-rose-400' : 'text-gray-600'}`}>
              {data.delta > 0 ? '+' : ''}{data.delta.toFixed(2)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-[#E0E0E0] p-6 lg:p-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800/60 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Positional Matchup SOS</h1>
            </div>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed mt-4">
              Analyze Fantasy Points Allowed (FPA) for any position across the NFL. 
              Switch between raw historical data and our proprietary Projected FPA, which adjusts for 2026 defensive coaching changes and roster turnover.
            </p>
          </div>
        </motion.header>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center bg-[#111111] border border-gray-800 rounded-2xl p-2 gap-4">
          <div className="flex bg-[#0a0a0a] p-1 rounded-xl w-full md:w-auto">
            {['QB', 'RB', 'WR', 'TE'].map(pos => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold tracking-wide rounded-lg transition-all ${
                  position === pos ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full md:w-auto px-2 pb-2 md:px-0 md:pb-0 md:pr-2">
            <button
              onClick={() => setMetric('projected_fpa')}
              className={`flex-1 md:flex-none px-4 py-2.5 text-xs font-semibold uppercase rounded-lg transition-all flex items-center justify-center gap-2 ${
                metric === 'projected_fpa' ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <Activity className="w-4 h-4" /> Projected
            </button>
            <button
              onClick={() => setMetric('historic_fpa')}
              className={`flex-1 md:flex-none px-4 py-2.5 text-xs font-semibold uppercase rounded-lg transition-all flex items-center justify-center gap-2 ${
                metric === 'historic_fpa' ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <Database className="w-4 h-4" /> Historic
            </button>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-gray-800 rounded-2xl p-6 pt-8 relative shadow-xl">
          <div className="absolute top-6 left-8 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Fantasy Points Allowed to {position}s <span className="lowercase font-normal ml-1">(League Avg: {averageFPA.toFixed(1)})</span>
          </div>
          <div className="absolute top-6 right-8 text-xs text-emerald-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <TrendingUp size={14} /> Easiest Matchups
          </div>
          
          <div className="mt-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="team" 
                  stroke="#555" 
                  tick={{ fill: '#888', fontSize: 11, fontWeight: 500 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={15} 
                />
                <YAxis 
                  stroke="#555" 
                  tick={{ fill: '#666', fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false} 
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.05 }} />
                <ReferenceLine y={averageFPA} stroke="#555" strokeDasharray="4 4" />
                <Bar dataKey={metric} radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => {
                    let fill = '#333333';
                    if (index < 10) fill = '#10b981'; // Emerald-500
                    else if (index >= chartData.length - 10) fill = '#ef4444'; // Red-500
                    return <Cell key={`cell-${index}`} fill={fill} className="transition-all duration-300" />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-800/60">Rank</th>
                  <th className="px-6 py-4 border-b border-gray-800/60 text-white">Opponent Defense</th>
                  <th className="px-6 py-4 border-b border-gray-800/60 text-right">Proj. FPA</th>
                  <th className="px-6 py-4 border-b border-gray-800/60 text-right hidden sm:table-cell">Historic FPA</th>
                  <th className="px-6 py-4 border-b border-gray-800/60 text-right hidden md:table-cell">Coaching Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {chartData.map((row) => (
                  <tr key={row.team} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-500">
                      #{row.rank}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${row.rank <= 10 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : row.rank > 22 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-gray-600'}`}></span>
                      {row.team}
                    </td>
                    <td className="px-6 py-4 text-right text-white">
                      {row.projected_fpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 hidden sm:table-cell">
                      {row.historic_fpa.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 text-right hidden md:table-cell ${
                      row.delta > 0 ? 'text-emerald-400' : row.delta < 0 ? 'text-rose-400' : 'text-gray-600'
                    }`}>
                      {row.delta > 0 ? '+' : ''}{row.delta.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
