import React, { useEffect, useRef } from 'react';

// Dynamically import plugins so web builds don't fail if plugins are missing
const registerBackgroundAudio = async () => {
  const cap = window.Capacitor;
  if (cap && cap.isNativePlatform()) {
    try {
      const msPkg = '@capacitor-community/media-session';
      const bgPkg = '@capacitor-community/background-mode';
      const { MediaSession } = await import(/* @vite-ignore */ msPkg);
      const { BackgroundMode } = await import(/* @vite-ignore */ bgPkg);
      
      MediaSession.setMetadata({
        title: 'MindWave Ambient Engine',
        artist: 'Sentaient',
        album: 'Binaural & Generative Audio'
      });
      
      BackgroundMode.enable();
    } catch (e) {
      console.log('Capacitor audio plugins not installed yet.');
    }
  }
};

// A headless component that manages ambient audio tracks, generated music, and custom multi-track instruments
export default function AmbientAudioEngine({ audioParams, musicUrl, customTracks = [] }) {
  const audioContextRef = useRef(null);
  const gainNodesRef = useRef({});
  const musicAudioElementRef = useRef(null);
  const musicSourceNodeRef = useRef(null);
  const musicGainNodeRef = useRef(null);
  
  // Custom multi-track instruments from the Sonic Vault
  const customTrackRefs = useRef({});

  useEffect(() => {
    // Initialize Web Audio API on mount
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      registerBackgroundAudio();
    }

    const ctx = audioContextRef.current;

    // Helper to setup a synthetic noise generator for ambient sounds
    const createNoiseGenerator = (type) => {
      const bufferSize = ctx.sampleRate * 2; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      if (type === 'wind') {
        filter.type = 'lowpass';
        filter.frequency.value = 400;
      } else if (type === 'rain') {
        filter.type = 'highpass';
        filter.frequency.value = 1000;
      } else if (type === 'traffic') {
        filter.type = 'lowpass';
        filter.frequency.value = 200;
      } else if (type === 'water') {
        filter.type = 'lowpass';
        filter.frequency.value = 600;
      } else {
        filter.type = 'allpass';
      }

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0; // Start muted

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      noise.start();

      return gainNode;
    };

    // Setup ambient tracks
    const tracks = ['wind', 'rain', 'traffic', 'birds', 'water'];
    tracks.forEach(track => {
      if (!gainNodesRef.current[track]) {
        gainNodesRef.current[track] = createNoiseGenerator(track);
      }
    });

    // Setup Music Audio Element
    if (!musicAudioElementRef.current) {
      const audioEl = new Audio();
      audioEl.crossOrigin = "anonymous";
      audioEl.loop = true;
      musicAudioElementRef.current = audioEl;

      // Route HTML5 Audio into WebAudio context for master volume control
      const source = ctx.createMediaElementSource(audioEl);
      const gain = ctx.createGain();
      gain.gain.value = 0.8; // Music volume
      
      source.connect(gain);
      gain.connect(ctx.destination);

      musicSourceNodeRef.current = source;
      musicGainNodeRef.current = gain;
    }

    return () => {
      // Cleanup on unmount
      if (musicAudioElementRef.current) {
        musicAudioElementRef.current.pause();
        musicAudioElementRef.current.src = "";
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update ambient volumes based on props
  useEffect(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (audioParams) {
      Object.keys(audioParams).forEach(track => {
        if (gainNodesRef.current[track]) {
          const gainNode = gainNodesRef.current[track];
          gainNode.gain.setTargetAtTime(
            audioParams[track] || 0, 
            audioContextRef.current.currentTime, 
            0.5
          );
        }
      });
    }
  }, [audioParams]);

  // Handle generative music track changes
  useEffect(() => {
    if (!musicAudioElementRef.current || !musicUrl) return;

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const audioEl = musicAudioElementRef.current;
    
    // If it's a new URL, fade out old, load new, fade in
    audioEl.src = musicUrl;
    audioEl.play().catch(e => console.warn("Audio autoplay prevented. User interaction required.", e));

  }, [musicUrl]);

  // Handle custom multi-track looping instruments
  useEffect(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // 1. Remove tracks that are no longer in the customTracks array
    const currentTrackIds = customTracks.map(t => t.id);
    Object.keys(customTrackRefs.current).forEach(id => {
      if (!currentTrackIds.includes(id)) {
        const ref = customTrackRefs.current[id];
        ref.audioEl.pause();
        ref.audioEl.src = "";
        ref.gainNode.disconnect();
        delete customTrackRefs.current[id];
      }
    });

    // 2. Add or Update custom tracks
    customTracks.forEach(track => {
      let ref = customTrackRefs.current[track.id];
      
      // Setup new track
      if (!ref) {
        const audioEl = new Audio(track.url);
        audioEl.crossOrigin = "anonymous";
        audioEl.loop = true;
        
        const source = ctx.createMediaElementSource(audioEl);
        const gainNode = ctx.createGain();
        
        // Add a slight reverb/filter based on environment (simplified spatial routing)
        // In a real app, we'd route this through the main environmental convolution reverb
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        audioEl.play().catch(e => console.warn("Custom track autoplay prevented:", e));
        
        ref = { audioEl, source, gainNode };
        customTrackRefs.current[track.id] = ref;
      }
      
      // Update volume
      ref.gainNode.gain.setTargetAtTime(
        track.volume !== undefined ? track.volume : 0.8,
        ctx.currentTime,
        0.1
      );
    });

  }, [customTracks]);

  return null; // Headless component
}
