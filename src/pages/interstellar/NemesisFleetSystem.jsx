import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const NEMESIS_ADMIRALS = [
  {
    id: 'vaelen',
    name: 'Admiral Malakor Vaelen',
    title: 'Warmaster of the Obsidian Fleet',
    personality: 'Ruthless & Unforgiving',
    chassis: 'Goliath Super-Dreadnought',
    avatarColor: '#ff0055',
    encounters: 4,
    grudges: ['Port Engine Destroyed in Sector 4', 'Shield Core Pierced by Railgun'],
    adaptiveCounter: 'Equipped Phase-Reactive Thermal Plating (counters Pulse Lasers)',
    taunt: '“Your pathetic interceptors survived Sector 4 by pure luck. My dreadnought will grind your cockpit to cosmic dust.”'
  },
  {
    id: 'kaelen',
    name: 'Shadow-Captain Lyra Kael',
    title: 'Specter of the Outer Nebulae',
    personality: 'Cold & Calculating',
    chassis: 'Viper Phantom (Cloaked)',
    avatarColor: '#9d4edd',
    encounters: 2,
    grudges: ['Sensor Array Jammed in Asteroid Belt'],
    adaptiveCounter: 'Deploys Sensor-Scrambling Chaff Swarms (counters homing missiles)',
    taunt: '“I’ve mapped every flight vector in your helm. You will never hear the shot that ends you.”'
  },
  {
    id: 'xylar',
    name: 'Archon Xylar-9',
    title: 'Cybernetic Swarm Prime',
    personality: 'Synthetic Fanatic',
    chassis: 'Hive Carrier (Autonomous Drones)',
    avatarColor: '#00ff88',
    encounters: 1,
    grudges: ['Subroutine Core Disrupted'],
    adaptiveCounter: 'Deploys 24 Self-Replicating Kamikaze Drones',
    taunt: '“Organic pilots are obsolete. Your neural latency is 200ms; my hive reacts in 3 picoseconds.”'
  }
];

export const NemesisFleetSystem = ({ isOpen, onClose, onChallengeNemesis }) => {
  const [selectedAdmiral, setSelectedAdmiral] = useState(NEMESIS_ADMIRALS[0]);
  const [activeTaunt, setActiveTaunt] = useState(NEMESIS_ADMIRALS[0].taunt);
  const [isGeneratingTaunt, setIsGeneratingTaunt] = useState(false);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {}
  };

  const engageNemesis = async () => {
    try {
      await Haptics.notification({ type: 'WARNING' });
    } catch (e) {}

    if (onChallengeNemesis) {
      onChallengeNemesis(selectedAdmiral);
    }
    onClose();
  };

  const regenerateAITaunt = () => {
    setIsGeneratingTaunt(true);
    triggerHaptic();
    setTimeout(() => {
      const dynamicTaunts = [
        `“Did you honestly think your shields could withstand my broadside batteries? Target their bridge!”`,
        `“Every engagement only refines my combat algorithms against you. Surrender your vessel.”`,
        `“I smell fear in your comms frequency, pilot. Eject now or burn with your hull.”`
      ];
      setActiveTaunt(dynamicTaunts[Math.floor(Math.random() * dynamicTaunts.length)]);
      setIsGeneratingTaunt(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-[#0e0c14] border border-red-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-[0_0_50px_rgba(255,0,85,0.25)] relative font-mono overflow-hidden"
        >
          {/* Top Banner */}
          <div className="flex justify-between items-center pb-3 border-b border-red-500/20 mb-5">
            <div>
              <span className="text-[10px] tracking-widest text-red-400 uppercase bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded">
                Procedural Nemesis Engine
              </span>
              <h3 className="text-xl font-bold font-exo text-white mt-1">Hostile Fleet Admirals</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Admiral Selector Column */}
            <div className="space-y-2.5">
              <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Rival Commanders</span>
              {NEMESIS_ADMIRALS.map(admiral => (
                <button
                  key={admiral.id}
                  onClick={() => {
                    setSelectedAdmiral(admiral);
                    setActiveTaunt(admiral.taunt);
                    triggerHaptic();
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedAdmiral.id === admiral.id
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(255,0,85,0.3)]'
                      : 'bg-black/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: admiral.avatarColor }}></span>
                    <span className="text-xs font-bold text-white truncate">{admiral.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1">Encounters: {admiral.encounters}</span>
                </button>
              ))}
            </div>

            {/* Dossier & Intel Column */}
            <div className="md:col-span-2 bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base text-white">{selectedAdmiral.name}</h4>
                    <p className="text-xs text-red-400 font-bold">{selectedAdmiral.title}</p>
                  </div>
                  <span className="text-[10px] bg-red-950/80 border border-red-800 text-red-300 px-2 py-0.5 rounded">
                    {selectedAdmiral.personality}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Flagship Vessel:</span>
                    <span className="text-white font-bold">{selectedAdmiral.chassis}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Tactical Adaptation (Nemesis Counter):</span>
                    <span className="text-amber-300">{selectedAdmiral.adaptiveCounter}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Historical Grudges:</span>
                    <ul className="list-disc list-inside text-gray-300 text-[11px]">
                      {selectedAdmiral.grudges.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Live Radio Taunt */}
                <div className="mt-4 p-3 bg-red-950/20 border border-red-500/30 rounded-lg text-xs italic text-red-200 relative">
                  <div className="flex justify-between items-center mb-1 text-[10px] text-red-400 uppercase font-bold not-italic">
                    <span>Intercepted Sub-Space Audio</span>
                    <button
                      onClick={regenerateAITaunt}
                      className="hover:underline flex items-center gap-1"
                      disabled={isGeneratingTaunt}
                    >
                      {isGeneratingTaunt ? 'Tuning...' : 'Re-intercept'}
                    </button>
                  </div>
                  {activeTaunt}
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold rounded-xl text-neutral-300"
                >
                  Close Dossier
                </button>
                <button
                  onClick={engageNemesis}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all"
                >
                  Engage Rival Fleet
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NemesisFleetSystem;
