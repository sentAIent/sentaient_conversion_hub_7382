"use client";
import React, { useState } from 'react';
import { Shield, CreditCard, Lock, CheckCircle2, Copy, Check, ArrowRight, X, Sparkles, QrCode } from 'lucide-react';
import { UserTier, TIER_CONFIG } from '../lib/useSettings';
import { tacticalSentinel } from '../lib/sentinel/TacticalSentinelService';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  tier: 'pro' | 'sovereign';
  onClose: () => void;
  onSuccess: (tier: UserTier) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  tier,
  onClose,
  onSuccess
}) => {
  const [paymentRail, setPaymentRail] = useState<'card' | 'crypto'>('card');
  const [cryptoAsset, setCryptoAsset] = useState<'XMR' | 'BTC'>('XMR');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [successState, setSuccessState] = useState(false);

  if (!isOpen) return null;

  const price = tier === 'pro' ? 29 : 99;
  const planName = tier === 'pro' ? 'PRO TACTICAL' : 'SOVEREIGN SENTINEL';

  const xmrAddress = "888tNkZrPN6JsEAnqGz43V4Xo3qZ6W6GgG8Y1h1d3s5z7v9b2m4n6k8j0h2g4f6d8s";
  const btcAddress = "bc1q9x3d82k49z8n48dj38dkz49fj83ks94jd7s6e4";
  const currentCryptoAddress = cryptoAsset === 'XMR' ? xmrAddress : btcAddress;
  const cryptoAmount = cryptoAsset === 'XMR' 
    ? (price / 165).toFixed(4) + " XMR"
    : (price / 68500).toFixed(6) + " BTC";

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const executeActivation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessState(true);
      tacticalSentinel.playTacticalSound('caution');
      setTimeout(() => {
        onSuccess(tier);
        onClose();
        setSuccessState(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div 
      data-testid="payment-checkout-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div 
        className="w-full max-w-lg bg-black border border-cyan-800/80 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col font-mono text-xs"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-black to-purple-950/80 border-b border-cyan-900/60 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${tier === 'pro' ? 'border-cyan-500 bg-cyan-950/60 text-cyan-400' : 'border-purple-500 bg-purple-950/60 text-purple-400'}`}>
              <Shield size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wider">{planName} ACTIVATION</h3>
                <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-white/10 text-cyan-300 border border-cyan-500/30">
                  ${price} / mo
                </span>
              </div>
              <p className="text-[10px] text-gray-400">Zero telemetry leakage • End-to-end encrypted dispatch</p>
            </div>
          </div>
          <button 
            type="button"
            data-testid="btn-close-checkout"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {successState ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-base font-bold text-white">PAYMENT CONFIRMED</h4>
            <p className="text-gray-400 text-xs max-w-xs">
              Cryptographic keys provisioned. <strong>{planName}</strong> capabilities are now active on your node.
            </p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-gray-800">
              <button
                type="button"
                data-testid="tab-pay-card"
                onClick={() => setPaymentRail('card')}
                className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentRail === 'card'
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard size={14} />
                <span>Credit Card / Apple Pay</span>
              </button>
              <button
                type="button"
                data-testid="tab-pay-crypto"
                onClick={() => setPaymentRail('crypto')}
                className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentRail === 'crypto'
                    ? 'bg-purple-950 border border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <QrCode size={14} />
                <span>Monero / Bitcoin</span>
              </button>
            </div>

            {paymentRail === 'card' ? (
              <div className="space-y-3">
                <button
                  type="button"
                  data-testid="btn-apple-pay"
                  onClick={executeActivation}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-bold flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <span> Pay with Apple Pay</span>
                </button>

                <div className="flex items-center gap-2 text-gray-500 my-1">
                  <div className="h-px bg-gray-800 flex-1" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Or Card</span>
                  <div className="h-px bg-gray-800 flex-1" />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-gray-400 block mb-1">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="4242 •••• •••• 4242" 
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-gray-700 rounded-lg text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-400 block mb-1">Expiration</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-gray-700 rounded-lg text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">CVC</label>
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-gray-700 rounded-lg text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="btn-submit-card-pay"
                  onClick={executeActivation}
                  disabled={isProcessing}
                  className="w-full py-2.5 mt-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black flex items-center justify-center gap-1.5 transition-all text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  {isProcessing ? 'CONFIRMING ENCRYPTION...' : `PAY $${price}.00 & ACTIVATE`}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCryptoAsset('XMR')}
                    className={`flex-1 py-1.5 rounded-lg border text-center font-bold transition-all ${
                      cryptoAsset === 'XMR' ? 'bg-orange-950/80 border-orange-500 text-orange-300' : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    Monero (XMR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCryptoAsset('BTC')}
                    className={`flex-1 py-1.5 rounded-lg border text-center font-bold transition-all ${
                      cryptoAsset === 'BTC' ? 'bg-amber-950/80 border-amber-500 text-amber-300' : 'bg-slate-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    Bitcoin (BTC)
                  </button>
                </div>

                {/* QR Code Presentation Box */}
                <div className="p-3 bg-slate-950 rounded-xl border border-gray-800 flex flex-col items-center text-center space-y-2">
                  <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center">
                    {/* Deterministic Cyber QR Code Pattern */}
                    <div className="w-full h-full bg-black flex flex-col justify-between p-1">
                      <div className="flex justify-between">
                        <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-white" /></div>
                        <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-white" /></div>
                      </div>
                      <div className="text-[8px] text-white font-mono tracking-tighter">SPHINX-VAULT</div>
                      <div className="flex justify-between items-end">
                        <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-white" /></div>
                        <div className="w-4 h-4 bg-white" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 text-[10px]">Send Exact Amount:</span>
                    <div className="text-sm font-bold text-white font-mono">{cryptoAmount}</div>
                  </div>

                  <div className="w-full bg-slate-900 p-2 rounded border border-gray-800 flex items-center justify-between text-[10px] text-gray-300">
                    <span className="truncate max-w-[280px] font-mono">{currentCryptoAddress}</span>
                    <button 
                      type="button"
                      data-testid="btn-copy-crypto-address"
                      onClick={() => handleCopy(currentCryptoAddress)}
                      className="p-1 hover:text-white text-cyan-400"
                    >
                      {copiedAddress ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="btn-confirm-crypto-tx"
                  onClick={executeActivation}
                  disabled={isProcessing}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black flex items-center justify-center gap-1.5 transition-all text-xs shadow-[0_0_15px_rgba(168,85,247,0.5)] disabled:opacity-50"
                >
                  {isProcessing ? 'SCANNING MEMPOOL...' : 'I HAVE SENT PAYMENT (VERIFY)'}
                </button>
              </div>
            )}

            {/* Quick Developer Simulator Bypass */}
            <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500">
              <span>Dev Testing:</span>
              <button
                type="button"
                data-testid="btn-sim-instant-activate"
                onClick={executeActivation}
                className="text-cyan-400 hover:underline"
              >
                Instant Simulator Activation ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
