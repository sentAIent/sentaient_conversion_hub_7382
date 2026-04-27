import React from 'react';
import Icon from '../../../components/AppIcon';

const AIEthicsSection = () => {
  const ethicsPrinciples = [
    {
      id: 1,
      title: "Human-Centered Design",
      description: "AI solutions are designed to augment human capabilities, not replace them. Every implementation prioritizes human oversight and maintains meaningful human control over critical decisions.",
      icon: "Users",
      examples: [
        "Human approval required for all automated decisions",
        "Clear escalation paths to human experts",
        "User-friendly interfaces for AI system management"
      ]
    },
    {
      id: 2,
      title: "Bias Mitigation",
      description: "Proactive identification and elimination of algorithmic bias through diverse training data, regular auditing, and inclusive development practices.",
      icon: "Scale",
      examples: [
        "Diverse training datasets from multiple sources",
        "Regular bias testing across demographic groups",
        "Inclusive development team perspectives"
      ]
    },
    {
      id: 3,
      title: "Transparency & Explainability",
      description: "AI decision-making processes are transparent and explainable, ensuring stakeholders understand how and why AI systems reach specific conclusions.",
      icon: "Eye",
      examples: [
        "Clear documentation of AI decision logic",
        "Explainable AI interfaces for end users",
        "Regular reporting on AI system performance"
      ]
    },
    {
      id: 4,
      title: "Privacy Protection",
      description: "Strict adherence to privacy-by-design principles, ensuring personal and sensitive data is protected throughout the AI development and deployment lifecycle.",
      icon: "ShieldCheck",
      examples: [
        "Data minimization and purpose limitation",
        "Anonymization and pseudonymization techniques",
        "Consent management and user control"
      ]
    },
    {
      id: 5,
      title: "Accountability & Responsibility",
      description: "Clear accountability structures ensure responsible AI deployment with defined roles, responsibilities, and governance frameworks for all AI implementations.",
      icon: "UserCheck",
      examples: [
        "Designated AI ethics officers for each project",
        "Regular ethics review board assessments",
        "Clear liability and responsibility frameworks"
      ]
    },
    {
      id: 6,
      title: "Continuous Monitoring",
      description: "Ongoing monitoring and evaluation of AI systems to ensure they continue to operate ethically and effectively as they learn and evolve over time.",
      icon: "Activity",
      examples: [
        "Real-time performance monitoring dashboards",
        "Regular ethical impact assessments",
        "Continuous improvement feedback loops"
      ]
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-trust/10 rounded-full mb-6">
            <Icon name="Heart" size={32} className="text-trust" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Ethics Stance
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to responsible AI development ensures that every solution we create upholds the highest ethical standards while delivering measurable business value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {ethicsPrinciples?.map((principle) => (
            <div
              key={principle?.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={principle?.icon} size={24} className="text-trust" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {principle?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle?.description}
                  </p>
                </div>
              </div>
              
              <div className="ml-16">
                <h4 className="text-sm font-medium text-foreground mb-3">Implementation Examples:</h4>
                <ul className="space-y-2">
                  {principle?.examples?.map((example, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/*}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="BookOpen" size={32} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                AI Ethics Board & Governance
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our independent AI Ethics Board, comprised of industry experts, ethicists, and client representatives, meets quarterly to review our AI development practices, assess ethical implications of new technologies, and ensure our implementations align with evolving ethical standards and regulatory requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Users" size={24} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Expert Panel</h4>
                  <p className="text-sm text-muted-foreground">7 industry experts and ethicists</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Calendar" size={24} className="text-warning" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Regular Reviews</h4>
                  <p className="text-sm text-muted-foreground">Quarterly ethics assessments</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="FileText" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Public Reports</h4>
                  <p className="text-sm text-muted-foreground">Annual ethics transparency reports</p>
                </div>
              </div>
            </div>
          </div>
        </div> 
        */}

      </div>
    </section>
  );
};

export default AIEthicsSection;