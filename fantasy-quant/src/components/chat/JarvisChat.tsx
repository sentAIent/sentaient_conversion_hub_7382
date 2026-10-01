'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, X, MessageSquare, Terminal, RefreshCw, Sparkles, User, Play, Database
} from '@/components/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


interface ChatMessage {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  tool?: string;
  widget?: any;
  methodologiesApplied?: string[];
}

export default function JarvisChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'jarvis',
      text: "Hello! I am J.A.R.V.I.S., your Quant-as-a-Service assistant. Ask me to query player values, look up coaching systems, or run GPP lineup optimizations."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/quant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const json = await res.json();
      if (json.success) {
        const jarvisMsg: ChatMessage = {
          id: "msg_" + Math.random().toString(36).substring(2, 9),
          sender: 'jarvis',
          text: json.text,
          tool: json.tool,
          widget: json.widget
        };
        setMessages(prev => [...prev, jarvisMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(inputText);
    }
  };

  const quickPrompts = [
    { label: "Show value QBs", text: "Show the top value QBs in projections" },
    { label: "Optimize roster", text: "Optimize a GPP stacked roster lineup" },
    { label: "Coaching schemes", text: "Explain team coaching schemes" }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center border border-indigo-400/20 group hover:scale-105"
        title="Toggle J.A.R.V.I.S. AI Chat"
      >
        <Bot size={22} className="group-hover:rotate-6 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-24 group-hover:ml-2 text-xs font-black uppercase tracking-widest transition-all duration-300">
          J.A.R.V.I.S.
        </span>
      </button>

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 right-0 h-screen w-96 bg-gray-950/95 backdrop-blur-md border-l border-gray-850 z-50 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-850 flex justify-between items-center bg-gray-900/50">
          <div className="flex items-center gap-2">
            <Bot className="text-indigo-400" size={18} />
            <span className="font-black text-sm uppercase tracking-wider bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">J.A.R.V.I.S. AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            
            return (
              <div key={msg.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && <Bot size={24} className="text-indigo-400 mt-1 shrink-0 bg-indigo-500/10 p-1 rounded-lg h-7 w-7" />}
                
                <div className="max-w-[80%] space-y-2">
                  <div className={`p-3 rounded-2xl leading-relaxed text-gray-300 ${
                    isUser 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-900 border border-gray-850 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Tool invocation badge */}
                  {msg.tool && (
                    <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-indigo-400 font-bold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 w-fit">
                      <Terminal size={10} /> Tool: {msg.tool}()
                    </div>
                  )}

                  {/* Render Custom Widget Elements */}
                  {msg.widget && msg.widget.type === 'projections' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase font-black">Projections Result</div>
                      <div className="space-y-1.5">
                        {msg.widget.players.map((p: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center border-b border-gray-900 pb-1 text-[11px]">
                            <span className="font-bold text-white">{p.name}</span>
                            <span className="font-mono text-gray-400">{p.pts.toFixed(2)} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.widget && msg.widget.type === 'coaches' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase font-black font-black">Coaching Catalogs</div>
                      <div className="space-y-2">
                        {msg.widget.coaches.map((c: any, idx: number) => (
                          <div key={idx} className="border-b border-gray-900 pb-1.5 space-y-0.5 text-[10px]">
                            <div className="font-bold text-indigo-400">{c.team} HC: {c.hc}</div>
                            <div className="text-gray-500">Scheme: {c.scheme}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.widget && msg.widget.type === 'lineup' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase font-black">
                        <span>Optimized Roster</span>
                        <span className="text-green-400 font-mono">{msg.widget.projectedScore} Pts</span>
                      </div>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {msg.widget.lineup.map((l: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-[10px] py-0.5 border-b border-gray-900">
                            <span className="text-gray-400 font-bold w-8">{l.pos}</span>
                            <span className="text-white flex-1 truncate">{l.name}</span>
                            <span className="font-mono text-gray-500">${l.salary}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.widget && msg.widget.type === 'player_combine_stats' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase font-black">Combine Stats</div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {msg.widget.data.map((stat: any, idx: number) => (
                          <React.Fragment key={idx}>
                            <div className="col-span-2 font-bold text-indigo-400 border-b border-gray-900 pb-1 mt-1">Player Profile</div>
                            {Object.entries(stat).map(([k, v]: [string, any]) => {
                               if(k === 'id' || k === 'player_id' || k === 'created_at') return null;
                               return (
                                 <div key={k} className="flex justify-between">
                                   <span className="text-gray-400 capitalize">{k.replace(/_/g, ' ')}</span>
                                   <span className="text-white font-mono">{v}</span>
                                 </div>
                               );
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.widget && msg.widget.type === 'offensive_tendencies' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase font-black">Offensive Tendencies</div>
                      <div className="space-y-2 text-[10px]">
                        {msg.widget.data.map((teamData: any, idx: number) => (
                          <div key={idx} className="border-b border-gray-900 pb-1">
                            <div className="font-bold text-amber-400 mb-1">{teamData.team} ({teamData.season})</div>
                            <div className="grid grid-cols-2 gap-1">
                              <span className="text-gray-400">Run %:</span><span className="text-white font-mono">{teamData.run_percent}%</span>
                              <span className="text-gray-400">Pass %:</span><span className="text-white font-mono">{teamData.pass_percent}%</span>
                              <span className="text-gray-400">Pace:</span><span className="text-white font-mono">{teamData.pace_seconds_per_play}s/play</span>
                            </div>
                            <div className="mt-2 text-[9px] text-gray-500 uppercase font-bold border-t border-gray-800 pt-1">Target Shares</div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1">
                              <span className="text-gray-400 flex justify-between">WR1: <span className="text-white font-mono">{teamData.wr1_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">WR2: <span className="text-white font-mono">{teamData.wr2_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">WR3: <span className="text-white font-mono">{teamData.wr3_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">WR4: <span className="text-white font-mono">{teamData.wr4_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">RB1: <span className="text-white font-mono">{teamData.rb1_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">RB2: <span className="text-white font-mono">{teamData.rb2_target_share || 0}%</span></span>
                              <span className="text-gray-400 flex justify-between">TE1: <span className="text-white font-mono">{teamData.te1_target_share || 0}%</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.widget && msg.widget.type === 'historical_stats' && (
                    <div className="bg-gray-950 border border-gray-850 rounded-xl p-3 space-y-2">
                      <div className="text-[10px] text-gray-500 uppercase font-black">Historical Stats</div>
                      <div className="space-y-2 text-[10px]">
                        {msg.widget.data.map((stat: any, idx: number) => (
                          <div key={idx} className="border-b border-gray-900 pb-1">
                            <div className="font-bold text-green-400 mb-1">{stat.team_name} ({stat.level_of_play} - {stat.season})</div>
                            <div className="grid grid-cols-2 gap-1">
                              <span className="text-gray-400">Pass Yds:</span><span className="text-white font-mono">{stat.pass_yards}</span>
                              <span className="text-gray-400">Rush Yds:</span><span className="text-white font-mono">{stat.rush_yards}</span>
                              <span className="text-gray-400">Rec Yds:</span><span className="text-white font-mono">{stat.rec_yards}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {isUser && <User size={24} className="text-blue-400 mt-1 shrink-0 bg-blue-500/10 p-1 rounded-lg h-7 w-7" />}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2 justify-start items-center text-gray-500 text-[10px]">
              <RefreshCw size={12} className="animate-spin text-indigo-400" /> J.A.R.V.I.S. is calling tools...
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Quick action triggers */}
        <div className="p-3 bg-gray-900/30 border-t border-gray-850 space-y-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(qp.text)}
                className="shrink-0 px-2.5 py-1 bg-gray-900 hover:bg-gray-800 border border-gray-850 rounded-lg text-[9px] text-gray-400 hover:text-white transition-all flex items-center gap-1"
              >
                <Sparkles size={10} className="text-amber-400" /> {qp.label}
              </button>
            ))}
          </div>

          {/* Text Input area */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask J.A.R.V.I.S...."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500/50"
            />
            <button
              onClick={() => sendMessage(inputText)}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all"
            >
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
