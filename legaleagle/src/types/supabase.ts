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
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
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
