import React, { useState } from 'react';
import { X, Play, Download, Loader2 } from 'lucide-react';

interface MultiLineupManagerProps {
  isOpen: boolean;
  onClose: () => void;
  week: number;
  season: number;
  platform: string;
}

export const MultiLineupManager = ({ isOpen, onClose, week, season, platform }: MultiLineupManagerProps) => {
  const [nLineups, setNLineups] = useState(20);
  const [maxExposure, setMaxExposure] = useState(0.60);
  const [maxOwnership, setMaxOwnership] = useState(1.50); // 150% sum
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          week, season, platform,
          nLineups, maxExposure,
          maxOwnership: maxOwnership > 0 ? maxOwnership : null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setResults(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportCSV = () => {
    if (!results || !results.lineups) return;
    
    // DK headers
    let csv = "QB,RB,RB,WR,WR,WR,TE,FLEX,DST\n";
    
    results.lineups.forEach((l: any) => {
      const players = l.players;
      const qbs = players.filter((p: any) => p.position === 'QB');
      const rbs = players.filter((p: any) => p.position === 'RB');
      const wrs = players.filter((p: any) => p.position === 'WR');
      const tes = players.filter((p: any) => p.position === 'TE');
      const dsts = players.filter((p: any) => p.position === 'DST');
      
      const qb1 = qbs[0];
      const rb1 = rbs[0];
      const rb2 = rbs[1];
      const wr1 = wrs[0];
      const wr2 = wrs[1];
      const wr3 = wrs[2];
      const te1 = tes[0];
      const dst1 = dsts[0];
      
      // Flex is whoever is left from RB/WR/TE
      const flex = rbs.slice(2).concat(wrs.slice(3)).concat(tes.slice(1))[0];
      
      const row = [qb1, rb1, rb2, wr1, wr2, wr3, te1, flex, dst1].map(p => p ? p.name : '');
      csv += row.join(',') + "\n";
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DK_Lineups_W${week}_${nLineups}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] h-[90vh] m-auto bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-lg font-bold text-white tracking-wide">Multi-Lineup Manager</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Configuration */}
          <div className="w-1/3 p-6 border-r border-white/[0.05] flex flex-col bg-white/[0.01]">
            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Configuration</h3>
            
            <label className="text-xs font-semibold text-gray-400 mb-1">Number of Lineups</label>
            <input type="number" min="1" max="150" value={nLineups} onChange={e => setNLineups(parseInt(e.target.value))} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-4 focus:border-blue-500/50 outline-none" />

            <label className="text-xs font-semibold text-gray-400 mb-1">Max Player Exposure (%)</label>
            <input type="number" min="1" max="100" value={Math.round(maxExposure * 100)} onChange={e => setMaxExposure(parseInt(e.target.value)/100)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-4 focus:border-blue-500/50 outline-none" />

            <label className="text-xs font-semibold text-gray-400 mb-1">Max Roster Ownership Sum (%)</label>
            <input type="number" min="0" value={Math.round(maxOwnership * 100)} onChange={e => setMaxOwnership(parseInt(e.target.value)/100)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-8 focus:border-blue-500/50 outline-none" placeholder="e.g. 150 for contrarian" />

            <button onClick={handleGenerate} disabled={isGenerating} className="mt-auto w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
              {isGenerating ? 'Optimizing...' : 'Generate Lineups'}
            </button>
            {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">{error}</div>}
          </div>

          {/* Right Panel: Results */}
          <div className="flex-1 flex flex-col bg-black/20">
            {!results ? (
              <div className="m-auto text-center text-gray-600 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-600/50 flex items-center justify-center mb-4">
                  <Play size={24} className="opacity-20" />
                </div>
                Configure settings and click generate to view your portfolio.
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{results.n_lineups} Lineups Generated</h3>
                    <div className="text-xs text-emerald-400 font-semibold">{results.avg_projected_pts} Avg Proj Pts</div>
                  </div>
                  <button onClick={exportCSV} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                    <Download size={16} /> Export CSV
                  </button>
                </div>
                
                <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
                  <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Player Exposure</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
                    {results.exposure.map((exp: any) => (
                      <div key={exp.player_id} className="flex justify-between items-center text-sm">
                        <span className="text-white font-medium truncate pr-4">{exp.name}</span>
                        <span className={`font-bold ${exp.exposure_pct > 50 ? 'text-orange-400' : 'text-gray-400'}`}>{exp.exposure_pct}%</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Lineups Preview</h4>
                  <div className="flex flex-col gap-3">
                    {results.lineups.slice(0, 10).map((l: any, i: number) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3 text-xs">
                          <span className="font-bold text-gray-400">Lineup {i + 1}</span>
                          <div className="flex gap-4 font-semibold">
                            <span className="text-blue-400">{l.projected_pts} pts</span>
                            <span className="text-emerald-400">${(l.total_salary / 1000).toFixed(1)}k</span>
                            <span className="text-orange-400">{l.avg_ownership}% own</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-300 leading-relaxed">
                          {l.players.map((p: any) => p.name).join(', ')}
                        </div>
                      </div>
                    ))}
                    {results.lineups.length > 10 && (
                      <div className="text-center text-xs text-gray-500 italic mt-2">
                        + {results.lineups.length - 10} more lineups (Export CSV to view all)
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
