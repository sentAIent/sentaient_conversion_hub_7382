import Link from "next/link";
import { ArrowRight, Trophy, Zap, Shield, TrendingUp, BarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-blue-500/30 overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-24">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            FantasyQuant.
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-32 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <SparklesIcon /> The Next Evolution of Fantasy Sports
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              🧠 Powered by Hugging Face Deep Learning
            </div>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
            Dominate your league with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">algorithmic precision.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. FantasyQuant combines deep-learning projections, real-time DFS optimization, and social paper-trading into one elite terminal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Launch Terminal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
              Explore Features
            </Link>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          
          <div className="md:col-span-2 group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-blue-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-32 h-32 text-blue-400" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">DFS Multi-Entry Optimizer</h3>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Generate up to 150 mathematically optimal lineups in seconds using linear programming. Account for correlation, ownership, and variance instantly.
              </p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-purple-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">AI Draft Portal</h3>
              <p className="text-gray-400 leading-relaxed">
                Import drafts from Sleeper, ESPN, and Yahoo. Our Gemini AI analyzes your leaguemates' historical tendencies to give you the perfect draft strategy.
              </p>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-green-500/50 transition-colors">
             <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Paper Trading</h3>
              <p className="text-gray-400 leading-relaxed">
                Test your strategies risk-free. Track your simulated bankroll on a global leaderboard and prove your edge.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-32 h-32 text-indigo-400" />
            </div>
             <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Enterprise-Grade Security</h3>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Full GDPR/CCPA compliance, hardened Row-Level Security, and zero-liability PCI-DSS payment processing via Stripe. Your data and strategies are mathematically protected.
              </p>
            </div>
          </div>

        </section>

        {/* App Store Compliance Footer */}
        <footer className="mt-32 pt-8 border-t border-gray-900 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> FantasyQuant is a simulated paper-trading platform designed for educational and entertainment purposes only. 
            No real money is wagered on this platform, and no real prizes are awarded based on the outcome of any simulated bets or contests. 
            This application is strictly an analytics and simulation tool, not a real-money gambling or daily fantasy sports (DFS) operator.
          </p>
        </footer>

      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}
