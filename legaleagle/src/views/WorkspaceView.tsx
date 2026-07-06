// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import { Users, Plus, Building, Save, Mail, Trash2 } from 'lucide-react';

interface WorkspaceViewProps {
    currentTheme: Theme;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ currentTheme }) => {
    const { user, profile } = useAuth();
    const [teams, setTeams] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [newTeamName, setNewTeamName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetchTeams();
        }
    }, [user]);

    useEffect(() => {
        if (profile?.current_team_id) {
            fetchMembers(profile.current_team_id);
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
            // Find the user by email via a secure edge function or RPC (for now, we'll simulate it or assume they exist)
            // Real implementation requires an RPC to lookup user by email safely, or use Supabase Auth invite
            alert(`In production, this would send an invite email to ${inviteEmail} for role ${inviteRole}.`);
            setInviteEmail('');
        } catch (err: any) {
            setError(err.message);
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
        </div>
    );
};
