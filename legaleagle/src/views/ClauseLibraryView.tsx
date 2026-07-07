import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types/theme.types';

interface Clause {
    id: string;
    title: string;
    content: string;
    category?: string;
    tags?: string[];
}

const STANDARD_CLAUSES: Clause[] = [
    {
        id: 'std-1',
        title: 'Force Majeure',
        category: 'General',
        content: 'Neither Party will be liable for any failure or delay in performing an obligation under this Agreement that is due to any of the following causes, to the extent beyond its reasonable control: acts of God, accident, riots, war, terrorist act, epidemic, pandemic, quarantine, civil commotion, breakdown of communication facilities, breakdown of web host, breakdown of internet service provider, natural catastrophes, governmental acts or omissions, changes in laws or regulations, national strikes, fire, explosion, generalized lack of availability of raw materials or energy.'
    },
    {
        id: 'std-2',
        title: 'Severability',
        category: 'General',
        content: 'If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not in any way be affected or impaired thereby.'
    },
    {
        id: 'std-3',
        title: 'Governing Law',
        category: 'Legal',
        content: 'This Agreement shall be governed by and construed in accordance with the laws of the State, without giving effect to any choice of law or conflict of law provisions.'
    },
    {
        id: 'std-4',
        title: 'Confidentiality',
        category: 'Protection',
        content: 'The Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. The Receiving Party shall carefully restrict access to Confidential Information to employees, contractors and third parties as is reasonably required.'
    }
];

interface ClauseLibraryViewProps {
    currentTheme: Theme;
    onInsertClause: (content: string) => void;
}

export const ClauseLibraryView: React.FC<ClauseLibraryViewProps> = ({
    currentTheme,
    onInsertClause
}) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'standard' | 'custom'>('standard');
    const [customClauses, setCustomClauses] = useState<Clause[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        if (activeTab === 'custom' && user) {
            loadCustomClauses();
        }
    }, [activeTab, user]);

    const loadCustomClauses = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('clauses')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            setCustomClauses(data as Clause[]);
        }
        setIsLoading(false);
    };

    const handleSaveCustomClause = async () => {
        if (!newTitle.trim() || !newContent.trim() || !user) return;
        
        const { error } = await supabase
            .from('clauses')
            .insert([{ user_id: user.id, title: newTitle, content: newContent }]);
            
        if (!error) {
            setIsCreating(false);
            setNewTitle('');
            setNewContent('');
            loadCustomClauses();
        } else {
            toast.error('Failed to save clause. Please try again.');
        }
    };

    const handleDeleteClause = async (id: string) => {
        if (!confirm('Are you sure you want to delete this clause?')) return;
        const { error } = await supabase.from('clauses').delete().eq('id', id);
        if (!error) loadCustomClauses();
    };

    const renderClauses = (clauses: Clause[], isCustom: boolean) => {
        if (clauses.length === 0) {
            return (
                <div className={`text-center py-12 ${currentTheme.panelText} opacity-50`}>
                    No clauses found.
                </div>
            );
        }

        return (
            <div className="grid gap-4">
                {clauses.map(clause => (
                    <div key={clause.id} className={`p-6 rounded-xl border ${currentTheme.card} ${currentTheme.docBorder} relative group`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className={`font-bold text-lg ${currentTheme.panelText}`}>{clause.title}</h3>
                                {clause.category && (
                                    <span className="inline-block px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full mt-1">
                                        {clause.category}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {isCustom && (
                                    <button 
                                        onClick={() => handleDeleteClause(clause.id)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        title="Delete Clause"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                )}
                                <button 
                                    onClick={() => onInsertClause(clause.content)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-semibold"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Insert
                                </button>
                            </div>
                        </div>
                        <p className={`mt-4 text-sm leading-relaxed ${currentTheme.panelText} opacity-80 whitespace-pre-wrap`}>
                            {clause.content}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`flex flex-col h-full w-full ${currentTheme.main} p-6 overflow-y-auto`}>
            <div className="max-w-4xl mx-auto w-full space-y-6">
                
                <div className="flex items-center justify-between">
                    <h2 className={`text-2xl font-bold ${currentTheme.panelText}`}>Clause Library</h2>
                    <div className="flex gap-2 p-1 bg-black/20 rounded-lg">
                        <button
                            onClick={() => setActiveTab('standard')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'standard' ? 'bg-indigo-600 text-white' : `${currentTheme.panelText} hover:bg-white/10`}`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setActiveTab('custom')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'custom' ? 'bg-indigo-600 text-white' : `${currentTheme.panelText} hover:bg-white/10`}`}
                        >
                            Custom
                        </button>
                    </div>
                </div>

                {activeTab === 'custom' && (
                    <div className="mb-6">
                        {!isCreating ? (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="w-full py-4 border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-xl text-indigo-400 font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Create Custom Clause
                            </button>
                        ) : (
                            <div className={`p-6 rounded-xl border ${currentTheme.card} ${currentTheme.docBorder} space-y-4`}>
                                <h3 className={`font-bold text-lg ${currentTheme.panelText}`}>New Custom Clause</h3>
                                <input
                                    type="text"
                                    placeholder="Clause Title (e.g., Special Payment Terms)"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className={`w-full p-3 rounded-lg bg-black/20 border border-white/10 ${currentTheme.panelText} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                                <textarea
                                    placeholder="Clause Content..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className={`w-full h-32 p-3 rounded-lg bg-black/20 border border-white/10 ${currentTheme.panelText} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className={`px-4 py-2 rounded-lg font-semibold ${currentTheme.panelText} hover:bg-white/10`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveCustomClause}
                                        disabled={!newTitle.trim() || !newContent.trim()}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Save Clause
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'standard' && renderClauses(STANDARD_CLAUSES, false)}
                
                {activeTab === 'custom' && (
                    isLoading ? (
                        <div className={`text-center py-12 ${currentTheme.panelText} opacity-50`}>Loading clauses...</div>
                    ) : (
                        renderClauses(customClauses, true)
                    )
                )}

            </div>
        </div>
    );
};
