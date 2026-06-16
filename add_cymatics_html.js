const fs = require('fs');
const path = require('path');

const classes = [
    { id: 5, name: 'Class V: Sacred Geometry', count: 10, defaultColors: ['#ffd700', '#b8860b'] },
    { id: 6, name: 'Class VI: Bioluminescent Neural', count: 10, defaultColors: ['#00ff00', '#003300'] },
    { id: 7, name: 'Class VII: Starburst / Supernova', count: 10, defaultColors: ['#ffffff', '#ffd700'] }
];

let addedHtml = '';

for (const c of classes) {
    addedHtml += `        <div class="cymatics-class-container mb-6">\n`;
    addedHtml += `            <h4 class="text-[10px] text-gray-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">${c.name}</h4>\n`;
    addedHtml += `            <div class="grid grid-cols-4 gap-2">\n`;
    for (let v = 0; v < c.count; v++) {
        addedHtml += `                <button class="cymatics-pattern-btn aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all group relative" onclick="window.setCymaticPattern(${c.id}, ${v})">\n`;
        addedHtml += `                    <img src="binaural-assets/images/cymatics/c${c.id}_${v}_final.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">\n`;
        addedHtml += `                    <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors"></div>\n`;
        addedHtml += `                    <div class="absolute bottom-1 right-1 text-[8px] text-white/50 bg-black/50 px-1 rounded">${v + 1}</div>\n`;
        addedHtml += `                </button>\n`;
    }
    addedHtml += `            </div>\n`;
    addedHtml += `            <div class="mt-3 flex gap-2">\n`;
    addedHtml += `                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="${c.defaultColors[0]}" onchange="window.setCymaticColor(${c.id}, 1, this.value)" title="Primary Color">\n`;
    addedHtml += `                <input type="color" class="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" value="${c.defaultColors[1]}" onchange="window.setCymaticColor(${c.id}, 2, this.value)" title="Secondary Color">\n`;
    addedHtml += `                <input type="range" class="mw-slider flex-1" min="0" max="2" step="0.01" value="1.0" oninput="window.setCymaticParam(${c.id}, 'intensity', this.value)" title="Intensity">\n`;
    addedHtml += `            </div>\n`;
    addedHtml += `        </div>\n`;
}

const htmlPath = path.join(__dirname, 'mindwave.html');
let htmlStr = fs.readFileSync(htmlPath, 'utf8');

// Insert right before:
//         </div>
//     </div>
// </div>
// 
//             <!-- TAB: STUDIO -->

const targetStr = `        </div>\n    </div>\n</div>\n\n            <!-- TAB: STUDIO -->`;
const replaceStr = `        </div>\n${addedHtml}    </div>\n</div>\n\n            <!-- TAB: STUDIO -->`;

if (htmlStr.includes(targetStr)) {
    htmlStr = htmlStr.replace(targetStr, replaceStr);
    fs.writeFileSync(htmlPath, htmlStr);
    console.log("Successfully injected new cymatics UI!");
} else {
    console.error("Could not find target insertion point in mindwave.html");
}
