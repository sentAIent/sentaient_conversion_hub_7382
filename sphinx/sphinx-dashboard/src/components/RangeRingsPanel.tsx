"use client";
import React, { useState, useEffect } from 'react';
import { Target, X, Check, RotateCcw } from 'lucide-react';

interface RangeRingsPanelProps {
  onClose: () => void;
  centerCoordinates: { lat: number; lon: number };
  onRingsUpdate: (ringsGeoJSON: any | null) => void;
}

// Generate mathematically true geodesic circle on a sphere
function createGeodesicCircle(centerLat: number, centerLon: number, radiusKm: number, steps: number = 64) {
  const coords: [number, number][] = [];
  const R = 6371.0088; // Earth mean radius in km
  const dByR = radiusKm / R;
  const latRad = (centerLat * Math.PI) / 180;
  const lonRad = (centerLon * Math.PI) / 180;

  for (let i = 0; i <= steps; i++) {
    const bearing = (i * 2 * Math.PI) / steps;
    const pLat = Math.asin(
      Math.sin(latRad) * Math.cos(dByR) +
      Math.cos(latRad) * Math.sin(dByR) * Math.cos(bearing)
    );
    const pLon = lonRad + Math.atan2(
      Math.sin(bearing) * Math.sin(dByR) * Math.cos(latRad),
      Math.cos(dByR) - Math.sin(latRad) * Math.sin(pLat)
    );
    coords.push([(pLon * 180) / Math.PI, (pLat * 180) / Math.PI]);
  }
  return coords;
}

export const RangeRingsPanel: React.FC<RangeRingsPanelProps> = ({ onClose, centerCoordinates, onRingsUpdate }) => {
  const [rings, setRings] = useState<number[]>([5, 15, 30, 60]); // in NM
  const [unit, setUnit] = useState<'nm' | 'km' | 'mi'>('nm');
  const [customInput, setCustomInput] = useState('');
  const [active, setActive] = useState(true);

  const getKm = (val: number, u: 'nm' | 'km' | 'mi') => {
    if (u === 'nm') return val * 1.852;
    if (u === 'mi') return val * 1.60934;
    return val;
  };

  useEffect(() => {
    if (!active || rings.length === 0) {
      onRingsUpdate(null);
      return;
    }

    const features = rings.map((r, idx) => {
      const radiusKm = getKm(r, unit);
      const ringCoords = createGeodesicCircle(centerCoordinates.lat, centerCoordinates.lon, radiusKm);
      return {
        type: 'Feature',
        properties: {
          id: `ring-${idx}`,
          radius: r,
          unit,
          radiusKm,
          label: `${r} ${unit.toUpperCase()}`
        },
        geometry: {
          type: 'Polygon',
          coordinates: [ringCoords]
        }
      };
    });

    onRingsUpdate({
      type: 'FeatureCollection',
      features
    });
  }, [rings, unit, active, centerCoordinates]);

  const toggleRing = (val: number) => {
    if (rings.includes(val)) {
      setRings(rings.filter(r => r !== val));
    } else {
      setRings([...rings, val].sort((a, b) => a - b));
    }
  };

  const addCustomRing = () => {
    const num = parseFloat(customInput);
    if (!isNaN(num) && num > 0 && !rings.includes(num)) {
      setRings([...rings, num].sort((a, b) => a - b));
      setCustomInput('');
    }
  };

  return (
    <div className="fixed top-16 left-6 z-50 w-80 bg-neutral-950/95 border border-emerald-500/80 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-md flex flex-col font-mono text-white overflow-hidden text-xs">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/90 to-teal-950/90 px-4 py-3 border-b border-emerald-500/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider">
          <Target size={16} />
          <span>GEODESIC RANGE RINGS</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Center Coordinate Info */}
        <div className="bg-black/60 border border-white/10 rounded-lg p-2.5 space-y-1">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Origin Position:</div>
          <div className="text-emerald-400 font-bold text-xs">
            {centerCoordinates.lat.toFixed(4)}°N, {centerCoordinates.lon.toFixed(4)}°W
          </div>
          <div className="text-[10px] text-gray-500">True spherical curvature (distortion-free)</div>
        </div>

        {/* Units Selector */}
        <div>
          <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1.5">Distance Unit:</label>
          <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg">
            {(['nm', 'km', 'mi'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`py-1 rounded text-center font-bold uppercase transition-all ${
                  unit === u
                    ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {u === 'nm' ? 'Nautical' : u === 'km' ? 'Kilometers' : 'Miles'}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Rings */}
        <div>
          <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1.5">Standard Defenses:</label>
          <div className="grid grid-cols-2 gap-2">
            {[5, 15, 30, 60, 100, 150].map((preset) => {
              const isSelected = rings.includes(preset);
              return (
                <button
                  key={preset}
                  onClick={() => toggleRing(preset)}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="font-bold">{preset} {unit.toUpperCase()}</span>
                  {isSelected && <Check size={14} className="text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Distance */}
        <div>
          <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1.5">Add Custom Range:</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={`e.g. 25 ${unit}`}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomRing()}
              className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={addCustomRing}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Active Rings List */}
        {rings.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {rings.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 px-2 py-0.5 rounded text-[11px]"
              >
                {r} {unit.toUpperCase()}
                <button
                  onClick={() => toggleRing(r)}
                  className="hover:text-white ml-0.5 text-emerald-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Clear Button */}
        <button
          onClick={() => setRings([])}
          className="w-full py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-[11px]"
        >
          <RotateCcw size={12} /> Clear All Rings
        </button>
      </div>
    </div>
  );
};
