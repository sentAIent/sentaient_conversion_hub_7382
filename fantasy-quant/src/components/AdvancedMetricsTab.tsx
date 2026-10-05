import React from 'react';
import { Activity, ArrowUpRight, BarChart2, Crosshair, TrendingDown, TrendingUp } from '@/components/icons';

interface AdvancedMetricsTabProps {
  stats: any[];
  advanced: any[];
  playerName: string;
}

export function AdvancedMetricsTab({ stats, advanced, playerName }: AdvancedMetricsTabProps) {
  if (!advanced || advanced.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-500 font-mono text-sm border border-white/[0.05] rounded-2xl bg-white/[0.02]">
        NO ADVANCED METRICS LOCATED IN QUANT DATABASE
      </div>
    );
  }

  // Combine and sort by week
  const combined = advanced.map(a => {
    const s = stats.find(stat => stat.games?.season === a.season && stat.games?.week === a.week);
    return { ...a, ...s };
  }).sort((a, b) => b.week - a.week);

  // Calculate season averages
  const avg = (key: string) => {
    const valid = combined.filter(c => c[key] != null);
    if (valid.length === 0) return 0;
    return valid.reduce((sum, c) => sum + Number(c[key]), 0) / valid.length;
  };

  const xFP = avg('expected_fantasy_points');
  const fpoe = avg('fantasy_points_over_expected');
  const yprr = avg('yards_per_route_run');
  const epa = avg('epa_per_play');

  const MetricCard = ({ label, value, sub, good }: any) => (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
      <div className="mt-3 flex items-end justify-between">
        <div className={`text-2xl font-mono tracking-tight ${good ? 'text-green-400' : good === false ? 'text-red-400' : 'text-white'}`}>
          {value}
        </div>
        {sub && <div className="text-xs text-gray-600 mb-1">{sub}</div>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Topline Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Expected Pts (xFP)" value={xFP.toFixed(1)} sub="per game" good={null} />
        <MetricCard label="FPOE" value={fpoe > 0 ? `+${fpoe.toFixed(1)}` : fpoe.toFixed(1)} sub="pts over expected" good={fpoe > 0} />
        <MetricCard label="EPA / Play" value={epa > 0 ? `+${epa.toFixed(2)}` : epa.toFixed(2)} sub="added value" good={epa > 0} />
        <MetricCard label="YPRR" value={yprr.toFixed(2)} sub="yds / route run" good={yprr > 2.0} />
      </div>

      {/* Deep Quant Grid */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 className="text-blue-500" size={18} />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Efficiency & Volume Grid</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-wider border-b border-white/[0.05]">
                <th className="text-left pb-3 pr-4">Wk</th>
                <th className="text-left pb-3 pr-4">xFP</th>
                <th className="text-left pb-3 pr-4">FPOE</th>
                <th className="text-left pb-3 pr-4">Snap %</th>
                <th className="text-left pb-3 pr-4">Tgt %</th>
                <th className="text-left pb-3 pr-4">Air Yds %</th>
                <th className="text-left pb-3 pr-4">WOPR</th>
                <th className="text-left pb-3 pr-4">YAC</th>
                <th className="text-left pb-3 pr-4">EPA</th>
                <th className="text-left pb-3">INT/FUM</th>
              </tr>
            </thead>
            <tbody>
              {combined.map((row, i) => {
                const _fpoe = row.fantasy_points_over_expected || 0;
                const fpoeColor = _fpoe > 0 ? 'text-green-400' : _fpoe < 0 ? 'text-red-400' : 'text-gray-400';
                
                const toPct = (val: any) => val != null ? `${(val * 100).toFixed(0)}%` : '—';
                const ints = row.interceptions || 0;
                const fums = row.fumbles_lost || 0;
                const negs = ints + fums;

                return (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 text-gray-500">{row.week}</td>
                    <td className="py-3 pr-4 text-gray-300">{row.expected_fantasy_points?.toFixed(1) || '—'}</td>
                    <td className={`py-3 pr-4 ${fpoeColor}`}>{_fpoe > 0 ? '+' : ''}{_fpoe.toFixed(1)}</td>
                    <td className="py-3 pr-4 text-blue-300/80">{toPct(row.snap_pct)}</td>
                    <td className="py-3 pr-4 text-blue-300/80">{toPct(row.target_share)}</td>
                    <td className="py-3 pr-4 text-purple-300/80">{toPct(row.air_yards_share)}</td>
                    <td className="py-3 pr-4 text-purple-300/80">{row.wopr?.toFixed(2) || '—'}</td>
                    <td className="py-3 pr-4 text-orange-300/80">{row.yards_after_catch || '—'}</td>
                    <td className={`py-3 pr-4 ${row.epa_per_play > 0 ? 'text-green-300' : 'text-red-300'}`}>{row.epa_per_play?.toFixed(2) || '—'}</td>
                    <td className={`py-3 text-right ${negs > 0 ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                      {negs > 0 ? `${ints}I, ${fums}F` : '0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
