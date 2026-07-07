import React, { useState, useEffect } from 'react';
import { FileText, Trash2, RotateCcw, FolderPlus, Eye, EyeOff } from 'lucide-react';
import type { Theme } from '@/types';
import { 
    fetchLibraryDocuments, 
    fetchDeletedDocuments, 
    softDeleteDocument, 
    restoreDocument, 
    hardDeleteDocument, 
    emptyRecycleBin,
    assignToCase,
    HistoryDocument
} from '@/services/historyService';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

interface HistoryViewProps {
    onLoadItem: (item: any) => void;
    currentTheme: Theme;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
    onLoadItem,
    currentTheme
}) => {
    const { profile } = useAuth();
    const [documents, setDocuments] = useState<HistoryDocument[]>([]);
    const [deletedDocuments, setDeletedDocuments] = useState<HistoryDocument[]>([]);
    const [activeTab, setActiveTab] = useState<'All' | 'Analyzed' | 'Drafts' | 'RecycleBin'>('All');
    const [isLoading, setIsLoading] = useState(false);
    
    // Feature toggles
    const [showTimestamps, setShowTimestamps] = useState(true);
    
    // Cases lookup
    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        if (profile?.id) {
            loadData();
            loadCases();
        }
    }, [profile?.id]);

    const loadData = async () => {
        if (!profile?.id) return;
        setIsLoading(true);
        try {
            const docs = await fetchLibraryDocuments(profile.id);
            const deleted = await fetchDeletedDocuments(profile.id);
            setDocuments(docs);
            setDeletedDocuments(deleted);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load library documents");
        } finally {
            setIsLoading(false);
        }
    };

    const loadCases = async () => {
        if (!profile?.current_team_id) return;
        try {
            const { data } = await supabase.from('cases').select('id, name').eq('team_id', profile.current_team_id);
            if (data) setCases(data);
        } catch (e) {}
    };

    const handleSoftDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await softDeleteDocument(id);
            toast.success("Moved to Recycle Bin");
            loadData();
        } catch (err) {
            toast.error("Failed to delete document");
        }
    };

    const handleRestore = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await restoreDocument(id);
            toast.success("Document restored");
            loadData();
        } catch (err) {
            toast.error("Failed to restore document");
        }
    };

    const handleHardDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Permanently delete this document? This cannot be undone.")) return;
        try {
            await hardDeleteDocument(id);
            toast.success("Document permanently deleted");
            loadData();
        } catch (err) {
            toast.error("Failed to delete document");
        }
    };

    const handleEmptyBin = async () => {
        if (!profile?.id) return;
        if (!window.confirm("Empty the recycle bin? All documents inside will be permanently deleted.")) return;
        try {
            await emptyRecycleBin(profile.id);
            toast.success("Recycle Bin emptied");
            loadData();
        } catch (err) {
            toast.error("Failed to empty recycle bin");
        }
    };

    const handleAssignCase = async (id: string, caseId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        try {
            await assignToCase(id, caseId === 'none' ? null : caseId);
            toast.success("Assigned to Matter");
            loadData();
        } catch (err) {
            toast.error("Failed to assign to Matter");
        }
    };

    // Filter documents based on active tab
    const filteredDocs = documents.filter(doc => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Analyzed') return doc.contract_type !== 'Draft';
        if (activeTab === 'Drafts') return doc.contract_type === 'Draft';
        return true;
    });

    const renderDocumentList = (list: HistoryDocument[], isDeleted: boolean = false) => {
        if (list.length === 0) {
            return (
                <div className={`text-center py-12 rounded-xl border ${currentTheme.card || currentTheme.panelBg}`}>
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-medium text-slate-500">No documents found</h3>
                </div>
            );
        }

        return (
            <div className="grid gap-4">
                {list.map((item) => (
                    <div key={item.id} className={`p-4 rounded-xl border shadow-sm flex items-center justify-between text-left transition-all ${currentTheme.card || currentTheme.panelBg}`}>
                        <button
                            onClick={() => !isDeleted && onLoadItem(item)}
                            className="flex-1 flex items-center gap-4 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isDeleted}
                        >
                            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-slate-800">{item.document_name || "Untitled Document"}</h4>
                                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                                    {showTimestamps && (
                                        <span>{new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    )}
                                    {item.score > 0 && <span className="font-semibold text-blue-600">Score: {item.score}</span>}
                                    {item.contract_type && <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{item.contract_type}</span>}
                                </div>
                            </div>
                        </button>
                        
                        <div className="flex items-center gap-4">
                            {!isDeleted && (
                                <div className="flex items-center gap-2 text-sm" onClick={e => e.stopPropagation()}>
                                    <FolderPlus className="w-4 h-4 text-slate-400" />
                                    <select 
                                        className="bg-transparent border border-slate-200 rounded p-1 text-slate-600 outline-none"
                                        value={item.case_id || 'none'}
                                        onChange={(e) => handleAssignCase(item.id, e.target.value, e)}
                                    >
                                        <option value="none">Unassigned</option>
                                        {cases.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            )}

                            {isDeleted ? (
                                <>
                                    <button onClick={(e) => handleRestore(item.id, e)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Restore">
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                    <button onClick={(e) => handleHardDelete(item.id, e)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Permanently">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <button onClick={(e) => handleSoftDelete(item.id, e)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Move to Recycle Bin">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main || currentTheme.appBg}`}>
            <div className="max-w-5xl mx-auto space-y-8">
                
                <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Library</h1>
                        <p className="text-slate-500">
                            Manage all your analyzed contracts and generated drafts.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowTimestamps(!showTimestamps)}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            {showTimestamps ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showTimestamps ? "Hide Timestamps" : "Show Timestamps"}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {['All', 'Analyzed', 'Drafts', 'RecycleBin'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeTab === tab 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'bg-white border text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {tab === 'RecycleBin' ? `Recycle Bin (${deletedDocuments.length})` : tab}
                        </button>
                    ))}
                    
                    <div className="flex-1" />

                    {activeTab === 'RecycleBin' && deletedDocuments.length > 0 && (
                        <button 
                            onClick={handleEmptyBin}
                            className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Empty Bin
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <section>
                        {activeTab === 'RecycleBin' 
                            ? renderDocumentList(deletedDocuments, true)
                            : renderDocumentList(filteredDocs, false)
                        }
                    </section>
                )}
            </div>
        </div>
    );
};

export default HistoryView;
