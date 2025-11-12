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
          We architect intelligent, fully-integrated ecosystems that enhance human creativity, 
          accelerate decision-making, and unlock unprecedented enterprise value.
        </p>
        <div className="hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
              </div>
            </div>

            <div className="flex">
              <Button
                variant="default"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
              >
                Meet Our Team
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