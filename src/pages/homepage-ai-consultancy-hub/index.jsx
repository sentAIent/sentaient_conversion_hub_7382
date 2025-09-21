import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SuccessStoriesCarousel from './components/SuccessStoriesCarousel';
import SolutionsPreview from './components/SolutionsPreview';
import TrustSignalsBar from './components/TrustSignalsBar';
import TransformationGalleryTeaser from './components/TransformationGalleryTeaser';

const HomepageAIConsultancyHub = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>sentAIent - AI That Amplifies Human Potential</title>
        <meta 
          name="description" 
          content="Transform your business with intelligent AI automation. Experience measurable growth without disruption through our proven AI implementation methodology. Start your free assessment today." 
        />
        <meta name="keywords" content="AI automation, business transformation, artificial intelligence, AI consulting, automation solutions, AI implementation" />
        <meta property="og:title" content="sentAIent Conversion Hub - AI That Amplifies Human Potential" />
        <meta property="og:description" content="Transform your business with intelligent AI automation. Experience measurable growth without disruption." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/homepage-ai-consultancy-hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="sentAIent Conversion Hub - AI That Amplifies Human Potential" />
        <meta name="twitter:description" content="Transform your business with intelligent AI automation. Experience measurable growth without disruption." />
        <link rel="canonical" href="/homepage-ai-consultancy-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section with AI Impact Calculator */}
          <HeroSection />
          
          {/* Success Stories Carousel */}
          <SuccessStoriesCarousel />
          
          {/* Solutions Preview with Interactive Cards */}
          <SolutionsPreview />
          
          {/* Trust Signals Bar */}
          <TrustSignalsBar />
          
          {/* Transformation Gallery Teaser */}
          <TransformationGalleryTeaser />
        </main>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">S</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">sentAIent</div>
                    <div className="text-sm text-primary-foreground/80">Conversion Hub</div>
                  </div>
                </div>
                <p className="text-primary-foreground/90 leading-relaxed mb-6 max-w-md">
                  Transforming businesses through intelligent AI automation that amplifies human potential. 
                  Experience measurable growth without disruption.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="w-2 h-2 bg-conversion rounded-full"></span>
                    <span>500+ Successful Implementations</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Solutions</h4>
                <ul className="space-y-3 text-sm text-primary-foreground/80">
                  <li><a href="/ai-solutions-experience-center" className="hover:text-accent transition-colors">AI Solutions Center</a></li>
                  <li><a href="/free-ai-assessment-portal" className="hover:text-accent transition-colors">Free Assessment</a></li>
                  <li><a href="/about-our-approach-intelligence-center" className="hover:text-accent transition-colors">Our Approach</a></li>
                  <li><a href="/knowledge-nexus-resource-library" className="hover:text-accent transition-colors">Resource Library</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-4">Get Started</h4>
                <ul className="space-y-3 text-sm text-primary-foreground/80">
                  <li className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>hello@sentaient.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>1-800-AI-TRANSFORM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>🏢</span>
                    <span>San Francisco, CA</span>
                  </li>
                  <li><a href="/trust-transparency-hub" className="hover:text-accent transition-colors">Trust & Security</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-primary-foreground/70">
                © {new Date()?.getFullYear()} sentAIent Conversion Hub. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-primary-foreground/70">
                <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
                <a href="/cookies" className="hover:text-accent transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomepageAIConsultancyHub;
