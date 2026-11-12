"use client";
import React, { useState } from 'react';
import { 
  Cloud, 
  Wind, 
  Gauge, 
  Sun, 
  Eye, 
  Droplets, 
  Compass, 
  X, 
  CloudRain, 
  ArrowUp, 
  Radio, 
  Layers, 
  Maximize2, 
  Minimize2,
  Activity,
  MapPin,
  Navigation
} from 'lucide-react';
import { hpaToInHg } from '../lib/weatherPressureEngine';
import { RadarLoopController, RadarFrameInfo, RadarDatasetMode } from './RadarLoopController';

export interface AppleWeatherMetrics {
  tempC: number;
  humidity: number;
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDeg: number;
  pressureHpa: number;
  cloudCoverPct?: number;
  uvIndex?: number;
  visibilityMeters?: number;
  dewPointC?: number;
  precipitationMm?: number;
  conditionText?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
}

interface AppleWeatherHudProps {
  metrics: AppleWeatherMetrics;
  onClose: () => void;
  onToggleLayer?: (layerId: string) => void;
  activeLayers?: {
    weather_radar?: boolean;
    weather_clouds?: boolean;
    weather_pressure?: boolean;
    atmospheric_radar?: boolean;
  };
  onRadarFrameChange?: (frame: RadarFrameInfo, mode: RadarDatasetMode) => void;
}

