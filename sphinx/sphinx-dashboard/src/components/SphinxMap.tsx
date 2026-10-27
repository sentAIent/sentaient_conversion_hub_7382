"use client";
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Map, { Source, Layer, Popup, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Eye, EyeOff, RefreshCw, ChevronDown } from 'lucide-react';

import { useSettings, LocationState, CustomPin, UserTier, TIER_CONFIG, isFeatureAllowed } from '../lib/useSettings';
import { TierUpgradeModal } from './TierUpgradeModal';
import SettingsPanel from './SettingsPanel';
import { GeocodingSearch } from './GeocodingSearch';
import { OfflineDownloaderModal } from './OfflineDownloaderModal';
import { DirectionsPanel } from './DirectionsPanel';
import { SolarPanel } from './SolarPanel';
import { DroneFeed } from './DroneFeed';
import { RadioPanel } from './RadioPanel';
import { BaseDefensePanel } from './BaseDefensePanel';
import { CustomCursor } from './CustomCursor';
import { FieldManualsPanel } from './FieldManualsPanel';
import { RangeRingsPanel } from './RangeRingsPanel';
import { CelestialDomeModal } from './CelestialDomeModal';
import { WeatherWindPanel } from './WeatherWindPanel';
import { AviationSafetyPanel } from './AviationSafetyPanel';
import { WindHudWidget } from './WindHudWidget';
import { SphinxAIAssistant } from './SphinxAIAssistant';
import { getCityCrimeData, CityCrimeData, CrimeIncident, NeighborhoodProfile, PRESET_METRO_NEIGHBORHOODS } from '../lib/intelligence/crimeEngine';
import { MapAction, MapContext } from '../lib/intelligence/aiClient';
import { DirectionsResult } from '../lib/directionsService';
import { isPointInPolygon } from '../lib/geofence';
import { computeFireSpreadForecast, WeatherVector } from '../lib/fireSpreadEngine';
import { buildSurveillanceGeoJson, enrichOsmCameras, VENDOR_PALETTE, VERIFIED_SURVEILLANCE_REGISTRY } from '../lib/intelligence/cameraData';
import { SurveillancePopupCard } from './SurveillancePopupCard';
import { SentinelAlertBanner } from './SentinelAlertBanner';
import { tacticalSentinel } from '../lib/sentinel/TacticalSentinelService';
import { analyzeAircraftLoiter } from '../lib/intelligence/LoiterDetectionEngine';
import { CitizenReconModal, CitizenReport } from './CitizenReconModal';
import { offlineMesh } from '../lib/mesh/OfflineMeshService';
import { CityCrimePanel } from './CityCrimePanel';
import { RoadClosure3DLayer } from './RoadClosure3DLayer';
import { Weather3DARLayer } from './Weather3DARLayer';
import { SolarTerminator3DLayer } from './SolarTerminator3DLayer';
import { DroneDock3DLayer } from './DroneDock3DLayer';
import { ZeroBlindSpotAnalyticsHUD } from './ZeroBlindSpotAnalyticsHUD';
import { ToxicPlume3DLayer } from './ToxicPlume3DLayer';
import { ToxicSitePopupCard } from './ToxicSitePopupCard';
import { HomebuyerSafetyModal } from './HomebuyerSafetyModal';
import { ToxicSite, GLOBAL_TOXIC_SITES } from '../lib/intelligence/toxicSitesData';
import { GlobalDataEngine, ViewportAuditResult } from '../lib/intelligence/globalDataEngine';
import { getSnowboardResortsGeoJSON } from '../lib/routing/snowboardResorts';
import { SnowboardResortPopup } from './SnowboardResortPopup';

interface SelectedFeature {
  properties: any;
  layerId: string;
  longitude: number;
  latitude: number;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const BASE_MAP_STYLE = MAPBOX_TOKEN
  ? 'mapbox://styles/mapbox/dark-v11'
  : {
      version: 8 as const,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {},
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#060a12'
          }
        }
      ]
    };

const INTERACTIVE_LAYER_IDS = ['custom-pin-layer', 'custom-pin-label-layer', 'fire-spread-fill', 'cell-tower-cluster', 'spring-cluster', 'snowboard-resorts-cluster', 'aircraft-layer', 'cell-tower-layer', 'spring-layer', 'disaster-layer', 'earthquake-layer', 'power-layer', 'aviation-layer', 'emergency-layer', 'camera-layer', 'camera-fov-layer', 'weather-station-layer', 'data-center-layer', 'radar-layer', 'public-land-layer', 'campsite-layer', 'trail-layer', 'submarine-cable-layer', 'landing-point-layer', 'wildfire-layer', 'vessel-layer', 'vessel-circle-layer', 'atlas-obscura-layer', 'lightning-layer', 'road-barricade-3d-extrusion', 'road-hazard-core-line', 'snowboard-resorts-point', 'snowboard-resorts-label'];

const getSavedViewState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem('sphinx_last_view_state');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
};

const CAMERA_CIRCLE_COLOR_EXPR: any = [
  'match', ['get', 'vendor'],
  'flock', '#f59e0b', 'axon', '#3b82f6', 'ring', '#a855f7',
  'motorola', '#10b981', 'genetec', '#06b6d4', 'verkada', '#ec4899',
  'enforcement', '#ef4444', '#e2e8f0'
];

