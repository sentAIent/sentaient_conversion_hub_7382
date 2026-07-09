import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import toast from 'react-hot-toast';
import { Briefcase, Plus, Users, Lock, Eye, EyeOff, Save, Trash2, Folder, ChevronDown, ChevronRight, ArrowLeft, FileText, Upload } from 'lucide-react';
import { fetchCaseDocuments, HistoryDocument } from '@/services/historyService';
import { formatDate } from '@/utils';
import { parseDocument } from '@/utils/documentParser';

interface CasesViewProps {
    currentTheme: Theme;
    onLoadDemo: (demoId: string) => void;
    onOpenDocument?: (doc: HistoryDocument) => void;
}

const PRE_INSTALLED_DEMOS = [
    { id: 'instagram', name: 'Instagram Demo', description: 'Instagram Terms of Service', access_level: 'public', isDemo: true },
    { id: 'facebook', name: 'Facebook Demo', description: 'Facebook Terms of Service', access_level: 'public', isDemo: true },
    { id: 'tiktok', name: 'TikTok Demo', description: 'TikTok Terms of Service', access_level: 'public', isDemo: true },
    { id: 'x', name: 'X Demo', description: 'X (Twitter) Terms of Service', access_level: 'public', isDemo: true },
    { id: 'snapchat', name: 'Snapchat Demo', description: 'Snapchat Terms of Service', access_level: 'public', isDemo: true }
];

