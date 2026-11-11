import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, GitCommit, Terminal, Play, Wrench, Zap, ExternalLink } from 'lucide-react';

export default function SelfHealingSentry() {
    const [isHealing, setIsHealing] = useState(false);
    const [healedStatus, setHealedStatus] = useState(null);

    const [incidents, setIncidents] = useState([
        {
            id: 'inc_882',
            source: 'Stripe Webhook Endpoint',
            error: '504 Gateway Timeout (Main thread blocked by heavy sync loop)',
            retried: '3 times (Asynq Jitter Backoff)',
            status: 'replayed_ok',
            affected: 'invoice.payment_succeeded ($4,200.00)',
            rca: 'Heavy synchronous analytics write was moved to Asynq background queue.'
        },
        {
            id: 'inc_883',
            source: 'Netlify Edge Function Proxy',
            error: '500 Internal Loop (Edge redirect rule misconfiguration)',
            retried: '1 time',
            status: 'healed',
            affected: '/autopilot/* routing table',
            rca: 'Rule strictly enforced: Hard 301 redirect applied instead of edge masking proxy.'
        },
        {
            id: 'inc_884',
            source: 'Supabase Postgres Pooler',
            error: 'Connection Limit Warning (88% pool capacity utilized)',
            retried: 'Automated Pool Flush',
            status: 'normal',
            affected: 'Transaction Pool: 54 active clients',
            rca: 'Idle connections terminated via Foreman configuration script.'
        }
    ]);

    const handleTriggerSelfHealing = () => {
        setIsHealing(true);
        setHealedStatus('Correlating error stack trace with recent GitNexus commits...');

        setTimeout(() => {
            setHealedStatus('Compiling edge middleware fix & dispatching Asynq replay daemon...');
        }, 1500);

        setTimeout(() => {
            setIsHealing(false);
            setHealedStatus('System fully self-healed. 0 dropped webhooks. All queues healthy.');
        }, 3000);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <ShieldCheck size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Self-Healing Webhook & Infrastructure Sentry
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Zero-Drop Watchdog
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Autonomous Webhook Replay • LLM Root-Cause Analysis (RCA)</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleTriggerSelfHealing}
                        disabled={isHealing}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isHealing
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        }`}
                    >
                        {isHealing ? <RefreshCw size={13} className="animate-spin" /> : <Wrench size={13} />}
                        {isHealing ? 'Healing System...' : 'Trigger Sentry Self-Heal'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Healing Notification */}
                {healedStatus && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-400 animate-in fade-in">
                        <CheckCircle2 size={16} />
                        <span className="font-mono">{healedStatus}</span>
                    </div>
                )}

                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Webhook Reliability</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">99.998%</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Autonomous Replays</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">128 <span className="text-xs text-slate-500">recovered</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avg Mean Time to Heal</p>
                        <p className="text-xl font-bold text-indigo-400 mt-1">420ms</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dead-Letter Queue</p>
                        <p className="text-xl font-bold text-slate-200 mt-1">0 <span className="text-xs text-emerald-400">(Clean)</span></p>
                    </div>
                </div>

                {/* Incidents Stream */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between">
                        <span>Resolved Webhook & Runtime Incidents</span>
                        <span className="font-mono text-[10px] text-slate-500">Autonomous RCA Engine Active</span>
                    </div>
                    <div className="divide-y divide-slate-800/70">
                        {incidents.map((inc) => (
                            <div key={inc.id} className="p-4 space-y-2 hover:bg-slate-800/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-200">{inc.source}</span>
                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                            {inc.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono text-slate-400">{inc.retried}</span>
                                </div>
                                <p className="text-xs font-mono text-red-400">{inc.error}</p>
                                <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg text-[11px] text-slate-300 flex items-start gap-2">
                                    <GitCommit size={13} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Root Cause Fix:</strong> {inc.rca}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Terminal size={14} className="text-emerald-400" />
                        Sentry Daemon: <strong>Monitoring Foreman bare-metal logs, Netlify deploy webhooks & Stripe endpoints.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Zero-Drop SLA 100%</span>
                </div>
            </div>
        </div>
    );
}
