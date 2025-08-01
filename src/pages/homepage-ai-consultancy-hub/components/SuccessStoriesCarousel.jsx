import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStoriesCarousel = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const successStories = [
    {
      id: 1,
      company: "MedTech Solutions",
      industry: "Healthcare Technology",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=120&h=60&fit=crop&crop=center",
      metric: "47%",
      description: "reduction in manual processes",
      details: "Automated patient data processing and appointment scheduling, freeing up 20 hours per week for patient care.",
      timeframe: "3 months",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      testimonial: "sentAIent transformed our operations without disrupting patient care. The ROI was evident within the first month.",
      name: "Dr. Sarah Chen",
      title: "Chief Operations Officer"
    },
    {
      id: 2,
      company: "Regional Bank",
      industry: "Financial Services",
      logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=120&h=60&fit=crop&crop=center",
      metric: "3x",
      description: "faster customer response times",
      details: "Implemented AI chatbots and automated loan processing, reducing average response time from 48 hours to 16 hours.",
      timeframe: "2 months",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      testimonial: "Customer satisfaction scores increased by 35% after implementing sentAIent\'s solutions. Game-changing results.",
      name: "Michael Rodriguez",
      title: "VP of Customer Experience"
    },
    {
      id: 3,
      company: "Manufacturing Corp",
      industry: "Industrial Manufacturing",
      logo: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=120&h=60&fit=crop&crop=center",
      metric: "62%",
      description: "reduction in quality control errors",
      details: "Deployed computer vision AI for defect detection and predictive maintenance scheduling across 3 production lines.",
      timeframe: "4 months",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      testimonial: "The precision and consistency of AI quality control exceeded our expectations. Zero false positives in 6 months.",
      name: "Jennifer Park",
      title: "Quality Assurance Director"
    },
    {
      id: 4,
      company: "E-commerce Plus",
      industry: "Retail Technology",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=60&fit=crop&crop=center",
      metric: "89%",
      description: "improvement in inventory accuracy",
      details: "Automated inventory management and demand forecasting, reducing stockouts by 75% and overstock by 45%.",
      timeframe: "6 weeks",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face",
      testimonial: "Our inventory costs dropped significantly while customer satisfaction soared. sentAIent delivered beyond promises.",
      name: "David Kim",
      title: "Operations Manager"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, successStories?.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories?.length);
    setIsAutoPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories?.length) % successStories?.length);
    setIsAutoPlaying(false);
  };

  const goToStory = (index) => {
    setCurrentStory(index);
    setIsAutoPlaying(false);
  };

  const story = successStories?.[currentStory];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-conversion/10 text-conversion px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="TrendingUp" size={16} />
            <span>Real Client Transformations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how businesses like yours achieved measurable results with our AI solutions
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Story Card */}
          <div className="bg-card rounded-2xl shadow-elevation p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Left Column - Metrics & Company */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
                  <div className="w-16 h-8 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={story?.logo}
                      alt={`${story?.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{story?.company}</h3>
                    <p className="text-sm text-muted-foreground">{story?.industry}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-5xl md:text-6xl font-bold text-conversion mb-2">
                    {story?.metric}
                  </div>
                  <div className="text-xl text-foreground font-medium mb-4">
                    {story?.description}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {story?.details}
                  </p>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>Implemented in {story?.timeframe}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-conversion" />
                    <span>Ongoing success</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Testimonial */}
              <div className="bg-muted/50 rounded-xl p-6">
                <div className="mb-4">
                  <Icon name="Quote" size={32} className="text-accent mb-4" />
                  <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                    "{story?.testimonial}"
                  </blockquote>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={story?.avatar}
                      alt={story?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{story?.name}</div>
                    <div className="text-sm text-muted-foreground">{story?.title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevStory}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border hover:bg-muted transition-colors duration-300 shadow-subtle"
              aria-label="Previous story"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {successStories?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory
                      ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border hover:bg-muted transition-colors duration-300 shadow-subtle"
              aria-label="Next story"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? "Pause" : "Play"} Auto-rotation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;