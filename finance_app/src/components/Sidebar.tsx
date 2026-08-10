"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Receipt, Bitcoin, Calculator, ChevronDown, FileText, Target, Layers, FileSpreadsheet, Camera, PieChart, Building2 } from 'lucide-react';
import { useEntity } from '@/context/EntityContext';
import { useState } from 'react';

export default function Sidebar() {
  const { entities, activeEntity, setActiveEntity } = useEntity();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    return `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ${
      isActive ? 'bg-gray-800 text-blue-400 font-medium' : 'text-gray-300'
    }`;
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen print-hide">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-400">Liquid</h2>
      </div>
      
      {/* Entity Switcher */}
      <div className="px-4 mb-6 relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Active Entity</span>
            <span className="text-sm font-medium truncate w-40 text-left">{activeEntity?.name || 'Loading...'}</span>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-10">
            {entities.map(entity => (
              <button
                key={entity.id}
                onClick={() => {
                  setActiveEntity(entity);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-700 transition-colors ${activeEntity?.id === entity.id ? 'bg-gray-700 text-blue-400 font-medium' : 'text-gray-300'}`}
              >
                {entity.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className={getLinkClass('/')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/banking" className={getLinkClass('/banking')}>
          <Building2 size={20} />
          <span>Banking & Sync</span>
        </Link>
        <Link href="/analytics" className={getLinkClass('/analytics')}>
          <PieChart size={20} />
          <span>Analytics & Statements</span>
        </Link>
        <Link href="/accounting" className={getLinkClass('/accounting')}>
          <Receipt size={20} />
          <span>Accounting (P&L)</span>
        </Link>
        <Link href="/invoicing" className={getLinkClass('/invoicing')}>
          <FileText size={20} />
          <span>Invoicing</span>
        </Link>
        <Link href="/expenses" className={getLinkClass('/expenses')}>
          <Camera size={20} />
          <span>Expenses & Receipts</span>
        </Link>
        <Link href="/advanced-invoicing" className={getLinkClass('/advanced-invoicing')}>
          <FileSpreadsheet size={20} />
          <span>Advanced Invoicing</span>
        </Link>
        <Link href="/crypto" className={getLinkClass('/crypto')}>
          <Bitcoin size={20} />
          <span>Crypto Tracking</span>
        </Link>
        <Link href="/taxes" className={getLinkClass('/taxes')}>
          <Calculator size={20} />
          <span>Tax Strategies</span>
        </Link>
        <Link href="/journaling" className={getLinkClass('/journaling')}>
          <Target size={20} />
          <span>Trade Journal</span>
        </Link>
        <Link href="/defi" className={getLinkClass('/defi')}>
          <Layers size={20} />
          <span>DeFi & Staking</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-800 text-sm text-gray-500">
        Using mock data.
      </div>
    </div>
  );
}
