export interface User {
  id: string;
  wallet_address: string;
  phone_number?: string;
  vapi_phone_id?: string;
  vapi_assistant_id?: string;
  phone_region?: string;
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: string;
  user_id: string;
  call_summary?: string;
  call_reason?: string;
  is_spam?: boolean;
  spam_percent?: number;
  created_at: string;
}

// Database table names
export const TABLES = {
  USERS: 'users',
  CALLS: 'calls'
} as const; 