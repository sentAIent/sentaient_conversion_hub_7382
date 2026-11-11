import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const ARENA_ZONES = [
  { id: 'neon_nebula', name: 'Neon Nebula Gladiatorial Ring', hazard: 'Ion clouds scramble missile locks; close quarters only', bg: 'from-fuchsia-950/60 to-purple-950/40', color: '#d946ef' },
  { id: 'binary_pulsar', name: 'Binary Pulsar Orbit', hazard: 'Periodic radiation pulses strip unpolarized shields', bg: 'from-amber-950/60 to-orange-950/40', color: '#f59e0b' },
  { id: 'orbital_graveyard', name: 'Orbital Scrap Graveyard', hazard: 'High density debris; collision damage fatal', bg: 'from-cyan-950/60 to-blue-950/40', color: '#06b6d4' }
];

export const RESOURCE_TYPES = [
  { id: 'credits', name: 'Compute Credits', unitVal: 1, icon: '🪙', increments: [500, 1000, 2500, 5000] },
  { id: 'titanium', name: 'Titanium Plating', unitVal: 2, icon: '🔩', increments: [100, 250, 500, 1000] },
  { id: 'dark_matter', name: 'Dark Matter Cores', unitVal: 50, icon: '🔮', increments: [5, 10, 20, 50] },
  { id: 'logic_modules', name: 'Precursor AI Cores', unitVal: 125, icon: '🧠', increments: [2, 4, 8, 16] }
];

export const MOCK_CHALLENGERS = [
  { id: 'pilot_phantom', name: 'Commander Nova_Prime', rank: 'Apex Ace (ELO 1940)', winRate: '78%', ship: 'Interceptor X Custom' },
  { id: 'pilot_reaper', name: 'ShadowPilot_Kael', rank: 'Void Veteran (ELO 1880)', winRate: '72%', ship: 'Viper Phantom' },
  { id: 'pilot_aegis', name: 'Valkyrie_9', rank: 'Gladiator Champion (ELO 2010)', winRate: '84%', ship: 'Aegis Heavy Bastion' }
];

