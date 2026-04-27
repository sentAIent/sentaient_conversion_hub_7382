import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicatorsSection = () => {
  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: 'Shield',
      issuer: 'International Organization for Standardization',
      year: '2023'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Security, Availability & Confidentiality',
      icon: 'Lock',
      issuer: 'American Institute of CPAs',
      year: '2023'
    },
    {
      name: 'GDPR Compliant',
      description: 'Data Protection & Privacy',
      icon: 'UserCheck',
      issuer: 'European Union',
      year: '2023'
    },
    {
      name: 'AI Ethics Certified',
      description: 'Responsible AI Development',
      icon: 'Heart',
      issuer: 'Partnership on AI',
      year: '2023'
    }
  ];

  const partnerships = [
    {
      name: 'Microsoft AI Partner',
      logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      level: 'Gold Partner',
      description: 'Advanced AI solutions and Azure integration'
    },
    {
      name: 'Google Cloud AI',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      level: 'Premier Partner',
      description: 'Machine learning and data analytics'
    },
    {
      name: 'AWS AI Services',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      level: 'Advanced Partner',
      description: 'Cloud infrastructure and AI services'
    },
    {
      name: 'OpenAI Partner',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      level: 'Certified Partner',
      description: 'GPT integration and language models'
    }
  ];

  const mediaRecognition = [
    {
      publication: 'Forbes',
      title: 'Top 10 AI Consultancies to Watch in 2024',
      date: 'March 2024',
      quote: 'sentAIent stands out for their ethical approach to AI implementation and measurable business results.',
      icon: 'Award'
    },
    {
      publication: 'TechCrunch',
      title: 'The Human-Centered AI Revolution',
      date: 'February 2024',
      quote: 'Leading the charge in responsible AI deployment with impressive client success rates.',
      icon: 'Star'
    },
    {
      publication: 'Harvard Business Review',
      title: 'AI Implementation Best Practices',
      date: 'January 2024',
      quote: 'Their methodology framework has become a gold standard for enterprise AI adoption.',
      icon: 'BookOpen'
    },
    {
      publication: 'MIT Technology Review',
      title: 'Ethical AI in Practice',
      date: 'December 2023',
      quote: 'Demonstrating how ethical considerations can enhance rather than hinder AI effectiveness.',
      icon: 'Brain'
    }
  ];

  const industryStats = [
    {
      metric: '150+',
      label: 'Successful Implementations',
      description: 'AI projects delivered across diverse industries',
      icon: 'CheckCircle'
    },
    {
      metric: '98%',
      label: 'Client Retention Rate',
      description: 'Long-term partnerships built on trust and results',
      icon: 'Users'
    },
    {
      metric: '5.2x',
      label: 'Average ROI',
      description: 'Measurable business value delivered to clients',
      icon: 'TrendingUp'
    },
    {
      metric: '99.9%',
      label: 'System Uptime',
      description: 'Reliable, enterprise-grade AI solutions',
      icon: 'Shield'
    }
  ];

  const clientTestimonials = [
    {
      company: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      quote: 'sentAIent transformed our production efficiency by 45% while maintaining our commitment to worker safety and job security.',
      author: 'Sarah Johnson',
      role: 'Chief Operations Officer',
      results: ['45% efficiency increase', '30% cost reduction', '99.8% safety record']
    },
    {
      company: 'FinTech Innovations',
      industry: 'Financial Services',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      quote: 'Their ethical AI approach helped us implement fraud detection that actually improved customer experience rather than hindering it.',
      author: 'Michael Chen',
      role: 'Head of Technology',
      results: ['85% fraud reduction', '40% faster processing', '95% customer satisfaction']
    },
    {
      company: 'Healthcare Systems Alliance',
      industry: 'Healthcare',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      quote: 'The AI diagnostic tools they developed have improved patient outcomes while reducing physician workload significantly.',
      author: 'Dr. Emily Rodriguez',
      role: 'Chief Medical Officer',
      results: ['25% faster diagnosis', '92% accuracy rate', '60% workload reduction']
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-primary font-semibold text-lg">Trust & Recognition</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Industry Recognition &
            <span className="block text-primary">Client Trust</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence, ethical practices, and measurable results has earned recognition from industry leaders and the trust of clients worldwide.
          </p>
        </div>

        {/* Industry Stats */}
        {/*
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {industryStats?.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center shadow-subtle hover:shadow-elevation transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={28} color="var(--color-primary)" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat?.metric}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat?.label}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications * /}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Industry Certifications
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certifications demonstrate our commitment to security, privacy, and ethical AI practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevation transition-all duration-300">
                <div className="w-16 h-16 bg-conversion/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={28} color="var(--color-conversion)" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {cert?.name}
                </h4>
                <p className="text-muted-foreground text-sm mb-3">
                  {cert?.description}
                </p>
                
                <div className="text-xs text-muted-foreground">
                  <div>{cert?.issuer}</div>
                  <div className="font-semibold">{cert?.year}</div>
                </div>

              </div>
            ))}
          </div>
        </div>
        */}

        {/* Strategic Partnerships */}
        {/*
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Strategic Partnerships
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We partner with leading technology companies to deliver cutting-edge AI solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships?.map((partner, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevation transition-all duration-300">
                <div className="w-16 h-16 rounded-lg overflow-hidden mx-auto mb-4">
                  <img
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-1">
                  {partner?.name}
                </h4>
                <div className="text-primary font-semibold text-sm mb-2">
                  {partner?.level}
                </div>
                <p className="text-muted-foreground text-sm">
                  {partner?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Media Recognition */}
        {/*
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Media Recognition
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry publications recognize our leadership in ethical AI implementation and business results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mediaRecognition?.map((media, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 hover:shadow-elevation transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={media?.icon} size={24} color="var(--color-trust)" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-foreground">{media?.publication}</h4>
                      <span className="text-xs text-muted-foreground">{media?.date}</span>
                    </div>
                    <h5 className="text-lg font-semibold text-primary mb-3">
                      {media?.title}
                    </h5>
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      "{media?.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Client Testimonials */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Client Success Stories
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real clients across diverse industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {clientTestimonials?.map((testimonial, index) => (
              <div key={index} className="bg-muted/30 rounded-2xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial?.logo}
                    alt={testimonial?.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial?.company}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial?.industry}</p>
                  </div>
                </div>

                <blockquote className="text-muted-foreground italic leading-relaxed mb-4">
                  "{testimonial?.quote}"
                </blockquote>

                <div className="mb-4">
                  <div className="font-semibold text-foreground">{testimonial?.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-foreground">Key Results:</h5>
                  {testimonial?.results?.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={12} color="var(--color-conversion)" />
                      <span className="text-xs text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center">
            * Results vary. Data based on industry case studies.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join Our Success Stories
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Experience the same level of excellence and results that have transformed your competitors' operational efficiency and positioned them for long-term success in the age of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-primary-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
              >
                <Icon name="Calendar" size={20} />
                <span>Schedule Consultation</span>
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Icon name="FileText" size={20} />
                <span>View Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;