"use client";
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Compass, X, Info, Sparkles, Eye } from 'lucide-react';

interface CelestialDomeModalProps {
  onClose: () => void;
  lat: number;
  lon: number;
}

// Compute accurate lunar phase & illumination % from date
function getMoonDetails(date: Date) {
  // Known reference new moon: Jan 11, 2024, 11:57 UTC
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const synodicMonth = 29.53058867 * 86400000;
  const diff = date.getTime() - refNewMoon;
  const phaseCycle = ((diff % synodicMonth) + synodicMonth) % synodicMonth;
  const phaseRatio = phaseCycle / synodicMonth; // 0.0 to 1.0

  // Illumination percentage from phase ratio
  // 0.0 = New Moon (0%), 0.5 = Full Moon (100%), 1.0 = New Moon (0%)
  const illumination = Math.round((1 - Math.cos(phaseRatio * 2 * Math.PI)) / 2 * 100);

  let phaseName = 'New Moon';
  if (phaseRatio > 0.03 && phaseRatio < 0.22) phaseName = 'Waxing Crescent';
  else if (phaseRatio >= 0.22 && phaseRatio <= 0.28) phaseName = 'First Quarter';
  else if (phaseRatio > 0.28 && phaseRatio < 0.47) phaseName = 'Waxing Gibbous';
  else if (phaseRatio >= 0.47 && phaseRatio <= 0.53) phaseName = 'Full Moon';
  else if (phaseRatio > 0.53 && phaseRatio < 0.72) phaseName = 'Waning Gibbous';
  else if (phaseRatio >= 0.72 && phaseRatio <= 0.78) phaseName = 'Last Quarter';
  else if (phaseRatio > 0.78 && phaseRatio < 0.97) phaseName = 'Waning Crescent';

  const daysToFull = phaseRatio < 0.5
    ? Math.round((0.5 - phaseRatio) * 29.53)
    : Math.round((1.5 - phaseRatio) * 29.53);

  const daysToNew = Math.round((1.0 - phaseRatio) * 29.53);

  return {
    phaseRatio,
    illumination,
    phaseName,
    daysToFull,
    daysToNew
  };
}

// Approximate solar elevation
function getSolarElevation(lat: number, lon: number, date: Date) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const declination = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60;
  const solarTime = (utcHours + lon / 15 + 24) % 24;
  const hourAngle = (solarTime - 12) * 15;

  const latRad = (lat * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;
  const haRad = (hourAngle * Math.PI) / 180;

  const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);
  return Math.round((Math.asin(sinAlt) * 180) / Math.PI);
}

