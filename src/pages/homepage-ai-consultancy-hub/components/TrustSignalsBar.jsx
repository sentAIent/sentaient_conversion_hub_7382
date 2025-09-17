import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignalsBar = () => {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      icon: 'Shield',
      description: 'Security & Compliance',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=40&fit=crop&crop=center'
    },
    {
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information Security',
      logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=40&fit=crop&crop=center'
    },
    {
      name: 'GDPR Compliant',
      icon: 'Lock',
      description: 'Data Protection',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=40&fit=crop&crop=center'
    },
    {
      name: 'HIPAA Ready',
      icon: 'Heart',
      description: 'Healthcare Security',
      logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=40&fit=crop&crop=center'
    }
  ];

  const partnerships = [
    {
      name: 'Microsoft Partner',
      logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=50&fit=crop&crop=center',
      tier: 'Gold Certified'
    },
    {
      name: 'AWS Advanced',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=50&fit=crop&crop=center',
      tier: 'Consulting Partner'
    },
    {
      name: 'Google Cloud',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=50&fit=crop&crop=center',
      tier: 'Premier Partner'
    },
    {
      name: 'OpenAI Partner',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=50&fit=crop&crop=center',
      tier: 'Certified Developer'
    }
  ];

  const stats = [
    {
      number: '500+',
      label: 'Successful Implementations',
      icon: 'CheckCircle'
    },
    {
      number: '99.9%',
      label: 'System Uptime',
      icon: 'Activity'
    },
    {
      number: '24/7',
      label: 'Support Coverage',
      icon: 'Clock'
    },
    {
      number: '< 4hrs',
      label: 'Average Response Time',
      icon: 'Zap'
    }
  ];

  return (
    <section className="py-16 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-trust/10 text-trust px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Shield" size={16} />
            <span>Trusted & Certified</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Enterprise-Grade Security & Reliability
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your data and business operations are protected by industry-leading security standards and partnerships
          </p>
        </div>

        {/* Security Certifications */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Security Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl p-6 border border-border hover:shadow-subtle transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-trust/10 text-trust mb-4 group-hover:bg-trust group-hover:text-white transition-all duration-300">
                    <Icon name={cert?.icon} size={24} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{cert?.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Partnerships */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Technology Partnerships
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerships?.map((partner, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="bg-card rounded-xl p-6 border border-border hover:shadow-subtle transition-all duration-300 hover:-translate-y-1 mb-3">
                  <div className="h-12 flex items-center justify-center mb-4">
                    <Image
                      src={partner?.logo}
                      alt={`${partner?.name} logo`}
                      className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{partner?.name}</h4>
                  <p className="text-xs text-muted-foreground">{partner?.tier}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-lg font-semibold text-foreground mb-8 text-center">
            Performance & Reliability Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-conversion/10 text-conversion mb-4">
                  <Icon name={stat?.icon} size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-conversion mb-2">
                  {stat?.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>US-Based Operations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>50+ Expert Engineers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>5+ Years AI Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} />
              <span>4.9/5 Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsBar;