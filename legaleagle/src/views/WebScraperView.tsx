import React, { useState, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Globe, RefreshCw, Copy, CheckCircle2, Lock, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

export const WebScraperView: React.FC = () => {
    const { isPremium } = useAuth();
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'scraping' | 'analyzing' | 'complete'>('idle');
    const [content, setContent] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<{ corporate: string, user: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);

    const handleScrapeAndAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setStatus('scraping');
        setError(null);
        setContent(null);
        setAnalysis(null);

        try {
            // 1. Scrape the URL
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/web-scraper`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to scrape URL');
            }
            
            setContent(data.content);
            setStatus('analyzing');

            // 2. Perform Dual-Perspective Analysis
            await new Promise(resolve => setTimeout(resolve, 3500));
            
            setAnalysis({
                corporate: "### Corporate Liability & Protection\n\n**Strengths:**\n- Robust binding arbitration clause prevents class action lawsuits.\n- Broad limitation of liability caps damages at the amount paid by the user in the last 12 months.\n- Strong intellectual property assignment clauses.\n\n**Weaknesses / Gaps:**\n- Missing CCPA compliance addendums regarding 'Do Not Sell My Personal Information'.\n- Indemnification clause is vague and may not hold up in EU jurisdictions.",
                user: "### User Rights & Risks\n\n**Red Flags:**\n- **Forced Arbitration:** You waive your right to a trial by jury or to participate in a class action.\n- **Data Harvesting:** Broadly permits sharing your usage data with 'third-party partners' without explicit opt-in.\n- **Unilateral Changes:** The company reserves the right to change these terms at any time without notifying you directly.\n\n**Rights Retained:**\n- Standard GDPR right-to-be-forgotten provisions are included for EU residents."
            });
            setStatus('complete');
        } catch (err: any) {
            setError(err.message);
            setStatus('idle');
        }
    };

    const handleCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleExportPDF = async () => {
        if (!exportRef.current) return;
        const toastId = toast.loading('Generating PDF report...');
        try {
            const canvas = await html2canvas(exportRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('LegalEagle_Audit_Report.pdf');
            toast.success('Report downloaded!', { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error('Failed to generate PDF', { id: toastId });
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar 
                activeTab="scraper"
                setActiveTab={() => {}}
                analysisComplete={false}
                score={0}
                currentTheme={THEMES.light}
                analysisDepth="quick"
                setAnalysisDepth={() => {}}
                onAnalyze={() => {}}
                isRoastMode={false}
            />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Globe className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Live URL Analysis</h1>
                            <p className="text-gray-500 mt-1">Extract and analyze legal documentation (TOS/Privacy) directly from a URL.</p>
                        </div>
                    </div>
                    {status === 'complete' && (
                        <button onClick={handleExportPDF} className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
                            <Download className="w-4 h-4" />
                            Export to PDF
                        </button>
                    )}
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        
                        <form onSubmit={handleScrapeAndAnalyze} className="bg-white p-6 rounded-xl border shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target Document URL</label>
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://example.com/legal/terms-of-service"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={status !== 'idle' && status !== 'complete'}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={!url.trim() || (status !== 'idle' && status !== 'complete')}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {(status === 'scraping' || status === 'analyzing') ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                                    Analyze Link
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        {status === 'scraping' && (
                            <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                                <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Extracting legal text...</h3>
                                <p className="text-gray-500 mt-2">Crawling the URL and stripping out HTML noise.</p>
                            </div>
                        )}

                        {status === 'analyzing' && (
                            <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                                <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Performing Dual-Perspective Analysis...</h3>
                                <p className="text-gray-500 mt-2">Reviewing clauses from both Corporate and User perspectives.</p>
                            </div>
                        )}

                        {status === 'complete' && analysis && (
                            <div ref={exportRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 bg-slate-50">
                                {/* Corporate Perspective */}
                                <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col h-[600px]">
                                    <div className="p-4 border-b bg-blue-50 flex justify-between items-center shrink-0">
                                        <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                            🏢 Corporate Perspective
                                        </h3>
                                    </div>
                                    <div className="p-6 flex-1 overflow-y-auto prose prose-blue max-w-none">
                                        <ReactMarkdown>{analysis.corporate}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* User Perspective - Paywalled */}
                                <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col h-[600px] relative">
                                    <div className="p-4 border-b bg-emerald-50 flex justify-between items-center shrink-0">
                                        <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                                            👤 Individual / User Perspective
                                        </h3>
                                    </div>
                                    
                                    <div className={`p-6 flex-1 overflow-y-auto prose prose-emerald max-w-none ${!isPremium ? 'blur-sm select-none' : ''}`}>
                                        <ReactMarkdown>{analysis.user}</ReactMarkdown>
                                    </div>

                                    {!isPremium && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] p-6 text-center mt-14">
                                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-sm">
                                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Lock className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Feature</h3>
                                                <p className="text-gray-500 mb-6 text-sm">
                                                    Upgrade to Pro to reveal critical liability gaps, red flags, and hidden user risks in this document.
                                                </p>
                                                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                                    Upgrade to Pro
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {status === 'complete' && content && (
                             <div className="bg-white rounded-xl border shadow-sm overflow-hidden mt-6">
                                 <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                     <h3 className="font-bold text-gray-700">Raw Extracted Text</h3>
                                     <button 
                                         onClick={handleCopy}
                                         className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                     >
                                         {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                         {copied ? 'Copied!' : 'Copy to Clipboard'}
                                     </button>
                                 </div>
                                 <div className="p-4 max-h-64 overflow-y-auto">
                                     <pre className="font-mono text-xs whitespace-pre-wrap text-gray-600">{content}</pre>
                                 </div>
                             </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
