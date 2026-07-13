'use client';

import React, { useState } from 'react';
import PlayerDashboard from '@/components/PlayerDashboard';
import DFSDashboard from '@/components/dfs/DFSDashboard';
import { Activity, Target } from 'lucide-react';

export default function AppShell() {
  const [mode, setMode] = useState<'draft' | 'dfs'>('dfs');

  return (
    <div className="min-h-screen bg-[#070809] text-white font-sans">
      {/* ── Global Header ── */}
      <header className="border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 bg-[#070809]/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-black">
            FQ
          </div>
          <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            FantasyQuant
          </span>
          <span className="text-xs text-gray-700 ml-1 hidden sm:block">Professional Analytics</span>
        </div>

        {/* Mode Toggle — the core UX pivot */}
        <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
          <button
            onClick={() => setMode('draft')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
              mode === 'draft'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Activity size={15} />
            Draft Mode
          </button>
          <button
            onClick={() => setMode('dfs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
              mode === 'dfs'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Target size={15} />
            DFS Mode
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            mode === 'draft'
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${mode === 'draft' ? 'bg-blue-400' : 'bg-purple-400'}`} />
            {mode === 'draft' ? 'Season Long' : 'GPP Optimizer'}
          </div>
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
            Log In
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 transition-all">
            Start Free Trial
          </button>
        </div>
      </header>

      {/* ── Mode-specific content ── */}
      <div className="transition-all duration-300">
        {mode === 'draft' ? (
          <PlayerDashboard hideHeader />
        ) : (
          <DFSDashboard />
        )}
      </div>
    </div>
  );
}
