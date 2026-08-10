"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";

export default function CompliancePage() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Basic implementation for MVP data export
      const response = await fetch("/api/export-data", { method: "POST" });
      if (!response.ok) throw new Error("Failed to export data");
      
      // Prompt user to download the blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user_data_export.json";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error exporting data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Compliance & Security
        </h1>

        <div className="max-w-4xl space-y-6">
          {/* GDPR / CCPA Export Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Data Portability (GDPR/CCPA)</h2>
            <p className="text-slate-400 mb-6 text-sm">
              Download a complete archive of your personal data, transaction history, invoices, and audit logs.
            </p>
            <button
              onClick={handleExport}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg font-medium"
            >
              {loading ? "Exporting..." : "Export My Data"}
            </button>
          </div>

          {/* MFA Security Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Multi-Factor Authentication (MFA)</h2>
            <p className="text-slate-400 mb-6 text-sm">
              Secure your account by requiring an authenticator app code during sign-in.
            </p>
            <button
              onClick={() => alert("MFA Setup flow coming soon...")}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors px-4 py-2 rounded-lg font-medium"
            >
              Setup Authenticator App
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
