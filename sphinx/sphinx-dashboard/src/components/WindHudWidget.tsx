"use client";
import React, { useState } from 'react';
import { Wind, Compass, X, ChevronDown, ChevronUp, AlertTriangle, BarChart3, ArrowUp } from 'lucide-react';

export interface WeatherVectorData {
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDeg: number;
  tempC: number;
  humidity: number;
  pressureHpa?: number;
}

interface WindHudWidgetProps {
  weatherVector: WeatherVectorData;
  onClose: () => void;
  onOpenDeepForecast: () => void;
}

export const WindHudWidget: React.FC<WindHudWidgetProps> = ({
  weatherVector,
  onClose,
  onOpenDeepForecast,
}) => {
  const [speedUnit, setSpeedUnit] = useState<'knots' | 'mph' | 'kmh'>('knots');
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [isMinimized, setIsMinimized] = useState(false);

  const speedKnots = weatherVector.windSpeedKnots;
  const gustKnots = weatherVector.windGustKnots;
  const deg = weatherVector.windDirectionDeg;
  const tempC = weatherVector.tempC;
  const pressure = weatherVector.pressureHpa || 1013.2;

  const formatSpeed = (kts: number) => {
    if (speedUnit === 'mph') return `${(kts * 1.15078).toFixed(1)} mph`;
    if (speedUnit === 'kmh') return `${(kts * 1.852).toFixed(1)} km/h`;
    return `${kts.toFixed(1)} kts`;
  };

  const formatTemp = (c: number) => {
    if (tempUnit === 'F') return `${Math.round(((c * 9) / 5 + 32) * 10) / 10}°F`;
    return `${c.toFixed(1)}°C`;
  };

  const getCardinal = (degrees: number) => {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(degrees / 22.5) % 16;
    return dirs[idx];
  };

  const getBeaufort = (kts: number) => {
    if (kts < 1) return { force: 0, desc: 'Calm', color: 'text-gray-400' };
    if (kts < 4) return { force: 1, desc: 'Light Air', color: 'text-sky-300' };
    if (kts < 7) return { force: 2, desc: 'Light Breeze', color: 'text-sky-400' };
    if (kts < 11) return { force: 3, desc: 'Gentle Breeze', color: 'text-emerald-400' };
    if (kts < 17) return { force: 4, desc: 'Moderate Breeze', color: 'text-emerald-300' };
    if (kts < 22) return { force: 5, desc: 'Fresh Breeze', color: 'text-yellow-400' };
    if (kts < 28) return { force: 6, desc: 'Strong Breeze', color: 'text-amber-400' };
    if (kts < 34) return { force: 7, desc: 'Near Gale', color: 'text-orange-400' };
    if (kts < 41) return { force: 8, desc: 'Gale Force', color: 'text-red-400' };
    if (kts < 48) return { force: 9, desc: 'Strong Gale', color: 'text-red-500' };
    if (kts < 56) return { force: 10, desc: 'Storm', color: 'text-rose-500' };
    return { force: 11, desc: 'Violent Storm', color: 'text-purple-400' };
  };

  const cardinal = getCardinal(deg);
  const bft = getBeaufort(speedKnots);
  const isHighGust = gustKnots >= 22;
  // Wind arrow points in downwind flow direction: (deg + 180) % 360
  const flowDeg = (deg + 180) % 360;

  if (isMinimized) {
    return (
      <div 
        data-testid="wind-hud-minimized"
        className="absolute top-16 right-3 sm:right-6 z-20 bg-black/90 border border-sky-800/80 rounded-lg p-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md font-mono text-xs flex items-center gap-2 animate-in fade-in duration-200"
      >
        <div 
          className="w-6 h-6 rounded-full bg-sky-950/80 border border-sky-500/60 flex items-center justify-center text-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
          style={{ transform: `rotate(${flowDeg}deg)` }}
          title={`Wind blowing from ${deg}° (${cardinal}) towards ${flowDeg}°`}
        >
          <ArrowUp size={14} className="stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold text-sky-300">
            <span>💨 {formatSpeed(speedKnots)}</span>
            <span className="text-gray-400 text-[10px]">@{deg}° {cardinal}</span>
          </div>
          {isHighGust && (
            <span className="text-[10px] text-amber-400">Gusts: {formatSpeed(gustKnots)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10"
          title="Expand Tactical Wind HUD"
        >
          <ChevronDown size={14} />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10"
          title="Close Wind HUD"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div 
      data-testid="wind-hud-expanded"
      className="absolute top-16 right-3 sm:right-6 z-20 w-64 sm:w-72 bg-black/92 border border-sky-800/70 rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl font-mono text-white select-none animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sky-950 pb-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <Wind size={14} />
          <span>LIVE WIND & VECTOR HUD</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10"
            title="Minimize to Compact Bar"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            data-testid="wind-hud-close"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10"
            title="Close Wind HUD"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Compass Rose & Primary Wind Vector */}
      <div className="flex items-center gap-3 bg-sky-950/20 border border-sky-900/40 rounded-lg p-2.5 mb-2.5">
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-black/60 rounded-full border border-sky-800/80 shadow-[inset_0_0_12px_rgba(14,165,233,0.2)]">
          {/* Compass Rose Ring */}
          <span className="absolute top-0.5 text-[8px] font-bold text-red-400">N</span>
          <span className="absolute bottom-0.5 text-[8px] font-bold text-gray-400">S</span>
          <span className="absolute right-1 text-[8px] font-bold text-gray-400">E</span>
          <span className="absolute left-1 text-[8px] font-bold text-gray-400">W</span>

          {/* Dynamic Vector Needle */}
          <div 
            className="w-10 h-10 flex items-center justify-center transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${flowDeg}deg)` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-0 h-0 border-x-4 border-x-transparent border-b-[18px] border-b-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              <div className="w-0.5 h-3 bg-cyan-400/60" />
            </div>
          </div>
        </div>

        {/* Primary Readouts */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-cyan-300 font-mono tracking-tight leading-none">
              {formatSpeed(speedKnots)}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = speedUnit === 'knots' ? 'mph' : speedUnit === 'mph' ? 'kmh' : 'knots';
                setSpeedUnit(next);
              }}
              className="text-[9px] px-1.5 py-0.5 bg-sky-950/80 hover:bg-sky-900 text-sky-300 rounded border border-sky-800 transition-colors uppercase font-bold"
              title="Click to toggle wind speed units (knots / mph / km/h)"
            >
              {speedUnit}
            </button>
          </div>

          <div className="text-xs text-gray-300 mt-1 flex items-center gap-1.5">
            <span>Bearing:</span>
            <strong className="text-white font-mono">{deg}° {cardinal}</strong>
          </div>

          <div className={`text-[10px] font-semibold mt-0.5 ${bft.color}`}>
            Force {bft.force} • {bft.desc}
          </div>
        </div>
      </div>

      {/* Atmospheric Telemetry Grid */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] mb-2.5">
        <div className={`p-1.5 rounded border ${isHighGust ? 'bg-amber-950/40 border-amber-800/80 text-amber-300' : 'bg-black/50 border-gray-800 text-gray-300'}`}>
          <div className="text-[9px] text-gray-400 uppercase font-semibold">Peak Gusts</div>
          <div className="font-bold flex items-center gap-1">
            {isHighGust && <AlertTriangle size={11} className="text-amber-400 shrink-0" />}
            <span>{formatSpeed(gustKnots)}</span>
          </div>
        </div>

        <div className="p-1.5 rounded border bg-black/50 border-gray-800 text-gray-300">
          <div className="text-[9px] text-gray-400 uppercase font-semibold flex justify-between">
            <span>Temp</span>
            <button
              type="button"
              onClick={() => setTempUnit(tempUnit === 'F' ? 'C' : 'F')}
              className="text-[8px] text-sky-400 hover:text-white"
            >
              °{tempUnit}
            </button>
          </div>
          <div className="font-bold text-amber-300">
            {formatTemp(tempC)}
          </div>
        </div>

        <div className="p-1.5 rounded border bg-black/50 border-gray-800 text-gray-300">
          <div className="text-[9px] text-gray-400 uppercase font-semibold">Pressure</div>
          <div className="font-bold text-sky-300 font-mono">
            {pressure.toFixed(1)} hPa
          </div>
        </div>

        <div className="p-1.5 rounded border bg-black/50 border-gray-800 text-gray-300">
          <div className="text-[9px] text-gray-400 uppercase font-semibold">Humidity</div>
          <div className="font-bold text-cyan-300 font-mono">
            {weatherVector.humidity}%
          </div>
        </div>
      </div>

      {/* Multi-Horizon Outlook Link */}
      <div className="flex items-center gap-2 pt-1 border-t border-sky-950/80">
        <button
          type="button"
          onClick={onOpenDeepForecast}
          className="flex-1 py-1.5 px-2 bg-sky-950/80 hover:bg-sky-900 border border-sky-700/80 rounded-lg text-xs font-semibold text-sky-200 flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-colors"
        >
          <BarChart3 size={13} />
          <span>Full 48H / 7D / Monthly</span>
        </button>
      </div>
    </div>
  );
};
