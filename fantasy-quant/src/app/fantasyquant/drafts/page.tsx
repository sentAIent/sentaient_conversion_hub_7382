'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Database, Activity, RefreshCw, AlertCircle, Sparkles } from '@/components/icons';
import { createClient } from '@/utils/supabase/client';
import DraftBoard from '@/components/draft/DraftBoard';

export default function DraftPortal() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'import' | 'live' | 'tendencies'>('import');
  
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);
  
  const [sleeperId, setSleeperId] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  
  const [analyzing, setAnalyzing] = useState(false);
  const [tendencies, setTendencies] = useState<any>(null);
  
  const [userTier, setUserTier] = useState('free');
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase.from('users').select('tier').eq('id', data.user.id).single()
          .then(({ data: profile }) => {
            if (profile) setUserTier(profile.tier);
          });
      }
    });
  }, [supabase]);

  const handleParse = async () => {
    if (userTier === 'free') {
      alert('AI Parsing requires a Premium subscription.');
      return;
    }
    
    setParsing(true);
    try {
      const res = await fetch('/api/drafts/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, platform: 'unknown' })
      });
      const json = await res.json();
      setParseResult(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setParsing(false);
    }
  };

  const handleSleeperSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/drafts/sync/sleeper?draftId=${sleeperId}`);
      const json = await res.json();
      setSyncResult(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleESPNAuth = () => {
    // Simulated OAuth flow for ESPN
    window.location.href = '/api/drafts/sync/espn?draftId=' + sleeperId;
  };

  const handleYahooAuth = () => {
    // Simulated OAuth flow for Yahoo
    window.location.href = '/api/drafts/sync/yahoo?draftId=' + sleeperId;
  };

  const handleAnalyze = async (picks: any) => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/drafts/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ picks })
      });
      const json = await res.json();
      setTendencies(json.data);
      setActiveTab('tendencies');
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 p-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Draft Portal</h1>
            <p className="text-slate-400">Import history, sync live drafts, and analyze manager tendencies.</p>
          </div>
          <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button 
              onClick={() => setActiveTab('import')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'import' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Import Data
            </button>
            <button 
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              Live Sync
            </button>
            <button 
              onClick={() => setActiveTab('tendencies')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'tendencies' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'text-slate-400 hover:text-white'}`}
            >
              Tendencies
            </button>
          </div>
        </header>

        {activeTab === 'import' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Database className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Draft Parser</h2>
                  <p className="text-sm text-slate-400">Paste raw text from ESPN or Yahoo</p>
                </div>
              </div>
              
              <textarea 
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                placeholder="Paste raw draft board text here..."
                className="w-full h-48 bg-black/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 mb-4 font-mono"
              />
              
              <button
                onClick={handleParse}
                disabled={parsing || !rawText}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-medium flex justify-center items-center gap-2 transition-all"
              >
                {parsing ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Parse with Gemini AI
              </button>
              
              {userTier === 'free' && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3 text-sm text-amber-400">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>AI parsing requires a Premium subscription. Free tiers must use the CSV template.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center border-dashed">
               <Upload className="text-slate-500 mb-4" size={48} />
               <h3 className="text-lg font-bold text-white mb-2">CSV Template Import</h3>
               <p className="text-sm text-slate-400 mb-6 max-w-xs">Download our strict CSV template, fill out your draft data, and upload it manually.</p>
               <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                 Download Template
               </button>
            </div>
            
            {(parseResult || syncResult) && (
              <div className="md:col-span-2 mt-4 flex justify-end">
                 <button 
                  onClick={() => handleAnalyze(parseResult?.picks || syncResult)}
                  disabled={analyzing}
                  className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-fuchsia-900/50"
                 >
                   {analyzing ? <RefreshCw className="animate-spin" size={18} /> : <Activity size={18} />}
                   Analyze Tendencies
                 </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Live Draft Sync</h2>
              <p className="text-sm text-slate-400 mb-6">Enter your Draft ID and select your platform.</p>
              
              <div className="flex flex-col gap-4 max-w-md">
                <input
                  type="text"
                  value={sleeperId}
                  onChange={e => setSleeperId(e.target.value)}
                  placeholder="Draft ID (e.g. 1123456789)"
                  className="w-full bg-black/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSleeperSync}
                    disabled={syncing || !sleeperId}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl font-medium flex justify-center items-center gap-2"
                  >
                    {syncing ? <RefreshCw className="animate-spin" size={16} /> : 'Sync Sleeper'}
                  </button>
                  <button
                    onClick={handleESPNAuth}
                    disabled={!sleeperId}
                    className="flex-1 py-2 bg-[#CC0000] hover:bg-[#AA0000] disabled:opacity-50 rounded-xl font-medium flex justify-center items-center gap-2"
                  >
                    Sync ESPN
                  </button>
                  <button
                    onClick={handleYahooAuth}
                    disabled={!sleeperId}
                    className="flex-1 py-2 bg-[#7B00DB] hover:bg-[#5A00A0] disabled:opacity-50 rounded-xl font-medium flex justify-center items-center gap-2"
                  >
                    Sync Yahoo
                  </button>
                </div>
              </div>
            </div>
            
            {/* Re-use DraftBoard component for Live Sync visualization */}
            <div className="h-[600px]">
               <DraftBoard livePicks={syncResult} />
            </div>
          </div>
        )}

        {activeTab === 'tendencies' && (
          <div className="space-y-6">
            {!tendencies ? (
              <div className="text-center py-20 text-slate-500">
                <Activity size={48} className="mx-auto mb-4 opacity-50" />
                <p>Import a draft or sync live data to generate AI tendency analysis.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(tendencies) ? tendencies.map((t: any, i: number) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">{t.manager_name}</h3>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                      {t.tendency_summary}
                    </p>
                    
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Positional Bias</h4>
                    <div className="space-y-2">
                      {Object.entries(t.positional_bias || {}).map(([pos, bias]: [string, any]) => (
                        <div key={pos} className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-lg">
                          <span className="text-sm font-bold text-slate-400">{pos}</span>
                          <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                            bias === 'heavy' ? 'bg-indigo-500/20 text-indigo-400' :
                            bias === 'moderate' ? 'bg-blue-500/20 text-blue-400' :
                            bias === 'avoid' ? 'bg-red-500/20 text-red-400' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {bias}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 col-span-full">
                    <h3 className="text-lg font-bold text-white mb-3">{tendencies.manager_name}</h3>
                    <p className="text-sm text-slate-300 mb-6">{tendencies.tendency_summary}</p>
                    {/* Render biases */}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
