"use client";
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Map, { Source, Layer, Popup, Marker, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Eye, EyeOff, RefreshCw, ChevronDown, Compass, RotateCw, RotateCcw } from 'lucide-react';

import { useSettings, LocationState, CustomPin, UserTier, TIER_CONFIG, isFeatureAllowed } from '../lib/useSettings';
const TierUpgradeModal = dynamic(() => import('./TierUpgradeModal').then(m => m.TierUpgradeModal), { ssr: false });
import SettingsPanel from './SettingsPanel';
import { GeocodingSearch } from './GeocodingSearch';
const OfflineDownloaderModal = dynamic(() => import('./OfflineDownloaderModal'), { ssr: false });
import { DirectionsPanel } from './DirectionsPanel';
import { SolarPanel } from './SolarPanel';
import { DroneFeed } from './DroneFeed';
import { RadioPanel } from './RadioPanel';
import { BaseDefensePanel } from './BaseDefensePanel';
import { CustomCursor } from './CustomCursor';
import { FieldManualsPanel } from './FieldManualsPanel';
import { RangeRingsPanel } from './RangeRingsPanel';
const CelestialDomeModal = dynamic(() => import('./CelestialDomeModal').then(m => m.CelestialDomeModal), { ssr: false });
import { WeatherWindPanel } from './WeatherWindPanel';
import { AviationSafetyPanel } from './AviationSafetyPanel';
import { WindHudWidget } from './WindHudWidget';
import { AppleWeatherHud, AppleWeatherMetrics } from './AppleWeatherHud';
import { generateIsobarField } from '../lib/weatherPressureEngine';
import { generateAtmosphericRadarGeoJSON } from '../lib/atmosphericRadarEngine';
const SphinxAIAssistant = dynamic(() => import('./SphinxAIAssistant').then(m => m.SphinxAIAssistant), { ssr: false });
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
import type { CitizenReport } from './CitizenReconModal';
const CitizenReconModal = dynamic(() => import('./CitizenReconModal').then(m => m.CitizenReconModal), { ssr: false });
import { offlineMesh } from '../lib/mesh/OfflineMeshService';
import { CityCrimePanel } from './CityCrimePanel';
import { RoadClosure3DLayer } from './RoadClosure3DLayer';
import { Weather3DARLayer } from './Weather3DARLayer';
import { SolarTerminator3DLayer } from './SolarTerminator3DLayer';
import { DroneDock3DLayer } from './DroneDock3DLayer';
import { ZeroBlindSpotAnalyticsHUD } from './ZeroBlindSpotAnalyticsHUD';
import { ToxicPlume3DLayer } from './ToxicPlume3DLayer';
import { ToxicSitePopupCard } from './ToxicSitePopupCard';
const HomebuyerSafetyModal = dynamic(() => import('./HomebuyerSafetyModal').then(m => m.HomebuyerSafetyModal), { ssr: false });
import { ToxicSite, GLOBAL_TOXIC_SITES } from '../lib/intelligence/toxicSitesData';
import { GlobalDataEngine, ViewportAuditResult } from '../lib/intelligence/globalDataEngine';
import { getSnowboardResortsGeoJSON } from '../lib/routing/snowboardResorts';
import { getLakesGeoJSON } from '../lib/geo/curatedLocations';
import { SnowboardResortPopup } from './SnowboardResortPopup';
import { ResortPisteEngine } from '../lib/routing/resortPisteEngine';
const CommunityReportModal = dynamic(() => import('./CommunityReportModal').then(m => m.CommunityReportModal), { ssr: false });
const AdminReputationModal = dynamic(() => import('./AdminReputationModal'), { ssr: false });
import { loadLocalCommunityReports, buildCommunityReportsGeoJson, CommunityReport } from '../lib/communityReports';
import { ChemicalSprayingEngine } from '../lib/intelligence/chemicalSprayingEngine';
const ChemicalSprayingModal = dynamic(() => import('./ChemicalSprayingModal').then(m => m.ChemicalSprayingModal), { ssr: false });
import { CriticalInfrastructureEngine } from '../lib/intelligence/criticalInfrastructureEngine';
import { DefenseInfrastructureEngine } from '../lib/intelligence/defenseInfrastructureEngine';
import { FloodHydrologyEngine } from '../lib/intelligence/floodHydrologyEngine';
const FloodSimulatorModal = dynamic(() => import('./FloodSimulatorModal').then(m => m.FloodSimulatorModal), { ssr: false });
import { TopographyElevationEngine, TopoTileProvider } from '../lib/intelligence/topographyElevationEngine';
import { registerElevationHeatmapProtocol } from '../lib/elevation/elevationHeatmapProtocol';
const TopographyElevationModal = dynamic(() => import('./TopographyElevationModal').then(m => m.TopographyElevationModal), { ssr: false });
import { FarmsRanchesEngine } from '../lib/intelligence/farmsRanchesEngine';
import { FloraNaturopathicEngine } from '../lib/intelligence/floraNaturopathicEngine';
const FloraNaturopathicModal = dynamic(() => import('./FloraNaturopathicModal').then(m => m.FloraNaturopathicModal), { ssr: false });
import { ResilientDataClient } from '../lib/intelligence/resilientDataClient';
import { CameraFeedsEngine, LiveCameraFeed } from '../lib/intelligence/cameraFeedsEngine';
const LiveCameraFeedModal = dynamic(() => import('./LiveCameraFeedModal'), { ssr: false });
import { CountryScopeEngine } from '../lib/intelligence/countryScopeEngine';
const OfflineSurvivalHubModal = dynamic(() => import('./OfflineSurvivalHubModal').then(m => m.OfflineSurvivalHubModal), { ssr: false });
import { StrategicEnergyAndWaterEngine } from '../lib/intelligence/strategicEnergyAndWaterEngine';
import { SurvivalRoutingEngine } from '../lib/intelligence/survivalRoutingEngine';
const GlobalDisclaimersModal = dynamic(() => import('./GlobalDisclaimersModal'), { ssr: false });
const ConstitutionalLawModal = dynamic(() => import('./ConstitutionalLawModal'), { ssr: false });
import { DraggablePopupWrapper } from './DraggablePopupWrapper';
import { PinThreatEngine, ThreatRadarSummary } from '../lib/intelligence/pinThreatEngine';
const PinThreatRadarModal = dynamic(() => import('./PinThreatRadarModal').then(m => m.PinThreatRadarModal), { ssr: false });
const InfrastructureCascadeModal = dynamic(() => import('./InfrastructureCascadeModal').then(m => m.InfrastructureCascadeModal), { ssr: false });
import { ALL_CURATED_LOCATIONS } from '../lib/geo/curatedLocations';

if (typeof window !== 'undefined') {
  registerElevationHeatmapProtocol(maplibregl);
}

function getNearestCuratedArea(lat: number, lon: number): string | null {
  let closestName: string | null = null;
  let minDistanceSq = 0.25; // within ~30-40km
  for (const loc of ALL_CURATED_LOCATIONS) {
    const dLat = loc.lat - lat;
    const dLon = loc.lon - lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestName = loc.stateOrCountry ? `${loc.name}, ${loc.stateOrCountry}` : loc.name;
    }
  }
  return closestName;
}

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

const EMPTY_GEOJSON: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };

const DATA_POINTS_TOOLTIPS: Record<string, string> = {
  custom_pins: "Custom Pins: User-defined tactical map markers, POIs, and waypoints with customizable colors and categories.",
  aircraft: "Aircraft: Live commercial, general aviation, and military aircraft tracking powered by ADS-B telemetry with flight vectors and altitude.",
  cell_towers: "Cell Towers: Cellular radio transmission masts, OpenCelliD antenna towers, LTE/5G nodes, and wireless carrier infrastructure.",
  springs: "Springs: Natural freshwater springs, thermal mineral aquifers, and artesian groundwater sources from USGS National Hydrography data.",
  power: "Power Grid: Electrical substations, power generation plants, transformer yards, and high-voltage distribution infrastructure.",
  aviation: "Aviation / Helipads: Public and private airports, civil airstrips, emergency medical helipads, and military runways.",
  emergency: "Emergency Services: Police stations, fire & rescue departments, EMS ambulance bases, and disaster response stations.",
  cameras: "Cameras / ALPR: Automated license plate readers (Flock, Axon, Genetec), municipal traffic cameras, and surveillance CCTV networks.",
  historical_cameras: "Historical Surveillance: Decommissioned, relocated, or removed surveillance cameras and audit logs of historical observation points.",
  community_reports: "Community Reports: Verified crowdsourced field reports from local observers (elevated after receiving 3+ community vouches).",
  weather_stations: "Weather Stations: NOAA METAR automated surface weather observation stations, aviation weather reports, and regional barometric telemetry.",
  data_centers: "Data Centers: Hyperscale cloud facilities, telecom carrier hotels, colocation server farms, and internet exchange point nodes.",
  radars: "Radar / Arrays: NEXRAD Doppler weather radars, military phased array early-warning radar installations, and aerospace telemetry dishes.",
  public_lands: "Public Lands: Federally managed public lands including Bureau of Land Management (BLM), US Forest Service (USFS), and National Parks boundaries.",
  campsites: "Campsites: Established campgrounds, dispersed backcountry campsites, RV parks, and recreation permits on public lands.",
  trails: "Trails / Paths: USGS recreational hiking, mountain biking, equestrian, and backcountry wilderness trail networks.",
  snowboard_trails: "Snowboard & Ski Resorts: Worldwide directory of 6,000+ ski and snowboard resorts, mountain piste difficulty ratings, and chairlift networks.",
  disasters: "Disasters / Events: Active FEMA emergency declarations, NOAA severe storm tracks, and declared national disaster zones.",
  crime_live: "Crime & Threats: Real-time municipal police 911 dispatch calls, incident reports, neighborhood crime logs, and active threats.",
  crime_heatmap: "Crime Density Heatmap: GPU-accelerated kernel density heatmap displaying incident intensity, hot spots, and crime trends.",
  earthquakes: "Earthquakes: USGS live seismic events, tremor coordinates, depth, and Richter magnitude telemetry worldwide.",
  submarine_cables: "Subsea Cables: Transoceanic fiber-optic communications landing points and undersea internet backbone cables.",
  wildfires: "Wildfires (FIRMS): Active thermal fire perimeters and thermal anomalies detected by NASA satellite sensors (VIIRS and MODIS).",
  fire_spread_forecast: "Fire Spread Forecast: Computational fire progression model forecasting wildfire perimeter spread across 1h, 3h, 6h, and 12h horizons based on wind and fuel.",
  vessels: "Vessels (AIS): Real-time maritime automatic identification system (AIS) tracking for cargo ships, tankers, passenger ferries, and military craft.",
  atlas_obscura: "Atlas Obscura: Curated geographic catalog of strange monuments, hidden landmarks, forgotten ruins, and historical curiosities.",
  wind_hud: "Live Wind HUD: Real-time atmospheric wind velocity vectors, direction angles, and Beaufort force overlays.",
  weather_radar: "Weather Radar: High-resolution Doppler precipitation radar reflectivity tiles from RainViewer and NOAA NEXRAD.",
  weather_clouds: "Cloud Coverage (IR): Near real-time infrared and visual cloud cover satellite imagery from NOAA GOES and EUMETSAT.",
  weather_pressure: "Barometer & Isobars: Atmospheric barometric pressure contours (isobars), synoptic high/low pressure systems, and altimeter settings.",
  atmospheric_radar: "Atmospheric / HAARP Radar: High-frequency active auroral research and ionospheric research radar array installations.",
  lightning: "Lightning Strikes: Real-time global atmospheric electrical discharge detections from the Earth Networks Global Lightning Network (ENGLN).",
  satellite: "Base Map Imagery: Toggle between high-resolution true-color satellite orthoimagery (ArcGIS, NASA VIIRS, MODIS, NOAA GOES) and cartographic street maps.",
  labels: "Place & Water Labels: Vector city labels, street names, mountain summits, and pristine high-contrast water body labels.",
  boundaries: "State & Country Borders: International borders, territorial waters, and administrative state and provincial boundaries.",
  road_closures: "Road Closures (3D AR): Live Department of Transportation (DOT) road closures, highway barricades, construction zones, and route hazards in 3D AR.",
  weather_ar: "3D AR Weather: Immersive volumetric rain, snow, and precipitation particle simulation rendered in 3D AR map perspective.",
  solar_terminator: "Sun, Moon & Shadow: Day/night terminator line showing Earth's solar illumination boundary, live solar sub-point, and lunar ephemeris.",
  drone_docks: "Drone Docks: Automated unmanned aerial vehicle (UAV) nesting bases, docking stations, and rapid-response launch pads.",
  blind_spots: "Coverage Blind Spots: Algorithmic line-of-sight and sensor audit highlighting geographic areas with zero camera and radar coverage.",
  land_ownership: "Land Jurisdiction & BLM: Cadastral boundary overlays delineating private property, state trust lands, tribal land, and federal BLM parcels.",
  zero_blind_spot_hud: "Zero-Blind-Spot HUD: Tactical visual overlay displaying live coverage cones and highlighting sensor surveillance gaps in the viewport.",
  toxic_sites: "Toxic Sites & Plumes (EPA): EPA Superfund locations, toxic industrial release sites, contaminated brownfields, and atmospheric plume dispersion models.",
  chemical_spraying: "Chemical Spraying & Toxins: Aerial crop-dusting, glyphosate / herbicide eradication, mosquito abatement, and chemical defoliation tracking (planned, discussed, current, and historical).",
  power_lines: "Power Lines & Corridors: High-voltage transmission lines, electrical grid interconnects, transmission rights-of-way, and utility corridors.",
  utility_companies: "Utility Companies & Plants: Electric and gas utility headquarters, substations, generation facilities, and regional utility operational service footprints.",
  fiber_cables: "Fiberoptic & Data Cables: Terrestrial long-haul fiber-optic backbone cables, dark fiber corridors, and data center interconnects (DCI).",
  hospitals: "Hospitals & Trauma Centers: Level I-IV trauma centers, general acute hospitals, medical centers, and emergency intensive care units.",
  urgent_care: "Urgent Care & Emergency Bases: Walk-in urgent care clinics, immediate medical care clinics, and ambulance dispatch substations.",
  military_bunkers: "Military Bunkers & CoG: Continuity of Government (CoG) complexes, hardened underground defense installations, and deep command shelters.",
  citizen_bunkers: "Citizen Fallout Shelters: Public-access civil defense fallout shelters, community blast shelters, and certified crisis refuges.",
  bomb_storage_depots: "Bomb & Munitions Depots: Department of Defense munitions storage facilities, ordnance depots, and weapons arsenals.",
  military_bases: "Military Bases & Commands: Active DoD military air bases, naval stations, army garrisons, space force launch stations, and joint command centers.",
  dams: "Dams & Reservoirs: Major hydroelectric dams, gravity dams, earthen dikes, and primary municipal water supply storage reservoirs.",
  dam_inundation: "Dam Inundation Zones: Downstream hydrodynamic flood breach wave surge zones simulating hypothetical dam structural failures.",
  flood_zones: "FEMA Floodplains: Official FEMA 100-year and 500-year Special Flood Hazard Areas (SFHA), base flood elevations, and floodway delineations.",
  elevation_topography: "Topography & Elevation Heatmap: USGS 3D digital elevation models, hypsometric color relief, contour intervals, and alpine summit spot heights.",
  medicinal_flora: "Medicinal Flora & Herbs: Viewport-filtered directory of native medicinal trees, flowers, herbs, and fungi with active chemical constituents and naturopathic indications.",
  farms_ranches: "Farms & Ranches: Commercial agriculture, honey bee apiaries, livestock cattle ranches, grain breadbaskets, and organic orchards with crop inventories and official websites.",
  fuel_pipelines: "Continental Fuel Pipelines: Colonial and Plantation refined petroleum arteries supplying 45%+ of East Coast gasoline, diesel, and jet fuel.",
  water_aqueducts: "Major Water Aqueducts: California Aqueduct, LA Aqueduct, Central Arizona Project, and All-American Canal delivering surface drinking water across seismic fault zones.",
  strategic_facilities: "Strategic Energy & Defense Facilities: Strategic Petroleum Reserve (SPR) salt caverns, mega crude oil refineries, ISFSI spent nuclear fuel dry casks, and PAVE PAWS early warning radars."
};

const INTERACTIVE_LAYER_IDS = [
  'custom-pin-layer', 'custom-pin-label-layer', 'cell-tower-cluster', 'spring-cluster',
  'snowboard-resorts-cluster', 'aircraft-layer', 'cell-tower-layer', 'spring-layer',
  'disaster-layer', 'earthquake-layer', 'power-layer', 'aviation-layer', 'emergency-layer',
  'camera-layer', 'camera-fov-layer', 'historical-camera-layer', 'historical-camera-fov-layer',
  'community-reports-point', 'weather-station-layer', 'data-center-layer', 'radar-layer',
  'public-land-layer', 'campsite-layer', 'trail-layer', 'submarine-cable-layer',
  'landing-point-layer', 'wildfire-layer', 'vessel-layer', 'vessel-circle-layer',
  'atlas-obscura-layer', 'lightning-layer', 'snowboard-resorts-point', 'snowboard-resorts-label',
  'topographic-peaks-point', 'topographic-peaks-label', 'hospitals-point', 'urgent-care-point',
  'military-bunkers-point', 'citizen-bunkers-point', 'bomb-storage-depots-point', 'military-bases-point',
  'dams-point', 'farms-ranches-point', 'medicinal-flora-point', 'strategic-facilities-point'
];

const getSavedViewState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem('sphinx_last_view_state');
    if (!s) return null;
    const parsed = JSON.parse(s);
    if (parsed && typeof parsed.longitude === 'number' && isFinite(parsed.longitude) && typeof parsed.latitude === 'number' && isFinite(parsed.latitude)) {
      return parsed;
    }
    return null;
  } catch { return null; }
};

const CAMERA_CIRCLE_COLOR_EXPR: any = [
  'match', ['get', 'vendor'],
  'flock', '#f59e0b', 'axon', '#3b82f6', 'ring', '#a855f7',
  'motorola', '#10b981', 'genetec', '#06b6d4', 'verkada', '#ec4899',
  'enforcement', '#ef4444', '#e2e8f0'
];


/**
 * Optimizes water and lake labels across all underlying map styles.
 * Ensures font is high-contrast white (NEVER blue on blue water) and eliminates blurry shadow halos.
 */
function optimizeWaterAndLakeLabels(map: any) {
  if (!map || typeof map.getStyle !== 'function') return;
  try {
    const style = map.getStyle();
    if (!style || !style.layers) return;
    for (const layer of style.layers) {
      const id = layer.id || '';
      if (id.startsWith('curated-lakes')) continue;
      const isWaterSymbol = layer.type === 'symbol' && (
        id === 'water-point-label' ||
        id === 'water-line-label' ||
        id === 'water-polygon-label' ||
        id === 'natural-point-label' ||
        id === 'natural-line-label' ||
        id.includes('water-name') ||
        id.includes('water_name') ||
        id.includes('water-label') ||
        id.includes('water_label') ||
        id.includes('lake-label') ||
        id.includes('lake_label') ||
        id.includes('marine-label') ||
        id.includes('ocean-label') ||
        id.includes('waterway') ||
        id.includes('water') ||
        id.includes('lake') ||
        id.includes('natural')
      );

      if (isWaterSymbol) {
        // Completely hide default underlying water/lake labels
        // Only the white name with black outline from curated-lakes will be kept.
        try { map.setLayoutProperty(id, 'visibility', 'none'); } catch (e) {}
      }
    }
  } catch (err) {
    // Graceful skip if style is reloading
  }
}

