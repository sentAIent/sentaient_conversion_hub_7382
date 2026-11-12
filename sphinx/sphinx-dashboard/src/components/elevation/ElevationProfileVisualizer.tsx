import React, { useState, useMemo } from 'react';
import { ElevationProfileEngine, ElevationProfileAnalysis } from '../../lib/elevation/elevationProfileEngine';
import { Radio, Wifi, ShieldAlert, CheckCircle, ArrowRight, Plus, Minus, Compass } from 'lucide-react';

interface ElevationProfileVisualizerProps {
  currentCoordinates: [number, number]; // [lon, lat]
}

export const ElevationProfileVisualizer: React.FC<ElevationProfileVisualizerProps> = ({ currentCoordinates }) => {
  const [txHeight, setTxHeight] = useState<number>(10); // meters
  const [rxHeight, setRxHeight] = useState<number>(10); // meters
  const [freqGHz, setFreqGHz] = useState<number>(0.915); // 915 MHz default
  const [bearingOffset, setBearingOffset] = useState<'N' | 'E' | 'S' | 'W'>('E');
  const [distanceKmChoice, setDistanceKmChoice] = useState<number>(12); // km

  // Compute target RX coordinates based on choice
  const rxCoords = useMemo((): [number, number] => {
    const [txLon, txLat] = currentCoordinates;
    const kmToDegLat = 1 / 111.0;
    const kmToDegLon = 1 / (111.0 * Math.cos((txLat * Math.PI) / 180));

    if (bearingOffset === 'N') return [txLon, txLat + distanceKmChoice * kmToDegLat];
    if (bearingOffset === 'S') return [txLon, txLat - distanceKmChoice * kmToDegLat];
    if (bearingOffset === 'W') return [txLon - distanceKmChoice * kmToDegLon, txLat];
    return [txLon + distanceKmChoice * kmToDegLon, txLat]; // 'E'
  }, [currentCoordinates, bearingOffset, distanceKmChoice]);

  const analysis: ElevationProfileAnalysis = useMemo(() => {
    return ElevationProfileEngine.calculateProfile(
      currentCoordinates[0],
      currentCoordinates[1],
      txHeight,
      rxCoords[0],
      rxCoords[1],
      rxHeight,
      freqGHz,
      40
    );
  }, [currentCoordinates, rxCoords, txHeight, rxHeight, freqGHz]);

  // Compute SVG viewBox and coordinate scaling
  const minAlt = Math.min(...analysis.points.map(p => p.effectiveGroundMeters), analysis.txAltitudeMeters, analysis.rxAltitudeMeters) - 20;
  const maxAlt = Math.max(...analysis.points.map(p => p.losRayAltitudeMeters + p.fresnelRadiusMeters), analysis.txAltitudeMeters, analysis.rxAltitudeMeters) + 30;
  const altRange = Math.max(50, maxAlt - minAlt);

  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 20;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  const getSvgX = (fraction: number) => paddingX + fraction * plotWidth;
  const getSvgY = (altMeters: number) => paddingY + plotHeight - ((altMeters - minAlt) / altRange) * plotHeight;

  // Ground polygon path
  const groundPathD = useMemo(() => {
    if (analysis.points.length === 0) return '';
    let d = `M ${getSvgX(0)} ${getSvgY(minAlt)}`;
    analysis.points.forEach(p => {
      d += ` L ${getSvgX(p.fraction)} ${getSvgY(p.effectiveGroundMeters)}`;
    });
    d += ` L ${getSvgX(1)} ${getSvgY(minAlt)} Z`;
    return d;
  }, [analysis, minAlt, altRange]);

  // Fresnel upper and lower paths
  const fresnelPathD = useMemo(() => {
    if (analysis.points.length === 0) return '';
    let upper = `M ${getSvgX(0)} ${getSvgY(analysis.txAltitudeMeters)}`;
    let lower = ``;
    analysis.points.forEach(p => {
      upper += ` L ${getSvgX(p.fraction)} ${getSvgY(p.losRayAltitudeMeters + p.fresnelRadiusMeters)}`;
      lower = ` L ${getSvgX(p.fraction)} ${getSvgY(p.losRayAltitudeMeters - p.fresnelRadiusMeters)}` + lower;
    });
    return upper + lower + ' Z';
  }, [analysis, minAlt, altRange]);

  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-3 font-mono text-xs">
      {/* Top Header & Verdict Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-white font-bold tracking-wide flex items-center gap-2">
              <span>RF LINE-OF-SIGHT & FRESNEL ZONE ANALYSIS</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                4/3 REFRAC EARTH BULGE
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Carrier: {(freqGHz * 1000).toFixed(0)} MHz • Path Distance: {analysis.distanceKm.toFixed(1)} km ({analysis.distanceMiles.toFixed(1)} mi)
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 ${
          analysis.rfFresnelClear
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : 'bg-red-950/80 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
        }`}>
          {analysis.rfFresnelClear ? <CheckCircle size={15} /> : <ShieldAlert size={15} />}
          <span>{analysis.rfFresnelClear ? 'FRESNEL 60% CLEAR' : 'TERRAIN OBSTRUCTED'}</span>
        </div>
      </div>

      {/* SVG Cross-Section Elevation Profile */}
      <div className="w-full bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-hidden relative">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto block select-none">
          {/* Background grid lines */}
          <line x1={paddingX} y1={paddingY} x2={paddingX + plotWidth} y2={paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" />
          <line x1={paddingX} y1={paddingY + plotHeight / 2} x2={paddingX + plotWidth} y2={paddingY + plotHeight / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" />
          <line x1={paddingX} y1={paddingY + plotHeight} x2={paddingX + plotWidth} y2={paddingY + plotHeight} stroke="rgba(255,255,255,0.15)" />

          {/* 1st Fresnel Zone Envelope (Fill & Stroke) */}
          <path d={fresnelPathD} fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.4)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Ground Terrain Fill with Hypsometric Gradient */}
          <path d={groundPathD} fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="2" />

          {/* Direct Optical Ray */}
          <line
            x1={getSvgX(0)}
            y1={getSvgY(analysis.txAltitudeMeters)}
            x2={getSvgX(1)}
            y2={getSvgY(analysis.rxAltitudeMeters)}
            stroke={analysis.opticalLosClear ? '#38bdf8' : '#ef4444'}
            strokeWidth="2"
          />

          {/* TX Tower Marker */}
          <line x1={getSvgX(0)} y1={getSvgY(minAlt)} x2={getSvgX(0)} y2={getSvgY(analysis.txAltitudeMeters)} stroke="#38bdf8" strokeWidth="3" />
          <circle cx={getSvgX(0)} cy={getSvgY(analysis.txAltitudeMeters)} r="4" fill="#38bdf8" />
          <text x={getSvgX(0) - 8} y={getSvgY(analysis.txAltitudeMeters) - 8} fill="#38bdf8" fontSize="10" fontWeight="bold">TX ({txHeight}m)</text>

          {/* RX Tower Marker */}
          <line x1={getSvgX(1)} y1={getSvgY(minAlt)} x2={getSvgX(1)} y2={getSvgY(analysis.rxAltitudeMeters)} stroke="#a855f7" strokeWidth="3" />
          <circle cx={getSvgX(1)} cy={getSvgY(analysis.rxAltitudeMeters)} r="4" fill="#a855f7" />
          <text x={getSvgX(1) - 35} y={getSvgY(analysis.rxAltitudeMeters) - 8} fill="#a855f7" fontSize="10" fontWeight="bold">RX ({rxHeight}m)</text>

          {/* Clearance readout */}
          <text x={svgWidth / 2} y={svgHeight - 6} fill="#94a3b8" fontSize="10" textAnchor="middle">
            Min Clearance: {analysis.minClearanceMeters}m (Worst: {(analysis.worstObstructionFraction * 100).toFixed(0)}% along chord)
          </text>
        </svg>
      </div>

      {/* Zero Slider Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
        {/* Frequency Chips */}
        <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">RF Carrier Band</div>
          <div className="grid grid-cols-3 gap-1">
            {[
              { label: '915M', val: 0.915 },
              { label: '2.4G', val: 2.4 },
              { label: '5.8G', val: 5.8 }
            ].map(b => (
              <button
                key={b.label}
                onClick={() => setFreqGHz(b.val)}
                className={`py-1 rounded text-center text-[10px] font-bold border transition-colors ${
                  freqGHz === b.val
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Path Distance Stepper */}
        <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Target Distance</div>
          <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/10">
            <button
              onClick={() => setDistanceKmChoice(Math.max(2, distanceKmChoice - 2))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Minus size={12} />
            </button>
            <span className="font-bold text-white text-xs">{distanceKmChoice} km</span>
            <button
              onClick={() => setDistanceKmChoice(Math.min(50, distanceKmChoice + 2))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* TX Antenna Height Stepper */}
        <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">TX Mast Height</div>
          <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/10">
            <button
              onClick={() => setTxHeight(Math.max(2, txHeight - 5))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Minus size={12} />
            </button>
            <span className="font-bold text-cyan-300 text-xs">{txHeight} m</span>
            <button
              onClick={() => setTxHeight(Math.min(60, txHeight + 5))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* RX Antenna Height Stepper */}
        <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">RX Mast Height</div>
          <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/10">
            <button
              onClick={() => setRxHeight(Math.max(2, rxHeight - 5))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Minus size={12} />
            </button>
            <span className="font-bold text-purple-300 text-xs">{rxHeight} m</span>
            <button
              onClick={() => setRxHeight(Math.min(60, rxHeight + 5))}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
