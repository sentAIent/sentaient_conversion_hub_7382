import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionsPreview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  const solutions = [
    {
      id: 'autonomous-agents',
      title: 'Autonomous Agents',
      subtitle: 'Intelligent Task Automation',
      description: 'Deploy AI agents that handle complex workflows, make decisions, and execute tasks with minimal human intervention.',
      icon: 'Bot',
      color: 'from-primary to-secondary',
      benefits: [
        '24/7 automated operations',
        'Intelligent decision making',
        'Seamless system integration',
        'Scalable task execution'
      ],
      demoSteps: [
        'Agent receives task request',
        'Analyzes requirements & context',
        'Executes multi-step workflow',
        'Provides detailed completion report'
      ],
      metrics: {
        efficiency: '85%',
        accuracy: '99.2%',
        timeReduction: '70%'
      }
    },
    {
      id: 'generative-chatbots',
      title: 'Generative Chatbots',
      subtitle: 'Conversational AI Excellence',
      description: 'Create intelligent chatbots that understand context, provide personalized responses, and learn from every interaction.',
      icon: 'MessageSquare',
      color: 'from-accent to-trust',
      benefits: [
        'Natural conversation flow',
        'Context-aware responses',
        'Multi-language support',
        'Continuous learning'
      ],
      demoSteps: [
        'Customer asks complex question',
        'AI understands intent & context',
        'Generates personalized response',
        'Escalates when necessary'
      ],
      metrics: {
        satisfaction: '94%',
        resolution: '87%',
        responseTime: '< 2s'
      }
    },
    {
      id: 'custom-automation',
      title: 'Custom Automation',
      subtitle: 'Tailored AI Solutions',
      description: 'Build bespoke AI systems designed specifically for your unique business processes and industry requirements.',
      icon: 'Settings',
      color: 'from-conversion to-cta',
      benefits: [
        'Industry-specific solutions',
        'Custom workflow integration',
        'Proprietary data utilization',
        'Competitive advantage'
      ],
      demoSteps: [
        'Analyze business requirements',
        'Design custom AI architecture',
        'Implement & integrate solution',
        'Monitor & optimize performance'
      ],
      metrics: {
        customization: '100%',
        integration: '95%',
        roi: '340%'
      }
    }
  ];

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
    setActiveDemoIndex(0);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Cpu" size={16} />
            <span>AI Solutions Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Intelligent Solutions for{' '}
            <span className="text-primary">Every Business Need</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive suite of AI solutions designed to transform your operations, 
            enhance customer experiences, and drive sustainable growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {solutions?.map((solution, index) => (
            <div
              key={solution?.id}
              className={`group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:shadow-elevation hover:-translate-y-2 ${
                hoveredCard === solution?.id ? 'ring-2 ring-primary/20' : ''
              }`}
              onMouseEnter={() => handleCardHover(solution?.id)}
              onMouseLeave={handleCardLeave}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution?.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Card Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${solution?.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={solution?.icon} size={28} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {solution?.title}
                  </h3>
                  <p className="text-accent font-medium mb-4">{solution?.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution?.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {solution?.benefits?.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-conversion flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Demo Preview */}
                {hoveredCard === solution?.id && (
                  <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border/50">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="Play" size={14} />
                      <span>Live Demo Preview</span>
                    </h4>
                    <div className="space-y-2">
                      {solution?.demoSteps?.map((step, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center space-x-3 text-xs transition-all duration-300 ${
                            idx <= activeDemoIndex ? 'text-foreground' : 'text-muted-foreground/50'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            idx <= activeDemoIndex ? 'bg-conversion' : 'bg-muted-foreground/30'
                          }`}></div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {Object.entries(solution?.metrics)?.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-conversion">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to="/ai-solutions-experience-center">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Explore Solution
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience our AI solutions firsthand with interactive demos and personalized consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-solutions-experience-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-primary hover:bg-primary/90"
                >
                  Interactive Demos
                </Button>
              </Link>
              <Link to="/free-ai-assessment-portal">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;