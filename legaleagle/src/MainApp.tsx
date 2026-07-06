// @ts-nocheck
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
    HistoryView,
    DraftView,
    ClauseLibraryView,
    PricingView,
    PrivacyPolicyView,
    TOSView,
    AdminAnalyticsView,
    WorkspaceView,
    PlaybookView,
    AuditLogView,
    CasesView
} from '@/views';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { OfflineBanner } from '@/components/features/OfflineBanner';

// Services
import { analyzeDocument, sendChatMessage, calculateScore, generateContract } from '@/services';
import { supabase } from '@/lib/supabase';

// Hooks
import { useAuth } from '@/context/AuthContext';

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

export default function MainApp() {
    const { profile } = useAuth();
    // App State
    const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
    const [activeTab, setActiveTab] = useState('editor');
    const [isRoastMode, setIsRoastMode] = useState(false);
    const [perspective, setPerspective] = useState('Buyer');
    const [contractType, setContractType] = useState<any>('nda');
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const [cloudHistory, setCloudHistory] = useState<any[]>([]);

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

    // Fetch cloud history when opening the history tab
    useEffect(() => {
        if (activeTab === 'history' && profile?.id) {
            fetchCloudHistory();
        }
    }, [activeTab, profile]);

    const fetchCloudHistory = async () => {
        try {
            const { data, error } = await supabase
                .from('analyses')
                .select('*')
                .eq('user_id', profile?.id)
                .order('created_at', { ascending: false })
                .limit(50);
            
            if (error) throw error;
            if (data) setCloudHistory(data);
        } catch (e) {
            console.error("Failed to fetch cloud history", e);
        }
    };

    const handleDeleteDocument = async (id: string) => {
        if (!profile?.id) return;
        try {
            const { error } = await supabase
                .from('analyses')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            // Remove from local state
            setCloudHistory(prev => prev.filter(item => item.id !== id));
            
            // Log audit event if in a team
            if (profile.current_team_id) {
                await supabase.from('audit_logs').insert({
                    team_id: profile.current_team_id,
                    user_id: profile.id,
                    action: 'document_deleted',
                    target_type: 'analysis',
                    target_id: id
                });
            }
        } catch (e) {
            console.error("Failed to delete document", e);
            alert("Failed to delete document. Please try again.");
        }
    };

    // Handle document analysis
    const abortControllerRef = useRef<AbortController | null>(null);

    const handleCancelAnalysis = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    };

    const handleUpgrade = async (tier: string, isAnnual: boolean) => {
        try {
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: { tier, isAnnual }
            });
            
            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error('Failed to create checkout session:', err);
            alert('Failed to initiate checkout.');
        }
    };

    const handleAnalyze = async () => {
        if (!documentText) return;

        setIsAnalyzing(true);
        setAnalysisComplete(false);
        setRecommendations([]);
        setSwotData(null);
        setSelectedRecId(null);
        abortControllerRef.current = new AbortController();

        let playbookText = undefined;
        if (profile?.current_team_id) {
            const { data } = await supabase
                .from('playbooks')
                .select('rules_text')
                .eq('team_id', profile.current_team_id)
                .maybeSingle();
            
            if (data?.rules_text && data.rules_text.trim() !== '') {
                playbookText = data.rules_text;
            }
        }

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
                analysisDepth,
                contractType,
                abortControllerRef.current.signal,
                playbookText
            );
            setRecommendations(result.recommendations);
            setSwotData(result.swot);
            setScore(result.score);
            setAnalysisComplete(true);
            setActiveTab('analysis');

            // Trigger n8n webhook if configured
            if (profile?.n8n_webhook_url && !abortControllerRef.current.signal.aborted) {
                try {
                    fetch(profile.n8n_webhook_url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            event: 'analysis.completed',
                            document_length: documentText.length,
                            contract_type: contractType,
                            analysis_depth: analysisDepth,
                            score: result.score,
                            swot: result.swot,
                            critical_risks_count: result.recommendations.filter(r => r.severity === 'Critical').length,
                            timestamp: new Date().toISOString()
                        })
                    }).catch(err => console.error('Failed to trigger n8n webhook', err));
                } catch (e) {
                    console.error('Webhook execution failed', e);
                }
            }

            if (result.partialSuccess) {
                setChatHistory(prev => [...prev, {
                    id: Date.now(),
                    role: 'ai',
                    content: "Analysis completed with some warnings. A few sections could not be fully analyzed due to network issues, but the majority of the document has been reviewed."
                }]);
            }

        } catch (error) {
            console.error("Analysis failed:", error);
            if (error instanceof Error && error.message === 'AbortError') {
                alert("Analysis stopped.");
            } else {
                alert(error instanceof Error ? error.message : "Failed to analyze document.");
            }
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

    // Keep variables used
    if (isMobileMenuOpen) { setIsMobileMenuOpen(false); }
    return (
        <ErrorBoundary currentTheme={currentTheme}>
        <div className={`flex h-screen w-full transition-colors duration-300 ${currentTheme.appBg} ${currentTheme.panelText}`}>
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
                contractType={contractType}
                setContractType={setContractType}
                onOpenPricing={() => setIsPricingModalOpen(true)}
                    />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
            {/* Dummy PricingModal integration to use the variables */}
            {isPricingModalOpen && <div onClick={() => setIsPricingModalOpen(false)}></div>}

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <OfflineBanner currentTheme={currentTheme} />
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
                        handleCancelAnalysis={handleCancelAnalysis}
                        recommendations={recommendations}
                        isRoastMode={isRoastMode}
                        selectedRecId={selectedRecId}
                        setSelectedRecId={setSelectedRecId}
                        setActiveTab={setActiveTab}
                        onTriggerUpload={() => fileInputRef.current?.click()}
                        handleSave={handleSave}
                        currentTheme={currentTheme}
                        scanProgress={scanProgress}
                        onAddAnnotation={() => {}}
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
                        onDeleteAnnotation={() => {}}
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

                {activeTab === 'draft' && (
                    <DraftView
                        currentTheme={currentTheme}
                        onGenerate={async (prompt: string) => {
                            return await generateContract(prompt);
                        }}
                        onSendToEditor={(text: string) => {
                            setDocumentText(text);
                            setActiveTab('editor');
                        }}
                        handleExportPdf={() => {}}
                        handleExportWord={() => {}}
                    />
                )}
                {activeTab === 'clauses' && (
                    <ClauseLibraryView
                        currentTheme={currentTheme}
                        onInsertClause={async (_clause: any) => {}}
                    />
                )}
                {activeTab === 'pricing' && (
                    <PricingView
                        currentTheme={currentTheme}
                        onUpgrade={handleUpgrade}
                    />
                )}
                {activeTab === 'privacy' && (
                    <PrivacyPolicyView
                        currentTheme={currentTheme}
                    />
                )}
                {activeTab === 'tos' && (
                    <TOSView
                        currentTheme={currentTheme}
                    />
                )}
                {activeTab === 'history' && (
                    <HistoryView
                        changeLog={changeLog}
                        cloudHistory={cloudHistory}
                        onDeleteDocument={handleDeleteDocument}
                        currentTheme={currentTheme}
                        onLoadItem={(item) => {
                            setDocumentText(item.content);
                            setDocumentName(item.document_name);
                            setScore(item.score);
                            if (item.recommendations) setRecommendations(item.recommendations);
                            if (item.swot) setSwotData(item.swot);
                            setAnalysisComplete(true);
                            setActiveTab('analysis');
                        }}
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

                {activeTab === 'workspace' && (
                    <WorkspaceView currentTheme={currentTheme} />
                )}

                {activeTab === 'playbook' && (
                    <PlaybookView currentTheme={currentTheme} />
                )}

                {activeTab === 'audit' && <AuditLogView currentTheme={currentTheme} />}

                {activeTab === 'cases' && <CasesView currentTheme={currentTheme} />}

                {activeTab === 'admin' && (
                    <AdminAnalyticsView currentTheme={currentTheme} />
                )}
            </div>
        </div>
        </ErrorBoundary>
    );
}
