import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainApp from './MainApp';
import { LandingPageView } from './views/LandingPageView';
import { AcceptInviteView } from './views/AcceptInviteView';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/legaleagle">
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="/landing/:contractType?" element={<LandingPageView />} />
          <Route path="/accept-invite" element={<AcceptInviteView />} />
          <Route path="/app/*" element={<MainApp />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
