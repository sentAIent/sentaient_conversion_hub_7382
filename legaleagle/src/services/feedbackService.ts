import { supabase } from '@/lib/supabase';

export interface FeedbackData {
    contract_type: string;
    recommendation_title: string;
    original_text: string;
    proposed_text: string;
    is_accurate: boolean;
    comment?: string;
}

/**
 * Submit explicit user feedback on an AI recommendation.
 */
export const submitRecommendationFeedback = async (data: FeedbackData): Promise<boolean> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || null;

        // Try to get an anonymous session ID from local storage if no user is logged in
        let sessionId = localStorage.getItem('anon_session_id');
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            localStorage.setItem('anon_session_id', sessionId);
        }

        const { error } = await supabase.from('analysis_feedback').insert({
            user_id: userId,
            session_id: sessionId,
            contract_type: data.contract_type || 'Unknown',
            recommendation_title: data.recommendation_title,
            original_text: data.original_text,
            proposed_text: data.proposed_text,
            is_accurate: data.is_accurate,
            comment: data.comment || null
        });

        if (error) {
            console.error('Failed to submit feedback:', error.message);
            return false;
        }
        
        return true;
    } catch (err) {
        console.error('Exception submitting feedback:', err);
        return false;
    }
};
