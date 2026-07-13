'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface DraftPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  player_adp: { adp: number; format: string }[];
}

export default function DraftBoard() {
  const [players, setPlayers] = useState<DraftPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/screener')
      .then(res => res.json())
      .then(data => {
        setPlayers(data.data || []);
        setLoading(false);
      });
  }, []);

  const getAdp = (p: DraftPlayer) => p.player_adp?.find(a => a.format === 'PPR')?.adp || 999;

  const drafted = [...players].sort((a, b) => getAdp(a) - getAdp(b)).filter(p => getAdp(p) !== 999).slice(0, 120);

  // 12 teams, 10 rounds = 120 players
  const rounds = Array.from({ length: 10 }, (_, i) => drafted.slice(i * 12, (i + 1) * 12));

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl flex flex-col h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-white/[0.06]">
        <h2 className="text-xl font-bold">Live Draft Board</h2>
        <p className="text-sm text-gray-400">12-Team PPR ADP Draft Board (Rounds 1-10)</p>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-gray-500" size={32} /></div>
        ) : (
          <div className="flex gap-4">
            {rounds.map((round, rIdx) => (
              <div key={rIdx} className="w-48 flex-shrink-0 space-y-2">
                <div className="text-center font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">Round {rIdx + 1}</div>
                {round.map((p, pIdx) => {
                  const isEvenRound = rIdx % 2 === 1;
                  const pickNum = (rIdx * 12) + (isEvenRound ? (12 - pIdx) : (pIdx + 1));
                  const isRB = p.position === 'RB';
                  const isWR = p.position === 'WR';
                  const isTE = p.position === 'TE';
                  const isQB = p.position === 'QB';
                  
                  return (
                    <div key={p.id} className="relative p-3 rounded-lg border bg-white/[0.04] border-white/10 text-xs shadow-sm hover:border-white/30 transition-colors">
                      <div className="absolute -top-2 -left-2 bg-gray-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border border-white/10 shadow-lg">
                        {pickNum}
                      </div>
                      <div className="font-bold text-white truncate ml-2">{p.name}</div>
                      <div className="flex justify-between mt-1 ml-2">
                        <span className="text-gray-400">{p.team}</span>
                        <span className={`font-bold ${isRB ? 'text-green-400' : isWR ? 'text-blue-400' : isTE ? 'text-orange-400' : isQB ? 'text-pink-400' : 'text-gray-400'}`}>
                          {p.position}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
