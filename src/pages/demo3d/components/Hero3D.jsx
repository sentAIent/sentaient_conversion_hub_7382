import React from 'react';
import { motion } from 'framer-motion';

const Hero3D = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="z-10 text-center px-4 max-w-5xl mx-auto mix-blend-difference">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl md:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase text-white mb-6"
        >
          Build<br />The Future
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl font-medium text-white/70 max-w-2xl mx-auto tracking-wide"
        >
          Explore our portfolio of autonomous platforms, engineered for the next generation of digital experiences.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero3D;
