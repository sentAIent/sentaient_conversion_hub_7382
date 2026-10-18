// src/lib/directionsService.ts

export interface DirectionsResult {
  routeGeoJSON: any;
  distance: number; // in meters
  duration: number; // in seconds
  trafficCongestion?: string; // 'low', 'moderate', 'heavy', 'severe'
}

export type TravelMode = 'driving-traffic' | 'driving' | 'walking' | 'cycling';

export async function fetchDirections(
  originLng: number,
  originLat: number,
  destLng: number,
  destLat: number,
  departAt?: Date,
  mode: TravelMode = 'driving-traffic'
): Promise<DirectionsResult> {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (mapboxToken && mapboxToken !== '') {
    const mapboxProfile = mode === 'cycling' ? 'cycling' : mode === 'walking' ? 'walking' : mode === 'driving' ? 'driving' : 'driving-traffic';
    let url = `https://api.mapbox.com/directions/v5/mapbox/${mapboxProfile}/${originLng},${originLat};${destLng},${destLat}?geometries=geojson&access_token=${mapboxToken}`;
    
    // Add depart_at for predictive traffic if a future time is provided
    if (departAt) {
      // Mapbox expects ISO string without milliseconds or a Unix timestamp for future predictions.
      // Usually format YYYY-MM-DDTHH:MM
      const iso = departAt.toISOString().split('.')[0]; 
      url += `&depart_at=${iso}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return {
          routeGeoJSON: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry,
          },
          distance: route.distance,
          duration: route.duration,
        };
      }
    } catch (error) {
      console.warn("Mapbox routing failed, attempting OSRM / backup router:", error);
    }
  }

  // Attempt real turn-by-turn routing via OpenStreetMap OSRM
  try {
    const osrmProfile = mode === 'cycling' ? 'bicycle' : mode === 'walking' ? 'foot' : 'driving';
    const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/${osrmProfile}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`);
    if (osrmRes.ok) {
      const osrmData = await osrmRes.json();
      if (osrmData.routes && osrmData.routes.length > 0) {
        const route = osrmData.routes[0];
        let duration = route.duration;
        let trafficCongestion = 'low';
        if (mode === 'driving-traffic' && departAt) {
          const hour = departAt.getHours();
          const day = departAt.getDay();
          if (day >= 1 && day <= 5 && ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18))) {
            duration *= 1.7;
            trafficCongestion = 'severe';
          } else if (day >= 1 && day <= 5 && hour >= 10 && hour <= 15) {
            duration *= 1.25;
            trafficCongestion = 'moderate';
          }
        }
        return {
          routeGeoJSON: {
            type: 'Feature',
            properties: { trafficCongestion },
            geometry: route.geometry,
          },
          distance: route.distance,
          duration,
          trafficCongestion,
        };
      }
    }
  } catch (osrmErr) {
    console.warn("OSRM routing unavailable, using simulated model:", osrmErr);
  }

  // Simulated fallback router
  return new Promise((resolve) => {
      setTimeout(() => {
        // Calculate a very naive straight-line "route" with simulated waypoints
        const steps = 20;
        const coordinates = [];
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const lng = originLng + (destLng - originLng) * t;
          const lat = originLat + (destLat - originLat) * t;
          coordinates.push([lng, lat]);
        }
        
        // Approximate distance (Haversine formula roughly)
        const R = 6371e3; // metres
        const φ1 = originLat * Math.PI/180;
        const φ2 = destLat * Math.PI/180;
        const Δφ = (destLat-originLat) * Math.PI/180;
        const Δλ = (destLng-originLng) * Math.PI/180;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        // Base duration based on mode
        const speedKmh = mode === 'walking' ? 5 : mode === 'cycling' ? 18 : 50;
        let duration = (distance / (speedKmh * 1000)) * 3600; 
        let trafficCongestion = mode === 'walking' || mode === 'cycling' ? 'low' : 'low';

        // Apply predictive traffic simulation based on day/time
        if (departAt) {
          const hour = departAt.getHours();
          const day = departAt.getDay(); // 0 = Sunday, 1 = Monday, etc.
          
          // Rush hour penalty simulation (Weekdays 7-9 AM, 4-6 PM)
          if (day >= 1 && day <= 5) {
            if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
              duration *= 1.8; // 80% more time in rush hour
              trafficCongestion = 'severe';
            } else if (hour >= 10 && hour <= 15) {
              duration *= 1.2; // slight daytime traffic
              trafficCongestion = 'moderate';
            }
          } else {
            // Weekend traffic
            if (hour >= 12 && hour <= 17) {
              duration *= 1.4; // Weekend afternoon traffic
              trafficCongestion = 'heavy';
            }
          }
        }

        resolve({
          routeGeoJSON: {
            type: 'Feature',
            properties: { trafficCongestion },
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          },
          distance: distance,
          duration: duration,
          trafficCongestion: trafficCongestion
        });
      }, 800); // 800ms mock network latency
    });
}
