import React, { useState } from 'react';
import { Server, Database, Shapes, Cpu, ArrowRight, CheckCircle2, Shield, Layers, LayoutGrid, Download } from 'lucide-react';

export default function EnterpriseIntegrationSuite() {
    const [activeTab, setActiveTab] = useState('foreman');
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleAction = (msg) => {
        setIsProcessing(true);
        setSuccessMsg('');
        setTimeout(() => {
            setIsProcessing(false);
            setSuccessMsg(msg);
        }, 2000);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Shield size={18} className="text-cyan-400" />
                    <h3 className="font-bold text-sm">Enterprise Integration Suite</h3>
                </div>
                <div className="flex gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                    <TabButton active={activeTab === 'foreman'} onClick={() => setActiveTab('foreman')} icon={<Server size={14} />} label="Foreman" />
                    <TabButton active={activeTab === 'nhost'} onClick={() => setActiveTab('nhost')} icon={<Database size={14} />} label="Nhost" />
                    <TabButton active={activeTab === 'aria'} onClick={() => setActiveTab('aria')} icon={<Shapes size={14} />} label="Aria Icons" />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#0b0c10] relative">
                
                {isProcessing && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 animate-in fade-in">
                        <Cpu size={48} className="text-cyan-400 animate-pulse mb-4" />
                        <p className="text-cyan-400 font-bold text-sm">Executing Infrastructure Changes...</p>
                    </div>
                )}

                {successMsg && !isProcessing && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 size={20} />
                        <span className="text-sm font-semibold">{successMsg}</span>
                    </div>
                )}

                {/* Foreman Tab */}
                {activeTab === 'foreman' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
                                <Server className="text-blue-400" /> Foreman Bare-Metal Provisioning
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Bypass Docker entirely. Provision physically isolated 'Matrix Pods' (Bare-Metal Linux VMs) for enterprise clients demanding strict HIPAA/SOC2 compliance.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => handleAction("Successfully provisioned 3 RustDesk Relay Nodes.")}>
                                <Cpu size={24} className="text-blue-400 mb-3" />
                                <h5 className="font-bold text-slate-200 text-sm mb-1">RustDesk Relays</h5>
                                <p className="text-xs text-slate-500">Deploy high-bandwidth signal servers for AI Screen Takeovers.</p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => handleAction("Successfully allocated 1x A100 GPU Pod.")}>
                                <Layers size={24} className="text-purple-400 mb-3" />
                                <h5 className="font-bold text-slate-200 text-sm mb-1">AI Inference Pods</h5>
                                <p className="text-xs text-slate-500">Provision dedicated hardware for isolated Web-LLM execution.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nhost Tab */}
                {activeTab === 'nhost' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
                                <Database className="text-emerald-400" /> Nhost Headless Migrator
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Is a client's legacy backend killing their Core Web Vitals? Automatically migrate their WordPress/Magento database to a unified Nhost Postgres instance with an auto-generated GraphQL API.
                            </p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legacy Database URI</label>
                                <input type="text" placeholder="mysql://user:pass@legacy-host:3306/db" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
                            </div>
                            <button 
                                onClick={() => handleAction("Migration Complete. Nhost GraphQL Endpoint generated at: https://nhost.sentaient.com/v1/graphql")}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                Trigger Database Migration <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Aria Icons Tab */}
                {activeTab === 'aria' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-2">
                                <Shapes className="text-pink-400" /> Aria UI Icon System
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Standardize the Sentaient ecosystem UI. Replace heavy icon bundles with ultra-lightweight, visually consistent Aria SVGs to eliminate export crashes and boost LCP load times.
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="aspect-square bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors cursor-pointer">
                                    <LayoutGrid size={28} className="text-slate-400" />
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => handleAction("Aria-Icons successfully injected into Sentaient global stylesheet.")}
                            className="w-full border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Download size={16} /> Update Global UI Kit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${active ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
        >
            {icon} {label}
        </button>
    );
}
