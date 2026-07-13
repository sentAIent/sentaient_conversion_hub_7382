'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Search, ArrowUpDown } from 'lucide-react';

interface ScreenerPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  player_adp: { adp: number; format: string }[];
}

export default function PlayerScreener() {
  const [players, setPlayers] = useState<ScreenerPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('ALL');
  const [sortCol, setSortCol] = useState<'name' | 'adp'>('adp');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('/api/screener')
      .then(res => res.json())
      .then(data => {
        setPlayers(data.data || []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const getAdp = (p: ScreenerPlayer) => {
    const ppr = p.player_adp?.find(a => a.format === 'PPR')?.adp;
    return ppr || 999; // 999 if undrafted
  };

  const filtered = players
    .filter(p => posFilter === 'ALL' || p.position === posFilter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.team?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let valA, valB;
      if (sortCol === 'name') {
        valA = a.name; valB = b.name;
      } else {
        valA = getAdp(a); valB = getAdp(b);
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const toggleSort = (col: 'name' | 'adp') => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else { setSortCol(col); setSortAsc(true); }
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl flex flex-col h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Player Screener</h2>
          <p className="text-sm text-gray-400">Filter and find sleepers across the entire player pool</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search players..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
            {['ALL', 'QB', 'RB', 'WR', 'TE'].map(pos => (
              <button 
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${posFilter === pos ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-white/[0.06]">
                <th className="pb-3 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-1">Player <ArrowUpDown size={12} /></div>
                </th>
                <th className="pb-3 font-semibold">Team</th>
                <th className="pb-3 font-semibold">Pos</th>
                <th className="pb-3 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort('adp')}>
                  <div className="flex items-center gap-1">ADP (PPR) <ArrowUpDown size={12} /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 100).map(p => {
                const adp = getAdp(p);
                return (
                  <tr key={p.id} className="border-b border-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <td className="py-3 font-medium text-white">{p.name}</td>
                    <td className="py-3 text-gray-400">{p.team}</td>
                    <td className="py-3"><span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{p.position}</span></td>
                    <td className="py-3 text-gray-300 font-mono">{adp === 999 ? 'UDFA' : adp.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
