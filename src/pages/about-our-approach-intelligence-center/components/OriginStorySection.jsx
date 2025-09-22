import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OriginStorySection = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);

  const timelineEvents = [
    {
      year: "2019",
      title: "The Spark",
      description: "Founded by AI researchers frustrated with the gap between cutting-edge technology and practical business implementation.",
      icon: "Lightbulb",
      details: `After witnessing countless businesses struggle with AI adoption despite having access to powerful tools, our founders recognized the need for a human-centered approach to AI transformation. The vision was clear: make AI accessible, ethical, and genuinely valuable for businesses of all sizes.`
    },
    {
      year: "2020",
      title: "First Breakthrough",
      description: "Developed our proprietary Assessment-to-Implementation methodology during the pandemic's digital acceleration.",
      icon: "Rocket",
      details: `The global shift to digital-first operations created an unprecedented opportunity to refine our approach. We helped 50+ businesses navigate AI adoption while maintaining human connection and operational efficiency during challenging times.`
    },
    {
      year: "2022",
      title: "Scale & Recognition",
      description: "Achieved industry recognition for ethical AI implementation and human-augmentation philosophy.",
      icon: "Award",
      details: `Our commitment to human-first AI earned recognition from leading industry bodies. We established partnerships with major AI providers while maintaining our core principle: technology should amplify human potential, not replace it.`
    },
    {
      year: "2024",
      title: "Intelligence Hub",
      description: "Launched comprehensive AI transformation platform serving businesses across 15+ industries.",
      icon: "Building",
      details: `Today, sentAIent operates as a full-spectrum AI consultancy, combining strategic assessment, custom implementation, and ongoing optimization. Our platform has enabled over 150 successful AI transformations with measurable ROI.`
    }
  ];

  const coreValues = [
    {
      icon: "Heart",
      title: "Human-Centric",
      description: "AI should enhance human capabilities, not replace them. Every solution we design amplifies human creativity and decision-making."
    },
    {
      icon: "Shield",
      title: "Ethical Foundation",
      description: "Transparent, responsible AI implementation with clear governance frameworks and bias mitigation strategies."
    },
    {
      icon: "Target",
      title: "Measurable Impact",
      description: "Every AI initiative must deliver quantifiable business value with clear ROI metrics and performance indicators."
    },
    {
      icon: "Users",
      title: "Partnership Approach",
      description: "We work alongside your team as trusted advisors, ensuring knowledge transfer and sustainable long-term success."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-primary font-semibold text-lg">Our Origin Story</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            From Vision to
            <span className="block text-primary">Transformation Reality</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from the belief that AI should be a bridge to human potential, not a barrier to understanding. Our journey reflects our commitment to making intelligent technology accessible and impactful.
          </p>
        </div>

        {/* Timeline * /}
        <div className="mb-20">
          <div className="relative">
            {/* Timeline Line * /}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border hidden lg:block"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {timelineEvents?.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node  * /}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 hidden lg:block"></div>
                  
                  {/* Content * /}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className={`bg-card border border-border rounded-2xl p-8 shadow-subtle hover:shadow-elevation transition-all duration-300 cursor-pointer ${
                        activeTimeline === index ? 'ring-2 ring-primary/20 shadow-elevation' : ''
                      }`}
                      onClick={() => setActiveTimeline(activeTimeline === index ? -1 : index)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={event.icon} size={24} color="var(--color-primary)" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{event.year}</div>
                          <div className="text-lg font-semibold text-foreground">{event.title}</div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      {activeTimeline === index && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-foreground leading-relaxed">
                            {event.details}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center text-primary text-sm font-medium mt-4">
                        <span>Learn more</span>
                        <Icon 
                          name={activeTimeline === index ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="ml-2 transition-transform duration-300" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        */}


        {/* Core Values */}
        <div className="bg-muted/50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision, every implementation, and every client relationship we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues?.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={value?.icon} size={28} color="var(--color-primary)" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {value?.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStorySection;