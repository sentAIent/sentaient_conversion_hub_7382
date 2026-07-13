import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Icebreaker',
    tag: 'Social Platform',
    description: 'A real-world social platform bridging the gap between digital networks and in-person connections.',
    bgImage: '/hero_slide_icebreaker.jpg',
    logo: '/icebreaker_logo.png',
    logoScale: 'scale-[0.85]',
  },
  {
    title: 'MindWave',
    tag: 'Health & Wellness',
    description: 'Advanced brainwave entrainment studio with binaural beats and immersive visualizations.',
    bgImage: '/hero_slide_mindwave.jpg',
    logo: '/mindwave-logo.png',
    logoScale: 'scale-[2.2] translate-y-3',
  },
  {
    title: 'Interstellar',
    tag: 'Interactive Media',
    description: 'Rule your galactic empire by winning battles, collecting resources, and upgrading your bases.',
    bgImage: '/hero_slide_interstellar.jpg',
    logo: '/interstellar_logo.png',
    logoScale: 'scale-100',
  },
  {
    title: 'Legal Eagle',
    tag: 'Legal',
    description: 'Eagle-eyed contract review for your peace of mind. AI document analysis proposes new clauses.',
    bgImage: '/hero_slide_legaleagle.jpg',
    logo: '/legal_eagle_logo.png',
    logoScale: 'scale-[1.35]',
  },
  {
    title: 'AutoPilot',
    tag: 'Enterprise',
    description: 'Enterprise B2B social media marketing automation platform. AI-driven content creation.',
    bgImage: '/hero_slide_autopilot.jpg',
    logo: '/autopilot_logo.png',
    logoScale: 'scale-[1.1]',
  },
  {
    title: 'CloveH2O',
    tag: 'Health & Wellness',
    description: 'Next-generation smart hydration and wellness tracking platform.',
    bgImage: '/cloveh2o_app_icon_1783126137288.jpg',
    logo: '/cloveh2o_logo.png',
    logoScale: 'scale-[1.4] translate-y-3',
  }
];

const Card = ({ project, index, progress, range, targetScale }) => {
  const containerRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.5]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, opacity, top: `calc(-10vh + ${index * 25}px)` }}
        className="relative w-[90vw] max-w-6xl h-[70vh] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Glassmorphism Panel */}
        <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-auto md:w-[450px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/80 bg-black/20 mb-4 inline-block">
            {project.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            {project.title}
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
            {project.description}
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold uppercase tracking-wide text-xs hover:bg-gray-200 transition-colors">
            Explore <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Large floating logo */}
        <div className="absolute top-12 right-12 md:top-1/2 md:-translate-y-1/2 md:right-24 w-32 h-32 md:w-64 md:h-64 opacity-20 pointer-events-none mix-blend-screen">
          {project.logo && (
            <img src={project.logo} alt="" className={`w-full h-full object-contain filter grayscale ${project.logoScale}`} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio3D = () => {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} className="relative w-full z-10 bg-transparent pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <h2 className="text-3xl md:text-5xl font-black text-white text-center uppercase tracking-widest mix-blend-difference">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Ecosystem</span>
        </h2>
      </div>
      
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05);
        return (
          <Card 
            key={i} 
            index={i} 
            project={project} 
            progress={scrollYProgress} 
            range={[i * 0.15, 1]} 
            targetScale={targetScale} 
          />
        );
      })}
    </div>
  );
};

export default Portfolio3D;
