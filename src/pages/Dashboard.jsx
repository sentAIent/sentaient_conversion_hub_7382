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
        <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#12141A] to-[#1A1C24] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-conversion/10 rounded-full blur-[150px] pointer-events-none"></div>

            <Helmet>
                <title>Commander Dashboard | sentAIent.com</title>
                <meta name="description" content="Your personal command center for Interstellar progress and AI readiness assessment." />
            </Helmet>

            <div className="relative z-20">
                <Header />
            </div>

            <main className="pt-20 pb-16 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Welcome, Commander {currentUser?.displayName || 'Pilot'}
                        </h1>
                        <p className="text-white/60 mt-1">
                            Your personal command center and AI readiness assessment
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* AI Readiness Score Card */}
                        <div className="lg:col-span-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <Icon name="Brain" size={24} className="text-primary" />
                                        AI Readiness Score
                                    </h2>
                                    <span className={`text-5xl font-bold ${scoreInfo.color} drop-shadow-md`}>
                                        {scoreInfo.grade}
                                    </span>
                                </div>

                                {/* Score Circle */}
                                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                                    <div className="relative w-36 h-36 flex-shrink-0">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="72" cy="72" r="64"
                                                stroke="rgba(255,255,255,0.05)"
                                                strokeWidth="12"
                                                fill="none"
                                            />
                                            <circle
                                                cx="72" cy="72" r="64"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={`${aiScore.score * 4.02} 402`}
                                                className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-bold text-white">{aiScore.score}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <p className={`text-xl font-medium ${scoreInfo.color} mb-2`}>{scoreInfo.message}</p>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            Your gameplay patterns reveal key insights about your strategic thinking,
                                            adaptability, and decision-making — traits essential for AI leadership.
                                        </p>
                                    </div>
                                </div>

                                {/* Metrics Breakdown */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(aiScore.metrics).map(([key, value]) => (
                                        <div key={key} className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/5">
                                            <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">
                                                {key}
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <span className="text-2xl font-bold text-white">{Math.round(value)}</span>
                                                <span className="text-xs text-white/40 mb-1">/100</span>
                                            </div>
                                            <div className="w-full bg-black/40 rounded-full h-1.5 mt-3 overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${value}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="space-y-6">
                            {/* Credits Balance */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                                            <span className="text-2xl">💎</span>
                                        </div>
                                        <div>
                                            <div className="text-sm text-white/60 font-medium">Aether Credits</div>
                                            <div className="text-3xl font-bold text-white tracking-tight">
                                                {(userData?.aetherCredits || 0).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/interstellar">
                                        <Button variant="outline" fullWidth iconName="ShoppingCart" iconPosition="left" className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl transition-all">
                                            Get More Credits
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <h3 className="font-semibold text-white/80 mb-4 uppercase tracking-wider text-sm">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link to="/interstellar">
                                        <Button variant="default" fullWidth iconName="Rocket" iconPosition="left" className="bg-gradient-to-r from-conversion to-orange-500 hover:from-conversion/90 hover:to-orange-500/90 text-white border-0 h-12 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
                                            Continue Mission
                                        </Button>
                                    </Link>
                                    <Button variant="outline" fullWidth iconName="LogOut" iconPosition="left" onClick={handleLogout} className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all">
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Consulting Upsell Section */}
                    <div className="mt-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                                    <Icon name="Sparkles" size={14} />
                                    Based on Your AI Readiness
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
                                    Ready to Apply These Skills to Your Business?
                                </h3>
                                <p className="text-white/60 mb-8 text-lg leading-relaxed">
                                    Your gameplay shows {scoreInfo.message.toLowerCase()}.
                                    Imagine applying that same strategic mindset to transform your business with AI.
                                    Let's discuss how AI can accelerate your growth.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        iconName="Calendar"
                                        iconPosition="left"
                                        className="bg-white text-black hover:bg-gray-200 font-bold h-14 rounded-xl px-8 transition-all"
                                        onClick={() => window.open('https://sentaient.setmore.com/brian', '_blank')}
                                    >
                                        Book Strategy Call
                                    </Button>
                                    <Link to="/free-ai-assessment-portal" className="w-full sm:w-auto">
                                        <Button variant="outline" size="lg" iconName="ClipboardCheck" iconPosition="left" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-14 rounded-xl px-8 transition-all backdrop-blur-md">
                                            Take Assessment
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                                        <div className="text-4xl font-bold text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] mb-2">42%</div>
                                        <div className="text-sm font-medium text-white/60">Avg. cost reduction</div>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                                        <div className="text-4xl font-bold text-accent drop-shadow-[0_0_10px_rgba(var(--accent),0.5)] mb-2">3.5x</div>
                                        <div className="text-sm font-medium text-white/60">ROI in 6 months</div>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                                        <div className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)] mb-2">89%</div>
                                        <div className="text-sm font-medium text-white/60">Client satisfaction</div>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                                        <div className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)] mb-2">24h</div>
                                        <div className="text-sm font-medium text-white/60">Avg. response time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
