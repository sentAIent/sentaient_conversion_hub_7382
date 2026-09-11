import { Request, Response, NextFunction } from 'express';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';

// Extend Express Request type to include the decoded user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

/**
 * Middleware to enforce Admin MFA requirements.
 * Ensures that the decoded Firebase Auth token contains the multi-factor claim (amr).
 */
export const requireAdminMFA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized. Missing Bearer token.' });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Invalid Bearer token format.' });
    }
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // Attach to request
    req.user = decodedToken;

    // Check for Multi-Factor Authentication claim
    // Firebase auth includes `firebase.sign_in_second_factor` in the token if MFA was completed
    const amr = decodedToken.firebase?.sign_in_second_factor;
    
    // Check if the user has the 'admin' custom claim
    const isAdmin = decodedToken.admin === true;

    if (!isAdmin) {
      return res.status(403).json({ message: 'Forbidden. Admin privileges required.' });
    }

    if (!amr) {
      return res.status(403).json({ 
        message: 'Forbidden. Multi-Factor Authentication (MFA) is required for this action.' 
      });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin MFA token:', error);
    return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};
