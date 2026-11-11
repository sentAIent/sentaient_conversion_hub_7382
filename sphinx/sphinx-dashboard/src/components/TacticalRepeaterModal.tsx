"use client";
import React, { useState, useMemo } from 'react';
import { X, Radio, Signal, Compass, MapPin, AlertCircle, Shield, Volume2 } from 'lucide-react';
import { TacticalRepeaterEngine, VERIFIED_TACTICAL_REPEATERS, EMERGENCY_SIMPLEX_CHANNELS, RepeaterNode } from '../lib/comms/tacticalRepeaterEngine';

interface TacticalRepeaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCoords?: [number, number]; // [lon, lat]
  currentLocation?: { lat: number; lng: number };
  userElevationFt?: number;
}

export const TacticalRepeaterModal: React.FC<TacticalRepeaterModalProps> = ({
  isOpen,
  onClose,
  userCoords = [-118.06, 34.22],
  currentLocation,
  userElevationFt = 650
}) => {
  const [bandFilter, setBandFilter] = useState<'ALL' | '2m (VHF)' | '70cm (UHF)' | 'GMRS' | 'NOAA NWR'>('ALL');
  const [activeTab, setActiveTab] = useState<'REPEATERS' | 'SIMPLEX'>('REPEATERS');

  const [lon, lat] = currentLocation ? [currentLocation.lng, currentLocation.lat] : userCoords;
  const viewsheds = useMemo(() => {
    return TacticalRepeaterEngine.calculateViewsheds(lat, lon, userElevationFt);
  }, [lat, lon, userElevationFt]);

  const filtered = useMemo(() => {
    if (bandFilter === 'ALL') return viewsheds;
    return viewsheds.filter(v => v.repeater.band === bandFilter);
  }, [viewsheds, bandFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-neutral-950 border border-purple-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Radio className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                TACTICAL RF REPEATER DIRECTORY & VIEWSHED
              </h2>
              <p className="text-[11px] font-mono text-purple-400/80">
                Line-of-Sight Calculated via 4/3 Earth Radio Curvature Model • Elev: {userElevationFt} ft
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

        {/* Tab & Band Filters (Zero-Slider Rule) */}
        <div className="px-5 py-2.5 bg-neutral-900/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('REPEATERS')}
              className={`px-3 py-1 rounded font-bold font-mono text-[11px] border transition-colors ${activeTab === 'REPEATERS' ? 'bg-purple-900 text-purple-200 border-purple-400' : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'}`}
            >
              📡 REPEATERS & STATIONS
            </button>
            <button
              onClick={() => setActiveTab('SIMPLEX')}
              className={`px-3 py-1 rounded font-bold font-mono text-[11px] border transition-colors ${activeTab === 'SIMPLEX' ? 'bg-purple-900 text-purple-200 border-purple-400' : 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'}`}
            >
              🚨 NATIONAL SIMPLEX CALLING
            </button>
          </div>

          {activeTab === 'REPEATERS' && (
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {(['ALL', '2m (VHF)', '70cm (UHF)', 'GMRS', 'NOAA NWR'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setBandFilter(b)}
                  className={`px-2 py-0.5 rounded border transition-colors ${bandFilter === b ? 'bg-purple-950 text-purple-300 border-purple-400 font-bold' : 'bg-neutral-800 border-gray-700 text-gray-400 hover:text-white'}`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs">
          
          {activeTab === 'REPEATERS' ? (
            <div className="space-y-2.5">
              {filtered.map(v => (
                <div
                  key={v.repeater.id}
                  className={`p-3 rounded-lg border transition-all ${v.lineOfSightProbable ? 'bg-purple-950/20 border-purple-500/30' : 'bg-neutral-900/30 border-white/5 opacity-80'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm bg-neutral-900 px-2 py-0.5 rounded border border-purple-500/30">
                        {v.repeater.callsign}
                      </span>
                      <span className="font-bold text-gray-200">{v.repeater.locationName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-purple-300 border border-purple-500/20 font-mono">
                        {v.repeater.band}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className={`font-bold ${v.lineOfSightProbable ? 'text-emerald-400' : 'text-gray-400'}`}>
                        {v.signalStrengthEst}
                      </span>
                      <span className="text-gray-400">• {v.distanceMiles} mi away</span>
                    </div>
                  </div>

                  {/* Tuning Telemetry */}
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-black/40 p-2 rounded border border-white/5">
                    <div>
                      <span className="text-gray-500 text-[10px]">OUTPUT FREQ:</span>
                      <div className="font-bold text-white">{v.repeater.outputFreqMHz.toFixed(3)} MHz</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px]">OFFSET:</span>
                      <div className="font-bold text-purple-300">
                        {v.repeater.offsetMHz > 0 ? `+${v.repeater.offsetMHz.toFixed(3)}` : v.repeater.offsetMHz === 0 ? 'Simplex' : v.repeater.offsetMHz.toFixed(3)} MHz
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px]">CTCSS / PL TONE:</span>
                      <div className="font-bold text-amber-300">
                        {v.repeater.toneHz ? `${v.repeater.toneHz} Hz` : 'None (CSQ)'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px]">RECOMMENDED POWER:</span>
                      <div className="font-bold text-cyan-300">{v.recommendedPowerWatts} Watts</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-lg text-purple-200 text-xs leading-relaxed">
                <strong>Emergency Monitoring Directive:</strong> In grid-down scenarios where repeater towers lose generator power, tune all transceivers to National Simplex frequencies. Monitor Wilderness Protocol frequencies at :00, :15, :30, and :45 of every hour for 5 full minutes.
              </div>
              <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden bg-neutral-900/40">
                {EMERGENCY_SIMPLEX_CHANNELS.map((ch, idx) => (
                  <div key={idx} className="p-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-white text-sm">{ch.name}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{ch.notes}</div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-purple-300 font-bold text-sm">{ch.freq}</div>
                      <div className="text-[10px] text-gray-400">{ch.mode}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-[11px] text-gray-400">
          <span className="font-mono text-purple-400">
            Emergency Standby: 146.520 MHz & 462.675 MHz (Ch 20)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
