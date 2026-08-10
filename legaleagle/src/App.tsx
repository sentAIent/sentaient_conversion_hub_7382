import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainApp from './MainApp';
import { LandingPageView } from './views/LandingPageView';
import { AcceptInviteView } from './views/AcceptInviteView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { DeepResearchView } from './views/DeepResearchView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { DueDiligenceView } from './views/DueDiligenceView';
import { WebScraperView } from './views/WebScraperView';
import { MultiAgentReviewView } from './views/MultiAgentReviewView';

import { BillingView } from './views/BillingView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { BenchmarksDashboardView } from './views/BenchmarksDashboardView';
import PageAgentCopilot from './components/PageAgentCopilot';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <PageAgentCopilot />
      <BrowserRouter basename="/legaleagle">
        <Routes>
          <Route path="/landing/:contractType?" element={<LandingPageView />} />
          <Route path="/accept-invite" element={<AcceptInviteView />} />
          <Route path="/graph" element={<KnowledgeGraphView />} />
          <Route path="/research" element={<DeepResearchView />} />
          <Route path="/admin" element={<AdminDashboardView />} />
          <Route path="/due-diligence" element={<DueDiligenceView />} />
          <Route path="/scraper" element={<WebScraperView />} />
          <Route path="/contract-team" element={<MultiAgentReviewView />} />

          <Route path="/billing" element={<BillingView />} />
          <Route path="/knowledge-base" element={<KnowledgeBaseView />} />
          <Route path="/benchmarks" element={<BenchmarksDashboardView />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