export default function SphinxMap() {
  const { settings, updateSettings, loading } = useSettings();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      registerElevationHeatmapProtocol(maplibregl);
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
  const [crimeFocusCoords, setCrimeFocusCoords] = useState<{ lat: number; lon: number } | null>(null);
  const lastCrimeLocationRef = useRef<{ lat: number; lon: number; cityName: string } | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let isCancelled = false;
    const isLocal = typeof window !== 'undefined' && window.location.port === '3117';
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
  const staticDataLoadedRef = useRef(false);

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
  const [isChemicalModalOpen, setIsChemicalModalOpen] = useState(false);
  const [selectedSprayIncidentId, setSelectedSprayIncidentId] = useState<string | null>(null);
  const [isFloodModalOpen, setIsFloodModalOpen] = useState(false);
  const [isCascadeModalOpen, setIsCascadeModalOpen] = useState(false);
  const [selectedDamIds, setSelectedDamIds] = useState<string[]>(['dam-oroville']);
  const [damFailureSeverity, setDamFailureSeverity] = useState<'catastrophic' | 'overtopping' | 'controlled'>('catastrophic');
  const [isTopoModalOpen, setIsTopoModalOpen] = useState(false);
  const [isFloraModalOpen, setIsFloraModalOpen] = useState(false);
  const [selectedFloraId, setSelectedFloraId] = useState<string | null>(null);
  const [isCameraFeedModalOpen, setIsCameraFeedModalOpen] = useState(false);
  const [isDisclaimersModalOpen, setIsDisclaimersModalOpen] = useState(false);
  const [isConstitutionalModalOpen, setIsConstitutionalModalOpen] = useState(false);
  const [activeCameraFeed, setActiveCameraFeed] = useState<LiveCameraFeed | null>(null);
  const [countScopeMode, setCountScopeMode] = useState<'world' | 'country'>('world');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [topoProvider, setTopoProvider] = useState<TopoTileProvider>('elevation_heatmap');
  const [topoOpacity, setTopoOpacity] = useState<number>(0.85);
  const [showTopoPeaks, setShowTopoPeaks] = useState<boolean>(true);
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
  const [isPinThreatRadarOpen, setIsPinThreatRadarOpen] = useState(false);
  const [selectedRadarPinId, setSelectedRadarPinId] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showAdminReputationModal, setShowAdminReputationModal] = useState(false);
  const [reportCoordinates, setReportCoordinates] = useState<[number, number]>([-87.6298, 41.8827]);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(() => {
    return loadLocalCommunityReports();
  });
  const [is3DView, setIs3DView] = useState(false);
  const [currentBearing, setCurrentBearing] = useState<number>(0);
  const satelliteDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');
  const [weatherRadarUrl, setWeatherRadarUrl] = useState<string | null>(null);
  const [weatherCloudsUrl, setWeatherCloudsUrl] = useState<string | null>(null);
  const [showAppleWeatherHud, setShowAppleWeatherHud] = useState(false);
  const [radarSweepAngle, setRadarSweepAngle] = useState(0);
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
  const [appleWeatherMetrics, setAppleWeatherMetrics] = useState<AppleWeatherMetrics>({
    tempC: 21,
    humidity: 48,
    windSpeedKnots: 14,
    windGustKnots: 20,
    windDirectionDeg: 240,
    pressureHpa: 1013.2,
    cloudCoverPct: 35,
    uvIndex: 4,
    visibilityMeters: 16000,
    dewPointC: 10,
    precipitationMm: 0,
    conditionText: 'Partly Cloudy'
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
    return ResortPisteEngine.subscribe((data) => {
      setResortPistesLiftsData(data);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDroppingPin(false);
        setPinCreationMode(null);
        setEditingPinId(null);
        setShowToolsMenu(false);
      }
    };
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('[data-testid="hud-tools-dropdown"]') && !target.closest('[data-testid="hud-btn-tools-menu"]')) {
        setShowToolsMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  const [downloadBbox, setDownloadBbox] = useState<string | null>(null);

  
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [legendScale, setLegendScale] = useState(1);
  const [legendPos, setLegendPos] = useState<{ x: number; y: number } | null>(null);
  const [legendSize, setLegendSize] = useState<{ width: number; height: number }>({ width: 360, height: 460 });
  const [isLegendCustomHeight, setIsLegendCustomHeight] = useState(false);
  const [isDraggingLegend, setIsDraggingLegend] = useState(false);
  const [isResizingLegend, setIsResizingLegend] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startW: number; startH: number } | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });
  useEffect(() => {
    const handleResize = () => {
      const w = window.visualViewport ? Math.round(window.visualViewport.width) : window.innerWidth;
      const h = window.visualViewport ? Math.round(window.visualViewport.height) : window.innerHeight;
      setWindowDimensions({ width: w, height: h });
      setLegendScale(Math.min(1.05, Math.max(0.65, w / 1920)));
      setLegendPos(prev => {
        if (!prev) return null;
        return {
          x: Math.min(Math.max(8, prev.x), Math.max(8, w - 280)),
          y: Math.min(Math.max(52, prev.y), Math.max(52, h - 64))
        };
      });
      setLegendSize(prev => ({
        width: Math.min(Math.max(260, prev.width), Math.max(280, w - 24)),
        height: Math.min(Math.max(200, prev.height), Math.max(220, h - 64))
      }));
      try {
        mapRef.current?.resize();
      } catch (e) {}
    };
    handleResize();
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsLegendCollapsed(true);
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const dynamicC2Left = useMemo(() => {
    if (windowDimensions.width < 640) return '8px';
    if (isLegendCollapsed) return '16px';
    if (legendPos) {
      return `${Math.min(windowDimensions.width - 340, Math.max(16, legendPos.x + legendSize.width + 12))}px`;
    }
    return windowDimensions.width < 768 ? '336px' : `${legendSize.width + 24}px`;
  }, [windowDimensions.width, isLegendCollapsed, legendPos, legendSize.width]);

  const headerTier = useMemo<'full' | 'standard' | 'compact' | 'minimal' | 'mobile'>(() => {
    const w = windowDimensions.width;
    if (w >= 1380) return 'full';
    if (w >= 1024) return 'standard';
    if (w >= 768) return 'compact';
    if (w >= 540) return 'minimal';
    return 'mobile';
  }, [windowDimensions.width]);

  const dockScale = useMemo(() => {
    const w = windowDimensions.width;
    if (w < 480) {
      return Math.max(0.65, Math.min(1, (w - 16) / 460));
    }
    return 1;
  }, [windowDimensions.width]);

  
  // Hardcoded for now. Wait, how do we know if premium?
  // User asked us to "Only make this available to premium clients"
  // Since we don't have a real auth context, let's mock it.
  const isPremiumClient = true; // Set to false to test restriction
  const clientId = "client_premium_123";

  const currentLegendPos = useMemo(() => {
    if (legendPos) {
      const maxX = Math.max(8, windowDimensions.width - legendSize.width - 8);
      const maxY = Math.max(88, windowDimensions.height - legendSize.height - 64);
      return {
        x: Math.min(Math.max(8, legendPos.x), maxX),
        y: Math.min(Math.max(88, legendPos.y), maxY)
      };
    }
    return {
      x: windowDimensions.width < 640 ? 8 : 16,
      y: windowDimensions.width < 640 ? 88 : 96
    };
  }, [legendPos, windowDimensions.width, windowDimensions.height, legendSize.width, legendSize.height]);

  const handleLegendDragStart = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, input, a, select')) return;
    setIsDraggingLegend(true);
    const startX = legendPos ? legendPos.x : (windowDimensions.width < 640 ? 8 : 16);
    const startY = legendPos ? legendPos.y : (windowDimensions.width < 640 ? 54 : 62);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX,
      startY
    };
  }, [legendPos, windowDimensions.width]);

  const handleLegendTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    if ((e.target as HTMLElement).closest('button, input, a, select')) return;
    setIsDraggingLegend(true);
    const touch = e.touches[0];
    const startX = legendPos ? legendPos.x : (windowDimensions.width < 640 ? 8 : 16);
    const startY = legendPos ? legendPos.y : (windowDimensions.width < 640 ? 54 : 62);
    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      startX,
      startY
    };
  }, [legendPos, windowDimensions.width]);

  const handleLegendResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizingLegend(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: legendSize.width,
      startH: legendSize.height
    };
  }, [legendSize]);

  const handleLegendTouchResizeStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.stopPropagation();
    setIsResizingLegend(true);
    const touch = e.touches[0];
    resizeStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      startW: legendSize.width,
      startH: legendSize.height
    };
  }, [legendSize]);

  useEffect(() => {
    if (!isDraggingLegend && !isResizingLegend) return;

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (isDraggingLegend && dragStartRef.current) {
        const dx = clientX - dragStartRef.current.mouseX;
        const dy = clientY - dragStartRef.current.mouseY;
        const rawX = dragStartRef.current.startX + dx;
        const rawY = dragStartRef.current.startY + dy;

        const maxX = Math.max(8, windowDimensions.width - legendSize.width - 8);
        const maxY = Math.max(52, windowDimensions.height - legendSize.height - 64);

        setLegendPos({
          x: Math.min(Math.max(8, rawX), maxX),
          y: Math.min(Math.max(52, rawY), maxY)
        });
      } else if (isResizingLegend && resizeStartRef.current) {
        const dx = clientX - resizeStartRef.current.mouseX;
        const dy = clientY - resizeStartRef.current.mouseY;

        const newW = Math.min(
          Math.max(260, resizeStartRef.current.startW + dx),
          Math.max(280, windowDimensions.width - 24)
        );
        const newH = Math.min(
          Math.max(200, resizeStartRef.current.startH + dy),
          Math.max(200, windowDimensions.height - currentLegendPos.y - 64)
        );

        setIsLegendCustomHeight(true);
        setLegendSize({ width: newW, height: newH });
      }
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => {
      setIsDraggingLegend(false);
      setIsResizingLegend(false);
      dragStartRef.current = null;
      resizeStartRef.current = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      setIsDraggingLegend(false);
      setIsResizingLegend(false);
      dragStartRef.current = null;
      resizeStartRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDraggingLegend, isResizingLegend, legendSize.width, windowDimensions.width, windowDimensions.height]);

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
          if (data.satellite && data.satellite.infrared && data.satellite.infrared.length > 0) {
            const satPath = data.satellite.infrared[data.satellite.infrared.length - 1].path;
            setWeatherCloudsUrl(`${host}${satPath}/256/{z}/{x}/{y}/0/1_1.png`);
          }
        } else {
          throw new Error('No radar past frames');
        }
      })
      .catch(() => {
        const isLocal = typeof window !== 'undefined' && window.location.port === '3117';
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
    try {
      const geojsonFeatures = await GlobalDataEngine.fetchGlobalAircraft(bboxRef.current || null);
      if (geojsonFeatures && geojsonFeatures.length > 0) {
        setAircraftFeatures(geojsonFeatures);
      }
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
    const isLocal = typeof window !== 'undefined' && window.location.port === '3117';
    if (!isLocal) return;
    const map = mapRef.current?.getMap();
    
    ResilientDataClient.fetchWithFallback<any>(
      `http://127.0.0.1:3117/api/osint/celltowers?bbox=${bboxRef.current}`,
      '/sphinx/data/watchtower_baseline.json',
      { timeoutMs: 350 }
    ).then(data => {
      if (data?.features && Array.isArray(data.features)) setCellTowerFeatures(data.features);
      else if (data?.celltowers?.features) setCellTowerFeatures(data.celltowers.features);
    }).catch(() => {});

    if (fetchingOverpassRef.current) {
      return;
    }

    try {
      fetchingOverpassRef.current = true;
      setIsFetchingOverpass(true);
      setOverpassError(null);
      const overpass = await ResilientDataClient.fetchWithFallback<any>(
        `http://127.0.0.1:3117/api/osint/overpass?bbox=${bboxRef.current}`,
        '/sphinx/data/watchtower_baseline.json',
        { timeoutMs: 350 }
      );
      if (overpass && !overpass.error) {
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
        throw new Error('Overpass error payload');
      }
    } catch (e: any) {
      // Overpass backend offline or busy, fall back to comprehensive local baseline
      try {
        const baseline = await fetch('/sphinx/data/watchtower_baseline.json').then(r => r.json());
        if (baseline) {
          if (baseline.springs?.features) setSpringFeatures(baseline.springs.features);
          if (baseline.power?.features) setPowerFeatures(baseline.power.features);
          if (baseline.aviation?.features) setAviationFeatures(baseline.aviation.features);
          if (baseline.emergency?.features) setEmergencyFeatures(baseline.emergency.features);
          if (baseline.cameras?.features) setCameraFeatures(baseline.cameras.features);
          if (baseline.weather_stations?.features) setWeatherStationFeatures(baseline.weather_stations.features);
          if (baseline.data_centers?.features) setDataCenterFeatures(baseline.data_centers.features);
          if (baseline.radars?.features) setRadarFeatures(baseline.radars.features);
          if (baseline.public_lands?.features) setPublicLandFeatures(baseline.public_lands.features);
          if (baseline.campsites?.features) setCampsiteFeatures(baseline.campsites.features);
          if (baseline.trails?.features) setTrailFeatures(baseline.trails.features);
        }
      } catch (err) {}
    } finally {
      fetchingOverpassRef.current = false;
      setIsFetchingOverpass(false);
      pendingOverpassRef.current = false;
    }
  }, []);

  const loadHighPriorityData = useCallback(async (forceWildfires = false) => {
    try {
      loadAircraft();
      ResilientDataClient.fetchWithFallback<any>(
        `http://127.0.0.1:3117/api/osint/wildfires${forceWildfires ? '?refresh=1' : ''}`,
        '/sphinx/data/wildfires.geojson',
        { timeoutMs: 350 }
      ).then(d => { if (d?.features) setWildfireFeatures(d.features); }).catch(() => {});

      ResilientDataClient.fetchWithFallback<any>(
        `http://127.0.0.1:3117/api/osint/lightning?bbox=${bboxRef.current || ''}`,
        '/sphinx/data/lightning.geojson',
        { timeoutMs: 350 }
      ).then(d => { if (d?.features) setLightningFeatures(d.features); }).catch(() => {});

      ResilientDataClient.fetchWithFallback<any>(
        `http://127.0.0.1:3117/api/osint/road-closures?bbox=${bboxRef.current || ''}`,
        '/sphinx/data/road_closures.geojson',
        { timeoutMs: 350 }
      ).then(d => { if (d) setRoadClosuresData(d); }).catch(() => {});
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

      ResilientDataClient.fetchWithFallback<any>(
        `http://127.0.0.1:3117/api/osint/obscura`,
        '/sphinx/data/atlas_obscura.json',
        { timeoutMs: 350 }
      ).then(d => { if (d?.features) setObscuraFeatures(d.features); }).catch(() => {});
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load medium-priority data', e);
    }
  }, [timeframe]);

  const loadLowPriorityData = useCallback(async () => {
    try {
      if (!staticDataLoadedRef.current) {
        staticDataLoadedRef.current = true;
        fetch('/sphinx/data/submarine_cables.geojson')
          .then(r => r.json())
          .then(d => setCableFeatures(d.features || []))
          .catch(() => {});

        fetch('/sphinx/data/landing_points.geojson')
          .then(r => r.json())
          .then(d => setLandingPointFeatures(d.features || []))
          .catch(() => {});

        setTimeout(() => {
          fetch('/sphinx/data/snowboard_resorts_global.geojson')
            .then(r => r.ok ? r.json() : fetch('/data/snowboard_resorts_global.geojson').then(r2 => r2.ok ? r2.json() : null))
            .then(d => { if (d && d.features) setGlobalSnowboardResorts(d); })
            .catch(() => {});
        }, 2500);

        fetch('/sphinx/data/data_centers_global.geojson')
          .then(r => r.ok ? r.json() : fetch('/data/data_centers_global.geojson').then(r2 => r2.ok ? r2.json() : null))
          .then(d => { if (d && d.features) setDataCenterFeatures(prev => prev.length <= 300 ? d.features : prev); })
          .catch(() => {});

        setTimeout(() => {
          fetch('/sphinx/data/resorts/mt_baldy_pistes_lifts.geojson')
            .then(r => r.ok ? r.json() : fetch('/data/resorts/mt_baldy_pistes_lifts.geojson').then(r2 => r2.ok ? r2.json() : fetch('/sphinx/data/resorts/bundled_pistes_lifts.geojson').then(r3 => r3.ok ? r3.json() : null)))
            .then(d => {
              if (d && d.features) {
                ResortPisteEngine.init(d);
                setResortPistesLiftsData(ResortPisteEngine.getGeoJSON());
              }
            })
            .catch(() => {});
        }, 3000);
      }

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

  const updateCityCrimeForLocation = useCallback(async (lat: number, lon: number, preferredCityName?: string, force = false) => {
    const last = lastCrimeLocationRef.current;
    if (!force && last) {
      const distSq = (lat - last.lat) ** 2 + (lon - last.lon) ** 2;
      if (distSq < 0.02 && (!preferredCityName || preferredCityName.toLowerCase() === last.cityName.toLowerCase())) {
        return;
      }
    }

    let resolvedCity = preferredCityName;
    let fullArea = '';
    if (!resolvedCity) {
      const curated = getNearestCuratedArea(lat, lon);
      if (curated) {
        resolvedCity = curated.split(',')[0].trim();
        fullArea = curated;
      } else {
        try {
          const geoRes = await fetch(`https://photon.komoot.io/reverse?lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}`);
          if (geoRes.ok) {
            const geoJson = await geoRes.json();
            const p = geoJson.features?.[0]?.properties;
            if (p) {
              resolvedCity = p.city || p.town || p.village || p.name || p.county;
              const reg = p.state || p.country;
              if (reg && resolvedCity) fullArea = `${resolvedCity}, ${reg}`;
            }
          }
        } catch (e) {}
      }
    }

    if (!resolvedCity) {
      resolvedCity = `${lat > 0 ? lat.toFixed(2) + '°N' : Math.abs(lat).toFixed(2) + '°S'}, ${lon > 0 ? lon.toFixed(2) + '°E' : Math.abs(lon).toFixed(2) + '°W'}`;
    }

    try {
      const data = await getCityCrimeData(resolvedCity, lat, lon);
      const enrichedData = fullArea ? { ...data, city: fullArea } : data;
      setActiveCityCrime(enrichedData);
      setCrimeData(enrichedData.incidents || []);
      setCrimeFocusCoords({ lat, lon });
      lastCrimeLocationRef.current = { lat, lon, cityName: resolvedCity };
    } catch (e) {
      console.warn('[Sphinx GL] Failed to update city crime for location:', e);
    }
  }, []);

  const updateWeatherVector = useCallback(async (lat: number, lon: number) => {
    try {
      let data: any = null;
      try {
        const isLocal = typeof window !== 'undefined' && window.location.port === '3117';
        if (isLocal) {
          const coreRes = await fetch(`http://127.0.0.1:3117/api/osint/weather-forecast?lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}`);
          if (coreRes.ok) data = await coreRes.json();
        }
      } catch (e) {}

      if (!data) {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}&longitude=${lon.toFixed(3)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,visibility,dew_point_2m&wind_speed_unit=kn`);
        if (res.ok) data = await res.json();
      }

      let areaName = getNearestCuratedArea(lat, lon) || `${lat > 0 ? lat.toFixed(2) + '°N' : Math.abs(lat).toFixed(2) + '°S'}, ${lon > 0 ? lon.toFixed(2) + '°E' : Math.abs(lon).toFixed(2) + '°W'}`;
      try {
        const geoRes = await fetch(`https://photon.komoot.io/reverse?lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}`);
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          const p = geoJson.features?.[0]?.properties;
          if (p) {
            const loc = p.city || p.town || p.village || p.name || p.county;
            const region = p.state || p.country;
            if (loc && region) areaName = `${loc}, ${region}`;
            else if (loc) areaName = loc;
          }
        }
      } catch (e) {}

      if (data) {
        const curr = data.current || {};
        const speed = Number(curr.windSpeedKnots ?? curr.wind_speed_10m) || 12;
        const gust = Number(curr.windGustKnots ?? curr.wind_gusts_10m) || speed * 1.35;
        const dir = Number(curr.windDirectionDeg ?? curr.wind_direction_10m) || 240;
        const temp = Number(curr.tempC ?? curr.temperature_2m) || 20;
        const hum = Number(curr.humidity ?? curr.relative_humidity_2m) || 50;

        const pres = Number(curr.pressure_msl ?? curr.surface_pressure ?? curr.pressureHpa) || 1013.2;
        const cCover = Number(curr.cloud_cover ?? curr.cloudCoverPct) || 35;
        const uv = Number(curr.uv_index ?? curr.uvIndex) || 4;
        const vis = Number(curr.visibility ?? curr.visibilityMeters) || 16000;
        const dew = Number(curr.dew_point_2m ?? curr.dewPointC) || (temp - (100 - hum) / 5);
        const precip = Number(curr.precipitation ?? curr.precipitationMm) || 0;

        setCurrentWeatherVector({
          windSpeedKnots: Math.round(speed * 10) / 10,
          windGustKnots: Math.round(gust * 10) / 10,
          windDirectionDeg: Math.round(dir),
          tempC: Math.round(temp * 10) / 10,
          humidity: Math.round(hum)
        });
        setAppleWeatherMetrics({
          tempC: Math.round(temp * 10) / 10,
          humidity: Math.round(hum),
          windSpeedKnots: Math.round(speed * 10) / 10,
          windGustKnots: Math.round(gust * 10) / 10,
          windDirectionDeg: Math.round(dir),
          pressureHpa: Math.round(pres * 10) / 10,
          cloudCoverPct: Math.round(cCover),
          uvIndex: Math.round(uv * 10) / 10,
          visibilityMeters: Math.round(vis),
          dewPointC: Math.round(dew * 10) / 10,
          precipitationMm: Math.round(precip * 10) / 10,
          locationName: areaName,
          latitude: lat,
          longitude: lon
        });
      }
      updateCityCrimeForLocation(lat, lon, areaName.split(',')[0].trim());
    } catch (err) {
      console.warn('[Sphinx GL] Weather update error:', err);
    }
  }, [updateCityCrimeForLocation]);

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
    } else if (action.type === 'SIMULATE_DAM_BREACH' && action.payload) {
      if (Array.isArray(action.payload.damIds)) {
        setSelectedDamIds(action.payload.damIds);
      }
      if (action.payload.failureSeverity) {
        setDamFailureSeverity(action.payload.failureSeverity);
      }
      updateSettings({
        layers: { ...settings.layers, dams: true, dam_inundation: true, flood_zones: true }
      });
      if (mapRef.current && action.payload.flyTo) {
        mapRef.current.flyTo({
          center: [action.payload.flyTo.lon, action.payload.flyTo.lat],
          zoom: action.payload.flyTo.zoom || 5.8,
          duration: 2500
        });
      }
    } else if (action.type === 'SIMULATE_DISASTER' && action.payload) {
      const targetLayers = { ...settings.layers };
      if (Array.isArray(action.payload.layers)) {
        action.payload.layers.forEach((layerKey: string) => {
          if (layerKey in targetLayers) {
            (targetLayers as any)[layerKey] = true;
          }
        });
      }
      updateSettings({ layers: targetLayers });
      if (mapRef.current && action.payload.flyTo) {
        mapRef.current.flyTo({
          center: [action.payload.flyTo.lon, action.payload.flyTo.lat],
          zoom: action.payload.flyTo.zoom || 8.0,
          duration: 2500
        });
      }
    }
  }, [settings, updateSettings]);

  const loadersRef = useRef({ loadHighPriorityData, loadMediumPriorityData, loadLowPriorityData, updateWeatherVector, updateBbox });
  loadersRef.current = { loadHighPriorityData, loadMediumPriorityData, loadLowPriorityData, updateWeatherVector, updateBbox };

  useEffect(() => {
    let highInterval: NodeJS.Timeout;
    let medInterval: NodeJS.Timeout;
    let lowInterval: NodeJS.Timeout;

    loadersRef.current.updateBbox();
    if (bboxRef.current) {
      loadersRef.current.loadHighPriorityData();
      loadersRef.current.loadMediumPriorityData();
      loadersRef.current.loadLowPriorityData();
    }
    loadersRef.current.updateWeatherVector(viewState.latitude, viewState.longitude);

    if (timeframe === 'live') {
      // Tier 1: High Sensitivity (Wildfires, Aircraft, Lightning) - 30s
      highInterval = setInterval(() => {
        loadersRef.current.loadHighPriorityData();
      }, 30000);

      // Tier 2: Medium Sensitivity (Vessels, Earthquakes, Disasters) - 90s
      medInterval = setInterval(() => {
        loadersRef.current.loadMediumPriorityData();
      }, 90000);

      // Tier 3: Low Sensitivity (Infrastructure, Cables, Watchtower) - 10m
      lowInterval = setInterval(() => {
        loadersRef.current.loadLowPriorityData();
      }, 600000);
    }

    return () => {
      clearInterval(highInterval);
      clearInterval(medInterval);
      clearInterval(lowInterval);
    };
  }, [timeframe]);

  useEffect(() => {
    updateCityCrimeForLocation(viewState.latitude, viewState.longitude);

    // Instant offline-first baseline hydration: guarantees zero counters show 0 on boot
    ResilientDataClient.getWatchtowerBaseline().then(b => {
      if (!b) return;
      if (b.celltowers?.features) setCellTowerFeatures(prev => prev.length === 0 ? b.celltowers.features : prev);
      if (b.springs?.features) setSpringFeatures(prev => prev.length === 0 ? b.springs.features : prev);
      if (b.power?.features) setPowerFeatures(prev => prev.length === 0 ? b.power.features : prev);
      if (b.aviation?.features) setAviationFeatures(prev => prev.length === 0 ? b.aviation.features : prev);
      if (b.emergency?.features) setEmergencyFeatures(prev => prev.length === 0 ? b.emergency.features : prev);
      if (b.cameras?.features) setCameraFeatures(prev => prev.length === 0 ? b.cameras.features : prev);
      if (b.weather_stations?.features) setWeatherStationFeatures(prev => prev.length === 0 ? b.weather_stations.features : prev);
      if (b.data_centers?.features) setDataCenterFeatures(prev => prev.length === 0 ? b.data_centers.features : prev);
      if (b.radars?.features) setRadarFeatures(prev => prev.length === 0 ? b.radars.features : prev);
      if (b.public_lands?.features) setPublicLandFeatures(prev => prev.length === 0 ? b.public_lands.features : prev);
      if (b.campsites?.features) setCampsiteFeatures(prev => prev.length === 0 ? b.campsites.features : prev);
      if (b.trails?.features) setTrailFeatures(prev => prev.length === 0 ? b.trails.features : prev);
    }).catch(() => {});

    // Hydrate aircraft baseline immediately
    ResilientDataClient.getAircraftBaseline().then(a => {
      if (a?.features && Array.isArray(a.features) && a.features.length > 0) {
        setAircraftFeatures(prev => prev.length === 0 ? a.features : prev);
      }
    }).catch(() => {});
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
    setCrimeFocusCoords({ lat: targetLat!, lon: targetLon! });
    lastCrimeLocationRef.current = { lat: targetLat!, lon: targetLon!, cityName: data.city };
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
    if (showToolsMenu) setShowToolsMenu(false);

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

  const handleOpenLiveFeed = (cameraProps?: any) => {
    if (cameraProps) {
      const coords: [number, number] | undefined = selectedFeature 
        ? [selectedFeature.longitude, selectedFeature.latitude] 
        : undefined;
      const feed = CameraFeedsEngine.createFeedFromCamera(cameraProps, coords);
      setActiveCameraFeed(feed);
    }
    setIsCameraFeedModalOpen(true);
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

  const powerLinesData = React.useMemo(() => settings.layers.power_lines ? CriticalInfrastructureEngine.getPowerLinesGeoJson() : EMPTY_GEOJSON, [settings.layers.power_lines]);
  const utilityCompaniesData = React.useMemo(() => settings.layers.utility_companies ? CriticalInfrastructureEngine.getUtilityCompaniesGeoJson() : EMPTY_GEOJSON, [settings.layers.utility_companies]);
  const fiberCablesData = React.useMemo(() => settings.layers.fiber_cables ? CriticalInfrastructureEngine.getFiberCablesGeoJson() : EMPTY_GEOJSON, [settings.layers.fiber_cables]);
  const hospitalsData = React.useMemo(() => settings.layers.hospitals ? CriticalInfrastructureEngine.getHospitalsGeoJson() : EMPTY_GEOJSON, [settings.layers.hospitals]);
  const urgentCareData = React.useMemo(() => settings.layers.urgent_care ? CriticalInfrastructureEngine.getUrgentCareGeoJson() : EMPTY_GEOJSON, [settings.layers.urgent_care]);
  const militaryBunkersData = React.useMemo(() => settings.layers.military_bunkers ? DefenseInfrastructureEngine.getMilitaryBunkersGeoJson() : EMPTY_GEOJSON, [settings.layers.military_bunkers]);
  const citizenBunkersData = React.useMemo(() => settings.layers.citizen_bunkers ? DefenseInfrastructureEngine.getCitizenBunkersGeoJson() : EMPTY_GEOJSON, [settings.layers.citizen_bunkers]);
  const bombStorageDepotsData = React.useMemo(() => settings.layers.bomb_storage_depots ? DefenseInfrastructureEngine.getBombStorageDepotsGeoJson() : EMPTY_GEOJSON, [settings.layers.bomb_storage_depots]);
  const militaryBasesData = React.useMemo(() => settings.layers.military_bases ? DefenseInfrastructureEngine.getMilitaryBasesGeoJson() : EMPTY_GEOJSON, [settings.layers.military_bases]);
  const damsData = React.useMemo(() => settings.layers.dams ? FloodHydrologyEngine.getDamsGeoJson(selectedDamIds) : EMPTY_GEOJSON, [settings.layers.dams, selectedDamIds]);
  const femaFloodZonesData = React.useMemo(() => settings.layers.flood_zones ? FloodHydrologyEngine.getFemaFloodZonesGeoJson() : EMPTY_GEOJSON, [settings.layers.flood_zones]);
  const damInundationData = React.useMemo(() => settings.layers.dam_inundation ? FloodHydrologyEngine.getMultiDamInundationGeoJson(selectedDamIds, damFailureSeverity) : EMPTY_GEOJSON, [settings.layers.dam_inundation, selectedDamIds, damFailureSeverity]);
  const damWavePointsData = React.useMemo(() => settings.layers.dam_inundation ? FloodHydrologyEngine.getDamFloodWavePointsGeoJson(selectedDamIds) : EMPTY_GEOJSON, [settings.layers.dam_inundation, selectedDamIds]);
  const topoPeaksData = React.useMemo(() => settings.layers.elevation_topography ? TopographyElevationEngine.getTopographicPeaksGeoJson() : EMPTY_GEOJSON, [settings.layers.elevation_topography]);
  const farmsRanchesData = React.useMemo(() => settings.layers.farms_ranches ? FarmsRanchesEngine.getFarmsRanchesGeoJson() : EMPTY_GEOJSON, [settings.layers.farms_ranches]);
  const fuelPipelinesData = React.useMemo(() => settings.layers.fuel_pipelines ? StrategicEnergyAndWaterEngine.getPipelinesGeoJson() : EMPTY_GEOJSON, [settings.layers.fuel_pipelines]);
  const waterAqueductsData = React.useMemo(() => settings.layers.water_aqueducts ? StrategicEnergyAndWaterEngine.getAqueductsGeoJson() : EMPTY_GEOJSON, [settings.layers.water_aqueducts]);
  const strategicFacilitiesData = React.useMemo(() => settings.layers.strategic_facilities ? StrategicEnergyAndWaterEngine.getStrategicFacilitiesGeoJson() : EMPTY_GEOJSON, [settings.layers.strategic_facilities]);
  const floraViewportData = React.useMemo(() => {
    if (!settings.layers.medicinal_flora) return { geoJson: EMPTY_GEOJSON, flora: [] };
    const w = currentBbox ? currentBbox[0] : (viewState.longitude - 6);
    const s = currentBbox ? currentBbox[1] : (viewState.latitude - 4);
    const e = currentBbox ? currentBbox[2] : (viewState.longitude + 6);
    const n = currentBbox ? currentBbox[3] : (viewState.latitude + 4);
    return FloraNaturopathicEngine.getFloraForViewport({ west: w, south: s, east: e, north: n }, viewState.zoom);
  }, [settings.layers.medicinal_flora, currentBbox, viewState.longitude, viewState.latitude, viewState.zoom]);

  const visibleCountries = React.useMemo(() => {
    return CountryScopeEngine.getCountriesInViewport(currentBbox, [viewState.longitude, viewState.latitude]);
  }, [currentBbox, viewState.longitude, viewState.latitude]);

  React.useEffect(() => {
    if (visibleCountries.length > 0 && !visibleCountries.some(c => c.code === selectedCountryCode)) {
      setSelectedCountryCode(visibleCountries[0].code);
    }
  }, [visibleCountries, selectedCountryCode]);

  const scopeTotals = React.useMemo(() => {
    return CountryScopeEngine.getScopeTotals(
      countScopeMode === 'world' ? 'world' : selectedCountryCode,
      { custom_pins: settings.custom_pins?.length || 0, community_reports: communityReports.length }
    );
  }, [countScopeMode, selectedCountryCode, settings.custom_pins, communityReports.length]);

  const fastBboxCount = (feats?: any[]) => feats ? feats.length : 0;

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
    historical_cameras: 6,
    community_reports: communityReports.length,
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
    power_lines: powerLinesData?.features?.length || 0,
    utility_companies: utilityCompaniesData?.features?.length || 0,
    fiber_cables: fiberCablesData?.features?.length || 0,
    hospitals: fastBboxCount(hospitalsData?.features),
    urgent_care: fastBboxCount(urgentCareData?.features),
    military_bunkers: fastBboxCount(militaryBunkersData?.features),
    citizen_bunkers: fastBboxCount(citizenBunkersData?.features),
    bomb_storage_depots: fastBboxCount(bombStorageDepotsData?.features),
    military_bases: fastBboxCount(militaryBasesData?.features),
    dams: fastBboxCount(damsData?.features),
    flood_zones: femaFloodZonesData?.features?.length || 0,
    dam_inundation: damInundationData?.features?.length || 0,
    elevation_topography: fastBboxCount(topoPeaksData?.features),
    farms_ranches: fastBboxCount(farmsRanchesData?.features),
    medicinal_flora: floraViewportData?.geoJson?.features?.length || 0,
    fuel_pipelines: fuelPipelinesData?.features?.length || 0,
    water_aqueducts: waterAqueductsData?.features?.length || 0,
    strategic_facilities: fastBboxCount(strategicFacilitiesData?.features),
  }), [
    settings.custom_pins, settings.layers.fire_spread_forecast, springFeatures, cellTowerFeatures, earthquakeFeatures,
    disasterFeatures, aircraftFeatures, powerFeatures, aviationFeatures,
    emergencyFeatures, cameraFeatures, weatherStationFeatures, dataCenterFeatures,
    radarFeatures, publicLandFeatures, campsiteFeatures, trailFeatures,
    cableFeatures, landingPointFeatures, wildfireFeatures, vesselFeatures, obscuraFeatures,
    lightningFeatures, wildfireAgeFilter, spreadHorizonFilter,
    powerLinesData, utilityCompaniesData, fiberCablesData, hospitalsData, urgentCareData,
    militaryBunkersData, citizenBunkersData, bombStorageDepotsData, militaryBasesData,
    damsData, femaFloodZonesData, damInundationData, topoPeaksData, farmsRanchesData, fuelPipelinesData, waterAqueductsData, strategicFacilitiesData, floraViewportData, activeCityCrime,
    crimeData, roadClosuresData, currentBbox
  ]);

  const renderLayerBadge = (visible: number, totalKey: string, colorClass: string, testId?: string) => {
    const total = scopeTotals[totalKey] ?? visible;
    return (
      <span data-testid={testId} className={`${colorClass} font-bold ml-2 text-xs font-mono whitespace-nowrap`}>
        {visible.toLocaleString()} <span className="text-gray-400 font-normal text-[10px]">/ {total.toLocaleString()}</span>
      </span>
    );
  };
  
  const cellTowersData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: cellTowerFeatures }), [cellTowerFeatures]);
  const springData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: springFeatures }), [springFeatures]);
  const aircraftData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aircraftFeatures }), [aircraftFeatures]);
  const disasterData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: disasterFeatures }), [disasterFeatures]);
  const earthquakeData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: earthquakeFeatures }), [earthquakeFeatures]);
  const powerData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: powerFeatures }), [powerFeatures]);
  const aviationData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aviationFeatures }), [aviationFeatures]);
  const emergencyData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: emergencyFeatures }), [emergencyFeatures]);
  const { 
    cameraCollection: cameraData, 
    fovCollection: cameraFovData, 
    historicalCameraCollection: historicalCameraData, 
    historicalFovCollection: historicalCameraFovData 
  } = React.useMemo(() => {
    const enriched = cameraFeatures.length > 0 ? enrichOsmCameras(cameraFeatures) : [];
    return buildSurveillanceGeoJson(enriched);
  }, [cameraFeatures]);
  const communityReportsData = React.useMemo(() => {
    return buildCommunityReportsGeoJson(communityReports, true);
  }, [communityReports]);
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

  useEffect(() => {
    if (!settings.layers.atmospheric_radar) return;
    const interval = setInterval(() => {
      setRadarSweepAngle(prev => (prev + 6) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, [settings.layers.atmospheric_radar]);

  const isobarData = React.useMemo(() => {
    if (!settings.layers.weather_pressure) return null;
    return generateIsobarField(viewState.latitude, viewState.longitude, appleWeatherMetrics.pressureHpa || 1013.2);
  }, [settings.layers.weather_pressure, viewState.latitude, viewState.longitude, appleWeatherMetrics.pressureHpa]);

  const atmosphericRadarPayload = React.useMemo(() => {
    if (!settings.layers.atmospheric_radar) return { rangeRings: EMPTY_GEOJSON, sweepBeams: EMPTY_GEOJSON, stations: EMPTY_GEOJSON };
    return generateAtmosphericRadarGeoJSON(radarSweepAngle);
  }, [settings.layers.atmospheric_radar, radarSweepAngle]);

  const chemicalSprayGeoJSON = React.useMemo(() => {
    if (!settings.layers.chemical_spraying) return null;
    return ChemicalSprayingEngine.generateGeoJSON();
  }, [settings.layers.chemical_spraying, isChemicalModalOpen]);
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

  const threatRadarSummary = React.useMemo<ThreatRadarSummary>(() => {
    const pins = settings.custom_pins || [];
    if (pins.length === 0) {
      return { totalPins: 0, threatenedPins: 0, criticalPins: 0, warningPins: 0, advisoryPins: 0, clearPins: 0, reports: [] };
    }
    return PinThreatEngine.evaluateAllPins(pins, {
      wildfires: wildfireFeatures,
      earthquakes: earthquakeFeatures,
      dams: FloodHydrologyEngine.DAMS as any,
      toxicSites: toxicSiteFeatures,
      chemicalSprays: ChemicalSprayingEngine.getAllIncidents() as any,
      disasters: disasterFeatures
    });
  }, [settings.custom_pins, wildfireFeatures, earthquakeFeatures, toxicSiteFeatures, disasterFeatures]);

  const directionsData = React.useMemo(() => directionsResult?.routeGeoJSON || { type: 'FeatureCollection' as const, features: [] }, [directionsResult]);
  const altRoutesData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (directionsResult?.alternativeRoutes || []).map((a: any) => ({
      type: 'Feature' as const,
      properties: { id: a.id, strategy: a.strategy },
      geometry: a.routeGeoJSON?.geometry || a.routeGeoJSON
    }))
  }), [directionsResult]);

  const snowboardResortsData = React.useMemo(() => {
    if (!settings.layers.snowboard_trails) return EMPTY_GEOJSON;
    return globalSnowboardResorts || getSnowboardResortsGeoJSON();
  }, [settings.layers.snowboard_trails, globalSnowboardResorts]);
  const lakesGeoJson = React.useMemo(() => getLakesGeoJSON(), []);

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
    if (url.includes('demotiles.maplibre.org/font/')) {
      const sanitized = url.replace(/\/font\/([^/]+)\//, (_, fontstack) => {
        const primary = decodeURIComponent(fontstack).split(',')[0].trim();
        const resolved = 'Open Sans Semibold';
        return `/font/${encodeURIComponent(resolved)}/`;
      });
      return { url: sanitized };
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
        initialViewState={viewState}
        reuseMaps={false}
        dragPan={true}
        scrollZoom={true}
        doubleClickZoom={true}
        boxZoom={true}
        keyboard={true}
        style={{ width: '100%', height: '100%' }}
        maxTileCacheSize={150}
        transformRequest={transformRequest}
        dragRotate={true}
        touchPitch={true}
        touchZoomRotate={true}
        maxPitch={85}
        onError={(e) => {
          console.error("MapLibre GL Error:", e);
          if (e?.error?.message?.includes('WebGL') || (e as any)?.statusMessage?.includes('WebGL')) {
            setIsWebGLSupported(false);
          }
        }}
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
          try {
            map.dragPan?.enable();
            map.scrollZoom?.enable();
            map.boxZoom?.enable();
            map.doubleClickZoom?.enable();
            map.dragRotate?.enable();
            map.touchZoomRotate?.enable();
            map.keyboard?.enable();
            map.resize();
          } catch (e) {}
          if (typeof window !== 'undefined') (window as any).__sphinxMap = map;
          optimizeWaterAndLakeLabels(map);
          map.on('style.load', () => optimizeWaterAndLakeLabels(map));
          map.on('styledata', () => optimizeWaterAndLakeLabels(map));
        }}
        onMoveEnd={(evt) => {
          if (evt?.viewState) {
            setViewState(evt.viewState);
            setCurrentBearing(Math.round(evt.viewState.bearing || 0));
            if (evt.viewState.pitch != null) setIs3DView(evt.viewState.pitch > 25);
            if (typeof window !== 'undefined') {
              try { localStorage.setItem('sphinx_last_view_state', JSON.stringify(evt.viewState)); } catch {}
            }
          }
          updateBbox();
          
          // Debounce network fetches on map movement to prevent rate limits
          if ((window as any).moveDebounce) clearTimeout((window as any).moveDebounce);
          (window as any).moveDebounce = setTimeout(() => {
            loadHighPriorityData();
            loadMediumPriorityData();
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
              if (settings.layers.snowboard_trails && (evt.viewState.zoom || 0) >= 12) {
                ResortPisteEngine.fetchPistesForResort(evt.viewState.latitude, evt.viewState.longitude);
              }
            }
          }, 800);
        }}
        onClick={onMapClick}
        onContextMenu={(e: any) => {
          if (e.originalEvent?.defaultPrevented) return;
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
            tiles={[
              'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
              'https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
              'https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png'
            ]}
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

        {settings.layers.elevation_topography && (
          <Source
            key={`elevation-topo-${topoProvider}`}
            id="topography-raster-source"
            type="raster"
            tiles={TopographyElevationEngine.TOPO_TILE_PROVIDERS[topoProvider]?.tiles || TopographyElevationEngine.TOPO_TILE_PROVIDERS.elevation_heatmap.tiles}
            tileSize={256}
            maxzoom={TopographyElevationEngine.TOPO_TILE_PROVIDERS[topoProvider]?.maxzoom || 15}
          >
            <Layer
              id="topography-raster-layer"
              type="raster"
              beforeId="geofence-line"
              paint={{ 'raster-opacity': (topoProvider === 'elevation_heatmap') ? (topoOpacity ?? 0.85) : ((!settings.layers.satellite && topoProvider !== 'usgs_relief') ? 1.0 : (topoOpacity ?? 0.85)) }}
            />
          </Source>
        )}

        {settings.layers.regular_topography && (
          <Source
            id="regular-topography-source"
            type="raster"
            tiles={TopographyElevationEngine.TOPO_TILE_PROVIDERS.opentopo.tiles}
            tileSize={256}
            maxzoom={17}
          >
            <Layer
              id="regular-topography-layer"
              type="raster"
              beforeId="geofence-fill"
              paint={{ 'raster-opacity': 0.9 }}
            />
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
        {settings.layers.weather_clouds && weatherCloudsUrl && (
          <Source id="weather-clouds" type="raster" tiles={[weatherCloudsUrl]} tileSize={256} maxzoom={7}>
            <Layer id="weather-clouds-layer" type="raster" paint={{ 'raster-opacity': 0.60 }} />
          </Source>
        )}
        {settings.layers.snowboard_trails && (
          <>
            {resortPistesLiftsData && (
              <Source id="resort-pistes-lifts" type="geojson" data={resortPistesLiftsData}>
                <Layer 
                  id="resort-lifts-casing" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'lift']}
                  paint={{
                    'line-color': '#000000',
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 3, 12, 5.5, 15, 8, 17, 11],
                    'line-opacity': 0.95
                  }}
                />
                <Layer 
                  id="resort-lifts-line" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'lift']}
                  paint={{
                    'line-color': '#fbbf24',
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1.5, 12, 3, 15, 4.5, 17, 6],
                    'line-dasharray': [2.5, 1.5]
                  }}
                />
                <Layer 
                  id="resort-pistes-glow" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'piste']}
                  paint={{
                    'line-color': [
                      'match',
                      ['get', 'difficulty'],
                      'easy', '#10b981',
                      'intermediate', '#38bdf8',
                      'advanced', '#cbd5e1',
                      'expert', '#ef4444',
                      '#38bdf8'
                    ],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 5, 12, 9, 15, 14, 17, 20],
                    'line-blur': 3.5,
                    'line-opacity': 0.6
                  }}
                />
                <Layer 
                  id="resort-pistes-casing" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'piste']}
                  paint={{
                    'line-color': [
                      'match',
                      ['get', 'difficulty'],
                      'advanced', '#ffffff',
                      '#000000'
                    ],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 2.5, 12, 5, 15, 8, 17, 12],
                    'line-opacity': 0.85
                  }}
                />
                <Layer 
                  id="resort-pistes-line" 
                  type="line" 
                  filter={['==', ['get', 'type'], 'piste']}
                  paint={{
                    'line-color': [
                      'match',
                      ['get', 'difficulty'],
                      'easy', '#22c55e',
                      'intermediate', '#0284c7',
                      'advanced', '#0f172a',
                      'expert', '#ef4444',
                      '#0284c7'
                    ],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1.5, 12, 3, 15, 5, 17, 8],
                    'line-opacity': 1.0
                  }}
                />
                <Layer 
                  id="resort-lifts-label" 
                  type="symbol" 
                  minzoom={10.5}
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
                  minzoom={11}
                  filter={['==', ['get', 'type'], 'piste']}
                  layout={{
                    'text-field': [
                      'case',
                      ['==', ['get', 'difficulty'], 'easy'], ['concat', '🟢 [Green] ', ['get', 'name']],
                      ['==', ['get', 'difficulty'], 'intermediate'], ['concat', '🟦 [Blue] ', ['get', 'name']],
                      ['==', ['get', 'difficulty'], 'advanced'], ['concat', '◆ [Black] ', ['get', 'name']],
                      ['==', ['get', 'difficulty'], 'expert'], ['concat', '◆◆ [Double Black] ', ['get', 'name']],
                      ['get', 'name']
                    ],
                    'text-size': 10,
                    'symbol-placement': 'line'
                  }}
                  paint={{
                    'text-color': '#ffffff',
                    'text-halo-color': '#000000',
                    'text-halo-width': 2.8
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
                'icon-size': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  2, 1.8,
                  4, 1.4,
                  6, 1.1,
                  10, 0.9,
                  14, 0.75
                ],
                'icon-rotate': ['coalesce', ['get', 'heading'], ['get', 'true_track'], 0],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
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
                'text-font': ['Open Sans Regular']
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
                'text-font': ['Open Sans Regular']
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
        {settings.layers.historical_cameras && (
          <Source id="historical-camera-fovs" type="geojson" data={historicalCameraFovData}>
            <Layer id="historical-camera-fov-layer" source="historical-camera-fovs" type="fill" minzoom={11} paint={{ 'fill-color': '#64748b', 'fill-opacity': 0.2 }} />
            <Layer id="historical-camera-fov-line-layer" source="historical-camera-fovs" type="line" minzoom={11} paint={{ 'line-color': '#94a3b8', 'line-width': 1.5, 'line-dasharray': [3, 2], 'line-opacity': 0.7 }} />
          </Source>
        )}
        {settings.layers.historical_cameras && (
          <Source id="historical-cameras" type="geojson" data={historicalCameraData}>
            <Layer
              id="historical-camera-layer"
              source="historical-cameras"
              type="circle"
              minzoom={7}
              paint={{
                'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, 4, 12, 6, 15, 8],
                'circle-color': '#64748b',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ef4444',
                'circle-opacity': 0.85
              }}
            />
            <Layer
              id="historical-camera-label-layer"
              source="historical-cameras"
              type="symbol"
              minzoom={12}
              layout={{
                'text-field': ['concat', '[REMOVED] ', ['get', 'vendor_display']],
                'text-size': 9,
                'text-offset': [0, 1.4],
                'text-anchor': 'top'
              }}
              paint={{
                'text-color': '#f87171',
                'text-halo-color': '#020617',
                'text-halo-width': 1.5
              }}
            />
          </Source>
        )}
        {settings.layers.community_reports && (
          <Source id="community-reports" type="geojson" data={communityReportsData}>
            <Layer
              id="community-reports-point"
              source="community-reports"
              type="circle"
              minzoom={5}
              paint={{
                'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 5, 12, 7, 15, 9],
                'circle-color': [
                  'case',
                  ['==', ['get', 'status'], 'verified_system'], '#10b981',
                  '#f59e0b'
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="community-reports-label"
              source="community-reports"
              type="symbol"
              minzoom={11}
              layout={{
                'text-field': [
                  'case',
                  ['==', ['get', 'status'], 'verified_system'],
                  ['concat', '✓ ', ['coalesce', ['get', 'name'], ['get', 'title'], 'Community Node']],
                  ['concat', '⏳ [', ['to-string', ['coalesce', ['get', 'confirmations'], 1]], '/3] ', ['coalesce', ['get', 'name'], ['get', 'title'], 'Community Node']]
                ],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top'
              }}
              paint={{
                'text-color': [
                  'case',
                  ['==', ['get', 'status'], 'verified_system'], '#6ee7b7',
                  '#fde047'
                ],
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
                'text-font': ['Open Sans Regular'],
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
                'text-font': ['Open Sans Regular'],
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
                'text-color': '#ffffff',
                'text-halo-color': '#000000',
                'text-halo-width': 1.5
              }} 
            />
          </Source>
        )}

        {/* Curated Lakes & Water Bodies - High-Visibility White Vector Labels (Never Blue) */}
        <Source id="curated-lakes" type="geojson" data={lakesGeoJson}>
          <Layer
            id="curated-lakes-point"
            type="circle"
            minzoom={3}
            paint={{
              'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 2, 6, 3.5, 10, 5, 14, 6],
              'circle-color': '#ffffff',
              'circle-opacity': 0.85,
              'circle-stroke-width': 1.5,
              'circle-stroke-color': '#0284c7'
            }}
          />
          <Layer
            id="curated-lakes-label"
            type="symbol"
            minzoom={3}
            layout={{
              'text-field': ['get', 'name'],
              'text-font': ['Open Sans Bold'],
              'text-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                3, 9,
                6, 11,
                9, 12.5,
                12, 14,
                15, 16.5
              ],
              'text-offset': [0, 1.2],
              'text-anchor': 'top',
              'text-transform': 'uppercase',
              'text-letter-spacing': 0.12,
              'text-allow-overlap': true,
              'text-ignore-placement': true
            }}
            paint={{
              'text-color': '#ffffff',
              'text-halo-color': '#000000',
              'text-halo-width': 1.8,
              'text-halo-blur': 0
            }}
          />
        </Source>

        {settings.layers.weather_pressure && (
          <Source id="weather-isobars-source" type="geojson" data={isobarData}>
            <Layer
              id="weather-isobars-line"
              type="line"
              filter={['==', ['get', 'kind'], 'isobar']}
              paint={{ 'line-color': ['get', 'color'], 'line-width': ['get', 'weight'], 'line-opacity': 0.75 }}
            />
            <Layer
              id="weather-isobars-label"
              type="symbol"
              filter={['==', ['get', 'kind'], 'isobar']}
              layout={{ 'symbol-placement': 'line', 'text-field': ['get', 'label'], 'text-size': 10, 'text-font': ['Open Sans Regular'] }}
              paint={{ 'text-color': '#e2e8f0', 'text-halo-color': '#020617', 'text-halo-width': 1.5 }}
            />
            <Layer
              id="weather-pressure-centers"
              type="symbol"
              filter={['==', ['get', 'kind'], 'pressure_center']}
              layout={{ 'text-field': ['concat', ['get', 'centerType'], '\n', ['to-string', ['get', 'pressureHpa']], ' hPa'], 'text-size': 13, 'text-font': ['Open Sans Bold'], 'text-allow-overlap': true }}
              paint={{ 'text-color': ['get', 'color'], 'text-halo-color': '#020617', 'text-halo-width': 2 }}
            />
          </Source>
        )}

        {settings.layers.atmospheric_radar && (
          <>
            <Source id="atmospheric-radar-rings-source" type="geojson" data={atmosphericRadarPayload.rangeRings}>
              <Layer id="atmospheric-radar-rings" type="line" paint={{ 'line-color': ['get', 'color'], 'line-width': 1.2, 'line-dasharray': [3, 2], 'line-opacity': 0.6 }} />
            </Source>
            <Source id="atmospheric-radar-sweep-source" type="geojson" data={atmosphericRadarPayload.sweepBeams}>
              <Layer id="atmospheric-radar-sweep" type="line" paint={{ 'line-color': ['get', 'color'], 'line-width': 2, 'line-opacity': 0.85 }} />
            </Source>
            <Source id="atmospheric-radar-stations-source" type="geojson" data={atmosphericRadarPayload.stations}>
              <Layer id="atmospheric-radar-point" type="circle" paint={{ 'circle-radius': 8, 'circle-color': ['get', 'color'], 'circle-stroke-width': 2.5, 'circle-stroke-color': '#ffffff', 'circle-opacity': 0.95 }} />
              <Layer id="atmospheric-radar-label" type="symbol" layout={{ 'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name']], 'text-size': 11, 'text-offset': [0, 1.4], 'text-anchor': 'top', 'text-font': ['Open Sans Bold'] }} paint={{ 'text-color': '#ffffff', 'text-halo-color': '#020617', 'text-halo-width': 1.8 }} />
            </Source>
          </>
        )}

        {settings.layers.chemical_spraying && chemicalSprayGeoJSON && (
          <>
            <Source id="chemical-spray-zones-source" type="geojson" data={chemicalSprayGeoJSON.zones}>
              <Layer 
                id="chemical-spray-zones-fill" 
                type="fill" 
                paint={{ 
                  'fill-color': ['get', 'fillColor'], 
                  'fill-opacity': 0.28 
                }} 
              />
              <Layer 
                id="chemical-spray-zones-line" 
                type="line" 
                paint={{ 
                  'line-color': ['get', 'strokeColor'], 
                  'line-width': 2, 
                  'line-dasharray': [2, 1],
                  'line-opacity': 0.85 
                }} 
              />
            </Source>
            <Source id="chemical-spray-paths-source" type="geojson" data={chemicalSprayGeoJSON.paths}>
              <Layer 
                id="chemical-spray-paths-line" 
                type="line" 
                paint={{ 
                  'line-color': '#f97316', 
                  'line-width': 2.5, 
                  'line-dasharray': [4, 2],
                  'line-opacity': 0.9 
                }} 
              />
            </Source>
            <Source id="chemical-spray-points-source" type="geojson" data={chemicalSprayGeoJSON.points}>
              <Layer 
                id="chemical-spray-points" 
                type="circle" 
                paint={{ 
                  'circle-radius': 7.5, 
                  'circle-color': ['get', 'fillColor'], 
                  'circle-stroke-width': 2, 
                  'circle-stroke-color': '#ffffff', 
                  'circle-opacity': 0.95 
                }} 
              />
              <Layer 
                id="chemical-spray-label" 
                type="symbol" 
                layout={{ 
                  'text-field': [
                    'concat', 
                    ['case', 
                      ['==', ['get', 'lifecycleStatus'], 'planned'], '📅 [PLANNED] ',
                      ['==', ['get', 'lifecycleStatus'], 'discussed'], '📢 [DISCUSSED] ',
                      ['==', ['get', 'lifecycleStatus'], 'historical'], '🌱 [HISTORICAL] ',
                      '🧪 [ACTIVE] '
                    ], 
                    ['get', 'chemicalName']
                  ], 
                  'text-size': 10, 
                  'text-offset': [0, 1.3], 
                  'text-anchor': 'top', 
                  'text-font': ['Open Sans Bold'] 
                }} 
                paint={{ 
                  'text-color': '#ffffff', 
                  'text-halo-color': '#020617', 
                  'text-halo-width': 2 
                }} 
              />
            </Source>
          </>
        )}

        {/* 1. High-Voltage Power Lines & Transmission Corridors */}
        {settings.layers.power_lines && (
          <Source id="power-lines-source" type="geojson" data={powerLinesData}>
            <Layer
              id="power-lines-glow"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': ['*', ['get', 'weight'], 2.2],
                'line-opacity': 0.28,
                'line-blur': 3
              }}
            />
            <Layer
              id="power-lines-core"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': ['get', 'weight'],
                'line-opacity': 0.95
              }}
            />
            <Layer
              id="power-lines-label"
              type="symbol"
              minzoom={5}
              layout={{
                'symbol-placement': 'line-center',
                'text-field': ['concat', '⚡ ', ['get', 'voltageKv'], 'kV • ', ['get', 'name']],
                'text-size': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  5, 10.5,
                  8, 12,
                  11, 13.5,
                  14, 15
                ],
                'text-font': ['Open Sans Bold'],
                'text-letter-spacing': 0.1,
                'text-transform': 'uppercase',
                'text-allow-overlap': true,
                'text-ignore-placement': true
              }}
              paint={{
                'text-color': '#fde047',
                'text-halo-color': '#000000',
                'text-halo-width': 2.5,
                'text-halo-blur': 0.5
              }}
            />
          </Source>
        )}

        {/* 2. Utility Companies & Major Generation Plants */}
        {settings.layers.utility_companies && (
          <Source id="utility-companies-source" type="geojson" data={utilityCompaniesData}>
            <Layer
              id="utility-companies-point"
              type="circle"
              paint={{
                'circle-radius': 7.5,
                'circle-color': ['get', 'badgeColor'],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="utility-companies-label"
              type="symbol"
              minzoom={6}
              layout={{
                'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name']],
                'text-size': 10.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#ffffff',
                'text-halo-color': '#020617',
                'text-halo-width': 1.8
              }}
            />
          </Source>
        )}

        {/* 3. Terrestrial Fiberoptic & Data Center Cables */}
        {settings.layers.fiber_cables && (
          <Source id="fiber-cables-source" type="geojson" data={fiberCablesData}>
            <Layer
              id="fiber-cables-glow"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': ['*', ['get', 'weight'], 2.5],
                'line-opacity': 0.35,
                'line-blur': 2.5
              }}
            />
            <Layer
              id="fiber-cables-core"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': ['get', 'weight'],
                'line-opacity': 0.95
              }}
            />
            <Layer
              id="fiber-cables-label"
              type="symbol"
              minzoom={6.5}
              layout={{
                'symbol-placement': 'line',
                'text-field': ['concat', '🌐 ', ['get', 'name']],
                'text-size': 10,
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#c084fc',
                'text-halo-color': '#020617',
                'text-halo-width': 1.8
              }}
            />
          </Source>
        )}

        {/* 4. Hospitals & Trauma Centers */}
        {settings.layers.hospitals && (
          <Source id="hospitals-source" type="geojson" data={hospitalsData}>
            <Layer
              id="hospitals-point"
              type="circle"
              paint={{
                'circle-radius': 8,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="hospitals-label"
              type="symbol"
              minzoom={5.5}
              layout={{
                'text-field': ['concat', '🏥 ', ['get', 'name'], '\n[', ['get', 'traumaLevel'], ']'],
                'text-size': 10,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#fecaca',
                'text-halo-color': '#020617',
                'text-halo-width': 1.8
              }}
            />
          </Source>
        )}

        {/* 5. Urgent Care & Emergency Medical Dispatch */}
        {settings.layers.urgent_care && (
          <Source id="urgent-care-source" type="geojson" data={urgentCareData}>
            <Layer
              id="urgent-care-point"
              type="circle"
              paint={{
                'circle-radius': 6.5,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 1.8,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="urgent-care-label"
              type="symbol"
              minzoom={7.5}
              layout={{
                'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name']],
                'text-size': 9.5,
                'text-offset': [0, 1.3],
                'text-anchor': 'top',
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#ccfbf1',
                'text-halo-color': '#020617',
                'text-halo-width': 1.8
              }}
            />
          </Source>
        )}

        {/* 6. Military Bunkers & Underground Command Centers */}
        {settings.layers.military_bunkers && (
          <Source id="military-bunkers-source" type="geojson" data={militaryBunkersData}>
            <Layer
              id="military-bunkers-point"
              type="circle"
              paint={{
                'circle-radius': 9,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.5,
                'circle-stroke-color': '#fbcfe8',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="military-bunkers-label"
              type="symbol"
              minzoom={5.5}
              layout={{
                'text-field': ['concat', '🛡️ ', ['get', 'name'], '\n[', ['to-string', ['get', 'depthFeet']], 'ft deep • ', ['to-string', ['get', 'blastOverpressurePsi']], ' PSI]'],
                'text-size': 10,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#f472b6',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 7. Citizen-Access Bunkers & Public Fallout Shelters */}
        {settings.layers.citizen_bunkers && (
          <Source id="citizen-bunkers-source" type="geojson" data={citizenBunkersData}>
            <Layer
              id="citizen-bunkers-point"
              type="circle"
              paint={{
                'circle-radius': 8.5,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.2,
                'circle-stroke-color': '#a7f3d0',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="citizen-bunkers-label"
              type="symbol"
              minzoom={6}
              layout={{
                'text-field': ['concat', '🟢 ', ['get', 'name'], '\n[Cap: ', ['to-string', ['get', 'capacityPeople']], ' • ', ['get', 'accessProtocol'], ']'],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#6ee7b7',
                'text-halo-color': '#020617',
                'text-halo-width': 1.8
              }}
            />
          </Source>
        )}

        {/* 8. Bomb & Munitions Storage Depots */}
        {settings.layers.bomb_storage_depots && (
          <Source id="bomb-storage-depots-source" type="geojson" data={bombStorageDepotsData}>
            <Layer
              id="bomb-storage-depots-point"
              type="circle"
              paint={{
                'circle-radius': 9,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.2,
                'circle-stroke-color': '#fed7aa',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="bomb-storage-depots-label"
              type="symbol"
              minzoom={5.5}
              layout={{
                'text-field': ['concat', '💣 ', ['get', 'name'], '\n[', ['get', 'securityTier'], ']'],
                'text-size': 10,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#fbbf24',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 9. Strategic Military Bases & Global Installations */}
        {settings.layers.military_bases && (
          <Source id="military-bases-source" type="geojson" data={militaryBasesData}>
            <Layer
              id="military-bases-point"
              type="circle"
              paint={{
                'circle-radius': 9.5,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.5,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="military-bases-label"
              type="symbol"
              minzoom={5}
              layout={{
                'text-field': ['concat', '⚔️ ', ['get', 'name'], '\n[', ['get', 'branch'], ' • ', ['to-string', ['get', 'personnelActiveDuty']], ' troops]'],
                'text-size': 10,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#93c5fd',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 10. Multi-Dam Breach Inundation Surge Zones */}
        {settings.layers.dam_inundation && selectedDamIds.length > 0 && (
          <>
            <Source id="dam-inundation-source" type="geojson" data={damInundationData}>
              <Layer
                id="dam-inundation-fill"
                type="fill"
                paint={{
                  'fill-color': ['get', 'color'],
                  'fill-opacity': ['get', 'fillOpacity']
                }}
              />
              <Layer
                id="dam-inundation-line"
                type="line"
                paint={{
                  'line-color': '#38bdf8',
                  'line-width': 2.5,
                  'line-opacity': 0.85
                }}
              />
            </Source>
            <Source id="dam-wave-points-source" type="geojson" data={damWavePointsData}>
              <Layer
                id="dam-flood-wave-points"
                type="circle"
                paint={{
                  'circle-radius': 5,
                  'circle-color': '#0284c7',
                  'circle-stroke-width': 1.5,
                  'circle-stroke-color': '#ffffff'
                }}
              />
              <Layer
                id="dam-flood-wave-labels"
                type="symbol"
                minzoom={6.5}
                layout={{
                  'text-field': ['get', 'labelText'],
                  'text-size': 9.5,
                  'text-offset': [0, 1.3],
                  'text-anchor': 'top',
                  'text-font': ['Open Sans Semibold']
                }}
                paint={{
                  'text-color': '#e0f2fe',
                  'text-halo-color': '#020617',
                  'text-halo-width': 2
                }}
              />
            </Source>
          </>
        )}

        {/* 11. FEMA 100-Year & 500-Year Flood Zones */}
        {settings.layers.flood_zones && (
          <Source id="fema-flood-zones-source" type="geojson" data={femaFloodZonesData}>
            <Layer
              id="fema-flood-zones-fill"
              type="fill"
              paint={{
                'fill-color': ['get', 'color'],
                'fill-opacity': 0.35
              }}
            />
            <Layer
              id="fema-flood-zones-line"
              type="line"
              paint={{
                'line-color': '#0284c7',
                'line-width': 1.5,
                'line-opacity': 0.7
              }}
            />
          </Source>
        )}

        {/* 12. Dams & Reservoirs */}
        {settings.layers.dams && (
          <Source id="dams-source" type="geojson" data={damsData}>
            <Layer
              id="dams-point"
              type="circle"
              paint={{
                'circle-radius': 10,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.5,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="dams-label"
              type="symbol"
              minzoom={5}
              layout={{
                'text-field': ['concat', '🏛️ ', ['get', 'name'], '\n[', ['to-string', ['get', 'structuralHeightFt']], 'ft • ', ['get', 'riverSystem'], ']'],
                'text-size': 10,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#7dd3fc',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 13. Topographic Summits & Elevation Spot Heights */}
        {settings.layers.elevation_topography && showTopoPeaks && (
          <Source id="topographic-peaks-source" type="geojson" data={topoPeaksData}>
            <Layer
              id="topographic-peaks-point"
              type="circle"
              paint={{
                'circle-radius': 9,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#020617',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="topographic-peaks-label"
              type="symbol"
              minzoom={5.0}
              layout={{
                'text-field': ['concat', '🏔️ ', ['get', 'name'], '\n[', ['to-string', ['get', 'elevationFt']], ' ft]'],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#f8fafc',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 15. Native Medicinal Flora & Naturopathy */}
        {settings.layers.medicinal_flora && (
          <Source id="medicinal-flora-source" type="geojson" data={floraViewportData.geoJson}>
            <Layer
              id="medicinal-flora-point"
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate', ['linear'], ['zoom'],
                  3, 6,
                  7, 9,
                  11, 13
                ],
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#020617',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="medicinal-flora-label"
              type="symbol"
              minzoom={4.5}
              layout={{
                'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name'], '\n[', ['get', 'primaryPhytochemicalClass'], ']'],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#a7f3d0',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 14. Farms & Ranches Intelligence */}
        {settings.layers.farms_ranches && (
          <Source id="farms-ranches-source" type="geojson" data={farmsRanchesData}>
            <Layer
              id="farms-ranches-point"
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate', ['linear'], ['zoom'],
                  3, 5,
                  7, 8,
                  11, 12
                ],
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#020617',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="farms-ranches-label"
              type="symbol"
              minzoom={4.5}
              layout={{
                'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name'], '\n[', ['get', 'acreageLabel'], ' • ', ['get', 'categoryLabel'], ']'],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#fef08a',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 16. Continental Fuel Pipelines */}
        {settings.layers.fuel_pipelines && (
          <Source id="fuel-pipelines-source" type="geojson" data={fuelPipelinesData}>
            <Layer
              id="fuel-pipelines-glow"
              type="line"
              paint={{
                'line-color': '#eab308',
                'line-width': 4.5,
                'line-opacity': 0.35,
                'line-blur': 3
              }}
            />
            <Layer
              id="fuel-pipelines-line"
              type="line"
              paint={{
                'line-color': '#facc15',
                'line-width': 2.5,
                'line-opacity': 0.95
              }}
            />
            <Layer
              id="fuel-pipelines-label"
              type="symbol"
              minzoom={5.5}
              layout={{
                'symbol-placement': 'line-center',
                'text-field': ['concat', '⛽ ', ['get', 'name']],
                'text-size': 10,
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#fef08a',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 17. Major Water Aqueducts & Canals */}
        {settings.layers.water_aqueducts && (
          <Source id="water-aqueducts-source" type="geojson" data={waterAqueductsData}>
            <Layer
              id="water-aqueducts-glow"
              type="line"
              paint={{
                'line-color': '#06b6d4',
                'line-width': 5,
                'line-opacity': 0.35,
                'line-blur': 3
              }}
            />
            <Layer
              id="water-aqueducts-line"
              type="line"
              paint={{
                'line-color': '#22d3ee',
                'line-width': 2.8,
                'line-opacity': 0.95
              }}
            />
            <Layer
              id="water-aqueducts-label"
              type="symbol"
              minzoom={5.5}
              layout={{
                'symbol-placement': 'line-center',
                'text-field': ['concat', '💧 ', ['get', 'name']],
                'text-size': 10,
                'text-font': ['Open Sans Bold']
              }}
              paint={{
                'text-color': '#a5f3fc',
                'text-halo-color': '#020617',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {/* 18. Strategic Petroleum Reserves, Refineries, Dry Casks & Early Warning Radars */}
        {settings.layers.strategic_facilities && (
          <Source id="strategic-facilities-source" type="geojson" data={strategicFacilitiesData}>
            <Layer
              id="strategic-facilities-point"
              type="circle"
              paint={{
                'circle-radius': 9.5,
                'circle-color': ['get', 'color'],
                'circle-stroke-width': 2.5,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.95
              }}
            />
            <Layer
              id="strategic-facilities-label"
              type="symbol"
              minzoom={5.0}
              layout={{
                'text-field': ['concat', ['get', 'icon'], ' ', ['get', 'name'], '\n[', ['get', 'category'], ']'],
                'text-size': 9.5,
                'text-offset': [0, 1.4],
                'text-anchor': 'top',
                'text-font': ['Open Sans Semibold']
              }}
              paint={{
                'text-color': '#ffffff',
                'text-halo-color': '#020617',
                'text-halo-width': 2
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
            <DraggablePopupWrapper
              resetKey={`${selectedFeature.longitude}_${selectedFeature.latitude}_${selectedFeature.properties?.id || selectedFeature.layerId || ''}`}
              handleLabel="DRAG POPUP"
              hasCloseButton={true}
            >
              <div className="text-slate-100 text-sm font-sans w-full max-w-[min(460px,calc(100vw-32px))] max-h-[min(560px,calc(100vh-130px))] overflow-y-auto pr-1 custom-scrollbar">
              <h3 className="font-bold text-base border-b border-cyan-500/30 text-white mb-1.5 pb-1 uppercase tracking-wide">
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
                 (selectedFeature.layerId === 'historical-camera-layer' || selectedFeature.layerId === 'historical-camera-fov-layer' || selectedFeature.properties.is_historical) ? 'Decommissioned / Removed Camera' :
                 selectedFeature.layerId === 'community-reports-point' ? '👥 Community Field Report' :
                 (selectedFeature.layerId === 'camera-layer' || selectedFeature.layerId === 'camera-fov-layer' || selectedFeature.properties.vendor || ['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type)) ? 'Surveillance / ALPR Node' :
                 selectedFeature.layerId === 'submarine-cable-layer' ? 'Subsea Fiber Cable' :
                 (selectedFeature.layerId === 'road-barricade-3d-extrusion' || selectedFeature.layerId === 'road-hazard-core-line') ? '🚧 Road Closure / Work Zone (3D AR)' :
                 (selectedFeature.properties.type === 'piste' || selectedFeature.layerId?.startsWith('resort-piste')) ? '⛷️ AR Ski / Snowboard Trail' :
                 (selectedFeature.properties.type === 'lift' || selectedFeature.layerId?.startsWith('resort-lift')) ? '🚡 Chairlift / Aerialway (AR)' :
                 (selectedFeature.layerId === 'curated-lakes-point' || selectedFeature.layerId === 'curated-lakes-label' || selectedFeature.layerId === 'lake-feature' || selectedFeature.properties.category === 'lake') ? '🌊 Freshwater Lake / Water Body' :
                 selectedFeature.properties.kind === 'pressure_center' ? `Atmospheric ${selectedFeature.properties.centerType} Pressure System` :
                 (selectedFeature.layerId === 'atmospheric-radar-point' || selectedFeature.properties.stationType) ? 'Atmospheric & Ionospheric Radar Station' :
                 (selectedFeature.layerId === 'chemical-spray-points' || selectedFeature.layerId === 'chemical-spray-zones-fill' || selectedFeature.properties.chemicalId) ? '🧪 Chemical Spraying & Toxin Zone' :
                  (selectedFeature.layerId === 'power-lines-core' || selectedFeature.properties.type === 'power_line') ? '⚡ High-Voltage Power Line' :
                  (selectedFeature.layerId === 'utility-companies-point' || selectedFeature.properties.type === 'utility_company') ? '🏢 Utility Company / Generation Hub' :
                  (selectedFeature.layerId === 'fiber-cables-core' || selectedFeature.properties.type === 'fiber_cable') ? '🌐 Terrestrial / DCI Fiber Cable' :
                  (selectedFeature.layerId === 'hospitals-point' || selectedFeature.properties.type === 'hospital') ? '🏥 Hospital & Trauma Center' :
                  (selectedFeature.layerId === 'urgent-care-point' || selectedFeature.properties.type === 'urgent_care') ? '🩺 Urgent Care / Emergency Base' :
                  (selectedFeature.layerId === 'military-bunkers-point' || selectedFeature.properties.type === 'military_bunker') ? '🛡️ Military Bunker / Command Complex' :
                  (selectedFeature.layerId === 'citizen-bunkers-point' || selectedFeature.properties.type === 'citizen_bunker') ? '🟢 Citizen-Access Fallout Shelter' :
                  (selectedFeature.layerId === 'bomb-storage-depots-point' || selectedFeature.properties.type === 'bomb_storage_depot') ? '💣 Bomb & Munitions Storage Depot' :
                  (selectedFeature.layerId === 'military-bases-point' || selectedFeature.properties.type === 'military_base') ? '⚔️ Strategic Military Base' :
                  (selectedFeature.layerId === 'dams-point' || selectedFeature.properties.type === 'dam') ? '🏛️ Dam & Hydroelectric Reservoir' :
                  (selectedFeature.layerId === 'dam-inundation-fill' || selectedFeature.properties.type === 'dam_inundation_zone') ? '🌊 Dam Breach Inundation Surge Zone' :
                  (selectedFeature.layerId === 'fema-flood-zones-fill' || selectedFeature.properties.type === 'fema_flood_zone') ? '🗺️ FEMA Flood Hazard Zone' :
                  (selectedFeature.layerId === 'topographic-peaks-point' || selectedFeature.properties.type === 'topographic_peak') ? '🏔️ Alpine Summit & Spot Height' :
                   (selectedFeature.layerId === 'farms-ranches-point' || selectedFeature.properties.type === 'farm_ranch') ? '🚜 Farm & Ranch Intelligence' :
                   (selectedFeature.layerId === 'medicinal-flora-point' || selectedFeature.properties.categoryLabel) ? '🌿 Native Medicinal Flora & Naturopathy' :
                   (selectedFeature.layerId === 'fuel-pipelines-line' || selectedFeature.properties.type === 'pipeline') ? '⛽ Continental Fuel Pipeline' :
                   (selectedFeature.layerId === 'water-aqueducts-line' || selectedFeature.properties.type === 'aqueduct') ? '💧 Major Water Aqueduct & Canal' :
                   (selectedFeature.layerId === 'strategic-facilities-point' || selectedFeature.properties.facilityType) ? (selectedFeature.properties.category || '🛡️ Strategic National Facility') :
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

              {selectedFeature.properties.kind === 'pressure_center' && (
                <div className="space-y-1 mt-2 text-xs font-mono">
                  <p><strong>System Type:</strong> <span className={selectedFeature.properties.centerType === 'HIGH' ? 'text-sky-600 font-bold' : 'text-red-600 font-bold'}>{selectedFeature.properties.centerType} PRESSURE CELL</span></p>
                  <p><strong>Central Pressure:</strong> {selectedFeature.properties.pressureHpa} hPa ({selectedFeature.properties.pressureInHg} inHg)</p>
                  <p><strong>Atmospheric Trend:</strong> {selectedFeature.properties.trend?.toUpperCase()}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'atmospheric-radar-point' || selectedFeature.properties.stationType) && (
                <div className="space-y-1 mt-2 text-xs font-sans">
                  <p className="font-bold text-sm text-indigo-950">{selectedFeature.properties.name}</p>
                  <p><strong>Callsign:</strong> <span className="font-mono font-bold">{selectedFeature.properties.callsign || selectedFeature.properties.id}</span></p>
                  <p><strong>Agency:</strong> {selectedFeature.properties.agency}</p>
                  <p><strong>Frequency:</strong> <span className="font-mono text-cyan-800 font-bold">{selectedFeature.properties.frequency}</span></p>
                  <p><strong>Peak Power:</strong> {selectedFeature.properties.peakPowerMw} MW</p>
                  <p><strong>PRF / Pulse:</strong> {selectedFeature.properties.pulseRepFreqHz} Hz // {selectedFeature.properties.pulseWidthUs} µs</p>
                  <p><strong>Status:</strong> <span className="font-mono px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">{selectedFeature.properties.operationalStatus}</span></p>
                  <p className="text-[11px] text-gray-700 mt-1 italic border-t border-gray-200 pt-1">{selectedFeature.properties.description}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'chemical-spray-points' || selectedFeature.layerId === 'chemical-spray-zones-fill' || selectedFeature.properties.chemicalId) && (
                <div className="space-y-1.5 mt-2 text-xs font-sans">
                  <p className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                    <span>🧪</span>
                    <span>{selectedFeature.properties.chemicalName}</span>
                  </p>
                  <p><strong>Location:</strong> {selectedFeature.properties.locationName}</p>
                  <p><strong>CAS Registry:</strong> <span className="font-mono font-bold">{selectedFeature.properties.casNumber}</span></p>
                  {selectedFeature.properties.lifecycleStatus === 'planned' ? (
                    <div className="p-2 rounded bg-sky-950/80 border border-sky-600 text-sky-200">
                      <span className="font-bold text-[10px] block text-sky-400">📅 PLANNED / PERMITTED APPLICATION</span>
                      <span>Target Date: {selectedFeature.properties.scheduledDate || new Date(selectedFeature.properties.applicationTimestamp).toLocaleDateString()}</span>
                    </div>
                  ) : selectedFeature.properties.lifecycleStatus === 'discussed' ? (
                    <div className="p-2 rounded bg-purple-950/80 border border-purple-600 text-purple-200">
                      <span className="font-bold text-[10px] block text-purple-400">📢 PROPOSED / PUBLIC DOCKET DISCUSSION</span>
                      <span>Context: {selectedFeature.properties.discussionContext || 'Notice of Proposed Spraying'}</span>
                    </div>
                  ) : (
                    <>
                      <p><strong>Applied:</strong> {new Date(selectedFeature.properties.applicationTimestamp).toLocaleDateString()} ({selectedFeature.properties.daysElapsed} days ago)</p>
                      <p><strong>Decay Phase:</strong> <span className="font-bold text-amber-400">{selectedFeature.properties.decayPhase?.replace(/_/g, ' ')}</span></p>
                      <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 mt-1 space-y-1">
                        <p className="font-bold text-emerald-300">Chemical Breakdown: {selectedFeature.properties.percentPurifiedByEarth}%</p>
                        <p className="text-[11px] text-emerald-400/80">Soil Degradation Remaining: {selectedFeature.properties.daysRemaining} days</p>
                      </div>
                    </>
                  )}
                  <p><strong>Dosage / Vector:</strong> <span className="font-mono text-gray-300">{selectedFeature.properties.dosageApplied}</span></p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSprayIncidentId(selectedFeature.properties.id);
                      setIsChemicalModalOpen(true);
                      setSelectedFeature(null);
                    }}
                    className="w-full mt-2 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    View Eradication Dossier & Countdown
                  </button>
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
              
              {(selectedFeature.layerId === 'camera-layer' || selectedFeature.layerId === 'camera-fov-layer' || selectedFeature.layerId === 'historical-camera-layer' || selectedFeature.layerId === 'historical-camera-fov-layer' || selectedFeature.layerId === 'community-reports-point' || selectedFeature.properties.vendor || ['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type)) && (
                <SurveillancePopupCard properties={selectedFeature.properties} onOpenLiveFeed={(props) => handleOpenLiveFeed(props)} />
              )}

              {['weather_station', 'data_center', 'radar'].includes(selectedFeature.properties.type) && (
                <div className="space-y-1 mt-2">
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  {selectedFeature.properties.tier && <p><strong>Reliability Tier:</strong> <span className="text-cyan-400 font-bold">{selectedFeature.properties.tier}</span></p>}
                  {selectedFeature.properties.capacityMw && <p><strong>Power Capacity:</strong> <span className="text-amber-400 font-bold">{selectedFeature.properties.capacityMw} MW</span></p>}
                  {selectedFeature.properties.hub && <p><strong>Metro Hub:</strong> {selectedFeature.properties.hub}</p>}
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
                  {(() => {
                    const pinRep = threatRadarSummary.reports.find(r => r.pinId === selectedFeature.properties.id);
                    if (!pinRep) return null;
                    if (pinRep.overallStatus === 'clear') {
                      return (
                        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                          <span>🛡️ Perimeter Buffer Clear</span>
                          <span className="text-[9px] text-gray-400">0 Threats &lt;35 mi</span>
                        </div>
                      );
                    }
                    return (
                      <div className="p-2 rounded bg-red-950/40 border border-red-700/60 space-y-1.5 font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-red-300 flex items-center gap-1">
                            ⚠️ {pinRep.threats.length} Active Threat{pinRep.threats.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-bold bg-red-900/60 text-red-200">
                            {pinRep.overallStatus}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-tight truncate">
                          {pinRep.threats[0]?.title} ({pinRep.threats[0]?.distanceMiles} mi)
                        </p>
                        <button
                          onClick={() => {
                            setSelectedRadarPinId(pinRep.pinId);
                            setIsPinThreatRadarOpen(true);
                          }}
                          className="w-full py-1 rounded bg-red-900/70 hover:bg-red-800 text-red-100 border border-red-500/60 text-[10px] font-bold tracking-wide transition-colors"
                        >
                          🚨 Mitigation Action Checklist
                        </button>
                      </div>
                    );
                  })()}
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

              {(selectedFeature.properties.type === 'piste' || selectedFeature.layerId?.startsWith('resort-piste')) && (
                <div className="space-y-1 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-gray-900">{selectedFeature.properties.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold text-white shadow-sm ${
                      selectedFeature.properties.difficulty === 'easy' ? 'bg-emerald-600' :
                      selectedFeature.properties.difficulty === 'intermediate' ? 'bg-blue-600' :
                      selectedFeature.properties.difficulty === 'advanced' ? 'bg-slate-950 border border-slate-300 text-slate-100' :
                      selectedFeature.properties.difficulty === 'expert' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {selectedFeature.properties.difficulty_label || 
                       (selectedFeature.properties.difficulty === 'easy' ? '🟢 Green (Beginner)' :
                        selectedFeature.properties.difficulty === 'intermediate' ? '🟦 Blue (Intermediate)' :
                        selectedFeature.properties.difficulty === 'advanced' ? '◆ Black Diamond (Advanced)' :
                        selectedFeature.properties.difficulty === 'expert' ? '◆◆ Double Black (Expert)' :
                        selectedFeature.properties.difficulty || 'Run')}
                    </span>
                  </div>
                  <p><strong>Resort:</strong> {selectedFeature.properties.resort || 'Alpine Resort'}</p>
                  {selectedFeature.properties.gladed && <p><strong>Terrain:</strong> 🌲 Gladed / Off-Piste Trees</p>}
                  {selectedFeature.properties.grooming && <p><strong>Grooming:</strong> {selectedFeature.properties.grooming}</p>}
                </div>
              )}

              {(selectedFeature.properties.type === 'lift' || selectedFeature.layerId?.startsWith('resort-lift')) && (
                <div className="space-y-1 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-amber-600">🚡 {selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold bg-amber-500 text-black">
                      {selectedFeature.properties.aerialway || 'Lift'}
                    </span>
                  </div>
                  <p><strong>Resort:</strong> {selectedFeature.properties.resort || 'Alpine Resort'}</p>
                  {selectedFeature.properties.duration && <p><strong>Ride Time:</strong> {selectedFeature.properties.duration}</p>}
                  {selectedFeature.properties.vertical && <p><strong>Vertical Rise:</strong> {selectedFeature.properties.vertical}</p>}
                </div>
              )}

              {/* Critical Infrastructure Overlays Detail Popups */}
              {(selectedFeature.layerId === 'power-lines-core' || selectedFeature.properties.type === 'power_line') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-yellow-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-900 font-bold border border-yellow-300">
                      {selectedFeature.properties.voltageKv}kV {selectedFeature.properties.circuitType}
                    </span>
                  </div>
                  <p><strong>Grid Interconnection:</strong> {selectedFeature.properties.gridInterconnection}</p>
                  <p><strong>Operating Utility:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Conductor Spec:</strong> {selectedFeature.properties.conductorType}</p>
                  <p><strong>Key Substations:</strong> <span className="text-gray-700">{selectedFeature.properties.substationsSummary}</span></p>
                  <p><strong>Operational Status:</strong> <span className="text-emerald-700 font-bold">{selectedFeature.properties.status}</span></p>
                </div>
              )}

              {(selectedFeature.layerId === 'utility-companies-point' || selectedFeature.properties.type === 'utility_company') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-gray-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                      {selectedFeature.properties.facilityType}
                    </span>
                  </div>
                  <p><strong>Sector:</strong> {selectedFeature.properties.utilitySector}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  {selectedFeature.properties.capacityMw > 0 && <p><strong>Capacity:</strong> {selectedFeature.properties.capacityMw.toLocaleString()} MW</p>}
                  <p><strong>Service Area:</strong> {selectedFeature.properties.serviceArea}</p>
                  <p><strong>Emergency Contact:</strong> <span className="text-red-700 font-semibold">{selectedFeature.properties.emergencyContact}</span></p>
                  <p><strong>Regulatory Body:</strong> {selectedFeature.properties.regulatoryJurisdiction}</p>

                  {/* Power Generation Specs */}
                  {selectedFeature.properties.powerGenDetails && (
                    <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-200 text-[11px] space-y-1">
                      <p className="font-bold text-amber-900 border-b border-amber-200 pb-0.5">⚡ Generation Engineering Specs</p>
                      <p><strong>Fuel / Energy:</strong> {selectedFeature.properties.powerGenDetails.fuelType}</p>
                      {selectedFeature.properties.powerGenDetails.reactorCount && (
                        <p><strong>Nuclear Fleet:</strong> {selectedFeature.properties.powerGenDetails.reactorCount}x Reactors ({selectedFeature.properties.powerGenDetails.reactorType})</p>
                      )}
                      {selectedFeature.properties.powerGenDetails.containmentType && (
                        <p><strong>Containment:</strong> {selectedFeature.properties.powerGenDetails.containmentType}</p>
                      )}
                      {selectedFeature.properties.powerGenDetails.turbineCount && (
                        <p><strong>Turbines / Windmills:</strong> {selectedFeature.properties.powerGenDetails.turbineCount}x {selectedFeature.properties.powerGenDetails.turbineModel || 'Turbine Units'}</p>
                      )}
                      {selectedFeature.properties.powerGenDetails.batteryMwh && (
                        <p><strong>BESS Storage:</strong> {selectedFeature.properties.powerGenDetails.batteryMwh.toLocaleString()} MWh Capacity</p>
                      )}
                      {selectedFeature.properties.powerGenDetails.coolingSource && (
                        <p><strong>Cooling Source:</strong> {selectedFeature.properties.powerGenDetails.coolingSource}</p>
                      )}
                    </div>
                  )}

                  {/* Water Treatment & Chemical Additives */}
                  {selectedFeature.properties.waterTreatmentDetails && (
                    <div className="mt-2 p-2 rounded bg-cyan-50 border border-cyan-200 text-[11px] space-y-1.5">
                      <p className="font-bold text-cyan-950 border-b border-cyan-200 pb-0.5">💧 Water Treatment & Chemical Additives Disclosures</p>
                      <p><strong>Raw Water:</strong> {selectedFeature.properties.waterTreatmentDetails.rawWaterSource}</p>
                      <p><strong>Daily Output:</strong> {selectedFeature.properties.waterTreatmentDetails.dailyCapacityMGD} Million Gallons / Day (MGD)</p>
                      <p><strong>Technology:</strong> {selectedFeature.properties.waterTreatmentDetails.treatmentTechnology}</p>
                      {Array.isArray(selectedFeature.properties.waterTreatmentDetails.chemicalAdditives) && (
                        <div className="mt-1.5 space-y-1">
                          <p className="font-semibold text-cyan-900 text-[10px]">🧪 Chemical Additives Injected into Drinking Water:</p>
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {selectedFeature.properties.waterTreatmentDetails.chemicalAdditives.map((chem: any, ci: number) => (
                              <div key={ci} className="p-1 rounded bg-white border border-cyan-100 text-[10px] leading-tight">
                                <div className="flex justify-between items-center font-bold text-cyan-950">
                                  <span>{chem.name}</span>
                                  <span className="text-cyan-700 bg-cyan-100/70 px-1 rounded">{chem.targetDosePpm}</span>
                                </div>
                                <p className="text-gray-600 mt-0.5"><strong>Purpose:</strong> {chem.purpose}</p>
                                <p className="text-amber-800"><strong>Concerns:</strong> {chem.healthConcerns}</p>
                                <p className="text-emerald-800"><strong>Removal:</strong> {chem.removalMethod}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {(selectedFeature.layerId === 'fiber-cables-core' || selectedFeature.properties.type === 'fiber_cable') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-purple-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold border border-purple-300">
                      {selectedFeature.properties.capacityTbps} Tbps
                    </span>
                  </div>
                  <p><strong>Category:</strong> {selectedFeature.properties.cableCategory}</p>
                  <p><strong>Network Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Conduit:</strong> {selectedFeature.properties.conduitType}</p>
                  <p><strong>Fiber Pairs:</strong> {selectedFeature.properties.fiberPairs} Pairs</p>
                  <p><strong>Latency Tier:</strong> <span className="text-purple-700 font-bold">{selectedFeature.properties.latencyTier}</span></p>
                  <p><strong>Interconnect Hubs:</strong> <span className="text-gray-700">{selectedFeature.properties.connectingHubsSummary}</span></p>
                </div>
              )}

              {(selectedFeature.layerId === 'hospitals-point' || selectedFeature.properties.type === 'hospital') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-red-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
                      {selectedFeature.properties.traumaLevel}
                    </span>
                  </div>
                  <p><strong>System:</strong> {selectedFeature.properties.networkSystem}</p>
                  <p><strong>Acute Beds:</strong> {selectedFeature.properties.acuteBeds} | <strong>ICU:</strong> {selectedFeature.properties.icuBeds}</p>
                  <p><strong>Heliport:</strong> {selectedFeature.properties.hasHelipad ? "✅ FAA ID: " + selectedFeature.properties.heliportFaaId : "None"}</p>
                  <p><strong>Emergency:</strong> {selectedFeature.properties.emergencyServices24_7 ? "24/7 Trauma Service" : "Standard Emergency"}</p>
                  <p><strong>Address:</strong> {selectedFeature.properties.address}</p>
                  <p><strong>Direct Emergency Phone:</strong> <span className="text-red-700 font-bold">{selectedFeature.properties.phone}</span></p>
                </div>
              )}

              {(selectedFeature.layerId === 'urgent-care-point' || selectedFeature.properties.type === 'urgent_care') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-teal-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-bold border border-teal-300">
                      {selectedFeature.properties.category}
                    </span>
                  </div>
                  <p><strong>Provider:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Walk-In:</strong> {selectedFeature.properties.walkInAccepted ? "✅ Accepted (No appointment needed)" : "Appointment Required"}</p>
                  <p><strong>Typical Triage Wait:</strong> <span className="text-teal-700 font-bold">{selectedFeature.properties.typicalWaitMinutes} minutes</span></p>
                  <p><strong>Hours:</strong> {selectedFeature.properties.hoursOfOperation}</p>
                  <p><strong>Address:</strong> {selectedFeature.properties.address}</p>
                  <p><strong>Phone:</strong> {selectedFeature.properties.phone}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'military-bunkers-point' || selectedFeature.properties.type === 'military_bunker') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-pink-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-pink-100 text-pink-900 font-bold border border-pink-300">
                      {selectedFeature.properties.status}
                    </span>
                  </div>
                  {selectedFeature.properties.codeName && <p><strong>Code Name:</strong> <span className="text-pink-700 font-bold">{selectedFeature.properties.codeName}</span></p>}
                  <p><strong>Classification:</strong> {selectedFeature.properties.facilityType}</p>
                  <p><strong>Command/Agency:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Subterranean Depth:</strong> <span className="text-pink-800 font-bold">{selectedFeature.properties.depthFeet} ft</span> below granite/bedrock</p>
                  <p><strong>Blast Hardening:</strong> <span className="text-purple-800 font-bold">{selectedFeature.properties.blastOverpressurePsi} PSI Overpressure</span></p>
                  <p><strong>EMP Shielding:</strong> {selectedFeature.properties.empHardeningDb} dB attenuation</p>
                  <p><strong>Capacity / Autonomy:</strong> {selectedFeature.properties.personnelCapacity} personnel • {selectedFeature.properties.autonomyDurationDays} days isolated</p>
                  {selectedFeature.properties.blastDoorTons > 0 && <p><strong>Blast Doors:</strong> {selectedFeature.properties.blastDoorTons}-ton reinforced steel</p>}
                  <p><strong>Location:</strong> {selectedFeature.properties.locationDescription}, {selectedFeature.properties.country}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'citizen-bunkers-point' || selectedFeature.properties.type === 'citizen_bunker') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-emerald-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                      {selectedFeature.properties.accessProtocol}
                    </span>
                  </div>
                  <p><strong>Category:</strong> {selectedFeature.properties.bunkerCategory}</p>
                  <p><strong>Managing Body:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Civilian Capacity:</strong> <span className="text-emerald-700 font-bold">{selectedFeature.properties.capacityPeople} people</span></p>
                  <p><strong>Autonomy:</strong> {selectedFeature.properties.autonomyDurationMonths} months off-grid ({selectedFeature.properties.annualEmergencyFoodReserveYears} yr food reserve)</p>
                  <p><strong>CBRN / NBC Filtration:</strong> {selectedFeature.properties.cbrnFiltration ? "✅ Active Positive Overpressure" : "Standard Circulation"}</p>
                  <p className="text-[11px] text-gray-600">{selectedFeature.properties.filtrationDetails}</p>
                  <p><strong>Location:</strong> {selectedFeature.properties.cityState}, {selectedFeature.properties.country}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'bomb-storage-depots-point' || selectedFeature.properties.type === 'bomb_storage_depot') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-amber-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                      {selectedFeature.properties.securityTier}
                    </span>
                  </div>
                  <p><strong>Category:</strong> {selectedFeature.properties.depotCategory}</p>
                  <p><strong>Branch/Agency:</strong> {selectedFeature.properties.branchOrAgency}</p>
                  <p><strong>Facility Size:</strong> <span className="text-amber-800 font-bold">{selectedFeature.properties.landAreaAcres?.toLocaleString()} acres</span> • {selectedFeature.properties.storageBunkersCount} storage igloos/magazines</p>
                  <p><strong>Logistics:</strong> {selectedFeature.properties.railConnected ? "🚂 Rail Connected" : ""} {selectedFeature.properties.airliftCapable ? "✈️ Heavy Airlift" : ""}</p>
                  <p><strong>Munitions Stored:</strong> <span className="text-gray-700">{selectedFeature.properties.primaryMunitions}</span></p>
                  <p><strong>Location:</strong> {selectedFeature.properties.cityState}, {selectedFeature.properties.country}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'military-bases-point' || selectedFeature.properties.type === 'military_base') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-blue-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold border border-blue-300">
                      {selectedFeature.properties.branch}
                    </span>
                  </div>
                  <p><strong>Installation Type:</strong> {selectedFeature.properties.baseType}</p>
                  <p><strong>Host Wing / Command:</strong> <span className="text-blue-800 font-bold">{selectedFeature.properties.headquartersOrHostWing}</span></p>
                  <p><strong>Active Duty Troops:</strong> <span className="text-indigo-700 font-bold">{selectedFeature.properties.personnelActiveDuty?.toLocaleString()}</span> (Civilian: {selectedFeature.properties.civilianPersonnel?.toLocaleString()})</p>
                  <p><strong>Land Area:</strong> {selectedFeature.properties.landAreaAcres?.toLocaleString()} acres</p>
                  {selectedFeature.properties.icaoCode && <p><strong>ICAO:</strong> {selectedFeature.properties.icaoCode}</p>}
                  <p><strong>Location:</strong> {selectedFeature.properties.locationString}, {selectedFeature.properties.country}</p>
                  <p className="text-[11px] text-gray-600"><strong>Mission:</strong> {selectedFeature.properties.primaryMission}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'dams-point' || selectedFeature.properties.type === 'dam') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-sky-900">{selectedFeature.properties.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${selectedFeature.properties.hazardClassification === 'High Hazard Potential' ? 'bg-red-100 text-red-900 border-red-300' : 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                      {selectedFeature.properties.hazardClassification?.replace(' Potential', '')}
                    </span>
                  </div>
                  <p><strong>River System:</strong> {selectedFeature.properties.riverSystem} ({selectedFeature.properties.drainageBasin})</p>
                  <p><strong>Engineering:</strong> {selectedFeature.properties.damType} • {selectedFeature.properties.structuralHeightFt} ft high</p>
                  <p><strong>Reservoir Storage:</strong> <span className="text-sky-800 font-bold">{selectedFeature.properties.reservoirCapacityAcreFeet?.toLocaleString()} acre-feet</span></p>
                  <p><strong>Breach Peak Flow:</strong> <span className="text-red-700 font-bold">{selectedFeature.properties.breachPeakDischargeCfs?.toLocaleString()} CFS</span></p>
                  <p><strong>Managing Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Location:</strong> Near {selectedFeature.properties.nearestCity}, {selectedFeature.properties.state}</p>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      data-testid={`popup-toggle-dam-breach-${selectedFeature.properties.id}`}
                      onClick={() => {
                        const id = selectedFeature.properties.id;
                        setSelectedDamIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-colors ${selectedDamIds.includes(selectedFeature.properties.id) ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-cyan-600 text-white hover:bg-cyan-500'}`}
                    >
                      {selectedDamIds.includes(selectedFeature.properties.id) ? '🚨 Breach Simulated (Click to Cancel)' : '🌊 Simulate Breach Inundation'}
                    </button>
                    <button
                      type="button"
                      data-testid="popup-open-flood-modal"
                      onClick={() => setIsFloodModalOpen(true)}
                      className="py-1.5 px-2.5 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      title="Open Flood Simulator"
                    >
                      ⚙️ Simulator
                    </button>
                  </div>
                </div>
              )}

              {(selectedFeature.layerId === 'dam-inundation-fill' || selectedFeature.properties.type === 'dam_inundation_zone') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-cyan-900">{selectedFeature.properties.damName} Inundation Zone</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-100 text-cyan-900 font-bold border border-cyan-300 uppercase">
                      {selectedFeature.properties.severity}
                    </span>
                  </div>
                  <p><strong>River Basin:</strong> {selectedFeature.properties.riverSystem} • {selectedFeature.properties.drainageBasin}</p>
                  <p><strong>Surge Water Released:</strong> <span className="text-cyan-800 font-bold">{selectedFeature.properties.releasedAcreFeet?.toLocaleString()} acre-feet</span></p>
                  <p><strong>Downstream Peak Flow:</strong> <span className="text-red-700 font-bold">{selectedFeature.properties.peakDischargeCfs?.toLocaleString()} CFS</span></p>
                  <button
                    type="button"
                    onClick={() => setIsFloodModalOpen(true)}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 text-center transition-colors"
                  >
                    Open Flood Simulator Dashboard
                  </button>
                </div>
              )}

              {(selectedFeature.layerId === 'fema-flood-zones-fill' || selectedFeature.properties.type === 'fema_flood_zone') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-sky-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-bold border border-sky-300">
                      FEMA FLOODPLAIN
                    </span>
                  </div>
                  <p><strong>Classification:</strong> {selectedFeature.properties.zoneType}</p>
                  <p><strong>Drainage Basin:</strong> {selectedFeature.properties.basinName}, {selectedFeature.properties.state}</p>
                  <p><strong>Base Flood Elevation (BFE):</strong> <span className="text-sky-800 font-bold">{selectedFeature.properties.baseFloodElevationFt} ft NAVD88</span></p>
                </div>
              )}

              {(selectedFeature.layerId === 'medicinal-flora-point' || selectedFeature.properties.primaryPhytochemicalClass) && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-emerald-500/30">
                    <div>
                      <span className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                        <span>{selectedFeature.properties.icon}</span>
                        <span>{selectedFeature.properties.name}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 italic block">{selectedFeature.properties.scientificName} ({selectedFeature.properties.family})</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-600">
                      {selectedFeature.properties.categoryLabel}
                    </span>
                  </div>

                  <p><strong>Habitat:</strong> <span className="text-gray-300">{selectedFeature.properties.locationName}</span></p>
                  <p><strong>Primary Phytochemicals:</strong> <span className="text-emerald-400 font-semibold">{selectedFeature.properties.keyCompounds}</span></p>
                  <p><strong>Organ Affinity:</strong> <span className="text-cyan-300">{selectedFeature.properties.organAffinity}</span></p>
                  <p><strong>Naturopathic Role:</strong> <span className="text-gray-200">{selectedFeature.properties.primaryTherapeuticUses}</span></p>
                  
                  <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 text-[10px] text-amber-200">
                    <strong className="block text-amber-300">Homeopathic Keynote ({selectedFeature.properties.homeopathicRemedy}):</strong>
                    {selectedFeature.properties.homeopathicKeynote}
                    <span className="block mt-0.5 text-gray-400 font-mono">Potencies: {selectedFeature.properties.homeopathicPotencies}</span>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[10px] text-gray-400">
                    <span>Harvest: {selectedFeature.properties.floweringHarvestWindow}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFloraId(selectedFeature.properties.id);
                        setIsFloraModalOpen(true);
                        setSelectedFeature(null);
                      }}
                      className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors shadow-sm"
                    >
                      Full Monograph & Dossier
                    </button>
                  </div>
                </div>
              )}

              {(selectedFeature.layerId === 'farms-ranches-point' || selectedFeature.properties.type === 'farm_ranch') && (
                <div className="space-y-2 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-amber-500/40">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{selectedFeature.properties.icon || '🚜'}</span>
                      <span className="font-bold text-sm text-amber-300">{selectedFeature.properties.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-200 font-bold border border-amber-600">
                      {selectedFeature.properties.acreageFormatted || selectedFeature.properties.acreageLabel || 'Commercial Operation'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-black/50 text-amber-400 border border-amber-800/80 font-bold">
                      {selectedFeature.properties.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/50 text-cyan-300 border border-cyan-800/80">
                      {selectedFeature.properties.farmingPractice}
                    </span>
                  </div>

                  {/* Grows / Raises / Sells Detailed Inventory Breakdown */}
                  <div className="p-2 rounded-lg bg-black/60 border border-amber-900/60 space-y-1.5 text-[11px]">
                    {selectedFeature.properties.grows && (
                      <p className="leading-snug">
                        <strong className="text-emerald-400">🌱 Grows / Forage:</strong>{" "}
                        <span className="text-gray-200">{selectedFeature.properties.grows}</span>
                      </p>
                    )}
                    {selectedFeature.properties.raises && (
                      <p className="leading-snug">
                        <strong className="text-amber-400">🐂 Raises / Livestock / Bees:</strong>{" "}
                        <span className="text-gray-200">{selectedFeature.properties.raises}</span>
                      </p>
                    )}
                    {selectedFeature.properties.sells && (
                      <p className="leading-snug">
                        <strong className="text-sky-400">🏷️ Sells & Direct Supply:</strong>{" "}
                        <span className="text-amber-200 font-semibold">{selectedFeature.properties.sells}</span>
                      </p>
                    )}
                    {!selectedFeature.properties.grows && selectedFeature.properties.primaryOutput && (
                      <p className="leading-snug">
                        <strong className="text-emerald-400">📦 Primary Output:</strong>{" "}
                        <span className="text-gray-200">{selectedFeature.properties.primaryOutput}</span>
                      </p>
                    )}
                  </div>

                  {/* Operational Details */}
                  <div className="space-y-1 text-[11px] text-gray-300">
                    <p><strong>Region / Location:</strong> {selectedFeature.properties.region || selectedFeature.properties.stateOrCountry}</p>
                    <p><strong>Water Rights / Source:</strong> <span className="text-cyan-300">{selectedFeature.properties.waterSource || selectedFeature.properties.waterRightsSource}</span></p>
                    {selectedFeature.properties.livestockCapacity && (
                      <p><strong>Capacity / Colonies:</strong> <span className="text-amber-200 font-bold">{selectedFeature.properties.livestockCapacity}</span></p>
                    )}
                    {selectedFeature.properties.operatorOrHeritage && (
                      <p><strong>Operator / Heritage:</strong> <span className="text-gray-400">{selectedFeature.properties.operatorOrHeritage}</span></p>
                    )}
                    {selectedFeature.properties.visitationOrTours && (
                      <p className="text-[10px] text-emerald-400/90"><strong>Access & Tours:</strong> {selectedFeature.properties.visitationOrTours}</p>
                    )}
                  </div>

                  {/* Highlights / Features */}
                  <div className="p-2 rounded bg-amber-950/30 border border-amber-800/40 text-[11px] text-gray-300 leading-relaxed">
                    {selectedFeature.properties.notableFeatures || selectedFeature.properties.notes}
                  </div>

                  {/* Website & Direct Contact Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pt-1.5 border-t border-gray-800 text-[10px]">
                    <div className="flex items-center gap-2">
                      {selectedFeature.properties.website && (
                        <a
                          href={selectedFeature.properties.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <span>🌐 Official Website</span>
                          <span>↗</span>
                        </a>
                      )}
                      {selectedFeature.properties.phoneOrContact && (
                        <span className="text-gray-400 font-mono">{selectedFeature.properties.phoneOrContact}</span>
                      )}
                    </div>
                    <span className="text-amber-400 font-bold">
                      {selectedFeature.properties.foodResilienceRating?.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              )}

              {(selectedFeature.layerId === 'topographic-peaks-point' || selectedFeature.properties.type === 'topographic_peak') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-emerald-950">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                      {selectedFeature.properties.elevationFt?.toLocaleString()} FT
                    </span>
                  </div>
                  <p><strong>Mountain Range:</strong> {selectedFeature.properties.mountainRange}</p>
                  <p><strong>Elevation:</strong> <span className="text-emerald-800 font-bold">{selectedFeature.properties.elevationFt?.toLocaleString()} ft ({selectedFeature.properties.elevationM?.toLocaleString()} m)</span></p>
                  <p><strong>Prominence:</strong> {selectedFeature.properties.prominenceFt?.toLocaleString()} ft • {selectedFeature.properties.peakType}</p>
                  <p><strong>Geology:</strong> {selectedFeature.properties.tectonicOrigin}</p>
                  <p className="text-red-700 font-semibold">⚠️ <strong>Hazards:</strong> {selectedFeature.properties.notableHazard}</p>
                  <button
                    type="button"
                    onClick={() => setIsTopoModalOpen(true)}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-600 text-center transition-colors"
                  >
                    Open Topography & Elevation Controller
                  </button>
                </div>
              )}
              

              {(selectedFeature.layerId === 'curated-lakes-point' || selectedFeature.layerId === 'curated-lakes-label' || selectedFeature.layerId === 'lake-feature' || selectedFeature.properties.category === 'lake') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="font-bold text-sm text-gray-900">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold border border-blue-300">
                      WATER BODY
                    </span>
                  </div>
                  {selectedFeature.properties.elevation && <p><strong>Elevation:</strong> {selectedFeature.properties.elevation}</p>}
                  {selectedFeature.properties.surface_area && <p><strong>Surface Area:</strong> {selectedFeature.properties.surface_area}</p>}
                  {selectedFeature.properties.depth && <p><strong>Max Depth:</strong> {selectedFeature.properties.depth}</p>}
                  {selectedFeature.properties.subtitle && <p className="text-gray-600 text-[11px] pt-1">{selectedFeature.properties.subtitle}</p>}
                  {selectedFeature.properties.description && !selectedFeature.properties.subtitle && <p className="text-gray-600 text-[11px] pt-1">{selectedFeature.properties.description}</p>}
                </div>
              )}

              {(selectedFeature.layerId === 'fuel-pipelines-line' || selectedFeature.properties.type === 'pipeline') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-amber-500/40">
                    <span className="font-bold text-sm text-amber-300">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-200 font-bold border border-amber-600">
                      {selectedFeature.properties.capacityBpd?.toLocaleString()} BPD
                    </span>
                  </div>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Length:</strong> {selectedFeature.properties.lengthMiles?.toLocaleString()} Miles</p>
                  {selectedFeature.properties.suppliesPctEastCoast > 0 && (
                    <p className="text-amber-300 font-bold">⛽ Supplies {selectedFeature.properties.suppliesPctEastCoast}% of East Coast Fuel</p>
                  )}
                  <p><strong>Products:</strong> <span className="text-gray-300">{selectedFeature.properties.primaryProducts}</span></p>
                  {selectedFeature.properties.criticalHubs && (
                    <p className="text-slate-300 text-[11px]"><strong>Hubs:</strong> {selectedFeature.properties.criticalHubs}</p>
                  )}
                </div>
              )}

              {(selectedFeature.layerId === 'water-aqueducts-line' || selectedFeature.properties.type === 'aqueduct') && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-cyan-500/40">
                    <span className="font-bold text-sm text-cyan-300">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 font-bold border border-cyan-600">
                      {selectedFeature.properties.designFlowCfs?.toLocaleString()} CFS
                    </span>
                  </div>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Length:</strong> {selectedFeature.properties.lengthMiles?.toLocaleString()} Miles</p>
                  <p><strong>Population Served:</strong> {selectedFeature.properties.suppliesPopulation?.toLocaleString()} people</p>
                  <p className="text-cyan-200 text-[11px]"><strong>Key Engineering Node:</strong> {selectedFeature.properties.criticalEngineeringNode}</p>
                  <p className="text-red-400 font-semibold text-[11px]">⚠️ <strong>Seismic Risk:</strong> {selectedFeature.properties.earthquakeVulnerability}</p>
                </div>
              )}

              {(selectedFeature.layerId === 'strategic-facilities-point' || selectedFeature.properties.facilityType) && (
                <div className="space-y-1.5 mt-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-purple-500/40">
                    <span className="font-bold text-sm text-purple-300">{selectedFeature.properties.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-200 font-bold border border-purple-600">
                      {selectedFeature.properties.category}
                    </span>
                  </div>
                  {selectedFeature.properties.operator && <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>}
                  {selectedFeature.properties.location && <p><strong>Location:</strong> {selectedFeature.properties.location}</p>}
                  {selectedFeature.properties.cityState && <p><strong>Location:</strong> {selectedFeature.properties.cityState}</p>}
                  {selectedFeature.properties.capacityBarrels && (
                    <p className="text-amber-300 font-bold">🛢️ Capacity: {selectedFeature.properties.capacityBarrels?.toLocaleString()} Barrels (Drawdown: {selectedFeature.properties.drawdownRateBpd?.toLocaleString()} BPD)</p>
                  )}
                  {selectedFeature.properties.crudeCapacityBpd && (
                    <p className="text-amber-300 font-bold">🏭 Capacity: {selectedFeature.properties.crudeCapacityBpd?.toLocaleString()} BPD (Complexity Index: {selectedFeature.properties.complexityIndex})</p>
                  )}
                  {selectedFeature.properties.metricTonsUranium && (
                    <p className="text-purple-300 font-bold">☢️ Casks: {selectedFeature.properties.canisterCount} ({selectedFeature.properties.metricTonsUranium} MT Uranium) • System: {selectedFeature.properties.caskSystem}</p>
                  )}
                  {selectedFeature.properties.radarType && (
                    <p className="text-pink-300 font-bold">📡 Radar: {selectedFeature.properties.radarType} ({selectedFeature.properties.rangeMiles} Miles Range)</p>
                  )}
                  {selectedFeature.properties.primaryMission && <p className="text-gray-300 text-[11px]"><strong>Mission:</strong> {selectedFeature.properties.primaryMission}</p>}
                  {selectedFeature.properties.primaryOutputs && <p className="text-gray-300 text-[11px]"><strong>Outputs:</strong> {selectedFeature.properties.primaryOutputs}</p>}
                  {selectedFeature.properties.empHardening && <p className="text-emerald-400 font-semibold text-[11px]">🛡️ <strong>EMP Hardening:</strong> {selectedFeature.properties.empHardening}</p>}
                  {selectedFeature.properties.seismicHazardPeakGroundAccel && (
                    <p className="text-red-400 text-[11px]">⚠️ <strong>Seismic PGA:</strong> {selectedFeature.properties.seismicHazardPeakGroundAccel} • Tsunami: {selectedFeature.properties.tsunamiFloodRisk}</p>
                  )}
                </div>
              )}
            </div>
            </DraggablePopupWrapper>
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
                <DraggablePopupWrapper
                  resetKey={selectedCrimeIncident.id}
                  handleLabel="DRAG INCIDENT"
                  hasCloseButton={true}
                >
                  <div className="bg-black/95 text-white p-3 rounded-lg border border-red-500/80 w-full max-w-[min(380px,calc(100vw-32px))] max-h-[min(540px,calc(100vh-130px))] overflow-y-auto pr-1 custom-scrollbar font-mono text-xs shadow-2xl">
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
              </DraggablePopupWrapper>
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
                <DraggablePopupWrapper
                  resetKey={selectedCrimeNeighborhood.name}
                  handleLabel="DRAG SECTOR"
                  hasCloseButton={true}
                >
                  <div className="bg-black/95 text-white p-3.5 rounded-lg border border-cyan-500/80 w-full max-w-[min(440px,calc(100vw-32px))] max-h-[min(560px,calc(100vh-130px))] overflow-y-auto pr-1 custom-scrollbar font-mono text-xs shadow-2xl">
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
              </DraggablePopupWrapper>
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
            onFocusPistes={(resort) => {
              if (mapRef.current) {
                mapRef.current.flyTo({
                  center: [Number(resort.lng), Number(resort.lat)],
                  zoom: 14.5,
                  pitch: 50,
                  bearing: mapRef.current.getBearing() || 0,
                  duration: 1500
                });
              }
              if (!settings.layers.snowboard_trails) {
                toggleLayer('snowboard_trails');
              }
              ResortPisteEngine.fetchPistesForResort(Number(resort.lat), Number(resort.lng), resort.name);
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
          onSelectSite={(site) => setSelectedToxicSite(site)}
          selectedSiteId={selectedToxicSite?.site_id}
        />

        {/* Built-in MapLibre Navigation Control (Zoom + Interactive Compass Heading Needle) */}
        <NavigationControl position="top-right" style={{ marginTop: 75, marginRight: 14 }} showCompass={true} showZoom={true} visualizePitch={true} />
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
          style={{
            left: `${currentLegendPos.x}px`,
            top: `${currentLegendPos.y}px`,
            width: `${legendSize.width}px`,
            height: isLegendCustomHeight
              ? `${Math.min(legendSize.height, Math.max(180, windowDimensions.height - currentLegendPos.y - 64))}px`
              : `${Math.max(180, windowDimensions.height - currentLegendPos.y - 64)}px`,
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: `calc(100vh - ${currentLegendPos.y + 64}px)`,
            minWidth: '260px',
            minHeight: '180px'
          }}
          className={`fixed z-20 bg-black/90 border border-cyan-900/70 p-3 sm:p-4 rounded-xl text-white font-mono shadow-[0_0_25px_rgba(8,145,178,0.25)] backdrop-blur-md overflow-hidden flex flex-col pointer-events-auto transition-[box-shadow] duration-200 ${isDraggingLegend ? 'ring-2 ring-cyan-400/60 shadow-[0_0_35px_rgba(8,145,178,0.5)]' : ''}`}
        >
        <div 
          onMouseDown={handleLegendDragStart}
          onTouchStart={handleLegendTouchStart}
          className={`flex justify-between items-center mb-2.5 pb-2 border-b border-cyan-900/60 shrink-0 cursor-grab active:cursor-grabbing select-none ${isDraggingLegend ? 'cursor-grabbing' : ''}`}
          title="Drag header to move panel anywhere on screen"
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-600 hover:text-cyan-400 cursor-grab select-none tracking-tighter text-sm font-bold" title="Drag to move panel">⠿</span>
            <span className="text-cyan-400 font-bold text-xs tracking-wider">DATA POINTS</span>
            <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">
              {Object.values(settings.layers).filter(Boolean).length} Active
            </span>
          </div>

          
          <div className="flex items-center gap-1.5">
            {legendPos && (
              <button 
                type="button"
                onClick={() => { setLegendPos(null); setIsLegendCustomHeight(false); }}
                className="text-[10px] text-gray-400 hover:text-cyan-300 transition-colors bg-cyan-950/40 hover:bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-900/60 whitespace-nowrap"
                title="Reset Data Points position to default"
              >
                RESET
              </button>
            )}
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

        {/* Scope Selector: WORLD vs COUNTRY */}
        <div className="flex flex-col gap-1.5 px-0.5 pb-2 border-b border-cyan-900/60 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">DATABASE TOTAL:</span>
            <div className="flex items-center bg-cyan-950/70 p-0.5 rounded border border-cyan-800/60">
              <button
                type="button"
                data-testid="scope-toggle-world"
                onClick={() => setCountScopeMode('world')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all flex items-center gap-1 ${
                  countScopeMode === 'world'
                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'text-gray-400 hover:text-cyan-200'
                }`}
                title="Show total across entire world database"
              >
                🌍 WORLD
              </button>
              <button
                type="button"
                data-testid="scope-toggle-country"
                onClick={() => setCountScopeMode('country')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all flex items-center gap-1 ${
                  countScopeMode === 'country'
                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'text-gray-400 hover:text-cyan-200'
                }`}
                title="Show total scoped to country in current map view"
              >
                🏳️ COUNTRY
              </button>
            </div>
          </div>

          {countScopeMode === 'country' && (
            <div className="flex items-center justify-between gap-1.5 pt-0.5 text-xs">
              <span className="text-[10px] text-cyan-300 font-mono shrink-0">
                {visibleCountries.length > 1 ? `${visibleCountries.length} Countries Visible:` : 'Country in View:'}
              </span>
              {visibleCountries.length > 1 ? (
                <select
                  data-testid="scope-country-select"
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="bg-black/90 border border-cyan-700/80 text-cyan-200 text-[10px] font-mono rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-400 max-w-[150px] truncate"
                  title="Select which visible country to show totals for"
                >
                  {visibleCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-[10px] font-bold text-cyan-300 font-mono flex items-center gap-1 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {visibleCountries[0]?.flag || '🇺🇸'} {visibleCountries[0]?.name || 'United States'}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 mt-2 text-sm overflow-y-auto pr-1.5 custom-scrollbar flex-1">

            <div title={DATA_POINTS_TOOLTIPS['custom_pins']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.custom_pins ? 'opacity-50' : ''}`} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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
              {renderLayerBadge(visibleCounts.custom_pins, 'custom_pins', 'text-purple-400')}
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

            <div title={DATA_POINTS_TOOLTIPS['aircraft']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.aircraft ? 'opacity-50' : ''}`} onClick={() => toggleLayer('aircraft')} onMouseEnter={() => setHoveredLegendLayer('aircraft')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.aircraft ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.aircraft ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-cyan-400 shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aircraft</span>}
              </span>
              {renderLayerBadge(visibleCounts.aircraft, 'aircraft', 'text-cyan-400')}
            </div>
            
            <div title={DATA_POINTS_TOOLTIPS['cell_towers']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.cell_towers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('cell_towers')} onMouseEnter={() => setHoveredLegendLayer('cell_towers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.cell_towers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.cell_towers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-fuchsia-500 font-bold text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cell Towers</span>}
              </span>
              {renderLayerBadge(visibleCounts.cellTowers, 'cellTowers', 'text-fuchsia-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['springs']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.springs ? 'opacity-50' : ''}`} onClick={() => toggleLayer('springs')} onMouseEnter={() => setHoveredLegendLayer('springs')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.springs ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.springs ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-500 font-bold text-xl leading-none shrink-0 w-4 text-center">♦</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Springs</span>}
              </span>
              {renderLayerBadge(visibleCounts.springs, 'springs', 'text-blue-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['power']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.power ? 'opacity-50' : ''}`} onClick={() => toggleLayer('power')} onMouseEnter={() => setHoveredLegendLayer('power')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.power ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.power ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-500 text-xl leading-none shrink-0 w-4 text-center">■</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Power Grid</span>}
              </span>
              {renderLayerBadge(visibleCounts.power, 'power', 'text-yellow-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['aviation']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.aviation ? 'opacity-50' : ''}`} onClick={() => toggleLayer('aviation')} onMouseEnter={() => setHoveredLegendLayer('aviation')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.aviation ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.aviation ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aviation/Helipads</span>}
              </span>
              {renderLayerBadge(visibleCounts.aviation, 'aviation', 'text-red-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['emergency']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.emergency ? 'opacity-50' : ''}`} onClick={() => toggleLayer('emergency')} onMouseEnter={() => setHoveredLegendLayer('emergency')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.emergency ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.emergency ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-500 font-bold text-xl leading-none shrink-0 w-4 text-center">+</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Emergency</span>}
              </span>
              {renderLayerBadge(visibleCounts.emergency, 'emergency', 'text-emerald-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['cameras']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.cameras ? 'opacity-50' : ''}`} onClick={() => toggleLayer('cameras')} onMouseEnter={() => setHoveredLegendLayer('cameras')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.cameras ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.cameras ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 text-lg leading-none shrink-0 w-4 text-center">📷</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cameras / ALPR</span>}
              </span>
              {renderLayerBadge(visibleCounts.cameras, 'cameras', 'text-gray-300')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['historical_cameras']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.historical_cameras ? 'opacity-50' : ''}`} onClick={() => toggleLayer('historical_cameras')} onMouseEnter={() => setHoveredLegendLayer('historical_cameras')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.historical_cameras ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.historical_cameras ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-slate-400 text-lg leading-none shrink-0 w-4 text-center">⏳</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Historical / Removed Surveillance</span>}
              </span>
              {renderLayerBadge(visibleCounts.historical_cameras, 'historical_cameras', 'text-slate-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['community_reports']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.community_reports ? 'opacity-50' : ''}`} onClick={() => toggleLayer('community_reports')} onMouseEnter={() => setHoveredLegendLayer('community_reports')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.community_reports ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.community_reports ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 text-lg leading-none shrink-0 w-4 text-center">👥</span>
                {!isLegendCollapsed && (
                  <span className="whitespace-nowrap flex items-center gap-1.5">
                    <span>Community Reports</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded border border-emerald-500/40 font-mono">3-VOUCH</span>
                  </span>
                )}
              </span>
              {renderLayerBadge(visibleCounts.community_reports, 'community_reports', 'text-emerald-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['weather_stations']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_stations ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_stations')} onMouseEnter={() => setHoveredLegendLayer('weather_stations')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.weather_stations ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_stations ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-sky-300 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Weather Stations</span>}
              </span>
              {renderLayerBadge(visibleCounts.weather_stations, 'weather_stations', 'text-sky-300')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['data_centers']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.data_centers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('data_centers')} onMouseEnter={() => setHoveredLegendLayer('data_centers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.data_centers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.data_centers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-sm shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Data Centers</span>}
              </span>
              {renderLayerBadge(visibleCounts.data_centers, 'data_centers', 'text-purple-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['radars']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.radars ? 'opacity-50' : ''}`} onClick={() => toggleLayer('radars')} onMouseEnter={() => setHoveredLegendLayer('radars')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.radars ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.radars ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-rose-500 font-bold text-xl leading-none shrink-0 w-4 text-center">◎</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Radar / Arrays</span>}
              </span>
              {renderLayerBadge(visibleCounts.radars, 'radars', 'text-rose-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['public_lands']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.public_lands ? 'opacity-50' : ''}`} onClick={() => toggleLayer('public_lands')} onMouseEnter={() => setHoveredLegendLayer('public_lands')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.public_lands ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.public_lands ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-green-500/50 border border-green-800 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Public Lands</span>}
              </span>
              {renderLayerBadge(visibleCounts.public_lands, 'public_lands', 'text-green-500')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['campsites']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.campsites ? 'opacity-50' : ''}`} onClick={() => toggleLayer('campsites')} onMouseEnter={() => setHoveredLegendLayer('campsites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.campsites ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.campsites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-lg leading-none shrink-0 w-4 text-center">◮</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Campsites</span>}
              </span>
              {renderLayerBadge(visibleCounts.campsites, 'campsites', 'text-orange-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['trails']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.trails ? 'opacity-50' : ''}`} onClick={() => toggleLayer('trails')} onMouseEnter={() => setHoveredLegendLayer('trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.trails ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-amber-600 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Trails/Paths</span>}
              </span>
              {renderLayerBadge(visibleCounts.trails, 'trails', 'text-amber-500')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['snowboard_trails']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.snowboard_trails ? 'opacity-50' : ''}`} onClick={() => toggleLayer('snowboard_trails')} onMouseEnter={() => setHoveredLegendLayer('snowboard_trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.snowboard_trails ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.snowboard_trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 text-sm leading-none shrink-0 w-4 text-center">🏂</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Snowboard & Ski Resorts</span>}
              </span>
              {renderLayerBadge(visibleCounts.snowboard_resorts, 'snowboard_resorts', 'text-cyan-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['disasters']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.disasters ? 'opacity-50' : ''}`} onClick={() => toggleLayer('disasters')} onMouseEnter={() => setHoveredLegendLayer('disasters')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.disasters ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.disasters ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Disasters / Events</span>}
              </span>
              {renderLayerBadge(visibleCounts.disasters, 'disasters', 'text-red-500')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['crime_live']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.crime_live ? 'opacity-50' : ''}`} onClick={() => toggleLayer('crime_live')} onMouseEnter={() => setHoveredLegendLayer('crime_live')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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
              {renderLayerBadge(activeCityCrime?.totalIncidents || visibleCounts.crime_live, 'crime_live', 'text-red-400', 'sidebar-count-crime')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['crime_heatmap']} 
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

            <div title={DATA_POINTS_TOOLTIPS['earthquakes']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.earthquakes ? 'opacity-50' : ''}`} onClick={() => toggleLayer('earthquakes')} onMouseEnter={() => setHoveredLegendLayer('earthquakes')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.earthquakes ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.earthquakes ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Earthquakes</span>}
              </span>
              {renderLayerBadge(visibleCounts.earthquakes, 'earthquakes', 'text-orange-500')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['submarine_cables']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.submarine_cables ? 'opacity-50' : ''}`} onClick={() => toggleLayer('submarine_cables')} onMouseEnter={() => setHoveredLegendLayer('submarine_cables')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.submarine_cables ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.submarine_cables ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-cyan-300 shrink-0 shadow-[0_0_8px_#22d3ee]"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Subsea Cables</span>}
              </span>
              {renderLayerBadge(visibleCounts.submarine_cables, 'submarine_cables', 'text-cyan-300')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['wildfires']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.wildfires ? 'opacity-50' : ''}`} onClick={() => toggleLayer('wildfires')} onMouseEnter={() => setHoveredLegendLayer('wildfires')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.wildfires ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.wildfires ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-sm leading-none shrink-0 w-4 text-center">🔥</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Wildfires (FIRMS)</span>}
              </span>
              {renderLayerBadge(visibleCounts.wildfires, 'wildfires', 'text-orange-400', 'sidebar-count-wildfires')}
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

            <div title={DATA_POINTS_TOOLTIPS['fire_spread_forecast']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.fire_spread_forecast ? 'opacity-50' : ''}`} onClick={() => toggleLayer('fire_spread_forecast')} onMouseEnter={() => setHoveredLegendLayer('fire_spread_forecast')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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
              {renderLayerBadge(visibleCounts.fire_spread_forecast, 'fire_spread_forecast', 'text-red-400', 'sidebar-count-fire-spread')}
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

            <div title={DATA_POINTS_TOOLTIPS['vessels']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.vessels ? 'opacity-50' : ''}`} onClick={() => toggleLayer('vessels')} onMouseEnter={() => setHoveredLegendLayer('vessels')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.vessels ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.vessels ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🚢</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Vessels (AIS)</span>}
              </span>
              {renderLayerBadge(visibleCounts.vessels, 'vessels', 'text-sky-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['atlas_obscura']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.atlas_obscura ? 'opacity-50' : ''}`} onClick={() => toggleLayer('atlas_obscura')} onMouseEnter={() => setHoveredLegendLayer('atlas_obscura')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.atlas_obscura ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.atlas_obscura ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-purple-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🏛️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Atlas Obscura</span>}
              </span>
              {renderLayerBadge(visibleCounts.atlas_obscura, 'atlas_obscura', 'text-purple-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['wind_hud']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.wind_hud ? 'opacity-50' : ''}`} onClick={() => toggleLayer('wind_hud')} onMouseEnter={() => setHoveredLegendLayer('wind_hud')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-wind-hud-layer" className={settings.layers.wind_hud ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.wind_hud ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-400 font-bold text-sm leading-none shrink-0 w-4 text-center">💨</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Live Wind HUD</span>}
              </span>
              <span data-testid="sidebar-count-wind-hud" className="text-sky-300 font-bold ml-2 text-xs font-mono">{currentWeatherVector.windSpeedKnots}kt</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['weather_radar']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_radar ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_radar')} onMouseEnter={() => setHoveredLegendLayer('weather_radar')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.weather_radar ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_radar ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🌧️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Weather Radar</span>}
              </span>
              <span className="text-blue-400 font-bold ml-2">{settings.layers.weather_radar ? 'ON' : 'OFF'}</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['weather_clouds']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_clouds ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_clouds')} onMouseEnter={() => setHoveredLegendLayer('weather_clouds')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" className={settings.layers.weather_clouds ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_clouds ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-300 font-bold text-sm leading-none shrink-0 w-4 text-center">☁️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cloud Coverage (IR)</span>}
              </span>
              <span className="text-sky-300 font-bold ml-2">{settings.layers.weather_clouds ? 'ON' : 'OFF'}</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['weather_pressure']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_pressure ? 'opacity-50' : ''}`} onClick={() => toggleLayer('weather_pressure')} onMouseEnter={() => setHoveredLegendLayer('weather_pressure')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" className={settings.layers.weather_pressure ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.weather_pressure ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🧭</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Barometer & Isobars</span>}
              </span>
              <span className="text-cyan-300 font-bold ml-2">{settings.layers.weather_pressure ? 'ON' : 'OFF'}</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['atmospheric_radar']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.atmospheric_radar ? 'opacity-50' : ''}`} onClick={() => toggleLayer('atmospheric_radar')} onMouseEnter={() => setHoveredLegendLayer('atmospheric_radar')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" className={settings.layers.atmospheric_radar ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.atmospheric_radar ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-pink-400 font-bold text-sm leading-none shrink-0 w-4 text-center">⚛️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Atmospheric / HAARP Radar</span>}
              </span>
              <span className="text-pink-300 font-bold ml-2">{settings.layers.atmospheric_radar ? 'ON' : 'OFF'}</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['lightning']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.lightning ? 'opacity-50' : ''}`} onClick={() => toggleLayer('lightning')} onMouseEnter={() => setHoveredLegendLayer('lightning')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.lightning ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.lightning ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-400 font-bold text-sm leading-none shrink-0 w-4 text-center">⚡</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Lightning Strikes</span>}
              </span>
              {renderLayerBadge(visibleCounts.lightning, 'lightning', 'text-yellow-400')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['satellite']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.satellite ? 'opacity-70' : ''}`} onClick={() => toggleLayer('satellite')} onMouseEnter={() => setHoveredLegendLayer('satellite')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['labels']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.labels ? 'opacity-70' : ''}`} onClick={() => toggleLayer('labels')} onMouseEnter={() => setHoveredLegendLayer('labels')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['boundaries']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.boundaries ? 'opacity-70' : ''}`} onClick={() => toggleLayer('boundaries')} onMouseEnter={() => setHoveredLegendLayer('boundaries')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['road_closures']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.road_closures ? 'opacity-70' : ''}`} onClick={() => toggleLayer('road_closures')} onMouseEnter={() => setHoveredLegendLayer('road_closures')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-road-closures-layer" className={settings.layers.road_closures ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.road_closures ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🚧</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Road Closures (3D AR)</span>}
              </span>
              {renderLayerBadge(visibleCounts.road_closures, 'road_closures', 'text-orange-400', 'sidebar-count-road-closures')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['weather_ar']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.weather_ar ? 'opacity-70' : ''}`} onClick={() => toggleLayer('weather_ar')} onMouseEnter={() => setHoveredLegendLayer('weather_ar')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['solar_terminator']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.solar_terminator ? 'opacity-70' : ''}`} onClick={() => toggleLayer('solar_terminator')} onMouseEnter={() => setHoveredLegendLayer('solar_terminator')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-solar-terminator-layer" className={settings.layers.solar_terminator ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.solar_terminator ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-300 font-bold text-sm leading-none shrink-0 w-4 text-center">☀️🌙</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Sun, Moon & Day/Night Shadow</span>}
              </span>
              <span className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.solar_terminator ? 'text-amber-300 bg-amber-950 border-amber-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.solar_terminator ? 'LIVE' : 'OFF'}
              </span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['drone_docks']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.drone_docks ? 'opacity-70' : ''}`} onClick={() => toggleLayer('drone_docks')} onMouseEnter={() => setHoveredLegendLayer('drone_docks')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-drone-docks-layer" className={settings.layers.drone_docks ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.drone_docks ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🛸</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Drone Docks (10 NB + Global)</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2 text-xs">20</span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['blind_spots']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.blind_spots ? 'opacity-70' : ''}`} onClick={() => toggleLayer('blind_spots')} onMouseEnter={() => setHoveredLegendLayer('blind_spots')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['land_ownership']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.land_ownership ? 'opacity-70' : ''}`} onClick={() => toggleLayer('land_ownership')} onMouseEnter={() => setHoveredLegendLayer('land_ownership')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['zero_blind_spot_hud']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.zero_blind_spot_hud ? 'opacity-70' : ''}`} onClick={() => toggleLayer('zero_blind_spot_hud')} onMouseEnter={() => setHoveredLegendLayer('zero_blind_spot_hud')} onMouseLeave={() => setHoveredLegendLayer(null)}>
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

            <div title={DATA_POINTS_TOOLTIPS['toxic_sites']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.toxic_sites ? 'opacity-70' : ''}`} onClick={() => toggleLayer('toxic_sites')} onMouseEnter={() => setHoveredLegendLayer('toxic_sites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-toxic-sites-layer" className={settings.layers.toxic_sites ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.toxic_sites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 font-bold text-sm leading-none shrink-0 w-4 text-center">☣️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Toxic Sites & Plumes (EPA)</span>}
              </span>
              {renderLayerBadge(visibleCounts.toxic_sites, 'toxic_sites', 'text-red-400', 'sidebar-count-toxic-sites')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['chemical_spraying']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.chemical_spraying ? 'opacity-70' : ''}`} onClick={() => toggleLayer('chemical_spraying')} onMouseEnter={() => setHoveredLegendLayer('chemical_spraying')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-chemical-spraying-layer" className={settings.layers.chemical_spraying ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.chemical_spraying ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-sm leading-none shrink-0 w-4 text-center">🧪</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Chemical Spraying & Toxins</span>}
              </span>
              <span data-testid="sidebar-count-chemical-spraying" className={`font-bold ml-2 text-[10px] px-1.5 py-0.5 rounded border ${settings.layers.chemical_spraying ? 'text-emerald-300 bg-emerald-950 border-emerald-800' : 'text-gray-500 bg-black/40 border-gray-800'}`}>
                {settings.layers.chemical_spraying ? 'TRACK' : 'OFF'}
              </span>
            </div>

            {/* Critical Infrastructure Overlays */}
            <div title={DATA_POINTS_TOOLTIPS['power_lines']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.power_lines ? 'opacity-50' : ''}`} onClick={() => toggleLayer('power_lines')} onMouseEnter={() => setHoveredLegendLayer('power_lines')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-power-lines-layer" className={settings.layers.power_lines ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.power_lines ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-400 font-bold text-base leading-none shrink-0 w-4 text-center">⚡</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Power Lines & Corridors</span>}
              </span>
              {renderLayerBadge(visibleCounts.power_lines, 'power_lines', 'text-yellow-400', 'sidebar-count-power-lines')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['utility_companies']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.utility_companies ? 'opacity-50' : ''}`} onClick={() => toggleLayer('utility_companies')} onMouseEnter={() => setHoveredLegendLayer('utility_companies')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-utility-companies-layer" className={settings.layers.utility_companies ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.utility_companies ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 font-bold text-base leading-none shrink-0 w-4 text-center">🏢</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Utility Companies & Plants</span>}
              </span>
              {renderLayerBadge(visibleCounts.utility_companies, 'utility_companies', 'text-amber-400', 'sidebar-count-utility-companies')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['fiber_cables']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.fiber_cables ? 'opacity-50' : ''}`} onClick={() => toggleLayer('fiber_cables')} onMouseEnter={() => setHoveredLegendLayer('fiber_cables')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-fiber-cables-layer" className={settings.layers.fiber_cables ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.fiber_cables ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-purple-400 font-bold text-base leading-none shrink-0 w-4 text-center">🌐</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Fiberoptic & Data Cables</span>}
              </span>
              {renderLayerBadge(visibleCounts.fiber_cables, 'fiber_cables', 'text-purple-400', 'sidebar-count-fiber-cables')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['hospitals']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.hospitals ? 'opacity-50' : ''}`} onClick={() => toggleLayer('hospitals')} onMouseEnter={() => setHoveredLegendLayer('hospitals')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-hospitals-layer" className={settings.layers.hospitals ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.hospitals ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 font-bold text-base leading-none shrink-0 w-4 text-center">🏥</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Hospitals & Trauma Centers</span>}
              </span>
              {renderLayerBadge(visibleCounts.hospitals, 'hospitals', 'text-red-400', 'sidebar-count-hospitals')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['urgent_care']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.urgent_care ? 'opacity-50' : ''}`} onClick={() => toggleLayer('urgent_care')} onMouseEnter={() => setHoveredLegendLayer('urgent_care')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-urgent-care-layer" className={settings.layers.urgent_care ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.urgent_care ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-teal-400 font-bold text-base leading-none shrink-0 w-4 text-center">🩺</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Urgent Care & Emergency Bases</span>}
              </span>
              {renderLayerBadge(visibleCounts.urgent_care, 'urgent_care', 'text-teal-400', 'sidebar-count-urgent-care')}
            </div>

            {/* Defense & Survival Infrastructure Overlays */}
            <div title={DATA_POINTS_TOOLTIPS['military_bunkers']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.military_bunkers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('military_bunkers')} onMouseEnter={() => setHoveredLegendLayer('military_bunkers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-military-bunkers-layer" className={settings.layers.military_bunkers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.military_bunkers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-pink-400 font-bold text-base leading-none shrink-0 w-4 text-center">🛡️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Military Bunkers & CoG</span>}
              </span>
              {renderLayerBadge(visibleCounts.military_bunkers, 'military_bunkers', 'text-pink-400', 'sidebar-count-military-bunkers')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['citizen_bunkers']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.citizen_bunkers ? 'opacity-50' : ''}`} onClick={() => toggleLayer('citizen_bunkers')} onMouseEnter={() => setHoveredLegendLayer('citizen_bunkers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-citizen-bunkers-layer" className={settings.layers.citizen_bunkers ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.citizen_bunkers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-base leading-none shrink-0 w-4 text-center">🟢</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Citizen Fallout Shelters</span>}
              </span>
              {renderLayerBadge(visibleCounts.citizen_bunkers, 'citizen_bunkers', 'text-emerald-400', 'sidebar-count-citizen-bunkers')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['bomb_storage_depots']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.bomb_storage_depots ? 'opacity-50' : ''}`} onClick={() => toggleLayer('bomb_storage_depots')} onMouseEnter={() => setHoveredLegendLayer('bomb_storage_depots')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-bomb-storage-depots-layer" className={settings.layers.bomb_storage_depots ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.bomb_storage_depots ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 font-bold text-base leading-none shrink-0 w-4 text-center">💣</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Bomb & Munitions Depots</span>}
              </span>
              {renderLayerBadge(visibleCounts.bomb_storage_depots, 'bomb_storage_depots', 'text-amber-400', 'sidebar-count-bomb-storage-depots')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['military_bases']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.military_bases ? 'opacity-50' : ''}`} onClick={() => toggleLayer('military_bases')} onMouseEnter={() => setHoveredLegendLayer('military_bases')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-military-bases-layer" className={settings.layers.military_bases ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.military_bases ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-400 font-bold text-base leading-none shrink-0 w-4 text-center">⚔️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Military Bases & Commands</span>}
              </span>
              {renderLayerBadge(visibleCounts.military_bases, 'military_bases', 'text-blue-400', 'sidebar-count-military-bases')}
            </div>

            {/* Flood & Dam Infrastructure Overlays */}
            <div title={DATA_POINTS_TOOLTIPS['dams']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.dams ? 'opacity-50' : ''}`} onClick={() => toggleLayer('dams')} onMouseEnter={() => setHoveredLegendLayer('dams')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-dams-layer" className={settings.layers.dams ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.dams ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-sky-400 font-bold text-base leading-none shrink-0 w-4 text-center">🏛️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Dams & Reservoirs</span>}
              </span>
              {renderLayerBadge(visibleCounts.dams, 'dams', 'text-sky-400', 'sidebar-count-dams')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['dam_inundation']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.dam_inundation ? 'opacity-50' : ''}`} onClick={() => toggleLayer('dam_inundation')} onMouseEnter={() => setHoveredLegendLayer('dam_inundation')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-dam-inundation-layer" className={settings.layers.dam_inundation ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.dam_inundation ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-base leading-none shrink-0 w-4 text-center">🌊</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Dam Inundation Zones</span>}
              </span>
              {renderLayerBadge(visibleCounts.dam_inundation, 'dam_inundation', 'text-cyan-400', 'sidebar-count-dam-inundation')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['flood_zones']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.flood_zones ? 'opacity-50' : ''}`} onClick={() => toggleLayer('flood_zones')} onMouseEnter={() => setHoveredLegendLayer('flood_zones')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-flood-zones-layer" className={settings.layers.flood_zones ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.flood_zones ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-400 font-bold text-base leading-none shrink-0 w-4 text-center">🗺️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">FEMA Floodplains</span>}
              </span>
              {renderLayerBadge(visibleCounts.flood_zones, 'flood_zones', 'text-blue-400', 'sidebar-count-flood-zones')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['elevation_topography']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.elevation_topography ? 'opacity-50' : ''}`} onClick={() => toggleLayer('elevation_topography')} onMouseEnter={() => setHoveredLegendLayer('elevation_topography')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-elevation-topography-layer" className={settings.layers.elevation_topography ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.elevation_topography ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-base leading-none shrink-0 w-4 text-center">🏔️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Topography & Elevation Heatmap</span>}
              </span>
              <span data-testid="sidebar-count-elevation-topography">
                {renderLayerBadge(visibleCounts.elevation_topography, 'elevation_topography', 'text-emerald-400', 'sidebar-count-elevation-topography')}
              </span>
            </div>

            <div title={DATA_POINTS_TOOLTIPS['medicinal_flora']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.medicinal_flora ? 'opacity-50' : ''}`} onClick={() => toggleLayer('medicinal_flora')} onMouseEnter={() => setHoveredLegendLayer('medicinal_flora')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-medicinal-flora-layer" className={settings.layers.medicinal_flora ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.medicinal_flora ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-400 font-bold text-base leading-none shrink-0 w-4 text-center">🌿</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Medicinal Flora & Herbs</span>}
              </span>
              {renderLayerBadge(visibleCounts.medicinal_flora, 'medicinal_flora', 'text-emerald-400', 'sidebar-count-medicinal-flora')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['farms_ranches']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.farms_ranches ? 'opacity-50' : ''}`} onClick={() => toggleLayer('farms_ranches')} onMouseEnter={() => setHoveredLegendLayer('farms_ranches')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-farms-ranches-layer" className={settings.layers.farms_ranches ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.farms_ranches ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-amber-400 font-bold text-base leading-none shrink-0 w-4 text-center">🚜</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Farms & Ranches</span>}
              </span>
              {renderLayerBadge(visibleCounts.farms_ranches, 'farms_ranches', 'text-amber-400', 'sidebar-count-farms-ranches')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['fuel_pipelines']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.fuel_pipelines ? 'opacity-50' : ''}`} onClick={() => toggleLayer('fuel_pipelines')} onMouseEnter={() => setHoveredLegendLayer('fuel_pipelines')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-fuel-pipelines-layer" className={settings.layers.fuel_pipelines ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.fuel_pipelines ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-400 font-bold text-base leading-none shrink-0 w-4 text-center">⛽</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Fuel Pipelines</span>}
              </span>
              {renderLayerBadge(visibleCounts.fuel_pipelines, 'fuel_pipelines', 'text-yellow-400', 'sidebar-count-fuel-pipelines')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['water_aqueducts']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.water_aqueducts ? 'opacity-50' : ''}`} onClick={() => toggleLayer('water_aqueducts')} onMouseEnter={() => setHoveredLegendLayer('water_aqueducts')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-water-aqueducts-layer" className={settings.layers.water_aqueducts ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.water_aqueducts ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-cyan-400 font-bold text-base leading-none shrink-0 w-4 text-center">💧</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Major Aqueducts</span>}
              </span>
              {renderLayerBadge(visibleCounts.water_aqueducts, 'water_aqueducts', 'text-cyan-400', 'sidebar-count-water-aqueducts')}
            </div>

            <div title={DATA_POINTS_TOOLTIPS['strategic_facilities']} className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.strategic_facilities ? 'opacity-50' : ''}`} onClick={() => toggleLayer('strategic_facilities')} onMouseEnter={() => setHoveredLegendLayer('strategic_facilities')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button type="button" data-testid="toggle-strategic-facilities-layer" className={settings.layers.strategic_facilities ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.strategic_facilities ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-purple-400 font-bold text-base leading-none shrink-0 w-4 text-center">🛡️</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Strategic Energy & Radars</span>}
              </span>
              {renderLayerBadge(visibleCounts.strategic_facilities, 'strategic_facilities', 'text-purple-400', 'sidebar-count-strategic-facilities')}
            </div>
        </div>

        {/* Tactile Resizing Grip */}
        <div
          data-testid="legend-resize-handle"
          onMouseDown={handleLegendResizeStart}
          onTouchStart={handleLegendTouchResizeStart}
          className="absolute bottom-1 right-1.5 w-4 h-4 cursor-nwse-resize flex items-end justify-end text-cyan-600 hover:text-cyan-300 transition-colors select-none p-0.5 z-30"
          title="Drag corner to resize Data Points panel"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="fill-current opacity-70 hover:opacity-100 pointer-events-none">
            <circle cx="8" cy="8" r="1.2" />
            <circle cx="4" cy="8" r="1.2" />
            <circle cx="8" cy="4" r="1.2" />
          </svg>
        </div>
      </div>
      )}
      
      {/* Standalone Elevation Heatmap Legend Widget */}
      {settings.layers.elevation_topography && (
        <div
          data-testid="elevation-heatmap-widget"
          style={{
            bottom: '64px',
            left: !isLegendCollapsed 
              ? `${Math.max(16, currentLegendPos.x + legendSize.width + 12)}px`
              : (windowDimensions.width < 640 ? '8px' : '16px'),
            right: windowDimensions.width < 640 ? '8px' : '16px'
          }}
          className="fixed z-20 bg-black/90 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-white font-mono shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md pointer-events-auto select-none transition-all duration-200 flex flex-col gap-1"
        >
          {/* Top Line: Title + Controls on left, Full-Width Gradient Ramp + Milestones on right */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-emerald-400 font-bold text-xs tracking-wider flex items-center gap-1">
                <span>🏔️</span>
                <span className="hidden sm:inline">ELEVATION HEATMAP</span>
                <span className="sm:hidden">ELEV</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-600/60 text-emerald-300 font-bold">ACTIVE</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsTopoModalOpen(true); }}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold transition-colors cursor-pointer"
                title="Configure elevation tile provider, opacity, and alpine peaks"
              >
                CONTROLLER
              </button>
            </div>

            {/* Visual Color Gradient Bar & Milestones */}
            <div className="flex-1 flex flex-col justify-center min-w-[140px]">
              <div className="h-2 rounded-full w-full border border-white/10" style={{
                background: 'linear-gradient(to right, #06b6d4 0%, #10b981 12%, #84cc16 22%, #eab308 34%, #f97316 46%, #ef4444 60%, #ec4899 74%, #a855f7 86%, #cbd5e1 93%, #ffffff 100%)'
              }} />
              <div className="flex justify-between text-[8px] text-slate-400 px-0.5 font-mono leading-none mt-0.5">
                <span>&lt;0&apos;</span>
                <span>2k&apos;</span>
                <span>4.5k&apos;</span>
                <span>8k&apos;</span>
                <span>13k&apos;</span>
                <span>19k&apos;</span>
                <span>24k&apos;</span>
                <span className="text-white font-bold">29k&apos;</span>
              </div>
            </div>
          </div>

          {/* Bottom Line: Sleek horizontal row of all 10 elevation category chips */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto text-[8px] sm:text-[9px] pt-1 border-t border-emerald-900/40 scrollbar-none whitespace-nowrap">
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#06b6d4' }} />
              <span className="text-slate-300">&lt;0&apos; Depression</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#10b981' }} />
              <span className="text-slate-300">0-500&apos; Lowlands</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#84cc16' }} />
              <span className="text-slate-300">500-2k&apos; Plains</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#eab308' }} />
              <span className="text-slate-300">2k-4.5k&apos; Foothills</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#f97316' }} />
              <span className="text-slate-300">4.5k-8k&apos; Plateau</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ef4444' }} />
              <span className="text-slate-300">8k-13k&apos; Montane</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec4899' }} />
              <span className="text-slate-300">13k-19k&apos; Alpine</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#a855f7' }} />
              <span className="text-slate-300">19k-24k&apos; Glacial</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#cbd5e1' }} />
              <span className="text-slate-300">24k-26k&apos; Himalayan</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 border border-slate-400" style={{ backgroundColor: '#ffffff' }} />
              <span className="text-white font-bold">29k&apos; Everest Peak</span>
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
        className="fixed z-30 flex flex-nowrap items-start justify-between gap-2 sm:gap-4 pointer-events-none transition-all duration-300 ease-in-out"
      >
        {/* Left C2 Group: Search bar positioned ABOVE Sphinx OS dropdown */}
        <div className="flex flex-col items-start gap-1.5 shrink-0 pointer-events-none">
          <div className="pointer-events-auto order-2 flex items-center gap-1.5 sm:gap-2 shrink-0 bg-black/85 border border-cyan-800/80 px-2 sm:px-2.5 py-1.5 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(8,145,178,0.3)]">
            <h1 className="text-xs sm:text-sm font-bold text-cyan-400 tracking-widest whitespace-nowrap">{headerTier === 'mobile' ? 'SPHINX' : 'SPHINX OS'}</h1>
          <button
            type="button"
            data-testid="hud-btn-tier-pill"
            onClick={() => {
              setTierUpgradeTrigger(null);
              setShowTierUpgrade(true);
            }}
            className={`relative group text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold border transition-all hover:scale-105 ${settings.tier === 'sovereign' ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : settings.tier === 'pro' ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-gray-300 border-gray-600 hover:text-white'}`}
            title="View Tier Entitlements & Live Simulator"
          >
            {(settings.tier || 'free').toUpperCase()}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">VIEW TIER ENTITLEMENTS</span>
          </button>
          <button 
            type="button"
            data-testid="hud-btn-toggle-legend"
            onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
            className="relative group text-cyan-400 hover:text-white transition-colors p-0.5 sm:p-1 text-xs sm:text-sm font-bold flex items-center gap-1"
            title={isLegendCollapsed ? "Open Tactical Layers Sidebar" : "Collapse Tactical Layers Sidebar"}
          >
            <span>{isLegendCollapsed ? '▶' : '▼'}</span>
            {(headerTier === 'full' || headerTier === 'standard') && (
              <span className="text-[11px] font-semibold text-cyan-300">
                DATA
              </span>
            )}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
              {isLegendCollapsed ? 'OPEN TACTICAL LAYERS' : 'COLLAPSE TACTICAL LAYERS'}
            </span>
          </button>
        </div>

        <div 
          className="pointer-events-auto order-1 w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 2xl:w-[420px] max-w-[calc(100vw-32px)] transition-all duration-200"
        >
          <GeocodingSearch 
            placeholder={headerTier === 'full' || headerTier === 'standard' ? "Search locations..." : "Search..."} 
            onLocationSelected={(loc) => {
              console.log('[SphinxMap] onLocationSelected:', loc);
              const targetZoom = loc.zoom || (loc.category === 'lake' ? 12 : loc.category === 'ski_resort' ? 13.5 : 14);
              if (mapRef.current) {
                mapRef.current.flyTo({ center: [loc.lon, loc.lat], zoom: targetZoom, duration: 2200 });
              }

              if (loc.category === 'ski_resort') {
                if (!settings.layers.snowboard_trails) {
                  updateSettings({ layers: { ...settings.layers, snowboard_trails: true } });
                }
                setShowCityCrimePanel(false);
                const resortData = loc.metadata?.resortData || {
                  id: `resort-${loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                  name: loc.name,
                  region: loc.state || 'Mountain Resort',
                  stateOrCountry: loc.country || loc.state || 'USA',
                  lat: loc.lat,
                  lng: loc.lon,
                  summitElevationFt: loc.metadata?.summitFt || loc.metadata?.elevationFt || 8000,
                  baseElevationFt: loc.metadata?.baseFt || 6000,
                  verticalDropFt: loc.metadata?.verticalDropFt || 2000,
                  runs: loc.metadata?.runs || 30,
                  lifts: loc.metadata?.lifts || 6,
                  terrainParks: 1,
                  hasHalfpipe: false,
                  nightRiding: false,
                  highlights: ['Alpine terrain', 'Ski & snowboard trails']
                };
                setSelectedSnowboardResort(resortData);
                setSelectedFeature(null);
                return;
              }

              if (loc.category === 'lake') {
                setShowCityCrimePanel(false);
                setSelectedSnowboardResort(null);
                setSelectedFeature({
                  properties: {
                    name: loc.name,
                    category: 'Water Body / Lake',
                    description: loc.context || 'Natural freshwater lake / reservoir',
                    elevation: loc.metadata?.elevationFt ? `${loc.metadata.elevationFt.toLocaleString()} ft` : undefined,
                    surface_area: loc.metadata?.surfaceAreaSqMi ? `${loc.metadata.surfaceAreaSqMi} sq mi` : undefined,
                    depth: loc.metadata?.depthFt ? `${loc.metadata.depthFt} ft` : undefined
                  },
                  layerId: 'lake-feature',
                  longitude: loc.lon,
                  latitude: loc.lat
                });
                return;
              }

              if (loc.category === 'mountain') {
                setShowCityCrimePanel(false);
                setSelectedSnowboardResort(null);
                setSelectedFeature({
                  properties: {
                    name: loc.name,
                    category: 'Mountain Peak',
                    description: loc.context,
                    elevation: loc.metadata?.elevationFt ? `${loc.metadata.elevationFt.toLocaleString()} ft` : undefined
                  },
                  layerId: 'mountain-feature',
                  longitude: loc.lon,
                  latitude: loc.lat
                });
                return;
              }

              const locationName = (loc.name && loc.name !== 'Unknown') ? loc.name : (loc.city || (loc.postcode ? `Area ${loc.postcode}` : 'Selected Area'));
              if (settings.layers.crime_live || showCityCrimePanel) {
                handleSelectCityCrime(locationName, loc.lat, loc.lon);
                setShowCityCrimePanel(true);
              }
            }} 
          />
        </div>
      </div>

      <div id="sphinx-hud-launcher" className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 shrink min-w-0 overflow-visible flex-nowrap py-0.5 justify-end z-20">
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
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">LAUNCH SPHINX AI INTELLIGENCE ASSISTANT</span>
          </button>

          {/* Threats Overview */}
          <button type="button" data-testid="hud-btn-threat-overview" onClick={() => handleJumpTo({ lat: 39.8283, lon: -98.5795, zoom: 4.2 })} className="relative group bg-black/85 px-2.5 py-1.5 rounded-lg border border-amber-600/80 shadow-[0_0_12px_rgba(245,158,11,0.35)] backdrop-blur-md hover:bg-amber-950/60 transition-colors font-mono text-amber-300 text-xs sm:text-sm flex items-center gap-1.5 shrink-0" title="Swoop to continental threats overview">
            <span>🛰️</span>
            {headerTier === 'full' && <span className="font-semibold">Threats ({visibleCounts.wildfires || 0})</span>}
            {(headerTier === 'standard' || headerTier === 'compact') && <span className="font-semibold">({visibleCounts.wildfires || 0})</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">ZOOM TO CONTINENTAL THREATS OVERVIEW</span>
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
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">REFRESH ALL LIVE SENSORS & SATELLITE DATA</span>
          </button>

          {/* 4. Weather & Wind */}
          <button 
            type="button"
            data-testid="hud-btn-wind-storms"
            onClick={() => { setShowAppleWeatherHud(!showAppleWeatherHud); if (!settings.layers.wind_hud) toggleLayer('wind_hud'); }}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              showAppleWeatherHud || settings.layers.wind_hud
                ? 'bg-sky-950/90 border-sky-400 text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                : 'bg-black/80 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900/60'
            }`}
            title={`Toggle Apple Weather & Barometer HUD: ${currentWeatherVector.windSpeedKnots}kt @ ${currentWeatherVector.windDirectionDeg}°`}
          >
            <span>💨</span>
            {(headerTier === 'full' || headerTier === 'standard') && <span className="font-semibold">Wind</span>}
            {headerTier === 'full' && <span className="text-[11px] text-cyan-300 font-mono">{currentWeatherVector.windSpeedKnots}kt</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-sky-300 border border-sky-500/70 shadow-[0_0_12px_rgba(14,165,233,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">OPEN APPLE WEATHER & BAROMETER TELEMETRY HUD</span>
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
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(8,145,178,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">OPEN ROUTE PLANNING & HAZARD-AVOIDANCE ENGINE</span>
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
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-purple-300 border border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">{isDroppingPin ? 'CANCEL TACTICAL PIN PLACEMENT' : 'DROP CUSTOM TACTICAL PIN ON MAP'}</span>
          </button>

          {/* Reference Materials / Constitution Direct HUD Button */}
          <button 
            type="button"
            data-testid="hud-btn-reference-materials"
            onClick={() => setShowFieldManuals(!showFieldManuals)}
            className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
              showFieldManuals 
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                : 'bg-black/80 border-emerald-950/80 text-emerald-400 hover:bg-emerald-950/40'
            }`}
            title="Reference Materials: Full US Constitution, Bill of Rights, Civil Preparedness Manual, Survival Hub, Food Calculator & Master Catalog"
          >
            <span>📚</span>
            {(headerTier === 'full' || headerTier === 'standard') && <span>Reference</span>}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-300 border border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">OPEN US CONSTITUTION, CIVIL PREPAREDNESS & MANUALS</span>
          </button>

          {/* 6. Tactical Tools Popover Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-testid="hud-btn-tools-menu"
              onClick={(e) => {
                e.stopPropagation();
                setShowToolsMenu(prev => !prev);
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              className={`relative group px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all font-mono text-xs sm:text-sm flex items-center gap-1.5 shrink-0 ${
                showToolsMenu || showSolarPanel || showFieldManuals || showRangeRings || showCelestialDome || showCityCrimePanel || settings.layers.fire_spread_forecast || settings.layers.crime_live || settings.layers.solar_terminator || isChemicalModalOpen
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-black/80 border-gray-800 text-gray-300 hover:text-white hover:bg-gray-900/60'
              }`}
              title="Tactical OSINT Tools & Ephemeris"
            >
              <span>🛠️</span>
              {headerTier !== 'mobile' && <span>Tools</span>}
              <ChevronDown size={14} className={`transition-transform duration-200 ${showToolsMenu ? 'rotate-180 text-cyan-400' : 'text-gray-400'}`} />
              <span className="pointer-events-none absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">OPEN TACTICAL OSINT TOOLS & SIMULATORS</span>
            </button>

            {showToolsMenu && (
              <div 
                style={{
                  maxHeight: `${Math.min(520, Math.max(260, windowDimensions.height - 90))}px`
                }}
                data-testid="hud-tools-dropdown"
                className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] bg-black/98 border border-cyan-500/80 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-2 z-[100] flex flex-col gap-1 font-mono text-xs overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-900/50 flex justify-between items-center mb-1">
                  <span>Tactical Systems</span>
                  <button onClick={() => setShowToolsMenu(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
                </div>
                <button 
                  type="button" 
                  data-testid="hud-btn-range-rings"
                  title="Distance range rings centered on active viewport (1km, 5km, 10km, 25km, 50km tactical radiuses)"
                  onClick={() => { setShowRangeRings(!showRangeRings); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showRangeRings ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🎯</span> Range Rings</span>
                  {showRangeRings && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-solar"
                  title="Solar ephemeris calculator showing live sun azimuth, elevation angle, golden hour, and twilight timings"
                  onClick={() => { setShowSolarPanel(!showSolarPanel); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showSolarPanel ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>☀️</span> Solar Ephemeris</span>
                  {showSolarPanel && <span className="text-[10px] text-amber-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-sky-dome"
                  title="3D celestial hemisphere dome projecting real-time planetary positions, stars, and lunar vectors"
                  onClick={() => { setShowCelestialDome(!showCelestialDome); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showCelestialDome ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🌌</span> Celestial Dome</span>
                  {showCelestialDome && <span className="text-[10px] text-indigo-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-sun-moon"
                  title="Live day/night terminator shadow curve with real-time subsolar and sublunar nadir tracking"
                  onClick={() => { toggleLayer('solar_terminator'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.solar_terminator ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>☀️🌙</span> Sun, Moon & Day/Night Shadow</span>
                  {settings.layers.solar_terminator && <span className="text-[10px] text-amber-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-live-camera-feeds"
                  title="Global live streaming camera feeds with tactical HUD overlay, public DOT cams, and custom stream ingestion"
                  onClick={() => { setIsCameraFeedModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isCameraFeedModalOpen ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🎥</span> Global Live Video Cams</span>
                  {isCameraFeedModalOpen && <span className="text-[10px] text-cyan-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-manuals"
                  title="Reference Materials & Survival Hub: Full US Constitution, Bill of Rights, Civil Preparedness Manual, TCCC Medicine, Food Calculator & 30-Tab Logistics Catalog"
                  onClick={() => { setShowFieldManuals(!showFieldManuals); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showFieldManuals ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-emerald-950/20 border border-emerald-900/50 hover:bg-emerald-900/30 text-emerald-300'}`}
                >
                  <span className="flex items-center gap-2"><span>📚</span> Reference Materials & Survival Hub</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{showFieldManuals ? 'ACTIVE' : 'CONSTITUTION & MANUALS'}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-weather-forecast"
                  title="Multi-horizon meteorological forecast with precipitation prob, barometric trend, and cloud cover"
                  onClick={() => { setShowWeatherWind(!showWeatherWind); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showWeatherWind ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>📊</span> Multi-Horizon Weather</span>
                  {showWeatherWind && <span className="text-[10px] text-sky-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-apple-weather"
                  title="Apple WeatherKit precision telemetry: local barometric pressure, dew point, wind vectors, and UV index"
                  onClick={() => { setShowAppleWeatherHud(!showAppleWeatherHud); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showAppleWeatherHud ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>📱</span> Apple Weather & Barometer</span>
                  {showAppleWeatherHud && <span className="text-[10px] text-sky-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-aviation-safety"
                  title="FAA/NTSB aviation incident analytics, terrain clearance risk, and near-surface flight hazards"
                  onClick={() => { setShowAviationSafety(!showAviationSafety); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showAviationSafety ? 'bg-sky-950/80 text-sky-300 border border-sky-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>✈️</span> Flight Safety & Risk</span>
                  {showAviationSafety && <span className="text-[10px] text-sky-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-crime"
                  title="City police dispatch 911 incident feed, localized crime classification, and neighborhood danger indexes"
                  onClick={() => { setShowCityCrimePanel(!showCityCrimePanel); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${showCityCrimePanel ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🚨</span> City Crime Intel</span>
                  {showCityCrimePanel && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-recon"
                  title="Submit tactical reconnaissance intelligence, surveillance reports, or verify field alerts"
                  onClick={() => { setShowCitizenRecon(true); setShowToolsMenu(false); }}
                  className="px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors hover:bg-amber-950/40 text-amber-300"
                >
                  <span className="flex items-center gap-2"><span>📡</span> Field Recon Report</span>
                  <span className="text-[10px] text-amber-500 font-bold">INTEL</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-zero-blind-spot"
                  title="Zero-Blind-Spot HUD overlay highlighting visual surveillance deadzones, camera blindspots, and radar gaps"
                  onClick={() => { toggleLayer('zero_blind_spot_hud'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.zero_blind_spot_hud ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🛡️</span> Zero-Blind-Spot HUD</span>
                  {settings.layers.zero_blind_spot_hud && <span className="text-[10px] text-purple-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-homebuyer-safety"
                  title="Homebuyer environmental due diligence audit for EPA Superfund sites, toxic plumes, and chemical hazard buffers"
                  onClick={() => { setIsHomebuyerModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isHomebuyerModalOpen ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-red-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>☣️</span> Homebuyer Toxic Plume Audit</span>
                  <span className="text-[10px] text-red-400 font-bold">DUE DILIGENCE</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-chemical-spraying"
                  title="Chemical Spraying & Eradication Tracker: Monitor aerial crop dusting, glyphosate treatments, and soil eradication"
                  onClick={() => { setIsChemicalModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isChemicalModalOpen || settings.layers.chemical_spraying ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'hover:bg-emerald-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🧪</span> Chemical Spraying & Eradication</span>
                  <span className="text-[10px] text-emerald-400 font-bold">TRACKER</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-flood-simulator"
                  title="Flood Maps & Dam Inundation Simulator: FEMA 100/500-yr flood zones and downstream hydrodynamic dam breach models"
                  onClick={() => { setIsFloodModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isFloodModalOpen || settings.layers.flood_zones || settings.layers.dam_inundation ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🌊</span> Flood Maps & Dam Inundation</span>
                  <span className="text-[10px] text-cyan-400 font-bold">SIMULATOR</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-medicinal-flora"
                  title="Native Flora & Naturopathy: Explore medicinal plants, trees, herbs, active phytochemicals, and homeopathic indications in viewport"
                  onClick={() => { setIsFloraModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isFloraModalOpen || settings.layers.medicinal_flora ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'hover:bg-emerald-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🌿</span> Native Flora & Naturopathy</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{settings.layers.medicinal_flora ? "ACTIVE" : "EXPLORE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-farms-ranches"
                  title="Farms, Ranches & Bee Apiaries Directory: Locate local agriculture, livestock ranches, honey farms, and inventories"
                  onClick={() => { toggleLayer('farms_ranches'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.farms_ranches ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'hover:bg-amber-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🚜</span> Farms & Ranches Directory</span>
                  <span className="text-[10px] text-amber-400 font-bold">{settings.layers.farms_ranches ? "ACTIVE" : "TOGGLE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-fuel-pipelines"
                  title="Continental Fuel Pipelines: Colonial and Plantation refined petroleum arteries supplying 45%+ of East Coast fuel"
                  onClick={() => { toggleLayer('fuel_pipelines'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.fuel_pipelines ? 'bg-yellow-950/80 text-yellow-300 border border-yellow-700/60' : 'hover:bg-yellow-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>⛽</span> Fuel Pipelines</span>
                  <span className="text-[10px] text-yellow-400 font-bold">{settings.layers.fuel_pipelines ? "ACTIVE" : "TOGGLE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-water-aqueducts"
                  title="Major Water Aqueducts: California Aqueduct, LA Aqueduct, Central Arizona Project, and All-American Canal"
                  onClick={() => { toggleLayer('water_aqueducts'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.water_aqueducts ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>💧</span> Major Aqueducts</span>
                  <span className="text-[10px] text-cyan-400 font-bold">{settings.layers.water_aqueducts ? "ACTIVE" : "TOGGLE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-strategic-facilities"
                  title="Strategic Energy & Radars: Strategic Petroleum Reserves, refineries, nuclear dry casks, and PAVE PAWS radars"
                  onClick={() => { toggleLayer('strategic_facilities'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.strategic_facilities ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'hover:bg-purple-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🛡️</span> Strategic Energy & Radars</span>
                  <span className="text-[10px] text-purple-400 font-bold">{settings.layers.strategic_facilities ? "ACTIVE" : "TOGGLE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-outage-cascade"
                  title="Critical Infrastructure Interdependency Graph & Outage Cascade Simulator: Model substation, power line & dam failure cascades"
                  onClick={() => { setIsCascadeModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isCascadeModalOpen ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'hover:bg-purple-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>⚡</span> Infrastructure Outage Simulator</span>
                  <span className="text-[10px] text-purple-400 font-bold">CASCADE</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-regular-topo"
                  title="Regular Topography: OpenTopoMap contour lines, elevation relief, trail systems, and physical terrain without the color heatmap"
                  onClick={() => {
                    const nextVal = !settings.layers.regular_topography;
                    updateSettings({ ...settings, layers: { ...settings.layers, regular_topography: nextVal } });
                    setShowToolsMenu(false);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.regular_topography ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'hover:bg-emerald-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🗺️</span> Regular Topography (Contours)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{settings.layers.regular_topography ? "ACTIVE" : "TOGGLE"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-topography-elevation"
                  title="Elevation Heatmap & Hypsometric Relief: Hypsometric color tinting up to 29k ft, USGS 3D terrain elevation, and alpine summits"
                  onClick={() => { setIsTopoModalOpen(true); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${isTopoModalOpen || settings.layers.elevation_topography ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'hover:bg-emerald-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🏔️</span> Elevation Heatmap & Controller</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{settings.layers.elevation_topography ? "ACTIVE" : "CONTROLLER"}</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-snowboard-trails"
                  title="Snowboard & Ski Resorts: Over 6,000 global alpine ski resorts with piste difficulty runs and ski lift cableways"
                  onClick={() => { toggleLayer('snowboard_trails'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.snowboard_trails ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'hover:bg-cyan-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🏂</span> Snowboard & Ski Resorts (6,000+)</span>
                  {settings.layers.snowboard_trails && <span className="text-[10px] text-cyan-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-fire-spread"
                  title="Fire Spread Forecast: Computational fire progression simulation forecasting perimeter expansion over 1h to 12h"
                  onClick={() => { toggleLayer('fire_spread_forecast'); setShowToolsMenu(false); }}
                  className={`px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors ${settings.layers.fire_spread_forecast ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'hover:bg-red-950/40 text-gray-200'}`}
                >
                  <span className="flex items-center gap-2"><span>🔥</span> Fire Spread Forecast</span>
                  {settings.layers.fire_spread_forecast && <span className="text-[10px] text-red-400 font-bold">ACTIVE</span>}
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-crime-intel"
                  title="Neighborhood Crime Intel: Drill down into precinct statistics, incident heatmaps, and local safety scores"
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
                  data-testid="hud-btn-admin-reputation"
                  title="Crowdsource Administration & Trust Scores: Moderate user submissions, view reporter reputation, and vouch history"
                  onClick={() => { setShowAdminReputationModal(true); setShowToolsMenu(false); }}
                  className="px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors hover:bg-cyan-950/40 text-cyan-300"
                >
                  <span className="flex items-center gap-2"><span>🛡️</span> Crowdsource Admin & Scores</span>
                  <span className="text-[10px] text-cyan-400 font-bold">ADMIN</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-disclaimers"
                  title="Global Intelligence Disclaimers & Analytics Limitations: Statutory disclosures, sensor revisit latency, heuristic boundaries & expat legal defense"
                  onClick={() => { setIsDisclaimersModalOpen(true); setShowToolsMenu(false); }}
                  className="px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors hover:bg-amber-950/40 text-amber-300"
                >
                  <span className="flex items-center gap-2"><span>⚖️</span> Data & Analytics Disclaimers</span>
                  <span className="text-[10px] text-amber-400 font-bold">LEGAL</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-tools-constitutions"
                  title="Constitutional & Sovereign Law Repository: Federal Constitution, all 50 State Constitutions, 6 Territories, and Independent State Grounds"
                  onClick={() => { setIsConstitutionalModalOpen(true); setShowToolsMenu(false); }}
                  className="px-2.5 py-2 rounded-lg text-left flex items-center justify-between transition-colors hover:bg-amber-950/40 text-amber-300"
                >
                  <span className="flex items-center gap-2"><span>📜</span> US & State Constitutions</span>
                  <span className="text-[10px] text-amber-400 font-bold">SOVEREIGN</span>
                </button>
                <button 
                  type="button" 
                  data-testid="hud-btn-settings"
                  title="System Configuration: Customize UI theme, map projection, coordinate formats, and cursor styles"
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
            <span className="pointer-events-none absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">OPEN SYSTEM SETTINGS & CURSOR CUSTOMIZATION</span>
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

      <OfflineSurvivalHubModal
        isOpen={showFieldManuals}
        onClose={() => setShowFieldManuals(false)}
        currentTier={settings.tier || 'free'}
        onUpgradeTier={() => {
          setTierUpgradeTrigger('offline_survival_vault');
          setShowTierUpgrade(true);
        }}
      />

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

      {showAppleWeatherHud && (
        <div 
          style={{
            top: windowDimensions.width < 640 ? '58px' : '66px',
            right: windowDimensions.width < 640 ? '8px' : '16px',
            maxHeight: `calc(100vh - ${windowDimensions.width < 640 ? 120 : 130}px)`
          }}
          className="fixed z-35 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto"
        >
          <AppleWeatherHud 
            metrics={appleWeatherMetrics} 
            onClose={() => setShowAppleWeatherHud(false)} 
            onToggleLayer={(layer) => toggleLayer(layer as any)}
            activeLayers={{
              weather_radar: settings.layers.weather_radar,
              weather_clouds: settings.layers.weather_clouds,
              weather_pressure: settings.layers.weather_pressure,
              atmospheric_radar: settings.layers.atmospheric_radar
            }}
          />
        </div>
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
        onOpenAdminReputation={() => setShowAdminReputationModal(true)}
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

      <ChemicalSprayingModal
        isOpen={isChemicalModalOpen}
        onClose={() => setIsChemicalModalOpen(false)}
        selectedIncidentId={selectedSprayIncidentId}
        currentCenterCoords={[viewState.longitude, viewState.latitude]}
        onSelectIncident={(incidentId) => {
          setSelectedSprayIncidentId(incidentId);
          const inc = ChemicalSprayingEngine.getAllIncidents().find(i => i.id === incidentId);
          if (inc && mapRef.current) {
            mapRef.current.flyTo({
              center: inc.coordinates,
              zoom: 12,
              duration: 1500
            });
          }
        }}
      />

      <FloodSimulatorModal
        isOpen={isFloodModalOpen}
        onClose={() => setIsFloodModalOpen(false)}
        selectedDamIds={selectedDamIds}
        onToggleDamSelection={(id) => {
          setSelectedDamIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        }}
        onSelectAllDams={(ids) => setSelectedDamIds(ids)}
        onClearAllDams={() => setSelectedDamIds([])}
        failureSeverity={damFailureSeverity}
        onSetFailureSeverity={setDamFailureSeverity}
        onFlyToCoordinates={(coords, zoom) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: coords, zoom: zoom || 11, duration: 1500 });
          }
        }}
        isFemaFloodActive={settings.layers.flood_zones}
        onToggleFemaFlood={() => toggleLayer('flood_zones')}
        isDamLayerActive={settings.layers.dams}
        onToggleDamLayer={() => toggleLayer('dams')}
        isInundationLayerActive={settings.layers.dam_inundation}
        onToggleInundationLayer={() => toggleLayer('dam_inundation')}
      />

      <InfrastructureCascadeModal
        isOpen={isCascadeModalOpen}
        onClose={() => setIsCascadeModalOpen(false)}
        onFlyToCoordinates={(coords, zoom) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: coords, zoom: zoom || 11, duration: 1500 });
          }
        }}
      />

      <FloraNaturopathicModal
        isOpen={isFloraModalOpen}
        onClose={() => setIsFloraModalOpen(false)}
        viewportBounds={currentBbox ? { west: currentBbox[0], south: currentBbox[1], east: currentBbox[2], north: currentBbox[3] } : undefined}
        selectedPlantId={selectedFloraId}
        onFlyToPlant={(coords, zoom) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: coords, zoom: zoom || 9, duration: 1500 });
          }
        }}
      />

      <TopographyElevationModal
        isOpen={isTopoModalOpen}
        onClose={() => setIsTopoModalOpen(false)}
        isTopographyActive={settings.layers.elevation_topography}
        onToggleTopography={() => toggleLayer('elevation_topography')}
        topoProvider={topoProvider}
        onSelectTopoProvider={setTopoProvider}
        topoOpacity={topoOpacity}
        onSetTopoOpacity={setTopoOpacity}
        showPeaks={showTopoPeaks}
        onTogglePeaks={() => setShowTopoPeaks(prev => !prev)}
        currentCoordinates={[viewState.longitude, viewState.latitude]}
        onFlyToCoordinates={(coords, zoom) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: coords, zoom: zoom || 11, duration: 1500 });
          }
        }}
      />

      <LiveCameraFeedModal
        isOpen={isCameraFeedModalOpen}
        onClose={() => setIsCameraFeedModalOpen(false)}
        feed={activeCameraFeed}
        onSelectFeed={(f) => setActiveCameraFeed(f)}
        onFlyTo={(coords, zoom) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: coords, zoom: zoom || 15, duration: 1500 });
          }
        }}
        viewportBbox={currentBbox}
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
          currentCoords={crimeFocusCoords || { lat: viewState.latitude, lon: viewState.longitude }}
          onPinpointCurrentView={() => updateCityCrimeForLocation(viewState.latitude, viewState.longitude, undefined, true)}
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

      <GlobalDisclaimersModal
        isOpen={isDisclaimersModalOpen}
        onClose={() => setIsDisclaimersModalOpen(false)}
      />

      <ConstitutionalLawModal
        isOpen={isConstitutionalModalOpen}
        onClose={() => setIsConstitutionalModalOpen(false)}
      />

      <div 
        data-testid="bottom-tactical-dock" 
        style={{
          transform: dockScale < 1 ? `scale(${dockScale})` : undefined,
          transformOrigin: 'bottom center'
        }}
        className="fixed bottom-2 sm:bottom-2.5 left-0 right-0 mx-auto w-fit max-w-[calc(100vw-16px)] z-50 flex flex-nowrap items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 bg-black/95 p-1 sm:p-1.5 lg:p-2 rounded-xl border border-cyan-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.95)] backdrop-blur-md font-mono text-[10px] sm:text-xs pointer-events-auto transition-all duration-150 overflow-visible"
      >
        <button 
          type="button"
          data-testid="btn-street-map"
          onClick={() => updateSettings({ layers: { ...settings.layers, satellite: false } })}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 ${!settings.layers.satellite ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-gray-400 hover:text-white'}`}
          title="Switch base map to OpenStreetMap cartography"
        >
          <span>🗺️</span> <span className="hidden 2xl:inline">STREET MAP</span><span className="hidden md:inline 2xl:hidden">STREET</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SWITCH BASE MAP TO OPENSTREETMAP CARTOGRAPHY</span>
        </button>
        <button 
          type="button"
          data-testid="btn-satellite-map"
          onClick={() => updateSettings({ layers: { ...settings.layers, satellite: true } })}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 ${settings.layers.satellite ? 'bg-sky-950 border border-sky-400 text-sky-300 font-bold shadow-[0_0_10px_rgba(56,189,248,0.4)]' : 'text-gray-400 hover:text-white'}`}
          title="Switch base map to high-resolution true-color satellite imagery"
        >
          <span>🛰️</span> <span className="hidden 2xl:inline">SATELLITE</span><span className="hidden md:inline 2xl:hidden">SAT</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-sky-300 border border-sky-500/70 shadow-[0_0_12px_rgba(56,189,248,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SWITCH BASE MAP TO HIGH-RES SATELLITE IMAGERY</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button 
          type="button"
          data-testid="btn-topo-map"
          onClick={() => {
            const next = !settings.layers.elevation_topography;
            updateSettings({ layers: { ...settings.layers, elevation_topography: next } });
          }}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 ${settings.layers.elevation_topography ? 'bg-emerald-950 border border-emerald-400 text-emerald-300 font-bold shadow-[0_0_10px_rgba(52,211,153,0.4)]' : 'text-gray-400 hover:text-white'}`}
          title="Toggle Elevation & Topography overlay across the entire map"
        >
          <span>🏔️</span> <span className="hidden sm:inline">ELEVATION</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-300 border border-emerald-500/70 shadow-[0_0_12px_rgba(52,211,153,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TOGGLE TOPOGRAPHY & ELEVATION OVERLAY (INDEPENDENT OF BASE MAP)</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button 
          type="button"
          data-testid="btn-toggle-labels"
          onClick={() => updateSettings({ layers: { ...settings.layers, labels: !settings.layers.labels } })}
          className={`relative group px-1.5 sm:px-2 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 shrink-0 ${settings.layers.labels ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-bold shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
          title="Toggle city, lake, ocean, and place labels"
        >
          <span>🏷️</span> <span className="hidden xl:inline">LABELS</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-300 border border-emerald-500/70 shadow-[0_0_12px_rgba(52,211,153,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TOGGLE CITY NAMES, ROADS & LANDMARK LABELS</span>
        </button>
        <button 
          type="button"
          data-testid="btn-toggle-boundaries"
          onClick={() => updateSettings({ layers: { ...settings.layers, boundaries: !settings.layers.boundaries } })}
          className={`relative group px-1.5 sm:px-2 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 shrink-0 ${settings.layers.boundaries ? 'bg-amber-950/80 border border-amber-400 text-amber-300 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}
          title="Toggle state/provincial lines and country international boundaries"
        >
          <span>🌐</span> <span className="hidden xl:inline">BORDERS</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TOGGLE STATE & INTERNATIONAL COUNTRY BORDERS</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
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
          className={`relative group px-1.5 sm:px-2 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 shrink-0 ${is3DView ? 'bg-purple-950/90 border border-purple-400 text-purple-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.5)]' : 'text-gray-400 hover:text-white'}`}
          title="Toggle 3D AR Perspective View (50° Tactical Pitch)"
        >
          <span>🕶️</span> <span className="hidden 2xl:inline">3D AR</span><span className="hidden lg:inline 2xl:hidden">3D</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-purple-300 border border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">TOGGLE 3D TACTICAL PERSPECTIVE (50° TILT)</span>
        </button>
        <button
          type="button"
          data-testid="btn-rotate-ccw"
          onClick={() => {
            if (mapRef.current) {
              const current = mapRef.current.getBearing();
              const next = Math.round(current - 15);
              mapRef.current.easeTo({ bearing: next, duration: 300 });
              setCurrentBearing(next);
            }
          }}
          className="relative group p-1 sm:p-1.5 font-mono text-[10px] sm:text-xs rounded text-gray-400 hover:text-cyan-300 hover:bg-white/10 transition-colors shrink-0"
          title="Rotate map counter-clockwise (-15°)"
        >
          <RotateCcw size={12} />
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">ROTATE MAP 15° COUNTER-CLOCKWISE</span>
        </button>
        <button
          type="button"
          data-testid="btn-reset-orientation"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.easeTo({ bearing: 0, pitch: 0, duration: 1000 });
              setCurrentBearing(0);
              setIs3DView(false);
            }
          }}
          className={`relative group px-1.5 sm:px-2 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded transition-all flex items-center gap-1 shrink-0 ${currentBearing !== 0 ? 'bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(34,211,238,0.5)]' : 'text-gray-400 hover:text-white'}`}
          title="Click to reset North (0°) | Drag with Right-Click or Ctrl+Left-Click to orient anywhere"
        >
          <Compass size={13} className={`transition-transform duration-300 ${currentBearing !== 0 ? 'text-cyan-400' : 'text-gray-400'}`} style={{ transform: `rotate(${-currentBearing}deg)` }} />
          <span>{currentBearing !== 0 ? `${(360 + (currentBearing % 360)) % 360}°` : ''}</span>
          <span className="hidden lg:inline">{currentBearing === 0 ? 'NORTH' : ''}</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
            {currentBearing !== 0 ? `RESET NORTH (${(360 + (currentBearing % 360)) % 360}°) [RIGHT-DRAG TO ROTATE ANY DIRECTION]` : 'ALIGNED NORTH (RIGHT-DRAG TO ROTATE ANY DIRECTION)'}
          </span>
        </button>
        <button
          type="button"
          data-testid="btn-rotate-cw"
          onClick={() => {
            if (mapRef.current) {
              const current = mapRef.current.getBearing();
              const next = Math.round(current + 15);
              mapRef.current.easeTo({ bearing: next, duration: 300 });
              setCurrentBearing(next);
            }
          }}
          className="relative group p-1 sm:p-1.5 font-mono text-[10px] sm:text-xs rounded text-gray-400 hover:text-cyan-300 hover:bg-white/10 transition-colors shrink-0"
          title="Rotate map clockwise (+15°)"
        >
          <RotateCw size={12} />
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">ROTATE MAP 15° CLOCKWISE</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button 
          type="button"
          data-testid="btn-live-feed"
          title="Switch to real-time live telemetry feed and active event tracking"
          onClick={() => setTimeframe('live')}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider border rounded-lg transition-colors shrink-0 ${timeframe === 'live' ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
        >
          <span>⚡</span> <span className="hidden 2xl:inline">LIVE FEED</span><span className="hidden md:inline 2xl:hidden">LIVE</span>
          <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(34,211,238,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SWITCH TO REAL-TIME LIVE SENSOR STREAM</span>
        </button>
        <button 
          type="button"
          data-testid="btn-historical"
          title="Switch to historical archives and past operational intelligence timeline"
          onClick={() => setTimeframe('historical')}
          className={`relative group px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider border rounded-lg transition-colors shrink-0 ${timeframe === 'historical' ? 'bg-orange-950 border-orange-400 text-orange-300 font-bold shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
        >
          <span>📜</span> <span className="hidden 2xl:inline">HISTORICAL</span><span className="hidden md:inline 2xl:hidden">HIST</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-orange-300 border border-orange-500/70 shadow-[0_0_12px_rgba(249,115,22,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SWITCH TO HISTORICAL INTELLIGENCE ARCHIVE</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button
          type="button"
          data-testid="btn-community-report"
          onClick={() => {
            setReportCoordinates([viewState.longitude, viewState.latitude]);
            setIsReportModalOpen(true);
          }}
          className="relative group px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded border border-emerald-500/80 bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all flex items-center gap-1 shrink-0"
          title="Submit a crowdsourced report for a camera, tower, road closure, spring, or hazard (Elevates after 3 vouches)"
        >
          <span>📢</span>
          <span className="hidden lg:inline">REPORT</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-300 border border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">SUBMIT CROWDSOURCED FIELD INTEL REPORT</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button
          type="button"
          data-testid="btn-global-disclaimers"
          onClick={() => setIsDisclaimersModalOpen(true)}
          className="relative group px-2 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded border border-amber-500/80 bg-amber-950/80 hover:bg-amber-900/90 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all flex items-center gap-1 shrink-0"
          title="Data & Analytics Limitations: Statutory disclosures, sensor revisit latency, heuristic boundaries & expat defense"
        >
          <span>⚖️</span>
          <span className="hidden 2xl:inline">DISCLAIMERS</span><span className="hidden lg:inline 2xl:hidden">DISC</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 border border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">VIEW SENSOR LIMITATIONS & STATUTORY DISCLAIMERS</span>
        </button>
        <div className="h-4 sm:h-5 w-px bg-cyan-900/60 mx-0.5 shrink-0" />
        <button
          type="button"
          data-testid="btn-pin-threat-radar"
          onClick={() => {
            setSelectedRadarPinId(null);
            setIsPinThreatRadarOpen(true);
          }}
          className={`relative group px-2 sm:px-2.5 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs tracking-wider rounded border transition-all flex items-center gap-1 shrink-0 ${
            threatRadarSummary.threatenedPins > 0
              ? 'border-red-500/90 bg-red-950/90 hover:bg-red-900 text-red-300 font-bold shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-pulse'
              : 'border-cyan-800/80 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300'
          }`}
          title="Pin Threat Radar: Proximity hazard detection for custom survival caches, safehouses & refuges"
        >
          <span>{threatRadarSummary.threatenedPins > 0 ? '🚨' : '🛡️'}</span>
          <span className="hidden lg:inline">{threatRadarSummary.threatenedPins > 0 ? `THREATS (${threatRadarSummary.threatenedPins})` : `RADAR (${threatRadarSummary.totalPins})`}</span>
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 whitespace-nowrap rounded bg-black/95 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
            {threatRadarSummary.threatenedPins > 0 ? `${threatRadarSummary.threatenedPins} PINS THREATENED — OPEN RADAR` : 'SCAN PROXIMITY HAZARDS FOR CUSTOM PINS & REFUGES'}
          </span>
        </button>
      </div>

      {pinCreationMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div className="bg-[#0b0f19] border border-cyan-800 p-6 rounded-lg w-full max-w-md max-h-[min(580px,92vh)] overflow-y-auto text-white font-mono shadow-[0_0_30px_rgba(8,145,178,0.4)] mx-3 custom-scrollbar">
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
                  <option value="Supply">📦 Supply Cache / Food Vault</option>
                  <option value="Refuge">🛡️ Emergency Refuge / Bunker</option>
                  <option value="Water">💧 Water Well / Spring</option>
                  <option value="Homestead">🌾 Homestead / Farm</option>
                  <option value="Safehouse">🏠 Safehouse / Base</option>
                  <option value="Observation">🔭 Observation Post</option>
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
      <CommunityReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialCoordinates={reportCoordinates}
        onReportSubmitted={(newReport) => {
          setCommunityReports(prev => {
            const updated = [newReport, ...prev];
            return updated;
          });
        }}
      />
      <AdminReputationModal
        isOpen={showAdminReputationModal}
        onClose={() => setShowAdminReputationModal(false)}
      />
      <PinThreatRadarModal
        isOpen={isPinThreatRadarOpen}
        onClose={() => setIsPinThreatRadarOpen(false)}
        summary={threatRadarSummary}
        selectedPinId={selectedRadarPinId}
        onSelectPin={(pinId) => setSelectedRadarPinId(pinId)}
        onFlyToPin={(lat, lon) => {
          if (mapRef.current) {
            mapRef.current.flyTo({ center: [lon, lat], zoom: 14, pitch: 45 });
          }
          setIsPinThreatRadarOpen(false);
        }}
      />
      <CustomCursor settings={settings.cursor} />
    </div>
  );
}

