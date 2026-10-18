import React, { useState } from 'react';
import { UserSettings, LocationState, SavedLocation, CursorShape } from '../lib/useSettings';
import { CURSOR_SHAPES } from './CustomCursor';

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

      {/* Custom Cursor Settings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Custom Cursor</h3>
          <button
            type="button"
            onClick={() => updateSettings({
              cursor: { shape: 'sun', color: '#00e5ff', secondaryColor: '#fb7185', opacity: 1.0 }
            })}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
          >
            RESET
          </button>
        </div>

        {/* Cursor Shape Grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.entries(CURSOR_SHAPES).map(([key, item]) => {
            const isSelected = (settings.cursor?.shape || 'sun') === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => updateSettings({
                  cursor: {
                    ...(settings.cursor || { color: '#00e5ff', opacity: 1.0 }),
                    shape: key as CursorShape
                  }
                })}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] text-cyan-300'
                    : 'bg-black/40 border-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-[10px] font-semibold tracking-wide truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Color & Presets */}
        <div className="bg-black/50 border border-gray-800 p-3 rounded mb-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300 uppercase tracking-wider">Cursor Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.cursor?.color || '#00e5ff'}
                onChange={(e) => updateSettings({
                  cursor: {
                    ...(settings.cursor || { shape: 'sun', opacity: 1.0 }),
                    color: e.target.value
                  }
                })}
                className="w-7 h-7 rounded border border-gray-700 bg-transparent cursor-pointer p-0"
              />
              <span className="text-xs text-cyan-400 font-mono">
                {settings.cursor?.color || '#00e5ff'}
              </span>
            </div>
          </div>

          {/* Quick Swatches */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-900">
            {['#00e5ff', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#a855f7', '#ffffff'].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => updateSettings({
                  cursor: {
                    ...(settings.cursor || { shape: 'sun', opacity: 1.0 }),
                    color: hex
                  }
                })}
                style={{ backgroundColor: hex }}
                className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${
                  settings.cursor?.color === hex ? 'ring-2 ring-white scale-110' : 'border-gray-700'
                }`}
                title={hex}
              />
            ))}
          </div>

          {/* Opacity Slider */}
          <div className="pt-2 border-t border-gray-900">
            <div className="flex justify-between items-center text-xs text-gray-300 mb-1">
              <span>Opacity</span>
              <span className="font-mono text-cyan-400">
                {Math.round((settings.cursor?.opacity ?? 1.0) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={settings.cursor?.opacity ?? 1.0}
              onChange={(e) => updateSettings({
                cursor: {
                  ...(settings.cursor || { shape: 'sun', color: '#00e5ff' }),
                  opacity: parseFloat(e.target.value)
                }
              })}
              className="w-full accent-cyan-500 bg-gray-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>
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

      {/* Custom Pins Manager */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center justify-between">
          <span>Custom Map Pins</span>
          <span className="text-xs text-purple-400 font-mono">{(settings.custom_pins || []).length} PINS</span>
        </h3>
        
        <div className="space-y-2">
          {(settings.custom_pins || []).map(pin => (
            <div key={pin.id} className="bg-black/50 border border-gray-800 p-2.5 rounded group hover:border-purple-800 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pin.color || '#a855f7' }} />
                  <span className="text-sm text-gray-200 font-bold truncate">{pin.label}</span>
                </div>
                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                  <button 
                    onClick={() => onJumpTo({ lat: pin.lat, lon: pin.lon, zoom: 14 })} 
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    JUMP
                  </button>
                  <button 
                    onClick={() => updateSettings({ custom_pins: (settings.custom_pins || []).filter(p => p.id !== pin.id) })} 
                    className="text-xs text-red-400 hover:text-red-300 font-mono"
                  >
                    DEL
                  </button>
                </div>
              </div>
              {pin.description && (
                <div className="text-xs text-gray-400 line-clamp-2 mb-1">{pin.description}</div>
              )}
              <div className="text-[10px] text-gray-500 font-mono">
                {pin.category || 'Tactical'} • Lat: {pin.lat.toFixed(4)}, Lon: {pin.lon.toFixed(4)}
              </div>
            </div>
          ))}
          {(!settings.custom_pins || settings.custom_pins.length === 0) && (
            <div className="text-xs text-gray-600 italic">No custom pins saved. Use &quot;Drop Pin&quot; on map or right-click to place.</div>
          )}
        </div>
      </div>
    </div>
  );
}
