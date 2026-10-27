"use client";
import React, { useState } from 'react';
import { ViewportAuditResult } from '../lib/intelligence/globalDataEngine';
import { 
  ShieldCheck, AlertTriangle, Activity, Globe, Compass, 
  ChevronDown, ChevronUp, Radio, Zap, Layers, MapPin
} from 'lucide-react';

interface ZeroBlindSpotAnalyticsHUDProps {
  auditResult: ViewportAuditResult;
  onJumpTo: (lon: number, lat: number, zoom?: number, pitch?: number) => void;
  showBlindSpots: boolean;
  onToggleBlindSpots: () => void;
  showDroneDocks: boolean;
  onToggleDroneDocks: () => void;
  showPublicLands: boolean;
  onTogglePublicLands: () => void;
  leftOffset?: string;
  onClose?: () => void;
}

export const ZeroBlindSpotAnalyticsHUD: React.FC<ZeroBlindSpotAnalyticsHUDProps> = ({
  auditResult,
  onJumpTo,
  showBlindSpots,
  onToggleBlindSpots,
  showDroneDocks,
  onToggleDroneDocks,
  showPublicLands,
  onTogglePublicLands,
  leftOffset,
  onClose
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div 
      style={{ left: leftOffset || undefined }}
      className={`absolute top-16 z-30 font-mono text-white select-none transition-all duration-300 ${!leftOffset ? 'left-4' : ''}`}
    >
      <div className="bg-slate-950/90 border border-sky-500/50 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all duration-300 w-[360px] sm:w-[420px]">
        {/* Header / Summary Bar */}
        <div 
          data-testid="hud-zero-blind-spot-header"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors bg-gradient-to-r from-sky-950/50 via-slate-950 to-slate-950"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs font-bold tracking-wider text-sky-300 flex items-center gap-1.5">
              <span>ZERO-BLIND-SPOT AUDIT</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/40">
                {auditResult.sensor_density_score}% DENSITY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span className="text-[10px] text-gray-300 font-medium hidden sm:inline">
              {auditResult.live_data_percentage}% LIVE
            </span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {onClose && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="hover:text-white ml-1 p-0.5"
                title="Hide HUD"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Expanded Dashboard */}
        {isExpanded && (
          <div className="p-3 border-t border-sky-900/50 space-y-2.5 text-[11px] animate-in fade-in duration-150">
            {/* Active Primary Jurisdiction Readout */}
            <div className="bg-slate-900/80 border border-slate-700/60 p-2 rounded-lg space-y-1">
              <div className="text-[9px] text-gray-400 flex items-center gap-1 uppercase tracking-wider font-semibold">
                <Globe size={11} className="text-sky-400" />
                Viewport Jurisdiction & Land Classification
              </div>
              <div className="text-sky-300 font-bold text-xs truncate">
                {auditResult.primary_jurisdiction}
              </div>
              <div className="flex items-center justify-between text-[9px] text-gray-400 pt-0.5">
                <span>Unincorporated / Federal Ratio:</span>
                <span className="text-white font-semibold">{(auditResult.unincorporated_ratio * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Active Telemetry Feeds Grid */}
            <div className="space-y-1">
              <div className="text-[9px] text-gray-400 flex items-center justify-between font-semibold uppercase tracking-wider">
                <span>Multi-Source Resilient Streams</span>
                <span className="text-emerald-400 font-mono">0 BLIND SPOTS</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {auditResult.active_feed_sources.map(feed => (
                  <span 
                    key={feed}
                    className="text-[9px] bg-sky-950/70 border border-sky-600/50 text-sky-200 px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {feed}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer Toggles & Diagnostic Controls */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={onToggleDroneDocks}
                className={`px-2 py-1.5 rounded-lg border text-[9px] font-bold tracking-wider flex items-center justify-center gap-1 transition-all ${
                  showDroneDocks
                    ? 'bg-sky-600/30 border-sky-400 text-sky-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-slate-700 text-gray-400'
                }`}
              >
                <span>🛸 DRONE DOCKS</span>
              </button>

              <button
                type="button"
                onClick={onToggleBlindSpots}
                className={`px-2 py-1.5 rounded-lg border text-[9px] font-bold tracking-wider flex items-center justify-center gap-1 transition-all ${
                  showBlindSpots
                    ? 'bg-amber-600/30 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900/60 border-slate-700 text-gray-400'
                }`}
              >
                <span>⚠️ BLIND SPOTS</span>
              </button>

              <button
                type="button"
                onClick={onTogglePublicLands}
                className={`px-2 py-1.5 rounded-lg border text-[9px] font-bold tracking-wider flex items-center justify-center gap-1 transition-all ${
                  showPublicLands
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900/60 border-slate-700 text-gray-400'
                }`}
              >
                <span>🏛️ PUBLIC LANDS</span>
              </button>
            </div>

            {/* 1-Click Global Hotspot Navigation */}
            <div className="space-y-1 pt-1 border-t border-slate-800">
              <div className="text-[9px] text-gray-400 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Compass size={11} className="text-amber-400" />
                Global Hotspots (Zero-Blind-Spot Nav)
              </div>
              <div className="grid grid-cols-2 gap-1 text-[9px]">
                <button
                  type="button"
                  data-testid="btn-hotspot-newport-beach"
                  onClick={() => onJumpTo(-117.892, 33.618, 13.5, 48)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Newport Beach, CA (10-Dock DFR Network)"
                >
                  <span className="text-sky-300 font-semibold">📍 Newport Beach, CA</span>
                  <div className="text-[8px] text-gray-400">10 Docks • DFR Fleet</div>
                </button>

                <button
                  type="button"
                  data-testid="btn-hotspot-border-cbp"
                  onClick={() => onJumpTo(-116.848, 32.598, 12, 45)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="US-Mexico Border CBP Autonomous Sentry Towers"
                >
                  <span className="text-red-300 font-semibold">📍 US Border (CBP)</span>
                  <div className="text-[8px] text-gray-400">Border Sentry Towers</div>
                </button>

                <button
                  type="button"
                  data-testid="btn-hotspot-black-rock-blm"
                  onClick={() => onJumpTo(-119.055, 40.892, 10.5, 35)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Black Rock Desert, NV (Federal BLM Unincorporated Land)"
                >
                  <span className="text-amber-300 font-semibold">📍 Black Rock BLM, NV</span>
                  <div className="text-[8px] text-gray-400">Unincorporated Land</div>
                </button>

                <button
                  type="button"
                  onClick={() => onJumpTo(56.35, 26.35, 9.5, 35)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Strait of Hormuz (Global Tanker & Maritime Chokepoint)"
                >
                  <span className="text-purple-300 font-semibold">📍 Strait of Hormuz</span>
                  <div className="text-[8px] text-gray-400">AIS Tanker Chokepoint</div>
                </button>

                <button
                  type="button"
                  onClick={() => onJumpTo(55.33, 25.26, 12.5, 45)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Dubai Smart City Autonomous Drone Box Network"
                >
                  <span className="text-cyan-300 font-semibold">📍 Dubai Drone Box</span>
                  <div className="text-[8px] text-gray-400">20+ Stations DFR</div>
                </button>

                <button
                  type="button"
                  onClick={() => onJumpTo(103.85, 1.28, 12.5, 40)}
                  className="bg-slate-900/80 hover:bg-sky-950 border border-slate-700 hover:border-sky-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Singapore HTX Homeland Security Drone Mesh"
                >
                  <span className="text-emerald-300 font-semibold">📍 Singapore HTX</span>
                  <div className="text-[8px] text-gray-400">Homeland Defense Mesh</div>
                </button>

                <button
                  type="button"
                  data-testid="btn-hotspot-santa-susana"
                  onClick={() => onJumpTo(-118.696, 34.231, 13.5, 50)}
                  className="bg-slate-900/80 hover:bg-red-950 border border-slate-700 hover:border-red-400 p-1.5 rounded text-left transition-colors truncate"
                  title="Santa Susana Field Lab (TCE, PFAS & Radionuclide Plume)"
                >
                  <span className="text-red-400 font-semibold">☣️ Santa Susana SSFL</span>
                  <div className="text-[8px] text-gray-400">TCE / Radionuclide Plume</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
