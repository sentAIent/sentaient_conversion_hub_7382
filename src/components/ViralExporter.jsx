import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViralExporter({ isVisible, onClose, activeScene }) {
  const [exportStage, setExportStage] = useState('idle'); // idle, processing, complete
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible && exportStage === 'idle') {
      startExport();
    }
  }, [isVisible]);

  const startExport = () => {
    setExportStage('processing');
    setProgress(0);
    
    // Simulate complex video rendering + audio mixing
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setExportStage('complete');
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 400);
  };

  const handleClose = () => {
    setExportStage('idle');
    setProgress(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Top Bar */}
            <div className="p-4 flex justify-between items-center border-b border-white/5">
              <h3 className="font-bold text-white tracking-wide">Export to Socials</h3>
              <button onClick={handleClose} className="text-white/50 hover:text-white">✕</button>
            </div>

            {/* Video Preview Mock */}
            <div className="relative aspect-[9/16] bg-black/50 overflow-hidden flex items-center justify-center">
              {/* Background gradient simulating the scene */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 animate-pulse" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-4 text-center opacity-30">
                <h4 className="text-xl font-bold text-white">{activeScene?.title || "Sentaient Mindwave"}</h4>
                <p className="text-xs text-white">{activeScene?.description}</p>
              </div>

              {/* TikTok UI Overlay */}
              <div className="absolute right-4 bottom-20 flex flex-col gap-4 items-center opacity-50 z-10">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="w-8 h-8 rounded-full bg-white/20" />
                <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>

              {/* Watermark */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 z-10">
                <div className="w-6 h-6 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-[10px] text-white font-bold">AI</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white font-medium leading-none drop-shadow-md">Mindwave Generator</span>
                  <span className="text-[9px] text-white/70 leading-none mt-1 drop-shadow-md">sentaient.com</span>
                </div>
              </div>

              {/* Processing Overlay */}
              {exportStage === 'processing' && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-20">
                  <div className="w-20 h-20 relative flex items-center justify-center">
                    <svg className="animate-spin text-white w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="absolute text-sm font-bold text-white">{Math.min(100, Math.floor(progress))}%</span>
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/80 animate-pulse">Rendering spatial audio...</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 bg-[#161616] relative z-10">
              {exportStage === 'processing' ? (
                <div className="w-full h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/50 text-sm font-medium border border-white/5">
                  Mixing audio and video...
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button className="w-full py-3.5 bg-[#00f2fe] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                       <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.26-.9 4.51-2.52 6.16-1.64 1.66-4.12 2.43-6.5 2.18-2.22-.23-4.22-1.39-5.61-3.04-1.39-1.64-2.11-3.8-2-6.03.11-2.21 1.05-4.3 2.66-5.81 1.61-1.52 3.86-2.22 6.09-1.95.27.03.53.08.8.14V13.8c-1.22-.44-2.61-.28-3.66.42-1.04.7-1.67 1.95-1.55 3.23.11 1.25.96 2.33 2.15 2.79 1.19.46 2.6.21 3.52-.61.91-.81 1.34-2.11 1.25-3.41-.01-5.63 0-11.26 0-16.89l.3-.01z" />
                    </svg>
                    Share to TikTok
                  </button>
                  <button className="w-full py-3.5 bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all">
                    Download MP4
                  </button>
                </div>
              )}
              
              <div className="mt-4 text-center">
                <button className="text-xs text-white/40 hover:text-white/80 transition-colors underline decoration-white/20">
                  Remove Watermark (Premium)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
