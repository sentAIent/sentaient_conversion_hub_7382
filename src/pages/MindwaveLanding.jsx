import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CAROUSEL_ITEMS = [
  { id: 1, type: 'image', src: '/hero_slide_mindwave.jpg' },
  { id: 2, type: 'image', src: '/mindwave_clean_1783198654120.jpg' },
  { id: 3, type: 'image', src: '/mindwave_notext_1783198458796.jpg' }
];

const MindwaveLanding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % CAROUSEL_ITEMS.length);
  const prev = () => setCurrent((c) => (c - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar (Minimal) */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          {/* using the Mindwave hero slide as a temp logo icon placeholder if we don't have a standalone png, or we can just use text */}
          <span className="font-bold text-xl tracking-wider text-purple-400">MINDWAVE</span>
        </div>
        <button 
          onClick={() => navigate('/mindwave')}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
        >
          Launch Experience
        </button>
      </nav>

      {/* Hero Carousel (App Demo) */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={CAROUSEL_ITEMS[current].src} 
              alt="MindWave Demo" 
              className="w-full h-full object-cover opacity-50 mix-blend-screen"
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          <button onClick={prev} className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={next} className="p-3 rounded-full bg-black/50 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/50 flex flex-col justify-center items-center z-10 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 tracking-tight"
          >
            Elevate Your Frequency
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-purple-100 max-w-2xl mb-10"
          >
            Immerse yourself in binaural beats, cymatic visuals, and personalized wellness sessions driven by AI.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigate('/mindwave')}
            className="px-8 py-4 bg-white text-purple-900 hover:bg-purple-50 font-bold rounded-full text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> Experience MindWave
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MindwaveLanding;
