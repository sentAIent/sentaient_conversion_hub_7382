'use client';

import { useState, useEffect } from 'react';
import { Title, Text, Card } from '@tremor/react';
import { Shield } from '@/components/icons';

export default function DefensiveRankings() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/defensive-ranks')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      });
  }, []);

  // In our DB, sos_rank 32 = Hardest Matchup (Best Defense), sos_rank 1 = Easiest Matchup (Worst Defense)
  // For a Defensive Rankings page, we want 1 to be the Best Defense, and 32 to be the Worst.
  const toDefRank = (sosRank: number) => 33 - sosRank;

  const getCellColor = (defRank: number) => {
    if (defRank <= 10) return 'bg-red-900/40 text-red-400 border-red-800'; // Rank 1-10 (Elite Defense)
    if (defRank <= 22) return 'bg-amber-900/40 text-amber-400 border-amber-800'; // Rank 11-22 (Average)
    return 'bg-green-900/40 text-green-400 border-green-800'; // Rank 23-32 (Weak Defense)
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] p-6 lg:p-12 font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="border-b-4 border-white pb-6">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
            <Shield className="w-10 h-10 text-red-500" />
            True Defensive Rankings
          </h1>
          <Text className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
            NFL Defenses ranked from Best (Rank 1) to Worst (Rank 32). 
            <span className="text-red-400 font-bold ml-2">Red (Rank 1-10)</span> = Elite Defense / Hard Matchup. 
            <span className="text-amber-400 font-bold ml-2">Amber (11-22)</span> = Average. 
            <span className="text-green-400 font-bold ml-2">Green (23-32)</span> = Weak Defense / Easy Matchup.
          </Text>
        </header>

        {loading ? (
          <Text className="animate-pulse">Loading defensive metrics...</Text>
        ) : (
          <Card className="bg-black border-2 border-white p-0 rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead className="bg-[#111] text-white uppercase tracking-widest font-black border-b-2 border-white">
                  <tr>
                    <th className="p-4 border-r-2 border-white text-left">Defense</th>
                    <th className="p-4 border-r border-gray-800">vs QB</th>
                    <th className="p-4 border-r border-gray-800">vs RB</th>
                    <th className="p-4 border-r border-gray-800">vs WR</th>
                    <th className="p-4 border-r border-gray-800">vs TE</th>
                    <th className="p-4 border-l-2 border-white">Overall Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900">
                  {data.map((row, idx) => {
                    const qbDef = toDefRank(row.QB);
                    const rbDef = toDefRank(row.RB);
                    const wrDef = toDefRank(row.WR);
                    const teDef = toDefRank(row.TE);
                    const avgDef = toDefRank(row.avgRank);
                    
                    return (
                    <tr key={row.team} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 border-r-2 border-white text-left font-black text-white text-lg flex items-center gap-3">
                        <span className="text-gray-600 text-xs w-6">#{idx + 1}</span>
                        {row.team}
                      </td>
                      <td className={`p-4 border-r border-gray-800 font-bold text-lg ${getCellColor(qbDef)}`}>
                        {qbDef}
                      </td>
                      <td className={`p-4 border-r border-gray-800 font-bold text-lg ${getCellColor(rbDef)}`}>
                        {rbDef}
                      </td>
                      <td className={`p-4 border-r border-gray-800 font-bold text-lg ${getCellColor(wrDef)}`}>
                        {wrDef}
                      </td>
                      <td className={`p-4 border-r border-gray-800 font-bold text-lg ${getCellColor(teDef)}`}>
                        {teDef}
                      </td>
                      <td className={`p-4 border-l-2 border-white font-black text-xl ${getCellColor(avgDef)}`}>
                        {avgDef.toFixed(1)}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
