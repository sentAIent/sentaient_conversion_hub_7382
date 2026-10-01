import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { supabase } from '../../config/supabase';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

export const SoftPaywall = ({ isVisible, onClose, featureName = "Advanced AI Computation", requiredCredits = 10, userCredits = 0 }) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      
      // Call backend to create checkout session
      const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          plan: 'pro_upgrade',
          feature: featureName
        }
      });
      
      if (functionError) throw new Error(functionError.message);
      
      const sessionId = data.sessionId;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('Stripe error:', error.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto relative overflow-hidden"
            >
              {/* Premium Glow Effect */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />

              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2">
                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                  Unlock <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">{featureName}</span>
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  This operation requires <strong className="text-white">{requiredCredits} credits</strong>. Your current balance is {userCredits}. Upgrade to PRO for limitless neural compute.
                </p>
                
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-8 flex items-center justify-between group hover:bg-white/[0.05] transition-colors">
                  <div>
                    <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                      Sentaient PRO <Icon name="CheckCircle2" size={16} className="text-emerald-400" />
                    </h3>
                    <p className="text-neutral-500 text-sm">Infinite local generation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$14.99</span>
                    <span className="text-neutral-500 text-xs block uppercase tracking-wider">/month</span>
                  </div>
                </div>

                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-4 bg-white text-black hover:bg-neutral-200 font-bold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader" size={20} className="animate-spin" />
                      Initializing Secure Gateway...
                    </>
                  ) : (
                    <>
                      Upgrade Now
                      <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-neutral-500 mt-4 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Icon name="Lock" size={10} /> Secured by Stripe
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
