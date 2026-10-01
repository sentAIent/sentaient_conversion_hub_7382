/**
 * Session Authentication & CSRF Utility
 * 
 * Manages the transition from standard Firebase Client Auth (localStorage/IndexedDB)
 * to HttpOnly, Secure, SameSite Session Cookies for enhanced XSS protection.
 */

// Note: To fully implement this, Firebase Auth on the client is used ONLY to get an 
// initial ID Token, which is immediately sent to an endpoint (/api/sessionLogin) 
// to exchange for a Session Cookie. The client then signs out of Firebase Auth.

export async function createSessionCookie(idToken, csrfToken) {
  try {
    const response = await fetch('/api/sessionLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ idToken })
    });

    if (response.ok) {
      console.log('[Auth] Successfully established HttpOnly session cookie.');
      return true;
    }
    return false;
  } catch (error) {
    console.error('[Auth] Failed to create session cookie', error);
    return false;
  }
}

/**
 * Fetches the CSRF token from the server to attach to mutations.
 */
export async function fetchCsrfToken() {
  try {
    const response = await fetch('/api/csrfToken');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('[Security] Failed to fetch CSRF token', error);
    return null;
  }
}
