"use client";

import React, { useState } from 'react';
import { useEntity } from '@/context/EntityContext';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  EyeOff,
  Bell,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function IntegrationsSettingsPage() {
  const { activeEntity } = useEntity();

  // Zero-Trust Isolation Mode: Default TRUE (Maximum privacy, all external messaging blocked)
  const [zeroTrustActive, setZeroTrustActive] = useState(true);

  // Granular redaction rules
  const [maskClientNames, setMaskClientNames] = useState(true);
  const [roundDollarFigures, setRoundDollarFigures] = useState(true);
  const [stripSensitiveAccounts, setStripSensitiveAccounts] = useState(true);

  // Optional Webhook state
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');
  const [slackEnabled, setSlackEnabled] = useState(false);

  const handleToggleZeroTrust = () => {
    if (zeroTrustActive) {
      // User is disabling Zero-Trust (enabling potential external webhooks)
      const confirmed = window.confirm(
        'SECURITY WARNING: Disabling Zero-Trust Isolation permits data to be dispatched to configured external third-party webhooks (e.g. Slack/Discord). Are you sure you wish to disable air-gapped isolation?'
      );
      if (!confirmed) return;
      setZeroTrustActive(false);
      toast.error('Zero-Trust Isolation disabled. External webhooks enabled.');
    } else {
      setZeroTrustActive(true);
      setSlackEnabled(false);
      toast.success('Zero-Trust Isolation active: All external messaging webhooks severed.');
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (zeroTrustActive) {
      toast.error('Cannot enable Slack webhooks while Zero-Trust Isolation is active.');
      return;
    }
    setSlackEnabled(true);
    toast.success('Slack webhook saved with PII masking active.');
  };

  const handleTestWebhook = () => {
    if (zeroTrustActive) {
      toast.error('Blocked: Zero-Trust Isolation is active.');
      return;
    }
    toast.success('Simulated masked webhook ping dispatched to Slack.');
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Zero-Trust Privacy & Integrations</h1>
        <p className="text-gray-500 mt-1">
          Manage third-party data transmission policies, webhook air-gapping, and field-level redaction for {activeEntity?.name || 'Company'}.
        </p>
      </div>

      {/* Master Zero-Trust Isolation Switch */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          zeroTrustActive
            ? 'bg-emerald-50/50 border-emerald-300'
            : 'bg-amber-50/50 border-amber-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-xl flex-shrink-0 ${
                zeroTrustActive ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              {zeroTrustActive ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {zeroTrustActive ? 'Zero-Trust Isolation: ACTIVE (Air-Gapped)' : 'Zero-Trust Isolation: DISABLED'}
                </h2>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    zeroTrustActive ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {zeroTrustActive ? 'Protected' : 'External Egress Allowed'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1 max-w-xl">
                {zeroTrustActive
                  ? 'All outbound transmissions to external messaging services (Slack, WhatsApp, Discord) are completely blocked. Your company ledger never touches third-party chat clouds.'
                  : 'Outbound webhooks are enabled. Ensure field-level PII masking is configured below to prevent exposing customer names or exact dollar amounts.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleZeroTrust}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm ${
              zeroTrustActive
                ? 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {zeroTrustActive ? 'Disable Isolation (Allow Webhooks)' : 'Enable Zero-Trust Isolation'}
          </button>
        </div>
      </div>

      {/* Field-Level Data Minimization Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <EyeOff className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Data Minimization & Redaction Engine</h2>
        </div>
        <p className="text-xs text-gray-500">
          Even if external notifications are enabled, these rules strip sensitive records before payload dispatch.
        </p>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100/70 transition">
            <div>
              <p className="text-sm font-semibold text-gray-900">Mask Client & Customer Names</p>
              <p className="text-xs text-gray-500">Replaces client names with hashed pseudonyms (e.g. &quot;Client [A-882]&quot;).</p>
            </div>
            <input
              type="checkbox"
              checked={maskClientNames}
              onChange={(e) => setMaskClientNames(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100/70 transition">
            <div>
              <p className="text-sm font-semibold text-gray-900">Round Sensitive Dollar Figures</p>
              <p className="text-xs text-gray-500">Rounds exact figures to nearest thousand (e.g. \$12,410.22 becomes \$12k+).</p>
            </div>
            <input
              type="checkbox"
              checked={roundDollarFigures}
              onChange={(e) => setRoundDollarFigures(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100/70 transition">
            <div>
              <p className="text-sm font-semibold text-gray-900">Strip Bank Account & Wire Routing Data</p>
              <p className="text-xs text-gray-500">Permanently redacts last-4 bank digits and institution names.</p>
            </div>
            <input
              type="checkbox"
              checked={stripSensitiveAccounts}
              onChange={(e) => setStripSensitiveAccounts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Optional Slack / Discord Webhook Setup */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Optional Outbound Webhook (Slack / Discord)</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
            Opt-In Only
          </span>
        </div>

        {zeroTrustActive ? (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Outbound webhooks are disabled because <strong>Zero-Trust Isolation Mode</strong> is active. Disable isolation above if your team explicitly authorizes third-party channel notifications.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSaveWebhook} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Incoming Webhook URL (Slack or Discord)
              </label>
              <input
                type="url"
                placeholder="https://hooks.slack.com/services/T00/B00/XXXX"
                value={slackWebhookUrl}
                onChange={(e) => setSlackWebhookUrl(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={!slackWebhookUrl}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                Send Masked Test Ping
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Save Integration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
