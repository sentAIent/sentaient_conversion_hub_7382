import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const filterCategories = [
    {
      id: 'type',
      label: 'Content Type',
      icon: 'Filter',
      options: [
        { value: 'guide', label: 'Implementation Guides', count: 24 },
        { value: 'whitepaper', label: 'Industry Whitepapers', count: 18 },
        { value: 'webinar', label: 'Recorded Webinars', count: 32 },
        { value: 'interactive', label: 'Interactive Modules', count: 12 },
        { value: 'case-study', label: 'Case Studies', count: 15 }
      ]
    },
    {
      id: 'difficulty',
      label: 'Difficulty Level',
      icon: 'BarChart3',
      options: [
        { value: 'beginner', label: 'Beginner', count: 45 },
        { value: 'intermediate', label: 'Intermediate', count: 38 },
        { value: 'advanced', label: 'Advanced', count: 18 }
      ]
    },
    {
      id: 'industry',
      label: 'Industry Focus',
      icon: 'Building2',
      options: [
        { value: 'healthcare', label: 'Healthcare', count: 22 },
        { value: 'finance', label: 'Financial Services', count: 28 },
        { value: 'manufacturing', label: 'Manufacturing', count: 19 },
        { value: 'retail', label: 'Retail & E-commerce', count: 25 },
        { value: 'technology', label: 'Technology', count: 31 }
      ]
    },
    {
      id: 'duration',
      label: 'Time Investment',
      icon: 'Clock',
      options: [
        { value: 'quick', label: 'Quick Read (< 15 min)', count: 34 },
        { value: 'medium', label: 'Medium (15-45 min)', count: 42 },
        { value: 'comprehensive', label: 'Comprehensive (45+ min)', count: 25 }
      ]
    },
    {
      id: 'topic',
      label: 'AI Technology',
      icon: 'Cpu',
      options: [
        { value: 'chatbots', label: 'Conversational AI', count: 28 },
        { value: 'automation', label: 'Process Automation', count: 35 },
        { value: 'analytics', label: 'Predictive Analytics', count: 22 },
        { value: 'nlp', label: 'Natural Language Processing', count: 18 },
        { value: 'computer-vision', label: 'Computer Vision', count: 12 }
      ]
    }
  ];

  const handleFilterChange = (categoryId, optionValue, checked) => {
    const currentFilters = filters?.[categoryId] || [];
    const newFilters = checked
      ? [...currentFilters, optionValue]
      : currentFilters?.filter(f => f !== optionValue);
    
    onFilterChange(categoryId, newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((total, filterArray) => total + filterArray?.length, 0);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>
      {/* Filter Sidebar */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-card border border-border rounded-lg p-6 h-fit sticky top-24`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          </div>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {filterCategories?.map((category) => (
            <div key={category?.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                <h4 className="font-medium text-foreground">{category?.label}</h4>
              </div>
              
              <div className="space-y-3">
                {category?.options?.map((option) => (
                  <div key={option?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option?.label}
                      checked={(filters?.[category?.id] || [])?.includes(option?.value)}
                      onChange={(e) => handleFilterChange(category?.id, option?.value, e?.target?.checked)}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground ml-2">
                      {option?.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => onFilterChange('featured', ['trending'])}
            >
              Trending Resources
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Star"
              iconPosition="left"
              onClick={() => onFilterChange('featured', ['top-rated'])}
            >
              Top Rated
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onFilterChange('featured', ['recent'])}
            >
              Recently Added
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;