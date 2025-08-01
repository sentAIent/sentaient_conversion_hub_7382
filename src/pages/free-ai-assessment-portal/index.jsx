import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AssessmentIntro from './components/AssessmentIntro';
import AssessmentProgress from './components/AssessmentProgress';
import QuestionCard from './components/QuestionCard';
import AssessmentResults from './components/AssessmentResults';

const FreeAIAssessmentPortal = () => {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'assessment', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentResults, setAssessmentResults] = useState(null);

  // Assessment questions with dynamic branching logic
  const questions = [
    {
      id: 'company-size',
      type: 'single-choice',
      icon: 'Building2',
      title: 'What is your company size?',
      description: 'This helps us understand your organizational structure and resource availability.',
      required: true,
      options: [
        { value: 'startup', label: '1-10 employees', description: 'Early stage startup' },
        { value: 'small', label: '11-50 employees', description: 'Small business' },
        { value: 'medium', label: '51-200 employees', description: 'Medium-sized company' },
        { value: 'large', label: '201-1000 employees', description: 'Large enterprise' },
        { value: 'enterprise', label: '1000+ employees', description: 'Enterprise organization' }
      ]
    },
    {
      id: 'industry',
      type: 'single-choice',
      icon: 'Briefcase',
      title: 'Which industry best describes your business?',
      description: 'Industry-specific insights help us provide more relevant recommendations.',
      required: true,
      options: [
        { value: 'technology', label: 'Technology & Software', description: 'SaaS, software development, IT services' },
        { value: 'healthcare', label: 'Healthcare & Medical', description: 'Hospitals, clinics, medical devices' },
        { value: 'finance', label: 'Financial Services', description: 'Banking, insurance, fintech' },
        { value: 'retail', label: 'Retail & E-commerce', description: 'Online/offline retail, consumer goods' },
        { value: 'manufacturing', label: 'Manufacturing', description: 'Production, supply chain, logistics' },
        { value: 'professional', label: 'Professional Services', description: 'Consulting, legal, accounting' },
        { value: 'other', label: 'Other', description: 'Different industry not listed above' }
      ]
    },
    {
      id: 'primary-challenges',
      type: 'multiple-choice',
      icon: 'AlertTriangle',
      title: 'What are your primary business challenges?',
      description: 'Select all that apply. This helps us identify where AI can have the biggest impact.',
      helpText: 'Choose multiple options that best represent your current pain points.',
      required: true,
      options: [
        { value: 'manual-processes', label: 'Too many manual processes', description: 'Repetitive tasks consuming valuable time' },
        { value: 'customer-service', label: 'Customer service bottlenecks', description: 'Slow response times, high support volume' },
        { value: 'data-analysis', label: 'Difficulty analyzing data', description: 'Struggling to extract insights from data' },
        { value: 'operational-efficiency', label: 'Poor operational efficiency', description: 'Inefficient workflows and processes' },
        { value: 'scaling-issues', label: 'Challenges scaling operations', description: 'Growth limited by current processes' },
        { value: 'competitive-pressure', label: 'Competitive pressure', description: 'Need to innovate to stay competitive' }
      ]
    },
    {
      id: 'current-tech-stack',
      type: 'single-choice',
      icon: 'Server',
      title: 'How would you describe your current technology infrastructure?',
      description: 'Understanding your tech maturity helps us recommend appropriate AI solutions.',
      required: true,
      options: [
        { value: 'basic', label: 'Basic/Legacy Systems', description: 'Mostly manual processes, older software' },
        { value: 'moderate', label: 'Moderate Digital Presence', description: 'Some cloud tools, basic automation' },
        { value: 'advanced', label: 'Advanced Technology Stack', description: 'Modern cloud infrastructure, APIs' },
        { value: 'cutting-edge', label: 'Cutting-edge/AI-Ready', description: 'Latest tech, some AI/ML already in use' }
      ]
    },
    {
      id: 'team-readiness',
      type: 'single-choice',
      icon: 'Users',
      title: 'How ready is your team for AI adoption?',
      description: 'Team readiness is crucial for successful AI implementation.',
      required: true,
      options: [
        { value: 'resistant', label: 'Resistant to Change', description: 'Team prefers current methods' },
        { value: 'cautious', label: 'Cautiously Interested', description: 'Open but need convincing' },
        { value: 'eager', label: 'Eager to Adopt', description: 'Excited about new technology' },
        { value: 'experienced', label: 'Already Experienced', description: 'Has worked with AI/automation before' }
      ]
    },
    {
      id: 'budget-range',
      type: 'single-choice',
      icon: 'DollarSign',
      title: 'What is your estimated budget for AI initiatives?',
      description: 'This helps us recommend solutions that fit your investment capacity.',
      required: true,
      options: [
        { value: 'under-10k', label: 'Under $10,000', description: 'Small pilot projects' },
        { value: '10k-50k', label: '$10,000 - $50,000', description: 'Moderate implementation' },
        { value: '50k-200k', label: '$50,000 - $200,000', description: 'Comprehensive solution' },
        { value: 'over-200k', label: 'Over $200,000', description: 'Enterprise-wide transformation' }
      ]
    },
    {
      id: 'timeline',
      type: 'single-choice',
      icon: 'Clock',
      title: 'What is your preferred implementation timeline?',
      description: 'Understanding your urgency helps us prioritize recommendations.',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate (1-3 months)', description: 'Urgent need for solutions' },
        { value: 'short-term', label: 'Short-term (3-6 months)', description: 'Quick wins and pilot projects' },
        { value: 'medium-term', label: 'Medium-term (6-12 months)', description: 'Planned strategic implementation' },
        { value: 'long-term', label: 'Long-term (12+ months)', description: 'Comprehensive transformation' }
      ]
    },
    {
      id: 'success-metrics',
      type: 'multiple-choice',
      icon: 'Target',
      title: 'What success metrics are most important to you?',
      description: 'Select the outcomes that matter most for measuring AI implementation success.',
      required: true,
      options: [
        { value: 'cost-reduction', label: 'Cost Reduction', description: 'Lower operational expenses' },
        { value: 'time-savings', label: 'Time Savings', description: 'Faster processes and workflows' },
        { value: 'revenue-growth', label: 'Revenue Growth', description: 'Increased sales and opportunities' },
        { value: 'customer-satisfaction', label: 'Customer Satisfaction', description: 'Better customer experience' },
        { value: 'employee-productivity', label: 'Employee Productivity', description: 'More efficient workforce' },
        { value: 'competitive-advantage', label: 'Competitive Advantage', description: 'Market differentiation' }
      ]
    }
  ];

  // Calculate assessment results based on answers
  const calculateResults = () => {
    const companySize = answers?.['company-size'];
    const industry = answers?.['industry'];
    const challenges = answers?.['primary-challenges'] || [];
    const techStack = answers?.['current-tech-stack'];
    const teamReadiness = answers?.['team-readiness'];
    const budget = answers?.['budget-range'];
    const timeline = answers?.['timeline'];
    const metrics = answers?.['success-metrics'] || [];

    // Calculate readiness scores
    const techScore = getTechScore(techStack);
    const teamScore = getTeamScore(teamReadiness);
    const processScore = getProcessScore(challenges);
    const dataScore = getDataScore(techStack, industry);
    const changeScore = getChangeScore(teamReadiness, timeline);

    const overallScore = Math.round((techScore + teamScore + processScore + dataScore + changeScore) / 5);

    // Generate opportunities based on challenges and industry
    const opportunities = generateOpportunities(challenges, industry, budget);

    // Calculate ROI projections
    const roi = calculateROI(companySize, budget, challenges);

    // Generate next steps
    const nextSteps = generateNextSteps(overallScore, timeline, budget);

    return {
      overallScore,
      techScore,
      teamScore,
      processScore,
      dataScore,
      changeScore,
      priorityOpportunities: opportunities?.length,
      estimatedSavings: roi?.annualSavings,
      opportunities,
      roi,
      benchmarking: {
        bottom25: 45,
        top25: 85
      },
      competitiveInsight: getCompetitiveInsight(overallScore, industry),
      nextSteps
    };
  };

  // Helper functions for calculations
  const getTechScore = (techStack) => {
    const scores = { 'basic': 30, 'moderate': 55, 'advanced': 80, 'cutting-edge': 95 };
    return scores?.[techStack] || 50;
  };

  const getTeamScore = (teamReadiness) => {
    const scores = { 'resistant': 25, 'cautious': 50, 'eager': 80, 'experienced': 95 };
    return scores?.[teamReadiness] || 50;
  };

  const getProcessScore = (challenges) => {
    const challengeCount = challenges?.length;
    return Math.max(20, 100 - (challengeCount * 15));
  };

  const getDataScore = (techStack, industry) => {
    const techMultiplier = { 'basic': 0.3, 'moderate': 0.6, 'advanced': 0.9, 'cutting-edge': 1.0 };
    const industryBonus = ['technology', 'finance']?.includes(industry) ? 20 : 0;
    return Math.min(95, (techMultiplier?.[techStack] || 0.5) * 70 + industryBonus);
  };

  const getChangeScore = (teamReadiness, timeline) => {
    const teamMultiplier = { 'resistant': 0.3, 'cautious': 0.6, 'eager': 0.9, 'experienced': 1.0 };
    const timelineBonus = { 'immediate': 0, 'short-term': 10, 'medium-term': 20, 'long-term': 30 };
    return Math.min(95, (teamMultiplier?.[teamReadiness] || 0.5) * 60 + (timelineBonus?.[timeline] || 0));
  };

  const generateOpportunities = (challenges, industry, budget) => {
    const opportunityMap = {
      'manual-processes': {
        title: 'Process Automation',
        description: 'Automate repetitive tasks and workflows to save time and reduce errors.',
        icon: 'Zap',
        impact: 85,
        timeline: '2-4 months',
        savings: 45000
      },
      'customer-service': {
        title: 'AI Chatbot Implementation',
        description: 'Deploy intelligent chatbots to handle customer inquiries 24/7.',
        icon: 'MessageCircle',
        impact: 78,
        timeline: '1-3 months',
        savings: 32000
      },
      'data-analysis': {
        title: 'Predictive Analytics',
        description: 'Implement AI-driven analytics for better business insights.',
        icon: 'BarChart3',
        impact: 82,
        timeline: '3-6 months',
        savings: 58000
      },
      'operational-efficiency': {
        title: 'Workflow Optimization',
        description: 'AI-powered workflow analysis and optimization recommendations.',
        icon: 'Settings',
        impact: 75,
        timeline: '2-5 months',
        savings: 38000
      },
      'scaling-issues': {
        title: 'Intelligent Resource Management',
        description: 'AI systems to optimize resource allocation and capacity planning.',
        icon: 'TrendingUp',
        impact: 88,
        timeline: '4-8 months',
        savings: 72000
      },
      'competitive-pressure': {
        title: 'Market Intelligence AI',
        description: 'Competitive analysis and market trend prediction systems.',
        icon: 'Target',
        impact: 70,
        timeline: '3-6 months',
        savings: 42000
      }
    };

    return challenges?.map(challenge => opportunityMap?.[challenge])?.filter(Boolean);
  };

  const calculateROI = (companySize, budget, challenges) => {
    const sizeMultiplier = { 'startup': 0.5, 'small': 1, 'medium': 2, 'large': 4, 'enterprise': 8 };
    const baseSavings = (sizeMultiplier?.[companySize] || 1) * 15000;
    const challengeBonus = challenges?.length * 8000;
    const annualSavings = baseSavings + challengeBonus;

    const budgetAmount = {
      'under-10k': 7500,
      '10k-50k': 30000,
      '50k-200k': 125000,
      'over-200k': 300000
    }?.[budget] || 30000;

    return {
      investment: budgetAmount,
      annualSavings,
      threeMonth: Math.round(annualSavings * 0.15),
      sixMonth: Math.round(annualSavings * 0.35),
      twelveMonth: annualSavings,
      twentyFourMonth: Math.round(annualSavings * 2.2)
    };
  };

  const generateNextSteps = (overallScore, timeline, budget) => {
    const steps = [];

    if (overallScore < 60) {
      steps?.push({
        title: 'Foundation Assessment',
        description: 'Conduct detailed analysis of current processes and technology infrastructure.',
        timeline: '2-4 weeks'
      });
      steps?.push({
        title: 'Team Training Program',
        description: 'Implement AI literacy training to prepare your team for transformation.',
        timeline: '4-6 weeks'
      });
    } else {
      steps?.push({
        title: 'Pilot Project Selection',
        description: 'Identify and prioritize high-impact, low-risk AI implementation opportunities.',
        timeline: '1-2 weeks'
      });
      steps?.push({
        title: 'Solution Architecture',
        description: 'Design comprehensive AI solution architecture tailored to your needs.',
        timeline: '2-3 weeks'
      });
    }

    steps?.push({
      title: 'Implementation Planning',
      description: 'Create detailed project timeline with milestones and success metrics.',
      timeline: '1-2 weeks'
    });

    steps?.push({
      title: 'Deployment & Optimization',
      description: 'Execute implementation plan with continuous monitoring and optimization.',
      timeline: timeline === 'immediate' ? '4-8 weeks' : '8-16 weeks'
    });

    return steps;
  };

  const getCompetitiveInsight = (score, industry) => {
    if (score >= 80) {
      return `Your organization is well-positioned as an AI leader in the ${industry} industry. Focus on advanced implementations and competitive differentiation.`;
    } else if (score >= 60) {
      return `You're in the middle tier for AI readiness in ${industry}. Strategic investments can quickly move you to industry leadership.`;
    } else {
      return `There's significant opportunity to gain competitive advantage through AI adoption in the ${industry} sector. Start with foundational improvements.`;
    }
  };

  // Handle answer updates
  const handleAnswerUpdate = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigation handlers
  const handleStartAssessment = () => {
    setCurrentStep('assessment');
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete assessment
      const results = calculateResults();
      setAssessmentResults(results);
      setCurrentStep('results');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAssessmentResults(null);
  };

  const handleBookConsultation = () => {
    // In a real app, this would open a booking modal or redirect
    alert('Consultation booking feature would be implemented here');
  };

  // Calculate progress
  const completionPercentage = currentStep === 'assessment' 
    ? Math.round(((currentQuestionIndex + 1) / questions?.length) * 100)
    : 0;

  const estimatedTimeRemaining = currentStep === 'assessment'
    ? Math.max(1, Math.round((questions?.length - currentQuestionIndex - 1) * 1.5))
    : 0;

  // Save progress to localStorage
  useEffect(() => {
    if (currentStep === 'assessment') {
      localStorage.setItem('ai-assessment-progress', JSON.stringify({
        currentQuestionIndex,
        answers,
        timestamp: Date.now()
      }));
    }
  }, [currentQuestionIndex, answers, currentStep]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('ai-assessment-progress');
    if (savedProgress) {
      try {
        const { currentQuestionIndex: savedIndex, answers: savedAnswers, timestamp } = JSON.parse(savedProgress);
        // Only restore if saved within last 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setCurrentQuestionIndex(savedIndex);
          setAnswers(savedAnswers);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12">
          {currentStep === 'intro' && (
            <AssessmentIntro onStartAssessment={handleStartAssessment} />
          )}

          {currentStep === 'assessment' && (
            <div className="max-w-4xl mx-auto">
              <AssessmentProgress
                currentStep={currentQuestionIndex + 1}
                totalSteps={questions?.length}
                completionPercentage={completionPercentage}
                estimatedTimeRemaining={estimatedTimeRemaining}
              />
              
              <QuestionCard
                question={questions?.[currentQuestionIndex]}
                onAnswer={(answer) => handleAnswerUpdate(questions?.[currentQuestionIndex]?.id, answer)}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                isFirst={currentQuestionIndex === 0}
                isLast={currentQuestionIndex === questions?.length - 1}
                currentAnswer={answers?.[questions?.[currentQuestionIndex]?.id]}
              />
            </div>
          )}

          {currentStep === 'results' && assessmentResults && (
            <div className="max-w-6xl mx-auto">
              <AssessmentResults
                results={assessmentResults}
                onStartOver={handleStartOver}
                onBookConsultation={handleBookConsultation}
              />
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={20} color="white" />
              </div>
              <span className="text-xl font-bold">sentAIent Conversion Hub</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Empowering businesses through intelligent AI transformation
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <span>© {new Date()?.getFullYear()} sentAIent. All rights reserved.</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreeAIAssessmentPortal;