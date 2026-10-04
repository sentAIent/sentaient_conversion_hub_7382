import fs from 'fs';
const file = 'src/components/SphinxMap.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `const loadWatchtowerData = useCallback(async () => {
    if (!bboxRef.current) return;
    try {`;

const replacement = `const loadWatchtowerData = useCallback(async () => {
    if (!bboxRef.current) return;
    const map = mapRef.current?.getMap();
    if (map && map.getZoom() < 10) {
      console.warn('[Sphinx GL] Zoom level too low. Skipping heavy OSM queries to prevent Overpass crashes.');
      return;
    }
    try {`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