export default function SphinxMap() {
  const { settings, updateSettings, loading } = useSettings();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const mlSupported = typeof (maplibregl as any).supported === 'function' ? (maplibregl as any).supported() : true;
        setIsWebGLSupported(Boolean(gl && mlSupported));
      } catch (e) {
        setIsWebGLSupported(false);
      }
    }
  }, []);

  const toggleLayer = (layerName: keyof typeof settings.layers) => {
    updateSettings({
      ...settings,
      layers: {
        ...settings.layers,
        [layerName]: !settings.layers[layerName]
      }
    });
  };

  const toggleAllLayers = (show: boolean) => {
    const newLayers = { ...settings.layers };
    (Object.keys(newLayers) as Array<keyof typeof newLayers>).forEach(k => newLayers[k] = show);
    updateSettings({ ...settings, layers: newLayers });
  };

  const [droneData, setDroneData] = useState<any>(null);
  const [crimeData, setCrimeData] = useState<any[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);
  const [activeCityCrime, setActiveCityCrime] = useState<CityCrimeData | null>(null);
  const [selectedCrimeIncident, setSelectedCrimeIncident] = useState<CrimeIncident | null>(null);
  const [selectedCrimeNeighborhood, setSelectedCrimeNeighborhood] = useState<NeighborhoodProfile | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let isCancelled = false;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal) return;
    try {
      ws = new WebSocket('ws://localhost:3117');
      ws.onmessage = (event) => {
        if (isCancelled) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'drone_telemetry') {
            setDroneData(data);
          } else if (data.type === 'crime_incidents') {
            setCrimeData(data.data);
          }
        } catch(e) {}
      };
      ws.onerror = () => {};
    } catch(e) {}

    return () => {
      isCancelled = true;
      if (ws) {
        if (ws.readyState === WebSocket.CONNECTING) {
          ws.onopen = () => ws?.close();
        } else {
          ws.close();
        }
      }
    };
  }, []);

  const [viewState, setViewState] = useState<any>(() => {
    const saved = getSavedViewState();
    return saved?.longitude != null ? saved : {
      longitude: -98.5795,
      latitude: 39.8283,
      zoom: 4.2,
      pitch: 0,
      bearing: 0
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fetchingOverpassRef = useRef(false);
  const pendingOverpassRef = useRef(false);

  // Initialize viewState from settings once loaded
  useEffect(() => {
    if (!loading && settings.home_location && !getSavedViewState()) {
      setViewState({
        longitude: settings.home_location.lon,
        latitude: settings.home_location.lat,
        zoom: settings.home_location.zoom,
        pitch: 45,
        bearing: 0
      });
    }
  }, [loading]); // We only want to set it initially when loading finishes

  const handleJumpTo = (loc: LocationState) => {
    setViewState((prev: any) => {
      const updated = { ...prev, longitude: loc.lon, latitude: loc.lat, zoom: loc.zoom };
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sphinx_last_view_state', JSON.stringify(updated)); } catch {}
      }
      return updated;
    });
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [loc.lon, loc.lat], zoom: loc.zoom });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__sphinxJumpTo = (lat: number, lon: number, zoom = 12) => {
        handleJumpTo({ lat, lon, zoom });
      };
    }
  }, []);

  const bboxRef = useRef('');
  const mapRef = useRef<any>(null);
  
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  useEffect(() => {
    const checkStatus = () => setIsOfflineMode(!navigator.onLine);
    window.addEventListener('online', checkStatus);
    window.addEventListener('offline', checkStatus);
    checkStatus();
    return () => {
      window.removeEventListener('online', checkStatus);
      window.removeEventListener('offline', checkStatus);
    };
  }, []);

  const [aircraftFeatures, setAircraftFeatures] = useState<any[]>([]);
  const [cellTowerFeatures, setCellTowerFeatures] = useState<any[]>([]);
  const [springFeatures, setSpringFeatures] = useState<any[]>([]);
  const [isFetchingOverpass, setIsFetchingOverpass] = useState(false);
  const [overpassError, setOverpassError] = useState<string | null>(null);
  const [disasterFeatures, setDisasterFeatures] = useState<any[]>([]);
  const [earthquakeFeatures, setEarthquakeFeatures] = useState<any[]>([]);
  const [powerFeatures, setPowerFeatures] = useState<any[]>([]);
  const [aviationFeatures, setAviationFeatures] = useState<any[]>([]);
  const [emergencyFeatures, setEmergencyFeatures] = useState<any[]>([]);
  const [cameraFeatures, setCameraFeatures] = useState<any[]>([]);
  const [weatherStationFeatures, setWeatherStationFeatures] = useState<any[]>([]);
  const [dataCenterFeatures, setDataCenterFeatures] = useState<any[]>([]);
  const [radarFeatures, setRadarFeatures] = useState<any[]>([]);
  const [publicLandFeatures, setPublicLandFeatures] = useState<any[]>([]);
  const [campsiteFeatures, setCampsiteFeatures] = useState<any[]>([]);
  const [trailFeatures, setTrailFeatures] = useState<any[]>([]);
  const [cableFeatures, setCableFeatures] = useState<any[]>([]);
  const [landingPointFeatures, setLandingPointFeatures] = useState<any[]>([]);
  const [wildfireFeatures, setWildfireFeatures] = useState<any[]>([]);
  const [vesselFeatures, setVesselFeatures] = useState<any[]>([]);
  const [obscuraFeatures, setObscuraFeatures] = useState<any[]>([]);
  const [rangeRingsGeoJSON, setRangeRingsGeoJSON] = useState<any | null>(null);
  const [selectedDroneDockId, setSelectedDroneDockId] = useState<string | null>(null);
  const [selectedToxicSite, setSelectedToxicSite] = useState<ToxicSite | null>(null);
  const [selectedSnowboardResort, setSelectedSnowboardResort] = useState<any | null>(null);
  const [globalSnowboardResorts, setGlobalSnowboardResorts] = useState<any | null>(null);
  const [resortPistesLiftsData, setResortPistesLiftsData] = useState<any | null>(null);
  const [isHomebuyerModalOpen, setIsHomebuyerModalOpen] = useState(false);
  const [toxicSiteFeatures, setToxicSiteFeatures] = useState<any[]>([]);
  const [auditResult, setAuditResult] = useState<ViewportAuditResult>(() => ({
    sensor_density_score: 95,
    live_data_percentage: 94,
    active_feed_sources: ['ADS-B Global', 'AIS OpenWaters', 'DFR Autonomous Mesh', 'NASA FIRMS', 'USGS'],
    blind_spots_detected: 0,
    unincorporated_ratio: 0.15,
    primary_jurisdiction: 'City of Newport Beach Municipal Corporation (NB-CITY)'
  }));

  const [showFieldManuals, setShowFieldManuals] = useState(false);
  const [showRangeRings, setShowRangeRings] = useState(false);
  const [showCelestialDome, setShowCelestialDome] = useState(false);
  const [lightningFeatures, setLightningFeatures] = useState<any[]>([]);
  const [showWeatherWind, setShowWeatherWind] = useState(false);
  const [showAviationSafety, setShowAviationSafety] = useState(false);
  const [showTierUpgrade, setShowTierUpgrade] = useState(false);
  const [tierUpgradeTrigger, setTierUpgradeTrigger] = useState<string | null>(null);
  const [showCityCrimePanel, setShowCityCrimePanel] = useState(false);
  const [showCitizenRecon, setShowCitizenRecon] = useState(false);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>([]);
  const [meshPeersCount, setMeshPeersCount] = useState(1);
  const [roadClosuresData, setRoadClosuresData] = useState<any | null>(null);
  const [is3DView, setIs3DView] = useState(false);
  const satelliteDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');
  const [weatherRadarUrl, setWeatherRadarUrl] = useState<string | null>(null);
  const [directionsResult, setDirectionsResult] = useState<DirectionsResult | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [pickingRoutingPoint, setPickingRoutingPoint] = useState<'origin' | 'destination' | null>(null);
  const [pickedRoutingPoint, setPickedRoutingPoint] = useState<{ target: 'origin' | 'destination'; lat: number; lng: number; address?: string } | null>(null);
  const [showSolarPanel, setShowSolarPanel] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const [isCustomPinsExpanded, setIsCustomPinsExpanded] = useState(false);
  const [currentWeatherVector, setCurrentWeatherVector] = useState<WeatherVector>({
    windSpeedKnots: 14,
    windGustKnots: 20,
    windDirectionDeg: 240,
    tempC: 21,
    humidity: 48
  });
  const [wildfireAgeFilter, setWildfireAgeFilter] = useState<'all' | '6h' | '12h' | '24h'>('all');
  const [spreadHorizonFilter, setSpreadHorizonFilter] = useState<'all' | '+1h' | '+3h' | '+6h' | '+12h'>('all');

  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);

  // Geofencing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [hoveredLegendLayer, setHoveredLegendLayer] = useState<string | null>(null);

  const getOpacity = (layerName: string, defaultOpacity = 1) => {
    if (hoveredLegendLayer && hoveredLegendLayer !== layerName) return 0.1;
    return defaultOpacity;
  };

  const [currentPolygon, setCurrentPolygon] = useState<[number, number][]>([]);
  const [geofences, setGeofences] = useState<[number, number][][]>([]);
  const [alerts, setAlerts] = useState<{ id: string, message: string, time: number }[]>([]);
  const [isDownloaderOpen, setIsDownloaderOpen] = useState(false);

  const [pinCreationMode, setPinCreationMode] = useState<{lat: number, lon: number} | null>(null);
  const [pinLabel, setPinLabel] = useState('');
  const [pinDescription, setPinDescription] = useState('');
  const [isDroppingPin, setIsDroppingPin] = useState(false);
  const [pinColor, setPinColor] = useState('#a855f7');
  const [pinCategory, setPinCategory] = useState('Tactical');
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [currentBbox, setCurrentBbox] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDroppingPin(false);
        setPinCreationMode(null);
        setEditingPinId(null);
        setShowToolsMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [downloadBbox, setDownloadBbox] = useState<string | null>(null);

  
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [legendScale, setLegendScale] = useState(1);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowDimensions({ width: w, height: h });
      setLegendScale(Math.min(1.05, Math.max(0.65, w / 1920)));
      try {
        mapRef.current?.resize();
      } catch (e) {}
    };
    handleResize();
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsLegendCollapsed(true);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dynamicC2Left = useMemo(() => {
    if (windowDimensions.width < 640) return '8px';
    if (isLegendCollapsed) return '16px';
    return windowDimensions.width < 768 ? '336px' : '400px';
  }, [windowDimensions.width, isLegendCollapsed]);

  const headerTier = useMemo<'full' | 'standard' | 'compact' | 'minimal' | 'mobile'>(() => {
    const w = windowDimensions.width;
    if (w >= 1480) return 'full';
    if (w >= 1180) return 'standard';
    if (w >= 900) return 'compact';
    if (w >= 640) return 'minimal';
    return 'mobile';
  }, [windowDimensions.width]);

  
  // Hardcoded for now. Wait, how do we know if premium?
  // User asked us to "Only make this available to premium clients"
  // Since we don't have a real auth context, let's mock it.
  const isPremiumClient = true; // Set to false to test restriction
  const clientId = "client_premium_123";


  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(prev => prev.filter(a => Date.now() - a.time < 5000));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  // Fetch latest RainViewer radar path
  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
          const latestPath = data.radar.past[data.radar.past.length - 1].path;
          const host = data.host || 'https://tilecache.rainviewer.com';
          // color scheme 2 (Universal Blue), smooth 1_1
          setWeatherRadarUrl(`${host}${latestPath}/256/{z}/{x}/{y}/2/1_1.png`);
        } else {
          throw new Error('No radar past frames');
        }
      })
      .catch(() => {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (!isLocal) return;
        fetch('http://127.0.0.1:3117/api/osint/weather-radar')
          .then(res => res.json())
          .then(d => {
            if (d && d.tileUrl) setWeatherRadarUrl(d.tileUrl);
          })
          .catch(err => console.warn('[Sphinx GL] Failed to fetch weather radar metadata:', err));
      });
  }, []);

  const updateBbox = useCallback(() => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getMap().getBounds();
    const w = bounds.getWest();
    const s = bounds.getSouth();
    const e = bounds.getEast();
    const n = bounds.getNorth();
    bboxRef.current = `${w},${s},${e},${n}`;
    setCurrentBbox([w, s, e, n]);
  }, []);

  const loadAircraft = useCallback(async () => {
    if (!bboxRef.current) return;
    try {
      const geojsonFeatures = await GlobalDataEngine.fetchGlobalAircraft(bboxRef.current);
      setAircraftFeatures(geojsonFeatures);

      // Check for Geofence Alerts
      if (geofences.length > 0) {
        geojsonFeatures.forEach((f: any) => {
          for (let i = 0; i < geofences.length; i++) {
            if (isPointInPolygon(f.geometry.coordinates as [number, number], geofences[i])) {
              const msg = `Aircraft ${f.properties.callsign} entered Watch Zone ${i + 1}`;
              setAlerts(prev => {
                if (prev.some(a => a.message === msg)) return prev;
                return [...prev, { id: Math.random().toString(), message: msg, time: Date.now() }].slice(-5);
              });
              break;
            }
          }
        });
      }
    } catch (e) {
      console.warn('[Sphinx GL] Failed to fetch aircraft data', e);
    }
  }, [geofences]);

  const loadWatchtowerData = useCallback(async () => {
    if (!bboxRef.current) return;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal) return;
    const map = mapRef.current?.getMap();
    
    if (map && map.getZoom() >= 5) {
      try {
        const d = await fetch(`http://127.0.0.1:3117/api/osint/celltowers?bbox=${bboxRef.current}`).then(r => r.json());
        if (!d.error) setCellTowerFeatures(d.features || []);
      } catch (e) {
        console.warn('[Sphinx GL] Failed to fetch celltowers', e);
      }
    } else {
      setCellTowerFeatures([]);
    }

    // Removed zoom < 9 restriction so global infrastructure (HAARP, Data Centers) can load anywhere

    if (fetchingOverpassRef.current) {
      pendingOverpassRef.current = true;
      return;
    }

    try {
      fetchingOverpassRef.current = true;
      setIsFetchingOverpass(true);
      setOverpassError(null);
      const overpass = await fetch(`http://127.0.0.1:3117/api/osint/overpass?bbox=${bboxRef.current}`).then(r => r.json());
      if (!overpass.error) {
        if (overpass.springs) setSpringFeatures(overpass.springs.features || []);
        if (overpass.power) setPowerFeatures(overpass.power.features || []);
        if (overpass.aviation) setAviationFeatures(overpass.aviation.features || []);
        if (overpass.emergency) setEmergencyFeatures(overpass.emergency.features || []);
        if (overpass.cameras) setCameraFeatures(overpass.cameras.features || []);
        if (overpass.weather_stations) setWeatherStationFeatures(overpass.weather_stations.features || []);
        if (overpass.data_centers) setDataCenterFeatures(overpass.data_centers.features || []);
        if (overpass.radars) setRadarFeatures(overpass.radars.features || []);
        if (overpass.public_lands) setPublicLandFeatures(overpass.public_lands.features || []);
        if (overpass.campsites) setCampsiteFeatures(overpass.campsites.features || []);
        if (overpass.trails) setTrailFeatures(overpass.trails.features || []);
      } else {
        console.warn('[Sphinx GL] Backend Overpass API returned error:', overpass.message);
        setOverpassError(overpass.message);
      }
    } catch (e: any) {
      console.warn('[Sphinx GL] Failed to fetch overpass data', e);
      setOverpassError(e.message || 'Network error');
    } finally {
      fetchingOverpassRef.current = false;
      setIsFetchingOverpass(false);
      if (pendingOverpassRef.current) {
        pendingOverpassRef.current = false;
        setTimeout(() => loadWatchtowerData(), 300);
      }
    }
  }, []);

  const loadHighPriorityData = useCallback(async (forceWildfires = false) => {
    try {
      loadAircraft();
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      (isLocal ? fetch(`http://127.0.0.1:3117/api/osint/wildfires${forceWildfires ? '?refresh=1' : ''}`) : fetch('/sphinx/data/wildfires.geojson'))
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then(d => setWildfireFeatures(d.features || []))
        .catch(() => {
          fetch('/sphinx/data/wildfires.geojson')
            .then(r => r.json())
            .then(d => setWildfireFeatures(d.features || []))
            .catch(e => console.warn('[Sphinx GL] Failed to fetch wildfires', e));
        });

      if (isLocal) {
        fetch(`http://127.0.0.1:3117/api/osint/lightning?bbox=${bboxRef.current || ''}`)
          .then(r => r.json())
          .then(d => setLightningFeatures(d.features || []))
          .catch(e => console.warn('[Sphinx GL] Failed to fetch lightning', e));

        fetch(`http://127.0.0.1:3117/api/osint/road-closures?bbox=${bboxRef.current || ''}`)
          .then(r => r.ok ? r.json() : fetch('/sphinx/data/road_closures.geojson').then(res => res.json()))
          .then(d => setRoadClosuresData(d))
          .catch(() => fetch('/sphinx/data/road_closures.geojson').then(r => r.json()).then(setRoadClosuresData).catch(() => {}));
      }
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load high-priority data', e);
    }
  }, [loadAircraft]);

  const loadMediumPriorityData = useCallback(async () => {
    try {
      GlobalDataEngine.fetchGlobalVessels(bboxRef.current)
        .then(f => setVesselFeatures(f))
        .catch(() => {});

      GlobalDataEngine.fetchGlobalDisasters(timeframe)
        .then(f => setDisasterFeatures(f))
        .catch(() => {});

      GlobalDataEngine.fetchGlobalEarthquakes(timeframe)
        .then(f => setEarthquakeFeatures(f))
        .catch(() => {});

      fetch(`http://127.0.0.1:3117/api/osint/obscura`)
        .then(r => r.ok ? r.json() : { features: [] })
        .then(d => setObscuraFeatures(d.features || []))
        .catch(() => {});
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load medium-priority data', e);
    }
  }, [timeframe]);

  const loadLowPriorityData = useCallback(async () => {
    try {
      fetch('/sphinx/data/submarine_cables.geojson')
        .then(r => r.json())
        .then(d => setCableFeatures(d.features || []))
        .catch(() => {});

      fetch('/sphinx/data/landing_points.geojson')
        .then(r => r.json())
        .then(d => setLandingPointFeatures(d.features || []))
        .catch(() => {});

      fetch('/sphinx/data/snowboard_resorts_global.geojson')
        .then(r => r.ok ? r.json() : fetch('/data/snowboard_resorts_global.geojson').then(r2 => r2.ok ? r2.json() : null))
        .then(d => { if (d && d.features) setGlobalSnowboardResorts(d); })
        .catch(() => {});

      fetch('/sphinx/data/resorts/mt_baldy_pistes_lifts.geojson')
        .then(r => r.ok ? r.json() : fetch('/data/resorts/mt_baldy_pistes_lifts.geojson').then(r2 => r2.ok ? r2.json() : null))
        .then(d => { if (d && d.features) setResortPistesLiftsData(d); })
        .catch(() => {});

      GlobalDataEngine.fetchGlobalPublicLands(bboxRef.current)
        .then(d => setPublicLandFeatures(d.features || []))
        .catch(() => {});

      GlobalDataEngine.fetchGlobalToxicSites(bboxRef.current)
        .then(feats => setToxicSiteFeatures(feats))
        .catch(() => {});

      loadWatchtowerData();
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load low-priority data', e);
    }
  }, [loadWatchtowerData]);

  const updateWeatherVector = useCallback(async (lat: number, lon: number) => {
    try {
      let data: any = null;
      try {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (isLocal) {
          const coreRes = await fetch(`http://127.0.0.1:3117/api/osint/weather-forecast?lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}`);
          if (coreRes.ok) data = await coreRes.json();
        }
      } catch (e) {}

      if (!data) {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}&longitude=${lon.toFixed(3)}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kn`);
        if (res.ok) data = await res.json();
      }

      if (data) {
        const curr = data.current || {};
        const speed = Number(curr.windSpeedKnots ?? curr.wind_speed_10m) || 12;
        const gust = Number(curr.windGustKnots ?? curr.wind_gusts_10m) || speed * 1.35;
        const dir = Number(curr.windDirectionDeg ?? curr.wind_direction_10m) || 240;
        const temp = Number(curr.tempC ?? curr.temperature_2m) || 20;
        const hum = Number(curr.humidity ?? curr.relative_humidity_2m) || 50;

        setCurrentWeatherVector({
          windSpeedKnots: Math.round(speed * 10) / 10,
          windGustKnots: Math.round(gust * 10) / 10,
          windDirectionDeg: Math.round(dir),
          tempC: Math.round(temp * 10) / 10,
          humidity: Math.round(hum)
        });
      }
    } catch (err) {
      console.warn('[Sphinx GL] Weather update error:', err);
    }
  }, []);

  const handleSeamlessRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      updateBbox();
      await Promise.allSettled([
        loadHighPriorityData(true),
        loadMediumPriorityData(),
        loadLowPriorityData(),
        updateWeatherVector(viewState.latitude, viewState.longitude)
      ]);
      setLastRefreshedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn('[Sphinx GL] Seamless refresh error', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  }, [loadHighPriorityData, loadMediumPriorityData, loadLowPriorityData, updateWeatherVector, updateBbox, viewState.latitude, viewState.longitude]);

  const handleExecuteMapAction = useCallback((action: MapAction) => {
    if (action.type === 'FLY_TO' && action.payload) {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [action.payload.lon, action.payload.lat],
          zoom: action.payload.zoom || 14,
          duration: 2200
        });
      }
    } else if (action.type === 'LOAD_CRIME' && action.payload?.crimeData) {
      setActiveCityCrime(action.payload.crimeData);
      setCrimeData(action.payload.crimeData.incidents || []);
      if (!settings.layers.crime_live) {
        updateSettings({
          layers: { ...settings.layers, crime_live: true }
        });
      }
    }
  }, [settings, updateSettings]);

  useEffect(() => {
    let highInterval: NodeJS.Timeout;
    let medInterval: NodeJS.Timeout;
    let lowInterval: NodeJS.Timeout;

    updateBbox();
    if (bboxRef.current) {
      loadHighPriorityData();
      loadMediumPriorityData();
      loadLowPriorityData();
    }
    updateWeatherVector(viewState.latitude, viewState.longitude);

    if (timeframe === 'live') {
      // Tier 1: High Sensitivity (Wildfires, Aircraft, Lightning) - 30s
      highInterval = setInterval(() => {
        loadHighPriorityData();
      }, 30000);

      // Tier 2: Medium Sensitivity (Vessels, Earthquakes, Disasters) - 90s
      medInterval = setInterval(() => {
        loadMediumPriorityData();
      }, 90000);

      // Tier 3: Low Sensitivity (Infrastructure, Cables, Watchtower) - 10m
      lowInterval = setInterval(() => {
        loadLowPriorityData();
      }, 600000);
    }

    return () => {
      clearInterval(highInterval);
      clearInterval(medInterval);
      clearInterval(lowInterval);
    };
  }, [timeframe, loadHighPriorityData, loadMediumPriorityData, loadLowPriorityData, updateWeatherVector, updateBbox]);

  useEffect(() => {
    getCityCrimeData('Chicago', 41.8781, -87.6298).then(data => {
      setActiveCityCrime(data);
      setCrimeData(data.incidents || []);
    });
  }, []);

  useEffect(() => {
    const unsub = offlineMesh.subscribe((event) => {
      if (event.type === 'THREAT_REPORT' && event.payload) {
        setCitizenReports(prev => [event.payload, ...prev]);
      }
    });
    const unsubPeers = offlineMesh.subscribePeersCount((count) => {
      setMeshPeersCount(count);
    });
    return () => {
      unsub();
      unsubPeers();
    };
  }, []);

  const handleSelectCityCrime = useCallback(async (cityName: string, lat?: number, lon?: number) => {
    console.log('[SphinxMap] handleSelectCityCrime called with:', cityName, lat, lon);
    let targetLat = lat;
    let targetLon = lon;
    if (!targetLat || !targetLon) {
      const match = PRESET_METRO_NEIGHBORHOODS[cityName.toLowerCase()];
      if (match && match.length > 0) {
        targetLat = match[0].lat;
        targetLon = match[0].lon;
      } else {
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(cityName)}&limit=1`);
          const geo = await res.json();
          if (geo?.features?.[0]?.geometry?.coordinates) {
            targetLon = geo.features[0].geometry.coordinates[0];
            targetLat = geo.features[0].geometry.coordinates[1];
          }
        } catch (e) {}
        if (!targetLat || !targetLon) {
          targetLat = viewState.latitude;
          targetLon = viewState.longitude;
        }
      }
    }
    handleJumpTo({ lat: targetLat!, lon: targetLon!, zoom: 12 });
    const data = await getCityCrimeData(cityName, targetLat!, targetLon!);
    console.log('[SphinxMap] handleSelectCityCrime got data city:', data.city);
    setActiveCityCrime(data);
    setCrimeData(data.incidents || []);
  }, [handleJumpTo, viewState.latitude, viewState.longitude]);

  const handleSelectNeighborhood = useCallback((n: NeighborhoodProfile) => {
    handleJumpTo({ lat: n.lat, lon: n.lon, zoom: 14 });
  }, [handleJumpTo]);

  const handleSubmitCitizenReport = useCallback((report: CitizenReport) => {
    setCitizenReports(prev => [report, ...prev]);
    offlineMesh.broadcastThreat(report);
    const newPin: CustomPin = {
      id: report.id,
      label: `[RECON] ${report.title}`,
      description: `${report.description} (${report.confidenceScore}% confidence)`,
      lat: report.lat,
      lon: report.lon,
      color: report.type === 'camera' ? '#06b6d4' : report.type === 'hazard' ? '#ef4444' : '#f59e0b',
      category: 'Recon',
      createdAt: report.timestamp
    };
    updateSettings({
      custom_pins: [...settings.custom_pins, newPin]
    });
  }, [settings.custom_pins, updateSettings]);

  const onMapClick = (e: any) => {

    if (pickingRoutingPoint) {
      setPickedRoutingPoint({
        target: pickingRoutingPoint,
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      });
      setPickingRoutingPoint(null);
      return;
    }

    if (isDroppingPin || e.originalEvent?.shiftKey) {
      setPinCreationMode({ lat: e.lngLat.lat, lon: e.lngLat.lng });
      setPinLabel('');
      setPinDescription('');
      setPinColor('#a855f7');
      setPinCategory('Tactical');
      setEditingPinId(null);
      setIsDroppingPin(false);
      return;
    }

    if (isDrawing) {
      const coord: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      setCurrentPolygon(prev => [...prev, coord]);
      return;
    }

    const features = e.features;
    if (features && features.length > 0) {
      const feature = features[0];
      
      // Handle cluster clicks for seamless zooming
      if (feature.layer.id === 'cell-tower-cluster' || feature.layer.id === 'spring-cluster' || feature.layer.id === 'snowboard-resorts-cluster') {
        const clusterId = feature.properties.cluster_id;
        const sourceId = feature.layer.source;
        const map = mapRef.current.getMap();
        
        map.getSource(sourceId).getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
          if (err) return;
          map.easeTo({
            center: feature.geometry.coordinates,
            zoom: zoom + 0.5,
            duration: 500
          });
        });
        return; // Don't show popup for clusters
      }

      if (feature.layer?.id?.startsWith('snowboard-resorts')) {
        const coords = (feature.geometry as any)?.coordinates;
        setSelectedSnowboardResort({
          ...feature.properties,
          lng: Number(feature.properties.lng ?? coords?.[0] ?? e.lngLat.lng),
          lat: Number(feature.properties.lat ?? coords?.[1] ?? e.lngLat.lat)
        });
        setSelectedFeature(null);
        return;
      }
      setSelectedSnowboardResort(null);

      setSelectedFeature({
        properties: feature.properties,
        layerId: feature.layer.id,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      });
    } else {
      setSelectedFeature(null);
      setSelectedSnowboardResort(null);
    }
  };

  const getFeatureAgeHours = (f: any, now: number): number => {
    const p = f?.properties || {};
    if (typeof p.ageHours === 'number') return p.ageHours;
    if (typeof p.age_hours === 'number') return p.age_hours;
    let ts = 0;
    if (p.acq_datetime_iso) ts = Date.parse(p.acq_datetime_iso) || 0;
    else if (p.acq_date && p.acq_time) {
      const tClean = String(p.acq_time).replace(':', '').padStart(4, '0');
      ts = Date.parse(`${p.acq_date}T${tClean.slice(0, 2)}:${tClean.slice(2, 4)}:00Z`) || 0;
    } else if (p.acq_date) ts = Date.parse(`${p.acq_date}T00:00:00Z`) || 0;
    return ts > 0 ? Math.max(0, (now - ts) / (1000 * 3600)) : 12;
  };

  const visibleCounts = React.useMemo(() => ({
    custom_pins: settings.custom_pins?.length || 0,
    springs: springFeatures.length,
    cellTowers: cellTowerFeatures.length,
    earthquakes: earthquakeFeatures.length,
    disasters: disasterFeatures.length,
    aircraft: aircraftFeatures.length,
    power: powerFeatures.length,
    aviation: aviationFeatures.length,
    emergency: emergencyFeatures.length,
    cameras: cameraFeatures.length + VERIFIED_SURVEILLANCE_REGISTRY.length,
    weather_stations: weatherStationFeatures.length,
    data_centers: dataCenterFeatures.length,
    radars: radarFeatures.length,
    public_lands: publicLandFeatures.length,
    campsites: campsiteFeatures.length,
    trails: trailFeatures.length,
    snowboard_resorts: globalSnowboardResorts?.features?.length || 6296,
    submarine_cables: cableFeatures.length,
    landing_points: landingPointFeatures.length,
    wildfires: (() => {
      if (wildfireAgeFilter === 'all') return wildfireFeatures.length;
      const maxH = wildfireAgeFilter === '6h' ? 6 : wildfireAgeFilter === '12h' ? 12 : 24;
      const now = Date.now();
      return wildfireFeatures.filter((f: any) => getFeatureAgeHours(f, now) <= maxH).length;
    })(),
    fire_spread_forecast: settings.layers.fire_spread_forecast ? Math.min(wildfireFeatures.length, 60) * (spreadHorizonFilter === 'all' ? 4 : 1) : 0,
    vessels: vesselFeatures.length,
    atlas_obscura: obscuraFeatures.length,
    lightning: lightningFeatures.length,
    crime_live: activeCityCrime?.totalIncidents || crimeData.length,
    road_closures: roadClosuresData?.features?.filter((f: any) => f.geometry.type === 'Point').length || 8,
    toxic_sites: GLOBAL_TOXIC_SITES.length,
  }), [
    settings.custom_pins, settings.layers.fire_spread_forecast, springFeatures, cellTowerFeatures, earthquakeFeatures,
    disasterFeatures, aircraftFeatures, powerFeatures, aviationFeatures,
    emergencyFeatures, cameraFeatures, weatherStationFeatures, dataCenterFeatures,
    radarFeatures, publicLandFeatures, campsiteFeatures, trailFeatures,
    cableFeatures, landingPointFeatures, wildfireFeatures, vesselFeatures, obscuraFeatures,
    lightningFeatures, wildfireAgeFilter, spreadHorizonFilter
  ]);
  
  const cellTowersData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: cellTowerFeatures }), [cellTowerFeatures]);
  const springData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: springFeatures }), [springFeatures]);
  const aircraftData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aircraftFeatures }), [aircraftFeatures]);
  const disasterData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: disasterFeatures }), [disasterFeatures]);
  const earthquakeData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: earthquakeFeatures }), [earthquakeFeatures]);
  const powerData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: powerFeatures }), [powerFeatures]);
  const aviationData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aviationFeatures }), [aviationFeatures]);
  const emergencyData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: emergencyFeatures }), [emergencyFeatures]);
  const { cameraCollection: cameraData, fovCollection: cameraFovData } = React.useMemo(() => {
    const enriched = cameraFeatures.length > 0 ? enrichOsmCameras(cameraFeatures) : [];
    return buildSurveillanceGeoJson(enriched);
  }, [cameraFeatures]);
  const weatherStationData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: weatherStationFeatures }), [weatherStationFeatures]);
  const dataCenterData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: dataCenterFeatures }), [dataCenterFeatures]);
  const radarData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: radarFeatures }), [radarFeatures]);
  const publicLandData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: publicLandFeatures }), [publicLandFeatures]);
  const campsiteData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: campsiteFeatures }), [campsiteFeatures]);
  const trailData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: trailFeatures }), [trailFeatures]);
  const cableData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: cableFeatures }), [cableFeatures]);
  const landingPointData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: landingPointFeatures }), [landingPointFeatures]);
  const parsedWildfires = React.useMemo(() => {
    const now = Date.now();
    return wildfireFeatures.map((f: any) => {
      const p = f.properties || {};
      const roundedAge = Math.round(getFeatureAgeHours(f, now) * 10) / 10;
      const isFresh = roundedAge <= 6;
      const isRecent = roundedAge <= 12;
      return {
        ...f,
        properties: {
          ...p,
          ageHours: roundedAge,
          isFresh,
          isRecent,
          freshnessCategory: isFresh ? 'fresh_6h' : isRecent ? 'recent_12h' : 'smoldering_24h'
        }
      };
    });
  }, [wildfireFeatures]);

  const filteredWildfires = React.useMemo(() => {
    if (wildfireAgeFilter === '6h') {
      return parsedWildfires.filter((f: any) => f.properties.ageHours <= 6);
    }
    if (wildfireAgeFilter === '12h') {
      return parsedWildfires.filter((f: any) => f.properties.ageHours <= 12);
    }
    if (wildfireAgeFilter === '24h') {
      return parsedWildfires.filter((f: any) => f.properties.ageHours <= 24);
    }
    return parsedWildfires;
  }, [parsedWildfires, wildfireAgeFilter]);

  const wildfireData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: filteredWildfires }), [filteredWildfires]);
  const fireSpreadData = React.useMemo(() => {
    if (!settings.layers.fire_spread_forecast || filteredWildfires.length === 0) {
      return { type: 'FeatureCollection' as const, features: [] };
    }
    return computeFireSpreadForecast(
      filteredWildfires,
      currentWeatherVector,
      60,
      currentBbox,
      spreadHorizonFilter
    );
  }, [settings.layers.fire_spread_forecast, filteredWildfires, currentWeatherVector, currentBbox, spreadHorizonFilter]);
  const vesselData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: vesselFeatures }), [vesselFeatures]);
  const obscuraData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: obscuraFeatures }), [obscuraFeatures]);
  const lightningData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: lightningFeatures }), [lightningFeatures]);
  const crimeGeoJson = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (crimeData || []).map((incident: any) => ({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: [incident.lon, incident.lat] },
      properties: { weight: incident.severity === 'high' ? 1.0 : incident.severity === 'medium' ? 0.6 : 0.3 }
    }))
  }), [crimeData]);

  const customPinsData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (settings.custom_pins || []).map((p: any) => ({
      type: 'Feature' as const,
      properties: { 
        ...p, 
        isCustomPin: true, 
        type: 'custom_pin',
        color: p.color || '#a855f7',
        category: p.category || 'Tactical'
      },
      geometry: { type: 'Point' as const, coordinates: [p.lon, p.lat] }
    }))
  }), [settings.custom_pins]);

  const directionsData = React.useMemo(() => directionsResult?.routeGeoJSON || { type: 'FeatureCollection' as const, features: [] }, [directionsResult]);
  const altRoutesData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (directionsResult?.alternativeRoutes || []).map((a: any) => ({
      type: 'Feature' as const,
      properties: { id: a.id, strategy: a.strategy },
      geometry: a.routeGeoJSON?.geometry || a.routeGeoJSON
    }))
  }), [directionsResult]);

  const snowboardResortsData = React.useMemo(() => globalSnowboardResorts || getSnowboardResortsGeoJSON(), [globalSnowboardResorts]);
  
  const geofencesData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: geofences.map((poly, i) => ({
      type: 'Feature' as const,
      properties: { id: i },
      geometry: { type: 'Polygon' as const, coordinates: [[...poly, poly[0]]] }
    }))
  }), [geofences]);
  const currentGeofenceData = React.useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: { type: 'LineString' as const, coordinates: currentPolygon }
  }), [currentPolygon]);

  const transformRequest = useCallback((url: string) => {
    if (url.startsWith('mapbox://styles/') && MAPBOX_TOKEN) {
      return { url: `https://api.mapbox.com/styles/v1/${url.replace('mapbox://styles/', '')}?access_token=${MAPBOX_TOKEN}` };
    }
    if (url.startsWith('mapbox://fonts/') && MAPBOX_TOKEN) {
      return { url: `https://api.mapbox.com/fonts/v1/${url.replace('mapbox://fonts/', '')}?access_token=${MAPBOX_TOKEN}` };
    }
    if (url.startsWith('mapbox://sprites/') && MAPBOX_TOKEN) {
      return { url: `https://api.mapbox.com/styles/v1/${url.replace('mapbox://sprites/', '')}?access_token=${MAPBOX_TOKEN}` };
    }
    return { url };
  }, []);

  if (!isWebGLSupported) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-neutral-950 text-white p-6 text-center">
        <div className="max-w-md bg-neutral-900 border border-red-500/30 rounded-xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ⚠
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">WebGL Disabled or Not Supported</h2>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            MapLibre GL requires WebGL to render map tiles and vectors. Chrome currently reports WebGL as disabled.
          </p>
          <div className="bg-neutral-950 border border-white/10 rounded-lg p-4 text-left text-xs text-gray-400 mb-6 space-y-2">
            <p className="font-semibold text-gray-200">To enable WebGL in Chrome:</p>
            <ol className="list-decimal list-inside space-y-1.5">
              <li>Open a new tab and go to <code className="text-sky-400 select-all">chrome://settings/system</code></li>
              <li>Toggle ON <strong>&quot;Use graphics acceleration when available&quot;</strong></li>
              <li>Click <strong>Relaunch</strong> Chrome</li>
            </ol>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-emerald-900/30"
          >
            Retry / Reload Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Map
        ref={mapRef}
        {...viewState}
        transformRequest={transformRequest}
        onError={(e) => {
          console.error("MapLibre GL Error:", e);
          if (e?.error?.message?.includes('WebGL') || (e as any)?.statusMessage?.includes('WebGL')) {
            setIsWebGLSupported(false);
          }
        }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={isOfflineMode ? "http://localhost:3117/api/tiles/style.json" as any : BASE_MAP_STYLE as any}
        onLoad={(e) => {
          const map = e.target;
          if (typeof window !== 'undefined') {
            (window as any)._sphinxMap = map;
          }
          map.on('styleimagemissing', (evt: any) => {
            const id = evt.id;
            if (id === 'plane-icon' && !map.hasImage(id)) {
              const img = new Image(24, 24);
              img.onload = () => {
                if (!map.hasImage(id)) map.addImage(id, img, { sdf: true });
              };
              img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>';
            }
            if (id === 'boat-icon' && !map.hasImage(id)) {
              const img = new Image(24, 24);
              img.onload = () => {
                if (!map.hasImage(id)) map.addImage(id, img, { sdf: true });
              };
              img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 9H9L12 2zm-8 9h16l-3 9H7l-3-9z"/></svg>';
            }
          });
          
          if (!map.hasImage('plane-icon')) {
            const img = new Image(24, 24);
            img.onload = () => { if (!map.hasImage('plane-icon')) map.addImage('plane-icon', img, { sdf: true }); };
            img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>';
          }
          if (!map.hasImage('boat-icon')) {
            const bImg = new Image(24, 24);
            bImg.onload = () => { if (!map.hasImage('boat-icon')) map.addImage('boat-icon', bImg, { sdf: true }); };
            bImg.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 9H9L12 2zm-8 9h16l-3 9H7l-3-9z"/></svg>';
          }
          updateBbox();
          if (typeof window !== 'undefined') (window as any).__sphinxMap = map;
          loadHighPriorityData();
          loadMediumPriorityData();
          loadLowPriorityData();
        }}
        onMoveEnd={(evt) => {
          if (evt?.viewState && typeof window !== 'undefined') {
            try { localStorage.setItem('sphinx_last_view_state', JSON.stringify(evt.viewState)); } catch {}
          }
          updateBbox();
          
          // Debounce network fetches on map movement to prevent 429 rate limits
          if ((window as any).moveDebounce) clearTimeout((window as any).moveDebounce);
          (window as any).moveDebounce = setTimeout(() => {
            loadHighPriorityData();
            loadMediumPriorityData();
            loadLowPriorityData();
            if (evt?.viewState) {
              updateWeatherVector(evt.viewState.latitude, evt.viewState.longitude);
              setAuditResult(GlobalDataEngine.auditViewport(evt.viewState.latitude, evt.viewState.longitude, {
                aircraft: aircraftFeatures.length,
                vessels: vesselFeatures.length,
                droneDocks: 20,
                cameras: cameraFeatures.length,
                wildfires: wildfireFeatures.length,
                disasters: disasterFeatures.length
              }));
            }
          }, 1500);
        }}
        onClick={onMapClick}
        onContextMenu={(e: any) => {
          e.preventDefault();
          setPinCreationMode({ lat: e.lngLat.lat, lon: e.lngLat.lng });
          setPinLabel('');
          setPinDescription('');
          setPinColor('#a855f7');
          setPinCategory('Tactical');
          setEditingPinId(null);
          setIsDroppingPin(false);
        }}
        cursor={isDroppingPin ? 'crosshair' : undefined}
        interactiveLayerIds={INTERACTIVE_LAYER_IDS}
      >
        <Source id="geofences" type="geojson" data={geofencesData}>
          <Layer id="geofence-fill" type="fill" paint={{ 'fill-color': '#ef4444', 'fill-opacity': 0.1 }} />
          <Layer id="geofence-line" type="line" paint={{ 'line-color': '#ef4444', 'line-width': 2, 'line-dasharray': [2, 2] }} />
        </Source>

        {currentPolygon.length > 0 && (
          <Source id="current-geofence" type="geojson" data={currentGeofenceData}>
            <Layer id="current-geofence-line" type="line" paint={{ 'line-color': '#4ade80', 'line-width': 2 }} />
          </Source>
        )}
        {!settings.layers.satellite && (
          <Source
            id="street-map"
            type="raster"
            tiles={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']}
            tileSize={256}
            maxzoom={19}
          >
            <Layer id="street-layer" type="raster" beforeId="geofence-fill" />
          </Source>
        )}

        {settings.layers.satellite && (
          <Source
            key={settings.satellite_provider || 'hd_arcgis'}
            id="satellite-imagery"
            type="raster"
            tiles={[
              settings.satellite_provider === 'nasa_viirs'
                ? `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${satelliteDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
                : settings.satellite_provider === 'nasa_modis'
                ? `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${satelliteDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`
                : settings.satellite_provider === 'goes_live'
                ? 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-east-vis-1km/{z}/{x}/{y}.png'
                : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ]}
            tileSize={256}
            maxzoom={19}
          >
            <Layer id="satellite-layer" type="raster" beforeId="geofence-fill" paint={{ 'raster-opacity': 1.0 }} />
          </Source>
        )}

        {settings.layers.boundaries && (
          <>
            <Source id="country-boundaries" type="geojson" data="/sphinx/data/boundaries_countries.geojson">
              <Layer
                id="country-boundary-lines"
                type="line"
                beforeId="geofence-fill"
                paint={{
                  'line-color': '#f59e0b',
                  'line-width': 1.5,
                  'line-opacity': 0.85
                }}
              />
            </Source>
            <Source id="state-boundaries" type="geojson" data="/sphinx/data/boundaries_states.geojson">
              <Layer
                id="state-boundary-lines"
                type="line"
                beforeId="geofence-fill"
                paint={{
                  'line-color': '#cbd5e1',
                  'line-width': 1,
                  'line-dasharray': [3, 2],
                  'line-opacity': 0.75
                }}
              />
            </Source>
          </>
        )}

        {settings.layers.labels && settings.layers.satellite && (
          <>
            <Source
              id="map-roads-labels"
            type="raster"
            tiles={[
              'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
            ]}
            tileSize={256}
            maxzoom={19}
          >
            <Layer id="map-roads-labels-layer" type="raster" beforeId="geofence-fill" paint={{ 'raster-opacity': 0.95 }} />
          </Source>
          <Source
            id="map-places-labels"
            type="raster"
            tiles={[
              'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
            ]}
            tileSize={256}
            maxzoom={19}
          >
            <Layer id="map-places-labels-layer" type="raster" beforeId="geofence-fill" paint={{ 'raster-opacity': 0.95 }} />
          </Source>
        </>
      )}

        {settings.layers.weather_radar && weatherRadarUrl && (
          <Source id="weather-radar" type="raster" tiles={[weatherRadarUrl]} tileSize={256} maxzoom={7}>
            <Layer id="weather-radar-layer" type="raster" paint={{ 'raster-opacity': 0.65 }}  />
          </Source>
        )}
        {settings.layers.snowboard_trails && (
          <>
            <Source id="opensnowmap-pistes" type="raster" tiles={['https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png']} tileSize={256} minzoom={8} maxzoom={18}>
              <Layer id="snowboard-pistes-layer" type="raster" paint={{ 'raster-opacity': 0.88 }} />
            </Source>
            {resortPistesLiftsData && (
              <Source id="resort-pistes-lifts" type="geojson" data={resortPistesLiftsData}>
                <Layer 
                  id="resort-lifts-line" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'lift']}
                  paint={{
                    'line-color': '#f59e0b',
                    'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 3.5, 16, 5],
                    'line-dasharray': [2, 1.5]
                  }}
                />
                <Layer 
                  id="resort-pistes-line" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'piste']}
                  paint={{
                    'line-color': ['coalesce', ['get', 'color'], '#3b82f6'],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 4, 16, 6],
                    'line-opacity': 0.9
                  }}
                />
                <Layer 
                  id="resort-lifts-label" 
                  type="symbol" 
                  minzoom={12}
                  filter={['==', ['get', 'type'], 'lift']}
                  layout={{
                    'text-field': ['concat', '🚡 ', ['get', 'name']],
                    'text-size': 11,
                    'symbol-placement': 'line-center'
                  }}
                  paint={{
                    'text-color': '#fde047',
                    'text-halo-color': '#000000',
                    'text-halo-width': 2.5
                  }}
                />
                <Layer 
                  id="resort-pistes-label" 
                  type="symbol" 
                  minzoom={13}
                  filter={['==', ['get', 'type'], 'piste']}
                  layout={{
                    'text-field': ['get', 'name'],
                    'text-size': 10,
                    'symbol-placement': 'line'
                  }}
                  paint={{
                    'text-color': '#ffffff',
                    'text-halo-color': '#000000',
                    'text-halo-width': 2
                  }}
                />
              </Source>
            )}
          </>
        )}
        {settings.layers.aircraft && (
          <Source id="aircraft" type="geojson" data={aircraftData}>
            <Layer 
              id="aircraft-layer" 
              source="aircraft" 
              type="symbol" 
              layout={{ 
                'icon-image': 'plane-icon',
                'icon-size': 0.8,
                'icon-rotate': ['get', 'true_track'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true
              }} 
              paint={{
                'icon-color': '#00ffff',
                'icon-halo-color': '#000000',
                'icon-halo-width': 2
              }}
            />
          </Source>
        )}
        {settings.layers.cell_towers && (
          <Source 
            id="cell-towers" 
            type="geojson" 
            data={cellTowersData}
            cluster={settings.clustering_enabled}
            clusterMaxZoom={13}
            clusterRadius={50}
          >
            <Layer 
              id="cell-tower-cluster" 
              source="cell-towers" 
              type="circle" 
              filter={['has', 'point_count']}
              paint={{
                'circle-color': ['step', ['get', 'point_count'], '#d946ef', 10, '#c026d3', 50, '#a21caf'],
                'circle-radius': ['step', ['get', 'point_count'], 12, 10, 16, 50, 20],
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2
              }}
            />
            <Layer 
              id="cell-tower-cluster-count" 
              source="cell-towers" 
              type="symbol" 
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-size': 12,
                'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']
              }}
              paint={{ 'text-color': '#ffffff' }}
            />
            <Layer 
              id="cell-tower-layer" 
              source="cell-towers" 
              type="circle" 
              filter={['!', ['has', 'point_count']]}
              paint={{ 
                'circle-radius': ['case', ['==', ['get', 'is_physical'], true], 6, 4], 
                'circle-color': ['case', ['==', ['get', 'is_physical'], true], '#ff00ff', '#a855f7'], 
                'circle-stroke-color': '#ffffff', 
                'circle-stroke-width': ['case', ['==', ['get', 'is_physical'], true], 2, 0.5],
                'circle-opacity': ['case', ['==', ['get', 'is_physical'], true], 1.0, 0.4]
              }} 
            />
          </Source>
        )}
        {settings.layers.springs && (
          <Source 
            id="springs" 
            type="geojson" 
            data={springData}
            cluster={settings.clustering_enabled}
            clusterMaxZoom={13}
            clusterRadius={50}
          >
            <Layer 
              id="spring-cluster" 
              source="springs" 
              type="circle" 
              filter={['has', 'point_count']}
              paint={{
                'circle-color': ['step', ['get', 'point_count'], '#60a5fa', 10, '#3b82f6', 50, '#2563eb'],
                'circle-radius': ['step', ['get', 'point_count'], 12, 10, 16, 50, 20],
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2
              }}
            />
            <Layer 
              id="spring-cluster-count" 
              source="springs" 
              type="symbol" 
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-size': 12,
                'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']
              }}
              paint={{ 'text-color': '#ffffff' }}
            />
            <Layer 
              id="spring-layer" 
              source="springs" 
              type="circle" 
              filter={['!', ['has', 'point_count']]}
              paint={{ 'circle-radius': 4, 'circle-color': '#3b82f6' }} 
            />
          </Source>
        )}
        {settings.layers.power && (
          <Source id="power" type="geojson" data={powerData}>
            <Layer id="power-layer" source="power" type="circle" paint={{ 'circle-radius': 5, 'circle-color': '#eab308', 'circle-opacity': getOpacity('power')  }} />
          </Source>
        )}
        {settings.layers.aviation && (
          <Source id="aviation" type="geojson" data={aviationData}>
            <Layer id="aviation-layer" source="aviation" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#f87171', 'circle-opacity': getOpacity('aviation')  }} />
          </Source>
        )}
        {settings.layers.emergency && (
          <Source id="emergency" type="geojson" data={emergencyData}>
            <Layer id="emergency-layer" source="emergency" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#10b981', 'circle-opacity': getOpacity('emergency')  }} />
          </Source>
        )}
        {settings.layers.cameras && (
          <Source id="camera-fovs" type="geojson" data={cameraFovData}>
            <Layer id="camera-fov-layer" source="camera-fovs" type="fill" minzoom={11} paint={{ 'fill-color': ['get', 'color'], 'fill-opacity': 0.35 }} />
            <Layer id="camera-fov-line-layer" source="camera-fovs" type="line" minzoom={11} paint={{ 'line-color': ['get', 'color'], 'line-width': 2, 'line-opacity': 0.95 }} />
          </Source>
        )}
        {settings.layers.cameras && (
          <Source id="cameras" type="geojson" data={cameraData}>
            <Layer
              id="camera-layer"
              source="cameras"
              type="circle"
              minzoom={8}
              paint={{
                'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, 4.5, 12, 6.5, 15, 8.5],
                'circle-color': CAMERA_CIRCLE_COLOR_EXPR,
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#020617',
                'circle-opacity': getOpacity('cameras')
              }}
            />
            <Layer
              id="camera-label-layer"
              source="cameras"
              type="symbol"
              minzoom={14}
              layout={{
                'text-field': ['get', 'vendor_display'],
                'text-size': 9,
                'text-offset': [0, 1.4],
                'text-anchor': 'top'
              }}
              paint={{
                'text-color': '#f8fafc',
                'text-halo-color': '#020617',
                'text-halo-width': 1.5
              }}
            />
          </Source>
        )}
        {settings.layers.weather_stations && (
          <Source id="weather-stations" type="geojson" data={weatherStationData}>
            <Layer id="weather-station-layer" source="weather-stations" type="circle" paint={{ 'circle-radius': 5, 'circle-color': '#7dd3fc', 'circle-opacity': getOpacity('weather-stations')  }} />
          </Source>
        )}
        {settings.layers.data_centers && (
          <Source id="data-centers" type="geojson" data={dataCenterData}>
            <Layer id="data-center-layer" source="data-centers" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-opacity': getOpacity('data-centers')  }} />
          </Source>
        )}
        {settings.layers.radars && (
          <Source id="radars" type="geojson" data={radarData}>
            <Layer id="radar-layer" source="radars" type="circle" paint={{ 'circle-radius': 7, 'circle-color': '#f43f5e', 'circle-opacity': getOpacity('radars')  }} />
          </Source>
        )}
        {(settings.layers.public_lands || settings.layers.land_ownership) && (
          <Source id="public-lands" type="geojson" data={publicLandData}>
            <Layer id="public-land-fill" source="public-lands" type="fill" filter={['==', '$type', 'Polygon']} paint={{ 'fill-color': ['coalesce', ['get', 'color'], '#22c55e'], 'fill-opacity': 0.15 }} />
            <Layer id="public-land-line" source="public-lands" type="line" filter={['==', '$type', 'Polygon']} paint={{ 'line-color': ['coalesce', ['get', 'color'], '#16a34a'], 'line-width': 1.5, 'line-dasharray': [2, 2] }} />
            <Layer id="public-land-layer" source="public-lands" type="circle" filter={['==', '$type', 'Point']} paint={{ 'circle-radius': 6, 'circle-color': '#22c55e', 'circle-opacity': getOpacity('public-lands'), 'circle-stroke-width': 1, 'circle-stroke-color': '#166534'  }} />
          </Source>
        )}
        {settings.layers.campsites && (
          <Source id="campsites" type="geojson" data={campsiteData}>
            <Layer id="campsite-layer" source="campsites" type="circle" paint={{ 'circle-radius': 5, 'circle-color': '#f97316', 'circle-opacity': getOpacity('campsites')  }} />
          </Source>
        )}
        {settings.layers.trails && (
          <Source id="trails" type="geojson" data={trailData}>
            <Layer id="trail-layer" source="trails" type="circle" minzoom={9} paint={{ 'circle-radius': 3, 'circle-color': '#d97706', 'circle-opacity': getOpacity('trails')  }} />
          </Source>
        )}
        {settings.layers.snowboard_trails && (
          <Source 
            id="snowboard-resorts" 
            type="geojson" 
            data={snowboardResortsData}
            cluster={settings.clustering_enabled}
            clusterMaxZoom={10}
            clusterRadius={45}
          >
            <Layer 
              id="snowboard-resorts-cluster" 
              type="circle" 
              filter={['has', 'point_count']}
              paint={{
                'circle-color': ['step', ['get', 'point_count'], '#0284c7', 20, '#0369a1', 100, '#075985'],
                'circle-radius': ['step', ['get', 'point_count'], 14, 20, 18, 100, 24],
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2
              }}
            />
            <Layer 
              id="snowboard-resorts-cluster-count" 
              type="symbol" 
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-size': 11
              }}
              paint={{ 'text-color': '#ffffff' }}
            />
            <Layer 
              id="snowboard-resorts-halo" 
              type="circle" 
              filter={['!', ['has', 'point_count']]} 
              paint={{ 
                'circle-radius': 14, 
                'circle-color': '#06b6d4', 
                'circle-opacity': 0.35, 
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
            <Layer 
              id="snowboard-resorts-point" 
              type="circle" 
              filter={['!', ['has', 'point_count']]} 
              paint={{ 
                'circle-radius': 7, 
                'circle-color': '#0284c7', 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
            <Layer 
              id="snowboard-resorts-label" 
              type="symbol" 
              filter={['!', ['has', 'point_count']]} 
              minzoom={6}
              layout={{ 
                'text-field': ['concat', '🏂 ', ['get', 'name']],
                'text-size': 11,
                'text-offset': [0, 1.4],
                'text-anchor': 'top'
              }}
              paint={{ 
                'text-color': '#38bdf8',
                'text-halo-color': '#000000',
                'text-halo-width': 2
              }} 
            />
          </Source>
        )}
        {settings.layers.disasters && (
          <Source id="disasters" type="geojson" data={disasterData}>
            <Layer id="disaster-layer" source="disasters" type="circle" paint={{ 'circle-radius': 8, 'circle-color': '#ef4444', 'circle-opacity': getOpacity('disasters', 0.7) }} />
          </Source>
        )}
        
        {settings.layers.custom_pins && (
          <Source id="custom-pins" type="geojson" data={customPinsData}>
            <Layer 
              id="custom-pin-halo-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': 14, 
                'circle-color': ['coalesce', ['get', 'color'], '#a855f7'], 
                'circle-opacity': 0.35,
                'circle-stroke-width': 1.5,
                'circle-stroke-color': ['coalesce', ['get', 'color'], '#a855f7'],
                'circle-stroke-opacity': 0.8
              }} 
            />
            <Layer 
              id="custom-pin-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': 8, 
                'circle-color': ['coalesce', ['get', 'color'], '#a855f7'], 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
            <Layer
              id="custom-pin-label-layer"
              type="symbol"
              layout={{
                'text-field': ['get', 'label'],
                'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
                'text-size': 11,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-allow-overlap': true,
                'text-ignore-placement': true,
                'text-optional': false
              }}
              paint={{
                'text-color': '#ffffff',
                'text-halo-color': '#000000',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {settings.layers.earthquakes && (
          <Source id="earthquakes" type="geojson" data={earthquakeData}>
            <Layer 
              id="earthquake-layer" 
              source="earthquakes" 
              type="circle" 
              paint={{ 
                'circle-radius': ['interpolate', ['linear'], ['coalesce', ['get', 'mag'], 2], 1, 4, 3, 6, 5, 10, 7, 18], 
                'circle-color': ['interpolate', ['linear'], ['coalesce', ['get', 'mag'], 2], 2, '#eab308', 4, '#f97316', 6, '#ef4444', 8, '#dc2626'], 
                'circle-opacity': getOpacity('earthquakes', 0.85),
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#ffffff'
              }} 
            />
          </Source>
        )}

        {settings.layers.submarine_cables && (
          <Source id="submarine-cables" type="geojson" data={cableData}>
            <Layer 
              id="submarine-cable-layer" 
              type="line" 
              paint={{ 'line-color': '#06b6d4', 'line-width': 2, 'line-opacity': getOpacity('submarine_cables', 0.85) }} 
            />
          </Source>
        )}

        {settings.layers.submarine_cables && (
          <Source id="landing-points" type="geojson" data={landingPointData}>
            <Layer 
              id="landing-point-layer" 
              type="circle" 
              paint={{ 'circle-radius': 4, 'circle-color': '#22d3ee', 'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff', 'circle-opacity': getOpacity('submarine_cables', 0.9) }} 
            />
          </Source>
        )}

        {settings.layers.fire_spread_forecast && (
          <Source id="fire-spread-forecast" type="geojson" data={fireSpreadData}>
            <Layer
              id="fire-spread-fill"
              type="fill"
              filter={['==', ['get', 'isPerimeter'], true]}
              paint={{
                'fill-color': ['get', 'fillColor'],
                'fill-opacity': 0.85
              }}
            />
            <Layer
              id="fire-spread-line"
              type="line"
              filter={['==', ['get', 'isPerimeter'], true]}
              paint={{
                'line-color': ['get', 'strokeColor'],
                'line-width': 2,
                'line-dasharray': [3, 2]
              }}
            />
            <Layer
              id="fire-spread-label"
              type="symbol"
              filter={['==', ['get', 'isLabel'], true]}
              layout={{
                'text-field': ['get', 'labelText'],
                'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
                'text-size': 10,
                'text-allow-overlap': true,
                'text-ignore-placement': true,
                'text-optional': false
              }}
              paint={{
                'text-color': '#ffedd5',
                'text-halo-color': '#000000',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {settings.layers.wildfires && (
          <Source id="wildfires" type="geojson" data={wildfireData}>
            <Layer
              id="wildfire-fresh-glow"
              type="circle"
              filter={['<=', ['coalesce', ['get', 'ageHours'], 999], 6]}
              paint={{
                'circle-radius': ['interpolate', ['linear'], ['coalesce', ['get', 'frp'], 5], 0, 10, 10, 13, 50, 18, 150, 24, 300, 32],
                'circle-color': '#ff4500',
                'circle-opacity': 0.35,
                'circle-blur': 0.6
              }}
            />
            <Layer 
              id="wildfire-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': ['interpolate', ['linear'], ['coalesce', ['get', 'frp'], 5], 0, 5, 10, 7, 50, 11, 150, 16, 300, 22], 
                'circle-color': ['interpolate', ['linear'], ['coalesce', ['get', 'frp'], 5], 0, '#f59e0b', 10, '#fbbf24', 50, '#f97316', 150, '#ef4444', 300, '#b91c1c'], 
                'circle-opacity': [
                  'case',
                  ['<=', ['coalesce', ['get', 'ageHours'], 6], 6], getOpacity('wildfires', 0.95),
                  ['<=', ['coalesce', ['get', 'ageHours'], 12], 12], getOpacity('wildfires', 0.70),
                  getOpacity('wildfires', 0.40)
                ],
                'circle-stroke-width': [
                  'case',
                  ['<=', ['coalesce', ['get', 'ageHours'], 6], 6], 2,
                  1
                ],
                'circle-stroke-color': [
                  'case',
                  ['<=', ['coalesce', ['get', 'ageHours'], 6], 6], '#ffffff',
                  ['<=', ['coalesce', ['get', 'ageHours'], 12], 12], '#fed7aa',
                  '#78350f'
                ]
              }} 
            />
          </Source>
        )}

        {settings.layers.vessels && (
          <Source id="vessels" type="geojson" data={vesselData}>
            <Layer 
              id="vessel-circle-layer"
              type="circle"
              paint={{
                'circle-radius': 4.5,
                'circle-color': '#38bdf8',
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#0284c7',
                'circle-opacity': getOpacity('vessels', 0.9)
              }}
            />
            <Layer 
              id="vessel-layer" 
              type="symbol" 
              layout={{ 
                'icon-image': 'boat-icon', 
                'icon-size': 0.75, 
                'icon-rotate': ['coalesce', ['get', 'true_heading'], 0], 
                'icon-rotation-alignment': 'map', 
                'icon-allow-overlap': true 
              }} 
              paint={{ 
                'icon-color': '#38bdf8', 
                'icon-halo-color': '#0284c7', 
                'icon-halo-width': 1 
              }} 
            />
          </Source>
        )}

        {settings.layers.atlas_obscura && (
          <Source id="atlas-obscura" type="geojson" data={obscuraData}>
            <Layer 
              id="atlas-obscura-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': 7, 
                'circle-color': '#c084fc', 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#7e22ce',
                'circle-opacity': getOpacity('atlas_obscura', 0.9)
              }} 
            />
          </Source>
        )}

        {settings.layers.lightning && (
          <Source id="lightning-strikes" type="geojson" data={lightningData}>
            <Layer 
              id="lightning-acoustic-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'age_sec'],
                  0, 6,
                  150, 28,
                  300, 48
                ],
                'circle-color': '#eab308',
                'circle-opacity': 0,
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#facc15',
                'circle-stroke-opacity': [
                  'interpolate', ['linear'], ['get', 'age_sec'],
                  0, 0.9,
                  150, 0.35,
                  300, 0.05
                ]
              }} 
            />
            <Layer 
              id="lightning-layer" 
              type="circle" 
              paint={{ 
                'circle-radius': 5, 
                'circle-color': '#fef08a', 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#eab308',
                'circle-opacity': getOpacity('lightning', 0.95)
              }} 
            />
          </Source>
        )}

        {rangeRingsGeoJSON && (
          <Source id="range-rings" type="geojson" data={rangeRingsGeoJSON}>
            <Layer id="range-rings-fill" type="fill" paint={{ 'fill-color': '#10b981', 'fill-opacity': 0.05 }} />
            <Layer id="range-rings-line" type="line" paint={{ 'line-color': '#10b981', 'line-width': 1.5, 'line-dasharray': [3, 2] }} />
          </Source>
        )}
        {directionsResult && (
          <Source id="alt-directions" type="geojson" data={altRoutesData}>
            <Layer id="alt-directions-layer" type="line" paint={{ 'line-color': '#06b6d4', 'line-width': 3, 'line-dasharray': [2, 2], 'line-opacity': 0.4 }} />
          </Source>
        )}
        {directionsResult && directionsResult.routeGeoJSON && (
          <Source id="directions" type="geojson" data={directionsData}>
            <Layer 
              id="directions-layer-outline" 
              type="line" 
              paint={{ 'line-color': '#000000', 'line-width': 8, 'line-opacity': 0.5 }} 
            />
            <Layer 
              id="directions-layer" 
              type="line" 
              paint={{ 
                'line-color': [
                  'case',
                  ['==', ['get', 'mode'], 'flight'], '#f43f5e',
                  ['==', ['get', 'mode'], 'rail'], '#a855f7',
                  ['==', ['get', 'mode'], 'walking'], '#10b981',
                  ['==', ['get', 'mode'], 'bus'], '#38bdf8',
                  ['==', ['get', 'mode'], 'cycling'], '#10b981',
                  ['==', ['get', 'mode'], 'mountain_biking'], '#f59e0b',
                  ['==', ['get', 'mode'], 'skateboarding'], '#84cc16',
                  directionsResult.routingStrategy === 'stealth' ? '#a855f7' :
                  directionsResult.trafficCongestion === 'severe' ? '#ef4444' : 
                  directionsResult.trafficCongestion === 'heavy' ? '#f97316' : 
                  directionsResult.trafficCongestion === 'moderate' ? '#eab308' : '#06b6d4'
                ],
                'line-width': 5 
              }} 
            />
          </Source>
        )}

        {settings.layers.crime_heatmap && (settings.tier === 'pro' || settings.tier === 'sovereign') && (
          <Source id="crime-heatmap-source" type="geojson" data={crimeGeoJson}>
            <Layer
              id="crime-heatmap-layer"
              type="heatmap"
              paint={{
                'heatmap-weight': ['get', 'weight'],
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 8, 0.8, 15, 2.5],
                'heatmap-color': [
                  'interpolate', ['linear'], ['heatmap-density'],
                  0, 'rgba(0,0,0,0)',
                  0.2, 'rgba(6,182,212,0.4)',
                  0.5, 'rgba(234,179,8,0.7)',
                  0.8, 'rgba(239,68,68,0.85)',
                  1.0, 'rgba(236,72,153,0.95)'
                ],
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 8, 15, 15, 35],
                'heatmap-opacity': 0.75
              }}
            />
          </Source>
        )}

        {selectedFeature && (
          <Popup
            longitude={selectedFeature.longitude}
            latitude={selectedFeature.latitude}
            anchor="bottom"
            onClose={() => setSelectedFeature(null)}
            className="sphinx-popup"
            closeButton={true}
            closeOnClick={false}
          >
            <div className="text-black p-1 text-sm font-sans max-w-[320px]">
              <h3 className="font-bold text-base border-b border-gray-300 mb-1 pb-1 uppercase">
                {selectedFeature.properties.type === 'custom_pin' ? 'Custom Pin' :
                 selectedFeature.properties.type === 'cell_tower' ? (selectedFeature.properties.is_physical ? 'Physical Mast' : 'Coverage Centroid') : 
                 selectedFeature.properties.type === 'aircraft' ? 'Aircraft' :
                 selectedFeature.properties.type === 'spring' ? 'Natural Spring' : 
                 selectedFeature.properties.type === 'power' ? 'Power Infrastructure' :
                 selectedFeature.properties.type === 'aviation' ? 'Aviation Facility' :
                 selectedFeature.properties.type === 'emergency' ? 'Emergency Facility' :
                 selectedFeature.properties.type === 'earthquake' ? 'Earthquake' :
                 selectedFeature.properties.type === 'severe_weather' ? 'Severe Weather Event' :
                 selectedFeature.properties.type === 'weather_station' ? 'Weather Station' :
                 selectedFeature.properties.type === 'data_center' ? 'Data Center' :
                 selectedFeature.properties.type === 'radar' ? 'Radar Array' :
                 selectedFeature.properties.type === 'wildfire' ? (selectedFeature.properties.incident_name ? `🔥 ${selectedFeature.properties.incident_name} Fire` : 'Active Wildfire') :
                 selectedFeature.properties.type === 'vessel' ? 'Maritime Vessel' :
                 selectedFeature.properties.type === 'atlas_obscura' ? 'Atlas Obscura Anomaly' :
                 (selectedFeature.layerId === 'lightning-layer' || selectedFeature.properties.peak_current_ka) ? '⚡ Lightning Strike' :
                 (selectedFeature.layerId === 'camera-layer' || selectedFeature.layerId === 'camera-fov-layer' || selectedFeature.properties.vendor || ['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type)) ? 'Surveillance / ALPR Node' :
                 selectedFeature.layerId === 'submarine-cable-layer' ? 'Subsea Fiber Cable' :
                 (selectedFeature.layerId === 'road-barricade-3d-extrusion' || selectedFeature.layerId === 'road-hazard-core-line') ? '🚧 Road Closure / Work Zone (3D AR)' :
                 'Data Point'}
              </h3>
              
              {selectedFeature.properties.type === 'cell_tower' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Radio:</strong> {selectedFeature.properties.radio || 'Unknown'}</p>
                  <p><strong>Network:</strong> {selectedFeature.properties.net || 'Unknown'}</p>
                  <p><strong>Cell ID/Name:</strong> {selectedFeature.properties.cell || 'Unknown'}</p>
                  {selectedFeature.properties.is_physical && (
                    <>
                      <p><strong>Structure:</strong> {selectedFeature.properties.structure_type || 'Unknown'}</p>
                      <p><strong>Height AGL:</strong> {selectedFeature.properties.height ? `${selectedFeature.properties.height}m` : 'Unknown'}</p>
                      <p><strong>Lighting:</strong> {selectedFeature.properties.lighting || 'Unknown'}</p>
                    </>
                  )}
                  {selectedFeature.properties.range && !selectedFeature.properties.is_physical && <p><strong>Coverage Range:</strong> {selectedFeature.properties.range}m</p>}
                </div>
              )}
              
              {selectedFeature.properties.type === 'aircraft' && (() => {
                const altM = selectedFeature.properties.altitude || 0;
                const altFt = Math.round(altM * 3.28084);
                const velMs = selectedFeature.properties.velocity || 0;
                const spdKts = Math.round(velMs * 1.94384);
                const isClimbing = selectedFeature.properties.vertical_rate ? selectedFeature.properties.vertical_rate > 0.5 : false;
                const isDescending = selectedFeature.properties.vertical_rate ? selectedFeature.properties.vertical_rate < -0.5 : altFt < 5000;

                let phaseName = 'EN ROUTE CRUISE';
                let phaseRiskPct = '14.8%';
                let phaseRiskColor = 'bg-sky-950 text-sky-300 border-sky-600';
                let primaryHazard = 'Clear Air Turbulence (CAT), En-Route Airspace Deviation';

                if (altFt < 1200 && spdKts < 120) {
                  phaseName = 'SURFACE / TAXI & TAKEOFF ROLL';
                  phaseRiskPct = '11.7%';
                  phaseRiskColor = 'bg-amber-950 text-amber-300 border-amber-600';
                  primaryHazard = 'Runway incursion, foreign object debris (FOD), taxiway collision';
                } else if (altFt < 5000 && isDescending) {
                  phaseName = 'FINAL APPROACH & LANDING';
                  phaseRiskPct = '53.4% [CRITICAL PEAK RISK]';
                  phaseRiskColor = 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
                  primaryHazard = 'Unstabilized approach, runway excursion (44%), low-level wind shear, CFIT';
                } else if (altFt < 7000 && (isClimbing || spdKts > 150)) {
                  phaseName = 'TAKEOFF & INITIAL CLIMBOUT';
                  phaseRiskPct = '20.1% [HIGH RISK]';
                  phaseRiskColor = 'bg-orange-950 text-orange-300 border-orange-500';
                  primaryHazard = 'Engine loss at rotation, bird strike, spatial disorientation, CFIT';
                }

                return (
                  <div className="space-y-2 mt-2 font-mono">
                    <div className="p-2 bg-black/60 border border-gray-800 rounded-lg space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Callsign:</span>
                        <span className="font-bold text-cyan-300 text-sm tracking-wider">{selectedFeature.properties.callsign || 'TACTICAL-AIR'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Altitude / Speed:</span>
                        <span className="text-white font-semibold">{altFt.toLocaleString()} ft ({altM}m) • {spdKts} kts</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Origin / Registration:</span>
                        <span className="text-gray-300">{selectedFeature.properties.origin_country || 'United States'}</span>
                      </div>
                    </div>

                    {(() => {
                      const loiterIntel = analyzeAircraftLoiter(
                        selectedFeature.properties.icao24 || selectedFeature.properties.callsign || 'UNK',
                        selectedFeature.properties.callsign,
                        selectedFeature.latitude,
                        selectedFeature.longitude,
                        selectedFeature.properties.heading || 0,
                        altFt,
                        spdKts,
                        selectedFeature.properties.squawk
                      );

                      if (!loiterIntel.isLoitering && !loiterIntel.agency.includes('Law Enforcement') && !loiterIntel.agency.includes('Tactical')) return null;

                      return (
                        <div className={`p-2 rounded-xl border text-xs font-mono space-y-1 ${
                          loiterIntel.isLoitering
                            ? 'bg-red-950/90 border-red-500 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                            : 'bg-amber-950/80 border-amber-500/80 text-amber-200'
                        }`} data-testid="aircraft-loiter-alert">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <span>🛸</span> {loiterIntel.isLoitering ? 'SURVEILLANCE ORBIT DETECTED' : 'AGENCY AIRCRAFT PATROL'}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-black/60 border border-current">
                              {Math.min(99, Math.max(70, Math.round((loiterIntel.headingDeltaTotal / 360) * 100)))}% CONF
                            </span>
                          </div>
                          <div className="text-[11px] font-bold">
                            Pattern: {(loiterIntel.loiterType || 'ORBIT').toUpperCase()} • {loiterIntel.agency}
                          </div>
                          <p className="text-[10px] opacity-80 leading-tight">
                            {loiterIntel.tacticalAdvisory || 'Aerial observation over flight sector'}
                          </p>
                        </div>
                      );
                    })()}

                    <div className="p-2.5 bg-slate-950/80 border border-sky-900/60 rounded-xl space-y-1.5" data-testid="aircraft-hazard-card">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                          <span>🛫</span> FLIGHT PHASE HAZARD
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${phaseRiskColor}`}>
                          {phaseRiskPct}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white tracking-wide">
                        {phaseName}
                      </div>
                      <p className="text-[10px] text-gray-400 leading-snug">
                        <strong>Primary Threats:</strong> {primaryHazard}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAviationSafety(true);
                          setSelectedFeature(null);
                        }}
                        className="w-full mt-1 py-1 px-2 bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700/60 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <span>Open Aviation Risk Intel Panel</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {selectedFeature.properties.type === 'spring' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Description:</strong> {selectedFeature.properties.description}</p>
                  <p><strong>Drinking Water:</strong> {selectedFeature.properties.drinking_water}</p>
                </div>
              )}
              
              {selectedFeature.properties.type === 'power' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Type:</strong> {selectedFeature.properties.sub_type}</p>
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Voltage:</strong> {selectedFeature.properties.voltage}</p>
                </div>
              )}
              
              {selectedFeature.properties.type === 'aviation' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Type:</strong> {selectedFeature.properties.sub_type}</p>
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>ICAO:</strong> {selectedFeature.properties.icao}</p>
                </div>
              )}
              
              {selectedFeature.properties.type === 'emergency' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Type:</strong> {selectedFeature.properties.sub_type}</p>
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                </div>
              )}

              {selectedFeature.properties.type === 'earthquake' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Magnitude:</strong> {selectedFeature.properties.mag}</p>
                  <p><strong>Location:</strong> {selectedFeature.properties.place}</p>
                  <p><strong>Depth:</strong> {(selectedFeature as any).geometry?.coordinates?.[2]} km</p>
                  <p><strong>Time:</strong> {new Date(selectedFeature.properties.time).toLocaleString()}</p>
                </div>
              )}

              {selectedFeature.properties.type === 'severe_weather' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Event:</strong> {selectedFeature.properties.title}</p>
                  <p><strong>Category:</strong> {selectedFeature.properties.categories}</p>
                  <p><strong>Date:</strong> {new Date(selectedFeature.properties.date).toLocaleString()}</p>
                </div>
              )}

              {selectedFeature.properties.type === 'wildfire' && (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {typeof selectedFeature.properties.ageHours === 'number' && selectedFeature.properties.ageHours <= 6 ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                        🔥 ACTIVE FRONT ({selectedFeature.properties.ageHours}h ago)
                      </span>
                    ) : typeof selectedFeature.properties.ageHours === 'number' && selectedFeature.properties.ageHours <= 12 ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white">
                        ⚡ RECENT HOTSPOT ({selectedFeature.properties.ageHours}h ago)
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-800 text-amber-100">
                        ⏳ SMOLDERING / 24H ({selectedFeature.properties.ageHours ?? 24}h ago)
                      </span>
                    )}
                  </div>
                  {selectedFeature.properties.incident_name && <p><strong>Incident:</strong> {selectedFeature.properties.incident_name} Fire</p>}
                  {selectedFeature.properties.acres ? <p><strong>Acres:</strong> {selectedFeature.properties.acres}</p> : null}
                  {selectedFeature.properties.containment !== null && selectedFeature.properties.containment !== undefined ? <p><strong>Containment:</strong> {selectedFeature.properties.containment}%</p> : null}
                  <p><strong>Radiative Power:</strong> {selectedFeature.properties.frp} MW</p>
                  <p><strong>Brightness Temp:</strong> {selectedFeature.properties.brightness} K</p>
                  <p><strong>Confidence:</strong> {selectedFeature.properties.confidence}%</p>
                  {selectedFeature.properties.acq_date && <p><strong>Acquired:</strong> {selectedFeature.properties.acq_date} {selectedFeature.properties.acq_time} UTC</p>}
                  <p><strong>Source / Sat:</strong> {selectedFeature.properties.satellite} {selectedFeature.properties.daynight ? `(${selectedFeature.properties.daynight === 'D' ? 'Day' : 'Night'})` : ''}</p>
                </div>
              )}

              {selectedFeature.properties.isPerimeter && (
                <div className="space-y-1 mt-2 text-xs">
                  <div className="font-bold text-orange-600 uppercase flex items-center gap-1">
                    <span>🔥</span> Fire Spread Projection ({selectedFeature.properties.horizon})
                  </div>
                  <p><strong>Incident:</strong> {selectedFeature.properties.incidentName}</p>
                  <p><strong>Forecast Horizon:</strong> +{selectedFeature.properties.hours} Hours</p>
                  <p><strong>Rate of Spread (Head):</strong> {selectedFeature.properties.rosKmh} km/h ({selectedFeature.properties.rosMph} mph)</p>
                  <p><strong>Driving Wind Vector:</strong> {selectedFeature.properties.windSpeedKnots} kts @ {selectedFeature.properties.windDirectionDeg}° (Gusts: {selectedFeature.properties.windGustKnots} kts)</p>
                  <p><strong>Atmospheric Context:</strong> {selectedFeature.properties.tempC}°C / {selectedFeature.properties.humidity}% Humidity</p>
                  <div className="mt-1 text-[10px] p-1 bg-amber-100 text-amber-900 rounded border border-amber-300 font-semibold">
                    ⚠️ Projected downwind perimeter corridor based on Huygens elliptical propagation.
                  </div>
                </div>
              )}

              {selectedFeature.properties.type === 'vessel' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Vessel:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Type:</strong> {selectedFeature.properties.ship_type}</p>
                  <p><strong>Speed:</strong> {selectedFeature.properties.speed_knots} kts</p>
                  <p><strong>Heading:</strong> {selectedFeature.properties.true_heading}°</p>
                  <p><strong>MMSI:</strong> {selectedFeature.properties.mmsi}</p>
                  <p><strong>Destination:</strong> {selectedFeature.properties.destination}</p>
                  <p><strong>Status:</strong> {selectedFeature.properties.status}</p>
                </div>
              )}

              {selectedFeature.properties.type === 'atlas_obscura' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Site:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Classification:</strong> {selectedFeature.properties.sub_type}</p>
                  <p><strong>Country:</strong> {selectedFeature.properties.country}</p>
                  <p className="text-xs text-gray-700 leading-snug pt-1">{selectedFeature.properties.description}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'lightning-layer' || selectedFeature.properties.peak_current_ka) && (
                <div className="space-y-1 mt-2">
                  <p><strong>Peak Current:</strong> {selectedFeature.properties.peak_current_ka} kA ({selectedFeature.properties.polarity || '-'})</p>
                  <p><strong>Classification:</strong> {selectedFeature.properties.type || 'Cloud-to-Ground'}</p>
                  <p><strong>Strike Elapsed:</strong> {selectedFeature.properties.age_sec || 0}s ago</p>
                  <p className="text-[11px] text-amber-600 font-semibold pt-1">
                    ⚡ Acoustic Horizon: ~{((selectedFeature.properties.age_sec || 1) * 0.34).toFixed(1)} km
                  </p>
                </div>
              )}

              {selectedFeature.layerId === 'submarine-cable-layer' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Cable Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>ID:</strong> {selectedFeature.properties.id}</p>
                </div>
              )}
              
              {(selectedFeature.layerId === 'camera-layer' || selectedFeature.layerId === 'camera-fov-layer' || selectedFeature.properties.vendor || ['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type)) && (
                <SurveillancePopupCard properties={selectedFeature.properties} />
              )}

              {['weather_station', 'data_center', 'radar'].includes(selectedFeature.properties.type) && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  {selectedFeature.properties.status && <p><strong>Status:</strong> <span className={selectedFeature.properties.status === 'Active' ? 'text-green-600' : 'text-amber-600'}>{selectedFeature.properties.status}</span></p>}
                </div>
              )}

              {selectedFeature.properties.type === 'public_land' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Boundary:</strong> {selectedFeature.properties.boundary}</p>
                </div>
              )}
              
              {selectedFeature.properties.type === 'campsite' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Type:</strong> {selectedFeature.properties.tourism}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                </div>
              )}
              
              
              {selectedFeature.properties.type === 'custom_pin' && (
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full inline-block border border-white"
                      style={{ backgroundColor: selectedFeature.properties.color || '#a855f7' }}
                    />
                    <span className="text-[11px] uppercase px-1.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 font-mono">
                      {selectedFeature.properties.category || 'Custom Pin'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{selectedFeature.properties.label}</p>
                  {selectedFeature.properties.description && (
                    <p className="text-xs text-gray-300 whitespace-pre-wrap">{selectedFeature.properties.description}</p>
                  )}
                  <p className="text-[10px] text-gray-400 font-mono">
                    Lat: {Number(selectedFeature.latitude).toFixed(4)}, Lon: {Number(selectedFeature.longitude).toFixed(4)}
                  </p>
                  <div className="flex gap-2 pt-2 border-t border-gray-800">
                    <button
                      onClick={() => {
                        const pin = (settings.custom_pins || []).find((p: any) => p.id === selectedFeature.properties.id);
                        if (pin) {
                          setPinCreationMode({ lat: pin.lat, lon: pin.lon });
                          setPinLabel(pin.label);
                          setPinDescription(pin.description || '');
                          setPinColor(pin.color || '#a855f7');
                          setPinCategory(pin.category || 'Tactical');
                          setEditingPinId(pin.id);
                          setSelectedFeature(null);
                        }
                      }}
                      className="px-2 py-1 bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-600/50 text-cyan-300 text-xs rounded font-mono"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => {
                        const newPins = (settings.custom_pins || []).filter((p: any) => p.id !== selectedFeature.properties.id);
                        updateSettings({ custom_pins: newPins });
                        setSelectedFeature(null);
                      }}
                      className="px-2 py-1 bg-red-900/40 hover:bg-red-800/60 border border-red-600/50 text-red-300 text-xs rounded font-mono"
                    >
                      🗑️ Delete
                    </button>
                    <button
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.flyTo({ center: [selectedFeature.longitude, selectedFeature.latitude], zoom: 15 });
                        }
                      }}
                      className="px-2 py-1 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-600/50 text-purple-300 text-xs rounded font-mono ml-auto"
                    >
                      🔍 Zoom
                    </button>
                  </div>
                </div>
              )}

