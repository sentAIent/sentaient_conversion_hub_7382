import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AssessmentResults = ({ results, onStartOver, onBookConsultation }) => {
  const readinessData = [
    { category: 'Technology Infrastructure', score: results?.techScore, maxScore: 100 },
    { category: 'Team Readiness', score: results?.teamScore, maxScore: 100 },
    { category: 'Process Maturity', score: results?.processScore, maxScore: 100 },
    { category: 'Data Quality', score: results?.dataScore, maxScore: 100 },
    { category: 'Change Management', score: results?.changeScore, maxScore: 100 }
  ];

  const roiData = [
    { timeframe: '3 Months', savings: results?.roi?.threeMonth, investment: results?.roi?.investment },
    { timeframe: '6 Months', savings: results?.roi?.sixMonth, investment: results?.roi?.investment },
    { timeframe: '12 Months', savings: results?.roi?.twelveMonth, investment: results?.roi?.investment },
    { timeframe: '24 Months', savings: results?.roi?.twentyFourMonth, investment: results?.roi?.investment }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="Award" size={32} color="white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Your AI Readiness Report</h2>
            <p className="text-white/90 text-lg">Comprehensive analysis completed on {new Date()?.toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{results?.overallScore}%</div>
            <div className="text-white/80">Overall AI Readiness</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{results?.priorityOpportunities}</div>
            <div className="text-white/80">Priority Opportunities</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">${results?.estimatedSavings?.toLocaleString()}</div>
            <div className="text-white/80">Est. Annual Savings</div>
          </div>
        </div>
      </div>
      {/* Readiness Breakdown */}
      <div className="bg-white rounded-xl shadow-brand p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <span>AI Readiness Breakdown</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {readinessData?.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{item?.category}</span>
                  <span className={`font-bold ${getScoreColor(item?.score)}`}>{item?.score}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      item?.score >= 80 ? 'bg-success' : item?.score >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${item?.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={readinessData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar
                  name="Readiness Score"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Automation Opportunities */}
      <div className="bg-white rounded-xl shadow-brand p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
          <Icon name="Zap" size={24} className="text-accent" />
          <span>Priority Automation Opportunities</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results?.opportunities?.map((opportunity, index) => (
            <div key={index} className={`p-6 rounded-lg border-2 ${getScoreBgColor(opportunity?.impact)} border-border`}>
              <div className="flex items-start space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getScoreBgColor(opportunity?.impact)}`}>
                  <Icon name={opportunity?.icon} size={20} className={getScoreColor(opportunity?.impact)} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{opportunity?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{opportunity?.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impact Score:</span>
                  <span className={`font-medium ${getScoreColor(opportunity?.impact)}`}>{opportunity?.impact}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Implementation:</span>
                  <span className="font-medium text-foreground">{opportunity?.timeline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Savings:</span>
                  <span className="font-medium text-success">${opportunity?.savings?.toLocaleString()}/year</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ROI Projections */}
      <div className="bg-white rounded-xl shadow-brand p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-success" />
          <span>ROI Projections</span>
        </h3>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeframe" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
              <Bar dataKey="savings" fill="var(--color-success)" name="Cumulative Savings" />
              <Bar dataKey="investment" fill="var(--color-warning)" name="Investment" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roiData?.map((item, index) => (
            <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-success">${item?.savings?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{item?.timeframe}</div>
              <div className="text-xs text-muted-foreground mt-1">
                ROI: {Math.round((item?.savings / item?.investment - 1) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Industry Benchmarking */}
      <div className="bg-white rounded-xl shadow-brand p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-3">
          <Icon name="Target" size={24} className="text-primary" />
          <span>Industry Benchmarking</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <div className="text-3xl font-bold text-error mb-2">{results?.benchmarking?.bottom25}%</div>
            <div className="text-sm text-muted-foreground">Bottom 25%</div>
            <div className="text-xs text-muted-foreground mt-1">Industry Laggards</div>
          </div>
          <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary">
            <div className="text-3xl font-bold text-primary mb-2">{results?.overallScore}%</div>
            <div className="text-sm font-medium text-primary">Your Score</div>
            <div className="text-xs text-muted-foreground mt-1">Current Position</div>
          </div>
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <div className="text-3xl font-bold text-success mb-2">{results?.benchmarking?.top25}%</div>
            <div className="text-sm text-muted-foreground">Top 25%</div>
            <div className="text-xs text-muted-foreground mt-1">Industry Leaders</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Competitive Positioning</h4>
              <p className="text-sm text-muted-foreground">
                {results?.competitiveInsight}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-gradient-to-r from-conversion to-success rounded-xl p-8 text-white">
        <h3 className="text-2xl font-semibold mb-4 flex items-center space-x-3">
          <Icon name="Rocket" size={24} color="white" />
          <span>Recommended Next Steps</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {results?.nextSteps?.map((step, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{step?.title}</h4>
                  <p className="text-sm text-white/80">{step?.description}</p>
                  <div className="text-xs text-white/60 mt-1">Timeline: {step?.timeline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onBookConsultation}
            iconName="Calendar"
            iconPosition="left"
            className="bg-white text-conversion hover:bg-white/90 border-white"
          >
            Book Free Strategy Session
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={onStartOver}
            iconName="RotateCcw"
            iconPosition="left"
            className="text-white hover:bg-white/10 border-white/20 border"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;