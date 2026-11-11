import React, { useState } from 'react';
import { DollarSign, ShieldAlert, PhoneCall, MessageSquare, ArrowUpRight, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Zap, TrendingUp, CreditCard } from 'lucide-react';

export default function RevenueRecoveryEngine() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationLog, setSimulationLog] = useState(null);

    const [recoveryMetrics, setRecoveryMetrics] = useState({
        recoveredMRR: '$38,420',
        recoveryRate: '31.8%',
        atRiskPipeline: '$118,500',
        activeDunningCases: 42
    });

    const [activeCases, setActiveCases] = useState([
        {
            id: 'dun_9021',
            customer: 'Alexander Wright (Luxe Corp)',
            amount: '$2,450.00 / mo',
            trigger: 'Stripe: invoice.payment_failed (Card Expired)',
            channel: 'Voice AI VIP Call + SMS',
            status: 'recovering',
            urgency: 'high'
        },
        {
            id: 'dun_9022',
            customer: 'Elena Rostova (Atelier Mode)',
            amount: '$890.00',
            trigger: 'Shopify: Cart Abandoned ($1,240 cart value)',
            channel: 'WhatsApp 1-Click Apple Pay Link',
            status: 'recovered',
            urgency: 'medium'
        },
        {
            id: 'dun_9023',
            customer: 'Marcus Vance (Quantum Ventures)',
            amount: '$4,800.00 / mo',
            trigger: 'RevenueCat: subscription_canceled (Exit Intent)',
            channel: 'Dynamic Retention Offer (20% off 3 mos)',
            status: 'recovered',
            urgency: 'high'
        }
    ]);

    const simulateFailedCheckout = () => {
        setIsSimulating(true);
        setSimulationLog('Detecting Stripe webhook: invoice.payment_failed for Customer #9921 ($3,200/mo)...');

        setTimeout(() => {
            setSimulationLog('Dispatching Asynq background dunning task via Redis queue...');
        }, 1200);

        setTimeout(() => {
            setSimulationLog('LiveKit Voice Copilot placing autonomous VIP concierge phone call...');
        }, 2400);

        setTimeout(() => {
            setIsSimulating(false);
            setSimulationLog(null);
            const newCase = {
                id: `dun_${Math.floor(1000 + Math.random() * 9000)}`,
                customer: 'Seraphina Lin (Apex Holdings)',
                amount: '$3,200.00 / mo',
                trigger: 'Stripe: invoice.payment_failed',
                channel: 'Voice AI Call + SMS Payment Link',
                status: 'recovered',
                urgency: 'high'
            };
            setActiveCases(prev => [newCase, ...prev]);
            setRecoveryMetrics(prev => ({
                ...prev,
                recoveredMRR: '$41,620',
                recoveryRate: '33.4%'
            }));
        }, 4000);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <DollarSign size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Revenue Recovery & Smart Dunning Engine
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Stripe & RevenueCat Sync
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Autonomous Churn Mitigation • LiveKit Voice & SMS Recovery</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={simulateFailedCheckout}
                        disabled={isSimulating}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isSimulating
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        }`}
                    >
                        {isSimulating ? <RefreshCw size={13} className="animate-spin" /> : <Zap size={13} />}
                        Simulate Payment Failure
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Recovered MRR (30d)</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">{recoveryMetrics.recoveredMRR}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dunning Recovery Rate</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">{recoveryMetrics.recoveryRate} <span className="text-xs text-emerald-400 font-normal">(+8.2% vs avg)</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">At-Risk Invoices</p>
                        <p className="text-xl font-bold text-amber-400 mt-1">{recoveryMetrics.atRiskPipeline}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Agents</p>
                        <p className="text-xl font-bold text-slate-200 mt-1">4 Channels <span className="text-[10px] text-slate-500">(Auto)</span></p>
                    </div>
                </div>

                {/* Simulation Stream */}
                {isSimulating && simulationLog && (
                    <div className="p-3.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-xs font-mono text-emerald-400 animate-in fade-in">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{simulationLog}</span>
                    </div>
                )}

                {/* Active Recovery Stream */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span>Live Dunning & Churn Interventions</span>
                        <span className="font-mono text-[10px] text-slate-500">Autonomous Webhook Listener: /api/webhooks/dunning</span>
                    </div>
                    <div className="divide-y divide-slate-800/70">
                        {activeCases.map((c) => (
                            <div key={c.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xs font-bold text-slate-200">{c.customer}</h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                                            c.status === 'recovered' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                                        }`}>
                                            {c.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-mono">{c.trigger} • <strong className="text-slate-200">{c.amount}</strong></p>
                                    <div className="flex items-center gap-1.5 text-[11px] text-indigo-400">
                                        <PhoneCall size={11} />
                                        <span>Agent Action: {c.channel}</span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                        {c.status === 'recovered' ? <CheckCircle2 size={14} /> : <RefreshCw size={14} className="animate-spin text-amber-400" />}
                                        {c.status === 'recovered' ? 'Recovered' : 'Engaging...'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-400" />
                        Smart Policy: <strong>High-value accounts (&gt;$1,000/mo) receive LiveKit Voice concierge calls within 90 seconds of payment failure.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Active & Armed</span>
                </div>
            </div>
        </div>
    );
}
