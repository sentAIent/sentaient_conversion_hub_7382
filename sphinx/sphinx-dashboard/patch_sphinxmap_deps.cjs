const fs = require('fs');
let content = fs.readFileSync('src/components/SphinxMap.tsx', 'utf8');

const oldFunc = /const loadWatchtowerData = useCallback\(async \(\) => \{[\s\S]*?\}, \[settings\.layers\]\);/m;

const newFunc = `const loadWatchtowerData = useCallback(async () => {
    if (!bboxRef.current) return;
    try {
      const overpass = await fetch(\`http://127.0.0.1:3117/api/osint/overpass?bbox=\${bboxRef.current}\`).then(r => r.json());
      if (!overpass.error) {
        if (overpass.springs) setSpringFeatures(overpass.springs.features || []);
        if (overpass.power) setPowerFeatures(overpass.power.features || []);
        if (overpass.aviation) setAviationFeatures(overpass.aviation.features || []);
        if (overpass.emergency) setEmergencyFeatures(overpass.emergency.features || []);
        if (overpass.cameras) setCameraFeatures(overpass.cameras.features || []);
      }
      
      const d = await fetch(\`http://127.0.0.1:3117/api/osint/celltowers?bbox=\${bboxRef.current}\`).then(r => r.json());
      if (!d.error) setCellTowerFeatures(d.features || []);
      
    } catch (e) {
      console.warn('[Sphinx GL] Failed to fetch watchtower data', e);
    }
  }, []);`;

content = content.replace(oldFunc, newFunc);

const oldAircraft = /const loadAircraft = useCallback\(async \(\) => \{[\s\S]*?\}, \[settings\.layers\.aircraft\]\);/m;
const newAircraft = `const loadAircraft = useCallback(async () => {
    if (!bboxRef.current) return;
    try {
      const res = await fetch(\`http://127.0.0.1:3117/api/osint/aircraft?bbox=\${bboxRef.current}\`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const geojsonFeatures = (data.aircraft || []).map((a: any) => ({
        type: 'Feature',
        properties: { ...a, type: 'aircraft' },
        geometry: { type: 'Point', coordinates: [a.longitude, a.latitude] }
      }));
      setAircraftFeatures(geojsonFeatures);
    } catch (e) {
      console.warn('[Sphinx GL] Failed to fetch aircraft', e);
    }
  }, []);`;

content = content.replace(oldAircraft, newAircraft);

fs.writeFileSync('src/components/SphinxMap.tsx', content);
