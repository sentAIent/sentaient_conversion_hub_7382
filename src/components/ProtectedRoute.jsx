import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if the user is a lifetime top subscriber
    const isLifetime = currentUser.subscription?.plan === 'lifetime' || currentUser.subscription?.planId === 'lifetime' || currentUser.subscription?.isProPilot === true;
    
    if (!isLifetime) {
        // Redirect them to the pricing page if they don't have the required subscription
        return <Navigate to="/pricing" replace />;
    }

    return children;
};

export default ProtectedRoute;
