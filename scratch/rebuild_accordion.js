const fs = require('fs');

const coreContent = fs.readFileSync('binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const palettesMatch = coreContent.match(/const CYMATICS_PALETTES = (\{[\s\S]*?^\};\n)/m);
if (!palettesMatch) {
    console.error("Could not find CYMATICS_PALETTES");
    process.exit(1);
}
const palettesStr = palettesMatch[1];

const classes = [];
const classRegex = /(\d+):\s*\[(.*?)\]\s*(?=,\n\s*\d+:|\n\s*\};)/gs;

let match;
while ((match = classRegex.exec(palettesStr)) !== null) {
    const classId = parseInt(match[1]);
    const innerContent = match[2];
    
    let name = `Class ${classId}`;
    const commentMatch = innerContent.match(/\/\/\s*(.*?)(?:\n|$)/);
    if (commentMatch) {
        name = commentMatch[1].replace(/\(\d+\)/, '').trim();
    }
    
    const variationsMatch = innerContent.match(/\[0x[0-9a-fA-F]+,\s*0x[0-9a-fA-F]+\]/g);
    const varCount = variationsMatch ? variationsMatch.length : 1;
    
    classes.push({ id: classId, name, vars: varCount });
}

let html = `<!-- THE ULTIMATE CYMATICS UI LIBRARY -->
<div class="mt-8">
    <h4 class="text-[12px] font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]"></span>
        The Definitive Cymatics Collection
    </h4>
    
    <div class="space-y-3 custom-scrollbar max-h-[800px] overflow-y-auto pr-2">
`;

classes.forEach(c => {
    let colorClass = "purple";
    if (c.id > 18) colorClass = "fuchsia";
    if (c.id > 21) colorClass = "amber";
    if (c.id === 25) colorClass = "cyan";

    html += `
        <!-- CLASS ${c.id} -->
        <div class="accordion-item border border-${colorClass}-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 group">
            <button class="accordion-header w-full p-3 flex justify-between items-center text-left text-${colorClass}-300 font-bold text-[10px] uppercase tracking-wider hover:bg-${colorClass}-500/10 transition-all" onclick="const content = this.nextElementSibling; const isOpen = !content.classList.contains('hidden'); document.querySelectorAll('.accordion-content').forEach(c => c.classList.add('hidden')); document.querySelectorAll('.accordion-header svg').forEach(s => s.classList.remove('rotate-180')); if(!isOpen) { content.classList.remove('hidden'); this.querySelector('svg').classList.add('rotate-180'); }">
                <span class="truncate pr-4 flex items-center gap-2">
                    <span class="text-[11px] font-mono opacity-50">[${c.id}]</span> ${c.name}
                </span>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="text-[9px] bg-${colorClass}-500/20 text-${colorClass}-200 px-1.5 py-0.5 rounded shadow-sm">${c.vars} Vars</span>
                    <svg class="w-3 h-3 transition-transform duration-300 text-${colorClass}-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </button>
            <div class="accordion-content hidden bg-black/60 p-3 border-t border-${colorClass}-500/10">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">`;
                
    for (let i = 0; i < c.vars; i++) {
        html += `
                    <button class="px-2 py-1.5 bg-white/5 hover:bg-${colorClass}-500/30 text-white/70 hover:text-white rounded border border-white/5 hover:border-${colorClass}-500/50 text-[9px] font-mono transition-all text-center truncate" onclick="window.setCymaticPattern(${c.id}, ${i})" title="Load Variation ${i}">Var ${i}</button>`;
    }
    
    html += `
                </div>
            </div>
        </div>`;
});

html += `
    </div>
</div>
<!-- END ULTIMATE CYMATICS UI LIBRARY -->`;

let mwContent = fs.readFileSync('mindwave.html', 'utf8');

const startTag = '<!-- THE ULTIMATE CYMATICS UI LIBRARY -->';
let startIndex = mwContent.indexOf(startTag);

// Let's find the end index by looking for the end of the Class 25 div
// Since we didn't put an end comment, we'll use a regex to match the entire block
const blockRegex = /<!-- THE ULTIMATE CYMATICS UI LIBRARY -->[\s\S]*?<!-- CLASS 25 -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

if (startIndex === -1) {
    console.error("Could not find start tag");
    process.exit(1);
}

const blockMatch = blockRegex.exec(mwContent);
if (!blockMatch) {
    console.error("Could not match the block regex");
    process.exit(1);
}

// Replace the matched block with our new html
const newMwContent = mwContent.replace(blockRegex, html);
fs.writeFileSync('mindwave.html', newMwContent);
console.log("Successfully rebuilt accordion with " + classes.length + " classes! Total vars: " + classes.reduce((a,b)=>a+b.vars,0));
