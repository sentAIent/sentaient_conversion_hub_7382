import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Users, Upload, RefreshCw, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { VerificationShield } from '../components/VerificationShield';
import { CopilotToggle } from '../components/CopilotToggle';
import { MilestoneReview } from '../components/MilestoneReview';

export const MultiAgentReviewView: React.FC = () => {
    const [contractText, setContractText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [generationId, setGenerationId] = useState<string | null>(null);
    const [evaluatorData, setEvaluatorData] = useState<any>(null);
    const [requiresAdditionalResearch, setRequiresAdditionalResearch] = useState(false);
    const [isCopilot, setIsCopilot] = useState(false);
    const [milestone, setMilestone] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReview = async () => {
        if (!contractText.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setGenerationId(null);
        setEvaluatorData(null);
        setRequiresAdditionalResearch(false);
        setMilestone(null);

        // Mock Copilot milestone after 2 seconds
        if (isCopilot) {
          setTimeout(() => {
            setMilestone("The Financial Analyst has identified a high-risk revenue recognition clause. Before the Legal and IP agents proceed, would you like them to specifically address the financial impact of this clause, or continue with their standard review protocol?");
          }, 2000);
          return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/contract-team`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ contractText })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to review contract');
            }
            if (data.requires_additional_research) {
                setRequiresAdditionalResearch(true);
                setGenerationId(data.generation_id);
                return;
            }
            
            setResult(data);
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
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/contract-team`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ contractText: contractText + (feedback ? `\n\n[Copilot Feedback from User: ${feedback}]` : '') })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to review contract');
            }
            if (data.requires_additional_research) {
                setRequiresAdditionalResearch(true);
                setGenerationId(data.generation_id);
                return;
            }
            
            setResult(data);
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
                activeTab="contract-team"
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
                <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Multi-Agent Review Team</h1>
                            <p className="text-gray-500 mt-1">Financial, Legal, and IP experts review your contract simultaneously.</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        
                        <CopilotToggle isCopilot={isCopilot} setIsCopilot={setIsCopilot} />

                        {!result && !loading && !milestone && (
                            <div className="bg-white p-6 rounded-xl border shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Paste Contract Text</label>
                                <textarea 
                                    value={contractText}
                                    onChange={(e) => setContractText(e.target.value)}
                                    placeholder="Paste the full text of your contract here..."
                                    className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none font-serif"
                                />
                                <div className="mt-4 flex justify-end">
                                    <button 
                                        onClick={handleReview}
                                        disabled={!contractText.trim()}
                                        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Send to Agent Team
                                    </button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                                <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">Agents are reviewing...</h3>
                                <p className="text-gray-500 mt-2">Financial Analyst, Legal Counsel, and IP Specialist are working in parallel.</p>
                                <p className="text-sm text-indigo-600 italic mt-4">
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
                                <h3 className="text-lg font-semibold mb-2">Review Under Verification</h3>
                                <p>This project requires additional research. We will provide the analysis once thoroughly completed.</p>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="space-y-6">
                                {evaluatorData && (
                                    <VerificationShield 
                                        confidenceScore={evaluatorData.confidence_score}
                                        hallucinations={evaluatorData.hallucinations}
                                        verificationNotes={evaluatorData.verification_notes}
                                        tierThreshold={70} 
                                    />
                                )}
                                <div className="bg-white p-8 rounded-xl border shadow-sm prose prose-indigo max-w-none">
                                    <div className="flex items-center gap-2 mb-6 text-indigo-600 border-b pb-4">
                                        <CheckCircle2 className="w-6 h-6" />
                                        <h2 className="m-0 text-2xl font-bold">Synthesized Executive Report</h2>
                                    </div>
                                    <ReactMarkdown>{result.report}</ReactMarkdown>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 pt-4">Raw Agent Transcripts</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-xl border shadow-sm h-96 overflow-y-auto">
                                        <h4 className="font-bold text-green-700 mb-4 sticky top-0 bg-white pb-2 border-b">💰 Financial Analyst</h4>
                                        <div className="prose prose-sm"><ReactMarkdown>{result.raw_reports.financial}</ReactMarkdown></div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border shadow-sm h-96 overflow-y-auto">
                                        <h4 className="font-bold text-red-700 mb-4 sticky top-0 bg-white pb-2 border-b">⚖️ Lead Legal Counsel</h4>
                                        <div className="prose prose-sm"><ReactMarkdown>{result.raw_reports.legal}</ReactMarkdown></div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border shadow-sm h-96 overflow-y-auto">
                                        <h4 className="font-bold text-purple-700 mb-4 sticky top-0 bg-white pb-2 border-b">💡 IP Specialist</h4>
                                        <div className="prose prose-sm"><ReactMarkdown>{result.raw_reports.ip}</ReactMarkdown></div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-center mt-8">
                                    <button 
                                        onClick={() => setResult(null)}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Review Another Contract
                                    </button>
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
