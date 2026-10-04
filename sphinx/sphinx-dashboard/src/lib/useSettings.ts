import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

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
  };
  clustering_enabled: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  home_location: { lat: 38.9072, lon: -77.0369, zoom: 13 },
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
  },
  clustering_enabled: true
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('id', DEMO_USER_ID)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase error loading settings:', error);
          return;
        }

        if (data) {
          setSettings({
            home_location: data.home_location,
            saved_locations: data.saved_locations || [],
            custom_pins: data.custom_pins || [],
            default_timeframe: data.default_timeframe,
            layers: { ...DEFAULT_SETTINGS.layers, ...(data.layers || {}) },
            clustering_enabled: data.clustering_enabled ?? DEFAULT_SETTINGS.clustering_enabled
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          id: DEMO_USER_ID,
          home_location: newSettings.home_location,
          saved_locations: newSettings.saved_locations,
          // custom_pins: newSettings.custom_pins,
          default_timeframe: newSettings.default_timeframe,
          layers: newSettings.layers,
          clustering_enabled: newSettings.clustering_enabled,
          updated_at: new Date().toISOString()
        });

      if (error) console.error('Supabase error saving settings:', error);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  return { settings, updateSettings, loading };
}
