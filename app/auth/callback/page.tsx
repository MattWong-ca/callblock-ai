"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Shield } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        router.push('/auth?error=callback_error');
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 animate-pulse">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">CallShield</span>
        </div>
        <p className="text-white text-lg">Completing sign in...</p>
      </div>
    </div>
  );
}