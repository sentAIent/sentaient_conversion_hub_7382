import React, { useState, useEffect } from 'react';
import { secureStorage } from '../utils/storage';

export default function LegalConsentModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function checkConsent() {
      const hasConsented = await secureStorage.get('legal_consent_accepted');
      if (!hasConsented) {
        setShowModal(true);
      }
    }
    checkConsent();
  }, []);

  const handleAccept = async () => {
    await secureStorage.set('legal_consent_accepted', true);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-lg w-full p-6 shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Terms & Privacy</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Welcome to the SentAIent platform! Before you continue, please review and accept our updated legal agreements. 
          By clicking "I Accept", you agree to our <a href="/tos" className="text-emerald-400 underline" target="_blank" rel="noreferrer">Terms of Service</a> and <a href="/privacy" className="text-emerald-400 underline" target="_blank" rel="noreferrer">Privacy Policy</a>.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          We use cookies and local storage to keep your session secure and improve your experience.
        </p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => window.location.href = "https://google.com"}
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}
