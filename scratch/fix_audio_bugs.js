const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

// Fix 1: ensureContext in _playSynthTone
audio = audio.replace(
    /(_playSynthTone\s*\([^)]*\)\s*\{\s*)(if\s*\(!this\.ctx\s*\|\|\s*this\.sfxMuted\)\s*return;)/,
    "$1this.ensureContext();\n        $2"
);

// Fix 2: background hum works simultaneously with streaming music
audio = audio.replace(
    /(playStreamingMusic\s*\([^)]*\)\s*\{\s*this\.ensureContext\(\);\s*)this\.stopAllMusic\(\);/,
    "$1this.pauseStream();"
);

fs.writeFileSync(path, audio, 'utf8');
console.log("Audio bugs fixed!");
