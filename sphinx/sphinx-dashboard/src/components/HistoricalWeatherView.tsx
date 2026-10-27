"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudRain, 
  Snowflake, 
  Wind, 
  Thermometer, 
  Search, 
  Calendar, 
  Compass, 
  RefreshCw, 
  AlertTriangle, 
  Crosshair, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { 
  HistoricalWeatherSummary, 
  WeatherLocationSuggestion, 
  fetchHistoricalWeather, 
  searchWeatherLocations, 
  formatDate, 
  getCompassDirection,
  ktsToMph,
  ktsToKmh,
  cToF
} from '../lib/intelligence/historicalWeatherEngine';

interface HistoricalWeatherViewProps {
  currentCenter: { lat: number; lon: number };
  tempUnit: 'C' | 'F';
  speedUnit: 'knots' | 'mph' | 'kmh';
  onOpenAIWithQuery?: (query: string) => void;
}

type TimeframePreset = '7d' | '30d' | '90d' | '1y' | '5y' | 'custom';

export const HistoricalWeatherView: React.FC<HistoricalWeatherViewProps> = ({
  currentCenter,
  tempUnit,
  speedUnit,
  onOpenAIWithQuery
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; lat: number; lon: number }>({
    name: 'Current Map Center',
    lat: currentCenter.lat,
    lon: currentCenter.lon
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<WeatherLocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [timeframe, setTimeframe] = useState<TimeframePreset>('30d');
  
  // Custom date picker range (default past 30 days)
  const defaultEnd = new Date(Date.now() - 2 * 86400000);
  const defaultStart = new Date(defaultEnd.getTime() - 30 * 86400000);
  const [startDate, setStartDate] = useState(formatDate(defaultStart));
  const [endDate, setEndDate] = useState(formatDate(defaultEnd));

  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<HistoricalWeatherSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update dates when timeframe preset changes
  const handleTimeframeChange = (preset: TimeframePreset) => {
    setTimeframe(preset);
    const now = Date.now();
    const end = new Date(now - 2 * 86400000); // 2 days ago for ERA5
    let start = new Date(end.getTime() - 30 * 86400000);

    if (preset === '7d') start = new Date(end.getTime() - 7 * 86400000);
    else if (preset === '30d') start = new Date(end.getTime() - 30 * 86400000);
    else if (preset === '90d') start = new Date(end.getTime() - 90 * 86400000);
    else if (preset === '1y') start = new Date(end.getTime() - 365 * 86400000);
    else if (preset === '5y') start = new Date(end.getTime() - 5 * 365 * 86400000);

    if (preset !== 'custom') {
      setStartDate(formatDate(start));
      setEndDate(formatDate(end));
    }
  };

  // Fetch historical data
  const loadHistoricalData = async (loc = selectedLocation, sDate = startDate, eDate = endDate) => {
    setLoading(true);
    setError(null);
    try {
      const summary = await fetchHistoricalWeather({
        lat: loc.lat,
        lon: loc.lon,
        locationName: loc.name,
        startDate: sDate,
        endDate: eDate
      });
      setWeatherData(summary);
    } catch (err: any) {
      console.error('[HistoricalWeatherView] Load error:', err);
      setError('Failed to fetch historical reanalysis data.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load or on location/dates change
  useEffect(() => {
    loadHistoricalData(selectedLocation, startDate, endDate);
  }, [selectedLocation.lat, selectedLocation.lon, startDate, endDate]);

  // Autocomplete location search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!val.trim() || val.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsSearchingLocation(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchWeatherLocations(val);
      setSuggestions(results);
      setShowSuggestions(true);
      setIsSearchingLocation(false);
    }, 300);
  };

  const handleSelectLocation = (sugg: WeatherLocationSuggestion) => {
    const loc = {
      name: sugg.name,
      lat: sugg.lat,
      lon: sugg.lon
    };
    setSelectedLocation(loc);
    setSearchQuery(`${sugg.name} (${sugg.context || ''})`);
    setShowSuggestions(false);
  };

  const handleUseCurrentCenter = () => {
    const loc = {
      name: `Map Center (${currentCenter.lat.toFixed(2)}°N, ${currentCenter.lon.toFixed(2)}°W)`,
      lat: currentCenter.lat,
      lon: currentCenter.lon
    };
    setSelectedLocation(loc);
    setSearchQuery('');
  };

  // Conversion helpers
  const displayTemp = (c: number, f: number) => (tempUnit === 'F' ? `${f}°F` : `${c}°C`);
  const displaySpeed = (kts: number) => {
    if (speedUnit === 'mph') return `${ktsToMph(kts)} mph`;
    if (speedUnit === 'kmh') return `${ktsToKmh(kts)} km/h`;
    return `${kts} kts`;
  };

  const handleAskAI = () => {
    if (!onOpenAIWithQuery || !weatherData) return;
    const q = `Analyze historical atmospheric reanalysis for ${weatherData.locationName} between ${weatherData.startDate} and ${weatherData.endDate}. Break down temperature extremes, rainfall/snowfall accumulation, peak wind vectors, and flood/freeze risks.`;
    onOpenAIWithQuery(q);
  };

  return (
    <div data-testid="historical-weather-view" className="space-y-4">
      {/* Location Search & Selection Header */}
      <div className="bg-neutral-950/90 border border-sky-500/30 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-sky-400">
          <div className="flex items-center gap-1.5">
            <Search size={13} />
            <span>SELECT HISTORICAL TARGET LOCATION:</span>
          </div>
          <button
            type="button"
            data-testid="btn-use-current-map-weather"
            onClick={handleUseCurrentCenter}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-sky-300 hover:underline transition-colors"
          >
            <Crosshair size={11} />
            <span>Use Current Map Center</span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            data-testid="input-weather-location-search"
            value={searchQuery}
            placeholder={`Search any city, airport, address, or zip... (${selectedLocation.name})`}
            onChange={handleSearchChange}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            className="w-full bg-slate-900/90 border border-sky-800/60 rounded-lg pl-8 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 shadow-inner"
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          {isSearchingLocation && (
            <RefreshCw size={12} className="absolute right-3 top-3 text-sky-400 animate-spin" />
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div 
              data-testid="weather-location-suggestions"
              className="absolute left-0 right-0 top-full mt-1 bg-black/95 border border-sky-700/80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 overflow-hidden text-xs divide-y divide-sky-950/60 max-h-56 overflow-y-auto"
            >
              {suggestions.map((s, idx) => (
                <button
                  key={`${s.name}-${idx}`}
                  type="button"
                  data-testid={`weather-suggestion-${idx}`}
                  onClick={() => handleSelectLocation(s)}
                  className="w-full text-left px-3 py-2 hover:bg-sky-950/50 flex items-center justify-between transition-colors group"
                >
                  <div className="truncate">
                    <span className="font-bold text-white group-hover:text-sky-300">{s.name}</span>
                    {s.context && <span className="text-gray-400 text-[10px] ml-1.5 truncate">({s.context})</span>}
                  </div>
                  <span className="text-[9px] text-sky-400 font-mono shrink-0 ml-2">SELECT ➔</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Target Location Pill */}
        <div className="flex items-center justify-between text-[11px] pt-0.5 text-gray-300">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-gray-500">TARGET:</span>
            <span data-testid="active-weather-location-name" className="text-sky-300 font-bold truncate">
              {selectedLocation.name}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 shrink-0 font-mono ml-2">
            {selectedLocation.lat.toFixed(3)}°N, {selectedLocation.lon.toFixed(3)}°W
          </span>
        </div>
      </div>

      {/* Timeframe Presets & Date Range */}
      <div className="bg-neutral-950/80 border border-sky-500/20 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-sky-400" />
            <span>HISTORICAL TIMEFRAME:</span>
          </div>
          <span className="text-[10px] text-sky-400">ERA5 1940-Present Archive</span>
        </div>

        <div className="grid grid-cols-6 gap-1 bg-black/60 p-1 rounded-lg border border-sky-900/40 text-[11px]">
          {(['7d', '30d', '90d', '1y', '5y', 'custom'] as const).map(p => (
            <button
              key={p}
              type="button"
              data-testid={`timeframe-btn-${p}`}
              onClick={() => handleTimeframeChange(p)}
              className={`py-1 rounded font-bold uppercase transition-all ${
                timeframe === p
                  ? 'bg-sky-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.5)] font-extrabold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : p === '90d' ? '90 Days' : p === '1y' ? '1 Year' : p === '5y' ? '5 Years' : 'Custom'}
            </button>
          ))}
        </div>

        {/* Custom Date Pickers */}
        {timeframe === 'custom' && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Start Date:</label>
              <input
                type="date"
                data-testid="input-weather-start-date"
                value={startDate}
                min="1940-01-01"
                max={endDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-sky-900 rounded p-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">End Date:</label>
              <input
                type="date"
                data-testid="input-weather-end-date"
                value={endDate}
                min={startDate}
                max={formatDate(new Date())}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-slate-900 border border-sky-900 rounded p-1.5 text-xs text-white"
              />
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-sky-400">
          <RefreshCw size={24} className="animate-spin" />
          <span className="text-xs font-mono font-bold">Querying ECMWF ERA5 Reanalysis Archive...</span>
        </div>
      )}

      {error && !loading && (
        <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      {weatherData && !loading && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Temperature Extrema */}
            <div data-testid="kpi-temp" className="bg-black/60 border border-amber-500/40 rounded-xl p-2.5 space-y-1">
              <div className="flex items-center justify-between text-amber-400">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                  <Thermometer size={12} />
                  <span>TEMPERATURE</span>
                </div>
                {weatherData.freezingDays > 0 && (
                  <span className="text-[9px] px-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {weatherData.freezingDays}d Freeze
                  </span>
                )}
              </div>
              <div className="text-sm font-extrabold text-white flex items-baseline justify-between">
                <span>{displayTemp(weatherData.tempHighC, weatherData.tempHighF)}</span>
                <span className="text-[10px] text-gray-400 font-normal">High</span>
              </div>
              <div className="text-xs font-bold text-gray-400 flex items-baseline justify-between border-t border-white/5 pt-1">
                <span>{displayTemp(weatherData.tempLowC, weatherData.tempLowF)}</span>
                <span className="text-[10px] text-gray-500 font-normal">Low</span>
              </div>
              <div className="text-[9px] text-gray-500">Avg: {displayTemp(weatherData.tempMeanC, weatherData.tempMeanF)}</div>
            </div>

            {/* Rain Accumulation */}
            <div data-testid="kpi-rain" className="bg-black/60 border border-blue-500/40 rounded-xl p-2.5 space-y-1">
              <div className="flex items-center justify-between text-blue-400">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                  <CloudRain size={12} />
                  <span>RAIN ACCUM</span>
                </div>
                <span className="text-[9px] text-gray-400">{weatherData.rainDays}d rain</span>
              </div>
              <div className="text-base font-extrabold text-blue-300">
                {weatherData.totalRainIn} in
                <span className="text-[10px] text-gray-400 ml-1 font-normal">({weatherData.totalRainMm} mm)</span>
              </div>
              <div className="text-[10px] text-gray-400 border-t border-white/5 pt-1">
                Max Day: <span className="text-white font-bold">{weatherData.maxDailyPrecipIn}"</span>
              </div>
              <div className="text-[9px] text-gray-500 truncate">{weatherData.maxDailyPrecipDate}</div>
            </div>

            {/* Snow Accumulation */}
            <div data-testid="kpi-snow" className="bg-black/60 border border-cyan-400/40 rounded-xl p-2.5 space-y-1">
              <div className="flex items-center justify-between text-cyan-300">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                  <Snowflake size={12} />
                  <span>SNOW ACCUM</span>
                </div>
                <span className="text-[9px] text-gray-400">{weatherData.snowDays}d snow</span>
              </div>
              <div className="text-base font-extrabold text-cyan-200">
                {weatherData.totalSnowIn} in
                <span className="text-[10px] text-gray-400 ml-1 font-normal">({weatherData.totalSnowCm} cm)</span>
              </div>
              <div className="text-[10px] text-gray-400 border-t border-white/5 pt-1">
                Max Day: <span className="text-white font-bold">{weatherData.maxDailySnowIn}"</span>
              </div>
              <div className="text-[9px] text-gray-500 truncate">{weatherData.maxDailySnowDate}</div>
            </div>

            {/* Wind & Gusts */}
            <div data-testid="kpi-wind" className="bg-black/60 border border-teal-500/40 rounded-xl p-2.5 space-y-1">
              <div className="flex items-center justify-between text-teal-400">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                  <Wind size={12} />
                  <span>WIND & GUSTS</span>
                </div>
                {weatherData.galeDays > 0 && (
                  <span className="text-[9px] px-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                    {weatherData.galeDays}d Gale
                  </span>
                )}
              </div>
              <div className="text-sm font-extrabold text-teal-300 flex items-baseline justify-between">
                <span>{displaySpeed(weatherData.maxWindGustKts)}</span>
                <span className="text-[10px] text-gray-400 font-normal">Peak Gust</span>
              </div>
              <div className="text-xs font-bold text-gray-400 flex items-baseline justify-between border-t border-white/5 pt-1">
                <span>{displaySpeed(weatherData.maxWindSpeedKts)}</span>
                <span className="text-[10px] text-gray-500 font-normal">Max Sust.</span>
              </div>
              <div className="text-[9px] text-gray-500">
                Vector: {weatherData.dominantWindDir}° ({getCompassDirection(weatherData.dominantWindDir)})
              </div>
            </div>
          </div>

          {/* AI Intelligence Access Handoff Button */}
          {onOpenAIWithQuery && (
            <button
              type="button"
              data-testid="btn-ai-analyze-historical-weather"
              onClick={handleAskAI}
              className="w-full py-2 px-3 bg-gradient-to-r from-cyan-950 via-sky-900 to-blue-950 hover:from-cyan-900 hover:to-blue-900 border border-cyan-500/70 text-cyan-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all group"
            >
              <Sparkles size={14} className="text-cyan-400 group-hover:animate-spin" />
              <span>Ask Sphinx Tactical AI to Analyze This Historical Weather Archive</span>
              <ArrowRight size={13} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Daily Records Timeline */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 px-1">
              <span>DAILY OBSERVATION LOG ({weatherData.records.length} DAYS)</span>
              <span className="text-[10px] text-sky-400">Chronological ERA5 Feed</span>
            </div>

            <div 
              data-testid="weather-daily-records-list"
              className="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar text-[11px]"
            >
              {weatherData.records.map((r, idx) => (
                <div
                  key={r.date}
                  data-testid={`daily-record-row-${idx}`}
                  className="bg-black/50 border border-white/5 hover:border-sky-500/40 p-2 rounded-lg flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-400">{r.date}</span>
                    <span className="font-bold text-white">
                      {displayTemp(r.tempMaxC, r.tempMaxF)} / {displayTemp(r.tempMinC, r.tempMinF)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    {r.rainIn > 0 && (
                      <span className="text-blue-400 font-bold flex items-center gap-0.5">
                        <Droplets size={10} />
                        {r.rainIn}"
                      </span>
                    )}
                    {r.snowfallIn > 0 && (
                      <span className="text-cyan-300 font-bold flex items-center gap-0.5">
                        <Snowflake size={10} />
                        {r.snowfallIn}"
                      </span>
                    )}
                    <span className="text-gray-400 font-mono">
                      💨 {displaySpeed(r.windGustMaxKts)} ({getCompassDirection(r.windDirDominant)})
                    </span>
                    {r.isGaleDay ? (
                      <span className="text-[9px] px-1 rounded bg-amber-950 text-amber-300 font-bold">GALE</span>
                    ) : r.isSnowDay ? (
                      <span className="text-[9px] px-1 rounded bg-cyan-950 text-cyan-300 font-bold">SNOW</span>
                    ) : r.isRainDay ? (
                      <span className="text-[9px] px-1 rounded bg-blue-950 text-blue-300 font-bold">RAIN</span>
                    ) : r.isFreezing ? (
                      <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-300">FRZ</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
