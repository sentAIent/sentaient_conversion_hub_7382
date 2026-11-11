import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const TacticalFleetOverlay = ({ isOpen, onClose, onSendOrder, iframeRef }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tacticalLog, setTacticalLog] = useState([
    { id: 1, time: 'T-00:00', text: 'FLEET LINK ESTABLISHED. AWAITING TACTICAL DIRECTIVES.' }
  ]);

  const addLog = (text) => {
    const time = 'T-' + new Date().toISOString().substring(14, 19);
    setTacticalLog(prev => [...prev.slice(-6), { id: Date.now(), time, text }]);
  };

  const dispatchOrder = async (orderType, payload = {}) => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {}

    addLog(`DIRECTIVE TRANSMITTED: [${orderType.toUpperCase()}]`);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'TACTICAL_FLEET_ORDER',
        order: orderType,
        payload
      }, '*');
    }

    if (onSendOrder) {
      onSendOrder(orderType, payload);
    }
  };

  // Push-to-Talk Speech Recognition for AI Voice Orders
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice orders require a supported browser (Chrome, Edge, Safari). Using manual input.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening for tactical order...');
      };

      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        setTranscript(spoken);
        dispatchOrder('VOICE_COMMAND', { command: spoken });
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Speech recognition failed to initialize:", err);
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute bottom-24 right-4 w-96 bg-black/85 border border-[#00f3ff]/40 rounded-2xl backdrop-blur-md z-30 p-4 shadow-[0_0_30px_rgba(0,243,255,0.25)] text-white font-mono"
      >
        <div className="flex justify-between items-center pb-2.5 border-b border-[#00f3ff]/20 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-[#00f3ff] tracking-widest uppercase">Tactical Fleet Command</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">✕</button>
        </div>

        {/* Quick Tactical Order Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => dispatchOrder('FOCUS_FIRE')}
            className="p-2.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-200 text-xs font-bold rounded-xl transition-all text-left flex items-center justify-between"
          >
            <span>FOCUS FIRE</span>
            <span className="text-[10px] text-red-400">⚡ High DPS</span>
          </button>

          <button
            onClick={() => dispatchOrder('DEFENSIVE_SPHERE')}
            className="p-2.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-bold rounded-xl transition-all text-left flex items-center justify-between"
          >
            <span>ESCORT SPHERE</span>
            <span className="text-[10px] text-blue-400">🛡️ Shield</span>
          </button>

          <button
            onClick={() => dispatchOrder('EMP_DISCHARGE')}
            className="p-2.5 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold rounded-xl transition-all text-left flex items-center justify-between"
          >
            <span>EMP DISCHARGE</span>
            <span className="text-[10px] text-purple-400">💥 Stun</span>
          </button>

          <button
            onClick={() => dispatchOrder('RECON_SWARM')}
            className="p-2.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold rounded-xl transition-all text-left flex items-center justify-between"
          >
            <span>RECON SWARM</span>
            <span className="text-[10px] text-emerald-400">🛰️ Radar</span>
          </button>
        </div>

        {/* Push to Talk Voice Command */}
        <button
          onClick={toggleSpeechRecognition}
          className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 mb-3 ${
            isListening
              ? 'bg-red-600/80 border-red-400 text-white animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.6)]'
              : 'bg-cyan-950/40 hover:bg-cyan-900/60 border-cyan-500/40 text-cyan-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
          </svg>
          {isListening ? 'LISTENING... (SPEAK COMMAND)' : 'AI PUSH-TO-TALK RADIO'}
        </button>

        {transcript && (
          <div className="p-2 bg-black/60 border border-white/10 rounded-lg text-[11px] text-cyan-300 mb-2 truncate">
            &gt; {transcript}
          </div>
        )}

        {/* Fleet Logs Terminal */}
        <div className="h-28 overflow-y-auto space-y-1 p-2 bg-black/60 rounded-xl border border-white/10 text-[10px] text-gray-400 custom-scrollbar">
          {tacticalLog.map(log => (
            <div key={log.id} className="flex gap-2">
              <span className="text-gray-500 font-bold">{log.time}</span>
              <span className="text-gray-300">{log.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TacticalFleetOverlay;
