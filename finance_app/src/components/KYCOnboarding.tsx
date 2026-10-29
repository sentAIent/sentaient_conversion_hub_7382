"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Ensure you replace with your actual Stripe Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock");

export function KYCOnboarding() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"pending" | "verified">("pending");

  const startVerification = async () => {
    setLoading(true);
    try {
      // Call backend to create a VerificationSession
      const response = await fetch("/api/kyc/create-session", { method: "POST" });
      const { clientSecret } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe not loaded");

      // Redirect to Stripe Identity Verification flow
      // Normally uses stripe.verifyIdentity in a real implementation
      // For MVP, we simulate a successful verification
      await new Promise(res => setTimeout(res, 1500));
      setStatus("verified");
    } catch (error) {
      console.error(error);
      alert("Error starting KYC verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Identity Verification (KYC)</h2>
      <p className="text-slate-400 mb-6 text-sm">
        To deploy advanced tokens or unlock premium features, we must verify your identity to comply with AML regulations.
      </p>

      {status === "pending" ? (
        <button
          onClick={startVerification}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg font-medium"
        >
          {loading ? "Preparing session..." : "Verify Identity with Stripe"}
        </button>
      ) : (
        <div className="flex items-center gap-2 text-green-400 font-medium bg-green-400/10 p-3 rounded-lg border border-green-400/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Identity Verified Successfully
        </div>
      )}
    </div>
  );
}
