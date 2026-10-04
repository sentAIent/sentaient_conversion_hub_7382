"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function MFASetup() {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const supabase = createClientComponentClient();

  const initiateMFA = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
      if (error) throw error;
      
      setQrCodeUrl(data.totp.qr_code);
      setFactorId(data.id);
    } catch (error) {
      console.error(error);
      alert("Failed to initiate MFA");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!factorId || !verifyCode) return;
    
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verifyCode
      });

      if (verify.error) throw verify.error;

      alert("MFA successfully enabled!");
      setQrCodeUrl(null); // Reset or show success state
    } catch (error) {
      console.error("MFA Verify Error:", error);
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Two-Factor Authentication (2FA)</h2>
      <p className="text-slate-400 mb-6 text-sm">
        Add an extra layer of security to your account by using an authenticator app.
      </p>

      {!qrCodeUrl ? (
        <button
          onClick={initiateMFA}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg font-medium"
        >
          {loading ? "Generating Code..." : "Setup Authenticator App"}
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-green-400">Scan this QR code with your Authenticator App:</p>
          <div className="bg-white p-4 inline-block rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeUrl} alt="MFA QR Code" width={200} height={200} />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Enter the 6-digit code to verify:</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="000000" 
                maxLength={6}
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
              />
              <button onClick={handleVerify} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium">
                Verify & Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
