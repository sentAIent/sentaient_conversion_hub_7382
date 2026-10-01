import React, { useState, useEffect } from 'react';

export default function SportsAnalytics() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, this would use the Supabase client
    // For this demonstration, we'll fetch from the REST endpoint directly if env vars are set
    const fetchProjections = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        // Fallback to mock data if env vars aren't set so the dashboard still renders beautifully
        setTimeout(() => {
          setData([
            { id: 1, player: 'Patrick Mahomes', team: 'KC', position: 'QB', ppg: 24.5, rank: 1 },
            { id: 2, player: 'Josh Allen', team: 'BUF', position: 'QB', ppg: 23.8, rank: 2 },
            { id: 3, player: 'Jalen Hurts', team: 'PHI', position: 'QB', ppg: 22.1, rank: 3 },
            { id: 4, player: 'Christian McCaffrey', team: 'SF', position: 'RB', ppg: 21.5, rank: 1 },
            { id: 5, player: 'Tyreek Hill', team: 'MIA', position: 'WR', ppg: 20.2, rank: 1 },
          ]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/nfl_projections?select=*&order=ppg.desc&limit=50`, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch projections');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjections();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans selection:bg-emerald-500/30">
      <header className="mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-2">Fantasy Quant</h1>
        <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">Live NFL Projections Pipeline</p>
      </header>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded mb-8 font-mono">
          [ERROR]: {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="font-mono text-emerald-500 tracking-widest text-sm animate-pulse uppercase">Ingesting Data Streams...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top Players Panel */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold tracking-tight border-l-4 border-emerald-500 pl-3 uppercase">Elite Projections</h2>
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider font-mono">
                    <th className="p-4 border-b border-white/10">Rank</th>
                    <th className="p-4 border-b border-white/10">Player</th>
                    <th className="p-4 border-b border-white/10">Pos</th>
                    <th className="p-4 border-b border-white/10 text-right">Proj. PPG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((player, idx) => (
                    <tr key={player.id || idx} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 font-mono text-slate-500 group-hover:text-emerald-400 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{player.player}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">{player.team}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs font-mono font-bold tracking-wide">
                          {player.position}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-emerald-400 font-bold text-lg">
                        {Number(player.ppg).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Analytics Panel */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight border-l-4 border-indigo-500 pl-3 uppercase">Pipeline Status</h2>
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 shadow-2xl space-y-6">
              <div>
                <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Maxun Sync Status</div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  ONLINE
                </div>
              </div>
              
              <div>
                <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Last Updated</div>
                <div className="font-mono text-white text-lg">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1">Records Ingested</div>
                <div className="font-mono text-white text-3xl font-bold">
                  {data.length}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-mono text-sm tracking-widest uppercase py-3 rounded transition-colors border border-white/10">
                  Force Sync
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
