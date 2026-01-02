'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import CTA from './components/CTA';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect. Please check your internet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-[#39FF14] selection:text-black">

      {/* --- AMBIENT BACKGROUNDS --- */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="fixed top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#39FF14] rounded-full blur-[140px] opacity-[0.04] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[120px] opacity-[0.06] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <Hero
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          submitted={submitted}
          isLoading={isLoading}
          error={error}
        />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <CTA
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          submitted={submitted}
          isLoading={isLoading}
        />

      </div>
    </div>
  );
}

