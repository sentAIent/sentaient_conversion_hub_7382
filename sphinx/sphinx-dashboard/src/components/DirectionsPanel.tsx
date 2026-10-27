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
  Compass,
  Train,
  Bus,
  Plane,
  Shuffle,
  ShieldAlert,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
  Flame,
  CloudRain
} from 'lucide-react';
import { 
  fetchDirections, 
  DirectionsResult, 
  TravelMode, 
  RoutingStrategy,
  AvoidanceOptions,
  RouteOption,
  RouteSubLeg
} from '../lib/directionsService';
import { UserTier } from '../lib/useSettings';

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
  currentTier?: UserTier;
  onRequireUpgrade?: (feature: string) => void;
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
  onClose,
  currentTier = 'free',
  onRequireUpgrade
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

  // Routing options & Modality
  const [travelMode, setTravelMode] = useState<TravelMode>('driving-traffic');
  const [timeMode, setTimeMode] = useState<'now' | 'custom'>('now');
  const [customTime, setCustomTime] = useState('');
  const [routingStrategy, setRoutingStrategy] = useState<RoutingStrategy>('fastest');
  const [waypoints, setWaypoints] = useState<RoutePoint[]>([]);
  const [isGuidanceMode, setIsGuidanceMode] = useState(false);
  
  // Tactical Avoidance Options
  const [showAvoidanceDrawer, setShowAvoidanceDrawer] = useState(true);
  const [avoidanceOptions, setAvoidanceOptions] = useState<AvoidanceOptions>({
    avoidHighways: false,
    avoidTolls: false,
    avoidCameras: false,
    avoidConstruction: false,
    avoidClosedRoads: true,
    avoidFloodedAreas: true,
    avoidCrimeAreas: false,
    avoidToxicPlumes: true
  });

  // Selected Alternative Route
  const [selectedAltId, setSelectedAltId] = useState<string>('opt-fastest');

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

  const handleSwap = () => {
    const prevOrigin = { ...origin };
    const prevDest = { ...destination };
    setOrigin(prevDest);
    setOriginInput(prevDest.label);
    setDestination(prevOrigin);
    setDestInput(prevOrigin.label);
  };

  const toggleAvoidance = (key: keyof AvoidanceOptions) => {
    setAvoidanceOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate Route with Avoidance Options & Strategy
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
        travelMode,
        routingStrategy,
        waypoints.map(w => ({ lng: w.lng, lat: w.lat })),
        avoidanceOptions
      );
      setResult(res);
      setSelectedAltId(routingStrategy === 'stealth' ? 'opt-stealth' :
                        routingStrategy === 'shortest' ? 'opt-shortest' :
                        routingStrategy === 'eco_no_tolls' ? 'opt-eco' : 'opt-fastest');
      onRouteCalculated(res);
    } catch (e: any) {
      console.error('Directions error:', e);
      setErrorMessage(e?.message || 'Failed to calculate route.');
    } finally {
      setLoading(false);
    }
  };

  // Switch Active Alternative Route
  const handleSelectAlternative = (alt: RouteOption) => {
    setSelectedAltId(alt.id);
    if (!result) return;
    const updated: DirectionsResult = {
      ...result,
      routeGeoJSON: alt.routeGeoJSON,
      distance: alt.distance,
      duration: alt.duration,
      trafficCongestion: alt.trafficCongestion,
      routingStrategy: alt.strategy,
      cameraExposureCount: alt.cameraExposureCount,
      avoidanceScore: alt.avoidanceScore,
      tollCostEstimate: alt.tollCostEstimate,
      threatScorecard: alt.threatScorecard,
      maneuvers: alt.maneuvers,
      intermodalLegs: alt.intermodalLegs
    };
    setResult(updated);
    onRouteCalculated(updated);
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
    <div className="w-full max-w-[420px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-black/95 backdrop-blur-xl border border-cyan-800/80 rounded-xl shadow-[0_0_30px_rgba(8,145,178,0.4)] text-white font-mono text-xs flex flex-col z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950/80 to-blue-950/80 px-3 py-2.5 border-b border-cyan-800/50 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-xs sm:text-sm">
          <Navigation size={16} className="text-cyan-400 animate-pulse" />
          <span>MULTI-MODAL TACTICAL ROUTING</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={15} />
          </button>
        )}
      </div>

      <div className="p-3 space-y-3">
        {/* Multi-Modal Travel Mode Selector Tabs */}
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 flex justify-between items-center">
            <span>TRAVEL MODALITY</span>
            <span className="text-cyan-400">{travelMode.toUpperCase().replace('-', ' ')}</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 p-1 bg-black/70 border border-cyan-900/60 rounded-lg text-center">
            <button
              type="button"
              onClick={() => setTravelMode('driving-traffic')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'driving-traffic' ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/60 font-bold shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Car / Highway driving with live traffic"
            >
              <Car size={13} />
              <span className="text-[9px]">Car</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('walking')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'walking' ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/60 font-bold shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Foot / Pedestrian pathways & trails"
            >
              <Footprints size={13} />
              <span className="text-[9px]">Foot</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('cycling')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'cycling' ? 'bg-teal-500/25 text-teal-300 border border-teal-500/60 font-bold shadow-[0_0_8px_rgba(20,184,166,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Biking / Road cycling on bike lanes"
            >
              <Bike size={13} />
              <span className="text-[9px]">Biking</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('mountain_biking')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'mountain_biking' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/60 font-bold shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Mountain Biking (MTB) / Off-road singletrack"
            >
              <span className="text-xs">🚵</span>
              <span className="text-[9px]">MTB</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('skateboarding')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'skateboarding' ? 'bg-lime-500/25 text-lime-300 border border-lime-500/60 font-bold shadow-[0_0_8px_rgba(132,204,22,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Skateboarding / Paved paths & greenways"
            >
              <span className="text-xs">🛹</span>
              <span className="text-[9px]">Skate</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('rail_train')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'rail_train' ? 'bg-purple-500/25 text-purple-300 border border-purple-500/60 font-bold shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Passenger Rail (Amtrak, Regional Express, Metro)"
            >
              <Train size={13} />
              <span className="text-[9px]">Train</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('transit_bus')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'transit_bus' ? 'bg-sky-500/25 text-sky-300 border border-sky-500/60 font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Bus Transit & Intercity Motorcoach"
            >
              <Bus size={13} />
              <span className="text-[9px]">Bus</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('airplane')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'airplane' ? 'bg-rose-500/25 text-rose-300 border border-rose-500/60 font-bold shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Commercial Airline & Tactical Flight Arc"
            >
              <Plane size={13} />
              <span className="text-[9px]">Flight</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('intermodal')}
              className={`py-1.5 px-0.5 rounded flex flex-col items-center gap-1 transition-all ${travelMode === 'intermodal' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/60 font-bold shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
              title="Intermodal Combination (Drive + Train, Air + Ground Transit)"
            >
              <Shuffle size={13} />
              <span className="text-[9px]">Combo</span>
            </button>
          </div>
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
                  <Crosshair size={10} /> GPS
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
                >
                  <Crosshair size={10} /> GPS
                </button>
                <button
                  type="button"
                  onClick={() => handleUseMapCenter('dest')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors"
                >
                  <Compass size={10} /> Center
                </button>
                {onStartPickMode && (
                  <button
                    type="button"
                    onClick={() => onStartPickMode('destination')}
                    className={`px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors ${pickingTarget === 'destination' ? 'bg-red-500 text-black font-bold animate-pulse' : 'bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300'}`}
                  >
                    <MapPin size={10} /> {pickingTarget === 'destination' ? 'Click Map!' : 'Pick'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPresetsMenu(showPresetsMenu === 'dest' ? null : 'dest')}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-[10px] flex items-center gap-0.5 transition-colors"
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
              </div>
            )}
          </div>
        </div>

        {/* TACTICAL AVOIDANCE FILTERS SECTION */}
        <div className="p-2.5 bg-slate-900/70 border border-cyan-900/60 rounded-xl space-y-2">
          <div 
            onClick={() => setShowAvoidanceDrawer(!showAvoidanceDrawer)}
            className="flex justify-between items-center cursor-pointer select-none"
          >
            <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert size={13} className="text-amber-400" />
              <span>TACTICAL AVOIDANCE CONSTRAINTS</span>
            </span>
            <span className="text-[10px] text-cyan-400 flex items-center gap-0.5">
              {Object.values(avoidanceOptions).filter(Boolean).length} ACTIVE
              {showAvoidanceDrawer ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </span>
          </div>

          {showAvoidanceDrawer && (
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
              <button
                type="button"
                onClick={() => toggleAvoidance('avoidHighways')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidHighways 
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>🚫 No Highways</span>
                {avoidanceOptions.avoidHighways && <Check size={11} className="text-amber-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidTolls')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidTolls 
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>💰 No Tolls</span>
                {avoidanceOptions.avoidTolls && <Check size={11} className="text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidCameras')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidCameras 
                    ? 'bg-purple-950/80 border-purple-400 text-purple-200 font-bold shadow-[0_0_8px_rgba(168,85,247,0.3)]' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>📸 Avoid ALPR/Cones</span>
                {avoidanceOptions.avoidCameras && <Check size={11} className="text-purple-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidConstruction')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidConstruction 
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>🚧 Construction Zones</span>
                {avoidanceOptions.avoidConstruction && <Check size={11} className="text-amber-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidClosedRoads')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidClosedRoads 
                    ? 'bg-red-950/80 border-red-400 text-red-200 font-bold shadow-[0_0_8px_rgba(239,68,68,0.3)]' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>❄️ Closed/Winter Roads</span>
                {avoidanceOptions.avoidClosedRoads && <Check size={11} className="text-red-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidFloodedAreas')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidFloodedAreas 
                    ? 'bg-sky-950/80 border-sky-400 text-sky-200 font-bold shadow-[0_0_8px_rgba(14,165,233,0.3)]' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>🌊 Flooded / Storms</span>
                {avoidanceOptions.avoidFloodedAreas && <Check size={11} className="text-sky-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidCrimeAreas')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidCrimeAreas 
                    ? 'bg-red-950/80 border-red-400 text-red-200 font-bold shadow-[0_0_8px_rgba(239,68,68,0.3)]' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>🚨 High-Crime Sectors</span>
                {avoidanceOptions.avoidCrimeAreas && <Check size={11} className="text-red-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleAvoidance('avoidToxicPlumes')}
                className={`px-2 py-1.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  avoidanceOptions.avoidToxicPlumes 
                    ? 'bg-purple-950/80 border-purple-400 text-purple-200 font-bold shadow-[0_0_8px_rgba(168,85,247,0.3)]' 
                    : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <span>☣️ Toxic Plume Cones</span>
                {avoidanceOptions.avoidToxicPlumes && <Check size={11} className="text-purple-400" />}
              </button>
            </div>
          )}
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

        {/* Error message */}
        {errorMessage && (
          <div className="p-2 bg-red-950/60 border border-red-800/80 rounded text-red-300 text-[11px] flex items-center gap-2">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="animate-spin inline-block mr-1">⚙️</span>
            ) : (
              <Navigation size={14} />
            )}
            <span>{loading ? 'CALCULATING ALTERNATIVES...' : 'CALCULATE MULTI-MODAL ROUTES'}</span>
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

        {/* SIMULTANEOUS ALTERNATIVE ROUTES COMPARISON MATRIX */}
        {result && result.alternativeRoutes && result.alternativeRoutes.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex justify-between items-center">
              <span>ROUTE OPTIONS & THREAT AUDIT</span>
              <span className="text-gray-400">{result.alternativeRoutes.length} ROUTES COMPUTED</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {result.alternativeRoutes.map((alt) => {
                const isSelected = selectedAltId === alt.id;
                return (
                  <div
                    key={alt.id}
                    onClick={() => handleSelectAlternative(alt)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                        : 'bg-black/60 border-gray-800 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className={isSelected ? 'text-cyan-300' : 'text-white'}>{alt.label}</span>
                        {isSelected && <span className="text-[9px] bg-cyan-500 text-black px-1.5 py-0.2 rounded font-black">ACTIVE</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-white">{formatDuration(alt.duration)}</span>
                        <span className="text-[10px] text-gray-400 ml-1.5">
                          ({(alt.distance / 1609.34).toFixed(1)} mi)
                        </span>
                      </div>
                    </div>

                    {alt.summaryNote && (
                      <div className="text-[10px] text-gray-400 mb-2 truncate">
                        {alt.summaryNote}
                      </div>
                    )}

                    {/* Threat & Cost Audit Badges */}
                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-gray-800/80 text-center text-[10px]">
                      <div className="bg-black/40 p-1 rounded border border-gray-800">
                        <span className="text-[9px] text-gray-500 block">CAMERAS</span>
                        <span className={alt.cameraExposureCount === 0 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {alt.cameraExposureCount === 0 ? '🛡️ 0 ALPR' : `📸 ${alt.cameraExposureCount}`}
                        </span>
                      </div>
                      <div className="bg-black/40 p-1 rounded border border-gray-800">
                        <span className="text-[9px] text-gray-500 block">TOLLS</span>
                        <span className={alt.tollCostEstimate === 0 ? 'text-emerald-400 font-bold' : 'text-cyan-300 font-bold'}>
                          ${alt.tollCostEstimate.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-black/40 p-1 rounded border border-gray-800">
                        <span className="text-[9px] text-gray-500 block">SAFETY</span>
                        <span className="text-emerald-400 font-bold">
                          {alt.threatScorecard.crimeSafetyIndex}/100
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* INTERMODAL LEGS BREAKDOWN (WHEN APPLICABLE) */}
            {result.intermodalLegs && result.intermodalLegs.length > 0 && (
              <div className="mt-3 p-2.5 bg-slate-900/60 border border-purple-900/50 rounded-xl space-y-2">
                <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Shuffle size={12} className="text-purple-400" />
                  <span>INTERMODAL TRANSIT LEGS</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {result.intermodalLegs.map((leg, idx) => (
                    <div key={leg.id} className="p-2 bg-black/50 border border-purple-950 rounded-lg flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-950 flex items-center justify-center shrink-0 text-sm">
                        {leg.mode === 'flight' ? '✈️' : leg.mode === 'rail' ? '🚆' : leg.mode === 'walking' ? '🚶' : '🚗'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white font-bold truncate">{leg.instruction}</div>
                        <div className="text-[10px] text-gray-400 flex gap-2">
                          <span>{(leg.distanceMeters / 1609.34).toFixed(1)} mi</span>
                          <span>•</span>
                          <span>{formatDuration(leg.durationSeconds)}</span>
                          {leg.transitDetails && (
                            <>
                              <span>•</span>
                              <span className="text-purple-300">{leg.transitDetails.lineOrFlightNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Launch Guidance HUD Button */}
            <button
              type="button"
              data-testid="btn-launch-guidance"
              onClick={() => setIsGuidanceMode(true)}
              className="w-full mt-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all font-mono"
            >
              <Navigation size={14} />
              <span>LAUNCH NIGHT TACTICAL HUD</span>
            </button>
          </div>
        )}
      </div>

      {/* FULL-SCREEN NIGHT TACTICAL GUIDANCE HUD */}
      {isGuidanceMode && result && (
        <div 
          data-testid="tactical-guidance-hud"
          className="fixed inset-x-0 top-0 sm:top-4 z-[999] flex flex-col items-center pointer-events-auto p-3 max-w-xl mx-auto"
        >
          <div className="w-full bg-black/95 border-2 border-emerald-500 rounded-2xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.6)] backdrop-blur-2xl text-emerald-400 font-mono space-y-3">
            <div className="flex justify-between items-center border-b border-emerald-900/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="animate-ping w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-black text-sm tracking-widest text-white">TACTICAL GUIDANCE HUD</span>
              </div>
              <button
                type="button"
                data-testid="btn-exit-guidance"
                onClick={() => setIsGuidanceMode(false)}
                className="px-2.5 py-1 bg-red-950/80 hover:bg-red-900 border border-red-700/80 text-red-300 rounded text-xs font-bold transition-colors"
              >
                EXIT HUD
              </button>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-400 flex items-center justify-center text-3xl font-black text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                ↱
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-black text-white tracking-tight">
                  {(result.distance / 1609.34).toFixed(1)} MILES REMAINING
                </div>
                <div className="text-sm font-bold text-emerald-300 truncate">
                  {result.maneuvers?.[1]?.instruction || result.maneuvers?.[0]?.instruction || 'Proceed on tactical corridor'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/60 text-center text-xs">
              <div>
                <span className="text-[9px] text-emerald-600 block">MODALITY</span>
                <span className="text-white font-bold text-xs uppercase">{travelMode}</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-600 block">EST. TIME</span>
                <span className="text-white font-bold text-xs">{formatDuration(result.duration)}</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-600 block">SURVEILLANCE</span>
                <span className="text-emerald-300 font-bold text-xs">
                  {result.cameraExposureCount === 0 ? 'SHIELDED' : `${result.cameraExposureCount} ALPR`}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-600 block">HAZARDS</span>
                <span className="text-emerald-400 font-bold text-xs">
                  0 CLOSURES
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
