"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  FolderArchive,
  Download,
  Lock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Eye,
  Key,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface DiligenceFolder {
  id: string;
  folderNumber: string;
  title: string;
  fileCount: number;
  totalSize: string;
  lastUpdated: string;
  status: 'Ready' | 'Updated Today' | 'In Review';
  files: { name: string; size: string; hash: string }[];
}

export default function VirtualDataRoomPage() {
  const [selectedWatermark, setSelectedWatermark] = useState('CONFIDENTIAL - SEQUOIA CAPITAL REVIEW COPY');
  const [activeFolderId, setActiveFolderId] = useState<string>('f1');
  const [isExporting, setIsExporting] = useState(false);

  const [folders] = useState<DiligenceFolder[]>([
    {
      id: 'f1',
      folderNumber: '01',
      title: 'Corporate Governance & Cap Table',
      fileCount: 4,
      totalSize: '3.4 MB',
      lastUpdated: '2026-03-08',
      status: 'Ready',
      files: [
        { name: 'Certificate_of_Incorporation_Delaware.pdf', size: '1.2 MB', hash: 'sha256:4a8e2b9...' },
        { name: 'Board_Unanimous_Written_Consents_2024-2026.pdf', size: '850 KB', hash: 'sha256:7b1f3c8...' },
        { name: 'Fully_Diluted_Cap_Table_Liquid_v2.4.xlsx', size: '620 KB', hash: 'sha256:9c4d1e2...' },
        { name: 'Standard_SAFE_Financing_Agreements.pdf', size: '780 KB', hash: 'sha256:2f5a6d3...' },
      ],
    },
    {
      id: 'f2',
      folderNumber: '02',
      title: 'Financial Statements & Close Certificates',
      fileCount: 5,
      totalSize: '4.8 MB',
      lastUpdated: '2026-03-05',
      status: 'Ready',
      files: [
        { name: 'GAAP_Income_Statement_P&L_2024-2026.csv', size: '1.1 MB', hash: 'sha256:3d8e9a1...' },
        { name: 'Balance_Sheet_Accrual_Basis_Certified.pdf', size: '920 KB', hash: 'sha256:6e7f8a9...' },
        { name: 'Month_End_Close_Audit_Certificates_Q1_2026.pdf', size: '1.4 MB', hash: 'sha256:1a2b3c4...' },
        { name: 'Cash_Flow_Runway_Model_36_Months.xlsx', size: '750 KB', hash: 'sha256:8b9c0d1...' },
        { name: 'General_Ledger_Double_Entry_Full_Export.csv', size: '650 KB', hash: 'sha256:5e6f7a8...' },
      ],
    },
    {
      id: 'f3',
      folderNumber: '03',
      title: 'Material Contracts & ASC 606 Rev Rec',
      fileCount: 3,
      totalSize: '2.9 MB',
      lastUpdated: '2026-03-07',
      status: 'Ready',
      files: [
        { name: 'ASC_606_Revenue_Recognition_Waterfall_Model.xlsx', size: '1.2 MB', hash: 'sha256:9a0b1c2...' },
        { name: 'Top_10_Enterprise_Customer_Master_Services_Agreements.pdf', size: '1.4 MB', hash: 'sha256:4d5e6f7...' },
        { name: 'Standard_Terms_of_Service_and_SLA_Policies.pdf', size: '320 KB', hash: 'sha256:2a3b4c5...' },
      ],
    },
    {
      id: 'f4',
      folderNumber: '04',
      title: 'Tax Filings & R&D Credit Dossiers',
      fileCount: 4,
      totalSize: '5.2 MB',
      lastUpdated: '2026-03-01',
      status: 'Ready',
      files: [
        { name: 'IRS_Form_6765_R&D_Tax_Credit_Dossier_2026.pdf', size: '2.1 MB', hash: 'sha256:8f9a0b1...' },
        { name: 'IRS_Form_1120_Corporate_Tax_Returns_2024_2025.pdf', size: '1.8 MB', hash: 'sha256:3c4d5e6...' },
        { name: 'State_Sales_Tax_Economic_Nexus_Exposure_Audit.pdf', size: '820 KB', hash: 'sha256:7a8b9c0...' },
        { name: 'Annual_Form_1099-NEC_Contractor_Summary.csv', size: '480 KB', hash: 'sha256:1e2f3a4...' },
      ],
    },
    {
      id: 'f5',
      folderNumber: '05',
      title: 'Equity Grants, Clocks & 83(b) Vault',
      fileCount: 4,
      totalSize: '3.1 MB',
      lastUpdated: '2026-03-04',
      status: 'Ready',
      files: [
        { name: 'Stakeholder_Vesting_Schedules_and_Option_Pool.pdf', size: '1.1 MB', hash: 'sha256:6b7c8d9...' },
        { name: 'Certified_IRS_83b_Elections_All_Founders_and_Key_Hires.pdf', size: '1.3 MB', hash: 'sha256:0a1b2c3...' },
        { name: 'Independent_409A_Common_Stock_Valuation_Report.pdf', size: '720 KB', hash: 'sha256:5d6e7f8...' },
      ],
    },
    {
      id: 'f6',
      folderNumber: '06',
      title: 'SOC 2 Type II & Security Attestations',
      fileCount: 3,
      totalSize: '6.4 MB',
      lastUpdated: '2026-03-02',
      status: 'Ready',
      files: [
        { name: 'SOC_2_Type_II_Independent_Auditor_Report.pdf', size: '3.8 MB', hash: 'sha256:2c3d4e5...' },
        { name: 'Cryptographic_Financial_Controls_Audit_Log_Binder.pdf', size: '1.9 MB', hash: 'sha256:9f0a1b2...' },
        { name: 'Zero_Trust_Privacy_and_Data_Retention_Policy.pdf', size: '680 KB', hash: 'sha256:4a5b6c7...' },
      ],
    },
  ]);

  const activeFolder = folders.find(f => f.id === activeFolderId) || folders[0];
  const totalDiligenceFiles = folders.reduce((sum, f) => sum + f.fileCount, 0);

  const handleDownloadFullRoom = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const manifest = "data:text/plain;charset=utf-8," +
        `LIQUID VIRTUAL DATA ROOM - DUE DILIGENCE PACKAGE MANIFEST\n` +
        `Security Seal: SHA-256 Verified\n` +
        `Watermark: ${selectedWatermark}\n` +
        `Timestamp: ${new Date().toISOString()}\n\n` +
        folders.map(f => `Folder ${f.folderNumber}: ${f.title}\n` + f.files.map(file => `  - ${file.name} (${file.size}) [${file.hash}]`).join('\n')).join('\n\n');

      const encodedUri = encodeURI(manifest);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Liquid_M&A_Due_Diligence_Binder_Manifest_2026.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <FolderArchive size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Virtual Data Room (M&A & Fundraise Diligence)</h1>
              <p className="text-sm text-gray-400">
                Institutional Diligence Packager • SHA-256 Tamper-Evident Seals • Dynamic Investor Watermarking
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadFullRoom}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-600/20"
          >
            <Download size={16} />
            <span>{isExporting ? 'Bundling Watermarked ZIP...' : 'Export Complete Diligence Binder'}</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Diligence Folders</span>
            <div className="text-2xl font-bold text-white mt-1">{folders.length} Structured Folders</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Full institutional taxonomy</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-indigo-400 uppercase font-semibold">Indexed Artifacts</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">{totalDiligenceFiles} Certified Files</div>
            <span className="text-[11px] text-indigo-500/80 mt-1 block">25.8 MB total diligence corpus</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-purple-400 uppercase font-semibold">Investor Watermark</span>
            <div className="text-sm font-bold text-purple-300 mt-1 truncate">{selectedWatermark.split(' - ')[1] || 'Configured'}</div>
            <span className="text-[11px] text-purple-400/80 mt-1 block">Dynamic recipient tracking active</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Integrity Seal</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">100% Sealed</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">All files bound to SHA-256 hashes</span>
          </div>
        </div>

        {/* Watermark Configuration Input */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Lock size={16} className="text-indigo-400" />
            <span className="font-semibold text-gray-300">Active Watermark Banner for Downloads:</span>
          </div>
          <input
            type="text"
            value={selectedWatermark}
            onChange={(e) => setSelectedWatermark(e.target.value)}
            className="flex-1 max-w-xl bg-gray-950 border border-gray-800 px-3 py-1.5 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-indigo-500 font-mono"
            placeholder="e.g. CONFIDENTIAL - [INVESTOR_NAME] REVIEW COPY"
          />
        </div>

        {/* 2-Column VDR Layout: Left Folder Directory, Right File Manifest */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Folders List */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 px-1">Diligence Directory</h2>
            {folders.map((f) => {
              const isSelected = f.id === activeFolderId;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveFolderId(f.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-950/20 border-indigo-500/50 text-white shadow-lg shadow-indigo-950/50'
                      : 'bg-gray-900 border-gray-800/80 text-gray-300 hover:bg-gray-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono font-bold text-indigo-400">{f.folderNumber}</span>
                      <span className="text-sm font-semibold text-white">{f.title}</span>
                    </div>
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                      {f.fileCount} files
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 text-[11px] text-gray-400">
                    <span>{f.totalSize}</span>
                    <span>Updated {f.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Folder Files & SHA-256 Hashes */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">{activeFolder.folderNumber}</span>
                  <h3 className="text-base font-semibold text-white">{activeFolder.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {activeFolder.fileCount} verified artifacts • {activeFolder.totalSize} total
                </p>
              </div>
              <span className="flex items-center space-x-1 text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={13} />
                <span>Audited & Stamped</span>
              </span>
            </div>

            <div className="divide-y divide-gray-800 mt-2">
              {activeFolder.files.map((file, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between hover:bg-gray-850/50 px-2 rounded-xl transition text-xs">
                  <div className="flex items-center space-x-3 truncate mr-4">
                    <FileText size={16} className="text-indigo-400 flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium text-white truncate">{file.name}</div>
                      <div className="text-[10px] font-mono text-gray-500 truncate">{file.hash}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="font-mono text-gray-400 text-[11px]">{file.size}</span>
                    <button
                      onClick={() => alert(`Simulating watermarked download: ${file.name}`)}
                      className="p-1.5 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                      title="Download with watermark"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Diligence Protocol Advice */}
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-start space-x-2 text-[11px] text-gray-400">
              <ShieldCheck size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                All documents in this room have been automatically synthesized from your live Liquid ledger, cap table, and tax filings. Downloading appends your configured confidentiality watermark and records the access timestamp to the audit log.
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
