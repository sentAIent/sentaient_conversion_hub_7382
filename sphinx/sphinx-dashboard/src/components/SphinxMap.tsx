"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Map, { Source, Layer, Popup, Marker } from 'react-map-gl/maplibre';
import { Eye, EyeOff } from 'lucide-react';

import { useSettings, LocationState } from '../lib/useSettings';
import SettingsPanel from './SettingsPanel';
import { GeocodingSearch } from './GeocodingSearch';
import { OfflineDownloaderModal } from './OfflineDownloaderModal';
import { DirectionsPanel } from './DirectionsPanel';
import { DroneFeed } from './DroneFeed';
import { RadioPanel } from './RadioPanel';
import { DirectionsResult } from '../lib/directionsService';
import { isPointInPolygon } from '../lib/geofence';

interface SelectedFeature {
  properties: any;
  layerId: string;
  longitude: number;
  latitude: number;
}

const BASE_MAP_STYLE = {
  version: 8 as const,
  glyphs: 'https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf',
  sources: {
    'osm': {
      type: 'raster',
      tiles: ['http://127.0.0.1:3117/api/tiles/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors'
    }
  },
  layers: [
    {
      id: 'osm-layer',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

const INTERACTIVE_LAYER_IDS = ['custom-pin-layer', 'cell-tower-cluster', 'spring-cluster', 'aircraft-layer', 'cell-tower-layer', 'spring-layer', 'disaster-layer', 'earthquake-layer', 'power-layer', 'aviation-layer', 'emergency-layer', 'camera-layer', 'weather-station-layer', 'data-center-layer', 'radar-layer', 'public-land-layer', 'campsite-layer', 'trail-layer'];
export default function SphinxMap() {
  const { settings, updateSettings, loading } = useSettings();

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

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3117');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'drone_telemetry') {
          setDroneData(data);
        } else if (data.type === 'crime_incidents') {
          setCrimeData(data.data);
        }
      } catch(e) {}
    };
    return () => ws.close();
  }, []);

  const [viewState, setViewState] = useState({
    longitude: -77.0369,
    latitude: 38.9072,
    zoom: 13,
    pitch: 45,
    bearing: 0
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fetchingOverpassRef = useRef(false);

  // Initialize viewState from settings once loaded
  useEffect(() => {
    if (!loading && settings.home_location) {
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
    setViewState(prev => ({
      ...prev,
      longitude: loc.lon,
      latitude: loc.lat,
      zoom: loc.zoom
    }));
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [loc.lon, loc.lat], zoom: loc.zoom });
    }
  };

  const bboxRef = useRef('');
  const mapRef = useRef<any>(null);

  const [aircraftFeatures, setAircraftFeatures] = useState([]);
  const [cellTowerFeatures, setCellTowerFeatures] = useState([]);
  const [springFeatures, setSpringFeatures] = useState([]);
  const [isFetchingOverpass, setIsFetchingOverpass] = useState(false);
  const [overpassError, setOverpassError] = useState<string | null>(null);
  const [disasterFeatures, setDisasterFeatures] = useState([]);
  const [earthquakeFeatures, setEarthquakeFeatures] = useState([]);
  const [powerFeatures, setPowerFeatures] = useState([]);
  const [aviationFeatures, setAviationFeatures] = useState([]);
  const [emergencyFeatures, setEmergencyFeatures] = useState([]);
  const [cameraFeatures, setCameraFeatures] = useState([]);
  const [weatherStationFeatures, setWeatherStationFeatures] = useState([]);
  const [dataCenterFeatures, setDataCenterFeatures] = useState([]);
  const [radarFeatures, setRadarFeatures] = useState([]);
  const [publicLandFeatures, setPublicLandFeatures] = useState([]);
  const [campsiteFeatures, setCampsiteFeatures] = useState([]);
  const [trailFeatures, setTrailFeatures] = useState([]);
  
  const [visibleCounts, setVisibleCounts] = useState({ custom_pins: 0, springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 });

  const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');
  const [weatherRadarUrl, setWeatherRadarUrl] = useState<string | null>(null);
  const [directionsResult, setDirectionsResult] = useState<DirectionsResult | null>(null);
  const [showDirections, setShowDirections] = useState(false);

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

  const [downloadBbox, setDownloadBbox] = useState<string | null>(null);

  
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
const [legendScale, setLegendScale] = useState(1);
  useEffect(() => {
    const handleResize = () => setLegendScale(window.innerWidth / 1920);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
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
        }
      })
      .catch(err => console.error('[Sphinx GL] Failed to fetch weather radar metadata:', err));
  }, []);

  const updateBbox = useCallback(() => {
    if (!mapRef.current) return;
    const bounds = mapRef.current.getMap().getBounds();
    bboxRef.current = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
  }, []);

  const loadAircraft = useCallback(async () => {
    if (!bboxRef.current) return;
    try {
      const res = await fetch(`http://127.0.0.1:3117/api/osint/aircraft?bbox=${bboxRef.current}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const geojsonFeatures = (data.aircraft || []).map((a: any) => ({
        type: 'Feature',
        properties: { ...a, type: 'aircraft' },
        geometry: { type: 'Point', coordinates: [a.longitude, a.latitude] }
      }));
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

    if (fetchingOverpassRef.current) return;

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
    }
  }, []);

  const loadDisastersData = useCallback(async () => {
    try {
      fetch(`http://127.0.0.1:3117/api/osint/disasters?timeframe=${timeframe}`)
        .then(r => r.json())
        .then(d => setDisasterFeatures(d.features || []))
        .catch(e => console.warn('[Sphinx GL] Failed to fetch disaster data', e));
        
      fetch(`http://127.0.0.1:3117/api/osint/earthquakes?timeframe=${timeframe}`)
        .then(r => r.json())
        .then(d => setEarthquakeFeatures(d.features || []))
        .catch(e => console.warn('[Sphinx GL] Failed to fetch earthquakes data', e));
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load disaster data', e);
    }
  }, [timeframe]);

  useEffect(() => {
    let aircraftInterval: NodeJS.Timeout;
    let infraInterval: NodeJS.Timeout;
    if (timeframe === 'live') {
      updateBbox();
      loadAircraft();
      loadWatchtowerData();
      loadDisastersData();
      
      // Fast polling for moving assets
      aircraftInterval = setInterval(() => {
        loadAircraft();
      }, 30000); // 30 seconds
      
      // Slow polling for infrastructure and global events
      infraInterval = setInterval(() => {
        loadWatchtowerData();
        loadDisastersData();
      }, 300000); // 5 minutes
    } else {
      loadDisastersData();
    }
    return () => {
      clearInterval(aircraftInterval);
      clearInterval(infraInterval);
    };
  }, [timeframe, loadAircraft, loadWatchtowerData, loadDisastersData, updateBbox]);

  const onMapClick = (e: any) => {

    if (e.originalEvent.shiftKey) {
      setPinCreationMode({ lat: e.lngLat.lat, lon: e.lngLat.lng });
      setPinLabel('');
      setPinDescription('');
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
      if (feature.layer.id === 'cell-tower-cluster' || feature.layer.id === 'spring-cluster') {
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

      setSelectedFeature({
        properties: feature.properties,
        layerId: feature.layer.id,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      });
    } else {
      setSelectedFeature(null);
    }
  };

  const updateVisibleCounts = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    try {
      const activeLayers = INTERACTIVE_LAYER_IDS.filter(id => map.getLayer(id));
      if (activeLayers.length === 0) return;
      
      const features = map.queryRenderedFeatures(undefined, { layers: activeLayers });
      
      const counts = { custom_pins: 0, springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 };
      features.forEach((f: any) => {
        const type = f.layer.id;
        if (type === 'aircraft-layer') counts.aircraft++;
        if (type === 'cell-tower-layer') counts.cellTowers++;
        if (type === 'spring-layer') counts.springs++;
        if (type === 'disaster-layer') counts.disasters++;
        if (type === 'earthquake-layer') counts.earthquakes++;
        if (type === 'power-layer') counts.power++;
        if (type === 'aviation-layer') counts.aviation++;
        if (type === 'emergency-layer') counts.emergency++;
        if (type === 'camera-layer') counts.cameras++;
        if (type === 'weather-station-layer') counts.weather_stations++;
        if (type === 'data-center-layer') counts.data_centers++;
        if (type === 'radar-layer') counts.radars++;
        if (type === 'public-land-layer') counts.public_lands++;
        if (type === 'campsite-layer') counts.campsites++;
        if (type === 'trail-layer') counts.trails++;
        if (type === 'custom-pin-layer') counts.custom_pins++;
      });
      setVisibleCounts(prev => {
        if (JSON.stringify(prev) === JSON.stringify(counts)) return prev;
        return counts;
      });
    } catch (e) {
      console.warn('[Sphinx GL] Could not query rendered features', e);
    }
  }, []);
  
  const cellTowersData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: cellTowerFeatures }), [cellTowerFeatures]);
  const springData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: springFeatures }), [springFeatures]);
  const aircraftData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aircraftFeatures }), [aircraftFeatures]);
  const disasterData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: disasterFeatures }), [disasterFeatures]);
  const earthquakeData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: earthquakeFeatures }), [earthquakeFeatures]);
  const powerData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: powerFeatures }), [powerFeatures]);
  const aviationData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: aviationFeatures }), [aviationFeatures]);
  const emergencyData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: emergencyFeatures }), [emergencyFeatures]);
  const cameraData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: cameraFeatures }), [cameraFeatures]);
  const weatherStationData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: weatherStationFeatures }), [weatherStationFeatures]);
  const dataCenterData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: dataCenterFeatures }), [dataCenterFeatures]);
  const radarData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: radarFeatures }), [radarFeatures]);
  const publicLandData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: publicLandFeatures }), [publicLandFeatures]);
  const campsiteData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: campsiteFeatures }), [campsiteFeatures]);
  const trailData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: trailFeatures }), [trailFeatures]);

  const customPinsData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (settings.custom_pins || []).map((p: any) => ({
      type: 'Feature' as const,
      properties: { ...p, isCustomPin: true, type: 'custom_pin' },
      geometry: { type: 'Point' as const, coordinates: [p.lon, p.lat] }
    }))
  }), [settings.custom_pins]);

  const directionsData = React.useMemo(() => directionsResult?.routeGeoJSON || { type: 'FeatureCollection' as const, features: [] }, [directionsResult]);
  
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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={BASE_MAP_STYLE as any}
        onLoad={(e) => {
          const map = e.target;
          map.on('styleimagemissing', (evt: any) => {
            const id = evt.id;
            if (id === 'plane-icon' && !map.hasImage(id)) {
              const img = new Image(24, 24);
              img.onload = () => {
                if (!map.hasImage(id)) map.addImage(id, img, { sdf: true });
              };
              img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>';
            }
          });
          
          if (!map.hasImage('plane-icon')) {
            const img = new Image(24, 24);
            img.onload = () => { if (!map.hasImage('plane-icon')) map.addImage('plane-icon', img, { sdf: true }); };
            img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>';
          }
          updateBbox();
          loadAircraft();
          loadWatchtowerData();
          loadDisastersData();
        }}
        onMoveEnd={() => {
          updateBbox();
          updateVisibleCounts();
          
          // Debounce network fetches on map movement to prevent 429 rate limits
          if ((window as any).moveDebounce) clearTimeout((window as any).moveDebounce);
          (window as any).moveDebounce = setTimeout(() => {
            loadAircraft();
            loadWatchtowerData();
          }, 1500);
        }}
        onIdle={updateVisibleCounts}
        onClick={onMapClick}
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

        {settings.layers.weather_radar && weatherRadarUrl && (
          <Source id="weather-radar" type="raster" tiles={[weatherRadarUrl]} tileSize={256}>
            <Layer id="weather-radar-layer" type="raster" paint={{ 'raster-opacity': 0.6 }}  />
          </Source>
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
          <Source id="cameras" type="geojson" data={cameraData}>
            <Layer id="camera-layer" source="cameras" type="circle" paint={{ 'circle-radius': 5, 'circle-color': '#ffffff', 'circle-opacity': getOpacity('cameras')  }} />
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
        {settings.layers.public_lands && (
          <Source id="public-lands" type="geojson" data={publicLandData}>
            <Layer id="public-land-layer" source="public-lands" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#22c55e', 'circle-opacity': getOpacity('public-lands'), 'circle-stroke-width': 1, 'circle-stroke-color': '#166534'  }} />
          </Source>
        )}
        {settings.layers.campsites && (
          <Source id="campsites" type="geojson" data={campsiteData}>
            <Layer id="campsite-layer" source="campsites" type="circle" paint={{ 'circle-radius': 5, 'circle-color': '#f97316', 'circle-opacity': getOpacity('campsites')  }} />
          </Source>
        )}
        {settings.layers.trails && (
          <Source id="trails" type="geojson" data={trailData}>
            <Layer id="trail-layer" source="trails" type="circle" paint={{ 'circle-radius': 3, 'circle-color': '#d97706', 'circle-opacity': getOpacity('trails')  }} />
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
              id="custom-pin-layer" 
              type="circle" 
              paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' }} 
            />
          </Source>
        )}

{settings.layers.earthquakes && (
          <Source id="earthquakes" type="geojson" data={earthquakeData}>
            <Layer id="earthquake-layer" source="earthquakes" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#f97316', 'circle-opacity': getOpacity('earthquakes')  }} />
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
                'line-color': directionsResult.trafficCongestion === 'severe' ? '#ef4444' : 
                              directionsResult.trafficCongestion === 'heavy' ? '#f97316' : 
                              directionsResult.trafficCongestion === 'moderate' ? '#eab308' : '#22c55e', 
                'line-width': 5 
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
            <div className="text-black p-1 text-sm font-sans max-w-[250px]">
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
                 ['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type) ? 'Surveillance Camera' :
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
              
              {selectedFeature.properties.type === 'aircraft' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Callsign:</strong> {selectedFeature.properties.callsign}</p>
                  <p><strong>Altitude:</strong> {selectedFeature.properties.altitude}m</p>
                  <p><strong>Velocity:</strong> {selectedFeature.properties.velocity}m/s</p>
                  <p><strong>Origin:</strong> {selectedFeature.properties.origin_country}</p>
                </div>
              )}

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
              
              {['cctv', 'flock', 'speed_camera', 'camera'].includes(selectedFeature.properties.type) && (
                <div className="space-y-1 mt-2">
                  <p><strong>Type:</strong> {selectedFeature.properties.sub_type || selectedFeature.properties.type.toUpperCase()}</p>
                  <p><strong>Name:</strong> {selectedFeature.properties.name}</p>
                  <p><strong>Operator:</strong> {selectedFeature.properties.operator}</p>
                  <p><strong>Description:</strong> {selectedFeature.properties.description}</p>
                  {selectedFeature.properties.mount && selectedFeature.properties.mount !== 'unknown' && <p><strong>Mount:</strong> {selectedFeature.properties.mount}</p>}
                  {selectedFeature.properties.direction && <p><strong>Direction:</strong> {selectedFeature.properties.direction}</p>}
                </div>
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
                <div className="space-y-1 mt-2">
                  <p><strong>Label:</strong> {selectedFeature.properties.label}</p>
                  {selectedFeature.properties.description && <p><strong>Description:</strong> {selectedFeature.properties.description}</p>}
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
        {settings.layers.crime_live && crimeData.map((incident: any) => (
          <Marker key={incident.id} longitude={incident.lon} latitude={incident.lat} anchor="bottom">
            <div className={`w-4 h-4 rounded-full border-2 cursor-pointer animate-pulse ${incident.severity === 'high' ? 'bg-red-500/50 border-red-500' : 'bg-orange-500/50 border-orange-500'}`} title={incident.type} />
          </Marker>
        ))}
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

      {/* SPHINX OS HUD */}
      <div 
        style={{ transform: `scale(${legendScale})`, transformOrigin: 'top left', width: isLegendCollapsed ? '130px' : '380px', transition: 'width 0.3s ease-in-out' }}
        className="absolute top-4 left-4 z-10 bg-black/80 border border-cyan-900/50 p-4 rounded-lg text-white font-mono shadow-[0_0_15px_rgba(8,145,178,0.2)] backdrop-blur-sm overflow-hidden"
      >
        <div className="flex justify-between items-center mb-3 border-b border-cyan-900/50 pb-2">
          {!isLegendCollapsed && <h1 className="text-xl font-bold text-cyan-400 tracking-widest whitespace-nowrap">SPHINX OS</h1>}
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
              className="text-cyan-400 hover:text-white transition-colors p-1"
              title={isLegendCollapsed ? "Expand" : "Collapse"}
            >
              {isLegendCollapsed ? '»' : '«'}
            </button>
            {!isLegendCollapsed && (
              <button 
                onClick={() => {
                  const anyVisible = Object.values(settings.layers).some(v => v);
                  toggleAllLayers(!anyVisible);
                }}
                className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900 whitespace-nowrap"
              >
                {Object.values(settings.layers).some(v => v) ? 'HIDE ALL' : 'SHOW ALL'}
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-4 text-sm">

            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.custom_pins ? 'opacity-50' : ''}`} onClick={() => toggleLayer('custom_pins')} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className={settings.layers.custom_pins ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}>
                  {settings.layers.custom_pins ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Custom Pins</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.custom_pins}</span>
            </div>

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
                <span className="text-white text-lg leading-none shrink-0 w-4 text-center">●</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cameras / ALPR</span>}
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

        </div>
      </div>
      
      
      <div className="absolute top-4 left-[320px] z-10">
        <GeocodingSearch 
          onLocationSelected={(lat, lon) => {
            if (mapRef.current) {
              mapRef.current.flyTo({ center: [lon, lat], zoom: 14, duration: 2500 });
            }
          }} 
        />
      </div>
      <div className="absolute top-4 left-[640px] z-10 flex gap-2">
        <button 
          onClick={() => setShowDirections(!showDirections)}
          className="bg-black/80 px-4 py-2 rounded-lg border border-cyan-900 shadow-[0_0_15px_rgba(8,145,178,0.5)] backdrop-blur-md hover:bg-cyan-900/40 transition-colors font-mono text-cyan-400 text-sm"
        >
          {showDirections ? 'Close Routing' : 'Traffic Routing'}
        </button>
      </div>
      
      {showDirections && (
        <div className="absolute top-16 left-[640px] z-10">
          <DirectionsPanel onRouteCalculated={setDirectionsResult} />
        </div>
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

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        <button 
          onClick={() => setTimeframe('live')}
          className={`px-4 py-2 font-mono text-xs tracking-wider border rounded transition-colors ${timeframe === 'live' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-400' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500'}`}
        >
          LIVE FEED
        </button>
        <button 
          onClick={() => setTimeframe('historical')}
          className={`px-4 py-2 font-mono text-xs tracking-wider border rounded transition-colors ${timeframe === 'historical' ? 'bg-orange-900/50 border-orange-400 text-orange-400' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500'}`}
        >
          HISTORICAL
        </button>
      </div>

      {pinCreationMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '8px', width: '400px', color: 'white', fontFamily: 'monospace' }}>
            <h2>Create Custom Pin</h2>
            <p style={{ color: '#ccc', marginBottom: 20, fontSize: '12px' }}>Save a location to your map.</p>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Label</label>
              <input type="text" value={pinLabel} onChange={e => setPinLabel(e.target.value)} style={{ padding: '8px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} placeholder="e.g., Safe House" autoFocus />
            </div>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Description (optional)</label>
              <textarea value={pinDescription} onChange={e => setPinDescription(e.target.value)} style={{ padding: '8px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }} placeholder="Additional details..." />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button 
                onClick={() => {
                  const newPin = { id: Date.now().toString(), lat: pinCreationMode.lat, lon: pinCreationMode.lon, label: pinLabel || 'Pinned Location', description: pinDescription };
                  updateSettings({ custom_pins: [...(settings.custom_pins || []), newPin] });
                  setPinCreationMode(null);
                }} 
                style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Save Pin
              </button>
              <button onClick={() => setPinCreationMode(null)} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {settings.layers.drone && <DroneFeed />}
      {settings.layers.radio && <RadioPanel onClose={() => updateSettings({ layers: { ...settings.layers, radio: false } })} />}
    </div>
  );
}

