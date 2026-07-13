'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
  Zap, Target, TrendingUp, Users, DollarSign, AlertTriangle,
  CheckCircle, Loader2, X, Plus, ChevronDown, ChevronUp,
  RefreshCw, Download, Search, BarChart2, Settings, Cpu, Layers, Share2
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
export type DashboardLayout = {
  vegasProps: boolean;
  advStats: boolean;
  ownership: boolean;
  projPts: boolean;
  salary: boolean;
  valueScore: boolean;
};

export type DFSPlayer = {
  player_id: string;
  salary: number;
  projected_pts: number;
  projected_ownership: number;
  value_score: number;
  platform: string;
  players: { id: string; name: string; position: string; team: string; data_source?: string };
  player_advanced_stats?: { snap_pct: number; target_share: number; wopr: number; adot: number }[];
  player_vegas_props?: { prop_type: string; line: number; over_odds: number; under_odds: number }[];
  injury_status?: string;
  play_probability?: number;
};

// DraftKings slot structure
const DK_SLOTS = ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'FLEX', 'DST'];
const FD_SLOTS = ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'K', 'DST'];
const DK_CAP = 50000;
const FD_CAP = 60000;

const POSITION_COLORS: Record<string, string> = {
  QB: 'text-red-400 bg-red-500/10 border-red-500/20',
  RB: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  WR: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  TE: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  DST: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  K: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
};

function matchupGrade(rankVsPosition: number | null): { grade: string; color: string } {
  if (!rankVsPosition) return { grade: 'N/A', color: 'text-gray-500' };
  if (rankVsPosition <= 5) return { grade: 'A+', color: 'text-emerald-400' };
  if (rankVsPosition <= 10) return { grade: 'A', color: 'text-emerald-400' };
  if (rankVsPosition <= 16) return { grade: 'B', color: 'text-yellow-400' };
  if (rankVsPosition <= 22) return { grade: 'C', color: 'text-orange-400' };
  if (rankVsPosition <= 28) return { grade: 'D', color: 'text-red-400' };
  return { grade: 'F', color: 'text-red-600' };
}

// ─── Value Score Badge ────────────────────────────────────────────────────────
const ValueBadge = ({ score }: { score: number }) => {
  const tier = score >= 0.7 ? 'elite' : score >= 0.55 ? 'good' : score >= 0.4 ? 'avg' : 'poor';
  const colors = {
    elite: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    good: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    avg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    poor: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${colors[tier]}`}>
      {score.toFixed(2)}x
    </span>
  );
};

// ─── Injury Badge ────────────────────────────────────────────────────────────
const InjuryBadge = ({ status, prob }: { status?: string, prob?: number }) => {
  if (!status) return null;
  const s = status.toLowerCase();
  
  if (s === 'out' || s === 'ir') {
    return <span className="ml-1.5 px-1 py-0.5 text-[8px] font-bold bg-red-500/20 text-red-400 rounded">OUT</span>;
  }
  if (s === 'doubtful') {
    return <span className="ml-1.5 px-1 py-0.5 text-[8px] font-bold bg-orange-500/20 text-orange-400 rounded" title={`Doubtful (~${(prob! * 100).toFixed(0)}% to play)`}>D</span>;
  }
  if (s === 'questionable') {
    return <span className="ml-1.5 px-1 py-0.5 text-[8px] font-bold bg-yellow-500/20 text-yellow-400 rounded" title={`Questionable (~${(prob! * 100).toFixed(0)}% to play)`}>Q ({(prob! * 100).toFixed(0)}%)</span>;
  }
  return <span className="ml-1.5 px-1 py-0.5 text-[8px] font-bold bg-gray-500/20 text-gray-400 rounded">{status.substring(0, 1).toUpperCase()}</span>;
};

// ─── Player Row ───────────────────────────────────────────────────────────────
const PlayerRow = ({ player, onAdd, isInLineup, isDisabled, layout, isLive, actualPts }: {
  player: DFSPlayer; onAdd: () => void; isInLineup: boolean; isDisabled: boolean; layout: DashboardLayout; isLive?: boolean; actualPts?: { pts: number, source: string };
}) => {

  const p = player.players;
  const posColors = POSITION_COLORS[p?.position] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  const props = player.player_vegas_props || [];
  const rushProp = props.find(x => x.prop_type === 'rush_yds');
  const recProp = props.find(x => x.prop_type === 'rec_yds');
  const passProp = props.find(x => x.prop_type === 'pass_yds');
  const mainProp = passProp || recProp || rushProp;

  const advStats = player.player_advanced_stats?.[0];
  const ownership = (player.projected_ownership * 100).toFixed(1);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group ${isInLineup ? 'bg-blue-500/5' : ''} ${isDisabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${posColors} flex-shrink-0 w-8 text-center`}>
        {p?.position}
      </span>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white flex items-center">
          <span className="truncate">{player.players?.name}</span>
          {player.players?.data_source && (
             <span className="ml-2 text-[9px] px-1 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 uppercase tracking-wider">
               {player.players.data_source}
             </span>
          )}
          <InjuryBadge status={player.injury_status} prob={player.play_probability} />
        </div>
        <div className="text-xs text-gray-600">{p?.team}</div>
      </div>

      {layout.vegasProps && (mainProp ? (
        <div className="text-xs text-center hidden sm:block w-16">
          <div className="text-gray-400">{mainProp.prop_type.replace('_', ' ')}</div>
          <div className="text-white font-semibold">{mainProp.line}</div>
          <div className={mainProp.over_odds < 0 ? 'text-green-500' : 'text-red-400'}>
            o{mainProp.over_odds > 0 ? '+' : ''}{mainProp.over_odds}
          </div>
        </div>
      ) : <div className="w-16 hidden sm:block" />)}

      {layout.advStats && (advStats?.target_share != null ? (
        <div className="text-xs text-center hidden md:block w-14">
          <div className="text-gray-500">Tgt%</div>
          <div className="text-white font-semibold">{(advStats.target_share * 100).toFixed(0)}%</div>
        </div>
      ) : <div className="w-14 hidden md:block" />)}

      {layout.ownership && (
        <div className="text-xs text-center w-12">
          <div className="text-gray-500">Own</div>
          <div className={`font-semibold ${parseFloat(ownership) > 25 ? 'text-orange-400' : parseFloat(ownership) < 10 ? 'text-emerald-400' : 'text-white'}`}>
            {ownership}%
          </div>
        </div>
      )}

      {layout.projPts && (
        <div className="text-xs text-center w-14">
          <div className="text-gray-500">{isLive ? 'Act/Proj' : 'Proj'}</div>
          {isLive ? (
             <div className="flex flex-col items-center">
               <div className="text-emerald-400 font-bold leading-tight">{actualPts?.pts?.toFixed(1) || '0.0'}</div>
               <div className="text-[9px] text-gray-500 font-bold">[{actualPts?.source || '...'}]</div>
             </div>
          ) : (
             <div className="text-blue-400 font-bold">{player.projected_pts.toFixed(1)}</div>
          )}
        </div>
      )}

      {layout.salary && (
        <div className="text-xs text-center w-16">
          <div className="text-gray-500">Salary</div>
          <div className="text-white font-semibold">${(player.salary / 1000).toFixed(1)}K</div>
        </div>
      )}

      {layout.valueScore && (
        <div className="hidden lg:flex items-center w-12 justify-center">
          <ValueBadge score={player.value_score} />
        </div>
      )}

      <button
        onClick={onAdd}
        disabled={isInLineup || isDisabled}
        className={`ml-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
          isInLineup
            ? 'bg-blue-500/20 text-blue-400 cursor-default'
            : 'bg-white/[0.05] text-gray-500 hover:bg-emerald-500/20 hover:text-emerald-400'
        }`}
      >
        {isInLineup ? <CheckCircle size={14} /> : <Plus size={14} />}
      </button>
    </div>
  );
};

