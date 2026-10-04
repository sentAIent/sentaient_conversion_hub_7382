import React, { useState, useEffect, useRef } from 'react';

interface GeocodingSearchProps {
  onLocationSelected: (lat: number, lon: number) => void;
}

interface Suggestion {
  id: string;
  name: string;
  context: string;
  lat: number;
  lon: number;
}

export function GeocodingSearch({ onLocationSelected }: GeocodingSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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
            const contextParts = [props.city, props.state, props.country].filter(Boolean);
            
            return {
              id: `${index}-${props.osm_id || Math.random()}`,
              name: props.name || props.street || contextParts[0],
              context: contextParts.join(', '),
              lon: f.geometry.coordinates[0],
              lat: f.geometry.coordinates[1]
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
    setQuery(sugg.name);
    setShowDropdown(false);
    onLocationSelected(sugg.lat, sugg.lon);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]); // Pick top result on enter
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="flex relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search locations..."
          className="bg-black/60 border border-cyan-900/80 text-white text-sm font-mono p-2 pr-10 rounded shadow-[0_0_10px_rgba(8,145,178,0.3)] backdrop-blur w-72 focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-gray-500"
        />
        <div className="absolute right-0 top-0 bottom-0 px-3 text-cyan-400 flex items-center justify-center pointer-events-none">
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
        <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-cyan-900/50 rounded shadow-[0_0_15px_rgba(8,145,178,0.4)] backdrop-blur-md overflow-hidden z-50">
          {suggestions.map((sugg) => (
            <button
              key={sugg.id}
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
