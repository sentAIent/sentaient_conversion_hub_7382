export class AudioEngine {
    constructor() {
        this.ctx = null;
        this.streamingBufferSource = null;
        this.streamingAbortController = null; // AudioContext (lazy init on user interaction)
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.enemyGain = null;
        this.muted = localStorage.getItem('audioMuted') === 'true';
        this.masterMuted = localStorage.getItem('masterMuted') === 'true';
        this.sfxMuted = localStorage.getItem('sfxMuted') === 'true';
        this.engineHumMuted = localStorage.getItem('engineHumMuted') === 'true';
        this.musicPlaying = false;
        const savedVol = localStorage.getItem('audioVolume');
        this.volume = savedVol !== null && !isNaN(parseFloat(savedVol)) ? parseFloat(savedVol) : 0.3;
        
        const savedMusicVol = localStorage.getItem('audioMusicVolume');
        this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;
        const savedSfxVol = localStorage.getItem('audioSfxVolume');
        this.sfxVolume = savedSfxVol !== null && !isNaN(parseFloat(savedSfxVol)) ? parseFloat(savedSfxVol) : 0.8;
        this.engineNode = null;
        this.engineGain = null;
        this.engineBasePitch = localStorage.getItem('engineBasePitch') ? parseFloat(localStorage.getItem('engineBasePitch')) : 60;
        this.engineHarmonics = localStorage.getItem('engineHarmonics') ? parseFloat(localStorage.getItem('engineHarmonics')) : 3;
        this.currentStreamingAudio = null;
        this.ambientTimeout = null;
        this.binauralInterval = null;
        
        // Playlist State
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isStreamingPlaying = false;
        
        // Rate limiting: prevent audio node flooding during intense combat
        this._lastPlay = {};
    }

    // Rate limiter: returns false if same sound played too recently
    _canPlay(key, minIntervalMs = 50) {
        const now = Date.now();
        if (this._lastPlay[key] && now - this._lastPlay[key] < minIntervalMs) return false;
        this._lastPlay[key] = now;
        return true;
    }

    
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
            try { this.sfxGain.gain.setTargetAtTime(this.sfxMuted ? 0 : this.sfxVolume, now, 0.05); } catch(e) {}
        }
        if (this.enemyGain) {
            try { this.enemyGain.gain.setTargetAtTime(this.sfxMuted ? 0 : this.sfxVolume * 0.05, now, 0.05); } catch(e) {}
        }
        if (this.engineGain && !this.engineHumMuted) {
            try { this.engineGain.gain.setTargetAtTime(0.05 * safeEngine, now, 0.05); } catch(e) {}
        }
        
        // currentStreamingAudio volume is now handled by Web Audio API
    }

    init() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.masterMuted ? 0 : Math.max(0, Math.min(1, this.volume));
            this.masterGain.connect(this.ctx.destination);

            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = this.sfxMuted ? 0 : this.sfxVolume;
            this.sfxGain.connect(this.masterGain);

            this.enemyGain = this.ctx.createGain();
            this.enemyGain.gain.value = this.sfxMuted ? 0 : this.sfxVolume * 0.05;
            this.enemyGain.connect(this.masterGain);

            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.muted ? 0 : Math.max(0, Math.min(1, this.musicVolume));
            this.musicGain.connect(this.masterGain);

            console.log('[Audio] Engine initialized');
        } catch (e) {
            console.warn('[Audio] Web Audio not supported:', e);
        }
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state !== 'running') {
            try {
                this.ctx.resume().catch(e => {
                    console.warn("[Audio] Resume blocked:", e);
                    if (window.app && typeof window.app.showToast === 'function') {
                        window.app.showToast("Click anywhere to enable audio", 4000);
                    }
                });
            } catch(e) {}
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        const ret = this.muted;
        localStorage.setItem('audioMuted', this.muted);
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
        }
        if (this.streamingAbortController) {
            this.streamingAbortController.abort();
            this.streamingAbortController = null;
        }
        if (this.streamingBufferSource) {
            try {
                this.streamingBufferSource.stop();
                this.streamingBufferSource.disconnect();
            } catch(e) {}
            this.streamingBufferSource = null;
        }
        this.isStreamingPlaying = false;
        
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
        return ret;
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

    startAmbientMusic() {
        // Fallback for game start if no music selected
        // We will default to a calm Alpha binaural sequence
        this.playBinauralLoop(130, 10);
    }

    playStreamingMusic(urlOrPlaylist, startIndex = 0) {
        this.ensureContext();
        this.pauseStream();
        
        if (Array.isArray(urlOrPlaylist)) {
            this.playlist = urlOrPlaylist;
            this.currentTrackIndex = startIndex;
        } else {
            this.playlist = [urlOrPlaylist];
            this.currentTrackIndex = 0;
        }

        if (this.playlist.length === 0) return;
        
        const url = this.playlist[this.currentTrackIndex];
        
        if (window.app) window.app.showToast('Buffering...', 2000);
        
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.currentStreamingAudio.src = '';
            this.currentStreamingAudio = null;
        }

        if (this.streamingNode) {
            this.streamingNode.disconnect();
            this.streamingNode = null;
        }

        this.currentStreamingAudio = new Audio(url);
        this.currentStreamingAudio.crossOrigin = "anonymous";
        this.currentStreamingAudio.loop = this.playlist.length === 1;
        
        // Start playback synchronously to satisfy browser interaction policies
        const playPromise = this.currentStreamingAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.warn("[Audio] Sync play blocked, waiting for canplay:", e);
                this.currentStreamingAudio.addEventListener('canplay', () => {
                    this.currentStreamingAudio.play().catch(err => console.error("[Audio] Playback blocked permanently", err));
                }, { once: true });
            });
        }

        this.currentStreamingAudio.addEventListener('play', () => {
            this.isStreamingPlaying = true;
            if (window.app) {
                window.app.showToast('Now Playing', 2000);
                window.app.updateMediaControlsUI(true);
            }
        });

        this.currentStreamingAudio.addEventListener('pause', () => {
            this.isStreamingPlaying = false;
            if (window.app) window.app.updateMediaControlsUI(false);
        });

        this.currentStreamingAudio.addEventListener('timeupdate', () => {
            if (window.app && this.currentStreamingAudio) {
                window.app.updateScrubber(this.currentStreamingAudio.currentTime, this.currentStreamingAudio.duration);
            }
        });

        this.currentStreamingAudio.addEventListener('ended', () => {
            if (this.playlist.length > 1) {
                this.playNextTrack();
            }
        });

        this.currentStreamingAudio.addEventListener('error', (e) => {
            console.error("Audio streaming error:", e);
            if (window.app) window.app.showToast('Audio Stream Failed', 3000);
        });

        try {
            this.streamingNode = this.ctx.createMediaElementSource(this.currentStreamingAudio);
            this.streamingNode.connect(this.musicGain);
        } catch (e) {
            console.warn("MediaElementSource connection failed (already connected?):", e);
        }
    }

    pauseStream() {
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.isStreamingPlaying = false;
        }
    }

    resumeStream() {
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.play();
            this.isStreamingPlaying = true;
        } else if (this.playlist && this.playlist.length > 0) {
            this.playStreamingMusic(this.playlist, this.currentTrackIndex);
        }
    }

    seekStream(offset) {
        if (this.currentStreamingAudio) {
            let newTime = this.currentStreamingAudio.currentTime + offset;
            let dur = this.currentStreamingAudio.duration;
            if (isFinite(dur) && dur > 0) {
                newTime = Math.min(newTime, dur);
            }
            this.currentStreamingAudio.currentTime = Math.max(0, newTime);
        }
    }

    setStreamTime(time) {
        if (this.currentStreamingAudio) {
            let dur = this.currentStreamingAudio.duration;
            if (isFinite(dur) && dur > 0) {
                time = Math.min(time, dur);
            }
            this.currentStreamingAudio.currentTime = Math.max(0, time);
        }
    }

    playBinauralLoop(baseFreq, beatSpread) {
        this.ensureContext();
        
        // Stop any existing continuous binaural tones
        this.stopBinauralTones();
        
        this.musicPlaying = true;
        this.activeBinauralNodes = [];
        this.activeBinauralGains = [];
        
        const t = this.ctx.currentTime;
        
        // Play base freq + octaves continuously
        const freqs = [baseFreq * 0.5, baseFreq, baseFreq * 1.5, baseFreq * 2.0];
        
        freqs.forEach((freq, i) => {
            const pair = this._createBinauralPair(i % 2 === 0 ? 'sine' : 'triangle', freq, beatSpread, t);
            
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            filter.type = 'lowpass';
            filter.frequency.value = 300 + Math.random() * 200;

            // Quick fade in to avoid clicks, then sustain continuously
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.2, t + 1.0);

            pair.connect(filter);
            filter.connect(gain);
            gain.connect(this.musicGain);
            pair.start(t);
            
            this.activeBinauralNodes.push(pair);
            this.activeBinauralGains.push(gain);
        });

        // Lush Mindwave Ambient Pad Synthesis (Continuous)
        const padOsc1 = this.ctx.createOscillator();
        const padOsc2 = this.ctx.createOscillator();
        const padOsc3 = this.ctx.createOscillator();
        
        padOsc1.type = 'sawtooth';
        padOsc2.type = 'sawtooth';
        padOsc3.type = 'sine'; // Warm Sub bass
        
        // Detuning for thick ambient texture
        padOsc1.frequency.value = baseFreq * 0.5;
        padOsc2.frequency.value = baseFreq * 0.5 + 1.5; 
        padOsc3.frequency.value = baseFreq * 0.25; 
        
        const padFilter = this.ctx.createBiquadFilter();
        padFilter.type = 'lowpass';
        padFilter.frequency.setValueAtTime(200, t);
        
        const padGain = this.ctx.createGain();
        padGain.gain.setValueAtTime(0, t);
        padGain.gain.linearRampToValueAtTime(0.1, t + 2.0);
        
        padOsc1.connect(padFilter);
        padOsc2.connect(padFilter);
        padOsc3.connect(padFilter);
        padFilter.connect(padGain);
        padGain.connect(this.musicGain);
        
        padOsc1.start(t);
        padOsc2.start(t);
        padOsc3.start(t);
        
        this.activeBinauralNodes.push({ stop: (time) => { padOsc1.stop(time); padOsc2.stop(time); padOsc3.stop(time); } });
        this.activeBinauralGains.push(padGain);
    }

    updateBinauralFrequencies(baseFreq, beatSpread) {
        if (!this.ctx || !this.activeBinauralNodes || this.activeBinauralNodes.length === 0) {
            this.playBinauralLoop(baseFreq, beatSpread);
            return;
        }
        
        const t = this.ctx.currentTime;
        const freqs = [baseFreq * 0.5, baseFreq, baseFreq * 1.5, baseFreq * 2.0];
        
        // The first 4 nodes are the binaural pairs
        for(let i = 0; i < 4; i++) {
            if(this.activeBinauralNodes[i] && this.activeBinauralNodes[i].nodeL && this.activeBinauralNodes[i].nodeR) {
                const freq = freqs[i];
                this.activeBinauralNodes[i].nodeL.frequency.setTargetAtTime(freq, t, 0.1);
                this.activeBinauralNodes[i].nodeR.frequency.setTargetAtTime(freq + beatSpread, t, 0.1);
            }
        }
    }

    stopBinauralTones() {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        
        if (this.activeBinauralGains) {
            this.activeBinauralGains.forEach(gain => {
                try {
                    gain.gain.cancelScheduledValues(t);
                    gain.gain.setTargetAtTime(0, t, 0.1);
                } catch(e) {}
            });
        }
        
        if (this.activeBinauralNodes) {
            const nodes = this.activeBinauralNodes;
            setTimeout(() => {
                nodes.forEach(node => {
                    try { node.stop(0); } catch(e) {}
                });
            }, 500);
        }
        
        this.activeBinauralNodes = [];
        this.activeBinauralGains = [];
    }

    setMusicVolume(vol) {
        this.musicVolume = Math.max(0, Math.min(1, parseFloat(vol) || 0));
        localStorage.setItem('audioMusicVolume', this.musicVolume);
        this._applyVolumes();
    }

    setSfxVolume(vol) {
        this.sfxVolume = Math.max(0, Math.min(1, parseFloat(vol) || 0));
        localStorage.setItem('audioSfxVolume', this.sfxVolume);
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
        if (this.activeBinauralGains && this.activeBinauralGains.length > 0) {
            this.activeBinauralGains.forEach(gain => {
                try {
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setTargetAtTime(0, now, 0.5);
                } catch(e) {}
            });
            setTimeout(() => {
                if (this.activeBinauralGains && !this.muted) {
                    this.activeBinauralGains.forEach(gain => {
                        try {
                            gain.gain.setTargetAtTime(0.05 * (this.musicVolume || 1), this.ctx.currentTime, 1.0);
                        } catch(e) {}
                    });
                }
            }, durationMs);
        }
        if (this.sfxGain) {
            this.sfxGain.gain.cancelScheduledValues(now);
            this.sfxGain.gain.setTargetAtTime(0, now, 0.5);
            setTimeout(() => {
                if (this.sfxGain && !this.sfxMuted) {
                    this.sfxGain.gain.setTargetAtTime(this.sfxVolume, this.ctx.currentTime, 1.0);
                }
            }, durationMs);
        }
        if (this.enemyGain) {
            this.enemyGain.gain.cancelScheduledValues(now);
            this.enemyGain.gain.setTargetAtTime(0, now, 0.5);
            setTimeout(() => {
                if (this.enemyGain && !this.sfxMuted) {
                    this.enemyGain.gain.setTargetAtTime(this.sfxVolume * 0.05, this.ctx.currentTime, 1.0);
                }
            }, durationMs);
        }
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
    playPlayerExplosion() { if (!this.sfxMuted && this._canPlay('playerexplosion', 1000)) this._playSynthTone(100, 'square', 2.0); }
    playExplosionBig() { if (!this.sfxMuted && this._canPlay('explosionbig', 200)) this._playEnemyTone(100, 'square', 0.8); }

    startEngineHum() {
        this.ensureContext();
        if (this.engineHumMuted || !this.ctx) return;
        if (!this.engineNode) {
            this.currentRpm = this.engineBasePitch; // Initialize RPM to base pitch
            this.engineNode = this._createBinauralPair('sine', this.currentRpm, this.engineHarmonics, this.ctx.currentTime);
            this.engineGain = this.ctx.createGain();
            this.engineGain.gain.value = 0.05 * (this.engineVolume || 1);
            this.engineNode.connect(this.engineGain);
            this.engineGain.connect(this.masterGain);
            this.engineNode.start(this.ctx.currentTime);
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
        this.ensureContext();
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

    _playEnemyTone(freq, type, duration) {
        this.ensureContext();
        if (!this.ctx || this.sfxMuted) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(this.enemyGain);
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


    playEnemyLaser() { if (!this.sfxMuted && this._canPlay('enemylaser')) this._playEnemyTone(400, 'sawtooth', 0.15); }
    playExplosionSmall() { if (!this.sfxMuted && this._canPlay('explosionsmall')) this._playEnemyTone(150, 'square', 0.3); }
    playHullHit() { if (!this.sfxMuted && this._canPlay('hullhit')) this._playSynthTone(200, 'triangle', 0.2); }
    playLaser() { if (!this.sfxMuted && this._canPlay('laser')) this._playSynthTone(600, 'sawtooth', 0.1); }
    playMenuHover() { if (!this.sfxMuted && this._canPlay('menuhover', 100)) this._playSynthTone(800, 'sine', 0.05); }
    playMenuSelect() { if (!this.sfxMuted && this._canPlay('menuselect', 100)) this._playSynthTone(1200, 'sine', 0.1); }
    playMissionComplete() { if (!this.sfxMuted && this._canPlay('missioncomplete', 1000)) this._playSynthTone(500, 'sine', 1.0); }
    playShieldHit() { if (!this.sfxMuted && this._canPlay('shieldhit')) this._playSynthTone(800, 'sine', 0.2); }
    playUpgrade() { if (!this.sfxMuted && this._canPlay('upgrade')) this._playSynthTone(1000, 'sine', 0.5); }
    
    updateEngineHum(thrustInput = 0) {
        if (!this.engineNode || !this.engineGain || this.engineHumMuted || !this.ctx) return;
        
        // RPMs: Track a virtual RPM that winds up when holding gas and drops when released
        if (thrustInput > 0) {
            this.currentRpm = Math.min((this.currentRpm || this.engineBasePitch) + 3, this.engineBasePitch + 150); // Wind up
        } else {
            this.currentRpm = Math.max((this.currentRpm || this.engineBasePitch) - 5, this.engineBasePitch);  // Wind down
        }
        
        // Apply RPM to pitch
        if (this.engineNode.nodeL && this.engineNode.nodeR) {
            this.engineNode.nodeL.frequency.setTargetAtTime(this.currentRpm, this.ctx.currentTime, 0.1);
            this.engineNode.nodeR.frequency.setTargetAtTime(this.currentRpm + this.engineHarmonics, this.ctx.currentTime, 0.1);
        }
        
        // Volume jumps up with throttle, drops in neutral
        const targetVolume = thrustInput > 0 ? 0.08 : 0.03;
        this.engineGain.gain.setTargetAtTime(targetVolume * (this.engineVolume || 1), this.ctx.currentTime, 0.2);
    }

    setEngineHarmonicsSettings(pitch, harmonics) {
        this.engineBasePitch = pitch;
        this.engineHarmonics = harmonics;
        localStorage.setItem('engineBasePitch', pitch);
        localStorage.setItem('engineHarmonics', harmonics);
        // Instant update if engine is running
        if (this.engineNode && this.engineNode.nodeL) {
             this.engineNode.nodeL.frequency.setTargetAtTime(this.currentRpm || this.engineBasePitch, this.ctx.currentTime, 0.1);
             this.engineNode.nodeR.frequency.setTargetAtTime((this.currentRpm || this.engineBasePitch) + this.engineHarmonics, this.ctx.currentTime, 0.1);
        }
    }


    updateHazardAudio(nearestBHDist, nearestBHRelX, nearestNebDist) {
        // Implement logic if needed, or leave empty to prevent crashes
    }
    
    playTransmissionStart() {
        if (!this.sfxMuted && this._canPlay('transmissionstart', 1000)) this._playSynthTone(1500, 'sine', 0.5);
    }

}

// Global audio engine instance
