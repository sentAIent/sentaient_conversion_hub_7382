import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming supabase client is exported from here

const AdminMFAGate = ({ children }) => {
  const [isMFAVerified, setIsMFAVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mfaError, setMfaError] = useState(null);
  const [showMfaPrompt, setShowMfaPrompt] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [factorId, setFactorId] = useState('');

  useEffect(() => {
    const checkMFA = async () => {
      try {
        const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (error) throw error;

        if (data.currentLevel === 'aal2') {
          setIsMFAVerified(true);
        } else if (data.nextLevel === 'aal2') {
          // User has MFA enrolled but needs to verify
          const factors = await supabase.auth.mfa.listFactors();
          const totpFactor = factors.data.totp[0];
          if (totpFactor) {
            setFactorId(totpFactor.id);
            setShowMfaPrompt(true);
          } else {
            setMfaError('Admin panel requires MFA enrollment. Please configure 2FA in your account settings.');
          }
        } else {
          setMfaError('Admin panel requires MFA enrollment. Please configure 2FA in your account settings.');
        }
      } catch (err) {
        setMfaError('Failed to verify MFA status.');
        console.error('MFA Error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkMFA();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMfaError(null);
    try {
      const { data, error } = await supabase.auth.mfa.challenge({ factorId });
      if (error) throw error;

      const challengeId = data.id;
      const verifyRes = await supabase.auth.mfa.verify({ factorId, challengeId, code: mfaCode });
      
      if (verifyRes.error) throw verifyRes.error;

      setIsMFAVerified(true);
      setShowMfaPrompt(false);
    } catch (err) {
      setMfaError('Invalid MFA code.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-white">Verifying Security Clearance...</div>;

  if (mfaError) return (
    <div className="p-8 text-center text-red-500 bg-black h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
      <p>{mfaError}</p>
    </div>
  );

  if (showMfaPrompt) return (
    <div className="p-8 bg-black h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Security Clearance Required</h2>
      <form onSubmit={handleVerify} className="flex flex-col gap-4 max-w-sm w-full">
        <label className="text-sm text-gray-400">Enter Authenticator Code (TOTP)</label>
        <input 
          type="text" 
          value={mfaCode} 
          onChange={(e) => setMfaCode(e.target.value)}
          placeholder="000000"
          className="p-3 bg-gray-900 border border-gray-700 rounded text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
          maxLength={6}
          required
        />
        <button type="submit" className="p-3 bg-blue-600 rounded hover:bg-blue-500 transition-colors font-bold">
          Verify Identity
        </button>
      </form>
    </div>
  );

  return isMFAVerified ? children : null;
};

export default AdminMFAGate;
