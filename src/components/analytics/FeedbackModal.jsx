import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Star, X, Check, ThumbsUp, Sparkles } from 'lucide-react';
import analytics from '../../services/ComprehensiveAnalytics';

export default function FeedbackModal({ currentApp, currentWorld }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [liked, setLiked] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasAutoPrompted, setHasAutoPrompted] = useState(false);

  // Auto-prompt after 40 seconds of continuous engagement if user hasn't opened yet
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyPrompted = sessionStorage.getItem('sentaient_feedback_prompted');
      if (!alreadyPrompted && !isOpen && !submitted) {
        sessionStorage.setItem('sentaient_feedback_prompted', 'true');
        setHasAutoPrompted(true);
      }
    }, 40000);

    return () => clearTimeout(timer);
  }, [isOpen, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    analytics.submitFeedback({
      rating,
      liked,
      suggestions,
      appName: currentApp || window.location.pathname,
      worldName: currentWorld || analytics.currentWorld,
      email
    });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setHasAutoPrompted(false);
      setSubmitted(false);
    }, 2500);
  };

  const QUICK_LIKES = [
    'Stunning 3D Visuals',
    'Intuitive Interface',
    'Audio & Soundscapes',
    'Fast & Smooth',
    'Innovative Concept'
  ];

  return (
    <>
      {/* Floating Feedback Trigger Pill */}
      <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-2">
        {hasAutoPrompted && !isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white text-xs font-semibold rounded-full shadow-lg border border-cyan-400/40 backdrop-blur-md cursor-pointer animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Enjoying the experience? Let us know!</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setHasAutoPrompted(false); }}
              className="text-white/70 hover:text-white ml-1 text-sm font-bold"
            >
              ×
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Feedback Dialog"
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 rounded-full shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-xs font-bold tracking-wider">FEEDBACK</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 rounded-2xl p-6 shadow-2xl shadow-cyan-950/40 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="text-sm text-slate-400">
                  Your feedback helps us refine sentAIent into the highest-performing experience possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Voice Matters</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    How is your experience with {currentWorld || currentApp || 'sentAIent'}?
                  </h3>
                </div>

                {/* Star Rating */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-slate-600'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>

                {/* Quick Likes Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    What do you like best?
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_LIKES.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setLiked((prev) => prev.includes(tag) ? prev.replace(tag, '').trim() : `${prev} ${tag}`.trim())}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          liked.includes(tag)
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    What suggestions do you have for improvement?
                  </label>
                  <textarea
                    rows={3}
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="Tell us what you'd like to see added, tweaked, or improved..."
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* Optional Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Your Email <span className="text-slate-500">(Optional, if you'd like a follow-up)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
