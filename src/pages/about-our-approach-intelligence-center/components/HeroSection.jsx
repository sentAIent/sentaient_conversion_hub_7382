import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    // <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/90 text-white overflow-hidden">
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Intelligence That
          <span className="block text-accent">Amplifies Human</span>
          Action
        </h1>
        
        <p className="hero-content">
          We architect intelligent, fully-integrated ecosystems that enhance human creativity, accelerate decision-making, and unlock unprecedented enterprise value.
        </p>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">

                {/*
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="Target" size={24} color="white" />
                  </div>
                  <span className="text-accent font-semibold text-lg">The sentAIent Approach</span>
                </div>
                */}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
              >
                Meet Our Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Our Methodology
              </Button>
            </div>

            {/* Stats * /}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">150+</div>
                <div className="text-sm text-white/80">AI Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-white/80">Client Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">5.2x</div>
                <div className="text-sm text-white/80">Average ROI</div>
              </div>
            </div>
            */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;