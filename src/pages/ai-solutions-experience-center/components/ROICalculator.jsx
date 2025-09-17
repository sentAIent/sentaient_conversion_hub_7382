import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    employees: 50,
    avgSalary: 60000,
<<<<<<< HEAD
    hoursPerWeek: 10,
    industry: 'general',
    solution: 'chatbot'
=======
    avgDailyCalls: 25,
    avgCheck: 50,
    avgPrivateDining: 1000,
    avgDailyCalls: 25,
    industryMissedCallRate: 0.35,
    industryMissedCallRatePrivateDining: 0.15,
    missedRevenue: 5000,
    hoursPerWeek: 10,
    industry: 'general',
    solution: 'agent'
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const industryOptions = [
    { value: 'general', label: 'General Business' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
<<<<<<< HEAD
    { value: 'education', label: 'Education' }
  ];

  const solutionOptions = [
    { value: 'chatbot', label: 'Generative Chatbot' },
    { value: 'agent', label: 'Autonomous Agent' },
    { value: 'automation', label: 'Custom Automation' },
    { value: 'all', label: 'Complete AI Suite' }
  ];

=======
    { value: 'education', label: 'Education' },
    { value: 'hospitality', label: 'Hospitality' }
  ];

  const solutionOptions = [
    { value: 'software', label: 'Custom Software Development' },
    { value: 'agent', label: 'Autonomous AI Agents' },
    { value: 'automation', label: 'Custom Software Development' },
    { value: 'marketing', label: 'Digital Marketing & Branding' },
    { value: 'all', label: 'Complete AI Suite' }
  ];

  const calculateMissedRevenue = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const avgCheck = inputs?.avgCheck;
      const avgPrivateDining = inputs?.avgPrivateDining;
      const avgDailyCalls = inputs?.avgDailyCalls;
      const industryMissedCallRate = 0.35;
      const industryMissedCallRatePrivateDining = 0.15;
      const missedRevenue = (avgCheck * (avgDailyCalls * industryMissedCallRate)) + (avgPrivateDining * (avgDailyCalls * industryMissedCallRatePrivateDining))
      
      setResults({
        avgCheck,
        avgPrivateDining,
        avgDailyCalls,
        industryMissedCallRate,
        industryMissedCallRatePrivateDining,
        missedRevenue
      });
      
      setIsCalculating(false);
    }, 2000);
  };

>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
  const calculateROI = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const hourlyRate = inputs?.avgSalary / (52 * 40);
      const weeklyTimeSaved = inputs?.hoursPerWeek;
      const annualTimeSaved = weeklyTimeSaved * 52;
      const annualSavings = annualTimeSaved * hourlyRate * inputs?.employees;
<<<<<<< HEAD
=======

      // calculateMissedRevenue();
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
      
      // Industry multipliers
      const industryMultipliers = {
        healthcare: 1.3,
        finance: 1.2,
        manufacturing: 1.4,
        retail: 1.1,
        education: 1.0,
<<<<<<< HEAD
=======
        hospitality: 1.5,
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
        general: 1.0
      };
      
      // Solution costs (annual)
      const solutionCosts = {
<<<<<<< HEAD
        chatbot: 30000,
        agent: 45000,
        automation: 60000,
        all: 120000
=======
        software: 8000,
        agent: 5000,
        automation: 500,
        marketing: 1500,
        all: 15000
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
      };
      
      const multiplier = industryMultipliers?.[inputs?.industry];
      const adjustedSavings = annualSavings * multiplier;
      const implementationCost = solutionCosts?.[inputs?.solution];
      const netSavings = adjustedSavings - implementationCost;
      const roiPercentage = ((netSavings / implementationCost) * 100);
      const paybackMonths = Math.ceil(implementationCost / (adjustedSavings / 12));
