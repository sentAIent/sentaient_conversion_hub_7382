const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

let replaced = false;
content = content.replace(/<button className="text-gray-400 hover:text-white shrink-0">\s*\{settings\.layers\.([a-z_]+) \? <Eye size=\{16\} \/> : <EyeOff size=\{16\} \/>\}\s*<\/button>/g, (match, layerName) => {
  replaced = true;
  return `<button className={settings.layers.${layerName} ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0" : "text-gray-600 hover:text-gray-400 shrink-0"}>
                  {settings.layers.${layerName} ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>`;
});

if (replaced) {
  fs.writeFileSync(path, content);
  console.log("Successfully made icons brighter!");
} else {
  console.log("Regex didn't match.");
}
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// Inject isLegendCollapsed state
const stateAnchor = "const [legendScale, setLegendScale] = useState(1);";
if (!content.includes("isLegendCollapsed")) {
  const injection = `
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
`;
  content = content.replace(stateAnchor, injection + stateAnchor);
}

// Read the old HUD block
const hudStart = content.indexOf('{/* SPHINX OS HUD */}');
const popupStart = content.indexOf('{pinCreationMode && (');

if (hudStart !== -1 && popupStart !== -1) {
  const newHud = `{/* SPHINX OS HUD */}
      <div 
        style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left', width: isLegendCollapsed ? '130px' : '380px', transition: 'width 0.3s ease-in-out' }}
        className="absolute top-4 left-4 z-10 bg-black/80 border border-cyan-900/50 p-4 rounded-lg text-white font-mono shadow-[0_0_15px_rgba(8,145,178,0.2)] backdrop-blur-sm overflow-hidden"
      >
        <div className="flex justify-between items-center mb-3 border-b border-cyan-900/50 pb-2">
          {!isLegendCollapsed && <h1 className="text-xl font-bold text-cyan-400 tracking-widest whitespace-nowrap">SPHINX OS</h1>}
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
              className="text-cyan-400 hover:text-white transition-colors p-1"
              title={isLegendCollapsed ? "Expand" : "Collapse"}
            >
              {isLegendCollapsed ? '»' : '«'}
            </button>
            {!isLegendCollapsed && (
              <button 
                onClick={() => {
                  const anyVisible = Object.values(settings.layers).some(v => v);
                  toggleAllLayers(!anyVisible);
                }}
                className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900 whitespace-nowrap"
              >
                {Object.values(settings.layers).some(v => v) ? 'HIDE ALL' : 'SHOW ALL'}
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-4 text-sm">

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.custom_pins ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('custom_pins')} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.custom_pins ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Custom Pins</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.custom_pins}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.aircraft ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('aircraft')} onMouseEnter={() => setHoveredLegendLayer('aircraft')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.aircraft ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-cyan-400 shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aircraft</span>}
              </span>
              <span className="text-cyan-400 font-bold ml-2">{visibleCounts.aircraft}</span>
            </div>
            
            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.cell_towers ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('cell_towers')} onMouseEnter={() => setHoveredLegendLayer('cell_towers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.cell_towers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-fuchsia-500 font-bold text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cell Towers</span>}
              </span>
              <span className="text-fuchsia-400 font-bold ml-2">{visibleCounts.cellTowers}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.springs ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('springs')} onMouseEnter={() => setHoveredLegendLayer('springs')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.springs ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-500 font-bold text-xl leading-none shrink-0 w-4 text-center">♦</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Springs</span>}
              </span>
              <span className="text-blue-400 font-bold ml-2">{visibleCounts.springs}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.power ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('power')} onMouseEnter={() => setHoveredLegendLayer('power')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.power ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-500 text-xl leading-none shrink-0 w-4 text-center">■</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Power Grid</span>}
              </span>
              <span className="text-yellow-400 font-bold ml-2">{visibleCounts.power}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.aviation ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('aviation')} onMouseEnter={() => setHoveredLegendLayer('aviation')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.aviation ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 text-lg leading-none shrink-0 w-4 text-center">▲</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Aviation/Helipads</span>}
              </span>
              <span className="text-red-400 font-bold ml-2">{visibleCounts.aviation}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.emergency ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('emergency')} onMouseEnter={() => setHoveredLegendLayer('emergency')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.emergency ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-500 font-bold text-xl leading-none shrink-0 w-4 text-center">+</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Emergency</span>}
              </span>
              <span className="text-emerald-400 font-bold ml-2">{visibleCounts.emergency}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.cameras ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('cameras')} onMouseEnter={() => setHoveredLegendLayer('cameras')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.cameras ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-white text-lg leading-none shrink-0 w-4 text-center">●</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Cameras / ALPR</span>}
              </span>
              <span className="text-gray-300 font-bold ml-2">{visibleCounts.cameras}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.weather_stations ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('weather_stations')} onMouseEnter={() => setHoveredLegendLayer('weather_stations')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.weather_stations ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-sky-300 rounded-full shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Weather Stations</span>}
              </span>
              <span className="text-sky-300 font-bold ml-2">{visibleCounts.weather_stations}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.data_centers ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('data_centers')} onMouseEnter={() => setHoveredLegendLayer('data_centers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.data_centers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-sm shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Data Centers</span>}
              </span>
              <span className="text-purple-400 font-bold ml-2">{visibleCounts.data_centers}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.radars ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('radars')} onMouseEnter={() => setHoveredLegendLayer('radars')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.radars ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-rose-500 font-bold text-xl leading-none shrink-0 w-4 text-center">◎</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Radar / Arrays</span>}
              </span>
              <span className="text-rose-400 font-bold ml-2">{visibleCounts.radars}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.public_lands ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('public_lands')} onMouseEnter={() => setHoveredLegendLayer('public_lands')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.public_lands ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-green-500/50 border border-green-800 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Public Lands</span>}
              </span>
              <span className="text-green-500 font-bold ml-2">{visibleCounts.public_lands}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.campsites ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('campsites')} onMouseEnter={() => setHoveredLegendLayer('campsites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.campsites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-lg leading-none shrink-0 w-4 text-center">◮</span>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Campsites</span>}
              </span>
              <span className="text-orange-400 font-bold ml-2">{visibleCounts.campsites}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.trails ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('trails')} onMouseEnter={() => setHoveredLegendLayer('trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-amber-600 shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Trails/Paths</span>}
              </span>
              <span className="text-amber-500 font-bold ml-2">{visibleCounts.trails}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.disasters ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('disasters')} onMouseEnter={() => setHoveredLegendLayer('disasters')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.disasters ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Disasters / Events</span>}
              </span>
              <span className="text-red-500 font-bold ml-2">{visibleCounts.disasters}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.earthquakes ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('earthquakes')} onMouseEnter={() => setHoveredLegendLayer('earthquakes')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white shrink-0">
                  {settings.layers.earthquakes ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse shrink-0"></div>
                {!isLegendCollapsed && <span className="whitespace-nowrap">Earthquakes</span>}
              </span>
              <span className="text-orange-500 font-bold ml-2">{visibleCounts.earthquakes}</span>
            </div>

        </div>
      </div>
      
      `;
  
  content = content.substring(0, hudStart) + newHud + content.substring(popupStart);
  fs.writeFileSync(path, content);
  console.log("Replaced with collapsible legend");
} else {
  console.log("Could not find boundaries");
}
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/download_queue.mjs';
let content = fs.readFileSync(file, 'utf8');

