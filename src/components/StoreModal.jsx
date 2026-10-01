import React, { useEffect, useState } from 'react';
import { initRevenueCat, getOfferings, makePurchase } from '../services/revenuecat';

const StoreModal = ({ isOpen, onClose }) => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStore = async () => {
            if (isOpen) {
                setIsLoading(true);
                const isReady = await initRevenueCat();
                if (isReady) {
                    const offerings = await getOfferings();
                    setPackages(offerings);
                }
                setIsLoading(false);
            }
        };
        loadStore();
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePurchase = async (pkg) => {
        setIsLoading(true);
        const result = await makePurchase(pkg);
        setIsLoading(false);
        if (result) {
            alert('Purchase successful!');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-[#10141e] border border-[#64dcff]/20 rounded-xl max-w-md w-full p-6 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-[#00f3ff]"></div>
                
                <h2 className="text-3xl font-cinzel text-center text-[#00f3ff] mb-6">Cosmic Store</h2>
                
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00f3ff]"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {packages.length > 0 ? packages.map((pkg, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-black/40 border border-[#5c7a8a]/30 rounded-lg hover:border-[#00f3ff]/50 transition-colors">
                                <div>
                                    <h3 className="font-bold text-lg">{pkg.product.title}</h3>
                                    <p className="text-sm text-[#5c7a8a]">{pkg.product.description}</p>
                                </div>
                                <button 
                                    onClick={() => handlePurchase(pkg)}
                                    className="px-4 py-2 bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 border border-[#00f3ff]/50 rounded text-[#00f3ff] font-bold transition-all"
                                >
                                    {pkg.product.priceString}
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-6 text-[#5c7a8a]">
                                <p>The store is currently unavailable.</p>
                                <p className="text-sm mt-2">Purchases are only available on native iOS/Android builds.</p>
                            </div>
                        )}
                    </div>
                )}

                <button 
                    onClick={onClose}
                    className="mt-6 w-full py-3 bg-transparent border border-white/20 hover:bg-white/5 rounded text-white transition-colors"
                >
                    Close Store
                </button>
            </div>
        </div>
    );
};

export default StoreModal;