export const PvPArenaStaking = ({ isOpen, onClose, iframeRef, onPurseWon }) => {
  const [selectedArena, setSelectedArena] = useState(ARENA_ZONES[0]);
  const [selectedChallenger, setSelectedChallenger] = useState(MOCK_CHALLENGERS[0]);
  const [resourceType, setResourceType] = useState(RESOURCE_TYPES[0]);
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [opponentAgreed, setOpponentAgreed] = useState(true);
  const [duelStage, setDuelStage] = useState('lobby'); // 'lobby' | 'countdown' | 'combat' | 'victory'
  const [duelCombatLog, setDuelCombatLog] = useState([]);
  const [playerHp, setPlayerHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);

  // Natural Human Voice Announcer
  const speakNatural = (text) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.02;
        utterance.pitch = 1.0; // Natural human pitch, avoiding robotic distortion
        
        // Find natural, human-sounding voice
        const voices = window.speechSynthesis.getVoices();
        const humanVoice = voices.find(v => 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel') || v.lang.startsWith('en')) &&
          !v.name.toLowerCase().includes('robot')
        );
        if (humanVoice) utterance.voice = humanVoice;
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  // Start Duel & Escrow Agreement
  const initiateStakedDuel = async () => {
    await triggerHaptic(ImpactStyle.Heavy);
    setDuelStage('countdown');
    const totalPurse = stakeAmount * 2;
    speakNatural(`Stakes confirmed. Both pilots have locked ${stakeAmount} ${resourceType.name} into the escrow vault. Total winner take all purse: ${totalPurse} ${resourceType.name}. Three, two, one... Engage!`);

    setTimeout(() => {
      setDuelStage('combat');
      setPlayerHp(100);
      setOpponentHp(100);
      setDuelCombatLog([
        `Escrow Vault Sealed: ${totalPurse} ${resourceType.name} locked for winner!`,
        `Entering ${selectedArena.name}. Warning: ${selectedArena.hazard}`,
        `Engagement started against ${selectedChallenger.name}!`
      ]);
      runCombatSimulation();
    }, 3500);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'INITIATE_PVP_STAKE_DUEL',
        arena: selectedArena,
        challenger: selectedChallenger,
        stake: { resource: resourceType.name, amount: stakeAmount, totalPurse }
      }, '*');
    }
  };

  const runCombatSimulation = () => {
    let pHealth = 100;
    let oHealth = 100;

    const interval = setInterval(() => {
      const pDmg = Math.floor(Math.random() * 22) + 12;
      const oDmg = Math.floor(Math.random() * 18) + 8;

      oHealth = Math.max(0, oHealth - pDmg);
      pHealth = Math.max(0, pHealth - oDmg);

      setOpponentHp(oHealth);
      setPlayerHp(pHealth);

      setDuelCombatLog(prev => [
        `You fired plasma salvo for ${pDmg}% shield breach!`,
        `${selectedChallenger.name} retaliated with kinetic strike (-${oDmg}% hull)!`,
        ...prev.slice(0, 5)
      ]);

      if (oHealth <= 0) {
        clearInterval(interval);
        setDuelStage('victory');
        const totalPurse = stakeAmount * 2;
        speakNatural(`Target vessel incapacitated! Victory is yours, Commander. The entire escrow purse of ${totalPurse} ${resourceType.name} has been transferred to your vault.`);
        if (onPurseWon) onPurseWon(totalPurse);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  const totalPurse = stakeAmount * 2;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-fuchsia-500/40 rounded-2xl shadow-[0_0_50px_rgba(217,70,239,0.25)] flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-fuchsia-500/20 bg-fuchsia-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚔️</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-fuchsia-300 font-mono">
                  GLADIATOR ARENA // 1V1 HIGH-STAKES WINNER-TAKE-ALL
                </h2>
                <p className="text-xs text-fuchsia-400/70 font-mono">
                  Mutual Resource Escrow Vault • Equal Staking • Zero-Sum Winner-Take-All Purges
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
            {duelStage === 'lobby' && (
              <>
                {/* Escrow Staking Configuration Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-fuchsia-950/30 via-purple-950/20 to-black border border-fuchsia-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <div className="text-xs font-mono text-fuchsia-300 font-bold uppercase tracking-wider">
                        Mutual Resource Escrow Agreement
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Both pilots stake equal resources. Escrow smart contract locks funds until winner is determined.
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">WINNER-TAKE-ALL PURSE</span>
                      <div className="text-2xl font-black font-mono text-emerald-400">
                        {totalPurse.toLocaleString()} {resourceType.name}
                      </div>
                    </div>
                  </div>

                  {/* Resource Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RESOURCE_TYPES.map(res => (
                      <button
                        key={res.id}
                        onClick={() => {
                          triggerHaptic();
                          setResourceType(res);
                          setStakeAmount(res.increments[1]);
                        }}
                        className={`p-2.5 rounded-xl border text-center flex items-center justify-center gap-2 transition-all ${
                          resourceType.id === res.id
                            ? 'border-fuchsia-400 bg-fuchsia-950/40 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                            : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                        }`}
                      >
                        <span className="text-lg">{res.icon}</span>
                        <span className="text-xs font-bold text-white font-mono">{res.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Equal Stake Slider / Increments */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-neutral-300 mb-2">
                      <span>Equal Stake per Pilot:</span>
                      <span className="text-fuchsia-400 font-bold">
                        {stakeAmount.toLocaleString()} {resourceType.name} (Matched 1:1)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {resourceType.increments.map(amt => (
                        <button
                          key={amt}
                          onClick={() => {
                            triggerHaptic();
                            setStakeAmount(amt);
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                            stakeAmount === amt
                              ? 'bg-fuchsia-600 border-fuchsia-300 text-white shadow-[0_0_12px_rgba(217,70,239,0.4)]'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opponent & Matchmaking Selection */}
                <div>
                  <div className="text-xs font-mono text-fuchsia-300 font-bold uppercase tracking-wider mb-2">
                    Select Ready Challenger (Verified Escrow Balance)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {MOCK_CHALLENGERS.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          triggerHaptic();
                          setSelectedChallenger(c);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedChallenger.id === c.id
                            ? 'border-fuchsia-400 bg-fuchsia-950/40 shadow-[0_0_15px_rgba(217,70,239,0.25)]'
                            : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-white font-mono">{c.name}</span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">READY ✓</span>
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">{c.rank}</div>
                        <div className="text-[9px] text-fuchsia-300/80 font-mono mt-1">Win Rate: {c.winRate} • {c.ship}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hazard Arena Selector */}
                <div>
                  <div className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider mb-2">
                    Select Combat Hazard Arena
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ARENA_ZONES.map(arena => (
                      <button
                        key={arena.id}
                        onClick={() => {
                          triggerHaptic();
                          setSelectedArena(arena);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedArena.id === arena.id
                            ? 'border-white bg-neutral-900 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                            : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white font-mono">{arena.name}</div>
                        <div className="text-[10px] text-neutral-400 mt-1">{arena.hazard}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lock In & Initiate Duel Button */}
                <div className="pt-2">
                  <button
                    onClick={initiateStakedDuel}
                    className="w-full py-3.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-black text-xs rounded-xl shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all font-mono tracking-widest flex items-center justify-center gap-2"
                  >
                    <span>⚡</span> MUTUALLY LOCK ESCROW & COMMENCE WINNER-TAKE-ALL DUEL
                  </button>
                </div>
              </>
            )}

            {duelStage === 'countdown' && (
              <div className="p-12 text-center space-y-4">
                <div className="text-5xl animate-bounce">⚡</div>
                <div className="text-lg font-black font-mono text-fuchsia-400">
                  SEALING ESCROW SMART CONTRACT...
                </div>
                <p className="text-xs text-neutral-400 font-mono">
                  {totalPurse.toLocaleString()} {resourceType.name} locked in winner-take-all vault.
                </p>
                <div className="text-2xl font-black text-white font-mono animate-pulse">WARPING TO ARENA</div>
              </div>
            )}

            {duelStage === 'combat' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Player HP */}
                  <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30">
                    <div className="flex justify-between text-xs font-mono text-cyan-300 font-bold mb-1">
                      <span>Commander (You)</span>
                      <span>{playerHp}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-3 overflow-hidden">
                      <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${playerHp}%` }} />
                    </div>
                  </div>

                  {/* Opponent HP */}
                  <div className="p-4 rounded-xl bg-black/60 border border-fuchsia-500/30">
                    <div className="flex justify-between text-xs font-mono text-fuchsia-300 font-bold mb-1">
                      <span>{selectedChallenger.name}</span>
                      <span>{opponentHp}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-3 overflow-hidden">
                      <div className="bg-fuchsia-500 h-full transition-all duration-300" style={{ width: `${opponentHp}%` }} />
                    </div>
                  </div>
                </div>

                {/* Live Duel Telemetry Log */}
                <div className="p-4 rounded-xl bg-black/80 border border-neutral-800 font-mono text-xs space-y-1.5 h-44 overflow-y-auto">
                  {duelCombatLog.map((log, i) => (
                    <div key={i} className="text-neutral-300">{log}</div>
                  ))}
                </div>
              </div>
            )}

            {duelStage === 'victory' && (
              <div className="p-8 rounded-2xl bg-neutral-900/60 border border-emerald-500/50 text-center space-y-4">
                <div className="text-5xl">🏆</div>
                <div className="text-xl font-black font-mono text-emerald-400">
                  VICTORY! ESCROW PURSE CLAIMED!
                </div>
                <p className="text-sm font-mono text-white">
                  You defeated {selectedChallenger.name} in {selectedArena.name}!
                </p>
                <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 max-w-sm mx-auto">
                  <div className="text-xs text-neutral-400 font-mono">Total Winnings Deposited:</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    +{totalPurse.toLocaleString()} {resourceType.name}
                  </div>
                </div>
                <button
                  onClick={() => setDuelStage('lobby')}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl font-mono shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                >
                  Return to Duel Lobby
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PvPArenaStaking;
