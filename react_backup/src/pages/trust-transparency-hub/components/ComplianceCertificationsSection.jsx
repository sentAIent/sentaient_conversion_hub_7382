import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceCertificationsSection = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  const certifications = [
    {
      id: 1,
      name: "SOC 2 Type II",
      issuer: "AICPA",
      status: "Active",
      issueDate: "2024-03-15",
      expiryDate: "2025-03-15",
      scope: "Security, Availability, Processing Integrity, Confidentiality, and Privacy",
      description: "Comprehensive audit of our security controls and data handling procedures, ensuring the highest standards of data protection and system reliability.",
      icon: "Shield",
      verificationLink: "https://verify.aicpa.org/soc2/sentaient-2024",
      downloadLink: "/documents/soc2-certificate.pdf"
    },
    {
      id: 2,
      name: "GDPR Compliance",
      issuer: "EU Data Protection Authority",
      status: "Active",
      issueDate: "2024-05-25",
      expiryDate: "2025-05-25",
      scope: "Data Processing, Privacy Rights, Cross-border Data Transfers",
      description: "Full compliance with European Union General Data Protection Regulation, ensuring proper handling of personal data and privacy rights.",
      icon: "Globe",
      verificationLink: "https://gdpr.eu/verify/sentaient",
      downloadLink: "/documents/gdpr-certificate.pdf"
    },
    {
      id: 3,
      name: "ISO 27001:2022",
      issuer: "International Organization for Standardization",
      status: "Active",
      issueDate: "2024-01-20",
      expiryDate: "2027-01-20",
      scope: "Information Security Management System",
      description: "International standard for information security management systems, demonstrating our commitment to protecting client information assets.",
      icon: "Lock",
      verificationLink: "https://iso.org/verify/27001/sentaient",
      downloadLink: "/documents/iso27001-certificate.pdf"
    },
    {
      id: 4,
      name: "HIPAA Compliance",
      issuer: "US Department of Health and Human Services",
      status: "Active",
      issueDate: "2024-02-10",
      expiryDate: "2025-02-10",
      scope: "Healthcare Data Protection and Privacy",
      description: "Compliance with Health Insurance Portability and Accountability Act for handling protected health information in AI healthcare solutions.",
      icon: "Heart",
      verificationLink: "https://hhs.gov/verify/hipaa/sentaient",
      downloadLink: "/documents/hipaa-certificate.pdf"
    },
    {
      id: 5,
      name: "PCI DSS Level 1",
      issuer: "PCI Security Standards Council",
      status: "Active",
      issueDate: "2024-04-05",
      expiryDate: "2025-04-05",
      scope: "Payment Card Data Security",
      description: "Highest level of Payment Card Industry Data Security Standard compliance for secure handling of credit card information.",
      icon: "CreditCard",
      verificationLink: "https://pcisecuritystandards.org/verify/sentaient",
      downloadLink: "/documents/pci-dss-certificate.pdf"
    },
    {
      id: 6,
      name: "FedRAMP Authorized",
      issuer: "US General Services Administration",
      status: "In Progress",
      issueDate: "2024-06-01",
      expiryDate: "2027-06-01",
      scope: "Federal Government Cloud Security",
      description: "Federal Risk and Authorization Management Program authorization for providing cloud services to US federal agencies.",
      icon: "Building",
      verificationLink: "https://fedramp.gov/verify/sentaient",
      downloadLink: "/documents/fedramp-certificate.pdf"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-warning/10 text-warning';
      case 'Expired':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-6">
            <Icon name="Award" size={32} className="text-success" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Compliance Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive certification portfolio demonstrates our commitment to maintaining the highest standards of security, privacy, and regulatory compliance across all industries we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications?.map((cert) => {
            const daysUntilExpiry = getDaysUntilExpiry(cert?.expiryDate);

            return (
              <div
                key={cert?.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCertification(cert)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={cert?.icon} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {cert?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cert?.issuer}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert?.status)}`}>
                    {cert?.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {cert?.description}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issue Date:</span>
                    <span className="text-foreground font-medium">{cert?.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires:</span>
                    <span className={`font-medium ${daysUntilExpiry < 90 ? 'text-warning' : 'text-foreground'}`}>
                      {cert?.expiryDate}
                    </span>
                  </div>
                  {daysUntilExpiry > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days Remaining:</span>
                      <span className={`font-medium ${daysUntilExpiry < 90 ? 'text-warning' : 'text-success'}`}>
                        {daysUntilExpiry}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      window.open(cert?.verificationLink, '_blank');
                    }}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconPosition="right"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      window.open(cert?.downloadLink, '_blank');
                    }}
                  >
                    Download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certification Details Modal */}
        {selectedCertification && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={selectedCertification?.icon} size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {selectedCertification?.name}
                      </h3>
                      <p className="text-muted-foreground">
                        Issued by {selectedCertification?.issuer}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setSelectedCertification(null)}
                  >
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCertification?.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Scope</h4>
                    <p className="text-muted-foreground">
                      {selectedCertification?.scope}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Issue Date</h4>
                      <p className="text-muted-foreground">{selectedCertification?.issueDate}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Expiry Date</h4>
                      <p className="text-muted-foreground">{selectedCertification?.expiryDate}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="default"
                      iconName="ExternalLink"
                      iconPosition="right"
                      onClick={() => window.open(selectedCertification?.verificationLink, '_blank')}
                    >
                      Verify Certificate
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Download"
                      iconPosition="right"
                      onClick={() => window.open(selectedCertification?.downloadLink, '_blank')}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*
        <div className="bg-muted/50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Continuous Compliance Monitoring
            </h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Our compliance team continuously monitors regulatory changes and updates our certifications to ensure ongoing adherence to the latest standards. All certifications are renewed well before expiry dates to maintain uninterrupted compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-muted-foreground">Active Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">90</div>
                <div className="text-sm text-muted-foreground">Days Early Renewal</div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default ComplianceCertificationsSection;