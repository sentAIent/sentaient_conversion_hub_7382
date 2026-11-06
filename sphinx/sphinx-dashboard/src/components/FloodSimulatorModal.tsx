// FloodSimulatorModal.tsx
// Interactive Tactical Flood Maps & Dam Breach Inundation Simulator
// 100% Zero-Slider Compliant: All inputs use tactile buttons, scenario chips, and steppers.

import React, { useState, useMemo } from 'react';
import { X, Waves, AlertTriangle, ShieldAlert, CheckSquare, Square, Navigation, Droplets, Activity, Layers } from 'lucide-react';
import { FloodHydrologyEngine, DamFacility, MultiDamSimulationResult } from '../lib/intelligence/floodHydrologyEngine';

interface FloodSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDamIds: string[];
  onToggleDamSelection: (damId: string) => void;
  onSelectAllDams: (damIds: string[]) => void;
  onClearAllDams: () => void;
  failureSeverity: 'catastrophic' | 'overtopping' | 'controlled';
  onSetFailureSeverity: (severity: 'catastrophic' | 'overtopping' | 'controlled') => void;
  onFlyToCoordinates: (coords: [number, number], zoom?: number) => void;
  isFemaFloodActive: boolean;
  onToggleFemaFlood: () => void;
  isDamLayerActive: boolean;
  onToggleDamLayer: () => void;
  isInundationLayerActive: boolean;
  onToggleInundationLayer: () => void;
}

