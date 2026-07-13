'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function MatchupAnalyzer() {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Matchup Analyzer</h2>
      <p className="text-gray-400 mb-6">Compare players head-to-head for start/sit decisions.</p>
      
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 bg-white/[0.01] rounded-xl p-6 border border-white/5">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search Player 1..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-gray-600 border border-dashed border-white/10 rounded-xl">
            <p>Select a player to analyze</p>
          </div>
        </div>

        <div className="flex items-center justify-center text-gray-600 font-bold uppercase tracking-widest text-sm">
          VS
        </div>

        <div className="flex-1 bg-white/[0.01] rounded-xl p-6 border border-white/5">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search Player 2..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-gray-600 border border-dashed border-white/10 rounded-xl">
            <p>Select a player to analyze</p>
          </div>
        </div>
      </div>
    </div>
  );
}
