import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] text-white">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/ocean_hero.jpg" 
          alt="sentAIent Autonomous AI and Human-Centered Enterprise Applications over an Ocean Horizon" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/30" />

        {/* Collage Overlay Watermark */}
        <img 
          src="/logo_collage_overlay.png" 
          alt="Logos Overlay" 
          className="absolute inset-0 w-full h-full object-cover object-center mix-blend-screen pointer-events-none opacity-60"
          style={{ WebkitMaskImage: 'radial-gradient(circle at center, transparent 35%, black 80%)', maskImage: 'radial-gradient(circle at center, transparent 35%, black 80%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#60a9ff]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-gray-300 drop-shadow-lg">
            Intelligent Technology
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          sentAIent builds and scales proprietary AI products. Explore our cutting-edge portfolio including 
          <span className="text-white font-semibold"> MindWave</span>, 
          <span className="text-white font-semibold"> Legal Eagle</span>, 
          <span className="text-white font-semibold"> Icebreaker</span>, 
          <span className="text-white font-semibold"> Interstellar</span>, and 
          <span className="text-white font-semibold"> Autonomous AI Systems</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => window.location.href = "mailto:sales@sentaient.com"}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/5 border border-white/20 rounded-full backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            <span>Partner With Us</span>
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