export const FloodSimulatorModal: React.FC<FloodSimulatorModalProps> = ({
  isOpen,
  onClose,
  selectedDamIds,
  onToggleDamSelection,
  onSelectAllDams,
  onClearAllDams,
  failureSeverity,
  onSetFailureSeverity,
  onFlyToCoordinates,
  isFemaFloodActive,
  onToggleFemaFlood,
  isDamLayerActive,
  onToggleDamLayer,
  isInundationLayerActive,
  onToggleInundationLayer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBasinFilter, setSelectedBasinFilter] = useState<'all' | string>('all');
  const [activeTab, setActiveTab] = useState<'dams_selection' | 'impact_summary' | 'fema_zones'>('dams_selection');

  // Filtered dams list
  const filteredDams = useMemo(() => {
    return FloodHydrologyEngine.DAMS.filter(dam => {
      const matchesSearch =
        dam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dam.riverSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dam.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dam.nearestCity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBasin = selectedBasinFilter === 'all' || dam.drainageBasin === selectedBasinFilter;
      return matchesSearch && matchesBasin;
    });
  }, [searchQuery, selectedBasinFilter]);

  // Unique list of drainage basins
  const drainageBasins = useMemo(() => {
    const basins = new Set<string>();
    FloodHydrologyEngine.DAMS.forEach(d => basins.add(d.drainageBasin));
    return Array.from(basins);
  }, []);

  // Hydrological metrics calculation for all currently selected dams
  const metrics: MultiDamSimulationResult = useMemo(() => {
    return FloodHydrologyEngine.calculateMultiDamMetrics(selectedDamIds, failureSeverity);
  }, [selectedDamIds, failureSeverity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden font-sans text-gray-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Flood Maps & Dam Inundation Simulator
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  HYDROLOGICAL HAZARD ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulate multi-dam structural breaches, downstream cascade surges, and FEMA 100/500-year floodplains
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="close-flood-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Impact Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 px-5 py-3 border-b border-cyan-500/20 bg-slate-900/40">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Active Breached Dams</div>
            <div className="text-lg font-mono font-black text-cyan-300">
              {selectedDamIds.length} <span className="text-xs font-normal text-slate-400">/ {FloodHydrologyEngine.DAMS.length} total</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Water Released</div>
            <div className="text-lg font-mono font-black text-sky-300">
              {metrics.totalWaterReleasedAcreFeet.toLocaleString()} <span className="text-xs font-normal text-slate-400">ac-ft</span>
            </div>
            <div className="text-[10px] text-slate-500">
              {(metrics.totalWaterReleasedGallons / 1e9).toFixed(1)} Billion Gallons
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Combined Peak Surge</div>
            <div className="text-lg font-mono font-black text-amber-300">
              {metrics.combinedPeakDischargeCfs.toLocaleString()} <span className="text-xs font-normal text-slate-400">CFS</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-red-500/30">
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Population At Risk</div>
            <div className="text-lg font-mono font-black text-red-300">
              {metrics.affectedPopulationTotal.toLocaleString()} <span className="text-xs font-normal text-slate-400">civilians</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950">
          <button
            type="button"
            data-testid="tab-dams-selection"
            onClick={() => setActiveTab('dams_selection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'dams_selection' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-300 hover:text-white'}`}
          >
            🏛️ Dam Selection & Cascade ({selectedDamIds.length})
          </button>
          <button
            type="button"
            data-testid="tab-impact-summary"
            onClick={() => setActiveTab('impact_summary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'impact_summary' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-300 hover:text-white'}`}
          >
            📊 Inundation Impact & Downstream Cities
          </button>
          <button
            type="button"
            data-testid="tab-fema-zones"
            onClick={() => setActiveTab('fema_zones')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'fema_zones' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-300 hover:text-white'}`}
          >
            🗺️ FEMA Floodplain & Layer Controls
          </button>
        </div>

        {/* Tab 1: Dam Selection & Cascade */}
        {activeTab === 'dams_selection' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Failure Severity Scenario Selector (Zero Sliders: Button Chips) */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>BREACH FAILURE SEVERITY SCENARIO</span>
                <span className="text-[10px] text-cyan-400 font-mono">TACTICAL PRESET CHIPS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  data-testid="severity-catastrophic"
                  onClick={() => onSetFailureSeverity('catastrophic')}
                  className={`p-2.5 rounded-lg text-left border transition-all ${failureSeverity === 'catastrophic' ? 'bg-red-950/80 border-red-500 text-red-200 shadow-md shadow-red-950/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>🚨</span> Catastrophic Full Breach
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">100% Reservoir Storage Released • Maximum Peak Wave</div>
                </button>
                <button
                  type="button"
                  data-testid="severity-overtopping"
                  onClick={() => onSetFailureSeverity('overtopping')}
                  className={`p-2.5 rounded-lg text-left border transition-all ${failureSeverity === 'overtopping' ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-950/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>⚠️</span> Spillway Failure / Overtopping
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">50% Storage Wave • Severe Downstream Flooding</div>
                </button>
                <button
                  type="button"
                  data-testid="severity-controlled"
                  onClick={() => onSetFailureSeverity('controlled')}
                  className={`p-2.5 rounded-lg text-left border transition-all ${failureSeverity === 'controlled' ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>🌊</span> Emergency Spillway Max
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">25% Peak Spillway Discharge • Moderate Inundation</div>
                </button>
              </div>
            </div>

            {/* Quick Basin Cascade Presets (Zero Sliders: Button Chips) */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-300">REGIONAL CASCADE PRESETS & ACTIONS</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  data-testid="preset-sacramento-cascade"
                  onClick={() => {
                    const sacIds = FloodHydrologyEngine.DAMS.filter(d => d.drainageBasin === 'Sacramento River Basin').map(d => d.id);
                    onSelectAllDams(Array.from(new Set([...selectedDamIds, ...sacIds])));
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/60 transition-colors"
                >
                  🌊 Northern CA Cascade (Shasta + Oroville + Folsom)
                </button>
                <button
                  type="button"
                  data-testid="preset-colorado-cascade"
                  onClick={() => {
                    const colIds = FloodHydrologyEngine.DAMS.filter(d => d.drainageBasin.includes('Colorado')).map(d => d.id);
                    onSelectAllDams(Array.from(new Set([...selectedDamIds, ...colIds])));
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-sky-950/60 border border-sky-700/60 text-sky-300 hover:bg-sky-900/60 transition-colors"
                >
                  🏞️ Colorado River Cascade (Glen Canyon + Hoover)
                </button>
                <button
                  type="button"
                  data-testid="preset-select-all-high-hazard"
                  onClick={() => {
                    const highIds = FloodHydrologyEngine.DAMS.filter(d => d.hazardClassification === 'High Hazard Potential').map(d => d.id);
                    onSelectAllDams(highIds);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-950/60 border border-amber-700/60 text-amber-300 hover:bg-amber-900/60 transition-colors"
                >
                  ⚠️ Select All High Hazard Dams
                </button>
                <button
                  type="button"
                  data-testid="btn-clear-all-dams"
                  onClick={onClearAllDams}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  ❌ Clear Selection
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="text"
                data-testid="input-dam-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dam by name, river, or state (e.g., Oroville, Colorado, California)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <select
                data-testid="select-basin-filter"
                value={selectedBasinFilter}
                onChange={(e) => setSelectedBasinFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Drainage Basins ({FloodHydrologyEngine.DAMS.length} dams)</option>
                {drainageBasins.map(basin => (
                  <option key={basin} value={basin}>{basin}</option>
                ))}
              </select>
            </div>

            {/* Dams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {filteredDams.map(dam => {
                const isSelected = selectedDamIds.includes(dam.id);
                return (
                  <div
                    key={dam.id}
                    className={`p-3.5 rounded-xl border transition-all ${isSelected ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50' : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            data-testid={`checkbox-dam-${dam.id}`}
                            onClick={() => onToggleDamSelection(dam.id)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {isSelected ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                          </button>
                          <span className="font-bold text-sm text-white">{dam.name}</span>
                        </div>
                        <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                          {dam.riverSystem} • {dam.drainageBasin}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${dam.hazardClassification === 'High Hazard Potential' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                        {dam.hazardClassification.replace(' Potential', '')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-300">
                      <div>
                        <span className="text-slate-500">Height:</span> {dam.structuralHeightFt} ft
                      </div>
                      <div>
                        <span className="text-slate-500">Storage:</span> {(dam.reservoirCapacityAcreFeet / 1e6).toFixed(2)}M ac-ft
                      </div>
                      <div>
                        <span className="text-slate-500">Type:</span> {dam.damType}
                      </div>
                      <div>
                        <span className="text-slate-500">Peak Flow:</span> {(dam.breachPeakDischargeCfs / 1e6).toFixed(1)}M CFS
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        data-testid={`btn-flyto-dam-${dam.id}`}
                        onClick={() => onFlyToCoordinates(dam.coordinates, 11)}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Locate on Map</span>
                      </button>

                      <button
                        type="button"
                        data-testid={`btn-toggle-dam-${dam.id}`}
                        onClick={() => onToggleDamSelection(dam.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isSelected ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-900/40' : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black'}`}
                      >
                        {isSelected ? '🚨 Breach Simulated' : 'Simulate Inundation'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 2: Inundation Impact & Downstream Cities */}
        {activeTab === 'impact_summary' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {selectedDamIds.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="font-bold text-sm text-white">No Dams Currently Selected for Inundation</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Select one or more dams from the Dam Selection tab to simulate localized downstream flood waves, arrival hours, and population impact.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Downstream Settlement Impact Timeline
                </div>

                {FloodHydrologyEngine.DAMS.filter(d => selectedDamIds.includes(d.id)).map(dam => (
                  <div key={dam.id} className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌊</span>
                        <div>
                          <h3 className="font-bold text-sm text-white">{dam.name} Surge Corridor</h3>
                          <p className="text-xs text-slate-400">{dam.riverSystem} • {dam.drainageBasin}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        Peak: {(dam.breachPeakDischargeCfs / 1e6).toFixed(2)}M CFS
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                            <th className="pb-1.5 font-bold">Downstream Settlement</th>
                            <th className="pb-1.5 font-bold">Distance</th>
                            <th className="pb-1.5 font-bold">Wave Arrival</th>
                            <th className="pb-1.5 font-bold">Peak Depth</th>
                            <th className="pb-1.5 font-bold">Population At Risk</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {dam.downstreamSettlements.map((s, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-2 text-white font-bold">{s.name}</td>
                              <td className="py-2 text-slate-400">{s.distanceMiles} miles</td>
                              <td className="py-2 text-cyan-400 font-bold">+{s.waveArrivalTimeHours} hours</td>
                              <td className="py-2 text-amber-400 font-bold">{s.estimatedPeakDepthFt} ft</td>
                              <td className="py-2 text-red-400 font-bold">{s.populationAtRisk.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: FEMA Floodplain & Layer Controls */}
        {activeTab === 'fema_zones' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Hydrological Layer Toggles
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Dam Inundation Surge Corridors</div>
                    <div className="text-xs text-slate-400">Dynamic multi-dam breach inundation flood polygons on map</div>
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="toggle-modal-inundation-layer"
                  onClick={onToggleInundationLayer}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isInundationLayerActive ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}
                >
                  {isInundationLayerActive ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">FEMA 100-Year & 500-Year Flood Zones</div>
                    <div className="text-xs text-slate-400">Baseline 1% and 0.2% annual chance floodplains & coastal storm surge</div>
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="toggle-modal-fema-layer"
                  onClick={onToggleFemaFlood}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isFemaFloodActive ? 'bg-sky-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}
                >
                  {isFemaFloodActive ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Dams & Reservoirs Markers</div>
                    <div className="text-xs text-slate-400">Geospatial locations, crest elevations, and hazard tiers of major dams</div>
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="toggle-modal-dam-layer"
                  onClick={onToggleDamLayer}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isDamLayerActive ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}
                >
                  {isDamLayerActive ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 mt-4">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Hydrology & National Dam Safety (NDS) Standards</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dam hazard potential classifications follow the Federal Guidelines for Dam Safety (FEMA P-93).
                <strong> High Hazard Potential</strong> indicates failure will cause loss of human life. Inundation boundaries model two-dimensional unsteady hydrodynamic shallow water wave propagation down natural river channels.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Multi-Dam Compounding Engine Active</span>
          </div>
          <button
            type="button"
            data-testid="btn-close-modal-footer"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors"
          >
            Apply & View on Map
          </button>
        </div>

      </div>
    </div>
  );
};
