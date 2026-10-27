import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

// Using a hardcoded demo user ID until auth is implemented
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export interface LocationState {
  lat: number;
  lon: number;
  zoom: number;
}

export interface SavedLocation extends LocationState {
  id: string;
  name: string;
}

export interface CustomPin {
  id: string;
  lat: number;
  lon: number;
  label: string;
  description?: string;
  color?: string;
  category?: string;
  createdAt?: string;
}

export type CursorShape = 'default' | 'sun' | 'sun2' | 'moon' | 'heart' | 'lotus' | 'mindwave' | 'crosshair';

export interface CursorSettings {
  shape: CursorShape;
  color: string;
  secondaryColor?: string;
  opacity: number;
}

export interface UserSettings {
  home_location: LocationState;
  saved_locations: SavedLocation[];
  custom_pins: CustomPin[];
  default_timeframe: 'live' | 'historical';
  layers: {
    aircraft: boolean;
    cell_towers: boolean;
    springs: boolean;
    disasters: boolean;
    earthquakes: boolean;
    power: boolean;
    aviation: boolean;
    emergency: boolean;
    cameras: boolean;
    weather_radar: boolean;
    weather_stations: boolean;
    data_centers: boolean;
    radars: boolean;
    public_lands: boolean;
    campsites: boolean;
    trails: boolean;
    custom_pins: boolean;
    drone: boolean;
    radio: boolean;
    crime_live: boolean;
    crime_historical: boolean;
    defense: boolean;
    submarine_cables: boolean;
    wildfires: boolean;
    fire_spread_forecast: boolean;
    vessels: boolean;
    atlas_obscura: boolean;
    range_rings: boolean;
    satellite: boolean;
    lightning: boolean;
    labels: boolean;
    boundaries: boolean;
    wind_hud: boolean;
    crime_heatmap: boolean;
    road_closures: boolean;
    weather_ar: boolean;
    solar_terminator: boolean;
    drone_docks: boolean;
    blind_spots: boolean;
    land_ownership: boolean;
    zero_blind_spot_hud: boolean;
    toxic_sites: boolean;
    snowboard_trails: boolean;
  };
  satellite_provider?: 'hd_arcgis' | 'nasa_viirs' | 'nasa_modis' | 'goes_live';
  tier?: 'free' | 'pro' | 'sovereign';
  clustering_enabled: boolean;
  cursor: CursorSettings;
}

const DEFAULT_SETTINGS: UserSettings = {
  home_location: { lat: 39.8283, lon: -98.5795, zoom: 4.2 },
  saved_locations: [],
  custom_pins: [],
  default_timeframe: 'live',
  layers: {
    aircraft: true,
    cell_towers: true,
    springs: true,
    disasters: true,
    earthquakes: true,
    power: true,
    aviation: true,
    emergency: true,
    cameras: true,
    weather_radar: false,
    weather_stations: true,
    data_centers: true,
    radars: true,
    public_lands: true,
    campsites: true,
    trails: true,
    custom_pins: true,
    drone: false,
    radio: false,
    crime_live: true,
    crime_historical: false,
    defense: false,
    submarine_cables: true,
    wildfires: true,
    fire_spread_forecast: true,
    vessels: true,
    atlas_obscura: true,
    range_rings: false,
    satellite: false,
    lightning: true,
    labels: true,
    boundaries: true,
    wind_hud: true,
    crime_heatmap: false,
    road_closures: true,
    weather_ar: true,
    solar_terminator: true,
    drone_docks: true,
    blind_spots: true,
    land_ownership: true,
    zero_blind_spot_hud: true,
    toxic_sites: true,
    snowboard_trails: true,
  },
  satellite_provider: 'hd_arcgis',
  tier: 'free',
  clustering_enabled: true,
  cursor: {
    shape: 'sun',
    color: '#00e5ff',
    secondaryColor: '#fb7185',
    opacity: 1.0,
  }
};

