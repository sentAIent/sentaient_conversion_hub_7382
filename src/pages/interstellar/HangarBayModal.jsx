import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const SHIPS = [
  {
    id: 'interceptor',
    name: 'X-101 Interceptor',
    class: 'Light Strike Fighter',
    hull: 450,
    shields: 300,
    speed: 95,
    agility: 92,
    firepower: 70,
    color: '#00f3ff',
    desc: 'High-velocity skirmisher built for aggressive dogfighting and rapid flanking maneuvers.',
  },
  {
    id: 'viper',
    name: 'Viper Shadow',
    class: 'Stealth Infiltrator',
    hull: 380,
    shields: 250,
    speed: 88,
    agility: 85,
    firepower: 80,
    color: '#9d4edd',
    desc: 'Equipped with sensor-absorbing composite plating and high-damage kinetic railgun arrays.',
  },
  {
    id: 'bulwark',
    name: 'Bulwark Dreadnought',
    class: 'Heavy Capital Vessel',
    hull: 1200,
    shields: 850,
    speed: 40,
    agility: 35,
    firepower: 98,
    color: '#ffaa00',
    desc: 'Massive armored warship fielding heavy dual plasma batteries and localized point-defense flak.',
  }
];

export const WEAPONS = [
  { id: 'plasma_pulse', name: 'Dual Plasma Pulse', type: 'Energy', dps: '140 DPS', range: 'Medium' },
  { id: 'kinetic_railgun', name: 'Hypervelocity Railgun', type: 'Kinetic', dps: '220 DPS', range: 'Long' },
  { id: 'emp_torpedo', name: 'EMP Ion Torpedoes', type: 'Disruptor', dps: '85 DPS + Stun', range: 'Extreme' },
  { id: 'swarm_missiles', name: 'Swarm Micro-Missiles', type: 'Explosive', dps: '190 DPS', range: 'Tracking' }
];

export const MODULES = [
  { id: 'overdrive_thruster', name: 'Ion Overdrive Thrusters', bonus: '+25% Afterburner Boost' },
  { id: 'phase_shield', name: 'Phase Deflector Matrix', bonus: '+35% Shield Regeneration' },
  { id: 'ai_copilot', name: 'Tactical AI Targeting Core', bonus: '+20% Critical Hit Chance' }
];

export const HangarBayModal = ({ isOpen, onClose, onApplyLoadout }) => {
  const [selectedShip, setSelectedShip] = useState('interceptor');
  const [selectedWeapon, setSelectedWeapon] = useState('plasma_pulse');
  const [selectedModule, setSelectedModule] = useState('phase_shield');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('interstellar_loadout');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.ship) setSelectedShip(parsed.ship);
        if (parsed.weapon) setSelectedWeapon(parsed.weapon);
        if (parsed.module) setSelectedModule(parsed.module);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {}
  };

  const handleSave = async () => {
    try {
      await Haptics.notification({ type: 'SUCCESS' });
    } catch (e) {}

    const loadout = {
      ship: selectedShip,
      weapon: selectedWeapon,
      module: selectedModule
    };

    localStorage.setItem('interstellar_loadout', JSON.stringify(loadout));
    if (onApplyLoadout) onApplyLoadout(loadout);
    onClose();
  };

  if (!isOpen) return null;

  const currentShipData = SHIPS.find(s => s.id === selectedShip) || SHIPS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-[#0b0e14] border border-[#00f3ff]/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-[0_0_50px_rgba(0,243,255,0.25)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-[#00f3ff]/20">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00f3ff] uppercase bg-[#00f3ff]/10 px-2 py-0.5 rounded border border-[#00f3ff]/30">
                Orbital Hangar Bay
              </span>
              <h3 className="text-2xl font-bold font-exo text-white mt-1">Fleet Customization</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {/* Left: Ship Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Chassis Select</label>
              {SHIPS.map((ship) => (
                <button
                  key={ship.id}
                  onClick={() => {
                    setSelectedShip(ship.id);
                    triggerHaptic();
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedShip === ship.id
                      ? 'bg-[#00f3ff]/15 border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                      : 'bg-black/40 border-white/10 hover:border-white/30 text-gray-300'
                  }`}
                >
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>{ship.name}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ship.color }}></span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{ship.class}</div>
                </button>
              ))}
            </div>

            {/* Middle: Ship Stats Preview */}
            <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-white">{currentShipData.name}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{currentShipData.desc}</p>

                <div className="space-y-2.5 mt-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                      <span>Firepower</span>
                      <span className="text-[#00f3ff]">{currentShipData.firepower}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${currentShipData.firepower}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                      <span>Shields & Hull</span>
                      <span className="text-emerald-400">{Math.round((currentShipData.shields / 850) * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((currentShipData.shields / 850) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                      <span>Agility & Speed</span>
                      <span className="text-amber-400">{currentShipData.agility}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${currentShipData.agility}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Weapon & Module Slots */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">Primary Weapon</label>
                <select
                  value={selectedWeapon}
                  onChange={(e) => {
                    setSelectedWeapon(e.target.value);
                    triggerHaptic();
                  }}
                  className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#00f3ff]"
                >
                  {WEAPONS.map(w => (
                    <option key={w.id} value={w.id} className="bg-black text-white">
                      {w.name} ({w.dps})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">Tactical Module</label>
                <select
                  value={selectedModule}
                  onChange={(e) => {
                    setSelectedModule(e.target.value);
                    triggerHaptic();
                  }}
                  className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#00f3ff]"
                >
                  {MODULES.map(m => (
                    <option key={m.id} value={m.id} className="bg-black text-white">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-[11px] text-cyan-200">
                <span className="font-bold">Active Perk:</span> {MODULES.find(m => m.id === selectedModule)?.bonus}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm font-semibold rounded-xl text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              Deploy Loadout
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HangarBayModal;
