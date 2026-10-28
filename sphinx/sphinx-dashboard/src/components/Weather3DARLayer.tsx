"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl/maplibre';
import { CloudRain, CloudSnow, Zap, Wind, Droplets, Thermometer, X } from 'lucide-react';

interface Weather3DARLayerProps {
  visible: boolean;
  lightningData?: GeoJSON.FeatureCollection | null;
  currentWeatherVector?: {
    windSpeedKnots: number;
    windDirectionDeg: number;
    temperatureF?: number;
  };
}

interface ARWeatherCell {
  id: string;
  type: 'rain' | 'snow' | 'thunderstorm';
  lat: number;
  lon: number;
  name: string;
  intensity: 'MODERATE' | 'HEAVY' | 'SEVERE';
  rate: string; // e.g. "0.45 in/hr" or "2.1 in snow"
  radarDbz: number;
  tempF: number;
  windKnots: number;
  windDir: number;
  particleCount: number;
}

export const Weather3DARLayer: React.FC<Weather3DARLayerProps> = ({
  visible,
  lightningData,
  currentWeatherVector
}) => {
  const [selectedCell, setSelectedCell] = useState<ARWeatherCell | null>(null);
  const [pulseTick, setPulseTick] = useState(0);

  // Pulse animation ticker for dynamic 3D lightning shockwaves and rain shafts
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPulseTick(t => (t + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, [visible]);

  // Weather cells: initialize empty so synthetic mock cells do not render false weather
  const weatherCells: ARWeatherCell[] = useMemo(() => [], []);

  // Filter live lightning strikes for 3D volumetric electric arc markers
  const lightningStrikes = useMemo(() => {
    if (!lightningData?.features || !Array.isArray(lightningData.features)) return [];
    return lightningData.features.slice(0, 20); // Top 20 most recent
  }, [lightningData]);

  if (!visible) return null;

  return (
    <>
      {/* 1. 3D AR Active Weather Cells (Rain, Snow, Storms) */}
      {weatherCells.map((cell) => {
        const isSnow = cell.type === 'snow';
        const isStorm = cell.type === 'thunderstorm';

        return (
          <Marker
            key={cell.id}
            longitude={cell.lon}
            latitude={cell.lat}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedCell(cell);
            }}
          >
            <div className="cursor-pointer group relative flex flex-col items-center pointer-events-auto">
              {/* Floating Holographic 3D Weather Pill */}
              <div 
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-md shadow-lg transition-transform hover:scale-110 ${
                  isSnow
                    ? 'bg-sky-950/90 border-cyan-300 text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.7)]'
                    : isStorm
                    ? 'bg-purple-950/90 border-yellow-400 text-yellow-100 shadow-[0_0_20px_rgba(234,179,8,0.8)] animate-pulse'
                    : 'bg-blue-950/90 border-blue-400 text-blue-100 shadow-[0_0_16px_rgba(59,130,246,0.6)]'
                }`}
              >
                {isSnow ? (
                  <CloudSnow size={14} className="text-cyan-300 shrink-0 animate-bounce" />
                ) : isStorm ? (
                  <Zap size={14} className="text-yellow-400 shrink-0" />
                ) : (
                  <CloudRain size={14} className="text-blue-400 shrink-0" />
                )}
                <span>
                  {isSnow ? '3D SNOW' : isStorm ? '3D SEVERE STORM' : '3D RAIN'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/50 border border-current">
                  {cell.rate}
                </span>
              </div>

              {/* 3D AR Volumetric Precipitation Shafts / Streaks */}
              <div className="relative w-28 h-20 overflow-hidden pointer-events-none mt-1">
                {isSnow ? (
                  // 3D Snow: Crystalline drifting snowflake vectors
                  <div className="absolute inset-0 flex justify-around">
                    <span className="text-cyan-200 text-xs animate-bounce" style={{ animationDuration: '1.2s' }}>❄️</span>
                    <span className="text-white text-[10px] animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.4s' }}>❅</span>
                    <span className="text-cyan-300 text-xs animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.8s' }}>❄️</span>
                    <span className="text-white text-[10px] animate-bounce" style={{ animationDuration: '2.1s', animationDelay: '0.2s' }}>❅</span>
                  </div>
                ) : (
                  // 3D Rain & Storm: Downward cyan laser rain shafts
                  <div className="absolute inset-0 flex justify-around opacity-80">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-blue-300 via-cyan-400 to-transparent transform -rotate-12 animate-pulse" />
                    <div className="w-0.5 h-16 bg-gradient-to-b from-blue-300 via-cyan-400 to-transparent transform -rotate-12 animate-pulse delay-100" />
                    <div className="w-0.5 h-10 bg-gradient-to-b from-blue-300 via-cyan-400 to-transparent transform -rotate-12 animate-pulse delay-200" />
                    <div className="w-0.5 h-14 bg-gradient-to-b from-blue-300 via-cyan-400 to-transparent transform -rotate-12 animate-pulse delay-300" />
                  </div>
                )}

                {/* Ground Impact Ripple / Splash Ring */}
                <div 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border ${
                    isSnow 
                      ? 'w-16 h-4 border-cyan-300/80 bg-cyan-400/20 shadow-[0_0_12px_#38bdf8]' 
                      : 'w-20 h-5 border-blue-400/80 bg-blue-500/20 shadow-[0_0_12px_#60a5fa] animate-ping'
                  }`} 
                />
              </div>
            </div>
          </Marker>
        );
      })}

      {/* 2. 3D AR Volumetric Lightning Strikes */}
      {lightningStrikes.map((strike, idx) => {
        const coords = (strike.geometry as GeoJSON.Point).coordinates;
        const currentKa = strike.properties?.peak_current_ka || 35;
        const ageSec = strike.properties?.age_sec || 0;

        return (
          <Marker
            key={`ar-lightning-${strike.properties?.id || idx}`}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="bottom"
          >
            <div className="pointer-events-none relative flex flex-col items-center">
              {/* Electric Sky Arc */}
              <div className="relative flex flex-col items-center">
                <span className="text-yellow-300 text-lg drop-shadow-[0_0_12px_rgba(250,204,21,1)] animate-bounce">
                  ⚡
                </span>
                {/* Vertical High-Voltage Plasma Discharge Line */}
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-200 via-cyan-300 to-purple-400 shadow-[0_0_12px_#fde047]" />
              </div>

              {/* Expanding Ground Shockwave Ionization Rings */}
              <div className="relative -mt-1 flex items-center justify-center">
                <div className="w-8 h-3 rounded-full border-2 border-yellow-300 bg-yellow-400/30 animate-ping shadow-[0_0_15px_#facc15]" />
                <div className="absolute w-14 h-5 rounded-full border border-cyan-400/60 animate-ping delay-150" />
              </div>

              {/* AR Strike Telemetry Badge */}
              <div className="mt-1 bg-black/90 border border-yellow-500/80 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.5)] whitespace-nowrap">
                {currentKa > 0 ? `+${currentKa}` : currentKa} kA • {ageSec}s ago
              </div>
            </div>
          </Marker>
        );
      })}

      {/* 3. Tactical AR Weather Telemetry Popup */}
      {selectedCell && (
        <Popup
          longitude={selectedCell.lon}
          latitude={selectedCell.lat}
          anchor="top"
          onClose={() => setSelectedCell(null)}
          closeButton={false}
          className="z-50"
        >
          <div className="bg-black/95 border border-cyan-700 p-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] text-white font-mono max-w-xs backdrop-blur-md">
            <div className="flex justify-between items-start border-b border-cyan-900/60 pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {selectedCell.type === 'snow' ? '❄️' : selectedCell.type === 'thunderstorm' ? '⚡' : '🌧️'}
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-200">{selectedCell.name}</h4>
                  <span className="text-[10px] text-cyan-400 font-semibold">
                    {selectedCell.type.toUpperCase()} • {selectedCell.intensity}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCell(null)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-1">
              <div className="bg-black/60 border border-cyan-950 p-2 rounded-lg">
                <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                  <Droplets size={12} className="text-cyan-400" />
                  <span>PRECIP RATE</span>
                </div>
                <div className="font-bold text-cyan-200 mt-0.5">{selectedCell.rate}</div>
              </div>

              <div className="bg-black/60 border border-cyan-950 p-2 rounded-lg">
                <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                  <Thermometer size={12} className="text-amber-400" />
                  <span>TEMPERATURE</span>
                </div>
                <div className="font-bold text-amber-200 mt-0.5">{selectedCell.tempF}°F</div>
              </div>

              <div className="bg-black/60 border border-cyan-950 p-2 rounded-lg">
                <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                  <Wind size={12} className="text-sky-400" />
                  <span>WIND VECTOR</span>
                </div>
                <div className="font-bold text-sky-200 mt-0.5">{selectedCell.windKnots} kts @ {selectedCell.windDir}°</div>
              </div>

              <div className="bg-black/60 border border-cyan-950 p-2 rounded-lg">
                <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                  <span>📡</span>
                  <span>RADAR DBZ</span>
                </div>
                <div className="font-bold text-emerald-300 mt-0.5">{selectedCell.radarDbz} dBZ</div>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-gray-400 bg-cyan-950/40 p-1.5 rounded border border-cyan-900/40 text-center font-mono">
              3D AR Volumetric Shader Active • Vector Pitch 50° Enabled
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
