import Link from 'next/link';
import { Cpu, Zap, Activity, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

export default function FantasyQuantLanding() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05070a]/80 backdrop-blur-md border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Cpu className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">FantasyQuant</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/20 via-indigo-600/5 to-transparent rounded-full" />
          <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-purple-600/5 to-transparent rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-300">Ensemble MME Engine is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
            Mathematically Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              DFS Lineups.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop relying on gut feelings. FantasyQuant aggregates advanced metrics, live odds, and weather data into a massive ensemble model to generate up to 150 +EV lineups instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all w-full sm:w-auto">
              Start Dominating <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold rounded-xl transition-all w-full sm:w-auto">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Powered by Data.</h2>
            <p className="text-gray-400">Our engine does the heavy lifting so you can just hit enter.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#11141a] border border-white/[0.04] p-8 rounded-3xl hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Database className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Data Ingestion</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We aggregate projections from API-Sports, SportsDataIO, and direct NFL.com scrapers to ensure your pool is fully updated with the latest news.
              </p>
            </div>
            
            <div className="bg-[#11141a] border border-white/[0.04] p-8 rounded-3xl hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ensemble Projections</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Custom-weight different projection sources. Blend Vegas odds with historical data models to find the true ceiling of every player.
              </p>
            </div>
            
            <div className="bg-[#11141a] border border-white/[0.04] p-8 rounded-3xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">150-Max MME</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Generate 150 lineups in seconds. Force QB-WR stacks, limit player exposures, and runback opposing receivers mathematically.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.04] text-center bg-[#05070a]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Cpu className="text-gray-600" size={16} />
          <span className="font-bold text-gray-500 tracking-tight">FantasyQuant</span>
        </div>
        <p className="text-xs text-gray-600">Built for the modern DFS player. 2026 sentAIent Ecosystem.</p>
      </footer>
    </div>
  );
}
