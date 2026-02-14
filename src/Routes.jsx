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
import Pricing from './pages/pricing';
import CheckoutSuccess from './pages/checkout-success';
import ITravel from './pages/iTravel';
import Interstellar from './pages/Interstellar';
import MindWave from './pages/MindWave';


import AnalyticsTracker from './components/AnalyticsTracker';

const ProjectRoutes = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomepageAIConsultancyHub />} />
          <Route path="/knowledge-nexus-resource-library" element={<KnowledgeNexusResourceLibrary />} />
          <Route path="/free-ai-assessment-portal" element={<FreeAIAssessmentPortal />} />
          <Route path="/homepage-ai-consultancy-hub" element={<HomepageAIConsultancyHub />} />
          <Route path="/ai-solutions-experience-center" element={<AISolutionsExperienceCenter />} />
          <Route path="/trust-transparency-hub" element={<TrustTransparencyHub />} />
          <Route path="/about-our-approach-intelligence-center" element={<AboutOurApproachIntelligenceCenter />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/itravel" element={<ITravel />} />
          <Route path="/interstellar" element={<Interstellar />} />
          <Route path="/mindwave" element={<MindWave />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default ProjectRoutes;