<<<<<<< HEAD
=======
      const avgCheck = inputs?.avgCheck;
      const avgPrivateDining = inputs?.avgPrivateDining;
      const avgDailyCalls = inputs?.avgDailyCalls;
      const industryMissedCallRate = 0.35;
      const industryMissedCallRatePrivateDining = 0.15;
      const missedRevenue = (avgCheck * (avgDailyCalls * industryMissedCallRate)) + (avgPrivateDining * (avgDailyCalls * industryMissedCallRatePrivateDining))
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
      
      setResults({
        annualSavings: adjustedSavings,
        implementationCost,
        netSavings,
        roiPercentage,
        paybackMonths,
<<<<<<< HEAD
=======
        avgCheck,
        avgPrivateDining,
        avgDailyCalls,
        industryMissedCallRate,
        industryMissedCallRatePrivateDining,
        missedRevenue,
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
        hoursPerYear: annualTimeSaved * inputs?.employees,
        productivityGain: Math.round((weeklyTimeSaved / 40) * 100)
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-conversion/10 rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={24} className="text-conversion" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">ROI Calculator</h3>
          <p className="text-sm text-muted-foreground">Calculate your potential return on investment</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <Input
            label="Number of Employees"
            type="number"
            value={inputs?.employees}
            onChange={(e) => setInputs(prev => ({ ...prev, employees: parseInt(e?.target?.value) || 0 }))}
            placeholder="50"
            min="1"
            max="10000"
          />
          
          <Input
            label="Average Annual Salary ($)"
            type="number"
            value={inputs?.avgSalary}
            onChange={(e) => setInputs(prev => ({ ...prev, avgSalary: parseInt(e?.target?.value) || 0 }))}
            placeholder="60000"
            min="20000"
            max="200000"
          />
          
          <Input
            label="Hours Saved Per Employee/Week"
            type="number"
            value={inputs?.hoursPerWeek}
            onChange={(e) => setInputs(prev => ({ ...prev, hoursPerWeek: parseInt(e?.target?.value) || 0 }))}
            placeholder="10"
            min="1"
            max="40"
            description="Estimated time saved through AI automation"
          />
<<<<<<< HEAD
=======

          <Input
            label="Check Average"
            type="number"
            value={inputs?.avgCheck}
            onChange={(e) => setInputs(prev => ({ ...prev, avgCheck: parseInt(e?.target?.value) || 0 }))}
            placeholder="50"
            min="5"
            max="2000"
            description="Estimated check average"
          />

          <Input
            label="Average Private Dining / Catering Per Event"
            type="number"
            value={inputs?.avgPrivateDining}
            onChange={(e) => setInputs(prev => ({ ...prev, avgPrivateDining: parseInt(e?.target?.value) || 0 }))}
            placeholder="1000"
            min="100"
            max="100000"
            description="Estimated average private dining per event"
          />

          <Input
            label="Inbound Calls Per Day"
            type="number"
            value={inputs?.avgDailyCalls}
            onChange={(e) => setInputs(prev => ({ ...prev, avgDailyCalls: parseInt(e?.target?.value) || 0 }))}
            placeholder="1000"
            min="5"
            max="100"
            description="Estimated average daily calls"
          />
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
          
          <Select
            label="Industry"
            options={industryOptions}
            value={inputs?.industry}
            onChange={(value) => setInputs(prev => ({ ...prev, industry: value }))}
          />
          
          <Select
            label="AI Solution"
            options={solutionOptions}
            value={inputs?.solution}
            onChange={(value) => setInputs(prev => ({ ...prev, solution: value }))}
          />
          
          <Button
            variant="default"
            fullWidth
            iconName="Calculator"
            iconPosition="left"
            onClick={calculateROI}
            loading={isCalculating}
            className="bg-conversion hover:bg-conversion/90"
          >
            {isCalculating ? 'Calculating...' : 'Calculate ROI'}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results ? (
            <>
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Your ROI Analysis</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Savings:</span>
                    <span className="font-semibold text-conversion">
                      {formatCurrency(results?.annualSavings)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Implementation Cost:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(results?.implementationCost)}
                    </span>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Net Annual Savings:</span>
                      <span className="font-bold text-lg text-conversion">
                        {formatCurrency(results?.netSavings)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ROI Percentage:</span>
                    <span className={`font-bold text-lg ${
                      results?.roiPercentage > 0 ? 'text-conversion' : 'text-error'
                    }`}>
                      {results?.roiPercentage?.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payback Period:</span>
                    <span className="font-semibold text-foreground">
                      {results?.paybackMonths} months
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="Clock" size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Hours Saved/Year</p>
                  <p className="font-bold text-foreground">{results?.hoursPerYear?.toLocaleString()}</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="TrendingUp" size={20} className="text-conversion mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Productivity Gain</p>
                  <p className="font-bold text-foreground">{results?.productivityGain}%</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule ROI Review
              </Button>
            </>
          ) : (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Enter your details and click Calculate ROI to see your potential savings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ROICalculator;
=======
export default ROICalculator;
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
