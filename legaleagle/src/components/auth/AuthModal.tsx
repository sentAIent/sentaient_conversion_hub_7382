import React, { useState } from 'react';
import { X, Loader2, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSSO, setIsSSO] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSSO) {
                if (!domain) throw new Error('Please enter your company domain.');
                // Trigger SSO
                const { error } = await supabase.auth.signInWithSSO({
                    domain: domain,
                });
                if (error) throw error;
                // SSO redirects to IdP, so we don't close modal here
            } else if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Account created successfully! You can now log in.');
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onClose();
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">
                        {isSSO ? 'Enterprise Login' : isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        {isSSO ? (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Domain</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="lawfirm.com"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="you@lawfirm.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {isSSO ? 'Continue with SSO' : isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col gap-2 text-center text-sm text-slate-500">
                        <div>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                onClick={() => { setIsSignUp(!isSignUp); setIsSSO(false); }}
                                className="text-blue-600 font-bold hover:underline"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => { setIsSSO(!isSSO); setIsSignUp(false); }}
                                className="text-slate-600 font-medium hover:underline flex items-center justify-center gap-1 w-full mt-2"
                            >
                                {isSSO ? 'Use Email/Password instead' : 'Log in with Enterprise SSO'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
