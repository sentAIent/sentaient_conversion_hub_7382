import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, FileText, ArrowRight, CheckCircle2, MessageSquare, Briefcase } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { PricingView } from './PricingView';
import { THEMES } from '@/constants';
import { getSEOData } from '@/utils/seoData';
import { Link } from 'react-router-dom';
import { DEMOS } from '@/data/demos';
import { useAuth } from '@/context/AuthContext';

export const LandingPageView: React.FC = () => {
    const { contractType } = useParams<{ contractType: string }>();
    const navigate = useNavigate();
    const { profile } = useAuth();
    const seo = getSEOData(contractType);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleCTA = () => {
        if (profile) {
            navigate('/');
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/legaleagle/logo.jpg" alt="Legal Eagle Logo" className="w-8 h-8 object-contain rounded-md" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Legal Eagle
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleCTA}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            Log in
                        </button>
                        <button 
                            onClick={handleCTA}
                            className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                    {seo.h1}
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {seo.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={handleCTA}
                        className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                        Start Analyzing Contracts <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all"
                    >
                        View Pricing
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need to review contracts faster</h2>
                        <p className="text-slate-400">Legal Eagle provides a complete suite of AI-powered tools.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                                title: "Instant Analysis",
                                desc: "Upload any contract and get a comprehensive risk assessment in seconds."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-red-400" />,
                                title: "Roast Mode",
                                desc: "Switch to aggressive mode to find hidden liabilities and aggressive terms."
                            },
                            {
                                icon: <FileText className="w-6 h-6 text-blue-400" />,
                                title: "Clause Library",
                                desc: "Save and reuse your best clauses to standardize your firm's agreements."
                            },
                            {
                                icon: <Briefcase className="w-6 h-6 text-purple-400" />,
                                title: "SWOT Generation",
                                desc: "Automatically generate Strengths, Weaknesses, Opportunities, and Threats."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials (Placeholders) */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Trusted by Legal Professionals</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 relative">
                                <MessageSquare className="absolute top-8 right-8 w-6 h-6 text-slate-800" />
                                <div className="flex items-center gap-1 mb-6 text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(star => <CheckCircle2 key={star} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-300 mb-6 italic">
                                    "Legal Eagle has completely transformed how our firm handles initial contract reviews. It catches nuanced liabilities that even senior partners occasionally miss."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800" />
                                    <div>
                                        <div className="font-semibold text-slate-200">Legal Professional {i}</div>
                                        <div className="text-sm text-slate-500">Partner, Top Law Firm</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Demos Section */}
            <section className="py-24 bg-slate-900 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Try a Live Demo</h2>
                        <p className="text-slate-400">Instantly see how Legal Eagle analyzes real-world Terms of Service.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {DEMOS.map(demo => (
                            <Link
                                key={demo.id}
                                to={`/app?demo=${demo.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 rounded-xl bg-slate-950 border border-slate-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all flex items-center gap-3 group cursor-pointer"
                            >
                                <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                                <span className="font-medium text-slate-200 group-hover:text-white">{demo.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-slate-900/50 border-t border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
                        <p className="text-slate-400">Choose the plan that fits your legal practice.</p>
                    </div>
                    <PricingView 
                        currentTheme={THEMES.navy} 
                        onUpgrade={handleCTA}
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-950 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/legaleagle/logo.jpg" alt="Legal Eagle Logo" className="w-6 h-6 object-contain rounded-sm" />
                        <span className="text-lg font-bold text-slate-400">Legal Eagle</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} SentAIent. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <button className="hover:text-slate-300 transition-colors">Privacy Policy</button>
                        <button className="hover:text-slate-300 transition-colors">Terms of Service</button>
                    </div>
                </div>
            </footer>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </div>
    );
};
