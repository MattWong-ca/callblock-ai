"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      });
      
      const data = await response.json();
      setTestResult({ success: true, data, status: response.status });
    } catch (error) {
      setTestResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testGoogleAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          redirectTo: `${window.location.origin}/auth/callback` 
        }),
      });
      
      const data = await response.json();
      setTestResult({ success: true, data, status: response.status });
    } catch (error) {
      setTestResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">API Test Page</h1>
          
          <div className="space-y-4">
            <Button
              onClick={testAPI}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'Testing...' : 'Test Basic API'}
            </Button>
            
            <Button
              onClick={testGoogleAuth}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Testing...' : 'Test Google Auth API'}
            </Button>
          </div>

          {testResult && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Test Result:</h3>
              <pre className="text-white text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              Check your Netlify environment variables:
            </p>
            <ul className="text-white/60 text-xs mt-2 space-y-1">
              <li>• NEXT_PUBLIC_SUPABASE_URL</li>
              <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              <li>• SITE_URL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 