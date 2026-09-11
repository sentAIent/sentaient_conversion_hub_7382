"use client";

import React, { useState } from 'react';
import { Scale, FileText, AlertCircle, CreditCard, Ban, ShieldAlert, ChevronRight, Gavel } from 'lucide-react';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', icon: Scale, title: '1. Acceptance of Terms', content: (
      <>
        <p className="text-gray-300 mb-4 leading-relaxed">
          By accessing or using the <strong>SentAIent AutoPilot</strong> platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-4">
          <Gavel className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-200 leading-relaxed">
            These terms constitute a legally binding agreement between you and SentAIent regarding your use of our AI content generation and automated publishing tools.
          </p>
        </div>
      </>
    )},
    { id: 'usage', icon: FileText, title: '2. Use of Service', content: (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>You may use our services only as permitted by law, including applicable export and re-export control laws and regulations.</p>
        <p>We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>
        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-emerald-500 mt-4">
          <strong className="text-white block mb-2">Acceptable Use Policy:</strong>
          <p className="text-sm">You agree not to use the SentAIent AutoPilot platform to generate or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</p>
        </div>
      </div>
    )},
    { id: 'account', icon: AlertCircle, title: '3. Your Account', content: (
      <ul className="space-y-4">
        {[
          { label: 'Account Responsibility', desc: 'You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.' },
          { label: 'Accurate Information', desc: 'You must provide accurate and complete information when creating an account. You may not use as a username the name of another person or entity.' },
          { label: 'Unauthorized Access', desc: 'You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.' }
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_#10b981]"></div>
            <div>
              <strong className="text-white block mb-1">{item.label}</strong>
              <span className="text-gray-400 text-sm leading-relaxed">{item.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    )},
    { id: 'billing', icon: CreditCard, title: '4. Billing and Subscriptions', content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] p-5 rounded-xl border border-white/[0.08]">
          <strong className="text-white block mb-2">Subscription Plans</strong>
          <p className="text-gray-400 text-sm">Services are billed on a subscription basis. You will be billed in advance on a recurring, periodic basis.</p>
        </div>
        <div className="bg-white/[0.03] p-5 rounded-xl border border-white/[0.08]">
          <strong className="text-white block mb-2">Refund Policy</strong>
          <p className="text-gray-400 text-sm">Except when required by law, paid subscription fees are non-refundable. Certain refund requests may be considered on a case-by-case basis.</p>
        </div>
      </div>
    )},
    { id: 'termination', icon: Ban, title: '5. Termination', content: (
      <p className="text-gray-300 leading-relaxed">
        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
      </p>
    )},
    { id: 'liability', icon: ShieldAlert, title: '6. Limitation of Liability', content: (
      <p className="text-gray-300 leading-relaxed font-mono text-xs p-6 bg-black/50 rounded-xl border border-white/10 uppercase tracking-wide">
        In no event shall SentAIent, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
      </p>
    )}
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-emerald-400 mb-6">
            <Scale className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-sm mb-6">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Rules, guidelines, and agreements for utilizing SentAIent's platform. Last updated: {new Date().toLocaleDateString()}
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3 font-medium">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
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
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <section.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{section.title}</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                </div>
              ))}
              
              <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>Questions? Reach out to legal@sentaient.com</p>
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
