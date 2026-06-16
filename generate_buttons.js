const fs = require('fs');
const htmlFile = 'mindwave.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const colors = [
    'fuchsia-500/30', 'cyan-500/30', 'violet-500/30', 'emerald-500/30',
    'amber-500/30', 'rose-500/30', 'indigo-500/30', 'teal-500/30',
    'pink-500/30', 'sky-500/30', 'purple-500/30', 'lime-500/30'
];
const borderColors = [
    'fuchsia-400', 'cyan-400', 'violet-400', 'emerald-400',
    'amber-400', 'rose-400', 'indigo-400', 'teal-400',
    'pink-400', 'sky-400', 'purple-400', 'lime-400'
];
const shadowColors = [
    '217,70,239', '6,182,212', '139,92,246', '16,185,129',
    '245,158,11', '244,63,94', '99,102,241', '20,184,166',
    '236,72,153', '56,189,248', '168,85,247', '132,204,22'
];

let buttonsHtml = '';
for (let i = 0; i < 69; i++) {
    const colorIdx = i % colors.length;
    buttonsHtml += `                            <button class="cymatics-pattern-btn p-2 rounded-lg bg-black/30 border border-${colors[colorIdx]} text-[9px] font-bold uppercase text-white shadow-[0_0_12px_rgba(${shadowColors[colorIdx]},0.15)] hover:shadow-[0_0_22px_rgba(${shadowColors[colorIdx]},0.5)] hover:border-${borderColors[colorIdx]} transition-all group relative overflow-hidden" onclick="selectCymaticPattern(${i})">
                                <canvas class="cymatic-gen-art absolute inset-0 w-full h-full opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" data-idx="${i}" width="200" height="200"></canvas>
                                <span class="relative z-10 pointer-events-none drop-shadow-md">Pat ${i+1}</span>
                            </button>\n`;
}

// Replace the grid content
const startTag = '<!-- Pattern Grid — Generative Cymatics -->';
const endTag = '                        </div>\n                        \n                        <!-- Extra Advanced Mode Link -->';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    const gridStart = html.indexOf('<div class="grid grid-cols-4 gap-2', startIndex);
    const gridEnd = html.indexOf('>', gridStart) + 1;
    const newHtml = html.substring(0, gridEnd) + '\n' + buttonsHtml + html.substring(endIndex);
    fs.writeFileSync(htmlFile, newHtml);
    console.log('Replaced buttons in mindwave.html');
} else {
    console.log('Could not find markers');
}
