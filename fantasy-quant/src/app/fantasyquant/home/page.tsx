import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Shield, TrendingUp, Zap, BarChart2, ShieldCheck, CheckCircle2 } from '@/components/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FantasyQuant | Advanced NFL Projections & DFS Optimization',
  description: 'Dominate your fantasy leagues and DFS contests with the Sentaient Advanced Projection Engine (SAPE). Proprietary blocking metrics, injury adjustments, and real-time data.',
  openGraph: {
    title: 'FantasyQuant | Win More DFS & Season-Long',
    description: 'Stop guessing. Start winning with SAPE projections.',
    url: 'https://sentaient.com/fantasyquant/home',
    siteName: 'FantasyQuant',
    images: [
      {
        url: 'https://sentaient.com/fantasyquant-og.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-white tracking-tight">FantasyQuant</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-8">
            <Zap size={14} className="fill-indigo-400" /> Introducing SAPE 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            Stop Guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Start Quantifying.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Sentaient Advanced Projection Engine (SAPE) goes beyond basic box scores. We analyze raw blocking win rates, coordinator tendencies, and live injury data to generate the most accurate DFS and season-long projections on the market.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group hover:scale-[1.02]">
              Start Winning Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto text-base font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Why FantasyQuant?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We process millions of data points every week so you don't have to.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Proprietary Blocking Metrics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We don't just look at rush yards. SAPE analyzes offensive line win rates and defensive front severities to accurately predict rushing efficiency.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <BarChart2 size={120} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 relative z-10">
                <TrendingUp className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Dynamic Injury Adjustments</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                When a key starter goes down, SAPE automatically reallocates target shares and routes run based on historical coordinator tendencies.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Activity className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Paper Trading Simulator</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Test your DFS strategies risk-free. Build lineups and place mock wagers with a $10,000 virtual bankroll to refine your edge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">No hidden fees. Just the data you need to win.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
            
            {/* Pro Tier */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-slate-400 text-sm mb-6">Perfect for season-long dominance.</div>
              <div className="mb-8">
                <span className="text-4xl font-black text-white">$19</span>
                <span className="text-slate-500">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Advanced SAPE Projections</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Save up to 10 Dashboard Views</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Priority Lineup Optimizer</span>
                </li>
              </ul>
              
              <Link href="/register?tier=pro" className="block text-center w-full py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 transition-colors">
                Get Started with Pro
              </Link>
            </div>

            {/* Elite Tier */}
            <div className="bg-gradient-to-b from-indigo-900/50 to-slate-900 border border-indigo-500/50 rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-indigo-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                Elite
              </h3>
              <div className="text-slate-300 text-sm mb-6">For serious DFS players.</div>
              <div className="mb-8">
                <span className="text-4xl font-black text-white">$49</span>
                <span className="text-indigo-300">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm font-medium">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Unlimited Paper Trading Bankrolls</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Save up to 30 Dashboard Views</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-300 text-sm">Early Access to Live Data Feeds</span>
                </li>
              </ul>
              
              <Link href="/register?tier=elite" className="block text-center w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25">
                Upgrade to Elite
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="text-indigo-500" size={20} />
            <span className="text-lg font-black text-white tracking-tight">FantasyQuant</span>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Sentaient. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
