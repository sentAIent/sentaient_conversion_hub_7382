import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MethodologySection = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [selectedDeepDive, setSelectedDeepDive] = useState(null);

  const methodologyPhases = [
    {
      phase: "01",
      title: "Discovery & Assessment",
      duration: "2-3 weeks",
      description: "Comprehensive analysis of current processes, technology stack, and AI readiness.",
      icon: "Search",
      color: "from-blue-500 to-blue-600",
      activities: [
        "Business process mapping and analysis",
        "Technology infrastructure assessment",
        "Team capability evaluation",
        "AI readiness scoring",
        "Opportunity identification workshop"
      ],
      deliverables: [
        "AI Readiness Assessment Report",
        "Process Optimization Recommendations",
        "Technology Gap Analysis",
        "ROI Projection Model",
        "Implementation Roadmap Draft"
      ],
      tools: ["Process Mining Tools", "Infrastructure Scanners", "Assessment Frameworks"],
      timeline: "Week 1-2: Data Collection, Week 3: Analysis & Reporting"
    },
    {
      phase: "02",
      title: "Strategy & Planning",
      duration: "1-2 weeks",
      description: "Development of customized AI strategy aligned with business objectives and constraints.",
      icon: "Target",
      color: "from-purple-500 to-purple-600",
      activities: [
        "Strategic AI roadmap development",
        "Solution architecture design",
        "Risk assessment and mitigation planning",
        "Resource allocation planning",
        "Success metrics definition"
      ],
      deliverables: [
        "AI Strategy Document",
        "Technical Architecture Blueprint",
        "Risk Management Plan",
        "Project Timeline & Milestones",
        "Success Metrics Framework"
      ],
      tools: ["Strategy Planning Tools", "Architecture Design Software", "Risk Assessment Matrices"],
      timeline: "Week 1: Strategy Development, Week 2: Planning & Validation"
    },
    {
      phase: "03",
      title: "Proof of Concept",
      duration: "3-4 weeks",
      description: "Rapid prototyping and validation of AI solutions with real business data.",
      icon: "Lightbulb",
      color: "from-green-500 to-green-600",
      activities: [
        "MVP development and testing",
        "Data integration and validation",
        "User experience design",
        "Performance benchmarking",
        "Stakeholder feedback collection"
      ],
      deliverables: [
        "Working AI Prototype",
        "Performance Benchmark Report",
        "User Experience Design",
        "Technical Documentation",
        "Stakeholder Feedback Summary"
      ],
      tools: ["Rapid Prototyping Platforms", "Testing Frameworks", "Analytics Tools"],
      timeline: "Week 1-2: Development, Week 3: Testing, Week 4: Validation"
    },
    {
      phase: "04",
      title: "Implementation",
      duration: "6-12 weeks",
      description: "Full-scale deployment with comprehensive testing, training, and optimization.",
      icon: "Rocket",
      color: "from-orange-500 to-orange-600",
      activities: [
        "Production system development",
        "Integration with existing systems",
        "Comprehensive testing and QA",
        "Team training and onboarding",
        "Gradual rollout and optimization"
      ],
      deliverables: [
        "Production-Ready AI System",
        "Integration Documentation",
        "Testing & QA Reports",
        "Training Materials & Sessions",
        "Deployment Guide"
      ],
      tools: ["Development Platforms", "CI/CD Pipelines", "Monitoring Systems"],
      timeline: "Week 1-4: Development, Week 5-8: Testing, Week 9-12: Deployment"
    },
    {
      phase: "05",
      title: "Optimization & Scale",
      duration: "Ongoing",
      description: "Continuous monitoring, optimization, and scaling based on performance data.",
      icon: "TrendingUp",
      color: "from-cyan-500 to-cyan-600",
      activities: [
        "Performance monitoring and analysis",
        "Continuous model improvement",
        "Scaling and expansion planning",
        "Advanced feature development",
        "Long-term strategy evolution"
      ],
      deliverables: [
        "Performance Analytics Dashboard",
        "Optimization Recommendations",
        "Scaling Strategy Plan",
        "Advanced Feature Roadmap",
        "Long-term Partnership Agreement"
      ],
      tools: ["Analytics Platforms", "Monitoring Tools", "Optimization Frameworks"],
      timeline: "Ongoing monthly reviews and quarterly strategic assessments"
    }
  ];

  const successMetrics = [
    {
      category: "Business Impact",
      metrics: [
        { name: "ROI Achievement", target: "300%+ within 12 months", icon: "DollarSign" },
        { name: "Process Efficiency", target: "40-60% time reduction", icon: "Clock" },
        { name: "Cost Savings", target: "25-40% operational costs", icon: "TrendingDown" },
        { name: "Revenue Growth", target: "15-25% increase", icon: "TrendingUp" }
      ]
    },
    {
      category: "Technical Performance",
      metrics: [
        { name: "System Accuracy", target: "95%+ prediction accuracy", icon: "Target" },
        { name: "Response Time", target: "<2 seconds average", icon: "Zap" },
        { name: "Uptime", target: "99.9% availability", icon: "Shield" },
        { name: "Scalability", target: "10x capacity growth", icon: "BarChart3" }
      ]
    },
    {
      category: "User Adoption",
      metrics: [
        { name: "User Satisfaction", target: "4.5+ star rating", icon: "Star" },
        { name: "Adoption Rate", target: "85%+ team adoption", icon: "Users" },
        { name: "Training Success", target: "90%+ completion rate", icon: "GraduationCap" },
        { name: "Support Tickets", target: "50% reduction", icon: "MessageCircle" }
      ]
    }
  ];

  const qualityAssurance = [
    {
      title: "Ethical AI Compliance",
      description: "Comprehensive bias testing and ethical framework validation",
      icon: "Shield",
      checks: ["Bias Detection", "Fairness Testing", "Transparency Validation", "Privacy Compliance"]
    },
    {
      title: "Security & Privacy",
      description: "End-to-end security assessment and data protection validation",
      icon: "Lock",
      checks: ["Data Encryption", "Access Controls", "Vulnerability Testing", "Compliance Audit"]
    },
    {
      title: "Performance Validation",
      description: "Rigorous testing of accuracy, speed, and scalability metrics",
      icon: "Activity",
      checks: ["Accuracy Testing", "Load Testing", "Stress Testing", "Performance Benchmarking"]
    },
    {
      title: "Integration Testing",
      description: "Seamless integration with existing systems and workflows",
      icon: "Link",
      checks: ["API Testing", "Data Flow Validation", "System Compatibility", "Workflow Integration"]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={24} color="var(--color-primary)"/>
            </div>
            <span className="text-primary font-semibold text-lg">Our Methodology</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Proven Framework for
            <span className="block text-primary">AI Success</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our proprietary methodology combines strategic planning, rapid prototyping, and systematic implementation to ensure every AI project delivers measurable business value.
          </p>
        </div>

        {/* Methodology Phases */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-5 gap-4 mb-8">
            {methodologyPhases?.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  activePhase === index
                    ? 'bg-primary text-white shadow-elevation'
                    : 'bg-card border border-border hover:shadow-subtle'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activePhase === index ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={phase?.icon} 
                      size={16} 
                      color={activePhase === index ? 'white' : 'var(--color-primary)'} 
                    />
                  </div>
                  <span className={`text-xs font-bold ${
                    activePhase === index ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {phase?.phase}
                  </span>
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  activePhase === index ? 'text-white' : 'text-foreground'
                }`}>
                  {phase?.title}
                </h3>
                <p className={`text-xs ${
                  activePhase === index ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {phase?.duration}
                </p>
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-subtle">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${methodologyPhases?.[activePhase]?.color} flex items-center justify-center`}>
                      <Icon name={methodologyPhases?.[activePhase]?.icon} size={28} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">
                        Phase {methodologyPhases?.[activePhase]?.phase}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {methodologyPhases?.[activePhase]?.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {methodologyPhases?.[activePhase]?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} color="var(--color-primary)" />
                      <span className="text-foreground font-medium">
                        Duration: {methodologyPhases?.[activePhase]?.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Key Activities</h4>
                  <ul className="space-y-3">
                    {methodologyPhases?.[activePhase]?.activities?.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="CheckCircle" size={16} color="var(--color-conversion)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Deliverables</h4>
                  <div className="space-y-3">
                    {methodologyPhases?.[activePhase]?.deliverables?.map((deliverable, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="FileText" size={16} color="var(--color-primary)" />
                        <span className="text-foreground font-medium">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {methodologyPhases?.[activePhase]?.tools?.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Timeline</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {methodologyPhases?.[activePhase]?.timeline}
                  </p>
                </div>

                <Button
                  variant="default"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setSelectedDeepDive(methodologyPhases?.[activePhase])}
                >
                  Deep Dive into {methodologyPhases?.[activePhase]?.title}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------------------------ */}
        {/* Success Metrics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Success Metrics & KPIs
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We measure success across multiple dimensions to ensure comprehensive value delivery.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successMetrics?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-card border border-border rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-foreground mb-6 text-center">
                  {category?.category}
                </h4>
                <div className="space-y-4">
                  {category?.metrics?.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={metric?.icon} size={18} color="var(--color-primary)" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm mb-1">
                          {metric?.name}
                        </div>
                        <div className="text-primary text-xs font-medium">
                          {metric?.target}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Quality Assurance Framework
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive testing and validation ensure every AI implementation meets the highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityAssurance?.map((qa, index) => (
              <div key={index} className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={qa?.icon} size={28} color="var(--color-primary)" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {qa?.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {qa?.description}
                </p>
                <div className="space-y-2">
                  {qa?.checks?.map((check, checkIndex) => (
                    <div key={checkIndex} className="flex items-center justify-center space-x-2">
                      <Icon name="CheckCircle" size={12} color="var(--color-conversion)" />
                      <span className="text-xs text-muted-foreground">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Modal */}
        {selectedDeepDive && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedDeepDive?.color} flex items-center justify-center`}>
                      <Icon name={selectedDeepDive?.icon} size={28} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">
                        Phase {selectedDeepDive?.phase}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {selectedDeepDive?.title} - Deep Dive
                      </h3>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedDeepDive(null)}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors duration-300"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Detailed Process</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {selectedDeepDive?.description}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        This phase involves comprehensive analysis and strategic planning to ensure optimal outcomes. Our team works closely with your stakeholders to understand requirements and develop tailored solutions.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Success Criteria</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <Icon name="Target" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">Clear deliverables completed on schedule</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Icon name="Users" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">Stakeholder approval and sign-off</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Icon name="CheckCircle" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">Quality assurance validation passed</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Team Involvement</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Icon name="User" size={16} color="var(--color-primary)" />
                          <span className="text-foreground font-medium">Project Manager</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Icon name="Brain" size={16} color="var(--color-primary)" />
                          <span className="text-foreground font-medium">AI Specialist</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Icon name="Code" size={16} color="var(--color-primary)" />
                          <span className="text-foreground font-medium">Technical Lead</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Next Steps</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Upon completion of this phase, we'll conduct a comprehensive review with your team and prepare for the next stage of implementation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-8 border-t border-border mt-8">
                  <Button
                    variant="default"
                    iconName="Calendar"
                    iconPosition="left"
                    className="bg-conversion hover:bg-conversion/90"
                    //onClick={() => setSelectedDeepDive(null)}
                    onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
                  >
                    Schedule Phase Discussion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MethodologySection;