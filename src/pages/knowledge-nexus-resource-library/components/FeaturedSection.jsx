import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ onResourceClick }) => {
  const featuredResources = [
    {
      id: 'featured-1',
      title: 'The Complete Guide to AI Implementation in Healthcare',
      description: `A comprehensive 50-page guide covering everything from initial assessment to full deployment of AI solutions in healthcare environments.\n\nIncludes real-world case studies, compliance considerations, and step-by-step implementation frameworks.`,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      type: 'Guide',
      difficulty: 'Intermediate',
      duration: '45 min read',
      rating: 4.9,
      downloads: '2.3k',
      isNew: true,
      tags: ['Healthcare', 'Implementation', 'Compliance'],
      author: 'Dr. Sarah Chen',
      publishDate: 'Jan 15, 2025'
    },
    {
      id: 'featured-2',
      title: 'Live Webinar: AI ROI Calculation Masterclass',
      description: `Join our lead AI strategist for an interactive session on calculating and presenting AI ROI to stakeholders.\n\nLearn proven frameworks used by Fortune 500 companies to justify AI investments.`,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      type: 'Webinar',
      difficulty: 'Beginner',
      duration: '60 min',
      rating: 4.8,
      attendees: '1.2k',
      isLive: true,
      tags: ['ROI', 'Strategy', 'Finance'],
      author: 'Michael Rodriguez',
      scheduleDate: 'Feb 8, 2025 2:00 PM EST'
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Featured Resources</h2>
          <p className="text-muted-foreground">
            Hand-picked content to accelerate your AI transformation journey
          </p>
        </div>
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredResources?.map((resource) => (
          <div
            key={resource?.id}
            className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl overflow-hidden shadow-elevation hover:shadow-deep transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <Image
                src={resource?.image}
                alt={resource?.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  FEATURED
                </span>
                {resource?.isNew && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    NEW
                  </span>
                )}
                {resource?.isLive && (
                  <span className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Icon name="Circle" size={8} className="mr-1 fill-current animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="font-medium">{resource?.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={resource?.type === 'Guide' ? 'BookOpen' : 'Video'}
                    size={18}
                    className="text-primary"
                  />
                  <span className="text-sm font-medium text-primary">{resource?.type}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{resource?.difficulty}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{resource?.duration}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                {resource?.title}
              </h3>

              <p className="text-muted-foreground mb-4 line-clamp-3">
                {resource?.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {resource?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{resource?.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {resource?.publishDate || resource?.scheduleDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name={resource?.downloads ? "Download" : "Users"} size={14} />
                  <span>{resource?.downloads || resource?.attendees}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName={resource?.type === 'Webinar' ? 'Calendar' : 'Download'}
                  iconPosition="left"
                  onClick={() => onResourceClick(resource)}
                  className="bg-foreground text-conversion hover:bg-foreground/90 border-foreground"
                >
                  {resource?.type === 'Webinar' ? 'Register Now' : 'Download Guide'}
                </Button>
                <Button
                  variant="outline"
                  iconName="BookmarkPlus"
                  className="px-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;