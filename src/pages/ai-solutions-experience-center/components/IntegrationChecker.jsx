import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const IntegrationChecker = () => {
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [businessSize, setBusinessSize] = useState('');
  const [industry, setIndustry] = useState('');
  const [checkResults, setCheckResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const systemCategories = {
    crm: {
      name: 'CRM Systems',
      icon: 'Users',
      systems: [
        { id: 'salesforce', name: 'Salesforce', compatibility: 'native', setup: 'easy' },
        { id: 'hubspot', name: 'HubSpot', compatibility: 'native', setup: 'easy' },
        { id: 'pipedrive', name: 'Pipedrive', compatibility: 'api', setup: 'medium' },
        { id: 'zoho', name: 'Zoho CRM', compatibility: 'api', setup: 'medium' },
        { id: 'monday', name: 'Monday.com', compatibility: 'webhook', setup: 'medium' }
      ]
    },
    email: {
      name: 'Email Platforms',
      icon: 'Mail',
      systems: [
        { id: 'mailchimp', name: 'Mailchimp', compatibility: 'native', setup: 'easy' },
        { id: 'constantcontact', name: 'Constant Contact', compatibility: 'api', setup: 'easy' },
        { id: 'sendinblue', name: 'Sendinblue', compatibility: 'api', setup: 'medium' },
        { id: 'outlook', name: 'Microsoft Outlook', compatibility: 'native', setup: 'easy' },
        { id: 'gmail', name: 'Gmail Workspace', compatibility: 'native', setup: 'easy' }
      ]
    },
    accounting: {
      name: 'Accounting Software',
      icon: 'Calculator',
      systems: [
        { id: 'quickbooks', name: 'QuickBooks', compatibility: 'native', setup: 'easy' },
        { id: 'xero', name: 'Xero', compatibility: 'api', setup: 'medium' },
        { id: 'freshbooks', name: 'FreshBooks', compatibility: 'api', setup: 'medium' },
        { id: 'sage', name: 'Sage', compatibility: 'custom', setup: 'complex' },
        { id: 'wave', name: 'Wave Accounting', compatibility: 'api', setup: 'medium' }
      ]
    },
    project: {
      name: 'Project Management',
      icon: 'Kanban',
      systems: [
        { id: 'asana', name: 'Asana', compatibility: 'native', setup: 'easy' },
        { id: 'trello', name: 'Trello', compatibility: 'api', setup: 'easy' },
        { id: 'slack', name: 'Slack', compatibility: 'native', setup: 'easy' },
        { id: 'teams', name: 'Microsoft Teams', compatibility: 'native', setup: 'medium' },
        { id: 'notion', name: 'Notion', compatibility: 'api', setup: 'medium' }
      ]
    },
    ecommerce: {
      name: 'E-commerce Platforms',
      icon: 'ShoppingCart',
      systems: [
        { id: 'shopify', name: 'Shopify', compatibility: 'native', setup: 'easy' },
        { id: 'woocommerce', name: 'WooCommerce', compatibility: 'plugin', setup: 'medium' },
        { id: 'magento', name: 'Magento', compatibility: 'custom', setup: 'complex' },
        { id: 'bigcommerce', name: 'BigCommerce', compatibility: 'api', setup: 'medium' },
        { id: 'square', name: 'Square', compatibility: 'api', setup: 'easy' }
      ]
    }
  };

  const businessSizeOptions = [
    { value: 'startup', label: 'Startup (1-10 employees)' },
    { value: 'small', label: 'Small Business (11-50 employees)' },
    { value: 'medium', label: 'Medium Business (51-200 employees)' },
    { value: 'large', label: 'Large Business (201-1000 employees)' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
  ];

  const industryOptions = [
    { value: 'general', label: 'General Business' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'education', label: 'Education' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'legal', label: 'Legal Services' }
  ];

  const toggleSystem = (categoryId, systemId) => {
    const systemKey = `${categoryId}-${systemId}`;
    setSelectedSystems(prev => 
      prev?.includes(systemKey) 
        ? prev?.filter(s => s !== systemKey)
        : [...prev, systemKey]
    );
  };

  const checkCompatibility = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const compatibilityScores = {
        native: 100,
        api: 85,
        plugin: 75,
        webhook: 70,
        custom: 60
      };
      
      const setupComplexity = {
        easy: 'Quick Setup (1-2 days)',
        medium: 'Standard Setup (3-7 days)',
        complex: 'Custom Setup (2-4 weeks)'
      };
      
      let totalScore = 0;
      let systemCount = 0;
      const integrationDetails = [];
      
      selectedSystems?.forEach(systemKey => {
        const [categoryId, systemId] = systemKey?.split('-');
        const system = systemCategories?.[categoryId]?.systems?.find(s => s?.id === systemId);
        
        if (system) {
          const score = compatibilityScores?.[system?.compatibility];
          totalScore += score;
          systemCount++;
          
          integrationDetails?.push({
            category: systemCategories?.[categoryId]?.name,
            system: system?.name,
            compatibility: system?.compatibility,
            score,
            setup: setupComplexity?.[system?.setup],
            setupTime: system?.setup
          });
        }
      });
      
      const averageScore = systemCount > 0 ? Math.round(totalScore / systemCount) : 0;
      
      // Business size impact
      const sizeMultipliers = {
        startup: 1.1,
        small: 1.0,
        medium: 0.95,
        large: 0.9,
        enterprise: 0.85
      };
      
      const finalScore = Math.round(averageScore * (sizeMultipliers?.[businessSize] || 1.0));
      
      setCheckResults({
        overallScore: finalScore,
        systemCount,
        integrationDetails,
        recommendations: generateRecommendations(finalScore, integrationDetails, businessSize, industry),
        estimatedTimeline: calculateTimeline(integrationDetails, businessSize),
        estimatedCost: calculateCost(integrationDetails, businessSize)
      });
      
      setIsChecking(false);
    }, 2000);
  };

  const generateRecommendations = (score, details, size, industryType) => {
    const recommendations = [];
    
    if (score >= 90) {
      recommendations?.push({
        type: 'success',
        title: 'Excellent Compatibility',
        message: 'Your systems are highly compatible with our AI solutions. Implementation will be smooth and fast.'
      });
    } else if (score >= 75) {
      recommendations?.push({
        type: 'info',
        title: 'Good Compatibility',
        message: 'Most of your systems integrate well. Some custom configuration may be needed for optimal performance.'
      });
    } else {
      recommendations?.push({
        type: 'warning',
        title: 'Custom Integration Required',
        message: 'Several systems will need custom integration work. Consider our Enterprise package for dedicated support.'
      });
    }
    
    // Add industry-specific recommendations
    if (industryType === 'healthcare') {
      recommendations?.push({
        type: 'info',
        title: 'HIPAA Compliance',
        message: 'We ensure all healthcare integrations meet HIPAA compliance requirements with encrypted data handling.'
      });
    }
    
    return recommendations;
  };

  const calculateTimeline = (details, size) => {
    const baseWeeks = {
      startup: 2,
      small: 3,
      medium: 4,
      large: 6,
      enterprise: 8
    };
    
    const complexityWeeks = details?.reduce((total, detail) => {
      const weeks = {
        easy: 0.5,
        medium: 1,
        complex: 2
      };
      return total + (weeks?.[detail?.setupTime] || 1);
    }, 0);
    
    return Math.ceil((baseWeeks?.[size] || 3) + complexityWeeks);
  };

  const calculateCost = (details, size) => {
    const baseCosts = {
      startup: 5000,
      small: 8000,
      medium: 15000,
      large: 25000,
      enterprise: 40000
    };
    
    const integrationCosts = details?.reduce((total, detail) => {
      const costs = {
        easy: 500,
        medium: 1500,
        complex: 5000
      };
      return total + (costs?.[detail?.setupTime] || 1000);
    }, 0);
    
    return (baseCosts?.[size] || 10000) + integrationCosts;
  };

  const getCompatibilityColor = (compatibility) => {
    const colors = {
      native: 'text-green-600',
      api: 'text-blue-600',
      plugin: 'text-yellow-600',
      webhook: 'text-orange-600',
      custom: 'text-red-600'
    };
    return colors?.[compatibility] || 'text-gray-600';
  };

  const getCompatibilityBadge = (compatibility) => {
    const badges = {
      native: 'Native',
      api: 'API',
      plugin: 'Plugin',
      webhook: 'Webhook',
      custom: 'Custom'
    };
    return badges?.[compatibility] || 'Unknown';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={24} className="text-trust" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Integration Compatibility Checker</h3>
          <p className="text-sm text-muted-foreground">Check how well your current systems integrate with our AI solutions</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Selection */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Business Size"
              options={businessSizeOptions}
              value={businessSize}
              onChange={setBusinessSize}
              placeholder="Select business size"
            />
            
            <Select
              label="Industry"
              options={industryOptions}
              value={industry}
              onChange={setIndustry}
              placeholder="Select industry"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Select Your Current Systems</h4>
            
            {Object.entries(systemCategories)?.map(([categoryId, category]) => (
              <div key={categoryId} className="border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name={category?.icon} size={18} className="text-primary" />
                  <h5 className="font-medium text-foreground">{category?.name}</h5>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category?.systems?.map((system) => {
                    const systemKey = `${categoryId}-${system?.id}`;
                    const isSelected = selectedSystems?.includes(systemKey);
                    
                    return (
                      <button
                        key={system?.id}
                        onClick={() => toggleSystem(categoryId, system?.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                        }`}
                      >
                        <span className="text-sm font-medium">{system?.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getCompatibilityColor(system?.compatibility)} bg-current/10`}>
                          {getCompatibilityBadge(system?.compatibility)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="default"
            fullWidth
            iconName="CheckCircle"
            iconPosition="left"
            onClick={checkCompatibility}
            loading={isChecking}
            disabled={selectedSystems?.length === 0 || !businessSize || !industry}
            className="bg-trust hover:bg-trust/90"
          >
            {isChecking ? 'Checking Compatibility...' : 'Check Compatibility'}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {checkResults ? (
            <>
              {/* Overall Score */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">Compatibility Score</h4>
                  <div className={`text-2xl font-bold ${
                    checkResults?.overallScore >= 90 ? 'text-green-600' :
                    checkResults?.overallScore >= 75 ? 'text-blue-600' :
                    checkResults?.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {checkResults?.overallScore}%
                  </div>
                </div>
                
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      checkResults?.overallScore >= 90 ? 'bg-green-600' :
                      checkResults?.overallScore >= 75 ? 'bg-blue-600' :
                      checkResults?.overallScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${checkResults?.overallScore}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  Based on {checkResults?.systemCount} selected systems
                </p>
              </div>

              {/* Recommendations */}
              <div className="space-y-3">
                {checkResults?.recommendations?.map((rec, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    rec?.type === 'success' ? 'bg-green-50 border-green-500' :
                    rec?.type === 'info'? 'bg-blue-50 border-blue-500' : 'bg-yellow-50 border-yellow-500'
                  }`}>
                    <h5 className="font-medium text-foreground text-sm">{rec?.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{rec?.message}</p>
                  </div>
                ))}
              </div>

              {/* Timeline & Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="Calendar" size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Estimated Timeline</p>
                  <p className="font-bold text-foreground">{checkResults?.estimatedTimeline} weeks</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="DollarSign" size={20} className="text-conversion mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Integration Cost</p>
                  <p className="font-bold text-foreground">
                    ${checkResults?.estimatedCost?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Integration Details */}
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Integration Details</h5>
                {checkResults?.integrationDetails?.map((detail, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="text-sm font-medium text-foreground">{detail?.system}</span>
                      <span className="text-xs text-muted-foreground ml-2">({detail?.category})</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${getCompatibilityColor(detail?.compatibility)} bg-current/10`}>
                        {detail?.score}% - {detail?.setup}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download Integration Report
              </Button>
            </>
          ) : (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Icon name="Puzzle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select your systems and business details to check compatibility
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationChecker;