import React, { useState, useEffect, useRef } from 'react';

// Components
import { Sidebar, DisclaimerModal } from '@/components';
import { AuthModal } from '@/components/auth/AuthModal';

// Views
import {
    EditorView,
    AnalysisView,
    ChatView,
    ContextView,
    HistoryView
} from '@/views';

// Services
import { analyzeDocument, sendChatMessage, calculateScore } from '@/services';

// Constants
import { THEMES, INITIAL_TEXT } from '@/constants';

// Utils
import { findFuzzyMatch, formatDate } from '@/utils';

// Types
import type {
    Theme,
    Recommendation,
    SwotAnalysis,
    Party,
    ChangeLogEntry,
    ChatMessage,
    ScanProgress,
    AnalysisDepth
} from '@/types';

function App() {
    // Core state
    const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
    const [activeTab, setActiveTab] = useState('editor');
    const [isRoastMode, setIsRoastMode] = useState(false);
    const [perspective, setPerspective] = useState('Buyer');
    const [analysisDepth, setAnalysisDepth] = useState<AnalysisDepth>('standard');
    const [heatmapEnabled, setHeatmapEnabled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.navy);

    // Document state
    const [documentText, setDocumentText] = useState(INITIAL_TEXT);
    const [documentName, setDocumentName] = useState("Draft_Agreement.txt");

    // Analysis state
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [swotData, setSwotData] = useState<SwotAnalysis | null>(null);
    const [selectedRecId, setSelectedRecId] = useState<number | null>(null);
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
    const [scanProgress, setScanProgress] = useState<ScanProgress>({ current: 0, total: 0 });

    // Email modal state
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailDraft, setEmailDraft] = useState('');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Parties state
    const [parties, setParties] = useState<Party[]>([
        { id: 1, name: 'Company A', role: 'Provider', domicile: 'Wyoming' },
        { id: 2, name: 'Client B', role: 'Client', domicile: 'Texas' }
    ]);

    // Chat state
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'ai',
            content: 'I am your AI Legal Co-Counsel. Upload a document or paste text, and I will help you analyze risk and negotiate terms. Ask me about specific clauses, legal precedents, or negotiation strategies.'
        }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatThinking, setIsChatThinking] = useState(false);

    // Refs
    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('legalAnalyzerState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.documentText) setDocumentText(parsed.documentText);
                if (parsed.documentName) setDocumentName(parsed.documentName);
                if (parsed.recommendations) setRecommendations(parsed.recommendations);
                if (parsed.score) setScore(parsed.score);
                if (parsed.swotData) setSwotData(parsed.swotData);
                if (parsed.changeLog) setChangeLog(parsed.changeLog);
                if (parsed.analysisComplete) setAnalysisComplete(parsed.analysisComplete);
                if (parsed.perspective) setPerspective(parsed.perspective);
                if (parsed.heatmapEnabled) setHeatmapEnabled(parsed.heatmapEnabled);

                // If analysis was complete, ensure we're on the analysis tab or editor
                if (parsed.analysisComplete && parsed.recommendations.length > 0) {
                    // Optional: could force tab, but better to respect default or last active
                }
            } catch (e) {
                console.error("Failed to load saved state:", e);
            }
        }
    }, []);

    // Save state to localStorage whenever key data changes
    useEffect(() => {
        const stateToSave = {
            documentText,
            documentName,
            recommendations,
            score,
            swotData,
            changeLog,
            analysisComplete,
            perspective,
            heatmapEnabled
        };
        localStorage.setItem('legalAnalyzerState', JSON.stringify(stateToSave));
    }, [documentText, documentName, recommendations, score, swotData, changeLog, analysisComplete, perspective, heatmapEnabled]);

    // Handle document analysis
    const handleAnalyze = async () => {
        if (!documentText.trim()) return;

        setIsAnalyzing(true);
        setRecommendations([]);
        setSwotData(null);
        setSelectedRecId(null);

        try {
            const result = await analyzeDocument(
                documentText,
                perspective,
                parties,
                (progress) => setScanProgress(progress),
                (recs) => {
                    setRecommendations(recs);
                    if (recs.length > 0) setHeatmapEnabled(true);
                },
                analysisDepth
            );

            setRecommendations(result.recommendations);
            setSwotData(result.swot);
            setScore(result.score);
            setAnalysisComplete(true);
            setActiveTab('analysis');

            if (result.partialSuccess) {
                setChatHistory(prev => [...prev, {
                    id: Date.now(),
                    role: 'ai',
                    content: "Analysis completed with some warnings. A few sections could not be fully analyzed due to network issues, but the majority of the document has been reviewed."
                }]);
            }

        } catch (error) {
            console.error('Analysis failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            setChatHistory(prev => [...prev, {
                id: Date.now(),
                role: 'ai',
                content: `Analysis failed: ${errorMessage}`
            }]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Handle chat messages
    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now(),
            role: 'user',
            content: chatInput
        };

        setChatHistory(prev => [...prev, userMsg]);
        setChatInput('');
        setIsChatThinking(true);

        try {
            const response = await sendChatMessage(chatInput, documentText, parties);

            setChatHistory(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: response.text || 'I was unable to generate a response.',
                sources: response.sources
            }]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            setChatHistory(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: `I encountered an error: ${errorMessage}. Please check your API configuration.`
            }]);
        } finally {
            setIsChatThinking(false);
        }
    };

    // Add to change log
    const addToChangeLog = (rec: Recommendation) => {
        const entry: ChangeLogEntry = {
            id: Date.now(),
            title: rec.title,
            original: rec.currentText,
            new: rec.proposedText,
            user: "Current User",
            timestamp: formatDate(new Date())
        };
        setChangeLog(prev => [entry, ...prev]);
    };

    // Accept a recommendation
    const handleAcceptRecommendation = (rec: Recommendation) => {
        const match = findFuzzyMatch(documentText, rec.currentText);

        if (match) {
            const prefix = documentText.slice(0, match.start);
            const suffix = documentText.slice(match.end);
            const newText = prefix + rec.proposedText + suffix;

            setDocumentText(newText);
            setRecommendations(prev =>
                prev.map(r => r.id === rec.id ? { ...r, accepted: true } : r)
            );
            addToChangeLog(rec);
        } else {
            alert("Could not auto-replace: Text match failed. Please apply manually.");
        }
    };

    // Apply all recommendations
    const handleApplyAll = () => {
        let currentDocText = documentText;
        const updates: Array<Recommendation & { match: { start: number; end: number } }> = [];

        recommendations.forEach(rec => {
            if (!rec.accepted) {
                const match = findFuzzyMatch(currentDocText, rec.currentText);
                if (match) updates.push({ ...rec, match });
            }
        });

        // Sort by position (end to start) to avoid offset issues
        updates.sort((a, b) => b.match.start - a.match.start);

        updates.forEach(item => {
            const prefix = currentDocText.slice(0, item.match.start);
            const suffix = currentDocText.slice(item.match.end);
            currentDocText = prefix + item.proposedText + suffix;
            addToChangeLog(item);
        });

        setDocumentText(currentDocText);

        const processedIds = new Set(updates.map(r => r.id));
        setRecommendations(prev =>
            prev.map(r => processedIds.has(r.id) ? { ...r, accepted: true } : r)
        );
    };

    // Generate negotiation email
    const generateNegotiationEmail = () => {
        const pending = recommendations.filter(r => !r.accepted);

        if (pending.length === 0) {
            setEmailDraft("The document looks good! No significant changes requested.");
            setShowEmailModal(true);
            return;
        }

        let body = `Dear Counsel,

We have reviewed the proposed agreement and have the following comments based on our internal risk protocols (representing the ${perspective}):

`;

        pending.forEach(rec => {
            body += `• ${rec.section || "General"}: We request modifying this to ${perspective === 'Seller' ? 'limit our exposure' : 'ensure performance'
                }. ${rec.legalBasis}

`;
        });

        body += `Attached is a redline reflecting these changes.

Best regards,
Legal Team`;

        setEmailDraft(body);
        setShowEmailModal(true);
    };

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setDocumentName(file.name);

            const reader = new FileReader();
            reader.onload = (e) => {
                const content = (e.target?.result as string).replace(/\r\n/g, '\n');
                setDocumentText(content);

                // Reset analysis state
                setScore(0);
                setAnalysisComplete(false);
                setRecommendations([]);
                setSwotData(null);
                setHeatmapEnabled(false);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            };
            reader.readAsText(file);
        }
    };

    // Handle save
    const handleSave = () => {
        if (!documentText) return;

        try {
            const blob = new Blob([documentText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = documentName || 'document.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Save failed", e);
            alert("Failed to save document.");
        }
    };

    // Update score when recommendations change
    useEffect(() => {
        if (!analysisComplete) return;

        const newScore = calculateScore(recommendations);
        setScore(newScore);
    }, [recommendations, analysisComplete]);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isChatThinking]);

    // Show disclaimer first
    if (!hasAcceptedDisclaimer) {
        return <DisclaimerModal onAccept={() => setHasAcceptedDisclaimer(true)} />;
    }

    return (
        <div className="flex h-screen bg-slate-900 font-sans overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                analysisComplete={analysisComplete}
                score={score}
                isRoastMode={isRoastMode}
                setIsRoastMode={setIsRoastMode}
                perspective={perspective}
                setPerspective={setPerspective}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                analysisDepth={analysisDepth}
                setAnalysisDepth={setAnalysisDepth}
                onAnalyze={handleAnalyze}
            />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative">
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.md,.json,.csv,.doc,.docx"
                />

                {/* Views */}
                {activeTab === 'editor' && (
                    <EditorView
                        documentName={documentName}
                        documentText={documentText}
                        setDocumentText={setDocumentText}
                        heatmapEnabled={heatmapEnabled}
                        setHeatmapEnabled={setHeatmapEnabled}
                        isAnalyzing={isAnalyzing}
                        handleAnalyze={handleAnalyze}
                        recommendations={recommendations}
                        isRoastMode={isRoastMode}
                        selectedRecId={selectedRecId}
                        setSelectedRecId={setSelectedRecId}
                        setActiveTab={setActiveTab}
                        onTriggerUpload={() => fileInputRef.current?.click()}
                        handleSave={handleSave}
                        currentTheme={currentTheme}
                        scanProgress={scanProgress}
                    />
                )}

                {activeTab === 'context' && (
                    <ContextView
                        parties={parties}
                        setParties={setParties}
                        currentTheme={currentTheme}
                    />
                )}

                {activeTab === 'analysis' && (
                    <AnalysisView
                        recommendations={recommendations}
                        selectedRecId={selectedRecId}
                        setSelectedRecId={setSelectedRecId}
                        score={score}
                        swotData={swotData}
                        isRoastMode={isRoastMode}
                        perspective={perspective}
                        handleApplyAll={handleApplyAll}
                        generateNegotiationEmail={generateNegotiationEmail}
                        showEmailModal={showEmailModal}
                        setShowEmailModal={setShowEmailModal}
                        emailDraft={emailDraft}
                        setEmailDraft={setEmailDraft}
                        handleAcceptRecommendation={handleAcceptRecommendation}
                        currentTheme={currentTheme}
                    />
                )}

                {activeTab === 'history' && (
                    <HistoryView
                        changeLog={changeLog}
                        currentTheme={currentTheme}
                    />
                )}

                {activeTab === 'chat' && (
                    <ChatView
                        chatHistory={chatHistory}
                        isChatThinking={isChatThinking}
                        chatInput={chatInput}
                        setChatInput={setChatInput}
                        handleSendMessage={handleSendMessage}
                        chatEndRef={chatEndRef as React.RefObject<HTMLDivElement>}
                        setActiveTab={setActiveTab}
                        currentTheme={currentTheme}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
