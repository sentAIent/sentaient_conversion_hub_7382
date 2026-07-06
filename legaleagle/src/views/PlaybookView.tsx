// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import { Save, BookOpen, AlertTriangle } from 'lucide-react';

interface PlaybookViewProps {
    currentTheme: Theme;
}

export const PlaybookView: React.FC<PlaybookViewProps> = ({ currentTheme }) => {
    const { profile } = useAuth();
    const [rulesText, setRulesText] = useState('');
    const [loading, setLoading] = useState(false);
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
                <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>Custom Legal Playbook</h2>
                <p className={`${currentTheme.textMuted} mb-6`}>
                    Define your company's specific legal rules and guardrails in plain English. The AI will enforce these rules on every contract you scan.
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm border border-green-200">
                    Playbook saved successfully!
                </div>
            )}

            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${currentTheme.primary} bg-opacity-10 text-blue-600`}>
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Rules Engine</h3>
                    </div>
                    
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Playbook'}
                    </button>
                </div>

                <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <strong className="block mb-1">Tips for effective rules:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Be specific (e.g., "Always ensure governing law is Delaware or New York.")</li>
                        <li>Include both required inclusions and explicit exclusions.</li>
                        <li>Number your rules for better AI comprehension.</li>
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
