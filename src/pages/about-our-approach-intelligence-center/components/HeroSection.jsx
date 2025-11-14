import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    // <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/90 text-white overflow-hidden">
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
          Intelligence That
          <span className="block text-accent mt-1 mb-1">Amplifies</span>
          <span className="block text-white">Human</span>
          Achievement
        </h1>
        
        <p className="mt-3 text-white lg:text-2xl font-bold mt-3">
          We architect intelligent, fully-integrated ecosystems that enhance human creativity, 
          accelerate decision-making, and unlock hidden enterprise value.
        </p>
        <div className="mt-6">
          <Button
            vriant="default"
            size="2xl"
            iconName="Users"
            iconPosition="center"
            className="bg-accent hover:bg-accent/90 text-primary lg:text-1xl font-bold">
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
    </section>
  );
};

export default HeroSection;