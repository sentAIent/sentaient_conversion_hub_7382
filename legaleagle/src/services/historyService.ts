import { supabase } from '@/lib/supabase';

// Types
export interface HistoryDocument {
    id: string;
    document_name: string;
    document_text: string;
    created_at: string;
    deleted_at: string | null;
    case_id: string | null;
    score: number;
    contract_type?: string;
    [key: string]: any;
}

export interface DocumentVersion {
    id: string;
    history_id: string;
    version_number: number;
    document_text: string;
    created_at: string;
    change_summary?: string;
}

// ----------------------------------------------------
// Document Library & Recycle Bin
// ----------------------------------------------------

export const fetchLibraryDocuments = async (userId: string, includeDeleted = false): Promise<HistoryDocument[]> => {
    let query = supabase
        .from('history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (!includeDeleted) {
        query = query.is('deleted_at', null);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
};

export const fetchDeletedDocuments = async (userId: string): Promise<HistoryDocument[]> => {
    const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', userId)
        .not('deleted_at', 'is', null)
        .order('deleted_at', { ascending: false });
    if (error) throw error;
    return data || [];
};

export const softDeleteDocument = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('history')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
    if (error) throw error;
};

export const restoreDocument = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('history')
        .update({ deleted_at: null })
        .eq('id', id);
    if (error) throw error;
};

export const hardDeleteDocument = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('history')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

export const emptyRecycleBin = async (userId: string): Promise<void> => {
    const { error } = await supabase
        .from('history')
        .delete()
        .eq('user_id', userId)
        .not('deleted_at', 'is', null);
    if (error) throw error;
};

export const assignToCase = async (id: string, caseId: string | null): Promise<void> => {
    const { error } = await supabase
        .from('history')
        .update({ case_id: caseId })
        .eq('id', id);
    if (error) throw error;
};

// ----------------------------------------------------
// Version Control
// ----------------------------------------------------

export const fetchVersions = async (historyId: string): Promise<DocumentVersion[]> => {
    const { data, error } = await supabase
        .from('document_versions')
        .select('*')
        .eq('history_id', historyId)
        .order('version_number', { ascending: false });
    if (error) throw error;
    return data || [];
};

export const saveNewVersion = async (userId: string, historyId: string, text: string, summary?: string): Promise<DocumentVersion | null> => {
    // Determine next version number
    const { data: latest } = await supabase
        .from('document_versions')
        .select('version_number')
        .eq('history_id', historyId)
        .order('version_number', { ascending: false })
        .limit(1)
        .maybeSingle();

    const nextVersion = (latest?.version_number || 0) + 1;

    const { data, error } = await supabase
        .from('document_versions')
        .insert({
            history_id: historyId,
            user_id: userId,
            document_text: text,
            version_number: nextVersion,
            change_summary: summary
        })
        .select()
        .single();
    
    if (error) {
        console.error("Failed to save version:", error);
        return null;
    }

    // Update parent history record as well to keep latest text in sync
    await supabase.from('history').update({ document_text: text }).eq('id', historyId);

    return data;
};
