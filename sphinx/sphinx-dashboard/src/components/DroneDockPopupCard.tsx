"use client";
import React from 'react';
import { DroneDockStation } from '../lib/intelligence/globalDroneDockData';
import { 
  X, Radio, Battery, Thermometer, Wind, ShieldCheck, 
  Video, Eye, Navigation, AlertTriangle, Cpu, Globe, ArrowUpRight
} from 'lucide-react';

interface DroneDockPopupCardProps {
  dock: DroneDockStation;
  onClose: () => void;
  onInspect3D?: (coords: [number, number]) => void;
  onOpenVideoFeed?: () => void;
}

export const DroneDockPopupCard: React.FC<DroneDockPopupCardProps> = ({
  dock,
  onClose,
  onInspect3D,
  onOpenVideoFeed
}) => {
  const isAirborne = dock.status === 'MISSION_AIRBORNE';
  const isCharging = dock.status === 'RECHARGING';

  return (
    <div className="fixed sm:absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[440px] z-50 bg-slate-950/95 border border-sky-500/60 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl font-mono text-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-sky-950/90 via-slate-900/90 to-slate-950/90 border-b border-sky-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
            isAirborne
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
              : isCharging
              ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
              : 'bg-sky-950 border-sky-400 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
          }`}>
            <span className="text-base">🛸</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs tracking-wider">{dock.callsign}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                isAirborne
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 animate-pulse'
                  : isCharging
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
              }`}>
                {dock.status.replace('_', ' ')}
              </span>
            </div>
            <div className="text-[10px] text-gray-400 truncate max-w-[280px]">
              {dock.name}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title="Close Card"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-3 space-y-3 max-h-[75vh] overflow-y-auto custom-scrollbar text-[11px]">
        {/* Jurisdiction & Land Ownership Badge */}
        <div className="bg-slate-900/80 border border-slate-700/60 p-2 rounded-lg flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Globe size={13} className="text-sky-400 shrink-0" />
            <span className="text-gray-400">Land Jurisdiction:</span>
            <span className="text-sky-300 font-semibold">{dock.land_ownership}</span>
          </div>
          <span className="text-[9px] text-gray-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            {dock.city}, {dock.region}
          </span>
        </div>

        {/* Active Mission Alert Banner (If Airborne) */}
        {isAirborne && dock.active_sortie && (
          <div className="bg-cyan-950/60 border border-cyan-400/60 p-2.5 rounded-lg space-y-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="flex items-center justify-between text-cyan-300 font-bold text-[10px]">
              <span className="flex items-center gap-1">
                <Navigation size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                ACTIVE 911 CAD AIRBORNE SORTIE
              </span>
              <span className="text-red-400 bg-red-950/80 px-1 rounded border border-red-500/40">
                ETA {dock.active_sortie.eta_seconds}s
              </span>
            </div>
            <div className="text-[11px] text-white font-medium">
              {dock.active_sortie.incident_type}
            </div>
            <div className="grid grid-cols-3 gap-1 text-[9px] font-mono text-gray-300 pt-1 border-t border-cyan-800/40">
              <div>ALT: <span className="text-cyan-300 font-bold">{dock.active_sortie.altitude_ft_agl} FT</span></div>
              <div>SPEED: <span className="text-cyan-300 font-bold">{dock.active_sortie.speed_kts} KTS</span></div>
              <div>HDG: <span className="text-cyan-300 font-bold">{dock.active_sortie.heading_deg}°</span></div>
            </div>
          </div>
        )}

        {/* Station Telemetry Metrics */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[9px] text-gray-400 flex items-center justify-center gap-1">
              <Battery size={11} className={dock.battery_pct > 30 ? 'text-emerald-400' : 'text-red-400'} />
              BATT
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{dock.battery_pct}%</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[9px] text-gray-400 flex items-center justify-center gap-1">
              <Thermometer size={11} className="text-amber-400" />
              TEMP
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{dock.internal_temp_c}°C</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[9px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck size={11} className="text-sky-400" />
              BVLOS
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{dock.bvlos_radius_km} km</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[9px] text-gray-400 flex items-center justify-center gap-1">
              <Wind size={11} className="text-cyan-400" />
              AVG ARR
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{dock.avg_response_sec}s</div>
          </div>
        </div>

        {/* Hardware & Systems Specifications */}
        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg space-y-1.5 text-[10px]">
          <div className="text-gray-400 flex items-center gap-1 font-semibold text-[10px] text-sky-400">
            <Cpu size={12} />
            AUTONOMOUS FLIGHT & DOCK HARDWARE
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-gray-400">Drone Aircraft:</span>
            <span className="text-white font-medium">{dock.drone_model}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-gray-400">Hangar Enclosure:</span>
            <span className="text-white font-medium">{dock.dock_model}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-gray-400">Sensor Payload:</span>
            <span className="text-cyan-300 font-medium text-right max-w-[240px] truncate">{dock.payload}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-gray-400">Power & Backup:</span>
            <span className="text-white">{dock.power_source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">FAA Authorization:</span>
            <span className="text-emerald-400 font-semibold">{dock.faa_waiver_id}</span>
          </div>
        </div>

        {/* Agency & Dispatch Integration */}
        <div className="bg-slate-900/40 border border-slate-800/60 p-2 rounded-lg text-[9px] space-y-1 text-gray-300">
          <div><strong className="text-gray-400">Operating Agency:</strong> {dock.agency_display}</div>
          <div><strong className="text-gray-400">CAD Dispatch Link:</strong> {dock.cad_integration}</div>
          <div><strong className="text-gray-400">Uplink Telemetry:</strong> {dock.connectivity}</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              if (onOpenVideoFeed) onOpenVideoFeed();
            }}
            className="flex items-center justify-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-3 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all text-xs"
          >
            <Video size={14} />
            <span>OPTICAL / FLIR FEED</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onInspect3D) onInspect3D(dock.coordinates);
            }}
            className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-xs"
          >
            <Eye size={14} className="text-sky-400" />
            <span>3D AR INSPECT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
