import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';

// Fixed version of your iTravel component
const ITravel = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle iframe loading issues
  const handleIframeError = () => {
    console.error('Failed to load iframe content');
    // You could set an error state here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-secondary">Loading iTravel...</p>
        </div>
      </div>
    );
  }

  
  return (
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
        <div>
          <Header />
          <iTravel />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">iTravel Platform</h1>
            <p className="text-lg text-secondary">Testing the travel planning interface...</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <p className="text-primary font-semibold mb-2">TESTING...</p>
            <div className="w-full h-1 bg-blue-200 rounded-full">
              <div className="w-1/3 h-1 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Fixed iframe implementation */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <iframe 
              src="https://claude.site/public/artifacts/4089f5b9-3819-4593-bbce-b47e97176dca/embed"
              title="Claude Artifact" 
              width="100%" 
              height="100%"
              frameBorder="0" 
              allow="clipboard-write" 
              allowFullScreen
              onError={handleIframeError}
              className="w-full h-full"
              style={{ minHeight: '400px' }}
            ></iframe>
            
            {/* Fallback content if iframe fails to load */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Travel Planning Demo</h3>
                <p className="text-secondary mb-4">Interactive travel planning interface</p>
                <button 
                  onClick={() => window.open('https://claude.site/public/artifacts/7f2751f7-8472-427b-8693-e32da78b2465/embed', '_blank')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITravel;