// A service layer for fetching weather data
// We can easily swap this out for Apple WeatherKit later

const DEFAULT_LAT = 50.1163; // Whistler Blackcomb
const DEFAULT_LON = -122.9574;

export const fetchMountainWeather = async (lat = DEFAULT_LAT, lon = DEFAULT_LON) => {
  try {
    // Open-Meteo API for current weather and daily snow data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=snow_depth&daily=snowfall_sum&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    const data = await response.json();
    
    // Parse weather code to a readable string (WMO codes)
    let condition = "Clear";
    const code = data.current.weather_code;
    if (code >= 71 && code <= 77) condition = "Snowing";
    else if (code >= 61 && code <= 67) condition = "Raining";
    else if (code >= 1 && code <= 3) condition = "Partly Cloudy";
    
    return {
      temperature: data.current.temperature_2m,
      condition,
      snowfall: data.daily.snowfall_sum[0] || 0, // cm
      snowDepth: data.hourly.snow_depth[0] || 0 // meters
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
