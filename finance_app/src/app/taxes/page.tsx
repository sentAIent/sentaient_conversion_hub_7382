"use client";

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function TaxesPage() {
  const [taxRate, setTaxRate] = useState<number>(25);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  // Fetch initial data
  useEffect(() => {
    fetchTaxData(taxRate);
  }, []);

  // Update data when slider changes (debounced slightly via onMouseUp or just onChange if lightweight)
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tax Estimates</h1>
          <p className="text-gray-500 mt-1">Automated quarterly estimates based on your live ledger.</p>
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
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
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
      </div>
    </div>
  );
}
