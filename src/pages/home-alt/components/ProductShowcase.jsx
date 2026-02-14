import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductShowcase = () => {
    return (
        <section id="products" className="py-24 bg-secondary">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">Flagship Products</h2>
                    <p className="text-muted-foreground text-lg">Tools designed to reshape human perception and productivity.</p>
                </div>

                <div className="space-y-24">
                    {/* Mindwave */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <Icon name="Activity" size={24} className="text-blue-400" />
                                </div>
                                <h3 className="text-4xl font-black text-foreground tracking-tight">MindWave</h3>
                            </div>
                            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                                Advanced brainwave entrainment studio. Utilize binaural beats, isochronic tones, and neural-sync visuals
                                to reach deep states of flow, meditation, or focus instantly.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {["Neural Sync", "8D Audio", "Gamma Flow", "Sleep Tech"].map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Button
                                size="xl"
                                className="bg-accent hover:bg-accent/90 text-background px-8 rounded-xl"
                                onClick={() => window.location.href = '/mindwave'}
                            >
                                Launch Studio
                            </Button>
                        </div>
                        <div className="order-1 lg:order-2 relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                src="/Users/infinitealpha/.gemini/antigravity/brain/5956a9dd-98b1-4f37-a07c-af5eb12dadad/mindwave_showcase_bg_1771097724351.png"
                                alt="Mindwave Showcase"
                                className="rounded-3xl border border-white/10 shadow-2xl relative z-10 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Interstellar */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="aspect-video bg-card rounded-3xl border border-border flex items-center justify-center relative z-10 overflow-hidden">
                                {/* Placeholder for Interstellar since image gen failed, using a stylish gradients */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary"></div>
                                <Icon name="Globe" size={100} className="text-accent/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <Icon name="Navigation" size={48} className="text-accent mb-4 animate-pulse" />
                                        <p className="text-accent font-mono text-sm tracking-[0.3em]">MAPPING THE COSMOS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                                    <Icon name="Send" size={24} className="text-accent" />
                                </div>
                                <h3 className="text-4xl font-black text-foreground tracking-tight">Interstellar</h3>
                            </div>
                            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                                Aether Map - Pre-Placement Cartographer. An interactive deep space exploration engine.
                                Chart the unknown, map the aether, and navigate the void with cinematic precision.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {["Space Cartography", "Procedural Void", "Stellar Flux", "Cosmic UI"].map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Button
                                size="xl"
                                className="bg-accent hover:bg-accent/90 text-background px-8 rounded-xl"
                                onClick={() => window.location.href = '/interstellar'}
                            >
                                Enter Void
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
