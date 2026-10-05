import React, { useState } from 'react';
import { Code, TrendingUp, Cpu, PenTool, Globe, Play, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function RepolyzeBlogAutomator() {
    const [step, setStep] = useState(0); // 0: Idle, 1: Scanning, 2: Categorizing, 3: Drafting, 4: Done
    const [blogDraft, setBlogDraft] = useState('');

    const runDailyWorkflow = async () => {
        setStep(1);
        await new Promise(r => setTimeout(r, 2000));
        
        setStep(2);
        await new Promise(r => setTimeout(r, 2500));
        
        setStep(3);
        await new Promise(r => setTimeout(r, 3000));
        
        setBlogDraft(`# 🚀 Sentaient Daily Repo Drop: Top 3 Open-Source Finds\n\nEvery day, our Repolyze-powered agents scan GitHub to find the most explosive new repositories and map exactly how you can integrate them into your apps using Sentaient.\n\n---\n\n## 1. \`open-agents/browser-use\`\n**Category:** Multimodal RPA\n**What it does:** Allows LLMs to natively control browsers and click elements.\n**Sentaient Integration Use Case:** We can wire this into the 'GitNexus Scanner' so when a client needs an app migrated, our agent physically clicks through their legacy CMS to export the data. \n\n## 2. \`shikijs/shiki\`\n**Category:** Syntax Highlighting\n**What it does:** A beautiful, fast syntax highlighter based on TextMate.\n**Sentaient Integration Use Case:** Replace our heavy CodeMirror instances in the Workflow Editor with Shiki for a 40% reduction in bundle size, boosting Core Web Vitals.\n\n## 3. \`electric-sql/electric\`\n**Category:** Local-First Sync\n**What it does:** Active-active sync between Postgres and local SQLite.\n**Sentaient Integration Use Case:** Integrate this into the Matrix mobile client so field agents can access the entire Sentaient CRM offline, syncing automatically when they hit cellular coverage.`);
        setStep(4);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-orange-500" />
                    <h3 className="font-bold text-sm">Repolyze Daily Blog Automator</h3>
                </div>
                <div className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 flex items-center gap-1.5">
                    CRON: 0 9 * * *
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-[#0b0c10]">
                {/* Left Panel: Workflow Progress */}
                <div className="w-1/3 border-r border-slate-800 bg-slate-900/30 p-5 flex flex-col gap-6">
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        This workflow automatically hunts trending repos, maps integration use-cases, and publishes a daily SEO-optimized blog.
                    </p>

                    <WorkflowStep 
                        icon={<Code size={16} />} 
                        title="1. Repolyze Scan" 
                        desc="Hunting top 100 trending repos"
                        isActive={step === 1} 
                        isDone={step > 1} 
                    />
                    <WorkflowStep 
                        icon={<Cpu size={16} />} 
                        title="2. AI Categorization" 
                        desc="Extracting Sentaient integration use-cases"
                        isActive={step === 2} 
                        isDone={step > 2} 
                    />
                    <WorkflowStep 
                        icon={<PenTool size={16} />} 
                        title="3. Draft & Publish" 
                        desc="Generating markdown blog post"
                        isActive={step === 3} 
                        isDone={step > 3} 
                    />

                    <div className="mt-auto">
                        <button 
                            onClick={runDailyWorkflow}
                            disabled={step > 0 && step < 4}
                            className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${step > 0 && step < 4 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20'}`}
                        >
                            {step > 0 && step < 4 ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} className="fill-current" />}
                            {step === 4 ? 'Run Again' : 'Trigger Manual Run'}
                        </button>
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="flex-1 p-5 overflow-y-auto">
                    {step === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
                            <Globe size={48} className="text-slate-600" />
                            <p className="text-sm font-medium">Awaiting CRON trigger or manual run...</p>
                        </div>
                    )}

                    {step > 0 && step < 4 && (
                        <div className="h-full flex flex-col items-center justify-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                                <Loader2 size={48} className="text-orange-500 animate-spin relative z-10" />
                            </div>
                            <div className="text-center">
                                <p className="text-orange-400 font-bold mb-1">Agent Swarm Active</p>
                                <p className="text-xs text-slate-400 font-mono">
                                    {step === 1 && "Ingesting Repolyze GitHub firehose..."}
                                    {step === 2 && "LLMs parsing ASTs for integration vectors..."}
                                    {step === 3 && "Drafting final SEO blog copy..."}
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <CheckCircle2 size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Ready to Publish</span>
                                </div>
                                <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                                    Push to Webflow <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="prose prose-invert prose-sm prose-orange max-w-none">
                                <pre className="bg-slate-900/50 p-4 rounded-xl text-slate-300 whitespace-pre-wrap font-sans text-sm leading-relaxed border border-slate-800">
                                    {blogDraft}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function WorkflowStep({ icon, title, desc, isActive, isDone }) {
    return (
        <div className={`flex items-start gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-orange-500/10 border border-orange-500/30' : 'border border-transparent'}`}>
            <div className={`mt-0.5 rounded-full p-1.5 ${isActive ? 'bg-orange-500/20 text-orange-400' : isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {isDone ? <CheckCircle2 size={14} /> : icon}
            </div>
            <div>
                <p className={`text-sm font-bold ${isActive ? 'text-orange-400' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
            </div>
        </div>
    );
}