// ─── Lineup Slot ─────────────────────────────────────────────────────────────
const LineupSlot = ({ slot, player, onRemove }: {
  slot: string; player: DFSPlayer | null; onRemove: () => void;
}) => {
  const posColors = player ? POSITION_COLORS[player.players?.position] || POSITION_COLORS.K : '';
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
      player
        ? 'bg-white/[0.03] border-white/[0.08]'
        : 'border-dashed border-white/[0.08] bg-transparent'
    }`}>
      <span className="text-xs font-bold text-gray-600 w-8 flex-shrink-0 text-center">{slot}</span>
      {player ? (
        <>
          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${posColors} flex-shrink-0`}>
            {player.players?.position}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white flex items-center truncate">
              {player.players?.name}
              <InjuryBadge status={player.injury_status} prob={player.play_probability} />
            </div>
            <div className="text-xs text-gray-600">{player.players?.team}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-blue-400 font-bold">{player.projected_pts.toFixed(1)} pts</div>
            <div className="text-xs text-gray-500">${(player.salary / 1000).toFixed(1)}K</div>
          </div>
          <button onClick={onRemove} className="ml-1 text-gray-600 hover:text-red-400 transition-colors">
            <X size={14} />
          </button>
        </>
      ) : (
        <div className="text-xs text-gray-700 italic">Empty — add from pool</div>
      )}
    </div>
  );
};

