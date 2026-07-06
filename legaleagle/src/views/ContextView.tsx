import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Theme, Party } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface ContextViewProps {
    parties: Party[];
    setParties: (parties: Party[]) => void;
    currentTheme: Theme;
}

export const ContextView: React.FC<ContextViewProps> = ({
    parties,
    setParties,
    currentTheme
}) => {
    const { profile, refreshProfile } = useAuth();
    const [webhookUrl, setWebhookUrl] = React.useState(profile?.n8n_webhook_url || '');
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        if (profile?.n8n_webhook_url) {
            setWebhookUrl(profile.n8n_webhook_url);
        }
    }, [profile]);

    const handleSaveWebhook = async () => {
        setIsSaving(true);
        try {
            await supabase.rpc('update_profile', { new_n8n_webhook_url: webhookUrl });
            await refreshProfile();
            alert('n8n Webhook URL saved successfully!');
        } catch (error) {
            console.error('Failed to save webhook', error);
            alert('Failed to save webhook URL.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddParty = () => {
        setParties([
            ...parties,
            {
                id: Date.now(),
                name: 'New Party',
                role: 'Role',
                domicile: 'State'
            }
        ]);
    };

    const handleUpdateParty = (id: number, field: keyof Party, value: string) => {
        setParties(parties.map(party =>
            party.id === id ? { ...party, [field]: value } : party
        ));
    };

    const handleRemoveParty = (id: number) => {
        setParties(parties.filter(party => party.id !== id));
    };

    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main || currentTheme.appBg}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Case Configuration</h1>
                <p className="text-slate-500 mb-6">
                    Configure the parties and context for more accurate legal analysis.
                </p>

                {/* Parties Section */}
                <div className={`rounded-xl border shadow-sm p-6 mb-6 ${currentTheme.card || currentTheme.panelBg}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Contract Parties</h3>
                        <button
                            onClick={handleAddParty}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" /> Add Party
                        </button>
                    </div>

                    <div className="space-y-3">
                        {parties.map(party => (
                            <div key={party.id} className="flex gap-3 items-center">
                                <input
                                    className="flex-1 border border-slate-200 p-2 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Party Name"
                                    value={party.name}
                                    onChange={(e) => handleUpdateParty(party.id, 'name', e.target.value)}
                                />
                                <select
                                    className="border border-slate-200 p-2 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={party.role}
                                    onChange={(e) => handleUpdateParty(party.id, 'role', e.target.value)}
                                >
                                    <option value="Provider">Provider</option>
                                    <option value="Client">Client</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Purchaser">Purchaser</option>
                                    <option value="Licensor">Licensor</option>
                                    <option value="Licensee">Licensee</option>
                                    <option value="Lessor">Lessor</option>
                                    <option value="Lessee">Lessee</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select
                                    className="border border-slate-200 p-2 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={party.domicile}
                                    onChange={(e) => handleUpdateParty(party.id, 'domicile', e.target.value)}
                                >
                                    <option value="Delaware">Delaware</option>
                                    <option value="New York">New York</option>
                                    <option value="California">California</option>
                                    <option value="Texas">Texas</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Illinois">Illinois</option>
                                    <option value="Wyoming">Wyoming</option>
                                    <option value="Nevada">Nevada</option>
                                    <option value="Other">Other</option>
                                </select>
                                <button
                                    onClick={() => handleRemoveParty(party.id)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                    disabled={parties.length <= 1}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Jurisdiction Context */}
                <div className={`rounded-xl border shadow-sm p-6 ${currentTheme.card || currentTheme.panelBg}`}>
                    <h3 className="font-bold text-lg mb-4">Jurisdiction Context</h3>
                    <p className="text-sm text-slate-500 mb-4">
                        The AI will consider the domicile of each party when analyzing choice of law,
                        forum selection, and jurisdiction-specific statutory requirements.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Governing Law
                            </label>
                            <select className="w-full border border-slate-200 p-2 rounded-lg text-sm bg-transparent">
                                <option value="">Auto-detect from contract</option>
                                <option value="delaware">Delaware</option>
                                <option value="new_york">New York</option>
                                <option value="california">California</option>
                                <option value="texas">Texas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Contract Type
                            </label>
                            <select className="w-full border border-slate-200 p-2 rounded-lg text-sm bg-transparent">
                                <option value="services">Services Agreement</option>
                                <option value="saas">SaaS/License Agreement</option>
                                <option value="employment">Employment Contract</option>
                                <option value="nda">Non-Disclosure Agreement</option>
                                <option value="lease">Lease Agreement</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Automation & Integrations Section */}
                <div className={`mt-6 rounded-xl border shadow-sm p-6 ${currentTheme.card || currentTheme.panelBg}`}>
                    <h3 className="font-bold text-lg mb-4">Integrations & Automation</h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Connect Legal Eagle to your workflows. We currently support pushing analysis results to n8n Webhooks.
                    </p>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            n8n Webhook URL
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="url" 
                                className="flex-1 border border-slate-200 p-2 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://your-n8n-instance.com/webhook/..."
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                            />
                            <button 
                                onClick={handleSaveWebhook}
                                disabled={isSaving}
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            When an analysis completes, we will send a POST request with the JSON payload to this URL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextView;
