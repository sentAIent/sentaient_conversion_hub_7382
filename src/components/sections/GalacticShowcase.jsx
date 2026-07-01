import React from 'react';
import { motion } from 'framer-motion';

const GalacticShowcase = () => {
    const showcases = [
        {
            title: "Mindwave Lotus Restoration",
            description: "Harness tactical restoration. Collect the Lotus to instantly replenish 50% Shield and 25% Hull while triggering a temporary invulnerability buffer.",
            src: "/assets/interstellar/lotus_restoration.webp",
            accent: "hsla(280, 100%, 70%, 1)"
        },
        {
            title: "Deep Space Navigation",
            description: "Explore a procedurally generated galaxy with realistic physics, orbital mechanics, and dynamic hazard encounters.",
            src: "/assets/interstellar/gameplay_loop.webp",
            accent: "hsla(190, 100%, 70%, 1)"
        }
    ];

    return (
        <section className="py-24 bg-[#020205] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        The <span className="text-primary">Interstellar</span> Experience
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        Witness the pinnacle of agentic space exploration. High-fidelity rendering meets complex tactical decision-making in a vast, persistent universe.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {showcases.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl"
                            style={{ 
                                boxShadow: item.accent.match(/\d+/g) 
                                    ? `0 0 40px hsla(${item.accent.match(/\d+/g)[0]}, ${item.accent.match(/\d+/g)[1]}%, ${item.accent.match(/\d+/g)[2]}%, 0.07)` 
                                    : 'none' 
                            }}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img 
                                    src={item.src} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60"></div>
                            </div>
                            
                            <div className="p-8 relative">
                                <div 
                                    className="absolute -top-1 left-8 w-12 h-1 rounded-full"
                                    style={{ backgroundColor: item.accent, boxShadow: `0 0 10px ${item.accent}` }}
                                ></div>
                                <h3 className="text-2xl font-bold mb-3 tracking-wide">{item.title}</h3>
                                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                                    {item.description}
                                </p>
                                
                                <div className="mt-6 flex items-center space-x-4">
                                    <div className="h-[1px] flex-grow bg-white/10"></div>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Cinematic Feed 0.9.4</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 p-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-2xl"
                >
                    <div className="bg-[#020205] rounded-[14px] p-10 text-center border border-white/5">
                        <h4 className="text-xl font-semibold mb-2">Ready for Lift-off?</h4>
                        <p className="text-white/50 mb-8 max-w-lg mx-auto italic">
                            The Aether Map awaits your first placement. Coordinate, navigate, and claim your sector.
                        </p>
                        <a 
                            href="/interstellar"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-secondary font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                        >
                            ENTER THE COSMOS
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GalacticShowcase;
