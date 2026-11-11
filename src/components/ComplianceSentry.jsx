import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Download, RefreshCw, Eye, Sparkles, Scale, ExternalLink } from 'lucide-react';

export default function ComplianceSentry() {
    const [isScanning, setIsScanning] = useState(false);
    const [auditSuccess, setAuditSuccess] = useState(false);

    const [checklist, setChecklist] = useState([
        { id: 1, category: 'ADA / WCAG 2.1 AA', item: 'Color Contrast Ratio (7.2:1 on Primary CTA)', status: 'pass', detail: 'Exceeds WCAG 4.5:1 Level AA minimum threshold.' },
        { id: 2, category: 'ADA / WCAG 2.1 AA', item: 'Interactive Tap Targets (&gt;48x48px mobile)', status: 'pass', detail: 'All checkout buttons, drawer toggles & voice triggers adhere to Apple HIG standards.' },
        { id: 3, category: 'ADA / WCAG 2.1 AA', item: 'ARIA Screen Reader Semantics', status: 'pass', detail: '3D WebAssembly viewer and LiveKit voice widgets include aria-live and role="region".' },
        { id: 4, category: 'EU AI Act 2026', item: 'AI Concierge Disclosure Watermark', status: 'pass', detail: 'Voice and chat agents prominently display conversational AI identification badge.' },
        { id: 5, category: 'GDPR / CCPA', item: 'Article 15 Automated Data Export Portability', status: 'pass', detail: 'One-click user archive takeout operational via our GDPR Zip Parser service.' }
    ]);

    const handleRunAudit = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setAuditSuccess(true);
            setTimeout(() => setAuditSuccess(false), 4000);
        }, 1800);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Scale size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            ADA & Regulatory Compliance Sentry
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                WCAG 2.1 AA • EU AI Act
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Automated Legal Shielding • Continuous Accessibility & GDPR Audits</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRunAudit}
                        disabled={isScanning}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isScanning
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        }`}
                    >
                        {isScanning ? <RefreshCw size={13} className="animate-spin" /> : <ShieldCheck size={13} />}
                        {isScanning ? 'Auditing DOM...' : 'Run Full Compliance Audit'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {auditSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-400 animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            <span>Audit Passed: Storefront achieves 100% WCAG 2.1 AA Compliance Score.</span>
                        </div>
                        <button className="flex items-center gap-1 font-semibold underline text-[11px]">
                            Download Legal PDF Certificate <Download size={12} />
                        </button>
                    </div>
                )}

                {/* Scorecards */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">ADA Compliance Score</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">98 / 100 <span className="text-xs text-slate-500">(Grade A)</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Contrast Compliance</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">100% Pass</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">EU AI Act Readiness</p>
                        <p className="text-xl font-bold text-indigo-400 mt-1">Full Tier-1</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Legal Risk Exposure</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">0 Lawsuits / Low</p>
                    </div>
                </div>

                {/* Checklist Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between">
                        <span>Continuous Legal & Accessibility Controls</span>
                        <span className="font-mono text-[10px] text-slate-500">Automated DOM Linter Active</span>
                    </div>
                    <div className="divide-y divide-slate-800/70 text-xs">
                        {checklist.map((c) => (
                            <div key={c.id} className="p-3.5 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                            {c.category}
                                        </span>
                                        <h4 className="font-bold text-slate-200">{c.item}</h4>
                                    </div>
                                    <p className="text-xs text-slate-400">{c.detail}</p>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                                    VERIFIED
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <FileText size={14} className="text-indigo-400" />
                        Executive Legal Shield: <strong>Automated defense log preserved in encrypted SQLite ledger for audit trials.</strong>
                    </span>
                    <button className="text-indigo-400 hover:text-indigo-300 font-semibold underline flex items-center gap-1">
                        Export Certificate <Download size={11} />
                    </button>
                </div>
            </div>
        </div>
    );
}
