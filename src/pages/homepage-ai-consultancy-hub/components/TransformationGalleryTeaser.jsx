import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TransformationGalleryTeaser = () => {
  const [activeVisualization, setActiveVisualization] = useState(0);

  const transformations = [
    {
      id: 1,
      title: 'Customer Service Automation',
      industry: 'Financial Services',
      beforeImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center',
      beforeStats: {
        responseTime: '48 hours',
        satisfaction: '72%',
        resolution: '65%',
        cost: '$85K/month'
      },
      afterStats: {
        responseTime: '2 minutes',
        satisfaction: '94%',
        resolution: '89%',
        cost: '$32K/month'
      },
      improvements: [
        { metric: 'Response Time', improvement: '96% faster' },
        { metric: 'Customer Satisfaction', improvement: '+22 points' },
        { metric: 'First-Call Resolution', improvement: '+24 points' },
        { metric: 'Operational Cost', improvement: '62% reduction' }
      ],
      description: 'Implemented AI chatbots and intelligent routing system that transformed customer support operations.',
      timeline: '3 months implementation'
    },
    {
      id: 2,
      title: 'Inventory Management Optimization',
      industry: 'E-commerce Retail',
      beforeImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
      beforeStats: {
        accuracy: '78%',
        stockouts: '23%',
        overstock: '31%',
        turnover: '4.2x/year'
      },
      afterStats: {
        accuracy: '96%',
        stockouts: '6%',
        overstock: '12%',
        turnover: '7.8x/year'
      },
      improvements: [
        { metric: 'Inventory Accuracy', improvement: '+18 points' },
        { metric: 'Stockout Reduction', improvement: '74% decrease' },
        { metric: 'Overstock Reduction', improvement: '61% decrease' },
        { metric: 'Inventory Turnover', improvement: '86% increase' }
      ],
      description: 'Deployed predictive analytics and automated reordering system for optimal inventory levels.',
      timeline: '4 months implementation'
    },
    {
      id: 3,
      title: 'Quality Control Enhancement',
      industry: 'Manufacturing',
      beforeImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=300&fit=crop&crop=center',
      beforeStats: {
        defectRate: '3.2%',
        inspection: '100% manual',
        throughput: '850 units/day',
        recalls: '12/year'
      },
      afterStats: {
        defectRate: '0.4%',
        inspection: '95% automated',
        throughput: '1,340 units/day',
        recalls: '1/year'
      },
      improvements: [
        { metric: 'Defect Rate', improvement: '87% reduction' },
        { metric: 'Inspection Speed', improvement: '95% automated' },
        { metric: 'Production Throughput', improvement: '+58% increase' },
        { metric: 'Product Recalls', improvement: '92% reduction' }
      ],
      description: 'Integrated computer vision AI for real-time defect detection and quality assurance.',
      timeline: '5 months implementation'
    }
  ];

  const currentTransformation = transformations?.[activeVisualization];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-cta/10 text-cta px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="BarChart3" size={16} />
            <span>Transformation Gallery Preview</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Before & After:{' '}
            <span className="text-primary">Real Business Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Witness the dramatic transformations our AI solutions deliver. 
            See measurable improvements in efficiency, accuracy, and cost reduction.
          </p>
        </div>

        {/* Transformation Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {transformations?.map((transformation, index) => (
            <button
              key={transformation?.id}
              onClick={() => setActiveVisualization(index)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeVisualization === index
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }`}
            >
              {transformation?.title}
            </button>
          ))}
        </div>

        {/* Main Visualization */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevation border border-border overflow-hidden">
            
            {/* Header */}
            <div className="p-8 border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentTransformation?.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-2">
                      <Icon name="Building" size={16} />
                      <span>{currentTransformation?.industry}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} />
                      <span>{currentTransformation?.timeline}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-conversion/10 text-conversion px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="TrendingUp" size={16} />
                  <span>Active Success Story</span>
                </div>
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                
                {/* Before Section */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-error/10 text-error px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <Icon name="AlertCircle" size={14} />
                      <span>Before AI Implementation</span>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={currentTransformation?.beforeImage}
                      alt="Before transformation"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-error/20"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(currentTransformation?.beforeStats)?.map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-error mb-1">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* After Section */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-conversion/10 text-conversion px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <Icon name="CheckCircle" size={14} />
                      <span>After AI Implementation</span>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={currentTransformation?.afterImage}
                      alt="After transformation"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-conversion/20"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(currentTransformation?.afterStats)?.map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-conversion mb-1">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Improvement Metrics */}
              <div className="bg-gradient-to-r from-conversion/5 to-primary/5 rounded-xl p-6 border border-conversion/20 mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Key Improvements Achieved
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentTransformation?.improvements?.map((improvement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold text-conversion mb-1">
                        {improvement?.improvement}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {improvement?.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="text-center">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {currentTransformation?.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="FileText"
                    iconPosition="left"
                    className="bg-primary hover:bg-primary/90"
                  >
                    View Full Case Study
                  </Button>
                  <Link to="/free-ai-assessment-portal">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Calculator"
                      iconPosition="left"
                    >
                      Calculate Your ROI
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-subtle border border-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to See Your Own Transformation?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every business is unique. Let us show you exactly how AI can transform your specific operations 
              with a personalized assessment and custom demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-ai-assessment-portal">
                <Button
                  variant="default"
                  size="lg"
                  iconName="ClipboardCheck"
                  iconPosition="left"
                  className="bg-conversion hover:bg-conversion/90"
                >
                  Get Free Assessment
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
              >
                Book Strategy Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationGalleryTeaser;