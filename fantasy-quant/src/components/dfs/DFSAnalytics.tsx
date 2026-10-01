'use client';

import React, { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, BarChart2, Grid, FileSpreadsheet, Upload, Activity, Sparkles, AlertCircle
} from '@/components/icons';
import { DFSPlayer } from './DFSDashboard';
import { ScenarioEngine } from '../analytics/ScenarioEngine';

type DFSAnalyticsProps = {
  playerPool: DFSPlayer[];
  mmeLineups: (DFSPlayer | null)[][];
  onUploadProjections: (projections: Record<string, number>) => void;
  projectionMode: 'median' | 'ceiling' | 'floor' | 'custom';
  setProjectionMode: (mode: 'median' | 'ceiling' | 'floor' | 'custom') => void;
};

export default function DFSAnalytics({
  playerPool,
  mmeLineups,
  onUploadProjections,
  projectionMode,
  setProjectionMode
}: DFSAnalyticsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'scatter' | 'exposures' | 'correlations' | 'scenario'>('scatter');
  const [selectedQB, setSelectedQB] = useState<string>('all');
  const [csvError, setCsvError] = useState<string | null>(null);

  // 1. Calculate exposures across lineups
  const exposures = useMemo(() => {
    if (!mmeLineups || mmeLineups.length === 0) return [];
    const counts: Record<string, number> = {};
    
    for (const lineup of mmeLineups) {
      for (const p of lineup) {
        if (p) {
          counts[p.player_id] = (counts[p.player_id] || 0) + 1;
        }
      }
    }

    return Object.entries(counts)
      .map(([pid, count]) => {
        const player = playerPool.find(p => p.player_id === pid);
        const name = player?.players?.name || 'Unknown';
        const pos = player?.players?.position || 'N/A';
        const team = player?.players?.team || 'N/A';
        const salary = player?.salary || 0;
        const pct = Math.round((count / mmeLineups.length) * 100);
        return { pid, name, pos, team, salary, count, pct };
      })
      .sort((a, b) => b.pct - a.pct);
  }, [mmeLineups, playerPool]);

  // 2. Format scatter plot data
  const scatterData = useMemo(() => {
    if (!mmeLineups || mmeLineups.length === 0) return [];
    
    return mmeLineups.map((lineup, idx) => {
      let totalProj = 0;
      let totalOwn = 0;
      let totalSalary = 0;
      const rosterNames: string[] = [];

      for (const p of lineup) {
        if (p) {
          totalProj += p.projected_pts || 0;
          totalOwn += p.projected_ownership || 0;
          totalSalary += p.salary || 0;
          rosterNames.push(`${p.players.position} ${p.players.name}`);
        }
      }

      return {
        lineupIndex: idx + 1,
        projectedScore: parseFloat(totalProj.toFixed(2)),
        cumulativeOwnership: parseFloat(totalOwn.toFixed(2)),
        salary: totalSalary,
        roster: rosterNames.join(', ')
      };
    });
  }, [mmeLineups]);

  // 3. Stacking correlation matrix (QBs with skill players on same team)
  const qbOptions = useMemo(() => {
    const qbs = playerPool.filter(p => p.players?.position === 'QB');
    return qbs.map(q => ({ id: q.player_id, name: q.players.name, team: q.players.team }));
  }, [playerPool]);

  const correlations = useMemo(() => {
    if (!mmeLineups || mmeLineups.length === 0 || selectedQB === 'all') return [];
    const qb = playerPool.find(p => p.player_id === selectedQB);
    if (!qb) return [];

    const qbTeam = qb.players.team;
    // Find skill players on same team
    const teamTeammates = playerPool.filter(
      p => p.players.team === qbTeam && p.player_id !== selectedQB && ['WR', 'TE', 'RB'].includes(p.players.position)
    );

    // Calculate joint occurrence
    return teamTeammates.map(teammate => {
      let qbCount = 0;
      let jointCount = 0;

      for (const lineup of mmeLineups) {
        const hasQB = lineup.some(p => p?.player_id === selectedQB);
        const hasTeammate = lineup.some(p => p?.player_id === teammate.player_id);

        if (hasQB) {
          qbCount++;
          if (hasTeammate) jointCount++;
        }
      }

      const correlationPct = qbCount > 0 ? Math.round((jointCount / qbCount) * 100) : 0;
      return {
        name: teammate.players.name,
        pos: teammate.players.position,
        exposureInQBLineups: correlationPct,
        jointCount,
        qbCount
      };
    }).sort((a, b) => b.exposureInQBLineups - a.exposureInQBLineups);
  }, [selectedQB, mmeLineups, playerPool]);

  // Handle CSV Projection Upload
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split('\n');
        const customProjs: Record<string, number> = {};

        // Expected format: Name, Projection (or Player ID, Projection)
        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const parts = line.split(',');
          if (parts.length >= 2) {
            const identifier = parts[0].trim().toLowerCase();
            const projVal = parseFloat(parts[1].trim());
            if (!isNaN(projVal)) {
              // Try to find by name or ID
              const match = playerPool.find(
                p => p.players.name.toLowerCase() === identifier || p.player_id.toLowerCase() === identifier
              );
              if (match) {
                customProjs[match.player_id] = projVal;
              }
            }
          }
        }

        if (Object.keys(customProjs).length === 0) {
          setCsvError("No matching players found in CSV. Make sure first column is Player Name and second is Projection.");
        } else {
          setCsvError(null);
          onUploadProjections(customProjs);
          setProjectionMode('custom');
          alert(`Successfully uploaded custom projections for ${Object.keys(customProjs).length} players!`);
        }
      } catch (err: any) {
        setCsvError("Error parsing CSV file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-900/40 border border-gray-850 rounded-3xl p-6 backdrop-blur-2xl space-y-6">
      {/* Header & Projection Controllers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-850 pb-5">
        <div>
          <h3 className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Activity size={20} className="text-indigo-400" /> Advanced GPP Analytics Suite
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Analyze multi-lineup risk profiles, exposures, and team correlation stack exposures.
          </p>
        </div>

        {/* Projection Optionality Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-950 p-1 border border-gray-800 rounded-xl text-xs">
            {(['median', 'ceiling', 'floor', 'custom'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setProjectionMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all ${
                  projectionMode === mode
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* CSV Uploader */}
          <label className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 hover:border-indigo-500/50 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-200 cursor-pointer transition-colors">
            <Upload size={14} className="text-indigo-400" /> Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {csvError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle size={14} /> {csvError}
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-gray-850/60 pb-3">
        <button
          onClick={() => setActiveSubTab('scatter')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
            activeSubTab === 'scatter' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          <TrendingUp size={14} /> Roster Risk vs Projection Scatter
        </button>
        <button
          onClick={() => setActiveSubTab('exposures')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
            activeSubTab === 'exposures' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BarChart2 size={14} /> Roster Exposure Logs
        </button>
        <button
          onClick={() => setActiveSubTab('correlations')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
            activeSubTab === 'correlations' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Grid size={14} /> Stacking Correlation Matrix
        </button>
        <button
          onClick={() => setActiveSubTab('scenario')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
            activeSubTab === 'scenario' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles size={14} /> NLP Scenario Engine
        </button>
      </div>

      {/* Roster Risk vs Projection Scatter Plot */}
      {activeSubTab === 'scatter' && (
        <div className="space-y-4">
          <div className="bg-gray-950/60 border border-gray-850 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Lineup Efficiency Frontier</h4>
            <div className="h-72 w-full">
              {scatterData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xs text-gray-500 italic">
                  Generate lineups in the MME tab to populate the scatter analytics.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="cumulativeOwnership"
                      name="Risk (Cumulative Ownership %)"
                      unit="%"
                      stroke="#9ca3af"
                      fontSize={10}
                      label={{ value: 'Risk (Cumulative Ownership %)', position: 'bottom', fill: '#9ca3af', fontSize: 10 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="projectedScore"
                      name="Projected Score"
                      stroke="#9ca3af"
                      fontSize={10}
                      domain={['auto', 'auto']}
                      label={{ value: 'Projected Score', angle: -90, position: 'left', fill: '#9ca3af', fontSize: 10 }}
                    />
                    <ZAxis type="number" range={[60, 60]} />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 text-[10px] text-gray-300 space-y-1.5 max-w-xs">
                              <div className="font-bold text-white text-xs">Lineup #{data.lineupIndex}</div>
                              <div>Projected Score: <span className="text-indigo-400 font-bold font-mono">{data.projectedScore} pts</span></div>
                              <div>Cumulative Ownership: <span className="text-amber-400 font-bold font-mono">{data.cumulativeOwnership}%</span></div>
                              <div>Total Salary: <span className="text-emerald-400 font-bold font-mono">${data.salary}</span></div>
                              <div className="border-t border-gray-800 pt-1 text-gray-400 leading-normal">{data.roster}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Lineups" data={scatterData} fill="#818cf8" />
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Roster Exposure Logs */}
      {activeSubTab === 'exposures' && (
        <div className="bg-gray-950/60 border border-gray-850 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-850">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Lineup Player Exposures</h4>
          </div>
          {exposures.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 italic">
              Generate MME lineups to calculate player exposure summaries.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/60 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-850">
                    <th className="px-5 py-3">Player</th>
                    <th className="px-5 py-3">Pos</th>
                    <th className="px-5 py-3">Team</th>
                    <th className="px-5 py-3">Salary</th>
                    <th className="px-5 py-3">Exposure (Count)</th>
                    <th className="px-5 py-3">Frontier Bar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850/60">
                  {exposures.map(player => (
                    <tr key={player.pid} className="hover:bg-white/[0.01] transition-colors text-xs">
                      <td className="px-5 py-3 text-white font-black">{player.name}</td>
                      <td className="px-5 py-3 text-gray-300 font-mono">{player.pos}</td>
                      <td className="px-5 py-3 text-gray-400">{player.team}</td>
                      <td className="px-5 py-3 text-emerald-400 font-mono font-bold">${player.salary}</td>
                      <td className="px-5 py-3 text-indigo-400 font-mono font-bold">{player.pct}% ({player.count} lineups)</td>
                      <td className="px-5 py-3 w-40">
                        <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-gray-800">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                            style={{ width: `${player.pct}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Stacking Correlation Matrix */}
      {activeSubTab === 'correlations' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-950 border border-gray-850 px-4 py-2.5 rounded-2xl w-fit">
            <span className="text-xs text-gray-400">Select quarterback:</span>
            <select
              value={selectedQB}
              onChange={(e) => setSelectedQB(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-1 text-xs text-white font-bold cursor-pointer"
            >
              <option value="all">-- Select QB to show stack matrix --</option>
              {qbOptions.map(q => (
                <option key={q.id} value={q.id}>{q.name} ({q.team})</option>
              ))}
            </select>
          </div>

          {selectedQB !== 'all' && (
            <div className="bg-gray-950/60 border border-gray-850 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-850">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  QB Stack Correlation (Joint Exposure %)
                </h4>
              </div>
              {correlations.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500 italic">
                  Teammates do not appear in any lineups with the selected quarterback.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-900/60 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-850">
                        <th className="px-5 py-3">Stack Teammate</th>
                        <th className="px-5 py-3">Pos</th>
                        <th className="px-5 py-3">Joint Exposure %</th>
                        <th className="px-5 py-3">Correlation Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-850/60">
                      {correlations.map(t => (
                        <tr key={t.name} className="hover:bg-white/[0.01] transition-colors text-xs">
                          <td className="px-5 py-3 text-white font-black">{t.name}</td>
                          <td className="px-5 py-3 text-gray-300 font-mono">{t.pos}</td>
                          <td className="px-5 py-3 text-purple-400 font-mono font-bold">{t.exposureInQBLineups}%</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.exposureInQBLineups >= 50
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : t.exposureInQBLineups >= 20
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-gray-900 text-gray-400 border border-gray-800'
                            }`}>
                              {t.exposureInQBLineups >= 50 ? 'High Stack' : t.exposureInQBLineups >= 20 ? 'Moderate Stack' : 'Low Stack'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Scenario Analysis Engine */}
      {activeSubTab === 'scenario' && (
        <div className="space-y-4">
           <ScenarioEngine />
        </div>
      )}
    </div>
  );
}
