'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from '@/components/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';

export function WaiverAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I'm your AI Waiver Wire Assistant. Who are you considering picking up, or what position do you need help with?" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/waivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.success ? data.text : `Error: ${data.error}`
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-4 max-w-4xl mx-auto w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 flex-shrink-0 mt-1">
                  <Bot size={20} className="text-blue-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm px-5 py-3.5 shadow-md' 
                  : 'text-gray-300'
              }`}>
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                ) : (
                  <div className="prose prose-invert prose-blue max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 flex-shrink-0 mt-1">
                  <User size={20} className="text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex gap-4 max-w-4xl mx-auto w-full justify-start"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Sparkles size={16} className="text-blue-400 animate-spin" />
            </div>
            <div className="text-gray-500 flex items-center gap-1.5 px-2">
              <div className="w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-5 bg-[#111111] border-t border-gray-800">
        <div className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about waiver targets..."
            className="w-full bg-[#1a1a1a] text-white rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 border border-gray-800 placeholder:text-gray-600 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
