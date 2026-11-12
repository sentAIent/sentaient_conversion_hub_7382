"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Clock, 
  Activity, 
  Flame, 
  Radio, 
  CloudRain, 
  X 
} from 'lucide-react';

export type RadarDatasetMode = 'nexrad_doppler' | 'smoke_plume' | 'ionospheric_pulse';

export interface RadarFrameInfo {
  id: string;
  label: string;
  relativeMinutes: number;
  intensityMultiplier: number;
  description: string;
}

export const RADAR_FRAMES: RadarFrameInfo[] = [
  { id: 'f0', label: 'T-60m', relativeMinutes: -60, intensityMultiplier: 0.65, description: '1 Hour Prior Baseline Sweep' },
  { id: 'f1', label: 'T-45m', relativeMinutes: -45, intensityMultiplier: 0.75, description: '45 Min Antecedent Echo' },
  { id: 'f2', label: 'T-30m', relativeMinutes: -30, intensityMultiplier: 0.88, description: '30 Min Convective Inflow' },
  { id: 'f3', label: 'T-15m', relativeMinutes: -15, intensityMultiplier: 0.95, description: '15 Min Immediate Scan' },
  { id: 'f4', label: 'NOW', relativeMinutes: 0, intensityMultiplier: 1.0, description: 'Live Telemetry & Real-Time Sweep' }
];

interface RadarLoopControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onFrameChange?: (frame: RadarFrameInfo, mode: RadarDatasetMode) => void;
  activeMode?: RadarDatasetMode;
}

export const RadarLoopController: React.FC<RadarLoopControllerProps> = ({
  isOpen,
  onClose,
  onFrameChange,
  activeMode = 'nexrad_doppler'
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(4); // Default to NOW
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // 1000ms per frame
  const [datasetMode, setDatasetMode] = useState<RadarDatasetMode>(activeMode);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDatasetMode(activeMode);
  }, [activeMode]);

  // Handle frame change notification
  useEffect(() => {
    if (onFrameChange) {
      onFrameChange(RADAR_FRAMES[currentFrameIndex], datasetMode);
    }
  }, [currentFrameIndex, datasetMode, onFrameChange]);

  // Animation loop timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % RADAR_FRAMES.length);
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  if (!isOpen) return null;

  const currentFrame = RADAR_FRAMES[currentFrameIndex];

  return (
    <div 
      data-testid="radar-loop-controller"
      className="bg-black/92 border border-cyan-500/80 rounded-2xl p-3 sm:p-4 text-white font-mono backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.9)] w-full max-w-[min(440px,calc(100vw-24px))] flex flex-col gap-2.5 pointer-events-auto"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400 text-cyan-300">
            <Activity size={15} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span>RADAR LOOP CONTROLLER</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900 border border-cyan-400 text-cyan-200">
                ZERO SLIDERS
              </span>
            </h3>
            <p className="text-[10px] text-gray-400">
              Multi-Frame Stepping & Temporal Atmospheric Playback
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Close Radar Loop Controller"
        >
          <X size={16} />
        </button>
      </div>

      {/* Dataset Mode Selection Chips (Zero Sliders) */}
      <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-white/10 text-[10px]">
        <button
          type="button"
          data-testid="mode-nexrad"
          onClick={() => setDatasetMode('nexrad_doppler')}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1 font-bold ${
            datasetMode === 'nexrad_doppler'
              ? 'bg-sky-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <CloudRain size={12} />
          <span>Doppler</span>
        </button>
        <button
          type="button"
          data-testid="mode-smoke"
          onClick={() => setDatasetMode('smoke_plume')}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1 font-bold ${
            datasetMode === 'smoke_plume'
              ? 'bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame size={12} />
          <span>Smoke Plumes</span>
        </button>
        <button
          type="button"
          data-testid="mode-ionosphere"
          onClick={() => setDatasetMode('ionospheric_pulse')}
          className={`flex-1 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1 font-bold ${
            datasetMode === 'ionospheric_pulse'
              ? 'bg-purple-500 text-black shadow-[0_0_10px_rgba(168,85,247,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Radio size={12} />
          <span>HF Ionosphere</span>
        </button>
      </div>

      {/* Frame Status Display */}
      <div className="bg-black/80 border border-cyan-900/60 rounded-xl p-2.5 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Clock size={11} className="text-cyan-400" /> ACTIVE FRAME
          </div>
          <div className="text-sm font-bold text-cyan-300 font-mono">
            {currentFrame.label} ({currentFrame.relativeMinutes === 0 ? 'Live Now' : `${currentFrame.relativeMinutes}m`})
          </div>
          <div className="text-[10px] text-gray-400">{currentFrame.description}</div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-gray-400">GAIN INTENSITY</div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            {Math.round(currentFrame.intensityMultiplier * 100)}%
          </div>
        </div>
      </div>

      {/* Discrete Timeline Stepping Chips (Pure zero-slider design) */}
      <div className="grid grid-cols-5 gap-1.5 pt-0.5">
        {RADAR_FRAMES.map((f, idx) => (
          <button
            key={f.id}
            type="button"
            data-testid={`frame-step-${f.id}`}
            onClick={() => {
              setCurrentFrameIndex(idx);
              setIsPlaying(false);
            }}
            className={`py-1.5 px-1 rounded-lg text-center font-mono text-[10px] font-bold border transition-all ${
              currentFrameIndex === idx
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105'
                : 'bg-neutral-900/80 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            <div>{f.label}</div>
            <div className="text-[8px] opacity-70">{f.relativeMinutes === 0 ? 'NOW' : `${f.relativeMinutes}m`}</div>
          </button>
        ))}
      </div>

      {/* Playback Controls & Speed Steppers */}
      <div className="flex items-center justify-between pt-1 border-t border-cyan-900/40">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid="btn-radar-first"
            onClick={() => {
              setCurrentFrameIndex(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            title="First Frame (T-60m)"
          >
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            data-testid="btn-radar-play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-amber-950 border border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY LOOP'}</span>
          </button>
          <button
            type="button"
            data-testid="btn-radar-now"
            onClick={() => {
              setCurrentFrameIndex(4);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            title="Jump to Real-Time (NOW)"
          >
            <SkipForward size={14} />
          </button>
        </div>

        {/* Speed Stepper Buttons */}
        <div className="flex items-center gap-1 text-[10px]">
          <span className="text-gray-400 mr-1">SPEED:</span>
          {[
            { label: '0.5x', ms: 1800 },
            { label: '1.0x', ms: 1000 },
            { label: '2.0x', ms: 500 }
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              data-testid={`speed-${s.label}`}
              onClick={() => setPlaybackSpeed(s.ms)}
              className={`px-1.5 py-0.5 rounded font-bold border transition-all ${
                playbackSpeed === s.ms
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow'
                  : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
