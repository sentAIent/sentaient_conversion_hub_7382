import React, { useState } from 'react';
import { LineChart, TrendingUp, Users, DollarSign, Calendar, Sparkles, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function PredictiveLTVAnalytics() {
    const [selectedCohort, setSelectedCohort] = useState('voice_assisted');

    const cohorts = [
        {
            id: 'voice_assisted',
            name: 'Voice Agent Assisted Buyers',
            predicted12MoLTV: '$4,280.00',
            multiplier: '3.01x Baseline',
            retention90d: '68.4%',
            repeatFrequency: '3.2 orders / yr',
            avgOrderValue: '$1,340.00',
            description: 'Customers who interacted with the LiveKit Voice Copilot during purchase show highest brand loyalty and near-zero returns.'
        },
        {
            id: 'viewer_3d',
            name: '3D glTF Mesh Engaged Buyers',
            predicted12MoLTV: '$2,890.00',
            multiplier: '2.03x Baseline',
            retention90d: '52.1%',
            repeatFrequency: '2.4 orders / yr',
            avgOrderValue: '$1,204.00',
            description: 'Shoppers who rotated 3D product models in the browser have a 78% lower return rate and higher repeat intent.'
        },
        {
            id: 'standard_checkout',
            name: 'Standard Direct Checkout (Baseline)',
            predicted12MoLTV: '$1,420.00',
            multiplier: '1.0x Baseline',
            retention90d: '24.8%',
            repeatFrequency: '1.2 orders / yr',
            avgOrderValue: '$1,180.00',
            description: 'Unassisted shoppers without interactive AI copilot interaction.'
        }
    ];

    const activeCohort = cohorts.find(c => c.id === selectedCohort) || cohorts[0];

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        <TrendingUp size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Predictive Customer Lifetime Value (LTV)
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                PostHog & Twenty CRM Sync
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">12-Month Cohort LTV Forecasting • Churn Risk Attribution</p>
                    </div>
                </div>

                <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
                    {cohorts.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedCohort(c.id)}
                            className={`px-2.5 py-1 rounded font-medium transition-all ${selectedCohort === c.id ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            {c.name.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">12-Month Predicted LTV</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">{activeCohort.predicted12MoLTV}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Cohort Multiplier</p>
                        <p className="text-xl font-bold text-pink-400 mt-1">{activeCohort.multiplier}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">90-Day Retention</p>
                        <p className="text-xl font-bold text-indigo-400 mt-1">{activeCohort.retention90d}</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Order Frequency</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">{activeCohort.repeatFrequency}</p>
                    </div>
                </div>

                {/* Cohort Detail Box */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                            <span className="text-[10px] font-mono text-pink-400 uppercase tracking-wider">Active Cohort Analysis</span>
                            <h4 className="text-sm font-bold text-slate-100 mt-0.5">{activeCohort.name}</h4>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
                            Average Order: {activeCohort.avgOrderValue}
                        </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                        {activeCohort.description}
                    </p>

                    {/* LTV Curve Simulation Graphic */}
                    <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">12-Month Projected Equity Curve</span>
                        <div className="h-20 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-end justify-between gap-2">
                            {[20, 32, 45, 58, 66, 74, 82, 88, 92, 95, 98, 100].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div 
                                        className="w-full bg-gradient-to-t from-pink-600 to-indigo-500 rounded-t-sm transition-all duration-500" 
                                        style={{ height: `${(h / 100) * 54}px` }}
                                    />
                                    <span className="text-[9px] font-mono text-slate-500">M{i+1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <HeartHandshake size={14} className="text-pink-400" />
                        Automated Retention Rule: <strong>Customers in high-LTV cohorts who pass 45 days without an order automatically receive a personalized VIP concierge note.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Active</span>
                </div>
            </div>
        </div>
    );
}
