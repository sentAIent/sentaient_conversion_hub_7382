import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const DERELICT_SITES = [
  {
    id: 'hyperion',
    name: 'USSC Hyperion (Derelict Ark)',
    type: 'Generational Colony Ship',
    dangerLevel: 'High',
    integrity: 42,
    coordinates: 'Quad 4 // Alpha Centauri Fringe',
    description: 'Drifting since the First Expansion era. Automated distress beacon repeating an encoded SOS sequence.',
    loot: ['Sub-Light Compression Drive', '180 Titanium Composite', 'Ancient Cryo-Stasis Records'],
    cipherCode: [1, 0, 1, 1]
  },
  {
    id: 'precursor_vault',
    name: 'Vault of Xylar (Precursor Tomb)',
    type: 'Alien Quantum Construct',
    dangerLevel: 'Extreme',
    integrity: 88,
    coordinates: 'Void Reach 9 // Cygnus Singularity',
    description: 'Monolithic obsidian obelisk emitting non-baryonic matter pulses. Guarded by dormant synthetic sentries.',
    loot: ['Dark-Energy Arc Cannon Blueprint', 'Phase-Shift Cloak Core', '3 Precursor Logic Modules'],
    cipherCode: [0, 1, 1, 0]
  },
  {
    id: 'station_omega',
    name: 'Black-Hole Station Omega',
    type: 'Classified R&D Facility',
    dangerLevel: 'Moderate',
    integrity: 24,
    coordinates: 'Event Horizon // Sagittarius Cluster',
    description: 'Gravitational research lab evacuated during containment rupture. Experimental reactor coils still humming.',
    loot: ['Singularity Tachyon Lens', '95 Dark Matter Shards', 'Black-Hole Telemetry Matrix'],
    cipherCode: [1, 1, 0, 1]
  }
];

export const DerelictAnomalies = ({ isOpen, onClose, iframeRef, onLootClaimed }) => {
  const [selectedDerelict, setSelectedDerelict] = useState(DERELICT_SITES[0]);
  const [isBreaching, setIsBreaching] = useState(false);
  const [breachStage, setBreachStage] = useState('scan'); // 'scan' | 'cipher' | 'loot'
  const [playerCipher, setPlayerCipher] = useState([0, 0, 0, 0]);
  const [decryptionSuccess, setDecryptionSuccess] = useState(false);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const startBreach = async () => {
    await triggerHaptic(ImpactStyle.Medium);
    setIsBreaching(true);
    setBreachStage('cipher');
    setPlayerCipher([0, 0, 0, 0]);
    setDecryptionSuccess(false);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'DERELICT_BREACH_INITIATED',
        derelict: selectedDerelict
      }, '*');
    }
  };

  const toggleCipherBit = (index) => {
    triggerHaptic(ImpactStyle.Light);
    const updated = [...playerCipher];
    updated[index] = updated[index] === 0 ? 1 : 0;
    setPlayerCipher(updated);

    // Check if matches target cipher
    const target = selectedDerelict.cipherCode;
    const isMatch = updated.every((val, idx) => val === target[idx]);
    if (isMatch) {
      triggerHaptic(ImpactStyle.Heavy);
      setDecryptionSuccess(true);
      setTimeout(() => {
        setBreachStage('loot');
      }, 700);
    }
  };

  const claimSalvage = async () => {
    try {
      await Haptics.notification({ type: 'SUCCESS' });
    } catch (e) {}

    if (onLootClaimed) {
      onLootClaimed(selectedDerelict.loot);
    }

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'CLAIM_DERELICT_SALVAGE',
        derelictId: selectedDerelict.id,
        loot: selectedDerelict.loot
      }, '*');
    }

    alert(`Salvage Secured from ${selectedDerelict.name}! Transferred to Hangar Vault.`);
    setIsBreaching(false);
    setBreachStage('scan');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛰️</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-amber-300 font-mono">
                  DEEP SPACE ANOMALIES // DERELICT SALVAGE
                </h2>
                <p className="text-xs text-amber-400/70 font-mono">
                  Ancient Megastructures • EVA Breach Protocols • Precursor Cryptography
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
            {!isBreaching ? (
              <>
                {/* Derelict Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DERELICT_SITES.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => {
                        triggerHaptic();
                        setSelectedDerelict(site);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedDerelict.id === site.id
                          ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white truncate">{site.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            site.dangerLevel === 'Extreme'
                              ? 'bg-red-500/20 text-red-400'
                              : site.dangerLevel === 'High'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {site.dangerLevel}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">{site.type}</div>
                      <div className="text-[9px] text-amber-300/80 mt-2 font-mono">
                        Hull Integrity: {site.integrity}%
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Derelict Details */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white font-mono">{selectedDerelict.name}</span>
                    <span className="text-xs font-mono text-neutral-400">{selectedDerelict.coordinates}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{selectedDerelict.description}</p>

                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase">
                      Detected Cargo & Tech Modules:
                    </span>
                    <ul className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedDerelict.loot.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-neutral-300 flex items-center gap-2 p-1.5 rounded bg-black/40 border border-neutral-800 font-mono"
                        >
                          <span className="text-amber-400">⚡</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dispatch / Breach Button */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={startBreach}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all font-mono tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>🚀</span> INITIATE EVA BOARDING & DECRYPTION BREACH
                  </button>
                </div>
              </>
            ) : (
              /* Mini-game & Loot Screen */
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 text-center">
                  <div className="text-xs font-mono text-amber-400 font-bold mb-1">
                    {breachStage === 'cipher' ? 'AIRLOCK FIREWALL CIPHER DETECTED' : 'FIREWALL PURGED // VAULT ACCESSIBLE'}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {breachStage === 'cipher'
                      ? 'Align quantum logic bits to match the derelict master frequency.'
                      : 'Containment seals broken. Salvage ready for transfer.'}
                  </p>
                </div>

                {breachStage === 'cipher' && (
                  <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col items-center">
                    <div className="text-xs font-mono text-neutral-400 mb-4">
                      Target Frequency Key: [{selectedDerelict.cipherCode.join(' - ')}]
                    </div>

                    <div className="flex gap-4">
                      {playerCipher.map((bit, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleCipherBit(idx)}
                          className={`w-14 h-16 rounded-xl font-mono text-xl font-black transition-all flex flex-col items-center justify-center border-2 ${
                            bit === 1
                              ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                              : 'bg-neutral-950 text-neutral-500 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <span>{bit}</span>
                          <span className="text-[9px] mt-0.5">{bit === 1 ? 'HIGH' : 'LOW'}</span>
                        </button>
                      ))}
                    </div>

                    {decryptionSuccess && (
                      <div className="mt-4 text-emerald-400 font-mono text-xs font-bold animate-pulse">
                        ACCESS GRANTED // BREACH SUCCESSFUL
                      </div>
                    )}
                  </div>
                )}

                {breachStage === 'loot' && (
                  <div className="p-6 rounded-xl bg-neutral-900/60 border border-emerald-500/40 text-center space-y-4">
                    <div className="text-3xl">🏆</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      PRECURSOR BLUEPRINTS & ANCIENT CARGO SECURED
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      {selectedDerelict.loot.map((lootItem, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-black/60 border border-emerald-500/20 text-xs font-mono text-white flex items-center justify-between"
                        >
                          <span>{lootItem}</span>
                          <span className="text-emerald-400 font-bold">✓ RECOVERED</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={claimSalvage}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all font-mono"
                    >
                      Transfer to Player Vessel
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setIsBreaching(false)}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold rounded-xl text-neutral-400"
                >
                  Cancel Boarding Operation
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DerelictAnomalies;
