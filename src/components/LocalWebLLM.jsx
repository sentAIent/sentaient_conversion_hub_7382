import React, { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';

export default function LocalWebLLM() {
    const [engine, setEngine] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState('Initialize Local WebGPU Engine');
    
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const initEngine = async () => {
        setLoading(true);
        try {
            const selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC';
            const initProgressCallback = (report) => {
                setProgress(Math.round(report.progress * 100));
                setProgressText(report.text);
            };
            
            const newEngine = await CreateMLCEngine(selectedModel, { initProgressCallback });
            setEngine(newEngine);
            setMessages([{ role: 'assistant', content: "Neural core online. All processing is happening locally on your GPU. How can I assist you today?" }]);
        } catch (error) {
            console.error(error);
            setProgressText('Error initializing WebLLM. Check console.');
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !engine || isGenerating) return;

        const userMsg = { role: 'user', content: input };
        const newHistory = [...messages, userMsg];
        
        setMessages(newHistory);
        setInput('');
        setIsGenerating(true);

        try {
            const chunks = await engine.chat.completions.create({
                messages: newHistory,
                stream: true,
            });

            let reply = "";
            setMessages([...newHistory, { role: 'assistant', content: "" }]);

            for await (const chunk of chunks) {
                reply += chunk.choices[0]?.delta?.content || "";
                setMessages([...newHistory, { role: 'assistant', content: reply }]);
            }
        } catch (err) {
            console.error("Chat error:", err);
            setMessages([...newHistory, { role: 'assistant', content: "An error occurred during generation." }]);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-2xl overflow-hidden font-sans border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-3 text-xs font-medium text-neutral-400">WebGPU Local AI</span>
                </div>
                {engine && (
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-[10px] uppercase font-mono text-emerald-400">Online</span>
                    </div>
                )}
            </div>

            {!engine ? (
                <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6"
                    >
                        <Icon name="Cpu" size={40} className="text-white" />
                    </motion.div>
                    
                    <h4 className="text-xl text-white font-semibold mb-2">Local Neural Core</h4>
                    <p className="text-sm text-neutral-400 max-w-sm mb-8 leading-relaxed">
                        Run Llama-3 entirely in your browser using WebGPU. Zero latency, infinite privacy. Your data never leaves this device.
                    </p>
                    
                    <button 
                        onClick={initEngine} 
                        disabled={loading}
                        className={`group relative px-6 py-3 rounded-full text-sm font-medium transition-all overflow-hidden ${
                            loading 
                                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                                : 'bg-white text-black hover:scale-105'
                        }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {loading ? (
                                <>
                                    <Icon name="Loader" size={16} className="animate-spin" />
                                    Downloading Weights...
                                </>
                            ) : (
                                <>
                                    <Icon name="Zap" size={16} />
                                    Initialize Core (4GB)
                                </>
                            )}
                        </span>
                        {!loading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </button>
                    
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-xs mt-8 space-y-3"
                        >
                            <div className="flex justify-between text-xs font-mono text-neutral-400">
                                <span>{progressText}</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </motion.div>
                    )}
                </div>
            ) : (
                <>
                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <AnimatePresence>
                            {messages.map((msg, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                                            <Icon name="Bot" size={14} className="text-white" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-4 text-sm leading-relaxed ${
                                        msg.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md' 
                                            : 'bg-white/5 border border-white/10 text-neutral-200 rounded-2xl rounded-tl-sm'
                                    }`}>
                                        {msg.content || (msg.role === 'assistant' && (
                                            <span className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isGenerating}
                                placeholder="Message the local Neural Core..."
                                className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isGenerating}
                                className="absolute right-2 p-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors disabled:bg-neutral-800 disabled:text-neutral-500"
                            >
                                <Icon name="Send" size={14} />
                            </button>
                        </form>
                        <div className="mt-2 text-center">
                            <span className="text-[10px] text-neutral-500 font-mono">WebGPU INFERENCE ACTIVE • 0ms NETWORK LATENCY</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
