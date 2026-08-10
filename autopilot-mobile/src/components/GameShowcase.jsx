import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Icon from './AppIcon';

const GameShowcase = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4">
                        <Icon name="Gamepad2" size={16} />
                        Interactive Experience
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Aether Map</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Navigate the cosmos, mine valuable resources, and upgrade your ship.
                        Your strategic decisions reveal your AI leadership potential.
                    </p>
                </div>

                {/* Game Preview Card */}
                <div className="relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-50" />

                    <div className="relative bg-card/80 backdrop-blur-lg border border-border rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Left: Game Preview */}
                            <div className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-8">
                                {/* Animated Stars Background */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(50)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                                animationDelay: `${Math.random() * 3}s`,
                                                opacity: Math.random() * 0.8 + 0.2
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Spaceship Preview */}
                                <div className="relative z-10 text-center">
                                    <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                                        🚀
                                    </div>
                                    <div className="text-white/80 font-medium">
                                        Click to Start Your Mission
                                    </div>
                                </div>

                                {/* Play Button Overlay */}
                                <Link
                                    to="/interstellar"
                                    className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors group cursor-pointer"
                                >
                                    <div className="w-20 h-20 bg-conversion rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Icon name="Play" size={32} className="text-white ml-1" />
                                    </div>
                                </Link>
                            </div>

                            {/* Right: Features & CTA */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-foreground mb-6">
                                    Your AI Journey Starts Here
                                </h3>

                                {/* Feature List */}
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon name="Check" size={14} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">Strategic Resource Mining</div>
                                            <div className="text-sm text-muted-foreground">Navigate asteroid fields and collect valuable minerals</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon name="Check" size={14} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">Ship Upgrades & Progression</div>
                                            <div className="text-sm text-muted-foreground">Invest in speed, armor, and weapons to conquer the cosmos</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon name="Check" size={14} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">AI Readiness Assessment</div>
                                            <div className="text-sm text-muted-foreground">Your gameplay reveals insights about your strategic thinking</div>
                                        </div>
                                    </li>
                                </ul>

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">10K+</div>
                                        <div className="text-xs text-muted-foreground">Active Pilots</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-accent">50M+</div>
                                        <div className="text-xs text-muted-foreground">Credits Earned</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">4.8★</div>
                                        <div className="text-xs text-muted-foreground">User Rating</div>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-wrap gap-3">
                                    <Link to="/interstellar" className="flex-1">
                                        <Button
                                            variant="default"
                                            fullWidth
                                            iconName="Rocket"
                                            iconPosition="left"
                                            className="bg-conversion hover:bg-conversion/90"
                                        >
                                            Play Now — Free
                                        </Button>
                                    </Link>
                                    <Link to="/register" className="flex-1">
                                        <Button
                                            variant="outline"
                                            fullWidth
                                            iconName="UserPlus"
                                            iconPosition="left"
                                        >
                                            Create Account
                                        </Button>
                                    </Link>
                                </div>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    No download required. Play instantly in your browser.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameShowcase;
