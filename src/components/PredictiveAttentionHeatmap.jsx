import React, { useState } from 'react';
import { Eye, Layers, Sparkles, CheckCircle2, TrendingUp, Sliders, ShieldCheck, Zap, Image as ImageIcon } from 'lucide-react';

export default function PredictiveAttentionHeatmap() {
    const [showHeatmap, setShowHeatmap] = useState(true);
    const [optimizationMode, setOptimizationMode] = useState('after'); // 'before' | 'after'

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        <Eye size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Predictive Attention & Gaze Heatmap AI
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                Neural Saliency Vision
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Pre-Deployment 3-Second Eye-Tracking Simulation • Visual Hierarchy Audit</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                            showHeatmap 
                                ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                    >
                        <Layers size={13} />
                        {showHeatmap ? 'Heatmap: On' : 'Heatmap: Off'}
                    </button>

                    <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
                        <button
                            onClick={() => setOptimizationMode('before')}
                            className={`px-2.5 py-1 rounded font-medium transition-all ${optimizationMode === 'before' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                        >
                            Before Fix
                        </button>
                        <button
                            onClick={() => setOptimizationMode('after')}
                            className={`px-2.5 py-1 rounded font-medium transition-all ${optimizationMode === 'after' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
                        >
                            After Sentaient Fix
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Primary CTA Saliency</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">{optimizationMode === 'after' ? '86%' : '38%'}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Time-to-First-Fixation</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">{optimizationMode === 'after' ? '180ms' : '840ms'}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Cognitive Clutter Index</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">{optimizationMode === 'after' ? '12% (Low)' : '68% (High)'}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Predicted Conversion Lift</p>
                        <p className="text-xl font-bold text-pink-400 mt-1">{optimizationMode === 'after' ? '+26.4%' : 'Baseline'}</p>
                    </div>
                </div>

                {/* Simulated Store Page Preview with Heatmap Overlay */}
                <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 min-h-[220px] flex items-center justify-between">
                    <div className="space-y-3 max-w-sm relative z-10">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">New Capsule Collection</span>
                        <h4 className="text-xl font-bold text-slate-100 tracking-tight leading-snug">
                            Handcrafted Italian Tuscan Calfskin Travel Duffle
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Structured silhouette, solid brass hardware, and personalized blind-embossed monogramming.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <button className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20">
                                Pre-Order Now — $1,450
                            </button>
                            <span className="text-xs text-slate-400">Complimentary Global Courier</span>
                        </div>
                    </div>

                    <div className="w-56 h-40 bg-slate-950 border border-slate-800 rounded-xl relative flex items-center justify-center overflow-hidden z-10">
                        <ImageIcon size={36} className="text-slate-700" />
                        <span className="absolute bottom-2 text-[10px] font-mono text-slate-500">3D glTF Mesh Render</span>
                    </div>

                    {/* Saliency Heatmap Overlay (Gaussian Blobs) */}
                    {showHeatmap && (
                        <div className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-70 animate-in fade-in">
                            {/* Hot spot on CTA button */}
                            <div className="absolute left-16 bottom-6 w-36 h-20 bg-red-500 blur-2xl rounded-full opacity-80" />
                            {/* Warm spot on headline */}
                            <div className="absolute left-12 top-10 w-48 h-20 bg-yellow-400 blur-3xl rounded-full opacity-50" />
                            {/* Focus spot on product image */}
                            <div className="absolute right-12 top-8 w-44 h-32 bg-red-600 blur-2xl rounded-full opacity-60" />
                        </div>
                    )}
                </div>

                {/* Recommendation Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Sparkles size={14} className="text-pink-400" />
                        Saliency Verdict: <strong>CTA gaze capture increased from 38% to 86% by removing competing visual banner clutter.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Grade A+ Visual Flow</span>
                </div>
            </div>
        </div>
    );
}
