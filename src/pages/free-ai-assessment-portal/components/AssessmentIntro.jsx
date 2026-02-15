import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentIntro = ({ onStartAssessment }) => {
  const benefits = [
    {
      icon: 'Target',
      title: 'Personalized AI Strategy',
      description: 'Get tailored recommendations based on your specific business needs and current technology stack.'
    },
    {
      icon: 'TrendingUp',
      title: 'ROI Projections',
      description: 'Discover potential cost savings and efficiency gains with detailed financial impact analysis.'
    },
    {
      icon: 'BarChart3',
      title: 'Industry Benchmarking',
      description: 'See how your AI readiness compares to industry leaders and competitors in your sector.'
    },
    {
      icon: 'CheckCircle',
      title: 'Implementation Roadmap',
      description: 'Receive a prioritized action plan with clear next steps for your AI transformation journey.'
    }
  ];

  const features = [
    'Takes only 8-12 minutes to complete',
    'No credit card or payment required',
    'Instant results with detailed report',
    'Industry-specific recommendations',
    'Competitive benchmarking analysis',
    'Free consultation opportunity'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 lg:p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Brain" size={40} color="white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Free AI Readiness Assessment
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            Discover your AI transformation potential with our comprehensive business analysis.
            Get personalized insights, ROI projections, and a strategic roadmap tailored to your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={onStartAssessment}
              iconName="Play"
              iconPosition="left"
              className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8 py-4"
            >
              Start Your Assessment
            </Button>
            <Button
              variant="ghost"
              size="lg"
              iconName="Clock"
              iconPosition="left"
              className="text-white hover:bg-white/10 border-white/20 border text-lg px-8 py-4"
            >
              8-12 Minutes
            </Button>
          </div>
        </div>
      </div>
      {/* Benefits Grid */}
      <div className="bg-card rounded-xl shadow-elevation p-8 border border-border">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          What You'll Discover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit?.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Assessment Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-xl shadow-elevation p-8 border border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
            <span>Assessment Features</span>
          </h3>
          <ul className="space-y-4">
            {features?.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-xl shadow-elevation p-8 border border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
            <Icon name="Users" size={24} className="text-accent" />
            <span>Trusted by Industry Leaders</span>
          </h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Assessments Completed</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success mb-1">94%</div>
                <div className="text-sm text-muted-foreground">Found Valuable Insights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">87%</div>
                <div className="text-sm text-muted-foreground">Proceeded with Implementation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Process Overview */}
      <div className="bg-card rounded-xl shadow-elevation p-8 border border-border">
        <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
          Simple 3-Step Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FileText" size={24} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">1. Answer Questions</h4>
            <p className="text-muted-foreground">
              Complete our intelligent questionnaire about your business operations, technology, and goals.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="BarChart3" size={24} className="text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">2. Get Analysis</h4>
            <p className="text-muted-foreground">
              Our AI analyzes your responses and generates personalized insights and recommendations.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Download" size={24} className="text-success" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">3. Download Report</h4>
            <p className="text-muted-foreground">
              Receive your comprehensive AI readiness report with actionable next steps.
            </p>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-conversion rounded-xl p-8 text-conversion-foreground text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Unlock Your AI Potential?</h3>
        <p className="text-conversion-foreground/90 mb-6 text-lg">
          Join thousands of business leaders who have discovered their AI transformation opportunities.
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={onStartAssessment}
          iconName="ArrowRight"
          iconPosition="right"
          className="bg-foreground text-conversion hover:bg-foreground/90 border-foreground text-lg px-8 py-4"
        >
          Begin Assessment Now
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntro;