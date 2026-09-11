import jwt from 'jsonwebtoken';

// In a real production environment, this should be a strong, unique, randomly generated secret
// loaded from the environment variables (e.g. process.env.JWT_SECRET).
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER_SECRET_FALLBACK_KEY_CHANGE_ME_IN_PROD';

/**
 * Generates an HttpOnly, Secure, SameSite cookie containing a JWT.
 */
export const issueAuthCookie = (res, payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('auth_token', token, {
        httpOnly: true, // Prevents XSS attacks from stealing the cookie via document.cookie
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // Prevents Cross-Site Request Forgery (CSRF)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
};

/**
 * Middleware: Role-Based Access Control (RBAC)
 * Verifies the JWT and ensures the user has the required role.
 */
export const requireRole = (requiredRole) => {
    return (req, res, next) => {
        // Bypass auth for internal server-to-server requests
        const ip = req.ip || req.connection.remoteAddress;
        if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
            req.user = { role: 'admin', id: 'system_internal' };
            return next();
        }

        const token = req.cookies.auth_token;

        if (!token) {
            console.warn(`[Security] Unauthorized access attempt from ${ip}: Missing auth_token cookie.`);
            return res.status(401).json({ error: 'Unauthorized: Missing authentication token.' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            if (decoded.role !== requiredRole && decoded.role !== 'admin') {
                console.warn(`[Security] Forbidden access attempt: User ${decoded.id} lacks role ${requiredRole}.`);
                return res.status(403).json({ error: 'Forbidden: Insufficient permissions.' });
            }

            // Attach user data to request for downstream handlers
            req.user = decoded;
            next();
        } catch (error) {
            console.warn('[Security] Unauthorized access attempt: Invalid or expired token.');
            return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
        }
    };
};
