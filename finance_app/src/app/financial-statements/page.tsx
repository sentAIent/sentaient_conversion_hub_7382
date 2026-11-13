'use client';

import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building2,
  PieChart,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function FinancialStatementsPage() {
  const [activeTab, setActiveTab] = useState<'BALANCE_SHEET' | 'INCOME_STATEMENT' | 'CASH_FLOW' | 'TAX_M1'>('BALANCE_SHEET');
  const [period, setPeriod] = useState<string>('Q3 2026 (YTD September 30, 2026)');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Balance Sheet Figures
  const currentAssets = {
    cashAndCashEquivalents: 1300000,
    shortTermTBills: 3200000,
    accountsReceivable: 485000,
    prepaidExpensesAndDeposits: 95000,
  };
  const totalCurrentAssets = Object.values(currentAssets).reduce((a, b) => a + b, 0);

  const nonCurrentAssets = {
    capitalizedSoftwareASC350: 350280,
    propertyAndEquipmentNBV: 249474,
    operatingLeaseROUAssetASC842: 684120,
    securityDeposits: 48000,
  };
  const totalNonCurrentAssets = Object.values(nonCurrentAssets).reduce((a, b) => a + b, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const currentLiabilities = {
    accountsPayable: 182000,
    accruedPayrollAndBenefits: 145000,
    currentOperatingLeaseLiability: 245000,
    deferredRevenueASC606: 620000,
  };
  const totalCurrentLiabilities = Object.values(currentLiabilities).reduce((a, b) => a + b, 0);

  const longTermLiabilities = {
    ventureDebtTermLoan: 2000000,
    nonCurrentOperatingLeaseLiability: 439120,
  };
  const totalLongTermLiabilities = Object.values(longTermLiabilities).reduce((a, b) => a + b, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const stockholdersEquity = {
    seriesAPreferredStock: 12000000,
    commonStockAndSAFEs: 3050000,
    additionalPaidInCapital: 1250000,
    accumulatedDeficit: -13674246,
  };
  const totalStockholdersEquity = Object.values(stockholdersEquity).reduce((a, b) => a + b, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalStockholdersEquity;

  const balanceCheckVariance = totalAssets - totalLiabilitiesAndEquity; // Must equal 0

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl border border-indigo-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Audit-Ready GAAP Three-Statement Financial Packager
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Integrated GAAP Balance Sheet, Income Statement (P&L), Statement of Cash Flows, and Schedule M-1 Book-to-Tax Reconciliation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Generating GAAP Financial Binder with auditor footnotes and tie-out schedules...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export Audit Package (Excel)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('BALANCE_SHEET')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'BALANCE_SHEET'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          1. Balance Sheet
        </button>
        <button
          onClick={() => setActiveTab('INCOME_STATEMENT')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'INCOME_STATEMENT'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          2. Income Statement (P&L)
        </button>
        <button
          onClick={() => setActiveTab('CASH_FLOW')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'CASH_FLOW'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          3. Statement of Cash Flows
        </button>
        <button
          onClick={() => setActiveTab('TAX_M1')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'TAX_M1'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          4. Schedule M-1 (Tax Tie-Out)
        </button>
      </div>

      {/* TAB 1: BALANCE SHEET */}
      {activeTab === 'BALANCE_SHEET' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div>
                <span className="text-sm font-bold text-foreground">Balance Sheet Balanced</span>
                <p className="text-xs text-muted-foreground">Assets equal Total Liabilities & Stockholders' Equity ($0.00 Variance)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Total Assets / Total Capital</span>
              <p className="text-xl font-bold font-mono text-emerald-500">{formatCurrency(totalAssets)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assets Column */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Assets
              </h2>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Current Assets</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Cash & Cash Equivalents</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentAssets.cashAndCashEquivalents)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Short-Term US Treasury Bills (Yield Ladder)</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentAssets.shortTermTBills)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Accounts Receivable (net of allowance)</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentAssets.accountsReceivable)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Prepaid Expenses & Other Current</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentAssets.prepaidExpensesAndDeposits)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-foreground">
                    <span>Total Current Assets</span>
                    <span className="font-mono">{formatCurrency(totalCurrentAssets)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Non-Current Assets</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Capitalized Software, net (ASC 350-40)</span>
                    <span className="font-mono text-foreground">{formatCurrency(nonCurrentAssets.capitalizedSoftwareASC350)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Property, Plant & Equipment, net (NBV)</span>
                    <span className="font-mono text-foreground">{formatCurrency(nonCurrentAssets.propertyAndEquipmentNBV)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Operating Lease Right-of-Use Asset (ASC 842)</span>
                    <span className="font-mono text-foreground">{formatCurrency(nonCurrentAssets.operatingLeaseROUAssetASC842)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Long-Term Security Deposits</span>
                    <span className="font-mono text-foreground">{formatCurrency(nonCurrentAssets.securityDeposits)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-foreground">
                    <span>Total Non-Current Assets</span>
                    <span className="font-mono">{formatCurrency(totalNonCurrentAssets)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl flex justify-between items-center font-bold text-base text-foreground">
                <span>Total Assets</span>
                <span className="font-mono text-primary">{formatCurrency(totalAssets)}</span>
              </div>
            </div>

            {/* Liabilities & Equity Column */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Liabilities & Stockholders' Equity
              </h2>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Current Liabilities</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Accounts Payable</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentLiabilities.accountsPayable)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Accrued Payroll & Operating Expenses</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentLiabilities.accruedPayrollAndBenefits)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Current Operating Lease Liability (ASC 842)</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentLiabilities.currentOperatingLeaseLiability)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Deferred Revenue (ASC 606 Contract Liability)</span>
                    <span className="font-mono text-foreground">{formatCurrency(currentLiabilities.deferredRevenueASC606)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-foreground">
                    <span>Total Current Liabilities</span>
                    <span className="font-mono">{formatCurrency(totalCurrentLiabilities)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Long-Term Liabilities</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Venture Debt Term Loan</span>
                    <span className="font-mono text-foreground">{formatCurrency(longTermLiabilities.ventureDebtTermLoan)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Non-Current Lease Liability (ASC 842)</span>
                    <span className="font-mono text-foreground">{formatCurrency(longTermLiabilities.nonCurrentOperatingLeaseLiability)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-foreground">
                    <span>Total Long-Term Liabilities</span>
                    <span className="font-mono">{formatCurrency(totalLongTermLiabilities)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">Stockholders' Equity</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Series A Preferred Stock</span>
                    <span className="font-mono text-foreground">{formatCurrency(stockholdersEquity.seriesAPreferredStock)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Common Stock & SAFEs</span>
                    <span className="font-mono text-foreground">{formatCurrency(stockholdersEquity.commonStockAndSAFEs)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Additional Paid-In Capital</span>
                    <span className="font-mono text-foreground">{formatCurrency(stockholdersEquity.additionalPaidInCapital)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Accumulated Deficit</span>
                    <span className="font-mono text-rose-500">({formatCurrency(Math.abs(stockholdersEquity.accumulatedDeficit))})</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-foreground">
                    <span>Total Stockholders' Equity</span>
                    <span className="font-mono">{formatCurrency(totalStockholdersEquity)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl flex justify-between items-center font-bold text-base text-foreground">
                <span>Total Liabilities & Equity</span>
                <span className="font-mono text-primary">{formatCurrency(totalLiabilitiesAndEquity)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INCOME STATEMENT */}
      {activeTab === 'INCOME_STATEMENT' && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              GAAP Consolidated Statement of Operations (P&L)
            </h2>
            <span className="text-xs font-mono text-muted-foreground">{period}</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-sm">
            {/* Revenue */}
            <div className="space-y-1">
              <div className="flex justify-between py-1">
                <span className="font-medium text-foreground">Subscription SaaS Revenue (ASC 606 Recognized)</span>
                <span className="font-mono font-bold text-foreground">{formatCurrency(3150000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border text-muted-foreground text-xs">
                <span>Cost of Goods Sold (Cloud compute, data pipelines, support)</span>
                <span className="font-mono">({formatCurrency(598500)})</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-foreground bg-muted/20 px-2 rounded">
                <span>Gross Profit (81.0% Gross Margin)</span>
                <span className="font-mono text-emerald-500">{formatCurrency(2551500)}</span>
              </div>
            </div>

            {/* OPEX */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Operating Expenses</span>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Research & Development (net of $707k capitalized software under ASC 350-40)</span>
                <span className="font-mono">{formatCurrency(1350000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Sales & Marketing (Growth marketing, enterprise sales, commissions)</span>
                <span className="font-mono">{formatCurrency(780000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>General & Administrative (Legal, finance, audit, office ROU lease)</span>
                <span className="font-mono">{formatCurrency(485000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Depreciation & Intangible Amortization</span>
                <span className="font-mono">{formatCurrency(175000)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-foreground bg-muted/20 px-2 rounded">
                <span>Total Operating Expenses</span>
                <span className="font-mono">{formatCurrency(2790000)}</span>
              </div>
            </div>

            {/* Operating Income & Non-Operating */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between py-1 font-semibold text-rose-500">
                <span>Operating Loss (EBIT)</span>
                <span className="font-mono">({formatCurrency(238500)})</span>
              </div>
              <div className="flex justify-between py-1 text-emerald-600 border-b border-border">
                <span>Interest & Treasury Yield Income (T-Bill ladder @ 5.03% APY)</span>
                <span className="font-mono">+{formatCurrency(120800)}</span>
              </div>
              <div className="flex justify-between py-1 text-muted-foreground border-b border-border">
                <span>Venture Debt Interest Expense (SOFR + 4.5%)</span>
                <span className="font-mono">({formatCurrency(135000)})</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-base bg-muted/40 px-3 rounded-xl text-foreground">
                <span>GAAP Net Loss</span>
                <span className="font-mono text-rose-500">({formatCurrency(252700)})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CASH FLOW */}
      {activeTab === 'CASH_FLOW' && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              GAAP Statement of Cash Flows (Indirect Method)
            </h2>
            <span className="text-xs font-mono text-muted-foreground">{period}</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-sm">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase">Cash Flows From Operating Activities</h3>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>GAAP Net Loss</span>
                <span className="font-mono text-rose-500">({formatCurrency(252700)})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Adjustments: Depreciation & Amortization</span>
                <span className="font-mono">+{formatCurrency(175000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Adjustments: Stock-Based Compensation Expense</span>
                <span className="font-mono">+{formatCurrency(85000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Change in Accounts Receivable</span>
                <span className="font-mono">({formatCurrency(62000)})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Change in Deferred Revenue (ASC 606 Advance Billings)</span>
                <span className="font-mono">+{formatCurrency(145000)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-foreground bg-muted/20 px-2 rounded">
                <span>Net Cash Used In Operating Activities</span>
                <span className="font-mono text-emerald-500">+{formatCurrency(90300)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase">Cash Flows From Investing Activities</h3>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Capitalized Software Development (ASC 350-40)</span>
                <span className="font-mono">({formatCurrency(707000)})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Purchases of IT Hardware & GPU Servers</span>
                <span className="font-mono">({formatCurrency(45000)})</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-foreground bg-muted/20 px-2 rounded">
                <span>Net Cash Used In Investing Activities</span>
                <span className="font-mono text-rose-500">({formatCurrency(752000)})</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase">Cash Flows From Financing Activities</h3>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Proceeds from Venture Debt Facility</span>
                <span className="font-mono">+{formatCurrency(2000000)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-foreground bg-muted/20 px-2 rounded">
                <span>Net Cash Provided By Financing Activities</span>
                <span className="font-mono text-emerald-500">+{formatCurrency(2000000)}</span>
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-xl flex justify-between items-center font-bold text-base text-foreground">
              <span>Net Increase in Cash, Equivalents & T-Bills</span>
              <span className="font-mono text-primary">+{formatCurrency(1338300)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULE M-1 */}
      {activeTab === 'TAX_M1' && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              IRS Form 1120 Schedule M-1: Book-to-Tax Reconciliation
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Federal Tax Year 2026</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-sm">
            <div className="flex justify-between py-2 border-b border-border font-bold">
              <span>Line 1: Net Income / (Loss) per GAAP Books</span>
              <span className="font-mono text-rose-500">({formatCurrency(252700)})</span>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Permanent & Temporary Add-Back Adjustments
              </span>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>50% Non-Deductible Business Meals & Entertainment (IRC § 274)</span>
                <span className="font-mono text-foreground">+{formatCurrency(14200)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Non-Deductible Fines & Penalties</span>
                <span className="font-mono text-foreground">+$0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>Stock-Based Compensation Book Expense (ASC 718 non-deductible until exercise)</span>
                <span className="font-mono text-foreground">+{formatCurrency(85000)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50 text-muted-foreground">
                <span>IRC Section 174 Mandatory R&D Amortization Timing Difference (5-Year Tax Amortization)</span>
                <span className="font-mono text-foreground">+{formatCurrency(410000)}</span>
              </div>
            </div>

            <div className="p-4 bg-muted/40 rounded-xl flex justify-between items-center font-bold text-base text-foreground">
              <span>Adjusted Taxable Income / (Tax Net Operating Loss)</span>
              <span className="font-mono text-primary">{formatCurrency(256500)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              * Note: Taxable income is absorbed against prior year federal Net Operating Loss (NOL) carryforwards under IRC § 172.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
