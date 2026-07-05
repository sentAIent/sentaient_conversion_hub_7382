import React, { useState } from 'react';
import { Check, X, Shield, Zap, Star, Briefcase, Building2, Crown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { Theme } from '@/types';

interface PricingViewProps {
    currentTheme: Theme;
    onUpgrade: (tier: string, isAnnual: boolean) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ currentTheme, onUpgrade }) => {
    const { profile } = useAuth();
    const [isAnnual, setIsAnnual] = useState(true);

    const tiers = [
        {
            name: 'Free',
            icon: <Shield className="w-6 h-6 text-slate-400" />,
            priceMonthly: 0,
            priceAnnual: 0,
            description: 'For individuals exploring AI legal analysis.',
            reviews: 1,
            creations: 0,
            features: [
                'Basic AI Analysis',
                'Roast Mode (No Clause Recs)',
                'Basic Export'
            ],
            missing: ['Advanced Heatmap', 'Clause Library', 'Negotiation Emails', 'Team Sharing']
        },
        {
            name: 'Starter',
            icon: <Zap className="w-6 h-6 text-blue-500" />,
            priceMonthly: 39,
            priceAnnual: 29,
            description: 'Perfect for freelancers and small business owners.',
            reviews: 5,
            creations: 1,
            features: [
                'Basic AI Analysis & Heatmap',
                'Roast Mode',
                'Standard Word/PDF Export'
            ],
            missing: ['Standard Clause Library', 'Negotiation Emails', 'Team Sharing']
        },
        {
            name: 'Professional',
            icon: <Star className="w-6 h-6 text-amber-500" />,
            priceMonthly: 99,
            priceAnnual: 79,
            description: 'For solo practitioners handling regular contracts.',
            reviews: 15,
            creations: 3,
            features: [
                'Advanced Heatmap & Deep Analysis',
                'Standard Clause Library Access',
                'Negotiation Email Drafting'
            ],
            missing: ['Custom AI Rules', 'Team Sharing']
        },
        {
            name: 'Premium',
            icon: <Crown className="w-6 h-6 text-purple-500" />,
            priceMonthly: 249,
            priceAnnual: 199,
            description: 'Advanced capabilities for growing law firms.',
            reviews: 50,
            creations: 10,
            features: [
                'Full Clause Library (CRUD)',
                'Custom AI Rules & Playbooks',
                'Team Sharing (Up to 3 users)'
            ],
            missing: ['Priority Support', 'Bulk Export']
        },
        {
            name: 'Elite',
            icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
            priceMonthly: 449,
            priceAnnual: 349,
            description: 'High volume processing for established practices.',
            reviews: 100,
            creations: 35,
            features: [
                'Priority Support',
                'Team Sharing (Up to 10 users)',
                'Bulk Document Export'
            ],
            missing: []
        },
        {
            name: 'Enterprise',
            icon: <Building2 className="w-6 h-6 text-slate-800" />,
            priceMonthly: 'Custom',
            priceAnnual: 'Custom',
            description: 'Tailored solutions for large organizations.',
            reviews: 'Unlimited',
            creations: 'Unlimited',
            features: [
                'Dedicated AI Server',
                'Custom Integration / API Access',
                'Dedicated Account Manager'
            ],
            missing: []
        }
    ];

    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl font-bold mb-4 ${currentTheme.panelText}`}>Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-500 mb-8">Choose the plan that fits your document review volume.</p>
                    
                    <div className="flex items-center justify-center gap-4 bg-white p-1 rounded-full shadow-sm inline-flex border">
                        <button 
                            className={`px-6 py-2 rounded-full font-bold transition-all ${!isAnnual ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button 
                            className={`px-6 py-2 rounded-full font-bold transition-all ${isAnnual ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annually <span className="text-xs ml-1 text-emerald-300">Save 20%</span>
                        </button>
                    </div>
                </div>

                {profile && (
                    <div className="mb-12 bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto flex gap-8 justify-center">
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Document Reviews</p>
                            <p className="text-3xl font-black text-blue-600">
                                {profile.reviews_used} <span className="text-lg text-slate-400 font-medium">/ {profile.reviews_limit}</span>
                            </p>
                        </div>
                        <div className="w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Draft Creations</p>
                            <p className="text-3xl font-black text-purple-600">
                                {profile.drafts_used} <span className="text-lg text-slate-400 font-medium">/ {profile.drafts_limit}</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={`bg-white rounded-2xl shadow-lg border flex flex-col relative ${tier.name === 'Premium' ? 'ring-2 ring-blue-500' : ''}`}>
                            {tier.name === 'Premium' && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8 border-b">
                                <div className="flex items-center gap-3 mb-4">
                                    {tier.icon}
                                    <h3 className="text-2xl font-bold text-slate-800">{tier.name}</h3>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 h-10">{tier.description}</p>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-slate-900">
                                        {typeof tier.priceAnnual === 'number' ? '$' : ''}
                                        {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                                    </span>
                                    {typeof tier.priceAnnual === 'number' && (
                                        <span className="text-slate-500"> / month</span>
                                    )}
                                </div>
                                {typeof tier.priceAnnual === 'number' && isAnnual && tier.priceAnnual > 0 && (
                                    <p className="text-sm text-emerald-600 font-medium mb-6">Billed ${tier.priceAnnual * 12} annually</p>
                                )}
                                {(typeof tier.priceAnnual !== 'number' || (!isAnnual || tier.priceAnnual === 0)) && (
                                    <div className="h-6 mb-6"></div>
                                )}
                                
                                <div className="space-y-2 mb-8 bg-slate-50 p-4 rounded-xl">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 font-medium">Document Reviews</span>
                                        <span className="font-bold text-slate-900">{tier.reviews}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 font-medium">Document Creations</span>
                                        <span className="font-bold text-slate-900">{tier.creations}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onUpgrade(tier.name, isAnnual)}
                                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                                        tier.name === 'Premium' 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                    }`}
                                >
                                    {tier.name === 'Enterprise' ? 'Contact Sales' : tier.priceAnnual === 0 ? 'Current Plan' : 'Upgrade Plan'}
                                </button>
                            </div>
                            <div className="p-8 flex-1 bg-slate-50/50 rounded-b-2xl">
                                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Features included</h4>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {tier.missing.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                            <X className="w-5 h-5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
