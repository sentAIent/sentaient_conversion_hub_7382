import React, { useState } from 'react';
import { Briefcase, FileText, CheckCircle2, DollarSign, ArrowRight, RefreshCw, Send, ShieldCheck, Sparkles, Building2, Clock } from 'lucide-react';

export default function B2BNegotiationEngine() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [issuedInvoice, setIssuedInvoice] = useState(null);

    const [rfqs, setRfqs] = useState([
        {
            id: 'rfq_4891',
            client: 'Nordic Luxury Hospitality Group',
            contact: 'Astrid Lindqvist (VP Procurement)',
            items: '250x Tuscan Weekender Duffles with custom brass crest',
            requestedPrice: '$1,150 / unit (Retail: $1,450)',
            offeredDiscount: '20.6% Discount',
            grossMargin: '54.2% (Healthy)',
            totalValue: '$287,500.00',
            terms: 'Net-30 via Stripe Invoicing',
            status: 'negotiating',
            aiRationale: 'Client order volume exceeds $250k. Granting 20.6% discount retains 54.2% margin and locks in 3-year hospitality renewal option.'
        },
        {
            id: 'rfq_4892',
            client: 'Apex Aviation Partners',
            contact: 'Harrison Cole (Fleet Operations)',
            items: '80x Cashmere Pilot Flight Jackets',
            requestedPrice: '$680 / unit (Retail: $890)',
            offeredDiscount: '23.5% Discount',
            grossMargin: '48.1% (Approved)',
            totalValue: '$54,400.00',
            terms: '50% Upfront, 50% on Delivery',
            status: 'approved',
            aiRationale: 'Volume threshold met. Cash upfront mitigates inventory holding cost.'
        }
    ]);

    const handleIssueContract = (rfqId) => {
        setIsSimulating(true);
        setTimeout(() => {
            setIsSimulating(false);
            setIssuedInvoice(`Formal Wholesale Contract & Net-30 Stripe Invoice issued for ${rfqId.toUpperCase()} ($287,500.00)`);
            setRfqs(prev => prev.map(r => r.id === rfqId ? { ...r, status: 'contract_issued' } : r));
        }, 1500);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Briefcase size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            B2B Wholesale RFQ & Negotiation Engine
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                Autonomous Net-30 Invoicing
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Automated Enterprise Volume Pricing • Stripe Invoicing Native</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <Clock size={11} /> Margin Guardrail: 45% Min
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {issuedInvoice && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-400 animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            <span>{issuedInvoice}</span>
                        </div>
                        <button className="underline font-semibold text-[11px]">View Stripe Invoice</button>
                    </div>
                )}

                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Pipeline RFQs</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">$341,900</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avg Close Speed</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">4.2 hours <span className="text-xs font-normal text-slate-500">(Autonomous)</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avg Gross Margin</p>
                        <p className="text-xl font-bold text-indigo-400 mt-1">52.4%</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Contract Win Rate</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">84%</p>
                    </div>
                </div>

                {/* RFQs List */}
                <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block px-1">Inbound Wholesale Opportunities</span>

                    {rfqs.map((rfq) => (
                        <div key={rfq.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-all space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xs font-bold text-slate-200">{rfq.client}</h4>
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                            rfq.status === 'contract_issued' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            rfq.status === 'approved' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                            {rfq.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400">{rfq.contact} • Terms: {rfq.terms}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-mono font-bold text-emerald-400">{rfq.totalValue}</p>
                                    <span className="text-[10px] text-slate-500 font-mono">{rfq.offeredDiscount}</span>
                                </div>
                            </div>

                            <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs space-y-1">
                                <p className="font-semibold text-slate-300">Items: {rfq.items}</p>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-sans italic">
                                    <strong>AI Negotiation Strategy:</strong> {rfq.aiRationale}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[11px] font-mono text-slate-400">
                                    Protected Margin: <strong className="text-emerald-400">{rfq.grossMargin}</strong>
                                </span>

                                {rfq.status === 'negotiating' && (
                                    <button
                                        onClick={() => handleIssueContract(rfq.id)}
                                        disabled={isSimulating}
                                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all"
                                    >
                                        <FileText size={13} />
                                        {isSimulating ? 'Generating Contract...' : 'Issue Net-30 Invoiced PO'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-indigo-400" />
                        Automated Signature Loop: <strong>Contracts auto-route to DocuSign API + Stripe Invoicing webhook.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">100% Compliant</span>
                </div>
            </div>
        </div>
    );
}
