import { createClient } from '@supabase/supabase-js';

// For client-side auth state management only
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;

// Client-side Supabase client (minimal exposure)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client for API routes
export function createServerClient() {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}