{selectedFeature.properties.type === 'trail' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Type:</strong> {selectedFeature.properties.highway}</p>
                  <p><strong>Surface:</strong> {selectedFeature.properties.surface}</p>
                  <p><strong>Designation:</strong> {selectedFeature.properties.designation}</p>
                </div>
              )}
            </div>
          </Popup>
        )}
        {settings.layers.drone && droneData && (
          <Marker
            longitude={droneData.lon}
            latitude={droneData.lat}
            anchor="center"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border-2 border-cyan-400 animate-pulse cursor-pointer">
              <span className="text-xl">🛸</span>
            </div>
          </Marker>
        )}
        {settings.layers.crime_live && (
          <>
            {/* Crime Incident Markers */}
            {crimeData.map((incident: any) => (
              <Marker
                key={incident.id}
                longitude={incident.lon}
                latitude={incident.lat}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedCrimeIncident(incident);
                  setSelectedCrimeNeighborhood(null);
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full border cursor-pointer animate-pulse flex items-center justify-center transition-transform hover:scale-150 ${
                    incident.severity === 'high'
                      ? 'bg-red-500/80 border-red-300 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      : incident.severity === 'medium'
                      ? 'bg-orange-500/80 border-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                      : 'bg-yellow-500/80 border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.8)]'
                  }`}
                  title={`${incident.type} - ${incident.neighborhood}`}
                >
                  <span className="text-[7px]">🚨</span>
                </div>
              </Marker>
            ))}

            {/* Neighborhood Risk Zone Centers */}
            {activeCityCrime?.neighborhoods?.map((zone) => (
              <Marker
                key={`zone-${zone.name}`}
                longitude={zone.lon}
                latitude={zone.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedCrimeNeighborhood(zone);
                  setSelectedCrimeIncident(null);
                }}
              >
                <div
                  className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold cursor-pointer transition-transform hover:scale-110 shadow-lg backdrop-blur-md flex items-center gap-1 ${
                    zone.safetyScore < 40
                      ? 'bg-red-950/90 border-red-500 text-red-200 shadow-red-900/50'
                      : zone.safetyScore < 70
                      ? 'bg-amber-950/90 border-amber-500 text-amber-200 shadow-amber-900/50'
                      : 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-emerald-900/50'
                  }`}
                >
                  <span>🛡️</span>
                  <span>{zone.name}: {zone.safetyScore}/100</span>
                </div>
              </Marker>
            ))}

            {/* Crime Incident Popup */}
            {selectedCrimeIncident && (
              <Popup
                longitude={selectedCrimeIncident.lon}
                latitude={selectedCrimeIncident.lat}
                anchor="top"
                onClose={() => setSelectedCrimeIncident(null)}
                closeOnClick={false}
              >
                <div className="bg-black/95 text-white p-3 rounded-lg border border-red-500/80 max-w-[280px] font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between pb-1.5 border-b border-red-900/50 mb-2">
                    <span className="font-bold text-red-400 flex items-center gap-1">
                      <span>🚨</span> {selectedCrimeIncident.type}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                      selectedCrimeIncident.severity === 'high' ? 'bg-red-900 text-red-200' : 'bg-orange-900 text-orange-200'
                    }`}>
                      {selectedCrimeIncident.severity}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] text-gray-300">
                    <p><strong className="text-gray-400">Sector:</strong> {selectedCrimeIncident.neighborhood}</p>
                    <p><strong className="text-gray-400">Category:</strong> <span className="capitalize">{selectedCrimeIncident.category}</span></p>
                    <p><strong className="text-gray-400">Description:</strong> {selectedCrimeIncident.description}</p>
                    <p><strong className="text-gray-400">Time:</strong> {new Date(selectedCrimeIncident.timestamp).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 pt-1">Source: {selectedCrimeIncident.source}</p>
                  </div>
                </div>
              </Popup>
            )}

            {/* Neighborhood Zone Risk Profile Popup */}
            {selectedCrimeNeighborhood && (
              <Popup
                longitude={selectedCrimeNeighborhood.lon}
                latitude={selectedCrimeNeighborhood.lat}
                anchor="top"
                onClose={() => setSelectedCrimeNeighborhood(null)}
                closeOnClick={false}
              >
                <div className="bg-black/95 text-white p-3.5 rounded-lg border border-cyan-500/80 max-w-[320px] font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50 mb-2">
                    <span className="font-bold text-cyan-300 text-sm">
                      {selectedCrimeNeighborhood.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                      selectedCrimeNeighborhood.riskLevel === 'CRITICAL' || selectedCrimeNeighborhood.riskLevel === 'HIGH'
                        ? 'bg-red-950 border border-red-500 text-red-300'
                        : selectedCrimeNeighborhood.riskLevel === 'ELEVATED' || selectedCrimeNeighborhood.riskLevel === 'MODERATE'
                        ? 'bg-amber-950 border border-amber-500 text-amber-300'
                        : 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                    }`}>
                      {selectedCrimeNeighborhood.riskLevel}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-gray-300">
                    <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
                      <span>Safety Score:</span>
                      <strong className="text-cyan-400 text-sm">{selectedCrimeNeighborhood.safetyScore} / 100</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Violent Crime Index: <strong className="text-red-400">{selectedCrimeNeighborhood.violentCrimeIndex}</strong> (100=Avg)</span>
                      <span>Property Crime: <strong className="text-amber-400">{selectedCrimeNeighborhood.propertyCrimeIndex}</strong></span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px]">Primary Threat Categories:</span>
                      <p className="text-amber-300 font-semibold">{selectedCrimeNeighborhood.topIncidents.join(', ')}</p>
                    </div>
                    <div className="pt-1 border-t border-gray-800 text-[10px] text-gray-300">
                      <span className="text-cyan-400 font-bold">Tactical Advisory: </span>
                      {selectedCrimeNeighborhood.tacticalNotes}
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </>
        )}

        {selectedSnowboardResort && (
          <SnowboardResortPopup
            resort={selectedSnowboardResort}
            onClose={() => setSelectedSnowboardResort(null)}
            onGetDirections={(resort) => {
              setPickedRoutingPoint({
                target: 'destination',
                lat: Number(resort.lat),
                lng: Number(resort.lng),
                address: `${resort.name} Resort`
              });
              setShowDirections(true);
              setSelectedSnowboardResort(null);
            }}
          />
        )}

        {/* 3D AR Solar Terminator & Nocturnal Shadow */}
        <SolarTerminator3DLayer visible={settings.layers.solar_terminator} />

        {/* 3D AR Real-Time Road Closures & Work Zones */}
        <RoadClosure3DLayer data={roadClosuresData} visible={settings.layers.road_closures} />

        {/* 3D AR Live Weather (Rain, Snow, Lightning) */}
        <Weather3DARLayer visible={settings.layers.weather_ar} lightningData={lightningData} currentWeatherVector={currentWeatherVector} />

        {/* 3D AR Drone Docks & DFR Networks */}
        <DroneDock3DLayer 
          visible={settings.layers.drone_docks} 
          showBlindSpots={settings.layers.blind_spots} 
          bboxStr={bboxRef.current} 
          selectedDockId={selectedDroneDockId} 
          onSelectDock={(d) => setSelectedDroneDockId(d?.id || null)}
          onInspect3D={(coords) => {
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: coords,
                zoom: 17.5,
                pitch: 60,
                bearing: 30,
                duration: 1500
              });
            }
          }}
          onOpenVideoFeed={() => updateSettings({ layers: { ...settings.layers, drone: true } })}
        />

        {/* 3D AR Toxic Sites & Plume Drift */}
        <ToxicPlume3DLayer
          visible={settings.layers.toxic_sites}
          bboxStr={bboxRef.current}
          onSelectSite={(site) => setSelectedToxicSite(site)}
          selectedSiteId={selectedToxicSite?.site_id}
        />
      </Map>

      {alerts.length > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-[0.5vw] pointer-events-none">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-red-900/90 border border-red-500 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md text-white font-mono flex items-center gap-3 animate-pulse">
              <span className="text-xl">⚠️</span>
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* SPHINX OS Data Points / Legend Panel */}
      {!isLegendCollapsed && (
        <div 
          data-testid="sphinx-legend-panel"
          className="absolute top-14 sm:top-16 left-2 sm:left-4 bottom-2 sm:bottom-4 z-20 w-80 sm:w-96 max-w-[calc(100vw-16px)] bg-black/90 border border-cyan-900/70 p-3 sm:p-4 rounded-xl text-white font-mono shadow-[0_0_25px_rgba(8,145,178,0.25)] backdrop-blur-md overflow-hidden flex flex-col pointer-events-auto"
        >
        <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-cyan-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-xs tracking-wider">DATA POINTS & LAYERS</span>
            <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">
              {Object.values(settings.layers).filter(Boolean).length} Active
            </span>
          </div>

          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const anyVisible = Object.values(settings.layers).some(v => v);
                toggleAllLayers(!anyVisible);
              }}
              className="text-[10px] text-cyan-400 hover:text-cyan-200 transition-colors bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800 whitespace-nowrap"
            >
              {Object.values(settings.layers).some(v => v) ? 'HIDE ALL' : 'SHOW ALL'}
            </button>
            <button 
              onClick={() => setIsLegendCollapsed(true)}
              className="text-gray-400 hover:text-white transition-colors text-xs p-1"
              title="Close Data Points Panel"
            >
              ✕
            </button>

          </div>
        </div>
        <div className="space-y-2 mt-2 text-sm overflow-y-auto pr-1.5 custom-scrollbar flex-1">

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.custom_pins ? 'opacity-50' : ''}`} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button 
                  type="button"
                  data-testid="toggle-custom-pins-layer"
                  onClick={(e) => { e.stopPropagation(); toggleLayer('custom_pins'); }}
                  className={settings.layers.custom_pins ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}
                >
                  {settings.layers.custom_pins ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-full shrink-0"></div>
                {!isLegendCollapsed && (
                  <span className="flex items-center gap-2">
                    <span 
                      onClick={() => setIsCustomPinsExpanded(!isCustomPinsExpanded)}
                      className="whitespace-nowrap hover:text-purple-300 font-semibold flex items-center gap-1 select-none"
                      title="Click to view saved pins"
                    >
                      Custom Pins {(settings.custom_pins || []).length > 0 && <span className="text-[10px] text-purple-400">{isCustomPinsExpanded ? '▲' : '▼'}</span>}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsDroppingPin(true); }}
                      className="px-1.5 py-0.5 bg-purple-900/60 hover:bg-purple-700 border border-purple-500 rounded text-[10px] text-purple-200 font-mono transition-colors"
                      title="Drop a custom pin on the map"
                    >
                      + ADD
                    </button>
                  </span>
                )}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.custom_pins}</span>
            </div>

            {/* Expandable Custom Pins Drawer in Sidebar */}
            {isCustomPinsExpanded && !isLegendCollapsed && (settings.custom_pins || []).length > 0 && (
              <div className="pl-6 pr-1 py-1 space-y-1 bg-black/40 border-l-2 border-purple-500/40 my-1 rounded-r">
                {(settings.custom_pins || []).map((pin: any) => (
                  <div key={pin.id} className="flex items-center justify-between text-xs py-1 px-1.5 hover:bg-purple-950/40 rounded transition-colors group">
                    <div 
                      className="flex items-center gap-1.5 overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.flyTo({ center: [pin.lon, pin.lat], zoom: 15, duration: 1500 });
                        }
                      }}
                      title="Click to fly to pin"
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pin.color || '#a855f7' }} />
                      <span className="truncate text-gray-200 hover:text-white font-medium max-w-[110px]">{pin.label}</span>
                      <span className="text-[9px] px-1 bg-purple-900/60 text-purple-300 rounded border border-purple-700/50">{pin.category || 'Pin'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (mapRef.current) {
                            mapRef.current.flyTo({ center: [pin.lon, pin.lat], zoom: 15, duration: 1500 });
                          }
                        }}
                        className="text-[10px] px-1 py-0.5 bg-purple-900/50 hover:bg-purple-700 text-purple-200 rounded border border-purple-500/40"
                        title="Locate pin on map"
                      >
                        🔍
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newPins = (settings.custom_pins || []).filter((p: any) => p.id !== pin.id);
                          updateSettings({ custom_pins: newPins });
                        }}
                        className="text-[10px] px-1 py-0.5 bg-red-950/60 hover:bg-red-800 text-red-300 rounded border border-red-700/40"
                        title="Delete pin"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.aircraft ? 'opacity-50' : ''}`} onClick={() => toggleLayer('aircraft')} onMouseEnter={() => setHoveredLegendLayer('aircraft')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.aircraft ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.aircraft ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-cyan-400 shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aircraft</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2">{visibleCounts.aircraft}</span>
            </div>
            
            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.cell_towers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('cell_towers')} onMouseEnter={() => setHoveredLegendLayer('cell_towers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.cell_towers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.cell_towers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-fuchsia-500 font-bold text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cell Towers</span>}
              </span>
              <span className="text-fuchsia-400 font-bold ml-2">{visibleCounts.cellTowers}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.springs ? 'opacity-50' : ''}`} onClick={() => toggleLayer('springs')} onMouseEnter={() => setHoveredLegendLayer('springs')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.springs ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.springs ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-500 font-bold text-xl leading-none shrink-0 w-4 text-center">♦</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Springs</span>}
              </span>
              <span className="text-blue-400 font-bold ml-2">{visibleCounts.springs}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.power ? 'opacity-50' : ''}`} onClick={() => toggleLayer('power')} onMouseEnter={() => setHoveredLegendLayer('power')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.power ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.power ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-500 text-xl leading-none shrink-0 w-4 text-center">■</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Power Grid</span>}
              </span>
              <span className="text-yellow-400 font-bold ml-2">{visibleCounts.power}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.aviation ? 'opacity-50' : ''}`} onClick={() => toggleLayer('aviation')} onMouseEnter={() => setHoveredLegendLayer('aviation')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.aviation ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.aviation ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aviation/Helipads</span>}
              </span>
              <span className="text-red-400 font-bold ml-2">{visibleCounts.aviation}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.emergency ? 'opacity-50' : ''}`} onClick={() => toggleLayer('emergency')} onMouseEnter={() => setHoveredLegendLayer('emergency')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.emergency ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.emergency ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-500 font-bold text-xl leading-none shrink-0 w-4 text-center">+</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Emergency</span>}
              </span>
              <span className="text-emerald-400 font-bold ml-2">{visibleCounts.emergency}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.cameras ? 'opacity-50' : ''}`} onClick={() => toggleLayer('cameras')} onMouseEnter={() => setHoveredLegendLayer('cameras')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.cameras ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.cameras ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 text-lg leading-none shrink-0 w-4 text-center">📷</span>
                {!isLegendCollapsed && (
                  <span className="whitespace-nowrap flex items-center gap-1.5">
                    <span>Cameras / ALPR</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/40 font-mono">FLOCK</span>
                  </span>
                )}
              </span>
              <span className="text-gray-300 font-bold ml-2">{visibleCounts.cameras}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_stations ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_stations')} onMouseEnter={() => setHoveredLegendLayer('weather_stations')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.weather_stations ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_stations ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-sky-300 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Weather Stations</span>}
              </span>
              <span className="text-sky-300 font-bold ml-2">{visibleCounts.weather_stations}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.data_centers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('data_centers')} onMouseEnter={() => setHoveredLegendLayer('data_centers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.data_centers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.data_centers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-sm shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Data Centers</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.data_centers}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.radars ? 'opacity-50' : ''}`} onClick={() => toggleLayer('radars')} onMouseEnter={() => setHoveredLegendLayer('radars')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.radars ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.radars ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-rose-500 font-bold text-xl leading-none shrink-0 w-4 text-center">◎</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Radar / Arrays</span>}
              </span>
              <span className="text-rose-400 font-bold ml-2">{visibleCounts.radars}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.public_lands ? 'opacity-50' : ''}`} onClick={() => toggleLayer('public_lands')} onMouseEnter={() => setHoveredLegendLayer('public_lands')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.public_lands ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.public_lands ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-green-500/50 border border-green-800 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Public Lands</span>}
              </span>
              <span className="text-green-500 font-bold ml-2">{visibleCounts.public_lands}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.campsites ? 'opacity-50' : ''}`} onClick={() => toggleLayer('campsites')} onMouseEnter={() => setHoveredLegendLayer('campsites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.campsites ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.campsites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-lg leading-none shrink-0 w-4 text-center">◮</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Campsites</span>}
              </span>
              <span className="text-orange-400 font-bold ml-2">{visibleCounts.campsites}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.trails ? 'opacity-50' : ''}`} onClick={() => toggleLayer('trails')} onMouseEnter={() => setHoveredLegendLayer('trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.trails ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-amber-600 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Trails/Paths</span>}
              </span>
              <span className="text-amber-500 font-bold ml-2">{visibleCounts.trails}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.snowboard_trails ? 'opacity-50' : ''}`} onClick={() => toggleLayer('snowboard_trails')} onMouseEnter={() => setHoveredLegendLayer('snowboard_trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.snowboard_trails ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.snowboard_trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 text-sm leading-none shrink-0 w-4 text-center">🏂</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Snowboard Trails</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2">{visibleCounts.snowboard_resorts ? `${visibleCounts.snowboard_resorts.toLocaleString()}` : '6,296'}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.disasters ? 'opacity-50' : ''}`} onClick={() => toggleLayer('disasters')} onMouseEnter={() => setHoveredLegendLayer('disasters')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.disasters ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.disasters ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Disasters / Events</span>}
              </span>
              <span className="text-red-500 font-bold ml-2">{visibleCounts.disasters}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.crime_live ? 'opacity-50' : ''}`} onClick={() => toggleLayer('crime_live')} onMouseEnter={() => setHoveredLegendLayer('crime_live')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button 
                  type="button" 
                  data-testid="toggle-crime-layer"
                  className={settings.layers.crime_live ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}
                >
                  {settings.layers.crime_live ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-500 font-bold text-sm leading-none shrink-0 w-4 text-center">🚨</span>
                {!isLegendCollapsed && (
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span>Crime & Threats</span>
                    {activeCityCrime && (
                      <button
                        type="button"
                        data-testid="sidebar-crime-city-pill"
                        onClick={(e) => { e.stopPropagation(); setShowCityCrimePanel(true); }}
                        className="text-[9px] px-1 bg-red-950/80 text-red-300 hover:text-white rounded border border-red-800 transition-colors"
                        title="Open City & Neighborhood Crime Intelligence"
                      >
                        {activeCityCrime.city.toUpperCase()} ➔
                      </button>
                    )}
                  </span>
                )}
              </span>
              <span data-testid="sidebar-count-crime" className="text-red-400 font-bold ml-2">
                {activeCityCrime?.totalIncidents || crimeData.length}
              </span>
            </div>

            <div 
              data-testid="toggle-crime-heatmap-item"
              className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.crime_heatmap ? 'opacity-50' : ''}`} 
              onClick={() => {
                if (settings.tier === 'free') {
                  setTierUpgradeTrigger('crime_heatmap');
                  setShowTierUpgrade(true);
                } else {
                  toggleLayer('crime_heatmap');
                }
              }} 
              onMouseEnter={() => setHoveredLegendLayer('crime_heatmap')} 
              onMouseLeave={() => setHoveredLegendLayer(null)}
            >
              <span className="flex items-center gap-3">
                <button 
                  type="button" 
                  data-testid="toggle-crime-heatmap-btn"
                  className={settings.layers.crime_heatmap && (settings.tier === 'pro' || settings.tier === 'sovereign') ? "text-pink-400 shrink-0" : "text-gray-400 hover:text-white shrink-0"}
                >
                  {settings.layers.crime_heatmap && (settings.tier === 'pro' || settings.tier === 'sovereign') ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-pink-500 font-bold text-sm leading-none shrink-0 w-4 text-center">🔥</span>
                {!isLegendCollapsed && (
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span>Crime Density Heatmap</span>
                    <span className="text-[9px] px-1 bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-pink-300 font-mono font-bold rounded border border-pink-500/40">
                      PRO
                    </span>
                  </span>
                )}
              </span>
              <span className="text-xs font-mono text-pink-400/80 ml-2">
                {settings.tier === 'free' ? '🔒 PRO' : 'GPU'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.earthquakes ? 'opacity-50' : ''}`} onClick={() => toggleLayer('earthquakes')} onMouseEnter={() => setHoveredLegendLayer('earthquakes')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.earthquakes ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.earthquakes ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Earthquakes</span>}
              </span>
              <span className="text-orange-500 font-bold ml-2">{visibleCounts.earthquakes}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.submarine_cables ? 'opacity-50' : ''}`} onClick={() => toggleLayer('submarine_cables')} onMouseEnter={() => setHoveredLegendLayer('submarine_cables')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.submarine_cables ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.submarine_cables ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-cyan-300 shrink-0 shadow-[0_0_8px_#22d3ee]"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Subsea Cables</span>}
              </span>
              <span className="text-cyan-300 font-bold ml-2">{visibleCounts.submarine_cables}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.wildfires ? 'opacity-50' : ''}`} onClick={() => toggleLayer('wildfires')} onMouseEnter={() => setHoveredLegendLayer('wildfires')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.wildfires ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.wildfires ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-sm leading-none shrink-0 w-4 text-center">🔥</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Wildfires (FIRMS)</span>}
              </span>
              <span data-testid="sidebar-count-wildfires" className="text-orange-400 font-bold ml-2">{visibleCounts.wildfires}</span>
            </div>
            {settings.layers.wildfires && !isLegendCollapsed && (
              <div className="ml-7 mb-1 flex items-center gap-1 text-[10px]">
                <span className="text-gray-400">Freshness:</span>
                {(['all', '6h', '12h', '24h'] as const).map(age => (
                  <button
                    key={age}
                    type="button"
                    data-testid={`filter-wildfire-${age}`}
                    onClick={(e) => { e.stopPropagation(); setWildfireAgeFilter(age); }}
                    className={`px-1.5 py-0.5 rounded transition-all font-mono ${
                      wildfireAgeFilter === age
                        ? 'bg-orange-500 text-white font-bold shadow-[0_0_6px_rgba(249,115,22,0.5)]'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {age === 'all' ? 'All' : `<${age}`}
                  </button>
                ))}
              </div>
            )}

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.fire_spread_forecast ? 'opacity-50' : ''}`} onClick={() => toggleLayer('fire_spread_forecast')} onMouseEnter={() => setHoveredLegendLayer('fire_spread_forecast')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button 
                  type="button"
                  data-testid="toggle-fire-spread-layer"
                  className={settings.layers.fire_spread_forecast ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}
                >
                  {settings.layers.fire_spread_forecast ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-500 font-bold text-sm leading-none shrink-0 w-4 text-center">📈</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Fire Spread Forecast</span>}
              </span>
              <span data-testid="sidebar-count-fire-spread" className="text-red-400 font-bold ml-2">{visibleCounts.fire_spread_forecast}</span>
            </div>
            {settings.layers.fire_spread_forecast && !isLegendCollapsed && (
              <div className="ml-7 mb-1.5 space-y-1 text-[10px]">
                <div className="text-gray-400 flex items-center justify-between pr-1">
                  <span>Wind: <strong className="text-cyan-300 font-mono">{currentWeatherVector.windSpeedKnots}kt @ {currentWeatherVector.windDirectionDeg}°</strong></span>
                  <span>Temp: <strong className="text-amber-300 font-mono">{currentWeatherVector.tempC}°C</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">Horizon:</span>
                  {(['all', '+1h', '+3h', '+6h', '+12h'] as const).map(h => (
                    <button
                      key={h}
                      type="button"
                      data-testid={`filter-horizon-${h}`}
                      onClick={(e) => { e.stopPropagation(); setSpreadHorizonFilter(h); }}
                      className={`px-1.5 py-0.5 rounded transition-all font-mono ${
                        spreadHorizonFilter === h
                          ? 'bg-red-600 text-white font-bold shadow-[0_0_6px_rgba(239,68,68,0.5)]'
                          : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.vessels ? 'opacity-50' : ''}`} onClick={() => toggleLayer('vessels')} onMouseEnter={() => setHoveredLegendLayer('vessels')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.vessels ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.vessels ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🚢</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Vessels (AIS)</span>}
              </span>
              <span className="text-sky-400 font-bold ml-2">{visibleCounts.vessels}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.atlas_obscura ? 'opacity-50' : ''}`} onClick={() => toggleLayer('atlas_obscura')} onMouseEnter={() => setHoveredLegendLayer('atlas_obscura')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.atlas_obscura ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.atlas_obscura ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-purple-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🏛️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Atlas Obscura</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.atlas_obscura}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.wind_hud ? 'opacity-50' : ''}`} onClick={() => toggleLayer('wind_hud')} onMouseEnter={() => setHoveredLegendLayer('wind_hud')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-wind-hud-layer" className={settings.layers.wind_hud ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.wind_hud ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-400 font-bold text-sm leading-none shrink-0 w-4 text-center">💨</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Live Wind HUD</span>}
              </span>
              <span data-testid="sidebar-count-wind-hud" className="text-sky-300 font-bold ml-2 text-xs font-mono">{currentWeatherVector.windSpeedKnots}kt</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_radar ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_radar')} onMouseEnter={() => setHoveredLegendLayer('weather_radar')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.weather_radar ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_radar ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🌧️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Weather Radar</span>}
              </span>
              <span className="text-blue-400 font-bold ml-2">{settings.layers.weather_radar ? 'ON' : 'OFF'}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.lightning ? 'opacity-50' : ''}`} onClick={() => toggleLayer('lightning')} onMouseEnter={() => setHoveredLegendLayer('lightning')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.lightning ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.lightning ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-400 font-bold text-sm leading-none shrink-0 w-4 text-center">⚡</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Lightning Strikes</span>}
              </span>
              <span className="text-yellow-400 font-bold ml-2">{visibleCounts.lightning}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.satellite ? 'opacity-70' : ''}`} onClick={() => toggleLayer('satellite')} onMouseEnter={() => setHoveredLegendLayer('satellite')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.satellite ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.satellite ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🛰️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Base: {settings.layers.satellite ? 'Satellite' : 'Street (Default)'}</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2 text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                {settings.layers.satellite ? (settings.satellite_provider === 'nasa_viirs' ? 'VIIRS' : settings.satellite_provider === 'nasa_modis' ? 'MODIS' : settings.satellite_provider === 'goes_live' ? 'GOES LIVE' : 'HD SATELLITE') : 'STREET'}
              </span>
            </div>

            {settings.layers.satellite && !isLegendCollapsed && (
              <div className="flex flex-wrap gap-1 pl-7 pt-1 pb-1">
                <button
                  type="button"
                  data-testid="sat-provider-arcgis"
                  onClick={(e) => { e.stopPropagation(); updateSettings({ satellite_provider: 'hd_arcgis' }); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${(!settings.satellite_provider || settings.satellite_provider === 'hd_arcgis') ? 'bg-cyan-900 text-cyan-200 border-cyan-400 font-bold' : 'bg-black/40 text-gray-400 border-gray-700 hover:text-white'}`}
                  title="High-Resolution Ortho (ArcGIS Composite)"
                >
                  HD ORTHO
                </button>
                <button
                  type="button"
                  data-testid="sat-provider-viirs"
                  onClick={(e) => { e.stopPropagation(); updateSettings({ satellite_provider: 'nasa_viirs' }); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${settings.satellite_provider === 'nasa_viirs' ? 'bg-cyan-900 text-cyan-200 border-cyan-400 font-bold' : 'bg-black/40 text-gray-400 border-gray-700 hover:text-white'}`}
                  title="NASA GIBS VIIRS NOAA-20 Daily Optical (Fresh Snow & Clouds)"
                >
                  DAILY VIIRS
                </button>
                <button
                  type="button"
                  data-testid="sat-provider-modis"
                  onClick={(e) => { e.stopPropagation(); updateSettings({ satellite_provider: 'nasa_modis' }); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${settings.satellite_provider === 'nasa_modis' ? 'bg-cyan-900 text-cyan-200 border-cyan-400 font-bold' : 'bg-black/40 text-gray-400 border-gray-700 hover:text-white'}`}
                  title="NASA GIBS MODIS Terra Daily Optical (Ground Truth)"
                >
                  DAILY MODIS
                </button>
                <button
                  type="button"
                  data-testid="sat-provider-goes"
                  onClick={(e) => { e.stopPropagation(); updateSettings({ satellite_provider: 'goes_live' }); }}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${settings.satellite_provider === 'goes_live' ? 'bg-cyan-900 text-cyan-200 border-cyan-400 font-bold' : 'bg-black/40 text-gray-400 border-gray-700 hover:text-white'}`}
                  title="NOAA GOES GeoColor (10-Minute Live Weather Satellite)"
                >
                  10M GOES
                </button>
              </div>
            )}

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.labels ? 'opacity-70' : ''}`} onClick={() => toggleLayer('labels')} onMouseEnter={() => setHoveredLegendLayer('labels')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.labels ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.labels ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🏷️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Place & Water Labels</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.labels ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.labels ? 'ON' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.boundaries ? 'opacity-70' : ''}`} onClick={() => toggleLayer('boundaries')} onMouseEnter={() => setHoveredLegendLayer('boundaries')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.boundaries ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.boundaries ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🌐</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">State & Country Borders</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.boundaries ? 'text-amber-400 bg-amber-950 border-amber-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.boundaries ? 'ON' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.road_closures ? 'opacity-70' : ''}`} onClick={() => toggleLayer('road_closures')} onMouseEnter={() => setHoveredLegendLayer('road_closures')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-road-closures-layer" className={settings.layers.road_closures ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.road_closures ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🚧</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Road Closures (3D AR)</span>}
              </span>
              <span data-testid="sidebar-count-road-closures" className="text-orange-400 font-bold ml-2 text-xs">{visibleCounts.road_closures}</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_ar ? 'opacity-70' : ''}`} onClick={() => toggleLayer('weather_ar')} onMouseEnter={() => setHoveredLegendLayer('weather_ar')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-weather-ar-layer" className={settings.layers.weather_ar ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_ar ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-300 font-bold text-sm leading-none shrink-0 w-4 text-center">⛈️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">3D AR Weather (Rain/Snow)</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.weather_ar ? 'text-cyan-300 bg-cyan-950 border-cyan-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.weather_ar ? 'ACTIVE' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.solar_terminator ? 'opacity-70' : ''}`} onClick={() => toggleLayer('solar_terminator')} onMouseEnter={() => setHoveredLegendLayer('solar_terminator')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-solar-terminator-layer" className={settings.layers.solar_terminator ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.solar_terminator ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-300 font-bold text-sm leading-none shrink-0 w-4 text-center">🌓</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">3D AR Day/Night Cycle</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.solar_terminator ? 'text-amber-300 bg-amber-950 border-amber-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.solar_terminator ? 'LIVE' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.drone_docks ? 'opacity-70' : ''}`} onClick={() => toggleLayer('drone_docks')} onMouseEnter={() => setHoveredLegendLayer('drone_docks')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-drone-docks-layer" className={settings.layers.drone_docks ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.drone_docks ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🛸</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Drone Docks (10 NB + Global)</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2 text-xs">20</span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.blind_spots ? 'opacity-70' : ''}`} onClick={() => toggleLayer('blind_spots')} onMouseEnter={() => setHoveredLegendLayer('blind_spots')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-blind-spots-layer" className={settings.layers.blind_spots ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.blind_spots ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 font-bold text-sm leading-none shrink-0 w-4 text-center">⚠️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Coverage Blind Spots</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.blind_spots ? 'text-amber-400 bg-amber-950 border-amber-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.blind_spots ? 'AUDIT' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.land_ownership ? 'opacity-70' : ''}`} onClick={() => toggleLayer('land_ownership')} onMouseEnter={() => setHoveredLegendLayer('land_ownership')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-land-ownership-layer" className={settings.layers.land_ownership ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.land_ownership ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🏛️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Land Jurisdiction & BLM</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.land_ownership ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.land_ownership ? 'ACTIVE' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.zero_blind_spot_hud ? 'opacity-70' : ''}`} onClick={() => toggleLayer('zero_blind_spot_hud')} onMouseEnter={() => setHoveredLegendLayer('zero_blind_spot_hud')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-zero-blind-spot-hud" className={settings.layers.zero_blind_spot_hud ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.zero_blind_spot_hud ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-purple-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🛡️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Zero-Blind-Spot HUD</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.zero_blind_spot_hud ? 'text-purple-400 bg-purple-950 border-purple-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.zero_blind_spot_hud ? 'AUDIT' : 'OFF'}
              </span>
            </div>

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.toxic_sites ? 'opacity-70' : ''}`} onClick={() => toggleLayer('toxic_sites')} onMouseEnter={() => setHoveredLegendLayer('toxic_sites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-toxic-sites-layer" className={settings.layers.toxic_sites ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.toxic_sites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 font-bold text-sm leading-none shrink-0 w-4 text-center">☣️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Toxic Sites & Plumes (EPA)</span>}
              </span>
              <span data-testid="sidebar-count-toxic-sites" className="text-red-400 font-bold ml-2 text-xs">{visibleCounts.toxic_sites}</span>
            </div>

        </div>
      </div>
      )}
      
      
      {/* C2 Command Bar: Unified, Responsive Header */}
      <div 
        style={{
          left: windowDimensions.width < 640 ? '8px' : '16px',
          right: windowDimensions.width < 640 ? '8px' : '16px',
          top: windowDimensions.width < 640 ? '8px' : '12px'
        }}
        className="absolute z-30 flex flex-nowrap items-center justify-between gap-2 sm:gap-4 pointer-events-none transition-all duration-300 ease-in-out"
      >
        {/* Left C2 Group: Brand & Geocoding Search */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink min-w-0">
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 shrink-0 bg-black/85 border border-cyan-800/80 px-2 sm:px-2.5 py-1.5 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(8,145,178,0.3)]">
            <h1 className="text-xs sm:text-sm font-bold text-cyan-400 tracking-widest whitespace-nowrap">{headerTier === 'mobile' ? 'SPHINX' : 'SPHINX OS'}</h1>
          <button
            type="button"
            data-testid="hud-btn-tier-pill"
            onClick={() => {
              setTierUpgradeTrigger(null);
              setShowTierUpgrade(true);
            }}
            className={`text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold border transition-all hover:scale-105 ${settings.tier === 'sovereign' ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : settings.tier === 'pro' ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-gray-300 border-gray-600 hover:text-white'}`}
            title="View Tier Entitlements & Live Simulator"
          >
            {(settings.tier || 'free').toUpperCase()}
          </button>
          <button 
            type="button"
            data-testid="hud-btn-toggle-legend"
            onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
            className="text-cyan-400 hover:text-white transition-colors p-0.5 sm:p-1 text-xs sm:text-sm font-bold flex items-center gap-1"
            title={isLegendCollapsed ? "Maximize Data Points / Legend" : "Minimize Data Points / Legend"}
          >
            <span>{isLegendCollapsed ? '▶' : '▼'}</span>
            {(headerTier === 'full' || headerTier === 'standard') && (
              <span className="text-[11px] font-semibold text-cyan-300">
                {isLegendCollapsed ? 'LAYERS' : 'DATA'}
              </span>
            )}
          </button>
        </div>

        <div 
          style={{
            width: headerTier === 'full' ? '240px' : headerTier === 'standard' ? '180px' : headerTier === 'compact' ? '140px' : headerTier === 'minimal' ? '115px' : '95px'
          }}
          className="pointer-events-auto shrink min-w-[80px] transition-all duration-200"
        >
          <GeocodingSearch 
            placeholder={headerTier === 'full' || headerTier === 'standard' ? "Search locations..." : "Search..."} 
            onLocationSelected={(loc) => {
              console.log('[SphinxMap] onLocationSelected:', loc);
              if (mapRef.current) {
                mapRef.current.flyTo({ center: [loc.lon, loc.lat], zoom: 14, duration: 2500 });
              }
              const locationName = (loc.name && loc.name !== 'Unknown') ? loc.name : (loc.city || (loc.postcode ? `Area ${loc.postcode}` : 'Selected Area'));
              handleSelectCityCrime(locationName, loc.lat, loc.lon);
              setShowCityCrimePanel(true);
              if (!settings.layers.crime_live) {
                updateSettings({ layers: { ...settings.layers, crime_live: true } });
              }
            }} 
          />
        </div>
      </div>

      <div id="sphinx-hud-launcher" className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap py-0.5 justify-end z-20">
          {/* 0. Sphinx Tactical AI Launcher */}
          <button 
            type="button"
            data-testid="hud-btn-sphinx-ai"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={`relative group px-2 sm:px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 shrink-0 ${
              showAIAssistant
                ? 'bg-cyan-900 border-cyan-400 text-cyan-100 shadow-[0_0_18px_rgba(6,182,212,0.7)] animate-pulse'
                : 'bg-black/85 border-cyan-700/80 text-cyan-300 hover:bg-cyan-950/80 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
            }`}
            title="Launch Sphinx Tactical AI Intelligence Analyst (Crime in any city, Aviation crash analytics, Map telemetry)"
          >
            <span className="text-sm">🧠</span>
            {headerTier === 'full' && <span className="font-bold">SPHINX AI</span>}
            {(headerTier === 'standard' || headerTier === 'compact') && <span className="font-bold">AI</span>}
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SPHINX AI</span>
          </button>

          {/* Threats Overview */}
          <button type="button" data-testid="hud-btn-threat-overview" onClick={() => handleJumpTo({ lat: 39.8283, lon: -98.5795, zoom: 4.2 })} className="relative group bg-black/85 px-2.5 py-1.5 rounded-lg border border-amber-600/80 shadow-[0_0_12px_rgba(245,158,11,0.35)] backdrop-blur-md hover:bg-amber-950/60 transition-colors font-mono text-amber-300 text-xs sm:text-sm flex items-center gap-1.5 shrink-0" title="Swoop to continental threats overview">
            <span>🛰️</span>
            {headerTier === 'full' && <span className="font-semibold">Threats ({visibleCounts.wildfires || 0})</span>}
            {(headerTier === 'standard' || headerTier === 'compact') && <span className="font-semibold">({visibleCounts.wildfires || 0})</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">THREATS OVERVIEW</span>
          </button>

          {/* 1. Live Refresh */}
          <button 
            type="button"
            data-testid="hud-btn-live-refresh"
            onClick={handleSeamlessRefresh}
            disabled={isRefreshing}
            className="relative group bg-black/85 px-2.5 py-1.5 rounded-lg border border-cyan-700 shadow-[0_0_12px_rgba(6,182,212,0.35)] backdrop-blur-md hover:bg-cyan-950/60 transition-colors font-mono text-cyan-300 text-xs sm:text-sm flex items-center gap-1.5 shrink-0"
            title="Seamlessly refresh all live OSINT data without page reload"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-cyan-400" : "text-cyan-400"} />
            {headerTier === 'full' && <span className="font-semibold">{isRefreshing ? 'Refreshing...' : 'Live Refresh'}</span>}
            {headerTier === 'standard' && <span className="font-semibold">{isRefreshing ? '...' : 'Refresh'}</span>}
            {lastRefreshedAt && <span className="text-[10px] text-cyan-400/80 font-mono hidden 2xl:inline">[{lastRefreshedAt}]</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">LIVE REFRESH</span>
          </button>

          {/* 4. Weather & Wind */}
          <button 
            type="button"
            data-testid="hud-btn-wind-storms"
            onClick={() => { setShowWeatherWind(!showWeatherWind); if (!settings.layers.wind_hud) toggleLayer('wind_hud'); }}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              settings.layers.wind_hud
                ? 'bg-sky-950/90 border-sky-400 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                : 'bg-black/80 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900/60'
            }`}
            title={`Toggle On-Map Wind HUD (${settings.layers.wind_hud ? 'ON' : 'OFF'}): ${currentWeatherVector.windSpeedKnots}kt @ ${currentWeatherVector.windDirectionDeg}°`}
          >
            <span>💨</span>
            {(headerTier === 'full' || headerTier === 'standard') && <span className="font-semibold">Wind</span>}
            {headerTier === 'full' && <span className="text-[11px] text-cyan-300 font-mono">{currentWeatherVector.windSpeedKnots}kt</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-sky-300 border border-sky-500/70 shadow-[0_0_12px_rgba(14,165,233,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">WIND & WEATHER</span>
          </button>

          {/* 4. Traffic Routing */}
          <button 
            type="button"
            data-testid="hud-btn-routing"
            onClick={() => setShowDirections(!showDirections)}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              showDirections
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(8,145,178,0.5)]'
                : 'bg-black/80 border-cyan-950/80 text-cyan-400 hover:bg-cyan-950/40'
            }`}
            title="Tactical Route Planning & Traffic"
          >
            <span>🧭</span>
            {(headerTier === 'full' || headerTier === 'standard') && <span>Routing</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(8,145,178,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TACTICAL ROUTING</span>
          </button>

          {/* 5. Drop Pin */}
          <button 
            type="button"
            data-testid="hud-btn-drop-pin"
            onClick={() => setIsDroppingPin(!isDroppingPin)}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              isDroppingPin 
                ? 'bg-purple-900/90 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse' 
                : 'bg-black/80 border-purple-950/80 text-purple-400 hover:bg-purple-950/40'
            }`}
            title="Drop a custom tactical pin on the map"
          >
            <span>📍</span>
            {(headerTier === 'full' || headerTier === 'standard') && <span>{isDroppingPin ? 'Cancel' : 'Pin'}</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-purple-300 border border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">{isDroppingPin ? 'CANCEL PIN' : 'DROP PIN'}</span>
          </button>

          {/* 6. Tactical Tools Popover Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-testid="hud-btn-tools-menu"
              onClick={() => setShowToolsMenu(!showToolsMenu)}
              className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
                showToolsMenu || showSolarPanel || showFieldManuals || showRangeRings || showCelestialDome || showCityCrimePanel || settings.layers.fire_spread_forecast || settings.layers.crime_live
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-black/80 border-gray-800 text-gray-300 hover:text-white hover:bg-gray-900/60'
              }`}
              title="Tactical OSINT Tools & Ephemeris"
            >
              <span>🛠️</span>
              {headerTier !== 'mobile' && <span>Tools</span>}
              <ChevronDown size={14} className={`transition-transform duration-200 ${showToolsMenu ? 'rotate-180 text-cyan-400' : 'text-gray-400'}`} />
              <span className="pointer-events-none absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TACTICAL TOOLS</span>
            </button>

            {showToolsMenu && (
              <div 
                style={{
                  maxHeight: `${Math.min(480, Math.max(240, windowDimensions.height - 90))}px`
                }}
                data-testid="hud-tools-dropdown"
                className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-24px)] bg-black/95 border border-cyan-800/80 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl p-2 z-50 flex flex-col gap-1 font-mono text-xs overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-900/50 flex justify-between items-center mb-1">
                  <span>Tactical Systems</span>
                  <button onClick={() => setShowToolsMenu(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
                </div>
                <button 
                  type="button" 
                  data-testid="hud-btn-range-rings"
                  onClick={() => { setShowRangeRings(!showRangeRings); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showRangeRings ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🎯</span> Range Rings</span>
                  {showRangeRings && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-solar"
                  onClick={() => { setShowSolarPanel(!showSolarPanel); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showSolarPanel ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>☀️</span> Solar Ephemeris</span>
                  {showSolarPanel && <span className="text-[10px] text-amber-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-sky-dome"
                  onClick={() => { setShowCelestialDome(!showCelestialDome); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showCelestialDome ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🌌</span> Celestial Dome</span>
                  {showCelestialDome && <span className="text-[10px] text-indigo-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-manuals"
                  onClick={() => { setShowFieldManuals(!showFieldManuals); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showFieldManuals ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>📖</span> Field Manuals</span>
                  {showFieldManuals && <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-weather-forecast"
                  onClick={() => { setShowWeatherWind(!showWeatherWind); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showWeatherWind ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>📊</span> Multi-Horizon Weather</span>
                  {showWeatherWind && <span className="text-[10px] text-sky-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-aviation-safety"
                  onClick={() => { setShowAviationSafety(!showAviationSafety); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showAviationSafety ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>✈️</span> Flight Safety & Risk</span>
                  {showAviationSafety && <span className="text-[10px] text-sky-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-crime"
                  onClick={() => { setShowCityCrimePanel(!showCityCrimePanel); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showCityCrimePanel ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🚨</span> City Crime Intel</span>
                  {showCityCrimePanel && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-recon"
                  onClick={() => { setShowCitizenRecon(true); setShowToolsMenu(false); }}
                  className="px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors hover:bg-amber-950/40 text-amber-300"
                >
                  <span className="flex items-center gap-2"><span>📡</span> Field Recon Report</span>
                  <span className="text-[10px] text-amber-500 font-bold">INTEL</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-zero-blind-spot"
                  onClick={() => { toggleLayer('zero_blind_spot_hud'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.zero_blind_spot_hud ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🛡️</span> Zero-Blind-Spot HUD</span>
                  {settings.layers.zero_blind_spot_hud && <span className="text-[10px] text-purple-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-homebuyer-safety"
                  onClick={() => { setIsHomebuyerModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isHomebuyerModalOpen ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-red-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>☣️</span> Homebuyer Toxic Plume Audit</span>
                  <span className="text-[10px] text-red-400 font-bold">DUE DILIGENCE</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-snowboard-trails"
                  onClick={() => { toggleLayer('snowboard_trails'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.snowboard_trails ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🏂</span> Snowboard & Ski Trails (6,000+)</span>
                  {settings.layers.snowboard_trails && <span className="text-[10px] text-cyan-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-fire-spread"
                  onClick={() => { toggleLayer('fire_spread_forecast'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.fire_spread_forecast ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-red-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🔥</span> Fire Spread Forecast</span>
                  {settings.layers.fire_spread_forecast && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-crime-intel"
                  onClick={() => {
                    setShowCityCrimePanel(!showCityCrimePanel);
                    if (!settings.layers.crime_live) {
                      updateSettings({ layers: { ...settings.layers, crime_live: true } });
                    }
                    setShowToolsMenu(false);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showCityCrimePanel || settings.layers.crime_live ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-red-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🚨</span> City & Neighborhood Crime</span>
                  {(showCityCrimePanel || settings.layers.crime_live) && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-settings"
                  onClick={() => { setIsSettingsOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isSettingsOpen ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>⚙️</span> System Settings & Cursor</span>
                  <span className="text-[10px] text-cyan-400 font-bold">CONFIG</span>
                </button>
              </div>
            )}
          </div>

          {/* 7. Settings & Cursor */}
          <button 
            type="button"
            data-testid="hud-btn-settings-header"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              isSettingsOpen 
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'bg-black/80 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900/60'
            }`}
            title="System Settings & Cursor Customization"
          >
            <span>⚙️</span>
            {headerTier === 'full' && <span>Settings</span>}
            <span className="pointer-events-none absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SETTINGS & CURSOR</span>
          </button>
        </div>
      </div>
      
      {isDroppingPin && (
        <div className="fixed top-20 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <div className="bg-purple-950/95 border-2 border-purple-400 text-purple-200 px-5 py-2 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.8)] backdrop-blur-md font-mono text-xs sm:text-sm flex items-center gap-3 animate-pulse">
            <span className="text-base">📍</span>
            <span><strong>PIN PLACEMENT ACTIVE</strong> — Click anywhere on map to drop pin</span>
            <button 
              onClick={() => setIsDroppingPin(false)} 
              className="bg-purple-800/80 hover:bg-purple-700 text-white px-2 py-0.5 rounded text-xs ml-2 border border-purple-400 font-mono"
            >
              Cancel (Esc)
            </button>
          </div>
        </div>
      )}
      
      {pickingRoutingPoint && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/95 border border-emerald-500 rounded-full px-5 py-2 font-mono text-xs text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center gap-3">
          <span className="animate-pulse">🎯 CLICK ANYWHERE ON MAP TO SET {pickingRoutingPoint.toUpperCase()}</span>
          <button 
            onClick={() => setPickingRoutingPoint(null)} 
            className="text-gray-400 hover:text-white px-1.5 py-0.5 rounded bg-gray-800 text-[10px]"
          >
            Cancel
          </button>
        </div>
      )}

      {showDirections && (
        <div 
          style={{
            left: windowDimensions.width < 640 ? '16px' : dynamicC2Left
          }}
          className="absolute top-28 sm:top-16 z-20 max-w-[calc(100vw-32px)] transition-all duration-300"
        >
          <DirectionsPanel 
            onRouteCalculated={setDirectionsResult} 
            currentCenter={{ lat: viewState.latitude, lng: viewState.longitude }}
            savedLocations={settings.saved_locations}
            customPins={settings.custom_pins}
            onStartPickMode={(target) => setPickingRoutingPoint(target)}
            pickingTarget={pickingRoutingPoint}
            pickedPoint={pickedRoutingPoint}
            onClose={() => setShowDirections(false)}
            currentTier={settings.tier || 'free'}
            onRequireUpgrade={(feature) => {
              setTierUpgradeTrigger(feature);
              setShowTierUpgrade(true);
            }}
          />
        </div>
      )}

      {showSolarPanel && (
        <SolarPanel 
          currentCenter={{ lat: viewState.latitude, lng: viewState.longitude }}
          onClose={() => setShowSolarPanel(false)}
        />
      )}

      {showFieldManuals && (
        <FieldManualsPanel onClose={() => setShowFieldManuals(false)} />
      )}

      {showRangeRings && (
        <RangeRingsPanel 
          centerCoordinates={{ lat: viewState.latitude, lon: viewState.longitude }}
          onRingsUpdate={setRangeRingsGeoJSON}
          onClose={() => setShowRangeRings(false)} 
          leftOffset={dynamicC2Left}
        />
      )}

      {showCelestialDome && (
        <CelestialDomeModal 
          lat={viewState.latitude} 
          lon={viewState.longitude} 
          onClose={() => setShowCelestialDome(false)} 
        />
      )}

      {showWeatherWind && (
        <WeatherWindPanel 
          currentCenter={{ lat: viewState.latitude, lon: viewState.longitude }}
          settings={settings}
          updateSettings={updateSettings}
          onClose={() => setShowWeatherWind(false)}
          onOpenAIWithQuery={(q) => {
            setShowWeatherWind(false);
            setAiInitialQuery(q);
            setShowAIAssistant(true);
          }}
        />
      )}

      {showAviationSafety && (
        <AviationSafetyPanel
          aircraftCount={aircraftFeatures.length}
          onClose={() => setShowAviationSafety(false)}
          onOpenAI={(q) => {
            setShowAviationSafety(false);
            setAiInitialQuery(q);
            setShowAIAssistant(true);
          }}
          onToggleAircraftLayer={() => toggleLayer('aircraft')}
          isAircraftLayerActive={settings.layers.aircraft}
        />
      )}

      <OfflineDownloaderModal 
        isOpen={isDownloaderOpen} 
        onClose={() => setIsDownloaderOpen(false)} 
        bbox={downloadBbox} 
        clientId={clientId} 
      />

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings} 
        updateSettings={updateSettings} 
        currentViewState={{ lat: viewState.latitude, lon: viewState.longitude, zoom: viewState.zoom }}
        onJumpTo={handleJumpTo}
      />

      <SentinelAlertBanner onJumpTo={(lat, lon, zoom) => handleJumpTo({ lat, lon, zoom: zoom || 14 })} />

      {settings.layers.zero_blind_spot_hud && (
        <ZeroBlindSpotAnalyticsHUD
          auditResult={auditResult}
          leftOffset={dynamicC2Left}
          onJumpTo={(lon, lat, zoom, pitch) => {
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [lon, lat],
                zoom: zoom ?? 14,
                pitch: pitch ?? 45,
                duration: 2000
              });
            }
          }}
          showBlindSpots={settings.layers.blind_spots}
          onToggleBlindSpots={() => toggleLayer('blind_spots')}
          showDroneDocks={settings.layers.drone_docks}
          onToggleDroneDocks={() => toggleLayer('drone_docks')}
          showPublicLands={settings.layers.land_ownership}
          onTogglePublicLands={() => toggleLayer('land_ownership')}
          onClose={() => toggleLayer('zero_blind_spot_hud')}
        />
      )}

      {selectedToxicSite && (
        <ToxicSitePopupCard
          site={selectedToxicSite}
          onClose={() => setSelectedToxicSite(null)}
          onInspect3D={(coords) => {
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: coords,
                zoom: 16.5,
                pitch: 55,
                bearing: 45,
                duration: 1600
              });
            }
          }}
          onAuditSite={() => setIsHomebuyerModalOpen(true)}
        />
      )}

      <HomebuyerSafetyModal
        isOpen={isHomebuyerModalOpen}
        onClose={() => setIsHomebuyerModalOpen(false)}
        currentLat={viewState.latitude}
        currentLon={viewState.longitude}
        onJumpToSite={(coords, z) => {
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: coords,
              zoom: z || 14.5,
              pitch: 50,
              duration: 1600
            });
          }
        }}
      />

      {showCityCrimePanel && (
        <CityCrimePanel
          activeCityCrime={activeCityCrime}
          onSelectCity={handleSelectCityCrime}
          onSelectNeighborhood={handleSelectNeighborhood}
          onToggleCrimeLayer={() => toggleLayer('crime_live')}
          isCrimeLayerActive={settings.layers.crime_live}
          onToggleHeatmapLayer={() => {
            if (settings.tier === 'free') {
              setTierUpgradeTrigger('crime_heatmap');
              setShowTierUpgrade(true);
            } else {
              toggleLayer('crime_heatmap');
            }
          }}
          isHeatmapLayerActive={settings.layers.crime_heatmap}
          onOpenAI={(q) => {
            setShowCityCrimePanel(false);
            setAiInitialQuery(q);
            setShowAIAssistant(true);
          }}
          onClose={() => setShowCityCrimePanel(false)}
        />
      )}

      <CitizenReconModal
        isOpen={showCitizenRecon}
        currentCoords={{ lat: viewState.latitude, lon: viewState.longitude }}
        onClose={() => setShowCitizenRecon(false)}
        onSubmitReport={handleSubmitCitizenReport}
      />

      <TierUpgradeModal
        isOpen={showTierUpgrade}
        onClose={() => setShowTierUpgrade(false)}
        currentTier={settings.tier || 'free'}
        onSelectTier={(newTier) => updateSettings({ ...settings, tier: newTier })}
        featureTrigger={tierUpgradeTrigger}
      />

      <SphinxAIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        mapContext={{
          center: { lat: viewState.latitude, lon: viewState.longitude },
          zoom: viewState.zoom,
          city: activeCityCrime?.city || 'Chicago',
          layerCounts: {
            wildfires: visibleCounts.wildfires || 0,
            earthquakes: visibleCounts.earthquakes || 0,
            aircraft: visibleCounts.aircraft || 0,
            vessels: visibleCounts.vessels || 0,
            cables: visibleCounts.submarine_cables || 0
          },
          weather: currentWeatherVector
        }}
        initialQuery={aiInitialQuery}
        onClearInitialQuery={() => setAiInitialQuery(undefined)}
        onExecuteAction={handleExecuteMapAction}
      />

      <div data-testid="bottom-tactical-dock" className="absolute bottom-3 sm:bottom-5 right-2 sm:right-6 z-10 flex flex-nowrap gap-1 sm:gap-1.5 bg-black/90 p-1 sm:p-1.5 rounded-xl border border-cyan-900/70 shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md items-center max-w-[calc(100vw-16px)] overflow-x-auto font-mono text-[10px] sm:text-xs">
        <button 
          type="button"
          data-testid="btn-street-map"
          onClick={() => updateSettings({ layers: { ...settings.layers, satellite: false } })}
          className={`relative group px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 sm:gap-1.5 ${!settings.layers.satellite ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-gray-400 hover:text-white'}`}
          title="Switch to original Cartographic street & topography map"
        >
          <span>🗺️</span> <span className="hidden sm:inline">STREET MAP</span><span className="sm:hidden">STREET</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">STREET MAP</span>
        </button>
        <button 
          type="button"
          data-testid="btn-satellite-map"
          onClick={() => updateSettings({ layers: { ...settings.layers, satellite: true } })}
          className={`relative group px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 sm:gap-1.5 ${settings.layers.satellite ? 'bg-sky-950 border border-sky-400 text-sky-300 font-bold shadow-[0_0_10px_rgba(56,189,248,0.4)]' : 'text-gray-400 hover:text-white'}`}
          title="Switch to high-resolution true-color Satellite imagery"
        >
          <span>🛰️</span> <span className="hidden sm:inline">SATELLITE</span><span className="sm:hidden">SAT</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-sky-300 border border-sky-500/70 shadow-[0_0_12px_rgba(56,189,248,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SATELLITE</span>
        </button>
        <div className="h-5 w-px bg-cyan-900/60 mx-0.5 hidden xs:block sm:block" />
        <button 
          type="button"
          data-testid="btn-toggle-labels"
          onClick={() => updateSettings({ layers: { ...settings.layers, labels: !settings.layers.labels } })}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 ${settings.layers.labels ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-bold shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
          title="Toggle city, lake, ocean, and place labels"
        >
          <span>🏷️</span> <span className="hidden xs:inline">LABELS</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-300 border border-emerald-500/70 shadow-[0_0_12px_rgba(52,211,153,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">LABELS</span>
        </button>
        <button 
          type="button"
          data-testid="btn-toggle-boundaries"
          onClick={() => updateSettings({ layers: { ...settings.layers, boundaries: !settings.layers.boundaries } })}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 ${settings.layers.boundaries ? 'bg-amber-950/80 border border-amber-400 text-amber-300 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
          title="Toggle state/provincial lines and country international boundaries"
        >
          <span>🌐</span> <span className="hidden xs:inline">BORDERS</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">BORDERS</span>
        </button>
        <div className="h-5 w-px bg-cyan-900/60 mx-0.5 hidden xs:block sm:block" />
        <button 
          type="button"
          data-testid="btn-toggle-3d-pitch"
          onClick={() => {
            if (mapRef.current) {
              const currentPitch = mapRef.current.getPitch();
              const target = currentPitch > 25 ? 0 : 50;
              mapRef.current.easeTo({ pitch: target, duration: 1200 });
              setIs3DView(target > 25);
            }
          }}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 ${is3DView ? 'bg-purple-950/90 border border-purple-400 text-purple-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.5)]' : 'text-gray-400 hover:text-white'}`}
          title="Toggle 3D AR Perspective View (50° Tactical Pitch)"
        >
          <span>🕶️</span> <span className="hidden xs:inline">3D AR</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-purple-300 border border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">3D AR VIEW (50° TILT)</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button 
          type="button"
          data-testid="btn-live-feed"
          onClick={() => setTimeframe('live')}
          className={`relative group px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider border rounded-lg transition-colors shrink-0 ${timeframe === 'live' ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
        >
          <span className="hidden sm:inline">LIVE FEED</span><span className="sm:hidden">LIVE</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">LIVE FEED</span>
        </button>
        <button 
          type="button"
          data-testid="btn-historical"
          onClick={() => setTimeframe('historical')}
          className={`relative group px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider border rounded-lg transition-colors shrink-0 ${timeframe === 'historical' ? 'bg-orange-950 border-orange-400 text-orange-300 font-bold shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
        >
          <span className="hidden sm:inline">HISTORICAL</span><span className="sm:hidden">HIST</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-orange-300 border border-orange-500/70 shadow-[0_0_12px_rgba(249,115,22,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">HISTORICAL ARCHIVE</span>
        </button>
      </div>

      {pinCreationMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div className="bg-[#0b0f19] border border-cyan-800 p-6 rounded-lg w-full max-w-md text-white font-mono shadow-[0_0_30px_rgba(8,145,178,0.4)]">
            <div className="flex justify-between items-center mb-4 border-b border-cyan-900/60 pb-2">
              <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <span>📍</span> {editingPinId ? 'EDIT CUSTOM PIN' : 'NEW CUSTOM PIN'}
              </h2>
              <button 
                onClick={() => { setPinCreationMode(null); setEditingPinId(null); }} 
                className="text-gray-400 hover:text-white"
              >✕</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="bg-black/60 border border-cyan-950 p-2.5 rounded font-mono text-[11px] text-cyan-300 flex justify-between">
                <span>Lat: {pinCreationMode.lat.toFixed(5)}</span>
                <span>Lon: {pinCreationMode.lon.toFixed(5)}</span>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 uppercase tracking-wider font-semibold">Pin Label / Title</label>
                <input 
                  type="text" 
                  value={pinLabel} 
                  onChange={e => setPinLabel(e.target.value)} 
                  className="w-full bg-black/70 border border-cyan-800/80 rounded p-2 text-white text-sm focus:border-cyan-400 focus:outline-none" 
                  placeholder="e.g. SJC Command Post, Observation Point" 
                  autoFocus 
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 uppercase tracking-wider font-semibold">Category</label>
                <select
                  value={pinCategory}
                  onChange={e => setPinCategory(e.target.value)}
                  className="w-full bg-black/70 border border-cyan-800/80 rounded p-2 text-white text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Tactical">🎯 Tactical / Command</option>
                  <option value="Observation">🔭 Observation Post</option>
                  <option value="Safehouse">🏠 Safehouse / Base</option>
                  <option value="Supply">📦 Supply / Cache</option>
                  <option value="Hazard">⚠️ Hazard / Threat</option>
                  <option value="Waypoint">📍 Waypoint / Landmark</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 uppercase tracking-wider font-semibold">Pin Color Accent</label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: '#a855f7', label: 'Purple' },
                    { hex: '#06b6d4', label: 'Cyan' },
                    { hex: '#10b981', label: 'Emerald' },
                    { hex: '#f59e0b', label: 'Amber' },
                    { hex: '#ef4444', label: 'Red' },
                    { hex: '#ec4899', label: 'Pink' }
                  ].map(({ hex }) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setPinColor(hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        pinColor === hex ? 'scale-125 border-white shadow-[0_0_10px_white]' : 'border-transparent opacity-80'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 uppercase tracking-wider font-semibold">Description</label>
                <textarea 
                  value={pinDescription} 
                  onChange={e => setPinDescription(e.target.value)} 
                  className="w-full bg-black/70 border border-cyan-800/80 rounded p-2 text-white text-sm focus:border-cyan-400 focus:outline-none min-h-[75px]" 
                  placeholder="Operational notes, frequency, elevation, access codes..." 
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-cyan-950">
                <button 
                  onClick={() => {
                    const pinId = editingPinId || Date.now().toString();
                    const newPin: CustomPin = {
                      id: pinId,
                      lat: pinCreationMode.lat,
                      lon: pinCreationMode.lon,
                      label: pinLabel.trim() || 'Pinned Location',
                      description: pinDescription.trim(),
                      color: pinColor,
                      category: pinCategory,
                      createdAt: new Date().toISOString()
                    };
                    const existing = (settings.custom_pins || []).filter((p: any) => p.id !== pinId);
                    updateSettings({ custom_pins: [...existing, newPin] });
                    setPinCreationMode(null);
                    setEditingPinId(null);
                  }} 
                  className="flex-1 bg-cyan-700/80 hover:bg-cyan-600 text-white py-2.5 rounded font-bold text-sm tracking-wide transition-colors border border-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                >
                  {editingPinId ? 'Update Pin' : 'Save Pin to Profile'}
                </button>
                <button 
                  onClick={() => { setPinCreationMode(null); setEditingPinId(null); }} 
                  className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 rounded text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {settings.layers.drone && <DroneFeed onClose={() => updateSettings({ layers: { ...settings.layers, drone: false } })} />}
      {settings.layers.radio && <RadioPanel onClose={() => updateSettings({ layers: { ...settings.layers, radio: false } })} />}
      {settings.layers.defense && <BaseDefensePanel onClose={() => updateSettings({ layers: { ...settings.layers, defense: false } })} />}
      {settings.layers.wind_hud && (
        <WindHudWidget 
          weatherVector={currentWeatherVector}
          onClose={() => updateSettings({ layers: { ...settings.layers, wind_hud: false } })}
          onOpenDeepForecast={() => setShowWeatherWind(true)}
        />
      )}
      <CustomCursor settings={settings.cursor} />
    </div>
  );
}

