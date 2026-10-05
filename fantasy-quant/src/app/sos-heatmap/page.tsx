'use client';

import { useState, useEffect, useMemo } from 'react';
import { Title, Text, TabGroup, TabList, Tab } from '@tremor/react';

type HeatmapRecord = {
  season: number;
  position: string;
  team: string;
  week: number;
  opponent: string;
  sos_rank: number | null;
};

export default function SOSHeatmapDashboard() {
  const [data, setData] = useState<HeatmapRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPos, setSelectedPos] = useState('QB');
  
  const positions = ['QB', 'RB', 'WR', 'TE'];

  useEffect(() => {
    fetch('/api/sos-heatmap')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      });
  }, []);

  // Process data for the grid
  const gridData = useMemo(() => {
    if (!data.length) return [];
    
    // Filter by position
    const posData = data.filter(d => d.position === selectedPos);
    
    // Group by team
    const teamMap: Record<string, any> = {};
    posData.forEach(d => {
      if (!teamMap[d.team]) {
        teamMap[d.team] = { team: d.team, weeks: {}, totalRank: 0, games: 0 };
      }
      teamMap[d.team].weeks[d.week] = d;
      if (d.sos_rank !== null) {
        teamMap[d.team].totalRank += d.sos_rank;
        teamMap[d.team].games += 1;
      }
    });

    // Calculate overall avg rank
    const rows = Object.values(teamMap).map(t => {
      t.avgRank = t.games > 0 ? t.totalRank / t.games : 0;
      return t;
    });

    // Sort by easiest overall schedule (lowest avg rank = easiest)
    rows.sort((a, b) => a.avgRank - b.avgRank);
    
    return rows;
  }, [data, selectedPos]);

  // Color coding function
  const getCellColor = (rank: number | null) => {
    if (rank === null) return 'bg-[#111] text-gray-500 border-gray-800'; // BYE
    if (rank <= 10) return 'bg-green-900/40 text-green-400 border-green-800'; // Top 10 Easiest Matchup (Bottom 10 Defense)
    if (rank <= 22) return 'bg-amber-900/40 text-amber-400 border-amber-800'; // Middle 12
    return 'bg-red-900/40 text-red-400 border-red-800'; // Top 10 Hardest Matchup (Top 10 Defense)
  };

  const getOverallColor = (avgRank: number) => {
    if (avgRank <= 10) return 'bg-green-500/20 text-green-400 border-green-500';
    if (avgRank <= 22) return 'bg-amber-500/20 text-amber-400 border-amber-500';
    return 'bg-red-500/20 text-red-400 border-red-500';
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 lg:p-12 font-mono">
      <main className="max-w-[1600px] mx-auto space-y-8">
        <header className="border-b-4 border-white pb-6">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
            🔥 Comprehensive SOS Heatmap
          </h1>
          <Text className="text-gray-400 mt-4 max-w-3xl leading-relaxed">
            Week-by-week Positional Strength of Schedule matrix. 
            <span className="text-green-400 font-bold ml-2">Green (Ranks 1-10)</span> = Easiest. 
            <span className="text-amber-400 font-bold ml-2">Amber (11-22)</span> = Neutral. 
            <span className="text-red-400 font-bold ml-2">Red (23-32)</span> = Hardest.
          </Text>
        </header>

        <TabGroup onIndexChange={(idx) => setSelectedPos(positions[idx])}>
          <TabList className="bg-[#111] border-2 border-white mb-6 flex">
            {positions.map(pos => (
              <Tab 
                key={pos} 
                className={`px-8 py-3 text-xl font-black uppercase tracking-widest transition-all ${
                  selectedPos === pos ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {pos}
              </Tab>
            ))}
          </TabList>
        </TabGroup>

        {loading ? (
          <Text className="animate-pulse">Building matrix...</Text>
        ) : (
          <div className="overflow-x-auto bg-[#0a0a0a] border-2 border-white">
            <table className="w-full text-xs md:text-sm text-center border-collapse">
              <thead className="bg-[#111] text-white uppercase tracking-widest font-black border-b-2 border-white">
                <tr>
                  <th className="p-4 border-r-2 border-white sticky left-0 bg-[#111] z-10 w-24">Team</th>
                  {Array.from({ length: 17 }, (_, i) => i + 1).map(wk => (
                    <th key={wk} className="p-3 border-r border-gray-800 w-16">W{wk}</th>
                  ))}
                  <th className="p-4 border-l-2 border-white bg-[#111]">Overall Season Rank</th>
                </tr>
              </thead>
              <tbody>
                {gridData.map((row, i) => (
                  <tr key={row.team} className="border-b border-gray-900 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 border-r-2 border-white font-black text-white sticky left-0 bg-[#0a0a0a] z-10">
                      {row.team}
                    </td>
                    {Array.from({ length: 17 }, (_, i) => i + 1).map(wk => {
                      const cell = row.weeks[wk];
                      const rank = cell?.sos_rank;
                      return (
                        <td 
                          key={wk} 
                          className={`p-2 border-r border-b font-bold transition-all hover:brightness-125 ${getCellColor(rank)}`}
                          title={rank ? `Rank: ${rank}` : 'BYE'}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-[10px] md:text-xs mb-1 opacity-80">{cell?.opponent}</span>
                            {rank !== null ? (
                              <span className="text-sm md:text-base">{rank}</span>
                            ) : (
                              <span className="text-sm md:text-base">-</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className={`p-4 border-l-2 border-white font-black text-lg ${getOverallColor(row.avgRank)}`}>
                      {row.avgRank.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
