import React from 'react';
import { Wind, CloudRain, Droplets, Thermometer, Navigation, Calendar } from 'lucide-react';

export interface HourlyForecastItem {
  time: string;
  hourLabel: string;
  tempC: number;
  tempF: number;
  humidity: number;
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDeg: number;
  precipProb: number;
}

export interface DailyForecastItem {
  date: string;
  dayLabel: string;
  tempMaxC: number;
  tempMaxF: number;
  tempMinC: number;
  tempMinF: number;
  windMaxKnots: number;
  gustMaxKnots: number;
  windDirDominant: number;
  precipSumMm: number;
  precipProbMax: number;
  weatherCode: number;
}

export interface MonthlyClimateNormal {
  month: string;
  monthIndex: number;
  meanTempC: number;
  meanTempF: number;
  avgHighC: number;
  avgHighF: number;
  avgLowC: number;
  avgLowF: number;
  precipMm: number;
}

interface HourlyViewProps {
  items: HourlyForecastItem[];
  unit: 'knots' | 'mph' | 'kmh';
  tempUnit: 'C' | 'F';
  convertSpeed: (kts: number) => string;
}

export const HourlyForecastView: React.FC<HourlyViewProps> = ({ items, tempUnit, convertSpeed }) => {
  if (!items || items.length === 0) {
    return <div className="text-gray-400 text-center py-6">No hourly telemetry available.</div>;
  }

  return (
    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
      <div className="flex justify-between items-center text-[10px] text-gray-400 px-1 font-bold">
        <span>TIME // TEMPERATUE</span>
        <span>WIND VECTOR & GUSTS</span>
        <span>PRECIP / HUMIDITY</span>
      </div>
      {items.map((item, idx) => {
        const temp = tempUnit === 'F' ? `${item.tempF}°F` : `${item.tempC}°C`;
        return (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-sky-500/30 transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-sky-400 w-12 text-[11px]">{item.hourLabel}</span>
              <span className="font-bold text-white">{temp}</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 flex items-center justify-center text-sky-300"
                style={{ transform: `rotate(${item.windDirectionDeg}deg)` }}
                title={`${item.windDirectionDeg}°`}
              >
                <Navigation size={12} className="fill-sky-400" />
              </div>
              <span className="text-gray-200 text-[11px]">{convertSpeed(item.windSpeedKnots)}</span>
              {item.windGustKnots > item.windSpeedKnots * 1.2 && (
                <span className="text-amber-400 text-[10px] font-bold">G{convertSpeed(item.windGustKnots)}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-cyan-400 text-[10px]">
                <CloudRain size={11} />
                <span>{item.precipProb}%</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                <Droplets size={11} />
                <span>{item.humidity}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface DailyViewProps {
  items: DailyForecastItem[];
  tempUnit: 'C' | 'F';
  convertSpeed: (kts: number) => string;
}

export const DailyForecastView: React.FC<DailyViewProps> = ({ items, tempUnit, convertSpeed }) => {
  if (!items || items.length === 0) {
    return <div className="text-gray-400 text-center py-6">No daily forecast available.</div>;
  }

  return (
    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
      {items.map((day, idx) => {
        const maxT = tempUnit === 'F' ? `${day.tempMaxF}°F` : `${day.tempMaxC}°C`;
        const minT = tempUnit === 'F' ? `${day.tempMinF}°F` : `${day.tempMinC}°C`;
        return (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-amber-500/30 transition-colors flex items-center justify-between text-xs"
          >
            <div className="w-24">
              <div className="font-bold text-white text-[11px]">{day.dayLabel}</div>
              <div className="text-[10px] text-gray-500">{day.date}</div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300">{maxT}</span>
              <span className="text-gray-500 text-[10px]">/</span>
              <span className="text-sky-300">{minT}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px]">
              <Wind size={12} className="text-sky-400" />
              <span className="text-gray-300">{convertSpeed(day.windMaxKnots)}</span>
              <span className="text-amber-400 text-[10px]">G{convertSpeed(day.gustMaxKnots)}</span>
            </div>

            <div className="flex items-center gap-1 text-cyan-400 text-[10px] min-w-[50px] justify-end">
              <CloudRain size={11} />
              <span>{day.precipProbMax}% ({day.precipSumMm}mm)</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface MonthlyClimateViewProps {
  normals: MonthlyClimateNormal[];
  tempUnit: 'C' | 'F';
}

export const MonthlyClimateView: React.FC<MonthlyClimateViewProps> = ({ normals, tempUnit }) => {
  if (!normals || normals.length === 0) {
    return <div className="text-gray-400 text-center py-6">No climate normals available.</div>;
  }

  const currentMonthIdx = new Date().getMonth();

  return (
    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
      <div className="bg-sky-950/40 border border-sky-500/30 rounded-lg p-2 text-[11px] text-sky-300 flex items-center gap-2">
        <Calendar size={14} className="shrink-0" />
        <span>30-Year Climatological Average Temperatures & Seasonal Baseline</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {normals.map((m, idx) => {
          const isCurrent = idx === currentMonthIdx;
          const high = tempUnit === 'F' ? `${m.avgHighF}°F` : `${m.avgHighC}°C`;
          const low = tempUnit === 'F' ? `${m.avgLowF}°F` : `${m.avgLowC}°C`;
          const mean = tempUnit === 'F' ? `${m.meanTempF}°F` : `${m.meanTempC}°C`;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs transition-colors ${
                isCurrent
                  ? 'bg-sky-950/70 border-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'bg-neutral-900/60 border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold text-xs ${isCurrent ? 'text-sky-300' : 'text-gray-300'}`}>
                  {m.month} {isCurrent && <span className="text-[9px] uppercase px-1 bg-sky-600 rounded text-white ml-1">Current</span>}
                </span>
                <span className="text-[10px] text-gray-400">{m.precipMm} mm/mo</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <div className="text-gray-400 text-[10px]">High: <span className="text-amber-400 font-bold">{high}</span></div>
                <div className="text-gray-400 text-[10px]">Low: <span className="text-sky-400 font-bold">{low}</span></div>
              </div>
              <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                <Thermometer size={10} />
                <span>Mean: <strong className="text-white">{mean}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
