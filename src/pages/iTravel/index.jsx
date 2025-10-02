import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header'; 

const CLAUDE_EMBED_URL = "https://claude.site/public/artifacts/7f2751f7-8472-427b-8693-e32da78b2465/embed";

const ITravel = () => {
  // --- STATE DEFINITIONS ---
  const [isLoading, setIsLoading] = useState(true);
  const [iframeFailed, setIframeFailed] = useState(false); // State to control fallback visibility

  // --- HANDLERS ---
  const handleIframeError = () => {
    console.error('Failed to load iframe content. This may be due to a server-side CSP issue.');
    setIframeFailed(true); // Set state to true to show the fallback UI
  };

  // --- SIDE EFFECTS ---
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate a brief loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // --- LOADING RENDER ---
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

  // --- MAIN RENDER ---
  return (
    <>
      <Helmet>
        <title>iTravel | sentAIent.com</title>
        <meta 
          name="description" 
          content="Discover sentAIent's methodology, team expertise, and AI philosophy..." 
        />
        <meta name="keywords" content="AI methodology, AI team, AI philosophy, AI consultancy approach, ethical AI, human-centered AI" />
        <meta property="og:title" content="About Our Approach - Intelligence Center | sentAIent" />
        <meta property="og:description" content="Meet our expert team and discover the methodology that drives successful AI transformations with measurable business results." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">iTravel Platform</h1>
            <p className="text-lg text-secondary">Testing the travel planning interface...</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <p className="text-primary font-semibold mb-2">TESTING...</p>
            <div className="w-full h-full bg-blue-200 rounded-full">
              <div className="w-1/3 h-1 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Iframe for Claude Artifact */}
          <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-8">
            {!iframeFailed && (
                <iframe 
                src={CLAUDE_EMBED_URL}
                title="Claude Artifact" 
                width="100%" 
                height="100%" 
                frameBorder="0" // Use camelCase for React props
                allow="clipboard-write" 
                allowFullScreen
                onError={handleIframeError}
                className="w-full h-full"
                style={{ minHeight: '800px' }}
                ></iframe>
            )}
          </div>

          {/* ElevenLabs/Convai Voice Agent Container (Fixed) */}
          {/* NOTE: Removed 'overflow-hidden' to ensure the floating widget is visible */}
          <div className="relative w-full h-full bg-gray-100 rounded-lg border border-gray-200 p-4">
            <p className="text-primary font-semibold mb-2">
              AI Voice Agent & Chatbot
            </p>
            {/* The custom component itself - the script must be in public/index.html */}
            <elevenlabs-convai agent-id="agent_4401k66g6ykrfyyscxycfz72rqjh"></elevenlabs-convai>
            {/* IMPORTANT: The <script> tag for the Convai widget 
              (https://unpkg.com/@elevenlabs/convai-widget-embed) 
              MUST be placed in your public/index.html file, NOT here.
            */}
          </div>

        </div>
      </div>
    </>
  );
};

export default ITravel;