import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, onDownload, isBookmarked }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Guide':
        return 'BookOpen';
      case 'Whitepaper':
        return 'FileText';
      case 'Webinar':
        return 'Video';
      case 'Interactive':
        return 'Monitor';
      case 'Case Study':
        return 'TrendingUp';
      default:
        return 'File';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevation transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={resource?.image}
          alt={resource?.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onBookmark(resource?.id)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isBookmarked 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground'
            }`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          {resource?.type === 'Webinar' && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Icon name="Circle" size={8} className="mr-1 fill-current" />
              LIVE
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={getTypeIcon(resource?.type)} size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{resource?.type}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{resource?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>{resource?.downloads}</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {resource?.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {resource?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {resource?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {resource?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{resource?.tags?.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(resource?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {resource?.rating} ({resource?.reviews} reviews)
            </span>
          </div>
          {resource?.isNew && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              NEW
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Updated {resource?.lastUpdated}
          </div>
          <Button
            variant="default"
            size="sm"
            iconName={resource?.type === 'Webinar' ? 'Play' : 'Download'}
            iconPosition="left"
            onClick={() => onDownload(resource)}
            className={`transition-all duration-300 ${
              isHovered ? 'bg-primary hover:bg-primary/90' : ''
            }`}
          >
            {resource?.type === 'Webinar' ? 'Watch' : 'Download'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;