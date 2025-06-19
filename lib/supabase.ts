import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client
export function createServerClient() {
  const serverUrl = process.env.SUPABASE_URL!;
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!serverUrl || !serverKey) {
    throw new Error('Missing server-side Supabase environment variables');
  }

  return createClient<Database>(serverUrl, serverKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}