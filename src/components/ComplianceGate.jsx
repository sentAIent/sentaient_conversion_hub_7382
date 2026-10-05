import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

const ComplianceGate = ({ children }) => {
    const [hasConsented, setHasConsented] = useState(true); // Default true until checked
    const [isChecking, setIsChecking] = useState(true);
    const { currentUser } = useAuth() || {};

    useEffect(() => {
        const checkConsent = async () => {
            setIsChecking(true);
            
            // 1. Check local storage first (fastest for guests/cached)
            const localConsent = localStorage.getItem('sentaient_compliance_accepted');
            
            if (localConsent === 'true') {
                setHasConsented(true);
                setIsChecking(false);
                return;
            }

            // 2. If logged in but no local storage (new device), check Supabase
            if (currentUser) {
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('compliance_accepted')
                        .eq('id', currentUser.id)
                        .single();
                        
                    if (data && data.compliance_accepted) {
                        localStorage.setItem('sentaient_compliance_accepted', 'true');
                        setHasConsented(true);
                    } else {
                        setHasConsented(false);
                    }
                } catch (e) {
                    console.error("Error checking compliance status:", e);
                    setHasConsented(false);
                }
            } else {
                setHasConsented(false);
            }
            
            setIsChecking(false);
        };

        checkConsent();
    }, [currentUser]);

    const handleAccept = async () => {
        localStorage.setItem('sentaient_compliance_accepted', 'true');
        setHasConsented(true);
        
        if (currentUser) {
            try {
                // 1. Update Profile
                await supabase
                    .from('profiles')
                    .update({ compliance_accepted: true })
                    .eq('id', currentUser.id);

                // 2. SOC2 Audit Logging: Record the consent action
                // Get approximate IP via a public API or rely on Supabase Postgres functions to capture request.headers
                const ipResponse = await fetch('https://api.ipify.org?format=json').catch(() => ({ json: () => ({ ip: 'unknown' }) }));
                const ipData = await ipResponse.json();
                
                await supabase
                    .from('audit_logs')
                    .insert({
                        user_id: currentUser.id,
                        action_type: 'compliance_consent',
                        resource: 'terms_of_service_and_privacy',
                        ip_address: ipData.ip || 'unknown',
                        user_agent: navigator.userAgent,
                        status: 'success',
                        timestamp: new Date().toISOString()
                    });

            } catch (e) {
                console.error("Failed to save consent to database or audit log:", e);
            }
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (hasConsented) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-8 shadow-brand relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-conversion to-primary"></div>
                
                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Data & Privacy Consent</h2>
                
                <div className="space-y-4 text-muted-foreground text-sm font-medium mb-8 h-48 overflow-y-auto pr-2 custom-scrollbar">
                    <p>
                        Welcome to sentAIent. To continue, you must agree to our Terms of Service and Privacy Policy.
                    </p>
                    <p>
                        <strong className="text-foreground">Data Collection:</strong> We collect necessary usage data and telemetry to ensure network stability and platform synchronization. 
                    </p>
                    <p>
                        <strong className="text-foreground">Analytics (GDPR/CCPA):</strong> We use anonymized analytics to improve the engine performance. You can request deletion of all your data at any time via the Settings menu.
                    </p>
                    <p>
                        By clicking "I Accept", you acknowledge that you have read and agree to be bound by the full terms.
                    </p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handleAccept}
                        className="w-full py-4 bg-primary/10 hover:bg-primary/20 border border-primary rounded-xl text-primary font-bold tracking-wider transition-all shadow-lg hover:shadow-brand/40"
                    >
                        I ACCEPT
                    </button>
                    
                    <div className="flex justify-center gap-6 text-xs mt-2">
                        <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors" target="_blank">Privacy Policy</Link>
                        <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors" target="_blank">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplianceGate;
