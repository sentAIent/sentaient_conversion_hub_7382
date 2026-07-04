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

      <main className="pt-16">
        <HeroSection />
        <PortfolioSection />
        <CoreValuesSection />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#0A0A0B] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <img 
              src="/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png" 
              alt="sentAIent" 
              className="h-10 w-auto object-contain opacity-80" 
            />
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} sentAIent Conversion Hub. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
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
