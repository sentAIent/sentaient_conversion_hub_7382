import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// AI Readiness Score calculation based on game metrics
const calculateAIReadinessScore = (userData) => {
    if (!userData) return { score: 0, metrics: {} };

    const metrics = {
        efficiency: Math.min(100, (userData.totalCreditsEarned || 0) / 100),
        persistence: Math.min(100, (userData.totalPlayTime || 0) / 60),
        strategy: Math.min(100, (userData.upgradesUnlocked || 0) * 15),
        adaptability: Math.min(100, (userData.hazardsAvoided || 0) * 5),
    };

    const score = Math.round(
        (metrics.efficiency * 0.25) +
        (metrics.persistence * 0.25) +
        (metrics.strategy * 0.30) +
        (metrics.adaptability * 0.20)
    );

    return { score: Math.min(100, score), metrics };
};

const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-400', message: 'Exceptional AI Leadership Potential' };
    if (score >= 80) return { grade: 'A', color: 'text-green-500', message: 'Strong Strategic Thinking' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-400', message: 'Good Problem-Solving Skills' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Developing Strategic Mindset' };
    return { grade: 'D', color: 'text-orange-400', message: 'Early Stage Explorer' };
};

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiScore, setAiScore] = useState({ score: 0, metrics: {} });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) {
                navigate('/login');
                return;
            }

            try {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    setAiScore(calculateAIReadinessScore(data));
                }
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const scoreInfo = getScoreGrade(aiScore.score);

    return (
        <>
            <Helmet>
                <title>Commander Dashboard | sentAIent.com</title>
                <meta name="description" content="Your personal command center for Interstellar progress and AI readiness assessment." />
            </Helmet>

            <Header />

            <main className="pt-20 pb-16 px-4 min-h-screen bg-gradient-to-b from-background to-muted/30">
                <div className="max-w-6xl mx-auto">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Welcome, Commander {currentUser?.displayName || 'Pilot'}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Your personal command center and AI readiness assessment
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* AI Readiness Score Card */}
                        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                    <Icon name="Brain" size={24} className="text-primary" />
                                    AI Readiness Score
                                </h2>
                                <span className={`text-4xl font-bold ${scoreInfo.color}`}>
                                    {scoreInfo.grade}
                                </span>
                            </div>

                            {/* Score Circle */}
                            <div className="flex items-center gap-8 mb-6">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="64" cy="64" r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            className="text-muted"
                                        />
                                        <circle
                                            cx="64" cy="64" r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={`${aiScore.score * 3.52} 352`}
                                            className="text-primary"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-foreground">{aiScore.score}</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className={`text-lg font-medium ${scoreInfo.color} mb-2`}>{scoreInfo.message}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Your gameplay patterns reveal key insights about your strategic thinking,
                                        adaptability, and decision-making — traits essential for AI leadership.
                                    </p>
                                </div>
                            </div>

                            {/* Metrics Breakdown */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(aiScore.metrics).map(([key, value]) => (
                                    <div key={key} className="bg-muted/50 rounded-lg p-3">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                            {key}
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-foreground">{Math.round(value)}</span>
                                            <span className="text-xs text-muted-foreground mb-1">/100</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                                            <div
                                                className="bg-primary h-full rounded-full transition-all duration-500"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="space-y-6">
                            {/* Credits Balance */}
                            <div className="bg-card border border-border rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💎</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Aether Credits</div>
                                        <div className="text-2xl font-bold text-foreground">
                                            {(userData?.aetherCredits || 0).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <Link to="/interstellar">
                                    <Button variant="outline" fullWidth iconName="ShoppingCart" iconPosition="left">
                                        Get More Credits
                                    </Button>
                                </Link>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-card border border-border rounded-xl p-5">
                                <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
                                <div className="space-y-2">
                                    <Link to="/interstellar">
                                        <Button variant="default" fullWidth iconName="Rocket" iconPosition="left" className="bg-conversion hover:bg-conversion/90">
                                            Continue Mission
                                        </Button>
                                    </Link>
                                    <Button variant="outline" fullWidth iconName="LogOut" iconPosition="left" onClick={handleLogout}>
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Consulting Upsell Section */}
                    <div className="mt-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                                    <Icon name="Sparkles" size={14} />
                                    Based on Your AI Readiness Score
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">
                                    Ready to Apply These Skills to Your Business?
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Your gameplay shows {scoreInfo.message.toLowerCase()}.
                                    Imagine applying that same strategic mindset to transform your business with AI.
                                    Let's discuss how AI can accelerate your growth.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="default"
                                        iconName="Calendar"
                                        iconPosition="left"
                                        className="bg-conversion hover:bg-conversion/90"
                                        onClick={() => window.open('https://sentaient.setmore.com/brian', '_blank')}
                                    >
                                        Book Free Strategy Call
                                    </Button>
                                    <Link to="/free-ai-assessment-portal">
                                        <Button variant="outline" iconName="ClipboardCheck" iconPosition="left">
                                            Take Full AI Assessment
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-4">
                                        <div className="text-3xl font-bold text-primary">42%</div>
                                        <div className="text-sm text-muted-foreground">Avg. cost reduction</div>
                                    </div>
                                    <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-4">
                                        <div className="text-3xl font-bold text-accent">3.5x</div>
                                        <div className="text-sm text-muted-foreground">ROI in 6 months</div>
                                    </div>
                                    <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-4">
                                        <div className="text-3xl font-bold text-green-400">89%</div>
                                        <div className="text-sm text-muted-foreground">Client satisfaction</div>
                                    </div>
                                    <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-4">
                                        <div className="text-3xl font-bold text-blue-400">24h</div>
                                        <div className="text-sm text-muted-foreground">Avg. response time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
