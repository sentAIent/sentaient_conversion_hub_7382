'use client';

import React, { useState } from 'react';
import PlayerDashboard from '@/components/PlayerDashboard';
import DFSDashboard from '@/components/dfs/DFSDashboard';
import { Activity, Target, ChevronDown, Trophy, User } from 'lucide-react';
import { useSubscription, SubscriptionTier } from '@/components/SubscriptionContext';
import Link from 'next/link';

export default function AppShell() {
  const [mode, setMode] = useState<'draft' | 'dfs'>('dfs');
  const { tier, setTier, isLoading } = useSubscription();

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
        
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/odds" className="text-gray-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors">
            <Target size={16} /> Vegas Odds
          </Link>
          <Link href="/social" className="text-gray-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors">
            <Trophy size={16} /> Social Action
          </Link>
          <Link href="/profile" className="text-gray-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors">
            <User size={16} /> My Bankroll
          </Link>
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
          
          <div className="relative group">
            <button className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              tier === 'Free' 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
            }`}>
              {isLoading ? '...' : (tier === 'Free' ? 'Start Free Trial' : `${tier} Tier`)}
              <ChevronDown size={14} className="opacity-50" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all overflow-hidden z-50">
              {(['Free', 'Pro', 'Max'] as SubscriptionTier[]).map((t) => (
                <button 
                  key={t}
                  onClick={() => setTier(t)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${t === tier ? 'text-blue-400 font-bold bg-gray-800/50' : 'text-gray-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
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
