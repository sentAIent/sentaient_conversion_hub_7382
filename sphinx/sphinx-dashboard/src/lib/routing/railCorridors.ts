// Strategic Passenger Rail Stations & Transit Corridors Database
// Covers Amtrak intercity hubs, commuter rail termini, and strategic metro interchange nodes.

export interface RailStation {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  lines: string[];
}

export const STRATEGIC_RAIL_STATIONS: RailStation[] = [
  // Northeast Corridor (Acela & Regional)
  { code: 'BOS-S', name: 'Boston South Station', city: 'Boston, MA', lat: 42.3523, lng: -71.0552, lines: ['Acela', 'Northeast Regional'] },
  { code: 'PVD', name: 'Providence Station', city: 'Providence, RI', lat: 41.8294, lng: -71.4137, lines: ['Acela', 'Northeast Regional'] },
  { code: 'NHV', name: 'New Haven Union Station', city: 'New Haven, CT', lat: 41.2974, lng: -72.9268, lines: ['Acela', 'Northeast Regional', 'Metro-North'] },
  { code: 'NYP', name: 'New York Penn Station / Moynihan', city: 'New York, NY', lat: 40.7505, lng: -73.9935, lines: ['Acela', 'Northeast Regional', 'LIRR', 'NJ Transit'] },
  { code: 'NWK', name: 'Newark Penn Station', city: 'Newark, NJ', lat: 40.7344, lng: -74.1643, lines: ['Acela', 'Northeast Regional', 'PATH'] },
  { code: 'PHL-30', name: 'Philadelphia 30th St Station', city: 'Philadelphia, PA', lat: 39.9558, lng: -75.1820, lines: ['Acela', 'Northeast Regional', 'Keystone', 'SEPTA'] },
  { code: 'WIL', name: 'Wilmington Station', city: 'Wilmington, DE', lat: 39.7369, lng: -75.5513, lines: ['Acela', 'Northeast Regional'] },
  { code: 'BAL', name: 'Baltimore Penn Station', city: 'Baltimore, MD', lat: 39.3073, lng: -76.6157, lines: ['Acela', 'Northeast Regional', 'MARC'] },
  { code: 'WAS', name: 'Washington Union Station', city: 'Washington, DC', lat: 38.8974, lng: -77.0063, lines: ['Acela', 'Northeast Regional', 'VRE', 'MARC'] },
  { code: 'RVR', name: 'Richmond Main St / Staples Mill', city: 'Richmond, VA', lat: 37.5910, lng: -77.4980, lines: ['Northeast Regional', 'Silver Meteor'] },

  // Midwest
  { code: 'CHI', name: 'Chicago Union Station', city: 'Chicago, IL', lat: 41.8787, lng: -87.6403, lines: ['Hiawatha', 'Lincoln Service', 'Empire Builder', 'Lake Shore Ltd', 'Metra'] },
  { code: 'MKE', name: 'Milwaukee Intermodal Station', city: 'Milwaukee, WI', lat: 43.0335, lng: -87.9170, lines: ['Hiawatha', 'Empire Builder'] },
  { code: 'STL-G', name: 'St. Louis Gateway Transportation Center', city: 'St. Louis, MO', lat: 38.6276, lng: -90.2078, lines: ['Lincoln Service', 'Missouri River Runner'] },
  { code: 'MSP-U', name: 'St. Paul Union Depot', city: 'St. Paul/Minneapolis, MN', lat: 44.9472, lng: -93.0858, lines: ['Empire Builder', 'Borealis'] },
  { code: 'DET', name: 'Detroit Amtrak Station', city: 'Detroit, MI', lat: 42.3686, lng: -83.0745, lines: ['Wolverine'] },

  // West Coast
  { code: 'SEA-K', name: 'Seattle King Street Station', city: 'Seattle, WA', lat: 47.5985, lng: -122.3298, lines: ['Cascades', 'Coast Starlight', 'Sounder'] },
  { code: 'PDX-U', name: 'Portland Union Station', city: 'Portland, OR', lat: 45.5289, lng: -122.6766, lines: ['Cascades', 'Coast Starlight'] },
  { code: 'SAC', name: 'Sacramento Valley Station', city: 'Sacramento, CA', lat: 38.5843, lng: -121.5007, lines: ['Capitol Corridor', 'Coast Starlight', 'California Zephyr'] },
  { code: 'OKJ', name: 'Oakland Jack London Square', city: 'Oakland/SF, CA', lat: 37.7940, lng: -122.2718, lines: ['Capitol Corridor', 'Coast Starlight', 'San Joaquins'] },
  { code: 'SJC-D', name: 'San Jose Diridon Station', city: 'San Jose, CA', lat: 37.3300, lng: -121.9029, lines: ['Coast Starlight', 'Capitol Corridor', 'Caltrain'] },
  { code: 'LAX-U', name: 'Los Angeles Union Station', city: 'Los Angeles, CA', lat: 34.0562, lng: -118.2365, lines: ['Pacific Surfliner', 'Coast Starlight', 'Southwest Chief', 'Metrolink'] },
  { code: 'SAN-D', name: 'San Diego Santa Fe Depot', city: 'San Diego, CA', lat: 32.7167, lng: -117.1697, lines: ['Pacific Surfliner', 'Coaster'] },

  // South & Texas
  { code: 'DFW-U', name: 'Dallas Eddie Bernice Johnson Union', city: 'Dallas, TX', lat: 32.7766, lng: -96.8080, lines: ['Texas Eagle', 'TRE'] },
  { code: 'FTW', name: 'Fort Worth Central Station', city: 'Fort Worth, TX', lat: 32.7523, lng: -97.3275, lines: ['Texas Eagle', 'Heartland Flyer', 'TRE'] },
  { code: 'AUS-R', name: 'Austin Amtrak Station', city: 'Austin, TX', lat: 30.2709, lng: -97.7561, lines: ['Texas Eagle'] },
  { code: 'SAS', name: 'San Antonio Amtrak Station', city: 'San Antonio, TX', lat: 29.4234, lng: -98.4795, lines: ['Sunset Limited', 'Texas Eagle'] },
  { code: 'DEN-U', name: 'Denver Union Station', city: 'Denver, CO', lat: 39.7539, lng: -104.9998, lines: ['California Zephyr', 'RTD Commuter Rail'] },
  { code: 'MIA-C', name: 'Miami Central Station', city: 'Miami, FL', lat: 25.7788, lng: -80.1947, lines: ['Brightline', 'Tri-Rail', 'Metrorail'] },
  { code: 'ORL', name: 'Orlando Health/Amtrak & Brightline', city: 'Orlando, FL', lat: 28.5208, lng: -81.3803, lines: ['Brightline', 'Silver Meteor'] }
];

export function findNearestRailStation(lng: number, lat: number): RailStation {
  let nearest = STRATEGIC_RAIL_STATIONS[0];
  let minDistance = Infinity;

  for (const station of STRATEGIC_RAIL_STATIONS) {
    const dLat = (station.lat - lat) * (Math.PI / 180);
    const dLng = (station.lng - lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) * Math.cos(station.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distMeters = 6371000 * c;

    if (distMeters < minDistance) {
      minDistance = distMeters;
      nearest = station;
    }
  }

  return nearest;
}