// ─── Main DFS Dashboard ───────────────────────────────────────────────────────
export default function DFSDashboard() {
  const [platform, setPlatform] = useState<'dk' | 'fd'>('dk');
  const [week, setWeek] = useState(14);
  const [posFilter, setPosFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'projected_pts' | 'value_score' | 'projected_ownership' | 'salary'>('projected_pts');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [playerPool, setPlayerPool] = useState<DFSPlayer[]>([]);
  const [lineup, setLineup] = useState<(DFSPlayer | null)[]>(new Array(9).fill(null));
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stackMode, setStackMode] = useState(false);
  const [lockedPlayers, setLockedPlayers] = useState<Set<string>>(new Set());
  const [excludedPlayers, setExcludedPlayers] = useState<Set<string>>(new Set());

  const toggleLock = (playerId: string) => {
    setLockedPlayers(prev => {
      const next = new Set(prev);
      if (next.has(playerId)) next.delete(playerId);
      else {
        next.add(playerId);
        // Remove from excluded if adding to locked
        setExcludedPlayers(ex => {
          const newEx = new Set(ex);
          newEx.delete(playerId);
          return newEx;
        });
      }
      return next;
    });
  };

  const toggleExclude = (playerId: string) => {
    setExcludedPlayers(prev => {
      const next = new Set(prev);
      if (next.has(playerId)) next.delete(playerId);
      else {
        next.add(playerId);
        // Remove from locked if adding to excluded
        setLockedPlayers(lk => {
          const newLk = new Set(lk);
          newLk.delete(playerId);
          return newLk;
        });
      }
      return next;
    });
  };
  const [gppMode, setGppMode] = useState(true);
  const [hideOut, setHideOut] = useState(true);
  const [refreshingOdds, setRefreshingOdds] = useState(false);
  const [oddsMsg, setOddsMsg] = useState('');
  const [vegasGames, setVegasGames] = useState<any[]>([]);
  const [showMultiLineup, setShowMultiLineup] = useState(false);
  const [mmeConfig, setMmeConfig] = useState({
    numLineups: 20,
    maxExposure: 30, // 30%
    forceQBStack: true,
    forceRunback: false
  });
  const [mmeLineups, setMmeLineups] = useState<(DFSPlayer | null)[][]>([]);
  const [sharingIdx, setSharingIdx] = useState<number | null>(null);
  const [isGeneratingMME, setIsGeneratingMME] = useState(false);
  const [mmeProgress, setMmeProgress] = useState(0);

  const [dashboardLayout, setDashboardLayout] = useState<DashboardLayout>({
    vegasProps: true,
    advStats: true,
    ownership: true,
    projPts: true,
    salary: true,
    valueScore: true
  });
  const [isLive, setIsLive] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lateSwapTarget, setLateSwapTarget] = useState<number>(180);

    const [liveStats, setLiveStats] = useState<Record<string, { pts: number, source: string }>>({});
  const [liveDataProvider, setLiveDataProvider] = useState<string>('sleeper');

  const slots = platform === 'dk' ? DK_SLOTS : FD_SLOTS;
  const cap = platform === 'dk' ? DK_CAP : FD_CAP;

  // Sync settings with backend
  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const res = await fetch('/api/user/settings');
        if (res.ok) {
          const { data } = await res.json();
          if (data && isMounted) {
            if (data.mme_config) setMmeConfig(data.mme_config);
            if (data.dashboard_layout) setDashboardLayout(data.dashboard_layout);
          }
        }
      } catch (e) {
        console.error('Failed to load user settings', e);
      }
    }
    loadSettings();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    // Only save if the config has changed from defaults
    // In a real app we might track an initialLoad flag to prevent 
    // saving default state immediately, but upserting is fine.
    const handler = setTimeout(async () => {
      try {
        await fetch('/api/user/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mme_config: mmeConfig, dashboard_layout: dashboardLayout })
        });
      } catch (e) {
        console.error('Failed to save user settings', e);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(handler);
  }, [mmeConfig, dashboardLayout]);


  // Fetch live stats from adapter
  useEffect(() => {
    if (!isLive) return;
    const fetchLive = async () => {
      const ids = playerPool.slice(0, 50).map(p => p.player_id); // Fetch top 50 for demo to avoid massive payload
      if (ids.length === 0) return;
      try {
        const res = await fetch('/api/live-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerIds: ids, provider: liveDataProvider })
        });
        const json = await res.json();
        if (json.data) {
          setLiveStats(prev => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        console.error("Live fetch error", err);
      }
    };
    fetchLive();
    const interval = setInterval(fetchLive, 3000);
    return () => clearInterval(interval);
  }, [isLive, playerPool, liveDataProvider]);

  const fetchPool = useCallback(async () => {
    setLoading(true);
    try {
      const [poolRes, oddsRes] = await Promise.all([
        fetch(`/api/optimize?week=${week}&season=2023&platform=${platform}`),
        fetch(`/api/odds?season=2026&week=1`)
      ]);
      let poolJson: any = {};
      let oddsJson: any = {};
      
      try {
        if (poolRes.ok) poolJson = await poolRes.json();
      } catch (e) { console.error("Failed to parse pool JSON:", e); }
      
      try {
        if (oddsRes.ok) oddsJson = await oddsRes.json();
      } catch (e) { console.error("Failed to parse odds JSON:", e); }
      
      setPlayerPool(poolJson.data || []);
      setVegasGames(oddsJson.gameLines || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [week, platform]);

  const refreshLiveOdds = async () => {
    setRefreshingOdds(true);
    setOddsMsg('');
    try {
      const res = await fetch('/api/odds/refresh', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setOddsMsg(`Success: ${data.message} (${data.creditsRemaining} credits left)`);
        fetchPool();
      } else {
        setOddsMsg(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setOddsMsg(`Error: ${e.message}`);
    } finally {
      setRefreshingOdds(false);
    }
  };

  useEffect(() => { 
    // Ignore effect sync error for fetching pool initially
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPool(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSalary = lineup.reduce((s, p) => s + (p?.salary || 0), 0);
  const remaining = cap - totalSalary;
  const totalProjPts = lineup.reduce((s, p) => s + (p?.projected_pts || 0), 0);
  const totalOwnership = lineup.filter(Boolean).length > 0
    ? lineup.reduce((s, p) => s + (p?.projected_ownership || 0), 0) / lineup.filter(Boolean).length * 100
    : 0;
  const isOverCap = totalSalary > cap;
  const lineupFull = lineup.every(Boolean);

  const filteredPool = useMemo(() => {
    let displayPool = playerPool;
    if (posFilter !== 'ALL') {
      displayPool = displayPool.filter(p => p.players?.position === posFilter);
    }
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      displayPool = displayPool.filter(p => p.players?.name.toLowerCase().includes(s) || p.players?.team.toLowerCase().includes(s));
    }
    
    if (hideOut) {
      displayPool = displayPool.filter(p => {
        const s = (p.injury_status || '').toLowerCase();
        return !['out', 'ir', 'doubtful'].includes(s);
      });
    }

    return displayPool.sort((a, b) => {
      const av = a[sortBy] ?? 0;
      const bv = b[sortBy] ?? 0;
      return sortDir === 'desc' ? bv - av : av - bv;
    });
  }, [playerPool, posFilter, searchTerm, hideOut, sortBy, sortDir]);

  const alternatives = useMemo(() => {
    return playerPool.filter(p => {
      // Exclude Out/IR
      const s = (p.injury_status || '').toLowerCase();
      if (['out', 'ir'].includes(s)) return false;
      return p.value_score >= 0.65;
    }).sort((a, b) => b.value_score - a.value_score).slice(0, 8);
  }, [playerPool]);

  const lineupPlayerIds = new Set(lineup.filter(Boolean).map(p => p!.player_id));

  const addPlayer = (player: DFSPlayer) => {
    if (lineupPlayerIds.has(player.player_id)) return;
    const pos = player.players?.position;
    const newLineup = [...lineup];
    const slotIndex = slots.findIndex((slot, i) => {
      if (newLineup[i] !== null) return false;
      if (slot === pos) return true;
      if (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(pos)) return true;
      return false;
    });
    if (slotIndex === -1) return;
    newLineup[slotIndex] = player;
    setLineup(newLineup);
  };

  const removePlayer = (index: number) => {
    const newLineup = [...lineup];
    newLineup[index] = null;
    setLineup(newLineup);
  };

  const clearLineup = () => setLineup(new Array(9).fill(null));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const evaluateLateSwap = () => {
    if (!isLive) return;
    
    const lockedSlots: number[] = [];
    let lockedPts = 0;
    let lockedSalary = 0;
    
    lineup.forEach((p, i) => {
      if (p && liveStats[p.player_id] !== undefined) {
        lockedSlots.push(i);
        lockedPts += liveStats[p.player_id].pts;
        lockedSalary += p.salary;
      }
    });
    
    const budgetLeft = 50000 - lockedSalary;
    const ptsNeeded = lateSwapTarget - lockedPts;
    console.log('Pts needed for target:', ptsNeeded);
    
    const newLineup = [...lineup];
    let swappedCount = 0;
    
    // Simple greedy pivot: swap unlocked players for higher ceiling players
    for (let i = 0; i < newLineup.length; i++) {
      if (newLineup[i] && !lockedSlots.includes(i)) {
        const currentP = newLineup[i]!;
        // Find a replacement in playerPool with same pos, affordable, and higher ceiling (projected_pts * 1.2)
        const pivot = playerPool.find(p => 
           p.player_id !== currentP.player_id && 
           (p.players?.position === slots[i] || (slots[i] === 'FLEX' && ['RB','WR','TE'].includes(p.players?.position || ''))) &&
           p.salary <= budgetLeft - (newLineup.filter((_, idx) => !lockedSlots.includes(idx) && idx !== i).reduce((sum, p) => sum + (p ? p.salary : 0), 0)) &&
           p.projected_pts > currentP.projected_pts &&
           parseFloat((p.projected_ownership * 100).toFixed(1)) < 15 // contrarian pivot
        );
        
        if (pivot) {
          newLineup[i] = pivot;
          swappedCount++;
        }
      }
    }
    
    if (swappedCount > 0) {
      setLineup(newLineup);
      alert(`Late Swap Executed: Pivoted ${swappedCount} players for higher upside!`);
    } else {
      alert("No optimal pivots found within budget constraints.");
    }
  };


  const exportCSV = () => {
    if (!lineupFull) return;
    const headers = ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'FLEX', 'DST'];
    const row = lineup.map(p => p?.player_id || '').join(',');
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\\n" + row + "\\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dk_lineup.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickFill = () => {
    // True greedy heuristic optimizer
    const newLineup: (DFSPlayer | null)[] = [...lineup];
    const used = new Set<string>();
    let budgetLeft = cap;
    
    // First, account for already filled/locked slots
    for (let i = 0; i < slots.length; i++) {
      if (newLineup[i]) {
        used.add(newLineup[i]!.player_id);
        budgetLeft -= newLineup[i]!.salary;
      }
    }
    
    // Auto-fill locked players into empty slots if possible
    lockedPlayers.forEach(pid => {
      if (!used.has(pid)) {
        const p = playerPool.find(x => x.player_id === pid);
        if (p) {
          // find first empty slot it fits in
          for (let i = 0; i < slots.length; i++) {
            if (!newLineup[i]) {
              const pos = p.players?.position;
              const slot = slots[i];
              const fits = slot === pos || (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(pos));
              if (fits) {
                newLineup[i] = p;
                used.add(pid);
                budgetLeft -= p.salary;
                break;
              }
            }
          }
        }
      }
    });

    // Fill remaining empty slots
    for (let i = 0; i < slots.length; i++) {
      if (newLineup[i]) continue;
      const slot = slots[i];
      const eligible = playerPool.filter(p => {
        if (used.has(p.player_id)) return false;
        if (excludedPlayers.has(p.player_id)) return false;
        const pos = p.players?.position;
        if (slot === pos) return true;
        if (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(pos)) return true;
        return false;
      }).sort((a, b) => b.projected_pts - a.projected_pts);
      
      for (const player of eligible) {
        // Assume absolute minimum salary for remaining slots is 2500
        const minCostRemaining = (slots.length - i - 1) * 2500;
        if (player.salary <= budgetLeft - minCostRemaining) {
          newLineup[i] = player;
          used.add(player.player_id);
          budgetLeft -= player.salary;
          break;
        }
      }
    }
    setLineup(newLineup);
  };

  const generateMME = async () => {
    setIsGeneratingMME(true);
    setMmeProgress(0);
    const generated: (DFSPlayer | null)[][] = [];
    
    // Simulate web worker / non-blocking by chunking the loop
    const maxIters = mmeConfig.numLineups;
    const exposureCounts = new Map<string, number>();
    
    const runBatch = (startIdx: number) => {
      const endIdx = Math.min(startIdx + 5, maxIters); // do 5 lineups at a time
      
      for (let i = startIdx; i < endIdx; i++) {
        // Base constraints
        const currentExcluded = new Set(excludedPlayers);
        const currentLocked = new Set(lockedPlayers);
        
        // Enforce max exposure limits dynamically
        exposureCounts.forEach((count, pid) => {
          if (count / maxIters >= mmeConfig.maxExposure / 100) {
            currentExcluded.add(pid);
          }
        });
        
        const newLineup: (DFSPlayer | null)[] = new Array(9).fill(null);
        const used = new Set<string>();
        let budgetLeft = cap;

        // Auto-fill locked players
        currentLocked.forEach(pid => {
          if (!used.has(pid)) {
            const p = playerPool.find(x => x.player_id === pid);
            if (p) {
              for (let j = 0; j < slots.length; j++) {
                if (!newLineup[j]) {
                  const pos = p.players?.position;
                  const slot = slots[j];
                  const fits = slot === pos || (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(pos));
                  if (fits) {
                    newLineup[j] = p;
                    used.add(pid);
                    budgetLeft -= p.salary;
                    break;
                  }
                }
              }
            }
          }
        });

        // ── Stacking Rules ──
        if (mmeConfig.forceQBStack) {
            let qb = newLineup.find(p => p?.players?.position === 'QB');
            if (!qb) {
                const qbs = playerPool.filter(p => p.players?.position === 'QB' && !currentExcluded.has(p.player_id));
                qb = qbs[Math.floor(Math.random() * Math.min(15, qbs.length))];
                if (qb) {
                    const qbIndex = slots.indexOf('QB');
                    newLineup[qbIndex] = qb;
                    used.add(qb.player_id);
                    budgetLeft -= qb.salary;
                }
            }

            if (qb) {
                const qbTeam = qb.players?.team;
                const hasStack = newLineup.some(p => p && p.players?.team === qbTeam && ['WR', 'TE'].includes(p.players.position));
                if (!hasStack) {
                    const stackMates = playerPool.filter(p => p.players?.team === qbTeam && ['WR', 'TE'].includes(p.players.position) && !used.has(p.player_id) && !currentExcluded.has(p.player_id));
                    if (stackMates.length > 0) {
                        const mate = stackMates[Math.floor(Math.random() * Math.min(3, stackMates.length))];
                        for (let j = 0; j < slots.length; j++) {
                            if (!newLineup[j] && (slots[j] === mate.players?.position || slots[j] === 'FLEX')) {
                                newLineup[j] = mate;
                                used.add(mate.player_id);
                                budgetLeft -= mate.salary;
                                break;
                            }
                        }
                    }
                }
            }
        }
        
        // ── Fill Remaining Slots ──
        for (let j = 0; j < slots.length; j++) {
          if (newLineup[j]) continue;
          const slot = slots[j];
          const eligible = playerPool.filter(p => {
            if (used.has(p.player_id)) return false;
            if (currentExcluded.has(p.player_id)) return false;
            const pos = p.players?.position;
            if (slot === pos) return true;
            if (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(pos)) return true;
            return false;
          }).sort((a, b) => b.projected_pts - a.projected_pts);
          
          const topN = eligible.slice(0, 3);
          const player = topN[Math.floor(Math.random() * topN.length)];
          
          if (player) {
            const minCostRemaining = (slots.length - j - 1) * 2500;
            if (player.salary <= budgetLeft - minCostRemaining) {
              newLineup[j] = player;
              used.add(player.player_id);
              budgetLeft -= player.salary;
            } else {
               for (const fallback of eligible) {
                    if (fallback.salary <= budgetLeft - minCostRemaining) {
                        newLineup[j] = fallback;
                        used.add(fallback.player_id);
                        budgetLeft -= fallback.salary;
                        break;
                    }
               }
            }
          }
        }
        
        // Record exposure
        newLineup.forEach(p => {
            if (p) {
                exposureCounts.set(p.player_id, (exposureCounts.get(p.player_id) || 0) + 1);
            }
        });
        
        generated.push(newLineup);
      }
      
      setMmeProgress(Math.floor((endIdx / maxIters) * 100));
      
      if (endIdx < maxIters) {
        setTimeout(() => runBatch(endIdx), 100);
      } else {
        setMmeLineups(generated);
        setIsGeneratingMME(false);
      }
    };
    
    setTimeout(() => runBatch(0), 100);
  };
  
  const exportMME = () => {
    if (mmeLineups.length === 0) return;
    const headers = ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'FLEX', 'DST'];
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n";
    
    mmeLineups.forEach(lu => {
        const row = lu.map(p => (p as any)?.name ? `"${(p as any).name}"` : '').join(',');
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dk_mme_${mmeConfig.numLineups}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareLineup = async (idx: number, lu: (DFSPlayer | null)[], totalProj: number, totalSal: number) => {
    setSharingIdx(idx);
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineup: lu, totalProj, totalSal }),
      });
      const data = await res.json();
      if (data.id) {
        // copy link to clipboard
        const url = `${window.location.origin}/lineup/${data.id}`;
        await navigator.clipboard.writeText(url);
        alert('Share link copied to clipboard!');
      } else {
        alert(data.error || 'Failed to share lineup');
      }
    } catch (e) {
      alert('Error sharing lineup');
    } finally {
      setSharingIdx(null);
    }
  };

  const sortToggle = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  const SortIcon = ({ col }: { col: typeof sortBy }) => (
    sortBy === col
      ? (sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />)
      : <span className="w-3" />
  );

  return (
    <div className="flex h-[calc(100vh-57px)] overflow-hidden">
      <div className="flex flex-col w-[55%] border-r border-white/[0.06] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Player Pool</h2>
              <span className="text-xs text-gray-600">Week {week} · {platform.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <select value={week} onChange={e => setWeek(parseInt(e.target.value))} className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none">
                {Array.from({length: 18}, (_, i) => i + 1).map(w => <option key={w} value={w} className="bg-[#0f1115]">Week {w}</option>)}
              </select>
              <div className="flex p-0.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                {(['dk', 'fd'] as const).map(p => (
                  <button key={p} onClick={() => setPlatform(p)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${platform === p ? 'bg-blue-500/20 text-blue-400' : 'text-gray-600 hover:text-gray-400'}`}>{p.toUpperCase()}</button>
                ))}
              </div>
              <button onClick={fetchPool} className="p-1.5 text-gray-600 hover:text-white transition-colors"><RefreshCw size={14} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="text" placeholder="Search players, teams..." className="w-full pl-8 pr-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-xs text-white outline-none focus:border-blue-500/50 transition-colors" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => setHideOut(!hideOut)} className={`px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors ${hideOut ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-500/20 text-gray-400'}`}>
              {hideOut ? 'Hiding OUT/IR/D' : 'Showing All'}
            </button>
            {['ALL', 'QB', 'RB', 'WR', 'TE', 'DST'].map(pos => (
              <button key={pos} onClick={() => setPosFilter(pos)} className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg transition-all ${posFilter === pos ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-600 hover:text-gray-400 bg-white/[0.02] border border-white/[0.05]'}`}>
                {pos}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-2 border-b border-white/[0.05] pb-2">
             <div className="flex items-center gap-2 text-[10px] text-gray-400">
               <span className="font-bold">Columns:</span>
               {Object.keys(dashboardLayout).map(key => (
                 <button
                   key={key}
                   onClick={() => setDashboardLayout(prev => ({ ...prev, [key]: !prev[key as keyof DashboardLayout] }))}
                   className={`px-2 py-1 rounded transition-colors ${dashboardLayout[key as keyof DashboardLayout] ? 'bg-blue-500/20 text-blue-400' : 'bg-white/[0.05] text-gray-500'}`}
                 >
                   {key}
                 </button>
               ))}
             </div>
             
             <div className="flex-1" />
             
             {isLive && (
               <select 
                 value={liveDataProvider} 
                 onChange={e => setLiveDataProvider(e.target.value)}
                 className="bg-white/[0.04] border border-white/[0.08] rounded text-[10px] text-gray-300 focus:outline-none p-1"
               >
                 <option value="sleeper" className="bg-[#0f1115]">Sleeper (Free)</option>
                 <option value="api-sports" className="bg-[#0f1115]">API-Sports</option>
                 <option value="sportsdataio" className="bg-[#0f1115]">SportsDataIO</option>
                 <option value="nfl-scraper" className="bg-[#0f1115]">NFL.com Scraper</option>
               </select>
             )}
             
             <button
               onClick={() => setIsLive(!isLive)}
               className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 ${isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-gray-500/20 text-gray-400'}`}
             >
               <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-400' : 'bg-gray-500'}`} />
               {isLive ? 'LIVE MODE ON' : 'ENABLE LIVE'}
             </button>
          </div>

          <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-600">
            <span className="mr-2">Sort:</span>
            {[['projected_pts', 'Proj Pts'], ['value_score', 'Value'], ['projected_ownership', 'Ownership'], ['salary', 'Salary']] .map(([key, label]) => (
              <button key={key} onClick={() => sortToggle(key as typeof sortBy)} className={`flex items-center gap-0.5 px-2 py-1 rounded transition-all ${sortBy === key ? 'text-white bg-white/[0.05]' : 'hover:text-gray-400'}`}>
                {label} <SortIcon col={key as typeof sortBy} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          
          {/* High-Upside Alternatives */}
          {!loading && alternatives.length > 0 && !searchTerm && (
            <div className="mb-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/5 border-b border-white/[0.05] p-4">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <TrendingUp size={14} /> High-Upside Alternatives
              </div>
              <div className="space-y-1">
                {alternatives.map(player => (
                  <PlayerRow
                    key={`alt-${player.player_id}`}
                    player={player}
                    onAdd={() => addPlayer(player)}
                    isInLineup={lineupPlayerIds.has(player.player_id)}
                    isDisabled={false}
                    layout={dashboardLayout}
                    isLive={isLive}
                    actualPts={liveStats[player.player_id]}
                  />
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-600">
              <Loader2 size={20} className="animate-spin mr-2" /> Loading player pool...
            </div>
          ) : filteredPool.length === 0 ? (
            <div className="text-center text-gray-700 py-16 text-sm">No players found</div>
          ) : (
            filteredPool.slice(0, 100).map(player => (
              <PlayerRow
                key={player.player_id}
                player={player}
                onAdd={() => addPlayer(player)}
                isInLineup={lineupPlayerIds.has(player.player_id)}
                isDisabled={false}
                    layout={dashboardLayout}
                    isLive={isLive}
                    actualPts={liveStats[player.player_id]}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Right: Lineup Builder ── */}
      <div className="flex flex-col w-[45%] overflow-hidden">
        {/* Lineup header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Lineup Builder</h2>
              <button 
                onClick={() => setShowMultiLineup(true)}
                className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all uppercase tracking-wider"
              >
                <Layers size={12} /> Multi-Entry
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={quickFill}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-lg hover:bg-indigo-500/20 transition-all">
                <Zap size={12} /> Quick Fill
              </button>
              <button onClick={clearLineup}
                className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs rounded-lg hover:text-white transition-all">
                Clear
              </button>
            </div>
          </div>

          {/* Cap tracker */}
          <div className={`rounded-xl px-4 py-3 border ${isOverCap ? 'bg-red-500/10 border-red-500/20' : lineupFull ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/[0.03] border-white/[0.06]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Salary Used</span>
              <span className={`text-xs font-bold ${isOverCap ? 'text-red-400' : 'text-white'}`}>
                ${totalSalary.toLocaleString()} / ${cap.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isOverCap ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, totalSalary / cap * 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className={isOverCap ? 'text-red-400 font-bold' : 'text-gray-500'}>
                {isOverCap ? `Over cap by $${(totalSalary - cap).toLocaleString()}` : `$${remaining.toLocaleString()} remaining`}
              </span>
              <div className="flex items-center gap-3 text-gray-500">
                <span>Proj: <span className="text-blue-400 font-bold">{totalProjPts.toFixed(1)}</span></span>
                <span>Avg Own: <span className={totalOwnership > 20 ? 'text-orange-400 font-bold' : 'text-white font-bold'}>{totalOwnership.toFixed(1)}%</span></span>
              </div>
            </div>
          </div>

          {/* Mode toggles */}
          <div className="flex gap-2 mt-3">
            <button onClick={() => setGppMode(m => !m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${gppMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-white/[0.03] border-white/[0.06] text-gray-500'}`}>
              <Target size={12} /> GPP Mode
            </button>
            <button onClick={() => setStackMode(m => !m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${stackMode ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-white/[0.03] border-white/[0.06] text-gray-500'}`}>
              <Zap size={12} /> Stack Builder
            </button>
          </div>
        </div>

        {/* Lineup slots */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {slots.map((slot, i) => (
            <LineupSlot key={`${slot}-${i}`} slot={slot} player={lineup[i]} onRemove={() => removePlayer(i)} />
          ))}

          {/* Stack indicator */}
          {stackMode && (
            <div className="mt-3 p-3 bg-yellow-500/5 border border-yellow-500/15 rounded-xl">
              <div className="text-xs font-bold text-yellow-400 mb-1 flex items-center gap-1.5">
                <Zap size={12} /> Stack Analysis
              </div>
              {(() => {
                const qb = lineup.find(p => p?.players?.position === 'QB');
                const qbTeam = qb?.players?.team;
                const stackMates = lineup.filter(p => p && p.players?.team === qbTeam && p.players?.position !== 'QB' && p.players?.position !== 'DST');
                if (!qb) return <div className="text-xs text-gray-600">Add a QB to see stack recommendations</div>;
                return (
                  <div className="text-xs text-gray-400">
                    <span className="text-white font-semibold">{qb.players?.name}</span> stacked with{' '}
                    {stackMates.length > 0
                      ? stackMates.map(p => <span key={p!.player_id} className="text-yellow-300 font-semibold">{p!.players?.name}</span>).reduce((a, b) => <>{a}, {b}</>)
                      : <span className="text-gray-600 italic">no receivers yet — add WR/TE from {qbTeam}</span>
                    }
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Lineup footer actions */}
        <div className="px-5 py-4 border-t border-white/[0.06] flex-shrink-0 space-y-2">
          <button
            disabled={!lineupFull || isOverCap || optimizing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            {optimizing ? <Loader2 size={16} className="animate-spin" /> : <Target size={16} />}
            {lineupFull ? (isOverCap ? 'Over Cap — Adjust Lineup' : 'Lock Lineup ✓') : `Add ${lineup.filter(p => !p).length} More Players`}
          </button>
          <div className="flex gap-2">
            <button onClick={exportCSV} disabled={!lineupFull} className="flex-1 py-2 bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs font-semibold rounded-xl hover:text-white transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
              <Download size={12} /> Export CSV
            </button>
            <button
              onClick={quickFill}
              className="flex-1 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-xl hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Zap size={12} /> Auto-Optimize
            </button>
          </div>
        </div>
      </div>

      {/* ── MME Modal ── */}
      {showMultiLineup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-[#0f1115] border border-white/[0.08] w-full max-w-4xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Layers size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest">Multi-Entry Generator</h2>
                  <p className="text-xs text-gray-500">Mass generate up to 150 mathematically optimized lineups.</p>
                </div>
              </div>
              <button onClick={() => setShowMultiLineup(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex min-h-0">
                
                {/* Settings Panel */}
                <div className="w-1/3 border-r border-white/[0.06] p-6 overflow-y-auto space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Generation Config</label>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm text-gray-300 font-semibold">Number of Lineups</span>
                                    <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{mmeConfig.numLineups}</span>
                                </div>
                                <input type="range" min="1" max="150" value={mmeConfig.numLineups} onChange={e => setMmeConfig({...mmeConfig, numLineups: parseInt(e.target.value)})} className="w-full accent-indigo-500" />
                            </div>
                            
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm text-gray-300 font-semibold">Max Player Exposure</span>
                                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{mmeConfig.maxExposure}%</span>
                                </div>
                                <input type="range" min="10" max="100" step="5" value={mmeConfig.maxExposure} onChange={e => setMmeConfig({...mmeConfig, maxExposure: parseInt(e.target.value)})} className="w-full accent-emerald-500" />
                                <p className="text-[10px] text-gray-500 mt-1">Limits how often any single player appears across all generated lineups.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Stacking Rules</label>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${mmeConfig.forceQBStack ? 'bg-indigo-500 border-indigo-400' : 'bg-white/[0.04] border-white/[0.1] group-hover:border-white/[0.2]'}`}>
                                    {mmeConfig.forceQBStack && <CheckCircle size={12} className="text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-300 font-semibold">Force QB + WR/TE Stack</div>
                                    <div className="text-[10px] text-gray-500">Every lineup will pair a QB with a pass catcher from the same team.</div>
                                </div>
                                <input type="checkbox" className="hidden" checked={mmeConfig.forceQBStack} onChange={e => setMmeConfig({...mmeConfig, forceQBStack: e.target.checked})} />
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${mmeConfig.forceRunback ? 'bg-indigo-500 border-indigo-400' : 'bg-white/[0.04] border-white/[0.1] group-hover:border-white/[0.2]'}`}>
                                    {mmeConfig.forceRunback && <CheckCircle size={12} className="text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-300 font-semibold">Force Game Runback</div>
                                    <div className="text-[10px] text-gray-500">Include an opposing WR/TE to counter the QB stack.</div>
                                </div>
                                <input type="checkbox" className="hidden" checked={mmeConfig.forceRunback} onChange={e => setMmeConfig({...mmeConfig, forceRunback: e.target.checked})} />
                            </label>
                        </div>
                    </div>
                    
                    <button 
                        onClick={generateMME}
                        disabled={isGeneratingMME}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all mt-4"
                    >
                        {isGeneratingMME ? (
                            <><Loader2 size={16} className="animate-spin" /> Generating ({mmeProgress}%)...</>
                        ) : (
                            <><Cpu size={16} /> Run MME Engine</>
                        )}
                    </button>
                </div>
                
                {/* Results Panel */}
                <div className="w-2/3 bg-[#0a0c0f] flex flex-col overflow-hidden relative">
                    {!mmeLineups.length && !isGeneratingMME && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-600 mb-4">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Engine Ready</h3>
                            <p className="text-sm text-gray-500 max-w-sm">Configure your stacking rules and global exposure caps on the left, then run the engine to generate mathematically optimized lineups.</p>
                        </div>
                    )}
                    
                    {isGeneratingMME && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0c0f]/80 backdrop-blur-sm z-10">
                            <Loader2 size={32} className="text-indigo-400 animate-spin mb-4" />
                            <div className="text-sm font-bold text-white mb-2">Running Knapsack Optimizer...</div>
                            <div className="w-64 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${mmeProgress}%` }} />
                            </div>
                        </div>
                    )}
                    
                    {mmeLineups.length > 0 && !isGeneratingMME && (
                        <>
                            <div className="px-6 py-3 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
                                <div className="text-sm font-bold text-white">{mmeLineups.length} Lineups Generated</div>
                                <button onClick={exportMME} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                                    <Download size={14} /> Export Bulk CSV
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {mmeLineups.slice(0, 50).map((lu, idx) => {
                                    const totalProj = lu.reduce((sum, p) => sum + (p?.projected_pts || 0), 0);
                                    const totalSal = lu.reduce((sum, p) => sum + (p?.salary || 0), 0);
                                    
                                    return (
                                        <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
                                            <div className="px-4 py-2 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                                                <div className="text-xs font-bold text-gray-400">Lineup #{idx + 1}</div>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <span className="text-gray-500">Proj: <span className="text-blue-400 font-bold">{totalProj.toFixed(1)}</span></span>
                                                    <span className="text-gray-500">Salary: <span className="text-emerald-400 font-bold">${(totalSal/1000).toFixed(1)}K</span></span>
                                                    <button onClick={() => shareLineup(idx, lu, totalProj, totalSal)} disabled={sharingIdx === idx} className="text-indigo-400 hover:text-indigo-300 ml-2 disabled:opacity-50 transition-colors">
                                                      {sharingIdx === idx ? <Loader2 size={14} className="animate-spin" /> : <Share2 size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-3 grid grid-cols-3 gap-2">
                                                {lu.map((p, i) => (
                                                    <div key={i} className="flex items-center gap-2 bg-[#0a0c0f] border border-white/[0.04] p-1.5 rounded-lg">
                                                        <div className={`text-[9px] font-black w-6 text-center rounded border flex-shrink-0 px-0.5 py-0.5 ${p?.players?.position === 'QB' ? 'text-red-400 bg-red-500/10 border-red-500/20' : p?.players?.position === 'RB' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : p?.players?.position === 'WR' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : p?.players?.position === 'TE' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 'text-gray-400 bg-gray-500/10 border-gray-500/20'}`}>
                                                            {platform === 'dk' ? DK_SLOTS[i] : FD_SLOTS[i]}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-[11px] font-bold text-white truncate leading-tight">{p?.players?.name}</div>
                                                            <div className="text-[9px] text-gray-500 leading-tight">{p?.players?.team}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                                {mmeLineups.length > 50 && (
                                    <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest pt-2 pb-6">
                                        + {mmeLineups.length - 50} more lineups in export
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
