'use client';

import React from 'react';
import { AlertTriangle, Search } from 'lucide-react';

export default function InjuryTracker() {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Injury Tracker</h2>
          <p className="text-sm text-gray-400">Monitor practice statuses and injury reports for all active players.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search players..." 
            className="w-full sm:w-64 bg-white/[0.03] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-red-500/50"
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-white/[0.02] p-4 text-sm font-semibold text-gray-400 flex">
          <div className="flex-1">Player</div>
          <div className="w-32 text-center">Injury</div>
          <div className="w-32 text-center">Status</div>
          <div className="w-48 text-right">Practice (Wed/Thu/Fri)</div>
        </div>
        <div className="divide-y divide-white/5 p-8 text-center text-gray-500">
          <AlertTriangle size={24} className="mx-auto mb-3 opacity-50" />
          <p>No new injuries reported for this week.</p>
        </div>
      </div>
    </div>
  );
}
