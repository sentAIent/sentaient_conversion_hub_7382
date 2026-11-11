import React, { useState } from 'react';
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw, AlertTriangle, CheckCircle2, Shield, Eye, Sparkles, BarChart3, Zap } from 'lucide-react';

export default function CompetitorPricingRadar() {
    const [isScraping, setIsScraping] = useState(false);
    const [autoAdjust, setAutoAdjust] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState('prod_1');

    const [products, setProducts] = useState([
        {
            id: 'prod_1',
            name: 'Handcrafted Tuscan Calfskin Duffle',
            ourPrice: '$1,450.00',
            recommendedPrice: '$1,580.00 (+9.0%)',
            status: 'opportunity_detected',
            margin: '68%',
            competitors: [
                { name: 'Maison Bellini (Direct Rival)', price: '$1,620.00', stock: 'Out of Stock', stockColor: 'text-red-400 bg-red-500/10' },
                { name: 'Venezia Heritage Co.', price: '$1,490.00', stock: 'Low Stock (2 units)', stockColor: 'text-amber-400 bg-amber-500/10' },
                { name: 'Lugano Bespoke Goods', price: '$1,750.00', stock: 'In Stock', stockColor: 'text-emerald-400 bg-emerald-500/10' }
            ],
            reasoning: 'Primary competitor Maison Bellini is completely out of stock. Demand elasticity model indicates a 9% price increase will retain a 96% conversion rate while capturing an extra $130/unit in pure margin.'
        },
        {
            id: 'prod_2',
            name: 'Italian Loro Piana Cashmere Overcoat',
            ourPrice: '$890.00',
            recommendedPrice: '$890.00 (Optimal)',
            status: 'optimal',
            margin: '62%',
            competitors: [
                { name: 'Milano Sartoriale', price: '$920.00', stock: 'In Stock', stockColor: 'text-emerald-400 bg-emerald-500/10' },
                { name: 'Nordic Overcoats', price: '$850.00', stock: 'In Stock', stockColor: 'text-emerald-400 bg-emerald-500/10' }
            ],
            reasoning: 'Pricing is currently at the sweet spot of the market curve. Conversion rate is at peak performance (3.4%). No adjustment recommended.'
        }
    ]);

    const activeProd = products.find(p => p.id === selectedProduct) || products[0];

    const runScrapeScan = () => {
        setIsScraping(true);
        setTimeout(() => {
            setIsScraping(false);
        }, 2200);
    };

    const applyRecommendedPrice = () => {
        setProducts(prev => prev.map(p => p.id === selectedProduct ? {
            ...p,
            ourPrice: '$1,580.00',
            status: 'applied',
            recommendedPrice: '$1,580.00 (Active)'
        } : p));
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <TrendingUp size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Dynamic Pricing & Competitor Radar
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                Browser-Use Firehose
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Real-Time Competitor Stockout & Price Elasticity Engine</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={runScrapeScan}
                        disabled={isScraping}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isScraping
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                        }`}
                    >
                        {isScraping ? <RefreshCw size={13} className="animate-spin" /> : <Eye size={13} />}
                        {isScraping ? 'Scanning Web...' : 'Scan Competitor Stock'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Metric Strip */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tracked SKU Competitors</p>
                        <p className="text-xl font-bold text-slate-100 mt-1">48 stores <span className="text-xs text-amber-400">(Live)</span></p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Competitor Stockouts (24h)</p>
                        <p className="text-xl font-bold text-red-400 mt-1">7 Out of Stock</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Margin Opportunity</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">+$24,180 / mo</p>
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Price Elasticity Index</p>
                        <p className="text-xl font-bold text-indigo-400 mt-1">0.82 (Inelastic)</p>
                    </div>
                </div>

                {/* Main Product Card */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div>
                            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">Active SKU Target</span>
                            <h4 className="text-sm font-bold text-slate-100 mt-0.5">{activeProd.name}</h4>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <span className="text-[10px] text-slate-400 block">Current Price</span>
                                <span className="text-sm font-bold text-slate-200">{activeProd.ourPrice}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-slate-400 block">AI Recommended</span>
                                <span className="text-sm font-bold text-emerald-400">{activeProd.recommendedPrice}</span>
                            </div>
                            {activeProd.status === 'opportunity_detected' && (
                                <button
                                    onClick={applyRecommendedPrice}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
                                >
                                    <Zap size={13} />
                                    Apply Price Bump
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Competitor Price Comparison Table */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Competitor Web Scrapes</span>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            {activeProd.competitors.map((comp, idx) => (
                                <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1">
                                    <p className="font-semibold text-slate-300 truncate">{comp.name}</p>
                                    <p className="text-sm font-mono font-bold text-slate-100">{comp.price}</p>
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded inline-block ${comp.stockColor}`}>
                                        {comp.stock}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reasoning Box */}
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 leading-relaxed">
                        <strong className="block mb-0.5 text-amber-200">AI Elasticity Assessment:</strong>
                        {activeProd.reasoning}
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Shield size={14} className="text-amber-400" />
                        Margin Guardrail: <strong>Prices will never adjust below 55% gross margin or above 15% delta in a 24h window.</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Autonomous Guard: Active</span>
                </div>
            </div>
        </div>
    );
}
