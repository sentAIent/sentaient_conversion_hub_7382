const fs = require('fs');
const path = require('path');

const p = path.resolve('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/audio.js');
let code = fs.readFileSync(p, 'utf8');

const applyVolumesCode = `
    _applyVolumes() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        // 1. Master Gain
        if (this.masterGain) {
            try {
                this.masterGain.gain.setTargetAtTime(this.masterMuted ? 0 : Math.max(0, Math.min(1, this.volume)), now, 0.05);
            } catch(e) {}
        }
        
        // 2. Music Gain (Binaural beats route through this)
        if (this.musicGain) {
            try {
                this.musicGain.gain.setTargetAtTime(this.muted ? 0 : Math.max(0, Math.min(1, this.musicVolume)), now, 0.05);
            } catch(e) {}
        }
        
        // 3. SFX Gain
        if (this.sfxGain) {
            try {
                this.sfxGain.gain.setTargetAtTime(this.sfxMuted ? 0 : 0.8, now, 0.05);
            } catch(e) {}
        }
        
        // 4. Streaming Audio (HTMLMediaElement)
        if (this.currentStreamingAudio) {
            try {
                const safeMaster = Math.max(0, Math.min(1, this.volume));
                const safeMusic = Math.max(0, Math.min(1, this.musicVolume));
                const targetVol = (this.masterMuted || this.muted) ? 0 : (safeMaster * safeMusic);
                this.currentStreamingAudio.volume = Math.max(0, Math.min(1, targetVol));
                this.currentStreamingAudio.muted = this.muted || this.masterMuted;
            } catch(e) {}
        }
    }

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
            // Engine volume is dynamically updated in updateEngineHum, 
            // but we'll safely touch the gain if it exists and hum is idle.
            if (this.engineGain && this.ctx && !this.engineHumMuted) {
                try {
                    this.engineGain.gain.setTargetAtTime(0.05 * this.engineVolume, this.ctx.currentTime, 0.1);
                } catch(e) {}
            }
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
`;

// We need to replace the setMasterVolume, setMusicVolume, setEngineVolume, toggleMute, toggleMasterMute, toggleSfx, toggleEngineHum methods.

// Regex to match the block of setters and toggles.
const startIdx = code.indexOf('    setMusicVolume(vol) {');
const endIdx = code.indexOf('    // --- AUDIO ROUTING & CONTEXT ---');

if (startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + applyVolumesCode + '\n' + code.substring(endIdx);
    fs.writeFileSync(p, code);
    console.log("Successfully replaced setters and toggles.");
} else {
    console.log("Could not find start/end indices.");
}

// Also need to fix playStreamingMusic
let streamingPlayCode = `
        const safeMaster = Math.max(0, Math.min(1, this.volume));
        const safeMusic = Math.max(0, Math.min(1, this.musicVolume));
        const targetVol = (this.masterMuted || this.muted) ? 0 : (safeMaster * safeMusic);
        try {
            this.currentStreamingAudio.volume = Math.max(0, Math.min(1, targetVol));
            this.currentStreamingAudio.muted = this.muted || this.masterMuted;
        } catch(e) {}
`;

const streamStart = code.indexOf('this.currentStreamingAudio.volume = this.masterMuted || this.muted ? 0 : (this.volume * this.musicVolume);');
const streamEnd = code.indexOf('this.currentStreamingAudio.onended = () => {');

if (streamStart !== -1 && streamEnd !== -1) {
    code = code.substring(0, streamStart) + streamingPlayCode + '\n        ' + code.substring(streamEnd);
    fs.writeFileSync(p, code);
    console.log("Successfully patched playStreamingMusic volume.");
} else {
    console.log("Could not find playStreamingMusic indices.");
}

