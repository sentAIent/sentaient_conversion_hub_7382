import { useState } from 'react';
import { useRevenueCat } from '@/context/RevenueCatContext';

export const PricingModal = ({ isOpen, onClose }: any) => {
    const { packages, purchasePackage, isSubscribed } = useRevenueCat();
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handlePurchase = async (pkg: any) => {
        setIsLoading(true);
        try {
            await purchasePackage(pkg);
            onClose();
        } catch (error) {
            console.error('Purchase failed', error);
            alert('Purchase failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-3xl w-full text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Upgrade Your Legal Toolkit</h2>
                    <p className="text-slate-400">Unlock premium features, remove limits, and access advanced contract analysis tools.</p>
                </div>

                {isSubscribed ? (
                    <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="text-green-400 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-400">You're already subscribed!</h3>
                        <p className="text-slate-300 mt-2">Thank you for being a premium member.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors">
                            Return to App
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg.identifier} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col hover:border-indigo-500/50 transition-colors">
                                <h3 className="text-xl font-bold mb-2">{pkg.product.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">{pkg.product.description}</p>
                                <div className="text-3xl font-bold mb-6 text-indigo-400">
                                    {pkg.product.priceString}
                                    <span className="text-sm text-slate-500 font-normal"> / {pkg.packageType === 'ANNUAL' ? 'year' : 'month'}</span>
                                </div>
                                <button
                                    onClick={() => handlePurchase(pkg)}
                                    disabled={isLoading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Processing...' : 'Subscribe Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
