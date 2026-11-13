import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const TRAIL_PRESETS = [
  { id: 'cyan_stream', name: 'Cyber Neon Cyan', color: '#00f3ff', glow: 'rgba(0, 243, 255, 0.8)', speed: 'Hyper-Fast' },
  { id: 'violet_void', name: 'Hyper Violet Pulse', color: '#9d4edd', glow: 'rgba(157, 78, 221, 0.8)', speed: 'Oscillating' },
  { id: 'solar_gold', name: 'Solar Flare Gold', color: '#ffb703', glow: 'rgba(255, 183, 3, 0.8)', speed: 'High Intensity' },
  { id: 'matrix_green', name: 'Matrix Logic Stream', color: '#00ff9d', glow: 'rgba(0, 255, 157, 0.8)', speed: 'Quantized' },
  { id: 'crimson_fury', name: 'Supernova Crimson', color: '#ff0055', glow: 'rgba(255, 0, 85, 0.8)', speed: 'Overcharged' },
  { id: 'dark_matter', name: 'Dark Matter Obsidian', color: '#3a0ca3', glow: 'rgba(58, 12, 163, 0.8)', speed: 'Gravity Well' },
  { id: 'prismatic', name: 'Prismatic Singularity', color: '#f72585', glow: 'linear-gradient(90deg, #ff007f, #00f3ff, #ffea00)', speed: 'Rainbow Drift' }
];

export const SHIELD_PATTERNS = [
  { id: 'hex_hardlight', name: 'Hexagonal Hardlight', style: 'Honeycomb barrier with geometric cell flare on hit', icon: '⬡' },
  { id: 'iridescent_ripple', name: 'Iridescent Energy Ripple', style: 'Fluid chromatic liquid wave expanding across hull', icon: '◎' },
  { id: 'cyber_wireframe', name: 'Cybernetic Wireframe Grid', style: 'High-tech retro vector neon wireframe shield', icon: '▦' },
  { id: 'quantum_distortion', name: 'Quantum Phase Shimmer', style: 'Glitch displacement hologram masking real coordinates', icon: '◈' },
  { id: 'aegis_bubble', name: 'Aegis Plasma Sphere', style: 'Thick spherical plasma distortion bubble with particle corona', icon: '◯' }
];

export const HULL_FINISHES = [
  { id: 'obsidian_matte', name: 'Stealth Obsidian Matte', color: '#12141a', accent: '#3b82f6', roughness: 'Zero Specular', desc: 'Radar-absorbent carbon ferrite' },
  { id: 'damascus_steel', name: 'Damascus Cosmic Steel', color: '#2a2f3a', accent: '#00f3ff', roughness: 'Folded Pattern', desc: 'Ancient meteorite forged titanium' },
  { id: 'carbon_hex', name: 'Carbon Fiber Hex-Weave', color: '#1e222d', accent: '#10b981', roughness: 'Micro-Weave', desc: 'Ultra-light high-tensile graphene' },
  { id: 'liquid_chrome', name: 'Liquid Mirror Chrome', color: '#e2e8f0', accent: '#93c5fd', roughness: 'Ultra Specular', desc: '100% laser reflection coating' },
  { id: 'pearl_prismatic', name: 'Holographic Pearl', color: '#fdf4ff', accent: '#ec4899', roughness: 'Iridescent Sheen', desc: 'Refracts starlight into pastel spectrum' }
];

export const WARHORN_EFFECTS = [
  { id: 'triton_bass', name: 'Triton Sub-Bass Blast', freq: 65, type: 'sawtooth', desc: 'Deep cosmic dread reverberation' },
  { id: 'cyber_siren', name: 'Cybernetic War Siren', freq: 440, type: 'triangle', desc: 'High-frequency fleet alert horn' },
  { id: 'singularity_hum', name: 'Singularity Void Whisper', freq: 95, type: 'sine', desc: 'Sub-harmonic gravity distortion echo' },
  { id: 'imperial_fanfare', name: 'Vanguard Battle Fanfare', freq: 330, type: 'square', desc: 'Resonant harmonic battle declaration' }
];

