import { useEffect, useRef } from 'react';

export function useGameAudio(playerState) {
  const audioCtxRef = useRef(null);
  const windFilterRef = useRef(null);
  const windGainRef = useRef(null);
  const carvingFilterRef = useRef(null);
  const carvingGainRef = useRef(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // White noise
    }

    // Wind Sound
    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 400;

    const windGain = ctx.createGain();
    windGain.gain.value = 0;

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);
    windSource.start();

    windFilterRef.current = windFilter;
    windGainRef.current = windGain;

    // Carving Sound
    const carvingSource = ctx.createBufferSource();
    carvingSource.buffer = noiseBuffer;
    carvingSource.loop = true;

    const carvingFilter = ctx.createBiquadFilter();
    carvingFilter.type = 'bandpass';
    carvingFilter.frequency.value = 800;

    const carvingGain = ctx.createGain();
    carvingGain.gain.value = 0;

    carvingSource.connect(carvingFilter);
    carvingFilter.connect(carvingGain);
    carvingGain.connect(ctx.destination);
    carvingSource.start();

    carvingFilterRef.current = carvingFilter;
    carvingGainRef.current = carvingGain;

    return () => {
      ctx.close();
    };
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current) return;
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const speed = playerState?.speed || 0;
    const isAirborne = playerState?.isAirborne || false;
    const isCarving = playerState?.isCarving || false;

    // Modulate wind based on speed/airtime
    if (windFilterRef.current && windGainRef.current) {
        windFilterRef.current.frequency.setTargetAtTime(
            isAirborne ? 1200 + speed * 50 : 400 + speed * 20,
            audioCtxRef.current.currentTime,
            0.1
        );
        windGainRef.current.gain.setTargetAtTime(
            Math.min(speed / 100, 1) * (isAirborne ? 0.8 : 0.3),
            audioCtxRef.current.currentTime,
            0.1
        );
    }

    // Modulate carving
    if (carvingFilterRef.current && carvingGainRef.current) {
        carvingFilterRef.current.frequency.setTargetAtTime(
            800 + speed * 10,
            audioCtxRef.current.currentTime,
            0.1
        );
        carvingGainRef.current.gain.setTargetAtTime(
            isCarving && !isAirborne ? Math.min(speed / 50, 0.5) : 0,
            audioCtxRef.current.currentTime,
            0.1
        );
    }
  }, [playerState]);

  return audioCtxRef.current;
}
