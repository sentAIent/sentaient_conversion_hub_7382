import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

export default function AuthOverlay({ isOpen, onClose }) {
    const { login, signup, resetPassword } = useAuth();
    const [mode, setMode] = useState('login'); // login, signup, reset
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [lockoutTime, setLockoutTime] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (Date.now() < lockoutTime) {
            const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
            setError(`Too many attempts. Please try again in ${remaining} seconds.`);
            return;
        }

        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                await signup(email, password, username || email.split('@')[0]);
                onClose();
            } else if (mode === 'login') {
                await login(email, password);
                onClose();
            } else if (mode === 'reset') {
                await resetPassword(email);
                setSuccessMessage('Password reset email sent. Check your inbox.');
            }
        } catch (err) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 5) {
                setLockoutTime(Date.now() + 60000); // 1 minute lockout
                setError('Too many failed attempts. Account temporarily locked.');
            } else {
                setError(err.message || 'Failed to authenticate');
            }
        }
        
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-8"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <Icon name="X" size={20} />
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                            <Icon name="Lock" size={24} className="text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100">
                            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
                        </h2>
                        <p className="text-sm text-slate-400 mt-2">
                            {mode === 'login' ? 'Sign in to access your Agent Studio.' : 
                             mode === 'signup' ? 'Join to unlock infinite canvas capabilities.' : 
                             'Enter your email to receive a reset link.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm text-center">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
                                <input 
                                    type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="agent_master"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                        {mode !== 'reset' && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                                <input 
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <Button 
                            type="submit"
                            disabled={loading}
                            loading={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 mt-2"
                        >
                            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm">
                        {mode === 'login' ? (
                            <>
                                <button onClick={() => setMode('reset')} className="text-slate-400 hover:text-slate-300 block w-full mb-3">Forgot Password?</button>
                                <span className="text-slate-500">New here? </span>
                                <button onClick={() => setMode('signup')} className="text-blue-400 hover:text-blue-300 font-semibold">Sign Up</button>
                            </>
                        ) : mode === 'signup' ? (
                            <>
                                <span className="text-slate-500">Already have an account? </span>
                                <button onClick={() => setMode('login')} className="text-blue-400 hover:text-blue-300 font-semibold">Sign In</button>
                            </>
                        ) : (
                            <button onClick={() => setMode('login')} className="text-slate-400 hover:text-slate-300">Back to Login</button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
