"use client";

import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Layers, 
  Receipt, 
  Sliders, 
  ShieldAlert, 
  UserCheck, 
  Lock, 
  FileCheck2 
} from 'lucide-react';
import { 
  ThreeWayMatchingEngine, 
  PurchaseOrder, 
  GoodsReceiptNote, 
  VendorInvoice 
} from '@/lib/ap/threeWayMatchingEngine';
import { 
  SpendPolicyController, 
  SpendAuthorizationRequest, 
  DEFAULT_CORPORATE_POLICIES 
} from '@/lib/ap/spendPolicyController';

export default function SpendAPView() {
  const [activeTab, setActiveTab] = useState<'matching' | 'virtualCards'>('matching');

  // --- 3-Way Matching Engine State ---
  const [tolerance, setTolerance] = useState<number>(0.5);

  const initialPO: PurchaseOrder = {
    poNumber: 'PO-2026-8819',
    vendorName: 'Datadog Cloud Monitoring',
    createdDate: '2026-10-15',
    currency: 'USD',
    totalAmount: 18500,
    items: [
      { id: '1', sku: 'DD-APM-ENT', description: 'Datadog APM Enterprise Host Licenses (100 pack)', quantityOrdered: 5, unitPrice: 2500, totalPrice: 12500 },
      { id: '2', sku: 'DD-LOG-RET', description: 'Log Management 30-day Retention (Million events)', quantityOrdered: 20, unitPrice: 200, totalPrice: 4000 },
      { id: '3', sku: 'DD-SEC-MON', description: 'Cloud SIEM & Security Monitoring Hosts', quantityOrdered: 10, unitPrice: 200, totalPrice: 2000 }
    ]
  };

  const initialGRN: GoodsReceiptNote = {
    grnNumber: 'GRN-2026-4401',
    poNumber: 'PO-2026-8819',
    receivedDate: '2026-10-18',
    receivedItems: [
      { sku: 'DD-APM-ENT', quantityReceived: 5, condition: 'ACCEPTED' },
      { sku: 'DD-LOG-RET', quantityReceived: 20, condition: 'ACCEPTED' },
      { sku: 'DD-SEC-MON', quantityReceived: 8, condition: 'ACCEPTED' } // 2 units short
    ]
  };

  const initialInvoice: VendorInvoice = {
    invoiceNumber: 'INV-DD-99201',
    poNumber: 'PO-2026-8819',
    vendorName: 'Datadog Cloud Monitoring',
    invoiceDate: '2026-10-25',
    dueDate: '2026-11-25',
    totalAmountBilled: 18900,
    billedItems: [
      { sku: 'DD-APM-ENT', description: 'Datadog APM Enterprise Host Licenses (100 pack)', quantityBilled: 5, unitPriceBilled: 2500, totalBilled: 12500 },
      { sku: 'DD-LOG-RET', description: 'Log Management 30-day Retention', quantityBilled: 20, unitPriceBilled: 210, totalBilled: 4200 }, // $10 unit price hike (+5%)
      { sku: 'DD-SEC-MON', description: 'Cloud SIEM & Security Monitoring Hosts', quantityBilled: 10, unitPriceBilled: 200, totalBilled: 2000 }, // billed 10, received 8
      { sku: 'DD-EXTRA-FEE', description: 'Unapproved Urgent Provisioning Surcharge', quantityBilled: 1, unitPriceBilled: 200, totalBilled: 200 } // unapproved SKU
    ]
  };

  const [po] = useState<PurchaseOrder>(initialPO);
  const [grn] = useState<GoodsReceiptNote>(initialGRN);
  const [invoice] = useState<VendorInvoice>(initialInvoice);

  const matchResult = useMemo(() => {
    return ThreeWayMatchingEngine.match(po, grn, invoice, tolerance);
  }, [po, grn, invoice, tolerance]);

  // --- Corporate Spend Policy / Virtual Card State ---
  const [selectedPolicyKey, setSelectedPolicyKey] = useState<string>('ENGINEERING_SAAS');
  const [authRequest, setAuthRequest] = useState<SpendAuthorizationRequest>({
    cardId: 'card_virtual_4891',
    cardholderName: 'Alex Rivera (Staff SRE)',
    cardholderDepartment: 'Engineering',
    amount: 12450,
    merchantName: 'Amazon Web Services',
    mcc: '7372', // Computer Programming/Data Processing
    currentMonthSpend: 8200,
    currency: 'USD'
  });

  const authEvaluation = useMemo(() => {
    const policy = DEFAULT_CORPORATE_POLICIES[selectedPolicyKey];
    return SpendPolicyController.evaluateAuthorization(authRequest, policy);
  }, [authRequest, selectedPolicyKey]);

  return (
    <div className="p-8 space-y-8 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">AP Automation & Spend Controls</h1>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Institutional Grade
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Automated 3-way invoice reconciliation, real-time virtual card MCC spend locks, and Segregation of Duties (SOD).
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('matching')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'matching' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCheck2 size={16} />
            <span>3-Way Matching Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('virtualCards')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'virtualCards' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard size={16} />
            <span>Virtual Card & SOD Sentry</span>
          </button>
        </div>
      </div>

      {activeTab === 'matching' ? (
        <div className="space-y-6">
          {/* Status Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            matchResult.matchStatus === 'APPROVED_FOR_PAYMENT'
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
              : matchResult.matchStatus === 'EXCEPTION_HOLD'
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
              : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
          }`}>
            <div className="flex items-center space-x-4">
              {matchResult.matchStatus === 'APPROVED_FOR_PAYMENT' && <CheckCircle2 size={32} className="text-emerald-400" />}
              {matchResult.matchStatus === 'EXCEPTION_HOLD' && <AlertTriangle size={32} className="text-amber-400" />}
              {matchResult.matchStatus === 'REJECTED' && <XCircle size={32} className="text-rose-400" />}
              <div>
                <h3 className="text-lg font-bold">
                  Reconciliation Status: {matchResult.matchStatus.replace(/_/g, ' ')}
                </h3>
                <p className="text-sm opacity-90">
                  PO: {po.poNumber} | Invoice: {invoice.invoiceNumber} | Vendor: {invoice.vendorName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Authorized Amount</div>
                <div className="text-2xl font-mono font-bold text-white">
                  ${matchResult.authorizedPayableAmount.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Billed Total</div>
                <div className="text-2xl font-mono font-bold text-gray-300">
                  ${invoice.totalAmountBilled.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Tolerance Config */}
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sliders size={18} className="text-blue-400" />
              <div>
                <span className="text-sm font-semibold text-white">Variance Tolerance Threshold:</span>
                <span className="ml-2 text-sm font-mono text-blue-400">{tolerance.toFixed(1)}%</span>
                <p className="text-xs text-gray-400">Variances within this threshold are flagged as warnings rather than blocking holds.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input 
                type="range" 
                min="0.0" 
                max="5.0" 
                step="0.1" 
                value={tolerance} 
                onChange={(e) => setTolerance(parseFloat(e.target.value))}
                className="w-48 accent-blue-500"
              />
            </div>
          </div>

          {/* Line Item Discrepancies Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-semibold text-white flex items-center space-x-2">
                <Layers size={18} className="text-blue-400" />
                <span>Line-Item 3-Way Cross Verification</span>
              </h2>
              <span className="text-xs text-gray-400">
                {matchResult.lineDiscrepancies.length} Discrepancies Flagged
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">SKU & Description</th>
                    <th className="p-3 text-right">PO Price</th>
                    <th className="p-3 text-right">Inv Price</th>
                    <th className="p-3 text-center">Price Var %</th>
                    <th className="p-3 text-center">Ordered / Recv / Billed</th>
                    <th className="p-3 text-center">Severity</th>
                    <th className="p-3">Audit Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {matchResult.lineDiscrepancies.map((line, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="p-3">
                        <div className="font-mono font-medium text-white">{line.sku}</div>
                        <div className="text-xs text-gray-400">{line.description}</div>
                      </td>
                      <td className="p-3 text-right font-mono">${line.poUnitPrice.toFixed(2)}</td>
                      <td className="p-3 text-right font-mono">${line.invoiceUnitPrice.toFixed(2)}</td>
                      <td className={`p-3 text-center font-mono ${line.priceVariancePercent > tolerance ? 'text-amber-400 font-bold' : 'text-gray-400'}`}>
                        {line.priceVariancePercent > 0 ? `+${line.priceVariancePercent.toFixed(1)}%` : '0.0%'}
                      </td>
                      <td className="p-3 text-center font-mono text-xs">
                        <span className="text-gray-300">{line.quantityOrdered}</span>
                        <span className="text-gray-500"> / </span>
                        <span className="text-emerald-400">{line.quantityReceived}</span>
                        <span className="text-gray-500"> / </span>
                        <span className={line.quantityBilled > line.quantityReceived ? 'text-rose-400 font-bold' : 'text-gray-300'}>
                          {line.quantityBilled}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          line.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : line.severity === 'WARNING'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {line.severity}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-300">
                        {line.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
              <Receipt size={16} className="text-blue-400" />
              <span>Automated Matching Engine Audit Trail</span>
            </h4>
            <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-gray-400 space-y-1">
              {matchResult.auditLog.map((log, i) => (
                <div key={i} className={log.includes('CRITICAL') || log.includes('FATAL') ? 'text-rose-400' : log.includes('WARNING') ? 'text-amber-300' : 'text-gray-300'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Virtual Card & Spend Policy View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Transaction Simulator */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <CreditCard size={18} className="text-blue-400" />
              <span>Virtual Card Authorization Simulator</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-gray-400 font-medium">Select Applied Corporate Policy</label>
                <select
                  value={selectedPolicyKey}
                  onChange={(e) => setSelectedPolicyKey(e.target.value)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-sm"
                >
                  {Object.keys(DEFAULT_CORPORATE_POLICIES).map(k => (
                    <option key={k} value={k}>{DEFAULT_CORPORATE_POLICIES[k].name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Cardholder & Department</label>
                <input
                  type="text"
                  value={authRequest.cardholderName}
                  onChange={(e) => setAuthRequest({ ...authRequest, cardholderName: e.target.value })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Merchant Name</label>
                <input
                  type="text"
                  value={authRequest.merchantName}
                  onChange={(e) => setAuthRequest({ ...authRequest, merchantName: e.target.value })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium">Amount ($ USD)</label>
                  <input
                    type="number"
                    value={authRequest.amount}
                    onChange={(e) => setAuthRequest({ ...authRequest, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium">MCC Code</label>
                  <input
                    type="text"
                    value={authRequest.mcc}
                    onChange={(e) => setAuthRequest({ ...authRequest, mcc: e.target.value })}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Current Month Spend ($ USD)</label>
                <input
                  type="number"
                  value={authRequest.currentMonthSpend}
                  onChange={(e) => setAuthRequest({ ...authRequest, currentMonthSpend: parseFloat(e.target.value) || 0 })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Evaluation & Policy Enforcement */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Decision Card */}
            <div className={`p-6 rounded-xl border ${
              authEvaluation.decision === 'APPROVED'
                ? 'bg-emerald-950/30 border-emerald-500/30'
                : authEvaluation.decision === 'REQUIRES_APPROVAL'
                ? 'bg-blue-950/30 border-blue-500/30'
                : 'bg-rose-950/30 border-rose-500/30'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {authEvaluation.decision === 'APPROVED' && <CheckCircle2 size={28} className="text-emerald-400" />}
                  {authEvaluation.decision === 'REQUIRES_APPROVAL' && <UserCheck size={28} className="text-blue-400" />}
                  {authEvaluation.decision === 'DECLINED' && <ShieldAlert size={28} className="text-rose-400" />}
                  <div>
                    <h4 className="text-lg font-bold text-white">Decision: {authEvaluation.decision}</h4>
                    <p className="text-xs text-gray-400">Enforced by Liquid Spend Policy Controller</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">SOD Approval Tier</span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gray-800 text-blue-400 border border-gray-700">
                    {authEvaluation.requiredApprovalTier}
                  </span>
                </div>
              </div>

              {/* Reasons */}
              <div className="space-y-2 mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rule Evaluation Insights:</span>
                <ul className="space-y-1">
                  {authEvaluation.reasons.map((r, i) => (
                    <li key={i} className="text-sm flex items-center space-x-2 text-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {authEvaluation.receiptRequired && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center space-x-2 text-xs text-amber-300">
                  <Receipt size={16} />
                  <span>IRS Substantiation Mandatory: Receipt upload required within 48 hours for transactions ≥ ${DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].requireReceiptThreshold}.</span>
                </div>
              )}
            </div>

            {/* Policy Parameters Spec */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center space-x-2">
                <Lock size={16} className="text-blue-400" />
                <span>Active Policy Parameters: {DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].name}</span>
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <div className="text-xs text-gray-400">Single Tx Limit</div>
                  <div className="text-lg font-mono font-bold text-white">
                    ${DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].singleTransactionLimit.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <div className="text-xs text-gray-400">Monthly Limit</div>
                  <div className="text-lg font-mono font-bold text-white">
                    ${DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].monthlyLimit.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <div className="text-xs text-gray-400">Receipt Threshold</div>
                  <div className="text-lg font-mono font-bold text-white">
                    ${DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].requireReceiptThreshold.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <div className="text-xs text-gray-400">Allowed MCCs</div>
                  <div className="text-xs font-mono font-bold text-blue-400 mt-1">
                    {DEFAULT_CORPORATE_POLICIES[selectedPolicyKey].allowedMCCs.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
