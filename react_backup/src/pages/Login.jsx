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
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>Login - sentAIent Conversion Hub</title>
            </Helmet>
            <Header />

            <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-brand">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                            <Icon name="User" size={32} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                        <p className="text-muted-foreground mt-2">Access your AI fleet and strategic data</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm rounded-lg flex items-center space-x-2">
                            <Icon name="AlertTriangle" size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="commander@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-foreground">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:text-primary/80 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button
                            variant="default"
                            size="lg"
                            fullWidth
                            loading={loading}
                            type="submit"
                            className="bg-conversion hover:bg-conversion/90 text-white font-bold h-12 rounded-xl text-lg shadow-lg hover:shadow-brand/20 transition-all"
                        >
                            Log In
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border text-center">
                        <p className="text-muted-foreground text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
