const fs = require('fs');
const path = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js';

let audio = fs.readFileSync(path, 'utf8');

const missingMethods = `
    setMusicVolume(vol) {
        this.musicVolume = Math.max(0, Math.min(1, parseFloat(vol) || 0));
        localStorage.setItem('audioMusicVolume', this.musicVolume);
        this._applyVolumes();
    }

    setMasterVolume(vol) {
        this.volume = Math.max(0, Math.min(1, parseFloat(vol) || 0));
        localStorage.setItem('audioVolume', this.volume);
        this._applyVolumes();
    }

    setEngineVolume(vol) {
        this.engineVolume = Math.max(0, Math.min(2, parseFloat(vol) || 0));
        localStorage.setItem('engineVolume', this.engineVolume);
        this._applyVolumes();
    }

    toggleMasterMute() {
        this.masterMuted = !this.masterMuted;
        localStorage.setItem('masterMuted', this.masterMuted);
        this._applyVolumes();
        return this.masterMuted;
    }

    toggleEngineHum() {
        this.engineHumMuted = !this.engineHumMuted;
        localStorage.setItem('engineHumMuted', this.engineHumMuted);
        this._applyVolumes();
        if (this.engineHumMuted) this.stopEngineHum();
        else this.startEngineHum();
        return this.engineHumMuted;
    }

    toggleSfx() {
        this.sfxMuted = !this.sfxMuted;
        localStorage.setItem('sfxMuted', this.sfxMuted);
        this._applyVolumes();
        return this.sfxMuted;
    }

    stopAllMusic() {
        this.pauseStream();
        this.stopBinauralTones();
        this.musicPlaying = false;
    }

    playCollect() { if (!this.sfxMuted && this._canPlay('collect')) this._playSynthTone(600, 'sine', 0.1); }
    playEMP() { if (!this.sfxMuted && this._canPlay('emp')) this._playSynthTone(200, 'square', 0.5); }
    playAfterburner() { if (!this.sfxMuted && this._canPlay('afterburner')) this._playSynthTone(100, 'sawtooth', 0.3); }
    playBossAlert() { if (!this.sfxMuted && this._canPlay('bossalert', 1000)) this._playSynthTone(800, 'triangle', 1.0); }
    playPlayerDeath() { if (!this.sfxMuted && this._canPlay('playerdeath', 1000)) this._playSynthTone(150, 'sawtooth', 1.5); }
    playExplosionBig() { if (!this.sfxMuted && this._canPlay('explosionbig', 200)) this._playSynthTone(100, 'square', 0.8); }

    startEngineHum() {
        if (this.engineHumMuted || !this.ctx) return;
        if (!this.engineNode) {
            this.engineNode = this.ctx.createOscillator();
            this.engineNode.type = 'sine';
            this.engineNode.frequency.value = 50;
            this.engineGain = this.ctx.createGain();
            this.engineGain.gain.value = 0.05 * (this.engineVolume || 1);
            this.engineNode.connect(this.engineGain);
            this.engineGain.connect(this.masterGain);
            this.engineNode.start();
        }
    }

    stopEngineHum() {
        if (this.engineNode) {
            try { this.engineNode.stop(); } catch(e) {}
            this.engineNode = null;
        }
        if (this.engineGain) {
            try { this.engineGain.disconnect(); } catch(e) {}
            this.engineGain = null;
        }
    }

    _playSynthTone(freq, type, duration) {
        if (!this.ctx || this.sfxMuted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    }

    _createBinauralPair(type, freq, beatSpread, t) {
        const oscL = this.ctx.createOscillator();
        const oscR = this.ctx.createOscillator();
        oscL.type = type;
        oscR.type = type;
        oscL.frequency.setValueAtTime(freq, t);
        oscR.frequency.setValueAtTime(freq + beatSpread, t);
        
        const merger = this.ctx.createChannelMerger(2);
        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        
        return Object.assign(merger, {
            start: (time) => { oscL.start(time); oscR.start(time); },
            stop: (time) => { oscL.stop(time); oscR.stop(time); },
            nodeL: oscL,
            nodeR: oscR
        });
    }
`;

if (!audio.includes('setMusicVolume')) {
    audio = audio.replace('}\n\n// Global audio engine instance', missingMethods + '\n}\n\n// Global audio engine instance');
    
    // Add missing initialization properties
    if (!audio.includes('this.engineVolume =')) {
        audio = audio.replace("this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;", "this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;\n        const savedEngineVol = localStorage.getItem('engineVolume');\n        this.engineVolume = savedEngineVol !== null && !isNaN(parseFloat(savedEngineVol)) ? parseFloat(savedEngineVol) : 1.0;");
    }

    fs.writeFileSync(path, audio, 'utf8');
    console.log("audio.js patched!");
} else {
    console.log("Already patched.");
}
