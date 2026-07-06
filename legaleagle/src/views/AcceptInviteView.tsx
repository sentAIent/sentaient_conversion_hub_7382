import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

export const AcceptInviteView: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [status, setStatus] = useState<'loading' | 'auth_required' | 'processing' | 'success' | 'error'>('loading');
    const [errorMsg, setErrorMsg] = useState('');
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMsg('Invalid or missing invitation token.');
            return;
        }

        if (!user) {
            setStatus('auth_required');
            return;
        }

        handleAcceptInvite();
    }, [user, token]);

    const handleAcceptInvite = async () => {
        setStatus('processing');
        try {
            const { data, error } = await supabase.functions.invoke('accept-invite', {
                body: { token }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setStatus('success');
            
            // Redirect to main app after a short delay
            setTimeout(() => {
                navigate('/');
                // Optionally reload to ensure context is fresh
                window.location.reload();
            }, 2000);
            
        } catch (err: any) {
            console.error('Failed to accept invite:', err);
            setStatus('error');
            setErrorMsg(err.message || 'Failed to accept invitation. It may have expired or been revoked.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                    <Shield className="w-8 h-8" />
                </div>
                
                <h1 className="text-2xl font-bold text-slate-900">Team Invitation</h1>

                {status === 'loading' && (
                    <div className="space-y-4">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-slate-500">Verifying invitation...</p>
                    </div>
                )}

                {status === 'auth_required' && (
                    <div className="space-y-4">
                        <p className="text-slate-600">
                            You have been invited to join a workspace on Legal Eagle. 
                            Please sign in or create an account with the invited email address to accept.
                        </p>
                        <button
                            onClick={() => setShowAuth(true)}
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Sign In / Sign Up
                        </button>
                    </div>
                )}

                {status === 'processing' && (
                    <div className="space-y-4">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-slate-500">Adding you to the team...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <p className="text-slate-900 font-medium">Successfully joined the team!</p>
                        <p className="text-sm text-slate-500">Redirecting you to your workspace...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <p className="text-red-600 font-medium">{errorMsg}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-2 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors mt-4"
                        >
                            Go to Homepage
                        </button>
                    </div>
                )}
            </div>

            <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
            />
        </div>
    );
};
