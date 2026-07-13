import React from 'react';
import { motion } from 'framer-motion';

const Hero3D = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="z-10 text-center px-4 w-full flex flex-col items-center justify-center">
        
        <div className="overflow-hidden mb-4">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] text-[#4cc9f0]"
          >
            Autonomous Intelligence
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-6xl sm:text-[8rem] md:text-[12rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] uppercase text-white mix-blend-overlay opacity-90"
          >
            BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden -mt-4 sm:-mt-8 md:-mt-12">
          <motion.h1 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-6xl sm:text-[8rem] md:text-[12rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
          >
            TOMORROW
          </motion.h1>
        </div>
        
        <div className="mt-12 overflow-hidden max-w-xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base font-light text-white/50 tracking-wide leading-relaxed"
          >
            Explore a curated portfolio of self-optimizing platforms engineered to accelerate the human experience.
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30">Scroll to Initiate</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero3D;