// The file might contain \` instead of ` because of the write_to_file escaping
content = content.replace(/\\\`/g, '\`');
// Same for \${
content = content.replace(/\\\$/g, '$');

fs.writeFileSync(file, content);
console.log("Fixed download_queue.mjs");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// The regex needs to match what I injected:
// className={settings.layers.layerName ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0" : "text-gray-600 hover:text-gray-400 shrink-0"}
content = content.replace(/className=\{settings\.layers\.([a-z_]+) \? "text-white drop-shadow-\[0_0_8px_rgba\(255,255,255,0\.8\)\] shrink-0" : "text-gray-600 hover:text-gray-400 shrink-0"\}/g, (match, layerName) => {
  return `className={settings.layers.${layerName} ? "text-white shrink-0" : "text-gray-400 hover:text-white shrink-0"}`;
});

fs.writeFileSync(path, content);
console.log("Fixed icon brightness and restored original disabled color.");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

// The previous agent removed legendScale. We need to put it back but use transform: scale() on the wrapper.
const hookToInsert = `
  const [legendScale, setLegendScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const scale = Math.max(0.5, Math.min(1.5, window.innerWidth / 1920));
      setLegendScale(scale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);
`;

// Insert the hook after `const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);`
code = code.replace(
  /const \[isLegendCollapsed, setIsLegendCollapsed\] = useState\(false\);/,
  `const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);\n${hookToInsert}`
);

// We need to replace all the `[Xvw]` with normal pixels so it can be scaled.
// 1vw = 19.2px at 1920 width.
// We'll replace [0.5vw] with 10px, [1vw] with 20px, etc.
const replacer = (match, p1) => {
  const vw = parseFloat(p1);
  const px = Math.round(vw * 19.2);
  return \`[\${px}px]\`;
};

code = code.replace(/\[([\d\.]+)vw\]/g, replacer);

// Add transform to the legend div
code = code.replace(
  /className="absolute top-\[19px\] left-\[19px\] z-10 bg-black\/80[^"]+"/,
  `$& style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left' }}`
);

fs.writeFileSync(path, code);
console.log("Fixed legend scale");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

// Replace the legend wrapper to add transform scale
// We inject a simple useLayoutEffect for legendScale if not present.
if (!code.includes('const [legendScale')) {
  code = code.replace(
    /const \[isLegendCollapsed, setIsLegendCollapsed\] = useState\(false\);/,
    `const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [legendScale, setLegendScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      setLegendScale(Math.max(0.5, Math.min(2.0, window.innerWidth / 1920)));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);`
  );
}

// Find the legend div which currently has:
// className="absolute top-[1vw] left-[1vw] z-10 bg-black/80 ...
// We replace it to include style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left' }}
code = code.replace(
  /className="absolute top-\[1vw\] left-\[1vw\](.*?)"/g,
  `className="absolute top-[1vw] left-[1vw]$1" style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left' }}`
);

