import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SecurityProtocolsSection from './components/SecurityProtocolsSection';
import AIEthicsSection from './components/AIEthicsSection';
import ComplianceCertificationsSection from './components/ComplianceCertificationsSection';
import TransparencyFrameworkSection from './components/TransparencyFrameworkSection';
import DataHandlingSection from './components/DataHandlingSection';
import ContactSection from './components/ContactSection';
import Icon from '../../components/AppIcon';

const TrustTransparencyHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trustMetrics = [
    {
      metric: "99.9%",
      label: "Uptime SLA",
      description: "Guaranteed system availability",
      icon: "Activity"
    },
    {
      metric: "< 15min",
      label: "Incident Response",
      description: "Critical security response time",
      icon: "Clock"
    },
    {
      metric: "100%",
      label: "Regulatory Compliance",
      description: "Industry compliance standards",
      icon: "Award"
    },
    {/*
    {
      metric: "6+",
      label: "Active Certifications",
      description: "Industry compliance standards",
      icon: "Award"
    },
    */},
    {
      metric: "24/7",
      label: "Security Monitoring",
      description: "Continuous threat detection",
      icon: "Shield"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trust & Transparency Hub - sentAIent Conversion Hub</title>
        <meta 
          name="description" 
          content="Comprehensive security protocols, AI ethics stance, compliance certifications, and transparent data handling procedures. Building trust through transparency in AI consultancy." 
        />
        <meta name="keywords" content="AI security, data protection, compliance certifications, AI ethics, transparency, GDPR, SOC 2, ISO 27001" />
        <meta property="og:title" content="Trust & Transparency Hub - sentAIent" />
        <meta property="og:description" content="Discover our commitment to security, ethics, and transparency in AI implementation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/trust-transparency-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
                <Icon name="ShieldCheck" size={40} className="text-primary" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Trust & Transparency
                <span className="block text-primary">Hub</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Building confidence through through our consultative relationships with clients that focus on comprehensive security protocols, ethical AI practices, and complete transparency in our data handling procedures. Your trust is the foundation for all future success.
              </p>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {trustMetrics?.map((metric, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-elevation transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={metric?.icon} size={24} className="text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {metric?.metric}
                  </div>
                  <div className="text-lg font-semibold text-primary mb-1">
                    {metric?.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric?.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Pillars */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Our Trust Pillars
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Lock" size={32} className="text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Security First</h3>
                  <p className="text-muted-foreground text-sm">
                    Enterprise-grade security measures protect your data, your clients' data, and AI implementations at every level.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" size={32} className="text-trust" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ethical AI</h3>
                  <p className="text-muted-foreground text-sm">
                    Human-centered AI development with bias mitigation and transparent decision-making processes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Eye" size={32} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Full Transparency</h3>
                  <p className="text-muted-foreground text-sm">
                    Complete visibility into our processes, data handling, and AI system operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <SecurityProtocolsSection />
        <AIEthicsSection />
        <ComplianceCertificationsSection />
        <TransparencyFrameworkSection />
        <DataHandlingSection />
        <ContactSection />

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={24} color="white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">sentAIent</div>
                  <div className="text-sm opacity-80">Conversion Hub</div>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                Your trusted partner in AI transformation. Building the future through secure, ethical, and transparent artificial intelligence solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <span>Security Certified</span>
                <span>•</span>
                <span>GDPR Compliant</span>
                <span>•</span>
                <span>ISO 27001</span>
                <span>•</span>
                <span>SOC 2 Type II</span>
              </div>
              <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-sm opacity-80">
                © {new Date()?.getFullYear()} sentAIent Conversion Hub. All rights reserved. | 
                <span className="ml-1">Committed to Trust & Transparency</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TrustTransparencyHub;