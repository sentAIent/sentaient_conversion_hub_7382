import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CompanyCultureSection from './components/CompanyCultureSection';

const iTravel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>iTravel | sentAIent.com</title>
        <meta 
          name="description" 
          content="Discover sentAIent's methodology, team expertise, and AI philosophy. Learn about our human-centered approach to AI transformation and the principles that guide every implementation." 
        />
        <meta name="keywords" content="AI methodology, AI team, AI philosophy, AI consultancy approach, ethical AI, human-centered AI" />
        <meta property="og:title" content="About Our Approach - Intelligence Center | sentAIent" />
        <meta property="og:description" content="Meet our expert team and discover the methodology that drives successful AI transformations with measurable business results." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <HeroSection />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="font-bold text-lg">sentAIent</div>
                  <div className="text-white/80 text-sm">iTravel</div>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Transforming businesses through intelligent AI solutions that amplify human potential and deliver measurable results.
              </p>
              <iframe src="https://claude.site/public/artifacts/4089f5b9-3819-4593-bbce-b47e97176dca/embed" title="Claude Artifact" width="100%" height="600" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about-our-approach-intelligence-center" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
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
              © {new Date()?.getFullYear()} sentAIent. All rights reserved.
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

export default iTravel;