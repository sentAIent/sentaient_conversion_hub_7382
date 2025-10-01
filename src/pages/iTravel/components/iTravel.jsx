import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [calculatorData, setCalculatorData] = useState({
    employees: 50,
    manualHours: 20,
    hourlyRate: 25
  });
  
  const [roiResults, setRoiResults] = useState({
    monthlySavings: 0,
    annualSavings: 0,
    efficiency: 0
  });

  const [animatedNumbers, setAnimatedNumbers] = useState({
    monthlySavings: 0,
    annualSavings: 0,
    efficiency: 0
  });

  useEffect(() => {
    const monthly = calculatorData?.employees * calculatorData?.manualHours * calculatorData?.hourlyRate * 0.47;
    const annual = monthly * 12;
    const efficiency = 47;
    
    setRoiResults({
      monthlySavings: monthly,
      annualSavings: annual,
      efficiency: efficiency
    });
  }, [calculatorData]);

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedNumbers({
          monthlySavings: Math.floor(roiResults?.monthlySavings * easeOut),
          annualSavings: Math.floor(roiResults?.annualSavings * easeOut),
          efficiency: Math.floor(roiResults?.efficiency * easeOut)
        });
        
        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    };
    
    if (roiResults?.monthlySavings > 0) {
      animateNumbers();
    }
  }, [roiResults]);

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: Math.max(1, parseInt(value) || 1)
    }));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
      {/* Animated Background Network */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-accent rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full animate-pulse delay-500"></div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 212, 255)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(0, 212, 255)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <line x1="80" y1="80" x2="320" y2="160" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="320" y1="160" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Sparkles" size={16} />
                <span>Trusted by 500+ Growing Businesses</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI That{' '}
                <span className="text-accent relative">
                  Amplifies
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full"></div>
                </span>
                {' '}Human Potential
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Transform your business with intelligent automation that enhances human capabilities. 
                Experience measurable growth without disruption through our proven AI implementation methodology.
              </p>
            </div>

            <iframe src="https://claude.site/public/artifacts/7f2751f7-8472-427b-8693-e32da78b2465/embed" title="Claude Artifact" width="100%" height="600" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>
            
            <elevenlabs-convai agent-id="agent_4401k66g6ykrfyyscxycfz72rqjh"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/free-ai-assessment-portal">
                <Button
                  variant="default"
                  size="lg"
                  iconName="ClipboardCheck"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold w-full sm:w-auto"
                >
                  Start Free AI Assessment
                </Button>
              </Link>
              
              <Link to="/ai-solutions-experience-center">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                >
                  See Live Demos
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/70 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>500+ Implementations</span>
              </div>
            </div>
          </div>

          {/* Right Column - AI Impact Calculator */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-deep">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Icon name="Calculator" size={14} />
                <span>AI Impact Calculator</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                See Your Potential ROI
              </h3>
              <p className="text-muted-foreground">
                Discover how AI automation can transform your business metrics
              </p>
            </div>

            {/* Calculator Inputs */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Employees
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calculatorData?.employees}
                    onChange={(e) => handleInputChange('employees', e?.target?.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                  <Icon name="Users" size={18} className="absolute right-3 top-3.5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Manual Hours per Employee/Week
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calculatorData?.manualHours}
                    onChange={(e) => handleInputChange('manualHours', e?.target?.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                  <Icon name="Clock" size={18} className="absolute right-3 top-3.5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Average Hourly Rate ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calculatorData?.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e?.target?.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                  <Icon name="DollarSign" size={18} className="absolute right-3 top-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
              <h4 className="text-lg font-semibold text-primary mb-4 text-center">
                Your Potential Savings with AI
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-conversion">
                    ${animatedNumbers?.monthlySavings?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-conversion">
                    ${animatedNumbers?.annualSavings?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-conversion">
                    {animatedNumbers?.efficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <Link to="/free-ai-assessment-portal">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="bg-conversion hover:bg-conversion/90"
                  >
                    Get Detailed Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;