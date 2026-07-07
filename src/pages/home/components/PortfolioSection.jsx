import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Globe, HeartPulse, Scale, Rocket, Waves, X, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const projects = [
  {
    title: 'Icebreaker',
    description: 'A real-world social platform bridging the gap between digital networks and in-person connections.',
    longDescription: 'Icebreaker is designed to cure the modern epidemic of digital isolation. By leveraging geo-location and AI-driven personality matching, the platform facilitates meaningful, in-person interactions, turning digital acquaintances into real-world friendships through curated local events.',
    features: [
      'Geo-location Matchmaking',
      'AI-driven Personality Profiles',
      'Curated Local Event Suggestions',
      'Secure, Verified Meetups'
    ],
    icon: Globe,
    logo: '/icebreaker_logo.png',
    logoScale: 'scale-[0.85]',
    color: 'from-pink-500 to-rose-400',
    logoBg: 'bg-[#202733]', 
    cardBg: 'bg-gradient-to-br from-rose-500 to-orange-600 hover:from-rose-400 hover:to-orange-500',
    modalBg: 'bg-gradient-to-br from-rose-500 to-orange-600',
    buttonColor: 'bg-white text-blue-900 hover:bg-blue-50',
    path: '#', // Placeholder
    tag: 'Social Platform'
  },
  {
    title: 'MindWave',
    description: 'Advanced brainwave entrainment studio with binaural beats and immersive visualizations.',
    longDescription: 'MindWave is your personal cognitive enhancement studio. Combining clinically-backed binaural beats with synchronized immersive visualizations, the platform guides users into deep states of focus, relaxation, or meditation, optimizing brainwave frequencies for peak mental performance.',
    features: [
      'Clinically-backed Binaural Beats',
      'Synchronized Visual Entrainment',
      'Custom Focus & Sleep Profiles',
      'Biometric Feedback Integration'
    ],
    icon: HeartPulse,
    logo: '/mindwave-logo.png',
    logoScale: 'scale-[2.2] translate-y-3',
    color: 'from-slate-800 to-indigo-900',
    logoBg: 'bg-[#202733]',
    cardBg: 'bg-[#60a9ff] hover:bg-[#509af0]',
    modalBg: 'bg-[#60a9ff]',
    buttonColor: 'bg-white text-amber-900 hover:bg-amber-50',
    path: '/mindwave',
    tag: 'Health & Wellness'
  },
  {
    title: 'Interstellar',
    description: 'Rule your galactic empire by winning battles, collecting resources, and upgrading your bases and spaceships',
    longDescription: 'Interstellar offers a breathtaking journey through the cosmos. It is a highly interactive, scientifically accurate space cartography experience that lets users explore exoplanets, navigate star systems, and witness cosmic phenomena in real-time rendered 3D environments.',
    features: [
      'Scientifically Accurate Star Maps',
      'Real-time 3D Rendering',
      'Exoplanet Surface Exploration',
      'Educational Cosmic Simulations'
    ],
    icon: BrainCircuit,
    logo: '/interstellar_logo.png',
    logoScale: 'scale-100',
    color: 'from-orange-500 to-amber-400',
    logoBg: 'bg-[#202733]',
    cardBg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 hover:from-gray-800 hover:via-indigo-800 hover:to-purple-800',
    modalBg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900',
    buttonColor: 'bg-white text-blue-900 hover:bg-blue-50',
    path: '/interstellar',
    tag: 'Interactive Media'
  },
  {
    title: 'Legal Eagle',
    description: 'Eagle-eyed contract review for your peace of mind. AI document analysis proposes new clauses based on US contract law, featuring a comically brutal "Roast Mode".',
    longDescription: 'Legal Eagle brings the power of LLMs to the legal sector with unparalleled document analysis. It not only compares your contracts against a vast legal database to propose new clauses, but its infamous "Roast Mode" comically highlights loopholes, tearing apart bad clauses while providing bulletproof recommendations.',
    features: [
      'Deep-dive Contract Analysis',
      'Automated Clause Generation',
      'Comical "Roast Mode" Critiques',
      'Compliance & Loophole Detection'
    ],
    icon: Scale,
    logo: '/legal_eagle_logo.png',
    logoScale: 'scale-[1.35]',
    color: 'from-indigo-500 to-purple-400',
    logoBg: 'bg-[#202733]',
    cardBg: 'bg-gradient-to-br from-violet-700 to-purple-800 hover:from-violet-600 hover:to-purple-700',
    modalBg: 'bg-gradient-to-br from-violet-700 to-purple-800',
    buttonColor: 'bg-white text-purple-900 hover:bg-purple-50',
    path: 'https://sentaient.com/legaleagle', // Added link
    tag: 'Legal'
  },
  {
    title: 'AutoPilot',
    description: 'Enterprise B2B social media marketing automation platform. AI-driven content creation that handles scheduling, posting, and comprehensive macro and micro analytics.',
    longDescription: 'Our flagship B2B platform revolutionizes how enterprises handle their marketing. By deploying autonomous AI agents, it seamlessly orchestrates campaigns from ideation to execution, automatically calculating ROI and adjusting strategies in real-time based on live market data.',
    features: [
      'Autonomous Campaign Execution',
      'Real-time ROI Tracking & Optimization',
      'Predictive Audience Targeting',
      'Automated A/B Testing at Scale'
    ],
    icon: Rocket,
    logo: '/autopilot_logo.png',
    logoScale: 'scale-[1.1]',
    color: 'from-blue-500 to-cyan-400',
    logoBg: 'bg-[#202733]',
    cardBg: 'bg-gradient-to-br from-[#8E9AAF] to-[#4A5568] hover:from-[#9ba7bb] hover:to-[#556276]',
    modalBg: 'bg-gradient-to-br from-[#8E9AAF] to-[#4A5568]',
    buttonColor: 'bg-white text-slate-900 hover:bg-slate-100',
    path: '/ai-solutions-experience-center',
    tag: 'Enterprise'
  },
  {
    title: 'CloveH2O',
    description: 'Next-generation smart hydration and wellness tracking platform (Coming Soon).',
    longDescription: 'CloveH2O redefines personal health by gamifying and tracking hydration at a cellular level. Integrating with smart bottles and wearable tech, the platform calculates optimal fluid intake based on daily activity, local weather, and individual biometrics.',
    features: [
      'Smart Bottle Integration',
      'Biometric Hydration Algorithms',
      'Gamified Wellness Challenges',
      'Cellular Health Insights'
    ],
    icon: Waves,
    logo: '/cloveh2o_logo.png',
    logoScale: 'scale-[1.4] translate-y-3',
    color: 'from-cyan-400 to-blue-300',
    logoBg: 'bg-[#202733]',
    cardBg: 'bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400',
    modalBg: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    buttonColor: 'bg-white text-green-900 hover:bg-green-50',
    path: 'https://cloveh2o.com',
    tag: 'Health & Wellness',
    launchLabel: 'Launch Website'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeProject]);

  return (
    <section id="platforms" className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Technology</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our Advanced Intelligence Technology systems are designed to help you conquer your world while remaining grounded.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <button 
                onClick={() => setActiveProject(project)}
                className="w-full text-left block h-full focus:outline-none"
              >
                <div className={`group relative h-full p-8 rounded-3xl ${project.cardBg} border border-transparent transition-all duration-300 overflow-hidden flex flex-col`}>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-2 rounded-2xl ${project.logoBg} shadow-inner flex items-center justify-center`}>
                        {project.logo ? (
                          <img src={project.logo} alt={`${project.title} logo`} className={`w-32 h-32 object-contain drop-shadow-lg ${project.logoScale || ''}`} />
                        ) : (
                          <project.icon className="w-16 h-16 text-white" />
                        )}
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white border border-white/10">
                        {project.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-white/90 leading-relaxed mb-8 flex-grow font-medium">
                      {project.description}
                    </p>

                    <div className="text-sm font-bold text-white mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Popup overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-2xl ${activeProject.modalBg} border border-transparent rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]`}
            >
              <div className="relative z-10 p-8 sm:p-10 flex flex-col flex-grow overflow-y-auto">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-2 rounded-2xl ${activeProject.logoBg} flex items-center justify-center`}>
                    {activeProject.logo ? (
                      <img src={activeProject.logo} alt={`${activeProject.title} logo`} className={`w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-xl ${activeProject.logoScale || ''}`} />
                    ) : (
                      <activeProject.icon className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{activeProject.title}</h3>
                    <span className="text-sm text-white/80 font-semibold">{activeProject.tag}</span>
                  </div>
                </div>

                <p className="text-white/90 font-medium text-lg leading-relaxed mb-8">
                  {activeProject.longDescription}
                </p>

                <div className="mb-10">
                  <h4 className="text-white font-bold mb-4 text-lg">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 text-white flex-shrink-0`} />
                        <span className="text-white/90 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  {activeProject.path !== '#' ? (
                    <LaunchButton activeProject={activeProject} />
                  ) : (
                    <button 
                      disabled
                      className="px-8 py-3 rounded-full text-white/60 font-semibold bg-white/10 cursor-not-allowed border border-transparent"
                    >
                      Coming Soon
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-8 py-3 rounded-full text-white font-bold bg-white/20 hover:bg-white/30 transition-colors border border-transparent"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const LaunchButton = ({ activeProject }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const handleLaunch = (e) => {
    e.preventDefault();

    // External URLs (e.g. cloveh2o.com) — open directly, no auth required
    if (activeProject.path.startsWith('http')) {
      window.open(activeProject.path, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const isLifetime = currentUser.subscription?.plan === 'lifetime' || 
                       currentUser.subscription?.planId === 'lifetime' || 
                       currentUser.subscription?.isProPilot === true;
                       
    if (!isLifetime) {
      navigate('/pricing');
      return;
    }

    // Open in a new tab
    window.open(activeProject.path, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      onClick={handleLaunch}
      className={`px-8 py-3 rounded-full font-semibold transition-colors ${activeProject.buttonColor} text-center w-full sm:w-auto`}
    >
      {activeProject.launchLabel || 'Launch Experience'}
    </button>
  );
};

export default PortfolioSection;
