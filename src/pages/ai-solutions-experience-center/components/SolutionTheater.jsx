import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SolutionTheater = ({ solution, isActive, onActivate }) => {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && isActive) {
      interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % solution?.demoSteps?.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isActive, solution?.demoSteps?.length]);

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
    if (!isActive) {
      onActivate();
    }
  };

  return (
    <div className={`bg-card rounded-xl border transition-all duration-500 ${isActive ? 'border-primary shadow-brand scale-105' : 'border-border hover:border-primary/50'
      }`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
              <Icon name={solution?.icon} size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{solution?.title}</h3>
              <p className="text-sm text-muted-foreground">{solution?.subtitle}</p>
            </div>
          </div>
          <Button
            variant={isPlaying ? "destructive" : "default"}
            size="sm"
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            onClick={handlePlayDemo}
          >
            {isPlaying ? 'Pause' : 'Demo'}
          </Button>
        </div>
        <p className="text-muted-foreground">{solution?.description}</p>
      </div>
      {/* Demo Area */}
      <div className="p-6">
        <div className="bg-muted rounded-lg p-4 mb-4 min-h-[300px] relative overflow-hidden">
          {isActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Live Demo - Step {demoStep + 1} of {solution?.demoSteps?.length}
                </span>
                <div className="flex space-x-1">
                  {solution?.demoSteps?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${index === demoStep ? 'bg-primary' : 'bg-border'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border">
                <h4 className="font-semibold text-foreground mb-2">
                  {solution?.demoSteps?.[demoStep]?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {solution?.demoSteps?.[demoStep]?.description}
                </p>

                {/* Interactive Demo Content */}
                <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm">
                  {solution?.demoSteps?.[demoStep]?.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Icon name="Play" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Click Demo to start interactive experience</p>
              </div>
            </div>
          )}
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {solution?.benefits?.map((benefit, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <Icon name={benefit?.icon} size={20} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{benefit?.value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
            className="flex-1"
          >
            Calculate ROI
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1 bg-foreground text-conversion hover:bg-foreground/90 border-foreground"
            onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
          >
            Book Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolutionTheater;