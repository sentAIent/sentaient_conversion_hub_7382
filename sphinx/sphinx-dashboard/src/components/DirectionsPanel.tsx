"use client";
import React, { useState } from 'react';
import { fetchDirections, DirectionsResult } from '../lib/directionsService';

interface DirectionsPanelProps {
  onRouteCalculated: (result: DirectionsResult | null) => void;
}

export function DirectionsPanel({ onRouteCalculated }: DirectionsPanelProps) {
  const [origin, setOrigin] = useState("-118.2437,34.0522"); // Default LA
  const [destination, setDestination] = useState("-118.4912,34.0195"); // Default Santa Monica
  const [timeMode, setTimeMode] = useState<'now' | 'custom'>('now');
  const [customTime, setCustomTime] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DirectionsResult | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const [origLng, origLat] = origin.split(',').map(Number);
      const [destLng, destLat] = destination.split(',').map(Number);
      
      if (isNaN(origLng) || isNaN(destLng)) {
        alert("Please enter valid coordinates format: lng,lat");
        return;
      }

      let departAt = undefined;
      if (timeMode === 'custom' && customTime) {
        departAt = new Date(customTime);
      } else {
        departAt = new Date(); // now
      }

      const res = await fetchDirections(origLng, origLat, destLng, destLat, departAt);
      setResult(res);
      onRouteCalculated(res);
    } catch (e) {
      console.error(e);
      alert("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    setResult(null);
    onRouteCalculated(null);
  }

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
      case 'severe': return 'text-red-500';
      case 'heavy': return 'text-orange-500';
      case 'moderate': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 w-80 text-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Traffic Routes</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Origin (Lng,Lat)</label>
          <input 
            type="text"
            className="w-full px-3 py-2 bg-slate-100 rounded-lg text-slate-800 border border-transparent focus:border-blue-500 focus:outline-none"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination (Lng,Lat)</label>
          <input 
            type="text"
            className="w-full px-3 py-2 bg-slate-100 rounded-lg text-slate-800 border border-transparent focus:border-blue-500 focus:outline-none"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Departure Time</label>
          <select 
            className="w-full px-3 py-2 bg-slate-100 rounded-lg text-slate-800 mb-2 focus:outline-none"
            value={timeMode}
            onChange={e => setTimeMode(e.target.value as 'now' | 'custom')}
          >
            <option value="now">Leave Now</option>
            <option value="custom">Predictive (Any Day/Time)</option>
          </select>

          {timeMode === 'custom' && (
            <input 
              type="datetime-local" 
              className="w-full px-3 py-2 bg-slate-100 rounded-lg text-slate-800 focus:outline-none"
              value={customTime}
              onChange={e => setCustomTime(e.target.value)}
            />
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {loading ? 'Calculating...' : 'Get Directions'}
          </button>
          
          {result && (
            <button 
              onClick={clearRoute}
              className="px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-2">Route Summary</h3>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-500">Estimated Time:</span>
            <span className={`font-bold text-lg ${getTrafficColor(result.trafficCongestion)}`}>
              {formatDuration(result.duration)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Distance:</span>
            <span className="font-semibold text-slate-700">
              {(result.distance / 1000).toFixed(1)} km
            </span>
          </div>
          {result.trafficCongestion && (
            <div className="mt-2 text-xs text-slate-400">
              Traffic Conditions: <span className="font-semibold capitalize">{result.trafficCongestion}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
