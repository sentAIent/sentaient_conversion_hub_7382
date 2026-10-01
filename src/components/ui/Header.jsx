import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import logo from './sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveTab('Home'); } },
    { name: 'Platforms', action: () => { document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' }); setActiveTab('Platforms'); } },
    { name: 'Agent Studio', action: () => { navigate('/agent-studio'); setActiveTab('Agent Studio'); } },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div 
        className={`relative flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full transition-all duration-500 ease-out border ${
          isScrolled 
            ? 'bg-[#0a0a0a]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group relative z-10" onClick={() => setActiveTab('Home')}>
          <div className="relative">
            <img src={logo} alt="sentAIent" className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
        </Link>

        {/* Center Pill Nav */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={item.action}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active-tab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="hidden md:flex px-5 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Contact
          </button>
          
          {currentUser ? (
            <Link to="/agent-studio" className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all">
              <Icon name="User" size={18} className="text-white" />
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]">
              <Icon name="LogIn" size={16} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
