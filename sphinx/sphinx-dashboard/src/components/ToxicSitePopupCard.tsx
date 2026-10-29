"use client";
import React from 'react';
import { ToxicSite } from '../lib/intelligence/toxicSitesData';
import { 
  AlertOctagon, 
  Droplets, 
  Compass, 
  ShieldAlert, 
  Home, 
  ExternalLink, 
  MapPin, 
  X, 
  Eye, 
  Activity,
  Layers
} from 'lucide-react';

interface ToxicSitePopupCardProps {
  site: ToxicSite | null;
  onClose: () => void;
  onInspect3D?: (coords: [number, number]) => void;
  onAuditSite?: (site: ToxicSite) => void;
}

export const ToxicSitePopupCard: React.FC<ToxicSitePopupCardProps> = ({
  site,
  onClose,
  onInspect3D,
  onAuditSite
}) => {
  if (!site) return null;

  const isCritical = site.residential_risk_rating === 'CRITICAL_NO_BUILD';

  return (
    <div 
      data-testid="toxic-site-popup-card"
      className="absolute bottom-20 left-4 z-40 w-[380px] sm:w-[440px] max-w-[calc(100vw-32px)] bg-slate-950/95 border border-red-500/60 rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl text-white font-mono select-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Top Warning Banner */}
      <div className={`p-3 px-4 flex items-center justify-between border-b ${
        isCritical
          ? 'bg-gradient-to-r from-red-950/90 via-red-900/60 to-slate-950 border-red-800/60'
          : 'bg-gradient-to-r from-amber-950/90 via-amber-900/60 to-slate-950 border-amber-800/60'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg border ${
            isCritical ? 'bg-red-500/20 border-red-400 text-red-300' : 'bg-amber-500/20 border-amber-400 text-amber-300'
          }`}>
            <AlertOctagon size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                isCritical ? 'bg-red-900/80 text-red-200 border border-red-500/50' : 'bg-amber-900/80 text-amber-200 border border-amber-500/50'
              }`}>
                {isCritical ? 'DO NOT BUY / BUILD HAZARD' : 'CONTAMINATION RISK'}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {site.epa_id}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white truncate max-w-[270px]">
              {site.name}
            </h3>
          </div>
        </div>

        <button
          type="button"
          data-testid="btn-close-toxic-card"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-3.5 space-y-3 text-[11px] max-h-[75vh] overflow-y-auto custom-scrollbar">
        {/* Real Estate / Location Metadata */}
        <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[10px]">
          <div className="flex items-center gap-1.5 text-gray-300 truncate">
            <MapPin size={13} className="text-red-400 shrink-0" />
            <span className="truncate">{site.city}, {site.state} ({site.country})</span>
          </div>
          <span className="text-sky-300 font-semibold uppercase shrink-0">
            {site.site_type}
          </span>
        </div>

        {/* Hydrogeological Flow Telemetry */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="bg-slate-900/60 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[8px] text-gray-400 flex items-center justify-center gap-0.5">
              <Droplets size={10} className="text-blue-400" />
              <span>FLOW RATE</span>
            </div>
            <div className="text-xs font-bold text-blue-300">
              {site.seepage_velocity_ft_yr}
              <span className="text-[8px] font-normal text-gray-400 ml-0.5">ft/yr</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[8px] text-gray-400 flex items-center justify-center gap-0.5">
              <Compass size={10} className="text-amber-400" />
              <span>BEARING</span>
            </div>
            <div className="text-xs font-bold text-amber-300">
              {site.flow_direction_deg}°
              <span className="text-[8px] font-normal text-gray-400 ml-0.5">SSW</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[8px] text-gray-400 flex items-center justify-center gap-0.5">
              <Layers size={10} className="text-purple-400" />
              <span>AQUIFER</span>
            </div>
            <div className="text-xs font-bold text-purple-300">
              {site.aquifer_depth_ft}
              <span className="text-[8px] font-normal text-gray-400 ml-0.5">ft</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-1.5 rounded-lg">
            <div className="text-[8px] text-gray-400 flex items-center justify-center gap-0.5">
              <ShieldAlert size={10} className="text-emerald-400" />
              <span>BUFFER</span>
            </div>
            <div className="text-xs font-bold text-emerald-300">
              {site.safe_buffer_miles}
              <span className="text-[8px] font-normal text-gray-400 ml-0.5">mi</span>
            </div>
          </div>
        </div>

        {/* Primary Carcinogens Breakdown */}
        <div className="space-y-1">
          <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-between">
            <span>Primary Chemical Carcinogens Detected</span>
            <span className="text-red-400 font-mono">EPA CERCLA NPL</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {site.primary_contaminants.map((c, i) => (
              <span
                key={i}
                className="bg-red-950/60 border border-red-600/40 text-red-200 text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Affected Environmental Media */}
        <div className="space-y-1">
          <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
            Contaminated Infiltration Pathways
          </div>
          <div className="flex flex-wrap gap-1">
            {site.affected_media.map((m, i) => (
              <span
                key={i}
                className="bg-slate-900 border border-slate-700 text-gray-300 text-[9px] px-1.5 py-0.5 rounded"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Homebuyer Environmental Real Estate Advisory */}
        <div className="bg-red-950/30 border border-red-700/50 p-2.5 rounded-lg space-y-1 text-red-200 text-[10px] leading-relaxed">
          <div className="font-bold flex items-center gap-1 text-red-400 text-[10px] uppercase tracking-wider">
            <Home size={12} />
            <span>Homebuyer Environmental Due Diligence</span>
          </div>
          <p>{site.homebuyer_advisory}</p>
        </div>

        {/* Historical Context */}
        <div className="text-[9px] text-gray-400 bg-slate-900/40 p-2 rounded-lg border border-slate-800/80">
          <span className="font-semibold text-gray-300">Site History: </span>
          {site.historical_background}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
          {onInspect3D && (
            <button
              type="button"
              data-testid="btn-inspect-toxic-3d"
              onClick={() => onInspect3D(site.coordinates)}
              className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-colors"
            >
              <Eye size={14} className="text-sky-400" />
              <span>3D AR Inspect</span>
            </button>
          )}

          {onAuditSite && (
            <button
              type="button"
              data-testid="btn-audit-building-safety"
              onClick={() => onAuditSite(site)}
              className="flex-1 bg-red-600/80 hover:bg-red-500 border border-red-400 text-white font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              <Activity size={14} />
              <span>Audit Site Safety</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
