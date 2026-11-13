import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ViralShareModal = ({ isOpen, onClose, agentName = "Autonomous Quant Sentinel", computeCreditsBonus = 500 }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "AGENT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?ref=${referralCode}` : `https://sentaient.com?ref=${referralCode}`;
  const shareText = `🚀 Deploying autonomous cognitive agents with 3D generative UI on Sentaient! Use my code ${referralCode} to claim ${computeCreditsBonus} free compute credits: ${shareUrl}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sentaient Cognitive Agent Studio',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToX = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(tweetUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#0f141c] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Neon decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"></div>

          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                Viral Growth Engine
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Share Agent & Earn Credits</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Social Proof Card Preview */}
          <div className="bg-gradient-to-br from-gray-900 to-[#121824] border border-cyan-500/20 rounded-xl p-4 mb-5 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold">
                AI
              </div>
              <div>
                <h4 className="font-semibold text-sm text-cyan-100">{agentName}</h4>
                <p className="text-xs text-gray-400">Cognitive Studio Blueprint • 3D Ready</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-300">
              <span>Referral Bonus:</span>
              <span className="text-emerald-400 font-mono font-bold">+{computeCreditsBonus} Credits Each</span>
            </div>
          </div>

          {/* Referral Link Box */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 block mb-1.5 font-medium">Your Invite & Blueprint Link</label>
            <div className="flex items-center gap-2 bg-black/60 border border-gray-700 rounded-xl p-1.5 pl-3">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none text-xs text-gray-300 flex-1 outline-none font-mono truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-md"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleNativeShare}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm rounded-xl transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share via Native Sheet (iOS / Android)
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={shareToX}
                className="py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold rounded-xl text-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span className="font-bold">𝕏</span> Post to X
              </button>
              <button
                onClick={shareToLinkedIn}
                className="py-2.5 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-xs font-semibold rounded-xl text-cyan-200 transition-colors flex items-center justify-center gap-2"
              >
                Share on LinkedIn
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ViralShareModal;
