import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamExpertiseSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Brian Leonard",
      role: "Chief AI Strategist",
      avatar: "https://github.com/sentAIent/sentaient_conversion_hub_7382/blob/main/public/assets/images/BLeonard_Profile_Photo.png",
      specializations: ["Software Development", "Autonomous AI Agents", "Quantitative Trading", "Investment Management", "Asset Allocation"],
      experience: "20+ years",
      education: "B.S.B.A., Saint Louis University",
      bio: `Brian Leonard leads sentAIent's AI strategy and development with deep expertise in quantitative trading systems. Prior to founding sentAIent, Brian 
      built Alpha Quant Analytics (AQA), a quantitative trading platform designed to automate all aspects asset allocation, trading, and risk management. Brian 
      spent 4 years at PIMCO working directly with many of firm's top client relationships. Brian served as head of investment analytics and trading for two 
      Registered Investment Advisors, overseeing portfolio management for $2B+ in client assets. In the late-2000's, Brian helped pioneer algorithmic trading 
      within managed accounts for thousands of retirement investors, utilizing his expertise in finance, tech, and marketing to transform the firm during a pivotal time in its 20+ year history.`,
      achievements: [
        "Pioneered quantitative trading for retirement investors in the early days of Target Date Funds",
        "Contributed to 5x increase in Assets Under Management in under three years.",
        "Facilitated client meetings with PIMCO's top executive and PM leadership",
        "Mensan",
      ],
      publications: [
      ],
      linkedin: "#",
      twitter: "#",
      shortBio: "Brian Leonard leads sentAIent's AI strategy and development with deep expertise in quantitative trading systems. Prior to founding sentAIent, Brian built Alpha Quant Analytics (AQA), a quantitative trading platform designed to automate all aspects asset allocation, trading, and risk management..."
    },
    {
      id: 2,
      name: "Greg Francis",
      role: "Corporate Solutions",
      avatar: "https://github.com/sentAIent/sentaient_conversion_hub_7382/blob/main/public/assets/images/Greg%20Francis%20Bio%20Pic.png",
      specializations: ["Executive Hospitality Operations", "Interpersonal Development", "Financial Statement Analysis"],
      experience: "30+ years",
      education: "",
      bio: `Greg is an accomplished hospitality executive with a strong foundation in technology and a track record of national recognition. At sentAIent, he specializes in transforming complex AI concepts into tangible operational excellence. As Senior Director of Restaurant Operations for Kimpton Hotels (East Coast), he played a key role in advancing one of the country's most influential hospitality organizations. His diverse experience includes serving as Managing Partner at Smith & Wollensky.`,
      achievements: [
        "Sable was named one of Food & Wine Magazine's Top 5 Restaurants in the U.S.",
        "Two establishments honored on Esquire Magazine's Best New Restaurants list.",
        "Sommelier and Maître d' aboard an exclusive, steam-powered riverboat."
      ],
      publications: [
      ],
      linkedin: "#",
      twitter: "#",
      shortBio: "Greg is an accomplished hospitality executive with a strong foundation in technology and a track record of national recognition. At sentAIent, he specializes in transforming complex AI concepts into tangible operational excellence. As Senior Director of Restaurant Operations for Kimpton Hotels (East Coast), he played a key role in..."
    },
    {/*}
    {
      id: 3,
      name: "Monica",
      role: "Corporate Solutions",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["Institutional Sales", "Strategic Vision", "Operational Efficiency"],
      experience: "25+ years",
      education: "International Business, Dickinson College",
      bio: `Monica brings a deep understanding of consultant solutions and over two decades of experience in institutional sales and investment consulting.
      Monica served as Managing Director at several top global asset managers.`,
      achievements: [
        "Leads projects across continents to support orphaned and vulnerable children."
      ],
      publications: [
      ],
      linkedin: "#",
      twitter: "#"
    }
    */}
  ];

  const certifications = [
    { name: "AWS AI/ML Specialty", count: 6 },
    { name: "Google Cloud AI Engineer", count: 4 },
    { name: "Microsoft Azure AI Engineer", count: 5 },
    { name: "Certified Ethical AI Practitioner", count: 8 },
    { name: "Project Management Professional", count: 3 }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-primary font-semibold text-lg">Our Expert Team</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Meet the Minds Behind
            <span className="block text-primary">AI Transformation</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our diverse team combines deep technical expertise with demonstrated operational excellence, ensuring every AI implementation delivers significant ROI while maintaining standards of risk management, ethics, and data privacy.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-subtle hover:shadow-elevation transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedMember(member)}
            >
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-conversion rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="CheckCircle" size={16} color="white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {member?.name}
                </h3>
                <p className="text-primary font-semibold mb-2">
                  {member?.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {member?.experience} • {member?.education?.split(',')?.[0]}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Bio</h4>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {member?.shortBio}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {member?.specializations?.slice(0, 4)?.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {member?.specializations?.length > 2 && (
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        +{member?.specializations?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex space-x-3">
                    <a
                      href={member?.linkedin}
                      className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                      onClick={(e) => e?.stopPropagation()}
                    >
                      <Icon name="Linkedin" size={16} />
                    </a>
                    <a
                      href={member?.twitter}
                      className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                      onClick={(e) => e?.stopPropagation()}
                    >
                      <Icon name="Twitter" size={16} />
                    </a>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="text-primary hover:text-primary"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Certifications * /} ++ 18 LINES

        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Industry Certifications
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team maintains cutting-edge expertise through continuous learning and industry-recognized certifications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} color="var(--color-primary)" />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {cert?.name}
                </h4>
                <p className="text-primary font-bold text-lg">
                  {cert?.count} Certified
                </p>
              </div>
            ))}
          </div>
        </div> 
        */}

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={selectedMember?.avatar}
                      alt={selectedMember?.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {selectedMember?.name}
                      </h3>
                      <p className="text-primary font-semibold text-lg mb-2">
                        {selectedMember?.role}
                      </p>
                      <p className="text-muted-foreground">
                        {selectedMember?.experience} • {selectedMember?.education}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors duration-300"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">About</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedMember?.bio}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember?.specializations?.map((spec, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {selectedMember?.achievements?.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Icon name="CheckCircle" size={16} color="var(--color-conversion)" className="mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                  <div className="flex space-x-4">
                    <a
                      href={selectedMember?.linkedin}
                      className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <Icon name="Linkedin" size={16} />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a
                      href={selectedMember?.twitter}
                      className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <Icon name="Twitter" size={16} />
                      <span className="text-sm font-medium">Twitter</span>
                    </a>
                  </div>
                  
                  <Button
                    variant="default"
                    iconName="Calendar"
                    iconPosition="left"
                    className="bg-conversion hover:bg-conversion/90"
                    onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
                  >
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamExpertiseSection;
