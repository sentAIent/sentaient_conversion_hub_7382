import React, { useState, useEffect, useRef } from 'react';

export interface GeocodingResult {
  lat: number;
  lon: number;
  name: string;
  context: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
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
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce to prevent spamming the API while typing
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Photon by Komoot is designed for search-as-you-type and uses OSM data
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        
        if (data && data.features) {
          const parsed = data.features.map((f: any, index: number) => {
            const props = f.properties;
            const contextParts = [props.city, props.state, props.country, props.postcode].filter(Boolean);
            return {
              id: `${index}-${props.osm_id || Math.random()}`,
              name: props.name || props.street || props.city || props.postcode || contextParts[0] || 'Unknown',
              context: contextParts.join(', '),
              lon: f.geometry.coordinates[0],
              lat: f.geometry.coordinates[1],
              city: props.city || props.town || props.village,
              state: props.state,
              country: props.country,
              postcode: props.postcode
            };
          });
          setSuggestions(parsed);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Autocomplete failed:", err);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (sugg: Suggestion) => {
    console.log('[GeocodingSearch] handleSelect:', sugg.name);
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
      postcode: sugg.postcode
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]); // Pick top result on enter
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
        <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-black/95 border border-cyan-800/80 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden z-50">
          {suggestions.map((sugg) => (
            <button
              type="button"
              key={sugg.id}
              data-testid="geocoding-suggestion-item"
              onClick={() => handleSelect(sugg)}
              className="w-full text-left px-3 py-2 border-b border-cyan-900/30 hover:bg-cyan-900/40 transition-colors last:border-0 flex flex-col"
            >
              <span className="text-cyan-100 font-mono text-sm">{sugg.name}</span>
              {sugg.context && <span className="text-gray-500 font-mono text-xs truncate">{sugg.context}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default GeocodingSearch;
