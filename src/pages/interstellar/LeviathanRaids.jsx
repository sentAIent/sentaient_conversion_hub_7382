import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const LEVIATHANS = [
  {
    id: 'gorgon_harvester',
    name: 'Gorgon Planet-Harvester',
    type: 'Class-IV Colossus Dreadnought',
    maxHp: 2500000,
    currentHp: 1684200,
    activePilots: 38,
    status: 'PHASE 2: CORE EXPOSED',
    color: '#ff0055',
    weakpoints: [
      { id: 'flak_array', name: 'Flak Battery Array', hp: 0, maxHp: 500000, status: 'DESTROYED' },
      { id: 'thermal_vents', name: 'Thermal Radiator Vents', hp: 320000, maxHp: 1000000, status: 'VULNERABLE' },
      { id: 'antimatter_core', name: 'Antimatter Heart Core', hp: 1364200, maxHp: 1500000, status: 'SHIELDED' }
    ],
    rewards: '3,000 Compute Credits + Leviathan Skull Decal + Ancient Forge Core'
  },
  {
    id: 'chronos_forge',
    name: 'Chronos AI Dyson Construct',
    type: 'Synthetic Singularity Swarm',
    maxHp: 4000000,
    currentHp: 3850000,
    activePilots: 24,
    status: 'PHASE 1: PERIMETER SHIELDING',
    color: '#9d4edd',
    weakpoints: [
      { id: 'swarm_relay', name: 'Tachyon Node Relays', hp: 850000, maxHp: 1000000, status: 'ONLINE' },
      { id: 'singularity_lens', name: 'Gravity Lensing Rings', hp: 1500000, maxHp: 1500000, status: 'PROTECTED' },
      { id: 'chronos_cpu', name: 'Dyson Matrix CPU', hp: 1500000, maxHp: 1500000, status: 'INVULNERABLE' }
    ],
    rewards: '5,000 Compute Credits + Chronos Phase Drive + Prismatic Hull Finish'
  }
];

export const LeviathanRaids = ({ isOpen, onClose, iframeRef }) => {
  const [activeBoss, setActiveBoss] = useState(LEVIATHANS[0]);
  const [combatLog, setCombatLog] = useState([
    'Raid broadcast active. 38 allied pilots firing on Gorgon Harvester.',
    'Thermal Radiator Vents breached by Pilot Valkyrie_9!'
  ]);
  const [playerDamageContributed, setPlayerDamageContributed] = useState(48200);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const strikeWeakpoint = async (weakpointId) => {
    await triggerHaptic(ImpactStyle.Heavy);
    const damageDealt = Math.floor(Math.random() * 8000) + 12000;

    setPlayerDamageContributed((prev) => prev + damageDealt);

    setActiveBoss((prev) => ({
      ...prev,
      currentHp: Math.max(0, prev.currentHp - damageDealt)
    }));

    setCombatLog((prev) => [
      `You struck ${weakpointId} with heavy torpedoes for ${damageDealt.toLocaleString()} DPS!`,
      ...prev.slice(0, 4)
    ]);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'STRIKE_LEVIATHAN_WEAKPOINT',
        bossId: activeBoss.id,
        weakpointId,
        damage: damageDealt
      }, '*');
    }
  };

  if (!isOpen) return null;

  const hpPercent = Math.round((activeBoss.currentHp / activeBoss.maxHp) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-red-500/40 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-red-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-red-400 font-mono">
                  GALACTIC LEVIATHAN // COOPERATIVE WORLD BOSS RAID
                </h2>
                <p className="text-xs text-red-400/70 font-mono">
                  Multi-Pilot Assault • Component Weakpoints • Quadrant Salvage Milestones
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
            {/* World Boss Selector Header */}
            <div className="flex gap-2 border-b border-neutral-800 pb-3">
              {LEVIATHANS.map((boss) => (
                <button
                  key={boss.id}
                  onClick={() => {
                    triggerHaptic();
                    setActiveBoss(boss);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeBoss.id === boss.id
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {boss.name}
                </button>
              ))}
            </div>

            {/* Boss Global Health Bar */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-red-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="text-base font-black text-white font-mono">{activeBoss.name}</div>
                  <div className="text-xs text-neutral-400 font-mono">{activeBoss.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">
                    {activeBoss.status}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-emerald-400 border border-neutral-800">
                    👥 {activeBoss.activePilots} Pilots Attacking
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                  <span>Colossus Structural Hull</span>
                  <span className="text-red-400 font-bold">
                    {activeBoss.currentHp.toLocaleString()} / {activeBoss.maxHp.toLocaleString()} HP ({hpPercent}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-950 rounded-full h-3.5 overflow-hidden border border-neutral-800">
                  <div
                    className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 h-full transition-all duration-300"
                    style={{ width: `${hpPercent}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] font-mono text-amber-300/80">
                🎁 Defeat Bounty Pool: {activeBoss.rewards}
              </div>
            </div>

            {/* Targetable Component Weakpoints */}
            <div>
              <div className="text-xs font-mono text-red-300 font-bold uppercase tracking-wider mb-2">
                Leviathan Surface Weakpoints (Concentrate Fire)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeBoss.weakpoints.map((wp) => (
                  <div
                    key={wp.id}
                    className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-white font-mono">{wp.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            wp.status === 'DESTROYED'
                              ? 'bg-neutral-800 text-neutral-500'
                              : wp.status === 'VULNERABLE'
                              ? 'bg-red-500/20 text-red-400 animate-pulse'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          {wp.status}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        Integrity: {wp.hp.toLocaleString()} / {wp.maxHp.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => strikeWeakpoint(wp.id)}
                      disabled={wp.status === 'DESTROYED' || wp.status === 'INVULNERABLE'}
                      className="mt-3 w-full py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs rounded-lg font-mono shadow-[0_0_12px_rgba(239,68,68,0.3)] disabled:opacity-30"
                    >
                      Fire Torpedo Salvo
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Raid Feed & Player Contribution */}
            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 font-mono text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-neutral-400">Your Damage Contributed:</span>
                <span className="text-amber-400 font-bold ml-2">
                  {playerDamageContributed.toLocaleString()} DMG (Top 12% Contributor)
                </span>
              </div>
              <div className="text-[11px] text-neutral-500">Live Global Server Sync: Active</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeviathanRaids;
