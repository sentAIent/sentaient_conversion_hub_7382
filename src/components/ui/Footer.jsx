import React from 'react';
import Icon from '../AppIcon';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 text-white py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-conversion rounded-lg flex items-center justify-center">
                                <Icon name="Brain" size={24} color="white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">sentAIent</span>
                        </div>
                        <p className="text-white/40 max-w-sm mb-6 leading-relaxed">
                            We build the bridges between human potential and digital intelligence.
                            Architecting the future of enterprise automation.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Icon name="Twitter" size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Icon name="Linkedin" size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Icon name="Github" size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-conversion">Services</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Agentic AI</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Full Stack Dev</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Digital Growth</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">AI Consulting</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-conversion">Company</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li><a href="/about-our-approach-intelligence-center" className="hover:text-white transition-colors">Our Approach</a></li>
                            <li><a href="/mindwave" className="hover:text-white transition-colors">Mindwave</a></li>
                            <li><a href="/interstellar" className="hover:text-white transition-colors">Interstellar</a></li>
                            <li><a href="/trust-transparency-hub" className="hover:text-white transition-colors">Trust & Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
                    <p>© {new Date().getFullYear()} sentAIent. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
