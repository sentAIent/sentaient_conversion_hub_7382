import { createClient } from '@supabase/supabase-js';

// Note: Ensure these are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'mock-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Entity = {
  id: string;
  user_id: string;
  name: string;
  type: 'PERSONAL' | 'LLC' | 'S_CORP' | 'C_CORP';
  created_at: string;
};

export type DatabaseSchema = {
  public: {
    Tables: {
      entities: {
        Row: Entity;
        Insert: Omit<Entity, 'id' | 'created_at'>;
        Update: Partial<Omit<Entity, 'id' | 'created_at'>>;
      };
      // We will add transactions, trades, and receipts here later
    };
  };
};
