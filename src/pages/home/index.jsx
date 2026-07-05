import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import CoreValuesSection from './components/CoreValuesSection';

const PortfolioHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-blue-500/30">
      <Helmet>
        <title>sentAIent | Next-Generation AI Platforms</title>
        <meta
          name="description"
          content="sentAIent builds and scales proprietary AI revenue drivers. Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms."
        />
        <meta name="theme-color" content="#050505" />
      </Helmet>

      {/* Reusing existing Header but ensuring it works with dark theme */}
      <Header />

      <main>
        <HeroSection />
        <PortfolioSection />
        <CoreValuesSection />
      </main>

      {/* Expanded Footer with Bento Grid */}
      <footer className="bg-[#0A0A0B] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'MindWave', tag: 'Cognitive Entrainment', logo: '/mindwave-logo.png', gradient: 'from-blue-600/20 to-[#60a9ff]/20', scale: 'scale-[2.2]' },
              { name: 'Legal Eagle', tag: 'AI Document Analysis', logo: '/legal_eagle_logo.png', gradient: 'from-violet-600/20 to-purple-600/20', scale: 'scale-125' },
              { name: 'Icebreaker', tag: 'Real-world Social', logo: '/icebreaker_logo.png', gradient: 'from-rose-600/20 to-orange-600/20', scale: 'scale-[0.85]' },
              { name: 'Interstellar', tag: 'Cosmic Exploration', logo: '/interstellar_logo.png', gradient: 'from-gray-800/40 to-indigo-900/40', scale: 'scale-100' },
              { name: 'AutoPilot', tag: 'B2B Marketing', logo: '/autopilot_logo.png', gradient: 'from-green-700/20 to-emerald-800/20', scale: 'scale-[1.4] translate-y-2' },
              { name: 'CloveH2O', tag: 'Smart Hydration', logo: '/cloveh2o_logo.png', gradient: 'from-teal-500/20 to-cyan-500/20', scale: 'scale-[1.4] translate-y-2' }
            ].map((app, i) => (
              <a
                key={app.name}
                href="#platforms"
                className={`group flex flex-col items-center justify-center p-5 rounded-xl bg-gradient-to-br ${app.gradient} border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 overflow-hidden`}
              >
                <div className="w-16 h-16 mb-4 bg-[#202733] rounded-2xl shadow-inner flex items-center justify-center border border-white/5 relative overflow-hidden">
                  <img src={app.logo} alt={app.name} className={`w-full h-full object-contain ${app.scale}`} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{app.name}</h4>
                <p className="text-white/50 text-[11px] text-center">{app.tag}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png" 
              alt="sentAIent" 
              className="h-24 w-auto object-contain opacity-80" 
            />
          </div>
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} sentAIent. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioHome;
