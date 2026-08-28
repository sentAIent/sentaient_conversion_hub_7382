import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import SettingsModal from '../components/SettingsModal';
import { useAIEngine } from '../hooks/useAIEngine';
import { useMultiplayer } from '../hooks/useMultiplayer';

const Interstellar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCommsOpen, setIsCommsOpen] = useState(false);
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
                <div className="absolute top-20 right-4 flex flex-col gap-3 z-10">
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
                
                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            </div>
        </>
    );
};

export default Interstellar;
