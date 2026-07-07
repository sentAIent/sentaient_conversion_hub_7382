// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import toast from 'react-hot-toast';
import { Users, Plus, Building, Save, Mail, Trash2, Shield } from 'lucide-react';

interface WorkspaceViewProps {
    currentTheme: Theme;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ currentTheme }) => {
    const { user, profile } = useAuth();
    const [teams, setTeams] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [invitations, setInvitations] = useState<any[]>([]);
    const [newTeamName, setNewTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retentionDays, setRetentionDays] = useState(0);
    const [terminologyPreference, setTerminologyPreference] = useState('Matters');

    useEffect(() => {
        if (user) {
            fetchTeams();
        }
    }, [user]);

    useEffect(() => {
        if (profile?.current_team_id) {
            fetchMembers(profile.current_team_id);
            fetchInvitations(profile.current_team_id);
        }
    }, [profile?.current_team_id]);

    const fetchTeams = async () => {
        const { data, error } = await supabase
            .from('teams')
            .select('*');
        
        if (error) {
            console.error('Error fetching teams:', error);
        } else {
            setTeams(data || []);
            // Set retention days and terminology for active team
            if (profile?.current_team_id) {
                const activeTeam = data?.find(t => t.id === profile.current_team_id);
                if (activeTeam) {
                    setRetentionDays(activeTeam.data_retention_days || 0);
                    setTerminologyPreference(activeTeam.terminology_preference || 'Matters');
                }
            }
        }
    };

    const fetchMembers = async (teamId: string) => {
        const { data, error } = await supabase
            .from('team_members')
            .select('*, profiles:user_id(username, full_name, avatar_url)')
            .eq('team_id', teamId);
            
        if (error) {
            console.error('Error fetching members:', error);
        } else {
            setMembers(data || []);
        }
    };

    const fetchInvitations = async (teamId: string) => {
        const { data, error } = await supabase
            .from('team_invitations')
            .select('*')
            .eq('team_id', teamId);
            
        if (!error) {
            setInvitations(data || []);
        }
    };

    const handleCreateTeam = async () => {
        if (!newTeamName.trim()) return;
        setLoading(true);
        setError(null);
        
        try {
            const { data, error } = await supabase
                .from('teams')
                .insert([{ name: newTeamName, owner_id: user?.id }])
                .select()
                .single();
                
            if (error) throw error;
            
            setNewTeamName('');
            fetchTeams();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchTeam = async (teamId: string) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ current_team_id: teamId })
                .eq('id', user?.id);
                
            if (error) throw error;
            // The AuthContext should automatically pick up the profile change via realtime or a manual refresh
            // For now, reload window to ensure everything picks up the new team context
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleInviteUser = async () => {
        if (!inviteEmail.trim() || !profile?.current_team_id) return;
        setLoading(true);
        setError(null);
        
        try {
            const { data, error } = await supabase.functions.invoke('invite-user', {
                body: {
                    email: inviteEmail.toLowerCase(),
                    team_id: profile.current_team_id,
                    role: inviteRole
                }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast.success(`Invitation sent to ${inviteEmail}.`);
            setInviteEmail('');
            fetchInvitations(profile.current_team_id);
        } catch (err: any) {
            setError(err.message || 'Failed to send invitation.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('team_members')
                .delete()
                .eq('id', memberId);
                
            if (error) throw error;
            fetchMembers(profile!.current_team_id!);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRetention = async () => {
        if (!profile?.current_team_id) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('teams')
                .update({ 
                    data_retention_days: retentionDays,
                    terminology_preference: terminologyPreference
                })
                .eq('id', profile.current_team_id);
            
            if (error) throw error;
            
            toast.success('Settings updated successfully.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>Workspace Settings</h2>
                <p className={`${currentTheme.textMuted} mb-6`}>
                    Manage your team workspaces, invite colleagues, and configure access controls.
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                    {error}
                </div>
            )}

            {/* Current Workspace Info */}
            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${currentTheme.primary} bg-opacity-10 text-blue-600`}>
                        <Building className="w-5 h-5" />
                    </div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text}`}>My Workspaces</h3>
                </div>

                <div className="space-y-4">
                    {teams.map(team => (
                        <div key={team.id} className={`flex items-center justify-between p-4 rounded-lg border ${currentTheme.border} ${profile?.current_team_id === team.id ? 'border-blue-500 bg-blue-50/10' : ''}`}>
                            <div>
                                <div className={`font-semibold ${currentTheme.text}`}>{team.name}</div>
                                <div className={`text-xs ${currentTheme.textMuted}`}>
                                    {team.owner_id === user?.id ? 'Owner' : 'Member'}
                                </div>
                            </div>
                            {profile?.current_team_id !== team.id && (
                                <button
                                    onClick={() => handleSwitchTeam(team.id)}
                                    disabled={loading}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${currentTheme.border} hover:bg-gray-100 dark:hover:bg-gray-800 ${currentTheme.text}`}
                                >
                                    Switch to Team
                                </button>
                            )}
                            {profile?.current_team_id === team.id && (
                                <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                    Active Workspace
                                </span>
                            )}
                        </div>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                        <h4 className={`text-sm font-medium mb-3 ${currentTheme.text}`}>Create New Workspace</h4>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="e.g. Acme Corp Legal"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                                className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input}`}
                            />
                            <button
                                onClick={handleCreateTeam}
                                disabled={loading || !newTeamName.trim()}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                            >
                                <Plus className="w-4 h-4" />
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members */}
            {profile?.current_team_id && (
                <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-lg ${currentTheme.primary} bg-opacity-10 text-blue-600`}>
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Team Members</h3>
                    </div>

                    <div className="space-y-4 mb-8">
                        {members.map(member => (
                            <div key={member.id} className={`flex items-center justify-between p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                                        {member.profiles?.full_name?.charAt(0) || member.profiles?.username?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className={`font-medium text-sm ${currentTheme.text}`}>
                                            {member.profiles?.full_name || member.profiles?.username || 'Unknown User'}
                                        </div>
                                        <div className={`text-xs ${currentTheme.textMuted} capitalize`}>
                                            {member.role}
                                        </div>
                                    </div>
                                </div>
                                {member.user_id !== user?.id && (
                                    <button
                                        onClick={() => handleRemoveMember(member.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Remove member"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        {invitations.map(invite => (
                            <div key={invite.id} className={`flex items-center justify-between p-3 rounded-lg border border-dashed ${currentTheme.border} bg-gray-50/50 dark:bg-gray-800/50`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">
                                        {invite.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className={`font-medium text-sm text-slate-600 dark:text-slate-400`}>
                                            {invite.email} <span className="text-xs font-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full ml-2">Pending</span>
                                        </div>
                                        <div className={`text-xs ${currentTheme.textMuted} capitalize`}>
                                            {invite.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <h4 className={`text-sm font-medium mb-3 ${currentTheme.text}`}>Invite New Member</h4>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="colleague@company.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input}`}
                            />
                            <select
                                value={inviteRole}
                                onChange={(e) => setInviteRole(e.target.value)}
                                className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input}`}
                            >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button
                                onClick={handleInviteUser}
                                disabled={loading || !inviteEmail.trim()}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                            >
                                <Mail className="w-4 h-4" />
                                Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Data Retention & Terminology Settings */}
            {profile?.current_team_id && (
                <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-lg ${currentTheme.primary} bg-opacity-10 text-blue-600`}>
                            <Shield className="w-5 h-5" />
                        </div>
                        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Workspace Settings</h3>
                    </div>

                    <div className="space-y-6 mb-6">
                        <div>
                            <h4 className={`text-sm font-medium mb-2 ${currentTheme.text}`}>App Terminology</h4>
                            <p className={`text-sm ${currentTheme.textMuted} mb-3`}>
                                Choose how you want to refer to case configurations across the application.
                            </p>
                            <select
                                value={terminologyPreference}
                                onChange={(e) => setTerminologyPreference(e.target.value)}
                                className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input} w-64`}
                            >
                                <option value="Cases">Cases</option>
                                <option value="Matters">Matters</option>
                                <option value="Projects">Projects</option>
                                <option value="Clients">Clients</option>
                            </select>
                        </div>

                        <div>
                            <h4 className={`text-sm font-medium mb-2 ${currentTheme.text}`}>Data Retention Policy</h4>
                            <p className={`text-sm ${currentTheme.textMuted} mb-3`}>
                                Configure how long Legal Eagle stores analyzed documents for this workspace. 
                            </p>
                            <div className="flex gap-4 items-center">
                                <select
                                    value={retentionDays}
                                    onChange={(e) => setRetentionDays(Number(e.target.value))}
                                    className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input} w-64`}
                                >
                                    <option value={0}>Indefinitely (Keep forever)</option>
                                    <option value={30}>30 Days</option>
                                    <option value={90}>90 Days</option>
                                    <option value={180}>180 Days</option>
                                    <option value={365}>1 Year</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                                onClick={handleUpdateRetention}
                                disabled={loading}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                            >
                                <Save className="w-4 h-4" />
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
