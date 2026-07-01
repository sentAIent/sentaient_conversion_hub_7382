import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/ui/Header';

const MagazinePage = () => {
    useEffect(() => {
        console.log("📖 [Magazine] Component mounted successfully.");
        // Diagnostic: Check for Header presence
        if (!document.querySelector('header')) {
            console.warn("⚠️ [Magazine] Header component not found in DOM after mount.");
        }
    }, []);

    // Safety guard for rendering
    try {

    const articles = [
        {
            title: "The Paradox of Progress",
            category: "Philosophy",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
            excerpt: "As we accelerate towards an agentic future, the distance between human intent and automated outcome narrows. But are we sacrificing the beauty of the struggle for the efficiency of the end?"
        },
        {
            title: "Simulating the Infinite",
            category: "Technology",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072",
            excerpt: "Inside the math of procedural generation. How Aether Engine creates persistent beauty from random seeds and deterministic physics."
        }
    ];

    return (
        <div className="min-h-screen bg-[#020205] text-white pt-24 pb-12">
            <Header />
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-20 text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-mono tracking-[0.3em] text-sm uppercase mb-4 block"
                    >
                        Edition 01 // Autumn 2025
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">MAGAZINE</span>
                    </motion.h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {articles.map((article, index) => (
                        <motion.article 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-8 border border-white/10">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest">
                                    {article.category}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mb-4 text-white/40 text-xs font-mono">
                                <span>{article.readTime}</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                <span>By Sentient Editorial</span>
                            </div>
                            <h2 className="text-3xl font-bold group-hover:text-primary transition-colors mb-4 leading-tight">
                                {article.title}
                            </h2>
                            <p className="text-white/60 leading-relaxed mb-6">
                                {article.excerpt}
                            </p>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );

    } catch (e) {
        console.error("❌ [Magazine] Rendering error:", e);
        return (
            <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center">
                <div className="text-center p-8 border border-red-500/20 rounded-xl bg-red-500/5">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Rendering Error</h2>
                    <p className="text-white/60 mb-6">Something went wrong while loading the Magazine.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
};

export default MagazinePage;
