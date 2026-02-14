import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServiceShowcase from './components/ServiceShowcase';
import ProductShowcase from './components/ProductShowcase';
import TutorialsSection from './components/TutorialsSection';
import Footer from '../../components/ui/Footer';

const HomeAlt = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "sentAIent | Alternate Reality Homepage";
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-conversion selection:text-white">
            <Header />
            <main>
                <HeroSection />
                <ServiceShowcase />
                <ProductShowcase />
                <TutorialsSection />
            </main>
            <Footer />
        </div>
    );
};

export default HomeAlt;
