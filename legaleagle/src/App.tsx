import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainApp from './MainApp';
import { LandingPageView } from './views/LandingPageView';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/legaleagle">
      <Routes>
        <Route path="/" element={<LandingPageView />} />
        <Route path="/app/*" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
