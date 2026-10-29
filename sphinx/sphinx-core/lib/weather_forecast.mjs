// sphinx-core/lib/weather_forecast.mjs
// Multi-horizon weather and wind forecast service with Open-Meteo integration & climate averages

import fetch from 'node-fetch';

export class WeatherForecastService {
  constructor() {
    this.cache = new Map();
    this.cacheTtlMs = 300000; // 5 minutes
  }

  getMonthlyClimateNormals(lat) {
    // Climatological standard normals based on latitude and solar insolation
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const isNorthern = lat >= 0;
    const absLat = Math.min(Math.abs(lat), 75);
    
    // Baseline mean annual temperature roughly decreases with latitude
    const annualMean = 28 - (absLat * 0.55);
    // Seasonal amplitude increases with latitude
    const amplitude = 3 + (absLat * 0.28);
    
    return months.map((month, idx) => {
      // Phase angle: Peak in July (month 6) for North, Jan (month 0) for South
      const phase = isNorthern ? (idx - 6) : idx;
      const seasonalFactor = Math.cos((phase / 12) * 2 * Math.PI);
      const meanC = Math.round((annualMean - (amplitude * seasonalFactor)) * 10) / 10;
      const diurnalSpread = 6 + (absLat * 0.08);
      const highC = Math.round((meanC + diurnalSpread / 2) * 10) / 10;
      const lowC = Math.round((meanC - diurnalSpread / 2) * 10) / 10;
      
      const precipMm = Math.round(Math.max(15, 60 + 35 * Math.sin((idx / 12) * 2 * Math.PI)));

      return {
        month,
        monthIndex: idx + 1,
        meanTempC: meanC,
        meanTempF: Math.round(((meanC * 9) / 5 + 32) * 10) / 10,
        avgHighC: highC,
        avgHighF: Math.round(((highC * 9) / 5 + 32) * 10) / 10,
        avgLowC: lowC,
        avgLowF: Math.round(((lowC * 9) / 5 + 32) * 10) / 10,
        precipMm
      };
    });
  }

  generateFallbackForecast(lat, lon) {
    const monthly = this.getMonthlyClimateNormals(lat);
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    const currentNormal = monthly[currentMonthIdx];
    const baseTemp = currentNormal.meanTempC;

    const hourly = [];
    for (let i = 0; i < 48; i++) {
      const forecastTime = new Date(now.getTime() + i * 3600000);
      const hour = forecastTime.getHours();
      // Diurnal temp curve (lowest at 5 AM, highest at 3 PM)
      const diurnal = Math.sin(((hour - 9) / 24) * 2 * Math.PI);
      const tempC = Math.round((baseTemp + diurnal * 4) * 10) / 10;
      const windSpeedKnots = Math.round((12 + Math.sin(i / 4) * 5) * 10) / 10;
      const windGustKnots = Math.round((windSpeedKnots * 1.45) * 10) / 10;
      const windDirectionDeg = Math.round((240 + Math.sin(i / 6) * 45) % 360);

      hourly.push({
        time: forecastTime.toISOString(),
        hourLabel: forecastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tempC,
        tempF: Math.round(((tempC * 9) / 5 + 32) * 10) / 10,
        humidity: Math.round(55 + diurnal * -15),
        windSpeedKnots,
        windGustKnots,
        windDirectionDeg,
        precipProb: Math.round(Math.max(0, Math.sin(i / 5) * 40))
      });
    }

    const daily = [];
    for (let d = 0; d < 14; d++) {
      const dayDate = new Date(now.getTime() + d * 86400000);
      const maxC = Math.round((currentNormal.avgHighC + (Math.sin(d) * 3)) * 10) / 10;
      const minC = Math.round((currentNormal.avgLowC + (Math.sin(d) * 2)) * 10) / 10;
      daily.push({
        date: dayDate.toISOString().split('T')[0],
        dayLabel: d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dayDate.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' }),
        tempMaxC: maxC,
        tempMaxF: Math.round(((maxC * 9) / 5 + 32) * 10) / 10,
        tempMinC: minC,
        tempMinF: Math.round(((minC * 9) / 5 + 32) * 10) / 10,
        windMaxKnots: Math.round(16 + Math.sin(d * 1.5) * 6),
        gustMaxKnots: Math.round(24 + Math.sin(d * 1.5) * 8),
        windDirDominant: 245,
        precipSumMm: Math.round(Math.max(0, Math.sin(d) * 6) * 10) / 10,
        precipProbMax: Math.round(Math.max(10, Math.sin(d * 0.8) * 60)),
        weatherCode: 1
      });
    }

    return {
      success: true,
      cached: false,
      isFallback: true,
      location: { lat, lon },
      current: {
        tempC: baseTemp,
        tempF: Math.round(((baseTemp * 9) / 5 + 32) * 10) / 10,
        humidity: 60,
        pressureHpa: 1013.2,
        windSpeedKnots: 15.2,
        windGustKnots: 22.8,
        windDirectionDeg: 245,
        stormWarning: false
      },
      hourly,
      daily: daily.slice(0, 7),
      weekly: daily,
      monthly
    };
  }

  async getForecast(rawLat, rawLon) {
    const lat = parseFloat(rawLat) || 38.907;
    const lon = parseFloat(rawLon) || -77.037;
    const key = `${lat.toFixed(2)}_${lon.toFixed(2)}`;
    const now = Date.now();

    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (now - cached.time < this.cacheTtlMs) {
        return { ...cached.data, cached: true };
      }
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}&longitude=${lon.toFixed(3)}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&forecast_days=14&wind_speed_unit=kn&timezone=auto`;

      const res = await fetch(url, {
        headers: { 'User-Agent': 'SphinxTactical/2.0' },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const raw = await res.json();
        const curr = raw.current || {};
        const hourlyRaw = raw.hourly || {};
        const dailyRaw = raw.daily || {};

        const speed = Number(curr.wind_speed_10m) || 12;
        const gust = Number(curr.wind_gusts_10m) || speed * 1.4;
        const pres = Number(curr.surface_pressure) || 1013.25;
        const tempC = Number(curr.temperature_2m) || 18;

        const hourly = [];
        const times = hourlyRaw.time || [];
        const limit = Math.min(times.length, 48);
        for (let i = 0; i < limit; i++) {
          const t = new Date(times[i]);
          const hTemp = Number(hourlyRaw.temperature_2m?.[i]) ?? tempC;
          const hWind = Number(hourlyRaw.wind_speed_10m?.[i]) ?? speed;
          hourly.push({
            time: times[i],
            hourLabel: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tempC: Math.round(hTemp * 10) / 10,
            tempF: Math.round(((hTemp * 9) / 5 + 32) * 10) / 10,
            humidity: Math.round(Number(hourlyRaw.relative_humidity_2m?.[i]) || 60),
            windSpeedKnots: Math.round(hWind * 10) / 10,
            windGustKnots: Math.round((Number(hourlyRaw.wind_gusts_10m?.[i]) || hWind * 1.35) * 10) / 10,
            windDirectionDeg: Math.round(Number(hourlyRaw.wind_direction_10m?.[i]) || 0),
            precipProb: Math.round(Number(hourlyRaw.precipitation_probability?.[i]) || 0)
          });
        }

        const daily = [];
        const dDates = dailyRaw.time || [];
        for (let d = 0; d < dDates.length; d++) {
          const dt = new Date(dDates[d]);
          const maxC = Number(dailyRaw.temperature_2m_max?.[d]) || tempC + 4;
          const minC = Number(dailyRaw.temperature_2m_min?.[d]) || tempC - 4;
          daily.push({
            date: dDates[d],
            dayLabel: d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dt.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' }),
            tempMaxC: Math.round(maxC * 10) / 10,
            tempMaxF: Math.round(((maxC * 9) / 5 + 32) * 10) / 10,
            tempMinC: Math.round(minC * 10) / 10,
            tempMinF: Math.round(((minC * 9) / 5 + 32) * 10) / 10,
            windMaxKnots: Math.round((Number(dailyRaw.wind_speed_10m_max?.[d]) || speed) * 10) / 10,
            gustMaxKnots: Math.round((Number(dailyRaw.wind_gusts_10m_max?.[d]) || gust) * 10) / 10,
            windDirDominant: Math.round(Number(dailyRaw.wind_direction_10m_dominant?.[d]) || 240),
            precipSumMm: Math.round((Number(dailyRaw.precipitation_sum?.[d]) || 0) * 10) / 10,
            precipProbMax: Math.round(Number(dailyRaw.precipitation_probability_max?.[d]) || 0),
            weatherCode: Number(dailyRaw.weather_code?.[d]) || 0
          });
        }

        const payload = {
          success: true,
          cached: false,
          isFallback: false,
          location: { lat, lon },
          current: {
            tempC: Math.round(tempC * 10) / 10,
            tempF: Math.round(((tempC * 9) / 5 + 32) * 10) / 10,
            humidity: Math.round(Number(curr.relative_humidity_2m) || 60),
            pressureHpa: Math.round(pres * 10) / 10,
            windSpeedKnots: Math.round(speed * 10) / 10,
            windGustKnots: Math.round(gust * 10) / 10,
            windDirectionDeg: Math.round(Number(curr.wind_direction_10m) || 0),
            stormWarning: pres < 1005 || gust > 35
          },
          hourly,
          daily: daily.slice(0, 7),
          weekly: daily,
          monthly: this.getMonthlyClimateNormals(lat)
        };

        this.cache.set(key, { time: now, data: payload });
        return payload;
      }
    } catch (err) {
      // Return fallback below
    }

    const fallback = this.generateFallbackForecast(lat, lon);
    this.cache.set(key, { time: now, data: fallback });
    return fallback;
  }
}
