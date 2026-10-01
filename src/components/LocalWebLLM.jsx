import React, { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
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

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const initEngine = async () => {
        setLoading(true);
        try {
            // Llama-3-8B-Instruct-q4f32_1-MLC is the standard recommended model
            const selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC';
            
            const initProgressCallback = (report) => {
                setProgress(Math.round(report.progress * 100));
                setProgressText(report.text);
            };

            const mlcEngine = await CreateMLCEngine(selectedModel, {
                initProgressCallback
            });
            
            setEngine(mlcEngine);
            setMessages([{ role: 'assistant', content: 'Hello! I am running entirely in your browser via WebGPU. Your data never leaves this device.' }]);
        } catch (err) {
            console.error(err);
            setProgressText('Failed to initialize WebGPU (Does your browser support it?)');
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !engine || isGenerating) return;
        
        const userMsg = { role: 'user', content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsGenerating(true);

        try {
            // Create a placeholder for the assistant's response
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
            
            const chunks = await engine.chat.completions.create({
                messages: updatedMessages,
                stream: true,
            });

            let fullReply = '';
            for await (const chunk of chunks) {
                const text = chunk.choices[0]?.delta?.content || '';
                fullReply += text;
                
                // Update the last message
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = fullReply;
                    return newMsgs;
                });
            }
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error generating response.' }]);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900/50 rounded-xl overflow-hidden font-sans">
            {!engine ? (
                <div className="flex flex-col items-center justify-center flex-1 p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Icon name="Cpu" size={32} className="text-white" />
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-bold mb-1">Local WebGPU Sandbox</h4>
                        <p className="text-xs text-slate-400 max-w-xs">Download and run a complete Llama-3 AI model directly in your browser. No API keys, absolute privacy.</p>
                    </div>
                    
                    <button 
                        onClick={initEngine} 
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${loading ? 'bg-slate-800 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                        {loading ? 'Downloading Weights...' : 'Load Local Llama-3 (4GB)'}
                    </button>
                    
                    {loading && (
                        <div className="w-full max-w-xs space-y-2">
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono truncate">{progressText}</p>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'}`}>
                                    {msg.content || (msg.role === 'assistant' && <span className="animate-pulse">...</span>)}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Input Box */}
                    <div className="p-3 bg-slate-900 border-t border-slate-800">
                        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 focus-within:border-indigo-500/50">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Message local agent..."
                                className="flex-1 bg-transparent border-none text-sm text-slate-200 focus:outline-none px-2"
                                disabled={isGenerating}
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isGenerating}
                                className="p-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-800"
                            >
                                <Icon name="Send" size={14} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[9px] text-slate-500">Running Llama-3-8B locally via WebGPU</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
