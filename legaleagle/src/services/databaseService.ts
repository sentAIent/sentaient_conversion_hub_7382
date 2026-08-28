import { supabase } from '../lib/supabase';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const saveAnalysisHistory = async (userId: string, data: any) => {
    try {
        const { error } = await supabase.from('history').insert([
            {
                user_id: userId,
                document_name: data.document_name || 'Untitled Document',
                document_text: data.document_text || '',
                recommendations: data.recommendations || [],
                score: data.score || 0,
                swot_data: data.swot_data || null,
                change_log: data.change_log || [],
                perspective: data.perspective || 'balanced',
                contract_type: data.contract_type || 'standard'
            }
        ]);

        if (error) {
            console.error('Error saving history:', error);
            throw error;
        }
        
        console.log('Successfully saved analysis history');
        return true;
    } catch (err) {
        console.error('Failed to save analysis history:', err);
        return false;
    }
};

export const loadAnalysisHistory = async (userId: string): Promise<any[]> => {
    try {
        const { data, error } = await supabase
            .from('history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading history:', error);
            throw error;
        }

        return data || [];
    } catch (err) {
        console.error('Failed to load analysis history:', err);
        return [];
    }
};

export const uploadDocument = async (userId: string, file: File) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading document:', error);
            throw error;
        }

        const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
        return { path: data.publicUrl };
    } catch (err) {
        console.error('Failed to upload document:', err);
        throw err;
    }
};
