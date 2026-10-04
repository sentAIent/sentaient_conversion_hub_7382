// src/lib/directionsService.ts

export interface DirectionsResult {
  routeGeoJSON: any;
  distance: number; // in meters
  duration: number; // in seconds
  trafficCongestion?: string; // 'low', 'moderate', 'heavy', 'severe'
}

export async function fetchDirections(
  originLng: number,
  originLat: number,
  destLng: number,
  destLat: number,
  departAt?: Date
): Promise<DirectionsResult> {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (mapboxToken && mapboxToken !== '') {
    // Real Mapbox API Call
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${originLng},${originLat};${destLng},${destLat}?geometries=geojson&access_token=${mapboxToken}`;
    
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
      throw new Error("No route found");
    } catch (error) {
      console.error("Mapbox routing failed:", error);
      throw error;
    }
  } else {
    // Mock Fallback Service (Simulated Routing)
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

        // Base duration (assume ~50km/h average speed in city)
        let duration = (distance / 50000) * 3600; 
        
        let trafficCongestion = 'low';

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
}
