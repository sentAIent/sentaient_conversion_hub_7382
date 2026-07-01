const fs = require('fs');
let html = fs.readFileSync('interstellar-game/index.html', 'utf8');

// The original file uses styles.css?v=flight_fix_v5 and script.js?v=flight_fix_v5 or similar.
// I will just replace any "?v=..." with "?v=clean_hangar_v1" for styles and script.
html = html.replace(/styles\.css\?v=[^"]+"/g, 'styles.css?v=clean_hangar_v1"');
html = html.replace(/script\.js\?v=[^"]+"/g, 'script.js?v=clean_hangar_v1"');

fs.writeFileSync('interstellar-game/index.html', html);
