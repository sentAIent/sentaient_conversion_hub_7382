import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const OUTPOST_MODULES = [
  { id: 'defense_turret', name: 'Automated Flak Battery', level: 2, bonus: 'Defends outpost from automated pirate raids' },
  { id: 'refinery_bay', name: 'Mineral & Alloy Refinery', level: 3, bonus: 'Generates +50 Titanium Alloy / hour' },
  { id: 'shield_matrix', name: 'Citadel Deflector Dome', level: 1, bonus: '+5,000 Outpost Structural Shielding' },
  { id: 'quantum_antenna', name: 'Quantum Sub-Space Relay', level: 2, bonus: 'Syncs trade routes with Sentaient AI Network' }
];

export const SALVAGE_ITEMS = [
  { id: 'titanium_scrap', name: 'Titanium Composite Plating', count: 180, rate: 5, unitCredits: 2 },
  { id: 'dark_matter_core', name: 'Stabilized Dark Matter Core', count: 12, rate: 1, unitCredits: 50 },
  { id: 'alien_logic_core', name: 'Precursor AI Logic Module', count: 4, rate: 1, unitCredits: 125 }
];

export const CitadelBlackMarket = ({ isOpen, onClose, onCreditsAwarded }) => {
  const [activeTab, setActiveTab] = useState('citadel'); // 'citadel' | 'market'
  const [salvage, setSalvage] = useState(SALVAGE_ITEMS);
  const [totalCreditsEarned, setTotalCreditsEarned] = useState(0);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {}
  };

  const convertSalvageToCredits = async (itemId) => {
    try {
      await Haptics.notification({ type: 'SUCCESS' });
    } catch (e) {}

    setSalvage(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item || item.count <= 0) return prev;

      const creditsEarned = item.unitCredits * item.rate;
      setTotalCreditsEarned(curr => curr + creditsEarned);

      if (onCreditsAwarded) {
        onCreditsAwarded(creditsEarned);
      }

      alert(`Transferred to Sentaient Hub: +${creditsEarned} Compute Credits!`);

      return prev.map(i => i.id === itemId ? { ...i, count: Math.max(0, i.count - i.rate) } : i);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-[#0b1016] border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-[0_0_50px_rgba(251,191,36,0.25)] relative font-mono overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-amber-500/20 mb-4">
            <div>
              <span className="text-[10px] tracking-widest text-amber-400 uppercase bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                Economic & Platform Hub
              </span>
              <h3 className="text-xl font-bold font-exo text-white mt-1">Citadel & Salvage Market</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50">✕</button>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => { setActiveTab('citadel'); triggerHaptic(); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'citadel'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                  : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              Orbital Citadel Builder
            </button>
            <button
              onClick={() => { setActiveTab('market'); triggerHaptic(); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'market'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                  : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              Salvage Black Market
            </button>
          </div>

          {activeTab === 'citadel' ? (
            <div>
              {/* Citadel Status */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-3 mb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-white">Outpost Aetheria (Orbit Level 3)</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Automated deep-space fleet bastion & refinery outpost.</p>
                </div>
                <span className="text-xs bg-amber-950/80 border border-amber-800 text-amber-300 px-2.5 py-1 rounded-lg font-bold">
                  99.4% Operational
                </span>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {OUTPOST_MODULES.map(mod => (
                  <div key={mod.id} className="p-3 bg-black/40 border border-white/10 rounded-xl">
                    <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                      <span>{mod.name}</span>
                      <span className="text-amber-400 text-[10px]">Tier {mod.level}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{mod.bonus}</p>
                    <button
                      onClick={triggerHaptic}
                      className="mt-2 w-full py-1 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/40 text-amber-200 text-[10px] font-bold rounded-lg transition-colors"
                    >
                      Upgrade Module
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Black Market Salvage Scrapping */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-3 mb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-white">Sentaient Compute Credit Exchange</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Convert harvested wreckage & dark matter into usable Sentaient AI Credits.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Total Converted:</span>
                  <span className="text-emerald-400 font-bold text-sm font-mono">+{totalCreditsEarned} Credits</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {salvage.map(item => (
                  <div key={item.id} className="p-3 bg-black/40 border border-white/10 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-white block">{item.name}</span>
                      <span className="text-[10px] text-gray-400">Inventory: <span className="text-amber-300 font-bold">{item.count} units</span></span>
                    </div>
                    <button
                      onClick={() => convertSalvageToCredits(item.id)}
                      disabled={item.count < item.rate}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-30"
                    >
                      Convert ({item.rate} units &rarr; +{item.unitCredits * item.rate} Credits)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CitadelBlackMarket;
