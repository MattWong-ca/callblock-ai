"use client";

import { useState, useEffect } from 'react';
import { Shield, ArrowRight, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce">
          <PhoneOff className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Shield className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-1000">
          <Phone className="w-6 h-6 text-white/25" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Shield className="w-8 h-8 text-white" />
              <span className="text-white font-bold text-xl">CallShield</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Take back control
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              of your phone
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-blue-100 mb-4 leading-relaxed">
              <strong className="text-white">97% of Americans</strong> receive spam calls monthly. 
              Your number is likely already in a scammer&apos;s database.
            </p>
            <p className="text-lg md:text-xl text-blue-200">
              But today, that changes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Start Blocking Spam Calls Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
            >
              Watch How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">10M+</div>
              <div className="text-blue-200">Known Scam Numbers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <div className="text-blue-200">Protected Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">Block Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}