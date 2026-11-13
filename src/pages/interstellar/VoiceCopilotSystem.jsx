import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const VoiceCopilotSystem = ({ isOpen, onClose, iframeRef }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [copilotReply, setCopilotReply] = useState('Voice telemetry linked. Say "Status report", "Divert shields", or "Scan sector".');
  const [voiceVolume, setVoiceVolume] = useState(90);
  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);

  // Warm Human Speech Synthesizer
  const speakHuman = (text) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.02; // Natural conversational tempo
        utterance.pitch = 1.0; // Natural human pitch
        utterance.volume = voiceVolume / 100;

        const voices = window.speechSynthesis.getVoices();
        // Priority filter for natural human neural voice models
        const humanVoice = voices.find(v => 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel') || v.name.includes('Victoria')) &&
          !v.name.toLowerCase().includes('robot')
        ) || voices.find(v => v.lang.startsWith('en'));

        if (humanVoice) utterance.voice = humanVoice;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  // Simulated Voice Waveform Animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.beginPath();
      ctx.strokeStyle = isListening ? '#00f3ff' : '#a855f7';
      ctx.lineWidth = 2.5;

      const amp = isListening ? 22 : 8;
      for (let x = 0; x < w; x++) {
        const y = cy + Math.sin(x * 0.04 + phase) * Math.cos(x * 0.02 + phase) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isListening ? 0.08 : 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isListening]);

  // Speech Recognition Setup
  const toggleListening = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (e) {}

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser engine. You can type instructions or use the quick buttons below.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
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
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        processVoiceCommand(spokenText);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Process Natural Voice Commands
  const processVoiceCommand = (commandText) => {
    const text = commandText.toLowerCase();
    let reply = '';
    let actionType = 'VOICE_COMMAND';

    if (text.includes('divert') || text.includes('shield')) {
      reply = 'Understood, Commander. Diverting secondary capacitors to forward shields now.';
      actionType = 'DIVERT_SHIELDS';
    } else if (text.includes('scan') || text.includes('sensor')) {
      reply = 'Running deep-spectrum sensor sweep. Detecting two mineral clusters and an anomalous derelict signature.';
      actionType = 'SCAN_SECTOR';
    } else if (text.includes('status') || text.includes('report')) {
      reply = 'All flight systems operational. Shields at full capacity, warp drives charged, and ammunition reserves green.';
      actionType = 'STATUS_REPORT';
    } else if (text.includes('lock') || text.includes('target') || text.includes('bandit')) {
      reply = 'Target locked on lead hostile signature. Firing solution computed.';
      actionType = 'LOCK_TARGET';
    } else if (text.includes('afterburner') || text.includes('speed') || text.includes('thrust')) {
      reply = 'Opening impulse nozzles. Afterburners ignited!';
      actionType = 'ENGAGE_AFTERBURNER';
    } else {
      reply = `Command received: "${commandText}". Processing tactical neural vectors across the fleet.`;
    }

    setCopilotReply(reply);
    speakHuman(reply);

    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'ONBOARD_VOICE_COMMAND',
        action: actionType,
        rawText: commandText
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
          className="relative w-full max-w-2xl bg-neutral-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-cyan-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎙️</span>
              <div>
                <h2 className="text-lg font-black tracking-wider text-cyan-300 font-mono">
                  A.E.T.H.E.R. // LIVE BIDIRECTIONAL VOICE COPILOT
                </h2>
                <p className="text-xs text-cyan-400/70 font-mono">
                  Hands-Free Neural Voice Agent • Natural Human Inflection • Instant Ship Control
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
          <div className="p-6 space-y-6">
            {/* Waveform Canvas */}
            <div className="relative w-full h-24 bg-black/70 border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} width={500} height={96} className="w-full h-full" />
              <div className="absolute top-2 left-3 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-cyan-400 animate-ping' : 'bg-purple-400'}`} />
                {isListening ? 'LISTENING TO PILOT AUDIO...' : 'HUMAN VOICE SYNTHESIZER READY'}
              </div>
            </div>

            {/* Live Copilot Dialogue Box */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-cyan-500/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">A.E.T.H.E.R. Flight Officer (Voice):</span>
                <span className="text-neutral-500 font-normal">Natural Human Neural Audio</span>
              </div>
              <p className="text-sm text-white font-mono leading-relaxed">{copilotReply}</p>
              {transcript && (
                <div className="text-[11px] font-mono text-neutral-400 pt-1 border-t border-neutral-800/60">
                  Heard: <span className="text-cyan-300 italic">"{transcript}"</span>
                </div>
              )}
            </div>

            {/* Voice Push-To-Talk Action Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={toggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.6)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                }`}
              >
                {isListening ? '🛑' : '🎙️'}
              </button>
              <span className="text-xs font-mono text-neutral-400">
                {isListening ? 'Tap to finish speaking' : 'Tap to speak commands hands-free'}
              </span>
            </div>

            {/* Quick Voice Command Triggers */}
            <div>
              <div className="text-xs font-mono text-neutral-400 mb-2 uppercase">
                Quick Verbal Presets (Test Natural Audio):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Divert shields',
                  'Scan sector',
                  'Status report',
                  'Lock on target'
                ].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setTranscript(cmd);
                      processVoiceCommand(cmd);
                    }}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 hover:text-white text-center"
                  >
                    "{cmd}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VoiceCopilotSystem;
