const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

const missingMethods = `
    updateHazardAudio(nearestBHDist, nearestBHRelX, nearestNebDist) {
        // Implement logic if needed, or leave empty to prevent crashes
    }
    
    playTransmissionStart() {
        if (!this.sfxMuted && this._canPlay('transmissionstart', 1000)) this._playSynthTone(1500, 'sine', 0.5);
    }
`;

if (!audio.includes('updateHazardAudio')) {
    audio = audio.replace('}\n\n// Global audio engine instance', missingMethods + '\n}\n\n// Global audio engine instance');
    fs.writeFileSync(path, audio, 'utf8');
    console.log("audio.js patched with hazard methods!");
} else {
    console.log("Already patched.");
}
