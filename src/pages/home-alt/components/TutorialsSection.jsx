import React from 'react';
import Icon from '../../../components/AppIcon';

const TutorialsSection = () => {
    const tutorials = [
        {
            title: "Mastering Binaural Frequency Mixing",
            type: "Video Tutorial",
            duration: "12:05",
            thumbnail: "bg-blue-900/40",
            description: "Learn how to layer carrier frequencies and offsets for specific cognitive outcomes."
        },
        {
            title: "AI Agent Workflow Orchestration",
            type: "Case Study",
            duration: "8 Min Read",
            thumbnail: "bg-orange-900/40",
            description: "A deep dive into how we built an autonomous research agent for a Fortune 500 client."
        },
        {
            title: "Navigation in Interstellar Aether",
            type: "UI Demo",
            duration: "5:30",
            thumbnail: "bg-teal-900/40",
            description: "Understanding the coordinate system and flux sensors in the Interstellar map engine."
        },
        {
            title: "Digital Marketing: The conversion loop",
            type: "Expert Insight",
            duration: "15 Min",
            thumbnail: "bg-purple-900/40",
            description: "How behavior-triggered automation triples conversion rates on landing pages."
        }
    ];

    return (
        <section className="py-24 bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">Academy & Demos</h2>
                        <p className="text-muted-foreground">Knowledge is the foundation of transformation. Explore our guides and technical breakdowns.</p>
                    </div>
                    <button className="text-accent font-bold flex items-center hover:underline">
                        View All Resources <Icon name="ArrowRight" size={20} className="ml-2" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutorials.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className={`aspect-video ${item.thumbnail} rounded-2xl mb-4 border border-border relative overflow-hidden flex items-center justify-center transition-all group-hover:border-accent/40`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                                <Icon name="PlayCircle" size={48} className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/60 backdrop-blur-md rounded text-[10px] text-foreground/80 font-mono">
                                    {item.duration}
                                </div>
                            </div>
                            <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">{item.type}</p>
                            <h4 className="text-foreground font-bold group-hover:text-accent transition-colors mb-2 leading-tight">
                                {item.title}
                            </h4>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TutorialsSection;
