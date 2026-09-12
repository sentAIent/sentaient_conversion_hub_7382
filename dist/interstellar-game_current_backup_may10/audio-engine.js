class AudioEngine {
    constructor() {
        this.ctx = null; // AudioContext (lazy init on user interaction)
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.muted = localStorage.getItem('audioMuted') === 'true';
        this.musicPlaying = false;
        this.volume = parseFloat(localStorage.getItem('audioVolume')) || 0.3;
        this.musicVolume = 0.15;
        this.engineNode = null;
        this.engineGain = null;
        // Rate limiting: prevent audio node flooding during intense combat
        this._lastPlay = {};
    }

    // ALIASES FOR COMPATIBILITY
    playExplosion() { this.playExplosionBig(); }
    playMenuTick() { this.playUIClick(); }

    // Rate limiter: returns false if same sound played too recently
    _canPlay(key, minIntervalMs = 50) {
        const now = Date.now();
        if (this._lastPlay[key] && now - this._lastPlay[key] < minIntervalMs) return false;
        this._lastPlay[key] = now;
        return true;
    }

    init() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.muted ? 0 : this.volume;
            this.masterGain.connect(this.ctx.destination);

            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = 1.0;
            this.sfxGain.connect(this.masterGain);

            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.musicVolume;
            this.musicGain.connect(this.masterGain);

            console.log('[Audio] Engine initialized');
        } catch (e) {
            console.warn('[Audio] Web Audio not supported:', e);
        }
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('audioMuted', this.muted);
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
        }
        return this.muted;
    }

    // --- MAJESTIC AUDIO V2: CLOUD AMBIENCE ---
    playAtmosphericHum() {
        this.ensureContext();
        if (!this.ctx || this.ambientHum) return;
        
        // Deep sub-theta rumble for space vacuum feel (4Hz)
        this.ambientHum = this._createBinauralPair('sine', 50, 4, this.ctx.currentTime);
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0.03;
        this.ambientHum.connect(this.ambientGain);
        this.ambientGain.connect(this.musicGain);
        this.ambientHum.start(this.ctx.currentTime);
    }

    // --- BINAURAL SYSTEM ---
    
    _createBinauralPair(type, freqBase, freqBeat, t, targetFreqTarget=null, rampDuration=null, rampType='exponential') {
        const oscL = this.ctx.createOscillator();
        const oscR = this.ctx.createOscillator();
        const merger = this.ctx.createChannelMerger(2);
        
        oscL.type = type;
        oscR.type = type;
        
        // Left Ear Base
        oscL.frequency.setValueAtTime(freqBase, t);
        // Right Ear + Binaural Beat offset
        oscR.frequency.setValueAtTime(freqBase + freqBeat, t);
        
        if (targetFreqTarget && rampDuration) {
            if (rampType === 'exponential') {
                oscL.frequency.exponentialRampToValueAtTime(targetFreqTarget, t + rampDuration);
                oscR.frequency.exponentialRampToValueAtTime(targetFreqTarget + freqBeat, t + rampDuration);
            } else {
                oscL.frequency.linearRampToValueAtTime(targetFreqTarget, t + rampDuration);
                oscR.frequency.linearRampToValueAtTime(targetFreqTarget + freqBeat, t + rampDuration);
            }
        }
        
        oscL.connect(merger, 0, 0); // Left channel
        oscR.connect(merger, 0, 1); // Right channel
        
        return {
            start: (time) => { oscL.start(time); oscR.start(time); },
            stop: (time) => { oscL.stop(time); oscR.stop(time); },
            connect: (destination) => merger.connect(destination),
            nodeL: oscL,
            nodeR: oscR
        };
    }

    // --- SOUND EFFECTS ---

    playLaser() {
        if (!this._canPlay('laser', 100)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // High Gamma Beat for focus/energy (40Hz difference)
        const pair = this._createBinauralPair('sawtooth', 880, 40, t, 220, 0.15);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.15);
    }

    playEnemyLaser() {
        if (!this._canPlay('enemyLaser', 80)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // High Beta beat for alertness (20Hz)
        const pair = this._createBinauralPair('square', 440, 20, t, 110, 0.1);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.1);
    }

    playExplosionSmall() {
        if (!this._canPlay('expSmall', 60)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        
        // Minor Delta rumble underneath the noise
        const pair = this._createBinauralPair('sine', 150, 4, t, 40, 0.3);
        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.1, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        pair.connect(oscGain);
        oscGain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.3);

        const bufferSize = this.ctx.sampleRate * 0.3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, t);
        filter.frequency.exponentialRampToValueAtTime(200, t + 0.3);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.3);
    }

    playExplosionBig() {
        if (!this._canPlay('expBig', 150)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        
        // Deep Delta rumble for massive explosions (2Hz diff)
        const pair = this._createBinauralPair('sine', 80, 2, t, 20, 0.8);
        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.3, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        pair.connect(oscGain);
        oscGain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.8);

        const bufferSize = this.ctx.sampleRate * 0.8;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, t);
        filter.frequency.exponentialRampToValueAtTime(100, t + 0.8);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(t);
        noise.stop(t + 0.8);
    }

    playShieldHit() {
        if (!this._canPlay('shield', 100)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // High frequency alpha hit
        const pair = this._createBinauralPair('sine', 1200, 10, t, 400, 0.2);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.2);
    }

    playHullHit() {
        if (!this._canPlay('hull', 100)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Metallic clang Beta (15Hz)
        const pair = this._createBinauralPair('triangle', 300, 15, t, 80, 0.15);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.15);
    }

    playUIClick() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const pair = this._createBinauralPair('sine', 660, 12, t);
        // Custom linear sweep up
        pair.nodeL.frequency.linearRampToValueAtTime(880, t + 0.03);
        pair.nodeR.frequency.linearRampToValueAtTime(892, t + 0.03);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.08);
    }

    playMissionComplete() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Victory fanfare — ascending tones with Alpha/Theta blend
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const pair = this._createBinauralPair('sine', freq, 8, t + i * 0.15); // Alpha 8Hz
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, t + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.12, t + i * 0.15 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.3);
            pair.connect(gain);
            gain.connect(this.sfxGain);
            pair.start(t + i * 0.15);
            pair.stop(t + i * 0.15 + 0.3);
        });
    }

    playBossAlert() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Warning siren (Intense Gamma 35Hz)
        for (let i = 0; i < 3; i++) {
            const pair = this._createBinauralPair('sawtooth', 200, 35, t + i * 0.4);
            // Custom linear ramps up and down
            pair.nodeL.frequency.linearRampToValueAtTime(600, t + i * 0.4 + 0.2);
            pair.nodeR.frequency.linearRampToValueAtTime(635, t + i * 0.4 + 0.2);
            pair.nodeL.frequency.linearRampToValueAtTime(200, t + i * 0.4 + 0.4);
            pair.nodeR.frequency.linearRampToValueAtTime(235, t + i * 0.4 + 0.4);
            
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.1, t + i * 0.4);
            gain.gain.setValueAtTime(0.1, t + i * 0.4 + 0.35);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.4 + 0.4);
            pair.connect(gain);
            gain.connect(this.sfxGain);
            pair.start(t + i * 0.4);
            pair.stop(t + i * 0.4 + 0.4);
        }
    }

    playHazardWarning() {
        if (!this._canPlay('hazardWarning', 500)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Deep Beta beep for caution (20Hz)
        const pair = this._createBinauralPair('triangle', 330, 20, t);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.3);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.3);
    }

    playCollect() {
        if (!this._canPlay('collect', 80)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // High frequency Beta burst (Brighter sparkle)
        const pair = this._createBinauralPair('sine', 880, 16, t, 1760, 0.08);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.1);
    }

    playLuxuryPing() {
        if (!this._canPlay('luxuryPing', 150)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Shimmering Arpeggio / High-Tier Ping
        const notes = [1046, 1318, 1568, 2093]; // C6, E6, G6, C7
        notes.forEach((freq, i) => {
            const pair = this._createBinauralPair('sine', freq, 40, t + i * 0.04);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, t + i * 0.04);
            gain.gain.linearRampToValueAtTime(0.08, t + i * 0.04 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.15);
            pair.connect(gain);
            gain.connect(this.sfxGain);
            pair.start(t + i * 0.04);
            pair.stop(t + i * 0.04 + 0.15);
        });
    }

    // --- ENGINE HUM ---

    startEngineHum() {
        this.ensureContext();
        if (!this.ctx || this.enginePair) return;

        // Steady Theta wave for focus during sustained flight (6Hz diff)
        this.enginePair = this._createBinauralPair('sawtooth', 40, 6, this.ctx.currentTime);
        this.engineGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 150;
        filter.Q.value = 2;
        this.engineGain.gain.value = 0.04;

        this.enginePair.connect(filter);
        filter.connect(this.engineGain);
        this.engineGain.connect(this.sfxGain);
        this.enginePair.start(this.ctx.currentTime);
    }

    updateEngineHum(speed) {
        if (!this.enginePair || !this.ctx) {
            this.startEngineHum();
            return;
        }
        const timeScale = (window.game && window.game.timeScale) ? window.game.timeScale : 1.0;
        const baseFreq = 40 + speed * 12; // More aggressive pitch shift
        const freq = baseFreq * timeScale;
        
        this.enginePair.nodeL.frequency.setTargetAtTime(Math.max(10, Math.min(freq, 200)), this.ctx.currentTime, 0.1);
        this.enginePair.nodeR.frequency.setTargetAtTime(Math.max(16, Math.min(freq + 6, 206)), this.ctx.currentTime, 0.1);
        const vol = (0.02 + Math.min(speed * 0.005, 0.08)) * (timeScale < 1.0 ? 1.5 : 1.0);
        this.engineGain.gain.setTargetAtTime(Math.min(vol, 0.15), this.ctx.currentTime, 0.1);
    }


    stopEngineHum() {
        if (this.enginePair) {
            try { this.enginePair.stop(this.ctx.currentTime); } catch (e) { }
            this.enginePair = null;
            this.engineGain = null;
        }
    }

    // --- HAZARD AUDIO (Positional) ---

    initHazardAudio() {
        if (this.hazardGain || !this.ctx) return;
        this.hazardGain = this.ctx.createGain();
        this.hazardGain.gain.value = 0;
        
        // Use StereoPanner for simple left/right panning (Modern Standard)
        if (this.ctx.createStereoPanner) {
            this.hazardPan = this.ctx.createStereoPanner();
        } else {
            // Fallback for older browsers (though less likely in this production build)
            this.hazardPan = this.ctx.createPanner();
            this.hazardPan.panningModel = 'equalpower';
        }
        
        this.hazardGain.connect(this.hazardPan);
        this.hazardPan.connect(this.sfxGain);
        
        // Low ominous rumble for black holes
        this.bhRumble = this._createBinauralPair('sine', 30, 2, this.ctx.currentTime);
        this.bhRumble.connect(this.hazardGain);
        this.bhRumble.start(this.ctx.currentTime);
        
        // Static crackle for nebulae
        try {
            this.nebulaCrackle = this.ctx.createBufferSource();
            const bufferSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            this.nebulaCrackle.buffer = buffer;
            this.nebulaCrackle.loop = true;
            
            this.nebulaGain = this.ctx.createGain();
            this.nebulaGain.gain.value = 0;
            this.nebulaCrackle.connect(this.nebulaGain);
            this.nebulaGain.connect(this.hazardPan);
            this.nebulaCrackle.start(this.ctx.currentTime);
        } catch (e) {
            console.warn('[Audio] Nebula crackle init failed:', e);
        }
    }

    updateHazardAudio(bhDist, bhRelX, nebDist) {
        if (!this.ctx || !this.hazardGain) return;
        
        const t = this.ctx.currentTime;
        
        // Black Hole Rumble (Max volume at dist 0, 0 at dist 3000)
        const bhVol = Math.max(0, 1 - bhDist / 3000) * 0.4;
        this.hazardGain.gain.setTargetAtTime(bhVol, t, 0.1);
        
        // Nebula Crackle (Max volume at dist 0, 0 at dist 4000)
        if (this.nebulaGain) {
            const nebVol = Math.max(0, 1 - nebDist / 4000) * 0.2;
            this.nebulaGain.gain.setTargetAtTime(nebVol, t, 0.1);
        }
        
        // Panning (bhRelX is -1..1)
        if (isFinite(bhRelX) && this.hazardPan) {
            if (this.hazardPan.pan) {
                this.hazardPan.pan.setTargetAtTime(Math.max(-1, Math.min(1, bhRelX)), t, 0.1);
            } else {
                // Fallback for 3D PannerNode
                this.hazardPan.setPosition(bhRelX, 0, 1 - Math.abs(bhRelX));
            }
        }
    }

    // --- AMBIENT SPACE MUSIC ---

    startAmbientMusic() {
        this.ensureContext();
        if (!this.ctx || this.musicPlaying) return;
        this.musicPlaying = true;
        this._playAmbientLoop();
    }

    _playAmbientLoop() {
        if (!this.musicPlaying || !this.ctx) return;

        const t = this.ctx.currentTime;
        // Ethereal pad: Deep Alpha entrainment for relaxing backdrop (10Hz spread)
        const baseFreqs = [65, 98, 131, 196]; // C2, G2, C3, G3
        const duration = 8;
        const BINAURAL_SPREAD = 10; 

        baseFreqs.forEach((freq, i) => {
            const pair = this._createBinauralPair(i % 2 === 0 ? 'sine' : 'triangle', freq, BINAURAL_SPREAD, t);
            // Slow pitch drift
            pair.nodeL.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.02), t + duration);
            pair.nodeR.frequency.linearRampToValueAtTime((freq + BINAURAL_SPREAD) * (1 + (Math.random() - 0.5) * 0.02), t + duration);

            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            filter.type = 'lowpass';
            filter.frequency.value = 400 + Math.random() * 200;

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.06, t + duration * 0.3);
            gain.gain.setValueAtTime(0.06, t + duration * 0.7);
            gain.gain.linearRampToValueAtTime(0, t + duration);

            pair.connect(filter);
            filter.connect(gain);
            gain.connect(this.musicGain);
            pair.start(t);
            pair.stop(t + duration);
        });

        // Occasional high shimmering note (Gamma 40Hz)
        if (Math.random() < 0.5) {
            const shimFreqs = [523, 659, 784, 880, 1047];
            const baseShim = shimFreqs[Math.floor(Math.random() * shimFreqs.length)];
            const shimmerPair = this._createBinauralPair('sine', baseShim, 40, t + 2);

            const shimGain = this.ctx.createGain();
            shimGain.gain.setValueAtTime(0, t + 2);
            shimGain.gain.linearRampToValueAtTime(0.02, t + 3);
            shimGain.gain.exponentialRampToValueAtTime(0.001, t + 6);
            shimmerPair.connect(shimGain);
            shimGain.connect(this.musicGain);
            shimmerPair.start(t + 2);
            shimmerPair.stop(t + 6);
        }

        setTimeout(() => this._playAmbientLoop(), (duration - 1) * 1000);
    }

    stopAmbientMusic() {
        this.musicPlaying = false;
    }

    // --- UI SOUNDS (were missing from original, caused silent failures) ---

    playMenuHover() {
        if (!this._canPlay('menuHover', 80)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const pair = this._createBinauralPair('sine', 440, 8, t);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.06);
    }

    playMenuSelect() {
        if (!this._canPlay('menuSelect', 100)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const pair = this._createBinauralPair('sine', 550, 10, t, 880, 0.1);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.07, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.12);
    }

    playUpgrade() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Ascending chord for upgrade confirmation
        const notes = [523, 659, 784]; // C5, E5, G5
        notes.forEach((freq, i) => {
            const pair = this._createBinauralPair('sine', freq, 12, t + i * 0.08);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, t + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.1, t + i * 0.08 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.25);
            pair.connect(gain);
            gain.connect(this.sfxGain);
            pair.start(t + i * 0.08);
            pair.stop(t + i * 0.08 + 0.25);
        });
    }

    playInfinityJump() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const duration = 3.0;

        // 1. Deep Delta Rumble (2Hz) for gravitational weight
        const rumble = this._createBinauralPair('sine', 60, 2, t);
        const rumbleGain = this.ctx.createGain();
        rumbleGain.gain.setValueAtTime(0, t);
        rumbleGain.gain.linearRampToValueAtTime(0.4, t + 2.0);
        rumbleGain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        rumble.connect(rumbleGain);
        rumbleGain.connect(this.sfxGain);
        rumble.start(t);
        rumble.stop(t + duration);

        // 2. High Resonant Sweep (The "Dimensional Tear")
        const sweep = this._createBinauralPair('sawtooth', 220, 40, t);
        sweep.nodeL.frequency.exponentialRampToValueAtTime(3520, t + 2.8);
        sweep.nodeR.frequency.exponentialRampToValueAtTime(3560, t + 2.8);
        
        const sweepGain = this.ctx.createGain();
        sweepGain.gain.setValueAtTime(0, t);
        sweepGain.gain.linearRampToValueAtTime(0.15, t + 2.5);
        sweepGain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(200, t);
        filter.frequency.exponentialRampToValueAtTime(4000, t + 2.8);
        
        sweep.connect(filter);
        filter.connect(sweepGain);
        sweepGain.connect(this.sfxGain);
        sweep.start(t);
        sweep.stop(t + duration);
    }
}

// Global audio engine instance
const gameAudio = new AudioEngine();
window.gameAudio = gameAudio;
