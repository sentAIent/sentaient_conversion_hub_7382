import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: "url('/Users/infinitealpha/.gemini/antigravity/brain/5956a9dd-98b1-4f37-a07c-af5eb12dadad/sentaient_ai_hero_bg_1771097708947.png')" }}
            ></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black"></div>

            {/* Animated Particles (Simplified CSS animation) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-conversion rounded-full animate-pulse opacity-50"></div>
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-700 opacity-40"></div>
                <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000 opacity-30"></div>
            </div>

            <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 bg-conversion/10 border border-conversion/20 text-conversion px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-md">
                    <Icon name="Sparkles" size={16} />
                    <span>The Next Evolution of Digital Intelligence</span>
                </div>

                <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    AMPLIFYING <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-conversion via-orange-400 to-conversion">
                        HUMAN ACHIEVEMENT
                    </span>
                </h1>

                <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                    We architect intelligent, fully-integrated ecosystems that enhance human creativity,
                    accelerate decision-making, and unlock hidden enterprise value.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button
                        size="2xl"
                        className="bg-conversion hover:bg-conversion/90 text-white font-bold py-6 px-12 rounded-full shadow-lg shadow-conversion/20 transition-all hover:scale-105 active:scale-95"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        Explore Services
                    </Button>
                    <Button
                        variant="outline"
                        size="2xl"
                        className="border-white/20 text-white hover:bg-white/10 font-bold py-6 px-12 rounded-full backdrop-blur-md transition-all"
                        onClick={() => window.location.href = '#products'}
                    >
                        Our Products
                    </Button>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <Icon name="ChevronDown" size={32} color="white" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
