"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, MapPin, Search, Eye, Flame, AlertTriangle, ArrowRight, X, ChevronRight, Sparkles } from 'lucide-react';
import { CityCrimeData, NeighborhoodProfile, PRESET_METRO_NEIGHBORHOODS, getCityCrimeData } from '../lib/intelligence/crimeEngine';

interface CityCrimePanelProps {
  activeCityCrime: CityCrimeData | null;
  onSelectCity: (city: string, lat?: number, lon?: number) => void;
  onSelectNeighborhood: (neighborhood: NeighborhoodProfile) => void;
  onToggleCrimeLayer: () => void;
  isCrimeLayerActive: boolean;
  onToggleHeatmapLayer: () => void;
  isHeatmapLayerActive: boolean;
  onOpenAI: (query: string) => void;
  onClose: () => void;
}

const POPULAR_METROS = [
  { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Washington D.C.', lat: 38.9072, lon: -77.0369 },
  { name: 'Miami', lat: 25.7617, lon: -80.1918 },
  { name: 'Houston', lat: 29.7604, lon: -95.3698 },
  { name: 'Atlanta', lat: 33.7490, lon: -84.3880 },
  { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
  { name: 'Seattle', lat: 47.6062, lon: -122.3321 }
];

export const CityCrimePanel: React.FC<CityCrimePanelProps> = ({
  activeCityCrime,
  onSelectCity,
  onSelectNeighborhood,
  onToggleCrimeLayer,
  isCrimeLayerActive,
  onToggleHeatmapLayer,
  isHeatmapLayerActive,
  onOpenAI,
  onClose
}) => {
  const [cityInput, setCityInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ name: string; context: string; lat: number; lon: number }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }
    if (!cityInput.trim() || cityInput.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(cityInput)}&limit=5`);
        const data = await res.json();
        if (data?.features) {
          const parsed = data.features.map((f: any) => {
            const props = f.properties;
            const contextParts = [props.city, props.state, props.country, props.postcode].filter(Boolean);
            const primaryName = props.name || props.city || props.postcode || contextParts[0] || 'Unknown';
            return {
              name: primaryName,
              context: contextParts.join(', '),
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0]
            };
          });
          setSuggestions(parsed);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Crime search autocomplete error:", err);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cityInput]);

  const handleSelectSuggestion = (sugg: { name: string; context: string; lat: number; lon: number }) => {
    isSelectingRef.current = true;
    setCityInput(sugg.name);
    setShowSuggestions(false);
    onSelectCity(sugg.name, sugg.lat, sugg.lon);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
      return;
    }
    setIsSearching(true);
    await onSelectCity(cityInput.trim());
    setIsSearching(false);
  };

  const currentCityName = activeCityCrime?.city || 'Chicago';
  const neighborhoods = activeCityCrime?.neighborhoods || [];
  const incidents = activeCityCrime?.incidents || [];

  // Compute average city safety score
  const avgSafetyScore = neighborhoods.length > 0
    ? Math.round(neighborhoods.reduce((acc, n) => acc + n.safetyScore, 0) / neighborhoods.length)
    : 55;

  const violentIncidents = incidents.filter(i => i.category === 'violent').length;
  const propertyIncidents = incidents.filter(i => i.category === 'property').length;

  return (
    <div 
      data-testid="city-crime-panel"
      className="fixed inset-y-0 right-0 sm:right-6 sm:top-16 sm:bottom-6 z-40 w-full sm:w-[460px] sm:max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100vh-5rem)] bg-black/95 border-l sm:border border-red-900/60 sm:rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-2xl flex flex-col font-mono text-white text-xs overflow-hidden animate-in slide-in-from-right duration-200"
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-red-950/80 via-black to-slate-900 border-b border-red-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/80 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wider">CRIME & THREAT INTEL</h2>
              <span data-testid="crime-panel-city-pill" className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-950 text-red-300 border border-red-800">
                {currentCityName.toUpperCase()}
              </span>
            </div>
            <p className="text-[10px] text-gray-400">Neighborhood risk scoring & incident heatmaps</p>
          </div>
        </div>
        <button 
          type="button"
          data-testid="btn-close-crime-panel"
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* City Search & Quick Select */}
      <div className="p-3 bg-slate-950/80 border-b border-red-900/40 space-y-2 shrink-0">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1" ref={dropdownRef}>
            <input 
              type="text"
              placeholder="Search any city or zipcode..."
              value={cityInput}
              onChange={e => { isSelectingRef.current = false; setCityInput(e.target.value); }}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              className="w-full bg-slate-900 border border-red-900/60 rounded-lg pl-8 pr-3 py-1.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-400 text-xs"
            />
            <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
            {showSuggestions && suggestions.length > 0 && (
              <div 
                data-testid="crime-search-suggestions"
                className="absolute left-0 right-0 top-full mt-1 bg-black/95 border border-red-700/80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 overflow-hidden text-xs divide-y divide-red-950/60 max-h-56 overflow-y-auto"
              >
                {suggestions.map((s, idx) => (
                  <button
                    key={`${s.name}-${idx}`}
                    type="button"
                    data-testid="crime-search-suggestion-item"
                    onClick={() => handleSelectSuggestion(s)}
                    className="w-full px-3 py-2 text-left hover:bg-red-950/60 text-white flex items-center justify-between gap-2 transition-colors group"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <MapPin size={13} className="text-red-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="truncate">
                        <div className="font-bold text-red-200 truncate">{s.name}</div>
                        {s.context && <div className="text-[10px] text-gray-400 truncate">{s.context}</div>}
                      </div>
                    </div>
                    <span className="text-[9px] text-red-400 font-mono shrink-0">SELECT ➔</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-600 font-bold transition-all disabled:opacity-50"
          >
            {isSearching ? '...' : 'Search'}
          </button>
        </form>

        {/* Quick Metro Pills */}
        <div className="flex items-center gap-1.5 text-[10px] pt-1 overflow-x-auto scrollbar-none flex-nowrap py-0.5 max-w-full">
          <span className="text-gray-500 font-bold uppercase shrink-0">METROS:</span>
          {POPULAR_METROS.map(m => (
            <button
              key={m.name}
              type="button"
              data-testid={`metro-btn-${m.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onSelectCity(m.name, m.lat, m.lon)}
              className={`px-2 py-0.5 rounded-full border transition-all shrink-0 ${
                currentCityName.toLowerCase() === m.name.toLowerCase()
                  ? 'bg-red-900 border-red-400 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                  : 'bg-black/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls & Metrics Header */}
      <div className="p-3 bg-red-950/20 border-b border-red-900/40 grid grid-cols-3 gap-2 text-center shrink-0">
        <div className="bg-black/50 p-2 rounded-lg border border-red-900/50">
          <span className="text-[10px] text-gray-400 block">SAFETY SCORE</span>
          <span className={`text-base font-black ${
            avgSafetyScore < 40 ? 'text-red-400' : avgSafetyScore < 70 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {avgSafetyScore}/100
          </span>
        </div>
        <div className="bg-black/50 p-2 rounded-lg border border-red-900/50">
          <span className="text-[10px] text-gray-400 block">ACTIVE INCIDENTS</span>
          <span className="text-base font-black text-white">{incidents.length}</span>
        </div>
        <div className="bg-black/50 p-2 rounded-lg border border-red-900/50">
          <span className="text-[10px] text-gray-400 block">VIOLENT / PROPERTY</span>
          <span className="text-xs font-bold text-red-300">{violentIncidents}v / {propertyIncidents}p</span>
        </div>
      </div>

      {/* Map Layer Toggles inside Panel */}
      <div className="px-3 py-2 bg-slate-950/90 border-b border-red-900/30 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onToggleCrimeLayer}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${
            isCrimeLayerActive
              ? 'bg-red-950 border-red-400 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
              : 'bg-black/60 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          {isCrimeLayerActive ? <Eye size={13} /> : <Eye size={13} className="opacity-40" />}
          <span>Incident Markers (🚨)</span>
        </button>

        <button
          type="button"
          onClick={onToggleHeatmapLayer}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${
            isHeatmapLayerActive
              ? 'bg-pink-950 border-pink-400 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.4)]'
              : 'bg-black/60 border-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <Flame size={13} className={isHeatmapLayerActive ? "text-pink-400" : "opacity-40"} />
          <span>Thermal Heatmap [PRO]</span>
        </button>
      </div>

      {/* Neighborhood Risk Ranking List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center">
          <span>Neighborhood Risk Sectors ({neighborhoods.length})</span>
          <span>Click to Fly to Sector</span>
        </div>

        {neighborhoods.map((zone) => (
          <div
            key={zone.name}
            data-testid={`neighborhood-item-${zone.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => onSelectNeighborhood(zone)}
            className="p-3 bg-black/60 hover:bg-red-950/30 border border-gray-800 hover:border-red-600/70 rounded-xl transition-all cursor-pointer group space-y-1.5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <MapPin size={13} className="text-red-400 shrink-0" />
                  <span>{zone.name}</span>
                </h4>
                <p className="text-[10px] text-gray-400">Risk Profile: {zone.riskLevel}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                zone.safetyScore < 40
                  ? 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                  : zone.safetyScore < 70
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-500'
              }`}>
                {zone.safetyScore}/100
              </span>
            </div>

            <div className="text-[11px] text-gray-300 pt-1 border-t border-gray-800/80">
              <span className="text-gray-400 text-[10px]">Top Threats: </span>
              <span className="text-amber-300">{zone.topIncidents.join(', ')}</span>
            </div>

            <p className="text-[10px] text-gray-400 italic line-clamp-2">
              "{zone.tacticalNotes}"
            </p>

            <div className="flex justify-end pt-1">
              <span className="text-[10px] text-cyan-400 group-hover:underline flex items-center gap-0.5">
                Fly to Sector <ChevronRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action: Ask AI */}
      <div className="p-3 bg-black/90 border-t border-red-900/60 shrink-0">
        <button
          type="button"
          data-testid="btn-ask-ai-crime"
          onClick={() => onOpenAI(`Provide a comprehensive tactical crime risk assessment for ${currentCityName}, including violent crime hotspots, safe transit corridors, and neighborhood safety indices.`)}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
        >
          <Sparkles size={14} />
          <span>Ask SPHINX AI about {currentCityName} Crime ➔</span>
        </button>
      </div>
    </div>
  );
};
