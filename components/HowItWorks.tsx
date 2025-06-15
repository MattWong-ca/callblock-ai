"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Download, Brain, Shield, CheckCircle, ArrowDown } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: Download,
      title: "Download & Install",
      subtitle: "Your personal spam fortress is just 60 seconds away",
      description: "Quick setup with no complicated configuration. Our app integrates seamlessly with your phone's native calling system.",
      features: ["One-tap installation", "Automatic permissions setup", "Works with all phone apps"]
    },
    {
      icon: Brain,
      title: "Smart Detection",
      subtitle: "Our AI analyzes call patterns and maintains a database of 10M+ known scam numbers",
      description: "Advanced machine learning algorithms identify spam patterns in real-time, updating our database every minute.",
      features: ["AI-powered analysis", "Global spam database", "Real-time pattern recognition"]
    },
    {
      icon: Shield,
      title: "Real-Time Protection",
      subtitle: "Suspicious calls are automatically blocked before your phone rings",
      description: "CallShield works silently in the background, intercepting spam calls before they can disturb you.",
      features: ["Silent blocking", "Zero interruptions", "Battery-efficient operation"]
    },
    {
      icon: CheckCircle,
      title: "Safe List Management",
      subtitle: "Important calls from doctors, schools, or delivery services always get through",
      description: "Smart allowlist ensures legitimate calls are never blocked, with automatic recognition of important numbers.",
      features: ["Automatic VIP detection", "Custom safe lists", "Emergency call priority"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How CallShield
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Protects You
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the interactive journey of spam call protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Timeline */}
          <div className="relative">
            <div className="flex flex-col space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all duration-700 cursor-pointer ${
                    activeStep === index
                      ? 'border-blue-500 bg-blue-500/10 scale-105'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeStep === index ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg transition-colors ${
                      activeStep === index ? 'text-blue-400' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">Step {index + 1}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowDown className="absolute -bottom-4 left-6 w-4 h-4 text-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-blue-400 font-medium">
                    {steps[activeStep].subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {steps[activeStep].description}
              </p>
              
              <ul className="space-y-3">
                {steps[activeStep].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}