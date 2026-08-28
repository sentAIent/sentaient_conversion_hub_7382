import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import { Helmet } from 'react-helmet';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, username);
            navigate('/interstellar');
        } catch (err) {
            setError('Failed to create an account. ' + (err.message || ''));
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
                <title>Join the Fleet - sentAIent Conversion Hub</title>
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
                                <Icon name="UserPlus" size={32} className="text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Join the Fleet</h1>
                            <p className="text-white/60 mt-2">Start your journey and earn Aether Credits</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-xl flex items-center space-x-2 backdrop-blur-md">
                                <Icon name="AlertTriangle" size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-white/80 ml-1 uppercase tracking-wider">Commander Name</label>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium backdrop-blur-md"
                                    placeholder="Enter your callsign"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-white/80 ml-1 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium backdrop-blur-md"
                                    placeholder="commander@example.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-white/80 ml-1 uppercase tracking-wider">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium backdrop-blur-md"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-white/80 ml-1 uppercase tracking-wider">Confirm</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium backdrop-blur-md"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 mb-6 backdrop-blur-md shadow-[inset_0_0_20px_rgba(var(--primary),0.1)]">
                                <div className="flex items-center space-x-3 text-sm text-white font-medium">
                                    <Icon name="Sparkles" size={18} className="text-primary" />
                                    <span>Bonus: 1,000 Aether Credits included</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2 mb-4">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    required
                                    className="mt-1 bg-black/40 border-white/10 rounded text-primary focus:ring-primary/50" 
                                />
                                <label htmlFor="terms" className="text-xs text-white/60">
                                    I agree to the <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</Link>.
                                </label>
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                fullWidth
                                loading={loading}
                                type="submit"
                                className="bg-gradient-to-r from-conversion to-orange-500 hover:from-conversion/90 hover:to-orange-500/90 text-white font-bold h-12 rounded-xl text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all border-0 mt-2"
                            >
                                Complete Registration
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
                            <p className="text-white/60 text-sm">
                                Already part of the fleet?{' '}
                                <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                    Log In
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

export default Register;
