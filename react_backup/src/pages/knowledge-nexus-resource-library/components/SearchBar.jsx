import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onSortChange, currentSort, totalResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpAZ' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const quickSearchTerms = [
    'AI Implementation',
    'Chatbot Development',
    'Process Automation',
    'ROI Calculation',
    'Change Management',
    'Data Analytics'
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      {/* Main Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search resources, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="text-base"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
            className="px-6"
          >
            Search
          </Button>
        </div>
      </form>
      {/* Quick Search & Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Quick Search Terms */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Quick search:</span>
          {quickSearchTerms?.map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearch(term)}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Sort & Results */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {totalResults} resources found
          </span>
          
          <div className="flex items-center gap-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Advanced Search Toggle */}
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Icon 
            name={isAdvancedOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
          <span>Advanced Search Options</span>
        </button>

        {isAdvancedOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Author"
              placeholder="Search by author name"
              className="text-sm"
            />
            <Input
              label="Date Range"
              type="date"
              className="text-sm"
            />
            <Input
              label="Minimum Rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="4.0"
              className="text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;