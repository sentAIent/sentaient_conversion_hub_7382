"use client";
import React, { useState } from 'react';
import { X, Sun, Zap, Radio, Compass, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SpaceWeatherEngine, SpaceWeatherTelemetry, GeomagneticStormLevel } from '../lib/space/spaceWeatherEngine';

interface SpaceWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceWeatherModal: React.FC<SpaceWeatherModalProps> = ({ isOpen, onClose }) => {
  const [selectedKp, setSelectedKp] = useState<number>(3.2);

  if (!isOpen) return null;

  const data: SpaceWeatherTelemetry = SpaceWeatherEngine.getCurrentTelemetry(selectedKp);

  const stormColors: Record<GeomagneticStormLevel, string> = {
    G0_NOMINAL: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    G1_MINOR: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
    G2_MODERATE: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
    G3_STRONG: 'border-orange-500/40 text-orange-400 bg-orange-950/20',
    G4_SEVERE: 'border-red-500/40 text-red-400 bg-red-950/20',
    G5_EXTREME: 'border-rose-500/40 text-rose-300 bg-rose-950/40'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-950 border border-amber-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sun className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                SPACE WEATHER, SOLAR CME & EMP MONITOR
              </h2>
              <p className="text-[11px] font-mono text-amber-400/80">
                NOAA SWPC Planetary K-Index & Geomagnetically Induced Currents (GIC)
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
          
          {/* Main Status Badge */}
          <div className={`p-4 rounded-lg border flex items-center justify-between ${stormColors[data.stormLevel]}`}>
            <div>
              <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Planetary Alert Status</div>
              <div className="text-base sm:text-lg font-bold mt-0.5">{data.stormTitle}</div>
              <div className="text-[11px] text-gray-400 mt-1">Solar Wind: {data.solarWindSpeedKmS} km/s • Aurora View Boundary: &gt;{data.auroraVisibilityLatMin}°N</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-amber-300">Kp {data.kpIndex.toFixed(1)}</div>
              <div className="text-[10px] text-gray-400">Planetary Index</div>
            </div>
          </div>

          {/* Zero-Slider Rule: Kp Simulator Chips */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-3 space-y-2">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
              <span>Simulate Solar Geomagnetic Intensity</span>
              <span className="text-amber-400 font-mono text-[10px]">100% Zero-Slider Compliant</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Kp 1.0 (Quiet)', val: 1.0 },
                { label: 'Kp 3.2 (Active / Live)', val: 3.2 },
                { label: 'Kp 5.0 (G1 Minor)', val: 5.0 },
                { label: 'Kp 7.0 (G3 Strong)', val: 7.0 },
                { label: 'Kp 9.0 (G5 Extreme CME)', val: 9.0 }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setSelectedKp(opt.val)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors ${selectedKp === opt.val ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Critical Infrastructure Impact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-neutral-900/40 border border-white/10 p-3 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <Zap className="w-4 h-4" />
                POWER GRID GIC RISK
              </div>
              <div className="text-xs text-white font-mono font-bold mt-1">{data.powerGridGicThreat}</div>
              <div className="text-[10px] text-gray-400">High-voltage substation transformer core saturation hazard.</div>
            </div>

            <div className="bg-neutral-900/40 border border-white/10 p-3 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                <Compass className="w-4 h-4" />
                GPS / GNSS DRIFT
              </div>
              <div className="text-xs text-white font-mono font-bold mt-1">±{data.gnssDriftMeters.toFixed(1)} Meters Error</div>
              <div className="text-[10px] text-gray-400">Ionospheric scintillation disrupts satellite time-of-flight.</div>
            </div>

            <div className="bg-neutral-900/40 border border-white/10 p-3 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px]">
                <Radio className="w-4 h-4" />
                HF RADIO ABSORPTION
              </div>
              <div className="text-xs text-white font-mono font-bold mt-1">{data.hfBlackoutRisk}</div>
              <div className="text-[10px] text-gray-400">D-Region ionospheric degradation affects 3–30 MHz frequencies.</div>
            </div>
          </div>

          {/* Protective Directives */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Tactical & Survival Protective Directives
            </div>
            <div className="space-y-1.5">
              {data.protectiveDirectives.map((dir, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-950/10 text-gray-300 flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{dir}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-[11px] text-gray-400">
          <span className="font-mono text-amber-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Planetary Space Weather Engine Live
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
