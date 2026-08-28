import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import logo from './sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png';

const Footer = () => {
    return (
        <footer className="bg-secondary text-foreground py-16 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <img src={logo} alt="sentAIent" className="h-32 md:h-48 w-auto object-contain opacity-90" />
                        </div>
                        <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                            We build the bridges between human potential and digital intelligence.
                            Architecting the future of enterprise automation.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
                                <Icon name="Twitter" size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
                                <Icon name="Linkedin" size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
                                <Icon name="Github" size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-accent">Services</h4>
                        <ul className="space-y-4 text-foreground/60 text-sm">
                            <li><a href="#" className="hover:text-accent transition-colors">Agentic AI</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Full Stack Dev</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Digital Growth</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">AI Consulting</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-accent">Company</h4>
                        <ul className="space-y-4 text-foreground/60 text-sm">
                            <li><a href="/about-our-approach-intelligence-center" className="hover:text-accent transition-colors">Our Approach</a></li>
                            <li><a href="/mindwave" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Mindwave</a></li>
                            <li><a href="/interstellar" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Interstellar</a></li>
                            <li><a href="/trust-transparency-hub" className="hover:text-accent transition-colors">Trust & Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/20">
                    <p>© {new Date().getFullYear()} sentAIent. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
