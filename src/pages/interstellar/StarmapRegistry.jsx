import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const UNCHARTED_SECTORS = [
  { id: 'sec_7_omicron', defaultName: 'Sector 7-Omicron', coordinates: 'X: 412.8 // Y: -89.4', starClass: 'O-Type Blue Supergiant', minerals: 'Hyper-Dense Platinum', transitTolls: 340 },
  { id: 'sec_centauri', defaultName: 'Proxima Abyss', coordinates: 'X: 182.0 // Y: 504.2', starClass: 'Binary Pulsar', minerals: 'Stabilized Dark Matter', transitTolls: 820 },
  { id: 'sec_kepler', defaultName: 'Kepler Void Fringe', coordinates: 'X: -650.3 // Y: 220.1', starClass: 'Red Hypergiant', minerals: 'Antimatter Particulates', transitTolls: 190 },
  { id: 'sec_cygnus', defaultName: 'Cygnus Shroud', coordinates: 'X: 890.1 // Y: -310.5', starClass: 'Proto-Stellar Nebula', minerals: 'Precursor Crystals', transitTolls: 510 }
];

export const StarmapRegistry = ({ isOpen, onClose, iframeRef }) => {
  const [sectors, setSectors] = useState(UNCHARTED_SECTORS);
  const [selectedSector, setSelectedSector] = useState(UNCHARTED_SECTORS[0]);
  const [customNameInput, setCustomNameInput] = useState('');
  const [isNamingModal, setIsNamingModal] = useState(false);
  const [totalRoyaltiesEarned, setTotalRoyaltiesEarned] = useState(1860);

  // Load registered sectors from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('interstellar_chartered_stars');
      if (saved) {
        setSectors(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const openNamingDialog = (sec) => {
    triggerHaptic(ImpactStyle.Light);
    setSelectedSector(sec);
    setCustomNameInput(sec.customName || '');
    setIsNamingModal(true);
  };

  const handleNameSave = async (e) => {
    e.preventDefault();
    if (!customNameInput.trim()) return;

    await triggerHaptic(ImpactStyle.Heavy);
    const updated = sectors.map((s) =>
      s.id === selectedSector.id ? { ...s, customName: customNameInput.trim(), claimedBy: 'Commander (You)' } : s
    );

    setSectors(updated);
    localStorage.setItem('interstellar_chartered_stars', JSON.stringify(updated));
    setIsNamingModal(false);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'REGISTER_STAR_COORDINATES',
        sectorId: selectedSector.id,
        name: customNameInput.trim()
      }, '*');
    }

    alert(`Star System formally charted as "${customNameInput.trim()}"! Broadcast to Galactic Cartography.`);
  };

  const setNavWaypoint = async (sec) => {
    await triggerHaptic(ImpactStyle.Medium);
    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'SET_NAV_WAYPOINT',
        coordinates: sec.coordinates,
        name: sec.customName || sec.defaultName
      }, '*');
    }
    alert(`Hyper-Warp Waypoint locked: ${sec.customName || sec.defaultName}`);
  };

  const collectRoyalties = async () => {
    if (totalRoyaltiesEarned <= 0) return;
    await triggerHaptic(ImpactStyle.Heavy);
    alert(`Collected +${totalRoyaltiesEarned} Sentaient Compute Credits from interstellar transit tolls!`);
    setTotalRoyaltiesEarned(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-sky-500/40 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sky-500/20 bg-sky-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌌</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-sky-300 font-mono">
                  GALACTIC REGISTRY // STAR CHARTER & CONSTELLATIONS
                </h2>
                <p className="text-xs text-sky-400/70 font-mono">
                  Permanent Naming Rights • Deep-Space Waypoints • Interstellar Transit Royalties
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
            {/* Transit Royalties Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-blue-950/30 to-black border border-sky-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-sky-300 font-bold">ACCUMULATED TRANSIT TOLLS</div>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  +{totalRoyaltiesEarned} <span className="text-xs font-normal text-sky-400">Credits</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Generated from visiting pilots traveling through your charted waypoints.
                </div>
              </div>
              <button
                onClick={collectRoyalties}
                disabled={totalRoyaltiesEarned === 0}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs rounded-xl font-mono shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-40 transition-all"
              >
                Claim Tolls
              </button>
            </div>

            {/* Uncharted Sectors List */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-sky-300 font-bold uppercase tracking-wider">
                Uncharted Stellar Systems (Claim & Name)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sectors.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-sky-500/40 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-bold text-white font-mono">
                            {sec.customName ? `✨ ${sec.customName}` : sec.defaultName}
                          </div>
                          <div className="text-[10px] text-sky-400 font-mono mt-0.5">{sec.coordinates}</div>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                            sec.customName
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {sec.customName ? 'CHARTERED' : 'UNCLAIMED'}
                        </span>
                      </div>

                      <div className="mt-3 text-xs font-mono text-neutral-300 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Classification:</span>
                          <span className="text-white">{sec.starClass}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-400">Rare Minerals:</span>
                          <span className="text-amber-400">{sec.minerals}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex gap-2">
                      <button
                        onClick={() => openNamingDialog(sec)}
                        className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-mono font-bold"
                      >
                        {sec.customName ? 'Rename System' : 'Name & Claim'}
                      </button>
                      <button
                        onClick={() => setNavWaypoint(sec)}
                        className="px-3 py-1.5 bg-sky-900/60 hover:bg-sky-800 border border-sky-500/40 text-sky-200 rounded-lg text-xs font-mono font-bold"
                      >
                        Set Nav Beacon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal: Custom Naming Dialog */}
          {isNamingModal && (
            <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-20">
              <div className="w-full max-w-md bg-neutral-900 border border-sky-500/50 rounded-2xl p-6 space-y-4">
                <div className="text-base font-bold text-sky-300 font-mono">
                  Name Star System ({selectedSector.coordinates})
                </div>
                <p className="text-xs text-neutral-400">
                  This system name will be permanently inscribed into the galactic starmap ledger.
                </p>
                <form onSubmit={handleNameSave} className="space-y-4">
                  <input
                    type="text"
                    value={customNameInput}
                    onChange={(e) => setCustomNameInput(e.target.value)}
                    placeholder="Enter Custom System Name (e.g. Avalon Prime)..."
                    className="w-full bg-black/60 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-sky-400"
                    maxLength={32}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsNamingModal(false)}
                      className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-mono font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!customNameInput.trim()}
                      className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-black rounded-xl text-xs font-mono font-bold shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-40"
                    >
                      Inscribe Name
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StarmapRegistry;
