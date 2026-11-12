"use client";
import React, { useState } from 'react';
import { X, ShieldAlert, Wind, Radiation, AlertTriangle, CheckCircle2, Flame, Crosshair } from 'lucide-react';
import { CBRNFalloutEngine, YIELD_PROFILES, WeaponYield, CBRNAnalysis } from '../lib/cbrn/cbrnFalloutEngine';

interface CBRNDefenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  detonationCoords?: [number, number]; // [lon, lat]
  currentCenter?: { lat: number; lng: number };
}

export const CBRNDefenseModal: React.FC<CBRNDefenseModalProps> = ({
  isOpen,
  onClose,
  detonationCoords = [-118.25, 34.05],
  currentCenter
}) => {
  const [selectedYield, setSelectedYield] = useState<WeaponYield>('10kt_ind');
  const [windSpeed, setWindSpeed] = useState<number>(14); // mph
  const [windBearing, setWindBearing] = useState<number>(45); // NE

  if (!isOpen) return null;

  const [lon, lat] = currentCenter ? [currentCenter.lng, currentCenter.lat] : detonationCoords;
  const analysis: CBRNAnalysis = CBRNFalloutEngine.calculateFallout(
    lon,
    lat,
    selectedYield,
    windSpeed,
    windBearing
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-neutral-950 border border-red-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-red-500/20 bg-neutral-900/70">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <Radiation className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                CBRN FALLOUT & DOWNWIND PLUME DISPERSION SIMULATOR
              </h2>
              <p className="text-[11px] font-mono text-red-400/80">
                Atmospheric Gaussian Ellipse Model • 7:10 Radiological Decay Law • Ground Zero: {detonationCoords[1].toFixed(3)}°N, {Math.abs(detonationCoords[0]).toFixed(3)}°W
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
          
          {/* Yield Selector (Zero-Slider Rule: Chips & Steppers only) */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-lg p-3 space-y-2">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
              <span>Select Warhead Yield Profile</span>
              <span className="text-red-400 font-mono text-[10px]">Zero-Slider Buttons</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(YIELD_PROFILES) as WeaponYield[]).map(key => {
                const y = YIELD_PROFILES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedYield(key)}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors ${selectedYield === key ? 'bg-red-950 border-red-400 text-red-200 font-bold shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'}`}
                  >
                    {y.name.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wind Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-900/40 p-3 rounded-lg border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5 font-bold">
                <Wind className="w-3.5 h-3.5 text-cyan-400" /> Wind Velocity:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setWindSpeed(prev => Math.max(2, prev - 2))}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 font-mono text-white"
                >
                  -2
                </button>
                <span className="font-mono text-cyan-300 font-bold w-16 text-center">{windSpeed} mph</span>
                <button
                  onClick={() => setWindSpeed(prev => Math.min(60, prev + 2))}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 font-mono text-white"
                >
                  +2
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5 font-bold">
                <Crosshair className="w-3.5 h-3.5 text-orange-400" /> Downwind Azimuth:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setWindBearing(prev => (prev - 45 + 360) % 360)}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 font-mono text-white"
                >
                  -45°
                </button>
                <span className="font-mono text-orange-300 font-bold w-16 text-center">{windBearing}°</span>
                <button
                  onClick={() => setWindBearing(prev => (prev + 45) % 360)}
                  className="px-2 py-0.5 rounded bg-neutral-800 border border-gray-700 hover:bg-neutral-700 font-mono text-white"
                >
                  +45°
                </button>
              </div>
            </div>
          </div>

          {/* Blast Contours Table */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
              Prompt Blast & Thermal Radii ({analysis.yieldProfile.name.split('(')[0].trim()})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-red-950/20 border border-red-500/30 p-2.5 rounded-lg">
                <div className="text-[10px] text-red-400 font-mono">20 PSI HEAVY COLLAPSE</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{analysis.yieldProfile.psi20HeavyDestructionMiles} mi radius</div>
                <div className="text-[9px] text-gray-400 mt-0.5">100% Structural Demolition</div>
              </div>
              <div className="bg-orange-950/20 border border-orange-500/30 p-2.5 rounded-lg">
                <div className="text-[10px] text-orange-400 font-mono">5 PSI RESIDENTIAL COLLAPSE</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{analysis.yieldProfile.psi5ModerateDestructionMiles} mi radius</div>
                <div className="text-[9px] text-gray-400 mt-0.5">Widespread Casualties</div>
              </div>
              <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg">
                <div className="text-[10px] text-amber-400 font-mono">THERMAL FLASH (3RD DEGREE)</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{analysis.yieldProfile.thermalFlashBurnMiles} mi radius</div>
                <div className="text-[9px] text-gray-400 mt-0.5">Spontaneous Combustion</div>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-500/30 p-2.5 rounded-lg">
                <div className="text-[10px] text-yellow-400 font-mono">1 PSI SHATTER RADIUS</div>
                <div className="text-sm font-bold text-white mt-1 font-mono">{analysis.yieldProfile.psi1GlassBreakageMiles} mi radius</div>
                <div className="text-[9px] text-gray-400 mt-0.5">Flying Glass Hazards</div>
              </div>
            </div>
          </div>

          {/* 7:10 Radiological Decay Timeline */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
              <span>7:10 Radiological Decay Law (R/hr Decay Schedule)</span>
              <span className="text-red-400 font-mono text-[10px]">R(t) = R₀ · t^(-1.2)</span>
            </div>
            <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-neutral-900/40 font-mono">
              {analysis.decayTimeline.map((item, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">H+{item.hoursAfter}h:</span>
                    <span className="text-gray-300">{item.safeStatus}</span>
                  </div>
                  <span className="text-red-400 font-bold shrink-0">{item.relativeDosePercent}% Radiation</span>
                </div>
              ))}
            </div>
          </div>

          {/* PPE & Decontamination Directive */}
          <div className="p-3.5 rounded-lg border border-red-500/30 bg-red-950/15 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Mandatory Personal Protective Equipment (CBRN Defense)
            </div>
            <div className="text-[11px] space-y-1 text-gray-300">
              <p><strong>Respirator:</strong> {analysis.recommendedPPE.respirator}</p>
              <p><strong>Coverall:</strong> {analysis.recommendedPPE.bodySuit}</p>
              <p><strong>Field Decontamination:</strong> {analysis.recommendedPPE.deconProtocol}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-neutral-900/70 flex items-center justify-between text-[11px] text-gray-400">
          <span className="font-mono text-red-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-red-400" /> CBRN Dispersion Engine Active
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
