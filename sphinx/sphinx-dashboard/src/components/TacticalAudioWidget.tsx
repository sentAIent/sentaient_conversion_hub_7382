import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Square, Waves, X, Minimize2, Maximize2, Shield } from 'lucide-react';
import { SphinxBinauralEngine, BINAURAL_PRESETS, BinauralMode } from '../lib/audio/SphinxBinauralEngine';

interface TacticalAudioWidgetProps {
  onClose: () => void;
}

export const TacticalAudioWidget: React.FC<TacticalAudioWidgetProps> = ({ onClose }) => {
  const [state, setState] = useState(SphinxBinauralEngine.getState());
  const [isMinimized, setIsMinimized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = SphinxBinauralEngine.subscribe(() => {
      setState(SphinxBinauralEngine.getState());
    });
    return () => unsub();
  }, []);

  // Real-time Waveform Canvas Loop
  useEffect(() => {
    if (!state.isPlaying || isMinimized) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = SphinxBinauralEngine.getAnalyser();
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderWave = () => {
      animFrameRef.current = requestAnimationFrame(renderWave);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.5;
      const activeColor = BINAURAL_PRESETS[state.mode]?.color || '#06b6d4';
      ctx.strokeStyle = activeColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = activeColor;

      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
    };

    renderWave();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [state.isPlaying, state.mode, isMinimized]);

  const activePreset = BINAURAL_PRESETS[state.mode];

  return (
    <div
      data-testid="tactical-audio-widget"
      className="fixed bottom-20 sm:bottom-24 right-4 z-40 w-80 sm:w-88 bg-black/95 border border-cyan-800/80 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-md font-mono text-white overflow-hidden transition-all duration-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/90 via-cyan-950/90 to-black px-3 py-2 flex items-center justify-between border-b border-cyan-800/60">
        <div className="flex items-center gap-2">
          <Waves size={15} className={state.isPlaying ? "text-cyan-400 animate-pulse" : "text-cyan-600"} />
          <span className="text-xs font-bold tracking-widest text-cyan-300">TACTICAL AUDIO & BINAURAL</span>
          {state.isPlaying && (
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            title={isMinimized ? "Expand Audio HUD" : "Minimize Audio HUD"}
          >
            {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button
            type="button"
            onClick={() => {
              SphinxBinauralEngine.stop();
              onClose();
            }}
            className="text-gray-400 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors"
            title="Close Audio HUD"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 space-y-3">
          {/* Waveform Canvas */}
          <div className="relative w-full h-14 bg-black/80 rounded border border-cyan-950 flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={320} height={56} className="w-full h-full block" />
            {!state.isPlaying && (
              <span className="absolute text-[10px] tracking-wider text-gray-500 font-bold uppercase">
                [ ENGINE STANDBY — PRESS ENGAGE ]
              </span>
            )}
            <div className="absolute top-1 left-2 text-[9px] text-cyan-400/80 font-bold tracking-wider">
              {activePreset.name} • {activePreset.beatFreq}Hz
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] text-gray-400 font-mono">
              CARRIER: {activePreset.carrierFreq}Hz
            </div>
          </div>

          {/* Main Controls: Engage / Disengage */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="audio-btn-toggle-playback"
              onClick={() => {
                if (state.isPlaying) {
                  SphinxBinauralEngine.stop();
                } else {
                  SphinxBinauralEngine.start();
                }
              }}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 border shadow-lg ${
                state.isPlaying
                  ? 'bg-amber-950/80 border-amber-400 text-amber-200 hover:bg-amber-900 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'bg-cyan-950 border-cyan-400 text-cyan-200 hover:bg-cyan-900 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              }`}
            >
              {state.isPlaying ? <Square size={13} /> : <Play size={13} />}
              {state.isPlaying ? 'DISENGAGE AUDIO' : 'ENGAGE BINAURAL'}
            </button>
            <button
              type="button"
              data-testid="audio-btn-toggle-noise"
              onClick={() => SphinxBinauralEngine.toggleNoise()}
              className={`px-2.5 py-1.5 rounded text-[10px] font-bold border transition-all ${
                state.noiseEnabled
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                  : 'bg-black/50 border-gray-800 text-gray-500 hover:text-white'
              }`}
              title="Toggle subtle atmospheric pink-noise acoustic floor"
            >
              ATMOS NOISE
            </button>
          </div>

          {/* Tactile Frequency Preset Chips */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-gray-400 tracking-wider font-semibold uppercase flex justify-between">
              <span>FREQUENCY TARGET</span>
              <span className="text-cyan-400 font-bold">{activePreset.category}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(BINAURAL_PRESETS) as BinauralMode[]).map((key) => {
                const preset = BINAURAL_PRESETS[key];
                const isActive = state.mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    data-testid={`audio-preset-${key}`}
                    onClick={() => SphinxBinauralEngine.setMode(key)}
                    className={`px-2 py-1.5 rounded text-left border text-[10px] transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-cyan-950/90 border-cyan-400 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                    }`}
                  >
                    <span className="font-bold flex items-center justify-between">
                      <span style={{ color: isActive ? '#ffffff' : preset.color }}>{preset.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </span>
                    <span className="text-[8px] text-gray-500 line-clamp-1">{preset.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zero-Slider Tactile Volume Steppers */}
          <div className="flex items-center justify-between bg-black/60 p-2 rounded border border-cyan-950">
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              {state.volume === 0 ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-cyan-400" />}
              <span className="text-[10px] font-bold tracking-wider">GAIN</span>
              <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-900">
                {Math.round(state.volume * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                data-testid="audio-btn-vol-down"
                onClick={() => SphinxBinauralEngine.setVolume(state.volume - 0.1)}
                className="w-6 h-6 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-gray-300 hover:text-white text-xs font-bold flex items-center justify-center transition-colors"
                title="Decrease volume by 10%"
              >
                -
              </button>
              <button
                type="button"
                data-testid="audio-btn-vol-up"
                onClick={() => SphinxBinauralEngine.setVolume(state.volume + 0.1)}
                className="w-6 h-6 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-gray-300 hover:text-white text-xs font-bold flex items-center justify-center transition-colors"
                title="Increase volume by 10%"
              >
                +
              </button>
              <button
                type="button"
                data-testid="audio-btn-mute"
                onClick={() => SphinxBinauralEngine.setVolume(state.volume > 0 ? 0 : 0.5)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-colors ${
                  state.volume === 0
                    ? 'bg-red-950 border-red-500 text-red-300'
                    : 'bg-black/40 border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                {state.volume === 0 ? 'UNMUTE' : 'MUTE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
