import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIPhilosophySection = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophyPrinciples = [
    {
      icon: "Heart",
      title: "Human Augmentation, Not Replacement",
      description: "AI should amplify human capabilities, creativity, and decision-making rather than replace human judgment and empathy.",
      details: `We believe the future belongs to human-AI collaboration, where artificial intelligence handles routine tasks while humans focus on strategic thinking, creative problem-solving, and relationship building. Our implementations are designed to enhance human potential, not diminish it.`,
      examples: [
        "AI handles data analysis, humans make strategic decisions",
        "Chatbots manage routine inquiries, humans handle complex relationships",
        "Automation streamlines processes, humans drive innovation"
      ]
    },
    {
      icon: "Shield",
      title: "Ethical AI Implementation",
      description: "Every AI system must operate with transparency, fairness, and accountability as core design principles.",
      details: `We implement comprehensive ethical frameworks that ensure AI systems are transparent in their decision-making, free from harmful biases, and accountable to human oversight. Our ethical AI approach builds trust and ensures sustainable long-term success.`,
      examples: [
        "Bias detection and mitigation in all AI models",
        "Transparent decision-making processes",
        "Human oversight and intervention capabilities"
      ]
    },
    {
      icon: "Target",
      title: "Business Value First",
      description: "Technology implementation must deliver measurable business outcomes and clear return on investment.",
      details: `We prioritize practical business value over technological novelty. Every AI initiative begins with clear success metrics and ROI projections. Our approach ensures that AI investments deliver tangible benefits that justify the implementation effort and cost.`,
      examples: [
        "ROI-focused project planning and execution",
        "Measurable KPIs for every AI implementation",
        "Business outcome validation at every milestone"
      ]
    },
    {
      icon: "Users",
      title: "Collaborative Partnership",
      description: "Success requires genuine partnership between AI consultants, internal teams, and organizational leadership.",
      details: `We work as an extension of your team, not as external vendors. Our collaborative approach ensures knowledge transfer, builds internal capabilities, and creates sustainable AI practices that continue delivering value long after implementation.`,
      examples: [
        "Joint planning and decision-making processes",
        "Knowledge transfer and team training programs",
        "Ongoing support and optimization partnerships"
      ]
    },
    {
      icon: "Lightbulb",
      title: "Continuous Learning & Adaptation",
      description: "AI systems and strategies must evolve continuously based on performance data and changing business needs.",
      details: `We build adaptive AI systems that learn and improve over time. Our approach includes continuous monitoring, performance optimization, and strategic adjustments to ensure AI implementations remain effective as business conditions change.`,
      examples: [
        "Continuous model performance monitoring",
        "Regular strategy reviews and adjustments",
        "Adaptive learning from user feedback and data"
      ]
    },
    {
      icon: "Lock",
      title: "Privacy & Security by Design",
      description: "Data protection and system security are fundamental requirements, not optional add-ons.",
      details: `We implement privacy and security measures from the ground up, not as afterthoughts. Our approach ensures compliance with data protection regulations while maintaining the functionality and effectiveness of AI systems.`,
      examples: [
        "End-to-end data encryption and protection",
        "Compliance with GDPR, CCPA, and industry standards",
        "Regular security audits and vulnerability assessments"
      ]
    }
  ];

  const ethicalFramework = [
    {
      stage: "Assessment",
      title: "Ethical Impact Analysis",
      description: "Comprehensive evaluation of potential ethical implications before implementation.",
      icon: "Search"
    },
    {
      stage: "Design",
      title: "Bias Mitigation Planning",
      description: "Proactive identification and prevention of algorithmic bias in system design.",
      icon: "Shield"
    },
    {
      stage: "Implementation",
      title: "Transparency Integration",
      description: "Building explainable AI systems with clear decision-making processes.",
      icon: "Eye"
    },
    {
      stage: "Monitoring",
      title: "Continuous Oversight",
      description: "Ongoing monitoring for ethical compliance and performance optimization.",
      icon: "Activity"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-primary font-semibold text-lg">Our AI Philosophy</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Principles That Guide
            <span className="block text-primary">Every AI Decision</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our approach to AI is grounded in ethical principles, business pragmatism, and human-centered design. These core beliefs shape every recommendation, implementation, and partnership.
          </p>
        </div>

        {/* Philosophy Principles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {philosophyPrinciples?.map((principle, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                activePhilosophy === index 
                  ? 'shadow-elevation ring-2 ring-primary/20' 
                  : 'shadow-subtle hover:shadow-elevation'
              }`}
              onClick={() => setActivePhilosophy(activePhilosophy === index ? -1 : index)}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={principle?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {principle?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle?.description}
                  </p>
                </div>
              </div>

              {activePhilosophy === index && (
                <div className="space-y-6 pt-6 border-t border-border">
                  <p className="text-foreground leading-relaxed">
                    {principle?.details}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Practical Examples:</h4>
                    <ul className="space-y-2">
                      {principle?.examples?.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start space-x-3">
                          <Icon name="CheckCircle" size={16} color="var(--color-conversion)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>{activePhilosophy === index ? 'Show less' : 'Learn more'}</span>
                  <Icon 
                    name={activePhilosophy === index ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="ml-2 transition-transform duration-300" 
                  />
                </div>
                
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">
                    {String(index + 1)?.padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Framework */}
        <div className="bg-muted/50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Ethical AI Framework
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to ensuring every AI implementation meets the highest ethical standards while delivering business value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ethicalFramework?.map((stage, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < ethicalFramework?.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border z-0"></div>
                )}
                
                <div className="relative bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevation transition-all duration-300 z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={stage?.icon} size={24} color="var(--color-primary)" />
                  </div>
                  
                  <div className="text-sm font-semibold text-primary mb-2">
                    {stage?.stage}
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    {stage?.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stage?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Experience Ethical AI Implementation?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how our philosophy translates into practical AI solutions that align with your values and business objectives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Icon name="Calendar" size={20} />
                <span>Schedule Philosophy Discussion</span>
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Icon name="FileText" size={20} />
                <span>Download Ethics Framework</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPhilosophySection;