"use client";
import React, { useState } from 'react';
import { HomeSafetyEvaluation, ToxicPlumeEngine } from '../lib/intelligence/toxicPlumeEngine';
import { ToxicSite, GLOBAL_TOXIC_SITES } from '../lib/intelligence/toxicSitesData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Home, 
  Droplets, 
  Compass, 
  Wind, 
  X, 
  CheckCircle2, 
  AlertOctagon,
  Search,
  ExternalLink
} from 'lucide-react';

interface HomebuyerSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLat: number;
  currentLon: number;
  onJumpToSite?: (coords: [number, number], zoom?: number) => void;
}

export const HomebuyerSafetyModal: React.FC<HomebuyerSafetyModalProps> = ({
  isOpen,
  onClose,
  currentLat,
  currentLon,
  onJumpToSite
}) => {
  const [evalLat, setEvalLat] = useState<number>(currentLat);
  const [evalLon, setEvalLon] = useState<number>(currentLon);

  // Compute safety assessment for selected coordinates
  const evaluation: HomeSafetyEvaluation = React.useMemo(() => {
    return ToxicPlumeEngine.evaluateHomeSiteSafety(evalLat, evalLon, GLOBAL_TOXIC_SITES);
  }, [evalLat, evalLon]);

  if (!isOpen) return null;

  const isCritical = evaluation.verdict === 'CRITICAL_NO_BUILD';
  const isCaution = evaluation.verdict === 'MODERATE_CAUTION';
  const isSafe = evaluation.verdict === 'SAFE_PRISTINE';

  return (
    <div 
      data-testid="homebuyer-safety-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-slate-950 border border-slate-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className={`p-4 px-5 border-b flex items-center justify-between ${
          isCritical
            ? 'bg-gradient-to-r from-red-950 via-slate-950 to-slate-950 border-red-800/60'
            : isCaution
              ? 'bg-gradient-to-r from-amber-950 via-slate-950 to-slate-950 border-amber-800/60'
              : 'bg-gradient-to-r from-emerald-950 via-slate-950 to-slate-950 border-emerald-800/60'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              isCritical
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : isCaution
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
            }`}>
              {isCritical ? <ShieldAlert size={22} /> : isCaution ? <AlertTriangle size={22} /> : <ShieldCheck size={22} />}
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Homebuyer Real Estate Environmental Due Diligence
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Toxic Plume & Aquifer Safety Assessment</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            data-testid="btn-close-homebuyer-modal"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar text-xs">
          {/* Main Verdict Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isCritical
              ? 'bg-red-950/40 border-red-600/60 text-red-100 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
              : isCaution
                ? 'bg-amber-950/40 border-amber-600/60 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                : 'bg-emerald-950/40 border-emerald-600/60 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
          }`}>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                Building & Acquisition Safety Verdict
              </div>
              <div className="text-lg font-extrabold tracking-wide mt-0.5">
                {evaluation.verdict_label}
              </div>
              <div className="text-[11px] opacity-90 mt-1 max-w-[340px]">
                {evaluation.advisory_summary}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-3xl font-black font-mono">
                {evaluation.safety_score}%
              </div>
              <div className="text-[9px] uppercase tracking-wider font-semibold opacity-70">
                Safety Rating
              </div>
            </div>
          </div>

          {/* Quick Hotspot Selectors */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Compass size={12} className="text-sky-400" />
              <span>Test Benchmark Sites (1-Click Evaluation):</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                type="button"
                data-testid="btn-eval-santa-susana"
                onClick={() => {
                  setEvalLat(34.225);
                  setEvalLon(-118.680); // 1.2 miles downflow in Dayton Canyon
                  if (onJumpToSite) onJumpToSite([-118.680, 34.225], 13.5);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 p-2 rounded-lg text-left transition-colors truncate"
              >
                <div className="text-red-400 font-bold truncate">⚠️ Santa Susana SSFL</div>
                <div className="text-[8px] text-gray-400">Dayton Canyon / Simi Hills</div>
              </button>

              <button
                type="button"
                data-testid="btn-eval-stringfellow"
                onClick={() => {
                  setEvalLat(34.005);
                  setEvalLon(-117.485); // 1.1 miles downflow Pyrite Canyon
                  if (onJumpToSite) onJumpToSite([-117.485, 34.005], 13.5);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 p-2 rounded-lg text-left transition-colors truncate"
              >
                <div className="text-red-400 font-bold truncate">⚠️ Stringfellow Acid</div>
                <div className="text-[8px] text-gray-400">Glen Avon / Pyrite Canyon</div>
              </button>

              <button
                type="button"
                data-testid="btn-eval-pristine"
                onClick={() => {
                  setEvalLat(33.618);
                  setEvalLon(-117.892); // Newport Beach Coastal
                  if (onJumpToSite) onJumpToSite([-117.892, 33.618], 13.0);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 p-2 rounded-lg text-left transition-colors truncate"
              >
                <div className="text-emerald-400 font-bold truncate">✅ Newport Coastal</div>
                <div className="text-[8px] text-gray-400">Marine Coastal Baseline</div>
              </button>
            </div>
          </div>

          {/* Environmental Hazard Due Diligence Matrix */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-1">
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Wind size={12} className="text-purple-400" />
                <span>Vapor Intrusion Risk</span>
              </div>
              <div className={`font-bold text-xs ${
                evaluation.vapor_intrusion_risk === 'CRITICAL_EXTREME' ? 'text-red-400' :
                evaluation.vapor_intrusion_risk === 'HIGH_ELEVATED' ? 'text-orange-400' :
                evaluation.vapor_intrusion_risk === 'MODERATE' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {evaluation.vapor_intrusion_risk}
              </div>
              <div className="text-[9px] text-gray-400">
                {evaluation.vapor_intrusion_risk === 'CRITICAL_EXTREME' || evaluation.vapor_intrusion_risk === 'HIGH_ELEVATED'
                  ? 'VOCs volatilize from groundwater through soil into residential slab foundations.'
                  : 'No elevated volatile solvent vapor intrusion detected.'}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-1">
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Droplets size={12} className="text-blue-400" />
                <span>Private Drinking Well Safety</span>
              </div>
              <div className={`font-bold text-xs ${evaluation.private_well_safe ? 'text-emerald-400' : 'text-red-400'}`}>
                {evaluation.private_well_safe ? 'SAFE TO DRILL WELL' : 'PROHIBITED / CONTAMINATED'}
              </div>
              <div className="text-[9px] text-gray-400">
                {evaluation.private_well_safe
                  ? 'Regional unconfined aquifer is outside known toxic dispersion cones.'
                  : 'Aquifer contaminated with industrial carcinogens. Municipal piped water required.'}
              </div>
            </div>
          </div>

          {/* Closest Industrial Plume Telemetry */}
          {evaluation.nearest_site && (
            <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertOctagon size={13} className="text-red-400" />
                  <span>Nearest Industrial Contamination Site</span>
                </div>
                <span className="text-[10px] font-bold text-sky-300">
                  {evaluation.distance_miles} miles away
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <div className="font-bold text-white text-xs">
                    {evaluation.nearest_site.name}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    {evaluation.nearest_site.site_type} • {evaluation.nearest_site.epa_id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-semibold text-amber-300">
                    Flow: {evaluation.nearest_site.seepage_velocity_ft_yr} ft/yr @ {evaluation.nearest_site.flow_direction_deg}°
                  </div>
                  <div className="text-[8px] text-gray-400">
                    {evaluation.is_downgradient ? '⚠️ Direct Downwind/Downflow' : 'Upgradient / Lateral'}
                  </div>
                </div>
              </div>

              {/* Chemical Carcinogens */}
              <div className="space-y-1 pt-1">
                <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                  Contaminants of Primary Concern
                </div>
                <div className="flex flex-wrap gap-1">
                  {evaluation.carcinogens_detected.map((c, i) => (
                    <span
                      key={i}
                      className="bg-red-950/60 border border-red-700/50 text-red-200 text-[9px] px-2 py-0.5 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-5 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[10px]">
          <span className="text-gray-400">
            Coordinates: {evalLat.toFixed(4)}, {evalLon.toFixed(4)}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-1.5 rounded-lg border border-slate-600 transition-colors"
          >
            Close Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
