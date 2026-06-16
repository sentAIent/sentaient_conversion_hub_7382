const fs = require('fs');

const htmlPath = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/mindwave.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace all .png references in binaural-assets/images with .webp
html = html.replace(/(binaural-assets\/images\/.*?)\.png/g, '$1.webp');

fs.writeFileSync(htmlPath, html);
console.log('Updated all PNG paths to WEBP in mindwave.html');
