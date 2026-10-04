import React, { useState, useEffect } from 'react';
// import * as webllm from '@mlc-ai/web-llm';

export const ZeroKnowledgeChat: React.FC = () => {
    const [engine, setEngine] = useState<any | null>(null);
    const [status, setStatus] = useState<string>('Initializing local model... (this may take a few minutes on first load)');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initEngine = async () => {
            try {
                const initProgressCallback = (report: any) => {
                    setStatus(`Loading Model: ${report.text}`);
                };
                // Llama-3-8B-Instruct is highly capable for local processing
                const selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC'; 
                // const newEngine = new webllm.MLCEngine();
                // newEngine.setInitProgressCallback(initProgressCallback);
                // await newEngine.reload(selectedModel);
                // setEngine(newEngine);
                setStatus('Ready! Model loaded entirely in your browser GPU. (MOCK)');
                setIsLoading(false);
                
                // Suppress TS6133 unused variable errors during mock
                console.log(engine, setEngine, initProgressCallback, selectedModel);
            } catch (error) {
                console.error("Error loading web-llm", error);
                setStatus('Error loading model. Check console.');
                setIsLoading(false);
            }
        };
        initEngine();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !engine) return;
        
        const newMessages = [...messages, { role: 'user' as const, content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const reply = await engine.chat.completions.create({
                messages: newMessages
            });
            
            const responseText = reply.choices[0].message.content || '';
            setMessages([...newMessages, { role: 'assistant', content: responseText }]);
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { role: 'assistant', content: 'Error generating response.' }]);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-[600px] border border-emerald-500/30 rounded-xl overflow-hidden bg-slate-900">
            <div className="bg-emerald-950/50 p-4 border-b border-emerald-500/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <h3 className="font-bold text-emerald-50">Zero-Knowledge Mode</h3>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">100% Offline / Local GPU</span>
            </div>
            
            <div className="p-3 text-xs text-center border-b border-slate-800 bg-slate-800/50 text-slate-400">
                {status}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center text-slate-500 mt-10">
                        <p className="mb-2">Your data never leaves your laptop.</p>
                        <p>Upload a sensitive contract to begin.</p>
                    </div>
                )}
                {messages.map((m, i) => (
                    <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-600/20 text-blue-100 ml-auto' : 'bg-slate-800 text-slate-200 mr-auto'}`}>
                        {m.content}
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    disabled={isLoading || !engine}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                    placeholder="Ask a question about your sensitive documents..."
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !engine || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
