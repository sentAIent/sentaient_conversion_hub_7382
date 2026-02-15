import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuestionCard = ({ question, onAnswer, onNext, onPrevious, isFirst, isLast, currentAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(currentAnswer || '');
  const [multipleAnswers, setMultipleAnswers] = useState(currentAnswer || []);

  const handleSingleChoice = (value) => {
    setSelectedAnswer(value);
    onAnswer(value);
  };

  const handleMultipleChoice = (value, checked) => {
    let newAnswers;
    if (checked) {
      newAnswers = [...multipleAnswers, value];
    } else {
      newAnswers = multipleAnswers?.filter(answer => answer !== value);
    }
    setMultipleAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  const handleTextInput = (e) => {
    const value = e?.target?.value;
    setSelectedAnswer(value);
    onAnswer(value);
  };

  const renderQuestionInput = () => {
    switch (question?.type) {
      case 'single-choice':
        return (
          <div className="space-y-3">
            {question?.options?.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleSingleChoice(option?.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-subtle ${selectedAnswer === option?.value
                    ? 'border-primary bg-primary/5 shadow-subtle'
                    : 'border-border hover:border-primary/50'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAnswer === option?.value ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                    {selectedAnswer === option?.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{option?.label}</div>
                    {option?.description && (
                      <div className="text-sm text-muted-foreground mt-1">{option?.description}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question?.options?.map((option) => (
              <div
                key={option?.value}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
              >
                <Checkbox
                  label={option?.label}
                  description={option?.description}
                  checked={multipleAnswers?.includes(option?.value)}
                  onChange={(e) => handleMultipleChoice(option?.value, e?.target?.checked)}
                />
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <Input
            type="text"
            placeholder={question?.placeholder}
            value={selectedAnswer}
            onChange={handleTextInput}
            className="w-full"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={question?.placeholder}
            value={selectedAnswer}
            onChange={handleTextInput}
            min={question?.min}
            max={question?.max}
            className="w-full"
          />
        );

      default:
        return null;
    }
  };

  const isAnswered = () => {
    if (question?.type === 'multiple-choice') {
      return multipleAnswers?.length > 0;
    }
    return selectedAnswer !== '';
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation border border-border p-8 mb-6">
      <div className="mb-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={question?.icon} size={24} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">{question?.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{question?.description}</p>
            {question?.helpText && (
              <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{question?.helpText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-8">
        {renderQuestionInput()}
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-4">
          {question?.required && !isAnswered() && (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">This question is required</span>
            </div>
          )}

          <Button
            variant="default"
            onClick={onNext}
            disabled={question?.required && !isAnswered()}
            iconName={isLast ? "CheckCircle" : "ChevronRight"}
            iconPosition="right"
            className="bg-primary hover:bg-primary/90"
          >
            {isLast ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;