"use client";

import { useState, useMemo } from 'react';
import { calculateCapitalGains, calculateEstimatedTaxes, findHarvestingOpportunities, Trade, AccountingMethod } from '@/lib/taxCalculator';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

// Mock Data
const mockTrades: Trade[] = [
  { id: '1', asset: 'BTC', type: 'BUY', amount: 1, priceUSD: 30000, date: new Date('2023-01-15') },
  { id: '2', asset: 'BTC', type: 'BUY', amount: 0.5, priceUSD: 45000, date: new Date('2023-06-10') },
  // Sell at a steep loss to set up a potential wash sale
  { id: '3', asset: 'BTC', type: 'SELL', amount: 0.5, priceUSD: 20000, date: new Date('2023-06-20') },
  // Buy back within 30 days triggers wash sale!
  { id: '4', asset: 'BTC', type: 'BUY', amount: 0.5, priceUSD: 21000, date: new Date('2023-07-10') },
  { id: '5', asset: 'BTC', type: 'SELL', amount: 0.5, priceUSD: 60000, date: new Date('2024-03-01') },
  { id: '6', asset: 'ETH', type: 'BUY', amount: 10, priceUSD: 2000, date: new Date('2023-11-20') },
  { id: '7', asset: 'ETH', type: 'SELL', amount: 5, priceUSD: 3500, date: new Date('2024-02-15'), specificLotIds: ['6'] },
  // Add a new buy at a high price to create a harvesting opportunity
  { id: '8', asset: 'ETH', type: 'BUY', amount: 2, priceUSD: 4000, date: new Date('2024-05-01') },
];

const MOCK_CURRENT_PRICES = {
  'BTC': 65000,
  'ETH': 3200,
};

export default function CryptoPage() {
  const [taxMethod, setTaxMethod] = useState<AccountingMethod>('FIFO');
  const [applyWashSales, setApplyWashSales] = useState<boolean>(false);

  const gains = useMemo(() => calculateCapitalGains(mockTrades, taxMethod, applyWashSales), [taxMethod, applyWashSales]);
  const opportunities = useMemo(() => findHarvestingOpportunities(mockTrades, MOCK_CURRENT_PRICES), []);
  
  const totalGain = gains.reduce((sum, g) => sum + g.gainUSD, 0);
  
  const shortTermGains = gains.filter(g => g.term === 'SHORT').reduce((sum, g) => sum + g.gainUSD, 0);
  const longTermGains = gains.filter(g => g.term === 'LONG').reduce((sum, g) => sum + g.gainUSD, 0);

  // Mock ordinary income for tax bracket calculations
  const mockOrdinaryIncome = 100000;
  const taxes = calculateEstimatedTaxes(Math.max(0, shortTermGains), Math.max(0, longTermGains), mockOrdinaryIncome);
  const taxOwed = taxes.totalEstimatedTax - taxes.ordinaryIncomeTax; // Tax isolated to just capital gains

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crypto Tracking & Taxes</h1>
          <p className="text-gray-500 mt-1">Manage your crypto trades and calculate capital gains.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="flex items-center space-x-2 pb-2">
            <input 
              type="checkbox" 
              id="washSale" 
              checked={applyWashSales}
              onChange={(e) => setApplyWashSales(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="washSale" className="text-sm font-medium text-gray-700">Apply Wash Sale Rules</label>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Tax Accounting Method</label>
            <select 
              value={taxMethod}
              onChange={(e) => setTaxMethod(e.target.value as AccountingMethod)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-48 p-2 border"
            >
              <option value="FIFO">FIFO (First-In, First-Out)</option>
              <option value="LIFO">LIFO (Last-In, First-Out)</option>
              <option value="HIFO">HIFO (Highest-In, First-Out)</option>
              <option value="SPEC_ID">SpecID (Specific Identification)</option>
            </select>
          </div>
        </div>
      </div>

      <ComingSoonOverlay>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Realized Capital Gains</h2>
          <p className="text-3xl font-bold text-gray-900">
            ${totalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="text-sm text-gray-500 mt-2 flex gap-4">
            <span>Short Term: ${shortTermGains.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span>Long Term: ${longTermGains.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Estimated Tax Owed (2024)</h2>
          <p className="text-3xl font-bold text-red-600">
            ${taxOwed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500 mt-1">Based on $100k assumed ordinary income</p>
        </div>
      </div>

      {opportunities.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Tax-Loss Harvesting Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opp, i) => (
              <div key={i} className={`bg-white p-4 rounded-lg shadow-sm border ${opp.washSaleRisk ? 'border-red-300' : 'border-blue-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900">{opp.asset}</span>
                  <span className="text-sm font-medium text-red-600">-${Math.abs(opp.unrealizedLossUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Amount: {opp.amount} {opp.asset}</p>
                  <p>Cost Basis: ${opp.buyPriceUSD.toLocaleString()} / ea</p>
                  <p>Current Price: ${opp.currentPriceUSD.toLocaleString()} / ea</p>
                  <p>Bought: {opp.buyDate.toLocaleDateString()}</p>
                </div>
                {opp.washSaleRisk && (
                  <div className="mt-3 p-2 bg-red-50 text-red-700 text-xs rounded border border-red-100 flex items-start">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>
                    <span>Wash sale risk! You purchased {opp.asset} within the last 30 days. Do not harvest this lot yet.</span>
                  </div>
                )}
                {!opp.washSaleRisk && (
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded transition-colors">
                    Harvest Loss
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Capital Gains Report ({taxMethod})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Sold</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Price (Cost Basis)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gains.map((g, idx) => (
                <tr key={idx} className={g.isWashSale ? "bg-red-50" : ""}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{g.asset}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{g.amountSold.toFixed(4)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">${g.buyPriceUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">${g.sellPriceUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${g.term === 'LONG' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                      {g.term}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className={`font-semibold ${g.gainUSD >= 0 && !g.isWashSale ? 'text-green-600' : g.isWashSale ? 'text-gray-500' : 'text-red-600'}`}>
                      {g.gainUSD >= 0 && !g.isWashSale ? '+' : ''}${g.gainUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                    {g.isWashSale && (
                      <div className="text-xs text-red-500 mt-1 font-medium">Wash Sale Disallowed<br/>(${(g.disallowedLossUSD || 0).toLocaleString(undefined, {minimumFractionDigits: 2})} loss)</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </ComingSoonOverlay>
    </div>
  );
}
