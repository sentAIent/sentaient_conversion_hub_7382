"use client";
import React, { useState, useMemo } from 'react';
import {
  ShieldAlert, ShieldCheck, Flame, Activity, Droplets, Biohazard,
  Radio, CloudLightning, Compass, Navigation, CheckSquare, Square,
  Copy, Check, X, ExternalLink, RefreshCw, AlertTriangle
} from 'lucide-react';
import { ThreatRadarSummary, PinThreatReport, PinThreat, HazardClass, ThreatSeverity } from '../lib/intelligence/pinThreatEngine';

interface PinThreatRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: ThreatRadarSummary;
  selectedPinId?: string | null;
  onSelectPin?: (pinId: string) => void;
  onFlyToPin?: (lat: number, lon: number) => void;
  onOpenManualArticle?: (articleId: string) => void;
}

export function PinThreatRadarModal({
  isOpen,
  onClose,
  summary,
  selectedPinId,
  onSelectPin,
  onFlyToPin,
  onOpenManualArticle
}: PinThreatRadarModalProps) {
  const [activePinId, setActivePinId] = useState<string | null>(() => {
    if (selectedPinId) return selectedPinId;
    if (summary.reports.length > 0) {
      // Pick first threatened pin if available
      const threatened = summary.reports.find(r => r.overallStatus !== 'clear');
      return threatened ? threatened.pinId : summary.reports[0].pinId;
    }
    return null;
  });

  const [completedProtocols, setCompletedProtocols] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'threatened' | 'clear'>('all');

  // Sync activePinId when selectedPinId prop changes
  React.useEffect(() => {
    if (selectedPinId) {
      setActivePinId(selectedPinId);
    }
  }, [selectedPinId]);

  const activeReport = useMemo(() => {
    if (!activePinId) return summary.reports[0] || null;
    return summary.reports.find(r => r.pinId === activePinId) || summary.reports[0] || null;
  }, [activePinId, summary.reports]);

  const filteredReports = useMemo(() => {
    if (categoryFilter === 'threatened') {
      return summary.reports.filter(r => r.overallStatus !== 'clear');
    }
    if (categoryFilter === 'clear') {
      return summary.reports.filter(r => r.overallStatus === 'clear');
    }
    return summary.reports;
  }, [categoryFilter, summary.reports]);

  if (!isOpen) return null;

  const toggleProtocol = (key: string) => {
    setCompletedProtocols(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyProtocols = (threat: PinThreat) => {
    const text = [
      `=== SPHINX CIVIL DEFENSE PROTOCOL ===`,
      `THREAT: ${threat.title}`,
      `SEVERITY: ${threat.severity.toUpperCase()} | DISTANCE: ${threat.distanceMiles} MILES ${threat.compassDirection}`,
      `CATEGORY: ${threat.checklistCategory}`,
      '',
      'ACTION CHECKLIST:',
      ...threat.protocols.map((p, i) => `[ ] ${i + 1}. ${p}`),
      '===================================='
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedId(threat.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getHazardIcon = (type: HazardClass) => {
    switch (type) {
      case 'fire': return <Flame size={18} className="text-red-400" />;
      case 'earthquake': return <Activity size={18} className="text-amber-400" />;
      case 'flood': return <Droplets size={18} className="text-cyan-400" />;
      case 'chemical': return <Biohazard size={18} className="text-purple-400" />;
      case 'radiation': return <Radio size={18} className="text-yellow-400" />;
      case 'weather': return <CloudLightning size={18} className="text-blue-400" />;
      default: return <AlertTriangle size={18} className="text-orange-400" />;
    }
  };

  const getSeverityBadge = (sev: ThreatSeverity) => {
    switch (sev) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/80 text-red-300 border border-red-500/60 uppercase animate-pulse">Critical</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/60 uppercase">Warning</span>;
      case 'advisory':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 uppercase">Advisory</span>;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pin Threat Proximity Radar"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 font-mono select-none"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-[#050811] border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-900/60 bg-gradient-to-r from-cyan-950/40 via-black to-red-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-950/60 border border-red-500/50 text-red-400">
              <ShieldAlert size={22} className={summary.criticalPins > 0 ? "animate-pulse" : ""} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wider">
                  TACTICAL PIN THREAT RADAR & CIVIL MITIGATION
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">
                  REAL-TIME PROXIMITY BUFFER
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Active proximity monitoring for private survival caches, refuges, wells, homesteads, and waypoints.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-5 py-3 border-b border-cyan-950 bg-black/60 text-xs">
          <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-gray-800">
            <span className="text-gray-400">Monitored Pins:</span>
            <span className="text-white font-bold">{summary.totalPins}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-red-950/30 border border-red-900/50">
            <span className="text-red-400">Critical (&lt;5 mi):</span>
            <span className="text-red-300 font-bold">{summary.criticalPins}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-amber-950/30 border border-amber-900/50">
            <span className="text-amber-400">Warning (&lt;15 mi):</span>
            <span className="text-amber-300 font-bold">{summary.warningPins}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-cyan-950/30 border border-cyan-900/50">
            <span className="text-cyan-400">Advisory (&lt;35 mi):</span>
            <span className="text-cyan-300 font-bold">{summary.advisoryPins}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/50 col-span-2 sm:col-span-1">
            <span className="text-emerald-400">Clear Perimeter:</span>
            <span className="text-emerald-300 font-bold">{summary.clearPins}</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Pins Navigation List */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-cyan-950 bg-black/40 flex flex-col">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-3 border-b border-cyan-950">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`flex-1 py-1 text-[11px] rounded transition-colors ${categoryFilter === 'all' ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/60' : 'bg-black/50 text-gray-400 hover:text-white'}`}
              >
                All ({summary.totalPins})
              </button>
              <button
                onClick={() => setCategoryFilter('threatened')}
                className={`flex-1 py-1 text-[11px] rounded transition-colors ${categoryFilter === 'threatened' ? 'bg-red-900/60 text-red-200 border border-red-500/60' : 'bg-black/50 text-gray-400 hover:text-white'}`}
              >
                At Risk ({summary.threatenedPins})
              </button>
              <button
                onClick={() => setCategoryFilter('clear')}
                className={`flex-1 py-1 text-[11px] rounded transition-colors ${categoryFilter === 'clear' ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/60' : 'bg-black/50 text-gray-400 hover:text-white'}`}
              >
                Clear ({summary.clearPins})
              </button>
            </div>

            {/* Pins Scroll List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredReports.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-500">
                  No pins match selected filter.
                </div>
              ) : (
                filteredReports.map((report) => {
                  const isSelected = activeReport?.pinId === report.pinId;
                  let statusBg = 'bg-black/50 border-gray-800 text-gray-400';
                  if (report.overallStatus === 'critical') statusBg = 'bg-red-950/40 border-red-800/80 text-red-300';
                  else if (report.overallStatus === 'warning') statusBg = 'bg-amber-950/40 border-amber-800/80 text-amber-300';
                  else if (report.overallStatus === 'advisory') statusBg = 'bg-cyan-950/40 border-cyan-800/80 text-cyan-300';
                  else statusBg = 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300';

                  return (
                    <div
                      key={report.pinId}
                      onClick={() => {
                        setActivePinId(report.pinId);
                        if (onSelectPin) onSelectPin(report.pinId);
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                          : 'border-cyan-950/60 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-xs truncate max-w-[170px]">
                          {report.pinLabel}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${statusBg}`}>
                          {report.overallStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span className="truncate">{report.pinCategory}</span>
                        <span>{report.threats.length} Threats</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black/20">
            {activeReport ? (
              <div className="space-y-6">
                {/* Active Pin Overview Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-black/80 to-cyan-950/20 border border-cyan-900/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{activeReport.pinLabel}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-700/60">
                          {activeReport.pinCategory}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        Coordinates: Lat {activeReport.lat.toFixed(4)}, Lon {activeReport.lon.toFixed(4)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {onFlyToPin && (
                        <button
                          onClick={() => onFlyToPin(activeReport.lat, activeReport.lon)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-600/50 text-xs font-mono transition-colors"
                        >
                          <Navigation size={14} />
                          Fly to Pin
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Threat Status Breakdown */}
                {activeReport.threats.length === 0 ? (
                  <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-600/40 text-center space-y-3">
                    <ShieldCheck size={40} className="mx-auto text-emerald-400" />
                    <h4 className="text-emerald-300 font-bold text-sm tracking-wide">
                      PERIMETER SECURE — ZERO ACTIVE THREATS
                    </h4>
                    <p className="text-xs text-gray-400 max-w-lg mx-auto">
                      No active wildfires, seismic ruptures, dam breach corridors, chemical spills/sprays, or radiation anomalies detected within the 35-mile operational perimeter buffer.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                      <ShieldAlert size={14} className="text-red-400" />
                      Active Proximity Threats ({activeReport.threats.length})
                    </h4>

                    {activeReport.threats.map((threat) => (
                      <div
                        key={threat.id}
                        className="p-4 rounded-xl bg-black/60 border border-gray-800 hover:border-cyan-800/80 transition-all space-y-3"
                      >
                        {/* Threat Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-2">
                          <div className="flex items-center gap-2.5">
                            {getHazardIcon(threat.hazardType)}
                            <div>
                              <h5 className="text-sm font-bold text-white">{threat.title}</h5>
                              <p className="text-[11px] text-gray-400">
                                {threat.distanceMiles} miles {threat.compassDirection} ({threat.bearingDegrees}°) from pin
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(threat.severity)}
                            <button
                              onClick={() => copyProtocols(threat)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 hover:bg-white/10 text-gray-300 border border-gray-700 text-[11px] font-mono transition-colors"
                              title="Copy actionable checklist to clipboard"
                            >
                              {copiedId === threat.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              <span>{copiedId === threat.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-300">
                          {threat.description}
                        </p>

                        {/* Civil Preparedness Mitigation Checklist */}
                        <div className="p-3 rounded-lg bg-black/40 border border-cyan-950 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-cyan-300 tracking-wide">
                              🛡️ {threat.checklistCategory}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              Civil Preparedness Codex Protocol
                            </span>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {threat.protocols.map((protocol, pIdx) => {
                              const key = `${threat.id}-p-${pIdx}`;
                              const isChecked = !!completedProtocols[key];

                              return (
                                <div
                                  key={key}
                                  onClick={() => toggleProtocol(key)}
                                  className={`flex items-start gap-2.5 p-1.5 rounded cursor-pointer transition-colors ${
                                    isChecked ? 'bg-emerald-950/20 text-gray-400 line-through' : 'hover:bg-white/5 text-gray-200'
                                  }`}
                                >
                                  <button type="button" className="mt-0.5 text-cyan-400 shrink-0">
                                    {isChecked ? <CheckSquare size={14} className="text-emerald-400" /> : <Square size={14} />}
                                  </button>
                                  <span className="text-xs leading-relaxed">
                                    {protocol}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-xs">
                Select a custom pin from the left to inspect active threat proximity.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-cyan-950 bg-black/80 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Real-time Geodesic Proximity Engine Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 transition-colors"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
}
