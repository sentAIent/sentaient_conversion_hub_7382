import React from 'react';
import Icon from '../../../components/AppIcon';

const AssessmentProgress = ({ currentStep, totalSteps, completionPercentage, estimatedTimeRemaining }) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Assessment Progress</h3>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">{estimatedTimeRemaining} min left</div>
        </div>
      </div>

      <div className="relative">
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index < currentStep ? 'bg-primary' : index === currentStep - 1 ? 'bg-accent' : 'bg-muted'
                }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentProgress;