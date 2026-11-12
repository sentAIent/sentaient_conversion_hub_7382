import React, { useState, useEffect, useRef } from 'react';
import { WebUsbRtlSdrService, SDR_PRESETS, SdrPreset } from '../../lib/sigint/webUsbRtlSdr';
import { Radio, Activity, Zap, Play, Square, ChevronLeft, ChevronRight } from 'lucide-react';

export const SdrTab: React.FC = () => {
  const sdr = WebUsbRtlSdrService.getInstance();
  const [status, setStatus] = useState(sdr.getStatus());
  const [selectedPreset, setSelectedPreset] = useState<SdrPreset>(SDR_PRESETS[1]); // NOAA 162.4
  const [freqHz, setFreqHz] = useState<number>(SDR_PRESETS[1].freqHz);
  const [gainDb, setGainDb] = useState<number>(28);
  const [isReceiving, setIsReceiving] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Frequency step controls (Zero Slider Rule compliant)
  const stepFreq = (deltaHz: number) => {
    const next = Math.max(100000, Math.min(2200000000, freqHz + deltaHz));
    setFreqHz(next);
    sdr.setFrequency(next);
  };

  const selectPreset = (p: SdrPreset) => {
    setSelectedPreset(p);
    setFreqHz(p.freqHz);
    sdr.setFrequency(p.freqHz);
  };

  const toggleConnect = async () => {
    if (status.isConnected) {
      await sdr.disconnect();
      setStatus(sdr.getStatus());
    } else {
      await sdr.connectHardware();
      setStatus(sdr.getStatus());
    }
  };

  // Waterfall animation loop
  useEffect(() => {
    if (!isReceiving) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const frame = sdr.generateFftFrame(canvas.width);
      
      // Shift existing canvas down by 1 pixel for rolling waterfall
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height - 1, 0, 1, canvas.width, canvas.height - 1);

      // Render new top row
      const imgData = ctx.createImageData(canvas.width, 1);
      for (let x = 0; x < canvas.width; x++) {
        const val = frame[x];
        const idx = x * 4;
        // Thermal / Waterfall gradient: Black -> Blue -> Purple -> Amber -> White
        if (val < 64) {
          imgData.data[idx] = 0;
          imgData.data[idx + 1] = Math.round(val * 1.5);
          imgData.data[idx + 2] = Math.round(val * 4);
        } else if (val < 140) {
          imgData.data[idx] = Math.round((val - 64) * 2.5);
          imgData.data[idx + 1] = 40;
          imgData.data[idx + 2] = 200;
        } else if (val < 210) {
          imgData.data[idx] = 255;
          imgData.data[idx + 1] = Math.round((val - 140) * 3);
          imgData.data[idx + 2] = 30;
        } else {
          imgData.data[idx] = 255;
          imgData.data[idx + 1] = 255;
          imgData.data[idx + 2] = Math.round((val - 210) * 5.6);
        }
        imgData.data[idx + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isReceiving, freqHz, gainDb]);

  const freqMHz = (freqHz / 1000000).toFixed(4);

  return (
    <div className="space-y-2.5 text-xs font-mono">
      {/* Top Hardware Status Bar */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-blue-950/40 border border-blue-900/60">
        <div className="flex items-center gap-2">
          <Activity size={14} className={isReceiving ? "text-cyan-400 animate-pulse" : "text-gray-500"} />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">RTL2832U Receiver</div>
            <div className="text-white font-bold flex items-center gap-1.5">
              <span>{status.isSimulated ? 'EMULATED RTL-SDR' : status.isConnected ? 'HARDWARE LOCKED' : 'DISCONNECTED'}</span>
              <span className={`px-1.5 py-0.2 text-[9px] rounded font-mono ${
                status.isConnected && !status.isSimulated ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
              }`}>
                {status.isSimulated ? 'SYNTH-DSP' : status.isConnected ? 'WEBUSB' : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleConnect}
          className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider transition-colors border ${
            status.isConnected
              ? 'bg-red-950/60 text-red-300 border-red-500/50 hover:bg-red-900/80'
              : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 hover:bg-cyan-900/90'
          }`}
        >
          {status.isConnected ? 'DISCONNECT' : 'INIT WEBUSB'}
        </button>
      </div>

      {/* Preset Chips */}
      <div>
        <div className="text-[10px] text-gray-400 uppercase font-bold mb-1 flex items-center gap-1">
          <Radio size={12} className="text-cyan-400" /> SIGINT Frequency Bands
        </div>
        <div className="grid grid-cols-2 gap-1">
          {SDR_PRESETS.map((p) => {
            const isSel = p.freqHz === freqHz;
            return (
              <button
                key={p.name}
                onClick={() => selectPreset(p)}
                className={`p-1.5 text-left rounded border transition-all ${
                  isSel
                    ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-bold truncate text-cyan-300">{p.name}</div>
                <div className="text-[9px] text-gray-400 font-mono">{(p.freqHz / 1e6).toFixed(3)} MHz ({p.mode})</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequency Tuning & Steppers (Zero Slider Rule) */}
      <div className="p-2 rounded bg-black/60 border border-cyan-900/50 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400">TUNER CENTER</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">{freqMHz} MHz</span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => stepFreq(-10000000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            -10M
          </button>
          <button
            onClick={() => stepFreq(-1000000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            -1M
          </button>
          <button
            onClick={() => stepFreq(-100000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            -100k
          </button>
          <button
            onClick={() => stepFreq(100000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            +100k
          </button>
          <button
            onClick={() => stepFreq(1000000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            +1M
          </button>
          <button
            onClick={() => stepFreq(10000000)}
            className="flex-1 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 border border-white/10 font-mono"
          >
            +10M
          </button>
        </div>
      </div>

      {/* Live Waterfall Canvas */}
      <div>
        <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
          <span>WATERFALL SPECTRUM (256 BINS)</span>
          <button
            onClick={() => setIsReceiving(!isReceiving)}
            className="text-cyan-400 hover:text-white flex items-center gap-1"
          >
            {isReceiving ? <Square size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
            {isReceiving ? 'PAUSE' : 'RESUME'}
          </button>
        </div>
        <div className="relative border border-cyan-800/80 rounded overflow-hidden bg-black h-24">
          <canvas
            ref={canvasRef}
            width={256}
            height={96}
            className="w-full h-full block image-rendering-pixelated"
          />
          <div className="absolute inset-x-0 bottom-0 py-0.5 px-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between text-[9px] text-cyan-300 font-mono">
            <span>{(freqHz / 1e6 - 1.0).toFixed(2)} MHz</span>
            <span className="text-white font-bold">{freqMHz} MHz</span>
            <span>{(freqHz / 1e6 + 1.0).toFixed(2)} MHz</span>
          </div>
        </div>
      </div>

      {/* Hardware RF Gain Stepper */}
      <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
        <span className="text-[10px] text-gray-400">R820T2 LNA GAIN</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              const next = Math.max(0, gainDb - 7);
              setGainDb(next);
              sdr.setGain(next);
            }}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold"
          >
            -
          </button>
          <span className="font-mono text-cyan-300 font-bold px-1">{gainDb} dB</span>
          <button
            onClick={() => {
              const next = Math.min(49, gainDb + 7);
              setGainDb(next);
              sdr.setGain(next);
            }}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
