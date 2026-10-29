// Wrapper for FBI CDE API (Historical Crime Data)
const FBI_CDE_BASE_URL = 'https://api.usa.gov/crime/fbi/sapi/api';

export const fetchHistoricalCrimeData = async (stateAbbr) => {
  // Requires an API key in production, using a demo key or fallback
  const apiKey = process.env.FBI_CDE_API_KEY || 'DEMO_KEY';
  try {
    // Example: fetch estimated crime stats for a state
    const res = await fetch(`${FBI_CDE_BASE_URL}/estimates/states/${stateAbbr}/2010/2020?api_key=${apiKey}`);
    if (!res.ok) throw new Error('FBI API returned ' + res.status);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('[Sphinx Crime] Error fetching historical data:', error.message);
    return [];
  }
};
