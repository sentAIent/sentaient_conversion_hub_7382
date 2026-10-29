import fs from 'fs';

let content = fs.readFileSync('src/components/SphinxMap.tsx', 'utf8');

// 1. Responsive Legend Container
content = content.replace(/w-72 bg-black\/80/g, 'w-[25vw] min-w-[240px] max-w-[360px] bg-black/80');
content = content.replace(/text-xl font-bold text-cyan-400/g, 'text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-cyan-400');
content = content.replace(/text-xs text-cyan-500 hover/g, 'text-[clamp(0.6rem,0.8vw,0.75rem)] text-cyan-500 hover');
content = content.replace(/space-y-2 mt-4 text-sm max-h-\[70vh\]/g, 'space-y-2 mt-4 text-[clamp(0.7rem,1vw,0.875rem)] max-h-[70vh]');

// 2. Legend Icons Updates
// We will replace the HTML for each legend icon
const iconMap = {
  'cell_towers': '<span className="text-fuchsia-500 font-bold leading-none" style={{fontSize: "1.2em"}}>▲</span>',
  'springs': '<span className="text-blue-500 font-bold leading-none" style={{fontSize: "1.2em"}}>♦</span>',
  'power': '<span className="text-yellow-500 leading-none" style={{fontSize: "1.2em"}}>■</span>',
  'aviation': '<span className="text-red-400 leading-none" style={{fontSize: "1.2em"}}>▲</span>',
  'emergency': '<span className="text-emerald-500 font-bold leading-none" style={{fontSize: "1.2em"}}>✚</span>',
  'cameras': '<span className="text-white leading-none" style={{fontSize: "1.2em"}}>■</span>',
  'weather_stations': '<span className="text-sky-300 leading-none" style={{fontSize: "1.3em"}}>★</span>',
  'data_centers': '<span className="text-purple-500 leading-none" style={{fontSize: "1.2em"}}>⬢</span>',
  'radars': '<div className="w-3 h-3 rounded-full border-2 border-rose-500 bg-rose-500/50"></div>', // Keep as circle
  'public_lands': '<span className="text-green-500 leading-none" style={{fontSize: "1.2em"}}>⬢</span>',
  'campsites': '<span className="text-orange-500 leading-none" style={{fontSize: "1.2em"}}>▲</span>',
  'trails': '<div className="w-3 h-1 bg-amber-600 rounded"></div>', // Line
  'disasters': '<span className="text-red-500 leading-none" style={{fontSize: "1.3em"}}>★</span>',
  'earthquakes': '<div className="w-3 h-3 rounded-full border border-orange-500 bg-orange-500/20"></div>' // Keep circle with border
};

for (const [key, html] of Object.entries(iconMap)) {
  // Try to find the exact div or span inside the legend for this key
  // It's usually right after `<EyeOff size={14} />} </button>`
  const regex = new RegExp(`(<button [^>]+>\\s*\\{settings\\.layers\\.${key} \\? <Eye [^>]+> : <EyeOff [^>]+>\\}\\s*</button>\\s*)<div[^>]+></div>`, 'g');
  content = content.replace(regex, `$1${html}`);
}

// 3. Mapbox Layers Update
// Convert circle layers to symbol layers where appropriate
const layerStyles = {
  'power-layer': { type: 'symbol', char: '■', color: '#eab308', size: 14 },
  'aviation-layer': { type: 'symbol', char: '▲', color: '#f87171', size: 14 },
  'emergency-layer': { type: 'symbol', char: '✚', color: '#10b981', size: 16 },
  'camera-layer': { type: 'symbol', char: '■', color: '#ffffff', size: 12 },
  'weather-station-layer': { type: 'symbol', char: '★', color: '#7dd3fc', size: 16 },
  'data-center-layer': { type: 'symbol', char: '⬢', color: '#a855f7', size: 16 },
  'public-land-layer': { type: 'symbol', char: '⬢', color: '#22c55e', size: 14 },
  'campsite-layer': { type: 'symbol', char: '▲', color: '#f97316', size: 14 },
  'disaster-layer': { type: 'symbol', char: '★', color: '#ef4444', size: 18 }
};

for (const [id, style] of Object.entries(layerStyles)) {
  const regex = new RegExp(`<Layer id="${id}" source="([^"]+)" type="circle" paint=\\{([^}]+)\\}\\s*/>`);
  const replaceStr = `<Layer id="${id}" source="$1" type="symbol" layout={{ 'text-field': '${style.char}', 'text-size': ${style.size}, 'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'], 'text-allow-overlap': true, 'text-ignore-placement': true }} paint={{ 'text-color': '${style.color}', 'text-opacity': getOpacity('$1') }} />`;
  content = content.replace(regex, replaceStr);
}

// Fix cell-towers and springs (multi-line)
content = content.replace(/id="cell-tower-layer"[\s\n]*type="circle"[\s\n]*paint=\{\{[^}]+\}\}/g, `id="cell-tower-layer"
              type="symbol"
              layout={{ 'text-field': '▲', 'text-size': 14, 'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'], 'text-allow-overlap': true, 'text-ignore-placement': true }}
              paint={{ 'text-color': '#d946ef', 'text-opacity': getOpacity('cell_towers') }}`);

content = content.replace(/id="spring-layer"[\s\n]*type="circle"[\s\n]*paint=\{\{[^}]+\}\}/g, `id="spring-layer"
              type="symbol"
              layout={{ 'text-field': '♦', 'text-size': 14, 'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'], 'text-allow-overlap': true, 'text-ignore-placement': true }}
              paint={{ 'text-color': '#3b82f6', 'text-opacity': getOpacity('springs') }}`);

// Trail layer keep as circle, earthquakes keep as circle, radar keep as circle.

fs.writeFileSync('src/components/SphinxMap.tsx', content);
