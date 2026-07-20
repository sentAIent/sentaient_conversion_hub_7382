import { state } from '../state.js';

export class AmbientSynth {
    constructor() {
        this.ctx = null;
        this.nodes = [];
        this.masterGain = null;
        this.reverb = null;
        this.lfo = null;
        this.isPlaying = false;
        this.lfo = null;
        this.isPlaying = false;
        
        // Base frequencies (Default: 432Hz)
        this.setMood('default');
    }

    setMood(intent) {
        let rootFreq = 432;
        switch (intent) {
            case 'relax':
            case 'healing':
                rootFreq = 528; // Transformation/Miracles
                break;
            case 'focus':
            case 'energy':
                rootFreq = 741; // Expression/Solutions
                break;
            case 'sleep':
            case 'calm':
                rootFreq = 396; // Liberating Guilt/Fear
                break;
            case 'deep_work':
                rootFreq = 852; // Returning to Spiritual Order
                break;
            default:
                rootFreq = 432; // Standard tuning
                break;
        }
        
        // Generate a rich chord based on the root frequency
        this.baseFreqs = [
            rootFreq / 4, 
            rootFreq / 2, 
            rootFreq, 
            rootFreq * 1.5, // Perfect fifth
            rootFreq * 2
        ];

        // If playing, smoothly transition active oscillators
        if (this.isPlaying && this.ctx) {
            const now = this.ctx.currentTime;
            this.nodes.forEach((node, i) => {
                node.osc.frequency.setTargetAtTime(this.baseFreqs[i], now, 2.0); // 2-second glide
            });
        }
    }

    async init(audioCtx) {
        if (!audioCtx) return;
        this.ctx = audioCtx;
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0; // Start silent

        // Create Reverb
        this.reverb = this.ctx.createConvolver();
        await this._createReverbImpulse();
        
        // Master routing: Synth -> Reverb -> MasterGain -> Destination
        this.reverb.connect(this.masterGain);
        
        // Connect to the app's main compressor if available, else destination
        if (state.masterCompressor) {
            this.masterGain.connect(state.masterCompressor);
        } else {
            this.masterGain.connect(this.ctx.destination);
        }
    }

    async _createReverbImpulse() {
        // Generate a lush 4-second impulse response programmatically
        const length = this.ctx.sampleRate * 4;
        const impulse = this.ctx.createBuffer(2, length, this.ctx.sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const decay = Math.exp(-i / (this.ctx.sampleRate * 1.5));
            left[i] = (Math.random() * 2 - 1) * decay;
            right[i] = (Math.random() * 2 - 1) * decay;
        }
        this.reverb.buffer = impulse;
    }

    start() {
        if (!this.ctx || this.isPlaying) return;
        this.isPlaying = true;
        
        const now = this.ctx.currentTime;
        
        // Fade in slowly over 10 seconds
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(0, now);
        this.masterGain.gain.linearRampToValueAtTime(0.15, now + 10);

        // LFO for filter modulation (gives it that breathing/evolving feel)
        this.lfo = this.ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = 0.05; // 20 second cycle
        
        // Spawn multiple detuned oscillators for a rich pad sound
        this.baseFreqs.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            
            // Subtle detune for chorus effect
            osc.detune.value = (Math.random() - 0.5) * 15; 
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400; // Deep sound
            filter.Q.value = 0.5;
            
            // Map LFO to filter frequency
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = 200; // Modulate by 200Hz
            this.lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);

            const gain = this.ctx.createGain();
            gain.gain.value = 1 / this.baseFreqs.length;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.reverb);

            osc.start();
            this.nodes.push({ osc, filter, gain, lfoGain });
        });
        
        this.lfo.start();
    }

    stop() {
        if (!this.ctx || !this.isPlaying) return;
        
        const now = this.ctx.currentTime;
        // Fade out slowly
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0, now + 3);
        
        setTimeout(() => {
            this.nodes.forEach(node => {
                node.osc.stop();
                node.osc.disconnect();
                node.filter.disconnect();
                node.gain.disconnect();
                node.lfoGain.disconnect();
            });
            if (this.lfo) {
                this.lfo.stop();
                this.lfo.disconnect();
            }
            this.nodes = [];
            this.isPlaying = false;
        }, 3100);
    }
}

export const ambientSynth = new AmbientSynth();
