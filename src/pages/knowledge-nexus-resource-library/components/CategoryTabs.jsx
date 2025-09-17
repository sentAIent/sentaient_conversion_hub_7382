import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'all',
      label: 'All Resources',
      icon: 'Grid3X3',
      count: 101,
      description: 'Complete library of AI business resources'
    },
    {
      id: 'fundamentals',
      label: 'AI Fundamentals',
      icon: 'GraduationCap',
      count: 28,
      description: 'Essential knowledge for business leaders'
    },
    {
      id: 'implementation',
      label: 'Implementation',
      icon: 'Settings',
      count: 35,
      description: 'Step-by-step deployment guides'
    },
    {
      id: 'industry-specific',
      label: 'Industry Solutions',
      icon: 'Building2',
      count: 22,
      description: 'Sector-specific AI strategies'
    },
    {
      id: 'best-practices',
      label: 'Best Practices',
      icon: 'Award',
      count: 16,
      description: 'Proven methodologies and frameworks'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of AI business resources
          </p>
        </div>
      </div>
      {/* Desktop Tabs */}
      <div className="hidden lg:flex bg-muted rounded-lg p-1 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
              activeCategory === category?.id
                ? 'bg-background text-foreground shadow-subtle'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Mobile Category Cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`text-left p-4 rounded-lg border transition-all duration-300 ${
              activeCategory === category?.id
                ? 'border-primary bg-primary/5 shadow-subtle'
                : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activeCategory === category?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={category?.icon} size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{category?.label}</h3>
                  <p className="text-sm text-muted-foreground">{category?.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeCategory === category?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </div>
          </button>
        ))}
      </div>
      {/* Category Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon 
              name={categories?.find(c => c?.id === activeCategory)?.icon || 'Grid3X3'} 
              size={24} 
              className="text-primary" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {categories?.find(c => c?.id === activeCategory)?.label || 'All Resources'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {categories?.find(c => c?.id === activeCategory)?.description || 'Complete library of AI business resources'}
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={16} />
                <span>{categories?.find(c => c?.id === activeCategory)?.count || 101} resources</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>Updated weekly</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={16} />
                <span>Trending content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;