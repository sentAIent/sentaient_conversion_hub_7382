import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-white pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/80 to-[#0A0A0B]" />
        
        {/* Dynamic Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-start mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span>The Future of Intelligent Products</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Next-Generation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                AI & App Dev
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-6 text-xl text-gray-400 max-w-xl leading-relaxed"
            >
              sentAIent builds and scales proprietary AI products. Explore our cutting-edge portfolio including 
              <span className="text-gray-200 font-semibold"> MindWave</span>, 
              <span className="text-gray-200 font-semibold"> Legal Eagle</span>, 
              <span className="text-gray-200 font-semibold"> Icebreaker</span>, 
              <span className="text-gray-200 font-semibold"> Interstellar</span>, and 
              <span className="text-gray-200 font-semibold"> Autonomous AI Systems</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row items-start justify-start gap-4"
            >
              <button 
                onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#202733] bg-[#60a9ff] rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-[#509af0] hover:shadow-[0_0_40px_rgba(96,169,255,0.4)]"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => window.location.href = "mailto:sales@sentaient.com"}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
              >
                <span>Partner With Us</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-3xl" />
            <img 
              src="/hero_apps_montage.jpg" 
              alt="sentAIent Application Portfolio" 
              className="relative z-10 w-full h-auto rounded-[2rem] border border-white/10 shadow-2xl object-cover aspect-square md:aspect-auto"
            />
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;
