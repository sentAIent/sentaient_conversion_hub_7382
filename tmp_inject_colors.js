const fs = require('fs');
const path = 'public/mindwave.html';
let html = fs.readFileSync(path, 'utf8');

const mapping = {
    'sphereBtn': 'sphere',
    'cubeBtn': 'cube',
    'dragonBtn': 'dragon',
    'galaxyBtn': 'galaxy',
    'flowBtn': 'particles',
    'lightspeedBtn': 'lightspeed',
    'lavaBtn': 'lava',
    'fireplaceBtn': 'fireplace',
    'rainBtn': 'rainforest',
    'zenBtn': 'zengarden',
    'oceanBtn': 'ocean',
    'cyberBtn': 'cyber',
    'matrixBtn': 'matrix',
    'mandalaBtn': 'mandala'
};

for (const [btnId, mode] of Object.entries(mapping)) {
    const defColor = (mode === 'cyber' || mode === 'matrix') ? '#00FF41' : '#60a9ff';
    const tag = `id="${btnId}"`;
    
    const btnStart = html.indexOf(tag);
    if (btnStart === -1) {
        console.warn(`Could not find ${tag}`);
        continue; // Note: 'mandalaBtn' might not exist in the exact same location or was removed
    }
    
    const bracketEnd = html.indexOf('>', btnStart);
    
    const injectStr = `\n                    <input type="color" data-visual-color="${mode}" class="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" value="${defColor}">`;
    
    if (!html.substring(bracketEnd, bracketEnd + 200).includes('data-visual-color')) {
        html = html.substring(0, bracketEnd + 1) + injectStr + html.substring(bracketEnd + 1);
        console.log(`Injected color picker into ${btnId}`);
    }
}

if (!html.includes('id="cyberColorPicker"')) {
    const cyberColorStr = `
                <!-- Color -->
                <div class="flex flex-col gap-0.5 items-center">
                    <label class="text-[8px] text-[var(--text-muted)] uppercase">Color</label>
                    <input type="color" id="cyberColorPicker" value="#00FF41"
                        class="w-8 h-4 rounded cursor-pointer bg-transparent border-none">
                </div>
                <div class="w-px h-6 bg-white/10 mx-0.5"></div>`;
    
    const target = `<!-- Mode Selector (4 buttons) -->`;
    const targetIdx = html.indexOf('id="cyberSettingsPanel"');
    if (targetIdx !== -1) {
        const insertPoint = html.indexOf(target, targetIdx);
        if (insertPoint !== -1) {
            html = html.substring(0, insertPoint) + cyberColorStr + '\n                ' + html.substring(insertPoint);
            console.log('Injected cyberColorPicker');
        }
    }
}

fs.writeFileSync(path, html);
