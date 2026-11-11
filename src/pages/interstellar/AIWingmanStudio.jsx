import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const WINGMAN_ARCHETYPES = [
  {
    id: 'valkyrie_7',
    name: 'Valkyrie-7',
    role: 'Aggressive Interceptor',
    personality: 'Relentless & Precise',
    avatar: '🦅',
    color: '#ff0055',
    hull: 'Viper X-2 Interceptor',
    specialAbility: 'Overdrive Plasma Salvo (+40% Shield Breach)',
    quote: '“Locked onto lead bandit. Engaging maximum thrust. They will not escape.”'
  },
  {
    id: 'cipher_zero',
    name: 'Cipher-Zero',
    role: 'Electronic Warfare & ECM',
    personality: 'Analytical & Cold',
    avatar: '🤖',
    color: '#00f3ff',
    hull: 'Specter Ghost Frame',
    specialAbility: 'EMP EMP Frequency Disruption (Disables Enemy Radar for 8s)',
    quote: '“Enemy missile telemetry intercepted. Scrambling their guidance arrays now.”'
  },
  {
    id: 'titan_aegis',
    name: 'Titan-Aegis',
    role: 'Heavy Guardian Defender',
    personality: 'Protective & Steadfast',
    avatar: '🛡️',
    color: '#ffb703',
    hull: 'Bastion Mk-IV Heavy Frigate',
    specialAbility: 'Mobile Deflector Dome (Absorbs 3,000 incoming damage)',
    quote: '“Commander, fall in behind my signature. My shields will take the brunt.”'
  },
  {
    id: 'oracle_echo',
    name: 'Oracle-Echo',
    role: 'Tactical Predictive Scout',
    personality: 'Predictive & Cryptic',
    avatar: '👁️',
    color: '#9d4edd',
    hull: 'Astral Pathfinder',
    specialAbility: 'Tachyon Drift Forecaster (Reveals cloaked mines & ambush vectors)',
    quote: '“Probability of starboard flank ambush is 94.2%. Adjusting vector accordingly.”'
  }
];

export const WINGMAN_ORDERS = [
  { id: 'FORM_ON_MY_WING', label: 'Form on Wing', icon: '🛫', desc: 'Tight escort flight formation' },
  { id: 'PINCER_ATTACK', label: 'Pincer Flank', icon: '⚔️', desc: 'Flank target vessel from blindspot' },
  { id: 'DEFEND_OBJECTIVE', label: 'Screen & Intercept', icon: '🛡️', desc: 'Prioritize incoming torpedoes & mines' },
  { id: 'DISENGAGE_AND_REPAIR', label: 'Pull Back & Regen', icon: '🔋', desc: 'Disengage fire to recharge shields' }
];

