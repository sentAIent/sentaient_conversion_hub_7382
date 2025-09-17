import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CompanyCultureSection = () => {
  const [activeTab, setActiveTab] = useState('collaboration');

  const cultureValues = [
    {
      id: 'collaboration',
      title: 'Collaborative Innovation',
      icon: 'Users',
      description: 'We believe the best AI solutions emerge from diverse perspectives working together.',
      content: {
        philosophy: `Our collaborative approach brings together AI researchers, business strategists, and industry experts to create solutions that are both technically excellent and practically valuable. We foster an environment where every team member's expertise contributes to breakthrough innovations.`,
        practices: [
          'Cross-functional project teams with diverse expertise','Regular knowledge sharing sessions and tech talks','Client collaboration workshops and co-creation sessions','Open-source contributions and community engagement','Peer review processes for all major decisions'
        ],
        impact: 'This collaborative culture has led to 40% faster project delivery and 95% client satisfaction rates.'
      }
    },
    {
      id: 'learning',title: 'Continuous Learning',icon: 'BookOpen',description: 'In the rapidly evolving AI landscape, learning is not optional—it\'s essential.',
      content: {
        philosophy: `We invest heavily in our team's continuous education because AI technology evolves rapidly. Our learning culture ensures we stay at the forefront of AI innovation while developing practical expertise that benefits our clients.`,
        practices: [
          'Monthly AI research paper discussions and analysis','Quarterly training on emerging AI technologies','Conference attendance and knowledge sharing','Internal certification programs and skill development','Experimentation time for exploring new AI tools'
        ],
        impact: 'Our team completes 200+ hours of learning annually, keeping us ahead of industry trends.'
      }
    },
    {
      id: 'ethics',title: 'Ethical Leadership',icon: 'Shield',description: 'We lead by example in responsible AI development and deployment.',
      content: {
        philosophy: `Ethical AI isn't just a buzzword for us—it's a fundamental principle that guides every decision. We believe that responsible AI development today creates a better technological future for everyone.`,
        practices: [
          'Mandatory ethics training for all team members','Bias detection and mitigation in every project','Transparent AI decision-making processes','Regular ethical impact assessments','Community education on responsible AI practices'
        ],
        impact: 'We\'ve established industry-leading ethical AI frameworks adopted by 50+ organizations.'
      }
    },
    {
      id: 'innovation',
      title: 'Innovation Mindset',
      icon: 'Lightbulb',
      description: 'We challenge conventional thinking to create breakthrough AI solutions.',
      content: {
        philosophy: `Innovation requires courage to challenge existing approaches and creativity to envision new possibilities. We encourage calculated risk-taking and creative problem-solving to push the boundaries of what's possible with AI.`,
        practices: [
          'Innovation time for experimental projects','Hackathons and creative problem-solving sessions','Patent applications and research publications','Startup mentoring and technology incubation','Industry speaking and thought leadership'
        ],
        impact: 'Our innovations have resulted in 12 patents and 25+ published research papers.'
      }
    }
  ];

  const teamActivities = [
    {
      title: 'AI Research Symposium',
      description: 'Monthly deep-dive sessions exploring cutting-edge AI research and its practical applications.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      frequency: 'Monthly',
      participants: 'All Team Members'
    },
    {
      title: 'Innovation Lab Sessions',
      description: 'Dedicated time for experimenting with new AI tools and developing proof-of-concept solutions.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      frequency: 'Weekly',
      participants: 'Technical Teams'
    },
    {
      title: 'Client Success Stories',
      description: 'Collaborative sessions where teams share learnings from successful client implementations.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      frequency: 'Bi-weekly',
      participants: 'Project Teams'
    },
    {
      title: 'Ethics & Impact Discussions',
      description: 'Regular forums for discussing the ethical implications and societal impact of our AI work.',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      frequency: 'Monthly',
      participants: 'All Team Members'
    }
  ];

  const workEnvironment = [
    {
      aspect: 'Flexible Work',
      description: 'Hybrid work model with flexible hours to support work-life balance',
      icon: 'Clock',
      details: ['Remote work options', 'Flexible scheduling', 'Results-focused culture', 'Global team collaboration']
    },
    {
      aspect: 'Learning Budget',
      description: '$5,000 annual learning budget per team member for courses and conferences',
      icon: 'DollarSign',
      details: ['Conference attendance', 'Online courses', 'Certification programs', 'Book allowances']
    },
    {
      aspect: 'Innovation Time',
      description: '20% time dedicated to personal projects and experimental research',
      icon: 'Lightbulb',
      details: ['Personal AI projects', 'Open source contributions', 'Research initiatives', 'Patent development']
    },
    {
      aspect: 'Wellness Focus',
      description: 'Comprehensive wellness programs supporting mental and physical health',
      icon: 'Heart',
      details: ['Mental health support', 'Fitness memberships', 'Wellness days', 'Team building activities']
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-primary font-semibold text-lg">Company Culture</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Culture That Drives
            <span className="block text-primary">AI Excellence</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our culture is built on collaboration, continuous learning, and ethical leadership. These values shape how we work, innovate, and serve our clients.
          </p>
        </div>

        {/* Culture Values Tabs */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {cultureValues?.map((value) => (
              <button
                key={value?.id}
                onClick={() => setActiveTab(value?.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === value?.id
                    ? 'bg-primary text-white shadow-elevation'
                    : 'bg-card border border-border text-foreground hover:shadow-subtle'
                }`}
              >
                <Icon 
                  name={value?.icon} 
                  size={20} 
                  color={activeTab === value?.id ? 'white' : 'var(--color-primary)'} 
                />
                <span>{value?.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {cultureValues?.map((value) => (
            activeTab === value?.id && (
              <div key={value?.id} className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-subtle">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <Icon name={value?.icon} size={28} color="var(--color-primary)" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {value?.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {value?.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Our Philosophy</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value?.content?.philosophy}
                      </p>
                    </div>

                    <div className="bg-conversion/10 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon name="TrendingUp" size={20} color="var(--color-conversion)" />
                        <h4 className="text-lg font-semibold text-foreground">Impact</h4>
                      </div>
                      <p className="text-muted-foreground">
                        {value?.content?.impact}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-6">How We Practice This</h4>
                    <div className="space-y-4">
                      {value?.content?.practices?.map((practice, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                          <Icon name="CheckCircle" size={16} color="var(--color-conversion)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Team Activities */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Behind the Scenes
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Regular activities that foster collaboration, learning, and innovation within our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamActivities?.map((activity, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle hover:shadow-elevation transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity?.image}
                    alt={activity?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {activity?.title}
                    </h4>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {activity?.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} color="var(--color-primary)" />
                      <span className="text-foreground font-medium">{activity?.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} color="var(--color-primary)" />
                      <span className="text-foreground font-medium">{activity?.participants}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Environment */}
        <div className="bg-muted/50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Work Environment
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've created an environment that supports both professional growth and personal well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workEnvironment?.map((env, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={env.icon} size={28} color="var(--color-primary)" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {env.aspect}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {env.description}
                </p>
                <div className="space-y-2">
                  {env.details?.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center justify-center space-x-2">
                      <Icon name="CheckCircle" size={12} color="var(--color-conversion)" />
                      <span className="text-xs text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join Our Mission
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Be part of a team that's shaping the future of AI while maintaining the highest ethical standards and human-centered approach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Icon name="Users" size={20} />
                <span>View Open Positions</span>
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Icon name="Coffee" size={20} />
                <span>Coffee Chat with Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCultureSection;