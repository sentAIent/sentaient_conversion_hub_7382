"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Navigation, 
  MapPin, 
  Crosshair, 
  ArrowUpDown, 
  Car, 
  Zap, 
  Footprints, 
  Bike, 
  Clock, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle,
  Compass
} from 'lucide-react';
import { fetchDirections, DirectionsResult, TravelMode } from '../lib/directionsService';

export interface RoutePoint {
  label: string;
  lng: number;
  lat: number;
}

interface DirectionsPanelProps {
  onRouteCalculated: (result: DirectionsResult | null) => void;
  currentCenter?: { lat: number; lng: number };
  savedLocations?: Array<{ id: string; name: string; lat: number; lon: number }>;
  customPins?: Array<{ id: string; label: string; lat: number; lon: number }>;
  onStartPickMode?: (target: 'origin' | 'destination') => void;
  pickingTarget?: 'origin' | 'destination' | null;
  pickedPoint?: { target: 'origin' | 'destination'; lat: number; lng: number; address?: string } | null;
  onClose?: () => void;
}

interface GeocodeSuggestion {
  name: string;
  context: string;
  lng: number;
  lat: number;
}

// Preset strategic tactical hubs
const PRESET_HUBS: RoutePoint[] = [
  { label: 'Washington D.C. (HQ)', lng: -77.0369, lat: 38.9072 },
  { label: 'New York (Manhattan)', lng: -73.9855, lat: 40.7484 },
  { label: 'Los Angeles (Downtown)', lng: -118.2437, lat: 34.0522 },
  { label: 'Chicago (Loop)', lng: -87.6298, lat: 41.8781 },
  { label: 'San Francisco (Embarcadero)', lng: -122.3958, lat: 37.7937 },
  { label: 'Miami (Brickell)', lng: -80.1918, lat: 25.7617 },
  { label: 'Houston (Downtown)', lng: -95.3698, lat: 29.7604 },
  { label: 'Denver (Capitol)', lng: -104.9847, lat: 39.7392 }
];

