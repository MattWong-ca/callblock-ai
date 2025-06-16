export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone_number: string | null;
          protection_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone_number?: string | null;
          protection_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone_number?: string | null;
          protection_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blocked_calls: {
        Row: {
          id: string;
          user_id: string;
          phone_number: string;
          blocked_at: string;
          reason: string;
          call_type: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          phone_number: string;
          blocked_at?: string;
          reason: string;
          call_type?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          phone_number?: string;
          blocked_at?: string;
          reason?: string;
          call_type?: string;
        };
      };
      allowed_calls: {
        Row: {
          id: string;
          user_id: string;
          phone_number: string;
          allowed_at: string;
          reason: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          phone_number: string;
          allowed_at?: string;
          reason?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          phone_number?: string;
          allowed_at?: string;
          reason?: string;
        };
      };
      spam_database: {
        Row: {
          id: string;
          phone_number: string;
          spam_type: string;
          confidence_score: number;
          reported_count: number;
          last_reported: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          phone_number: string;
          spam_type?: string;
          confidence_score?: number;
          reported_count?: number;
          last_reported?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          phone_number?: string;
          spam_type?: string;
          confidence_score?: number;
          reported_count?: number;
          last_reported?: string;
          created_at?: string;
        };
      };
    };
  };
}