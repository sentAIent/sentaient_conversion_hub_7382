import React, { useState, useEffect, useRef } from 'react';
import { searchCuratedLocations, CuratedLocation } from '../lib/geo/curatedLocations';

export interface GeocodingResult {
  lat: number;
  lon: number;
  name: string;
  context: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
  category?: 'ski_resort' | 'lake' | 'mountain' | 'city' | 'location';
  icon?: string;
  zoom?: number;
  metadata?: any;
}

interface GeocodingSearchProps {
  onLocationSelected: (location: GeocodingResult) => void;
  placeholder?: string;
}

interface Suggestion {
  id: string;
  name: string;
  context: string;
  lat: number;
  lon: number;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
  category: 'ski_resort' | 'lake' | 'mountain' | 'city' | 'location';
  icon: string;
  zoom?: number;
  metadata?: any;
}

export function GeocodingSearch({ onLocationSelected, placeholder = "Search locations..." }: GeocodingSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    // Click outside to close dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
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
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // 1. Instant 0ms local recognition for ski resorts, lakes, and peaks
    const localMatches: Suggestion[] = searchCuratedLocations(cleanQuery, 6).map((c: CuratedLocation) => ({
      id: c.id,
      name: c.name,
      context: c.subtitle,
      lat: c.lat,
      lon: c.lon,
      city: c.stateOrCountry,
      state: c.stateOrCountry,
      country: c.stateOrCountry,
      category: c.category,
      icon: c.icon,
      zoom: c.zoom,
      metadata: c.metadata
    }));

    setSuggestions(localMatches);
    setShowDropdown(localMatches.length > 0);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 2. Query Photon for broader geocoding with resilient fallback
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=6`);
        if (!res.ok) return;
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('json')) return;
        const data = await res.json();
        
        if (data && data.features) {
          const photonResults: Suggestion[] = data.features.map((f: any, index: number) => {
            const props = f.properties || {};
            const name = props.name || props.street || props.city || props.postcode || 'Unknown';
            const nameLower = name.toLowerCase();
            const osmKey = String(props.osm_key || '').toLowerCase();
            const osmVal = String(props.osm_value || '').toLowerCase();

            let category: 'ski_resort' | 'lake' | 'mountain' | 'city' | 'location' = 'location';
            let icon = '📍';
            let zoom = 14;

            if (osmKey === 'water' || osmVal === 'lake' || osmVal === 'reservoir' || nameLower.includes('lake') || nameLower.includes('reservoir') || nameLower.includes('sea')) {
              category = 'lake';
              icon = '🌊';
              zoom = 12;
            } else if (osmVal === 'winter_sports' || osmKey === 'aerialway' || nameLower.includes('ski') || nameLower.includes('resort')) {
              category = 'ski_resort';
              icon = '⛷️';
              zoom = 13.5;
            } else if (osmKey === 'natural' && osmVal === 'peak') {
              category = 'mountain';
              icon = '🏔️';
              zoom = 13;
            } else if (osmKey === 'place') {
              category = 'city';
              icon = '🏙️';
              zoom = 12;
            }

            const contextParts = [props.city, props.state, props.country, props.postcode].filter(Boolean);
            return {
              id: `photon-${index}-${props.osm_id || Math.random()}`,
              name,
              context: contextParts.join(', '),
              lon: f.geometry.coordinates[0],
              lat: f.geometry.coordinates[1],
              city: props.city || props.town || props.village,
              state: props.state,
              country: props.country,
              postcode: props.postcode,
              category,
              icon,
              zoom
            };
          });

          // Deduplicate: local curated matches have priority
          const seen = new Set(localMatches.map(m => m.name.toLowerCase()));
          const combined = [...localMatches];
          for (const pr of photonResults) {
            const cleanName = pr.name.toLowerCase();
            if (!seen.has(cleanName)) {
              seen.add(cleanName);
              combined.push(pr);
            }
          }
          setSuggestions(combined.slice(0, 8));
          setShowDropdown(combined.length > 0);
        }
      } catch (err) {
        console.warn("Geocoding query fallback:", err);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (sugg: Suggestion) => {
    console.log('[GeocodingSearch] handleSelect:', sugg.name, sugg.category);
    isSelectingRef.current = true;
    setQuery(sugg.name);
    setShowDropdown(false);
    onLocationSelected({
      lat: sugg.lat,
      lon: sugg.lon,
      name: sugg.name,
      context: sugg.context,
      city: sugg.city,
      state: sugg.state,
      country: sugg.country,
      postcode: sugg.postcode,
      category: sugg.category,
      icon: sugg.icon,
      zoom: sugg.zoom,
      metadata: sugg.metadata
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else if (query.trim()) {
      const instant = searchCuratedLocations(query, 1);
      if (instant.length > 0) {
        const c = instant[0];
        handleSelect({
          id: c.id,
          name: c.name,
          context: c.subtitle,
          lat: c.lat,
          lon: c.lon,
          category: c.category,
          icon: c.icon,
          zoom: c.zoom,
          metadata: c.metadata
        });
      }
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="flex relative w-full items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            isSelectingRef.current = false;
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="bg-black/85 border border-cyan-800/80 text-white text-xs sm:text-sm font-mono py-1.5 pl-2.5 pr-8 rounded-lg shadow-[0_0_10px_rgba(8,145,178,0.3)] backdrop-blur w-full focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-gray-500"
        />
        <div className="absolute right-0 top-0 bottom-0 px-2.5 text-cyan-400 flex items-center justify-center pointer-events-none">
          {loading ? (
             <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1.5 w-80 sm:w-96 max-w-[calc(100vw-24px)] bg-black/95 border border-cyan-800/80 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden z-50 divide-y divide-cyan-900/30">
          {suggestions.map((sugg) => (
            <button
              type="button"
              key={sugg.id}
              data-testid="geocoding-suggestion-item"
              onClick={() => handleSelect(sugg)}
              className="w-full text-left px-3 py-2 hover:bg-cyan-900/40 transition-colors flex items-center gap-2.5 group"
            >
              <span className="text-base shrink-0 select-none">{sugg.icon}</span>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-cyan-100 font-mono text-xs sm:text-sm truncate group-hover:text-cyan-300 font-medium">{sugg.name}</span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                    sugg.category === 'ski_resort' ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50' :
                    sugg.category === 'lake' ? 'bg-blue-950/80 text-blue-300 border-blue-500/50' :
                    sugg.category === 'mountain' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' :
                    'bg-slate-900 text-gray-400 border-gray-700'
                  }`}>
                    {sugg.category === 'ski_resort' ? 'Ski Resort' : sugg.category === 'lake' ? 'Lake' : sugg.category === 'mountain' ? 'Peak' : sugg.category === 'city' ? 'City' : 'Location'}
                  </span>
                </div>
                {sugg.context && <span className="text-gray-400 font-mono text-[11px] truncate mt-0.5">{sugg.context}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default GeocodingSearch;
