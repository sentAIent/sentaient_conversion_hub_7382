import { useEffect, useRef, useCallback } from 'react';

export function useAudioManager() {
  const audioCtxRef = useRef(null);
  const soundtrackRef = useRef(null);

  useEffect(() => {
    // Web Audio API context for SFX
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtxRef.current = new AudioContext();
    }

    // HTML Audio element for high-energy soundtrack
    const audio = new Audio();
    // Using a placeholder; in a real app this would point to a local high-energy asset
    audio.src = 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg';
    audio.loop = true;
    audio.volume = 0.5;
    soundtrackRef.current = audio;

    return () => {
      if (soundtrackRef.current) {
        soundtrackRef.current.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playSoundtrack = useCallback(() => {
    if (soundtrackRef.current && soundtrackRef.current.paused) {
      soundtrackRef.current.play().catch(err => console.warn('Soundtrack play blocked', err));
    }
  }, []);

  const playSfx = useCallback((type) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'wind') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.25);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'carve') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.2);
      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'hit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.1);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  }, []);

  return { playSoundtrack, playSfx };
}

export default function AudioManager() {
  return null;
}
