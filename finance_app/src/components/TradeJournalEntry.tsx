"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { JournaledTrade } from '@/lib/journalAnalytics';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (trade: Omit<JournaledTrade, 'id'>) => void;
  initialData?: JournaledTrade;
}

export default function TradeJournalEntry({ isOpen, onClose, onSave, initialData }: Props) {
  const [asset, setAsset] = useState(initialData?.asset || '');
  const [isLong, setIsLong] = useState(initialData?.isLong ?? true);
  const [entryDate, setEntryDate] = useState(initialData?.entryDate.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]);
  const [exitDate, setExitDate] = useState(initialData?.exitDate?.toISOString().split('T')[0] || '');
  const [entryPrice, setEntryPrice] = useState(initialData?.entryPrice.toString() || '');
  const [exitPrice, setExitPrice] = useState(initialData?.exitPrice?.toString() || '');
  const [positionSize, setPositionSize] = useState(initialData?.positionSize.toString() || '');
  const [fees, setFees] = useState(initialData?.fees.toString() || '0');
  const [strategyTag, setStrategyTag] = useState(initialData?.strategyTag || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      asset,
      isLong,
      entryDate: new Date(entryDate),
      exitDate: exitDate ? new Date(exitDate) : undefined,
      entryPrice: parseFloat(entryPrice),
      exitPrice: exitPrice ? parseFloat(exitPrice) : undefined,
      positionSize: parseFloat(positionSize),
      fees: parseFloat(fees),
      strategyTag,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Trade Entry' : 'Log New Trade'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Asset</label>
              <input
                required
                type="text"
                placeholder="BTC, AAPL, etc."
                value={asset}
                onChange={e => setAsset(e.target.value.toUpperCase())}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Direction</label>
              <select
                value={isLong ? 'Long' : 'Short'}
                onChange={e => setIsLong(e.target.value === 'Long')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Entry Date</label>
              <input
                required
                type="date"
                value={entryDate}
                onChange={e => setEntryDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Exit Date (Optional)</label>
              <input
                type="date"
                value={exitDate}
                onChange={e => setExitDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Entry Price</label>
              <input
                required
                type="number"
                step="any"
                min="0"
                value={entryPrice}
                onChange={e => setEntryPrice(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Exit Price</label>
              <input
                type="number"
                step="any"
                min="0"
                value={exitPrice}
                onChange={e => setExitPrice(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input
                required
                type="number"
                step="any"
                min="0"
                value={positionSize}
                onChange={e => setPositionSize(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fees</label>
              <input
                required
                type="number"
                step="any"
                min="0"
                value={fees}
                onChange={e => setFees(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Strategy / Setup</label>
              <input
                required
                type="text"
                placeholder="e.g. Mean Reversion, Breakout"
                value={strategyTag}
                onChange={e => setStrategyTag(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trade Notes</label>
            <textarea
              required
              rows={4}
              placeholder="Why did you take this trade? How did you manage it?"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
