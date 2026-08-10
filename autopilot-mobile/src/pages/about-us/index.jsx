import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TeamExpertiseSection from '../about-our-approach-intelligence-center/components/TeamExpertiseSection';
import CompanyCultureSection from '../about-our-approach-intelligence-center/components/CompanyCultureSection';
import TrustIndicatorsSection from '../about-our-approach-intelligence-center/components/TrustIndicatorsSection';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>About Us | sentAIent Conversion Hub</title>
                <meta
                    name="description"
                    content="Meet our expert team, explore our company culture, and see the industry recognition that drives successful AI transformations."
                />
                <meta name="keywords" content="AI methodology, AI team, about us, sentAIent team" />
                <meta property="og:title" content="About Us | sentAIent" />
                <meta property="og:description" content="Meet our expert team, explore our company culture, and see the industry recognition that drives successful AI transformations." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="/about-us" />
            </Helmet>
            <Header />
            <main className="pt-16">
                <TeamExpertiseSection />
                <CompanyCultureSection />
                <TrustIndicatorsSection />
            </main>
            {/* Footer */}
            <footer className="bg-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-start py-2 h-12 md:h-16">
                                    <img src="/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png" alt="sentAIent" className="h-full w-auto object-contain" />
                                </div>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Transforming businesses through intelligent AI solutions that amplify human potential and deliver measurable results.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Solutions</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/ai-solutions-experience-center" className="text-white/80 hover:text-white transition-colors">AI Solutions</a></li>
                                <li><a href="/free-ai-assessment-portal" className="text-white/80 hover:text-white transition-colors">Free Assessment</a></li>
                                <li><a href="/knowledge-nexus-resource-library" className="text-white/80 hover:text-white transition-colors">Resource Library</a></li>
                                <li><a href="/trust-transparency-hub" className="text-white/80 hover:text-white transition-colors">Trust & Security</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/about-our-approach-intelligence-center" className="text-white/80 hover:text-white transition-colors">Our Approach</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Press</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Get Started</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Schedule Consultation</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Request Demo</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Support</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Documentation</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-white/80 text-sm mb-4 md:mb-0">
                            © {new Date()?.getFullYear()} sentAIent Conversion Hub. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
