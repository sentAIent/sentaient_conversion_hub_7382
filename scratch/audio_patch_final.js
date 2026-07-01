const fs = require('fs');
const path = require('path');

const p = path.resolve('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js');
let code = fs.readFileSync(p, 'utf8');

// 1. Add missing constructor state properties
code = code.replace(
    /this\.muted = localStorage\.getItem\('audioMuted'\) === 'true';/,
    `this.muted = localStorage.getItem('audioMuted') === 'true';
        this.masterMuted = localStorage.getItem('masterMuted') === 'true';
        this.sfxMuted = localStorage.getItem('sfxMuted') === 'true';
        this.engineHumMuted = localStorage.getItem('engineHumMuted') === 'true';`
);

// 2. Add _applyVolumes helper inside the class
const applyVolumesHelper = `
    _applyVolumes() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        const safeMaster = Math.max(0, Math.min(1, this.volume));
        const safeMusic = Math.max(0, Math.min(1, this.musicVolume));
        const safeEngine = Math.max(0, Math.min(2, this.engineVolume));

        if (this.masterGain) {
            try { this.masterGain.gain.setTargetAtTime(this.masterMuted ? 0 : safeMaster, now, 0.05); } catch(e) {}
        }
        if (this.musicGain) {
            try { this.musicGain.gain.setTargetAtTime(this.muted ? 0 : safeMusic, now, 0.05); } catch(e) {}
        }
        if (this.sfxGain) {
            try { this.sfxGain.gain.setTargetAtTime(this.sfxMuted ? 0 : 0.8, now, 0.05); } catch(e) {}
        }
        if (this.engineGain && !this.engineHumMuted) {
            try { this.engineGain.gain.setTargetAtTime(0.05 * safeEngine, now, 0.05); } catch(e) {}
        }
        
        if (this.currentStreamingAudio) {
            try {
                const targetVol = (this.masterMuted || this.muted) ? 0 : (safeMaster * safeMusic);
                this.currentStreamingAudio.volume = Math.max(0, Math.min(1, targetVol));
                this.currentStreamingAudio.muted = this.muted || this.masterMuted;
            } catch(e) {}
        }
    }
`;
code = code.replace(/init\(\) {/, applyVolumesHelper + '\n    init() {');

// 3. Fix init to respect all initial mute states
code = code.replace(
    /this\.masterGain\.gain\.value = this\.muted \? 0 : this\.volume;/,
    `this.masterGain.gain.value = this.masterMuted ? 0 : Math.max(0, Math.min(1, this.volume));`
);
code = code.replace(
    /this\.sfxGain\.gain\.value = 1\.0;/,
    `this.sfxGain.gain.value = this.sfxMuted ? 0 : 0.8;`
);
code = code.replace(
    /this\.musicGain\.gain\.value = this\.musicVolume;/,
    `this.musicGain.gain.value = this.muted ? 0 : Math.max(0, Math.min(1, this.musicVolume));`
);

// 4. Override setMusicVolume, stopAllMusic, and add other setters
// We'll replace from `setMusicVolume(vol) {` to `startAmbientMusic() {` 
const startSetters = code.indexOf('    setMusicVolume(vol) {');
const endSetters = code.indexOf('    startAmbientMusic() {');

if (startSetters !== -1 && endSetters !== -1) {
    const newSetters = `
    setMasterVolume(vol) {
        let v = parseFloat(vol);
        if (!isNaN(v)) {
            this.volume = v;
            localStorage.setItem('audioVolume', this.volume);
            this._applyVolumes();
        }
    }

    setMusicVolume(vol) {
        let v = parseFloat(vol);
        if (!isNaN(v)) {
            this.musicVolume = v;
            localStorage.setItem('audioMusicVolume', this.musicVolume);
            this._applyVolumes();
        }
    }

    setEngineVolume(vol) {
        let v = parseFloat(vol);
        if (!isNaN(v)) {
            this.engineVolume = v;
            localStorage.setItem('audioEngineVolume', this.engineVolume);
            this._applyVolumes();
        }
    }

    toggleMasterMute() {
        this.ensureContext();
        this.masterMuted = !this.masterMuted;
        localStorage.setItem('masterMuted', this.masterMuted);
        this._applyVolumes();
        return this.masterMuted;
    }

    toggleMute() {
        this.ensureContext();
        this.muted = !this.muted;
        localStorage.setItem('audioMuted', this.muted);
        this._applyVolumes();
        return this.muted;
    }

    toggleSfx() {
        this.ensureContext();
        this.sfxMuted = !this.sfxMuted;
        localStorage.setItem('sfxMuted', this.sfxMuted);
        this._applyVolumes();
        return this.sfxMuted;
    }

    toggleEngineHum() {
        this.ensureContext();
        this.engineHumMuted = !this.engineHumMuted;
        localStorage.setItem('engineHumMuted', this.engineHumMuted);
        if (this.engineHumMuted) {
            this.stopEngineHum();
        } else {
            this.startEngineHum();
        }
        return this.engineHumMuted;
    }

    stopAllMusic() {
        this.musicPlaying = false;
        if (this.ambientTimeout) {
            clearTimeout(this.ambientTimeout);
            this.ambientTimeout = null;
        }
        if (this.binauralInterval) {
            clearInterval(this.binauralInterval);
            this.binauralInterval = null;
        }
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.currentStreamingAudio.src = '';
            try {
                if (this.currentStreamingAudio.parentNode) {
                    this.currentStreamingAudio.parentNode.removeChild(this.currentStreamingAudio);
                }
            } catch(e) {}
            this.currentStreamingAudio = null;
            this.isStreamingPlaying = false;
        }
        
        if (this.musicGain && this.ctx) {
            const oldGain = this.musicGain;
            try {
                oldGain.gain.cancelScheduledValues(this.ctx.currentTime);
                oldGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
            } catch(e) {}
            setTimeout(() => { try { oldGain.disconnect(); } catch(e) {} }, 500);

            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.muted ? 0 : Math.max(0, Math.min(1, this.musicVolume));
            this.musicGain.connect(this.masterGain);
        }
    }

    stopAmbientMusic() {
        if (this.ambientTimeout) {
            clearTimeout(this.ambientTimeout);
            this.ambientTimeout = null;
        }
        if (this.binauralInterval) {
            clearInterval(this.binauralInterval);
            this.binauralInterval = null;
        }
        this.stopBinauralTones();
    }

`;
    code = code.substring(0, startSetters) + newSetters + code.substring(endSetters);
}

// 5. Fix playStreamingMusic volume setting
code = code.replace(
    /this\.currentStreamingAudio\.loop = this\.playlist\.length === 1;/,
    `this.currentStreamingAudio.loop = this.playlist.length === 1;
        
        const safeMaster = Math.max(0, Math.min(1, this.volume));
        const safeMusic = Math.max(0, Math.min(1, this.musicVolume));
        const targetVol = (this.masterMuted || this.muted) ? 0 : (safeMaster * safeMusic);
        try {
            this.currentStreamingAudio.volume = Math.max(0, Math.min(1, targetVol));
            this.currentStreamingAudio.muted = this.muted || this.masterMuted;
        } catch(e) {}`
);

// 6. Ensure engine hum start check respects engineHumMuted
code = code.replace(
    /if \(!this\.ctx \|\| this\.enginePair\) return;/,
    `if (!this.ctx || this.enginePair || this.engineHumMuted) return;`
);

fs.writeFileSync(p, code);
console.log("SUCCESS");
