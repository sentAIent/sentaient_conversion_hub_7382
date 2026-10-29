"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Radio, 
  Activity, 
  Clock, 
  Zap, 
  ShieldAlert, 
  Info, 
  X, 
  Compass,
  Sparkles,
  Layers,
  Sliders,
  GripVertical
} from 'lucide-react';

interface SolarPanelProps {
  currentCenter?: { lat: number; lng: number };
  onClose: () => void;
}

// Fitzpatrick skin type profiles for safe vitamin D exposure
const FITZPATRICK_TYPES = [
  { type: 1, name: 'Type I (Very Fair)', desc: 'Always burns, never tans', baseMinutes: 8 },
  { type: 2, name: 'Type II (Fair)', desc: 'Burns easily, tans minimally', baseMinutes: 12 },
  { type: 3, name: 'Type III (Medium / Olive)', desc: 'Burns moderately, tans gradually', baseMinutes: 18 },
  { type: 4, name: 'Type IV (Olive / Brown)', desc: 'Burns rarely, tans easily', baseMinutes: 25 },
  { type: 5, name: 'Type V (Dark Brown)', desc: 'Very rarely burns, deeply pigmented', baseMinutes: 38 },
  { type: 6, name: 'Type VI (Deeply Pigmented)', desc: 'Never burns, deeply pigmented', baseMinutes: 55 }
];

