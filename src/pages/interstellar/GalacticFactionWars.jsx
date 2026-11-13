import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const FACTIONS = [
  { id: 'vanguard', name: 'Aether Vanguard', color: '#00f3ff', control: 42, moto: 'Order & Cosmic Stability' },
  { id: 'syndicate', name: 'Sol Syndicate', color: '#ffaa00', control: 35, moto: 'Profit & Free Enterprise' },
  { id: 'collective', name: 'Void Collective', color: '#b5179e', control: 23, moto: 'Evolutionary Synthetic Singularity' }
];

export const SECTORS = [
  { id: 'alpha', name: 'Orion Nebula (Sector Alpha)', controllingFaction: 'Aether Vanguard', contested: true, bonus: '+15% Plasma DPS' },
  { id: 'beta', name: 'Centauri Breach (Sector Beta)', controllingFaction: 'Sol Syndicate', contested: false, bonus: '+25% Salvage Harvest' },
  { id: 'gamma', name: 'Cygnus Void (Sector Gamma)', controllingFaction: 'Void Collective', contested: true, bonus: '+20% Shield Regen' },
  { id: 'delta', name: 'Kepler Expanse (Sector Delta)', controllingFaction: 'Aether Vanguard', contested: false, bonus: '+10% Afterburner Speed' }
];

export const TIME_TRIALS = [
  { rank: 1, pilot: 'Nova_Prime', time: '00:42.18', ship: 'Interceptor X' },
  { rank: 2, pilot: 'Valkyrie_9', time: '00:44.82', ship: 'Viper Shadow' },
  { rank: 3, pilot: 'CosmicDrifter', time: '00:46.05', ship: 'Interceptor X' },
  { rank: 'YOU', pilot: 'Commander', time: '00:48.90', ship: 'Custom Loadout' }
];

export const GalacticFactionWars = ({ isOpen, onClose, iframeRef }) => {
  const [activeTab, setActiveTab] = useState('factions'); // 'factions' | 'timetrials'
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {}
  };

  const launchTimeTrial = async () => {
    try {
      await Haptics.notification({ type: 'SUCCESS' });
    } catch (e) {}

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'START_HYPERSPACE_TRIAL',
        course: 'Canyon_Obstacle_Run_01'
      }, '*');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-[#0a0e17] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-[0_0_50px_rgba(0,243,255,0.25)] relative font-mono overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-cyan-500/20 mb-4">
            <div>
              <span className="text-[10px] tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                Competitive Operations
              </span>
              <h3 className="text-xl font-bold font-exo text-white mt-1">Galactic War & Time Trials</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50">✕</button>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => { setActiveTab('factions'); triggerHaptic(); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'factions'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              Faction Territory Map
            </button>
            <button
              onClick={() => { setActiveTab('timetrials'); triggerHaptic(); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'timetrials'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              Hyperspace Time Trials
            </button>
          </div>

          {activeTab === 'factions' ? (
            <div>
              {/* Overall Control Balance */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-3 mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Galactic Power Balance</span>
                <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden flex">
                  {FACTIONS.map(f => (
                    <div
                      key={f.id}
                      style={{ width: `${f.control}%`, backgroundColor: f.color }}
                      title={`${f.name}: ${f.control}%`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[10px] mt-2 text-gray-300">
                  {FACTIONS.map(f => (
                    <span key={f.id} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }}></span>
                      {f.name} ({f.control}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Contested Sectors */}
              <div className="space-y-2 mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Contested Sectors</span>
                <div className="grid grid-cols-2 gap-2">
                  {SECTORS.map(sec => (
                    <div
                      key={sec.id}
                      onClick={() => { setSelectedSector(sec); triggerHaptic(); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedSector.id === sec.id
                          ? 'bg-cyan-950/30 border-cyan-400'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                        <span className="truncate">{sec.name}</span>
                        {sec.contested && (
                          <span className="text-[9px] bg-red-950 text-red-400 border border-red-800 px-1 rounded">HOT</span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400">Control: <span className="text-cyan-300">{sec.controllingFaction}</span></div>
                      <div className="text-[10px] text-emerald-400 mt-1">Sector Perk: {sec.bonus}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Hyperspace Time Trials */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">Canyon Obstacle Run (Sector Zeta)</h4>
                    <p className="text-[11px] text-gray-400">High-speed slalom through hollowed asteroid debris rings.</p>
                  </div>
                  <button
                    onClick={launchTimeTrial}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                  >
                    Launch Sprint
                  </button>
                </div>

                <div className="space-y-2">
                  {TIME_TRIALS.map((record, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center p-2 rounded-lg text-xs ${
                        record.rank === 'YOU' ? 'bg-cyan-950/50 border border-cyan-500/40 text-cyan-200' : 'bg-black/40 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-bold text-gray-500">{record.rank}</span>
                        <span className="font-bold text-white">{record.pilot}</span>
                        <span className="text-[10px] text-gray-400">({record.ship})</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold">{record.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GalacticFactionWars;
