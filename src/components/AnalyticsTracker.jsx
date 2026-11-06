import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../utils/analytics';
import { telemetry } from '../services/TelemetryEngine';
import analytics from '../services/ComprehensiveAnalytics';

const SEO_MAP = {
    '/': 'sentAIent | Advanced Intelligent Technology',
    '/ai': 'sentAIent | AI Consultancy Hub',
    '/portfolio': 'sentAIent | Our Work',
    '/pricing': 'sentAIent | Enterprise & Consumer Pricing',
    '/interstellar': 'Interstellar | sentAIent Portfolio',
    '/mindwave': 'MindWave | sentAIent Portfolio',
    '/itravel': 'iTravel | sentAIent Portfolio',
    '/admin/analytics': 'sentAIent | Executive Analytics Dashboard'
};

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        initAnalytics();
    }, []);

    useEffect(() => {
        // Track page view in legacy services
        trackPageView(location.pathname + location.search);
        telemetry.trackPageView();
        
        // Comprehensive Analytics: Track app/page dwell time
        analytics.startAppDwell(location.pathname);
        
        // Update document title for SEO
        const title = SEO_MAP[location.pathname] || 'sentAIent | Autonomous AI Solutions';
        document.title = title;
        
        return () => {
            analytics.endAppDwell();
        };
    }, [location]);

    return null;
};

export default AnalyticsTracker;
