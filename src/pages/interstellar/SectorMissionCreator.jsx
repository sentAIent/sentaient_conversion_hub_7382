import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const SectorMissionCreator = ({ isOpen, onClose, iframeRef }) => {
  const [sectorName, setSectorName] = useState('Nebula Outpost Alpha');
  const [asteroidDensity, setAsteroidDensity] = useState(65);
  const [enemyPatrolCount, setEnemyPatrolCount] = useState(8);
  const [timeTrialGates, setTimeTrialGates] = useState(6);
  const [hazardModifier, setHazardModifier] = useState('ION_STORM');
  const [generatedSeed, setGeneratedSeed] = useState('#VOID-77');
  const [seedInput, setSeedInput] = useState('');

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const generateNewSeed = async () => {
    await triggerHaptic(ImpactStyle.Medium);
    const prefixes = ['VOID', 'NOVA', 'AETH', 'DARK', 'NEON', 'SOL'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(Math.random() * 90) + 10;
    const newSeed = `#${randomPrefix}-${randomNum}`;
    setGeneratedSeed(newSeed);
  };

  const copySeedToClipboard = async () => {
    await triggerHaptic(ImpactStyle.Light);
    try {
      await navigator.clipboard.writeText(generatedSeed);
    } catch (e) {}
    alert(`Sector Seed "${generatedSeed}" copied to clipboard! Share with friends in chat.`);
  };

  const launchSectorMission = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'LOAD_CUSTOM_SECTOR_MISSION',
        seed: generatedSeed,
        sectorName,
        config: {
          asteroidDensity,
          enemyPatrolCount,
          timeTrialGates,
          hazardModifier
        }
      }, '*');
    }
    alert(`Custom Sector "${sectorName}" (${generatedSeed}) generated! Warping into custom simulation.`);
  };

  const loadEnteredSeed = async (e) => {
    e.preventDefault();
    if (!seedInput.trim()) return;
    await triggerHaptic(ImpactStyle.Medium);
    setGeneratedSeed(seedInput.trim().toUpperCase());
    setSectorName(`Sector ${seedInput.trim().toUpperCase()}`);
    setSeedInput('');
    alert(`Loaded seed ${seedInput.trim().toUpperCase()}! Ready for launch.`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-teal-500/40 rounded-2xl shadow-[0_0_50px_rgba(20,184,166,0.25)] flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500/20 bg-teal-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛠️</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-teal-300 font-mono">
                  SECTOR CREATOR // COMMUNITY MISSION & SEED MAKER
                </h2>
                <p className="text-xs text-teal-400/70 font-mono">
                  Procedural Map Generator • Shareable 6-Digit Seeds • Custom Flight Trials
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
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Generated Seed Bar */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-emerald-950/20 to-black border border-teal-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                  Active Shareable Sector Seed
                </div>
                <div className="text-2xl font-black font-mono text-white mt-0.5">{generatedSeed}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={generateNewSeed}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono font-bold text-white rounded-lg"
                >
                  🎲 Re-Roll
                </button>
                <button
                  onClick={copySeedToClipboard}
                  className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-black text-xs font-mono font-bold rounded-lg shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                >
                  📋 Copy Seed
                </button>
              </div>
            </div>

            {/* Custom Configuration Parameters */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1">Sector Name</label>
                <input
                  type="text"
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                  className="w-full bg-black/60 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                    <span>Asteroid Density</span>
                    <span className="text-teal-400">{asteroidDensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={asteroidDensity}
                    onChange={(e) => setAsteroidDensity(Number(e.target.value))}
                    className="w-full accent-teal-400 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                    <span>Hostile Patrol Count</span>
                    <span className="text-red-400">{enemyPatrolCount} Vessels</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={enemyPatrolCount}
                    onChange={(e) => setEnemyPatrolCount(Number(e.target.value))}
                    className="w-full accent-red-400 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-300 block mb-1">Environmental Hazard</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'NONE', label: 'Clear Void', icon: '🌌' },
                    { id: 'ION_STORM', label: 'Ion Storm', icon: '⚡' },
                    { id: 'BLACK_HOLE', label: 'Black Hole', icon: '🌀' },
                    { id: 'SOLAR_WIND', label: 'Solar Wind', icon: '☀️' }
                  ].map((haz) => (
                    <button
                      key={haz.id}
                      onClick={() => setHazardModifier(haz.id)}
                      className={`p-2 rounded-xl border text-center text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                        hazardModifier === haz.id
                          ? 'border-teal-400 bg-teal-950/40 text-teal-300'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span>{haz.icon}</span>
                      <span>{haz.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Load Seed Input Bar */}
            <form onSubmit={loadEnteredSeed} className="flex gap-2 pt-2 border-t border-neutral-800">
              <input
                type="text"
                value={seedInput}
                onChange={(e) => setSeedInput(e.target.value)}
                placeholder="Enter community seed (e.g. #NOVA-42)..."
                className="flex-1 bg-black/60 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-teal-400"
              />
              <button
                type="submit"
                disabled={!seedInput.trim()}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white rounded-xl text-xs font-mono font-bold"
              >
                Load Seed
              </button>
            </form>

            {/* Launch Sector Mission Button */}
            <button
              onClick={launchSectorMission}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-black text-xs rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all font-mono tracking-widest flex items-center justify-center gap-2"
            >
              <span>🚀</span> WARP TO CUSTOM SECTOR SIMULATION
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SectorMissionCreator;
