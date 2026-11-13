import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const RIFT_AUGMENTS = [
  { id: 'chain_lightning', name: 'Chain-Lightning Coils', icon: '⚡', desc: 'Beam weapons arc to 3 adjacent enemy craft dealing 65% splash damage', rarity: 'Rare' },
  { id: 'vampiric_leech', name: 'Vampiric Shield Leech', icon: '🩸', desc: '25% of kinetic and plasma damage dealt converts into personal shield replenishment', rarity: 'Epic' },
  { id: 'singularity_dash', name: 'Tachyon Singularity Dash', icon: '🌀', desc: 'Evasive maneuvers leave behind a micro-gravity well that snares hostiles for 4s', rarity: 'Legendary' },
  { id: 'cluster_cascade', name: 'Cluster Torpedo Cascade', icon: '🚀', desc: 'Every heavy missile ruptures into 4 sub-munitions upon impact', rarity: 'Rare' },
  { id: 'temporal_dilation', name: 'Temporal Rift Slipstream', icon: '⏳', desc: 'Taking damage triggers a 2-second local time slowdown for swift evasion', rarity: 'Epic' }
];

export const HyperSpaceRifts = ({ isOpen, onClose, iframeRef, onLootExtracted }) => {
  const [currentSector, setCurrentSector] = useState(1);
  const [accumulatedShards, setAccumulatedShards] = useState(450);
  const [multiplier, setMultiplier] = useState(1.0);
  const [activeAugments, setActiveAugments] = useState([RIFT_AUGMENTS[0]]);
  const [draftChoices, setDraftChoices] = useState([RIFT_AUGMENTS[1], RIFT_AUGMENTS[2], RIFT_AUGMENTS[3]]);
  const [isDrafting, setIsDrafting] = useState(false);
  const [runFinished, setRunFinished] = useState(false);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const advanceDeeper = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    const nextSector = currentSector + 1;
    const nextMult = Number((multiplier + 0.75).toFixed(2));
    const nextShards = accumulatedShards + Math.floor(350 * nextMult);

    setCurrentSector(nextSector);
    setMultiplier(nextMult);
    setAccumulatedShards(nextShards);
    setIsDrafting(true);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'ADVANCE_RIFT_SECTOR',
        sector: nextSector,
        multiplier: nextMult
      }, '*');
    }
  };

  const selectAugment = async (aug) => {
    await triggerHaptic(ImpactStyle.Medium);
    setActiveAugments(prev => [...prev, aug]);
    setIsDrafting(false);
  };

  const extractSafely = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    setRunFinished(true);

    if (onLootExtracted) {
      onLootExtracted(accumulatedShards);
    }

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'EXTRACT_RIFT_LOOT',
        shards: accumulatedShards,
        multiplier
      }, '*');
    }

    alert(`Rift Extraction Successful! Banked ${accumulatedShards} Rift Shards & Compute Credits.`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-violet-500/40 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-violet-500/20 bg-violet-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌀</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-violet-300 font-mono">
                  HYPER-SPACE RIFT // PROCEDURAL ROGUELITE EXPEDITION
                </h2>
                <p className="text-xs text-violet-400/70 font-mono">
                  Branching Dimensions • Augment Card Drafting • High-Stakes Risk vs. Extraction
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
            {/* Status & Multiplier Bar */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-black border border-violet-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-violet-400">EXPEDITION DEPTH:</span>
                  <span className="text-sm font-black text-white font-mono">SECTOR {currentSector} / 5</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  Rift Instability Level: {Math.min(100, currentSector * 20)}%
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 font-mono">REWARD MULTIPLIER</span>
                  <div className="text-xl font-black text-amber-400 font-mono">{multiplier}x</div>
                </div>
                <div className="text-right border-l border-neutral-800 pl-4">
                  <span className="text-[10px] text-neutral-400 font-mono">UNEXTRACTED SHARDS</span>
                  <div className="text-xl font-black text-emerald-400 font-mono">+{accumulatedShards}</div>
                </div>
              </div>
            </div>

            {/* Active Draft Choices (If Drafting) */}
            {isDrafting ? (
              <div className="space-y-3">
                <div className="text-xs font-mono text-violet-300 font-bold uppercase tracking-wider">
                  Select Sector Clearance Augment (Choose 1)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {draftChoices.map((aug) => (
                    <button
                      key={aug.id}
                      onClick={() => selectAugment(aug)}
                      className="p-4 rounded-xl border border-violet-500/40 bg-neutral-900/80 hover:bg-violet-950/40 hover:border-violet-400 text-left flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-2xl">{aug.icon}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded font-bold bg-violet-500/20 text-violet-300">
                            {aug.rarity}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white font-mono">{aug.name}</div>
                        <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{aug.desc}</p>
                      </div>
                      <span className="text-[10px] text-violet-400 font-mono font-bold mt-4 block">
                        Tap to Install Augment &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Augments Equipped */
              <div>
                <div className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider mb-2">
                  Active Rift Augments ({activeAugments.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeAugments.map((aug, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center gap-3"
                    >
                      <span className="text-2xl">{aug.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white font-mono">{aug.name}</div>
                        <div className="text-[10px] text-neutral-400">{aug.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk vs. Extraction Choice Bar */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={extractSafely}
                disabled={isDrafting}
                className="py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-black font-black text-xs rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all font-mono tracking-wider flex items-center justify-center gap-2"
              >
                <span>🚪</span> EXTRACT SAFELY (BANK +{accumulatedShards} SHARDS)
              </button>

              <button
                onClick={advanceDeeper}
                disabled={isDrafting || currentSector >= 5}
                className="py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all font-mono tracking-wider flex items-center justify-center gap-2"
              >
                <span>⚡</span> RISK IT ALL // DIVE TO SECTOR {currentSector + 1} ({multiplier + 0.75}x)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HyperSpaceRifts;
