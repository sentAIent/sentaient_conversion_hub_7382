import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ userProfile, onResourceClick }) => {
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Healthcare AI Implementation Checklist',
      description: 'Based on your healthcare industry focus, this comprehensive checklist will guide you through every step of AI deployment.',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=400&h=200&fit=crop',
      type: 'Checklist',
      difficulty: 'Intermediate',
      duration: '20 min',
      rating: 4.7,
      matchReason: 'Industry: Healthcare',
      tags: ['Healthcare', 'Implementation', 'Checklist']
    },
    {
      id: 'rec-2',
      title: 'ROI Calculator for Mid-Size Companies',
      description: 'Perfect for your company size, this interactive tool helps calculate AI investment returns with industry-specific benchmarks.',
      image: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=200&fit=crop',
      type: 'Interactive Tool',
      difficulty: 'Beginner',
      duration: '15 min',
      rating: 4.9,
      matchReason: 'Company Size: 50-500 employees',
      tags: ['ROI', 'Calculator', 'Mid-Size']
    },
    {
      id: 'rec-3',
      title: 'Change Management for AI Adoption',
      description: 'Since you completed our assessment, this guide addresses common resistance patterns and provides proven solutions.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      type: 'Guide',
      difficulty: 'Intermediate',
      duration: '35 min',
      rating: 4.8,
      matchReason: 'Assessment Result: Change Management Focus',
      tags: ['Change Management', 'Leadership', 'Strategy']
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: 'AI Fundamentals for Healthcare Leaders',
      status: 'completed',
      duration: '30 min'
    },
    {
      step: 2,
      title: 'Healthcare Compliance & AI Ethics',
      status: 'current',
      duration: '45 min'
    },
    {
      step: 3,
      title: 'Implementation Planning Workshop',
      status: 'upcoming',
      duration: '60 min'
    },
    {
      step: 4,
      title: 'Vendor Selection Framework',
      status: 'upcoming',
      duration: '25 min'
    }
  ];

  return (
    <div className="mb-12">
      {/* Personalized Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <Icon name="User" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Recommended for You
              </h2>
              <p className="text-muted-foreground mb-4">
                Based on your profile: Healthcare Industry • 150 employees • Implementation Stage
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-conversion">
                  <Icon name="Target" size={16} />
                  <span>85% match accuracy</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Updated daily</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            Customize
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Resources */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Recommended Resources
          </h3>
          <div className="space-y-6">
            {recommendations?.map((resource, index) => (
              <div
                key={resource?.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={resource?.image}
                      alt={resource?.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          #{index + 1} MATCH
                        </span>
                        <span className="text-sm text-primary font-medium">
                          {resource?.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span>{resource?.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {resource?.title}
                    </h4>

                    <p className="text-sm text-muted-foreground mb-3">
                      {resource?.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{resource?.difficulty}</span>
                        <span>•</span>
                        <span>{resource?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-conversion">
                        <Icon name="Target" size={12} />
                        <span>{resource?.matchReason}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {resource?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                        onClick={() => onResourceClick(resource)}
                      >
                        View Resource
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Your Learning Path
          </h3>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-medium text-foreground">Healthcare AI Mastery</h4>
                <p className="text-sm text-muted-foreground">Customized learning journey</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-conversion">25% Complete</div>
                <div className="w-16 h-2 bg-muted rounded-full mt-1">
                  <div className="w-1/4 h-full bg-conversion rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {learningPath?.map((step, index) => (
                <div key={step?.step} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step?.status === 'completed'
                      ? 'bg-conversion text-conversion-foreground'
                      : step?.status === 'current' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                    {step?.status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step?.step
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className={`text-sm font-medium ${step?.status === 'current' ? 'text-primary' : 'text-foreground'
                      }`}>
                      {step?.title}
                    </h5>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <Icon name="Clock" size={12} />
                      <span>{step?.duration}</span>
                      {step?.status === 'current' && (
                        <>
                          <span>•</span>
                          <span className="text-primary">In Progress</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              fullWidth
              iconName="Play"
              iconPosition="left"
              className="mt-6"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;