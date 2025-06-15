"use client";

import { useState } from 'react';
import { ArrowRight, Shield, Download, Smartphone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 animate-pulse">
          <Shield className="w-20 h-20 text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce">
          <Smartphone className="w-16 h-16 text-purple-400" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin">
          <div className="w-32 h-32 border-4 border-blue-400/20 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency Banner */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-red-400" />
            <span className="text-red-400 font-bold text-lg">URGENT ALERT</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Scammers Make 4.7 Billion Robocalls Monthly
          </h3>
          <p className="text-red-200 text-lg">
            Don't be their next target. Protect yourself now.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Waiting.
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Start Protecting.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Every second you wait, scammers are dialing more numbers. 
            <strong className="text-white"> Take action now.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Download className="mr-3 w-6 h-6" />
              Download CallShield Free
              <ArrowRight className={`ml-3 w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Shield, text: "Instant Protection" },
              { icon: Download, text: "Easy Setup" },
              { icon: Smartphone, text: "Works with All Apps" },
              { icon: Clock, text: "24/7 Monitoring" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-white font-semibold">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 border border-green-500/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-green-100 text-lg">
              Try CallShield risk-free for 30 days. Not happy? Full refund, no questions asked.
              <br />
              <strong className="text-white">You have nothing to lose except spam calls.</strong>
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl border border-red-500/30">
            <p className="text-2xl font-bold text-white mb-4">
              Your Phone Rings 15 Times a Day on Average
            </p>
            <p className="text-red-200 text-lg mb-6">
              How many of those calls do you actually want to receive?
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold"
            >
              Take Control Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}