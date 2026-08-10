import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Search, Loader2, FileText, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { VerificationShield } from '../components/VerificationShield';
import { CopilotToggle } from '../components/CopilotToggle';
import { MilestoneReview } from '../components/MilestoneReview';

export const DeepResearchView: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [evaluatorData, setEvaluatorData] = useState<any>(null);
  const [requiresAdditionalResearch, setRequiresAdditionalResearch] = useState(false);
  const [isCopilot, setIsCopilot] = useState(false);
  const [milestone, setMilestone] = useState<string | null>(null);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setSources([]);
    setGenerationId(null);
    setEvaluatorData(null);
    setRequiresAdditionalResearch(false);
    setMilestone(null);

    // Mock Copilot milestone after 2 seconds
    if (isCopilot) {
      setTimeout(() => {
        setMilestone("I have identified 12 relevant case law documents regarding force majeure and commercial leases. I am preparing to synthesize these into the final report. Should I proceed, or would you like me to focus on a specific jurisdiction (e.g., California)?");
      }, 2000);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/deep-research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.requires_additional_research) {
        setRequiresAdditionalResearch(true);
        setGenerationId(data.generation_id);
        return;
      }

      setReport(data.report);
      setSources(data.sources || []);
      if (data.generation_id) {
          setGenerationId(data.generation_id);
      }
      if (data.evaluator) {
          setEvaluatorData(data.evaluator);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during research.');
    } finally {
      setLoading(false);
    }
  };

  const handleMilestoneApprove = async (feedback?: string) => {
    setMilestone(null);
    setLoading(true);
    
    // Resume execution with feedback
    try {
      const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/deep-research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
        },
        body: JSON.stringify({ topic: topic + (feedback ? ` (Feedback: ${feedback})` : ''), tier: 'standard' }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (data.requires_additional_research) {
        setRequiresAdditionalResearch(true);
        setGenerationId(data.generation_id);
        return;
      }

      setReport(data.report);
      setSources(data.sources || []);
      if (data.generation_id) setGenerationId(data.generation_id);
      if (data.evaluator) setEvaluatorData(data.evaluator);
    } catch (err: any) {
      setError(err.message || 'An error occurred resuming research.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab="research"
        setActiveTab={() => {}}
        analysisComplete={false}
        score={0}
        currentTheme={THEMES.light}
        analysisDepth="quick"
        setAnalysisDepth={() => {}}
        onAnalyze={() => {}}
        isRoastMode={false}
        
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Deep Research</h1>
              <p className="text-gray-500 mt-1">Autonomous web research and legal due diligence synthesis</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            
            <CopilotToggle isCopilot={isCopilot} setIsCopilot={setIsCopilot} />

            {/* Search Input */}
            <form onSubmit={handleResearch} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <label htmlFor="research-topic" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to research?
              </label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="research-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Recent case law regarding force majeure clauses in commercial leases"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Researching
                    </>
                  ) : (
                    'Start Research'
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                <div className="mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Research Failed</h3>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-4 py-12">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900">Conducting Deep Research...</h3>
                <p className="text-gray-500 text-center max-w-md">
                  The agent is currently breaking down your query, searching the web, analyzing sources, and synthesizing a comprehensive legal report. This may take a minute.
                </p>
                <p className="text-sm text-blue-600 italic mt-4">
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
                <h3 className="text-lg font-semibold mb-2">Analysis Under Review</h3>
                <p>This project requires additional research. We will provide the analysis once thoroughly completed.</p>
              </div>
            )}

            {/* Results */}
            {report && !loading && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {evaluatorData && (
                  <VerificationShield 
                    confidenceScore={evaluatorData.confidence_score}
                    hallucinations={evaluatorData.hallucinations}
                    verificationNotes={evaluatorData.verification_notes}
                    tierThreshold={70} 
                  />
                )}
                {/* Sources Card */}
                {sources.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Analyzed Sources ({sources.length})
                    </h3>
                    <ul className="space-y-2">
                      {sources.map((url, i) => (
                        <li key={i} className="text-sm">
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Markdown Report */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm prose prose-blue max-w-none">
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
