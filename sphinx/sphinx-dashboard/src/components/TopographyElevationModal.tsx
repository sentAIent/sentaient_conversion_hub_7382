// TopographyElevationModal.tsx
// Interactive Tactical Topography & Elevation Controller
// 100% Zero-Slider Rule Compliant: All adjustments use tactile chips, steppers, and buttons.

import React, { useState, useMemo } from 'react';
import { X, Mountain, Compass, Layers, Navigation, Eye, EyeOff, Search } from 'lucide-react';
import { TopographyElevationEngine, TopoTileProvider, TopographicPeak } from '../lib/intelligence/topographyElevationEngine';

interface TopographyElevationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTopographyActive: boolean;
  onToggleTopography: () => void;
  topoProvider: TopoTileProvider;
  onSelectTopoProvider: (provider: TopoTileProvider) => void;
  topoOpacity: number;
  onSetTopoOpacity: (opacity: number) => void;
  showPeaks: boolean;
  onTogglePeaks: () => void;
  currentCoordinates: [number, number]; // [lon, lat]
  onFlyToCoordinates: (coords: [number, number], zoom?: number) => void;
}

export const TopographyElevationModal: React.FC<TopographyElevationModalProps> = ({
  isOpen,
  onClose,
  isTopographyActive,
  onToggleTopography,
  topoProvider,
  onSelectTopoProvider,
  topoOpacity,
  onSetTopoOpacity,
  showPeaks,
  onTogglePeaks,
  currentCoordinates,
  onFlyToCoordinates
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | string>('all');

  // Estimate elevation for the current viewport center
  const centerElevation = useMemo(() => {
    return TopographyElevationEngine.estimateElevation(currentCoordinates[0], currentCoordinates[1]);
  }, [currentCoordinates]);

  // Filter prominent peaks
  const filteredPeaks = useMemo(() => {
    return TopographyElevationEngine.PROMINENT_PEAKS.filter(peak => {
      const matchesSearch =
        peak.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peak.mountainRange.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peak.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peak.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegionFilter === 'all' || peak.country === selectedRegionFilter || (selectedRegionFilter === 'USA' && peak.country === 'USA');
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegionFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-950/60 overflow-hidden font-sans text-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-500/20 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Mountain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Elevation Heatmap & Topography
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  HYPSOMETRIC RELIEF ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Topographic contour lines, shaded relief hillshade, and alpine summit elevation spot heights
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="close-topo-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Elevation Live HUD Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-5 py-3 border-b border-emerald-500/20 bg-slate-900/40">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Map Center Elevation</div>
            <div className="text-lg font-mono font-black text-emerald-300">
              {centerElevation.elevationFt.toLocaleString()} <span className="text-xs font-normal text-slate-400">ft</span>
            </div>
            <div className="text-[10px] text-slate-500">
              {centerElevation.elevationM.toLocaleString()} meters
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Relief Classification</div>
            <div className="text-sm font-bold text-cyan-300 mt-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: centerElevation.colorCode }} />
              {centerElevation.reliefType}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Nearest Summit / Peak</div>
            <div className="text-xs font-bold text-amber-200 mt-1 truncate" title={centerElevation.nearestPeak?.name}>
              {centerElevation.nearestPeak?.name}
            </div>
            <div className="text-[10px] text-slate-500">
              {centerElevation.nearestPeak?.distanceMiles} mi away • {centerElevation.nearestPeak?.elevationFt.toLocaleString()} ft
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-700">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Master Overlay Status</div>
            <button
              type="button"
              data-testid="modal-toggle-topo-layer"
              onClick={onToggleTopography}
              className={`mt-1 w-full py-1 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                isTopographyActive
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-900 border-emerald-800/80 text-emerald-400 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              {isTopographyActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {isTopographyActive ? 'ACTIVE ON MAP' : 'DISABLED — CLICK TO ACTIVATE'}
            </button>
          </div>
        </div>

        {/* Controls & Configuration (100% Zero-Slider Rule) */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Provider Selection Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>TOPOGRAPHIC & HILLSHADE TILE PROVIDER</span>
              <span className="text-[10px] text-emerald-400 font-mono">TACTICAL MAP SERVERS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {(['elevation_heatmap', 'arcgis_topo', 'usgs_relief', 'opentopo'] as TopoTileProvider[]).map((prov) => {
                const info = TopographyElevationEngine.TOPO_TILE_PROVIDERS[prov];
                const isSelected = topoProvider === prov;
                return (
                  <button
                    key={prov}
                    type="button"
                    data-testid={`btn-provider-${prov}`}
                    onClick={() => {
                      onSelectTopoProvider(prov);
                      if (!isTopographyActive) onToggleTopography();
                    }}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{info.name.split(' (')[0]}</span>
                      {isSelected && <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">SELECTED</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{info.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opacity Chips (Zero-Slider Compliant) */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white">Topographic Overlay Opacity</div>
              <div className="text-[11px] text-slate-400">Control blend level over satellite and street map layers</div>
            </div>
            <div className="flex items-center gap-1.5">
              {[0.25, 0.50, 0.75, 1.0].map((val) => (
                <button
                  key={val}
                  type="button"
                  data-testid={`btn-opacity-${val * 100}`}
                  onClick={() => onSetTopoOpacity(val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                    topoOpacity === val
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {val * 100}%
                </button>
              ))}
            </div>
          </div>

          {/* Feature Toggles (Peaks & Summits) */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white">Alpine Summits & Spot Height Markers</div>
              <div className="text-[11px] text-slate-400">Display prominent mountain peaks with elevations, prominence, and hazard cards</div>
            </div>
            <button
              type="button"
              data-testid="toggle-peaks-layer-btn"
              onClick={onTogglePeaks}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                showPeaks
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>🏔️</span>
              {showPeaks ? 'PEAKS VISIBLE' : 'PEAKS HIDDEN'}
            </button>
          </div>

          {/* Elevation Hypsometric Ramp Guide (Up to Mt Everest 29,032 ft) */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span>🏔️</span>
                <span>GLOBAL HYPSOMETRIC ELEVATION RAMP</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">SCALED TO MT. EVEREST (29,032 FT)</span>
            </div>
            <div className="h-2.5 rounded-full w-full border border-white/10" style={{
              background: 'linear-gradient(to right, #06b6d4 0%, #10b981 12%, #84cc16 22%, #eab308 34%, #f97316 46%, #ef4444 60%, #ec4899 74%, #a855f7 86%, #ffffff 100%)'
            }} />
            <div className="flex justify-between text-[9px] font-mono text-slate-400 px-0.5">
              <span>&lt;0&apos;</span>
              <span>2k&apos;</span>
              <span>4.5k&apos;</span>
              <span>8k&apos;</span>
              <span>13k&apos;</span>
              <span>19k&apos;</span>
              <span>24k&apos;</span>
              <span className="text-white font-bold">29k&apos; (Everest)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] font-mono">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#06b6d4' }} /><span className="text-slate-300">Depression (&lt;0&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#10b981' }} /><span className="text-slate-300">Lowlands (0–500&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#84cc16' }} /><span className="text-slate-300">Plains (500–2k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#eab308' }} /><span className="text-slate-300">Foothills (2k–4.5k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#f97316' }} /><span className="text-slate-300">Plateau (4.5k–8k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#ef4444' }} /><span className="text-slate-300">Montane (8k–13k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#ec4899' }} /><span className="text-slate-300">Alpine (13k–19k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#a855f7' }} /><span className="text-slate-300">Glacial (19k–24k&apos;)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#cbd5e1' }} /><span className="text-slate-300">Himalayan (24k–26k&apos;)</span></div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-3"><span className="w-2.5 h-2.5 rounded-full shrink-0 border border-slate-400" style={{ backgroundColor: '#ffffff' }} /><span className="text-white font-bold">Death Zone / Everest Peak (26k–29,032&apos;)</span></div>
            </div>
          </div>

          {/* Prominent Mountain Summits Catalog & Fly-To */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span>🏔️</span>
                <span>PROMINENT SUMMITS & ELEVATION EXTREMES ({filteredPeaks.length})</span>
              </div>
              <div className="flex gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSelectedRegionFilter('all')}
                  className={`px-2 py-0.5 rounded ${selectedRegionFilter === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRegionFilter('USA')}
                  className={`px-2 py-0.5 rounded ${selectedRegionFilter === 'USA' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
                >
                  USA
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                data-testid="input-peak-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mountain peak, range, or region (e.g., Whitney, Rainier, Everest, Mitchell)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Peaks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredPeaks.map((peak) => (
                <div
                  key={peak.id}
                  className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/50 transition-colors flex items-start justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white truncate">{peak.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        peak.elevationFt < 0 ? 'bg-cyan-500/20 text-cyan-300' :
                        peak.elevationFt > 20000 ? 'bg-rose-500/20 text-rose-300' :
                        peak.elevationFt > 14000 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {peak.elevationFt.toLocaleString()} ft
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {peak.mountainRange} • {peak.region}, {peak.country}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Prominence: {peak.prominenceFt.toLocaleString()} ft • {peak.peakType}
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid={`btn-flyto-peak-${peak.id}`}
                    onClick={() => {
                      onFlyToCoordinates(peak.coordinates, 12);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 transition-colors shrink-0"
                    title={`Fly to ${peak.name}`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <div>
            Data sources: OpenTopoMap, USGS 3DEP, SRTM 30m, NASA Earthdata
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
