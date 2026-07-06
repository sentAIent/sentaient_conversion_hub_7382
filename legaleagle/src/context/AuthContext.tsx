import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface UserProfile {
    id: string;
    is_premium: boolean;
    subscription_tier: string;
    drafts_limit: number;
    drafts_used: number;
    reviews_limit: number;
    reviews_used: number;
    n8n_webhook_url: string | null;
    current_team_id?: string | null;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    isPremium: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, is_premium, subscription_tier, drafts_limit, drafts_used, reviews_limit, reviews_used, n8n_webhook_url')
            .eq('id', userId)
            .single();
            
        if (!error && data) {
            setIsPremium(data.is_premium);
            setProfile(data as UserProfile);
        } else {
            setIsPremium(false);
            setProfile(null);
        }
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id);
        }
    };

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id).then(() => setLoading(false));
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id).then(() => setLoading(false));
                } else {
                    setIsPremium(false);
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        if (!isSupabaseConfigured) return;
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, profile, isPremium, loading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

