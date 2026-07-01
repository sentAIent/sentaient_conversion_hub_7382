const fs = require('fs');
const scriptPath = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/script.js';
const audioPath = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let script = fs.readFileSync(scriptPath, 'utf8');
let audio = fs.readFileSync(audioPath, 'utf8');

// 1. Enemy load time: update spawn radius and minimum distance
script = script.replace(/const spawnRadius = 2000;/g, 'const spawnRadius = 1200;');
script = script.replace(/const minSpawnDist = 800;/g, 'const minSpawnDist = 600;');

// 2. Enemy load time: default Xenon and Mauler to hostile (-20) instead of neutral (0)
script = script.replace(
    /return saved \? JSON\.parse\(saved\) : \{ xenon: 0, mauler: 0, terran: 0 \};/g,
    "return saved ? JSON.parse(saved) : { xenon: -20, mauler: -20, terran: 0 };"
);
script = script.replace(
    /return \{ xenon: 0, mauler: 0, terran: 0 \};/g,
    "return { xenon: -20, mauler: -20, terran: 0 };"
);

// 3. Audio fix: Add muteHumTemporarily to audio.js
const muteCode = `
    muteHumTemporarily(durationMs = 5000) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        if (this.engineGain) {
            this.engineGain.gain.cancelScheduledValues(now);
            this.engineGain.gain.setTargetAtTime(0, now, 0.5);
            setTimeout(() => {
                if (this.engineGain && !this.engineHumMuted) {
                    this.engineGain.gain.setTargetAtTime(0.05 * (this.engineVolume || 1), this.ctx.currentTime, 1.0);
                }
            }, durationMs);
        }
        if (this.binauralGain) {
            this.binauralGain.gain.cancelScheduledValues(now);
            this.binauralGain.gain.setTargetAtTime(0, now, 0.5);
            setTimeout(() => {
                if (this.binauralGain && !this.muted) {
                    this.binauralGain.gain.setTargetAtTime(0.05 * (this.musicVolume || 1), this.ctx.currentTime, 1.0);
                }
            }, durationMs);
        }
    }
`;

if (!audio.includes('muteHumTemporarily')) {
    audio = audio.replace(/stopAllMusic\(\)\s*\{/, muteCode.trim() + '\n\n    stopAllMusic() {');
}

// 4. Update script.js to call muteHumTemporarily instead of just stopEngineHum
script = script.replace(
    /window\.gameAudio\.stopEngineHum\(\);/g,
    "window.gameAudio.muteHumTemporarily(5000);"
);

fs.writeFileSync(scriptPath, script, 'utf8');
fs.writeFileSync(audioPath, audio, 'utf8');
console.log("Enemies and Audio bugs fixed!");
