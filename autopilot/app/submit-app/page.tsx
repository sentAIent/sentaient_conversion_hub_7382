"use client";

import React, { useState } from 'react';
import { Play, FileText, Briefcase, Camera, Shield, ArrowRight, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function SubmitAppPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    url: '',
    goal: 'marketing',
    username: '',
    password: '',
    assassinationMode: false,
    competitorUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL || 'http://localhost:8080';
      
      const payload = {
        campaignType: 'browser_agent',
        brand: formData.appName,
        inputValue: formData.url,
        goal: formData.goal,
        assassination_mode: formData.assassinationMode,
        competitor_url: formData.competitorUrl,
        credentials: {
          username: formData.username,
          password: formData.password
        }
      };

      const res = await fetch(`${backendUrl}/queue/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: `agent_${Date.now()}`,
          status: 'approved_for_publishing', // Push straight to crawler queue
          ...payload
        })
      });

      if (!res.ok) throw new Error("Failed to submit app to Autopilot engine.");
      
      toast.success("App submitted! Autopilot is initializing crawler...", {
        duration: 5000,
        icon: '🚀'
      });
      
      setFormData({ appName: '', url: '', goal: 'marketing', username: '', password: '' });
      
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 font-sans selection:bg-emerald-500/30">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border border-emerald-500/20">
            <Camera className="w-3 h-3" />
            <span>Browser Intelligence Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Submit Your App</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Deploy Autopilot to crawl, understand, and record your application. We'll automatically generate marketing assets, tutorials, and documentation based on your actual UI.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Core Info */}
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Application Name</label>
              <input 
                type="text" 
                required
                value={formData.appName}
                onChange={e => setFormData({...formData, appName: e.target.value})}
                placeholder="e.g., Mindwave, Fantasy Quant"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target URL</label>
              <input 
                type="url" 
                required
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                placeholder="https://your-app.com/dashboard"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">Autopilot Goal</label>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.goal === 'marketing' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                  <input type="radio" name="goal" value="marketing" checked={formData.goal === 'marketing'} onChange={() => setFormData({...formData, goal: 'marketing'})} className="hidden" />
                  <Play className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-semibold text-white">Marketing Video</div>
                    <div className="text-xs mt-1">Record a promotional video showcasing features.</div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.goal === 'tutorial' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                  <input type="radio" name="goal" value="tutorial" checked={formData.goal === 'tutorial'} onChange={() => setFormData({...formData, goal: 'tutorial'})} className="hidden" />
                  <FileText className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-semibold text-white">User Tutorial</div>
                    <div className="text-xs mt-1">Generate a step-by-step UI walkthrough.</div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.goal === 'manual' ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}>
                  <input type="radio" name="goal" value="manual" checked={formData.goal === 'manual'} onChange={() => setFormData({...formData, goal: 'manual'})} className="hidden" />
                  <Briefcase className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-semibold text-white">Employee Manual</div>
                    <div className="text-xs mt-1">Detailed internal documentation of functionality.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication */}
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                Test Credentials
                <span className="ml-2 text-xs font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded">Optional</span>
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                If your app is gated (requires login), provide a test account. Autopilot will use these to authenticate before crawling.
              </p>

              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username / Email</label>
                  <input 
                    type="text" 
                    value={formData.username}
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    placeholder="test@your-app.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-2 flex items-center text-red-400">
                God Mode: Competitor Assassination
              </h3>
              <p className="text-sm text-red-300/70 mb-4">
                Enable to scrape a competitor's site and generate aggressive A/B marketing copy proving your superiority.
              </p>
              
              <label className="flex items-center cursor-pointer mb-4">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={formData.assassinationMode} onChange={(e) => setFormData({...formData, assassinationMode: e.target.checked})} />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${formData.assassinationMode ? 'bg-red-500' : 'bg-black/50'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.assassinationMode ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-300 font-medium">
                  Enable God Mode
                </div>
              </label>

              {formData.assassinationMode && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-red-300 mb-2">Competitor URL</label>
                  <input 
                    type="url" 
                    required={formData.assassinationMode}
                    value={formData.competitorUrl}
                    onChange={e => setFormData({...formData, competitorUrl: e.target.value})}
                    placeholder="https://competitor-app.com"
                    className="w-full bg-black/50 border border-red-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-red-900/50"
                  />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-semibold text-lg py-4 px-6 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Deploying Agent...
                </>
              ) : (
                <>
                  Deploy Browser Agent
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Assets will be securely stored in your local MinIO vault.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
