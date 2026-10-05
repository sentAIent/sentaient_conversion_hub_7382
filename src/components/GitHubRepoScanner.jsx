import React, { useState } from 'react';
import { Code, Loader2, Code2, Rocket, Search, ShieldAlert } from 'lucide-react';
import { gitnexusService } from '../services/gitnexusService';
import { AISdkClient } from '../services/aiSdkClient';

export default function GitHubRepoScanner() {
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState('idle'); // idle, scanning, complete, error
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('integrator'); // integrator, auditor, teardown

    const handleScan = async (e) => {
        e.preventDefault();
        if (!repoUrl) return;

        setStatus('scanning');
        try {
            // 1. Run GitNexus to generate the codebase map
            const contextMap = await gitnexusService.analyzeRepository(repoUrl);
            
            // 2. Feed the map into the LLM based on the active feature tab
            let prompt = '';
            if (activeTab === 'integrator') {
                prompt = `You are a Senior SDK Integrator. Here is the architectural map of a repository: ${JSON.stringify(contextMap)}. Generate a step-by-step plan and code snippets to inject the SentAIent tracking SDK into their routing layer.`;
            } else if (activeTab === 'auditor') {
                prompt = `You are a Fractional CTO. Review this codebase map: ${JSON.stringify(contextMap)}. Identify any heavy dependencies, blocking scripts, or rendering patterns that hurt Core Web Vitals and Conversion Rates. Give file paths and solutions.`;
            } else if (activeTab === 'trivy') {
                prompt = `You are a DevSecOps Engineer. Review this codebase map: ${JSON.stringify(contextMap)}. Identify any outdated dependencies, missing security headers, or structural patterns that indicate vulnerabilities. Output a Trivy-style security audit prioritizing risks that impact user trust and conversion rates.`;
            } else {
                prompt = `You are a Competitive Analyst. Review this codebase map: ${JSON.stringify(contextMap)}. Explain how they have engineered their checkout, cart recovery, and user onboarding flows.`;
            }

            const aiResponse = await AISdkClient.generate(prompt);
            
            setAnalysis({ map: contextMap, insights: aiResponse });
            setStatus('complete');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Code size={18} className="text-white" />
                    <h3 className="font-bold text-sm">GitNexus Codebase Architect</h3>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <TabButton active={activeTab === 'integrator'} onClick={() => setActiveTab('integrator')} icon={<Rocket size={14} />} label="Auto-Integrator" />
                    <TabButton active={activeTab === 'auditor'} onClick={() => setActiveTab('auditor')} icon={<Code2 size={14} />} label="Vitals Auditor" />
                    <TabButton active={activeTab === 'teardown'} onClick={() => setActiveTab('teardown')} icon={<Search size={14} />} label="Tear-Down" />
                    <TabButton active={activeTab === 'trivy'} onClick={() => setActiveTab('trivy')} icon={<ShieldAlert size={14} />} label="Trivy Security" />
                </div>
            </div>

            {/* Input Form */}
            <div className="p-5 border-b border-slate-800/50">
                <form onSubmit={handleScan} className="flex gap-3">
                    <input 
                        type="url"
                        required
                        placeholder="https://github.com/organization/repository"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        value={repoUrl}
                        onChange={e => setRepoUrl(e.target.value)}
                    />
                    <button 
                        type="submit"
                        disabled={status === 'scanning'}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                    >
                        {status === 'scanning' ? <Loader2 size={16} className="animate-spin" /> : 'Run GitNexus'}
                    </button>
                </form>
            </div>

            {/* Results Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0b0c10]">
                {status === 'idle' && (
                    <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                        Enter a repository URL to generate an architectural map.
                    </div>
                )}
                
                {status === 'scanning' && (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-indigo-400">
                        <Loader2 size={32} className="animate-spin" />
                        <span className="text-xs font-mono">Cloning and mapping AST via GitNexus...</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
                        Failed to map repository. Ensure the URL is public and GitNexus CLI is available.
                    </div>
                )}

                {status === 'complete' && analysis && (
                    <div className="space-y-4">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <span className="text-emerald-400 text-xs font-mono">✓ Codebase mapped successfully ({analysis.map?.totalFiles || 0} files indexed).</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                            <h4 className="text-slate-300">AI Architectural Analysis</h4>
                            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-300">
                                {analysis.insights}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button 
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
            {icon}
            {label}
        </button>
    );
}
