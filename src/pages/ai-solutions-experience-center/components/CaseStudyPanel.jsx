import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CaseStudyPanel = ({ solution }) => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = {
    chatbot: [
      {
        id: 1,
        company: "MedCare Health Systems",
        industry: "Healthcare",
        challenge: "Overwhelmed customer service team handling 500+ daily patient inquiries about appointments, billing, and general health questions.",
        solution: "Implemented AI chatbot to handle routine inquiries, appointment scheduling, and provide basic health information with seamless handoff to human agents.",
        results: {
          responseTime: "From 4 hours to 30 seconds",
          satisfaction: "92% patient satisfaction",
          costSaving: "$180,000 annually",
          efficiency: "65% reduction in call volume"
        },
        testimonial: "The AI chatbot has transformed our patient experience. We can now focus on complex cases while ensuring every patient gets immediate assistance.",
        author: "Dr. Sarah Mitchell, Chief Operations Officer",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        company: "TechStart Solutions",
        industry: "Technology",
        challenge: "Growing SaaS company struggling with 24/7 customer support across multiple time zones with limited support staff.",
        solution: "Deployed intelligent chatbot with technical knowledge base integration and escalation protocols for complex technical issues.",
        results: {
          availability: "24/7 global support",
          resolution: "78% first-contact resolution",
          growth: "300% support capacity increase",
          satisfaction: "89% customer satisfaction"
        },
        testimonial: "Our AI chatbot handles technical questions better than some of our junior support staff. It\'s been a game-changer for scaling our support.",
        author: "Mike Chen, Head of Customer Success",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
      }
    ],
    agent: [
      {
        id: 1,
        company: "Premier Dental Group",
        industry: "Healthcare",
        challenge: "Managing appointment scheduling across 5 locations with frequent cancellations and no-shows impacting revenue and efficiency.",
        solution: "Autonomous agent system handling appointment booking, rescheduling, automated reminders, and waitlist management with intelligent optimization.",
        results: {
          noShows: "40% reduction in no-shows",
          efficiency: "85% scheduling efficiency",
          revenue: "$250,000 additional revenue",
          satisfaction: "94% patient satisfaction"
        },
        testimonial: "The autonomous scheduling agent has eliminated double-bookings and optimized our calendar utilization. Our staff can focus on patient care instead of phone calls.",
        author: "Dr. Jennifer Rodriguez, Practice Manager",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        company: "Elite Financial Advisors",
        industry: "Financial Services",
        challenge: "High-value clients expecting personalized service and immediate responses while managing complex investment portfolios and compliance requirements.",
        solution: "AI agent managing client communications, portfolio updates, compliance tracking, and automated reporting with personalized insights.",
        results: {
          responseTime: "From 24 hours to 5 minutes",
          clientRetention: "98% client retention rate",
          productivity: "60% advisor productivity increase",
          compliance: "100% compliance accuracy"
        },
        testimonial: "Our AI agent ensures no client communication falls through the cracks while maintaining the personal touch our high-net-worth clients expect.",
        author: "Robert Thompson, Senior Partner",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
      }
    ],
    automation: [
      {
        id: 1,
        company: "Manufacturing Plus Inc.",
        industry: "Manufacturing",
        challenge: "Manual inventory tracking and order processing leading to stockouts, overstock situations, and delayed customer deliveries.",
        solution: "Custom automation system integrating inventory management, demand forecasting, automated reordering, and supply chain optimization.",
        results: {
          inventory: "30% inventory cost reduction",
          accuracy: "99.5% order accuracy",
          delivery: "50% faster delivery times",
          efficiency: "75% process automation"
        },
        testimonial: "The automation system has transformed our operations. We\'ve eliminated manual errors and can predict demand patterns we never saw before.",
        author: "Lisa Park, Operations Director",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        company: "GrowthCorp Marketing",
        industry: "Marketing Agency",
        challenge: "Managing multiple client campaigns with manual reporting, lead tracking, and campaign optimization consuming excessive time and resources.",
        solution: "Automated workflow system handling campaign management, performance tracking, client reporting, and lead nurturing with intelligent optimization.",
        results: {
          timeReduction: "70% reduction in manual tasks",
          clientCapacity: "200% increase in client capacity",
          performance: "45% improvement in campaign ROI",
          reporting: "Real-time automated reporting"
        },
        testimonial: "Automation has allowed us to scale from 10 to 30 clients without increasing our team size. The quality of our campaigns has actually improved.",
        author: "David Kim, Agency Owner",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      }
    ]
  };

  const currentCases = caseStudies?.[solution] || caseStudies?.chatbot;
  const currentCase = currentCases?.[activeCase];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-muted p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Success Stories</h3>
          <div className="flex space-x-1">
            {currentCases?.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeCase ? 'bg-primary' : 'bg-border hover:bg-border/80'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Real results from businesses like yours
        </p>
      </div>
      {/* Case Study Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="relative mb-4">
              <Image
                src={currentCase?.image}
                alt={`${currentCase?.company} office`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-2 left-2 text-white">
                <h4 className="font-semibold text-sm">{currentCase?.company}</h4>
                <p className="text-xs opacity-90">{currentCase?.industry}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-foreground text-sm mb-1">Challenge</h5>
                <p className="text-xs text-muted-foreground">{currentCase?.challenge}</p>
              </div>
              
              <div>
                <h5 className="font-semibold text-foreground text-sm mb-1">Solution</h5>
                <p className="text-xs text-muted-foreground">{currentCase?.solution}</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <h5 className="font-semibold text-foreground mb-3">Key Results</h5>
            <div className="space-y-3">
              {Object.entries(currentCase?.results)?.map(([key, value], index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-conversion/10 rounded-full flex items-center justify-center">
                    <Icon 
                      name={
                        key?.includes('time') || key?.includes('delivery') ? 'Clock' :
                        key?.includes('satisfaction') || key?.includes('retention') ? 'Heart' :
                        key?.includes('cost') || key?.includes('revenue') ? 'DollarSign' :
                        key?.includes('efficiency') || key?.includes('accuracy') ? 'Target' :
                        'TrendingUp'
                      } 
                      size={16} 
                      className="text-conversion" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="lg:col-span-1">
            <h5 className="font-semibold text-foreground mb-3">Client Testimonial</h5>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <Icon name="Quote" size={20} className="text-primary mb-2" />
              <blockquote className="text-sm text-foreground mb-3 italic">
                "{currentCase?.testimonial}"
              </blockquote>
              <cite className="text-xs text-muted-foreground font-medium">
                — {currentCase?.author}
              </cite>
            </div>
            
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="FileText"
                iconPosition="left"
              >
                Download Full Case Study
              </Button>
              <Button
                variant="default"
                size="sm"
                fullWidth
                iconName="Users"
                iconPosition="left"
                className="bg-conversion hover:bg-conversion/90"
                onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
              >
                Connect with Similar Clients
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPanel;