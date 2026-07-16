'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Activity, BarChart2, TrendingUp, CloudRain, Search, AlertTriangle, CheckCircle, Loader2, Target } from 'lucide-react';
import PlayerScreener from './draft/PlayerScreener';
import DraftBoard from './draft/DraftBoard';
import MatchupAnalyzer from './draft/MatchupAnalyzer';
import WeatherImpact from './draft/WeatherImpact';
import InjuryTracker from './draft/InjuryTracker';
import WaiverWire from './draft/WaiverWire';
import PlayerContracts from './draft/PlayerContracts';
import { DollarSign } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface StatRow {
  id: string;
  player_id: string;
  game_id: string;
  ppr_pts: number;
  half_ppr_pts: number;
  standard_pts: number;
  rush_yds: number;
  rec_yds: number;
  receptions: number;
  rush_tds: number;
  rec_tds: number;
  pass_tds: number;
  pass_yds: number;
  players: { name: string; team: string; position: string };
  games: { week: number; season: number; home_team: string; away_team: string; weather?: { temperature_f: number; wind_speed_mph: number; precipitation_type: string }[] };
}

interface AdpRow { format: string; adp: number; season: number; }
interface InjuryRow { week: number; season: number; report_primary_injury: string; report_status: string; practice_status: string; }

type ScoringType = 'ppr_pts' | 'half_ppr_pts' | 'standard_pts';
type ScoringFormat = 'ppr' | 'half_ppr' | 'standard';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const hasInjury = !!d.injury;

  return (
    <div className="bg-[#0a0c10]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[200px] text-sm">
      <div className="px-4 py-3 border-b border-white/5">
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{label}</div>
        <div className="text-2xl font-bold text-blue-400 mt-1">{payload[0].value?.toFixed(1)} <span className="text-xs text-gray-500 font-normal">pts</span></div>
      </div>
      <div className="px-4 py-3 space-y-1.5 text-xs">
        <div className="flex justify-between text-gray-400"><span>Opponent</span><span className="text-white font-medium">{d.opponent || '—'}</span></div>
        <div className="flex justify-between text-gray-400"><span>Rush Yds</span><span className="text-white font-medium">{d.rush_yds ?? '—'}</span></div>
        <div className="flex justify-between text-gray-400"><span>Rec Yds</span><span className="text-white font-medium">{d.rec_yds ?? '—'}</span></div>
        <div className="flex justify-between text-gray-400"><span>Weather</span><span className="text-white font-medium">{d.temp !== 'N/A' ? `${d.temp}°F` : '—'} {d.weather !== 'None' ? d.weather : ''}</span></div>
      </div>
      {hasInjury && (
        <div className="px-4 py-3 bg-red-950/40 border-t border-red-500/20">
          <div className="flex items-center gap-2 text-red-400 font-semibold mb-1 text-xs">
            <AlertTriangle size={12} /> Injury Report
          </div>
          <div className="text-red-300 text-xs">{d.injury}</div>
        </div>
      )}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
  </div>
);

// ─── Injury Badge ─────────────────────────────────────────────────────────────
const InjuryBadge = ({ injury }: { injury: InjuryRow }) => {
  const statusColors: Record<string, string> = {
    Out: 'bg-red-500/20 text-red-400 border-red-500/30',
    Doubtful: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Questionable: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Limited: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Active: 'bg-green-500/20 text-green-400 border-green-500/30',
    Full: 'bg-green-500/20 text-green-400 border-green-500/30',
  };
  const status = injury.report_status || injury.practice_status || 'Unknown';
  const color = statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

  return (
    <div className={`border rounded-lg px-3 py-2 text-xs flex items-start gap-2 ${color}`}>
      <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-bold">Wk {injury.week} — {status}</div>
        <div className="opacity-80">{injury.report_primary_injury || 'Injury'}</div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function PlayerDashboard({ hideHeader = false }: { hideHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [searchInput, setSearchInput] = useState('Christian McCaffrey');
  const [activePlayer, setActivePlayer] = useState('Christian McCaffrey');
  const [stats, setStats] = useState<StatRow[]>([]);
  const [adp, setAdp] = useState<AdpRow[]>([]);
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scoringType, setScoringType] = useState<ScoringType>('ppr_pts');

  const fetchPlayerData = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stats?playerName=${encodeURIComponent(name)}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      
      let filteredStats: StatRow[] = (json.data || []).filter((s: StatRow) => s.players?.name === name);
      filteredStats.sort((a, b) => a.games.week - b.games.week);
      
      setStats(filteredStats);
      setAdp(json.adp || []);
      setInjuries(json.injuries || []);
    } catch (e: any) {
      setError(e.message);
      setStats([]);
      setAdp([]);
      setInjuries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlayerData(activePlayer); }, [activePlayer, fetchPlayerData]);

  // Build chart data
  const chartData = stats.map(stat => {
    const weekInj = injuries.find(inj => inj.week === stat.games.week);
    const myTeam = stat.players?.team;
    const opp = stat.games?.home_team === myTeam ? stat.games?.away_team : `@${stat.games?.home_team}`;
    return {
      name: `Wk ${stat.games.week}`,
      weekNumber: stat.games.week,
      ppr_pts: stat.ppr_pts,
      half_ppr_pts: stat.half_ppr_pts,
      standard_pts: stat.standard_pts,
      rush_yds: stat.rush_yds,
      rec_yds: stat.rec_yds,
      receptions: stat.receptions,
      temp: stat.games?.weather?.[0]?.temperature_f ?? 'N/A',
      weather: stat.games?.weather?.[0]?.precipitation_type ?? 'None',
      opponent: opp,
      injury: weekInj ? `${weekInj.report_primary_injury} — ${weekInj.report_status || weekInj.practice_status}` : null,
    };
  });

  // Summary stats
  const totalPts = stats.reduce((s, r) => s + (r[scoringType === 'ppr_pts' ? 'ppr_pts' : scoringType === 'half_ppr_pts' ? 'half_ppr_pts' : 'standard_pts'] || 0), 0);
  const avgPts = stats.length ? (totalPts / stats.length) : 0;
  const maxPts = stats.length ? Math.max(...stats.map(r => r[scoringType === 'ppr_pts' ? 'ppr_pts' : scoringType === 'half_ppr_pts' ? 'half_ppr_pts' : 'standard_pts'] || 0)) : 0;
  
  const formatMap: Record<ScoringType, ScoringFormat> = { ppr_pts: 'ppr', half_ppr_pts: 'half_ppr', standard_pts: 'standard' };
  const currentAdp = adp.find(a => a.format === formatMap[scoringType])?.adp;
  const playerInfo = stats[0]?.players;
  const activeInjuries = injuries.filter(i => i.report_status && ['Out', 'Doubtful', 'Questionable'].includes(i.report_status));

  const scoringLabels: Record<ScoringType, string> = { ppr_pts: 'PPR', half_ppr_pts: '0.5 PPR', standard_pts: 'STD' };

  return (
    <div className={hideHeader ? 'text-white font-sans' : 'min-h-screen bg-[#070809] text-white font-sans'}>
      {/* ── Header ── */}
      {!hideHeader && (
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#070809]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">FQ</div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">FantasyQuant</h1>
          <span className="text-xs text-gray-600 ml-2">Professional Analytics</span>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">Log In</button>
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 transition-all">Start Free Trial</button>
        </div>
      </header>
      )}
      <div className="flex">
        {/* ── Sidebar ── */}
        <aside className="w-56 flex-shrink-0 border-r border-white/[0.06] min-h-[calc(100vh-57px)] p-4 space-y-6">
          <nav className="space-y-1">
            {[
              { id: 'analysis', icon: Activity, label: 'Player Analysis' },
              { id: 'screener', icon: BarChart2, label: 'Player Screener' },
              { id: 'board', icon: TrendingUp, label: 'Draft Board' },
              { id: 'matchup', icon: Target, label: 'Matchup Analyzer' },
              { id: 'weather', icon: CloudRain, label: 'Weather Impact' },
              { id: 'injuries', icon: AlertTriangle, label: 'Injury Tracker' },
              { id: 'waivers', icon: Search, label: 'Waiver Wire' },
              { id: 'contracts', icon: DollarSign, label: 'Contract History' },
            ].map(({ id, icon: Icon, label }) => (
              <button key={label} onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeTab === id ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'}`}>
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          {/* Recent injuries in sidebar */}
          {activeInjuries.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">Injury Flags</div>
              <div className="space-y-2">
                {activeInjuries.slice(-3).reverse().map((inj, i) => (
                  <InjuryBadge key={i} injury={inj} />
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 space-y-6 overflow-hidden">
          {activeTab === 'analysis' && (
            <>
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && searchInput.trim()) setActivePlayer(searchInput.trim()); }}
                placeholder="Search player... (press Enter)"
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <button
              onClick={() => searchInput.trim() && setActivePlayer(searchInput.trim())}
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
              Search
            </button>
          </div>

          {/* Player Header */}
          {playerInfo && !loading && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-700/30 border border-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-400">
                  {playerInfo.position}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{playerInfo.name}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500">{playerInfo.team}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-sm text-gray-500">{playerInfo.position}</span>
                    {currentAdp && (
                      <>
                        <span className="text-gray-700">·</span>
                        <span className="text-sm px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                          ADP #{currentAdp?.toFixed(1)}
                        </span>
                      </>
                    )}
                    {activeInjuries.length > 0 && (
                      <span className="text-sm px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20 flex items-center gap-1">
                        <AlertTriangle size={10} /> Injury History
                      </span>
                    )}
                    {activeInjuries.length === 0 && stats.length > 0 && (
                      <span className="text-sm px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 flex items-center gap-1">
                        <CheckCircle size={10} /> Healthy
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Scoring toggle */}
              <div className="flex p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl gap-1">
                {(['ppr_pts', 'half_ppr_pts', 'standard_pts'] as ScoringType[]).map(type => (
                  <button key={type} onClick={() => setScoringType(type)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${scoringType === type ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'text-gray-500 hover:text-gray-300'}`}>
                    {scoringLabels[type]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stat Cards */}
          {!loading && stats.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Season Total" value={totalPts.toFixed(1)} sub={`${scoringLabels[scoringType]} pts`} />
              <StatCard label="Avg / Week" value={avgPts.toFixed(1)} sub="points per game" />
              <StatCard label="Best Week" value={maxPts.toFixed(1)} sub="single game high" />
              <StatCard label="Games Played" value={stats.length} sub={`of ${stats.length} tracked`} />
            </div>
          )}

          {/* Main Chart */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            {loading && (
              <div className="h-[340px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-gray-600">
                  <Loader2 size={28} className="animate-spin" />
                  <span className="text-sm">Loading data...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="h-[340px] flex items-center justify-center text-red-400">
                Error: {error}
              </div>
            )}
            {!loading && !error && chartData.length === 0 && (
              <div className="h-[340px] flex items-center justify-center text-gray-600">
                No data found for "{activePlayer}"
              </div>
            )}
            {!loading && !error && chartData.length > 0 && (
              <>
                <div className="text-xs text-gray-600 mb-4 uppercase tracking-widest font-semibold">
                  {scoringLabels[scoringType]} Points — 2023 Season · {activePlayer}
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="name" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} dy={8} />
                    <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} dx={-8} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />
                    <Area type="monotone" dataKey={scoringType} stroke="#3b82f6" strokeWidth={2.5}
                      fill="url(#gradBlue)" fillOpacity={1}
                      activeDot={{ r: 5, fill: '#1d4ed8', stroke: '#93c5fd', strokeWidth: 2 }}
                      dot={(props: any) => {
                        const d = props.payload;
                        if (d.injury) return <circle key={props.key} cx={props.cx} cy={props.cy} r={5} fill="#ef4444" stroke="#fca5a5" strokeWidth={2} />;
                        return <circle key={props.key} cx={props.cx} cy={props.cy} r={3} fill="#3b82f6" stroke="none" />;
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Points</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Injury week</div>
                </div>
              </>
            )}
          </div>

          {/* Injury History Table */}
          {!loading && injuries.length > 0 && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">2023 Injury History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-600 uppercase tracking-wider border-b border-white/[0.05]">
                      <th className="text-left pb-3 pr-6">Week</th>
                      <th className="text-left pb-3 pr-6">Injury</th>
                      <th className="text-left pb-3 pr-6">Game Status</th>
                      <th className="text-left pb-3">Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {injuries.map((inj, i) => {
                      const statusColors: Record<string, string> = {
                        Out: 'text-red-400', Doubtful: 'text-orange-400',
                        Questionable: 'text-yellow-400', Active: 'text-green-400', Full: 'text-green-400'
                      };
                      return (
                        <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="py-3 pr-6 font-mono text-gray-400">Wk {inj.week}</td>
                          <td className="py-3 pr-6 text-white">{inj.report_primary_injury || '—'}</td>
                          <td className={`py-3 pr-6 font-semibold ${statusColors[inj.report_status] || 'text-gray-400'}`}>{inj.report_status || '—'}</td>
                          <td className={`py-3 font-semibold ${statusColors[inj.practice_status] || 'text-gray-400'}`}>{inj.practice_status || '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Weekly Stats Table */}
          {!loading && stats.length > 0 && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Weekly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-600 uppercase tracking-wider border-b border-white/[0.05]">
                      <th className="text-left pb-3 pr-4">Week</th>
                      <th className="text-left pb-3 pr-4">Opp</th>
                      <th className="text-left pb-3 pr-4">Rush Yds</th>
                      <th className="text-left pb-3 pr-4">Rec</th>
                      <th className="text-left pb-3 pr-4">Rec Yds</th>
                      <th className="text-left pb-3 pr-4">TDs</th>
                      <th className="text-left pb-3 pr-4">PPR</th>
                      <th className="text-left pb-3">0.5 PPR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((row, i) => {
                      const opp = row.games?.home_team === row.players?.team ? row.games?.away_team : `@${row.games?.home_team}`;
                      const tds = (row.rush_tds || 0) + (row.rec_tds || 0) + (row.pass_tds || 0);
                      const hasInj = injuries.find(inj => inj.week === row.games.week);
                      return (
                        <tr key={i} className={`border-b border-white/[0.03] hover:bg-white/[0.02] ${hasInj ? 'bg-red-950/10' : ''}`}>
                          <td className="py-3 pr-4 font-mono text-gray-400 flex items-center gap-2">
                            Wk {row.games.week}
                            {hasInj && <AlertTriangle size={10} className="text-red-500" />}
                          </td>
                          <td className="py-3 pr-4 text-gray-300">{opp}</td>
                          <td className="py-3 pr-4 text-white font-medium">{row.rush_yds ?? '—'}</td>
                          <td className="py-3 pr-4 text-gray-300">{row.receptions ?? '—'}</td>
                          <td className="py-3 pr-4 text-gray-300">{row.rec_yds ?? '—'}</td>
                          <td className="py-3 pr-4 text-gray-300">{tds}</td>
                          <td className="py-3 pr-4 font-bold text-blue-400">{row.ppr_pts?.toFixed(1)}</td>
                          <td className="py-3 text-gray-400">{row.half_ppr_pts?.toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'screener' && <PlayerScreener />}
      {activeTab === 'board' && <DraftBoard />}
      {activeTab === 'matchup' && <MatchupAnalyzer />}
      {activeTab === 'weather' && <WeatherImpact />}
      {activeTab === 'injuries' && <InjuryTracker />}
      {activeTab === 'waivers' && <WaiverWire />}
      {activeTab === 'contracts' && <PlayerContracts playerName={activePlayer} />}
    </main>
      </div>
    </div>
  );
}
