import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import { LandingPageView } from './views/LandingPageView';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/legaleagle">
      <Routes>
        <Route path="/landing" element={<LandingPageView />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
