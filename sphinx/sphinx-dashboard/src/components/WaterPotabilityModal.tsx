"use client";
import React, { useState } from 'react';
import { X, Droplets, ShieldAlert, CheckCircle2, AlertTriangle, Flame, Filter, Info } from 'lucide-react';
import { WaterPotabilityEngine, WaterDossier } from '../lib/intelligence/waterPotabilityEngine';

interface WaterPotabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceData?: {
    name: string;
    lat: number;
    lon: number;
    elevationFt?: number;
    type?: string;
  };
  selectedSource?: {
    name?: string;
    lat?: number;
    lon?: number;
    elevationFt?: number;
    type?: string;
  } | null;
}

export const WaterPotabilityModal: React.FC<WaterPotabilityModalProps> = ({
  isOpen,
  onClose,
  sourceData,
  selectedSource
}) => {
  const activeSource = selectedSource || sourceData || { name: 'Deep Canyon Artesian Spring', lat: 34.28, lon: -117.65, elevationFt: 5400, type: 'Artesian Spring' };
  const [elevation, setElevation] = useState<number>(activeSource.elevationFt || 5400);
  const [sourceType, setSourceType] = useState<string>(activeSource.type || 'Artesian Spring');

  if (!isOpen) return null;

  const dossier: WaterDossier = WaterPotabilityEngine.evaluateWaterSource(
    activeSource.name || 'Natural Water Source',
    activeSource.lat ?? 34.28,
    activeSource.lon ?? -117.65,
    elevation,
    sourceType
  );

  const gradeColors = {
    POTABLE_RAW_SPRING: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
    PURIFICATION_MANDATORY: 'border-amber-500/40 text-amber-400 bg-amber-950/30',
    CRITICAL_CONTAMINANT_HAZARD: 'border-red-500/40 text-red-400 bg-red-950/30'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-950 border border-cyan-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Droplets className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                WATER POTABILITY & PURIFICATION DOSSIER
              </h2>
              <p className="text-[11px] font-mono text-cyan-400/80">
                {dossier.sourceName} • {dossier.coordinates[1].toFixed(4)}°N, {Math.abs(dossier.coordinates[0]).toFixed(4)}°W
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Status Grade Card */}
          <div className={`p-3.5 rounded-lg border flex items-center justify-between ${gradeColors[dossier.grade]}`}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Field Potability Rating</div>
              <div className="text-sm sm:text-base font-bold mt-0.5">
                {dossier.grade === 'POTABLE_RAW_SPRING' ? '🟢 Potable Raw Spring (Artesian Source)' :
                 dossier.grade === 'PURIFICATION_MANDATORY' ? '🟡 Purification Mandatory (Surface Water)' :
                 '🔴 High Contaminant Hazard (Chemical/Algal)'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl font-bold font-mono">{dossier.safetyScore}/100</div>
              <div className="text-[10px] text-gray-400">Safety Index</div>
            </div>
          </div>

          {/* Source Adjustments (100% Zero-Slider Rule: Chips & Steppers only) */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-3 space-y-2.5">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Hydrological Parameters</div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Source Type:</span>
                {(['Artesian Spring', 'Alpine Lake', 'River / Stream'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setSourceType(t)}
                    className={`px-2.5 py-1 rounded font-mono text-[10px] border transition-colors ${sourceType === t ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Elevation Stepper */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Elevation:</span>
                <button
                  onClick={() => setElevation(prev => Math.max(0, prev - 1000))}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 text-white font-mono"
                >
                  -1k
                </button>
                <span className="font-mono text-cyan-400 font-bold">{elevation} ft</span>
                <button
                  onClick={() => setElevation(prev => prev + 1000)}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 text-white font-mono"
                >
                  +1k
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-neutral-900/40 border border-white/10 p-2.5 rounded-lg">
              <div className="text-[10px] text-gray-400 font-mono">ESTIMATED TDS</div>
              <div className="text-sm font-bold text-white mt-1 font-mono">{dossier.tdsEstimatedPpm} PPM</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Low Mineral Load</div>
            </div>
            <div className="bg-neutral-900/40 border border-white/10 p-2.5 rounded-lg">
              <div className="text-[10px] text-gray-400 font-mono">PH SPECTRUM</div>
              <div className="text-sm font-bold text-white mt-1 font-mono">{dossier.phRange}</div>
              <div className="text-[9px] text-cyan-400 mt-0.5">Bio-Compatible</div>
            </div>
            <div className="bg-neutral-900/40 border border-white/10 p-2.5 rounded-lg">
              <div className="text-[10px] text-gray-400 font-mono">MANDATORY BOIL</div>
              <div className="text-sm font-bold text-amber-300 mt-1 font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> {dossier.recommendedBoilTimeMinutes} Min
              </div>
              <div className="text-[9px] text-gray-400 mt-0.5">Altitude Adjusted</div>
            </div>
            <div className="bg-neutral-900/40 border border-white/10 p-2.5 rounded-lg">
              <div className="text-[10px] text-gray-400 font-mono">CHEMICAL RISK</div>
              <div className="text-sm font-bold text-emerald-300 mt-1 font-mono">{dossier.chemicalThreatRisk}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">No Industrial Runoff</div>
            </div>
          </div>

          {/* Biological Pathogens Vector */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Biological Pathogen Profile & Vulnerabilities
            </div>
            <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-neutral-900/30">
              {dossier.pathogens.map((p, idx) => (
                <div key={idx} className="p-2.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {p.name}
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-gray-400 font-mono">{p.type} • {p.sizeMicrons}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{p.inactivation}</div>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${p.severity === 'Severe' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                    {p.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Field Treatment Protocols */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              Tactical Field Purification Action Plan
            </div>
            <div className="space-y-2">
              {dossier.fieldPurificationSteps.map((step) => (
                <div key={step.step} className="p-2.5 rounded-lg border border-cyan-500/20 bg-cyan-950/10 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold font-mono text-[11px] shrink-0">
                    {step.step}
                  </span>
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">{step.action}</div>
                    <div className="text-cyan-400/90 text-[11px] font-mono">Tool: {step.toolRequired}</div>
                    <div className="text-gray-400 text-[10px]">{step.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1 font-mono text-cyan-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Offline Hydrology Engine Active
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
