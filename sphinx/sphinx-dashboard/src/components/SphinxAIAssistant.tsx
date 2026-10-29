import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Compass, AlertTriangle, Shield, MapPin, Database, RefreshCw, ChevronRight } from 'lucide-react';
import { askSphinxAI, MapContext, AIResponse, MapAction } from '../lib/intelligence/aiClient';
import { DEEP_RESEARCH_PROMPTS } from '../lib/intelligence/deepResearchEngine';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isDeepResearch?: boolean;
  sources?: string[];
  actions?: MapAction[];
  timestamp: string;
}

interface SphinxAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  mapContext: MapContext;
  onExecuteAction: (action: MapAction) => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const SphinxAIAssistant: React.FC<SphinxAIAssistantProps> = ({
  isOpen,
  onClose,
  mapContext,
  onExecuteAction,
  initialQuery,
  onClearInitialQuery
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `### 🧠 SPHINX TACTICAL AI ONLINE
I am grounded in your live geospatial map feed and intelligence databases.

**I can answer in-depth inquiries including:**
- **Crime in any city and neighborhood** (e.g., *"What is the crime breakdown in Chicago by neighborhood?"*)
- **Aviation safety analytics** (e.g., *"Tell me the frequency of airplane crashes by day of the week."*)
- **Live map threats & sensor telemetry** (active wildfires, seismic shocks, wind vectors, and dropped pins)
- **Deep multi-source research** on demand with verified statistical tables.

Select a quick query below or type your inquiry.`,
      sources: ['Sphinx Central Core', 'NTSB Historical Records', 'FBI UCR / OpenData', 'Live Telemetry Sensors'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepResearch, setIsDeepResearch] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.sender === 'ai') {
        const lastEl = document.getElementById(lastMsg.id);
        if (lastEl) {
          lastEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText = inputQuery, forceDeep?: boolean) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    const lower = q.toLowerCase();
    const deep = forceDeep !== undefined
      ? forceDeep
      : (isDeepResearch || lower.includes('deep research') || lower.includes('deep-research'));

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      isDeepResearch: deep,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response: AIResponse = await askSphinxAI(q, mapContext, deep);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        isDeepResearch: response.isDeepResearch,
        sources: response.sources,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

      // Automatically execute actions like loading crime data on map
      if (response.actions && response.actions.length > 0) {
        response.actions.forEach(action => onExecuteAction(action));
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ **Tactical AI Retrieval Error**: Unable to complete intelligence query. ${err?.message || ''}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [isOpen, initialQuery]);

  const quickPrompts = [
    { label: '🌦️ Historical weather & rain/snow accum (Denver)', query: 'Show historical weather data for Denver including temps, rain/snow accumulation, and wind.' },
    { label: '❄️ Historical freeze & snow records (Chicago)', query: 'What was the historical temperature, snowfall accumulation, and peak wind gusts in Chicago during the winter?' },
    { label: '✈️ Hired pilot flight safety (Part 121/135)', query: 'Break down airplane crashes by day of the week for commercial and private flights piloted by professional hired pilots.' },
    { label: '✈️ Airplane crashes by day of week', query: 'Tell me the frequency of airplane crashes by day of the week.' },
    { label: '📸 Flock & Axon ALPR tracking', query: 'Analyze Flock Safety, Axon, and Ring surveillance cameras and show directional sightlines.' },
    { label: '🚨 Chicago crime by neighborhood', query: 'Analyze crime in Chicago by neighborhood with safety scores.' },
    { label: '🔥 Active map threat synthesis', query: 'Synthesize all active map threats, fire spread risk, and live wind in current view.' }
  ];

  const activePrompts = isDeepResearch ? DEEP_RESEARCH_PROMPTS : quickPrompts;

  const handleToggleDeepResearch = () => {
    const next = !isDeepResearch;
    setIsDeepResearch(next);
    if (next && inputQuery.trim()) {
      handleSend(inputQuery.trim(), true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:top-14 sm:right-6 sm:bottom-6 sm:w-[520px] sm:max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100vh-5rem)] z-50 flex flex-col bg-black/95 border border-cyan-800/80 rounded-none sm:rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl font-mono text-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-cyan-950/80 via-black to-blue-950/80 border-b border-cyan-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
            <span className="text-sm">🧠</span>
          </div>
          <div>
            <div className="text-cyan-300 font-bold text-sm tracking-wider flex items-center gap-2">
              SPHINX TACTICAL AI
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            <div className="text-[10px] text-gray-400">Grounded Map Intelligence & OSINT</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Deep Research Toggle */}
          <button
            type="button"
            data-testid="ai-btn-deep-research"
            onClick={handleToggleDeepResearch}
            className={`px-2 py-1 rounded text-[11px] font-bold border transition-all flex items-center gap-1 ${
              isDeepResearch
                ? 'bg-purple-950 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
            }`}
            title="Toggle Deep Multi-Source Research Synthesis"
          >
            <Sparkles size={12} className={isDeepResearch ? "text-purple-400 animate-spin" : ""} />
            <span>Deep Research</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Live Map Telemetry Banner */}
      <div className="px-4 py-1.5 bg-cyan-950/30 border-b border-cyan-900/40 text-[10px] text-cyan-300 flex items-center justify-between flex-wrap gap-1 shrink-0">
        <div className="flex items-center gap-2">
          <span>📍 {mapContext.center.lat.toFixed(2)}°, {mapContext.center.lon.toFixed(2)}° (z{mapContext.zoom.toFixed(1)})</span>
          <span>🔥 {mapContext.layerCounts.wildfires} Fires</span>
          <span>⚡ {mapContext.layerCounts.earthquakes} Quakes</span>
        </div>
        <div className="text-gray-400">
          💨 {mapContext.weather?.windSpeedKnots || 8}kt @ {mapContext.weather?.windDirectionDeg || 0}°
        </div>
      </div>

      {isDeepResearch && (
        <div className="px-4 py-1.5 bg-gradient-to-r from-purple-950/90 via-indigo-950/70 to-purple-950/90 border-b border-purple-600/70 text-[10px] text-purple-200 flex items-center justify-between shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <div className="flex items-center gap-1.5 font-bold tracking-wider">
            <Sparkles size={12} className="text-purple-300 animate-spin" />
            <span>DEEP RESEARCH ACTIVE: Multi-source empirical tables & causal dynamics</span>
          </div>
          <span className="text-[9px] bg-purple-900/60 px-1.5 py-0.5 rounded border border-purple-500 font-mono text-purple-300">
            PRO OSINT
          </span>
        </div>
      )}

      {/* Chat Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            id={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-gray-500 mb-1 px-1 flex items-center gap-2">
              <span>{msg.sender === 'user' ? 'YOU' : 'SPHINX INTEL'}</span>
              <span>{msg.timestamp}</span>
              {msg.isDeepResearch && (
                <span className="text-purple-400 font-bold bg-purple-950/60 px-1 rounded border border-purple-800">
                  DEEP RESEARCH
                </span>
              )}
            </div>

            <div
              className={`max-w-[92%] rounded-xl p-3.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-950/70 border border-cyan-600 text-cyan-100 rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-black/70 border border-gray-800 text-gray-200 rounded-bl-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="prose prose-invert prose-xs max-w-none space-y-2">
                {msg.text.split('\n\n').map((para, i) => {
                  if (para.startsWith('### ')) {
                    return <h3 key={i} className="text-sm font-bold text-cyan-400 mt-2 mb-1">{para.replace('### ', '')}</h3>;
                  }
                  if (para.startsWith('#### ') && !para.includes('|')) {
                    return <h4 key={i} className="text-xs font-bold text-amber-300 mt-2 mb-1">{para.replace('#### ', '')}</h4>;
                  }
                  if (para.includes('|')) {
                    // Render simple markdown table
                    const lines = para.split('\n').filter(l => l.trim().startsWith('|'));
                    if (lines.length > 2) {
                      const headers = lines[0].split('|').map(c => c.trim()).filter(Boolean);
                      const rows = lines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
                      return (
                        <div key={i} className="overflow-x-auto my-2 border border-gray-800 rounded bg-black/40">
                          <table className="min-w-full divide-y divide-gray-800 text-[11px]">
                            <thead className="bg-cyan-950/50 text-cyan-300">
                              <tr>
                                {headers.map((h, hi) => <th key={hi} className="px-2 py-1 text-left font-bold">{h}</th>)}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/60">
                              {rows.map((row, ri) => (
                                <tr key={ri} className="hover:bg-white/5 transition-colors">
                                  {row.map((cell, ci) => <td key={ci} className="px-2 py-1 text-gray-300">{cell.replace(/\*\*/g, '')}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }
                  return <p key={i} className="text-gray-300">{para}</p>;
                })}
              </div>

              {/* Action Buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-gray-800 flex flex-wrap gap-1.5">
                  {msg.actions.map((act, ai) => {
                    if (act.type === 'LOAD_CRIME') {
                      return (
                        <button
                          key={ai}
                          type="button"
                          onClick={() => onExecuteAction(act)}
                          className="px-2 py-1 bg-red-950/80 hover:bg-red-900 border border-red-600 rounded text-[11px] text-red-200 flex items-center gap-1 transition-colors"
                        >
                          <Shield size={12} className="text-red-400" />
                          <span>View {act.payload.city} Crime Hotspots</span>
                        </button>
                      );
                    }
                    if (act.type === 'FLY_TO') {
                      return (
                        <button
                          key={ai}
                          type="button"
                          onClick={() => onExecuteAction(act)}
                          className="px-2 py-1 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-600 rounded text-[11px] text-cyan-200 flex items-center gap-1 transition-colors"
                        >
                          <Compass size={12} className="text-cyan-400" />
                          <span>Center Map on Target</span>
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-gray-800/60 flex items-center gap-1 flex-wrap text-[9px] text-gray-400">
                  <Database size={10} className="text-gray-400 shrink-0" />
                  <span>Sources:</span>
                  {msg.sources.map((src, si) => (
                    <span key={si} className="bg-black/60 px-1 py-0.5 rounded border border-gray-800 text-gray-300">
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs py-2 px-1">
            {isDeepResearch ? (
              <>
                <Sparkles size={14} className="animate-spin text-purple-400" />
                <span className="text-purple-300 font-bold">Compiling multi-source deep research dossier & cross-referencing registries...</span>
              </>
            ) : (
              <>
                <RefreshCw size={14} className="animate-spin text-cyan-400" />
                <span className="text-cyan-400">Analyzing OSINT feeds and compiling intelligence...</span>
              </>
            )}
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-2 bg-black/80 border-t border-gray-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        {activePrompts.map((qp, i) => (
          <button
            key={i}
            type="button"
            data-testid="ai-quick-prompt-btn"
            onClick={() => handleSend(qp.query)}
            disabled={isLoading}
            className={`px-2 py-1 rounded text-[10px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              isDeepResearch
                ? 'bg-purple-950/70 hover:bg-purple-900 border border-purple-800 hover:border-purple-500 text-purple-200'
                : 'bg-gray-900/90 hover:bg-cyan-950/60 border border-gray-800 hover:border-cyan-700 text-gray-300 hover:text-cyan-300'
            }`}
          >
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-black border-t border-cyan-900/60 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            data-testid="ai-chat-input"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isDeepResearch
                ? "Deep Research query (e.g. wildfires, nuclear, power grid, quakes, crime)..."
                : "Ask about crime, airplane crashes, map threats, or toggle Deep Research..."
            }
            disabled={isLoading}
            className={`flex-1 bg-gray-950 border focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 transition-colors ${
              isDeepResearch
                ? 'border-purple-700/80 focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'border-gray-700 focus:border-cyan-500'
            }`}
          />
          <button
            type="submit"
            data-testid="ai-chat-send"
            disabled={!inputQuery.trim() || isLoading}
            className={`p-2.5 font-bold rounded-xl transition-all flex items-center justify-center shrink-0 ${
              isDeepResearch
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            } disabled:opacity-40`}
            title="Send query"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
