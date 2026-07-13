'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ChartProps {
  playerId?: string;
  playerName?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f1115]/95 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-2xl text-sm min-w-[150px]">
        <div className="text-gray-400 mb-2 font-semibold border-b border-white/10 pb-1">{label}</div>
        <div className="text-blue-400 font-bold mb-2 text-lg">
          {payload[0].value.toFixed(2)} pts
        </div>
        <div className="text-gray-300 text-xs space-y-1">
          <div className="flex justify-between"><span className="text-gray-500">Opponent:</span> <span>{data.opponent}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Weather:</span> <span>{data.temp}° {data.weather}</span></div>
          {data.injury && (
            <div className="text-red-400 mt-2 pt-2 border-t border-red-500/20 bg-red-500/5 -mx-3 -mb-3 px-3 pb-3 rounded-b-lg">
              <span className="font-semibold block mb-0.5">⚠️ Injury Report</span>
              <span className="text-red-300">{data.injury}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function PlayerPerformanceChart({ playerId, playerName }: ChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [adp, setAdp] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoringType, setScoringType] = useState<'ppr_pts' | 'half_ppr_pts' | 'standard_pts'>('ppr_pts');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let url = '/api/stats';
        if (playerId) url += `?playerId=${playerId}`;
        else if (playerName) url += `?playerName=${playerName}`;
        
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.data) {
          let stats = json.data;
          if (playerName) {
            stats = stats.filter((s: any) => s.players?.name === playerName);
          }

          setAdp(json.adp || []);

          let formatted = stats.map((stat: any) => {
            const weekInj = (json.injuries || []).find((inj: any) => inj.week === stat.games.week);
            return {
              name: `Wk ${stat.games.week}`,
              weekNumber: stat.games.week,
              ppr_pts: stat.ppr_pts,
              half_ppr_pts: stat.half_ppr_pts,
              standard_pts: stat.standard_pts,
              temp: stat.games.weather?.[0]?.temperature_f || 'N/A',
              weather: stat.games.weather?.[0]?.precipitation_type || 'None',
              opponent: stat.games.home_team === stat.players.team ? stat.games.away_team : `@${stat.games.home_team}`,
              injury: weekInj ? `${weekInj.report_primary_injury} (${weekInj.report_status})` : null
            };
          });
          
          formatted.sort((a: any, b: any) => a.weekNumber - b.weekNumber);
          
          setData(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [playerId, playerName]);

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-t-blue-500 animate-spin"></div>
          <span className="text-sm text-[var(--muted-foreground)]">Loading performance data...</span>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center text-[var(--muted-foreground)]">
        No data available
      </div>
    );
  }

  // Determine current ADP based on format
  const currentFormat = scoringType === 'ppr_pts' ? 'ppr' : scoringType === 'half_ppr_pts' ? 'half_ppr' : 'standard';
  const currentAdp = adp.find(a => a.format === currentFormat)?.adp;

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            <span className="text-gray-300 font-medium">Fantasy Points</span>
          </div>
          {currentAdp && (
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-medium tracking-wide">
              2023 ADP: <span className="text-white">#{currentAdp}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 bg-black/20 p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setScoringType('ppr_pts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scoringType === 'ppr_pts' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            PPR
          </button>
          <button 
            onClick={() => setScoringType('half_ppr_pts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scoringType === 'half_ppr_pts' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            0.5 PPR
          </button>
          <button 
            onClick={() => setScoringType('standard_pts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${scoringType === 'standard_pts' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            STD
          </button>
        </div>
      </div>

      <div className="flex-1 w-full" style={{ minHeight: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area 
              type="monotone" 
              dataKey={scoringType} 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPts)" 
              activeDot={{ r: 6, fill: '#000', stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