export const CasesView: React.FC<CasesViewProps> = ({ currentTheme, onLoadDemo, onOpenDocument }) => {
    const { user, profile } = useAuth();
    const [cases, setCases] = useState<any[]>(PRE_INSTALLED_DEMOS);
    const [loading, setLoading] = useState(false);
    const [terminology, setTerminology] = useState('Matters');
    const [members, setMembers] = useState<any[]>([]);
    const [isDemosExpanded, setIsDemosExpanded] = useState(false);
    const [showTimestamps, setShowTimestamps] = useState(true);
    
    const [selectedCase, setSelectedCase] = useState<any>(null);
    const [caseDocuments, setCaseDocuments] = useState<HistoryDocument[]>([]);
    
    // Dashboard state
    const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
    const [loadingDocs, setLoadingDocs] = useState(false);
    
    // Form state
    const [isCreating, setIsCreating] = useState(false);
    const [editingCase, setEditingCase] = useState<any>(null);
    const [caseName, setCaseName] = useState('');
    const [caseDesc, setCaseDesc] = useState('');
    const [accessLevel, setAccessLevel] = useState('public');
    const [accessList, setAccessList] = useState<{user_id: string, access_type: string}[]>([]);
    
    // File upload state
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (profile?.current_team_id) {
            fetchTerminology();
            fetchCases();
            fetchMembers();
            fetchRecentDocuments();
        }
    }, [profile?.current_team_id]);

    const fetchTerminology = async () => {
        const { data } = await supabase.from('teams').select('terminology_preference').eq('id', profile!.current_team_id!).single();
        if (data?.terminology_preference) setTerminology(data.terminology_preference);
    };

    const fetchMembers = async () => {
        const { data } = await supabase
            .from('team_members')
            .select('user_id, profiles:user_id(username, full_name)')
            .eq('team_id', profile!.current_team_id!);
        if (data) setMembers(data);
    };

    const fetchCases = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('cases')
            .select('*')
            .eq('team_id', profile!.current_team_id!)
            .order('created_at', { ascending: false });
        if (!error && data) {
            // Filter out any db cases that share a name with our pre-installed demos to prevent "copies of copies"
            const filteredData = data.filter(d => !PRE_INSTALLED_DEMOS.some(p => p.name === d.name));
            setCases([...PRE_INSTALLED_DEMOS, ...filteredData]);
        } else {
            setCases([...PRE_INSTALLED_DEMOS]);
        }
        setLoading(false);
    };

    const fetchRecentDocuments = async () => {
        setLoadingDocs(true);
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .eq('team_id', profile!.current_team_id!)
                .order('created_at', { ascending: false })
                .limit(5);
            
            if (error) {
                console.warn('Error fetching documents (table may not exist yet):', error);
                setRecentDocuments([]);
            } else {
                setRecentDocuments(data || []);
            }
        } catch (e) {
            console.error(e);
            setRecentDocuments([]);
        }
        setLoadingDocs(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setIsUploading(true);
        const toastId = toast.loading(`Uploading ${files.length} document(s)...`);
        
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const text = await parseDocument(file);
                
                if (selectedCase) {
                    const { error } = await supabase.from('history').insert({
                        user_id: user?.id,
                        team_id: profile!.current_team_id!,
                        case_id: selectedCase.id,
                        document_name: file.name,
                        document_text: text,
                        score: 0
                    });
                    if (error) throw error;
                } else {
                    const { error } = await supabase.from('documents').insert({
                        team_id: profile!.current_team_id!,
                        uploader_id: user?.id,
                        name: file.name,
                        content: text,
                        status: 'draft'
                    });
                    if (error) throw error;
                }
            }
            
            toast.success(`Successfully uploaded ${files.length} document(s)`, { id: toastId });
            
            if (selectedCase) {
                const docs = await fetchCaseDocuments(selectedCase.id);
                setCaseDocuments(docs);
            } else {
                fetchRecentDocuments();
            }
        } catch (err: any) {
            toast.error(`Upload failed: ${err.message}`, { id: toastId });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSave = async () => {
        if (!caseName.trim()) return;
        setLoading(true);
        try {
            let caseId = editingCase?.id;

            if (editingCase) {
                const { error } = await supabase.from('cases').update({
                    name: caseName,
                    description: caseDesc,
                    access_level: accessLevel
                }).eq('id', caseId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase.from('cases').insert({
                    team_id: profile!.current_team_id!,
                    name: caseName,
                    description: caseDesc,
                    access_level: accessLevel,
                    created_by: user?.id
                }).select().single();
                if (error) throw error;
                caseId = data.id;
            }

            // Save access list
            if (caseId) {
                await supabase.from('case_access').delete().eq('case_id', caseId);
                if (accessList.length > 0) {
                    const inserts = accessList.map(a => ({
                        case_id: caseId,
                        user_id: a.user_id,
                        access_type: a.access_type,
                        created_by: user?.id
                    }));
                    await supabase.from('case_access').insert(inserts);
                }
            }

            setIsCreating(false);
            setEditingCase(null);
            fetchCases();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (c: any) => {
        setEditingCase(c);
        setCaseName(c.name);
        setCaseDesc(c.description || '');
        setAccessLevel(c.access_level || 'public');
        
        // Fetch access list
        const { data } = await supabase.from('case_access').select('*').eq('case_id', c.id);
        if (data) setAccessList(data);
        else setAccessList([]);
        
        setIsCreating(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this?')) return;
        setLoading(true);
        await supabase.from('cases').delete().eq('id', id);
        fetchCases();
    };

    const handleCaseClick = async (c: any) => {
        if (c.isDemo) {
            onLoadDemo(c.id);
            return;
        }
        setSelectedCase(c);
        setLoading(true);
        try {
            const docs = await fetchCaseDocuments(c.id);
            setCaseDocuments(docs);
        } catch (e) {}
        setLoading(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                multiple 
                onChange={handleFileUpload} 
            />
            <div className="flex justify-between items-center">
                <div>
                    <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentTheme.text}`}>
                        {selectedCase && <button onClick={() => setSelectedCase(null)} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><ArrowLeft className="w-5 h-5"/></button>}
                        {selectedCase ? selectedCase.name : `${terminology} Management`}
                    </h2>
                    <p className={`text-sm ${currentTheme.textMuted} mt-1`}>
                        {selectedCase ? (selectedCase.description || 'View and manage documents for this matter.') : `Organize documents and configure access rules by ${terminology.toLowerCase()}.`}
                    </p>
                </div>
                {!isCreating && !selectedCase && (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowTimestamps(!showTimestamps)}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            {showTimestamps ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showTimestamps ? "Hide Timestamps" : "Show Timestamps"}
                        </button>
                        <button
                            onClick={() => {
                                setEditingCase(null);
                                setCaseName('');
                                setCaseDesc('');
                                setAccessLevel('public');
                                setAccessList([]);
                                setIsCreating(true);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button}`}
                        >
                            <Plus className="w-4 h-4" />
                            New {terminology.replace(/s$/, '')}
                        </button>
                    </div>
                )}
            </div>

            {!selectedCase && !isCreating && (
                <div className="space-y-4 mb-10 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Recent Documents</h3>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Upload className="w-4 h-4" />
                            {isUploading ? 'Uploading...' : 'Upload Document'}
                        </button>
                    </div>
                    {loadingDocs ? (
                        <div className={`p-8 text-center text-sm ${currentTheme.textMuted}`}>Loading documents...</div>
                    ) : recentDocuments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentDocuments.map(doc => (
                                <div key={doc.id} className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.card} shadow-sm group hover:border-blue-500/50 transition-colors cursor-pointer`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg bg-blue-100 text-blue-700`}>
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold text-sm ${currentTheme.text} mb-1 group-hover:text-blue-500 transition-colors`}>{doc.name || 'Untitled'}</h3>
                                            <p className={`text-xs ${currentTheme.textMuted}`}>{doc.status}</p>
                                            <p className={`text-xs ${currentTheme.textMuted} mt-1`}>{formatDate(new Date(doc.created_at))}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={`p-8 rounded-xl border border-dashed ${currentTheme.border} text-center`}>
                            <FileText className={`w-8 h-8 mx-auto mb-2 ${currentTheme.textMuted} opacity-50`} />
                            <p className={`text-sm ${currentTheme.textMuted}`}>No recent documents found in this workspace.</p>
                            <p className={`text-xs ${currentTheme.textMuted} mt-1`}>(Note: If you haven't run the SQL setup, this will remain empty).</p>
                        </div>
                    )}
                </div>
            )}

            {!selectedCase && !isCreating && (
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${currentTheme.text}`}>{terminology}</h3>
                </div>
            )}

            {selectedCase ? (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Upload className="w-4 h-4" />
                            {isUploading ? 'Uploading...' : `Upload to ${terminology.replace(/s$/, '')}`}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {caseDocuments.map(doc => (
                            <div key={doc.id} className={`p-5 rounded-xl border ${currentTheme.border} ${currentTheme.card} shadow-sm group hover:border-blue-500/50 transition-colors cursor-pointer`} onClick={() => onOpenDocument && onOpenDocument(doc)}>
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg bg-blue-100 text-blue-700`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-md ${currentTheme.text} mb-1 group-hover:text-blue-500 transition-colors`}>{doc.document_name || 'Untitled Document'}</h3>
                                        <p className={`text-xs ${currentTheme.textMuted}`}>Score: {doc.score || 'N/A'}</p>
                                        <p className={`text-xs ${currentTheme.textMuted} mt-1`}>Added {formatDate(new Date(doc.created_at))}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {caseDocuments.length === 0 && !loading && (
                            <div className={`col-span-full py-12 text-center rounded-xl border border-dashed ${currentTheme.border}`}>
                                <FileText className={`w-12 h-12 mx-auto mb-4 ${currentTheme.textMuted} opacity-50`} />
                                <h3 className={`text-lg font-medium ${currentTheme.text} mb-2`}>No documents yet</h3>
                                <p className={`text-sm ${currentTheme.textMuted}`}>Go to New Scan to analyze and save a document to this {terminology.toLowerCase()}.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : isCreating ? (
                <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border} space-y-6`}>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Name</label>
                        <input
                            type="text"
                            value={caseName}
                            onChange={e => setCaseName(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input}`}
                            placeholder={`e.g., Acme Corp Merger`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Description</label>
                        <textarea
                            value={caseDesc}
                            onChange={e => setCaseDesc(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${currentTheme.input} h-24`}
                            placeholder="Optional context..."
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Access Control</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <button
                                onClick={() => setAccessLevel('public')}
                                className={`p-4 rounded-xl border text-left transition-all ${accessLevel === 'public' ? 'border-blue-500 ring-1 ring-blue-500 ' + currentTheme.primary + ' bg-opacity-10' : currentTheme.border}`}
                            >
                                <Users className="w-6 h-6 text-blue-500 mb-2" />
                                <h4 className={`font-semibold ${currentTheme.text}`}>Team Public</h4>
                                <p className={`text-xs mt-1 ${currentTheme.textMuted}`}>All team members can view.</p>
                            </button>
                            <button
                                onClick={() => setAccessLevel('confidential')}
                                className={`p-4 rounded-xl border text-left transition-all ${accessLevel === 'confidential' ? 'border-orange-500 ring-1 ring-orange-500 bg-orange-500 bg-opacity-10' : currentTheme.border}`}
                            >
                                <Lock className="w-6 h-6 text-orange-500 mb-2" />
                                <h4 className={`font-semibold ${currentTheme.text}`}>Confidential</h4>
                                <p className={`text-xs mt-1 ${currentTheme.textMuted}`}>Only granted users & admins.</p>
                            </button>
                            <button
                                onClick={() => setAccessLevel('private')}
                                className={`p-4 rounded-xl border text-left transition-all ${accessLevel === 'private' ? 'border-red-500 ring-1 ring-red-500 bg-red-500 bg-opacity-10' : currentTheme.border}`}
                            >
                                <EyeOff className="w-6 h-6 text-red-500 mb-2" />
                                <h4 className={`font-semibold ${currentTheme.text}`}>Private</h4>
                                <p className={`text-xs mt-1 ${currentTheme.textMuted}`}>Only you.</p>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h4 className={`text-sm font-medium ${currentTheme.text}`}>Individual Overrides</h4>
                            {members.filter(m => m.user_id !== user?.id).map(m => {
                                const override = accessList.find(a => a.user_id === m.user_id);
                                return (
                                    <div key={m.user_id} className={`flex items-center justify-between p-3 rounded-lg border ${currentTheme.border}`}>
                                        <div className={`text-sm ${currentTheme.text}`}>
                                            {m.profiles?.full_name || m.profiles?.username || m.user_id}
                                        </div>
                                        <select
                                            value={override?.access_type || 'default'}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                let newList = accessList.filter(a => a.user_id !== m.user_id);
                                                if (val !== 'default') {
                                                    newList.push({ user_id: m.user_id, access_type: val });
                                                }
                                                setAccessList(newList);
                                            }}
                                            className={`px-3 py-1 text-sm rounded-md border outline-none ${currentTheme.input}`}
                                        >
                                            <option value="default">Default (Inherit)</option>
                                            <option value="grant">Explicit Grant</option>
                                            <option value="block">Explicit Block</option>
                                        </select>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setIsCreating(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${currentTheme.textMuted} hover:bg-gray-100 dark:hover:bg-gray-800`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || !caseName.trim()}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentTheme.button} disabled:opacity-50`}
                        >
                            <Save className="w-4 h-4" />
                            {editingCase ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Folders / Categories */}
                    {cases.filter(c => c.isDemo).length > 0 && (
                        <div className={`rounded-xl border ${currentTheme.border} ${currentTheme.card} overflow-hidden shadow-sm`}>
                            <button
                                onClick={() => setIsDemosExpanded(!isDemosExpanded)}
                                className={`w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                            >
                                <div className="flex items-center gap-3">
                                    <Folder className={`w-5 h-5 ${currentTheme.primary}`} />
                                    <h3 className={`font-semibold text-lg ${currentTheme.text}`}>
                                        Demo Platforms (TOS)
                                    </h3>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                        5 Items
                                    </span>
                                </div>
                                {isDemosExpanded ? (
                                    <ChevronDown className={`w-5 h-5 ${currentTheme.textMuted}`} />
                                ) : (
                                    <ChevronRight className={`w-5 h-5 ${currentTheme.textMuted}`} />
                                )}
                            </button>
                            
                            {isDemosExpanded && (
                                <div className={`border-t ${currentTheme.border} p-4 bg-black/5 dark:bg-black/20`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {cases.filter(c => c.isDemo).map(c => (
                                            <div key={c.id} className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.card} shadow-sm group hover:border-blue-500/50 transition-colors cursor-pointer`} onClick={() => onLoadDemo(c.id)}>
                                                <h3 className={`font-semibold text-md ${currentTheme.text} mb-1 group-hover:text-blue-500 transition-colors`}>
                                                    {c.name}
                                                </h3>
                                                <p className={`text-xs ${currentTheme.textMuted} line-clamp-2`}>
                                                    {c.description || 'No description'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Standard Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cases.filter(c => !c.isDemo).map(c => (
                        <div key={c.id} className={`p-5 rounded-xl border ${currentTheme.border} ${currentTheme.card} shadow-sm group hover:border-blue-500/50 transition-colors`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-semibold text-lg cursor-pointer hover:text-blue-500 transition-colors ${currentTheme.text}`} onClick={() => handleCaseClick(c)}>
                                    {c.name} {c.isDemo && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">DEMO</span>}
                                </h3>
                                {!c.isDemo && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(c.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className={`text-sm ${currentTheme.textMuted} mb-4 line-clamp-2 cursor-pointer`} onClick={() => handleCaseClick(c)}>
                                {c.description || 'No description'}
                            </p>
                            <div className="flex items-center gap-3 text-xs">
                                <span className={`px-2 py-1 rounded-full ${c.access_level === 'public' ? 'bg-blue-100 text-blue-700' : c.access_level === 'confidential' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                    {c.access_level.charAt(0).toUpperCase() + c.access_level.slice(1)}
                                </span>
                                {showTimestamps && c.created_at && (
                                    <span className={currentTheme.textMuted}>
                                        {new Date(c.created_at).toLocaleDateString()} {new Date(c.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {cases.length === 0 && !loading && (
                        <div className={`col-span-full py-12 text-center rounded-xl border border-dashed ${currentTheme.border}`}>
                            <Briefcase className={`w-12 h-12 mx-auto mb-4 ${currentTheme.textMuted} opacity-50`} />
                            <h3 className={`text-lg font-medium ${currentTheme.text} mb-2`}>No {terminology} yet</h3>
                            <p className={`text-sm ${currentTheme.textMuted}`}>Create your first {terminology.toLowerCase()} to organize documents.</p>
                        </div>
                    )}
                </div>
                </div>
            )}
        </div>
    );
};
