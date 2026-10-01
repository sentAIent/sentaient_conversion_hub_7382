import React, { useState, useRef, useEffect } from 'react';
import { semanticNavigator } from '../services/SemanticNavigator';
import { useScreenpipe } from '../hooks/useScreenpipe';

export const AIConcierge = () => {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "I am the Sentaient Ship AI. Where would you like to navigate, or what do you need assistance with?" }
    ]);
    const messagesEndRef = useRef(null);
    
    // Screenpipe integration
    const { isConnected, getRecentContext } = useScreenpipe();

    // Map targets to scroll positions based on TimelineManager SCROLL_TIMELINE
    const targetMap = {
        "hero": 0,
        "services": 0.42, // Interstellar / Services area
        "portfolio": 0.24, // Icebreaker / Portfolio area
        "about": 0.60, // Orbital Command / About area
        "pricing": 0.84, // Fantasy Quant area
        "contact": 0.94 // Contango / Contact area
    };

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isProcessing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userQuery = input.trim();
        setInput('');
        setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
        setIsProcessing(true);

        let enrichedInput = userQuery;
        let screenTextContext = [];

        if (isConnected) {
            try {
                const context = await getRecentContext(2); // last 2 minutes
                if (context && context.data && context.data.length > 0) {
                    const screenText = context.data
                        .filter(item => item.type === 'OCR' || item.type === 'Audio')
                        .map(item => item.content.text)
                        .join(' ')
                        .substring(0, 1000); 
                    
                    if (screenText) {
                        screenTextContext = [screenText];
                        enrichedInput = `User Input: "${userQuery}"\n\n[System Note: The user's screen currently shows this text: "${screenText}"]`;
                    }
                }
            } catch (err) {
                console.warn("Failed to get Screenpipe context", err);
            }
        }

        // 1. Attempt Semantic Navigation
        const navResult = await semanticNavigator.getDestination(enrichedInput);
        
        // High confidence navigation
        if (navResult.target && targetMap[navResult.target] !== undefined && navResult.confidence > 0.6) {
            setMessages(prev => [...prev, { sender: 'ai', text: `Navigating to ${navResult.target}...` }]);
            
            // Dispatch a custom event so the 3D scene can handle the scroll
            const targetOffset = targetMap[navResult.target];
            window.dispatchEvent(new CustomEvent('ai-navigate', { detail: { offset: targetOffset } }));
            setIsProcessing(false);
            return;
        }

        // 2. Fallback to AI Companion Chat for general lore, assistance, or low-confidence nav
        try {
            const response = await fetch('/api/ai-companion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: userQuery,
                    screenpipeContext: screenTextContext
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to communicate with Ship AI.');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
            
        } catch (err) {
            console.error('AI Companion Error:', err);
            setMessages(prev => [...prev, { sender: 'system', text: err.message, isError: true }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="absolute bottom-10 left-10 w-96 p-4 bg-[#050505]/90 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-[0_0_30px_rgba(0,255,68,0.1)] pointer-events-auto flex flex-col h-[32rem]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`} title={isConnected ? 'Screenpipe Connected' : 'Screenpipe Offline'}></div>
                    <h3 className="text-white font-mono tracking-widest text-sm font-bold uppercase">Ship AI Co-Pilot</h3>
                </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-xl p-3 text-sm font-light ${
                            msg.sender === 'user' 
                                ? 'bg-green-600/20 text-green-100 border border-green-500/30 rounded-tr-none' 
                                : msg.isError 
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-tl-none'
                                    : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isProcessing && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none p-3 flex gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Command or Navigate..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                    disabled={isProcessing}
                />
                <button 
                    type="submit"
                    disabled={isProcessing || !input.trim()}
                    className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
                >
                    SEND
                </button>
            </form>
        </div>
    );
};
