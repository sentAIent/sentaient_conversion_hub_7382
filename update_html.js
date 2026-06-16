const fs = require('fs');

const htmlPath = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/mindwave.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace cymatics PNGs with WEBP
html = html.replace(/cymatics_(.*?)\.png/g, 'cymatics_$1.webp');

// 2. Add loading="lazy" to all cymatics-pattern-btn imgs and aura imgs
html = html.replace(/<img src="(binaural-assets\/images\/cymatics\/.*?)" class="(.*?)"/g, '<img src="$1" class="$2" loading="lazy"');

// 3. Inject mobile CSS
const cssInjection = `
    body {
        overscroll-behavior-y: none; /* Prevent iOS rubber banding */
    }
    button, input[type="range"] {
        touch-action: manipulation; /* Remove 300ms tap delay */
    }
`;
html = html.replace('</style>', cssInjection + '\n</style>');

fs.writeFileSync(htmlPath, html);
console.log('Updated mindwave.html');
