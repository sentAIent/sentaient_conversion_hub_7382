import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import logo from './sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Home',
      path: '/portfolio',
      icon: 'Home'
    },
    {
      name: 'Our Platforms',
      path: '/portfolio', // In the future, this can link to #platforms if we add scroll IDs
      icon: 'Layout'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#050505]/95 backdrop-blur-md shadow-lg border-b border-white/5'
      : 'bg-transparent'
      }`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/portfolio"
            className="flex items-center space-x-3 transition-transform duration-300"
          >
            <div className="relative">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <img src={logo} alt="sentAIent" className="h-24 md:h-32 w-auto object-contain opacity-90" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Icon name="Home" size={16} />
              <span>Home</span>
            </button>
            <button
              onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Icon name="Layout" size={16} />
              <span>Our Platforms</span>
            </button>
            
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="flex items-center space-x-2 px-6 py-2 ml-2 rounded-full text-sm font-medium transition-colors duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10"
            >
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size={24}
              className="transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-6 py-4 bg-[#0A0A0B] border-t border-white/5">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Icon name="Home" size={18} />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Icon name="Layout" size={18} />
                <span>Our Platforms</span>
              </button>
              
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-500"
              >
                <span>Contact Us</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;