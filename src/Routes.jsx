import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import KnowledgeNexusResourceLibrary from './pages/knowledge-nexus-resource-library';
import FreeAIAssessmentPortal from './pages/free-ai-assessment-portal';
import HomepageAIConsultancyHub from './pages/homepage-ai-consultancy-hub';
import AISolutionsExperienceCenter from './pages/ai-solutions-experience-center';
import TrustTransparencyHub from './pages/trust-transparency-hub';
import AboutOurApproachIntelligenceCenter from './pages/about-our-approach-intelligence-center';
import iTravel from './pages/iTravel/iTravel';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AboutOurApproachIntelligenceCenter />} />
        <Route path="/knowledge-nexus-resource-library" element={<KnowledgeNexusResourceLibrary />} />
        <Route path="/free-ai-assessment-portal" element={<FreeAIAssessmentPortal />} />
        <Route path="/homepage-ai-consultancy-hub" element={<HomepageAIConsultancyHub />} />
        <Route path="/ai-solutions-experience-center" element={<AISolutionsExperienceCenter />} />
        <Route path="/trust-transparency-hub" element={<TrustTransparencyHub />} />
        <Route path="/about-our-approach-intelligence-center" element={<AboutOurApproachIntelligenceCenter />} />
        <Route path="/iTravel" element={<iTravel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
