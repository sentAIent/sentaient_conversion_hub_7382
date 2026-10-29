// Strategic Airport Hub Database for Multi-Modal Flight Corridors
// Contains major domestic and international hubs with IATA codes, coordinates, and runway profiles.

export interface AirportHub {
  iata: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  elevationFt: number;
  type: 'commercial_large' | 'commercial_medium' | 'general_aviation';
}

export const STRATEGIC_AIRPORTS: AirportHub[] = [
  // Northeast
  { iata: 'JFK', name: 'John F. Kennedy Intl', city: 'New York, NY', lat: 40.6413, lng: -73.7781, elevationFt: 13, type: 'commercial_large' },
  { iata: 'EWR', name: 'Newark Liberty Intl', city: 'Newark/NYC, NJ', lat: 40.6895, lng: -74.1745, elevationFt: 18, type: 'commercial_large' },
  { iata: 'LGA', name: 'LaGuardia', city: 'New York, NY', lat: 40.7769, lng: -73.8740, elevationFt: 21, type: 'commercial_large' },
  { iata: 'BOS', name: 'Boston Logan Intl', city: 'Boston, MA', lat: 42.3656, lng: -71.0096, elevationFt: 20, type: 'commercial_large' },
  { iata: 'PHL', name: 'Philadelphia Intl', city: 'Philadelphia, PA', lat: 39.8729, lng: -75.2408, elevationFt: 36, type: 'commercial_large' },
  { iata: 'BWI', name: 'Baltimore/Washington Intl', city: 'Baltimore, MD', lat: 39.1774, lng: -76.6684, elevationFt: 146, type: 'commercial_large' },
  { iata: 'IAD', name: 'Washington Dulles Intl', city: 'Washington, DC', lat: 38.9531, lng: -77.4565, elevationFt: 313, type: 'commercial_large' },
  { iata: 'DCA', name: 'Ronald Reagan Washington Natl', city: 'Arlington/DC, VA', lat: 38.8512, lng: -77.0402, elevationFt: 15, type: 'commercial_large' },

  // Southeast & Florida
  { iata: 'CLT', name: 'Charlotte Douglas Intl', city: 'Charlotte, NC', lat: 35.2140, lng: -80.9431, elevationFt: 748, type: 'commercial_large' },
  { iata: 'ATL', name: 'Hartsfield-Jackson Atlanta Intl', city: 'Atlanta, GA', lat: 33.6407, lng: -84.4277, elevationFt: 1026, type: 'commercial_large' },
  { iata: 'MIA', name: 'Miami Intl', city: 'Miami, FL', lat: 25.7959, lng: -80.2870, elevationFt: 9, type: 'commercial_large' },
  { iata: 'FLL', name: 'Fort Lauderdale-Hollywood Intl', city: 'Fort Lauderdale, FL', lat: 26.0742, lng: -80.1506, elevationFt: 9, type: 'commercial_large' },
  { iata: 'MCO', name: 'Orlando Intl', city: 'Orlando, FL', lat: 28.4312, lng: -81.3081, elevationFt: 96, type: 'commercial_large' },
  { iata: 'TPA', name: 'Tampa Intl', city: 'Tampa, FL', lat: 27.9755, lng: -82.5332, elevationFt: 26, type: 'commercial_large' },
  { iata: 'BNA', name: 'Nashville Intl', city: 'Nashville, TN', lat: 36.1263, lng: -86.6774, elevationFt: 599, type: 'commercial_large' },

  // Midwest
  { iata: 'ORD', name: "O'Hare Intl", city: 'Chicago, IL', lat: 41.9742, lng: -87.9073, elevationFt: 672, type: 'commercial_large' },
  { iata: 'MDW', name: 'Chicago Midway Intl', city: 'Chicago, IL', lat: 41.7868, lng: -87.7522, elevationFt: 620, type: 'commercial_large' },
  { iata: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit, MI', lat: 42.2162, lng: -83.3554, elevationFt: 645, type: 'commercial_large' },
  { iata: 'MSP', name: 'Minneapolis-Saint Paul Intl', city: 'Minneapolis, MN', lat: 44.8848, lng: -93.2223, elevationFt: 841, type: 'commercial_large' },
  { iata: 'STL', name: 'St. Louis Lambert Intl', city: 'St. Louis, MO', lat: 38.7472, lng: -90.3599, elevationFt: 618, type: 'commercial_medium' },
  { iata: 'IND', name: 'Indianapolis Intl', city: 'Indianapolis, IN', lat: 39.7173, lng: -86.2946, elevationFt: 797, type: 'commercial_medium' },

  // South & Texas
  { iata: 'DFW', name: 'Dallas/Fort Worth Intl', city: 'Dallas/Fort Worth, TX', lat: 32.8998, lng: -97.0403, elevationFt: 607, type: 'commercial_large' },
  { iata: 'DAL', name: 'Dallas Love Field', city: 'Dallas, TX', lat: 32.8481, lng: -96.8512, elevationFt: 487, type: 'commercial_medium' },
  { iata: 'IAH', name: 'George Bush Intercontinental', city: 'Houston, TX', lat: 29.9902, lng: -95.3368, elevationFt: 97, type: 'commercial_large' },
  { iata: 'HOU', name: 'William P. Hobby', city: 'Houston, TX', lat: 29.6454, lng: -95.2789, elevationFt: 46, type: 'commercial_medium' },
  { iata: 'AUS', name: 'Austin-Bergstrom Intl', city: 'Austin, TX', lat: 30.1975, lng: -97.6664, elevationFt: 542, type: 'commercial_large' },
  { iata: 'SAT', name: 'San Antonio Intl', city: 'San Antonio, TX', lat: 29.5337, lng: -98.4698, elevationFt: 809, type: 'commercial_medium' },
  { iata: 'MSY', name: 'Louis Armstrong New Orleans Intl', city: 'New Orleans, LA', lat: 29.9934, lng: -90.2580, elevationFt: 4, type: 'commercial_medium' },

  // Mountain & West
  { iata: 'DEN', name: 'Denver Intl', city: 'Denver, CO', lat: 39.8561, lng: -104.6737, elevationFt: 5434, type: 'commercial_large' },
  { iata: 'SLC', name: 'Salt Lake City Intl', city: 'Salt Lake City, UT', lat: 40.7899, lng: -111.9791, elevationFt: 4227, type: 'commercial_large' },
  { iata: 'PHX', name: 'Phoenix Sky Harbor Intl', city: 'Phoenix, AZ', lat: 33.4352, lng: -112.0101, elevationFt: 1135, type: 'commercial_large' },
  { iata: 'LAS', name: 'Harry Reid Intl', city: 'Las Vegas, NV', lat: 36.0840, lng: -115.1537, elevationFt: 2181, type: 'commercial_large' },

  // West Coast & Pacific
  { iata: 'SEA', name: 'Seattle-Tacoma Intl', city: 'Seattle, WA', lat: 47.4502, lng: -122.3088, elevationFt: 433, type: 'commercial_large' },
  { iata: 'PDX', name: 'Portland Intl', city: 'Portland, OR', lat: 45.5898, lng: -122.5951, elevationFt: 31, type: 'commercial_large' },
  { iata: 'SFO', name: 'San Francisco Intl', city: 'San Francisco, CA', lat: 37.6213, lng: -122.3790, elevationFt: 13, type: 'commercial_large' },
  { iata: 'OAK', name: 'Oakland Intl', city: 'Oakland, CA', lat: 37.7214, lng: -122.2208, elevationFt: 9, type: 'commercial_large' },
  { iata: 'SJC', name: 'San Jose Mineta Intl', city: 'San Jose, CA', lat: 37.3639, lng: -121.9289, elevationFt: 62, type: 'commercial_large' },
  { iata: 'LAX', name: 'Los Angeles Intl', city: 'Los Angeles, CA', lat: 33.9416, lng: -118.4085, elevationFt: 125, type: 'commercial_large' },
  { iata: 'BUR', name: 'Hollywood Burbank', city: 'Burbank/LA, CA', lat: 34.2007, lng: -118.3590, elevationFt: 778, type: 'commercial_medium' },
  { iata: 'SNA', name: 'John Wayne Airport', city: 'Santa Ana/Orange Cty, CA', lat: 33.6757, lng: -117.8682, elevationFt: 56, type: 'commercial_medium' },
  { iata: 'SAN', name: 'San Diego Intl', city: 'San Diego, CA', lat: 32.7338, lng: -117.1933, elevationFt: 17, type: 'commercial_large' }
];

export function findNearestAirport(lng: number, lat: number): AirportHub {
  let nearest = STRATEGIC_AIRPORTS[0];
  let minDistance = Infinity;

  for (const airport of STRATEGIC_AIRPORTS) {
    const dLat = (airport.lat - lat) * (Math.PI / 180);
    const dLng = (airport.lng - lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) * Math.cos(airport.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distMeters = 6371000 * c;

    if (distMeters < minDistance) {
      minDistance = distMeters;
      nearest = airport;
    }
  }

  return nearest;
}

// Compute great-circle arc coordinates with geodesic curvature
export function generateGreatCircleArc(
  startLng: number,
  startLat: number,
  endLng: number,
  endLat: number,
  numPoints: number = 30
): number[][] {
  const coordinates: number[][] = [];
  const p1 = { x: startLng * Math.PI / 180, y: startLat * Math.PI / 180 };
  const p2 = { x: endLng * Math.PI / 180, y: endLat * Math.PI / 180 };

  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((p1.y - p2.y) / 2), 2) +
    Math.cos(p1.y) * Math.cos(p2.y) * Math.pow(Math.sin((p1.x - p2.x) / 2), 2)
  ));

  if (d === 0) return [[startLng, startLat], [endLng, endLat]];

  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);

    const x = A * Math.cos(p1.y) * Math.cos(p1.x) + B * Math.cos(p2.y) * Math.cos(p2.x);
    const y = A * Math.cos(p1.y) * Math.sin(p1.x) + B * Math.cos(p2.y) * Math.sin(p2.x);
    const z = A * Math.sin(p1.y) + B * Math.sin(p2.y);

    const lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180 / Math.PI;
    const lng = Math.atan2(y, x) * 180 / Math.PI;
    coordinates.push([lng, lat]);
  }

  return coordinates;
}
