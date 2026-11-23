"use client";

import React, { useState, useMemo } from 'react';
import { 
  FolderLock, 
  Send, 
  ShieldCheck, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Key, 
  Clock, 
  AlertCircle, 
  Lock, 
  Share2, 
  Eye, 
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { VdrEngine, VdrDossierPackage, VdrShareLink } from '@/lib/investor/vdrEngine';
import { InvestorUpdateEngine, InvestorUpdateMetrics, FormattedInvestorLetter } from '@/lib/investor/investorUpdateEngine';

export default function VdrInvestorPortalView() {
  const [activeTab, setActiveTab] = useState<'investorUpdate' | 'vdrVault' | 'shareLinks'>('investorUpdate');

  // --- Investor Update State ---
  const [metrics, setMetrics] = useState<InvestorUpdateMetrics>(InvestorUpdateEngine.DEFAULT_METRICS);
  const [copied, setCopied] = useState(false);

  const formattedLetter: FormattedInvestorLetter = useMemo(() => {
    return InvestorUpdateEngine.generateLetter(metrics);
  }, [metrics]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedLetter.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([formattedLetter.markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquid_investor_update_${metrics.reportingPeriod.toLowerCase().replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- VDR Due Diligence Vault State ---
  const [dossier] = useState<VdrDossierPackage>(() => {
    return VdrEngine.generateDossier('Liquid Technologies Inc.');
  });

  // --- Share Links & Watermarking State ---
  const [shareLinks, setShareLinks] = useState<VdrShareLink[]>([
    {
      tokenId: 'vdr_a8f9b2c1_m89k',
      investorName: 'Michael Chen',
      investorFirm: 'Apex Horizon Capital',
      investorEmail: 'mchen@apexhorizon.com',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      isRevoked: false,
      watermarkText: 'CONFIDENTIAL // PREPARED FOR MICHAEL CHEN (APEX HORIZON CAPITAL)',
      accessCount: 4
    },
    {
      tokenId: 'vdr_3d7e10a4_p20x',
      investorName: 'Elena Rostova',
      investorFirm: 'Sequoia Growth Partners',
      investorEmail: 'elena@sequoia.com',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
      isRevoked: false,
      watermarkText: 'CONFIDENTIAL // PREPARED FOR ELENA ROSTOVA (SEQUOIA GROWTH)',
      accessCount: 12
    }
  ]);

  const [newInvestorName, setNewInvestorName] = useState('');
  const [newInvestorFirm, setNewInvestorFirm] = useState('');
  const [newInvestorEmail, setNewInvestorEmail] = useState('');
  const [expiryDays, setExpiryDays] = useState(14);

  const handleCreateShareLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvestorName || !newInvestorFirm) return;

    const link = VdrEngine.createShareLink(newInvestorName, newInvestorFirm, newInvestorEmail, expiryDays);
    setShareLinks([link, ...shareLinks]);
    setNewInvestorName('');
    setNewInvestorFirm('');
    setNewInvestorEmail('');
  };

  const handleRevokeLink = (tokenId: string) => {
    setShareLinks(shareLinks.map(l => l.tokenId === tokenId ? { ...l, isRevoked: true } : l));
  };

  return (
    <div className="p-8 space-y-8 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Investor Portal & Virtual Data Room</h1>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SOC 2 Sealed VDR
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Executive investor letter automation, due diligence dossier aggregation, and cryptographically watermarked access links.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('investorUpdate')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'investorUpdate' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Send size={16} />
            <span>Investor Updates</span>
          </button>
          <button
            onClick={() => setActiveTab('vdrVault')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'vdrVault' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderLock size={16} />
            <span>Data Room (VDR)</span>
          </button>
          <button
            onClick={() => setActiveTab('shareLinks')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'shareLinks' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Share2 size={16} />
            <span>Access & Watermarking</span>
          </button>
        </div>
      </div>

      {activeTab === 'investorUpdate' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(formattedLetter.keyMetricsGrid).slice(0, 5).map(([label, val], idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{label}</span>
                <div className="text-xl font-mono font-bold text-white mt-1">{val}</div>
              </div>
            ))}
          </div>

          {/* Letter Preview & Controls */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-semibold text-white flex items-center space-x-2">
                  <FileText size={18} className="text-blue-400" />
                  <span>Executive Letter: {formattedLetter.subject}</span>
                </h3>
                <span className="text-xs text-gray-400">Reconciled via Liquid Triple-Entry Immutable Ledger</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-medium border border-gray-700 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Download size={14} />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-black/40 font-mono text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto border-t border-gray-800">
              {formattedLetter.markdownContent}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vdrVault' && (
        <div className="space-y-6">
          {/* Dossier Header Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3">
                <ShieldCheck size={24} className="text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Institutional Due Diligence Dossier</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Company: <strong className="text-gray-200">{dossier.companyName}</strong> | Vault ID: {dossier.dossierId}
              </p>
              <div className="flex items-center space-x-2 mt-3 text-xs font-mono">
                <span className="text-gray-400">Merkle Root:</span>
                <span className="text-blue-300 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20 truncate max-w-sm">
                  {dossier.dossierMerkleRoot}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Documents</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {dossier.totalDocumentsCount}
                </div>
              </div>

              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `liquid_vdr_dossier_${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <Download size={16} />
                <span>Export VDR Archive</span>
              </button>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <FolderLock size={18} className="text-blue-400" />
                <span>Audited Due Diligence Artifacts</span>
              </h3>
              <span className="text-xs text-gray-400">{dossier.documents.length} Encrypted Documents</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Doc Code & Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Source Engine</th>
                    <th className="p-3 text-center">Classification</th>
                    <th className="p-3 text-right">Integrity Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {dossier.documents.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="p-3">
                        <div className="font-semibold text-white">{doc.title}</div>
                        <div className="text-xs text-gray-400">{doc.contentSummary}</div>
                      </td>
                      <td className="p-3 text-xs font-mono text-gray-300">
                        {doc.category}
                      </td>
                      <td className="p-3 text-xs font-mono text-blue-400">
                        {doc.sourceModule}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          doc.classification === 'STRICTLY_CONFIDENTIAL'
                            ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                            : doc.classification === 'CONFIDENTIAL'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        }`}>
                          {doc.classification}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono text-xs text-gray-400 truncate max-w-xs">
                        {doc.sha256Hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shareLinks' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Link Drawer */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Key size={18} className="text-blue-400" />
              <span>Issue Watermarked VDR Token</span>
            </h3>

            <form onSubmit={handleCreateShareLink} className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-gray-400 font-medium">Investor / Partner Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marc Andreessen"
                  value={newInvestorName}
                  onChange={(e) => setNewInvestorName(e.target.value)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Venture Firm / Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. a16z"
                  value={newInvestorFirm}
                  onChange={(e) => setNewInvestorFirm(e.target.value)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Investor Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. partner@firm.com"
                  value={newInvestorEmail}
                  onChange={(e) => setNewInvestorEmail(e.target.value)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Token Expiration (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(parseInt(e.target.value) || 14)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 size={14} />
                <span>Generate Secure VDR Link</span>
              </button>
            </form>

            {/* Dynamic Watermark Preview */}
            <div className="pt-4 border-t border-gray-800">
              <span className="text-[11px] font-semibold uppercase text-gray-400 block mb-2">Forensic Watermark Preview</span>
              <div className="p-3 bg-black/40 rounded border border-gray-800 font-mono text-[10px] text-amber-300/80 leading-relaxed break-all">
                CONFIDENTIAL // PREPARED FOR {newInvestorName ? newInvestorName.toUpperCase() : '[NAME]'} ({newInvestorFirm ? newInvestorFirm.toUpperCase() : '[FIRM]'}) // {new Date().toISOString().split('T')[0]}
              </div>
            </div>
          </div>

          {/* Active Links Table */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Share2 size={18} className="text-blue-400" />
                <span>Active & Expired Due Diligence Tokens</span>
              </h3>
              <span className="text-xs text-gray-400">{shareLinks.length} Managed Links</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Investor & Firm</th>
                    <th className="p-3">Token ID</th>
                    <th className="p-3">Expires At</th>
                    <th className="p-3 text-center">Views</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {shareLinks.map((link, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="p-3">
                        <div className="font-semibold text-white">{link.investorName}</div>
                        <div className="text-xs text-gray-400">{link.investorFirm} ({link.investorEmail})</div>
                      </td>
                      <td className="p-3 font-mono text-xs text-blue-400">
                        {link.tokenId}
                      </td>
                      <td className="p-3 font-mono text-xs text-gray-400">
                        {new Date(link.expiresAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-center font-mono text-xs text-white">
                        {link.accessCount}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          link.isRevoked
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {link.isRevoked ? 'REVOKED' : 'ACTIVE'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {!link.isRevoked && (
                          <button
                            onClick={() => handleRevokeLink(link.tokenId)}
                            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
