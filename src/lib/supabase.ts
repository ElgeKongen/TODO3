import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient<Database> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    'Missing Supabase URL or Anon Key. Supabase client will not be initialized. The application will run without Supabase-backed features.'
  );
}


export const supabase = supabaseInstance;