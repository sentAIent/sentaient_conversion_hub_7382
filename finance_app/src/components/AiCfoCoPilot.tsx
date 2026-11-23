"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, ChevronRight, CheckCircle2, ShieldCheck, TrendingUp, AlertTriangle, RefreshCw, Download, FileText, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  toolName?: string;
  toolResult?: any;
  timestamp: string;
}

export default function AiCfoCoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Greetings. I am your Liquid Autonomous CFO Co-Pilot, directly wired to all 18 institutional engines (Monte Carlo Runway, 409A/83(b), Treasury Sweeps, VAT Nexus, VDR Rooms, and Merkle Ledgers). How may I direct the balance sheet today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (customText?: string, toolCallOverride?: { name: string; args?: any }) => {
    const textToSend = customText !== undefined ? customText : input;
    if (!textToSend.trim() && !toolCallOverride) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend || (toolCallOverride ? `Execute tool: ${toolCallOverride.name}` : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ content: m.text, role: m.sender })),
          toolCall: toolCallOverride
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.response || 'Action processed.',
        toolName: data.toolName,
        toolResult: data.toolResult,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `System Alert: Unable to reach autonomous CFO dispatch. (${e.message})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_ACTIONS = [
    { label: '📊 24M Runway Stress', query: 'Simulate 24M runway stress test under macro shock' },
    { label: '⚖️ Draft 83(b) Packet', query: 'Generate IRS Section 83(b) election package for 500k shares' },
    { label: '🏦 Evaluate T-Bill Sweeps', query: 'Evaluate excess treasury cash for tokenized T-Bill sweep' },
    { label: '🌐 Audit Global VAT Nexus', query: 'Audit cross-border VAT and GST statutory registration nexus' },
    { label: '🔒 Seal VDR Room', query: 'Seal Virtual Data Room dossier with Merkle root and dynamic NDA watermark' },
    { label: '📈 Draft Investor Letter', query: 'Generate executive monthly investor letter with ARR and runway' },
    { label: '🛡️ Verify Ledger Merkle DAG', query: 'Verify triple-entry ledger cryptographic Merkle DAG integrity' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full" />
          </div>
          <span className="text-sm tracking-wide font-semibold">Autonomous CFO</span>
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Floating Co-Pilot Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg h-[640px] bg-gray-900 border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 px-5 py-3.5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">Liquid Autonomous CFO</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live Engine Co-Pilot
                  </span>
                </div>
                <p className="text-xs text-gray-400">Deterministic Financial Engine Dispatcher</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                title="Minimize Co-Pilot"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="bg-gray-950/60 px-4 py-2 border-b border-gray-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(action.query)}
                disabled={loading}
                className="whitespace-nowrap text-xs bg-gray-800/90 hover:bg-indigo-900/60 hover:text-blue-300 text-gray-300 border border-gray-700/60 hover:border-blue-500/40 px-3 py-1 rounded-full transition-all duration-150 disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-800/90 border border-gray-700/70 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>

                  {/* Render Rich Tool Card If Present */}
                  {msg.toolResult && (
                    <div className="mt-3 pt-3 border-t border-gray-700/60 bg-gray-950/50 p-3 rounded-xl border border-gray-800 text-xs">
                      <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="font-semibold text-blue-400 uppercase tracking-wider text-[10px]">
                          ⚡ Tool Execution Payload ({msg.toolName})
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>

                      {msg.toolName === 'simulate_runway_stress' && (
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <span className="text-gray-400 block text-[10px]">P10 (Bear)</span>
                            <span className="font-bold text-amber-400 text-sm">{msg.toolResult.p10RunwayMonths} Mo</span>
                          </div>
                          <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <span className="text-gray-400 block text-[10px]">P50 (Median)</span>
                            <span className="font-bold text-emerald-400 text-sm">{msg.toolResult.p50RunwayMonths} Mo</span>
                          </div>
                          <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <span className="text-gray-400 block text-[10px]">P90 (Bull)</span>
                            <span className="font-bold text-blue-400 text-sm">{msg.toolResult.p90RunwayMonths} Mo</span>
                          </div>
                        </div>
                      )}

                      {msg.toolName === 'generate_vdr_package' && (
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Dossier ID:</span>
                            <span className="font-mono text-gray-200">{msg.toolResult.dossierSummary.dossierId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Audited Docs:</span>
                            <span className="font-bold text-white">{msg.toolResult.dossierSummary.documentsCount} documents</span>
                          </div>
                          {msg.toolResult.shareLink && (
                            <div className="mt-2 p-2 bg-indigo-950/40 rounded border border-indigo-800/40">
                              <span className="text-indigo-300 block text-[10px] font-mono break-all">
                                {msg.toolResult.shareLink.secureUrl}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {msg.toolName === 'evaluate_treasury_sweeps' && (
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sweep Target:</span>
                            <span className="font-bold text-indigo-300">{msg.toolResult.recommendedToken}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Projected Yield:</span>
                            <span className="font-bold text-emerald-400">+${msg.toolResult.annualProjectedIncomeUSD?.toLocaleString()} /yr</span>
                          </div>
                        </div>
                      )}

                      {msg.toolName === 'verify_ledger_integrity' && (
                        <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Merkle DAG 100% Cryptographically Verified</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs bg-gray-800/60 p-3 rounded-2xl w-fit border border-gray-700/40">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Executing financial engine dispatcher...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-gray-950 border-t border-gray-800">
            <form
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask CFO Co-Pilot (e.g. 'runway shock', '83b', 'sweep', 'vat')..."
                className="flex-1 bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white p-2.5 rounded-xl transition-all"
                title="Send instruction"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
