import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import SolutionTheater from './components/SolutionTheater';
import InteractiveDemo from './components/InteractiveDemo';
import ROICalculator from './components/ROICalculator';
import CaseStudyPanel from './components/CaseStudyPanel';
import IntegrationChecker from './components/IntegrationChecker';

const AISolutionsExperienceCenter = () => {
  const [activeSolution, setActiveSolution] = useState('chatbot');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const solutions = [
    {
      id: 'chatbot',
      title: 'Generative Chatbots',
      subtitle: 'Intelligent Customer Conversations',
      icon: 'MessageCircle',
      description: 'Transform customer service with AI chatbots that understand context, provide personalized responses, and seamlessly escalate complex issues to human agents.',
      benefits: [
        { icon: 'Clock', title: '24/7 Availability', value: 'Always Online' },
        { icon: 'Users', title: 'Customer Satisfaction', value: '92% Average' },
        { icon: 'TrendingDown', title: 'Response Time', value: '< 30 seconds' }
      ],
      demoSteps: [
        {
          title: 'Customer Inquiry Processing',
          description: 'AI analyzes incoming customer questions and determines intent',
          content: `Customer: "I need help with my recent order #12345"\n\nAI Analysis:\n• Intent: Order Support\n• Sentiment: Neutral\n• Priority: Standard\n• Route: Customer Service Bot`
        },
        {
          title: 'Intelligent Response Generation',
          description: 'System generates contextual response using customer history',
          content: `AI Response: "I can help you with order #12345! I see it was placed on January 28th for $89.99. The order is currently being prepared for shipment. Would you like tracking information or need to make changes?"`
        },
        {
          title: 'Seamless Escalation',
          description: 'Complex issues are smoothly transferred to human agents with context',
          content: `Escalation Trigger: Customer requests refund\n\nAgent Handoff:\n• Customer: John Smith\n• Issue: Refund request for order #12345\n• Context: Product damaged during shipping\n• Sentiment: Frustrated but cooperative`
        }
      ]
    },
    {
      id: 'agent',
      title: 'Autonomous Agents',
      subtitle: 'Self-Managing Task Automation',
      icon: 'Bot',
      description: 'Deploy AI agents that independently handle complex workflows, make decisions, and coordinate with other systems to complete multi-step business processes.',
      benefits: [
        { icon: 'Zap', title: 'Process Efficiency', value: '75% Faster' },
        { icon: 'Target', title: 'Accuracy Rate', value: '99.5%' },
        { icon: 'DollarSign', title: 'Cost Reduction', value: '60% Savings' }
      ],
      demoSteps: [
        {
          title: 'Appointment Scheduling',
          description: 'Agent manages calendar availability and client preferences',
          content: `Incoming Request: "Schedule consultation for next week"\n\nAgent Processing:\n• Check calendar availability\n• Review client preferences\n• Identify optimal time slots\n• Send confirmation options`
        },
        {
          title: 'Automated Coordination',
          description: 'Agent coordinates with multiple systems and stakeholders',
          content: `Coordination Tasks:\n• Book conference room\n• Send calendar invites\n• Prepare meeting materials\n• Set automated reminders\n• Update CRM records`
        },
        {
          title: 'Proactive Management',
          description: 'Agent monitors and adjusts based on changing conditions',
          content: `Proactive Actions:\n• Detected: Client running late\n• Action: Notified attendees\n• Rescheduled: Next available slot\n• Updated: All systems automatically\n• Sent: New meeting details`
        }
      ]
    },
    {
      id: 'automation',
      title: 'Custom Automation',
      subtitle: 'Tailored Workflow Solutions',
      icon: 'Settings',
      description: 'Build custom automation solutions that integrate with your existing systems to streamline unique business processes and eliminate manual repetitive tasks.',
      benefits: [
        { icon: 'BarChart3', title: 'Productivity Gain', value: '200% Increase' },
        { icon: 'Shield', title: 'Error Reduction', value: '95% Fewer' },
        { icon: 'Clock', title: 'Time Savings', value: '30 hrs/week' }
      ],
      demoSteps: [
        {
          title: 'Data Collection & Processing',
          description: 'Automated system gathers data from multiple sources',
          content: `Data Sources:\n• CRM: Customer information\n• Email: Communication logs\n• Analytics: Website behavior\n• Sales: Transaction history\n\nProcessing: Unified customer profile created`
        },
        {
          title: 'Intelligent Decision Making',
          description: 'AI analyzes patterns and makes automated decisions',
          content: `Analysis Results:\n• Customer Segment: High-value prospect\n• Engagement Score: 85/100\n• Recommended Action: Priority follow-up\n• Optimal Channel: Phone call\n• Best Time: Tuesday 2-4 PM`
        },
        {
          title: 'Automated Execution',
          description: 'System executes decisions across integrated platforms',
          content: `Automated Actions:\n• CRM: Updated lead priority\n• Calendar: Scheduled follow-up call\n• Email: Sent personalized sequence\n• Slack: Notified sales team\n• Dashboard: Updated metrics`
        }
      ]
    }
  ];

  const currentSolution = solutions?.find(s => s?.id === activeSolution) || solutions?.[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-brand">
                <Icon name="Cpu" size={32} color="white" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  AI Solutions
                </h1>
                <p className="text-xl text-accent font-semibold">Experience Center</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform complex AI concepts into tangible experiences through live, interactive demonstrations. 
              See exactly how our solutions will work in your business environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-conversion hover:bg-conversion/90"
              >
                Start Interactive Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Live Demo
              </Button>
            </div>
          </div>

          {/* Solution Theater Navigation */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {solutions?.map((solution, index) => (
              <button
                key={solution?.id}
                onClick={() => setActiveSolution(solution?.id)}
                className={`flex-1 p-6 rounded-xl border transition-all duration-300 text-left ${
                  activeSolution === solution?.id
                    ? 'border-primary bg-primary/5 shadow-brand'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeSolution === solution?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={solution?.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{solution?.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution?.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{solution?.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Interactive Demo Section */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Live Demo */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="Play" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Live Interactive Demo</h2>
              </div>
              
              <InteractiveDemo type={activeSolution} isActive={true} />
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Try These Sample Queries:</h4>
                <div className="space-y-2">
                  {activeSolution === 'chatbot' && (
                    <>
                      <button className="text-sm text-primary hover:underline block">"What are your pricing plans?"</button>
                      <button className="text-sm text-primary hover:underline block">"I need technical support"</button>
                      <button className="text-sm text-primary hover:underline block">"Tell me about your products"</button>
                    </>
                  )}
                  {activeSolution === 'agent' && (
                    <>
                      <button className="text-sm text-primary hover:underline block">"Schedule a meeting for next week"</button>
                      <button className="text-sm text-primary hover:underline block">"Check my calendar availability"</button>
                      <button className="text-sm text-primary hover:underline block">"Set up automated reminders"</button>
                    </>
                  )}
                  {activeSolution === 'automation' && (
                    <>
                      <button className="text-sm text-primary hover:underline block">"Show me workflow automation"</button>
                      <button className="text-sm text-primary hover:underline block">"What systems can you integrate?"</button>
                      <button className="text-sm text-primary hover:underline block">"Calculate ROI for my business"</button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Solution Details */}
            <div className="space-y-6">
              <SolutionTheater
                solution={currentSolution}
                isActive={true}
                onActivate={() => {}}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Case Studies Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how businesses like yours have transformed their operations with our AI solutions
            </p>
          </div>
          
          <CaseStudyPanel solution={activeSolution} />
        </div>
      </section>
      {/* ROI Calculator Section */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Calculate Your ROI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a personalized estimate of how much you could save with AI automation
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>
      {/* Integration Checker Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">System Compatibility</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check how well your current systems integrate with our AI solutions
            </p>
          </div>
          
          <IntegrationChecker />
        </div>
      </section>
      {/* Implementation Timeline */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Implementation Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven methodology ensures smooth deployment and maximum ROI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Discovery & Assessment',
                description: 'Analyze your current processes and identify automation opportunities',
                duration: '1-2 weeks',
                icon: 'Search'
              },
              {
                step: '2',
                title: 'Solution Design',
                description: 'Create custom AI solution architecture tailored to your needs',
                duration: '2-3 weeks',
                icon: 'PenTool'
              },
              {
                step: '3',
                title: 'Development & Testing',
                description: 'Build and rigorously test your AI solution in a secure environment',
                duration: '4-6 weeks',
                icon: 'Code'
              },
              {
                step: '4',
                title: 'Deployment & Training',
                description: 'Launch your solution and train your team for optimal usage',
                duration: '1-2 weeks',
                icon: 'Rocket'
              }
            ]?.map((phase, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={phase?.icon} size={24} className="text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {phase?.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{phase?.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{phase?.description}</p>
                <div className="inline-flex items-center space-x-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <Icon name="Clock" size={12} />
                  <span>{phase?.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have already revolutionized their operations with our AI solutions. 
              Start your transformation journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Book Strategy Session
              </Button>
              <Link to="/free-ai-assessment-portal">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ClipboardCheck"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10"
                >
                  Take Free Assessment
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={24} color="white" />
                </div>
                <div>
                  <span className="text-xl font-bold">sentAIent</span>
                  <p className="text-sm opacity-80">Conversion Hub</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-4 max-w-md">
                Transforming businesses through intelligent AI solutions that amplify human potential 
                and drive sustainable growth.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Linkedin', 'Youtube', 'Github']?.map((social) => (
                  <button key={social} className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <Icon name={social} size={16} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/ai-solutions-experience-center" className="hover:text-primary-foreground transition-colors">AI Solutions</Link></li>
                <li><Link to="/free-ai-assessment-portal" className="hover:text-primary-foreground transition-colors">Free Assessment</Link></li>
                <li><Link to="/about-our-approach-intelligence-center" className="hover:text-primary-foreground transition-colors">Our Approach</Link></li>
                <li><Link to="/knowledge-nexus-resource-library" className="hover:text-primary-foreground transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link to="/about-our-approach-intelligence-center" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
                <li><Link to="/trust-transparency-hub" className="hover:text-primary-foreground transition-colors">Trust & Security</Link></li>
                <li><button className="hover:text-primary-foreground transition-colors">Careers</button></li>
                <li><button className="hover:text-primary-foreground transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/60">
              © {new Date()?.getFullYear()} sentAIent Conversion Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</button>
              <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</button>
              <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AISolutionsExperienceCenter;