import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { CreditCard, Check, Shield, Zap, Building2, Lock } from 'lucide-react';

export const BillingView: React.FC = () => {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar 
                    activeTab="billing"
                    setActiveTab={() => {}}
                    analysisComplete={false}
                    score={0}
                    currentTheme={THEMES.light}
                    analysisDepth="quick"
                    setAnalysisDepth={() => {}}
                    onAnalyze={() => {}}
                    isRoastMode={false}
                    onOpenSettings={() => {}}
                />
                <main className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-12 rounded-2xl border shadow-lg text-center max-w-md animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription Activated!</h2>
                        <p className="text-gray-600 mb-8">
                            Your account has been upgraded successfully. You now have access to enhanced Legal Eagle capabilities.
                        </p>
                        <button 
                            onClick={() => {
                                setIsSuccess(false);
                                setSelectedTier(null);
                            }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (selectedTier) {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar 
                    activeTab="billing"
                    setActiveTab={() => {}}
                    analysisComplete={false}
                    score={0}
                    currentTheme={THEMES.light}
                    analysisDepth="quick"
                    setAnalysisDepth={() => {}}
                    onAnalyze={() => {}}
                    isRoastMode={false}
                    onOpenSettings={() => {}}
                />
                <main className="flex-1 overflow-y-auto p-12 flex justify-center items-center">
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-slate-900 p-8 text-white">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Checkout</h2>
                                    <p className="text-slate-400 capitalize">{selectedTier} Plan Subscription</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold">
                                        {selectedTier === 'standard' ? '$99' : selectedTier === 'premium' ? '$299' : '$999'}
                                    </span>
                                    <span className="text-slate-400">/mo</span>
                                </div>
                            </div>
                        </div>
                        
                        <form onSubmit={handleCheckout} className="p-8 space-y-6">
                            <div className="flex items-center gap-2 mb-6 text-green-700 bg-green-50 p-4 rounded-lg border border-green-200">
                                <Lock className="w-5 h-5" />
                                <span className="font-medium text-sm">Secure Stripe Mock Checkout Environment</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="4242 4242 4242 4242" 
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input 
                                            type="text" 
                                            placeholder="MM/YY" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                        <input 
                                            type="text" 
                                            placeholder="123" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                    <input 
                                        type="text" 
                                        placeholder="Jane Doe" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTier(null)}
                                    className="flex-1 py-3 rounded-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCheckingOut}
                                    className="flex-1 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isCheckingOut ? 'Processing...' : 'Subscribe Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar 
                activeTab="billing"
                setActiveTab={() => {}}
                analysisComplete={false}
                score={0}
                currentTheme={THEMES.light}
                analysisDepth="quick"
                setAnalysisDepth={() => {}}
                onAnalyze={() => {}}
                isRoastMode={false}
                onOpenSettings={() => {}}
            />
            
            <main className="flex-1 overflow-y-auto p-12">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                        <p className="text-xl text-gray-600">Select the right tier to scale your AI legal operations.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Standard Tier */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <div className="mb-8">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-4">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                                <p className="text-gray-500 mb-4">For solo practitioners and small firms.</p>
                                <div className="text-4xl font-bold text-gray-900 mb-1">$99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-500 shrink-0" /><span className="text-gray-600">Basic QA Verification (70% Target)</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-500 shrink-0" /><span className="text-gray-600">Standard Research Speed</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-500 shrink-0" /><span className="text-gray-600">Autopilot Mode Only</span></li>
                            </ul>
                            <button 
                                onClick={() => setSelectedTier('standard')}
                                className="w-full py-3 rounded-lg font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                Select Standard
                            </button>
                        </div>

                        {/* Premium Tier */}
                        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl flex flex-col relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                                Recommended
                            </div>
                            <div className="mb-8">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg w-fit mb-4">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                                <p className="text-slate-400 mb-4">For growing legal teams and agencies.</p>
                                <div className="text-4xl font-bold text-white mb-1">$299<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /><span className="text-slate-300">Strict QA Verification (85% Target)</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /><span className="text-slate-300">Advanced Multi-Agent Review</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /><span className="text-slate-300">Copilot Interactive Mode</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-blue-400 shrink-0" /><span className="text-slate-300">Custom Knowledge Base Upload</span></li>
                            </ul>
                            <button 
                                onClick={() => setSelectedTier('premium')}
                                className="w-full py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Select Premium
                            </button>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <div className="mb-8">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg w-fit mb-4">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                <p className="text-gray-500 mb-4">For large corporations requiring maximum assurance.</p>
                                <div className="text-4xl font-bold text-gray-900 mb-1">$999<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /><span className="text-gray-600">Flawless QA Target (95% Target)</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /><span className="text-gray-600">Infinite Retries on Failure</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /><span className="text-gray-600">Priority Processing Speed</span></li>
                                <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-500 shrink-0" /><span className="text-gray-600">Dedicated Audit Logging</span></li>
                            </ul>
                            <button 
                                onClick={() => setSelectedTier('enterprise')}
                                className="w-full py-3 rounded-lg font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                                Select Enterprise
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
