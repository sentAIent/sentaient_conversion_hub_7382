import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransparencyFrameworkSection = () => {
  const [activeTab, setActiveTab] = useState('decision-making');

  const frameworkAreas = [
    {
      id: 'decision-making',
      title: 'AI Decision-Making',
      icon: 'Brain',
      description: 'How our AI systems make decisions and recommendations',
      content: {
        overview: "Our AI decision-making process is designed to be transparent, explainable, and auditable at every step. We provide clear documentation of how our AI systems reach conclusions and ensure human oversight remains integral to the process.",
        processes: [
          {
            step: 1,
            title: "Data Input Analysis",
            description: "AI systems analyze input data using predefined algorithms and trained models, with all data sources clearly documented and validated."
          },
          {
            step: 2,
            title: "Decision Logic Processing",
            description: "The system applies learned patterns and rules to generate recommendations, with each decision path logged and traceable."
          },
          {
            step: 3,
            title: "Confidence Scoring",
            description: "Every AI decision includes a confidence score and uncertainty indicators to help users understand the reliability of recommendations."
          },
          {
            step: 4,
            title: "Human Review Integration",
            description: "Critical decisions are flagged for human review, with clear escalation paths and override capabilities built into every system."
          }
        ]
      }
    },
    {
      id: 'implementation',
      title: 'Implementation Process',
      icon: 'Settings',
      description: 'Our transparent approach to AI system implementation',
      content: {
        overview: "We maintain complete transparency throughout the implementation process, providing regular updates, clear timelines, and open communication about challenges and solutions.",
        processes: [
          {
            step: 1,
            title: "Requirements Gathering",
            description: "Comprehensive analysis of business needs with detailed documentation of objectives, constraints, and success metrics."
          },
          {
            step: 2,
            title: "Solution Design",
            description: "Collaborative design process with stakeholder input, technical specifications, and risk assessment documentation."
          },
          {
            step: 3,
            title: "Development & Testing",
            description: "Iterative development with regular demos, testing reports, and performance metrics shared with clients throughout the process."
          },
          {
            step: 4,
            title: "Deployment & Monitoring",
            description: "Phased deployment with real-time monitoring, performance tracking, and continuous optimization based on actual usage data."
          }
        ]
      }
    },
    {
      id: 'optimization',
      title: 'Ongoing Optimization',
      icon: 'TrendingUp',
      description: 'How we continuously improve AI system performance',
      content: {
        overview: "Our optimization process is transparent and data-driven, with regular reporting on system performance, identified improvements, and implementation of enhancements.",
        processes: [
          {
            step: 1,
            title: "Performance Monitoring",
            description: "Continuous monitoring of AI system performance with automated alerts for anomalies and regular performance reports."
          },
          {
            step: 2,
            title: "Data Analysis",
            description: "Regular analysis of system usage patterns, user feedback, and performance metrics to identify optimization opportunities."
          },
          {
            step: 3,
            title: "Improvement Planning",
            description: "Collaborative planning sessions with clients to prioritize improvements and plan implementation timelines."
          },
          {
            step: 4,
            title: "Enhancement Implementation",
            description: "Careful implementation of improvements with A/B testing, rollback capabilities, and performance validation."
          }
        ]
      }
    }
  ];

  const communicationChannels = [
    {
      channel: "Weekly Status Reports",
      description: "Detailed progress updates with metrics, milestones, and any challenges encountered",
      frequency: "Weekly",
      icon: "FileText"
    },
    {
      channel: "Monthly Stakeholder Meetings",
      description: "Interactive sessions to review progress, discuss feedback, and plan next steps",
      frequency: "Monthly",
      icon: "Users"
    },
    {
      channel: "Quarterly Business Reviews",
      description: "Comprehensive review of AI system performance and business impact analysis",
      frequency: "Quarterly",
      icon: "BarChart3"
    },
    {
      channel: "Real-time Dashboard Access",
      description: "24/7 access to system performance metrics and operational status",
      frequency: "Continuous",
      icon: "Monitor"
    }
  ];

  const activeFramework = frameworkAreas?.find(area => area?.id === activeTab);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
            <Icon name="Eye" size={32} className="text-accent" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Transparency Framework
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in complete transparency throughout our AI implementation process. Our framework ensures you understand exactly how our AI systems work, how decisions are made, and how we continuously improve performance.
          </p>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-card border border-border rounded-lg p-2">
          {frameworkAreas?.map((area) => (
            <button
              key={area?.id}
              onClick={() => setActiveTab(area?.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === area?.id
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={area?.icon} size={16} />
              <span>{area?.title}</span>
            </button>
          ))}
        </div>

        {/* Active Framework Content */}
        {activeFramework && (
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {activeFramework?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activeFramework?.content?.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeFramework?.content?.processes?.map((process) => (
                <div
                  key={process.step}
                  className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {process.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Communication Channels */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Open Communication Channels
          </h3>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            We maintain multiple communication channels to ensure you're always informed about your AI implementation progress and have direct access to our team when needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communicationChannels?.map((channel, index) => (
              <div
                key={index}
                className="text-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={channel?.icon} size={24} className="text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {channel?.channel}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {channel?.description}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {channel?.frequency}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="default"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90"
              onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
            >
              Schedule Transparency Discussion
            </Button>
          </div>
        </div>

        {/* Transparency Metrics */}
        <div className="mt-12 bg-muted/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Our Transparency Commitment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Process Documentation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">&lt; 24h</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Weekly</div>
              <div className="text-sm text-muted-foreground">Progress Updates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Dashboard Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyFrameworkSection;