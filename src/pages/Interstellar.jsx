import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import SettingsModal from '../components/SettingsModal';
import { useAIEngine } from '../hooks/useAIEngine';
import { useMultiplayer } from '../hooks/useMultiplayer';
import HangarBayModal from './interstellar/HangarBayModal';
import TacticalFleetOverlay from './interstellar/TacticalFleetOverlay';
import CombatOverdrive from './interstellar/CombatOverdrive';
import NemesisFleetSystem from './interstellar/NemesisFleetSystem';
import GalacticFactionWars from './interstellar/GalacticFactionWars';
import CitadelBlackMarket from './interstellar/CitadelBlackMarket';
import ShipAestheticsForge from './interstellar/ShipAestheticsForge';
import DerelictAnomalies from './interstellar/DerelictAnomalies';
import AIWingmanStudio from './interstellar/AIWingmanStudio';
import CosmicWeatherRadar from './interstellar/CosmicWeatherRadar';
import StarmapRegistry from './interstellar/StarmapRegistry';
import LeviathanRaids from './interstellar/LeviathanRaids';
import BountyHunterTerminal from './interstellar/BountyHunterTerminal';
import PvPArenaStaking from './interstellar/PvPArenaStaking';
import VoiceCopilotSystem from './interstellar/VoiceCopilotSystem';
import HyperSpaceRifts from './interstellar/HyperSpaceRifts';
import DroneMiningFleet from './interstellar/DroneMiningFleet';
import HoloCinematicDirector from './interstellar/HoloCinematicDirector';
import GalacticArchaeologyCodex from './interstellar/GalacticArchaeologyCodex';
import SectorMissionCreator from './interstellar/SectorMissionCreator';

