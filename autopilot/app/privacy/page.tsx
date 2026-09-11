"use client";

import React, { useState } from 'react';
import { Shield, Lock, Eye, Database, Globe, UserCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', icon: Shield, title: '1. Introduction', content: (
      <>
        <p className="text-gray-300 mb-4 leading-relaxed">
          At <strong>SentAIent AutoPilot</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI content generation and publishing services.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200 leading-relaxed">
            Our core promise: You retain full ownership of your data. We do not sell your brand assets, and we enforce strict policies to ensure third-party AI models do not train on your private inputs.
          </p>
        </div>
      </>
    )},
    { id: 'collection', icon: Eye, title: '2. Information We Collect', content: (
      <ul className="space-y-4">
        {[
          { label: 'Account Information', desc: 'Name, email address, and authentication credentials securely managed via Supabase Auth.' },
          { label: 'Connected Platforms', desc: 'OAuth tokens, profile data, and analytics from third-party services you authorize (TikTok, Instagram, X, YouTube).' },
          { label: 'User Content', desc: 'Prompts, brand assets, generated scripts, media files, and campaigns created within the platform.' },
          { label: 'Usage Data', desc: 'Information about how you interact with our application, diagnostics, and performance metrics.' }
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#60a9ff] mt-2 shrink-0 shadow-[0_0_8px_#60a9ff]"></div>
            <div>
              <strong className="text-white block mb-1">{item.label}</strong>
              <span className="text-gray-400 text-sm leading-relaxed">{item.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    )},
    { id: 'usage', icon: Database, title: '3. How We Use Your Information', content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          'Provide, operate, and maintain our Service.',
          'Generate AI content based on your brand context and inputs.',
          'Publish approved content directly to your authorized social accounts.',
          'Improve, personalize, and expand our platform.',
          'Communicate with you regarding updates, security alerts, and support.'
        ].map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-white/[0.03] to-transparent p-4 rounded-xl border border-white/[0.08]">
            <p className="text-gray-300 text-sm">{item}</p>
          </div>
        ))}
      </div>
    )},
    { id: 'third-party', icon: Globe, title: '4. Third-Party AI Models', content: (
      <p className="text-gray-300 leading-relaxed bg-white/5 p-6 rounded-xl border-l-4 border-[#60a9ff]">
        To provide our core service, your text prompts and selected brand assets may be processed by third-party AI providers (such as OpenAI, Google Gemini, or Anthropic). <strong className="text-white">We explicitly configure our enterprise API agreements to prohibit these providers from using your personal data to train their foundational models.</strong>
      </p>
    )},
    { id: 'security', icon: Lock, title: '5. Data Security', content: (
      <p className="text-gray-300 leading-relaxed">
        We implement industry-standard administrative, technical, and physical security measures to protect your personal information. OAuth tokens and database records are secured using <strong>Supabase Row Level Security (RLS)</strong> and encrypted at rest with AES-256 military-grade encryption.
      </p>
    )},
    { id: 'rights', icon: UserCheck, title: '6. Your Data Rights', content: (
      <p className="text-gray-300 leading-relaxed">
        You have the right to access, update, or delete your personal information at any time. You can also revoke OAuth access to connected social media accounts directly from your platform settings or from the respective platform's security page. We comply with GDPR and CCPA regulations regarding data erasure.
      </p>
    )}
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-[#60a9ff]/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#60a9ff]/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[#60a9ff] mb-6">
            <Shield className="w-4 h-4" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-sm mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Transparent data practices for the next generation of AI marketing. Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-8 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 px-4">Contents</h3>
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#60a9ff]/10 text-[#60a9ff] border border-[#60a9ff]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3 font-medium">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#60a9ff]' : 'text-gray-500'}`} />
                      {section.title.split('. ')[1]}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 rounded-3xl border border-white/[0.05] shadow-2xl relative overflow-hidden">
              {/* Subtle glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className={`transition-all duration-500 ${activeSection === section.id ? 'opacity-100 translate-y-0 block' : 'opacity-0 translate-y-4 hidden'}`}
                >
                  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#60a9ff]/10 flex items-center justify-center border border-[#60a9ff]/20">
                      <section.icon className="w-6 h-6 text-[#60a9ff]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{section.title}</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              ))}
              
              <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>Questions? Reach out to support@sentaient.com</p>
                <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white font-medium">
                  Back to top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
