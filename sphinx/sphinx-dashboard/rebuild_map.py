import os

# Base template
map_code = """\"use client\";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ShieldAlert, Activity, Eye, EyeOff, Radio, Plane, Droplets, Flame, Earth } from 'lucide-react';
import GeocodingSearch from './GeocodingSearch';
import SettingsPanel from './SettingsPanel';
import OfflineDownloaderModal from './OfflineDownloaderModal';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface SelectedFeature {
  longitude: number;
  latitude: number;
  properties: any;
  layerId: string;
}

export default function SphinxMap() {
  const [viewState, setViewState] = useState({
    longitude: -118.2437,
    latitude: 34.0522,
    zoom: 10,
    pitch: 45,
    bearing: 0
  });

  const [settings, setSettings] = useState<any>({
    layers: {
      custom_pins: true,
      aircraft: true,
      cell_towers: true,
      springs: true,
      power: true,
      emergency: true,
      cameras: true,
      weather_stations: true,
      data_centers: true,
      radars: true,
      public_lands: true,
      campsites: true,
      trails: true,
      disasters: true,
      earthquakes: true
    },
    custom_pins: []
  });

  const updateSettings = (newSettings: any) => {
    setSettings({ ...settings, ...newSettings });
  };

  const [aircraftFeatures, setAircraftFeatures] = useState<any[]>([]);
  const [cellTowerFeatures, setCellTowerFeatures] = useState<any[]>([]);
  const [springFeatures, setSpringFeatures] = useState<any[]>([]);
  const [disasterFeatures, setDisasterFeatures] = useState<any[]>([]);
  const [earthquakeFeatures, setEarthquakeFeatures] = useState<any[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<any>({});
  
  const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [hoveredLegendLayer, setHoveredLegendLayer] = useState<string | null>(null);
  const [isDownloaderOpen, setIsDownloaderOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [downloadBbox, setDownloadBbox] = useState('');
  const [clientId] = useState('sphinx-client-' + Math.random().toString(36).substr(2, 9));
  
  const [pinCreationMode, setPinCreationMode] = useState<{lat: number, lon: number} | null>(null);
  const [pinLabel, setPinLabel] = useState('');
  const [pinDescription, setPinDescription] = useState('');

  const mapRef = useRef<any>(null);
  
  const handleJumpTo = (lat: number, lon: number, zoom: number) => {
    setViewState({ ...viewState, latitude: lat, longitude: lon, zoom });
  };

  const toggleLayer = (layer: string) => {
    setSettings((prev: any) => ({
      ...prev,
      layers: { ...prev.layers, [layer]: !prev.layers[layer] }
    }));
  };

  return (
    <div className="w-full h-screen relative bg-black font-sans">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button onClick={() => setIsSettingsOpen(true)} className="bg-black/80 border border-cyan-900 p-2 text-cyan-500 hover:bg-cyan-900/50 rounded">Settings</button>
        <button onClick={() => setIsDownloaderOpen(true)} className="bg-black/80 border border-cyan-900 p-2 text-cyan-500 hover:bg-cyan-900/50 rounded">Offline Download</button>
      </div>
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-96">
        <GeocodingSearch onLocationSelect={(lat, lon) => handleJumpTo(lat, lon, 12)} />
      </div>

      <div 
        style={{ 
          width: isLegendCollapsed ? 'clamp(100px, 8vw, 130px)' : 'clamp(280px, 25vw, 380px)', 
          fontSize: 'clamp(10px, 1vw, 14px)',
          transition: 'width 0.3s ease-in-out' 
        }}
        className="absolute top-4 left-4 z-10 bg-black/80 border border-cyan-900/50 p-4 rounded-lg text-white font-mono shadow-[0_0_15px_rgba(8,145,178,0.2)] backdrop-blur-sm overflow-hidden"
      >
        <div className="flex justify-between items-center mb-3 border-b border-cyan-900/50 pb-2">
          {!isLegendCollapsed && <h1 className="font-bold text-cyan-400 tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(14px, 1.5vw, 20px)' }}>SPHINX OS</h1>}
          <div className="flex items-center gap-2">
            <button onClick={() => setIsLegendCollapsed(!isLegendCollapsed)} className="text-cyan-400 hover:text-white transition-colors p-1">
              {isLegendCollapsed ? '►' : '▼'}
            </button>
          </div>
        </div>

        <div className={`space-y-1 transition-all duration-300 ${isLegendCollapsed ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100 h-auto'}`}>
            <div className={`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors ${!settings.layers.custom_pins ? 'opacity-50' : ''}`} onClick={() => toggleLayer('custom_pins')}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">{settings.layers.custom_pins ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <div className="w-3 h-3 bg-purple-500 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Custom Pins</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{settings.custom_pins?.length || 0}</span>
            </div>
            {/* Legend Continues... */}
        </div>
      </div>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={e => {
            if (e.originalEvent.shiftKey) {
                setPinCreationMode({ lat: e.lngLat.lat, lon: e.lngLat.lng });
            }
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={['aircraft-layer', 'cell-tower-layer', 'spring-layer', 'disaster-layer', 'earthquake-layer']}
        onClickCapture={(e: any) => {
            if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                setSelectedFeature({
                    longitude: e.lngLat.lng,
                    latitude: e.lngLat.lat,
                    properties: feature.properties,
                    layerId: feature.layer.id
                });
            }
        }}
      >
        {settings.layers.custom_pins && settings.custom_pins?.map((pin: any) => (
            <Popup key={pin.id} longitude={pin.lon} latitude={pin.lat} closeButton={false} anchor="bottom">
                <div className="bg-black/90 p-2 border border-purple-500 rounded text-purple-300 text-xs font-mono">
                    <div className="font-bold border-b border-purple-500/50 pb-1 mb-1">{pin.label}</div>
                    <div>{pin.description}</div>
                </div>
            </Popup>
        ))}
      </Map>

      {pinCreationMode && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '8px', zIndex: 1000, color: 'white', minWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
          <h3 style={{ marginTop: 0, marginBottom: 20, borderBottom: '1px solid #444', paddingBottom: 10 }}>Create Custom Pin</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Latitude</label>
              <input type="text" value={pinCreationMode.lat} readOnly style={{ padding: '8px', backgroundColor: '#2d2d2d', color: '#888', border: '1px solid #444', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Longitude</label>
              <input type="text" value={pinCreationMode.lon} readOnly style={{ padding: '8px', backgroundColor: '#2d2d2d', color: '#888', border: '1px solid #444', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Label</label>
              <input type="text" value={pinLabel} onChange={e => setPinLabel(e.target.value)} style={{ padding: '8px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} placeholder="E.g. Target Alpha" />
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
      <div className="absolute bottom-6 right-6 z-10 flex gap-[0.5vw]">
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
    </div>
  );
}
"""

with open("/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx", "w") as f:
    f.write(map_code)
