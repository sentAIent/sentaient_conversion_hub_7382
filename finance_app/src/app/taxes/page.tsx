"use client";

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Calendar, AlertCircle, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';

export default function TaxesPage() {
  const [taxRate, setTaxRate] = useState<number>(25);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [aiStrategies, setAiStrategies] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const fetchTaxData = async (rate: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/taxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taxRate: rate }),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch tax data", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAiStrategy = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/tax');
      if (!res.ok) throw new Error("Failed to generate strategy");
      const result = await res.json();
      setAiStrategies(result.strategies);
    } catch (error: any) {
      console.error(error);
      setAiError(error.message || "An error occurred while communicating with the AI.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxData(taxRate);
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseInt(e.target.value);
    setTaxRate(newRate);
    fetchTaxData(newRate);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tax Center</h1>
          <p className="text-gray-500 mt-1">Automated quarterly estimates and AI-powered tax strategies (US IRS).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Config & Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Tax Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Estimated Tax Rate</label>
                  <span className="text-sm font-bold text-indigo-600">{taxRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={taxRate}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Adjust this slider to change the percentage of net income set aside for taxes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-amber-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Upcoming Deadline</h3>
                <p className="text-sm opacity-90 mb-3">Q3 Estimated Taxes are due on September 15.</p>
                <button className="text-sm font-semibold text-amber-900 bg-amber-200/50 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
                  Pay via IRS Direct Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">YTD Liability Overview</h2>
            
            {loading && !data ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-100 rounded"></div>
                <div className="h-24 bg-gray-100 rounded"></div>
              </div>
            ) : data ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" /> Gross Revenue
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(data.revenue)}</div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-red-500" /> Deductible Expenses
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(data.expenses)}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">Net Taxable Income</h3>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(data.netIncome)}</span>
                  </div>

                  <div className="bg-indigo-600 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-indigo-200">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <p className="text-indigo-100 font-medium mb-1">Total Estimated Tax Liability ({taxRate}%)</p>
                        <h2 className="text-4xl font-extrabold tracking-tight">
                          {formatCurrency(data.estimatedTotalTax)}
                        </h2>
                      </div>
                      <div className="bg-indigo-700/50 rounded-xl p-4 backdrop-blur-sm border border-indigo-500/30">
                        <p className="text-indigo-200 text-sm mb-1 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> Recommended Quarterly
                        </p>
                        <p className="text-2xl font-bold">{formatCurrency(data.quarterlyEstimate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* AI Tax Strategy Section (Glassmorphism) */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-[1px] rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl h-full relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Sparkles className="text-purple-400 w-6 h-6" />
                      AI Tax Strategist
                    </h2>
                    <p className="text-gray-400 mt-2 max-w-lg">
                      Generate personalized US IRS tax strategies based on your anonymized trading activity and corporate ledger.
                    </p>
                  </div>
                  {!aiStrategies && (
                    <button 
                      onClick={generateAiStrategy}
                      disabled={aiLoading}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl transition-all font-medium disabled:opacity-50"
                    >
                      {aiLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Analyzing Data...
                        </>
                      ) : (
                        <>
                          <BrainCircuit className="w-5 h-5" />
                          Generate Strategies
                        </>
                      )}
                    </button>
                  )}
                </div>

                {aiError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">
                    {aiError}
                  </div>
                )}

                {aiStrategies && (
                  <div className="space-y-4">
                    {aiStrategies.map((strategy: any, idx: number) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group cursor-default">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-500/20">
                              {strategy.category}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                              strategy.impact === 'High' ? 'bg-green-500/20 text-green-300 border-green-500/20' : 
                              strategy.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20' : 
                              'bg-gray-500/20 text-gray-300 border-gray-500/20'
                            }`}>
                              {strategy.impact} Impact
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{strategy.title}</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {strategy.description}
                        </p>
                      </div>
                    ))}
                    
                    <div className="pt-6 flex justify-end">
                      <button 
                        onClick={generateAiStrategy}
                        disabled={aiLoading}
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        {aiLoading ? "Regenerating..." : "Regenerate Strategies"} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
