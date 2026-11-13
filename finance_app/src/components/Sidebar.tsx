"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  Bitcoin,
  Calculator,
  ChevronDown,
  FileText,
  Target,
  Layers,
  FileSpreadsheet,
  Camera,
  PieChart,
  Building2,
  FileCheck,
  CreditCard,
  Users,
  TrendingUp,
  ArrowRightLeft,
  Briefcase,
  ShieldCheck,
  Lock,
  Fingerprint,
  Globe,
  FolderArchive,
  MapPin,
  Clock,
  BarChart3,
  RotateCcw,
  Landmark,
  Sliders,
  FileCheck2,
  HardDrive,
  ShieldAlert,
} from 'lucide-react';
import { useEntity } from '@/context/EntityContext';
import { useState } from 'react';

export default function Sidebar() {
  const { entities, activeEntity, setActiveEntity } = useEntity();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    return `flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-800 transition-colors text-sm ${
      isActive ? 'bg-gray-800 text-blue-400 font-semibold' : 'text-gray-300'
    }`;
  };

  return (
    <div className="flex flex-col w-64 bg-gray-950 text-white min-h-screen border-r border-gray-800/80 print-hide flex-shrink-0">
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          Liquid
        </h2>
        <p className="text-[11px] text-gray-500 font-medium">Autonomous Financial OS</p>
      </div>

      {/* Entity Switcher */}
      <div className="px-4 mb-4 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between bg-gray-900 border border-gray-800 p-2.5 rounded-xl hover:bg-gray-800/70 transition-colors"
        >
          <div className="flex flex-col items-start truncate">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Active Entity</span>
            <span className="text-xs font-semibold truncate w-36 text-left text-gray-200">
              {activeEntity?.name || 'Loading...'}
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden z-20">
            {entities.map((entity) => (
              <button
                key={entity.id}
                onClick={() => {
                  setActiveEntity(entity);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-gray-800 transition-colors ${
                  activeEntity?.id === entity.id ? 'bg-gray-800 text-blue-400 font-semibold' : 'text-gray-300'
                }`}
              >
                {entity.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-4 overflow-y-auto text-xs">
        {/* Core Financials */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Overview & Books</p>
          <Link href="/" className={getLinkClass('/')}>
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </Link>
          <Link href="/accounting" className={getLinkClass('/accounting')}>
            <Receipt size={16} />
            <span>Accounting (P&L)</span>
          </Link>
          <Link href="/close" className={getLinkClass('/close')}>
            <FileCheck size={16} />
            <span>Month-End Close</span>
          </Link>
          <Link href="/rev-rec" className={getLinkClass('/rev-rec')}>
            <Layers size={16} />
            <span>Rev Rec (ASC 606)</span>
          </Link>
          <Link href="/consolidation" className={getLinkClass('/consolidation')}>
            <ArrowRightLeft size={16} />
            <span>Multi-Entity Consolidation</span>
          </Link>
          <Link href="/banking" className={getLinkClass('/banking')}>
            <Building2 size={16} />
            <span>Banking & Feeds</span>
          </Link>
          <Link href="/financial-statements" className={getLinkClass('/financial-statements')}>
            <FileSpreadsheet size={16} />
            <span>GAAP 3-Statement Binder</span>
          </Link>
        </div>

        {/* Payables & Receivables */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payables & Receivables</p>
          <Link href="/invoicing" className={getLinkClass('/invoicing')}>
            <FileText size={16} />
            <span>Invoicing (AR)</span>
          </Link>
          <Link href="/bills" className={getLinkClass('/bills')}>
            <CreditCard size={16} />
            <span>Bill Pay & AP</span>
          </Link>
          <Link href="/purchase-orders" className={getLinkClass('/purchase-orders')}>
            <FileCheck2 size={16} />
            <span>PO & 3-Way Match</span>
          </Link>
          <Link href="/contractors" className={getLinkClass('/contractors')}>
            <Users size={16} />
            <span>Contractors & 1099s</span>
          </Link>
          <Link href="/expenses" className={getLinkClass('/expenses')}>
            <Camera size={16} />
            <span>Receipts & Expenses</span>
          </Link>
          <Link href="/payroll" className={getLinkClass('/payroll')}>
            <Users size={16} />
            <span>Payroll Mirror</span>
          </Link>
          <Link href="/renewals" className={getLinkClass('/renewals')}>
            <Clock size={16} />
            <span>Renewal Radar</span>
          </Link>
          <Link href="/dunning" className={getLinkClass('/dunning')}>
            <RotateCcw size={16} />
            <span>Smart Dunning & Recovery</span>
          </Link>
        </div>

        {/* Planning & Capital */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Strategy & Capital</p>
          <Link href="/forecast" className={getLinkClass('/forecast')}>
            <TrendingUp size={16} />
            <span>Runway & Scenarios</span>
          </Link>
          <Link href="/treasury" className={getLinkClass('/treasury')}>
            <Building2 size={16} />
            <span>Treasury & FDIC</span>
          </Link>
          <Link href="/tbill-yield" className={getLinkClass('/tbill-yield')}>
            <Landmark size={16} />
            <span>T-Bill Yield Ladder</span>
          </Link>
          <Link href="/debt" className={getLinkClass('/debt')}>
            <CreditCard size={16} />
            <span>Venture Debt</span>
          </Link>
          <Link href="/equity" className={getLinkClass('/equity')}>
            <Lock size={16} />
            <span>Equity & 83(b)</span>
          </Link>
          <Link href="/investors" className={getLinkClass('/investors')}>
            <Briefcase size={16} />
            <span>Investors & Cap Table</span>
          </Link>
          <Link href="/valuation-409a" className={getLinkClass('/valuation-409a')}>
            <Sliders size={16} />
            <span>409A Valuation (BSOPM)</span>
          </Link>
          <Link href="/exit-waterfall" className={getLinkClass('/exit-waterfall')}>
            <TrendingUp size={16} />
            <span>M&A Exit Waterfall</span>
          </Link>
          <Link href="/round-modeler" className={getLinkClass('/round-modeler')}>
            <Sliders size={16} />
            <span>Series B/C Round Modeler</span>
          </Link>
          <Link href="/taxes" className={getLinkClass('/taxes')}>
            <Calculator size={16} />
            <span>Tax Optimization</span>
          </Link>
          <Link href="/rd-credits" className={getLinkClass('/rd-credits')}>
            <Calculator size={16} />
            <span>R&D Tax Credits</span>
          </Link>
          <Link href="/transfer-pricing" className={getLinkClass('/transfer-pricing')}>
            <Globe size={16} />
            <span>Transfer Pricing</span>
          </Link>
          <Link href="/fixed-assets" className={getLinkClass('/fixed-assets')}>
            <HardDrive size={16} />
            <span>Fixed Assets & ASC 350-40</span>
          </Link>
          <Link href="/lease-accounting" className={getLinkClass('/lease-accounting')}>
            <Building2 size={16} />
            <span>Lease Accounting (ASC 842)</span>
          </Link>
        </div>

        {/* Growth & Metrics */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Growth & Metrics</p>
          <Link href="/metrics" className={getLinkClass('/metrics')}>
            <BarChart3 size={16} />
            <span>SaaS Cohort & NRR</span>
          </Link>
          <Link href="/budget-bva" className={getLinkClass('/budget-bva')}>
            <PieChart size={16} />
            <span>Departmental BvA</span>
          </Link>
          <Link href="/nexus" className={getLinkClass('/nexus')}>
            <MapPin size={16} />
            <span>Sales Tax & Nexus</span>
          </Link>
          <Link href="/concentration-risk" className={getLinkClass('/concentration-risk')}>
            <ShieldAlert size={16} />
            <span>Concentration & Churn Risk</span>
          </Link>
        </div>

        {/* Privacy & Settings */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Governance & Security</p>
          <Link href="/compliance-radar" className={getLinkClass('/compliance-radar')}>
            <Globe size={16} />
            <span>50-State Compliance Radar</span>
          </Link>
          <Link href="/vdr" className={getLinkClass('/vdr')}>
            <FolderArchive size={16} />
            <span>Diligence Room (VDR)</span>
          </Link>
          <Link href="/audit-vault" className={getLinkClass('/audit-vault')}>
            <Fingerprint size={16} />
            <span>SOC 2 Evidence Vault</span>
          </Link>
          <Link href="/insurance-radar" className={getLinkClass('/insurance-radar')}>
            <ShieldCheck size={16} />
            <span>Insurance & D&O Radar</span>
          </Link>
          <Link href="/settings/integrations" className={getLinkClass('/settings/integrations')}>
            <ShieldCheck size={16} />
            <span>Zero-Trust Privacy</span>
          </Link>
        </div>
      </nav>

      <div className="p-3 border-t border-gray-900 text-[11px] text-gray-500">
        Liquid v2.4 • Enterprise Financial OS
      </div>
    </div>
  );
}
export { Sidebar };