export const AIWingmanStudio = ({ isOpen, onClose, iframeRef }) => {
  const [selectedWingman, setSelectedWingman] = useState(WINGMAN_ARCHETYPES[0]);
  const [activeDirective, setActiveDirective] = useState('FORM_ON_MY_WING');
  const [radioLog, setRadioLog] = useState([
    { sender: 'AI-Studio', text: 'Sentaient Cognitive Agent Core connected.' },
    { sender: 'Valkyrie-7', text: 'Telemetry linked. Ready for combat sortie, Commander.' }
  ]);
  const [customDirectiveText, setCustomDirectiveText] = useState('');

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  const dispatchOrder = async (orderId) => {
    await triggerHaptic(ImpactStyle.Medium);
    setActiveDirective(orderId);
    const order = WINGMAN_ORDERS.find(o => o.id === orderId);

    const confirmationResponses = {
      valkyrie_7: `Acknowledged: ${order.label}. Thrusters max. Opening fire!`,
      cipher_zero: `Directive registered: ${order.label}. Reconfiguring electronic counter-measures.`,
      titan_aegis: `Copy that Commander: ${order.label}. Holding line with you.`,
      oracle_echo: `Executing ${order.label}. Quantum trajectories updated.`
    };

    const reply = confirmationResponses[selectedWingman.id] || 'Order confirmed.';

    setRadioLog(prev => [
      ...prev,
      { sender: 'You', text: `Directive: ${order.label}` },
      { sender: selectedWingman.name, text: reply }
    ]);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'WINGMAN_ORDER',
        orderId,
        wingman: selectedWingman
      }, '*');
    }
  };

  const handleCustomDirective = (e) => {
    e.preventDefault();
    if (!customDirectiveText.trim()) return;

    triggerHaptic(ImpactStyle.Light);
    const text = customDirectiveText.trim();
    setCustomDirectiveText('');

    setRadioLog(prev => [
      ...prev,
      { sender: 'You', text: `Radio: "${text}"` },
      { sender: selectedWingman.name, text: `Synthesizing neural intent: "${text}"... Proceeding as ordered!` }
    ]);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'WINGMAN_VOICE_COMMAND',
        command: text,
        wingman: selectedWingman
      }, '*');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-cyan-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-cyan-300 font-mono">
                  SENTAIENT COGNITIVE AGENT // AUTONOMOUS AI WINGMAN
                </h2>
                <p className="text-xs text-cyan-400/70 font-mono">
                  Neural Companion Fighters • Real-Time Voice Radio • Tactical Formation Orders
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
            {/* Wingman Archetypes List (5 Cols) */}
            <div className="md:col-span-5 p-5 border-r border-neutral-800/80 space-y-3 bg-neutral-950/60">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                Select Active Wingman AI
              </div>
              <div className="space-y-2">
                {WINGMAN_ARCHETYPES.map((pilot) => (
                  <button
                    key={pilot.id}
                    onClick={() => {
                      triggerHaptic();
                      setSelectedWingman(pilot);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedWingman.id === pilot.id
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-lg bg-black/60 border border-neutral-800">
                        {pilot.avatar}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{pilot.name}</span>
                          <span className="text-[10px] font-mono text-cyan-400">{pilot.hull}</span>
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">{pilot.role}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Wingman Profile Card */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 space-y-2 text-xs font-mono">
                <div className="text-cyan-300 font-bold">Special Tactical Ability:</div>
                <div className="text-white text-[11px] bg-cyan-950/30 p-2 rounded border border-cyan-500/20">
                  ⚡ {selectedWingman.specialAbility}
                </div>
                <div className="italic text-neutral-400 text-[11px] pt-1">
                  {selectedWingman.quote}
                </div>
              </div>
            </div>

            {/* Tactical Directives & Radio Comms (7 Cols) */}
            <div className="md:col-span-7 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider mb-3">
                  Combat Flight Directives
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {WINGMAN_ORDERS.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => dispatchOrder(order.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        activeDirective === order.id
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <span>{order.icon}</span>
                        <span>{order.label}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{order.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Sub-Space Radio Log */}
                <div className="mt-5">
                  <div className="text-xs font-mono text-neutral-400 mb-2 flex justify-between items-center">
                    <span>Sub-Space Radio Link</span>
                    <span className="text-[10px] text-emerald-400 animate-pulse">● ENCRYPTED & LIVE</span>
                  </div>
                  <div className="h-44 p-3 rounded-xl bg-black/80 border border-neutral-800 overflow-y-auto space-y-2 font-mono text-xs">
                    {radioLog.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-1.5 rounded ${
                          msg.sender === 'You'
                            ? 'bg-neutral-800 text-white ml-6'
                            : 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 mr-6'
                        }`}
                      >
                        <span className="text-[10px] font-bold block opacity-75">{msg.sender}:</span>
                        <span>{msg.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radio Command Input */}
              <form onSubmit={handleCustomDirective} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={customDirectiveText}
                  onChange={(e) => setCustomDirectiveText(e.target.value)}
                  placeholder={`Instruct ${selectedWingman.name} (e.g. "Cover my flank", "Focus dreadnought")...`}
                  className="flex-1 bg-black/60 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!customDirectiveText.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-black font-bold text-xs rounded-xl font-mono transition-all"
                >
                  Transmit
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AIWingmanStudio;
