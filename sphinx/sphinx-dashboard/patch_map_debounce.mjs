import fs from 'fs';

let content = fs.readFileSync('src/components/SphinxMap.tsx', 'utf8');

const replacement = `
        onMoveEnd={() => {
          updateBbox();
          updateVisibleCounts();
          
          // Debounce network fetches on map movement to prevent 429 rate limits
          if ((window as any).moveDebounce) clearTimeout((window as any).moveDebounce);
          (window as any).moveDebounce = setTimeout(() => {
            loadAircraft();
            loadWatchtowerData();
          }, 1500);
        }}
`;

content = content.replace(
  /onMoveEnd=\{\(\) => \{\s*updateBbox\(\);\s*loadAircraft\(\);\s*loadWatchtowerData\(\);\s*updateVisibleCounts\(\);\s*\}\}/,
  replacement.trim()
);

fs.writeFileSync('src/components/SphinxMap.tsx', content);