const STORAGE_KEY = 'sphinx_user_settings_v1';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            layers: { ...DEFAULT_SETTINGS.layers, ...(parsed.layers || {}) },
            cursor: { ...DEFAULT_SETTINGS.cursor, ...(parsed.cursor || {}) }
          };
        }
      } catch (e) {}
    }
    return DEFAULT_SETTINGS;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (!isLocal) return;

        const pRes = await fetch('http://127.0.0.1:3117/api/profile/pins');
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData.pins && Array.isArray(pData.pins)) {
            setSettings(prev => {
              const localPins = prev.custom_pins || [];
              const map = new Map();
              localPins.forEach(p => map.set(p.id, p));
              pData.pins.forEach((p: CustomPin) => map.set(p.id, p));
              const merged = Array.from(map.values());
              const updated = { ...prev, custom_pins: merged };
              if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
              }
              return updated;
            });
          }
        }
      } catch (e) {}

      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('id', DEMO_USER_ID)
          .single();

        if (error && error.code !== 'PGRST116') {
          return;
        }

        if (data) {
          const remoteSettings: UserSettings = {
            home_location: data.home_location,
            saved_locations: data.saved_locations || [],
            custom_pins: data.custom_pins || [],
            default_timeframe: data.default_timeframe,
            layers: { ...DEFAULT_SETTINGS.layers, ...(data.layers || {}) },
            clustering_enabled: data.clustering_enabled ?? DEFAULT_SETTINGS.clustering_enabled,
            cursor: { ...DEFAULT_SETTINGS.cursor, ...(data.cursor || {}) }
          };
          setSettings(remoteSettings);
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteSettings));
          }
        }
      } catch (err) {
        // Fallback already loaded from localStorage/defaults
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      } catch (e) {}
    }

    if (newSettings.custom_pins) {
      try {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (isLocal) {
          fetch('http://127.0.0.1:3117/api/profile/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ custom_pins: newSettings.custom_pins })
          }).catch(() => {});
        }
      } catch (e) {}
    }

    if (!isSupabaseConfigured()) return;

    try {
      await supabase
        .from('user_settings')
        .upsert({
          id: DEMO_USER_ID,
          home_location: newSettings.home_location,
          saved_locations: newSettings.saved_locations,
          custom_pins: newSettings.custom_pins,
          default_timeframe: newSettings.default_timeframe,
          layers: newSettings.layers,
          clustering_enabled: newSettings.clustering_enabled,
          tier: newSettings.tier,
          cursor: newSettings.cursor,
          updated_at: new Date().toISOString()
        });
    } catch (e) {}
  };

  return { settings, updateSettings, loading };
}

export type UserTier = 'free' | 'pro' | 'sovereign';

export const TIER_CONFIG = {
  free: {
    label: 'FREE CITIZEN',
    color: '#94a3b8',
    bg: 'bg-slate-800 text-slate-200 border-slate-700'
  },
  pro: {
    label: 'PRO TACTICAL',
    color: '#00e5ff',
    bg: 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
  },
  sovereign: {
    label: 'SOVEREIGN SENTINEL',
    color: '#a855f7',
    bg: 'bg-purple-950 text-purple-300 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
  }
};

export function isFeatureAllowed(feature: string, tier: UserTier = 'free'): boolean {
  if (tier === 'sovereign') return true;
  if (tier === 'pro') {
    const sovereignOnly = ['offline_downloader', 'range_rings', 'celestial_dome', 'drone', 'radio', 'defense'];
    return !sovereignOnly.includes(feature);
  }
  // Free tier has UNLIMITED pins per user requirement!
  const freeAllowed = [
    'custom_pins',
    'carto_map',
    'wildfires',
    'earthquakes',
    'disasters',
    'power',
    'cell_towers',
    'springs',
    'campsites',
    'trails',
    'radars',
    'data_centers',
    'cameras_basic',
    'crime_live',
    'standard_ai',
    'standard_aviation'
  ];
  return freeAllowed.includes(feature);
}
