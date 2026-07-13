import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Scene3D from './components/Scene3D';

const Demo3DHome = () => {
  return (
    <div className="relative w-screen h-screen bg-[#050505] font-sans text-white overflow-hidden">
      <Helmet>
        <title>sentAIent | Quantum Wormhole Experience</title>
        <meta
          name="description"
          content="Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."
        />
        <meta name="theme-color" content="#050505" />
      </Helmet>

      {/* Header stays on top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Full screen 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

    </div>
  );
};

export default Demo3DHome;
