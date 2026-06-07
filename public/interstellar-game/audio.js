export class AudioEngine {
    constructor() {
        this.ctx = null; // AudioContext (lazy init on user interaction)
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.muted = localStorage.getItem('audioMuted') === 'true';
        this.musicPlaying = false;
        const savedVol = localStorage.getItem('audioVolume');
        this.volume = savedVol !== null && !isNaN(parseFloat(savedVol)) ? parseFloat(savedVol) : 0.3;
        
        const savedMusicVol = localStorage.getItem('audioMusicVolume');
        this.musicVolume = savedMusicVol !== null && !isNaN(parseFloat(savedMusicVol)) ? parseFloat(savedMusicVol) : 0.15;
        this.engineNode = null;
        this.engineGain = null;
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
        if (this.ctx && this.ctx.state !== 'running') {
            try {
                this.ctx.resume().catch(e => console.warn("[Audio] Resume blocked:", e));
            } catch(e) {}
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('audioMuted', this.muted);
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
        }
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.muted = this.muted;
        }
        return this.muted;
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

    playMenuHover() {
        if (!this._canPlay('hover', 50)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const pair = this._createBinauralPair('sine', 440, 5, t);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.05);
    }

    playMenuSelect() {
        this.playUIClick();
    }

    playUpgrade() {
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Ascending sci-fi arpeggio
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, i) => {
            const pair = this._createBinauralPair('sine', freq, 8, t + i * 0.1);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, t + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.15, t + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.3);
            pair.connect(gain);
            gain.connect(this.sfxGain);
            pair.start(t + i * 0.1);
            pair.stop(t + i * 0.1 + 0.3);
        });
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

    playCollect() {
        if (!this._canPlay('collect', 100)) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // High frequency Beta burst
        const pair = this._createBinauralPair('sine', 600, 16, t, 1200, 0.1);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        pair.connect(gain);
        gain.connect(this.sfxGain);
        pair.start(t);
        pair.stop(t + 0.12);
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
        if (!this.enginePair || !this.ctx) return;
        const freq = 40 + speed * 8; // Pitch up with speed
        this.enginePair.nodeL.frequency.setTargetAtTime(Math.min(freq, 200), this.ctx.currentTime, 0.1);
        this.enginePair.nodeR.frequency.setTargetAtTime(Math.min(freq + 6, 206), this.ctx.currentTime, 0.1); // Keep 6Hz difference
        const vol = 0.02 + Math.min(speed * 0.005, 0.08);
        this.engineGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }

    stopEngineHum() {
        if (this.enginePair) {
            try { this.enginePair.stop(this.ctx.currentTime); } catch (e) { }
            this.enginePair = null;
            this.engineGain = null;
        }
    }

    // --- AMBIENT SPACE MUSIC & STREAMING ---

    setMusicVolume(vol) {
        this.musicVolume = parseFloat(vol);
        if (this.musicGain) {
            this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx ? this.ctx.currentTime : 0);
        }
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.volume = this.musicVolume;
        }
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
        
        // Clean crossfade: gracefully kill the old gain node and spawn a new one 
        // to prevent overlapping 8-second chords from clipping the context.
        if (this.musicGain && this.ctx) {
            const oldGain = this.musicGain;
            try {
                oldGain.gain.cancelScheduledValues(this.ctx.currentTime);
                oldGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
            } catch(e) {}
            
            setTimeout(() => {
                try { oldGain.disconnect(); } catch(e) {}
            }, 500);

            // Fresh gain for any incoming new track
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.musicVolume;
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

    startAmbientMusic() {
        // Fallback for game start if no music selected
        // We will default to a calm Alpha binaural sequence
        this.playBinauralLoop(130, 10);
    }

    playStreamingMusic(urlOrPlaylist, startIndex = 0) {
        this.ensureContext();
        this.stopAllMusic();
        
        if (Array.isArray(urlOrPlaylist)) {
            this.playlist = urlOrPlaylist;
            this.currentTrackIndex = startIndex;
        } else {
            this.playlist = [urlOrPlaylist];
            this.currentTrackIndex = 0;
        }

        if (this.playlist.length === 0) return;
        
        const url = this.playlist[this.currentTrackIndex];

        this.currentStreamingAudio = new Audio(url);
        // Loop if it's a single track, otherwise let onended handle next track
        this.currentStreamingAudio.loop = this.playlist.length === 1;
        this.currentStreamingAudio.volume = this.musicVolume || 1.0;
        this.currentStreamingAudio.muted = this.muted;
        
        this.currentStreamingAudio.onended = () => {
            if (this.playlist.length > 1) {
                this.playNextTrack();
            }
        };

        // Append to DOM to prevent Safari/macOS from garbage collecting or throttling background audio
        this.currentStreamingAudio.style.display = 'none';
        document.body.appendChild(this.currentStreamingAudio);
        
        this.isStreamingPlaying = true;
        this.currentStreamingAudio.play().catch(err => {
            if (err.name === 'AbortError') return;
            console.warn("[Audio] Failed to play streaming audio:", err);
            // If track fails, try the next one after a delay
            if (this.playlist.length > 1) {
                setTimeout(() => this.playNextTrack(), 2000);
            }
        });
        
        // Add timeupdate listener for scrubber
        this.currentStreamingAudio.addEventListener('timeupdate', () => {
            if (window.app && window.app.updateScrubber) {
                window.app.updateScrubber(
                    this.currentStreamingAudio.currentTime, 
                    this.currentStreamingAudio.duration
                );
            }
        });
        
        // Notify UI
        if (window.app && window.app.updateMediaControlsUI) {
            window.app.updateMediaControlsUI(true);
        }
    }

    playNextTrack() {
        if (!this.playlist || this.playlist.length <= 1) return;
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.playStreamingMusic(this.playlist, this.currentTrackIndex);
        if (window.app && window.app.updateNowPlayingName) {
            window.app.updateNowPlayingName(this.currentTrackIndex);
        }
    }

    playPreviousTrack() {
        if (!this.playlist || this.playlist.length <= 1) return;
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.playStreamingMusic(this.playlist, this.currentTrackIndex);
        if (window.app && window.app.updateNowPlayingName) {
            window.app.updateNowPlayingName(this.currentTrackIndex);
        }
    }

    pauseStream() {
        if (this.currentStreamingAudio) {
            this.currentStreamingAudio.pause();
            this.isStreamingPlaying = false;
            if (window.app && window.app.updateMediaControlsUI) {
                window.app.updateMediaControlsUI(false);
            }
        }
    }

    resumeStream() {
        if (this.currentStreamingAudio) {
            this.ensureContext();
            this.currentStreamingAudio.play().catch(e => console.warn(e));
            this.isStreamingPlaying = true;
            if (window.app && window.app.updateMediaControlsUI) {
                window.app.updateMediaControlsUI(true);
            }
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
}

// Global audio engine instance
