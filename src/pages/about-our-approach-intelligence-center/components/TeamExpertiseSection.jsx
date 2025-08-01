import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamExpertiseSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief AI Strategist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["Machine Learning", "Natural Language Processing", "Computer Vision"],
      experience: "12+ years",
      education: "PhD Computer Science, Stanford",
      bio: `Dr. Chen leads our AI strategy development with deep expertise in enterprise-scale machine learning implementations. Her research in ethical AI frameworks has been published in 15+ peer-reviewed journals.`,
      achievements: [
        "Led AI transformation for Fortune 500 companies",
        "Published 25+ research papers on ethical AI",
        "Keynote speaker at AI Ethics Summit 2023",
        "Former Principal Scientist at Google AI"
      ],
      publications: [
        "Ethical Frameworks for Enterprise AI (Nature AI, 2023)",
        "Human-Centered Machine Learning Design (ACM, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Director of Implementation",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["Process Automation", "Chatbot Development", "System Integration"],
      experience: "10+ years",
      education: "MS Software Engineering, MIT",
      bio: `Marcus transforms complex AI concepts into practical business solutions. His systematic approach to implementation has achieved 98% project success rate across diverse industries.`,
      achievements: [
        "Implemented 100+ successful AI projects",
        "Developed proprietary integration framework",
        "Certified in 8 major AI platforms",
        "Former Lead Engineer at Microsoft AI"
      ],
      publications: [
        "Scalable AI Implementation Patterns (IEEE, 2023)",
        "Enterprise Chatbot Architecture Guide (ACM, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      role: "Head of AI Ethics",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["AI Ethics", "Bias Mitigation", "Regulatory Compliance"],
      experience: "8+ years",
      education: "PhD Philosophy of Technology, Oxford",
      bio: `Dr. Patel ensures all our AI implementations meet the highest ethical standards. Her work in bias detection and mitigation has become industry standard for responsible AI deployment.`,
      achievements: [
        "Developed industry-standard bias detection tools",
        "Advisor to EU AI Ethics Committee",
        "Author of \'Responsible AI Implementation'",
        "Former Ethics Lead at DeepMind"
      ],
      publications: [
        "Bias Mitigation in Enterprise AI Systems (Nature, 2023)",
        "Ethical AI Governance Frameworks (Philosophy & Technology, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 4,
      name: "James Thompson",
      role: "Senior Business Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["ROI Analysis", "Business Process Optimization", "Change Management"],
      experience: "15+ years",
      education: "MBA Strategy, Wharton",
      bio: `James bridges the gap between technical capabilities and business value. His analytical approach has consistently delivered ROI improvements exceeding 300% for client implementations.`,
      achievements: [
        "Delivered $50M+ in measurable client ROI",
        "Certified Change Management Professional",
        "Speaker at 20+ business conferences",
        "Former Strategy Consultant at McKinsey"
      ],
      publications: [
        "AI ROI Measurement Frameworks (Harvard Business Review, 2023)",
        "Digital Transformation Success Patterns (MIT Sloan, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "UX/AI Design Lead",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["Human-AI Interaction", "Conversational Design", "User Experience"],
      experience: "9+ years",
      education: "MS Human-Computer Interaction, Carnegie Mellon",
      bio: `Lisa designs intuitive interfaces that make AI feel natural and accessible. Her human-centered approach has improved user adoption rates by 85% across client implementations.`,
      achievements: [
        "Designed interfaces for 200+ AI applications",
        "Winner of UX Design Excellence Award 2023",
        "Created industry-standard AI design patterns",
        "Former Senior Designer at Apple AI"
      ],
      publications: [
        "Human-AI Interaction Design Principles (ACM CHI, 2023)",
        "Conversational AI UX Best Practices (UX Magazine, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 6,
      name: "David Kim",
      role: "Technical Architecture Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specializations: ["Cloud Architecture", "AI Infrastructure", "Security"],
      experience: "11+ years",
      education: "MS Computer Science, UC Berkeley",
      bio: `David architects scalable, secure AI infrastructure that grows with business needs. His cloud-native approach has enabled seamless AI deployments for enterprises of all sizes.`,
      achievements: [
        "Architected infrastructure for 500+ AI deployments",
        "AWS Certified Solutions Architect Professional",
        "Security clearance for government AI projects",
        "Former Principal Architect at Amazon Web Services"
      ],
      publications: [
        "Scalable AI Infrastructure Patterns (Cloud Computing Journal, 2023)",
        "Security Best Practices for AI Systems (IEEE Security, 2022)"
      ],
      linkedin: "#",
      twitter: "#"
    }
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
            Our diverse team combines deep technical expertise with business acumen, ensuring every AI implementation delivers measurable value while maintaining ethical standards.
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
                  <h4 className="text-sm font-semibold text-foreground mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {member?.specializations?.slice(0, 2)?.map((spec, index) => (
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

        {/* Team Certifications */}
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

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Recent Publications</h4>
                      <ul className="space-y-2">
                        {selectedMember?.publications?.map((publication, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Icon name="BookOpen" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{publication}</span>
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