export const CelestialDomeModal: React.FC<CelestialDomeModalProps> = ({ onClose, lat, lon }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const moon = getMoonDetails(now);
  const solarElev = getSolarElevation(lat, lon, now);

  const getTwilightStatus = (elev: number) => {
    if (elev > 0) return { label: 'Daylight / Solar Exposure', color: 'text-amber-400' };
    if (elev > -6) return { label: 'Civil Twilight (Visible Horizon)', color: 'text-orange-400' };
    if (elev > -12) return { label: 'Nautical Twilight (Sea Horizon / First Stars)', color: 'text-indigo-400' };
    if (elev > -18) return { label: 'Astronomical Twilight (Faint Stars)', color: 'text-purple-400' };
    return { label: 'True Night (Full Dark Sky)', color: 'text-blue-500' };
  };

  const twilight = getTwilightStatus(solarElev);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-neutral-950 border border-purple-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col font-mono text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950/90 to-indigo-950/90 px-6 py-4 border-b border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-400" size={20} />
            <div>
              <h2 className="text-sm font-bold text-purple-300 tracking-wider">CELESTIAL EPHEMERIS & SKY DOME</h2>
              <p className="text-[11px] text-gray-400">Position: {lat.toFixed(4)}°N, {lon.toFixed(4)}°W • Stellarium Navigation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Top Row: Moon Ephemeris & Twilight Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lunar Phase Card */}
            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative overflow-hidden shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {/* Visual Moon representation */}
                <div 
                  className="absolute inset-0 bg-amber-100 rounded-full transition-all"
                  style={{
                    clipPath: moon.phaseRatio < 0.5 
                      ? `inset(0 0 0 ${100 - moon.illumination}%)`
                      : `inset(0 ${100 - moon.illumination}% 0 0)`
                  }}
                />
                <Moon className="relative z-10 text-neutral-950/70" size={36} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Lunar Phase</span>
                <div className="text-base font-bold text-white">{moon.phaseName}</div>
                <div className="text-sm font-semibold text-amber-300">{moon.illumination}% Illuminated</div>
                <div className="text-[10px] text-gray-400 pt-1">
                  Next Full Moon: in {moon.daysToFull} days • New Moon: in {moon.daysToNew} days
                </div>
              </div>
            </div>

            {/* Twilight & Solar Elevation */}
            <div className="bg-black/60 border border-indigo-500/30 rounded-xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Atmospheric Lighting</span>
              <div className="flex items-center gap-2">
                <Sun size={20} className={solarElev > 0 ? "text-amber-400 animate-pulse" : "text-gray-600"} />
                <div className="text-base font-bold text-white">Solar Alt: {solarElev}°</div>
              </div>
              <div className={`font-semibold text-xs ${twilight.color}`}>{twilight.label}</div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-900 via-indigo-500 to-amber-400 h-full transition-all"
                  style={{ width: `${Math.max(5, Math.min(100, ((solarElev + 18) / 36) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Celestial Sky Dome */}
          <div className="bg-black/70 border border-white/10 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Compass size={16} />
                <span>STELLARIUM CELESTIAL NAVIGATOR (GPS-DENIED HEADING)</span>
              </div>
              <span className="text-[10px] bg-purple-950/80 text-purple-300 px-2.5 py-0.5 rounded border border-purple-700/50">
                Zenith Projection
              </span>
            </div>

            {/* Circular Celestial Dome SVG */}
            <div className="relative w-64 h-64 mx-auto rounded-full border-2 border-dashed border-purple-500/40 bg-gradient-to-b from-indigo-950/40 to-black p-2 flex items-center justify-center">
              {/* Compass Cardinal Points */}
              <span className="absolute top-1 text-xs font-bold text-cyan-400">N (000°)</span>
              <span className="absolute bottom-1 text-xs font-bold text-gray-500">S (180°)</span>
              <span className="absolute right-2 text-xs font-bold text-gray-500">E (090°)</span>
              <span className="absolute left-2 text-xs font-bold text-gray-500">W (270°)</span>

              {/* Crosshairs */}
              <div className="absolute inset-x-8 top-1/2 h-[1px] bg-white/10" />
              <div className="absolute inset-y-8 left-1/2 w-[1px] bg-white/10" />

              {/* Polaris / North Star indicator */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] animate-ping opacity-75" />
                <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-0.5" />
                <span className="text-[9px] font-bold text-cyan-300 mt-1">Polaris</span>
              </div>

              {/* Ursa Major (Big Dipper) Pointers */}
              <div className="absolute top-16 left-14 text-[9px] text-gray-400">
                <span>★ Merak</span>
                <br />
                <span>★ Dubhe ──&gt;</span>
              </div>

              {/* Cassiopeia W shape */}
              <div className="absolute top-14 right-10 text-[9px] text-gray-400">
                <span>★ Cassiopeia (W)</span>
              </div>

              {/* Southern Cross (if southern latitude) */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] text-gray-500">
                <span>{lat >= 0 ? 'Celestial Equator' : '★ Southern Cross (Crux)'}</span>
              </div>

              {/* Center Zenith point */}
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" title="Observer Zenith" />
            </div>

            {/* Tactical Field Instructions */}
            <div className="bg-neutral-900/60 border border-white/5 rounded-lg p-3 space-y-1 text-[11px] text-gray-300">
              <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                <Info size={12} /> True North Acquisition Protocol:
              </div>
              <p>1. Find the Big Dipper (Ursa Major). Draw an imaginary line through pointer stars Merak and Dubhe.</p>
              <p>2. Extend that vector 5 times the distance between them to strike Polaris (within 0.7° of True North).</p>
              <p>3. Align your magnetic compass with Polaris to calculate exact local magnetic declination.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black/90 px-6 py-3 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-500">
          <span>SPHINX ASTRONOMICAL ENGINE • ZERO EXTERNAL NETWORK DEPENDENCY</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors text-xs"
          >
            Close Dome
          </button>
        </div>
      </div>
    </div>
  );
};
