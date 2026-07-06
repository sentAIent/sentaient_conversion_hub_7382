export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    website: string | null
                    is_premium: boolean | null
                    subscription_tier: string | null
                    drafts_limit: number | null
                    drafts_used: number | null
                    reviews_limit: number | null
                    reviews_used: number | null
                    n8n_webhook_url: string | null
                    current_team_id: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    is_premium?: boolean | null
                    subscription_tier?: string | null
                    drafts_limit?: number | null
                    drafts_used?: number | null
                    reviews_limit?: number | null
                    reviews_used?: number | null
                    n8n_webhook_url?: string | null
                    current_team_id?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    is_premium?: boolean | null
                    subscription_tier?: string | null
                    drafts_limit?: number | null
                    drafts_used?: number | null
                    reviews_limit?: number | null
                    reviews_used?: number | null
                    n8n_webhook_url?: string | null
                    current_team_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "profiles_current_team_id_fkey"
                        columns: ["current_team_id"]
                        referencedRelation: "teams"
                        referencedColumns: ["id"]
                    }
                ]
            }
            teams: {
                Row: {
                    id: string
                    name: string
                    created_at: string
                    owner_id: string
                    data_retention_days: number
                }
                Insert: {
                    id?: string
                    name: string
                    created_at?: string
                    owner_id: string
                    data_retention_days?: number
                }
                Update: {
                    id?: string
                    name?: string
                    created_at?: string
                    owner_id?: string
                    data_retention_days?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "teams_owner_id_fkey"
                        columns: ["owner_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            team_members: {
                Row: {
                    id: string
                    team_id: string
                    user_id: string
                    role: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    team_id: string
                    user_id: string
                    role: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string
                    user_id?: string
                    role?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "team_members_team_id_fkey"
                        columns: ["team_id"]
                        referencedRelation: "teams"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "team_members_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            playbooks: {
                Row: {
                    id: string
                    team_id: string
                    rules_text: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    team_id: string
                    rules_text?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string
                    rules_text?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "playbooks_team_id_fkey"
                        columns: ["team_id"]
                        referencedRelation: "teams"
                        referencedColumns: ["id"]
                    }
                ]
            }
            analyses: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    document_name: string
                    content: string
                    score: number
                    recommendations: Json
                    swot: Json
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    document_name: string
                    content: string
                    score: number
                    recommendations: Json
                    swot: Json
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    document_name?: string
                    content?: string
                    score?: number
                    recommendations?: Json
                    swot?: Json
                }
                Relationships: [
                    {
                        foreignKeyName: "analyses_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            audit_logs: {
                Row: {
                    id: string
                    team_id: string
                    user_id: string | null
                    action: string
                    target_type: string | null
                    target_id: string | null
                    details: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    team_id: string
                    user_id?: string | null
                    action: string
                    target_type?: string | null
                    target_id?: string | null
                    details?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string
                    user_id?: string | null
                    action?: string
                    target_type?: string | null
                    target_id?: string | null
                    details?: Json | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "audit_logs_team_id_fkey"
                        columns: ["team_id"]
                        referencedRelation: "teams"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "audit_logs_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
