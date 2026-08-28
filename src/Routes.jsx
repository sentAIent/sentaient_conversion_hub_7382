import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsTracker from './components/AnalyticsTracker';
import MobileAppManager from './components/MobileAppManager';
import ComplianceGate from './components/ComplianceGate';

const Home = React.lazy(() => import('./pages/home'));
const DemoHome = React.lazy(() => import('./pages/demo'));
const Demo3DHome = React.lazy(() => import('./pages/demo3d'));
const Demo3DBackupHome = React.lazy(() => import('./pages/demo3d-backup'));
const KnowledgeNexusResourceLibrary = React.lazy(() => import('./pages/knowledge-nexus-resource-library'));
const FreeAIAssessmentPortal = React.lazy(() => import('./pages/free-ai-assessment-portal'));
const HomepageAIConsultancyHub = React.lazy(() => import('./pages/homepage-ai-consultancy-hub'));
const AISolutionsExperienceCenter = React.lazy(() => import('./pages/ai-solutions-experience-center'));
const TrustTransparencyHub = React.lazy(() => import('./pages/trust-transparency-hub'));
const AboutOurApproachIntelligenceCenter = React.lazy(() => import('./pages/about-our-approach-intelligence-center'));
const Pricing = React.lazy(() => import('./pages/pricing'));
const CheckoutSuccess = React.lazy(() => import('./pages/checkout-success'));
const ITravel = React.lazy(() => import('./pages/iTravel'));
const Interstellar = React.lazy(() => import('./pages/Interstellar'));
const MindWave = React.lazy(() => import('./pages/MindWave'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const HomeAlt = React.lazy(() => import('./pages/home-alt'));
const IcebreakerLanding = React.lazy(() => import('./pages/IcebreakerLanding'));
const IcebreakerAdmin = React.lazy(() => import('./pages/IcebreakerAdmin'));
const IcebreakerLocalApp = React.lazy(() => import('./pages/IcebreakerLocalApp'));
const IcebreakerTutorial = React.lazy(() => import('./pages/IcebreakerTutorial'));
const InterstellarLanding = React.lazy(() => import('./pages/InterstellarLanding'));
const MindwaveLanding = React.lazy(() => import('./pages/MindwaveLanding'));
const LightspeedHardware = React.lazy(() => import('./pages/LightspeedHardware'));
const AgentMarketplace = React.lazy(() => import('./pages/AgentMarketplace'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const MatrixChatDemo = React.lazy(() => import('./pages/MatrixChatDemo'));
const SportsAnalytics = React.lazy(() => import('./pages/SportsAnalytics'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProjectRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ComplianceGate>
          <MobileAppManager />
          <AnalyticsTracker />
          <ErrorBoundary>
            <ScrollToTop />
            <React.Suspense fallback={<PageLoader />}>
            <RouterRoutes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<DemoHome />} />
              <Route path="/landing3d" element={<Demo3DHome />} />
              <Route path="/demo3d-backup" element={<Demo3DBackupHome />} />
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
              <Route path="/matrix-edge-ai" element={<MatrixChatDemo />} />
              
              {/* App Routes (Public for Marketing Phase) */}
              <Route path="/interstellar" element={<Interstellar />} />
              <Route path="/interstellar/landing" element={<InterstellarLanding />} />
              <Route path="/mindwave" element={<MindWave />} />
              <Route path="/mindwave/landing" element={<MindwaveLanding />} />
              
              <Route path="/icelogin" element={<IcebreakerLanding />} />
              <Route path="/icewaitlist" element={<IcebreakerAdmin />} />
              <Route path="/iceadmin" element={<IcebreakerAdmin />} />
              <Route path="/icebreaker/tutorial" element={<IcebreakerTutorial />} />
              <Route path="/icebreaker/*" element={<IcebreakerLocalApp />} />
              
              <Route path="/lightspeed/hardware" element={<LightspeedHardware />} />
              <Route path="/marketplace" element={<AgentMarketplace />} />
              <Route path="/sports-analytics" element={<SportsAnalytics />} />
              
              {/* Legal Pages */}
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />

              <Route path="/portfolio" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </React.Suspense>
          </ErrorBoundary>
        </ComplianceGate>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

