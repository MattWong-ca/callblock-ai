"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  scrollY: number;
}

export default function Navbar({ scrollY }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const handleSignUp = () => {
    router.push('/auth');
  };

  const handleSignIn = () => {
    router.push('/auth');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-blue-600' : 'bg-white/20'
            }`}>
              <Shield className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              CallShield
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleDashboard}
                  className={`transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className={`transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleSignIn}
                  className={`transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Log In
                </Button>
                <Button 
                  onClick={handleSignUp}
                  className={`transition-all ${
                    isScrolled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-white text-blue-600 hover:bg-white/90'
                  }`}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t transition-colors ${
            isScrolled ? 'border-gray-200 bg-white/95' : 'border-white/20 bg-black/20'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={handleDashboard}
                    className={`w-full justify-start transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className={`w-full justify-start transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className={`w-full justify-start transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={handleSignUp}
                    className={`w-full transition-all ${
                      isScrolled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-white text-blue-600 hover:bg-white/90'
                    }`}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}