import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} color="white" />
                </div>
                <span className="text-accent font-semibold text-lg">The sentAIent Approach</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Intelligence That
                <span className="block text-accent">Amplifies Human</span>
                Potential
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                We don't just implement AI—we architect intelligent ecosystems that enhance human creativity, accelerate decision-making, and unlock unprecedented business value through thoughtful integration.
              </p>
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

            {/* Stats */}
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
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-deep">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2606&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team collaboration and AI strategy session"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-conversion rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">ROI Growth</div>
                    <div className="text-xs text-gray-600">+340% Average</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">AI Ethics</div>
                    <div className="text-xs text-gray-600">Human-First Approach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;