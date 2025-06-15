"use client";

import { useState, useEffect, useRef } from 'react';
import { Briefcase, Heart, Building, Coffee, CheckCircle } from 'lucide-react';

export default function PerfectFor() {
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

  const audiences = [
    {
      icon: Briefcase,
      title: "Busy Professionals",
      description: "Who can't afford constant interruptions during important calls and meetings",
      benefits: ["Maintain focus during work", "Professional image protection", "Increased productivity"]
    },
    {
      icon: Heart,
      title: "Protective Parents",
      description: "Safeguarding their family from sophisticated phone scams and unwanted calls",
      benefits: ["Protect elderly family", "Safe communication", "Peace of mind"]
    },
    {
      icon: Building,
      title: "Small Business Owners",
      description: "Keeping their business line clear for real customers and important opportunities",
      benefits: ["Customer calls get through", "Professional appearance", "No missed opportunities"]
    },
    {
      icon: Coffee,
      title: "Anyone Seeking Peace",
      description: "Tired of declining endless 'extended car warranty' and robocalls",
      benefits: ["Quiet dinner time", "Stress-free phone use", "Control over communication"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Perfect For
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              People Like You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CallShield adapts to your lifestyle, protecting what matters most to you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {audience.description}
                  </p>
                  <ul className="space-y-3">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Join the CallShield Community
            </h3>
            <p className="text-lg text-white/90">
              Over 500,000 people have already taken back control of their phones. You're next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}