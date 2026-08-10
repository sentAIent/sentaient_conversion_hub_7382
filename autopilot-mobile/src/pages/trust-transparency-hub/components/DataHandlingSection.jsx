import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataHandlingSection = () => {
  const [activePhase, setActivePhase] = useState('collection');

  const dataLifecyclePhases = [
    {
      id: 'collection',
      title: 'Data Collection',
      icon: 'Database',
      description: 'Secure and compliant data gathering processes',
      details: {
        overview: "We collect only the minimum data necessary for AI system functionality, following strict privacy-by-design principles and obtaining explicit consent for all data collection activities.",
        procedures: [
          "Explicit consent obtained before any data collection",
          "Data minimization principles applied to all collection processes",
          "Secure transmission protocols (TLS 1.3) for all data transfers",
          "Automated data validation and quality checks upon collection",
          "Immediate encryption of sensitive data using AES-256 standards"
        ],
        controls: [
          "Multi-factor authentication for data access",
          "Role-based access control with principle of least privilege",
          "Comprehensive audit logging of all data collection activities",
          "Regular security assessments of collection endpoints"
        ]
      }
    },
    {
      id: 'processing',
      title: 'Data Processing',
      icon: 'Cpu',
      description: 'Secure processing and analysis of client data',
      details: {
        overview: "All data processing occurs in secure, isolated environments with comprehensive monitoring and logging. We employ advanced anonymization techniques and maintain strict data segregation between clients.",
        procedures: [
          "Processing in isolated, secure cloud environments",
          "Data anonymization and pseudonymization where applicable",
          "Client data segregation with dedicated processing pipelines",
          "Real-time monitoring of all processing activities",
          "Automated backup creation before any data transformation"
        ],
        controls: [
          "End-to-end encryption during processing operations",
          "Immutable audit trails for all data transformations",
          "Automated anomaly detection for unusual processing patterns",
          "Regular validation of processing accuracy and integrity"
        ]
      }
    },
    {
      id: 'storage',
      title: 'Data Storage',
      icon: 'HardDrive',
      description: 'Secure, compliant data storage and management',
      details: {
        overview: "Client data is stored in geographically distributed, highly secure data centers with multiple layers of protection, redundancy, and compliance with international data residency requirements.",
        procedures: [
          "Encryption at rest using AES-256 with rotating keys",
          "Geographically distributed storage with data residency compliance",
          "Automated daily backups with point-in-time recovery",
          "Data deduplication and compression for efficiency",
          "Regular integrity checks and corruption detection"
        ],
        controls: [
          "Multi-region replication for disaster recovery",
          "Access logging and monitoring for all storage operations",
          "Automated retention policy enforcement",
          "Physical security controls at all data center locations"
        ]
      }
    },
    {
      id: 'sharing',
      title: 'Data Sharing',
      icon: 'Share2',
      description: 'Controlled data sharing and third-party access',
      details: {
        overview: "Data sharing is strictly controlled and occurs only with explicit client consent. All third-party integrations undergo rigorous security assessments and are bound by comprehensive data protection agreements.",
        procedures: [
          "Explicit client consent required for any data sharing",
          "Comprehensive third-party security assessments",
          "Data sharing agreements with strict liability clauses",
          "Minimal data sharing principle - only necessary information",
          "Secure API endpoints with rate limiting and monitoring"
        ],
        controls: [
          "OAuth 2.0 and API key authentication for all integrations",
          "Real-time monitoring of all data sharing activities",
          "Automated revocation of access upon contract termination",
          "Regular audits of third-party data handling practices"
        ]
      }
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: 'Calendar',
      description: 'Compliant data retention and lifecycle management',
      details: {
        overview: "We maintain clear data retention policies aligned with legal requirements and business needs, with automated deletion processes and comprehensive documentation of all retention decisions.",
        procedures: [
          "Automated retention policy enforcement based on data classification",
          "Regular review and update of retention schedules",
          "Secure deletion processes with cryptographic verification",
          "Legal hold capabilities for litigation or regulatory requirements",
          "Client notification before any data deletion activities"
        ],
        controls: [
          "Immutable audit logs of all retention and deletion activities",
          "Multi-stage approval process for retention policy changes",
          "Regular compliance audits of retention practices",
          "Automated alerts for approaching retention deadlines"
        ]
      }
    },
    {
      id: 'deletion',
      title: 'Data Deletion',
      icon: 'Trash2',
      description: 'Secure and verifiable data deletion processes',
      details: {
        overview: "Our data deletion processes ensure complete and verifiable removal of client data from all systems, including backups and archives, with cryptographic proof of deletion provided to clients.",
        procedures: [
          "Multi-pass secure deletion using DoD 5220.22-M standards",
          "Cryptographic verification of deletion completion",
          "Deletion of all copies including backups and archives",
          "Certificate of destruction provided to clients",
          "Regular validation of deletion process effectiveness"
        ],
        controls: [
          "Independent verification of deletion completeness",
          "Immutable deletion audit trails",
          "Automated detection of any residual data fragments",
          "Regular testing of deletion procedures and recovery attempts"
        ]
      }
    }
  ];

  const activePhaseData = dataLifecyclePhases?.find(phase => phase?.id === activePhase);

  const dataProtectionPrinciples = [
    {
      principle: "Privacy by Design",
      description: "Privacy considerations are built into every system from the ground up",
      icon: "ShieldCheck"
    },
    {
      principle: "Data Minimization",
      description: "We collect and process only the data necessary for specific purposes",
      icon: "Minimize"
    },
    {
      principle: "Purpose Limitation",
      description: "Data is used only for the specific purposes for which it was collected",
      icon: "Target"
    },
    {
      principle: "Accuracy & Quality",
      description: "We maintain high standards of data accuracy and quality throughout the lifecycle",
      icon: "CheckCircle"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Icon name="Database" size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Data Handling Procedures
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive data handling procedures ensure your information is protected throughout its entire lifecycle, from initial collection to secure deletion, with full transparency and compliance.
          </p>
        </div>

        {/* Data Lifecycle Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {dataLifecyclePhases?.map((phase) => (
              <button
                key={phase?.id}
                onClick={() => setActivePhase(phase?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activePhase === phase?.id
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={phase?.icon} size={16} />
                <span>{phase?.title}</span>
              </button>
            ))}
          </div>

          {/* Visual Data Flow */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto">
            <div className="flex items-center space-x-4 min-w-max">
              {dataLifecyclePhases?.map((phase, index) => (
                <React.Fragment key={phase?.id}>
                  <div
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${activePhase === phase?.id
                        ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/30 border border-border'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activePhase === phase?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                      <Icon name={phase?.icon} size={20} />
                    </div>
                    <span className={`text-xs font-medium ${activePhase === phase?.id ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                      {phase?.title}
                    </span>
                  </div>
                  {index < dataLifecyclePhases?.length - 1 && (
                    <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Active Phase Details */}
        {activePhaseData && (
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={activePhaseData?.icon} size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {activePhaseData?.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {activePhaseData?.description}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {activePhaseData?.details?.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="List" size={20} className="mr-2 text-primary" />
                  Standard Procedures
                </h4>
                <ul className="space-y-3">
                  {activePhaseData?.details?.procedures?.map((procedure, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{procedure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Shield" size={20} className="mr-2 text-primary" />
                  Security Controls
                </h4>
                <ul className="space-y-3">
                  {activePhaseData?.details?.controls?.map((control, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Lock" size={16} className="text-warning mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{control}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Data Protection Principles */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Core Data Protection Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataProtectionPrinciples?.map((principle, index) => (
              <div
                key={index}
                className="text-center p-6 bg-card border border-border rounded-lg hover:shadow-elevation transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={principle?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {principle?.principle}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Rights & Contact */}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Your Data Rights
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              You have comprehensive rights regarding your data. Contact our Data Protection Officer for any questions or to exercise your rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <Icon name="Eye" size={24} className="text-accent mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Right to Access</h4>
              <p className="text-sm text-muted-foreground">Request copies of your personal data</p>
            </div>
            <div className="text-center p-4">
              <Icon name="Edit" size={24} className="text-warning mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Right to Rectification</h4>
              <p className="text-sm text-muted-foreground">Correct inaccurate personal data</p>
            </div>
            <div className="text-center p-4">
              <Icon name="Trash2" size={24} className="text-error mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Right to Erasure</h4>
              <p className="text-sm text-muted-foreground">Request deletion of your data</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="default"
              iconName="Mail"
              iconPosition="left"
              className="bg-foreground text-primary hover:bg-foreground/90 border-foreground"
              onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
            >
              Contact Data Protection Officer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataHandlingSection;