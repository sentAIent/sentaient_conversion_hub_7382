import React, { useState } from 'react';
import { Users, Building, Copy, Check, Sparkles, ExternalLink, ShieldCheck, Code, Globe, Headphones, Box, Search } from 'lucide-react';

export default function ClientPortalWorkspace() {
    const [currentRole, setCurrentRole] = useState('super_admin'); // 'super_admin' | 'staff' | 'client_portal'
    const [clientBrand, setClientBrand] = useState('LuxeAura Paris');
    const [customDomain, setCustomDomain] = useState('concierge.luxeaura.com');
    const [themeColor, setThemeColor] = useState('#6366f1');
    const [copiedScript, setCopiedScript] = useState(false);

    const [activeWidgets, setActiveWidgets] = useState({
        voiceCopilot: true,
        viewer3d: true,
        ragSearch: true
    });

    const scriptSnippet = `<script 
  src="https://cdn.sentaient.com/v2/embed.js" 
  data-client-id="cl_luxeaura_994x" 
  data-theme="${themeColor}" 
  data-modules="${Object.keys(activeWidgets).filter(k => activeWidgets[k]).join(',')}" 
  async>
</script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(scriptSnippet);
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2000);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Building size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Multi-Tenant Workspace & Client Portal
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                White-Label Engine
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Role-Based Access Control (RBAC) • Embeddable Storefront Widgets</p>
                    </div>
                </div>

                <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
                    <button
                        onClick={() => setCurrentRole('super_admin')}
                        className={`px-3 py-1 rounded-md font-medium transition-all ${currentRole === 'super_admin' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Super-Admin
                    </button>
                    <button
                        onClick={() => setCurrentRole('staff')}
                        className={`px-3 py-1 rounded-md font-medium transition-all ${currentRole === 'staff' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Staff Engineer
                    </button>
                    <button
                        onClick={() => setCurrentRole('client_portal')}
                        className={`px-3 py-1 rounded-md font-medium transition-all ${currentRole === 'client_portal' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Client Executive View
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Mode description banner */}
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Users size={15} className="text-indigo-400" />
                        <span>Active View Context: <strong>{
                            currentRole === 'super_admin' ? 'Super-Admin Mode (Global Infrastructure & Provisioning)' :
                            currentRole === 'staff' ? 'Staff Workspace (Operations & Conversion Audits)' :
                            `Client White-Label Portal (${clientBrand})`
                        }</strong></span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Nhost Auth Verified
                    </span>
                </div>

                {/* When Client Executive View is selected */}
                {currentRole === 'client_portal' ? (
                    <div className="space-y-4 animate-in fade-in">
                        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/30 border border-indigo-500/30 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-base font-bold text-slate-100">{clientBrand} Executive Portal</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">Custom Domain: <span className="font-mono text-indigo-300">{customDomain}</span></p>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                                    <Sparkles size={12} /> Autopilot Active
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Revenue Unlocked</p>
                                    <p className="text-xl font-bold text-emerald-400 mt-1">+$64,280</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">via Sentaient A/B Optimization</p>
                                </div>
                                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Voice Agent Consultations</p>
                                    <p className="text-xl font-bold text-indigo-400 mt-1">1,842</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">88.4% satisfaction score</p>
                                </div>
                                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Store Friction Index</p>
                                    <p className="text-xl font-bold text-slate-100 mt-1">94 <span className="text-xs text-slate-500">/ 100</span></p>
                                    <p className="text-[10px] text-emerald-400 mt-0.5">Grade A (Optimal)</p>
                                </div>
                            </div>
                        </div>

                        {/* Client Tools Available */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                    <Search size={14} className="text-indigo-400" />
                                    Brand Knowledge Hub (RAG)
                                </h5>
                                <p className="text-xs text-slate-400">Search across your private catalog, returns policy, and customer service guidelines.</p>
                                <span className="text-[10px] text-indigo-400 font-mono block">14 documents indexed</span>
                            </div>
                            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                    <Headphones size={14} className="text-emerald-400" />
                                    Live Voice Copilot Transcripts
                                </h5>
                                <p className="text-xs text-slate-400">Review real-time client consultations and AI recommendations generated on your storefront.</p>
                                <span className="text-[10px] text-emerald-400 font-mono block">Zero latency relay active</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Admin / Staff View: White-Label Configuration & Embed Code */
                    <div className="space-y-4">
                        {/* White-Label Settings */}
                        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Tenant Branding Configuration</h4>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Client Brand Name</label>
                                    <input
                                        type="text"
                                        value={clientBrand}
                                        onChange={(e) => setClientBrand(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Custom Domain CNAME</label>
                                    <input
                                        type="text"
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Primary Theme Accent</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Embeddable Storefront Widget Generator */}
                        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                                        <Code size={14} className="text-indigo-400" />
                                        Embeddable Storefront Script Tag
                                    </h4>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Drop this single line into Shopify, WooCommerce, or Next.js to inject your autonomous widgets.</p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    {copiedScript ? <Check size={13} /> : <Copy size={13} />}
                                    {copiedScript ? 'Copied to Clipboard!' : 'Copy Script Tag'}
                                </button>
                            </div>

                            {/* Widget Toggles */}
                            <div className="flex items-center gap-4 text-xs pt-1">
                                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={activeWidgets.voiceCopilot}
                                        onChange={(e) => setActiveWidgets({ ...activeWidgets, voiceCopilot: e.target.checked })}
                                        className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                                    />
                                    <Headphones size={13} className="text-emerald-400" /> Live Voice Copilot
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={activeWidgets.viewer3d}
                                        onChange={(e) => setActiveWidgets({ ...activeWidgets, viewer3d: e.target.checked })}
                                        className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                                    />
                                    <Box size={13} className="text-indigo-400" /> 3D WebAssembly Viewer
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={activeWidgets.ragSearch}
                                        onChange={(e) => setActiveWidgets({ ...activeWidgets, ragSearch: e.target.checked })}
                                        className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                                    />
                                    <Search size={13} className="text-cyan-400" /> RAG Concierge Search
                                </label>
                            </div>

                            {/* Code snippet display */}
                            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto">
                                {scriptSnippet}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
