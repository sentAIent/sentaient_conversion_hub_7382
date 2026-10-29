const fs = require('fs');
let code = fs.readFileSync('../sphinx/sphinx-dashboard/src/components/SphinxMap.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  "import { GeocodingSearch } from './GeocodingSearch';",
  "import { GeocodingSearch } from './GeocodingSearch';\nimport { DirectionsPanel } from './DirectionsPanel';\nimport { DirectionsResult } from '../lib/directionsService';"
);

// 2. Add state
code = code.replace(
  "const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');",
  "const [timeframe, setTimeframe] = useState<'live' | 'historical'>('live');\n  const [directionsResult, setDirectionsResult] = useState<DirectionsResult | null>(null);\n  const [showDirections, setShowDirections] = useState(false);"
);

// 3. Add Source and Layer inside Map
const mapClosingTags = `        </Source>
        <Source id="earthquakes" type="geojson" data={{ type: 'FeatureCollection', features: earthquakeFeatures }}>
          <Layer id="earthquake-layer" source="earthquakes" type="circle" paint={{ 'circle-radius': 6, 'circle-color': '#f97316' }} />
        </Source>`;
const newMapTags = mapClosingTags + `
        {directionsResult && directionsResult.routeGeoJSON && (
          <Source id="directions" type="geojson" data={directionsResult.routeGeoJSON}>
            <Layer 
              id="directions-layer-outline" 
              type="line" 
              paint={{ 'line-color': '#000000', 'line-width': 8, 'line-opacity': 0.5 }} 
            />
            <Layer 
              id="directions-layer" 
              type="line" 
              paint={{ 
                'line-color': directionsResult.trafficCongestion === 'severe' ? '#ef4444' : 
                              directionsResult.trafficCongestion === 'heavy' ? '#f97316' : 
                              directionsResult.trafficCongestion === 'moderate' ? '#eab308' : '#22c55e', 
                'line-width': 5 
              }} 
            />
          </Source>
        )}`;
code = code.replace(mapClosingTags, newMapTags);

// 4. Add UI elements below GeocodingSearch
const geocodingSearchStr = `        <GeocodingSearch 
          onLocationSelected={(lat, lon) => {
            if (mapRef.current) {
              mapRef.current.flyTo({ center: [lon, lat], zoom: 14, duration: 2500 });
            }
          }} 
        />
      </div>`;
const newUI = geocodingSearchStr + `
      <div className="absolute top-4 left-[640px] z-10 flex gap-2">
        <button 
          onClick={() => setShowDirections(!showDirections)}
          className="bg-black/80 px-4 py-2 rounded-lg border border-cyan-900 shadow-[0_0_15px_rgba(8,145,178,0.5)] backdrop-blur-md hover:bg-cyan-900/40 transition-colors font-mono text-cyan-400 text-sm"
        >
          {showDirections ? 'Close Routing' : 'Traffic Routing'}
        </button>
      </div>
      
      {showDirections && (
        <div className="absolute top-16 left-[640px] z-10">
          <DirectionsPanel onRouteCalculated={setDirectionsResult} />
        </div>
      )}
`;
code = code.replace(geocodingSearchStr, newUI);

fs.writeFileSync('../sphinx/sphinx-dashboard/src/components/SphinxMap.tsx', code);
