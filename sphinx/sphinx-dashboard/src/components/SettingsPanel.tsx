import React, { useState } from 'react';
import { UserSettings, LocationState, SavedLocation } from '../lib/useSettings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  updateSettings: (s: Partial<UserSettings>) => void;
  currentViewState: LocationState;
  onJumpTo: (loc: LocationState) => void;
}

export default function SettingsPanel({ isOpen, onClose, settings, updateSettings, currentViewState, onJumpTo }: SettingsPanelProps) {
  const [newLocName, setNewLocName] = useState('');

  if (!isOpen) return null;

  const setHomeToCurrent = () => {
    updateSettings({ home_location: currentViewState });
  };

  const saveCurrentLocation = () => {
    if (!newLocName) return;
    const newLoc: SavedLocation = {
      id: Date.now().toString(),
      name: newLocName,
      ...currentViewState
    };
    updateSettings({ saved_locations: [...settings.saved_locations, newLoc] });
    setNewLocName('');
  };

  const removeLocation = (id: string) => {
    updateSettings({ saved_locations: settings.saved_locations.filter(l => l.id !== id) });
  };

  return (
    <div className="absolute top-0 right-0 h-screen w-96 bg-black/90 border-l border-cyan-900/50 p-6 z-50 text-white font-mono shadow-[-10px_0_30px_rgba(8,145,178,0.2)] backdrop-blur-md overflow-y-auto">
      <div className="flex justify-between items-center mb-6 border-b border-cyan-900/50 pb-2">
        <h2 className="text-xl font-bold text-cyan-400 tracking-widest">SYSTEM SETTINGS</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
      </div>

      {/* Home Location */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Default Home Location</h3>
        <div className="bg-black/50 border border-gray-800 p-3 rounded mb-3 text-xs text-gray-300">
          <div>Lat: {settings.home_location.lat.toFixed(4)}</div>
          <div>Lon: {settings.home_location.lon.toFixed(4)}</div>
          <div>Zoom: {settings.home_location.zoom.toFixed(1)}</div>
        </div>
        <button 
          onClick={setHomeToCurrent}
          className="w-full bg-cyan-900/30 border border-cyan-700/50 hover:bg-cyan-800/50 text-cyan-400 py-2 rounded text-sm transition-colors"
        >
          Set Home to Current View
        </button>
      </div>

      {/* Display Settings */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Display Settings</h3>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
            Enable Clustering
          </span>
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={settings.clustering_enabled}
              onChange={(e) => updateSettings({ clustering_enabled: e.target.checked })}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${settings.clustering_enabled ? 'bg-cyan-600' : 'bg-gray-800'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.clustering_enabled ? 'transform translate-x-4' : ''}`}></div>
          </div>
        </label>
      </div>

      {/* Layer Toggles */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">OSINT Layers</h3>
        <div className="space-y-2">
          {Object.entries(settings.layers).map(([layerId, isVisible]) => (
            <label key={layerId} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                {layerId.replace('_', ' ')}
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isVisible}
                  onChange={(e) => {
                    const newLayers = { ...settings.layers, [layerId]: e.target.checked };
                    updateSettings({ layers: newLayers });
                  }}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${isVisible ? 'bg-cyan-600' : 'bg-gray-800'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isVisible ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Saved Bookmarks */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Alternative Targets</h3>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Target Name (e.g. Tahoe)"
            value={newLocName}
            onChange={(e) => setNewLocName(e.target.value)}
            className="flex-1 bg-black/50 border border-gray-700 rounded px-3 text-sm focus:outline-none focus:border-cyan-500"
          />
          <button 
            onClick={saveCurrentLocation}
            className="bg-green-900/30 border border-green-700/50 hover:bg-green-800/50 text-green-400 px-3 py-1 rounded text-sm transition-colors"
          >
            Save
          </button>
        </div>

        <div className="space-y-2">
          {settings.saved_locations.map(loc => (
            <div key={loc.id} className="flex justify-between items-center bg-black/50 border border-gray-800 p-2 rounded group">
              <span className="text-sm text-gray-200">{loc.name}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onJumpTo(loc)} className="text-xs text-cyan-400 hover:text-cyan-300">JUMP</button>
                <button onClick={() => removeLocation(loc.id)} className="text-xs text-red-400 hover:text-red-300">DEL</button>
              </div>
            </div>
          ))}
          {settings.saved_locations.length === 0 && (
            <div className="text-xs text-gray-600 italic">No alternative targets saved.</div>
          )}
        </div>
      </div>
    </div>
  );
}
