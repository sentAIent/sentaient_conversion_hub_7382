import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: 'security', label: 'Security & Compliance' },
    { value: 'privacy', label: 'Data Privacy' },
    { value: 'certification', label: 'Certification Verification' },
    { value: 'audit', label: 'Audit & Assessment' },
    { value: 'incident', label: 'Security Incident' },
    { value: 'general', label: 'General Trust Inquiry' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - General Inquiry' },
    { value: 'normal', label: 'Normal - Standard Response' },
    { value: 'high', label: 'High - Urgent Matter' },
    { value: 'critical', label: 'Critical - Security Incident' }
  ];

  const contactMethods = [
    {
      method: 'Security Hotline',
      description: 'For urgent security matters and incident reporting',
      contact: '+1 (323) 250-6923',
      availability: '24/7 Emergency Response',
      icon: 'Phone',
      color: 'text-error'
    },
    {
      method: 'Data Protection Officer',
      description: 'For privacy concerns and data protection inquiries',
      contact: 'legal@sentaient.com',
      availability: 'Response within 24 hours',
      icon: 'Mail',
      color: 'text-primary'
    },
    {
      method: 'Compliance Team',
      description: 'For certification verification and compliance questions',
      contact: 'legal@sentaient.com',
      availability: 'Business hours response',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      method: 'Trust & Safety',
      description: 'For general trust and transparency inquiries',
      contact: 'legal@sentaient.com',
      availability: 'Response within 48 hours',
      icon: 'Heart',
      color: 'text-accent'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your inquiry. Our team will respond within the specified timeframe based on your inquiry type.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      inquiryType: '',
      subject: '',
      message: '',
      urgency: 'normal'
    });
    
    setIsSubmitting(false);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'normal':
        return 'text-primary';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-primary';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
            <Icon name="MessageCircle" size={32} className="text-accent" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Contact Our Trust Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions about our security practices, compliance certifications, or data handling procedures? Our dedicated trust and transparency team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Direct Contact Methods
            </h3>
            <div className="space-y-6">
              {contactMethods?.map((method, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={method?.icon} size={24} className={method?.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {method?.method}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        {method?.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="Contact" size={16} className="text-primary" />
                          <span className="text-foreground font-medium">{method?.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={16} className="text-success" />
                          <span className="text-muted-foreground text-sm">{method?.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Guarantee */}
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Clock" size={20} className="mr-2 text-primary" />
                Response Time Guarantee
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical Security:</span>
                  <span className="text-error font-medium">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High Priority:</span>
                  <span className="text-warning font-medium">&lt; 12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Normal Inquiry:</span>
                  <span className="text-primary font-medium">&lt; 18 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">General Questions:</span>
                  <span className="text-muted-foreground font-medium">&lt; 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card border border-border rounded-lg p-8">
              
              {/* Additional Information */}
              <div className="mt-6 bg-muted/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Before You Contact Us
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Check our certification verification links above</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Review our published security documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>For emergencies, call our 24/7 security hotline</span>
                  </li>
                </ul>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <Input
                  label="Company"
                  type="text"
                  name="company"
                  value={formData?.company}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Inquiry Type"
                    options={inquiryTypes}
                    value={formData?.inquiryType}
                    onChange={(value) => handleSelectChange('inquiryType', value)}
                    placeholder="Select inquiry type"
                    required
                  />
                  <Select
                    label="Priority Level"
                    options={urgencyLevels}
                    value={formData?.urgency}
                    onChange={(value) => handleSelectChange('urgency', value)}
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData?.subject}
                  onChange={handleInputChange}
                  placeholder="Brief subject line"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData?.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                    required
                  />
                </div>

                {formData?.urgency && (
                  <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                    <Icon name="Info" size={16} className={getUrgencyColor(formData?.urgency)} />
                    <span className="text-sm text-muted-foreground">
                      Expected response time: {urgencyLevels?.find(level => level?.value === formData?.urgency)?.label?.split(' - ')?.[1]}
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  fullWidth
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;