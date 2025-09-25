import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

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
      path: '/homepage-ai-consultancy-hub',
      icon: 'Home'
    },
    {
      name: 'AI Solutions',
      path: '/ai-solutions-experience-center',
      icon: 'Cpu'
    },
    {
      name: 'Free Assessment',
      path: '/free-ai-assessment-portal',
      icon: 'ClipboardCheck'
    },
    {
      name: 'Our Approach',
      path: '/about-our-approach-intelligence-center',
      icon: 'Target'
    }
  ];

  const moreItems = [
    {
      name: 'Knowledge Library',
      path: '/knowledge-nexus-resource-library',
      icon: 'BookOpen'
    },
    {
      name: 'Trust & Transparency',
      path: '/trust-transparency-hub',
      icon: 'Shield'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-elevation border-b border-border' 
          : 'bg-background'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/homepage-ai-consultancy-hub" 
            className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-brand">
                <img 
                  src={'/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png'}
                  alt="Company Logo" 
                  className="logo"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-subtle"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary tracking-tight">
                sentAIent
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
                <Icon name="ChevronDown" size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-deep opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  {moreItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Calculator"
              iconPosition="left"
              onClick={() => window.location.href = '/free-ai-assessment-portal'}
            >
              ROI Calculator
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              className="bg-conversion hover:bg-conversion/90"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
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
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 bg-muted/50 border-t border-border">
            <nav className="space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Calculator"
                iconPosition="left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = '/free-ai-assessment-portal';
                }}
              >
                ROI Calculator
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                className="bg-conversion hover:bg-conversion/90"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = 'https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false';
                }}
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;