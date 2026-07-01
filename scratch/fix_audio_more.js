const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

const missingMethods = `
    playEnemyLaser() { if (!this.sfxMuted && this._canPlay('enemylaser')) this._playSynthTone(400, 'sawtooth', 0.15); }
    playExplosionSmall() { if (!this.sfxMuted && this._canPlay('explosionsmall')) this._playSynthTone(150, 'square', 0.3); }
    playHullHit() { if (!this.sfxMuted && this._canPlay('hullhit')) this._playSynthTone(200, 'triangle', 0.2); }
    playLaser() { if (!this.sfxMuted && this._canPlay('laser')) this._playSynthTone(600, 'sawtooth', 0.1); }
    playMenuHover() { if (!this.sfxMuted && this._canPlay('menuhover', 100)) this._playSynthTone(800, 'sine', 0.05); }
    playMenuSelect() { if (!this.sfxMuted && this._canPlay('menuselect', 100)) this._playSynthTone(1200, 'sine', 0.1); }
    playMissionComplete() { if (!this.sfxMuted && this._canPlay('missioncomplete', 1000)) this._playSynthTone(500, 'sine', 1.0); }
    playShieldHit() { if (!this.sfxMuted && this._canPlay('shieldhit')) this._playSynthTone(800, 'sine', 0.2); }
    playUpgrade() { if (!this.sfxMuted && this._canPlay('upgrade')) this._playSynthTone(1000, 'sine', 0.5); }
    
    updateEngineHum(shipSpeed) {
        if (!this.engineNode || !this.engineGain || this.engineHumMuted || !this.ctx) return;
        const targetFreq = 50 + (shipSpeed * 5);
        this.engineNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
        const targetVolume = 0.05 + (shipSpeed * 0.02);
        this.engineGain.gain.setTargetAtTime(targetVolume * (this.engineVolume || 1), this.ctx.currentTime, 0.1);
    }
`;

if (!audio.includes('updateEngineHum')) {
    audio = audio.replace('}\n\n// Global audio engine instance', missingMethods + '\n}\n\n// Global audio engine instance');
    fs.writeFileSync(path, audio, 'utf8');
    console.log("audio.js patched with more methods!");
} else {
    console.log("Already patched.");
}