export function DirectionsPanel({
  onRouteCalculated,
  currentCenter,
  savedLocations = [],
  customPins = [],
  onStartPickMode,
  pickingTarget = null,
  pickedPoint = null,
  onClose
}: DirectionsPanelProps) {
  // Origin & Destination state
  const [origin, setOrigin] = useState<RoutePoint>({
    label: 'Washington D.C. (HQ)',
    lng: -77.0369,
    lat: 38.9072
  });
  const [destination, setDestination] = useState<RoutePoint>({
    label: 'Baltimore Harbor, MD',
    lng: -76.6122,
    lat: 39.2904
  });

  // Text inputs & autocomplete dropdowns
  const [originInput, setOriginInput] = useState('Washington D.C. (HQ)');
  const [destInput, setDestInput] = useState('Baltimore Harbor, MD');
  const [originSuggestions, setOriginSuggestions] = useState<GeocodeSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<GeocodeSuggestion[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<'origin' | 'dest' | null>(null);
  const [isSearchingGeocode, setIsSearchingGeocode] = useState(false);

  // Routing options
  const [travelMode, setTravelMode] = useState<TravelMode>('driving-traffic');
  const [timeMode, setTimeMode] = useState<'now' | 'custom'>('now');
  const [customTime, setCustomTime] = useState('');
  
  // Advanced coordinates view toggle
  const [showCoordsToggle, setShowCoordsToggle] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState<'origin' | 'dest' | null>(null);

  // Status & calculation result
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DirectionsResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const originBoxRef = useRef<HTMLDivElement>(null);
  const destBoxRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        originBoxRef.current && !originBoxRef.current.contains(event.target as Node) &&
        destBoxRef.current && !destBoxRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setShowPresetsMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update when a map point was clicked in pick mode
  useEffect(() => {
    if (pickedPoint) {
      const point: RoutePoint = {
        label: pickedPoint.address || `Map Pin (${pickedPoint.lng.toFixed(4)}, ${pickedPoint.lat.toFixed(4)})`,
        lng: pickedPoint.lng,
        lat: pickedPoint.lat
      };
      if (pickedPoint.target === 'origin') {
        setOrigin(point);
        setOriginInput(point.label);
      } else {
        setDestination(point);
        setDestInput(point.label);
      }
    }
  }, [pickedPoint]);

  // Debounced Photon geocoding for text queries
  const fetchSuggestions = async (query: string, target: 'origin' | 'dest') => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      if (target === 'origin') setOriginSuggestions([]);
      else setDestSuggestions([]);
      return;
    }

    // Check if input is direct coordinates e.g. "-77.036, 38.897" or "38.897, -77.036"
    const coordMatch = trimmed.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
    if (coordMatch) {
      const num1 = parseFloat(coordMatch[1]);
      const num2 = parseFloat(coordMatch[3]);
      // Standard GeoJSON is [lng, lat]
      const lng = Math.abs(num1) > 90 ? num1 : (Math.abs(num2) > 90 ? num2 : num1);
      const lat = Math.abs(num1) <= 90 ? num1 : num2;
      const directItem: GeocodeSuggestion = {
        name: `Coordinates (${lng.toFixed(5)}, ${lat.toFixed(5)})`,
        context: 'Manual Coordinate Input',
        lng,
        lat
      };
      if (target === 'origin') setOriginSuggestions([directItem]);
      else setDestSuggestions([directItem]);
      setActiveDropdown(target);
      return;
    }

    setIsSearchingGeocode(true);
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=5`);
      if (!res.ok) throw new Error('Geocoding service unavailable');
      const data = await res.json();
      if (data && data.features) {
        const parsed: GeocodeSuggestion[] = data.features.map((f: any) => {
          const props = f.properties || {};
          const contextParts = [props.city, props.state, props.country].filter(Boolean);
          return {
            name: props.name || props.street || props.city || 'Location',
            context: contextParts.join(', '),
            lng: f.geometry.coordinates[0],
            lat: f.geometry.coordinates[1]
          };
        });
        if (target === 'origin') setOriginSuggestions(parsed);
        else setDestSuggestions(parsed);
        setActiveDropdown(target);
      }
    } catch (e) {
      console.warn('Geocoding error:', e);
    } finally {
      setIsSearchingGeocode(false);
    }
  };

  const handleSelectSuggestion = (sugg: GeocodeSuggestion, target: 'origin' | 'dest') => {
    const point: RoutePoint = {
      label: sugg.name + (sugg.context ? ` (${sugg.context})` : ''),
      lng: sugg.lng,
      lat: sugg.lat
    };
    if (target === 'origin') {
      setOrigin(point);
      setOriginInput(point.label);
      setOriginSuggestions([]);
    } else {
      setDestination(point);
      setDestInput(point.label);
      setDestSuggestions([]);
    }
    setActiveDropdown(null);
  };

  const setPointDirectly = (point: RoutePoint, target: 'origin' | 'dest') => {
    if (target === 'origin') {
      setOrigin(point);
      setOriginInput(point.label);
    } else {
      setDestination(point);
      setDestInput(point.label);
    }
    setShowPresetsMenu(null);
  };

  // 1-Click "Use My Location" (GPS)
  const handleUseMyLocation = (target: 'origin' | 'dest') => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point: RoutePoint = {
          label: 'Current GPS Location',
          lng: pos.coords.longitude,
          lat: pos.coords.latitude
        };
        setPointDirectly(point, target);
      },
      (err) => {
        alert(`Could not acquire GPS position: ${err.message}`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // 1-Click "Current Map Center"
  const handleUseMapCenter = (target: 'origin' | 'dest') => {
    if (!currentCenter) {
      alert('Map center unavailable.');
      return;
    }
    const point: RoutePoint = {
      label: `Map Center (${currentCenter.lng.toFixed(4)}, ${currentCenter.lat.toFixed(4)})`,
      lng: currentCenter.lng,
      lat: currentCenter.lat
    };
    setPointDirectly(point, target);
  };

  // Swap Origin and Destination
  const handleSwap = () => {
    const prevOrigin = { ...origin };
    const prevDest = { ...destination };
    setOrigin(prevDest);
    setOriginInput(prevDest.label);
    setDestination(prevOrigin);
    setDestInput(prevOrigin.label);
  };

  // Calculate Route
  const handleSearch = async () => {
    setErrorMessage(null);
    if (!origin || !destination) {
      setErrorMessage('Please set both origin and destination.');
      return;
    }

    try {
      setLoading(true);
      let departAt: Date | undefined = undefined;
      if (timeMode === 'custom' && customTime) {
        departAt = new Date(customTime);
      } else {
        departAt = new Date();
      }

      const res = await fetchDirections(
        origin.lng,
        origin.lat,
        destination.lng,
        destination.lat,
        departAt,
        travelMode
      );
      setResult(res);
      onRouteCalculated(res);
    } catch (e: any) {
      console.error('Directions error:', e);
      setErrorMessage(e?.message || 'Failed to calculate route.');
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    setResult(null);
    setErrorMessage(null);
    onRouteCalculated(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60);
    if (mins > 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs} hr ${remMins} min`;
    }
    return `${mins} min`;
  };

  const getTrafficColor = (congestion?: string) => {
    switch (congestion) {
      case 'severe': return 'text-red-400 bg-red-950/60 border-red-500/40';
      case 'heavy': return 'text-orange-400 bg-orange-950/60 border-orange-500/40';
      case 'moderate': return 'text-yellow-400 bg-yellow-950/60 border-yellow-500/40';
      default: return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    }
  };

  return (
    <div className="w-[380px] bg-black/90 backdrop-blur-md border border-cyan-800/80 rounded-xl shadow-[0_0_25px_rgba(8,145,178,0.35)] text-white font-mono text-xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-cyan-950/40 px-3 py-2.5 border-b border-cyan-800/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-sm">
          <Navigation size={16} className="text-cyan-400 animate-pulse" />
          <span>TACTICAL ROUTING & TRAFFIC</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={15} />
          </button>
        )}
      </div>

      <div className="p-3 space-y-3">
        {/* Travel Mode Selector */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/60 border border-cyan-900/50 rounded-lg">
          <button
            onClick={() => setTravelMode('driving-traffic')}
            className={`py-1.5 px-1 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'driving-traffic' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            title="Driving with live traffic congestion"
          >
            <Car size={14} />
            <span className="text-[10px]">Traffic</span>
          </button>
          <button
            onClick={() => setTravelMode('driving')}
            className={`py-1.5 px-1 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'driving' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            title="Fastest highway driving route"
          >
            <Zap size={14} />
            <span className="text-[10px]">Fastest</span>
          </button>
          <button
            onClick={() => setTravelMode('walking')}
            className={`py-1.5 px-1 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'walking' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            title="Walking & pedestrian pathways"
          >
            <Footprints size={14} />
            <span className="text-[10px]">Walk</span>
          </button>
          <button
            onClick={() => setTravelMode('cycling')}
            className={`py-1.5 px-1 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'cycling' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            title="Cycling & bike trails"
          >
            <Bike size={14} />
            <span className="text-[10px]">Cycling</span>
          </button>
        </div>

        {/* Origin / Destination Container */}
        <div className="relative space-y-2">
          {/* ORIGIN */}
          <div ref={originBoxRef} className="relative">
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <MapPin size={12} className="text-emerald-400" /> ORIGIN
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleUseMyLocation('origin')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors"
                  title="Use current GPS location"
                >
                  <Crosshair size={10} /> My GPS
                </button>
                <button
                  type="button"
                  onClick={() => handleUseMapCenter('origin')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors"
                  title="Use map viewport center"
                >
                  <Compass size={10} /> Center
                </button>
                {onStartPickMode && (
                  <button
                    type="button"
                    onClick={() => onStartPickMode('origin')}
                    className={`px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors ${pickingTarget === 'origin' ? 'bg-emerald-500 text-black font-bold animate-pulse' : 'bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300'}`}
                    title="Click on the map to place origin"
                  >
                    <MapPin size={10} /> {pickingTarget === 'origin' ? 'Click Map!' : 'Pick'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPresetsMenu(showPresetsMenu === 'origin' ? null : 'origin')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-0.5 transition-colors"
                  title="Choose from preset locations"
                >
                  Presets <ChevronDown size={10} />
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={originInput}
                onChange={(e) => {
                  setOriginInput(e.target.value);
                  fetchSuggestions(e.target.value, 'origin');
                }}
                onFocus={() => {
                  if (originSuggestions.length > 0) setActiveDropdown('origin');
                }}
                placeholder="Search address, landmark, or lng,lat..."
                className="w-full bg-slate-900/90 border border-cyan-900/80 rounded-lg px-2.5 py-1.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
              {originInput && (
                <button
                  onClick={() => {
                    setOriginInput('');
                    setOriginSuggestions([]);
                  }}
                  className="absolute right-2 top-2 text-gray-500 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Origin Autocomplete Dropdown */}
            {activeDropdown === 'origin' && originSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-black/95 border border-cyan-700/80 rounded-lg shadow-2xl z-50 max-h-48 overflow-y-auto">
                {originSuggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSuggestion(sugg, 'origin')}
                    className="w-full text-left px-2.5 py-2 hover:bg-cyan-950/60 border-b border-gray-800/60 last:border-none flex flex-col gap-0.5 transition-colors"
                  >
                    <span className="font-semibold text-cyan-300 text-xs">{sugg.name}</span>
                    {sugg.context && <span className="text-[10px] text-gray-400">{sugg.context}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Origin Presets Dropdown */}
            {showPresetsMenu === 'origin' && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-black/95 border border-cyan-700/80 rounded-lg shadow-2xl z-50 max-h-56 overflow-y-auto p-1">
                <div className="px-2 py-1 text-[10px] font-bold text-cyan-400 border-b border-cyan-900/50">STRATEGIC HUBS</div>
                {PRESET_HUBS.map((hub, i) => (
                  <button
                    key={i}
                    onClick={() => setPointDirectly(hub, 'origin')}
                    className="w-full text-left px-2 py-1.5 hover:bg-cyan-950/60 rounded text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {hub.label}
                  </button>
                ))}
                {(customPins.length > 0 || savedLocations.length > 0) && (
                  <>
                    <div className="px-2 py-1 mt-1 text-[10px] font-bold text-amber-400 border-b border-amber-900/50">CUSTOM PINS</div>
                    {customPins.map((pin) => (
                      <button
                        key={pin.id}
                        onClick={() => setPointDirectly({ label: pin.label, lng: pin.lon, lat: pin.lat }, 'origin')}
                        className="w-full text-left px-2 py-1.5 hover:bg-cyan-950/60 rounded text-xs text-gray-300 hover:text-white transition-colors"
                      >
                        📌 {pin.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1">
            <button
              type="button"
              onClick={handleSwap}
              className="p-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-400 hover:text-cyan-200 shadow transition-colors"
              title="Swap origin and destination"
            >
              <ArrowUpDown size={13} />
            </button>
          </div>

          {/* DESTINATION */}
          <div ref={destBoxRef} className="relative">
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <MapPin size={12} className="text-red-400" /> DESTINATION
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleUseMyLocation('dest')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors"
                  title="Use current GPS location"
                >
                  <Crosshair size={10} /> My GPS
                </button>
                <button
                  type="button"
                  onClick={() => handleUseMapCenter('dest')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors"
                  title="Use map viewport center"
                >
                  <Compass size={10} /> Center
                </button>
                {onStartPickMode && (
                  <button
                    type="button"
                    onClick={() => onStartPickMode('destination')}
                    className={`px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors ${pickingTarget === 'destination' ? 'bg-red-500 text-black font-bold animate-pulse' : 'bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300'}`}
                    title="Click on the map to place destination"
                  >
                    <MapPin size={10} /> {pickingTarget === 'destination' ? 'Click Map!' : 'Pick'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPresetsMenu(showPresetsMenu === 'dest' ? null : 'dest')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-0.5 transition-colors"
                  title="Choose from preset locations"
                >
                  Presets <ChevronDown size={10} />
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={destInput}
                onChange={(e) => {
                  setDestInput(e.target.value);
                  fetchSuggestions(e.target.value, 'dest');
                }}
                onFocus={() => {
                  if (destSuggestions.length > 0) setActiveDropdown('dest');
                }}
                placeholder="Search address, landmark, or lng,lat..."
                className="w-full bg-slate-900/90 border border-cyan-900/80 rounded-lg px-2.5 py-1.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
              {destInput && (
                <button
                  onClick={() => {
                    setDestInput('');
                    setDestSuggestions([]);
                  }}
                  className="absolute right-2 top-2 text-gray-500 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Destination Autocomplete Dropdown */}
            {activeDropdown === 'dest' && destSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-black/95 border border-cyan-700/80 rounded-lg shadow-2xl z-50 max-h-48 overflow-y-auto">
                {destSuggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSuggestion(sugg, 'dest')}
                    className="w-full text-left px-2.5 py-2 hover:bg-cyan-950/60 border-b border-gray-800/60 last:border-none flex flex-col gap-0.5 transition-colors"
                  >
                    <span className="font-semibold text-cyan-300 text-xs">{sugg.name}</span>
                    {sugg.context && <span className="text-[10px] text-gray-400">{sugg.context}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Destination Presets Dropdown */}
            {showPresetsMenu === 'dest' && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-black/95 border border-cyan-700/80 rounded-lg shadow-2xl z-50 max-h-56 overflow-y-auto p-1">
                <div className="px-2 py-1 text-[10px] font-bold text-cyan-400 border-b border-cyan-900/50">STRATEGIC HUBS</div>
                {PRESET_HUBS.map((hub, i) => (
                  <button
                    key={i}
                    onClick={() => setPointDirectly(hub, 'dest')}
                    className="w-full text-left px-2 py-1.5 hover:bg-cyan-950/60 rounded text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {hub.label}
                  </button>
                ))}
                {(customPins.length > 0 || savedLocations.length > 0) && (
                  <>
                    <div className="px-2 py-1 mt-1 text-[10px] font-bold text-amber-400 border-b border-amber-900/50">CUSTOM PINS</div>
                    {customPins.map((pin) => (
                      <button
                        key={pin.id}
                        onClick={() => setPointDirectly({ label: pin.label, lng: pin.lon, lat: pin.lat }, 'dest')}
                        className="w-full text-left px-2 py-1.5 hover:bg-cyan-950/60 rounded text-xs text-gray-300 hover:text-white transition-colors"
                      >
                        📌 {pin.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Departure Time */}
        <div className="p-2 bg-slate-900/50 border border-cyan-900/40 rounded-lg space-y-1.5">
          <div className="flex justify-between items-center text-[11px] text-gray-400 font-semibold">
            <span className="flex items-center gap-1"><Clock size={12} className="text-cyan-400" /> DEPARTURE</span>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="timeMode"
                  checked={timeMode === 'now'}
                  onChange={() => setTimeMode('now')}
                  className="accent-cyan-400"
                />
                <span className={timeMode === 'now' ? 'text-cyan-300 font-bold' : ''}>Now</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="timeMode"
                  checked={timeMode === 'custom'}
                  onChange={() => setTimeMode('custom')}
                  className="accent-cyan-400"
                />
                <span className={timeMode === 'custom' ? 'text-cyan-300 font-bold' : ''}>Predictive</span>
              </label>
            </div>
          </div>

          {timeMode === 'custom' && (
            <input
              type="datetime-local"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="w-full px-2 py-1 bg-black/80 border border-cyan-800 rounded text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
            />
          )}
        </div>

        {/* Raw Coordinates Expander */}
        <div>
          <button
            type="button"
            onClick={() => setShowCoordsToggle(!showCoordsToggle)}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {showCoordsToggle ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            <span>{showCoordsToggle ? 'Hide Raw Coordinates' : 'Show Raw Decimal Coordinates'}</span>
          </button>
          {showCoordsToggle && (
            <div className="mt-1 p-2 bg-black/70 border border-gray-800 rounded text-[10px] text-gray-400 space-y-1">
              <div>Origin: <span className="text-cyan-300">{origin.lng.toFixed(6)}, {origin.lat.toFixed(6)}</span></div>
              <div>Destination: <span className="text-cyan-300">{destination.lng.toFixed(6)}, {destination.lat.toFixed(6)}</span></div>
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-2 bg-red-950/60 border border-red-800/80 rounded text-red-300 text-[11px] flex items-center gap-2">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-2 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="animate-spin inline-block mr-1">⚙️</span>
            ) : (
              <Navigation size={13} />
            )}
            <span>{loading ? 'CALCULATING ROUTE...' : 'CALCULATE ROUTE'}</span>
          </button>

          {result && (
            <button
              onClick={clearRoute}
              className="px-3 bg-slate-800 hover:bg-slate-700 border border-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
              title="Clear Route"
            >
              Clear
            </button>
          )}
        </div>

        {/* Route Summary */}
        {result && (
          <div className="mt-2 p-2.5 bg-cyan-950/20 border border-cyan-800/60 rounded-lg space-y-2">
            <div className="flex justify-between items-baseline border-b border-cyan-900/40 pb-1.5">
              <span className="text-gray-400">ESTIMATED DURATION:</span>
              <span className="text-base font-bold text-cyan-300">
                {formatDuration(result.duration)}
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-cyan-900/40 pb-1.5">
              <span className="text-gray-400">TOTAL DISTANCE:</span>
              <span className="font-semibold text-white">
                {(result.distance / 1609.34).toFixed(1)} mi ({(result.distance / 1000).toFixed(1)} km)
              </span>
            </div>

            <div className="flex justify-between items-center pt-0.5">
              <span className="text-gray-400">TRAFFIC CONDITIONS:</span>
              <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getTrafficColor(result.trafficCongestion)}`}>
                {result.trafficCongestion || 'Clear / Low'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
