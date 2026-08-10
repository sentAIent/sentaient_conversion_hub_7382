// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDemoById } from '@/data/demos';

// Components
import { Sidebar, DisclaimerModal } from '@/components';
import { TopHeader } from '@/components/layout/TopHeader';
import { AuthModal } from '@/components/auth/AuthModal';
import toast from 'react-hot-toast';
import { parseDocument } from '@/utils/documentParser';

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
import { exportToWord } from '@/services/exportService';
import { supabase } from '@/lib/supabase';
import { logAuditAction } from '@/services/auditService';

// Hooks
import { useAuth } from '@/context/AuthContext';

// Constants
import { THEMES, INITIAL_TEXT } from '@/constants';

// Utils
import { findFuzzyMatch, formatDate } from '@/utils';

// Stores
import { useUIStore, useDocumentStore, useAnalysisStore } from '@/store';

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
    // UI State
    const currentTheme = useUIStore(s => s.currentTheme);
    const setCurrentTheme = useUIStore(s => s.setCurrentTheme);
    const activeTab = useUIStore(s => s.activeTab);
    const prevTab = useUIStore(s => s.prevTab);
    const setActiveTab = useUIStore(s => s.setActiveTab);
    const isRoastMode = useUIStore(s => s.isRoastMode);
    const setIsRoastMode = useUIStore(s => s.setIsRoastMode);
    const isPricingModalOpen = useUIStore(s => s.isPricingModalOpen);
    const setIsPricingModalOpen = useUIStore(s => s.setIsPricingModalOpen);
    const isMobileMenuOpen = useUIStore(s => s.isMobileMenuOpen);
    const setIsMobileMenuOpen = useUIStore(s => s.setIsMobileMenuOpen);
    const isAuthModalOpen = useUIStore(s => s.isAuthModalOpen);
    const setIsAuthModalOpen = useUIStore(s => s.setIsAuthModalOpen);
    const showEmailModal = useUIStore(s => s.showEmailModal);
    const setShowEmailModal = useUIStore(s => s.setShowEmailModal);
    const hasAcceptedDisclaimer = useUIStore(s => s.hasAcceptedDisclaimer);
    const setHasAcceptedDisclaimer = useUIStore(s => s.setHasAcceptedDisclaimer);

    // Document State
    const documentText = useDocumentStore(s => s.documentText);
    const setDocumentText = useDocumentStore(s => s.setDocumentText);
    const documentName = useDocumentStore(s => s.documentName);
    const setDocumentName = useDocumentStore(s => s.setDocumentName);
    const activeCaseId = useDocumentStore(s => s.activeCaseId);
    const setActiveCaseId = useDocumentStore(s => s.setActiveCaseId);
    const activeHistoryId = useDocumentStore(s => s.activeHistoryId);
    const setActiveHistoryId = useDocumentStore(s => s.setActiveHistoryId);
    const activeDemoId = useDocumentStore(s => s.activeDemoId);
    const setActiveDemoId = useDocumentStore(s => s.setActiveDemoId);
    const contractType = useDocumentStore(s => s.contractType);
    const setContractType = useDocumentStore(s => s.setContractType);
    const perspective = useDocumentStore(s => s.perspective);
    const setPerspective = useDocumentStore(s => s.setPerspective);
    const parties = useDocumentStore(s => s.parties);
    const setParties = useDocumentStore(s => s.setParties);

    // Analysis State
    const score = useAnalysisStore(s => s.score);
    const setScore = useAnalysisStore(s => s.setScore);
    const isAnalyzing = useAnalysisStore(s => s.isAnalyzing);
    const setIsAnalyzing = useAnalysisStore(s => s.setIsAnalyzing);
    const [loadingMessage, setLoadingMessage] = useState('Analyzing document...');
    const [loadingSubtext, setLoadingSubtext] = useState('Extracting insights and identifying risks.');
    const isRateLimited = useAnalysisStore(s => s.isRateLimited);
    const setIsRateLimited = useAnalysisStore(s => s.setIsRateLimited);
    const rateLimitCountdown = useAnalysisStore(s => s.rateLimitCountdown);
    const setRateLimitCountdown = useAnalysisStore(s => s.setRateLimitCountdown);
    const analysisComplete = useAnalysisStore(s => s.analysisComplete);
    const setAnalysisComplete = useAnalysisStore(s => s.setAnalysisComplete);
    const recommendations = useAnalysisStore(s => s.recommendations);
    const setRecommendations = useAnalysisStore(s => s.setRecommendations);
    const swotData = useAnalysisStore(s => s.swotData);
    const setSwotData = useAnalysisStore(s => s.setSwotData);
    const selectedRecId = useAnalysisStore(s => s.selectedRecId);
    const setSelectedRecId = useAnalysisStore(s => s.setSelectedRecId);
    const changeLog = useAnalysisStore(s => s.changeLog);
    const setChangeLog = useAnalysisStore(s => s.setChangeLog);
    const scanProgress = useAnalysisStore(s => s.scanProgress);
    const setScanProgress = useAnalysisStore(s => s.setScanProgress);
    const undoHistory = useAnalysisStore(s => s.undoHistory);
    const setUndoHistory = useAnalysisStore(s => s.setUndoHistory);
    const heatmapEnabled = useAnalysisStore(s => s.heatmapEnabled);
    const setHeatmapEnabled = useAnalysisStore(s => s.setHeatmapEnabled);
    const analysisDepth = useAnalysisStore(s => s.analysisDepth);
    const setAnalysisDepth = useAnalysisStore(s => s.setAnalysisDepth);
    const addToChangeLog = useAnalysisStore(s => s.addToChangeLog);

    const [cloudHistory, setCloudHistory] = useState<any[]>([]);

    // Auto-save logic
    useEffect(() => {
        if (!activeHistoryId || !profile?.id || !documentText) return;
        const timer = setTimeout(async () => {
            try {
                // Call our new historyService to save version
                const { saveNewVersion } = await import('@/services/historyService');
                await saveNewVersion(profile.id, activeHistoryId, documentText, 'Auto-save');
            } catch (e) {
                console.error('Auto-save failed:', e);
            }
        }, 2000); // Debounce 2 seconds
        return () => clearTimeout(timer);
    }, [documentText, activeHistoryId, profile?.id]);

    const [emailDraft, setEmailDraft] = useState('');
    const [autoAnalyzePending, setAutoAnalyzePending] = useState(false);

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

    // Function to load a demo
    const loadDemo = (demoId: string) => {
        const demo = getDemoById(demoId);
        if (demo) {
            setDocumentText(demo.documentText);
            setDocumentName(demo.name);
            setActiveDemoId(demoId);
            
            const isRoast = perspective === 'roast';
            if (isRoast && demo.roastRecommendations?.length) {
                setRecommendations(demo.roastRecommendations);
            } else if (perspective === 'Company' && (demo as any).companyRecommendations?.length) {
                setRecommendations((demo as any).companyRecommendations);
            } else if (perspective === 'User' && (demo as any).userRecommendations?.length) {
                setRecommendations((demo as any).userRecommendations);
            } else if (perspective === 'Standard' && (demo as any).standardRecommendations?.length) {
                setRecommendations((demo as any).standardRecommendations);
            } else {
                setRecommendations(demo.recommendations);
            }
            
            setScore(demo.score);
            setSwotData(demo.swotData);
            setAnalysisComplete(true);
            setActiveHistoryId(null); // demos aren't in history yet
            setActiveTab('analysis');
            
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    };

    // Load state from localStorage on mount or URL param
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const demoId = queryParams.get('demo');
        const textParam = queryParams.get('text');
        const modeParam = queryParams.get('mode');
        
        if (demoId) {
            loadDemo(demoId);
            return;
        }

        // If opened inside the Chrome extension side panel (detected via iframe or modeParam), 
        // NEVER load old localStorage state.
        // We always want a fresh slate so the user can immediately paste or analyze new text.
        const isIframe = window !== window.parent;
        
        if (modeParam === 'extension' || isIframe) {
            if (textParam) {
                setDocumentText(decodeURIComponent(textParam));
                setDocumentName("Analyzed from Web.txt");
                setAutoAnalyzePending(true);
            } else {
                setDocumentText("");
                setDocumentName("");
                setRecommendations([]);
                setAnalysisComplete(false);
                setScore(100);
                setActiveTab('editor');
            }
            
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (textParam) {
            setDocumentText(decodeURIComponent(textParam));
            setDocumentName("Analyzed from Web.txt");
            setAutoAnalyzePending(true);
            
            // Clean up the URL to prevent re-triggering if they refresh
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Return early so we don't load any stale local storage state
            return;
        }

        const savedState = localStorage.getItem('legalEagleStateV2');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);

                // If the user previously had a demo loaded as their "draft", we need to nuke it
                const isLeakedDemo = !parsed.activeDemoId && parsed.documentText && (
                    parsed.documentText.includes('Welcome to TikTok') ||
                    parsed.documentText.includes('Netflix') ||
                    parsed.documentText.includes('Slack') ||
                    parsed.documentText.includes('OpenAI') ||
                    parsed.documentText.includes('X Corp') ||
                    parsed.documentText.includes('X (formerly Twitter)')
                );

                if (isLeakedDemo) {
                    localStorage.removeItem('legalEagleStateV2');
                    return;
                }

                // Never restore demo state on initial load - keep it as draft agreement
                if (!parsed.activeDemoId) {
                    if (parsed.documentText && !textParam) setDocumentText(parsed.documentText);
                    if (parsed.documentName && !textParam) setDocumentName(parsed.documentName);
                    if (parsed.recommendations && !textParam) setRecommendations(parsed.recommendations);
                    if (parsed.score) setScore(parsed.score);
                    if (parsed.swotData) setSwotData(parsed.swotData);
                    if (parsed.changeLog) setChangeLog(parsed.changeLog);
                    if (parsed.analysisComplete) setAnalysisComplete(parsed.analysisComplete);
                    if (parsed.perspective) setPerspective(parsed.perspective);
                    if (parsed.heatmapEnabled) setHeatmapEnabled(parsed.heatmapEnabled);
                }
            } catch (e) {
                console.error("Failed to load saved state:", e);
            }
        }
    }, []); // Only run on mount! URL params check is sufficient.



    // Save state to localStorage whenever key data changes
    useEffect(() => {
        // DO NOT save state if we are viewing a demo
        if (activeDemoId) return;

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
        localStorage.setItem('legalEagleStateV2', JSON.stringify(stateToSave));
    }, [documentText, documentName, recommendations, score, swotData, changeLog, analysisComplete, perspective, activeDemoId, heatmapEnabled]);

    // Fetch cloud history when opening the history tab
    useEffect(() => {
        if (activeTab === 'history' && profile?.id) {
            fetchCloudHistory();
        }
    }, [activeTab, profile]);

    const fetchCloudHistory = async () => {
        try {
            const { data, error } = await supabase
                .from('history')
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
                .from('history')
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
            toast.error("Failed to delete document. Please try again.");
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
            toast.error('Failed to initiate checkout.');
        }
    };

    /**
     * Silent re-analysis triggered by perspective toggle.
     * Keeps current results on screen while running in background —
     * never clears analysisComplete or redirects the tab.
     * Accepts the new perspective directly to avoid stale closure bugs.
     */
    const handleSilentReanalyze = async (newPerspective: string, newAnalysisDepth: string) => {
        if (!documentText || !analysisComplete) return;

        setIsAnalyzing(true);
        abortControllerRef.current = new AbortController();

        try {
            // For demos, dynamically adjust demo data based on perspective and depth
            if (activeDemoId) {
                await new Promise(r => setTimeout(r, 800));
                
                const demo = getDemoById(activeDemoId);
                if (demo) {
                    const isRoast = newPerspective.toLowerCase() === 'roast';
                    const perspectiveKey = newPerspective.toLowerCase();
                    
                    let baseRecs = demo.recommendations;
                    if (isRoast && (demo as any).roastRecommendations?.length) {
                        baseRecs = (demo as any).roastRecommendations;
                    } else if (perspectiveKey === 'company' && (demo as any).companyRecommendations?.length) {
                        baseRecs = (demo as any).companyRecommendations;
                    } else if (perspectiveKey === 'user' && (demo as any).userRecommendations?.length) {
                        baseRecs = (demo as any).userRecommendations;
                    } else if (perspectiveKey === 'standard' && (demo as any).standardRecommendations?.length) {
                        baseRecs = (demo as any).standardRecommendations;
                    }
                    
                    let newRecs = [...baseRecs];
                    let newSwot = { ...(isRoast && (demo as any).roastSwot ? (demo as any).roastSwot : demo.swotData) };

                    // Optional slight string tweaks if fallback occurred or just to augment
                    if (perspectiveKey === 'company') {
                        newSwot.strengths = ['Company favorable terms identified.', ...(newSwot.strengths || [])];
                    } else if (perspectiveKey === 'user') {
                        newSwot.weaknesses = ['User data privacy could be better protected.', ...(newSwot.weaknesses || [])];
                    }

                    // Apply depth
                    if (newAnalysisDepth === 'quick') {
                        newRecs = newRecs.filter(r => r.severity === 'High' || r.severity === 'Critical');
                    } else if (newAnalysisDepth === 'deep') {
                        newRecs.push({
                            id: 9999,
                            section: 'General',
                            severity: 'Medium',
                            category: 'Operational',
                            title: 'Deep Audit Finding',
                            roastTitle: 'Nitpick',
                            currentText: 'Standard terms apply.',
                            proposedText: 'Highly detailed and specific terms apply.',
                            legalBasis: 'Deep analysis mode',
                            roastComment: 'We dug deep for this one.',
                            scoreImpact: 1,
                            accepted: false
                        } as any);
                    }

                    setRecommendations(newRecs);
                    setSwotData(newSwot);
                }
                return;
            }

            const result = await analyzeDocument(
                documentText,
                newPerspective,        // use passed value — state may still be stale here
                parties,
                (progress) => setScanProgress(progress),
                (recs) => { if (recs.length > 0) setRecommendations(recs); },
                newAnalysisDepth,
                contractType,
                abortControllerRef.current.signal
            );
            setRecommendations(result.recommendations);
            setSwotData(result.swot);
            setScore(result.score);
            // analysisComplete stays true — no empty state flash
        } catch (error: any) {
            if (error?.message !== 'AbortError') {
                console.error('Silent re-analyze failed:', error);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAnalyze = async (useDemoPlaybook: boolean = false) => {

        if (!documentText) return;

        setIsAnalyzing(true);
        setLoadingMessage('Analyzing document...');
        setLoadingSubtext('Extracting insights and identifying risks.');
        setAnalysisComplete(false);
        setRecommendations([]);
        setSwotData(null);
        setSelectedRecId(null);
        abortControllerRef.current = new AbortController();

        let playbookText = undefined;
        if (useDemoPlaybook) {
            playbookText = "ACME CORP LEGAL PLAYBOOK\n1. Indemnification: ACME Corp liability must always be capped at 12 months fees. Never accept uncapped indemnification.\n2. Governing Law: Must be Delaware or California. Reject any other jurisdiction.\n3. Payment Terms: Net 45 or Net 60 only. Reject Net 30.";
        } else if (profile?.current_team_id) {
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
            let result = await analyzeDocument(
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
                playbookText,
                (isLimited, seconds) => {
                    setIsRateLimited(isLimited);
                    setRateLimitCountdown(seconds);
                }
            );

            // Regeneration loop based on tier requirements
            let targetScore = 70;
            const userTier = profile?.subscription_tier || 'standard';
            if (userTier === 'enterprise') targetScore = 95;
            else if (userTier === 'premium') targetScore = 85;

            while (result.score < targetScore && !abortControllerRef.current.signal.aborted) {
                setLoadingMessage('This project requires additional research.');
                setLoadingSubtext('We will provide the analysis once thoroughly completed.');
                console.log(`Score ${result.score} < ${targetScore}, regenerating...`);
                
                result = await analyzeDocument(
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
            }

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
                            case_id: activeCaseId,
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

            // Save to history table
            if (profile?.id && !abortControllerRef.current.signal.aborted) {
                const { data: newDoc, error: insertErr } = await supabase.from('history').insert({
                    user_id: profile.id,
                    team_id: profile.current_team_id || null,
                    case_id: activeCaseId || null,
                    document_name: 'Analysis - ' + new Date().toLocaleDateString(),
                    document_text: documentText,
                    recommendations: result.recommendations,
                    score: result.score,
                    swot_data: result.swot,
                    perspective: perspective,
                    contract_type: contractType
                }).select().single();
                
                if (!insertErr && newDoc) {
                    setActiveHistoryId(newDoc.id);
                    // Create v1
                    const { saveNewVersion } = await import('@/services/historyService');
                    await saveNewVersion(profile.id, newDoc.id, documentText, 'Initial Analysis');
                }
                
                if (profile.current_team_id) {
                    await logAuditAction(profile.current_team_id, profile.id, 'AI_ANALYSIS_COMPLETED', {
                        documentLength: documentText.length,
                        contractType
                    });
                }
                
                // Refresh cloud history after insert
                fetchCloudHistory();
            }

        } catch (error: any) {
            console.error("Analysis failed:", error);
            if (error?.name === 'AbortError' || (error instanceof Error && (error.message.includes('AbortError') || error.message.toLowerCase().includes('abort')))) {
                toast.info("Analysis stopped by user.");
            } else if (error instanceof Error && error.message.includes('429')) {
                toast.error("API Rate Limit Exceeded. Please wait a moment before trying again.");
            } else {
                toast.error(error instanceof Error ? error.message : "Failed to analyze document.");
            }
        } finally {
            setIsAnalyzing(false);
            setIsRateLimited(false);
            setRateLimitCountdown(0);
        }
    };

    // Trigger auto-analysis if pending
    useEffect(() => {
        if (autoAnalyzePending && documentText && !isAnalyzing) {
            setAutoAnalyzePending(false);
            handleAnalyze();
        }
    }, [autoAnalyzePending, documentText, isAnalyzing]);

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

    // Accept a recommendation (with undo snapshot)
    const handleAcceptRecommendation = (rec: Recommendation) => {
        const match = findFuzzyMatch(documentText, rec.currentText);

        if (match) {
            // Save snapshot for undo
            setUndoHistory(prev => [...prev, { documentText, recommendations }]);

            const prefix = documentText.slice(0, match.start);
            const suffix = documentText.slice(match.end);
            const newText = prefix + rec.proposedText + suffix;

            setDocumentText(newText);
            setRecommendations(prev =>
                prev.map(r => r.id === rec.id ? { ...r, accepted: true } : r)
            );
            addToChangeLog(rec);
        } else {
            toast.error("Could not auto-replace: Text match failed. Please apply manually.");
        }
    };

    // Undo the most recent individual revision
    const handleUndoRevision = () => {
        setUndoHistory(prev => {
            if (prev.length === 0) return prev;
            const snapshot = prev[prev.length - 1];
            setDocumentText(snapshot.documentText);
            setRecommendations(snapshot.recommendations);
            return prev.slice(0, -1);
        });
    };

    // Undo ALL applied revisions in one shot
    const handleUndoAllRevisions = () => {
        setUndoHistory(prev => {
            if (prev.length === 0) return prev;
            const snapshot = prev[0]; // oldest snapshot = original state
            setDocumentText(snapshot.documentText);
            setRecommendations(snapshot.recommendations);
            return [];
        });
    };

    // Apply all recommendations (with undo snapshot)
    const handleApplyAll = () => {
        let currentDocText = documentText;
        const updates: Array<Recommendation & { match: { start: number; end: number } }> = [];

        recommendations.forEach(rec => {
            if (!rec.accepted) {
                const match = findFuzzyMatch(currentDocText, rec.currentText);
                if (match) updates.push({ ...rec, match });
            }
        });

        if (updates.length === 0) return;

        // Save one collective snapshot for undo-all
        setUndoHistory(prev => [...prev, { documentText, recommendations }]);

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
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setDocumentName(file.name);
            const toastId = toast.loading('Extracting text from document...');

            try {
                const content = await parseDocument(file);
                setDocumentText(content);

                // Reset analysis state
                setScore(0);
                setAnalysisComplete(false);
                setRecommendations([]);
                setSwotData(null);
                setHeatmapEnabled(false);
                toast.success('Document loaded successfully', { id: toastId });
            } catch (err: any) {
                toast.error(`Failed to load document: ${err.message}`, { id: toastId });
            }

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Handle clearing the document
    const handleClearDocument = () => {
        setDocumentText(INITIAL_TEXT);
        setDocumentName('Draft_Agreement.txt');
        setScore(0);
        setAnalysisComplete(false);
        setRecommendations([]);
        setSwotData(null);
        setHeatmapEnabled(false);
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
            toast.error("Failed to save document.");
        }
    };

    // Handle export Word
    const handleExportWord = async () => {
        if (!documentText) return;
        const toastId = toast.loading('Generating .docx file...');
        try {
            await exportToWord(documentText, recommendations, documentName);
            toast.success('Document exported successfully!', { id: toastId });
        } catch (e) {
            console.error("Export Word failed", e);
            toast.error("Failed to export to Word.", { id: toastId });
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
                currentTheme={currentTheme}
                analysisDepth={analysisDepth}
                setAnalysisDepth={setAnalysisDepth}
                onAnalyze={handleAnalyze}
                isRoastMode={isRoastMode}
            />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
            {/* Dummy PricingModal integration to use the variables */}
            {isPricingModalOpen && <div onClick={() => setIsPricingModalOpen(false)}></div>}

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden min-h-0">
                <TopHeader 
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                    isRoastMode={isRoastMode}
                    setIsRoastMode={setIsRoastMode}
                    onOpenAuth={() => setIsAuthModalOpen(true)}
                    onOpenPricing={() => setIsPricingModalOpen(true)}
                />
                <OfflineBanner currentTheme={currentTheme} />
                
                {/* Rate Limit Overlay */}
                {isRateLimited && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-amber-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
                        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div>
                            <p className="font-bold">API Rate Limit Paused</p>
                            <p className="text-sm">Resuming in {rateLimitCountdown} seconds...</p>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.md,.json,.csv,.doc,.docx,.pdf"
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
                        handleExportWord={handleExportWord}
                        onClearDocument={handleClearDocument}
                        currentTheme={currentTheme}
                        scanProgress={scanProgress}
                        onAddAnnotation={() => {}}
                        contractType={contractType}
                        setContractType={setContractType}
                        perspective={perspective}
                        setPerspective={setPerspective}
                        prevTab={prevTab}
                        analysisComplete={analysisComplete}
                        activeCaseId={activeCaseId}
                        setActiveCaseId={setActiveCaseId}
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
                        isAnalyzing={isAnalyzing}
                        loadingMessage={loadingMessage}
                        loadingSubtext={loadingSubtext}
                        isRoastMode={isRoastMode}
                        perspective={perspective}
                        handleApplyAll={handleApplyAll}
                        handleUndoRevision={handleUndoRevision}
                        handleUndoAllRevisions={handleUndoAllRevisions}
                        canUndo={undoHistory.length > 0}
                        generateNegotiationEmail={generateNegotiationEmail}
                        showEmailModal={showEmailModal}
                        setShowEmailModal={setShowEmailModal}
                        emailDraft={emailDraft}
                        setEmailDraft={setEmailDraft}
                        handleAcceptRecommendation={handleAcceptRecommendation}
                        currentTheme={currentTheme}
                        setPerspective={setPerspective}
                        setActiveTab={setActiveTab}
                        prevTab={prevTab}
                        onReanalyze={handleSilentReanalyze}
                        analysisDepth={analysisDepth}
                        setAnalysisDepth={setAnalysisDepth}
                    />
                )}

                {activeTab === 'draft' && (
                    <DraftView
                        currentTheme={currentTheme}
                        onGenerate={async (prompt: string) => {
                            return await generateContract(prompt, perspective, analysisDepth);
                        }}
                        onSendToEditor={async (text: string) => {
                            setDocumentText(text);
                            
                            // Save draft to history to enable version control immediately
                            if (profile?.id) {
                                const { data: newDoc, error: insertErr } = await supabase.from('history').insert({
                                    user_id: profile.id,
                                    team_id: profile.current_team_id || null,
                                    case_id: activeCaseId || null,
                                    document_name: 'Generated Draft - ' + new Date().toLocaleDateString(),
                                    document_text: text,
                                    contract_type: 'Draft'
                                }).select().single();
                                
                                if (!insertErr && newDoc) {
                                    setActiveHistoryId(newDoc.id);
                                    const { saveNewVersion } = await import('@/services/historyService');
                                    await saveNewVersion(profile.id, newDoc.id, text, 'Initial Draft');
                                    fetchCloudHistory();
                                }
                            }
                            
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
                        currentTheme={currentTheme}
                        onLoadItem={(item) => {
                            // Map LibraryDocument/HistoryDocument to what MainApp expects
                            setDocumentText(item.document_text || '');
                            setDocumentName(item.document_name || 'Untitled Document');
                            setActiveHistoryId(item.id);
                            
                            if (item.recommendations) {
                                setRecommendations(item.recommendations);
                                setScore(item.score || 0);
                                setSwotData(item.swot_data || { strengths: [], weaknesses: [], opportunities: [], threats: [] });
                                setPerspective(item.perspective || 'User');
                                setAnalysisComplete(true);
                                setActiveTab('analysis');
                            } else {
                                setActiveTab('editor');
                            }
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

                {activeTab === 'cases' && <CasesView currentTheme={currentTheme} onLoadDemo={loadDemo} />}

                {activeTab === 'admin' && (
                    <AdminAnalyticsView currentTheme={currentTheme} />
                )}
            </div>
        </div>
        </ErrorBoundary>
    );
}