const Interstellar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCommsOpen, setIsCommsOpen] = useState(false);
    const [isHangarOpen, setIsHangarOpen] = useState(false);
    const [isTacticalOpen, setIsTacticalOpen] = useState(false);
    const [isOverdriveOpen, setIsOverdriveOpen] = useState(false);
    const [isNemesisOpen, setIsNemesisOpen] = useState(false);
    const [isFactionWarsOpen, setIsFactionWarsOpen] = useState(false);
    const [isMarketOpen, setIsMarketOpen] = useState(false);
    const [isAestheticsOpen, setIsAestheticsOpen] = useState(false);
    const [isDerelictOpen, setIsDerelictOpen] = useState(false);
    const [isWingmanOpen, setIsWingmanOpen] = useState(false);
    const [isWeatherOpen, setIsWeatherOpen] = useState(false);
    const [isStarmapOpen, setIsStarmapOpen] = useState(false);
    const [isLeviathanOpen, setIsLeviathanOpen] = useState(false);
    const [isBountyOpen, setIsBountyOpen] = useState(false);
    const [isPvpArenaOpen, setIsPvpArenaOpen] = useState(false);
    const [isVoiceCopilotOpen, setIsVoiceCopilotOpen] = useState(false);
    const [isRiftsOpen, setIsRiftsOpen] = useState(false);
    const [isDroneFleetOpen, setIsDroneFleetOpen] = useState(false);
    const [isCinematicOpen, setIsCinematicOpen] = useState(false);
    const [isArchaeologyOpen, setIsArchaeologyOpen] = useState(false);
    const [isSectorCreatorOpen, setIsSectorCreatorOpen] = useState(false);
    const [aiInput, setAiInput] = useState("");
    const [aiLog, setAiLog] = useState([{ sender: 'AI', text: 'SYSTEM ONLINE. AWAITING INPUT.' }]);
    
    const [isGlobalChatOpen, setIsGlobalChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    
    const { isReady, isGenerating, downloadStatus, generateText } = useAIEngine();
    const logEndRef = useRef(null);
    const iframeRef = useRef(null);

    // Multiplayer Hook
    const handleRemotePlayerUpdate = (playerId, data) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'REMOTE_PLAYER_UPDATE',
                playerId,
                data
            }, '*');
        }
    };

    const handleRemotePlayerLeave = (playerId) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'REMOTE_PLAYER_LEAVE',
                playerId
            }, '*');
        }
    };

    const handleRemoteChatMessage = (playerId, message) => {
        setChatLog(prev => [...prev, { sender: playerId.substring(0,6), text: message }]);
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'REMOTE_PLAYER_CHAT',
                playerId,
                message
            }, '*');
        }
    };

    const handleEnemySync = (enemies) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'SERVER_ENEMY_SYNC',
                enemies
            }, '*');
        }
    };

    const { isConnected, broadcastPosition, broadcastChat } = useMultiplayer('global-space', handleRemotePlayerUpdate, handleRemotePlayerLeave, handleRemoteChatMessage, handleEnemySync);
    // Auto-scroll chat to bottom
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [aiLog]);

    const handleAISubmit = async (e) => {
        e.preventDefault();
        if (!aiInput.trim() || isGenerating || !isReady) return;

        const userText = aiInput.trim();
        setAiInput("");
        setAiLog(prev => [...prev, { sender: 'Player', text: userText }]);

        try {
            const response = await generateText(userText);
            setAiLog(prev => [...prev, { sender: 'AI', text: response }]);
        } catch (err) {
            setAiLog(prev => [...prev, { sender: 'SYS-ERR', text: 'CONNECTION SEVERED.' }]);
        }
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const userText = chatInput.trim();
        setChatInput("");
        setChatLog(prev => [...prev, { sender: 'You', text: userText }]);
        broadcastChat(userText);
        
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'LOCAL_PLAYER_CHAT',
                message: userText
            }, '*');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        const handleIframeMessage = async (event) => {
            if (event.data && event.data.type === 'HAPTIC_IMPACT') {
                try {
                    const styleMap = {
                        'LIGHT': ImpactStyle.Light,
                        'MEDIUM': ImpactStyle.Medium,
                        'HEAVY': ImpactStyle.Heavy
                    };
                    await Haptics.impact({ style: styleMap[event.data.style] || ImpactStyle.Light });
                } catch (e) {
                    console.log('Haptics not available on this platform.', e);
                }
            } else if (event.data && event.data.type === 'HAPTIC_VIBRATE') {
                try {
                    await Haptics.vibrate();
                } catch (e) {
                    console.log('Haptics not available on this platform.', e);
                }
            } else if (event.data && event.data.type === 'PLAYER_POS_UPDATE') {
                // Broadcast local player position to others via Supabase
                broadcastPosition(event.data.data);
            }
        };

        window.addEventListener('message', handleIframeMessage);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('message', handleIframeMessage);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#12141A] to-[#1A1C24] flex items-center justify-center relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-conversion/10 rounded-full blur-[150px] pointer-events-none"></div>
                
                <div className="text-center relative z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-white/60">Loading Interstellar Game...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Interstellar - Aether Map | sentAIent.com</title>
                <meta
                    name="description"
                    content="Aether Map - Pre-Placement Cartographer. An interactive space exploration and mapping game."
                />
                <meta name="keywords" content="interstellar, space game, cartography, interactive map, constellation builder" />
                <meta property="og:title" content="Interstellar - Aether Map | sentAIent" />
                <meta property="og:description" content="Explore the cosmos with Aether Map - an interactive space cartography experience." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Header />

            {/* Fullscreen Game Iframe */}
            <div className="fixed top-0 left-0 w-full h-full" style={{ paddingTop: '60px' }}>
                <iframe
                    ref={iframeRef}
                    src={`/interstellar-game/index.html?v=${Date.now()}`}
                    title="Interstellar Game - Aether Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full"
                    allow="autoplay"
                    style={{ border: 'none', display: 'block' }}
                ></iframe>
                
                {/* AI Comms Overlay */}
                {isCommsOpen && (
                    <div className="absolute top-20 left-4 w-80 bg-black/80 border border-[#00f3ff]/50 rounded-xl backdrop-blur-md z-10 flex flex-col shadow-[0_0_20px_rgba(0,243,255,0.2)] overflow-hidden animate-in slide-in-from-left">
                        <div className="bg-[#00f3ff]/10 p-3 border-b border-[#00f3ff]/30 flex justify-between items-center">
                            <span className="font-exo font-bold text-[#00f3ff] text-sm tracking-widest">
                                {isReady ? 'AI COMMS SECURE' : (downloadStatus || 'INITIALIZING AI...')}
                            </span>
                            <button onClick={() => setIsCommsOpen(false)} className="text-white hover:text-red-400">✕</button>
                        </div>
                        
                        <div className="h-64 p-3 overflow-y-auto space-y-3 font-mono text-sm custom-scrollbar">
                            {aiLog.map((log, i) => (
                                <div key={i} className={`flex flex-col ${log.sender === 'Player' ? 'items-end' : 'items-start'}`}>
                                    <span className={`text-[10px] mb-1 ${log.sender === 'Player' ? 'text-gray-400' : 'text-[#00f3ff]/70'}`}>{log.sender}</span>
                                    <div className={`p-2 rounded-lg max-w-[90%] ${log.sender === 'Player' ? 'bg-white/10 text-white' : 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30'}`}>
                                        {log.text}
                                    </div>
                                </div>
                            ))}
                            {isGenerating && (
                                <div className="text-[#00f3ff] text-xs animate-pulse">&gt; PROCESSING...</div>
                            )}
                            <div ref={logEndRef} />
                        </div>

                        <form onSubmit={handleAISubmit} className="p-2 border-t border-[#00f3ff]/30 flex gap-2">
                            <input 
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                disabled={!isReady || isGenerating}
                                placeholder="Transmit command..."
                                className="flex-1 bg-black/50 border border-white/20 rounded p-2 text-white font-mono text-sm focus:outline-none focus:border-[#00f3ff]"
                            />
                            <button 
                                type="submit"
                                disabled={!isReady || isGenerating || !aiInput.trim()}
                                className="bg-[#00f3ff]/20 hover:bg-[#00f3ff]/40 text-[#00f3ff] px-3 rounded font-bold disabled:opacity-50 transition-colors"
                            >
                                ↑
                            </button>
                        </form>
                    </div>
                )}
                
                {/* Global Chat Overlay */}
                {isGlobalChatOpen && (
                    <div className="absolute bottom-20 left-4 w-80 bg-black/80 border border-[#00ff9d]/50 rounded-xl backdrop-blur-md z-10 flex flex-col shadow-[0_0_20px_rgba(0,255,157,0.2)] overflow-hidden animate-in slide-in-from-bottom">
                        <div className="bg-[#00ff9d]/10 p-3 border-b border-[#00ff9d]/30 flex justify-between items-center">
                            <span className="font-exo font-bold text-[#00ff9d] text-sm tracking-widest">
                                GLOBAL COMM LINK
                            </span>
                            <button onClick={() => setIsGlobalChatOpen(false)} className="text-white hover:text-red-400">✕</button>
                        </div>
                        
                        <div className="h-48 p-3 overflow-y-auto space-y-2 font-mono text-sm custom-scrollbar flex flex-col-reverse">
                            <div className="space-y-2">
                                {chatLog.map((log, i) => (
                                    <div key={i} className={`flex flex-col ${log.sender === 'You' ? 'items-end' : 'items-start'}`}>
                                        <span className={`text-[10px] mb-1 ${log.sender === 'You' ? 'text-gray-400' : 'text-[#00ff9d]/70'}`}>{log.sender}</span>
                                        <div className={`p-2 rounded-lg max-w-[90%] ${log.sender === 'You' ? 'bg-white/10 text-white' : 'bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30'}`}>
                                            {log.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleChatSubmit} className="p-2 border-t border-[#00ff9d]/30 flex gap-2">
                            <input 
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Broadcast message..."
                                className="flex-1 bg-black/50 border border-white/20 rounded p-2 text-white font-mono text-sm focus:outline-none focus:border-[#00ff9d]"
                            />
                            <button 
                                type="submit"
                                disabled={!chatInput.trim()}
                                className="bg-[#00ff9d]/20 hover:bg-[#00ff9d]/40 text-[#00ff9d] px-3 rounded font-bold disabled:opacity-50 transition-colors"
                            >
                                ↑
                            </button>
                        </form>
                    </div>
                )}
                
                {/* HUD Buttons Container */}
                <div className="absolute top-20 right-4 flex flex-col gap-2.5 z-10 max-h-[calc(100vh-100px)] overflow-y-auto pr-1 pb-4 no-scrollbar">
                    {/* Hangar Bay Customization Toggle */}
                    <button 
                        onClick={() => setIsHangarOpen(!isHangarOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isHangarOpen ? 'border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-white/30 text-white hover:border-amber-400/50 hover:text-amber-400'}`}
                        title="Fleet Hangar Bay"
                        aria-label="Fleet Hangar Bay"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><circle cx="12" cy="12" r="2"/></svg>
                    </button>

                    {/* Tactical Fleet Orders Toggle */}
                    <button 
                        onClick={() => setIsTacticalOpen(!isTacticalOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isTacticalOpen ? 'border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-white/30 text-white hover:border-cyan-400/50 hover:text-cyan-400'}`}
                        title="Tactical Fleet Orders"
                        aria-label="Tactical Fleet Orders"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
                    </button>

                    {/* Combat Overdrive & Subsystems Toggle */}
                    <button 
                        onClick={() => setIsOverdriveOpen(!isOverdriveOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isOverdriveOpen ? 'border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'border-white/30 text-white hover:border-rose-400/50 hover:text-rose-400'}`}
                        title="Reflex Overdrive & Subsystems"
                        aria-label="Reflex Overdrive & Subsystems"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
                    </button>

                    {/* Nemesis Fleet Dossier Toggle */}
                    <button 
                        onClick={() => setIsNemesisOpen(!isNemesisOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isNemesisOpen ? 'border-fuchsia-500 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'border-white/30 text-white hover:border-fuchsia-400/50 hover:text-fuchsia-400'}`}
                        title="Nemesis Fleet Dossier"
                        aria-label="Nemesis Fleet Dossier"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </button>

                    {/* Galactic Faction Wars & Time Trials Toggle */}
                    <button 
                        onClick={() => setIsFactionWarsOpen(!isFactionWarsOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isFactionWarsOpen ? 'border-sky-400 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]' : 'border-white/30 text-white hover:border-sky-400/50 hover:text-sky-400'}`}
                        title="Galactic Faction Wars & Time Trials"
                        aria-label="Galactic Faction Wars & Time Trials"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    </button>

                    {/* Orbital Citadel & Black Market Toggle */}
                    <button 
                        onClick={() => setIsMarketOpen(!isMarketOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isMarketOpen ? 'border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-white/30 text-white hover:border-emerald-400/50 hover:text-emerald-400'}`}
                        title="Orbital Citadel & Black Market"
                        aria-label="Orbital Citadel & Black Market"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><line x1="3" y1="3" x2="6" y2="6"/><line x1="21" y1="3" x2="18" y2="6"/><line x1="3" y1="21" x2="6" y2="18"/><line x1="21" y1="21" x2="18" y2="18"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    </button>

                    {/* Ship Aesthetics Forge Toggle */}
                    <button 
                        onClick={() => setIsAestheticsOpen(!isAestheticsOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isAestheticsOpen ? 'border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/30 text-white hover:border-purple-400/50 hover:text-purple-400'}`}
                        title="Ship Aesthetics & Vanity Forge"
                        aria-label="Ship Aesthetics & Vanity Forge"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>

                    {/* Deep Space Anomalies Toggle */}
                    <button 
                        onClick={() => setIsDerelictOpen(!isDerelictOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isDerelictOpen ? 'border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'border-white/30 text-white hover:border-amber-400/50 hover:text-amber-400'}`}
                        title="Derelict Anomalies & Cryptography"
                        aria-label="Derelict Anomalies & Cryptography"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                    </button>

                    {/* AI Wingman Studio Toggle */}
                    <button 
                        onClick={() => setIsWingmanOpen(!isWingmanOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isWingmanOpen ? 'border-cyan-300 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-white/30 text-white hover:border-cyan-300/50 hover:text-cyan-300'}`}
                        title="Autonomous AI Wingman"
                        aria-label="Autonomous AI Wingman"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8 15h8"/></svg>
                    </button>

                    {/* Cosmic Weather Radar Toggle */}
                    <button 
                        onClick={() => setIsWeatherOpen(!isWeatherOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isWeatherOpen ? 'border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'border-white/30 text-white hover:border-yellow-400/50 hover:text-yellow-400'}`}
                        title="Cosmic Weather & Solar Hazards"
                        aria-label="Cosmic Weather & Solar Hazards"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    </button>

                    {/* Galactic Star Charter Toggle */}
                    <button 
                        onClick={() => setIsStarmapOpen(!isStarmapOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isStarmapOpen ? 'border-sky-400 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'border-white/30 text-white hover:border-sky-400/50 hover:text-sky-400'}`}
                        title="Star Charter & Waypoints"
                        aria-label="Star Charter & Waypoints"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                    </button>

                    {/* Leviathan World Boss Raids Toggle */}
                    <button 
                        onClick={() => setIsLeviathanOpen(!isLeviathanOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isLeviathanOpen ? 'border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'border-white/30 text-white hover:border-red-400/50 hover:text-red-400'}`}
                        title="Galactic Leviathan World Boss Raids"
                        aria-label="Galactic Leviathan World Boss Raids"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </button>

                    {/* Bounty Hunter Guild Toggle */}
                    <button 
                        onClick={() => setIsBountyOpen(!isBountyOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isBountyOpen ? 'border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'border-white/30 text-white hover:border-orange-400/50 hover:text-orange-400'}`}
                        title="Bounty Hunter Contracts"
                        aria-label="Bounty Hunter Contracts"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m14 12-4-4"/><path d="m10 12 4 4"/></svg>
                    </button>

                    {/* 1v1 Staked PvP Duel Arena Toggle */}
                    <button 
                        onClick={() => setIsPvpArenaOpen(!isPvpArenaOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isPvpArenaOpen ? 'border-fuchsia-400 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'border-white/30 text-white hover:border-fuchsia-400/50 hover:text-fuchsia-400'}`}
                        title="1v1 Staked Winner-Take-All Arena"
                        aria-label="1v1 Staked Winner-Take-All Arena"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="m9.5 6.5 11.5 11.5V21h-3L6.5 9.5"/><path d="m11 5-6 6"/><path d="M8 8 4 4"/><path d="M5 3 3 5"/></svg>
                    </button>

                    {/* Live Voice Copilot Toggle */}
                    <button 
                        onClick={() => setIsVoiceCopilotOpen(!isVoiceCopilotOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isVoiceCopilotOpen ? 'border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-white/30 text-white hover:border-cyan-400/50 hover:text-cyan-400'}`}
                        title="Hands-Free Voice Copilot"
                        aria-label="Hands-Free Voice Copilot"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    </button>

                    {/* Hyper-Space Rift Roguelite Runs Toggle */}
                    <button 
                        onClick={() => setIsRiftsOpen(!isRiftsOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isRiftsOpen ? 'border-violet-400 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'border-white/30 text-white hover:border-violet-400/50 hover:text-violet-400'}`}
                        title="Hyper-Space Rift Runs (Roguelite)"
                        aria-label="Hyper-Space Rift Runs (Roguelite)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                    </button>

                    {/* Autonomous Drone Mining Fleet Toggle */}
                    <button 
                        onClick={() => setIsDroneFleetOpen(!isDroneFleetOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isDroneFleetOpen ? 'border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-white/30 text-white hover:border-emerald-400/50 hover:text-emerald-400'}`}
                        title="Autonomous Drone Mining Fleet"
                        aria-label="Autonomous Drone Mining Fleet"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 18 3-3-3-3"/><path d="m14 15-3-3-3 3"/><path d="M4 22h16a2 2 0 0 0 2-2V7.5L14.5 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/></svg>
                    </button>

                    {/* Holo-Cinematic Director Mode Toggle */}
                    <button 
                        onClick={() => setIsCinematicOpen(!isCinematicOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isCinematicOpen ? 'border-pink-400 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'border-white/30 text-white hover:border-pink-400/50 hover:text-pink-400'}`}
                        title="Holo-Cinematic Photo & Video Director"
                        aria-label="Holo-Cinematic Photo & Video Director"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    </button>

                    {/* Galactic Archaeology Codex Toggle */}
                    <button 
                        onClick={() => setIsArchaeologyOpen(!isArchaeologyOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isArchaeologyOpen ? 'border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'border-white/30 text-white hover:border-amber-400/50 hover:text-amber-400'}`}
                        title="Galactic Archaeology & Audio Codex"
                        aria-label="Galactic Archaeology & Audio Codex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                    </button>

                    {/* Sector Mission Creator Toggle */}
                    <button 
                        onClick={() => setIsSectorCreatorOpen(!isSectorCreatorOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isSectorCreatorOpen ? 'border-teal-400 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'border-white/30 text-white hover:border-teal-400/50 hover:text-teal-400'}`}
                        title="Sector Mission Creator & Seed Maker"
                        aria-label="Sector Mission Creator & Seed Maker"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </button>

                    {/* Comms Button Toggle */}
                    <button 
                        onClick={() => setIsCommsOpen(!isCommsOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isCommsOpen ? 'border-[#00f3ff] text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'border-white/30 text-white hover:border-[#00f3ff]/50 hover:text-[#00f3ff]'}`}
                        title="AI Comms"
                        aria-label="AI Comms"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </button>

                    {/* Global Chat Toggle */}
                    <button 
                        onClick={() => setIsGlobalChatOpen(!isGlobalChatOpen)}
                        className={`p-3 bg-black/50 border rounded-full transition-all backdrop-blur-sm shadow-lg ${isGlobalChatOpen ? 'border-[#00ff9d] text-[#00ff9d] shadow-[0_0_15px_rgba(0,255,157,0.4)]' : 'border-white/30 text-white hover:border-[#00ff9d]/50 hover:text-[#00ff9d]'}`}
                        title="Global Chat"
                        aria-label="Global Chat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </button>

                    {/* Settings Button Overlay */}
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-3 bg-black/50 border border-white/30 rounded-full hover:border-[#00f3ff]/50 hover:text-[#00f3ff] text-white transition-all backdrop-blur-sm shadow-lg"
                        aria-label="Settings"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
                
                {/* Modals & Overlays */}
                <HangarBayModal 
                    isOpen={isHangarOpen} 
                    onClose={() => setIsHangarOpen(false)} 
                    onApplyLoadout={(loadout) => {
                        if (iframeRef.current && iframeRef.current.contentWindow) {
                            iframeRef.current.contentWindow.postMessage({
                                type: 'APPLY_LOADOUT',
                                loadout
                            }, '*');
                        }
                    }} 
                />
                
                <TacticalFleetOverlay 
                    isOpen={isTacticalOpen} 
                    onClose={() => setIsTacticalOpen(false)} 
                    iframeRef={iframeRef} 
                />

                <CombatOverdrive
                    isOpen={isOverdriveOpen}
                    onClose={() => setIsOverdriveOpen(false)}
                    iframeRef={iframeRef}
                />

                <NemesisFleetSystem
                    isOpen={isNemesisOpen}
                    onClose={() => setIsNemesisOpen(false)}
                    iframeRef={iframeRef}
                />

                <GalacticFactionWars
                    isOpen={isFactionWarsOpen}
                    onClose={() => setIsFactionWarsOpen(false)}
                    iframeRef={iframeRef}
                />

                <CitadelBlackMarket
                    isOpen={isMarketOpen}
                    onClose={() => setIsMarketOpen(false)}
                    onCreditsAwarded={(credits) => {
                        console.log(`[Interstellar Economy] Credits deposited: +${credits}`);
                    }}
                />

                <ShipAestheticsForge
                    isOpen={isAestheticsOpen}
                    onClose={() => setIsAestheticsOpen(false)}
                    iframeRef={iframeRef}
                />

                <DerelictAnomalies
                    isOpen={isDerelictOpen}
                    onClose={() => setIsDerelictOpen(false)}
                    iframeRef={iframeRef}
                />

                <AIWingmanStudio
                    isOpen={isWingmanOpen}
                    onClose={() => setIsWingmanOpen(false)}
                    iframeRef={iframeRef}
                />

                <CosmicWeatherRadar
                    isOpen={isWeatherOpen}
                    onClose={() => setIsWeatherOpen(false)}
                    iframeRef={iframeRef}
                />

                <StarmapRegistry
                    isOpen={isStarmapOpen}
                    onClose={() => setIsStarmapOpen(false)}
                    iframeRef={iframeRef}
                />

                <LeviathanRaids
                    isOpen={isLeviathanOpen}
                    onClose={() => setIsLeviathanOpen(false)}
                    iframeRef={iframeRef}
                />

                <BountyHunterTerminal
                    isOpen={isBountyOpen}
                    onClose={() => setIsBountyOpen(false)}
                    iframeRef={iframeRef}
                />

                <PvPArenaStaking
                    isOpen={isPvpArenaOpen}
                    onClose={() => setIsPvpArenaOpen(false)}
                    iframeRef={iframeRef}
                    onPurseWon={(purse) => {
                        console.log(`[Gladiator Arena] Winner-Take-All purse awarded: +${purse}`);
                    }}
                />

                <VoiceCopilotSystem
                    isOpen={isVoiceCopilotOpen}
                    onClose={() => setIsVoiceCopilotOpen(false)}
                    iframeRef={iframeRef}
                />

                <HyperSpaceRifts
                    isOpen={isRiftsOpen}
                    onClose={() => setIsRiftsOpen(false)}
                    iframeRef={iframeRef}
                    onLootExtracted={(shards) => {
                        console.log(`[Rift Run] Shards extracted: +${shards}`);
                    }}
                />

                <DroneMiningFleet
                    isOpen={isDroneFleetOpen}
                    onClose={() => setIsDroneFleetOpen(false)}
                    iframeRef={iframeRef}
                    onCargoCollected={(cargo) => {
                        console.log(`[Mining Fleet] Cargo bay collected: +${cargo}`);
                    }}
                />

                <HoloCinematicDirector
                    isOpen={isCinematicOpen}
                    onClose={() => setIsCinematicOpen(false)}
                    iframeRef={iframeRef}
                />

                <GalacticArchaeologyCodex
                    isOpen={isArchaeologyOpen}
                    onClose={() => setIsArchaeologyOpen(false)}
                    iframeRef={iframeRef}
                />

                <SectorMissionCreator
                    isOpen={isSectorCreatorOpen}
                    onClose={() => setIsSectorCreatorOpen(false)}
                    iframeRef={iframeRef}
                />

                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            </div>
        </>
    );
};

export default Interstellar;
