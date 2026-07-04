import React, { useMemo } from 'react';
import {
    ChevronDown,
    Mail,
    X,
    Flame,
    Share2,
    Library,
    BarChart3,
    ShieldCheck,
    Award,
    CheckCircle2
} from 'lucide-react';
import { ScoreCircle, SwotCard } from '@/components/ui';
import type { Theme, Recommendation, SwotAnalysis } from '@/types';

interface AnalysisViewProps {
    recommendations: Recommendation[];
    selectedRecId: number | null;
    setSelectedRecId: (id: number | null) => void;
    score: number;
    swotData: SwotAnalysis | null;
    isRoastMode: boolean;
    perspective: string;
    handleApplyAll: () => void;
    generateNegotiationEmail: () => void;
    showEmailModal: boolean;
    setShowEmailModal: (show: boolean) => void;
    emailDraft: string;
    setEmailDraft: (draft: string) => void;
    handleAcceptRecommendation: (rec: Recommendation) => void;
    currentTheme: Theme;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
    recommendations,
    selectedRecId,
    setSelectedRecId,
    score,
    swotData,
    isRoastMode,
    perspective,
    handleApplyAll,
    generateNegotiationEmail,
    showEmailModal,
    setShowEmailModal,
    emailDraft,
    setEmailDraft,
    handleAcceptRecommendation,
    currentTheme
}) => {
    const activeRec = recommendations.find(r => r.id === selectedRecId);
    const visibleRecommendations = recommendations.filter(r => !r.accepted);
    const isLightSidebar = ['eggshell', 'sand'].includes(currentTheme.id);

    // Aggregate citations for the "Table of Authorities"
    const uniqueCitations = useMemo(() => {
        const cites = new Set<string>();
        recommendations.forEach(r => {
            if (r.citation) cites.add(r.citation);
        });
        return Array.from(cites);
    }, [recommendations]);

    // Risk distribution calculation
    const riskDistribution = useMemo(() => {
        const dist = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        recommendations.filter(r => !r.accepted).forEach(r => {
            dist[r.severity]++;
        });
        const total = Object.values(dist).reduce((a, b) => a + b, 0);
        return { dist, total };
    }, [recommendations]);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden relative">
            {/* Excellence Badge */}
            {score >= 98 && (
                <div className="fixed top-24 right-8 z-40 animate-bounce">
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex flex-col items-center">
                        <Award className="w-6 h-6 mb-1" />
                        <span className="font-bold text-xs uppercase tracking-wide">Certified</span>
                    </div>
                </div>
            )}

            {/* Email Modal */}
            {showEmailModal && (
                <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-8">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-full">
                        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Negotiation Email
                            </h3>
                            <button onClick={() => setShowEmailModal(false)}>
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 flex-1 overflow-auto">
                            <textarea
                                className="w-full h-96 p-4 border rounded-lg font-mono text-sm bg-slate-50 focus:ring-2 ring-blue-500 outline-none resize-none"
                                value={emailDraft}
                                onChange={(e) => setEmailDraft(e.target.value)}
                            />
                        </div>
                        <div className="p-4 border-t bg-slate-50 flex justify-end gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Left Sidebar - Issues List */}
            <div className={`w-96 border-r flex flex-col h-full z-10 shadow-md shrink-0 transition-colors ${currentTheme.sidebar} min-h-0`}>
                <div className="p-6 border-b border-white/10">
                    <h2 className={`font-bold text-lg mb-4 ${isLightSidebar ? 'text-slate-800' : 'text-white'}`}>
                        {isRoastMode ? 'Roast Results 🔥' : 'Audit Results'}
                    </h2>

                    {/* Score Display */}
                    <div
                        className={`flex items-center gap-4 p-4 rounded-xl shadow-sm cursor-pointer transition-all ${isRoastMode
                            ? 'bg-slate-900 border-2 border-red-500/50 ring-2 ring-red-500/20'
                            : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                            }`}
                        onClick={() => setSelectedRecId(null)}
                    >
                        <ScoreCircle value={score} size="lg" isRoastMode={isRoastMode} theme={currentTheme} />
                        <div>
                            <p className={`text-sm font-medium uppercase tracking-wide ${isRoastMode ? 'text-red-500 opacity-100' : 'opacity-70 text-slate-300'
                                }`}>
                                {isRoastMode ? 'Survival Chance' : 'Enforceability'}
                            </p>
                            <p className={`text-2xl font-bold ${isRoastMode ? 'text-red-500' : 'text-white'}`}>
                                {score >= 98
                                    ? (isRoastMode ? 'GOD TIER' : 'Excellent')
                                    : (isRoastMode ? 'COOKED' : 'High Risk')
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Issues List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <div className={`text-xs font-bold uppercase tracking-wider ${currentTheme.sidebarText}`}>
                            Issues
                        </div>
                        {visibleRecommendations.length > 0 && (
                            <button
                                onClick={handleApplyAll}
                                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded text-white shadow-sm hover:opacity-90 transition-opacity ${isRoastMode ? 'bg-red-600' : 'bg-blue-600'
                                    }`}
                            >
                                Apply All
                            </button>
                        )}
                    </div>

                    {visibleRecommendations.length === 0 && (
                        <div className={`text-center p-4 text-sm opacity-50 ${currentTheme.sidebarText}`}>
                            No issues found.
                        </div>
                    )}

                    {visibleRecommendations.map((rec) => {
                        let selectedStyle = '';
                        if (selectedRecId === rec.id) {
                            if (isRoastMode) {
                                selectedStyle = 'bg-red-700 border-red-500 text-white shadow-xl scale-[1.02] ring-2 ring-red-500';
                            } else {
                                selectedStyle = isLightSidebar
                                    ? 'bg-blue-100 border-blue-300 text-slate-900 shadow-md ring-1 ring-blue-300'
                                    : 'bg-white/20 border-white/40 text-white shadow-md ring-1 ring-white/40';
                            }
                        } else {
                            selectedStyle = isLightSidebar
                                ? 'bg-white border-2 border-slate-300 hover:border-blue-400 text-slate-800'
                                : 'bg-white/5 border-2 border-white/10 hover:border-white/30 text-slate-300';
                        }

                        return (
                            <div
                                key={rec.id}
                                onClick={() => setSelectedRecId(rec.id)}
                                className={`p-4 rounded-lg cursor-pointer transition-all relative group ${selectedStyle}`}
                            >
                                {rec.accepted && (
                                    <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-emerald-500" />
                                )}
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${isRoastMode
                                        ? 'bg-black/30 text-white'
                                        : (rec.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white')
                                        }`}>
                                        {rec.severity}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-sm mb-1">
                                    {isRoastMode && rec.roastTitle ? rec.roastTitle : rec.title}
                                </h4>
                            </div>
                        );
                    })}
                </div>

                {/* Negotiation Email Button */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={generateNegotiationEmail}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${isRoastMode
                            ? 'bg-red-900/50 text-red-200 cursor-not-allowed border border-red-800'
                            : 'bg-white text-slate-900 hover:bg-slate-100'
                            }`}
                        disabled={isRoastMode}
                    >
                        <Mail className="w-4 h-4" />
                        {isRoastMode ? 'No Negotiation in Roast Mode' : 'Draft Negotiation Email'}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col h-full overflow-hidden ${currentTheme.main || currentTheme.appBg}`}>
                {selectedRecId && activeRec ? (
                    /* Issue Detail View */
                    <div className={`flex-1 overflow-y-auto p-8 ${currentTheme.main || currentTheme.appBg}`}>
                        <div className="max-w-4xl mx-auto">
                            <div
                                className="mb-4 flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 cursor-pointer"
                                onClick={() => setSelectedRecId(null)}
                            >
                                <ChevronDown className="w-4 h-4 rotate-90" /> Back to Summary
                            </div>

                            {/* Issue Header */}
                            <div className={`p-6 rounded-xl shadow-sm border mb-6 ${currentTheme.card || currentTheme.panelBg}`}>
                                <h1 className={`text-2xl font-bold mb-2 ${currentTheme.detailHeader}`}>
                                    {isRoastMode && activeRec.roastTitle ? activeRec.roastTitle : activeRec.title}
                                </h1>
                                {activeRec.citation && (
                                    <div className={`text-xs font-mono mt-2 flex items-center gap-1 ${currentTheme.citation}`}>
                                        <Library className="w-3 h-3" /> {activeRec.citation}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 gap-6 mb-8">
                                {isRoastMode ? (
                                    /* Roast Mode Card */
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Original Clause Card */}
                                        <div className={`border rounded-xl p-6 relative overflow-hidden ${currentTheme.roastBg} ${currentTheme.roastBorder}`}>
                                            <h3 className="font-bold mb-4 uppercase tracking-wide text-xs opacity-70 text-white">
                                                Original Clause
                                            </h3>
                                            <p className="text-lg font-serif text-white">
                                                "{activeRec.currentText}"
                                            </p>
                                        </div>

                                        {/* The Roast Card */}
                                        <div className={`border rounded-xl p-6 relative overflow-hidden ${currentTheme.roastBg} ${currentTheme.roastBorder}`}>
                                            <div className={`absolute -right-4 -top-4 opacity-10 ${currentTheme.roastIcon}`}>
                                                <Flame className="w-32 h-32" />
                                            </div>
                                            <h3 className={`font-bold mb-4 uppercase tracking-wide text-xs ${currentTheme.roastTitle}`}>
                                                The Roast
                                            </h3>
                                            <p className={`text-xl font-bold italic leading-relaxed ${currentTheme.roastText}`}>
                                                "{activeRec.roastComment || "This clause is so bad I assumed you pasted it from a meme."}"
                                            </p>
                                            <div className="mt-6 flex justify-end">
                                                <button className={`flex items-center gap-2 text-sm font-bold hover:opacity-80 ${currentTheme.roastShareBtn}`}>
                                                    <Share2 className="w-4 h-4" /> Share this burn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Professional Comparison */
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className={`border rounded-xl p-5 ${currentTheme.comparisonBoxCurrent}`}>
                                            <h3 className="font-semibold mb-3 opacity-80">Current Language</h3>
                                            <p className="font-serif text-lg">"{activeRec.currentText}"</p>
                                            <div className="mt-4 text-sm opacity-70 p-3 bg-black/5 rounded">
                                                <strong>Legal Risk:</strong> {activeRec.legalBasis}
                                            </div>
                                        </div>
                                        <div className={`border rounded-xl p-5 ${currentTheme.comparisonBoxProposed}`}>
                                            <h3 className="font-semibold mb-3 opacity-80">Proposed ({perspective}-Friendly)</h3>
                                            <p className="font-serif text-lg">"{activeRec.proposedText}"</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Accept Button */}
                            {!isRoastMode && !activeRec.accepted && (
                                <div className="flex justify-end pt-4 border-t border-slate-200">
                                    <button
                                        onClick={() => handleAcceptRecommendation(activeRec)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg"
                                    >
                                        Accept & Apply Change
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Summary View */
                    <div className="flex-1 overflow-y-auto p-8">
                        {swotData ? (
                            <div className="max-w-4xl w-full mx-auto space-y-8">
                                {/* Risk Distribution */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-blue-600" /> Risk Distribution
                                    </h3>
                                    <div className="flex h-8 w-full rounded-full overflow-hidden">
                                        {riskDistribution.total > 0 ? (
                                            <>
                                                {riskDistribution.dist.Critical > 0 && (
                                                    <div
                                                        style={{ width: `${(riskDistribution.dist.Critical / riskDistribution.total) * 100}%` }}
                                                        className="bg-red-500"
                                                        title="Critical"
                                                    />
                                                )}
                                                {riskDistribution.dist.High > 0 && (
                                                    <div
                                                        style={{ width: `${(riskDistribution.dist.High / riskDistribution.total) * 100}%` }}
                                                        className="bg-orange-400"
                                                        title="High"
                                                    />
                                                )}
                                                {riskDistribution.dist.Medium > 0 && (
                                                    <div
                                                        style={{ width: `${(riskDistribution.dist.Medium / riskDistribution.total) * 100}%` }}
                                                        className="bg-yellow-300"
                                                        title="Medium"
                                                    />
                                                )}
                                                {riskDistribution.dist.Low > 0 && (
                                                    <div
                                                        style={{ width: `${(riskDistribution.dist.Low / riskDistribution.total) * 100}%` }}
                                                        className="bg-green-300"
                                                        title="Low"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full bg-emerald-400" />
                                        )}
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>Critical ({riskDistribution.dist.Critical})</span>
                                        <span>High ({riskDistribution.dist.High})</span>
                                        <span>Medium ({riskDistribution.dist.Medium})</span>
                                        <span>Low ({riskDistribution.dist.Low})</span>
                                    </div>
                                </div>

                                {/* SWOT Analysis */}
                                <h2 className="text-2xl font-bold text-slate-800">Strategic SWOT Analysis</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <SwotCard type="strengths" items={swotData.strengths} />
                                    <SwotCard type="weaknesses" items={swotData.weaknesses} />
                                    <SwotCard type="opportunities" items={swotData.opportunities} />
                                    <SwotCard type="threats" items={swotData.threats} />
                                </div>

                                {/* Table of Authorities */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-8">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Library className="w-5 h-5 text-slate-600" /> Table of Authorities
                                    </h3>
                                    {uniqueCitations.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left text-slate-600">
                                                <thead className="bg-slate-50 text-xs uppercase">
                                                    <tr>
                                                        <th className="px-4 py-3">Citation</th>
                                                        <th className="px-4 py-3">Relevance</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {uniqueCitations.map((cite, idx) => (
                                                        <tr key={idx}>
                                                            <td className="px-4 py-3 font-mono text-blue-600">{cite}</td>
                                                            <td className="px-4 py-3">Referenced in risk assessment logic.</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 italic">No specific case law citations generated yet.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="flex h-full items-center justify-center text-center p-8 opacity-50">
                                <div>
                                    <ShieldCheck className="w-24 h-24 text-slate-400 mx-auto mb-4" />
                                    <h2 className="text-xl font-bold text-slate-500">Run analysis to generate insights</h2>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisView;
