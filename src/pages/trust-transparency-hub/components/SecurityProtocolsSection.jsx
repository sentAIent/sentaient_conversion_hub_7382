import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityProtocolsSection = () => {
  const securityMeasures = [
    {
      id: 1,
      title: "End-to-End Encryption",
      description: "AES-256 encryption for all data in transit and at rest, ensuring your sensitive information remains protected throughout the entire AI implementation process.",
      icon: "Shield",
      status: "Active",
      lastUpdated: "2024-12-15"
    },
    {
      id: 2,
      title: "Multi-Factor Authentication",
      description: "Advanced MFA protocols with biometric verification options and hardware security keys for enhanced access control to all AI systems and platforms.",
      icon: "Key",
      status: "Active",
      lastUpdated: "2024-12-10"
    },
    {
      id: 3,
      title: "Zero Trust Architecture",
      description: "Comprehensive security model that verifies every user and device before granting access to AI systems, regardless of their location or network connection.",
      icon: "Lock",
      status: "Active",
      lastUpdated: "2024-12-20"
    },
    {
      id: 4,
      title: "Regular Security Audits",
      description: "Quarterly penetration testing and security assessments by certified third-party security firms to identify and address potential vulnerabilities.",
      icon: "Search",
      status: "Scheduled",
      lastUpdated: "2024-11-30"
    },
    {
      id: 5,
      title: "Data Backup & Recovery",
      description: "Automated daily backups with 99.9% recovery guarantee and disaster recovery protocols tested monthly to ensure business continuity.",
      icon: "Database",
      status: "Active",
      lastUpdated: "2024-12-18"
    },
    {
      id: 6,
      title: "Network Monitoring",
      description: "24/7 real-time monitoring of all network traffic and AI system interactions with automated threat detection and immediate response protocols.",
      icon: "Activity",
      status: "Active",
      lastUpdated: "2024-12-22"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Icon name="Shield" size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Security Protocols
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive security framework ensures your data and AI implementations remain protected with enterprise-grade security measures and continuous monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityMeasures?.map((measure) => (
            <div
              key={measure?.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={measure?.icon} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {measure?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          measure?.status === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-1 ${
                            measure?.status === 'Active' ? 'bg-success' : 'bg-warning'
                          }`}
                        />
                        {measure?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {measure?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last Updated</span>
                <span className="font-medium">{measure?.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Info" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Security Incident Response
              </h3>
              <p className="text-muted-foreground mb-4">
                Our dedicated security team maintains a 24/7 incident response protocol with guaranteed response times of under 15 minutes for critical security events. All incidents are logged, analyzed, and reported to clients within 2 hours of detection.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-foreground font-medium">&lt; 15 min</span>
                  <span className="text-muted-foreground">Response Time</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-foreground font-medium">99.9%</span>
                  <span className="text-muted-foreground">Uptime SLA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-foreground font-medium">24/7</span>
                  <span className="text-muted-foreground">Security Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityProtocolsSection;