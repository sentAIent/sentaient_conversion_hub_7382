import React, { useState } from 'react';
import { Settings, Database, Globe, CreditCard, Server, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AppInfraOrchestrator() {
    const [activeTab, setActiveTab] = useState('supabase');
    const [status, setStatus] = useState('idle');

    const handleDeploy = () => {
        setStatus('syncing');
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Settings size={18} className="text-pink-500" />
                    <h3 className="font-bold text-sm">Global Infra Orchestrator</h3>
                </div>
                <button 
                    onClick={handleDeploy}
                    className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-2"
                >
                    {status === 'syncing' ? 'Syncing APIs...' : 'Sync All Platforms'}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-slate-900/50 border-r border-slate-800 flex flex-col p-3 gap-1 overflow-y-auto">
                    <SidebarItem active={activeTab === 'supabase'} onClick={() => setActiveTab('supabase')} icon={<Database size={14} />} label="Supabase DB" />
                    <SidebarItem active={activeTab === 'netlify'} onClick={() => setActiveTab('netlify')} icon={<Globe size={14} />} label="Netlify (Frontend)" />
                    <SidebarItem active={activeTab === 'stripe'} onClick={() => setActiveTab('stripe')} icon={<CreditCard size={14} />} label="Stripe Billing" />
                    <SidebarItem active={activeTab === 'render'} onClick={() => setActiveTab('render')} icon={<Server size={14} />} label="Render (Backend)" />
                    <SidebarItem active={activeTab === 'revenuecat'} onClick={() => setActiveTab('revenuecat')} icon={<Smartphone size={14} />} label="RevenueCat" />
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-[#0b0c10]">
                    {status === 'success' && (
                        <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-xs">
                            <CheckCircle2 size={16} />
                            Variables and Webhooks successfully synced across all platforms via REST APIs.
                        </div>
                    )}

                    {activeTab === 'supabase' && (
                        <ConfigPanel 
                            title="Supabase Environment Variables"
                            description="Core database credentials. The Service Role key will only be injected into your Python Backend (Render)."
                            fields={[
                                { label: 'Project URL', placeholder: 'https://xxxx.supabase.co' },
                                { label: 'Anon (Public) Key', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                                { label: 'Service Role (Secret) Key', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', isSecret: true }
                            ]}
                        />
                    )}

                    {activeTab === 'netlify' && (
                        <ConfigPanel 
                            title="Netlify Settings (Next.js Frontend)"
                            description="Automatically injects safe public variables into your Netlify site and triggers a static rebuild."
                            fields={[
                                { label: 'Netlify Site ID', placeholder: 'xxxx-xxxx-xxxx-xxxx' },
                                { label: 'Netlify Personal Access Token', placeholder: 'api_token...', isSecret: true }
                            ]}
                        />
                    )}

                    {activeTab === 'stripe' && (
                        <ConfigPanel 
                            title="Stripe & Webhooks"
                            description="Generates Stripe Webhooks programmatically and routes checkout.session.completed events to your backend."
                            fields={[
                                { label: 'Stripe Secret Key (sk_live_...)', placeholder: 'sk_live_...', isSecret: true },
                                { label: 'Target Webhook URL', placeholder: 'https://api.yourdomain.com/webhooks/stripe', readOnly: true },
                                { label: 'Generated Webhook Secret', placeholder: 'whsec_...', readOnly: true }
                            ]}
                        />
                    )}

                    {activeTab === 'render' && (
                        <ConfigPanel 
                            title="Render Settings (Python FastAPI)"
                            description="Injects all required secrets (Supabase Role, Stripe, LiveKit) into the Render environment."
                            fields={[
                                { label: 'Render Service ID', placeholder: 'srv-cxxxxxxx' },
                                { label: 'Render API Key', placeholder: 'rnd_...', isSecret: true }
                            ]}
                        />
                    )}

                    {activeTab === 'revenuecat' && (
                        <ConfigPanel 
                            title="RevenueCat Mobile Integrations"
                            description="Configures mobile push notifications and subscription sync webhooks for iOS/Android."
                            fields={[
                                { label: 'RevenueCat Project API Key', placeholder: 'goog_... / appl_...', isSecret: true },
                                { label: 'Target Webhook URL', placeholder: 'https://api.yourdomain.com/webhooks/revenuecat', readOnly: true }
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ active, onClick, icon, label }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors w-full text-left ${active ? 'bg-pink-500/20 text-pink-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
        >
            {icon}
            {label}
        </button>
    );
}

function ConfigPanel({ title, description, fields }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-slate-100 font-bold mb-2">{title}</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">{description}</p>
            
            <div className="space-y-4">
                {fields.map((field, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{field.label}</label>
                        <input 
                            type={field.isSecret ? "password" : "text"}
                            placeholder={field.placeholder}
                            readOnly={field.readOnly}
                            className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition-colors ${field.readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
