"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Phone, PhoneOff, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 animate-pulse mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CallShield</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.email}</span>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your CallShield Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Monitor your spam call protection and manage your settings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <PhoneOff className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
            <div className="text-gray-600">Spam Calls Blocked</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">89</div>
            <div className="text-gray-600">Legitimate Calls</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">99.8%</div>
            <div className="text-gray-600">Detection Rate</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Global</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">500K+</div>
            <div className="text-gray-600">Protected Users</div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">🎉 Welcome to CallShield!</h2>
          <p className="text-blue-100 text-lg mb-6">
            Your account is now protected. CallShield is actively monitoring incoming calls and blocking spam automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Download Mobile App
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              View Protection Settings
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'blocked', number: '+1 (555) 123-4567', time: '2 minutes ago', reason: 'Known scam number' },
              { type: 'allowed', number: '+1 (555) 987-6543', time: '1 hour ago', reason: 'Verified business' },
              { type: 'blocked', number: '+1 (555) 555-5555', time: '3 hours ago', reason: 'Robocall pattern detected' },
              { type: 'blocked', number: '+1 (555) 111-2222', time: '5 hours ago', reason: 'Spam database match' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'blocked' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'blocked' ? (
                      <PhoneOff className="w-5 h-5 text-red-600" />
                    ) : (
                      <Phone className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{activity.number}</div>
                    <div className="text-sm text-gray-600">{activity.reason}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}