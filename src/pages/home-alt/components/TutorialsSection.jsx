import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TutorialsSection = () => {
    const tutorials = [
        {
            title: "ROI Calculation Framework for AI Investments",
            type: "Whitepaper",
            duration: "30 Min Read",
            thumbnail: "bg-blue-900/40",
            description: "Learn how to build compelling business cases for AI projects with proven ROI methodologies.",
            category: "fundamentals"
        },
        {
            title: "AI Implementation Roadmap for Healthcare",
            type: "Guide",
            duration: "45 Min Read",
            thumbnail: "bg-orange-900/40",
            description: "A comprehensive journey from strategy to deployment in complex healthcare settings.",
            category: "implementation"
        },
        {
            title: "Conversational AI Best Practices",
            type: "Webinar",
            duration: "60 Min",
            thumbnail: "bg-teal-900/40",
            description: "Expert insights on designing and optimizing chatbots for strategic business success.",
            category: "best-practices"
        },
        {
            title: "Predictive Maintenance Case Study",
            type: "Case Study",
            duration: "25 Min Read",
            thumbnail: "bg-purple-900/40",
            description: "Real-world implementation story showing 40% reduction in equipment downtime.",
            category: "industry-specific"
        }
    ];

    return (
        <section className="py-24 bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">Academy & Demos</h2>
                        <p className="text-muted-foreground">Knowledge is the foundation of transformation. Explore our implementation guides and technical breakdowns.</p>
                    </div>
                    <Link to="/knowledge-nexus-resource-library" className="text-accent font-bold flex items-center hover:underline group">
                        View All Resources <Icon name="ArrowRight" size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutorials.map((item, idx) => (
                        <Link
                            key={idx}
                            to="/knowledge-nexus-resource-library"
                            className="group cursor-pointer"
                        >
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TutorialsSection;
