import React, { useState } from 'react';
import { GitBranch, Sparkles, TrendingUp, ArrowUpRight, CheckCircle2, Play, RefreshCw, Sliders, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export default function AutonomousABEngine() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [trafficSplit, setTrafficSplit] = useState({ control: 50, variantB: 25, variantC: 25 });
    const [deployedStatus, setDeployedStatus] = useState(null);

    const [variants, setVariants] = useState([
        {
            id: 'control',
            name: 'Variant A (Control - Production)',
            description: 'Original static landing page with standard hero and generic "Buy Now" button.',
            cr: '2.14%',
            sessions: '18,420',
            revenue: '$39,418',
            status: 'active',
            badge: 'Control',
            badgeColor: 'bg-slate-800 text-slate-300'
        },
        {
            id: 'variantB',
            name: 'Variant B (Social Proof & Micro-Motion)',
            description: 'Sticky dynamic cart drawer with live stock counters and floating verification badge.',
            cr: '2.62%',
            sessions: '9,210',
            revenue: '$24,130',
            status: 'active',
            badge: '+22.4% Lift',
            badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        },
        {
            id: 'variantC',
            name: 'Variant C (Minimalist Accelerated Checkout)',
            description: 'High-contrast Apple Pay / Shop Pay 1-click trigger, removing 3 checkout form inputs.',
            cr: '2.84%',
            sessions: '9,190',
            revenue: '$26,100',
            status: 'winner_projected',
            badge: 'Projected Winner (+32.7%)',
            badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
        }
    ]);

    const handleAutoGenerateVariants = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setDeployedStatus('Netlify preview branch created: https://preview-variant-c-sentaient.netlify.app');
        }, 2500);
    };

    const handlePromoteWinner = (variantId) => {
        setDeployedStatus(`Promoting ${variantId === 'variantC' ? 'Variant C' : 'Variant B'} to 100% Production Traffic on Netlify.`);
        setTrafficSplit({ control: 0, variantB: 0, variantC: 100 });
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        <GitBranch size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Autonomous A/B Conversion Engine
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                PostHog Closed-Loop
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Continuous Bayesian Variant Optimization • Zero-Downtime Deployment</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleAutoGenerateVariants}
                        disabled={isGenerating}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isGenerating
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                        }`}
                    >
                        {isGenerating ? <RefreshCw size={13} className="animate-spin" /> : <Sparkles size={13} />}
                        {isGenerating ? 'Synthesizing...' : 'AI Generate Variants'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Status Alert if deployed */}
                {deployedStatus && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-400 animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            <span>{deployedStatus}</span>
                        </div>
                        <a href="https://netlify.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold underline">
                            View Netlify Deploy <ExternalLink size={12} />
                        </a>
                    </div>
                )}

                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Sample</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">36,820 <span className="text-xs text-slate-500">sessions</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Baseline CR</p>
                        <p className="text-xl font-bold text-slate-300 mt-1">2.14%</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Leading Variant CR</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">2.84% <span className="text-xs font-normal text-emerald-400 font-mono">(+32.7%)</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Projected MRR Lift</p>
                        <p className="text-xl font-bold text-pink-400 mt-1">+$18,920 / mo</p>
                    </div>
                </div>

                {/* Variants List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                        <span>Active Tested Variants (Bayesian Confidence: 98.4%)</span>
                        <span className="text-slate-500 font-mono text-[10px]">Traffic Alloc: {trafficSplit.control}% / {trafficSplit.variantB}% / {trafficSplit.variantC}%</span>
                    </div>

                    {variants.map((v) => (
                        <div key={v.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-all flex items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-xs font-bold text-slate-200">{v.name}</h4>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${v.badgeColor}`}>
                                        {v.badge}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                                    <span>CR: <strong className="text-slate-200">{v.cr}</strong></span>
                                    <span>•</span>
                                    <span>Sessions: {v.sessions}</span>
                                    <span>•</span>
                                    <span>Revenue: <strong className="text-emerald-400">{v.revenue}</strong></span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {v.id !== 'control' && (
                                    <button
                                        onClick={() => handlePromoteWinner(v.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1"
                                    >
                                        <Zap size={13} />
                                        Promote to 100%
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Automation Rules */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-pink-400" />
                        Autopilot Policy: <strong>Auto-flip traffic to winner when Bayesian certainty &gt; 95% over 1,000 conversions.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Active</span>
                </div>
            </div>
        </div>
    );
}
