import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const BOUNTY_TARGETS = [
  {
    id: 'kallum',
    name: 'Kallum the Black',
    alias: 'Scourge of the Titan Asteroid Belt',
    vessel: 'Heavily Armored Marauder Gunship',
    threatLevel: 'High',
    lastCoordinates: 'Sector 4 // Asteroid Cluster Gamma',
    crime: 'Hijacking Sentaient Helium-3 Convoys & Smuggling Plasma Munitions',
    reward: 1800,
    avatar: '🏴‍☠️',
    status: 'ACTIVE BOUNTY'
  },
  {
    id: 'siren_x',
    name: 'Siren-X (Rogue AI Drone)',
    alias: 'The Ghost of Orion',
    vessel: 'Phase-Cloaked Automated Interceptor',
    threatLevel: 'Extreme',
    lastCoordinates: 'Sector 9 // Orion Nebula Fringe',
    crime: 'Assassinating Diplomatic Envoys & Sensor Scrambling',
    reward: 2400,
    avatar: '🤖',
    status: 'ACTIVE BOUNTY'
  },
  {
    id: 'lord_vane',
    name: 'Lord Hector Vane',
    alias: 'Warlord of the Void Collective',
    vessel: 'Dreadnought Battlecruiser "Obsidian Pride"',
    threatLevel: 'Critical',
    lastCoordinates: 'Void Reach 12 // Event Horizon Edge',
    crime: 'Galactic Piracy, Black Market Core Trading & Planetary Blockades',
    reward: 3500,
    avatar: '👑',
    status: 'ACTIVE BOUNTY'
  }
];

export const BountyHunterTerminal = ({ isOpen, onClose, iframeRef, onBountyClaimed }) => {
  const [bounties, setBounties] = useState(BOUNTY_TARGETS);
  const [selectedBounty, setSelectedBounty] = useState(BOUNTY_TARGETS[0]);
  const [hunterRank, setHunterRank] = useState('Apex Void Hunter (Tier 4)');
  const [trackingActive, setTrackingActive] = useState(false);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const trackTarget = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    setTrackingActive(true);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'HUNT_BOUNTY_TARGET',
        target: selectedBounty
      }, '*');
    }

    alert(`Nav-Computer Locked onto ${selectedBounty.name}! Tachyon sensor ping sent to HUD.`);
  };

  const claimBounty = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    const rewardCredits = selectedBounty.reward;

    if (onBountyClaimed) {
      onBountyClaimed(rewardCredits);
    }

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'CLAIM_BOUNTY_REWARD',
        targetId: selectedBounty.id,
        reward: rewardCredits
      }, '*');
    }

    alert(`Bounty Claimed! +${rewardCredits} Compute Credits credited to your Sentaient Wallet.`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-orange-500/40 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-orange-500/20 bg-orange-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-orange-400 font-mono">
                  BOUNTY HUNTER GUILD // ROGUE PILOT CONTRACTS
                </h2>
                <p className="text-xs text-orange-400/70 font-mono">
                  Pirate Warlords • Rogue AI Interceptors • Lucrative Credit Payouts
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
            {/* Hunter Guild License Bar */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎖️</span>
                <div>
                  <span className="text-neutral-400">Hunter License:</span>
                  <span className="text-white font-bold ml-2">{hunterRank}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30 font-bold">
                AUTHORIZED FOR DEAD-OR-ALIVE CAPTURE
              </span>
            </div>

            {/* Target Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {bounties.map((target) => (
                <button
                  key={target.id}
                  onClick={() => {
                    triggerHaptic();
                    setSelectedBounty(target);
                  }}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedBounty.id === target.id
                      ? 'border-orange-500 bg-orange-950/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                      : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-2xl">{target.avatar}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                          target.threatLevel === 'Critical'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}
                      >
                        {target.threatLevel}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">{target.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{target.alias}</div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-neutral-800 flex justify-between items-center font-mono">
                    <span className="text-[10px] text-neutral-400">Bounty Payout:</span>
                    <span className="text-xs font-bold text-emerald-400">+{target.reward} Credits</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Target Dossier Detail */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-white">TARGET DOSSIER: {selectedBounty.name}</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Hostile Vessel: {selectedBounty.vessel}</div>
                  <div className="text-orange-400 text-[11px] mt-0.5">Last Sensor Ping: {selectedBounty.lastCoordinates}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400">GUARANTEED REWARD</span>
                  <div className="text-lg font-black text-emerald-400">+{selectedBounty.reward} Credits</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-neutral-800 text-neutral-300">
                <span className="text-orange-400 font-semibold block mb-1">Crimson Registry Charges:</span>
                {selectedBounty.crime}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={trackTarget}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>🛰️</span> LOCK NAV-TELEMETRY & COMMENCE HUNT
                </button>
                <button
                  onClick={claimBounty}
                  className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all"
                >
                  Simulate Subjugation & Claim
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BountyHunterTerminal;
