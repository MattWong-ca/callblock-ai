"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import PerfectFor from '@/components/PerfectFor';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Hero scrollY={scrollY} />
      <ProblemSection />
      <PerfectFor />
      <HowItWorks />
      <SocialProof />
      <CallToAction />
      <Footer />
    </main>
  );
}