import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { stripHtml } from '../utils/sanitize';
import { z } from 'zod';
import { 
    Lock, Mail, User, Building, Map, 
    MessageCircle, Rocket, CheckCircle, Loader2, Plus, Wallet
} from 'lucide-react';

const emailSchema = z.string().email('Please enter a valid email address.');

const IcebreakerLanding = () => {
    const navigate = useNavigate();
    const { login, signup, resetPassword, currentUser } = useAuth();
    
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const [waitlistEmail, setWaitlistEmail] = useState('');
    const [waitlistLoading, setWaitlistLoading] = useState(false);
    const [waitlistSuccess, setWaitlistSuccess] = useState(false);
    const [waitlistError, setWaitlistError] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                window.location.href = '/icebreaker';
            } else {
                await signup(email, password, username);
                setMessage('Account created! Please check your email for a verification link.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('Please enter your email address first.');
            return;
        }
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for password reset instructions.');
        } catch (err) {
            setError('Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    const handleWaitlist = async (e) => {
        e.preventDefault();
        if (!waitlistEmail) return;
        setWaitlistError('');
        setWaitlistLoading(true);
        try {
            const sanitizedEmail = stripHtml(waitlistEmail).trim();
            emailSchema.parse(sanitizedEmail);

            await addDoc(collection(db, 'icebreaker_waitlist'), {
                email: sanitizedEmail,
                timestamp: new Date()
            });
            setWaitlistSuccess(true);
            setWaitlistEmail('');
        } catch (err) {
            console.error('Error joining waitlist:', err);
            if (err instanceof z.ZodError) {
                setWaitlistError(err.errors[0].message);
            } else {
                setWaitlistError('Could not save — please try again.');
            }
        } finally {
            setWaitlistLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
            <div className="flex-1 flex flex-col md:flex-row">
            
            {/* Left Side: Marketing */}
            <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-start relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-black to-teal-900/20">
                {/* Decorative glowing orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="z-10 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
                        Icebreaker
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
                        The Local Video & Commerce Super-App powering authentic connections, local discovery, and business growth.
                    </p>
                    <p className="text-sm text-orange-400/90 font-semibold mb-10 tracking-wide uppercase flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        100% Human · Zero AI · Real Conversations
                    </p>
                    
                    {/* Feature boxes — 2x2 grid with demo pill at intersection */}
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {/* TOP-LEFT: Live Social Map */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-teal-500/40 hover:bg-teal-500/5 transition-all">
                            <Map className="text-teal-400 mb-3 w-7 h-7" />
                            <h3 className="text-xl font-semibold mb-2">Live Social Map</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                See who's physically nearby in real-time. Color-coded status dots show exactly what each person is open to — before you approach them.
                            </p>
                        </div>
                        {/* TOP-RIGHT: Creator Wallet & Instant Payouts */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
                            <Wallet className="text-blue-400 mb-3 w-7 h-7" />
                            <h3 className="text-xl font-semibold mb-2">Creator Wallet & Instant Payouts</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Earn real money from local businesses via Bounties.
                            </p>
                        </div>
                        {/* BOTTOM-LEFT: TikTok-Style Local Feed */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-purple-500/40 hover:bg-purple-500/5 transition-all">
                            <MessageCircle className="text-purple-400 mb-3 w-7 h-7" />
                            <h3 className="text-xl font-semibold mb-2">TikTok-Style Local Feed</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Swipe up to explore your city in short-form video.
                            </p>
                        </div>
                        {/* BOTTOM-RIGHT: Icebreaker Ecosystem */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-orange-500/40 hover:bg-orange-500/5 transition-all">
                            <Rocket className="text-orange-400 mb-3 w-7 h-7" />
                            <h3 className="text-xl font-semibold mb-2">Icebreaker Ecosystem</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                One app for payments, socializing, and local discovery. The ultimate Super-App for your city.
                            </p>
                        </div>

                        {/* View App Demo — floats at the gap intersection */}
                        <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none z-20">
                            <button
                                onClick={() => {
                                    window.open('/icebreaker', '_blank');
                                }}
                                style={{transform: 'translateY(13px)'}}
                                className="pointer-events-auto relative group focus:outline-none"
                            >
                                {/* Left arm */}
                                <span style={{transition: 'width 0.3s ease'}} className="absolute top-1/2 -translate-y-1/2 right-full w-10 h-px bg-gradient-to-l from-blue-400/60 to-transparent group-hover:w-16 group-hover:from-blue-300/90"></span>
                                {/* Right arm */}
                                <span style={{transition: 'width 0.3s ease'}} className="absolute top-1/2 -translate-y-1/2 left-full w-10 h-px bg-gradient-to-r from-teal-400/60 to-transparent group-hover:w-16 group-hover:from-teal-300/90"></span>
                                {/* Top arm */}
                                <span style={{transition: 'height 0.3s ease'}} className="absolute left-1/2 -translate-x-1/2 bottom-full h-5 w-px bg-gradient-to-t from-blue-400/50 to-transparent group-hover:h-8 group-hover:from-blue-300/80"></span>
                                {/* Bottom arm */}
                                <span style={{transition: 'height 0.3s ease'}} className="absolute left-1/2 -translate-x-1/2 top-full h-5 w-px bg-gradient-to-b from-teal-400/50 to-transparent group-hover:h-8 group-hover:from-teal-300/80"></span>
                                {/* Glow */}
                                <span className="absolute -inset-4 rounded-full bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                {/* Pill */}
                                <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 group-hover:from-blue-500 group-hover:to-teal-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_32px_rgba(59,130,246,0.85)] group-hover:scale-105 transition-all duration-200">
                                    <Rocket className="w-3.5 h-3.5 text-white" />
                                    <span className="text-white text-xs font-bold tracking-wide whitespace-nowrap">View App Demo</span>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Right Side: Auth Portal */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-start items-center bg-black/80 border-l border-white/10">
                <div className="w-full max-w-md pt-6">

                    {/* Waitlist */}
                    <div style={{marginBottom: '4rem'}} className="bg-black/40 border border-orange-500/25 rounded-2xl p-5 relative">
                        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                        <h4 className="text-base font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                            Break the Ice Early 🔥 <span className="text-gray-400 text-xs font-normal">· Join waitlist for first access</span>
                        </h4>
                        {waitlistSuccess ? (
                            <div className="flex items-center text-orange-400 bg-orange-400/10 p-3 rounded-lg border border-orange-400/20">
                                <CheckCircle className="mr-2 w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">You're on the list! We'll notify you at launch.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleWaitlist} className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Your email"
                                        value={waitlistEmail}
                                        onChange={(e) => setWaitlistEmail(e.target.value)}
                                        className="flex-1 bg-black/50 border border-orange-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={waitlistLoading}
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_12px_rgba(249,115,22,0.4)] flex items-center"
                                    >
                                        {waitlistLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Join'}
                                    </button>
                                </div>
                                {waitlistError && (
                                    <p className="text-red-400 text-xs">{waitlistError}</p>
                                )}
                            </form>
                        )}
                    </div>

                    {/* Login Card */}
                    <div style={{marginBottom: '2.5rem'}} className="bg-white/5 border border-white/10 p-7 rounded-2xl backdrop-blur-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-1 text-center">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-400 text-center text-sm mb-6">
                            {isLogin ? 'Sign in to access your dashboard' : 'Join the Icebreaker network'}
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm text-center">
                                {message}
                            </div>
                        )}
                        {currentUser && !currentUser.emailVerified && (
                            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm text-center">
                                Please verify your email address to access all features. Check your inbox.
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-3">
                            {!isLogin && (
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold rounded-lg transition-all shadow-lg flex justify-center items-center"
                            >
                                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (isLogin ? 'Sign In' : 'Sign Up')}
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm text-gray-400 space-y-2">
                            {isLogin && (
                                <div>
                                    <button onClick={handleResetPassword} className="text-blue-400 hover:text-blue-300 transition-colors">
                                        Forgot your password?
                                    </button>
                                </div>
                            )}
                            <div>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div style={{height: '2.5rem'}}></div>

                    {/* No-AI Statement */}
                    <div className="bg-gradient-to-br from-orange-950/50 to-orange-900/20 border border-orange-500/30 rounded-2xl p-5 shadow-[0_0_30px_rgba(249,115,22,0.08)]">
                        <span className="text-orange-400 font-bold text-sm block mb-2 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            100% Real. 100% Human. No Exceptions.
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed mb-2">
                            Every video, audio clip, photo, and message is <strong className="text-orange-300">created directly inside the app</strong>. No upload button — by design. You can't import AI-generated content because you can't import anything. What you see is what someone actually made, right now.
                        </p>
                        <p className="text-xs text-gray-300 leading-relaxed mb-2">
                            No AI ghostwriters. No generated avatars. No synthetic voices. No filters on photos or videos. No AI-edited highlight reels. Just people, being people.
                        </p>
                        <p className="text-xs text-orange-400/80 font-medium">
                            AI bots are strictly prohibited. Icebreaker connects real humans — full stop.
                        </p>
                    </div>

                </div>
            </div>
            </div>

            {/* Footer with Engagement Color System */}
            <div className="w-full p-8 md:p-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                        Engagement Color System
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-3xl">
                        Set your status in-app with one tap. Others nearby see your dot color before approaching — no awkward guessing, just honest signals.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                            <p className="text-sm"><span className="text-green-400 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">💼</span> Green — Business &amp; Networking</span> <span className="text-gray-400">Open to professional connections, pitches, partnerships, or career conversations right now.</span></p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></span>
                            <p className="text-sm"><span className="text-orange-400 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">👋</span> Orange — Friendship</span> <span className="text-gray-400">Looking to meet new people, hang out, and make genuine social connections in the real world.</span></p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                            <p className="text-sm"><span className="text-red-400 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">❤️</span> Red — Love / Dating / Flirting</span> <span className="text-gray-400">Open to romantic connection. A clear, consensual signal so everyone knows the vibe before approaching.</span></p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                            <p className="text-sm"><span className="text-blue-400 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">🎧</span> Blue — Do Not Disturb</span> <span className="text-gray-400">Visible on the map but not open to new contact right now. Respects your space without going invisible.</span></p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
                            <p className="text-sm"><span className="text-yellow-400 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">✍️</span> Yellow — Custom</span> <span className="text-gray-400">You write it. Set any message from your settings — "looking for a chess partner", "ask me about my startup", anything goes.</span></p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-gray-600 border border-gray-500"></span>
                            <p className="text-sm"><span className="text-gray-300 font-semibold block mb-1 flex items-center gap-1.5"><span className="text-lg">👻</span> Ghost / Invisible Mode</span> <span className="text-gray-400">Location hidden. You browse the map but nobody sees you. One tap in the app to go dark — instant privacy, any time.</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IcebreakerLanding;
