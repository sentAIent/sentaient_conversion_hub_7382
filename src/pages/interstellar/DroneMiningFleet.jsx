import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const MINING_SQUADS = [
  { id: 'squad_alpha', name: 'Prospector Unit Alpha', target: 'Titanium Asteroid Belt', ratePerMin: 15, currentStorage: 180, maxStorage: 300, status: 'MINING', icon: '⛏️' },
  { id: 'squad_beta', name: 'Dark Matter Siphon Beta', target: 'Cygnus Nebula Gas Pocket', ratePerMin: 4, currentStorage: 42, maxStorage: 80, status: 'MINING', icon: '🔮' },
  { id: 'squad_gamma', name: 'Automated Trade Convoy Gamma', target: 'Aether Outpost Trade Route', ratePerMin: 25, currentStorage: 350, maxStorage: 500, status: 'IN TRANSIT', icon: '🚛' }
];

export const DroneMiningFleet = ({ isOpen, onClose, iframeRef, onCargoCollected }) => {
  const [squads, setSquads] = useState(MINING_SQUADS);
  const [offlineYieldTotal, setOfflineYieldTotal] = useState(572);

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  // Passive yield progression
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSquads((prev) =>
        prev.map((s) => ({
          ...s,
          currentStorage: Math.min(s.maxStorage, s.currentStorage + 1)
        }))
      );
      setOfflineYieldTotal((prev) => prev + 2);
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const collectSquadCargo = async (squadId) => {
    await triggerHaptic(ImpactStyle.Heavy);
    let collectedAmount = 0;

    setSquads((prev) =>
      prev.map((s) => {
        if (s.id === squadId) {
          collectedAmount = s.currentStorage;
          return { ...s, currentStorage: 0 };
        }
        return s;
      })
    );

    if (onCargoCollected) {
      onCargoCollected(collectedAmount);
    }

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'COLLECT_DRONE_MINING_YIELD',
        squadId,
        amount: collectedAmount
      }, '*');
    }

    alert(`Retrieved cargo from ${squadId}: +${collectedAmount} units deposited to Citadel Vault!`);
  };

  const scheduleOfflineNotification = async () => {
    await triggerHaptic(ImpactStyle.Medium);
    alert('Capacitor Push Notifications enabled: You will be alerted when drone cargo bays reach maximum capacity!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-emerald-500/40 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-emerald-300 font-mono">
                  AUTONOMOUS MINING FLEET // IDLE TRADE CARAVANS
                </h2>
                <p className="text-xs text-emerald-400/70 font-mono">
                  Automated Prospector Squads • Offline Mineral Yields • Push Notification Alerts
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
            {/* Total Accumulated Storage Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-black border border-emerald-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">TOTAL FLEET STORAGE READY:</span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  +{offlineYieldTotal} <span className="text-xs font-normal text-emerald-400">Harvest Units</span>
                </div>
              </div>
              <button
                onClick={scheduleOfflineNotification}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <span>🔔</span> Enable Full-Capacity Push Notifications
              </button>
            </div>

            {/* Squad Cards Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                Active Autonomous Squads
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {squads.map((squad) => {
                  const percent = Math.round((squad.currentStorage / squad.maxStorage) * 100);
                  return (
                    <div
                      key={squad.id}
                      className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-2xl">{squad.icon}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400">
                            {squad.status}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white font-mono">{squad.name}</div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{squad.target}</div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-[11px] font-mono text-neutral-300 mb-1">
                            <span>Cargo Bay:</span>
                            <span className="text-emerald-400 font-bold">
                              {squad.currentStorage} / {squad.maxStorage} ({percent}%)
                            </span>
                          </div>
                          <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800">
                            <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => collectSquadCargo(squad.id)}
                        disabled={squad.currentStorage === 0}
                        className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-black font-bold text-xs rounded-xl font-mono shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                      >
                        Collect Cargo Bay
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DroneMiningFleet;
