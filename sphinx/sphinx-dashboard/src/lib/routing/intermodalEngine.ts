// Sphinx Multi-Modal & Intermodal Synthesizer
// Composes complex travel journeys across Foot, Car, Train, Bus, and Flight.

import { STRATEGIC_AIRPORTS, findNearestAirport, generateGreatCircleArc, AirportHub } from './airportsData';
import { STRATEGIC_RAIL_STATIONS, findNearestRailStation, RailStation } from './railCorridors';
import { haversineDistanceMeters } from './avoidanceEngine';

export type SubLegMode = 'walking' | 'driving' | 'rail' | 'bus' | 'flight' | 'cycling';

export interface RouteSubLeg {
  id: string;
  mode: SubLegMode;
  instruction: string;
  originLabel: string;
  destLabel: string;
  distanceMeters: number;
  durationSeconds: number;
  coordinates: number[][]; // [lng, lat] array
  transitDetails?: {
    lineOrFlightNumber: string;
    operator: string;
    departureTime?: string;
    terminalOrTrack?: string;
  };
}

export interface IntermodalRouteResult {
  legs: RouteSubLeg[];
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  combinedGeoJSON: any;
  summaryTitle: string;
}

// Generate straight/simulated street coordinates between two points
function generateSimulatedPath(startLng: number, startLat: number, endLng: number, endLat: number, steps: number = 15): number[][] {
  const coords: number[][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Add small realistic curvature/jitter for ground roads
    const jitter = Math.sin(t * Math.PI) * 0.003 * (i % 2 === 0 ? 1 : -1);
    const lng = startLng + (endLng - startLng) * t + (t > 0 && t < 1 ? jitter : 0);
    const lat = startLat + (endLat - startLat) * t + (t > 0 && t < 1 ? jitter : 0);
    coords.push([lng, lat]);
  }
  return coords;
}

// Synthesize an Intermodal Flight + Ground Journey (Drive -> Flight -> Drive/Transit)
export function synthesizeFlightIntermodal(
  originLng: number,
  originLat: number,
  destLng: number,
  destLat: number
): IntermodalRouteResult {
  const originAirport = findNearestAirport(originLng, originLat);
  const destAirport = findNearestAirport(destLng, destLat);

  // Leg 1: Ground Access to Departure Airport (Driving/Transit)
  const distToOriginAir = haversineDistanceMeters(originLng, originLat, originAirport.lng, originAirport.lat);
  const durToOriginAir = Math.round((distToOriginAir / (45 * 1000 / 3600)) + 45 * 60); // 45 mph + 45 min parking/check-in
  const leg1Coords = generateSimulatedPath(originLng, originLat, originAirport.lng, originAirport.lat, 12);

  const leg1: RouteSubLeg = {
    id: 'leg-flight-access',
    mode: 'driving',
    instruction: `Drive to ${originAirport.name} (${originAirport.iata}) Terminal & Park`,
    originLabel: 'Origin',
    destLabel: `${originAirport.iata} Airport`,
    distanceMeters: distToOriginAir,
    durationSeconds: durToOriginAir,
    coordinates: leg1Coords
  };

  // Leg 2: Mainline Commercial Flight Arc
  const flightDistance = haversineDistanceMeters(originAirport.lng, originAirport.lat, destAirport.lng, destAirport.lat);
  // Flight speed avg 480 knots (247 m/s) + 40 min taxi/climb/descent
  const flightDuration = Math.round((flightDistance / 247) + 40 * 60);
  const flightCoords = generateGreatCircleArc(originAirport.lng, originAirport.lat, destAirport.lng, destAirport.lat, 35);

  const leg2: RouteSubLeg = {
    id: 'leg-flight-main',
    mode: 'flight',
    instruction: `Board Commercial Flight: ${originAirport.iata} ➔ ${destAirport.iata} (FL360 Great-Circle Arc)`,
    originLabel: `${originAirport.iata}`,
    destLabel: `${destAirport.iata}`,
    distanceMeters: flightDistance,
    durationSeconds: flightDuration,
    coordinates: flightCoords,
    transitDetails: {
      lineOrFlightNumber: `SPX-${Math.floor(100 + Math.random() * 899)}`,
      operator: 'Commercial Airline Shuttle',
      terminalOrTrack: 'Terminal B / Gate 14'
    }
  };

  // Leg 3: Ground Egress from Arrival Airport to Destination
  const distFromDestAir = haversineDistanceMeters(destAirport.lng, destAirport.lat, destLng, destLat);
  const durFromDestAir = Math.round((distFromDestAir / (40 * 1000 / 3600)) + 25 * 60); // 40 mph + 25 min bag claim/car pickup
  const leg3Coords = generateSimulatedPath(destAirport.lng, destAirport.lat, destLng, destLat, 12);

  const leg3: RouteSubLeg = {
    id: 'leg-flight-egress',
    mode: 'driving',
    instruction: `Depart ${destAirport.name} (${destAirport.iata}) via Car/Transit to Final Destination`,
    originLabel: `${destAirport.iata} Airport`,
    destLabel: 'Destination',
    distanceMeters: distFromDestAir,
    durationSeconds: durFromDestAir,
    coordinates: leg3Coords
  };

  const legs = [leg1, leg2, leg3];
  const totalDistanceMeters = distToOriginAir + flightDistance + distFromDestAir;
  const totalDurationSeconds = durToOriginAir + flightDuration + durFromDestAir;

  const combinedFeatures = legs.map((leg) => ({
    type: 'Feature',
    properties: {
      legId: leg.id,
      mode: leg.mode,
      instruction: leg.instruction,
      distanceMeters: leg.distanceMeters,
      durationSeconds: leg.durationSeconds
    },
    geometry: {
      type: 'LineString',
      coordinates: leg.coordinates
    }
  }));

  return {
    legs,
    totalDistanceMeters,
    totalDurationSeconds,
    combinedGeoJSON: {
      type: 'FeatureCollection',
      features: combinedFeatures
    },
    summaryTitle: `Flight via ${originAirport.iata} ➔ ${destAirport.iata}`
  };
}

