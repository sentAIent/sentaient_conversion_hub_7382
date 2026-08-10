import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResourceCard from './components/ResourceCard';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import FeaturedSection from './components/FeaturedSection';
import CategoryTabs from './components/CategoryTabs';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';

const KnowledgeNexusResourceLibrary = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock user profile for personalization
  const userProfile = {
    industry: 'healthcare',
    companySize: '150',
    stage: 'implementation',
    interests: ['compliance', 'roi-calculation', 'change-management']
  };

  // Mock resources data
  const allResources = [
    {
      id: 1,
      title: 'AI Implementation Roadmap for Healthcare Organizations',
      description: `A comprehensive guide covering the complete journey from AI strategy development to full deployment in healthcare settings.\n\nIncludes regulatory compliance, staff training, and patient safety considerations.`,
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=600&h=400&fit=crop',
      type: 'Guide',
      difficulty: 'Intermediate',
      duration: '45 min read',
      rating: 4.8,
      reviews: 127,
      downloads: '2.1k',
      lastUpdated: 'Jan 28, 2025',
      tags: ['Healthcare', 'Implementation', 'Compliance', 'Strategy'],
      isNew: true,
      category: 'implementation'
    },
    {
      id: 2,
      title: 'ROI Calculation Framework for AI Investments',
      description: `Learn how to build compelling business cases for AI projects with proven ROI calculation methodologies.\n\nIncludes templates, case studies, and stakeholder presentation frameworks.`,
      image: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=600&h=400&fit=crop',
      type: 'Whitepaper',
      difficulty: 'Beginner',
      duration: '30 min read',
      rating: 4.9,
      reviews: 203,
      downloads: '3.2k',
      lastUpdated: 'Jan 25, 2025',
      tags: ['ROI', 'Finance', 'Business Case', 'Strategy'],
      isNew: false,
      category: 'fundamentals'
    },
    {
      id: 3,
      title: 'Live Webinar: Conversational AI Best Practices',
      description: `Join our experts for an interactive session on designing, implementing, and optimizing chatbots for business success.\n\nIncludes Q&A session and downloadable resources.`,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      type: 'Webinar',
      difficulty: 'Intermediate',
      duration: '60 min',
      rating: 4.7,
      reviews: 89,
      downloads: '1.8k',
      lastUpdated: 'Jan 30, 2025',
      tags: ['Chatbots', 'Conversational AI', 'Customer Service'],
      isNew: true,
      category: 'best-practices'
    },
    {
      id: 4,
      title: 'Manufacturing AI: Predictive Maintenance Case Study',
      description: `Real-world implementation story showing 40% reduction in equipment downtime through AI-powered predictive maintenance.\n\nIncludes technical specifications and lessons learned.`,
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?w=600&h=400&fit=crop',
      type: 'Case Study',
      difficulty: 'Advanced',
      duration: '25 min read',
      rating: 4.6,
      reviews: 156,
      downloads: '1.5k',
      lastUpdated: 'Jan 22, 2025',
      tags: ['Manufacturing', 'Predictive Maintenance', 'Case Study'],
      isNew: false,
      category: 'industry-specific'
    },
    {
      id: 5,
      title: 'Interactive AI Readiness Assessment Tool',
      description: `Evaluate your organization's AI readiness with our comprehensive assessment covering technology, culture, and strategy.\n\nReceive personalized recommendations and action plans.`,image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',type: 'Interactive',
      difficulty: 'Beginner',duration: '20 min',
      rating: 4.8,
      reviews: 312,
      downloads: '4.1k',lastUpdated: 'Jan 26, 2025',
      tags: ['Assessment', 'Readiness', 'Strategy', 'Interactive'],
      isNew: false,
      category: 'fundamentals'
    },
    {
      id: 6,
      title: 'Financial Services AI Compliance Guide',
      description: `Navigate the complex regulatory landscape of AI in financial services with this comprehensive compliance framework.\n\nCovers GDPR, SOX, and industry-specific requirements.`,
      image: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=600&h=400&fit=crop',type: 'Guide',
      difficulty: 'Advanced',duration: '55 min read',
      rating: 4.7,
      reviews: 94,
      downloads: '1.2k',lastUpdated: 'Jan 20, 2025',
      tags: ['Financial Services', 'Compliance', 'Regulation'],
      isNew: false,
      category: 'industry-specific'
    }
  ];

  // Filter and search logic
  const filteredResources = allResources?.filter(resource => {
    // Category filter
    if (activeCategory !== 'all' && resource?.category !== activeCategory) {
      return false;
    }

    // Search filter
    if (searchQuery && !resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
      return false;
    }

    // Other filters
    for (const [filterKey, filterValues] of Object.entries(filters)) {
      if (filterValues?.length === 0) continue;
      
      switch (filterKey) {
        case 'type':
          if (!filterValues?.some(val => resource?.type?.toLowerCase()?.includes(val))) return false;
          break;
        case 'difficulty':
          if (!filterValues?.includes(resource?.difficulty?.toLowerCase())) return false;
          break;
        // Add more filter cases as needed
      }
    }

    return true;
  });

  // Sort logic
  const sortedResources = [...filteredResources]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case 'popular':
        return parseInt(b?.downloads?.replace('k', '000')?.replace('.', '')) - parseInt(a?.downloads?.replace('k', '000')?.replace('.', ''));
      case 'rating':
        return b?.rating - a?.rating;
      case 'alphabetical':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  // Pagination
  const resourcesPerPage = 9;
  const totalPages = Math.ceil(sortedResources?.length / resourcesPerPage);
  const paginatedResources = sortedResources?.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

  const handleFilterChange = (filterKey, filterValues) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterValues
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setActiveCategory('all');
    setCurrentPage(1);
  };

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(resourceId)) {
        newSet?.delete(resourceId);
      } else {
        newSet?.add(resourceId);
      }
      return newSet;
    });
  };

  const handleResourceClick = (resource) => {
    console.log('Resource clicked:', resource);
    // Handle resource download/view logic
  };

  const handleDownload = (resource) => {
    console.log('Downloading resource:', resource);
    // Handle download logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Knowledge Nexus - Resource Library | sentAIent</title>
        <meta name="description" content="Comprehensive AI business resource library with implementation guides, whitepapers, webinars, and interactive tools. Access expert knowledge to accelerate your AI transformation journey." />
        <meta name="keywords" content="AI resources, implementation guides, business intelligence, automation strategies, AI education" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="BookOpen" size={32} className="text-primary" />
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Knowledge Nexus
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Your comprehensive AI business resource library. Access expert guides, industry insights, 
                and practical tools to accelerate your AI transformation journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  className="bg-primary hover:bg-primary/90"
                >
                  Explore Resources
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
                >
                  Book Consultation
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Resources', value: '101+', icon: 'FileText' },
                { label: 'Industry Guides', value: '25+', icon: 'Building2' },
                { label: 'Interactive Tools', value: '12+', icon: 'Monitor' },
                { label: 'Expert Webinars', value: '30+', icon: 'Video' }
              ]?.map((stat, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
                  <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Featured Section */}
          <FeaturedSection onResourceClick={handleResourceClick} />

          {/* Personalized Recommendations */}
          <PersonalizedRecommendations 
            userProfile={userProfile} 
            onResourceClick={handleResourceClick} 
          />

          {/* Category Navigation */}
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Search and Filters */}
          <SearchBar
            onSearch={setSearchQuery}
            onSortChange={setSortBy}
            currentSort={sortBy}
            totalResults={filteredResources?.length}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Resources Grid */}
            <div className="lg:col-span-3">
              {/* View Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Showing {paginatedResources?.length} of {filteredResources?.length} resources
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Grid3X3" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="List" size={18} />
                  </button>
                </div>
              </div>

              {/* Resources Display */}
              {paginatedResources?.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {paginatedResources?.map((resource) => (
                    <ResourceCard
                      key={resource?.id}
                      resource={resource}
                      onBookmark={handleBookmark}
                      onDownload={handleDownload}
                      isBookmarked={bookmarkedResources?.has(resource?.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {[...Array(totalPages)]?.map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                              currentPage === page
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16 mt-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get personalized guidance from our AI experts and accelerate your transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
              >
                Schedule Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => window.location.href = '/free-ai-assessment-portal'}
              >
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xl font-bold text-primary">sentAIent</span>
                  <span className="text-sm text-muted-foreground block">Conversion Hub</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering businesses to harness the transformative power of AI through expert guidance, 
                proven methodologies, and comprehensive resources.
              </p>
              <div className="flex space-x-4">
                {['Linkedin', 'Twitter', 'Youtube', 'Mail']?.map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Icon name={social} size={18} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/ai-solutions-experience-center" className="hover:text-primary transition-colors">AI Solutions</a></li>
                <li><a href="/free-ai-assessment-portal" className="hover:text-primary transition-colors">Free Assessment</a></li>
                <li><a href="/about-our-approach-intelligence-center" className="hover:text-primary transition-colors">Our Approach</a></li>
                <li><a href="/trust-transparency-hub" className="hover:text-primary transition-colors">Trust & Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>(323) 250-6923</li>
                <li>info@sentaient.com</li>
                <li>Lake Tahoe, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} sentAIent.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeNexusResourceLibrary;