export const AppleWeatherHud: React.FC<AppleWeatherHudProps> = ({
  metrics,
  onClose,
  onToggleLayer,
  activeLayers = {},
  onRadarFrameChange
}) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showRadarLoop, setShowRadarLoop] = useState(false);

  // Conversions
  const tempF = Math.round(((metrics.tempC * 9) / 5 + 32) * 10) / 10;
  const tempDisplay = unitSystem === 'imperial' ? `${Math.round(tempF)}°` : `${Math.round(metrics.tempC)}°`;

  const dewPointC = metrics.dewPointC ?? (metrics.tempC - (100 - metrics.humidity) / 5);
  const dewPointF = Math.round(((dewPointC * 9) / 5 + 32) * 10) / 10;
  const dewPointDisplay = unitSystem === 'imperial' ? `${Math.round(dewPointF)}°` : `${Math.round(dewPointC)}°`;

  // Pressure
  const pressureHpa = Math.round(metrics.pressureHpa * 10) / 10;
  const pressureInHg = hpaToInHg(pressureHpa);
  const pressureTrend = pressureHpa > 1018 ? 'rising' : pressureHpa < 1008 ? 'falling' : 'steady';

  // Cloud cover
  const cloudCover = Math.min(100, Math.max(0, metrics.cloudCoverPct ?? 35));
  const cloudDesc = cloudCover < 15 ? 'Clear Sky' : cloudCover < 45 ? 'Partly Cloudy' : cloudCover < 75 ? 'Mostly Cloudy' : 'Overcast';

  // Wind
  const windKts = metrics.windSpeedKnots;
  const gustKts = metrics.windGustKnots || windKts * 1.35;
  const windSpeedDisplay = unitSystem === 'imperial' 
    ? `${(windKts * 1.15078).toFixed(1)} mph` 
    : `${(windKts * 1.852).toFixed(1)} km/h`;
  const gustDisplay = unitSystem === 'imperial'
    ? `${(gustKts * 1.15078).toFixed(1)} mph`
    : `${(gustKts * 1.852).toFixed(1)} km/h`;

  // UV Index
  const uv = Math.max(0, Math.min(12, metrics.uvIndex ?? 4));
  const uvCategory = uv <= 2 ? 'Low' : uv <= 5 ? 'Moderate' : uv <= 7 ? 'High' : uv <= 10 ? 'Very High' : 'Extreme';
  const uvColor = uv <= 2 ? 'text-emerald-400' : uv <= 5 ? 'text-yellow-400' : uv <= 7 ? 'text-orange-400' : 'text-purple-400';

  // Visibility
  const visM = metrics.visibilityMeters ?? 16000;
  const visMiles = Math.round((visM / 1609.34) * 10) / 10;
  const visKm = Math.round((visM / 1000) * 10) / 10;
  const visibilityDisplay = unitSystem === 'imperial' ? `${visMiles} mi` : `${visKm} km`;
  const visibilityDesc = visMiles >= 9 ? 'Perfect Clarity' : visMiles >= 5 ? 'Good Clarity' : 'Haze / Reduced';

  // Feels Like
  // Wind Chill for cold, Heat Index for warm
  let feelsLikeC = metrics.tempC;
  if (metrics.tempC <= 10 && windKts > 3) {
    feelsLikeC = 13.12 + 0.6215 * metrics.tempC - 11.37 * Math.pow(windKts * 1.852, 0.16) + 0.3965 * metrics.tempC * Math.pow(windKts * 1.852, 0.16);
  } else if (metrics.tempC >= 25 && metrics.humidity > 40) {
    feelsLikeC = metrics.tempC + 0.33 * (metrics.humidity / 100 * 6.105 * Math.exp(17.27 * metrics.tempC / (237.7 + metrics.tempC))) - 0.7 * (windKts * 0.514) - 4.0;
  }
  const feelsLikeF = Math.round(((feelsLikeC * 9) / 5 + 32) * 10) / 10;
  const feelsLikeDisplay = unitSystem === 'imperial' ? `${Math.round(feelsLikeF)}°` : `${Math.round(feelsLikeC)}°`;

  const cardinalDirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const dirIdx = Math.round(metrics.windDirectionDeg / 22.5) % 16;
  const windCardinal = cardinalDirs[dirIdx];

  return (
    <div 
      data-testid="apple-weather-hud"
      className="bg-black/90 border border-white/15 rounded-2xl p-3.5 sm:p-4 text-white font-sans backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] w-full max-w-[min(410px,calc(100vw-24px))] max-h-[calc(100vh-100px)] overflow-y-auto flex flex-col gap-3 transition-all duration-300 pointer-events-auto"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-400/40 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
            <Gauge size={16} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5 flex-wrap">
              <span className="flex items-center gap-1 text-sky-200">
                <MapPin size={13} className="text-sky-400 shrink-0" />
                <span>{metrics.locationName || 'Live Weather & Barometer'}</span>
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-950/80 border border-sky-500/50 text-sky-300 font-semibold uppercase">
                {metrics.latitude !== undefined && metrics.longitude !== undefined ? `${metrics.latitude.toFixed(2)}°, ${metrics.longitude.toFixed(2)}°` : 'SYNCED'}
              </span>
            </h3>
            <p className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span>Station Telemetry & Barometer</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Unit Toggle Buttons (NO SLIDERS) */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10 text-[10px] font-mono font-bold">
            <button
              type="button"
              onClick={() => setUnitSystem('imperial')}
              className={`px-1.5 py-0.5 rounded transition-all ${unitSystem === 'imperial' ? 'bg-sky-500 text-black font-extrabold shadow' : 'text-gray-300 hover:text-white'}`}
            >
              °F / inHg
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem('metric')}
              className={`px-1.5 py-0.5 rounded transition-all ${unitSystem === 'metric' ? 'bg-sky-500 text-black font-extrabold shadow' : 'text-gray-300 hover:text-white'}`}
            >
              °C / hPa
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title={isExpanded ? 'Collapse Telemetry' : 'Expand Telemetry'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Close Weather HUD"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Main Temperature Banner */}
      <div className="flex items-baseline justify-between px-1">
        <div>
          <div className="text-3xl sm:text-4xl font-extralight tracking-tight text-white flex items-baseline gap-1">
            <span>{tempDisplay}</span>
            <span className="text-xs text-gray-300 font-medium">{metrics.conditionText || cloudDesc}</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Feels like <strong className="text-white font-semibold">{feelsLikeDisplay}</strong>
          </div>
        </div>

        {/* Quick Map Overlay Layer Toggles */}
        {onToggleLayer && (
          <div className="flex items-center gap-1 font-mono text-[9px]">
            <button
              type="button"
              onClick={() => onToggleLayer('weather_clouds')}
              className={`px-2 py-1 rounded border transition-all flex items-center gap-1 font-bold ${
                activeLayers.weather_clouds 
                  ? 'bg-sky-950 border-sky-400 text-sky-200 shadow-[0_0_8px_rgba(56,189,248,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Live Cloud Satellite Overlay"
            >
              <Cloud size={10} />
              <span>CLOUDS</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleLayer('weather_pressure')}
              className={`px-2 py-1 rounded border transition-all flex items-center gap-1 font-bold ${
                activeLayers.weather_pressure 
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Surface Pressure & Isobars"
            >
              <Gauge size={10} />
              <span>ISOBARS</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleLayer('weather_radar')}
              className={`px-2 py-1 rounded border transition-all flex items-center gap-1 font-bold ${
                activeLayers.weather_radar 
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Live Precipitation Doppler Radar"
            >
              <CloudRain size={10} />
              <span>RADAR</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleLayer('atmospheric_radar')}
              className={`px-2 py-1 rounded border transition-all flex items-center gap-1 font-bold ${
                activeLayers.atmospheric_radar 
                  ? 'bg-pink-950 border-pink-400 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.4)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Atmospheric & Ionospheric Research Radars (HAARP, SuperDARN, NEXRAD)"
            >
              <Radio size={10} />
              <span>HAARP/RF</span>
            </button>
            <button
              type="button"
              onClick={() => setShowRadarLoop(!showRadarLoop)}
              className={`px-2 py-1 rounded border transition-all flex items-center gap-1 font-bold ${
                showRadarLoop
                  ? 'bg-amber-950 border-amber-400 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Open Multi-Frame Radar Loop Stepper Controller"
            >
              <Activity size={10} />
              <span>LOOP</span>
            </button>
          </div>
        )}
      </div>

      {/* Radar Loop Multi-Frame Stepper Controller */}
      {showRadarLoop && (
        <RadarLoopController 
          isOpen={showRadarLoop}
          onClose={() => setShowRadarLoop(false)}
          onFrameChange={onRadarFrameChange}
        />
      )}

      {/* Grid of Apple Weather Cards */}
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Card 1: Pressure & Barometer Gauge */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Gauge size={11} className="text-cyan-400" /> Barometer</span>
              <span className={`px-1 py-0.2 rounded font-mono text-[9px] font-bold ${
                pressureTrend === 'rising' ? 'bg-cyan-950 text-cyan-300' : pressureTrend === 'falling' ? 'bg-red-950 text-red-300' : 'bg-gray-800 text-gray-300'
              }`}>
                {pressureTrend === 'rising' ? '↗ RISING' : pressureTrend === 'falling' ? '↘ FALLING' : '➔ STEADY'}
              </span>
            </div>
            
            {/* Barometer Gauge Display */}
            <div className="my-1.5 flex flex-col items-center">
              <div className="relative w-24 h-12 overflow-hidden flex items-end justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-gray-700/80 border-t-cyan-400 border-r-sky-500 border-b-transparent border-l-gray-700 absolute top-0 transform -rotate-45" />
                <div 
                  className="w-1 h-10 bg-cyan-300 rounded-full origin-bottom absolute bottom-0 transition-transform duration-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  style={{
                    transform: `rotate(${Math.min(45, Math.max(-45, (pressureHpa - 1013) * 3))}deg)`
                  }}
                />
              </div>
              <div className="text-base font-bold font-mono text-white mt-1">
                {unitSystem === 'imperial' ? `${pressureInHg} inHg` : `${pressureHpa} hPa`}
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                {unitSystem === 'imperial' ? `${pressureHpa} hPa (MSL)` : `${pressureInHg} inHg (MSL)`}
              </div>
            </div>
            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1">
              {pressureHpa >= 1018 ? 'High pressure cell dominating. Clear air mass.' : pressureHpa <= 1008 ? 'Low pressure trough. Front / precipitation risk.' : 'Standard barometric pressure.'}
            </div>
          </div>

          {/* Card 2: Cloud Coverage */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Cloud size={11} className="text-sky-400" /> Cloud Cover</span>
              <span className="text-sky-300 font-mono font-bold">{cloudCover}%</span>
            </div>

            <div className="my-2 flex flex-col items-center">
              <div className="text-xl font-bold text-white tracking-tight">{cloudDesc}</div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${cloudCover}%` }}
                />
              </div>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1 flex justify-between">
              <span>Estimated Ceiling</span>
              <span className="text-white font-mono font-semibold">
                {cloudCover < 20 ? 'Unlimited' : `${Math.round(2500 * (100 - cloudCover) / 20 + 2000)} ft`}
              </span>
            </div>
          </div>

          {/* Card 3: Wind & Gusts Vector */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Wind size={11} className="text-emerald-400" /> Wind Vector</span>
              <span className="font-mono text-emerald-300 font-bold">{windCardinal} {metrics.windDirectionDeg}°</span>
            </div>

            <div className="flex items-center justify-around my-1">
              <div className="relative w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center bg-black/40">
                <span className="absolute top-0.5 text-[8px] font-mono text-gray-400">N</span>
                <span className="absolute bottom-0.5 text-[8px] font-mono text-gray-400">S</span>
                <span className="absolute left-1 text-[8px] font-mono text-gray-400">W</span>
                <span className="absolute right-1 text-[8px] font-mono text-gray-400">E</span>
                <ArrowUp 
                  size={18} 
                  className="text-emerald-400 transition-transform duration-500"
                  style={{ transform: `rotate(${metrics.windDirectionDeg}deg)` }}
                />
              </div>
              <div className="text-left font-mono">
                <div className="text-base font-bold text-white">{windSpeedDisplay}</div>
                <div className="text-[10px] text-gray-400">Gusts: <strong className="text-emerald-300">{gustDisplay}</strong></div>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1">
              Beaufort Scale Force: <strong className="text-white">{Math.min(12, Math.floor(windKts / 5))}</strong>
            </div>
          </div>

          {/* Card 4: UV Index */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Sun size={11} className="text-yellow-400" /> UV Index</span>
              <span className={`font-bold font-mono ${uvColor}`}>{uvCategory}</span>
            </div>

            <div className="my-1.5">
              <div className="text-2xl font-bold font-mono text-white">{uv}</div>
              <div className="w-full h-2 rounded-full mt-1.5 bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-purple-600 relative">
                <div 
                  className="w-2.5 h-2.5 rounded-full bg-white border border-black absolute -top-0.5 transform -translate-x-1/2 shadow"
                  style={{ left: `${Math.min(100, (uv / 11) * 100)}%` }}
                />
              </div>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1">
              {uv <= 2 ? 'Minimal sun protection needed.' : uv <= 5 ? 'Wear sunglasses & SPF 30+.' : 'High sun exposure. Seek shade.'}
            </div>
          </div>

          {/* Card 5: Humidity & Dew Point */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Droplets size={11} className="text-blue-400" /> Humidity</span>
              <span className="font-mono text-blue-300 font-bold">{metrics.humidity}%</span>
            </div>

            <div className="my-1">
              <div className="text-xl font-bold text-white font-mono">{metrics.humidity}%</div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                The dew point is <strong className="text-white font-semibold">{dewPointDisplay}</strong> right now.
              </div>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1">
              {metrics.humidity < 35 ? 'Dry atmospheric air mass.' : metrics.humidity < 65 ? 'Comfortable moisture level.' : 'Humid, high vapor saturation.'}
            </div>
          </div>

          {/* Card 6: Visibility */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Eye size={11} className="text-teal-400" /> Visibility</span>
              <span className="font-mono text-teal-300 font-bold">{visibilityDisplay}</span>
            </div>

            <div className="my-1">
              <div className="text-xl font-bold text-white font-mono">{visibilityDisplay}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{visibilityDesc}</div>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 border-t border-white/5 pt-1">
              Haze index: <strong className="text-white">{visMiles >= 10 ? 'None (Clear View)' : 'Mild Aerosols'}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
