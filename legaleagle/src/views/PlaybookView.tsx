// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import { Save, BookOpen, AlertTriangle, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { parseDocument } from '@/utils/documentParser';

interface PlaybookViewProps {
    currentTheme: Theme;
}

export const PlaybookView: React.FC<PlaybookViewProps> = ({ currentTheme }) => {
    const { profile } = useAuth();
    const [rulesText, setRulesText] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (profile?.current_team_id) {
            fetchPlaybook(profile.current_team_id);
        }
    }, [profile?.current_team_id]);

    const fetchPlaybook = async (teamId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('playbooks')
            .select('rules_text')
            .eq('team_id', teamId)
            .maybeSingle();
            
        if (error) {
            console.error('Error fetching playbook:', error);
            setError('Failed to load playbook.');
        } else if (data) {
            setRulesText(data.rules_text);
        } else {
            // Team has no playbook yet, might happen if trigger failed, so we'll allow creating one on save
            setRulesText('');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!profile?.current_team_id) return;
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Upsert playbook
            const { error } = await supabase
                .from('playbooks')
                .upsert({ 
                    team_id: profile.current_team_id, 
                    rules_text: rulesText 
                }, { onConflict: 'team_id' });
                
            if (error) throw error;
            
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const toastId = toast.loading('Extracting text from document...');
            const text = await parseDocument(file);
            setRulesText(prev => prev ? prev + '\n\n' + text : text);
            toast.success('Document text loaded successfully. Remember to click Save.', { id: toastId });
        } catch (err: any) {
            toast.error(`Failed to load document: ${err.message}`);
        }
        
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!profile?.current_team_id) {
        return (
            <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 text-center pt-12">
                <AlertTriangle className={`w-12 h-12 mx-auto mb-4 ${currentTheme.textMuted}`} />
                <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>No Active Workspace</h2>
                <p className={`${currentTheme.textMuted}`}>
                    You must create or select a workspace in the Settings tab to configure a Custom Playbook.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>RAG Legal Playbook</h2>
                <p className={`${currentTheme.textMuted} mb-6`}>
                    This is your team's custom Retrieval-Augmented Generation (RAG) knowledge base. 
                    The AI Legal Assistant will automatically consult these rules and guidelines whenever you run a Legal Audit, 
                    using them to generate highly contextual, personalized recommendations and flag specific violations.
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm border border-green-200">
                    Playbook saved successfully! The AI will now use these rules for all future analyses.
                </div>
            )}

            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${currentTheme.primary} bg-opacity-10 text-blue-600`}>
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Rules & Guidelines Engine</h3>
                            <p className={`text-xs ${currentTheme.textMuted}`}>Define your company's specific legal rules in plain English.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload} 
                            className="hidden" 
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} bg-opacity-10 hover:bg-opacity-20`}
                        >
                            <Upload className="w-4 h-4" />
                            Upload (.txt, .md)
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                        >
                            <Save className="w-4 h-4" />
                            {loading ? 'Saving to RAG...' : 'Save Knowledge Base'}
                        </button>
                    </div>
                </div>

                <div className="mb-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-blue-800">
                    <strong className="block mb-2 font-bold">How to structure your Playbook for optimal AI extraction:</strong>
                    <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                        <li><strong>Be explicit:</strong> (e.g., "Always ensure governing law is Delaware or New York. Reject California.")</li>
                        <li><strong>Use numbered lists:</strong> Discrete, numbered rules are easier for the LLM to parse and apply.</li>
                        <li><strong>Provide Fallbacks:</strong> Include negotiation fallback positions (e.g., "If Net 30 is rejected, accept Net 45. Never Net 90.")</li>
                        <li><strong>Define Risk Severity:</strong> Tell the AI what is a dealbreaker vs. a minor issue.</li>
                    </ul>
                </div>

                <textarea
                    value={rulesText}
                    onChange={(e) => setRulesText(e.target.value)}
                    placeholder="1. Never accept Net 90 payment terms; require Net 30.&#10;2. Mutual indemnification is required.&#10;3. Venue must be in Travis County, Texas."
                    className={`w-full h-[400px] p-4 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none ${currentTheme.input} font-mono text-sm leading-relaxed`}
                />
            </div>
        </div>
    );
};
