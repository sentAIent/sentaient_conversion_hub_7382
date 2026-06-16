import { state } from '../state.js';

export class AmbientMixer {
    constructor(audioCtx, masterDest) {
        this.ctx = audioCtx;
        this.masterDest = masterDest; // Where to connect the ambient sounds
        
        this.tracks = {
            thunderstorm: { active: false, gainNode: null, nodes: [], volume: 0.5 },
            ocean: { active: false, gainNode: null, nodes: [], volume: 0.5 },
            fire: { active: false, gainNode: null, nodes: [], volume: 0.5 },
            solfeggio432: { active: false, gainNode: null, nodes: [], volume: 0.5 },
            solfeggio528: { active: false, gainNode: null, nodes: [], volume: 0.5 }
        };
    }

    startTrack(id) {
        if (!this.tracks[id] || this.tracks[id].active) return;
        this.tracks[id].active = true;
        
        const gainNode = this.ctx.createGain();
        gainNode.gain.value = this.tracks[id].volume;
        gainNode.connect(this.masterDest);
        this.tracks[id].gainNode = gainNode;

        const nodes = [];

        switch(id) {
            case 'thunderstorm':
                this._createThunderstorm(gainNode, nodes);
                break;
            case 'ocean':
                this._createOcean(gainNode, nodes);
                break;
            case 'fire':
                this._createFire(gainNode, nodes);
                break;
            case 'solfeggio432':
                this._createSolfeggio(432.0, gainNode, nodes);
                break;
            case 'solfeggio528':
                this._createSolfeggio(528.0, gainNode, nodes);
                break;
        }

        this.tracks[id].nodes = nodes;
    }

    stopTrack(id) {
        if (!this.tracks[id] || !this.tracks[id].active) return;
        
        const track = this.tracks[id];
        track.active = false;

        const now = this.ctx.currentTime;
        if (track.gainNode) {
            track.gainNode.gain.cancelScheduledValues(now);
            track.gainNode.gain.setValueAtTime(track.gainNode.gain.value, now);
            track.gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
            
            setTimeout(() => {
                track.nodes.forEach(n => {
                    try {
                        if (n.stop) n.stop();
                        n.disconnect();
                    } catch (e) {}
                });
                if (track.gainNode) {
                    track.gainNode.disconnect();
                    track.gainNode = null;
                }
                track.nodes = [];
            }, 600);
        }
    }

    setVolume(id, volume) {
        if (!this.tracks[id]) return;
        this.tracks[id].volume = volume;
        if (this.tracks[id].active && this.tracks[id].gainNode) {
            const now = this.ctx.currentTime;
            this.tracks[id].gainNode.gain.cancelScheduledValues(now);
            this.tracks[id].gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
        }
    }

    _createSolfeggio(freq, dest, nodes) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Add some harmonic richness
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = freq * 2;
        const gain2 = this.ctx.createGain();
        gain2.gain.value = 0.1;
        
        osc.connect(dest);
        osc2.connect(gain2);
        gain2.connect(dest);
        
        osc.start();
        osc2.start();
        
        nodes.push(osc, osc2, gain2);
    }

    _createOcean(dest, nodes) {
        const bufferSize = this.ctx.sampleRate * 2; // 2 seconds
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02; // Simple pink noise approximation
            lastOut = output[i];
            output[i] *= 3.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400; // Deep ocean roar

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1; // Slow waves (10s cycle)

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 300; // Modulate cutoff frequency
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        noise.connect(filter);
        filter.connect(dest);

        noise.start();
        lfo.start();

        nodes.push(noise, filter, lfo, lfoGain);
    }

    _createThunderstorm(dest, nodes) {
        // Base rain layer (pink/brown noise)
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const rain = this.ctx.createBufferSource();
        rain.buffer = buffer;
        rain.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 0.5;

        rain.connect(filter);
        filter.connect(dest);
        rain.start();
        nodes.push(rain, filter);

        // Occasional thunder loops
        let active = true;
        const thunderLoop = () => {
            if (!active) return;
            // Generate thunder one-shot
            const tFreq = 50 + Math.random() * 50;
            const tOsc = this.ctx.createOscillator();
            tOsc.type = 'square';
            tOsc.frequency.value = tFreq;
            
            const tFilter = this.ctx.createBiquadFilter();
            tFilter.type = 'lowpass';
            tFilter.frequency.value = 200;
            
            const tGain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            tGain.gain.setValueAtTime(0, now);
            tGain.gain.linearRampToValueAtTime(0.8, now + 0.1);
            tGain.gain.exponentialRampToValueAtTime(0.01, now + 3 + Math.random() * 2);
            
            tOsc.connect(tFilter);
            tFilter.connect(tGain);
            tGain.connect(dest);
            
            tOsc.start(now);
            tOsc.stop(now + 6);
            
            nodes.push(tOsc, tFilter, tGain);

            // Next thunder in 10-30 seconds
            setTimeout(thunderLoop, 10000 + Math.random() * 20000);
        };
        
        thunderLoop();
        
        // Special cleanup for the timeout loop
        nodes.push({
            stop: () => { active = false; },
            disconnect: () => {}
        });
    }

    _createFire(dest, nodes) {
        // Crackling noise
        const bufferSize = this.ctx.sampleRate * 1; // 1 sec
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            // Sparse pops
            if (Math.random() < 0.01) {
                output[i] = Math.random() * 2 - 1;
            } else {
                output[i] = 0;
            }
        }

        const crackle = this.ctx.createBufferSource();
        crackle.buffer = buffer;
        crackle.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        
        // Low rumble
        const rumbleOsc = this.ctx.createOscillator();
        rumbleOsc.type = 'brown'; // Fake it with low sine for now
        rumbleOsc.frequency.value = 40;
        const rumbleGain = this.ctx.createGain();
        rumbleGain.gain.value = 0.3;
        
        crackle.connect(filter);
        filter.connect(dest);
        rumbleOsc.connect(rumbleGain);
        rumbleGain.connect(dest);
        
        crackle.start();
        rumbleOsc.start();
        nodes.push(crackle, filter, rumbleOsc, rumbleGain);
    }
}

// Simple pink noise approx state
let lastOut = 0;
