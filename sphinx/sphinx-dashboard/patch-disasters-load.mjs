import fs from 'fs';
const file = 'src/components/SphinxMap.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `  const loadDisastersData = useCallback(async () => {
    try {
      const [disasterRes, quakeRes] = await Promise.all([
        fetch(\`http://127.0.0.1:3117/api/osint/disasters?timeframe=\${timeframe}\`),
        fetch(\`http://127.0.0.1:3117/api/osint/earthquakes?timeframe=\${timeframe}\`)
      ]);
      
      const disasterData = await disasterRes.json();
      const quakeData = await quakeRes.json();

      setDisasterFeatures(disasterData.features || []);
      setEarthquakeFeatures(quakeData.features || []);
    } catch (e) {
      console.warn('[Sphinx GL] Failed to fetch disaster data', e);
    }
  }, [timeframe]);`;

const replacement = `  const loadDisastersData = useCallback(async () => {
    try {
      fetch(\`http://127.0.0.1:3117/api/osint/disasters?timeframe=\${timeframe}\`)
        .then(r => r.json())
        .then(d => setDisasterFeatures(d.features || []))
        .catch(e => console.warn('[Sphinx GL] Failed to fetch disaster data', e));
        
      fetch(\`http://127.0.0.1:3117/api/osint/earthquakes?timeframe=\${timeframe}\`)
        .then(r => r.json())
        .then(d => setEarthquakeFeatures(d.features || []))
        .catch(e => console.warn('[Sphinx GL] Failed to fetch earthquakes data', e));
    } catch (e) {
      console.warn('[Sphinx GL] Failed to load disaster data', e);
    }
  }, [timeframe]);`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