fs.writeFileSync(path, code);
console.log("Fixed legend transform");
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/OfflineDownloaderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file might contain \` instead of ` because of the write_to_file escaping
content = content.replace(/\\\`/g, '\`');
// Same for \${
content = content.replace(/\\\$/g, '$');

fs.writeFileSync(file, content);
console.log("Fixed OfflineDownloaderModal.tsx");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace HUD wrapper
content = content.replace(
  'w-[25vw] bg-black/80 border border-cyan-900/50 p-[1.5vw] rounded-[0.5vw] text-white font-mono shadow-[0_0_1vw_rgba(8,145,178,0.2)] backdrop-blur-sm',
  'absolute top-4 left-4 z-10 bg-black/80 border border-cyan-900/50 text-white font-mono backdrop-blur-sm" style={{ width: "25vw", padding: "1.5vw", borderRadius: "0.5vw", boxShadow: "0 0 1vw rgba(8,145,178,0.2)" }} data-patched="true'
);
content = content.replace('className="absolute top-4 left-4 z-10 absolute top-4 left-4 z-10', 'className="absolute top-4 left-4 z-10'); // Fix duplicate if it happens

// We need to carefully replace the exact strings
const http = require('http');
const { execSync } = require('child_process');

try {
  const result = execSync('lsof -t -i:3117').toString().trim();
  if (result) {
    const pids = result.split('\n');
    for (const pid of pids) {
      console.log('Killing PID', pid);
      process.kill(parseInt(pid, 10), 'SIGKILL');
    }
  }
} catch (e) {
  console.log("No process on 3117 or lsof failed", e.message);
}
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

// 1. Add images on load
const imagesToAdd = `
          const addIcon = (name, pathData) => {
            if (!map.hasImage(name)) {
              const img = new Image(24, 24);
              img.onload = () => { if (!map.hasImage(name)) map.addImage(name, img, { sdf: true }); };
              img.src = 'data:image/svg+xml;charset=utf-8,<svg width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="' + pathData + '"/></svg>';
            }
          };
          addIcon('shape-square', 'M2 2h20v20H2V2zm2 2v16h16V4H4z');
          addIcon('shape-triangle', 'M12 2L2 21h20L12 2zm0 4.5l6.5 12.5h-13L12 6.5z');
          addIcon('shape-diamond', 'M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z');
          addIcon('shape-hexagon', 'M12 2L3.34 7v10L12 22l8.66-5V7L12 2zm0 2.3l6.66 3.8v7.8L12 19.7l-6.66-3.8v-7.8L12 4.3z');
          addIcon('shape-cross', 'M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2zm2 2v7H4v2h7v7h2v-7h7v-2h-7V4h-2z');
`;
code = code.replace(/if \(!map\.hasImage\('plane-icon'\)\) \{/, imagesToAdd + '\n          if (!map.hasImage(\'plane-icon\')) {');

// 2. Change Layers to use symbols or hollow circles
// Power
code = code.replace(
  /<Layer id="power-layer" source="power" type="circle".*?\/>/,
  `<Layer id="power-layer" source="power" type="symbol" layout={{ 'icon-image': 'shape-square', 'icon-size': 0.6, 'icon-allow-overlap': true, 'icon-ignore-placement': true }} paint={{ 'icon-color': '#eab308', 'icon-opacity': getOpacity('power') }} />`
);
// Aviation
code = code.replace(
  /<Layer id="aviation-layer" source="aviation" type="circle".*?\/>/,
  `<Layer id="aviation-layer" source="aviation" type="symbol" layout={{ 'icon-image': 'shape-triangle', 'icon-size': 0.7, 'icon-allow-overlap': true, 'icon-ignore-placement': true }} paint={{ 'icon-color': '#f87171', 'icon-opacity': getOpacity('aviation') }} />`
);
// Data Centers
code = code.replace(
  /<Layer id="data-center-layer" source="data-centers" type="circle".*?\/>/,
  `<Layer id="data-center-layer" source="data-centers" type="symbol" layout={{ 'icon-image': 'shape-diamond', 'icon-size': 0.7, 'icon-allow-overlap': true, 'icon-ignore-placement': true }} paint={{ 'icon-color': '#a855f7', 'icon-opacity': getOpacity('data_centers') }} />`
);
// Public Lands
code = code.replace(
  /<Layer id="public-land-layer" source="public-lands" type="circle".*?\/>/,
  `<Layer id="public-land-layer" source="public-lands" type="symbol" layout={{ 'icon-image': 'shape-hexagon', 'icon-size': 0.7, 'icon-allow-overlap': true, 'icon-ignore-placement': true }} paint={{ 'icon-color': '#22c55e', 'icon-opacity': getOpacity('public_lands') }} />`
);
// Emergency
code = code.replace(
  /<Layer id="emergency-layer" source="emergency" type="circle".*?\/>/,
  `<Layer id="emergency-layer" source="emergency" type="symbol" layout={{ 'icon-image': 'shape-cross', 'icon-size': 0.6, 'icon-allow-overlap': true, 'icon-ignore-placement': true }} paint={{ 'icon-color': '#10b981', 'icon-opacity': getOpacity('emergency') }} />`
);
// Radars (hollow circle)
code = code.replace(
  /<Layer id="radar-layer" source="radars" type="circle".*?\/>/,
  `<Layer id="radar-layer" source="radars" type="circle" paint={{ 'circle-radius': 7, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#f43f5e', 'circle-opacity': getOpacity('radars') }} />`
);
// Disasters (hollow circle)
code = code.replace(
  /<Layer id="disaster-layer" source="disasters" type="circle".*?\/>/,
  `<Layer id="disaster-layer" source="disasters" type="circle" paint={{ 'circle-radius': 8, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#ef4444', 'circle-opacity': getOpacity('disasters', 0.7) }} />`
);
// Earthquakes (hollow circle)
code = code.replace(
  /<Layer id="earthquake-layer" source="earthquakes" type="circle".*?\/>/,
  `<Layer id="earthquake-layer" source="earthquakes" type="circle" paint={{ 'circle-radius': 6, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#f97316', 'circle-opacity': getOpacity('earthquakes') }} />`
);
// Cameras (hollow circle)
code = code.replace(
  /<Layer id="camera-layer" source="cameras" type="circle".*?\/>/,
  `<Layer id="camera-layer" source="cameras" type="circle" paint={{ 'circle-radius': 5, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff', 'circle-opacity': getOpacity('cameras') }} />`
);
// Weather Stations (hollow circle)
code = code.replace(
  /<Layer id="weather-station-layer" source="weather-stations" type="circle".*?\/>/,
  `<Layer id="weather-station-layer" source="weather-stations" type="circle" paint={{ 'circle-radius': 5, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#7dd3fc', 'circle-opacity': getOpacity('weather_stations') }} />`
);
// Campsites (hollow circle)
code = code.replace(
  /<Layer id="campsite-layer" source="campsites" type="circle".*?\/>/,
  `<Layer id="campsite-layer" source="campsites" type="circle" paint={{ 'circle-radius': 5, 'circle-color': 'transparent', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#f97316', 'circle-opacity': getOpacity('campsites') }} />`
);

// 3. Update Legend Icons
// Power
code = code.replace(/<span className="text-yellow-500 text-\[1\.2vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">■<\/span>/, 
                    `<span className="text-yellow-500 text-[1.2vw] leading-[1vw] shrink-0 w-[1vw] text-center">□</span>`);
// Aviation
code = code.replace(/<span className="text-red-400 text-\[1vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">▲<\/span>/, 
                    `<span className="text-red-400 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">△</span>`);
// Emergency
code = code.replace(/<span className="text-emerald-500 font-bold text-\[1\.2vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">\+<\/span>/, 
                    `<span className="text-emerald-500 text-[1.2vw] leading-[1vw] shrink-0 w-[1vw] text-center">+</span>`);
// Cameras
code = code.replace(/<span className="text-white text-\[1vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">●<\/span>/, 
                    `<span className="text-white text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">○</span>`);
// Weather stations (was a div, replace with span)
code = code.replace(/<div className="w-\[0\.8vw\] h-\[0\.8vw\] bg-sky-300 rounded-full shrink-0"><\/div>/, 
                    `<span className="text-sky-300 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">○</span>`);
// Data centers (was a div)
code = code.replace(/<div className="w-\[0\.8vw\] h-\[0\.8vw\] bg-purple-500 rounded-sm shrink-0"><\/div>/, 
                    `<span className="text-purple-500 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">◇</span>`);
// Radars
code = code.replace(/<span className="text-rose-500 font-bold text-\[1\.2vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">◎<\/span>/, 
                    `<span className="text-rose-500 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">○</span>`);
// Public lands (was a div)
code = code.replace(/<div className="w-\[0\.8vw\] h-\[0\.8vw\] bg-green-500\/50 border border-green-800 shrink-0"><\/div>/, 
                    `<span className="text-green-500 text-[1.2vw] leading-[1vw] shrink-0 w-[1vw] text-center">⬡</span>`);
// Campsites
code = code.replace(/<span className="text-orange-500 font-bold text-\[1vw\] leading-\[1vw\] shrink-0 w-\[1vw\] text-center">◮<\/span>/, 
                    `<span className="text-orange-500 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center">○</span>`);
// Disasters (was a div animate-pulse)
code = code.replace(/<div className="w-\[0\.8vw\] h-\[0\.8vw\] bg-red-500 rounded-full animate-pulse shrink-0"><\/div>/, 
                    `<span className="text-red-500 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center animate-pulse">○</span>`);
// Earthquakes (was a div animate-pulse)
code = code.replace(/<div className="w-\[0\.8vw\] h-\[0\.8vw\] bg-orange-500 rounded-full animate-pulse shrink-0"><\/div>/, 
                    `<span className="text-orange-500 text-[1vw] leading-[1vw] shrink-0 w-[1vw] text-center animate-pulse">○</span>`);


fs.writeFileSync(path, code);
console.log("Shapes patched successfully");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

// 1. Replace legend shapes
code = code.replace(/<div className="w-\[0.8vw\] h-\[0.8vw\] bg-purple-500 rounded-full shrink-0"><\/div>/g, '<span className="text-purple-500 font-bold text-[1.2vw] leading-[1vw] shrink-0 w-[1vw] text-center">○</span>');
code = code.replace(/>▲</g, '>△<');
code = code.replace(/>●</g, '>○<');

// 2. Make all Mapbox circle layers hollow!
// We find all type="circle" layers and add circle-color: 'transparent' or change them to use stroke
// Wait, custom-pin-layer paint:
// paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' }}
// Make it hollow: 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#a855f7'
code = code.replace(
  /paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' }}/g,
  "paint={{ 'circle-radius': 6, 'circle-color': 'transparent', 'circle-stroke-width': 2, 'circle-stroke-color': '#a855f7' }}"
);

// Cell towers: 'circle-color': '#d946ef', 'circle-radius': 4
code = code.replace(
  /paint={{ 'circle-color': '#d946ef', 'circle-radius': 4, 'circle-opacity': getOpacity\('cellTowers'\) }}/g,
  "paint={{ 'circle-color': 'transparent', 'circle-radius': 4, 'circle-stroke-width': 2, 'circle-stroke-color': '#d946ef', 'circle-opacity': getOpacity('cellTowers') }}"
);

// Springs: 'circle-color': '#60a5fa', 'circle-radius': 4
code = code.replace(
  /paint={{ 'circle-color': '#60a5fa', 'circle-radius': 4, 'circle-opacity': getOpacity\('springs'\) }}/g,
  "paint={{ 'circle-color': 'transparent', 'circle-radius': 4, 'circle-stroke-width': 2, 'circle-stroke-color': '#60a5fa', 'circle-opacity': getOpacity('springs') }}"
);

// Earthquakes: 'circle-color': '#f97316', 'circle-radius': 5
code = code.replace(
  /paint={{ 'circle-color': '#f97316', 'circle-radius': 5, 'circle-opacity': getOpacity\('earthquakes'\) }}/g,
  "paint={{ 'circle-color': 'transparent', 'circle-radius': 5, 'circle-stroke-width': 2, 'circle-stroke-color': '#f97316', 'circle-opacity': getOpacity('earthquakes') }}"
);

// Clusters: 'circle-color': ['step', ['get', 'point_count'], '#a855f7', 10, '#d946ef', 50, '#f43f5e']
// I won't touch clusters for now, they are fine as solid (usually).

fs.writeFileSync(path, code);
console.log("All remaining legend shapes and map circles made hollow.");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(/area <= 1/g, 'area <= 25');
code = code.replace(/area > 1/g, 'area > 25');

fs.writeFileSync(path, code);
console.log("Patched area limits");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let code = fs.readFileSync(path, 'utf-8');

// 1. Change 'out center;' to 'out center geom;'
code = code.replace(/out center;/g, 'out center geom;');

// 2. Update geometry parsing logic
const oldParse = `        const geom = { type: 'Point', coordinates: [lon, lat] };`;
const newParse = `        let geom = { type: 'Point', coordinates: [lon, lat] };
        if (element.type === 'way' && element.geometry) {
          const coords = element.geometry.map(g => [g.lon, g.lat]);
          if (coords.length > 2 && coords[0][0] === coords[coords.length-1][0] && coords[0][1] === coords[coords.length-1][1]) {
            geom = { type: 'Polygon', coordinates: [coords] };
          } else {
            geom = { type: 'LineString', coordinates: coords };
          }
        } else if (element.type === 'relation' && element.members) {
           // For relations, try to build a polygon from the first outer way if possible, or just fallback to point
           const outerWay = element.members.find(m => m.type === 'way' && m.role === 'outer' && m.geometry);
           if (outerWay) {
             const coords = outerWay.geometry.map(g => [g.lon, g.lat]);
             if (coords.length > 2 && coords[0][0] === coords[coords.length-1][0] && coords[0][1] === coords[coords.length-1][1]) {
               geom = { type: 'Polygon', coordinates: [coords] };
             }
           }
        }
`;

code = code.replace(oldParse, newParse);

fs.writeFileSync(path, code);
console.log("Patched watchtower.mjs");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let code = fs.readFileSync(path, 'utf-8');

// Change query from `out center geom;` back to `out geom;`
code = code.replace(/out center geom;/g, 'out geom;');

const oldParse = `        const lat = element.lat || (element.center && element.center.lat);
        const lon = element.lon || (element.center && element.center.lon);`;

const newParse = `        let lat = element.lat || (element.center && element.center.lat);
        let lon = element.lon || (element.center && element.center.lon);
        if (!lat && element.bounds) {
           lat = (element.bounds.minlat + element.bounds.maxlat) / 2;
           lon = (element.bounds.minlon + element.bounds.maxlon) / 2;
        }`;

code = code.replace(oldParse, newParse);

fs.writeFileSync(path, code);
console.log("Patched watchtower.mjs to use 'out geom;'");
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/index.js';
let content = fs.readFileSync(file, 'utf8');

const importStatement = `import { DisastersService } from './lib/disasters.mjs';\nimport { downloadQueue } from './lib/download_queue.mjs';`;

content = content.replace(`import { DisastersService } from './lib/disasters.mjs';`, importStatement);

const endpoints = `
// Download Queue Endpoints
app.post('/api/cache/region/enqueue', async (req, res) => {
  const { bbox, minZoom, maxZoom, clientId, deadline } = req.body;
  if (!bbox || !deadline) return res.status(400).json({ error: 'Missing bbox or deadline' });

  // Premium tier mock validation
  // In a real app, verify a JWT or API key for client tier
  if (!clientId || !clientId.includes('premium')) {
     return res.status(403).json({ error: 'Offline region downloads are restricted to premium clients.' });
  }

  const jobId = await downloadQueue.enqueueJob(bbox, minZoom, maxZoom, clientId, deadline);
  res.json({ jobId });
});

app.get('/api/cache/region/status/:jobId', (req, res) => {
  const status = downloadQueue.getJobStatus(req.params.jobId);
  if (!status) return res.status(404).json({ error: 'Job not found' });
  res.json(status);
});

// On-demand OSINT Sweeps based on frontend viewport`;

content = content.replace(`// On-demand OSINT Sweeps based on frontend viewport`, endpoints);

fs.writeFileSync(file, content);
console.log("Patched index.js");
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import for OfflineDownloaderModal
const importStatement = `import { OfflineDownloaderModal } from './OfflineDownloaderModal';\nimport { DirectionsPanel } from './DirectionsPanel';`;
content = content.replace(`import { DirectionsPanel } from './DirectionsPanel';`, importStatement);

// 2. Add state variables for the modal
const stateVarsTarget = `  const [alerts, setAlerts] = useState<{ id: string, message: string, time: number }[]>([]);`;
const stateVarsRepl = `  const [alerts, setAlerts] = useState<{ id: string, message: string, time: number }[]>([]);
  const [isDownloaderOpen, setIsDownloaderOpen] = useState(false);
  const [downloadBbox, setDownloadBbox] = useState<string | null>(null);
  
  // Hardcoded for now. Wait, how do we know if premium?
  // User asked us to "Only make this available to premium clients"
  // Since we don't have a real auth context, let's mock it.
  const isPremiumClient = true; // Set to false to test restriction
  const clientId = "client_premium_123";
`;
content = content.replace(stateVarsTarget, stateVarsRepl);

// 3. Add the button in the map controls
// Need to find the right place. Where are map controls?
// There is a top-right overlay with tools maybe? Let's search for "maplibre-gl-ctrl" or "Eye"
// We have `SettingsPanel`, `GeocodingSearch`, `DirectionsPanel`.

fs.writeFileSync(file, content);
console.log("Patched SphinxMap.tsx step 1");
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetButton = `        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="bg-black/80 p-3 rounded-lg border border-cyan-900 shadow-[0_0_15px_rgba(8,145,178,0.5)] backdrop-blur-md hover:bg-cyan-900/40 transition-colors"
          title="Settings"
        >
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>`;

const newButton = `        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="bg-black/80 p-3 rounded-lg border border-cyan-900 shadow-[0_0_15px_rgba(8,145,178,0.5)] backdrop-blur-md hover:bg-cyan-900/40 transition-colors"
          title="Settings"
        >
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
        <button 
          onClick={() => {
            if (!isPremiumClient) {
              alert("Offline Region Download is restricted to Premium Clients.");
              return;
            }
            if (mapRef.current) {
               const bounds = mapRef.current.getBounds();
               setDownloadBbox(\`\${bounds.getWest()},\${bounds.getSouth()},\${bounds.getEast()},\${bounds.getNorth()}\`);
               setIsDownloaderOpen(true);
            }
          }}
          className={\`bg-black/80 px-4 py-2 rounded-lg border shadow-[0_0_15px_rgba(8,145,178,0.5)] backdrop-blur-md transition-colors font-mono text-sm \${isPremiumClient ? 'border-cyan-900 text-cyan-400 hover:bg-cyan-900/40' : 'border-gray-700 text-gray-500 cursor-not-allowed'}\`}
          title="Download Offline Region (Premium)"
        >
          {isPremiumClient ? 'Download Region' : 'Download Region (PRO)'}
        </button>`;

content = content.replace(targetButton, newButton);

const targetModal = `<SettingsPanel`;

const newModal = `<OfflineDownloaderModal 
        isOpen={isDownloaderOpen} 
        onClose={() => setIsDownloaderOpen(false)} 
        bbox={downloadBbox} 
        clientId={clientId} 
      />
      <SettingsPanel`;

content = content.replace(targetModal, newModal);

fs.writeFileSync(file, content);
console.log("Patched SphinxMap.tsx step 2");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

const addOutline = (layerId, color, propName) => {
  const symbolLayerRegex = new RegExp('<Layer id="' + layerId + '"(.*?)\\/>');
  const match = code.match(symbolLayerRegex);
  if (match) {
    const sourceMatch = match[1].match(/source="([^"]+)"/);
    if (sourceMatch) {
      const sourceName = sourceMatch[1];
      const outlineLayer = '<Layer id="' + layerId + '-outline" source="' + sourceName + '" type="line" filter={[\'==\', [\'geometry-type\'], \'Polygon\']} paint={{ \'line-color\': \'' + color + '\', \'line-width\': 2, \'line-opacity\': getOpacity(\'' + propName + '\') }} />\n            ';
      // replace the layer with outlineLayer + originalLayer
      code = code.replace(symbolLayerRegex, outlineLayer + match[0]);
    }
  }
};

addOutline('power-layer', '#eab308', 'power');
addOutline('aviation-layer', '#f87171', 'aviation');
addOutline('data-center-layer', '#a855f7', 'data_centers');
addOutline('public-land-layer', '#22c55e', 'public_lands');
addOutline('emergency-layer', '#10b981', 'emergency');
addOutline('radar-layer', '#f43f5e', 'radars');
addOutline('campsite-layer', '#f97316', 'campsites');
addOutline('camera-layer', '#ffffff', 'cameras');
addOutline('weather-station-layer', '#7dd3fc', 'weather_stations');

fs.writeFileSync(path, code);
console.log("Outlines added to SphinxMap.tsx");
const fs = require('fs');

const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. INTERACTIVE_LAYER_IDS
content = content.replace(
  "const INTERACTIVE_LAYER_IDS = ['cell-tower-cluster',",
  "const INTERACTIVE_LAYER_IDS = ['custom-pin-layer', 'cell-tower-cluster',"
);

// 2. UI State
const uiStateAnchor = "const [isDownloaderOpen, setIsDownloaderOpen] = useState(false);";
const uiStateInjection = `
  const [pinCreationMode, setPinCreationMode] = useState<{lat: number, lon: number} | null>(null);
  const [pinLabel, setPinLabel] = useState('');
  const [pinDescription, setPinDescription] = useState('');
`;
content = content.replace(uiStateAnchor, uiStateAnchor + "\n" + uiStateInjection);

// 3. visibleCounts
content = content.replace(
  "const [visibleCounts, setVisibleCounts] = useState({ springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 });",
  "const [visibleCounts, setVisibleCounts] = useState({ custom_pins: 0, springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 });"
);

// 4. updateVisibleCounts
const countsDefAnchor = "const counts = { springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 };";
content = content.replace(
  countsDefAnchor,
  "const counts = { custom_pins: 0, springs: 0, cellTowers: 0, earthquakes: 0, disasters: 0, aircraft: 0, power: 0, aviation: 0, emergency: 0, cameras: 0, weather_stations: 0, data_centers: 0, radars: 0, public_lands: 0, campsites: 0, trails: 0 };"
);

content = content.replace(
  "if (type === 'trail-layer') counts.trails++;",
  "if (type === 'trail-layer') counts.trails++;\n        if (type === 'custom-pin-layer') counts.custom_pins++;"
);

// 5. customPinsData
const trailDataAnchor = "const trailData = React.useMemo(() => ({ type: 'FeatureCollection' as const, features: trailFeatures }), [trailFeatures]);";
const customPinsDataInjection = `
  const customPinsData = React.useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: (settings.custom_pins || []).map((p: any) => ({
      type: 'Feature' as const,
      properties: { ...p, isCustomPin: true, type: 'custom_pin' },
      geometry: { type: 'Point' as const, coordinates: [p.lon, p.lat] }
    }))
  }), [settings.custom_pins]);
`;
content = content.replace(trailDataAnchor, trailDataAnchor + "\n" + customPinsDataInjection);

// 6. Layer rendering
const layerRenderAnchor = "{settings.layers.earthquakes && (";
const layerRenderInjection = `
        {settings.layers.custom_pins && (
          <Source id="custom-pins" type="geojson" data={customPinsData}>
            <Layer 
              id="custom-pin-layer" 
              type="circle" 
              paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' }} 
            />
          </Source>
        )}
`;
content = content.replace(layerRenderAnchor, layerRenderInjection + "\n" + layerRenderAnchor);

// 7. onMapClick
const onMapClickAnchor = "const onMapClick = (e: any) => {";
const onMapClickInjection = `
    if (e.originalEvent.shiftKey) {
      setPinCreationMode({ lat: e.lngLat.lat, lon: e.lngLat.lng });
      setPinLabel('');
      setPinDescription('');
      return;
    }
`;
content = content.replace(onMapClickAnchor, onMapClickAnchor + "\n" + onMapClickInjection);

// 8. Popup Title
content = content.replace(
  "selectedFeature.properties.type === 'cell_tower' ?",
  "selectedFeature.properties.type === 'custom_pin' ? 'Custom Pin' :\n                 selectedFeature.properties.type === 'cell_tower' ?"
);

// 9. Popup Content
const popupContentAnchor = "{selectedFeature.properties.type === 'trail' && (";
const popupContentInjection = `
              {selectedFeature.properties.type === 'custom_pin' && (
                <div className="space-y-1 mt-2">
                  <p><strong>Label:</strong> {selectedFeature.properties.label}</p>
                  {selectedFeature.properties.description && <p><strong>Description:</strong> {selectedFeature.properties.description}</p>}
                </div>
              )}
`;
content = content.replace(popupContentAnchor, popupContentInjection + "\n" + popupContentAnchor);

// 10. HUD Legend
const legendAnchor = "</div>\n        <div className=\"space-y-2 mt-4 text-[clamp(0.7rem,1vw,0.875rem)] max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar\">";
const legendInjection = `
            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1 rounded transition-colors \${!settings.layers.custom_pins ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('custom_pins')} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.custom_pins ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Custom Pins
              </span>
              <span className="text-purple-400">{visibleCounts.custom_pins}</span>
            </div>
`;
content = content.replace(legendAnchor, legendAnchor + "\n" + legendInjection);

// 11. Modal UI
const modalAnchor = "<OfflineDownloaderModal ";
const modalInjection = `
      {pinCreationMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '8px', width: '400px', color: 'white', fontFamily: 'monospace' }}>
            <h2>Create Custom Pin</h2>
            <p style={{ color: '#ccc', marginBottom: 20, fontSize: '12px' }}>Save a location to your map.</p>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Label</label>
              <input type="text" value={pinLabel} onChange={e => setPinLabel(e.target.value)} style={{ padding: '8px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} placeholder="e.g., Safe House" autoFocus />
            </div>
            <div style={{ marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label>Description (optional)</label>
              <textarea value={pinDescription} onChange={e => setPinDescription(e.target.value)} style={{ padding: '8px', backgroundColor: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }} placeholder="Additional details..." />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button 
                onClick={() => {
                  const newPin = { id: Date.now().toString(), lat: pinCreationMode.lat, lon: pinCreationMode.lon, label: pinLabel || 'Pinned Location', description: pinDescription };
                  updateSettings({ custom_pins: [...(settings.custom_pins || []), newPin] });
                  setPinCreationMode(null);
                }} 
                style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Save Pin
              </button>
              <button onClick={() => setPinCreationMode(null)} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
`;
content = content.replace(modalAnchor, modalInjection + "\n      " + modalAnchor);

// Save back
fs.writeFileSync(path, content);
console.log("Successfully patched SphinxMap.tsx");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let content = fs.readFileSync(path, 'utf8');

// Increase Overpass query timeout from 15 to 60
content = content.replace('[out:json][timeout:15];', '[out:json][timeout:60];');

// Increase fetch AbortController timeout from 18000 to 65000
content = content.replace('setTimeout(() => controller.abort(), 18000);', 'setTimeout(() => controller.abort(), 65000);');

fs.writeFileSync(path, content);
console.log("Timeouts increased to 60 seconds.");
const fs = require('fs');

const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let code = fs.readFileSync(path, 'utf-8');

// Remove legendScale state and effect
code = code.replace(/const \[isLegendCollapsed, setIsLegendCollapsed\] = useState\(false\);\nconst \[legendScale, setLegendScale\] = useState\(1\);\n\s*useEffect\(\(\) => \{\n\s*const handleResize = \(\) => setLegendScale\(window\.innerWidth \/ 1920\);\n\s*handleResize\(\);\n\s*window\.addEventListener\('resize', handleResize\);\n\s*return \(\) => window\.removeEventListener\('resize', handleResize\);\n\s*\}, \[\]\);\n/, 'const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);\n');

// Find the HUD block
const hudStart = code.indexOf('{/* SPHINX OS HUD */}');
const topControlsStart = code.indexOf('{/* TOP CONTROLS */}');
const hudEnd = code.indexOf('id: Date.now().toString()', hudStart); // somewhere past the hud

if (hudStart === -1) {
    console.error("HUD not found");
    process.exit(1);
}

// Just extract the HUD block
let before = code.substring(0, hudStart);
let after = code.substring(code.indexOf('      {pinCreationMode && (', hudStart));
let hud = code.substring(hudStart, code.indexOf('      {pinCreationMode && (', hudStart));

// Replace inline style for width and transform
hud = hud.replace(/style=\{\{ transform: `scale\(\$\{legendScale\}\)`, transformOrigin: 'top left', width: isLegendCollapsed \? '130px' : '380px', transition: 'width 0\.3s ease-in-out' \}\}/, 
                  "style={{ width: isLegendCollapsed ? '8vw' : '22vw', transition: 'width 0.3s ease-in-out' }}");

// Replace layout classes with vw
hud = hud.replace(/top-4/g, 'top-[1vw]');
hud = hud.replace(/left-4/g, 'left-[1vw]');
hud = hud.replace(/p-4/g, 'p-[1vw]');
hud = hud.replace(/mb-3/g, 'mb-[0.7vw]');
hud = hud.replace(/pb-2/g, 'pb-[0.5vw]');
hud = hud.replace(/gap-2/g, 'gap-[0.5vw]');
hud = hud.replace(/gap-3/g, 'gap-[0.7vw]');
hud = hud.replace(/p-1\.5/g, 'p-[0.4vw]');
hud = hud.replace(/p-1/g, 'p-[0.3vw]');
hud = hud.replace(/ml-2/g, 'ml-[0.5vw]');
hud = hud.replace(/px-2/g, 'px-[0.5vw]');
hud = hud.replace(/py-1/g, 'py-[0.3vw]');
hud = hud.replace(/w-4/g, 'w-[1vw]');
hud = hud.replace(/w-3/g, 'w-[0.8vw]');
hud = hud.replace(/h-3/g, 'h-[0.8vw]');
hud = hud.replace(/mt-4/g, 'mt-[1vw]');

// Typography
hud = hud.replace(/text-xl/g, 'text-[1.2vw]');
hud = hud.replace(/text-lg/g, 'text-[1vw]');
hud = hud.replace(/text-sm/g, 'text-[0.8vw]');
hud = hud.replace(/text-xs/g, 'text-[0.7vw]');
hud = hud.replace(/leading-none/g, 'leading-[1vw]');

// Icons
hud = hud.replace(/size=\{16\}/g, 'width="1vw" height="1vw"');

fs.writeFileSync(path, before + hud + after);
console.log("Patched successfully");
import fs from 'fs';

const file = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let content = fs.readFileSync(file, 'utf8');

const target = `    try {
      const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) return { error: true, message: \`Overpass API Error: \${response.status}\` };
      const data = await response.json();
      
      if (data.remark) {
        console.warn('[Sphinx Watchtower] Overpass API Remark:', data.remark);
        if (!data.elements || data.elements.length === 0) {
          return { error: true, message: \`Overpass Warning: \${data.remark}\` };
        }
      }`;

const replacement = `    let elements = [];
    try {
      const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(\`Overpass API Error: \${response.status}\`);
      const data = await response.json();
      
      if (data.remark) {
        console.warn('[Sphinx Watchtower] Overpass API Remark:', data.remark);
      }
      if (data.elements && data.elements.length > 0) {
        elements = data.elements;
        this.cache.saveFeatures(elements);
      }
    } catch (error) {
      console.error('[Sphinx Watchtower] Network fetch failed, falling back to SQLite cache:', error.message);
      if (bboxString) {
        let [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',').map(parseFloat);
        elements = this.cache.getFeaturesInBbox(sw_lat, sw_lon, ne_lat, ne_lon);
        console.log(\`[Sphinx Watchtower] Served \${elements.length} elements from offline cache.\`);
      } else {
        return { error: true, message: error.message };
      }
    }

    try {`;

content = content.replace(target, replacement);
content = content.replace(`(data.elements || []).forEach(element => {`, `elements.forEach(element => {`);

fs.writeFileSync(file, content);
console.log("Patched successfully");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let content = fs.readFileSync(path, 'utf8');

// Also make sure we don't wipe global data if it's empty during a fallback
// Wait, actually I just want to reply to the user. I already patched the area > 1 wiping.
// But what about data centers when fallback is empty?
content = content.replace(
  "return this.cachedOverpassData;",
  `
      // Prevent wiping global infrastructure if the BBOX is massive and we fell back to an empty cache
      if (elements.length === 0 && area > 10) {
         return { error: true, message: 'BBOX too large, preserved map state.' };
      }
      return this.cachedOverpassData;
  `
);
fs.writeFileSync(path, content);
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-core/lib/watchtower.mjs';
let content = fs.readFileSync(path, 'utf8');

// If area > 1, omit the keys from the response so frontend doesn't wipe them.
content = content.replace(
  "this.cachedOverpassData = { \n        springs: { type: 'FeatureCollection', features: springs },",
  `this.cachedOverpassData = { 
        data_centers: { type: 'FeatureCollection', features: dataCenters },
        radars: { type: 'FeatureCollection', features: radars },
        public_lands: { type: 'FeatureCollection', features: publicLands },
        campsites: { type: 'FeatureCollection', features: campsites },
        weather_stations: { type: 'FeatureCollection', features: weatherStations },
        aviation: { type: 'FeatureCollection', features: aviation }
      };
      
      // Only overwrite local dense infrastructure if we actually queried it (area <= 1)
      if (!(!isGlobalQuery && area > 1)) {
        this.cachedOverpassData.springs = { type: 'FeatureCollection', features: springs };
        this.cachedOverpassData.power = { type: 'FeatureCollection', features: power };
        this.cachedOverpassData.emergency = { type: 'FeatureCollection', features: emergency };
        this.cachedOverpassData.cameras = { type: 'FeatureCollection', features: cameras };
        this.cachedOverpassData.trails = { type: 'FeatureCollection', features: trails };
      }
      
      // Ignore this block below which we are replacing
      /*`
);

content = content.replace(
  "trails: { type: 'FeatureCollection', features: trails }\n      };",
  "trails: { type: 'FeatureCollection', features: trails }\n      }; */"
);

// When fetch fails, don't return [] for everything, just return { error: true, message: ... } 
// wait, if we return { error: true }, the frontend just logs a warning and DOES NOT wipe the arrays!
// Currently it does:
// if (!overpass.error) { if (overpass.springs) setSpringFeatures... }
// So if it falls back to SQLite and returns empty, it wipes!
// Let's change the catch block to return `{ error: true, message: 'Fell back to cache' }` if cache is empty?
// Actually, SQLite cache is fine, but we should apply the same omission for area > 1!

fs.writeFileSync(path, content);
console.log("Patched watchtower.mjs");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove min-w and max-w, change padding to vw, and set a base font size in vw.
content = content.replace(
  /w-\[25vw\] min-w-\[240px\] max-w-\[360px\] bg-black\/80 border border-cyan-900\/50 p-4 rounded text-white font-mono shadow-\[0_0_15px_rgba\(8,145,178,0\.2\)\] backdrop-blur-sm/,
  'w-[25vw] bg-black/80 border border-cyan-900/50 p-[1.5vw] rounded-[0.5vw] text-white font-mono shadow-[0_0_1vw_rgba(8,145,178,0.2)] backdrop-blur-sm'
);

// 2. Change the header
content = content.replace(
  /text-\[clamp\(1rem,1\.5vw,1\.25rem\)\] font-bold text-cyan-400 tracking-widest/,
  'text-[1.5vw] font-bold text-cyan-400 tracking-widest'
);

content = content.replace(
  /text-\[clamp\(0\.6rem,0\.8vw,0\.75rem\)\] text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-950\/30 px-2 py-1 rounded border border-cyan-900/,
  'text-[0.8vw] text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-950/30 px-[0.5vw] py-[0.25vw] rounded-[0.25vw] border border-cyan-900'
);

// 3. Change the list container
content = content.replace(
  /space-y-2 mt-4 text-\[clamp\(0\.7rem,1vw,0\.875rem\)\] max-h-\[70vh\] overflow-y-auto pr-2 custom-scrollbar/g,
  'space-y-[0.5vw] mt-[1vw] text-[1vw] max-h-[70vh] overflow-y-auto pr-[0.5vw] custom-scrollbar'
);

// 4. Change all padding in list items
content = content.replace(/p-1 rounded/g, 'p-[0.25vw] rounded-[0.25vw]');
content = content.replace(/gap-2/g, 'gap-[0.5vw]');

// 5. Change all <Eye size={14} /> to size="1em"
content = content.replace(/size={14}/g, 'size="1.2em"');

// 6. Change all shape sizes (w-3 h-3) to em
content = content.replace(/w-3 h-3/g, 'w-[1em] h-[1em]');

// 7. Change borders/margins if necessary
content = content.replace(/mb-2/g, 'mb-[0.5vw]');
content = content.replace(/pb-2/g, 'pb-[0.5vw]');

fs.writeFileSync(path, content);
console.log("HUD Scaled!");
const fs = require('fs');
const path = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/src/components/SphinxMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// First, inject the resize listener
const stateAnchor = "const [legendScale, setLegendScale] = useState(1);";
if (!content.includes(stateAnchor)) {
  const injectAfter = "const [downloadBbox, setDownloadBbox] = useState<string | null>(null);";
  const injection = `
  const [legendScale, setLegendScale] = useState(1);
  useEffect(() => {
    const handleResize = () => setLegendScale(window.innerWidth / 1920);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
`;
  content = content.replace(injectAfter, injectAfter + "\n" + injection);
}

// Now replace the entire HUD with a transformed div wrapping standard tailwind
const hudStart = content.indexOf('{/* SPHINX OS HUD */}');
const popupStart = content.indexOf('{pinCreationMode && (');

if (hudStart !== -1 && popupStart !== -1) {
  // Read the original HUD
  // Since we messed it up earlier, let's just write the entire HUD block clean.
  const newHud = `{/* SPHINX OS HUD */}
      <div 
        style={{ transform: \`scale(\${legendScale})\`, transformOrigin: 'top left', width: '380px' }}
        className="absolute top-4 left-4 z-10 bg-black/80 border border-cyan-900/50 p-4 rounded-lg text-white font-mono shadow-[0_0_15px_rgba(8,145,178,0.2)] backdrop-blur-sm"
      >
        <div className="flex justify-between items-center mb-3 border-b border-cyan-900/50 pb-2">
          <h1 className="text-xl font-bold text-cyan-400 tracking-widest">SPHINX OS</h1>
          <button 
            onClick={() => {
              const anyVisible = Object.values(settings.layers).some(v => v);
              toggleAllLayers(!anyVisible);
            }}
            className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900"
          >
            {Object.values(settings.layers).some(v => v) ? 'HIDE ALL' : 'SHOW ALL'}
          </button>
        </div>
        <div className="space-y-2 mt-4 text-sm">

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.custom_pins ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('custom_pins')} onMouseEnter={() => setHoveredLegendLayer('custom_pins')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.custom_pins ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Custom Pins
              </span>
              <span className="text-purple-400 font-bold">{visibleCounts.custom_pins}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.aircraft ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('aircraft')} onMouseEnter={() => setHoveredLegendLayer('aircraft')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.aircraft ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-cyan-400" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                Aircraft
              </span>
              <span className="text-cyan-400 font-bold">{visibleCounts.aircraft}</span>
            </div>
            
            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.cell_towers ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('cell_towers')} onMouseEnter={() => setHoveredLegendLayer('cell_towers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.cell_towers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-fuchsia-500 font-bold text-lg leading-none">▲</span>
                Cell Towers
              </span>
              <span className="text-fuchsia-400 font-bold">{visibleCounts.cellTowers}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.springs ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('springs')} onMouseEnter={() => setHoveredLegendLayer('springs')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.springs ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-blue-500 font-bold text-xl leading-none">♦</span>
                Springs
              </span>
              <span className="text-blue-400 font-bold">{visibleCounts.springs}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.power ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('power')} onMouseEnter={() => setHoveredLegendLayer('power')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.power ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-yellow-500 text-xl leading-none">■</span>
                Power Grid
              </span>
              <span className="text-yellow-400 font-bold">{visibleCounts.power}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.aviation ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('aviation')} onMouseEnter={() => setHoveredLegendLayer('aviation')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.aviation ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-red-400 text-lg leading-none">▲</span>
                Aviation/Helipads
              </span>
              <span className="text-red-400 font-bold">{visibleCounts.aviation}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.emergency ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('emergency')} onMouseEnter={() => setHoveredLegendLayer('emergency')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.emergency ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-emerald-500 font-bold text-xl leading-none">+</span>
                Emergency
              </span>
              <span className="text-emerald-400 font-bold">{visibleCounts.emergency}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.cameras ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('cameras')} onMouseEnter={() => setHoveredLegendLayer('cameras')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.cameras ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-white text-lg leading-none">●</span>
                Cameras / ALPR
              </span>
              <span className="text-gray-300 font-bold">{visibleCounts.cameras}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.weather_stations ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('weather_stations')} onMouseEnter={() => setHoveredLegendLayer('weather_stations')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.weather_stations ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-sky-300 rounded-full"></div>
                Weather Stations
              </span>
              <span className="text-sky-300 font-bold">{visibleCounts.weather_stations}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.data_centers ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('data_centers')} onMouseEnter={() => setHoveredLegendLayer('data_centers')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.data_centers ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                Data Centers
              </span>
              <span className="text-purple-400 font-bold">{visibleCounts.data_centers}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.radars ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('radars')} onMouseEnter={() => setHoveredLegendLayer('radars')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.radars ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-rose-500 font-bold text-xl leading-none">◎</span>
                Radar / Arrays
              </span>
              <span className="text-rose-400 font-bold">{visibleCounts.radars}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.public_lands ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('public_lands')} onMouseEnter={() => setHoveredLegendLayer('public_lands')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.public_lands ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-green-500/50 border border-green-800"></div>
                Public Lands
              </span>
              <span className="text-green-500 font-bold">{visibleCounts.public_lands}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.campsites ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('campsites')} onMouseEnter={() => setHoveredLegendLayer('campsites')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.campsites ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-orange-500 font-bold text-lg leading-none">◮</span>
                Campsites
              </span>
              <span className="text-orange-400 font-bold">{visibleCounts.campsites}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.trails ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('trails')} onMouseEnter={() => setHoveredLegendLayer('trails')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.trails ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-0.5 bg-amber-600"></div>
                Trails/Paths
              </span>
              <span className="text-amber-500 font-bold">{visibleCounts.trails}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.disasters ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('disasters')} onMouseEnter={() => setHoveredLegendLayer('disasters')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.disasters ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Disasters / Events
              </span>
              <span className="text-red-500 font-bold">{visibleCounts.disasters}</span>
            </div>

            <div className={\`flex justify-between items-center cursor-pointer hover:bg-white/5 p-1.5 rounded transition-colors \${!settings.layers.earthquakes ? 'opacity-50' : ''}\`} onClick={() => toggleLayer('earthquakes')} onMouseEnter={() => setHoveredLegendLayer('earthquakes')} onMouseLeave={() => setHoveredLegendLayer(null)}>
              <span className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  {settings.layers.earthquakes ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                Earthquakes
              </span>
              <span className="text-orange-500 font-bold">{visibleCounts.earthquakes}</span>
            </div>

        </div>
      </div>
      
      `;
  
  content = content.substring(0, hudStart) + newHud + content.substring(popupStart);
  fs.writeFileSync(path, content);
  console.log("Replaced with transform: scale()");
} else {
  console.log("Could not find boundaries");
}
