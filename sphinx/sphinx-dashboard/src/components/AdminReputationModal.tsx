import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  EyeOff, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import { 
  UserReputationProfile, 
  ReporterStatus, 
  loadAllUserReputations, 
  adminUpdateUserReputation 
} from '../lib/userReputation';
import { auditAllReportersAI } from '../lib/intelligence/aiReportEvaluator';

interface AdminReputationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminReputationModal({ isOpen, onClose }: AdminReputationModalProps) {
  const [profiles, setProfiles] = useState<Record<string, UserReputationProfile>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserReputationProfile | null>(null);
  const [auditBanner, setAuditBanner] = useState<string | null>(null);
  const [scoreEditVal, setScoreEditVal] = useState<number>(75);

  const refreshData = () => {
    const data = loadAllUserReputations();
    setProfiles(data);
    if (selectedUser && data[selectedUser.deviceId]) {
      setSelectedUser(data[selectedUser.deviceId]);
      setScoreEditVal(data[selectedUser.deviceId].socialScore);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const profileList = Object.values(profiles);

  // Filter profiles
  const filteredList = profileList.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch = 
      p.alias.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.notes && p.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // KPI calculations
  const totalTracked = profileList.length;
  const trustedCount = profileList.filter(p => p.status === 'trusted').length;
  const quarantinedCount = profileList.filter(p => p.status === 'quarantined' || p.status === 'banned' || p.isPreventedFromBroadcasting).length;
  const totalAIFlags = profileList.reduce((acc, p) => acc + (p.aiFlags?.length || 0), 0);

  const handleRunAIAudit = () => {
    const result = auditAllReportersAI();
    setAuditBanner(result.auditSummary);
    refreshData();
    setTimeout(() => {
      setAuditBanner(null);
    }, 6000);
  };

  const handleQuarantineUser = (deviceId: string) => {
    adminUpdateUserReputation(deviceId, {
      status: 'quarantined',
      isPreventedFromBroadcasting: true,
      notes: 'Manually quarantined by Administrator; broadcasting suspended.'
    });
    refreshData();
  };

  const handleRestoreUser = (deviceId: string) => {
    adminUpdateUserReputation(deviceId, {
      status: 'active',
      isPreventedFromBroadcasting: false,
      socialScore: 75,
      notes: 'Restored & broadcasting authorized by Administrator.'
    });
    refreshData();
  };

  const handleSaveScore = (deviceId: string) => {
    const clamped = Math.min(100, Math.max(0, scoreEditVal));
    adminUpdateUserReputation(deviceId, {
      socialScore: clamped
    });
    refreshData();
  };

  const getStatusBadge = (status: ReporterStatus, isBlocked: boolean) => {
    if (isBlocked || status === 'banned' || status === 'quarantined') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-red-950/80 text-red-300 border border-red-700/80 shadow-[0_0_8px_rgba(239,68,68,0.3)]">
          <EyeOff size={11} /> MUTED / QUARANTINED
        </span>
      );
    }
    if (status === 'trusted') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
          <ShieldCheck size={11} /> TRUSTED CONTRIBUTOR
        </span>
      );
    }
    if (status === 'probation') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-950/80 text-amber-300 border border-amber-700/80">
          <AlertTriangle size={11} /> PROBATION
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-700/80">
        <Shield size={11} /> ACTIVE
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    if (score >= 50) return 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40';
    if (score >= 30) return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
    return 'text-red-400 border-red-500/50 bg-red-950/40';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-mono animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-zinc-950/95 border border-cyan-800/80 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] text-gray-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/60 bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-black">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/60 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <ShieldAlert size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wider">SPHINX REPUTATION & SOCIAL SCORE ADMIN</h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-950 border border-purple-500/60 text-purple-300">
                  AI SENTINEL V1
                </span>
              </div>
              <p className="text-xs text-cyan-300/80">
                AI Inaccuracy Detection • Contributor Social Scores (0-100) • Automated Shadowban & Broadcasting Lock
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Audit banner alert if active */}
        {auditBanner && (
          <div className="px-6 py-2.5 bg-cyan-950/90 border-b border-cyan-500/60 flex items-center justify-between text-xs text-cyan-200 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles size={16} className="text-cyan-400 animate-spin" />
              <span>{auditBanner}</span>
            </div>
            <button onClick={() => setAuditBanner(null)} className="text-cyan-400 hover:text-white">✕</button>
          </div>
        )}

        {/* KPI Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/50 text-xs">
          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 flex flex-col justify-between">
            <span className="text-gray-400 text-[11px]">Tracked Reporters</span>
            <span className="text-xl font-bold text-white">{totalTracked}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 flex flex-col justify-between">
            <span className="text-emerald-400/90 text-[11px]">Trusted Contributors</span>
            <span className="text-xl font-bold text-emerald-300">{trustedCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-900/50 flex flex-col justify-between">
            <span className="text-red-400/90 text-[11px]">Quarantined / Muted</span>
            <span className="text-xl font-bold text-red-300">{quarantinedCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-900/50 flex flex-col justify-between">
            <span className="text-purple-400/90 text-[11px]">AI Inaccuracy Flags</span>
            <span className="text-xl font-bold text-purple-300">{totalAIFlags}</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-zinc-800 bg-black/40">
          <div className="flex flex-wrap items-center gap-2">
            <input 
              type="text"
              placeholder="Search by alias or device ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 w-56 sm:w-64"
            />
            <div className="flex items-center gap-1 text-xs">
              {(['all', 'trusted', 'active', 'probation', 'quarantined'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                    filterStatus === st 
                      ? 'bg-cyan-900 text-cyan-200 border border-cyan-500/70' 
                      : 'bg-zinc-900 text-gray-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAIAudit}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              <Sparkles size={14} /> Run AI Reputation Audit
            </button>
            <button
              onClick={refreshData}
              title="Refresh profiles"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-gray-300 hover:text-white"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Main Content Area (Leaderboard + Detailed Inspector) */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Reporters List */}
          <div className="w-full md:w-3/5 overflow-y-auto border-r border-zinc-800/80 p-4 space-y-2.5">
            {filteredList.map(profile => {
              const isSelected = selectedUser?.deviceId === profile.deviceId;
              const isMuted = profile.isPreventedFromBroadcasting || profile.status === 'quarantined' || profile.status === 'banned';

              return (
                <div 
                  key={profile.deviceId}
                  onClick={() => {
                    setSelectedUser(profile);
                    setScoreEditVal(profile.socialScore);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-zinc-900 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
                      : 'bg-black/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{profile.alias}</span>
                        {getStatusBadge(profile.status, isMuted)}
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">ID: {profile.deviceId}</span>
                    </div>

                    {/* Social Score Gauge */}
                    <div className="flex flex-col items-end">
                      <div className={`px-2.5 py-1 rounded-lg border font-bold text-sm tracking-wide ${getScoreColor(profile.socialScore)}`}>
                        SCORE: {profile.socialScore}
                      </div>
                      <span className="text-[9px] text-gray-400 mt-0.5">INTERNAL METRIC</span>
                    </div>
                  </div>

                  {/* Telemetry Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 text-[10px] bg-black/40 p-2 rounded-lg border border-zinc-800/50 mb-2">
                    <div>
                      <span className="text-gray-500 block">Submissions</span>
                      <span className="font-bold text-white">{profile.totalSubmissions}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Vouches</span>
                      <span className="font-bold text-cyan-300">{profile.totalVouches}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Verified Acc.</span>
                      <span className="font-bold text-emerald-400">{profile.confirmedAccurateReports}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Inaccurate</span>
                      <span className={`font-bold ${profile.inaccurateReportsCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {profile.inaccurateReportsCount}
                      </span>
                    </div>
                  </div>

                  {/* AI Flags indicator */}
                  {profile.aiFlags && profile.aiFlags.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-red-400 bg-red-950/30 border border-red-900/50 px-2 py-1 rounded">
                      <AlertTriangle size={13} className="shrink-0" />
                      <span className="truncate">{profile.aiFlags.length} AI Inaccuracy Flag(s) Recorded</span>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredList.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-xs italic">
                No user profiles match the current filter or search criteria.
              </div>
            )}
          </div>

          {/* User Detail & Admin Controls Inspector */}
          <div className="w-full md:w-2/5 overflow-y-auto p-5 bg-zinc-900/40 flex flex-col justify-between">
            {selectedUser ? (
              <div className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-base">{selectedUser.alias}</h3>
                    {getStatusBadge(selectedUser.status, selectedUser.isPreventedFromBroadcasting)}
                  </div>
                  <div className="text-[10px] text-gray-500 break-all font-mono">Device: {selectedUser.deviceId}</div>
                  <div className="text-[10px] text-gray-500">
                    First Seen: {new Date(selectedUser.firstSeenAt).toLocaleString()}
                  </div>
                </div>

                {/* Score & Broadcasting Control */}
                <div className="bg-black/60 border border-zinc-800 p-3.5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-bold uppercase">Reputation Social Score</span>
                    <span className={`text-base font-bold ${getScoreColor(selectedUser.socialScore).split(' ')[0]}`}>
                      {selectedUser.socialScore} / 100
                    </span>
                  </div>

                  {/* Manual Score Adjuster */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 flex-wrap flex-1">
                      {[0, 25, 50, 75, 100].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setScoreEditVal(s)}
                          className={`px-1.5 py-0.5 text-[10px] font-mono rounded border transition-colors ${scoreEditVal === s ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'}`}
                        >
                          {s}
                        </button>
                      ))}
                      {[-10, -1, 1, 10].map((delta) => (
                        <button
                          key={delta}
                          type="button"
                          onClick={() => setScoreEditVal((prev) => Math.max(0, Math.min(100, prev + delta)))}
                          className="px-1 py-0.5 text-[9px] font-mono rounded bg-gray-900 border border-gray-700 text-gray-300 hover:text-cyan-300"
                        >
                          {delta > 0 ? `+${delta}` : delta}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-mono w-8 text-right font-bold text-cyan-300">{scoreEditVal}</span>
                    <button
                      onClick={() => handleSaveScore(selectedUser.deviceId)}
                      className="px-2 py-1 rounded bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 text-[10px] font-bold uppercase"
                    >
                      Update
                    </button>
                  </div>

                  {/* Broadcasting Lock Banner */}
                  <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                    selectedUser.isPreventedFromBroadcasting
                      ? 'bg-red-950/50 border-red-800 text-red-300'
                      : 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {selectedUser.isPreventedFromBroadcasting ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="font-semibold text-[11px]">
                        {selectedUser.isPreventedFromBroadcasting 
                          ? 'BROADCASTING PREVENTED (SHADOWBANNED)' 
                          : 'BROADCASTING AUTHORIZED'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Admin Quarantine Actions */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Administrative Overrides</div>
                  {selectedUser.isPreventedFromBroadcasting || selectedUser.status === 'quarantined' ? (
                    <button
                      onClick={() => handleRestoreUser(selectedUser.deviceId)}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-600 text-emerald-200 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <CheckCircle2 size={16} /> Restore & Re-Enable Broadcasting
                    </button>
                  ) : (
                    <button
                      onClick={() => handleQuarantineUser(selectedUser.deviceId)}
                      className="w-full py-2 px-3 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
                    >
                      <EyeOff size={16} /> Quarantine & Prevent Broadcasting
                    </button>
                  )}
                </div>

                {/* AI Inaccuracy Logs / Flags */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>AI Flags & Incident Logs</span>
                    <span className="text-[10px] text-purple-400">{selectedUser.aiFlags?.length || 0} INCIDENTS</span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedUser.aiFlags && selectedUser.aiFlags.length > 0 ? (
                      selectedUser.aiFlags.map((flag, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/60 text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-red-300 font-bold">
                            <span>SEVERITY: {flag.severity.toUpperCase()}</span>
                            <span>RISK: {flag.riskScore}/100</span>
                          </div>
                          <p className="text-gray-300 text-[11px] leading-relaxed">{flag.reason}</p>
                          <div className="text-[9px] text-gray-500">
                            {new Date(flag.flaggedAt).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-gray-500 italic p-3 bg-black/40 rounded-lg border border-zinc-800 text-center">
                        No AI flags or telemetry violations recorded for this contributor.
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedUser.notes && (
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Sentinel System Notes</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">{selectedUser.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-gray-500 text-xs">
                <Shield size={36} className="text-zinc-700 mb-2" />
                <span>Select a crowdsource reporter from the leaderboard to inspect reputation score and AI flags.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-black/60 flex items-center justify-between text-[11px] text-gray-500">
          <span>Sphinx Multi-User Consensus Engine • Continuous Vouch Registry</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs font-semibold"
          >
            Close Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}
