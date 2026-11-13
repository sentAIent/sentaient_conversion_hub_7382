import React, { useState } from 'react';
import { Eye, Globe, Play, ShieldAlert, Monitor, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Terminal, Sliders, ExternalLink, Sparkles } from 'lucide-react';

export default function GhostAutopilotAuditor() {
    const [targetUrl, setTargetUrl] = useState('https://store.luxurygoods-demo.com');
    const [persona, setPersona] = useState('mobile_shopper');
    const [isRunning, setIsRunning] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [showTakeoverModal, setShowTakeoverModal] = useState(false);
    const [auditResults, setAuditResults] = useState(null);

    const personas = [
        { id: 'mobile_shopper', name: 'Impatient Mobile Shopper', desc: 'Simulates iOS Safari on 4G, detects layout shift and slow checkout.' },
        { id: 'cart_abandoner', name: 'Coupon Hunter / Price Sensitive', desc: 'Searches for promo codes, tests micro-interactions on discount apply.' },
        { id: 'accessibility', name: 'High-Friction Screen Reader', desc: 'Tests keyboard navigation, tap target spacing (<48px), and ARIA contrast.' }
    ];

    const runAutonomousAudit = () => {
        setIsRunning(true);
        setStepIndex(1);
        setAuditResults(null);

        // Simulation steps representing Browser-Use headless agent execution
        setTimeout(() => setStepIndex(2), 1200);
        setTimeout(() => setStepIndex(3), 2600);
        setTimeout(() => setStepIndex(4), 4000);

        setTimeout(() => {
            setIsRunning(false);
            setStepIndex(5);
            setAuditResults({
                score: 68,
                potentialLift: '+18.4% Revenue Lift',
                frictionPoints: [
                    {
                        severity: 'critical',
                        title: 'Checkout Button Latency Spike (3.4s on Mobile)',
                        desc: 'Unoptimized third-party tracking scripts block main thread on "Proceed to Checkout" click.',
                        impact: '-$12,400 / mo estimated loss'
                    },
                    {
                        severity: 'warning',
                        title: 'Discount Code Layout Shift (CLS: 0.28)',
                        desc: 'Applying a coupon pushes the Apple Pay button off the viewport fold, inducing drop-off.',
                        impact: '8.2% drop-off at payment phase'
                    },
                    {
                        severity: 'info',
                        title: 'Zero Live Support / Exit-Intent Defense',
                        desc: 'No automated Voice Copilot or exit-intent recovery triggered on bounce.',
                        impact: 'Missed recovery on 340 sessions/day'
                    }
                ],
                recommendedAction: 'Apply Sentaient Auto-Fix Bundle (Edge Script Compression + Netlify Instant Deploy)'
            });
        }, 5200);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl relative">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Eye size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Ghost Autopilot • Conversion Auditor
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                Browser-Use & RustDesk Engine
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Autonomous Headless Navigation • Live DOM Friction Telemetry</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowTakeoverModal(true)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                        <Monitor size={13} className="text-cyan-400" />
                        RustDesk Screen Takeover
                    </button>
                    
                    <button
                        onClick={runAutonomousAudit}
                        disabled={isRunning}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isRunning 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                        }`}
                    >
                        {isRunning ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
                        {isRunning ? 'Auditing DOM...' : 'Launch Autopilot Audit'}
                    </button>
                </div>
            </div>

            {/* Target URL & Persona Bar */}
            <div className="px-5 py-3 bg-slate-900/40 border-b border-slate-800 flex items-center gap-4 text-xs">
                <div className="flex-1 flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5">
                    <Globe size={14} className="text-slate-500" />
                    <input
                        type="text"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="https://client-store.com"
                        className="w-full bg-transparent text-slate-200 focus:outline-none text-xs font-mono"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Auditing Persona:</span>
                    <select
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                        {personas.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* When Running: Execution Stream */}
                {isRunning && (
                    <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                                <Terminal size={14} />
                                Headless Browser-Use Agent Running
                            </div>
                            <span className="font-mono text-[10px] text-slate-500">Target: {targetUrl}</span>
                        </div>

                        <div className="space-y-3 font-mono text-xs">
                            <div className={`flex items-center gap-2.5 ${stepIndex >= 1 ? 'text-slate-200' : 'text-slate-600'}`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${stepIndex > 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400 animate-pulse'}`}>1</span>
                                <span>[Browser-Use] Initializing Chromium headless instance (iOS Viewport 390x844)...</span>
                            </div>
                            <div className={`flex items-center gap-2.5 ${stepIndex >= 2 ? 'text-slate-200' : 'text-slate-600'}`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${stepIndex > 2 ? 'bg-emerald-500/20 text-emerald-400' : stepIndex === 2 ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-slate-800'}`}>2</span>
                                <span>[Vision-LLM] Parsing product landing page hero CTA and Add to Cart layout...</span>
                            </div>
                            <div className={`flex items-center gap-2.5 ${stepIndex >= 3 ? 'text-slate-200' : 'text-slate-600'}`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${stepIndex > 3 ? 'bg-emerald-500/20 text-emerald-400' : stepIndex === 3 ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-slate-800'}`}>3</span>
                                <span>[Interaction] Simulating coupon code input; measuring Cumulative Layout Shift (CLS)...</span>
                            </div>
                            <div className={`flex items-center gap-2.5 ${stepIndex >= 4 ? 'text-slate-200' : 'text-slate-600'}`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${stepIndex >= 4 ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-slate-800'}`}>4</span>
                                <span>[Checkout Telemetry] Profiling main-thread execution time on final payment trigger...</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Audit Results */}
                {auditResults && !isRunning && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        {/* Summary Scorecard */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Store Friction Score</p>
                                    <p className="text-2xl font-bold text-amber-400 mt-1">{auditResults.score} <span className="text-xs text-slate-500">/ 100</span></p>
                                </div>
                                <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <AlertCircle size={20} />
                                </div>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Projected Opportunity</p>
                                    <p className="text-xl font-bold text-emerald-400 mt-1">{auditResults.potentialLift}</p>
                                </div>
                                <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <Sparkles size={20} />
                                </div>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Automated Fixes</p>
                                    <p className="text-xl font-bold text-cyan-400 mt-1">3 Ready</p>
                                </div>
                                <div className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    <CheckCircle2 size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Friction Points List */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-200">
                                Detected Conversion Bottlenecks
                            </div>
                            <div className="divide-y divide-slate-800/70">
                                {auditResults.frictionPoints.map((item, idx) => (
                                    <div key={idx} className="p-4 flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                                    item.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                    item.severity === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                }`}>
                                                    {item.severity}
                                                </span>
                                                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                                            </div>
                                            <p className="text-xs text-slate-400">{item.desc}</p>
                                        </div>
                                        <div className="text-right whitespace-nowrap">
                                            <span className="text-xs font-mono font-semibold text-red-400">{item.impact}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Auto-Deploy Fix Button */}
                        <div className="p-4 bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-xs font-bold text-cyan-300">Generate One-Click Conversion Patch</h4>
                                <p className="text-[11px] text-slate-400">Compiles headless fixes into an edge middleware bundle for Netlify / Cloudflare.</p>
                            </div>
                            <button className="px-4 py-2 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20">
                                Push Patch Preview <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Idle Placeholder */}
                {!isRunning && !auditResults && (
                    <div className="h-48 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-6 text-slate-500">
                        <Eye size={32} className="text-slate-600 mb-2" />
                        <p className="text-xs font-medium text-slate-400">No active audit running.</p>
                        <p className="text-[11px] text-slate-500 mt-1">Enter a store URL above and launch the Browser-Use agent to simulate live shopping friction.</p>
                    </div>
                )}
            </div>

            {/* RustDesk Screen Takeover Modal */}
            {showTakeoverModal && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-30 p-6 flex flex-col animate-in fade-in">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Monitor className="text-cyan-400" size={18} />
                            <div>
                                <h4 className="text-sm font-bold text-slate-200">RustDesk Remote Takeover Session</h4>
                                <p className="text-[11px] text-slate-500">Encrypted Relay ID: 894-209-112 • Relay Server: sentaient-relay.internal:21116</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowTakeoverModal(false)}
                            className="px-3 py-1 rounded-md text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                            Close Session
                        </button>
                    </div>

                    <div className="flex-1 my-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
                            <Monitor size={28} />
                        </div>
                        <h5 className="text-sm font-bold text-slate-200">Live Client Co-Browsing Ready</h5>
                        <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
                            Your support staff can now interact with the client’s browser in real-time, demonstrate checkout fixes, or guide them through configuration.
                        </p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20">
                                Request Control Pass
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
                                Share View-Only Stream
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
