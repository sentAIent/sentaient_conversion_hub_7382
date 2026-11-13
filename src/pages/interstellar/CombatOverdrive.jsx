import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const CombatOverdrive = ({ isOpen, onClose, iframeRef }) => {
  const [isOverdriveActive, setIsOverdriveActive] = useState(false);
  const [overdriveEnergy, setOverdriveEnergy] = useState(100);
  const [selectedSubsystem, setSelectedSubsystem] = useState('shields');

  const [subsystems, setSubsystems] = useState({
    shields: { name: 'Shield Projectors', hp: 100, maxHp: 100, status: 'ONLINE', debuff: 'Disables energy barrier' },
    engines: { name: 'Impulse Drives', hp: 100, maxHp: 100, status: 'ONLINE', debuff: 'Forces target into uncontrollable drift' },
    weapons: { name: 'Broadside Turrets', hp: 100, maxHp: 100, status: 'ONLINE', debuff: 'Reduces enemy firepower by 75%' },
    reactor: { name: 'Antimatter Reactor', hp: 100, maxHp: 100, status: 'STABLE', debuff: 'Catastrophic secondary detonation' }
  });

  // Passive energy recharge for Overdrive
  useEffect(() => {
    const timer = setInterval(() => {
      setOverdriveEnergy(prev => Math.min(100, prev + 5));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger Reflex Overdrive (Bullet-Time)
  const triggerReflexOverdrive = async () => {
    if (overdriveEnergy < 40 || isOverdriveActive) return;

    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {}

    setIsOverdriveActive(true);
    setOverdriveEnergy(prev => prev - 40);

    // Broadcast time-dilation to game engine
    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'SET_TIME_SCALE',
        timeScale: 0.25, // 75% bullet-time slowdown
        duration: 2500
      }, '*');
    }

    setTimeout(() => {
      setIsOverdriveActive(false);
      if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'SET_TIME_SCALE',
          timeScale: 1.0,
          duration: 0
        }, '*');
      }
    }, 2500);
  };

  // Strike targeted subsystem
  const strikeSubsystem = async (systemKey) => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (e) {}

    setSubsystems(prev => {
      const current = prev[systemKey];
      const newHp = Math.max(0, current.hp - 35);
      const newStatus = newHp === 0 ? 'CRITICALLY DESTROYED' : (newHp < 40 ? 'DAMAGED' : 'ONLINE');

      const updated = {
        ...prev,
        [systemKey]: { ...current, hp: newHp, status: newStatus }
      };

      // Broadcast component damage to game engine
      if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'SUBSYSTEM_STRIKE',
          subsystem: systemKey,
          remainingHp: newHp,
          isDestroyed: newHp === 0
        }, '*');
      }

      return updated;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Fullscreen Overdrive Bullet-Time Chromatic Vignette */}
      {isOverdriveActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40 border-[8px] border-cyan-400/80 shadow-[inset_0_0_100px_rgba(0,243,255,0.6)] backdrop-contrast-125"
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono text-xs px-4 py-1.5 rounded-full tracking-widest animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            REFLEX OVERDRIVE ACTIVE (0.25x TIME DILATION)
          </div>
        </motion.div>
      )}

      {/* Tactical Subsystem Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        className="absolute top-20 left-4 w-96 bg-black/90 border border-[#00f3ff]/40 rounded-2xl backdrop-blur-md z-30 p-5 shadow-[0_0_35px_rgba(0,243,255,0.3)] text-white font-mono"
      >
        <div className="flex justify-between items-center pb-3 border-b border-[#00f3ff]/20 mb-4">
          <div>
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              Kinetic Combat Systems
            </span>
            <h3 className="text-lg font-bold font-exo text-white mt-1">Target Subsystems</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">✕</button>
        </div>

        {/* Reflex Overdrive Activation Bar */}
        <div className="mb-4 bg-black/60 border border-white/10 rounded-xl p-3">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-gray-300 font-bold">Overdrive Flux:</span>
            <span className="text-cyan-400 font-bold">{overdriveEnergy}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${overdriveEnergy}%` }}
            ></div>
          </div>
          <button
            onClick={triggerReflexOverdrive}
            disabled={overdriveEnergy < 40 || isOverdriveActive}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-black font-bold text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)]"
          >
            {isOverdriveActive ? 'OVERDRIVE ENGAGED...' : 'ENGAGE REFLEX OVERDRIVE (40 Flux)'}
          </button>
        </div>

        {/* Subsystems List */}
        <div className="space-y-2 mb-4">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Target Hostile: Goliath Dreadnought</span>
          {Object.entries(subsystems).map(([key, sys]) => (
            <div
              key={key}
              onClick={() => setSelectedSubsystem(key)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                selectedSubsystem === key
                  ? 'bg-cyan-950/30 border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">{sys.name}</span>
                <span className={`text-[10px] font-bold ${
                  sys.hp === 0 ? 'text-red-500' : (sys.hp < 40 ? 'text-amber-400' : 'text-emerald-400')
                }`}>
                  {sys.status}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    sys.hp === 0 ? 'bg-red-500' : (sys.hp < 40 ? 'bg-amber-400' : 'bg-emerald-400')
                  }`}
                  style={{ width: `${sys.hp}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-gray-400 flex justify-between items-center mt-1">
                <span>{sys.debuff}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    strikeSubsystem(key);
                  }}
                  disabled={sys.hp === 0}
                  className="px-2 py-0.5 bg-red-900/60 hover:bg-red-800 border border-red-500/50 text-red-200 rounded text-[10px] font-bold disabled:opacity-30"
                >
                  Strike
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CombatOverdrive;
