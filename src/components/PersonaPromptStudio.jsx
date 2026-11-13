import React, { useState } from 'react';
import { Sliders, Shield, Sparkles, Send, CheckCircle2, AlertTriangle, Play, RefreshCw, Bot } from 'lucide-react';

export default function PersonaPromptStudio() {
    const [toneLuxury, setToneLuxury] = useState(85);
    const [upsellDrive, setUpsellDrive] = useState(70);
    const [discountAuthority, setDiscountAuthority] = useState(10);
    const [empathyDepth, setEmpathyDepth] = useState(90);

    const [guardrails, setGuardrails] = useState({
        blockMarginLeaks: true,
        blockCompetitors: true,
        strictRAGGrounding: true
    });

    const [testQuery, setTestQuery] = useState('Can I get a discount if I buy two of the cashmere coats?');
    const [testResponse, setTestResponse] = useState(
        '“It would be our absolute pleasure. As an exclusive courtesy for your curated selection, I can apply our private Concierge 10% Tiered Courtesy code (VIP10) to your second coat, alongside complimentary monogramming and priority global courier delivery.”'
    );
    const [isSimulating, setIsSimulating] = useState(false);

    const handleRunSimulation = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setIsSimulating(false);
            if (discountAuthority > 0) {
                setTestResponse(
                    `“Certainly! In line with our tailored ${toneLuxury > 75 ? 'Haute Concierge' : 'Friendly'} policy, I can extend a discretionary ${discountAuthority}% courtesy toward your second piece. Would you prefer gold-foil packaging or blind-embossed presentation?”`
                );
            } else {
                setTestResponse(
                    '“While our artisanal pricing reflects strict European craftsmanship standards, I can offer you complimentary bespoke monogramming and priority first-class courier delivery on your order today.”'
                );
            }
        }, 1200);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Sliders size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Persona Studio & Prompt Guardrails
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                Client Self-Serve
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Brand Voice Calibration • Real-Time Injection Defense</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRunSimulation}
                        disabled={isSimulating}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        {isSimulating ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
                        Test Persona
                    </button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Tuning Sliders */}
                <div className="w-1/2 border-r border-slate-800 bg-slate-900/40 p-5 space-y-4 overflow-y-auto">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Voice Calibration Sliders</h4>

                    {/* Slider 1 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium">Brand Tone</span>
                            <span className="text-indigo-400 font-mono font-bold">{toneLuxury > 75 ? 'Haute Luxury' : 'Balanced'} ({toneLuxury}%)</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={toneLuxury}
                            onChange={(e) => setToneLuxury(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Casual & Fast</span>
                            <span>Ultra-Luxury Concierge</span>
                        </div>
                    </div>

                    {/* Slider 2 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium">Upsell Aggressiveness</span>
                            <span className="text-emerald-400 font-mono font-bold">{upsellDrive}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={upsellDrive}
                            onChange={(e) => setUpsellDrive(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Passive Assistant</span>
                            <span>Proactive Conversion Driver</span>
                        </div>
                    </div>

                    {/* Slider 3 */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium">Discount Authority</span>
                            <span className="text-amber-400 font-mono font-bold">{discountAuthority}% Max</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={discountAuthority}
                            onChange={(e) => setDiscountAuthority(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>Strict 0%</span>
                            <span>Discretionary 20% Limit</span>
                        </div>
                    </div>

                    {/* Guardrails Checkboxes */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adversarial Defense Guardrails</h5>
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={guardrails.blockMarginLeaks}
                                onChange={(e) => setGuardrails({ ...guardrails, blockMarginLeaks: e.target.checked })}
                                className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                            />
                            <span>Block margin, cost of goods, and supplier leaks</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={guardrails.blockCompetitors}
                                onChange={(e) => setGuardrails({ ...guardrails, blockCompetitors: e.target.checked })}
                                className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                            />
                            <span>Disallow competitor naming or comparison disparagement</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={guardrails.strictRAGGrounding}
                                onChange={(e) => setGuardrails({ ...guardrails, strictRAGGrounding: e.target.checked })}
                                className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                            />
                            <span>Zero-Hallucination: Ground responses strictly in Open-Glean docs</span>
                        </label>
                    </div>
                </div>

                {/* Right Interactive Playground */}
                <div className="flex-1 p-5 flex flex-col bg-[#0a0d14] space-y-4">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Bot size={14} className="text-indigo-400" />
                        Live Simulator Playground
                    </h4>

                    <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase">Customer Prompt Test</label>
                        <input
                            type="text"
                            value={testQuery}
                            onChange={(e) => setTestQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                    </div>

                    <div className="flex-1 p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-2 font-bold">Simulated Persona Output</span>
                            <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                                {testResponse}
                            </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 size={13} />
                                Guardrails Validated
                            </span>
                            <span className="font-mono text-slate-500">Latency: 140ms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
