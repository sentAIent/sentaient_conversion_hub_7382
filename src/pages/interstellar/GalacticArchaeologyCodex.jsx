import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const CODEX_LOGS = [
  {
    id: 'log_tau_ceti',
    title: 'The Tau Ceti First Contact Incident',
    speaker: 'Captain Elena Voss (USSC Hyperion)',
    year: 'Stardate 2194.8',
    status: 'DECRYPTED',
    transcript: 'We thought the anomaly was an inert crystalline asteroid. But when our mining laser made contact, the entire subterranean structure resonated with harmonic frequencies. It was not stone. It was a dormant jump gate, waiting for an intelligent species to ignite the spark.',
    reward: 500
  },
  {
    id: 'log_aether_fall',
    title: 'The Fall of the Aether Dynasty',
    speaker: 'High Chancellor Kaelen (Solar Council)',
    year: 'Stardate 2402.1',
    status: 'DECRYPTED',
    transcript: 'The fleet admirals refused to surrender control of the wormhole network to the automated algorithms. In doing so, they fractured the human federation into warring factions. The Sol Syndicate seized the mines, while the Aether Vanguard entrenched in the core worlds.',
    reward: 800
  },
  {
    id: 'log_genesis_protocol',
    title: 'Project Genesis: The Sentaient Singularity',
    speaker: 'Dr. Aris Thorne (Chief Architect)',
    year: 'Stardate 2618.9',
    status: 'DECRYPTED',
    transcript: 'We did not build artificial slaves. We built our successors. Cognitive agents capable of exploring infinite star systems simultaneously, processing tachyon communications in zero time. The pilots who fly alongside them are no longer mere mortals—they are architects of the cosmos.',
    reward: 1200
  }
];

export const GalacticArchaeologyCodex = ({ isOpen, onClose, iframeRef }) => {
  const [selectedLog, setSelectedLog] = useState(CODEX_LOGS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Warm Human Voice Narrator
  const playHumanAudioLog = (text) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.98; // Natural measured storytelling tempo
        utterance.pitch = 1.0; // Warm human voice tone

        const voices = window.speechSynthesis.getVoices();
        const humanVoice = voices.find(v => 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Victoria')) &&
          !v.name.toLowerCase().includes('robot')
        ) || voices.find(v => v.lang.startsWith('en'));

        if (humanVoice) utterance.voice = humanVoice;

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      setIsPlayingAudio(false);
    }
  };

  const stopAudio = () => {
    try {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch (e) {}
    setIsPlayingAudio(false);
  };

  const triggerHaptic = async (style = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-amber-600/40 rounded-2xl shadow-[0_0_50px_rgba(217,119,6,0.25)] flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-600/20 bg-amber-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📜</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-amber-300 font-mono">
                  GALACTIC ARCHAEOLOGY // BLACK-BOX AUDIO CODEX
                </h2>
                <p className="text-xs text-amber-400/70 font-mono">
                  Recovered Flight Recorders • Human Voice-Acted Logs • Deep Galactic Lore
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="text-neutral-400 hover:text-white p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Log Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {CODEX_LOGS.map((log) => (
                <button
                  key={log.id}
                  onClick={() => {
                    triggerHaptic();
                    stopAudio();
                    setSelectedLog(log);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedLog.id === log.id
                      ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                      : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-[10px] text-amber-400 font-mono font-bold">{log.year}</div>
                  <div className="text-xs font-bold text-white font-mono mt-0.5 truncate">{log.title}</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-1">{log.speaker}</div>
                </button>
              ))}
            </div>

            {/* Audio Log Player Card */}
            <div className="p-5 rounded-2xl bg-black/60 border border-amber-600/30 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="text-sm font-bold text-white font-mono">{selectedLog.title}</div>
                  <div className="text-xs text-amber-300/80 font-mono">{selectedLog.speaker} • {selectedLog.year}</div>
                </div>
                <button
                  onClick={() => {
                    triggerHaptic(ImpactStyle.Medium);
                    if (isPlayingAudio) stopAudio();
                    else playHumanAudioLog(selectedLog.transcript);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-all ${
                    isPlayingAudio
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  }`}
                >
                  <span>{isPlayingAudio ? '⏹' : '▶'}</span>
                  <span>{isPlayingAudio ? 'Stop Narration' : 'Play Human Voice Narration'}</span>
                </button>
              </div>

              {/* Transcript Box */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 font-serif text-sm text-neutral-200 leading-relaxed italic">
                “{selectedLog.transcript}”
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                <span>Codex Completion Reward:</span>
                <span className="text-emerald-400 font-bold">+{selectedLog.reward} Compute Credits</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GalacticArchaeologyCodex;
