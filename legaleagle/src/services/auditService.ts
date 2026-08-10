import { supabase } from '@/lib/supabase';

export const logAuditAction = async (teamId: string | null, userId: string | undefined, action: string, details: any = {}) => {
    // Only log if the user belongs to a team and is authenticated
    if (!teamId || !userId) return;

    try {
        const { error } = await supabase.from('audit_logs').insert([
            {
                team_id: teamId,
                user_id: userId,
                action,
                details
            }
        ]);

        if (error) {
            console.error('Failed to write audit log:', error);
        }
    } catch (e) {
        console.error('Audit Log Exception:', e);
    }
};

export const fetchAuditLogs = async (teamId: string) => {
    try {
        const { data, error } = await supabase
            .from('audit_logs')
            .select(`
                id,
                action,
                details,
                created_at,
                profiles ( email, full_name )
            `)
            .eq('team_id', teamId)
            .order('created_at', { ascending: false })
            .limit(100);
            
        if (error) throw error;
        
        // Supabase foreign key to auth.users via profiles is a common pattern,
        // but if profiles isn't directly linked in the query, we might need a custom view.
        // Assuming profiles is joined via user_id.
        return data || [];
    } catch (e) {
        console.error('Failed to fetch audit logs:', e);
        return [];
    }
};
