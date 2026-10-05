'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Users, TrendingUp, Trophy, Share2, MessageSquare, Heart } from '@/components/icons';
import { createClient } from '@/utils/supabase/client';

export default function SocialFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    fetchSocialData();
  }, []);

  const fetchSocialData = async () => {
    try {
      // 1. Fetch recent paper bets
      const { data: bets } = await supabase
        .from('paper_bets')
        .select(`
          id,
          bet_type,
          selection,
          wager,
          to_win,
          created_at,
          users:user_id (email)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      // 2. Fetch leaderboard (Top paper accounts)
      const { data: accounts } = await supabase
        .from('paper_accounts')
        .select(`
          balance,
          users:user_id (email)
        `)
        .order('balance', { ascending: false })
        .limit(10);

      if (bets) {
        setFeed(bets);
      }
      if (accounts) {
        setLeaderboard(accounts);
      }
    } catch (e) {
      console.error('Error fetching social data:', e);
    } finally {
      setLoading(false);
    }
  };

  const getUsername = (email: string) => {
    if (!email) return 'Anonymous';
    return email.split('@')[0];
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 p-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
              <Users className="text-fuchsia-400" size={32} />
              Community & Social
            </h1>
            <p className="text-slate-400">See what others are betting on and check the global leaderboard.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-indigo-400" size={20} />
              Global Feed
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-slate-900 rounded-2xl border border-slate-800"></div>
                ))}
              </div>
            ) : feed.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                No recent activity found.
              </div>
            ) : (
              <div className="space-y-4">
                {feed.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                          {getUsername(item.users?.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{getUsername(item.users?.email)}</div>
                          <div className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-4">
                      <div className="text-sm text-slate-400 mb-1">Locked in a Paper Bet</div>
                      <div className="text-lg font-bold text-white">{item.selection}</div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="text-slate-400">Wager: <span className="text-white font-medium">{formatCurrency(item.wager)}</span></div>
                        <div className="text-slate-400">To Win: <span className="text-emerald-400 font-medium">{formatCurrency(item.to_win)}</span></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 border-t border-slate-800 pt-3">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 text-sm font-medium transition-colors">
                        <Heart size={16} /> 0
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 text-sm font-medium transition-colors">
                        <MessageSquare size={16} /> Reply
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors ml-auto">
                        <Share2 size={16} /> Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Leaderboard Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-amber-400" size={20} />
              Top Profitability
            </h2>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {loading ? (
                <div className="p-6 text-center text-slate-500">Loading...</div>
              ) : leaderboard.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No data.</div>
              ) : (
                <div className="divide-y divide-slate-800/50">
                  {leaderboard.map((acc, idx) => (
                    <div key={idx} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        idx === 0 ? 'bg-amber-500 text-amber-950' : 
                        idx === 1 ? 'bg-slate-300 text-slate-800' : 
                        idx === 2 ? 'bg-orange-700 text-orange-100' : 
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{getUsername(acc.users?.email)}</div>
                      </div>
                      <div className="text-emerald-400 font-bold whitespace-nowrap">
                        {formatCurrency(acc.balance)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


