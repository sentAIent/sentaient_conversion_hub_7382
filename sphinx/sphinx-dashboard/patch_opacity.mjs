import fs from 'fs';

let content = fs.readFileSync('src/components/SphinxMap.tsx', 'utf8');

const state_addition = `const [hoveredLegendLayer, setHoveredLegendLayer] = useState<string | null>(null);

  const getOpacity = (layerName: string, defaultOpacity = 1) => {
    if (hoveredLegendLayer && hoveredLegendLayer !== layerName) return 0.1;
    return defaultOpacity;
  };\n`;

if (!content.includes('const [hoveredLegendLayer')) {
    content = content.replace('const [isDrawing, setIsDrawing] = useState(false);', 'const [isDrawing, setIsDrawing] = useState(false);\n  ' + state_addition);
}

content = content.replace(/onClick=\{\(\) => toggleLayer\('([^']+)'\)\}/g, (match, layer) => {
    return `onClick={() => toggleLayer('${layer}')} onMouseEnter={() => setHoveredLegendLayer('${layer}')} onMouseLeave={() => setHoveredLegendLayer(null)}`;
});

content = content.replace(/<Layer id="([^"]+)" source="([^"]+)" type="circle" paint=\{\{ 'circle-radius': ([0-9]+), 'circle-color': '([^']+)'(.*?)\}\} \/>/g, (match, id, source, radius, color, extra) => {
    if (source === 'disasters') {
        return `<Layer id="${id}" source="${source}" type="circle" paint={{ 'circle-radius': 8, 'circle-color': '#ef4444', 'circle-opacity': getOpacity('${source}', 0.7) }} />`;
    }
    return `<Layer id="${id}" source="${source}" type="circle" paint={{ 'circle-radius': ${radius}, 'circle-color': '${color}', 'circle-opacity': getOpacity('${source}')${extra} }} />`;
});

// Fix aircraft, cell-towers, springs (they are multi-line or different)
// I will just use regex to inject opacity if not present.
// For aircraft:
content = content.replace(/id="aircraft-layer"[\s\n]*type="symbol"[\s\n]*paint=\{\{([^}]+)\}\}/g, (match, paintInner) => {
    if (paintInner.includes('icon-opacity')) return match;
    return `id="aircraft-layer" \n              type="symbol" \n              paint={{${paintInner}, 'icon-opacity': getOpacity('aircraft')}}`;
});
content = content.replace(/id="cell-tower-layer"[\s\n]*type="circle"[\s\n]*paint=\{\{([^}]+)\}\}/g, (match, paintInner) => {
    if (paintInner.includes('circle-opacity')) return match;
    return `id="cell-tower-layer" \n              type="circle" \n              paint={{${paintInner}, 'circle-opacity': getOpacity('cell_towers')}}`;
});
content = content.replace(/id="spring-layer"[\s\n]*type="circle"[\s\n]*paint=\{\{([^}]+)\}\}/g, (match, paintInner) => {
    if (paintInner.includes('circle-opacity')) return match;
    return `id="spring-layer" \n              type="circle" \n              paint={{${paintInner}, 'circle-opacity': getOpacity('springs')}}`;
});

fs.writeFileSync('src/components/SphinxMap.tsx', content);
