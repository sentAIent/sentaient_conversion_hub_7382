import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn("⚠️ Supabase environment variables are missing! Authentication and database features will fail.");
    try {
        const localLogs = JSON.parse(localStorage.getItem('supabase_failures') || '[]');
        localLogs.push({
            id: 'sys_' + Date.now().toString(),
            user_email: 'system',
            model_used: 'system',
            action_type: 'supabase_config_error',
            tokens_used: 0,
            status: 'failed',
            created_at: new Date().toISOString()
        });
        localStorage.setItem('supabase_failures', JSON.stringify(localLogs));
    } catch (e) {}
}

// Use placeholder values when env vars are missing to prevent createClient from
// throwing an "Invalid URL" error at module load time and crashing the entire app.
// Supabase calls will simply fail with network errors, which are handled gracefully.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