// Synthesize an Intermodal Rail Journey (Drive/Walk -> Train -> Walk)
export function synthesizeRailIntermodal(
  originLng: number,
  originLat: number,
  destLng: number,
  destLat: number
): IntermodalRouteResult {
  const originStation = findNearestRailStation(originLng, originLat);
  const destStation = findNearestRailStation(destLng, destLat);

  // Leg 1: Transit/Drive to Departure Station
  const distToStation = haversineDistanceMeters(originLng, originLat, originStation.lng, originStation.lat);
  const durToStation = Math.round((distToStation / (35 * 1000 / 3600)) + 15 * 60);
  const leg1Coords = generateSimulatedPath(originLng, originLat, originStation.lng, originStation.lat, 10);

  const leg1: RouteSubLeg = {
    id: 'leg-rail-access',
    mode: 'driving',
    instruction: `Travel to ${originStation.name} (${originStation.code})`,
    originLabel: 'Origin',
    destLabel: originStation.name,
    distanceMeters: distToStation,
    durationSeconds: durToStation,
    coordinates: leg1Coords
  };

  // Leg 2: Passenger Rail Line
  const railDistance = haversineDistanceMeters(originStation.lng, originStation.lat, destStation.lng, destStation.lat);
  // Rail speed avg 75 mph (33.5 m/s) + dwell stops
  const railDuration = Math.round((railDistance / 33.5) + 20 * 60);
  const leg2Coords = generateSimulatedPath(originStation.lng, originStation.lat, destStation.lng, destStation.lat, 24);

  const leg2: RouteSubLeg = {
    id: 'leg-rail-main',
    mode: 'rail',
    instruction: `Board Amtrak / Regional Express: ${originStation.code} ➔ ${destStation.code}`,
    originLabel: originStation.name,
    destLabel: destStation.name,
    distanceMeters: railDistance,
    durationSeconds: railDuration,
    coordinates: leg2Coords,
    transitDetails: {
      lineOrFlightNumber: originStation.lines[0] || 'Regional Rail',
      operator: 'National Passenger Rail',
      terminalOrTrack: 'Track 3 Westbound'
    }
  };

  // Leg 3: Walk from Destination Station
  const distFromStation = haversineDistanceMeters(destStation.lng, destStation.lat, destLng, destLat);
  const durFromStation = Math.round(distFromStation / (4.5 * 1000 / 3600)); // Walking 4.5 km/h
  const leg3Coords = generateSimulatedPath(destStation.lng, destStation.lat, destLng, destLat, 8);

  const leg3: RouteSubLeg = {
    id: 'leg-rail-egress',
    mode: distFromStation > 3000 ? 'driving' : 'walking',
    instruction: distFromStation > 3000 
      ? `Transit/Ride from ${destStation.name} to Final Destination`
      : `Walk from ${destStation.name} to Final Destination`,
    originLabel: destStation.name,
    destLabel: 'Destination',
    distanceMeters: distFromStation,
    durationSeconds: durFromStation,
    coordinates: leg3Coords
  };

  const legs = [leg1, leg2, leg3];
  const totalDistanceMeters = distToStation + railDistance + distFromStation;
  const totalDurationSeconds = durToStation + railDuration + durFromStation;

  const combinedFeatures = legs.map((leg) => ({
    type: 'Feature',
    properties: {
      legId: leg.id,
      mode: leg.mode,
      instruction: leg.instruction,
      distanceMeters: leg.distanceMeters,
      durationSeconds: leg.durationSeconds
    },
    geometry: {
      type: 'LineString',
      coordinates: leg.coordinates
    }
  }));

  return {
    legs,
    totalDistanceMeters,
    totalDurationSeconds,
    combinedGeoJSON: {
      type: 'FeatureCollection',
      features: combinedFeatures
    },
    summaryTitle: `Rail: ${originStation.name} ➔ ${destStation.name}`
  };
}
