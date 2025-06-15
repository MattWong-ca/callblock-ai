"use client";

import { useState, useEffect, useRef } from 'react';
import { Phone, Clock, Users, Utensils, AlertTriangle } from 'lucide-react';

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: Clock,
      title: "Endless robocalls during work meetings",
      description: "Productivity killer that disrupts your professional flow",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Users,
      title: "Scammers targeting elderly parents",
      description: "Vulnerable family members fall victim to sophisticated schemes",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Utensils,
      title: "Dinner interruptions from 'warranty' calls",
      description: "Family time destroyed by persistent spam callers",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: AlertTriangle,
      title: "Phone anxiety from unknown numbers",
      description: "Fear of answering your own phone in your own home",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Every Day, Millions Face This
            <span className="block text-red-600">Nightmare</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Spam calls aren't just annoying—they're destroying our peace of mind and stealing our time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${problem.color} rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-200 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 max-w-4xl mx-auto border-l-4 border-red-500">
            <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-2xl font-bold text-red-800 mb-2">
              4.7 Billion Robocalls Made Monthly
            </p>
            <p className="text-red-700 text-lg">
              That's 150 calls per second, every second, every day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}