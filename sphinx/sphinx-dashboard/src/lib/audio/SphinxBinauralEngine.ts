/**
 * Sphinx OS — Tactical Binaural & Sonification Engine
 * Pure Web Audio API client-side synthesizer for cognitive entrainment and geospatial monitoring.
 * Zero external audio assets, zero streaming bandwidth, 100% offline capable.
 */

export type BinauralMode = 'gamma_40' | 'schumann_783' | 'alpha_10' | 'deep_drone';

export interface BinauralPresetConfig {
  id: BinauralMode;
  name: string;
  category: string;
  carrierFreq: number; // Hz
  beatFreq: number; // Hz
  description: string;
  color: string;
}

export const BINAURAL_PRESETS: Record<BinauralMode, BinauralPresetConfig> = {
  gamma_40: {
    id: 'gamma_40',
    name: '40Hz GAMMA',
    category: 'Intense Focus',
    carrierFreq: 200,
    beatFreq: 40,
    description: '40Hz gamma entrainment for high-intensity geospatial scanning, pattern recognition, and telemetry focus.',
    color: '#06b6d4' // cyan-500
  },
  schumann_783: {
    id: 'schumann_783',
    name: '7.83Hz SCHUMANN',
    category: 'Earth Grounding',
    carrierFreq: 136.1, // Earth OM carrier
    beatFreq: 7.83,
    description: "Earth ionospheric cavity fundamental resonance (7.83Hz). Calms nervous system during critical alerts.",
    color: '#10b981' // emerald-500
  },
  alpha_10: {
    id: 'alpha_10',
    name: '10Hz ALPHA',
    category: 'Situational Awareness',
    carrierFreq: 216,
    beatFreq: 10,
    description: '10Hz alpha bridge for calm, steady watchstanding and continuous threat evaluation.',
    color: '#818cf8' // indigo-400
  },
  deep_drone: {
    id: 'deep_drone',
    name: '55Hz RECON DRONE',
    category: 'Cinematic Atmosphere',
    carrierFreq: 55, // A1 Sub-bass
    beatFreq: 4.5,
    description: 'Deep cinematic tactical sub-drone with subtle slow modulation for immersive midnight operations.',
    color: '#a855f7' // purple-500
  }
};

class SphinxBinauralEngineService {
  private ctx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isRunning: boolean = false;
  private currentMode: BinauralMode = 'gamma_40';
  private volume: number = 0.5; // 0 to 1
  private noiseEnabled: boolean = true;
  private listeners: Set<() => void> = new Set();

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getState() {
    return {
      isPlaying: this.isRunning,
      mode: this.currentMode,
      volume: this.volume,
      noiseEnabled: this.noiseEnabled
    };
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public start(mode: BinauralMode = this.currentMode) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stopInternal();

    const config = BINAURAL_PRESETS[mode];
    this.currentMode = mode;
    const now = this.ctx.currentTime;

    // Create Left and Right Oscillators
    this.leftOsc = this.ctx.createOscillator();
    this.rightOsc = this.ctx.createOscillator();

    this.leftOsc.type = mode === 'deep_drone' ? 'triangle' : 'sine';
    this.rightOsc.type = mode === 'deep_drone' ? 'triangle' : 'sine';

    this.leftOsc.frequency.setValueAtTime(config.carrierFreq, now);
    this.rightOsc.frequency.setValueAtTime(config.carrierFreq + config.beatFreq, now);

    // Stereo Panner or Channel Merger for clean Left/Right isolation
    if (this.ctx.createStereoPanner) {
      const pannerLeft = this.ctx.createStereoPanner();
      const pannerRight = this.ctx.createStereoPanner();
      pannerLeft.pan.setValueAtTime(-1, now);
      pannerRight.pan.setValueAtTime(1, now);

      this.leftOsc.connect(pannerLeft);
      pannerLeft.connect(this.masterGain);

      this.rightOsc.connect(pannerRight);
      pannerRight.connect(this.masterGain);
    } else {
      const merger = this.ctx.createChannelMerger(2);
      this.leftOsc.connect(merger, 0, 0);
      this.rightOsc.connect(merger, 0, 1);
      merger.connect(this.masterGain);
    }

    // Subtle atmospheric pink-noise floor
    if (this.noiseEnabled) {
      this.startNoise(now);
    }

    this.leftOsc.start(now);
    this.rightOsc.start(now);

    this.isRunning = true;
    this.notify();
  }

  private startNoise(now: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.05;
      }
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(320, now);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.08, now);

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);
      this.noiseNode.start(now);
    } catch (e) {
      // Noise buffer fallback
    }
  }

  public stop() {
    this.stopInternal();
    this.isRunning = false;
    this.notify();
  }

  private stopInternal() {
    if (this.leftOsc) {
      try { this.leftOsc.stop(); this.leftOsc.disconnect(); } catch (e) {}
      this.leftOsc = null;
    }
    if (this.rightOsc) {
      try { this.rightOsc.stop(); this.rightOsc.disconnect(); } catch (e) {}
      this.rightOsc = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch (e) {}
      this.noiseNode = null;
    }
  }

  public setMode(mode: BinauralMode) {
    this.currentMode = mode;
    if (this.isRunning) {
      this.start(mode);
    } else {
      this.notify();
    }
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(clamped, this.ctx.currentTime + 0.05);
    }
    this.notify();
  }

  public toggleNoise() {
    this.noiseEnabled = !this.noiseEnabled;
    if (this.isRunning) {
      this.start(this.currentMode);
    } else {
      this.notify();
    }
  }
}

export const SphinxBinauralEngine = new SphinxBinauralEngineService();
