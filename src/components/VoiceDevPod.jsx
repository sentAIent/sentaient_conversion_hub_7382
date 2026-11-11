import React, { useState } from 'react';
import { Mic, MicOff, Code2, Play, GitBranch, CheckCircle2, RefreshCw, Terminal, ExternalLink, Sparkles, Wand2 } from 'lucide-react';

export default function VoiceDevPod() {
    const [isListening, setIsListening] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [speechPrompt, setSpeechPrompt] = useState(
        'The mobile checkout drawer on client storefront has an 80px overflow on small screens, apply a responsive max-height fix and push a Netlify preview.'
    );
    const [executionLog, setExecutionLog] = useState(null);
    const [patchResult, setPatchResult] = useState({
        file: 'src/components/MobileCheckoutDrawer.jsx',
        line: 'Line 42',
        diffBefore: '- className="w-full h-[780px] p-4 bg-slate-950 overflow-hidden"',
        diffAfter: '+ className="w-full max-h-[calc(100dvh-5rem)] p-4 bg-slate-950 overflow-y-auto"',
        previewUrl: 'https://preview-fix-mobile-drawer.netlify.app',
        testsPassed: '3/3 Unit & Visual Tests Passed'
    });

    const handleExecuteVoiceCommand = () => {
        setIsExecuting(true);
        setExecutionLog('1. Transcribing voice command via Whisper / LiveKit audio pipeline...');

        setTimeout(() => {
            setExecutionLog('2. GitNexus scanning AST to locate target React component (src/components/MobileCheckoutDrawer.jsx)...');
        }, 1200);

        setTimeout(() => {
            setExecutionLog('3. Executing surgical CSS/Tailwind patch & running local Vitest headless tests...');
        }, 2400);

        setTimeout(() => {
            setExecutionLog('4. Pushing preview branch to Netlify via Infrastructure Orchestrator...');
        }, 3600);

        setTimeout(() => {
            setIsExecuting(false);
            setExecutionLog(null);
        }, 4800);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Code2 size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Voice DevPod • Autonomous Bug Patcher
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                LiveKit & GitNexus
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Voice-to-Code Engineering • Zero-Human Pull Request Generator</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsListening(!isListening)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                            isListening
                                ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                    >
                        {isListening ? <Mic size={13} /> : <MicOff size={13} />}
                        {isListening ? 'Listening...' : 'Voice Input'}
                    </button>

                    <button
                        onClick={handleExecuteVoiceCommand}
                        disabled={isExecuting}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isExecuting
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 font-bold'
                        }`}
                    >
                        {isExecuting ? <RefreshCw size={13} className="animate-spin" /> : <Wand2 size={13} />}
                        {isExecuting ? 'Executing...' : 'Run Voice Patch'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Voice Prompt Input */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Voice Instruction Transcript</label>
                    <div className="relative">
                        <textarea
                            rows={2}
                            value={speechPrompt}
                            onChange={(e) => setSpeechPrompt(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium leading-relaxed resize-none"
                        />
                    </div>
                </div>

                {/* Execution Stream */}
                {isExecuting && executionLog && (
                    <div className="p-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-xl flex items-center gap-3 text-xs font-mono text-cyan-400 animate-in fade-in">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{executionLog}</span>
                    </div>
                )}

                {/* Diff Viewer Card */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden space-y-2">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <GitBranch size={13} className="text-cyan-400" />
                            <span className="font-mono text-slate-200">{patchResult.file}</span>
                            <span className="text-[10px] text-slate-500">({patchResult.line})</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {patchResult.testsPassed}
                        </span>
                    </div>

                    <div className="p-3 font-mono text-xs space-y-1 bg-slate-950/70 mx-3 rounded-lg border border-slate-800/80">
                        <div className="text-red-400 bg-red-500/10 px-2 py-1 rounded">{patchResult.diffBefore}</div>
                        <div className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{patchResult.diffAfter}</div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-cyan-300">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            <span>Preview Deployed: <strong className="font-mono text-slate-100">{patchResult.previewUrl}</strong></span>
                        </div>
                        <a
                            href={patchResult.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm transition-colors"
                        >
                            Open Preview <ExternalLink size={11} />
                        </a>
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Sparkles size={14} className="text-cyan-400" />
                        Autonomous Dev: <strong>Voice DevPod auto-branches git, runs regression tests, and preserves rollback tags.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Zero-Downtime Guarantee</span>
                </div>
            </div>
        </div>
    );
}
