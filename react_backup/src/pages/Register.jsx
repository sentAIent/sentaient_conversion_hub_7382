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
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>Join the Fleet - sentAIent Conversion Hub</title>
            </Helmet>
            <Header />

            <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-brand">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                            <Icon name="UserPlus" size={32} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Join the Fleet</h1>
                        <p className="text-muted-foreground mt-2">Start your journey and earn Aether Credits</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-lg flex items-center space-x-2">
                            <Icon name="AlertTriangle" size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-foreground ml-1 uppercase tracking-wider">Commander Name</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                placeholder="Enter your callsign"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-foreground ml-1 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                placeholder="commander@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground ml-1 uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground ml-1 uppercase tracking-wider">Confirm</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-6">
                            <div className="flex items-center space-x-3 text-sm text-foreground font-medium">
                                <Icon name="Sparkles" size={18} className="text-accent" />
                                <span>Bonus: 1,000 Aether Credits included</span>
                            </div>
                        </div>

                        <Button
                            variant="default"
                            size="lg"
                            fullWidth
                            loading={loading}
                            type="submit"
                            className="bg-conversion hover:bg-conversion/90 text-white font-bold h-12 rounded-xl text-lg shadow-lg hover:shadow-brand/20 transition-all"
                        >
                            Complete Registration
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border text-center">
                        <p className="text-muted-foreground text-sm">
                            Already part of the fleet?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
