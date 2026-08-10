import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
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
      path: '/homepage-ai-consultancy-hub',
      icon: 'Home'
    },
    {
      name: 'AI Solutions',
      path: '/ai-solutions-experience-center',
      icon: 'Cpu'
    },
    {
      name: 'Pricing',
      path: '/pricing',
      icon: 'DollarSign'
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
    },
    {
      name: 'Home Alt',
      path: '/home-alt',
      icon: 'Layout'
    },
    {
      name: 'Trust & Transparency',
      path: '/trust-transparency-hub',
      icon: 'Shield'
    }
  ];

  const moreItems = [
    {
      name: 'Knowledge Library',
      path: '/knowledge-nexus-resource-library',
      icon: 'BookOpen'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-background/95 backdrop-blur-md shadow-elevation border-b border-border'
      : 'bg-background'
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
                <div className="w-20 h-10 flex items-center justify-center">
                  <img src={logo} alt="sentAIent" className="h-8 w-auto" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActivePath(item?.path)
                  ? 'bg-accent text-background shadow-subtle'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
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
              className="bg-accent hover:bg-accent/90 text-background"
              onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
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
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-6 py-4 bg-muted/50 border-t border-border">
            <nav className="space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActivePath(item?.path)
                    ? 'bg-accent text-background shadow-subtle'
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
                className="bg-accent hover:bg-accent/90 text-background"
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