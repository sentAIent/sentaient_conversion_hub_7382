"use client";

import React, { useState, useEffect } from 'react';
import { Eye, Search, FileText, Activity, Server, History, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

type AnalysisHistory = {
  id: string;
  target: string;
  mode: string;
  engagement: {
    viralityPotential: number;
    audienceResonance: number;
    brandSafetyRisk: string;
  };
  brandIdentity: {
    toneAndVoice: string;
    coreDemographics: string;
    contentPillars: string[];
  };
  conversion: {
    conversionProbability: number;
    ctaStrength: number;
    monetizationAngle: string;
  };
  radar: {
    aesthetics: number;
    originality: number;
    engagement: number;
    consistency: number;
    trust: number;
  };
  summary: string;
  createdAt: string;
};

export default function SocialyzePage() {
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
  const [target, setTarget] = useState('');
  const [platform, setPlatform] = useState('X');
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisHistory | null>(null);

  // Authentication State
  const [needsAuth, setNeedsAuth] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authPassword) return toast.error("Enter a password");
    
    setIsAuthenticating(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: 'admin', password: authPassword })
      });
      
      if (!res.ok) throw new Error("Invalid credentials");
      
      setNeedsAuth(false);
      setAuthPassword('');
      toast.success("Authentication successful! Welcome to SOCIALYZE.");
      fetchHistory(); // retry
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  };
  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/socialyze/history', {
        credentials: 'include'
      });
      if (res.status === 401 || res.status === 403) {
        setNeedsAuth(true);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'search' && !target) return toast.error("Enter a handle");
    if (activeTab === 'manual' && !content) return toast.error("Paste some content");

    setLoading(true);
    setCurrentResult(null);

    try {
      const res = await fetch('http://localhost:8080/api/socialyze/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          mode: activeTab,
          target: activeTab === 'search' ? target : 'Manual Paste',
          platform: activeTab === 'search' ? platform : undefined,
          content: activeTab === 'manual' ? content : undefined,
        })
      });

      if (res.status === 401 || res.status === 403) {
        setNeedsAuth(true);
        return;
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Analysis failed");
      }

      const data = await res.json();
      setCurrentResult(data);
      setHistory(prev => [data, ...prev]);
      toast.success("Analysis complete!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans pb-24 relative">
      
      {needsAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 max-w-md w-full shadow-[0_0_80px_-15px_rgba(192,38,211,0.3)] transform transition-all">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-4 border border-neutral-700 shadow-inner">
                <ShieldAlert className="w-8 h-8 text-fuchsia-400" />
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Authentication Required</h2>
              <p className="text-neutral-400 text-sm mt-2 font-medium">Please enter your system password to unlock the SOCIALYZE intelligence engine.</p>
            </div>
            
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  placeholder="System Password"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all font-mono text-center tracking-widest placeholder:tracking-normal"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-fuchsia-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Unlock Engine"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto space-y-8 ${needsAuth ? 'opacity-20 pointer-events-none blur-sm transition-all duration-500' : 'transition-all duration-500'}`}>
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
            <Eye className="w-10 h-10 text-fuchsia-400" />
            SOCIALYZE
          </h1>
          <p className="text-neutral-400 mt-2 text-lg">
            AI-powered intelligence to score the value and accuracy of target social media accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex gap-2 mb-6 p-1 bg-neutral-950 rounded-lg">
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-semibold transition-all text-sm ${activeTab === 'search' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-500 hover:text-white'}`}
                >
                  <Search className="w-4 h-4" /> Account
                </button>
                <button 
                  onClick={() => setActiveTab('manual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-semibold transition-all text-sm ${activeTab === 'manual' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-500 hover:text-white'}`}
                >
                  <FileText className="w-4 h-4" /> Paste
                </button>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-4">
                {activeTab === 'search' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Platform</label>
                      <select 
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="X">X (Twitter)</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Target Handle / URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-neutral-500 font-bold">@</span>
                        </div>
                        <input 
                          type="text" 
                          value={target}
                          onChange={e => setTarget(e.target.value)}
                          placeholder="elonmusk, OpenAi, etc."
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                        <Server className="w-3 h-3" /> Connects to official APIs or AI Web Search
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Raw Content</label>
                    <textarea 
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      placeholder="Paste the post text here..."
                      rows={6}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-fuchsia-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" /> Execute Socialyze</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {currentResult ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Activity className="w-64 h-64" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Analysis Results <span className="text-neutral-500 text-sm font-normal">for {currentResult.target}</span>
                </h2>
                
                <div className="space-y-6 my-8 z-10 relative">
                  
                  {/* Grid Top Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option 1: Engagement & Growth */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Growth & Virality</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-400">Virality Potential</span>
                          <span className={`font-bold ${getScoreColor(currentResult.engagement?.viralityPotential || 0)}`}>{currentResult.engagement?.viralityPotential || 0}/100</span>
                        </div>
                        <div className="w-full bg-neutral-900 rounded-full h-1.5"><div className="bg-fuchsia-500 h-1.5 rounded-full" style={{width: `${currentResult.engagement?.viralityPotential || 0}%`}}></div></div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-neutral-400">Audience Resonance</span>
                          <span className={`font-bold ${getScoreColor(currentResult.engagement?.audienceResonance || 0)}`}>{currentResult.engagement?.audienceResonance || 0}/100</span>
                        </div>
                        <div className="w-full bg-neutral-900 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{width: `${currentResult.engagement?.audienceResonance || 0}%`}}></div></div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-neutral-400">Brand Safety Risk</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded bg-neutral-900 ${currentResult.engagement?.brandSafetyRisk === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>{currentResult.engagement?.brandSafetyRisk || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Option 3: Conversion & Sales */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Sales & Conversion</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-400">Conversion Probability</span>
                          <span className={`font-bold text-emerald-400`}>{currentResult.conversion?.conversionProbability || 0}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-400">CTA Strength</span>
                          <span className={`font-bold ${getScoreColor(currentResult.conversion?.ctaStrength || 0)}`}>{currentResult.conversion?.ctaStrength || 0}/100</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-xs text-neutral-500 block mb-1">Monetization Angle</span>
                          <p className="text-sm text-neutral-300 bg-neutral-900 p-2 rounded">{currentResult.conversion?.monetizationAngle || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid Bottom Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option 2: Brand Identity */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Brand Identity</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-neutral-500 block mb-1">Tone & Voice</span>
                          <p className="text-sm text-neutral-300 font-medium">{currentResult.brandIdentity?.toneAndVoice || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-1">Core Demographics</span>
                          <p className="text-sm text-neutral-300">{currentResult.brandIdentity?.coreDemographics || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-2">Content Pillars</span>
                          <div className="flex flex-wrap gap-2">
                            {currentResult.brandIdentity?.contentPillars?.map((pillar, i) => (
                              <span key={i} className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-1 rounded-full">{pillar}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Option 4: Radar Scores */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 shadow-inner">
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Comprehensive Radar</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(currentResult.radar || {}).map(([key, val]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-xs text-neutral-400 capitalize">{key}</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-neutral-900 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${(val as number) * 10}%`}}></div></div>
                              <span className="text-xs font-bold text-blue-300">{val as number}/10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative z-10 mt-8">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-300">
                    <FileText className="w-5 h-5" /> Executive Summary
                  </h3>
                  <div className="bg-neutral-950/50 p-6 rounded-xl border border-neutral-800/50 leading-relaxed text-neutral-300 whitespace-pre-wrap text-sm">
                    {currentResult.summary}
                  </div>
                </div>

                <div className="space-y-4 relative z-10 mt-8">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-fuchsia-400">
                    <Lightbulb className="w-5 h-5" /> Actionable Recommendations
                  </h3>
                  <div className="bg-neutral-950/50 p-6 rounded-xl border border-neutral-800/50 space-y-4 text-sm text-neutral-300">
                    <div className="bg-neutral-900 p-4 rounded-lg border-l-2 border-fuchsia-500">
                      <strong className="text-white block mb-1">To Improve Growth & Virality:</strong>
                      Leverage current trending audio or meme formats on short-form platforms (TikTok/Reels). Inject a controversial or highly-debatable hook in the first 3 seconds to spike audience resonance and algorithm amplification.
                    </div>
                    <div className="bg-neutral-900 p-4 rounded-lg border-l-2 border-emerald-500">
                      <strong className="text-white block mb-1">To Improve Sales & Conversion:</strong>
                      Strengthen the Call to Action (CTA) by creating urgency (e.g., limited time offers) and reducing friction. Pin a direct monetization link at the top of the comment thread or bio.
                    </div>
                    <div className="bg-neutral-900 p-4 rounded-lg border-l-2 border-amber-500">
                      <strong className="text-white block mb-1">To Improve Brand Identity & Consistency:</strong>
                      Strictly align posts with your established Tone & Voice. If the brand is professional, avoid overly casual slang. Ensure visual aesthetics and core content pillars are rigidly adhered to across all future generated content.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900/50 border border-neutral-800 border-dashed rounded-2xl p-8 shadow-inner h-full flex flex-col items-center justify-center text-center text-neutral-500">
                <Eye className="w-16 h-16 mb-4 text-neutral-700" />
                <h3 className="text-xl font-bold text-neutral-400 mb-2">Awaiting Target</h3>
                <p className="max-w-sm">Enter a target account or paste raw text to generate an AI intelligence report on its value and accuracy.</p>
              </div>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden mt-12">
          <div className="p-6 border-b border-neutral-800 bg-neutral-900/50 flex items-center gap-3">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Historical Ledger</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Target / Mode</th>
                  <th className="px-6 py-4 font-semibold text-center">Virality</th>
                  <th className="px-6 py-4 font-semibold text-center">Conversion</th>
                  <th className="px-6 py-4 font-semibold">Summary Snippet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                      No past analyses found in the ledger.
                    </td>
                  </tr>
                ) : history.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 text-neutral-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item.target}
                      <span className="block text-xs text-neutral-500 capitalize">{item.mode}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${getScoreColor(item.engagement?.viralityPotential || 0)}`}>{item.engagement?.viralityPotential || 0}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${getScoreColor(item.conversion?.conversionProbability || 0)}`}>{item.conversion?.conversionProbability || 0}%</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 truncate max-w-xs">
                      {item.summary.substring(0, 80)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
