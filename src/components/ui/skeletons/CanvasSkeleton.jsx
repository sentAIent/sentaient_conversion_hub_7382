import React from 'react';
import { motion } from 'framer-motion';

export default function CanvasSkeleton({ className = "w-full h-full", message = "Initializing Neural Core..." }) {
  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden ${className}`}>
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80" />
      
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        initial={{ x: '-150%' }}
        animate={{ x: '150%' }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
      />
      
      {/* Minimalist central loader */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-16 h-16">
          <motion.div 
            className="absolute inset-0 border border-neutral-800 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute inset-2 border border-neutral-600 rounded-full border-t-neutral-300"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            className="text-xs tracking-[0.3em] text-neutral-400 uppercase font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            {message}
          </motion.div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
}
