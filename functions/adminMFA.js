/**
 * Admin MFA Validation Utility
 * 
 * Enforces Multi-Factor Authentication (MFA) on administrative endpoints.
 */

/**
 * Middleware to verify that the incoming admin request is authenticated with MFA.
 * In Firebase, the decoded token contains an `amr` (Authentication Methods Reference) array
 * if the user signed in using a second factor.
 */
exports.requireAdminMFA = (req, res, next) => {
  // Mocking the request token for demonstration
  const decodedToken = req.decodedToken || { amr: [] }; 

  // Check if the user is an admin
  if (decodedToken.role !== 'admin') {
    return res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
  }

  // Check if MFA was used
  // Firebase Auth adds 'mfa' or similar identifiers to the `amr` array
  const hasMFA = decodedToken.amr && decodedToken.amr.length > 1;

  if (!hasMFA) {
    console.warn(`[Security] Admin access attempted without MFA by user: ${decodedToken.uid}`);
    return res.status(403).json({ 
      error: 'Access Denied: Multi-Factor Authentication is required for admin endpoints.' 
    });
  }

  console.log('[Security] Admin MFA validated successfully.');
  next();
};
