import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../utils/analytics';

const SEO_MAP = {
    '/': 'sentAIent | Advanced Intelligent Technology',
    '/ai': 'sentAIent | AI Consultancy Hub',
    '/portfolio': 'sentAIent | Our Work',
    '/pricing': 'sentAIent | Enterprise & Consumer Pricing',
    '/interstellar': 'Interstellar | sentAIent Portfolio',
    '/mindwave': 'MindWave | sentAIent Portfolio',
    '/itravel': 'iTravel | sentAIent Portfolio'
};

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        initAnalytics();
    }, []);

    useEffect(() => {
        // Track page view
        trackPageView(location.pathname + location.search);
        
        // Update document title for SEO
        const title = SEO_MAP[location.pathname] || 'sentAIent | Autonomous AI Solutions';
        document.title = title;
        
    }, [location]);

    return null;
};

export default AnalyticsTracker;
