import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { ShieldAlert, Search, RefreshCw, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { VerificationShield } from '../components/VerificationShield';
import { CopilotToggle } from '../components/CopilotToggle';
import { MilestoneReview } from '../components/MilestoneReview';

export const DueDiligenceView: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);
    const [generationId, setGenerationId] = useState<string | null>(null);
    const [evaluatorData, setEvaluatorData] = useState<any>(null);
    const [requiresAdditionalResearch, setRequiresAdditionalResearch] = useState(false);
    const [isCopilot, setIsCopilot] = useState(false);
    const [milestone, setMilestone] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!companyName.trim()) return;

        setLoading(true);
        setError(null);
        setReport(null);
        setGenerationId(null);
        setEvaluatorData(null);
        setRequiresAdditionalResearch(false);
        setMilestone(null);

        // Mock Copilot milestone after 2 seconds
        if (isCopilot) {
          setTimeout(() => {
            setMilestone("I have gathered preliminary SEC filings and 3 recent court cases regarding " + companyName + ". The financials look solid, but there is pending litigation regarding environmental compliance. Would you like me to dig deeper into the litigation, or proceed with the standard risk assessment?");
          }, 2000);
          return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/due-diligence`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ companyName })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to generate report');
            }
            if (data.requires_additional_research) {
                setRequiresAdditionalResearch(true);
                setGenerationId(data.generation_id);
                return;
            }
            
            setReport(data.report);
            if (data.generation_id) {
                setGenerationId(data.generation_id);
            }
            if (data.evaluator) {
                setEvaluatorData(data.evaluator);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMilestoneApprove = async (feedback?: string) => {
        setMilestone(null);
        setLoading(true);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/due-diligence`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ companyName: companyName + (feedback ? ` (Feedback: ${feedback})` : ''), tier: 'standard' })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to generate report');
            }
            if (data.requires_additional_research) {
                setRequiresAdditionalResearch(true);
                setGenerationId(data.generation_id);
                return;
            }
            
            setReport(data.report);
            if (data.generation_id) setGenerationId(data.generation_id);
            if (data.evaluator) setEvaluatorData(data.evaluator);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar 
                activeTab="due-diligence"
                setActiveTab={() => {}}
                analysisComplete={false}
                score={0}
                currentTheme={THEMES.light}
                analysisDepth="quick"
                setAnalysisDepth={() => {}}
                onAnalyze={() => {}}
                isRoastMode={false}
                onOpenSettings={() => {}}
            />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <ShieldAlert className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Counterparty Due Diligence</h1>
                            <p className="text-gray-500 mt-1">Cross-examine public records, litigation, and fraud reports.</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        
                        <CopilotToggle isCopilot={isCopilot} setIsCopilot={setIsCopilot} />

                        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl border shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target Company Name</label>
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="e.g. Enron, Theranos, Acme Corp"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                        disabled={loading}
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loading || !companyName.trim()}
                                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                                    Run Investigation
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                                <RefreshCw className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Investigating {companyName}...</h3>
                                <p className="text-gray-500 mt-2">Searching court records, news, and financial history.</p>
                                <p className="text-sm text-red-600 italic mt-4">
                                    Note: Your results will be passed through a strict Quality Assurance verification pass before being displayed.
                                </p>
                            </div>
                        )}

                        {/* Milestone Review State */}
                        {milestone && (
                            <MilestoneReview 
                                milestoneMessage={milestone}
                                onApprove={handleMilestoneApprove}
                            />
                        )}

                        {/* Additional Research Required State */}
                        {requiresAdditionalResearch && !loading && !milestone && (
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-8 rounded-xl shadow-sm text-center">
                                <h3 className="text-lg font-semibold mb-2">Investigation Under Review</h3>
                                <p>This project requires additional research. We will provide the analysis once thoroughly completed.</p>
                            </div>
                        )}

                        {report && !loading && (
                            <div className="space-y-6">
                                {evaluatorData && (
                                    <VerificationShield 
                                        confidenceScore={evaluatorData.confidence_score}
                                        hallucinations={evaluatorData.hallucinations}
                                        verificationNotes={evaluatorData.verification_notes}
                                        tierThreshold={70} 
                                    />
                                )}
                                <div className="bg-white p-8 rounded-xl border shadow-sm prose prose-red max-w-none">
                                    <div className="flex items-center gap-2 mb-6 text-red-600 border-b pb-4">
                                        <FileText className="w-6 h-6" />
                                        <h2 className="m-0 text-2xl font-bold">Investigation Report: {companyName}</h2>
                                    </div>
                                    <ReactMarkdown>{report}</ReactMarkdown>
                                </div>
                                {generationId && (
                                    <FeedbackWidget generationId={generationId} />
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};
