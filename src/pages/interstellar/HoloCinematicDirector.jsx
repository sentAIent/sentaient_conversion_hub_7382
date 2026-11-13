import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const CINEMATIC_LUTS = [
  { id: 'cyber_neon', name: 'Cyberpunk Neon', filter: 'contrast(130%) saturate(160%) hue-rotate(15deg)', icon: '🔮' },
  { id: 'imax_scifi', name: 'IMAX 70mm Panavision', filter: 'contrast(140%) brightness(95%) saturate(110%)', icon: '🎬' },
  { id: 'apollo_grain', name: 'Vintage Apollo 16mm', filter: 'sepia(35%) contrast(110%) brightness(105%)', icon: '🎞️' },
  { id: 'monochrome_void', name: 'Monochrome Obsidian', filter: 'grayscale(100%) contrast(150%)', icon: '⚫' }
];

export const HoloCinematicDirector = ({ isOpen, onClose, iframeRef }) => {
  const [selectedLut, setSelectedLut] = useState(CINEMATIC_LUTS[0]);
  const [depthOfField, setDepthOfField] = useState(40);
  const [bloomIntensity, setBloomIntensity] = useState(65);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16' | '16:9'
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const canvasRef = useRef(null);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  // Render cinematic mockup canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.filter = selectedLut.filter;

    // Draw deep cosmic space scene
    const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 1.5);
    grad.addColorStop(0, '#1a103c');
    grad.addColorStop(0.5, '#0b081c');
    grad.addColorStop(1, '#020108');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Distant Stars
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 3 === 0 ? '#00f3ff' : '#ffffff';
      ctx.fillRect((i * 37) % w, (i * 53) % h, 2, 2);
    }

    // Ship Silhouette
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = bloomIntensity / 3;

    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(24, 25);
    ctx.lineTo(0, 18);
    ctx.lineTo(-24, 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Afterburner flare
    ctx.beginPath();
    ctx.arc(0, 26, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = bloomIntensity / 2;
    ctx.fill();
    ctx.restore();

    ctx.filter = 'none';

    // Watermark
    if (watermarkEnabled) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('SENTAIENT // INTERSTELLAR', w - 12, h - 14);
      ctx.fillText('SECTOR 4 • 4K ULTRA', w - 12, h - 26);
    }
  }, [isOpen, selectedLut, depthOfField, bloomIntensity, watermarkEnabled]);

  const toggleFreezeTime = async () => {
    await triggerHaptic(ImpactStyle.Medium);
    const nextState = !isTimeFrozen;
    setIsTimeFrozen(nextState);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'CINEMATIC_TIME_FREEZE',
        frozen: nextState
      }, '*');
    }
  };

  const captureViralShot = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    alert(`Captured ${aspectRatio} Cinematic Frame with ${selectedLut.name} LUT! Ready for 1-click sharing to TikTok, Reels, & X.`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-pink-500/40 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-pink-500/20 bg-pink-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📸</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-pink-300 font-mono">
                  HOLO-CINEMATIC DIRECTOR // VIRAL UGC PHOTO & VIDEO
                </h2>
                <p className="text-xs text-pink-400/70 font-mono">
                  Free-Cam Angles • Film LUT Color Grading • 1-Click 9:16 Social Export
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
            {/* Viewfinder Preview (6 Cols) */}
            <div className="md:col-span-6 p-5 border-r border-neutral-800 flex flex-col items-center justify-center bg-black/40">
              <div className="relative border border-pink-500/30 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={aspectRatio === '9:16' ? 240 : 340}
                  height={aspectRatio === '9:16' ? 360 : 220}
                  className="rounded-lg"
                />
                <div className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-pink-300 border border-pink-500/30">
                  {isTimeFrozen ? '⏸ TIME FREEZE ACTIVE' : '▶ 60 FPS CAM'}
                </div>
              </div>

              {/* Aspect Ratio & Freeze Controls */}
              <div className="flex gap-2 mt-4 w-full max-w-[340px]">
                <button
                  onClick={() => setAspectRatio(aspectRatio === '9:16' ? '16:9' : '9:16')}
                  className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono font-bold text-white rounded-xl"
                >
                  Aspect: {aspectRatio}
                </button>
                <button
                  onClick={toggleFreezeTime}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                    isTimeFrozen ? 'bg-pink-600 border-pink-400 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  {isTimeFrozen ? 'Resume Time' : 'Freeze Time'}
                </button>
              </div>
            </div>

            {/* Cinematic Tuning Controls (6 Cols) */}
            <div className="md:col-span-6 p-5 flex flex-col justify-between space-y-4">
              <div>
                {/* LUT Presets */}
                <div className="text-xs font-mono text-pink-300 font-bold uppercase tracking-wider mb-2">
                  Cinematic Color Grading (LUTs)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CINEMATIC_LUTS.map((lut) => (
                    <button
                      key={lut.id}
                      onClick={() => {
                        triggerHaptic();
                        setSelectedLut(lut);
                      }}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        selectedLut.id === lut.id
                          ? 'border-pink-400 bg-pink-950/40 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-xl">{lut.icon}</span>
                      <span className="text-xs font-bold text-white font-mono">{lut.name}</span>
                    </button>
                  ))}
                </div>

                {/* Optics Sliders */}
                <div className="space-y-3 pt-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                      <span>Depth of Field (Aperture Blur)</span>
                      <span className="text-pink-400">{depthOfField}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={depthOfField}
                      onChange={(e) => setDepthOfField(Number(e.target.value))}
                      className="w-full accent-pink-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                      <span>Anamorphic Bloom & Glow</span>
                      <span className="text-cyan-400">{bloomIntensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={bloomIntensity}
                      onChange={(e) => setBloomIntensity(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Watermark Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                    className="flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white"
                  >
                    <span className="text-pink-400 font-bold">{watermarkEnabled ? '☑' : '☐'}</span>
                    <span>Overlay Sentaient Interstellar 4K Brand Watermark</span>
                  </button>
                </div>
              </div>

              {/* 1-Click Export Button */}
              <button
                onClick={captureViralShot}
                className="w-full py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all font-mono tracking-widest flex items-center justify-center gap-2"
              >
                <span>🚀</span> EXPORT FOR TIKTOK, REELS & X (1-CLICK CAPTURE)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HoloCinematicDirector;
