import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';

const HeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  const logout = auth?.logout;

  // Close dropdown on click outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Close dropdown on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleHomeClick = () => {
    setIsOpen(false);
    if (location.pathname === '/' || location.pathname === '/demo3d') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handlePlatformsClick = () => {
    setIsOpen(false);
    const platformsEl = document.getElementById('platforms');
    if (platformsEl) {
      platformsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/portfolio');
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleNukeData = () => {
    setIsOpen(false);
    if (window.confirm("Are you sure you want to nuke all your local data? This is irreversible.")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      if (logout) await logout();
      navigate('/');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Top Right Menu Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] active:scale-95 border border-white/25 hover:border-white/50 text-white backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_0_25px_rgba(96,169,255,0.35)] select-none overflow-hidden"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Toggle navigation menu"
      >
        {/* Animated Modern HTML5 Hamburger Morph Icon */}
        <div className="relative w-4 h-3 flex flex-col justify-between items-center pointer-events-none" aria-hidden="true">
          <span
            className={`block h-[1.5px] w-4 rounded-full transition-all duration-300 origin-center ${
              isOpen
                ? 'translate-y-[5px] rotate-45 bg-[#60A9FF]'
                : 'bg-white/80 group-hover:bg-white'
            }`}
          />
          <span
            className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
              isOpen
                ? 'w-4 -translate-y-[5.5px] -rotate-45 bg-[#60A9FF]'
                : 'w-2.5 self-start bg-white/60 group-hover:w-4 group-hover:bg-white'
            }`}
          />
        </div>

        <span className="text-xs font-semibold tracking-wider uppercase text-gray-200 group-hover:text-white transition-colors duration-200">
          Menu
        </span>
        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#60A9FF] shadow-[0_0_8px_#60A9FF]' : 'bg-[#60A9FF]/70 group-hover:bg-[#60A9FF] group-hover:shadow-[0_0_8px_#60A9FF]'}`} />
        <Icon
          name="ChevronDown"
          size={13}
          className={`text-gray-400 group-hover:text-blue-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#60A9FF]' : ''}`}
        />

        {/* Ambient Hover Light Sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none transition-transform" />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/20 backdrop-blur-3xl backdrop-saturate-200 p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-200 select-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(10, 18, 38, 0.65) 45%, rgba(4, 8, 20, 0.80) 100%)',
            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 0 20px 0 rgba(255, 255, 255, 0.04), 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px 0 rgba(96, 169, 255, 0.2)'
          }}
        >
          <button
            onClick={handleHomeClick}
            className="group/item w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/[0.12] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-150 text-left cursor-pointer"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-400 group-hover/item:scale-105 transition-transform">
              <Icon name="Home" size={15} />
            </div>
            <span>Home</span>
          </button>

          <button
            onClick={handlePlatformsClick}
            className="group/item w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/[0.12] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-150 text-left cursor-pointer"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-400 group-hover/item:scale-105 transition-transform">
              <Icon name="Layout" size={15} />
            </div>
            <span>Our Platforms</span>
          </button>

          <button
            onClick={handleContactClick}
            className="group/item w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/[0.12] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-150 text-left cursor-pointer"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 group-hover/item:scale-105 transition-transform">
              <Icon name="Mail" size={15} />
            </div>
            <span>Contact Us</span>
          </button>

          <div className="border-t border-white/[0.12] my-1.5 shadow-[0_1px_0_rgba(255,255,255,0.06)]" />

          {currentUser ? (
            <>
              <button
                onClick={handleNukeData}
                className="group/item w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-orange-300 hover:text-orange-200 hover:bg-orange-500/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-150 text-left cursor-pointer"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-400/30 text-orange-400 group-hover/item:scale-105 transition-transform">
                  <Icon name="Trash2" size={15} />
                </div>
                <span>Nuke My Data</span>
              </button>
              <button
                onClick={handleLogout}
                className="group/item w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-500/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-150 text-left cursor-pointer"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-500/15 border border-red-400/30 text-red-400 group-hover/item:scale-105 transition-transform">
                  <Icon name="LogOut" size={15} />
                </div>
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 mt-1 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600/85 to-blue-500/85 hover:from-blue-500 hover:to-blue-400 border border-blue-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(96,169,255,0.35)] backdrop-blur-xl transition-all duration-150 active:scale-98"
            >
              <Icon name="LogIn" size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
