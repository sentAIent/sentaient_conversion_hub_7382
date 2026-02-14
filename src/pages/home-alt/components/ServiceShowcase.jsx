import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceShowcase = () => {
    const services = [
        {
            title: "Agentic AI",
            description: "Autonomous agents that handle complex workflows, from research to execution.",
            icon: "Brain",
            color: "from-orange-500 to-red-600",
            features: ["Workflow Automation", "LLM Integration", "Autonomous Research"]
        },
        {
            title: "Software Dev",
            description: "Custom full-stack applications built for speed, scalability, and impact.",
            icon: "Code",
            color: "from-blue-500 to-indigo-600",
            features: ["React/Next.js", "Cloud Architecture", "API Ecosystems"]
        },
        {
            title: "Digital Marketing",
            description: "Data-driven strategies that convert attention into sustainable growth.",
            icon: "TrendingUp",
            color: "from-purple-500 to-pink-600",
            features: ["Conversion Optimization", "SEO Mastery", "Social Engineering"]
        }
    ];

    return (
        <section id="services" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">Our Services</h2>
                    <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-card border border-border p-8 rounded-3xl hover:bg-muted transition-all hover:-translate-y-2 overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                                <Icon name={service.icon} size={28} color="white" />
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3">
                                {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center text-sm text-foreground/80">
                                        <Icon name="Check" size={14} className="text-accent mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceShowcase;