export function SolarPanel({ currentCenter, onClose }: SolarPanelProps) {
  // Use map center or fallback to user coordinates
  const lat = currentCenter ? currentCenter.lat : 38.9072;
  const lon = currentCenter ? currentCenter.lng : -77.0369;

  const [activeTab, setActiveTab] = useState<'photobiology' | 'space_weather' | 'schedule'>('photobiology');
  const [selectedSkinType, setSelectedSkinType] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Window sizing & position state
  const [size, setSize] = useState({ width: 440, height: 580 });
  const [position, setPosition] = useState({ x: 100, y: 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeResizeDir, setActiveResizeDir] = useState<string | null>(null);

  const sizeRef = useRef(size);
  sizeRef.current = size;
  const posRef = useRef(position);
  posRef.current = position;

  // Initialize responsive size & position based on window, and clamp on window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Responsive initial size
    const initialW = Math.min(480, Math.max(340, Math.floor(vw * 0.36)));
    const initialH = Math.min(680, Math.max(420, Math.floor(vh * 0.72)));

    // Position nicely on screen (avoiding pushing off edge on smaller displays)
    const initialX = Math.max(16, Math.min(vw - initialW - 20, Math.floor(vw * 0.48)));
    const initialY = Math.max(64, Math.min(vh - initialH - 20, 75));

    setSize({ width: initialW, height: initialH });
    setPosition({ x: initialX, y: initialY });

    const handleWindowResize = () => {
      const curVw = window.innerWidth;
      const curVh = window.innerHeight;

      setSize(prev => {
        const w = Math.min(prev.width, Math.max(320, curVw - 24));
        const h = Math.min(prev.height, Math.max(260, curVh - 32));
        return { width: w, height: h };
      });

      setPosition(prev => {
        const curW = Math.min(sizeRef.current.width, curVw - 24);
        const curH = Math.min(sizeRef.current.height, curVh - 32);
        const maxX = Math.max(10, curVw - curW - 10);
        const maxY = Math.max(10, curVh - curH - 10);
        return {
          x: Math.max(10, Math.min(prev.x, maxX)),
          y: Math.max(10, Math.min(prev.y, maxY))
        };
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Header drag handler
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = posRef.current.x;
    const startPosY = posRef.current.y;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const currentW = sizeRef.current.width;
      const maxX = Math.max(0, vw - currentW);
      const maxY = Math.max(0, vh - 45);

      const nextX = Math.max(0, Math.min(maxX, startPosX + dx));
      const nextY = Math.max(0, Math.min(maxY, startPosY + dy));

      setPosition({ x: nextX, y: nextY });
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // 8-way resize handler
  const handleResizeStart = (dir: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveResizeDir(dir);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = sizeRef.current.width;
    const startH = sizeRef.current.height;
    const startPosX = posRef.current.x;
    const startPosY = posRef.current.y;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const minW = 320;
      const maxW = Math.max(minW, vw - 16);
      const minH = 260;
      const maxH = Math.max(minH, vh - 16);

      let newW = startW;
      let newH = startH;
      let newX = startPosX;
      let newY = startPosY;

      if (dir.includes('e')) {
        newW = Math.min(maxW, Math.max(minW, startW + dx));
        if (newX + newW > vw) {
          newW = Math.max(minW, vw - newX);
        }
      } else if (dir.includes('w')) {
        const proposedW = startW - dx;
        newW = Math.min(maxW, Math.max(minW, proposedW));
        newX = startPosX + (startW - newW);
        if (newX < 0) {
          newW = Math.min(maxW, Math.max(minW, newW + newX));
          newX = 0;
        }
      }

      if (dir.includes('s')) {
        newH = Math.min(maxH, Math.max(minH, startH + dy));
        if (newY + newH > vh) {
          newH = Math.max(minH, vh - newY);
        }
      } else if (dir.includes('n')) {
        const proposedH = startH - dy;
        newH = Math.min(maxH, Math.max(minH, proposedH));
        newY = startPosY + (startH - newH);
        if (newY < 0) {
          newH = Math.min(maxH, Math.max(minH, newH + newY));
          newY = 0;
        }
      }

      setSize({ width: Math.round(newW), height: Math.round(newH) });
      setPosition({ x: Math.round(newX), y: Math.round(newY) });
    };

    const onPointerUp = () => {
      setActiveResizeDir(null);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };


  // Update clock every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Compute solar position and optical parameters
  const calculateSolarPosition = (latitude: number, longitude: number, date: Date) => {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;

    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // 1. Solar Declination (Spencer/Cooper model)
    const declination = 23.45 * Math.sin(rad * ((360 / 365) * (284 + dayOfYear)));

    // 2. Equation of Time (EoT) in minutes
    const B = (360 / 365) * (dayOfYear - 81) * rad;
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

    // 3. Solar Time & Hour Angle
    const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    const solarTimeHours = (utcHours + longitude / 15 + eot / 60 + 24) % 24;
    const hourAngle = (solarTimeHours - 12) * 15;

    // 4. Solar Zenith & Elevation Angle
    const sinLat = Math.sin(latitude * rad);
    const cosLat = Math.cos(latitude * rad);
    const sinDec = Math.sin(declination * rad);
    const cosDec = Math.cos(declination * rad);
    const cosOmega = Math.cos(hourAngle * rad);

    const cosZenith = sinLat * sinDec + cosLat * cosDec * cosOmega;
    const zenithDeg = Math.acos(Math.max(-1, Math.min(1, cosZenith))) * deg;
    const elevationDeg = 90 - zenithDeg;

    // 5. Optical Air Mass (Kasten-Young model)
    const airMass = elevationDeg > 0
      ? 1 / (Math.sin(elevationDeg * rad) + 0.50572 * Math.pow(elevationDeg + 6.07995, -1.6364))
      : 0;

    // Approximate clear-sky UV Index
    const estimatedUVI = elevationDeg > 5
      ? Math.max(0, (Math.sin(elevationDeg * rad) * 11) - 0.5)
      : 0;

    return {
      elevation: elevationDeg,
      zenith: zenithDeg,
      airMass: parseFloat(airMass.toFixed(2)),
      estimatedUVI: parseFloat(estimatedUVI.toFixed(1))
    };
  };

  // Compute full diurnal schedule of window crossing times
  const computeDailySchedule = (latitude: number, longitude: number, date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let sunrise: Date | null = null;
    let blueStart: Date | null = null;
    let uvaStart: Date | null = null;
    let uvbStart: Date | null = null;
    let solarZenith: Date | null = null;
    let uvbEnd: Date | null = null;
    let uvaEnd: Date | null = null;
    let blueEnd: Date | null = null;
    let sunset: Date | null = null;
    let peakElevation = -90;

    for (let m = 0; m < 1440; m += 3) {
      const sample = new Date(year, month, day, Math.floor(m / 60), m % 60);
      const pos = calculateSolarPosition(latitude, longitude, sample);

      if (pos.elevation > peakElevation) {
        peakElevation = pos.elevation;
        solarZenith = sample;
      }

      if (pos.elevation >= 0 && !sunrise) sunrise = sample;
      if (pos.elevation >= 10 && !blueStart) blueStart = sample;
      if (pos.elevation >= 15 && !uvaStart) uvaStart = sample;
      if (pos.elevation >= 35 && !uvbStart) uvbStart = sample;

      if (solarZenith && pos.elevation < 35 && uvbStart && !uvbEnd) uvbEnd = sample;
      if (solarZenith && pos.elevation < 15 && uvaStart && !uvaEnd) uvaEnd = sample;
      if (solarZenith && pos.elevation < 10 && blueStart && !blueEnd) blueEnd = sample;
      if (solarZenith && pos.elevation < 0 && sunrise && !sunset) sunset = sample;
    }

    return {
      sunrise,
      blueStart,
      uvaStart,
      uvbStart,
      solarZenith,
      peakElevation,
      uvbEnd,
      uvaEnd,
      blueEnd,
      sunset
    };
  };

  const pos = calculateSolarPosition(lat, lon, currentTime);
  const schedule = computeDailySchedule(lat, lon, currentTime);

  const formatTime = (d: Date | null) => {
    if (!d) return 'None (Seasonal)';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Determine current active phase
  let currentPhaseTitle = 'Nocturnal Restoration';
  let currentPhaseDesc = 'Pineal gland actively synthesizing melatonin. Zero blue light recommended.';
  let currentBadgeColor = 'text-purple-400 bg-purple-950/60 border-purple-500/40';

  if (pos.elevation >= 35) {
    currentPhaseTitle = 'Active UVB Synthesis Window';
    currentPhaseDesc = 'Atmospheric ozone penetration allows 290-315nm UVB photons to trigger vitamin D3 production.';
    currentBadgeColor = 'text-amber-400 bg-amber-950/60 border-amber-500/40';
  } else if (pos.elevation >= 15) {
    currentPhaseTitle = 'UVA & Nitric Oxide Mobilization';
    currentPhaseDesc = '315-400nm UVA releases endothelial nitric oxide stores into circulation, lowering blood pressure.';
    currentBadgeColor = 'text-yellow-400 bg-yellow-950/60 border-yellow-500/40';
  } else if (pos.elevation >= 10) {
    currentPhaseTitle = 'Circadian Blue Entrainment';
    currentPhaseDesc = '460-490nm photons activate ipRGC melanopsin receptors to stimulate cortisol and lock circadian rhythm.';
    currentBadgeColor = 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
  } else if (pos.elevation >= 0) {
    currentPhaseTitle = 'NIR Mitochondrial Melatonin Priming';
    currentPhaseDesc = '700-1400nm Near-Infrared penetrates deeply into mitochondria to prime Cytochrome c Oxidase.';
    currentBadgeColor = 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  }

  // Calculate safe exposure minutes for selected skin type
  const activeSkin = FITZPATRICK_TYPES.find(s => s.type === selectedSkinType) || FITZPATRICK_TYPES[2];
  const adjustedExposureMins = pos.estimatedUVI > 0.5
    ? Math.max(5, Math.round((activeSkin.baseMinutes * 6) / Math.max(1, pos.estimatedUVI)))
    : activeSkin.baseMinutes * 2;

  return (
    <div 
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        userSelect: isDragging || activeResizeDir ? 'none' : 'auto'
      }}
      className="fixed top-0 left-0 bg-black/95 backdrop-blur-md border border-amber-600/70 rounded-xl shadow-[0_0_35px_rgba(245,158,11,0.35)] text-white font-mono text-xs overflow-hidden flex flex-col z-40 group"
    >
      {/* 8-Way Resize Handles */}
      <div 
        onPointerDown={(e) => handleResizeStart('n', e)} 
        className="absolute top-0 left-3 right-3 h-2 -translate-y-1 cursor-ns-resize z-50 hover:bg-amber-500/20 transition-colors" 
        title="Resize height"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('s', e)} 
        className="absolute bottom-0 left-3 right-3 h-2 translate-y-1 cursor-ns-resize z-50 hover:bg-amber-500/20 transition-colors" 
        title="Resize height"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('w', e)} 
        className="absolute left-0 top-3 bottom-3 w-2 -translate-x-1 cursor-ew-resize z-50 hover:bg-amber-500/20 transition-colors" 
        title="Resize width"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('e', e)} 
        className="absolute right-0 top-3 bottom-3 w-2 translate-x-1 cursor-ew-resize z-50 hover:bg-amber-500/20 transition-colors" 
        title="Resize width"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('nw', e)} 
        className="absolute top-0 left-0 w-3.5 h-3.5 -translate-x-1 -translate-y-1 cursor-nwse-resize z-50 hover:bg-amber-500/40 rounded-tl transition-colors" 
        title="Resize top-left"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('ne', e)} 
        className="absolute top-0 right-0 w-3.5 h-3.5 translate-x-1 -translate-y-1 cursor-nesw-resize z-50 hover:bg-amber-500/40 rounded-tr transition-colors" 
        title="Resize top-right"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('sw', e)} 
        className="absolute bottom-0 left-0 w-3.5 h-3.5 -translate-x-1 translate-y-1 cursor-nesw-resize z-50 hover:bg-amber-500/40 rounded-bl transition-colors" 
        title="Resize bottom-left"
      />
      <div 
        onPointerDown={(e) => handleResizeStart('se', e)} 
        className="absolute bottom-0 right-0 w-4 h-4 translate-x-1 translate-y-1 cursor-nwse-resize z-50 hover:bg-amber-500/40 rounded-br transition-colors" 
        title="Resize bottom-right"
      />

      {/* Header - Draggable */}
      <div 
        onPointerDown={handleDragStart}
        className="bg-amber-950/60 px-3.5 py-2.5 border-b border-amber-600/50 flex justify-between items-center cursor-grab active:cursor-grabbing select-none transition-colors hover:bg-amber-950/80"
      >
        <div className="flex items-center gap-2 text-amber-400 font-bold tracking-wider text-sm">
          <GripVertical size={15} className="text-amber-500/60 shrink-0" />
          <Sun size={17} className="text-amber-400 animate-spin-slow shrink-0" />
          <span className="truncate">SOLAR FREQ &amp; SPACE WEATHER</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white transition-colors ml-2 p-0.5 rounded hover:bg-white/10 shrink-0"
          title="Close Solar Panel"
        >
          <X size={15} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-900/50 bg-black/50 text-[11px]">
        <button
          onClick={() => setActiveTab('photobiology')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'photobiology' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Sparkles size={12} /> SPECTRAL BANDS
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'schedule' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Clock size={12} /> DIURNAL TIMES
        </button>
        <button
          onClick={() => setActiveTab('space_weather')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${activeTab === 'space_weather' ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Radio size={12} /> SOLAR RF & NOAA
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 space-y-3.5 flex-1 min-h-0 overflow-y-auto">
        {/* Real-time Solar Gauge Overview */}
        <div className="p-3 bg-gradient-to-br from-amber-950/30 to-black border border-amber-800/40 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-400 flex items-center gap-1">
              <Compass size={11} className="text-amber-400" /> COORDINATES:
            </span>
            <span className="text-amber-300 font-bold">
              {lat.toFixed(4)}°, {lon.toFixed(4)}°
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-amber-900/30 text-center">
            <div className="p-1.5 bg-black/60 rounded border border-amber-900/40">
              <div className="text-[10px] text-gray-400">ELEVATION</div>
              <div className="text-sm font-bold text-amber-300">{pos.elevation.toFixed(1)}°</div>
            </div>
            <div className="p-1.5 bg-black/60 rounded border border-amber-900/40">
              <div className="text-[10px] text-gray-400">EST. UV INDEX</div>
              <div className="text-sm font-bold text-yellow-400">{pos.estimatedUVI.toFixed(1)}</div>
            </div>
            <div className="p-1.5 bg-black/60 rounded border border-amber-900/40">
              <div className="text-[10px] text-gray-400">AIR MASS (AM)</div>
              <div className="text-sm font-bold text-cyan-300">{pos.airMass > 0 ? pos.airMass : 'N/A'}</div>
            </div>
          </div>

          {/* Current Biological Phase Badge */}
          <div className={`mt-2 p-2 rounded border ${currentBadgeColor} space-y-1`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[11px] uppercase">{currentPhaseTitle}</span>
              <span className="text-[10px] opacity-80">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed">{currentPhaseDesc}</p>
          </div>
        </div>

        {/* TAB 1: SPECTRAL PHOTOBIOLOGY BANDS */}
        {activeTab === 'photobiology' && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mb-1">
              <Layers size={12} /> ACTIVE SOLAR FREQUENCY BANDS
            </div>

            {/* NIR Band */}
            <div className={`p-2 rounded-lg border flex justify-between items-center transition-all ${pos.elevation > 0 ? 'bg-rose-950/30 border-rose-600/60' : 'bg-black/50 border-gray-800 opacity-60'}`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  <span className="font-bold text-rose-300">NIR-A / NIR-B (700 - 1400 nm)</span>
                </div>
                <div className="text-[10px] text-gray-400">Mitochondrial Melatonin via Cytochrome c Oxidase</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pos.elevation > 0 ? 'bg-rose-900/60 text-rose-300 border border-rose-500/40' : 'bg-gray-800 text-gray-500'}`}>
                {pos.elevation > 0 ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* Circadian Blue Band */}
            <div className={`p-2 rounded-lg border flex justify-between items-center transition-all ${pos.elevation >= 10 ? 'bg-cyan-950/30 border-cyan-600/60' : 'bg-black/50 border-gray-800 opacity-60'}`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                  <span className="font-bold text-cyan-300">Circadian Blue (460 - 490 nm)</span>
                </div>
                <div className="text-[10px] text-gray-400">ipRGC Melanopsin SCN Cortisol Entrainment</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pos.elevation >= 10 ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/40' : 'bg-gray-800 text-gray-500'}`}>
                {pos.elevation >= 10 ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* UVA Band */}
            <div className={`p-2 rounded-lg border flex justify-between items-center transition-all ${pos.elevation >= 15 ? 'bg-yellow-950/30 border-yellow-600/60' : 'bg-black/50 border-gray-800 opacity-60'}`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="font-bold text-yellow-300">UVA (315 - 400 nm)</span>
                </div>
                <div className="text-[10px] text-gray-400">Nitric Oxide (NO) Mobilization & Vasodilation</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pos.elevation >= 15 ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-500/40' : 'bg-gray-800 text-gray-500'}`}>
                {pos.elevation >= 15 ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* UVB Band */}
            <div className={`p-2 rounded-lg border flex justify-between items-center transition-all ${pos.elevation >= 35 ? 'bg-amber-950/40 border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-black/50 border-gray-800 opacity-60'}`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping"></span>
                  <span className="font-bold text-amber-300">UVB (290 - 315 nm) — Vitamin D3</span>
                </div>
                <div className="text-[10px] text-gray-400">7-DHC Pre-Vitamin D3 Photoisomerization (Elevation &gt; 35°)</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pos.elevation >= 35 ? 'bg-amber-500 text-black font-extrabold' : 'bg-gray-800 text-gray-500'}`}>
                {pos.elevation >= 35 ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* Fitzpatrick Exposure Calibration */}
            <div className="mt-3 p-2.5 bg-black/70 border border-amber-900/50 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-300 font-bold flex items-center gap-1">
                  <Sliders size={12} className="text-amber-400" /> SKIN TYPE CALIBRATION:
                </span>
                <select
                  value={selectedSkinType}
                  onChange={(e) => setSelectedSkinType(Number(e.target.value))}
                  className="bg-slate-900 border border-amber-800 rounded px-2 py-0.5 text-amber-300 text-[10px] focus:outline-none"
                >
                  {FITZPATRICK_TYPES.map(ft => (
                    <option key={ft.type} value={ft.type}>{ft.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center text-[10px] pt-1 border-t border-gray-800">
                <span className="text-gray-400">{activeSkin.desc}</span>
                <span className="text-amber-300 font-bold">Optimal Dose: ~{adjustedExposureMins} min</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIURNAL TIME WINDOWS */}
        {activeTab === 'schedule' && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mb-1">
              <Clock size={12} /> TODAY&apos;S SOLAR CROSSING WINDOWS
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center p-2 bg-black/60 border border-gray-800 rounded">
                <span className="text-rose-400 font-semibold">Sunrise (NIR Dawn Priming)</span>
                <span className="text-gray-300 font-bold">{formatTime(schedule.sunrise)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/60 border border-gray-800 rounded">
                <span className="text-cyan-400 font-semibold">Circadian Blue Start (&gt;10°)</span>
                <span className="text-gray-300 font-bold">{formatTime(schedule.blueStart)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/60 border border-gray-800 rounded">
                <span className="text-yellow-400 font-semibold">UVA Window Start (&gt;15°)</span>
                <span className="text-gray-300 font-bold">{formatTime(schedule.uvaStart)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-amber-950/30 border border-amber-800/60 rounded">
                <span className="text-amber-300 font-bold">UVB Window Start (&gt;35°)</span>
                <span className="text-amber-400 font-bold">{formatTime(schedule.uvbStart)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-amber-950/50 to-orange-950/50 border border-amber-500 rounded">
                <span className="text-amber-300 font-extrabold">Solar Zenith (Peak Sun)</span>
                <span className="text-white font-extrabold">{formatTime(schedule.solarZenith)} ({schedule.peakElevation.toFixed(1)}°)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-amber-950/30 border border-amber-800/60 rounded">
                <span className="text-amber-300 font-bold">UVB Window End (&lt;35°)</span>
                <span className="text-amber-400 font-bold">{formatTime(schedule.uvbEnd)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/60 border border-gray-800 rounded">
                <span className="text-yellow-400 font-semibold">UVA Window End (&lt;15°)</span>
                <span className="text-gray-300 font-bold">{formatTime(schedule.uvaEnd)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-black/60 border border-gray-800 rounded">
                <span className="text-rose-400 font-semibold">Sunset (NIR Dusk Priming)</span>
                <span className="text-gray-300 font-bold">{formatTime(schedule.sunset)}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SOLAR RF & NOAA SPACE WEATHER */}
        {activeTab === 'space_weather' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mb-1">
              <Radio size={12} /> SOLAR RF FLUX & SPACE WEATHER MONITOR
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-black/70 border border-amber-900/50 rounded-lg">
                <div className="text-[10px] text-gray-400">10.7cm SOLAR FLUX (2800 MHz)</div>
                <div className="text-lg font-bold text-amber-300 mt-1">168 sfu</div>
                <div className="text-[9px] text-gray-500 mt-0.5">High Solar Cycle 25 Activity</div>
              </div>
              <div className="p-2.5 bg-black/70 border border-amber-900/50 rounded-lg">
                <div className="text-[10px] text-gray-400">PLANETARY K-INDEX (Kp)</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">2.3 (Quiet)</div>
                <div className="text-[9px] text-gray-500 mt-0.5">Geomagnetic Field Stable</div>
              </div>
            </div>

            <div className="p-2.5 bg-black/70 border border-cyan-900/50 rounded-lg space-y-2">
              <div className="text-[11px] text-cyan-300 font-bold flex items-center gap-1">
                <Activity size={12} /> NOAA SPACE WEATHER SCALES
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-1 bg-slate-900/90 rounded border border-gray-800">
                  <div className="text-gray-400">RADIO (R)</div>
                  <div className="font-bold text-emerald-400">R0 (None)</div>
                </div>
                <div className="p-1 bg-slate-900/90 rounded border border-gray-800">
                  <div className="text-gray-400">RADIATION (S)</div>
                  <div className="font-bold text-emerald-400">S0 (None)</div>
                </div>
                <div className="p-1 bg-slate-900/90 rounded border border-gray-800">
                  <div className="text-gray-400">GEOMAGNETIC (G)</div>
                  <div className="font-bold text-emerald-400">G0 (None)</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-950/20 border border-amber-800/40 rounded-lg space-y-1">
              <div className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                <Zap size={11} /> HF PROPAGATION (3 - 30 MHz):
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Daytime ionospheric D-region absorption is normal. Maximum Usable Frequency (MUF) peaking around 28 MHz. Solar flare X-ray flux in background B/C-class range.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-black/80 px-3.5 py-2 border-t border-amber-950/60 flex justify-between items-center text-[10px] text-gray-500 select-none">
        <span>MindWave &amp; Sphinx Solar Engine</span>
        <div className="flex items-center gap-2">
          <span>Photobiology &amp; RF Telemetry</span>
          <div 
            onPointerDown={(e) => handleResizeStart('se', e)}
            className="cursor-nwse-resize text-amber-500/40 hover:text-amber-400 p-0.5"
            title="Resize"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" className="fill-current">
              <circle cx="7" cy="7" r="1" />
              <circle cx="7" cy="3.5" r="1" />
              <circle cx="3.5" cy="7" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
