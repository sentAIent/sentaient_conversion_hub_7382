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
    historical_cameras: boolean;
    community_reports: boolean;
    weather_clouds: boolean;
    weather_pressure: boolean;
    weather_apple_hud: boolean;
    atmospheric_radar: boolean;
    chemical_spraying: boolean;
    power_lines: boolean;
    utility_companies: boolean;
    fiber_cables: boolean;
    hospitals: boolean;
    urgent_care: boolean;
    military_bunkers: boolean;
    citizen_bunkers: boolean;
    bomb_storage_depots: boolean;
    military_bases: boolean;
    dams: boolean;
    flood_zones: boolean;
    dam_inundation: boolean;
    elevation_topography: boolean;
    farms_ranches: boolean;
    medicinal_flora: boolean;
    fuel_pipelines: boolean;
    water_aqueducts: boolean;
    strategic_facilities: boolean;
    [key: string]: boolean | undefined;
  };
  basemap_mode?: 'street' | 'dark' | 'satellite';
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
    crime_live: false,
    crime_historical: false,
    defense: false,
    submarine_cables: true,
    wildfires: true,
    fire_spread_forecast: false,
    vessels: true,
    atlas_obscura: true,
    range_rings: false,
    satellite: false,
    lightning: true,
    labels: true,
    boundaries: true,
    wind_hud: false,
    crime_heatmap: false,
    road_closures: false,
    weather_ar: false,
    solar_terminator: false,
    drone_docks: false,
    blind_spots: false,
    land_ownership: false,
    zero_blind_spot_hud: false,
    toxic_sites: false,
    snowboard_trails: true,
    historical_cameras: false,
    community_reports: true,
    weather_clouds: false,
    weather_pressure: false,
    weather_apple_hud: false,
    atmospheric_radar: false,
    chemical_spraying: false,
    power_lines: false,
    utility_companies: false,
    fiber_cables: false,
    hospitals: false,
    urgent_care: false,
    military_bunkers: false,
    citizen_bunkers: false,
    bomb_storage_depots: false,
    military_bases: false,
    dams: false,
    flood_zones: false,
    dam_inundation: false,
    elevation_topography: true,
    farms_ranches: false,
    medicinal_flora: false,
    fuel_pipelines: false,
    water_aqueducts: false,
    strategic_facilities: false,
  },
  basemap_mode: 'street',
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
            basemap_mode: parsed.basemap_mode || (parsed.layers?.satellite ? 'satellite' : 'street'),
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
    let isMounted = true;
    async function loadSettings() {
      try {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (!isLocal) return;

        const pRes = await fetch('http://127.0.0.1:3117/api/profile/pins', { signal: AbortSignal.timeout(300) });
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
        if (isMounted) setLoading(false);
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
            basemap_mode: data.basemap_mode || (data.layers?.satellite ? 'satellite' : 'street'),
            layers: { ...DEFAULT_SETTINGS.layers, ...(data.layers || {}) },
            clustering_enabled: data.clustering_enabled ?? DEFAULT_SETTINGS.clustering_enabled,
            cursor: { ...DEFAULT_SETTINGS.cursor, ...(data.cursor || {}) }
          };
          if (isMounted) {
            setSettings(remoteSettings);
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteSettings));
            }
          }
        }
      } catch (err) {
        // Fallback already loaded from localStorage/defaults
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadSettings();
    return () => { isMounted = false; };
  }, []);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    let latestSettings: UserSettings | null = null;
    setSettings(prev => {
      const mergedLayers = updates.layers ? { ...prev.layers, ...updates.layers } : prev.layers;
      const nextSettings = { ...prev, ...updates, layers: mergedLayers };
      latestSettings = nextSettings;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
        } catch (e) {}
      }
      return nextSettings;
    });

    if (updates.custom_pins && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      try {
        fetch('http://127.0.0.1:3117/api/profile/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ custom_pins: updates.custom_pins }),
          signal: AbortSignal.timeout(500)
        }).catch(() => {});
      } catch (e) {}
    }

    if (!isSupabaseConfigured() || !latestSettings) return;

    try {
      const s = latestSettings as UserSettings;
      await supabase
        .from('user_settings')
        .upsert({
          id: DEMO_USER_ID,
          home_location: s.home_location,
          saved_locations: s.saved_locations,
          custom_pins: s.custom_pins,
          default_timeframe: s.default_timeframe,
          layers: s.layers,
          clustering_enabled: s.clustering_enabled,
          tier: s.tier,
          cursor: s.cursor,
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
