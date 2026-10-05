'use client';

import { useState, useEffect, useMemo } from 'react';
import { Title, Text, TabGroup, TabList, Tab } from '@tremor/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type HeatmapRecord = {
  season: number;
  position: string;
  team: string;
  week: number;
  opponent: string;
  sos_rank: number | null;
};

export default function SOSHeatmapDashboard() {
  const router = useRouter();
  const params = useParams();
  
  const [data, setData] = useState<HeatmapRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  const positions = ['qb', 'rb', 'wr', 'te'];
  const rawPos = (params.position as string)?.toLowerCase();
  const selectedPos = positions.includes(rawPos) ? rawPos.toUpperCase() : 'QB';

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
    
    // Assign overall 1-32 rank based on this sorting
    rows.forEach((row, idx) => {
        row.overallRank = idx + 1;
    });

    return rows;
  }, [data, selectedPos]);

  // Color coding function (Matches DraftSharks 5-color style roughly: Dark Green, Light Green, White/Gray, Light Red, Dark Red)
  const getCellColor = (rank: number | null) => {
    if (rank === null) return 'bg-[#f8f9fa] text-gray-500 border-gray-200'; // BYE
    if (rank <= 6) return 'bg-[#1b5e20] text-white border-[#1b5e20]'; // Top 6 Easiest Matchup (Dark Green)
    if (rank <= 12) return 'bg-[#4caf50] text-white border-[#4caf50]'; // 7-12 Easiest Matchup (Light Green)
    if (rank <= 20) return 'bg-[#ffffff] text-gray-900 border-gray-200'; // 13-20 (Neutral)
    if (rank <= 26) return 'bg-[#ef5350] text-white border-[#ef5350]'; // 21-26 Hardest Matchup (Light Red)
    return 'bg-[#b71c1c] text-white border-[#b71c1c]'; // 27-32 Hardest Matchup (Dark Red)
  };

  const getOverallColor = (rank: number) => {
    if (rank <= 6) return 'bg-[#1b5e20] text-white border-[#1b5e20]'; 
    if (rank <= 12) return 'bg-[#4caf50] text-white border-[#4caf50]';
    if (rank <= 20) return 'bg-[#ffffff] text-gray-900 border-gray-200'; 
    if (rank <= 26) return 'bg-[#ef5350] text-white border-[#ef5350]'; 
    return 'bg-[#b71c1c] text-white border-[#b71c1c]'; 
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 lg:p-8 font-sans">
      <main className="max-w-[1800px] mx-auto space-y-6">
        
        <header className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-black text-[#0f2e4a] tracking-tight">
            Fantasy Football Strength of Schedule (SOS)
          </h1>
          <Text className="text-gray-600 mt-2 max-w-4xl text-sm">
            Rankings are from easiest (1) to hardest (32). Green is easy, red is hard. 
            The overall season rank evaluates all 18 regular-season weeks.
          </Text>
        </header>

        {/* Position Tabs */}
        <div className="flex bg-white rounded shadow-sm overflow-hidden w-fit border border-gray-200">
            {positions.map(pos => {
                const isActive = selectedPos === pos.toUpperCase();
                return (
                    <Link 
                        key={pos} 
                        href={`/strength-of-schedule/${pos}`}
                        className={`px-8 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-r border-gray-200 last:border-r-0 ${
                            isActive ? 'bg-[#0f2e4a] text-white' : 'text-[#0f2e4a] hover:bg-gray-100'
                        }`}
                    >
                        {pos}
                    </Link>
                )
            })}
        </div>

        {loading ? (
          <Text className="animate-pulse py-10">Loading SOS data...</Text>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-300 rounded shadow-sm">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-[#0f2e4a] text-white font-bold">
                <tr>
                  <th className="p-3 border-r border-gray-700 sticky left-0 bg-[#0f2e4a] z-10 w-24">TEAM</th>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map(wk => (
                    <th key={wk} className="p-2 border-r border-gray-700 w-14">W{wk}</th>
                  ))}
                  <th className="p-3 border-l border-gray-700 bg-[#0f2e4a]">OVERALL RANK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {gridData.map((row, i) => (
                  <tr key={row.team} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-r border-gray-300 font-bold text-[#0f2e4a] sticky left-0 bg-white z-10">
                      {row.team}
                    </td>
                    {Array.from({ length: 18 }, (_, i) => i + 1).map(wk => {
                      const cell = row.weeks[wk];
                      const rank = cell?.sos_rank;
                      return (
                        <td 
                          key={wk} 
                          className={`border-r border-gray-300 font-bold transition-all hover:brightness-95 ${getCellColor(rank)}`}
                          title={rank ? `Rank: ${rank}` : 'BYE'}
                        >
                          <div className="flex flex-col items-center justify-center p-1.5 h-full min-h-[48px]">
                            <span className="text-[9px] mb-0.5 whitespace-nowrap opacity-90">{cell?.opponent}</span>
                            {rank !== null ? (
                              <span className="text-[13px]">{rank}</span>
                            ) : (
                              <span className="text-[13px]">-</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className={`p-3 border-l border-gray-300 font-black text-sm ${getOverallColor(row.overallRank)}`}>
                      {row.overallRank}
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
