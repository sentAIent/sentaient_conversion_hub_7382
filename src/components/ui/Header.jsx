import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import logo from './sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#050505]/95 backdrop-blur-md shadow-lg border-b border-white/5'
      : 'bg-transparent'
      }`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
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

          {/* Consolidated Dropdown Menu in Top Right Corner */}
          <HeaderDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;