export const DECALS = [
  { id: 'skull_cross', name: 'Valkyrie Skull', symbol: '☠' },
  { id: 'wings_aether', name: 'Aether Wings', symbol: '🪶' },
  { id: 'star_nova', name: 'Nova Starburst', symbol: '✦' },
  { id: 'quantum_eye', name: 'Quantum Sentinel', symbol: '👁' },
  { id: 'dragon_sigil', name: 'Cyber Drake', symbol: '🐉' }
];

export const ShipAestheticsForge = ({ isOpen, onClose, iframeRef }) => {
  const [activeTab, setActiveTab] = useState('trails'); // 'trails' | 'shields' | 'hulls' | 'horns' | 'decals'
  
  // Customization State
  const [selectedTrail, setSelectedTrail] = useState(TRAIL_PRESETS[0]);
  const [trailLength, setTrailLength] = useState(70);
  const [particleDensity, setParticleDensity] = useState(85);
  
  const [selectedShield, setSelectedShield] = useState(SHIELD_PATTERNS[0]);
  const [shieldColor, setShieldColor] = useState('#00f3ff');
  const [shieldOpacity, setShieldOpacity] = useState(75);

  const [selectedHull, setSelectedHull] = useState(HULL_FINISHES[0]);
  const [battleScars, setBattleScars] = useState(15); // 0 (Mint) to 100 (Heavily Scarred)

  const [selectedWarhorn, setSelectedWarhorn] = useState(WARHORN_EFFECTS[0]);
  const [selectedDecal, setSelectedDecal] = useState(DECALS[0]);
  
  const [isTestFiring, setIsTestFiring] = useState(false);
  const [isHornPlaying, setIsHornPlaying] = useState(false);
  const canvasRef = useRef(null);

  // Audio Context Ref for synthesizers
  const audioCtxRef = useRef(null);

  // Load Saved Aesthetics
  useEffect(() => {
    try {
      const saved = localStorage.getItem('interstellar_aesthetics');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.trail) setSelectedTrail(TRAIL_PRESETS.find(t => t.id === parsed.trail.id) || TRAIL_PRESETS[0]);
        if (parsed.trailLength) setTrailLength(parsed.trailLength);
        if (parsed.particleDensity) setParticleDensity(parsed.particleDensity);
        if (parsed.shield) setSelectedShield(SHIELD_PATTERNS.find(s => s.id === parsed.shield.id) || SHIELD_PATTERNS[0]);
        if (parsed.shieldColor) setShieldColor(parsed.shieldColor);
        if (parsed.hull) setSelectedHull(HULL_FINISHES.find(h => h.id === parsed.hull.id) || HULL_FINISHES[0]);
        if (parsed.battleScars !== undefined) setBattleScars(parsed.battleScars);
        if (parsed.warhorn) setSelectedWarhorn(WARHORN_EFFECTS.find(w => w.id === parsed.warhorn.id) || WARHORN_EFFECTS[0]);
        if (parsed.decal) setSelectedDecal(DECALS.find(d => d.id === parsed.decal.id) || DECALS[0]);
      }
    } catch (e) {}
  }, []);

  // Live Canvas Particle Preview
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let particles = [];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Draw Ship Silhouette
      ctx.save();
      ctx.translate(cx, cy);

      // Ship Hull
      ctx.fillStyle = selectedHull.color;
      ctx.strokeStyle = selectedHull.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(28, 30);
      ctx.lineTo(12, 22);
      ctx.lineTo(0, 32);
      ctx.lineTo(-12, 22);
      ctx.lineTo(-28, 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Battle Scars overlay
      if (battleScars > 10) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(8, 12);
        ctx.moveTo(-15, 15);
        ctx.lineTo(-5, 18);
        ctx.stroke();
      }

      // Decal
      ctx.font = '14px sans-serif';
      ctx.fillStyle = selectedHull.accent;
      ctx.textAlign = 'center';
      ctx.fillText(selectedDecal.symbol, 0, 8);

      // Shield Shimmer Aura
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.strokeStyle = shieldColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = shieldColor;
      ctx.shadowBlur = isTestFiring ? 25 : 10;
      ctx.globalAlpha = shieldOpacity / 100;
      ctx.stroke();

      if (selectedShield.id === 'hex_hardlight') {
        // Draw Hexagonal overlay points
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();

      // Spawn Exhaust Particles
      const particleCount = isTestFiring ? 6 : Math.round(particleDensity / 30);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 14,
          y: cy + 32,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (isTestFiring ? 8 : 4) + Math.random() * 3,
          radius: 2 + Math.random() * (isTestFiring ? 4 : 2),
          life: 1,
          decay: 0.02 + (100 - trailLength) * 0.0006
        });
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = selectedTrail.color;
        ctx.shadowColor = selectedTrail.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, selectedTrail, trailLength, particleDensity, selectedShield, shieldColor, shieldOpacity, selectedHull, battleScars, selectedDecal, isTestFiring]);

  // Test Fire Thrusters with Audio & Haptics
  const testFireThrusters = async () => {
    setIsTestFiring(true);
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {}

    // Web Audio Synthesizer for Jet Afterburner Whoosh
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.4);
      filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (err) {}

    setTimeout(() => {
      setIsTestFiring(false);
    }, 1200);
  };

  // Sound Warhorn Blast
  const playWarhorn = async () => {
    setIsHornPlaying(true);
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {}

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = selectedWarhorn.type;
      osc.frequency.setValueAtTime(selectedWarhorn.freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(selectedWarhorn.freq * 1.5, ctx.currentTime + 0.6);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(selectedWarhorn.freq / 2, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      subOsc.start();
      osc.stop(ctx.currentTime + 1.5);
      subOsc.stop(ctx.currentTime + 1.5);
    } catch (err) {}

    setTimeout(() => {
      setIsHornPlaying(false);
    }, 1500);
  };

  // Save and Broadcast to Engine
  const applyAesthetics = async () => {
    try {
      await Haptics.notification({ type: 'SUCCESS' });
    } catch (e) {}

    const payload = {
      trail: selectedTrail,
      trailLength,
      particleDensity,
      shield: selectedShield,
      shieldColor,
      shieldOpacity,
      hull: selectedHull,
      battleScars,
      warhorn: selectedWarhorn,
      decal: selectedDecal
    };

    localStorage.setItem('interstellar_aesthetics', JSON.stringify(payload));

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'APPLY_SHIP_AESTHETICS',
        aesthetics: payload
      }, '*');
    }

    alert('Ship Vanity & Aesthetics Calibrated! Hull synced with Aether Starmap.');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950/95 border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-purple-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-purple-300 font-mono">
                  COSMIC FORGE // SHIP AESTHETICS & VANITY
                </h2>
                <p className="text-xs text-purple-400/70 font-mono">
                  Plasma Exhaust Trails • Shield Shimmers • Hull Metallurgy • Sub-Space Warhorns
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

          {/* Main Grid: Left Stage (Preview) | Right Tabs (Customizer) */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
            {/* Visual Live Stage Preview (5 Cols) */}
            <div className="md:col-span-5 p-5 bg-gradient-to-b from-neutral-950 via-purple-950/10 to-neutral-950 border-r border-neutral-800/80 flex flex-col items-center justify-center">
              <div className="text-[11px] font-mono tracking-widest text-purple-400 mb-2 font-bold uppercase">
                Vessel Hologram Simulation
              </div>

              {/* Canvas Preview Box */}
              <div className="relative w-full max-w-[280px] h-[260px] bg-black/80 border border-purple-500/30 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                <canvas ref={canvasRef} width={280} height={260} className="w-full h-full" />
                <div className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 border border-purple-500/30 text-purple-300">
                  {selectedTrail.name}
                </div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 border border-purple-500/30 text-emerald-400">
                  SHIELD: {shieldOpacity}%
                </div>
              </div>

              {/* Real-time Interaction Action Bar */}
              <div className="w-full max-w-[280px] mt-4 flex gap-2">
                <button
                  onClick={testFireThrusters}
                  disabled={isTestFiring}
                  className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>🔥</span>
                  {isTestFiring ? 'Firing Afterburner...' : 'Test Afterburner'}
                </button>
                <button
                  onClick={playWarhorn}
                  disabled={isHornPlaying}
                  className="px-3 py-2 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                  title="Test Fire Warhorn Audio"
                >
                  <span>📯</span>
                  {isHornPlaying ? 'Blasting...' : 'Warhorn'}
                </button>
              </div>

              {/* Status Spec Footnote */}
              <div className="w-full max-w-[280px] mt-3 p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800 text-[10px] font-mono text-neutral-400 space-y-1">
                <div className="flex justify-between">
                  <span>Hull Material:</span>
                  <span className="text-white font-semibold">{selectedHull.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Battle Wear:</span>
                  <span className="text-amber-400">{battleScars}% Scarring</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Warhorn:</span>
                  <span className="text-purple-300">{selectedWarhorn.name}</span>
                </div>
              </div>
            </div>

            {/* Customization Controls (7 Cols) */}
            <div className="md:col-span-7 p-5 flex flex-col justify-between">
              <div>
                {/* Category Navigation Tabs */}
                <div className="flex border-b border-neutral-800 pb-3 gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'trails', label: 'Plasma Trails', icon: '☄️' },
                    { id: 'shields', label: 'Shield Shimmer', icon: '🛡️' },
                    { id: 'hulls', label: 'Hull Materials', icon: '🛸' },
                    { id: 'horns', label: 'Warhorns', icon: '📯' },
                    { id: 'decals', label: 'Decals & Crests', icon: '⚜️' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                          : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Plasma Trails */}
                {activeTab === 'trails' && (
                  <div className="mt-4 space-y-4">
                    <div className="text-xs font-mono text-purple-300 font-semibold">Exhaust Color & Plasma Palette</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TRAIL_PRESETS.map(trail => (
                        <button
                          key={trail.id}
                          onClick={() => setSelectedTrail(trail)}
                          className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                            selectedTrail.id === trail.id
                              ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                              : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ background: trail.color }} />
                            <span className="text-[11px] font-bold text-white truncate">{trail.name}</span>
                          </div>
                          <span className="text-[9px] text-neutral-400 font-mono">{trail.speed}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                          <span>Slipstream Tail Length</span>
                          <span className="text-purple-400">{trailLength}%</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={trailLength}
                          onChange={(e) => setTrailLength(Number(e.target.value))}
                          className="w-full accent-purple-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                          <span>Particle Density & Burn Heat</span>
                          <span className="text-cyan-400">{particleDensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={particleDensity}
                          onChange={(e) => setParticleDensity(Number(e.target.value))}
                          className="w-full accent-cyan-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Shield Shimmers */}
                {activeTab === 'shields' && (
                  <div className="mt-4 space-y-4">
                    <div className="text-xs font-mono text-cyan-300 font-semibold">Energy Barrier Pattern</div>
                    <div className="space-y-2">
                      {SHIELD_PATTERNS.map(pattern => (
                        <button
                          key={pattern.id}
                          onClick={() => setSelectedShield(pattern)}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                            selectedShield.id === pattern.id
                              ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                              : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl text-cyan-400">{pattern.icon}</span>
                            <div>
                              <div className="text-xs font-bold text-white">{pattern.name}</div>
                              <div className="text-[10px] text-neutral-400">{pattern.style}</div>
                            </div>
                          </div>
                          {selectedShield.id === pattern.id && (
                            <span className="text-cyan-400 text-xs font-mono font-bold">ACTIVE</span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <div className="text-xs font-mono text-neutral-300 mb-1">Corona Aura Tint</div>
                        <div className="flex gap-2">
                          {['#00f3ff', '#9d4edd', '#10b981', '#ff0055', '#ffb703'].map(c => (
                            <button
                              key={c}
                              onClick={() => setShieldColor(c)}
                              className={`w-7 h-7 rounded-lg border-2 transition-transform ${shieldColor === c ? 'scale-110 border-white' : 'border-transparent'}`}
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                          <span>Shield Shimmer Opacity</span>
                          <span className="text-cyan-400">{shieldOpacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={shieldOpacity}
                          onChange={(e) => setShieldOpacity(Number(e.target.value))}
                          className="w-full accent-cyan-400 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Hull Finishes */}
                {activeTab === 'hulls' && (
                  <div className="mt-4 space-y-4">
                    <div className="text-xs font-mono text-emerald-300 font-semibold">Exotic Metallurgy & Coatings</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HULL_FINISHES.map(hull => (
                        <button
                          key={hull.id}
                          onClick={() => setSelectedHull(hull)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedHull.id === hull.id
                              ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                              : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{hull.name}</span>
                            <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ background: hull.color }} />
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-1">{hull.desc}</p>
                          <div className="text-[9px] font-mono text-emerald-400 mt-1 font-semibold">{hull.roughness}</div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                        <span>Battle Damage & Hull Weathering</span>
                        <span className="text-amber-400">{battleScars}% ({battleScars < 20 ? 'Factory Mint' : battleScars < 60 ? 'Combat Tested' : 'Heavily Scarred'})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={battleScars}
                        onChange={(e) => setBattleScars(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 4: Sub-Space Warhorns */}
                {activeTab === 'horns' && (
                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-mono text-purple-300 font-semibold">Sub-Space Horn & Warp-Out Audio FX</div>
                    <div className="space-y-2">
                      {WARHORN_EFFECTS.map(horn => (
                        <div
                          key={horn.id}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                            selectedWarhorn.id === horn.id
                              ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                              : 'border-neutral-800 bg-neutral-900/40'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{horn.name}</div>
                            <div className="text-[10px] text-neutral-400">{horn.desc}</div>
                            <div className="text-[9px] font-mono text-purple-400 mt-0.5">Harmonic Base: {horn.freq} Hz ({horn.type})</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedWarhorn(horn);
                                playWarhorn();
                              }}
                              className="px-2.5 py-1 bg-purple-800/80 hover:bg-purple-700 text-purple-100 rounded text-xs font-bold font-mono"
                            >
                              🔊 Preview
                            </button>
                            <button
                              onClick={() => setSelectedWarhorn(horn)}
                              className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                                selectedWarhorn.id === horn.id ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-300'
                              }`}
                            >
                              {selectedWarhorn.id === horn.id ? 'Equipped' : 'Select'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 5: Decals & Crests */}
                {activeTab === 'decals' && (
                  <div className="mt-4 space-y-4">
                    <div className="text-xs font-mono text-amber-300 font-semibold">Pilot Insignia & Fleet Crests</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {DECALS.map(decal => (
                        <button
                          key={decal.id}
                          onClick={() => setSelectedDecal(decal)}
                          className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                            selectedDecal.id === decal.id
                              ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                              : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                          }`}
                        >
                          <span className="text-3xl text-amber-400">{decal.symbol}</span>
                          <span className="text-xs font-bold text-white">{decal.name}</span>
                          {selectedDecal.id === decal.id && (
                            <span className="text-[9px] font-mono font-bold text-amber-400">APPLIED</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold rounded-xl text-neutral-300"
                >
                  Exit Forge
                </button>
                <button
                  onClick={applyAesthetics}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all font-mono"
                >
                  Equip Custom Aesthetics to Vessel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShipAestheticsForge;
