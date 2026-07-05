import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
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
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

import AnalyticsTracker from './components/AnalyticsTracker';
import HomeAlt from './pages/home-alt';

const ProjectRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsTracker />
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/ai" element={<AboutOurApproachIntelligenceCenter />} />
            <Route path="/knowledge-nexus-resource-library" element={<KnowledgeNexusResourceLibrary />} />
            <Route path="/free-ai-assessment-portal" element={<FreeAIAssessmentPortal />} />
            <Route path="/home-alt" element={<HomeAlt />} />
            <Route path="/homepage-ai-consultancy-hub" element={<HomepageAIConsultancyHub />} />
            <Route path="/ai-solutions-experience-center" element={<AISolutionsExperienceCenter />} />
            <Route path="/trust-transparency-hub" element={<TrustTransparencyHub />} />
            <Route path="/about-our-approach-intelligence-center" element={<AboutOurApproachIntelligenceCenter />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/itravel" element={<ITravel />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected App Routes */}
            <Route path="/interstellar" element={<ProtectedRoute><Interstellar /></ProtectedRoute>} />
            <Route path="/mindwave" element={<ProtectedRoute><MindWave /></ProtectedRoute>} />
            
            <Route path="/portfolio" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

