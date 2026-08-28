import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import { Helmet } from 'react-helmet';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/interstellar');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#12141A] to-[#1A1C24] flex flex-col relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-conversion/20 rounded-full blur-[120px] pointer-events-none"></div>

            <Helmet>
                <title>Login - sentAIent Conversion Hub</title>
            </Helmet>
            <div className="relative z-20">
                <Header />
            </div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-8 relative z-10">
                <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-4 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                                <Icon name="User" size={32} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                            <p className="text-white/60 mt-2">Access your AI fleet and strategic data</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-xl flex items-center space-x-2 backdrop-blur-md">
                                <Icon name="AlertTriangle" size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md"
                                    placeholder="commander@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-white/80">Password</label>
                                    <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:text-primary/80 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md"
                                    placeholder="••••••••"
                                />
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                fullWidth
                                loading={loading}
                                type="submit"
                                className="bg-gradient-to-r from-conversion to-orange-500 hover:from-conversion/90 hover:to-orange-500/90 text-white font-bold h-12 rounded-xl text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all border-0"
                            >
                                Log In
                            </Button>
                        </form>

                        <div className="mt-8 flex items-center">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-3 text-xs text-white/40 uppercase tracking-wider font-semibold">Enterprise</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div>

                        <div className="mt-6">
                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                type="button"
                                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 h-12 rounded-xl text-md flex items-center justify-center gap-3 transition-all backdrop-blur-md"
                                onClick={() => {
                                    console.log("Initiate SAML/SSO flow via Firebase/Azure AD");
                                    alert("Enterprise SSO redirect initiated...");
                                }}
                            >
                                <svg className="w-5 h-5 text-[#00a4ef]" viewBox="0 0 23 23" fill="currentColor">
                                    <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
                                </svg>
                                Sign in with Microsoft
                            </Button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
                            <p className="text-white/60 text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                    Create Account
                                </Link>
                            </p>
                            <div className="flex justify-center gap-4 text-xs text-white/40">
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                                <span>|</span>
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
