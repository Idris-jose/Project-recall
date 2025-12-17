'use client';

import { motion } from 'framer-motion';
import {
  Search, Play, Zap, Database, Command,
  Sparkles, Lock, FileVideo, ArrowRight,
  CheckCircle2, AlertCircle, Menu, X
} from 'lucide-react';
import { useState } from 'react';

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

// --- COMPONENTS ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050505]/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#39FF14] to-emerald-600 flex items-center justify-center text-black font-bold shadow-[0_0_15px_-3px_rgba(57,255,20,0.3)] group-hover:shadow-[0_0_20px_-3px_rgba(57,255,20,0.5)] transition-all duration-500">
            <Command size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">Recall</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">How it works</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Login</button>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm font-medium transition-all">
            Get Access
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-neutral-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function Hero({ email, setEmail, handleSubmit, submitted, isLoading, error }: any) {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return (
    <section className="pt-32 pb-20 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#39FF14]/5 border border-[#39FF14]/20 text-[#39FF14] text-xs font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles size={12} />
          <span>v1.0 Public Beta coming soon</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
        >
          Your video library, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
            now searchable.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Stop scrubbing timelines. Recall uses <span className="text-white font-medium">Gemini Pro 1.5</span> to let you Ctrl+F inside your raw video footage instantly.
        </motion.p>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto mb-20"
        >
          {!submitted ? (
            <div className="space-y-3">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#39FF14]/50 to-emerald-600/50 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex p-1 bg-[#0A0A0A] rounded-xl border border-white/10">
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#39FF14] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#32e012] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_-5px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_-5px_rgba(57,255,20,0.5)]"
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </div>
              </form>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <p className="text-xs text-neutral-500">Join 4,200+ creators. No spam.</p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-[#39FF14] bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 backdrop-blur-md"
            >
              <CheckCircle2 size={24} />
              <div className="text-left">
                <p className="font-bold">You&apos;re on the list!</p>
                <p className="text-sm text-[#39FF14]/80">We&apos;ll notify you when beta opens.</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* --- GLASSMOPHISM DASHBOARD MOCKUP --- */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow behind dashboard */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/10 to-transparent blur-3xl -z-10" />

          <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Window Controls */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/20 border border-[#FF5F56]/50" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/20 border border-[#FFBD2E]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/20 border border-[#27C93F]/50" />
              </div>
              <div className="text-[10px] font-mono text-neutral-600 flex gap-2">
                <span>Recall_Dashboard</span>
                <span className="text-neutral-700">|</span>
                <span>v1.0.2</span>
              </div>
              <div className="w-10"></div>
            </div>

            {/* App Layout */}
            <div className="flex h-[550px] md:h-[600px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-white/5 bg-black/40 p-5 hidden md:flex flex-col gap-6">
                <div>
                  <div className="text-[10px] font-bold text-neutral-600 mb-3 uppercase tracking-widest">Library</div>
                  <div className="space-y-1">
                    {['Recent Uploads', 'Favorites', 'Archived', 'Trash'].map((item, i) => (
                      <div key={item} className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${i === 0 ? 'bg-white/10 text-white font-medium' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-600 mb-3 uppercase tracking-widest">Smart Tags</div>
                  <div className="space-y-1">
                    {['#finance', '#product-demo', '#interview'].map((tag) => (
                      <div key={tag} className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-white cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 md:p-8 relative bg-gradient-to-b from-white/[0.02] to-transparent">
                {/* Search Input */}
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/20 to-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  <div className="relative flex items-center bg-[#0F0F0F] border border-white/10 rounded-lg shadow-lg">
                    <Search className="ml-4 text-neutral-500" size={18} />
                    <input
                      type="text"
                      value="Find clips about 'pricing strategy'"
                      readOnly
                      className="w-full bg-transparent border-none py-3 px-3 text-neutral-300 focus:outline-none font-mono text-sm"
                    />
                    <div className="mr-3 flex gap-1">
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-500 border border-white/5 font-mono">⌘K</span>
                    </div>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Highlighted Card */}
                  <div className="col-span-1 md:col-span-2 bg-[#39FF14]/[0.03] border border-[#39FF14]/30 rounded-xl p-4 flex gap-4 hover:bg-[#39FF14]/[0.05] transition-colors cursor-pointer group">
                    <div className="w-48 aspect-video bg-black rounded-lg border border-white/10 relative flex items-center justify-center overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 z-10">
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-[#39FF14] border border-[#39FF14]/20">04:20</div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-semibold text-white truncate">Q4 All Hands Meeting.mp4</h4>
                        <span className="text-[10px] font-bold text-[#39FF14] bg-[#39FF14]/10 px-2 py-0.5 rounded-full border border-[#39FF14]/20 whitespace-nowrap">98% Match</span>
                      </div>
                      <p className="text-xs text-neutral-500 mb-3">Recorded Dec 12, 2024 • 45 mins</p>
                      <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-sm text-neutral-300 font-light leading-relaxed">
                        &quot;...specifically regarding the <span className="text-[#39FF14] bg-[#39FF14]/10 px-1 py-0.5 rounded font-medium">pricing strategy</span>, we decided to shift focus to enterprise tiers...&quot;
                      </div>
                    </div>
                  </div>

                  {/* Secondary Cards (Faded) */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="w-full aspect-video bg-white/5 rounded-lg mb-3" />
                    <div className="h-3 w-3/4 bg-white/10 rounded mb-2" />
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="w-full aspect-video bg-white/5 rounded-lg mb-3" />
                    <div className="h-3 w-3/4 bg-white/10 rounded mb-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function ProblemSolution() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Video is the <span className="text-[#39FF14]">Dark Matter</span> <br /> of your data.
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            You record thousands of hours of meetings, podcasts, and tutorials.
            But once it&apos;s recorded, that knowledge is locked in a black box.
            Finding a 10-second clip takes 20 minutes of scrubbing.
          </p>

          <div className="space-y-6">
            {[
              "Wasted hours manually scrubbing timelines",
              "Institutional knowledge lost in Zoom archives",
              "Impossible to search by 'context', only filenames"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
                  <span className="text-sm font-bold">✕</span>
                </div>
                <span className="text-neutral-300 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/10 to-transparent blur-[80px] rounded-full" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Abstract Representation of Search */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-12 z-20">
              <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-[#39FF14]/50 shadow-[0_0_50px_-10px_rgba(57,255,20,0.2)] rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#39FF14]">
                  <Search size={24} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">Instant Recall</h3>
                <p className="text-sm text-neutral-400">Search by meaning, not just keywords.</p>
              </div>
            </div>

            {/* Background Elements (Faded) */}
            <div className="space-y-4 opacity-30 blur-sm pointer-events-none grayscale">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Upload", desc: "Drag & drop any video or audio file. We support MP4, MOV, MP3.", icon: FileVideo },
    { title: "Analyze", desc: "Gemini Pro 1.5 watches your video in seconds, indexing every word and frame.", icon: Zap },
    { title: "Chat", desc: "Ask questions like 'What was the budget?' and get instant timestamps.", icon: Database },
  ];

  return (
    <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How Recall works</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">Turn your passive video library into an active database in three simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 bg-[#39FF14]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:border-[#39FF14]/30 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-[#39FF14] group-hover:border-[#39FF14]/30 transition-all shadow-lg">
                  <step.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
              {/* Connector (Desktop) */}
              {i !== 2 && (
                <div className="hidden md:block absolute top-12 -right-5 w-10 h-[2px] bg-gradient-to-r from-white/10 to-transparent z-20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Feature 1: Large */}
          <div className="md:col-span-2 bg-gradient-to-b from-white/5 to-black border border-white/10 rounded-3xl p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#39FF14]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-8 text-[#39FF14]">
                <Lock size={12} />
                <span>Enterprise Grade Security</span>
              </div>
              <h3 className="text-4xl font-bold mb-6">Context Caching for <span className="text-[#39FF14]">10x Speed</span></h3>
              <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                We don&apos;t just re-read the file every time. We cache the semantic context, making follow-up questions instant and costing you 90% less tokens.
              </p>
              <button className="text-white font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                Read the technical docs <ArrowRight size={18} className="text-[#39FF14]" />
              </button>
            </div>
          </div>

          {/* Feature 2 & 3 */}
          {[
            { title: "Native Multimodality", desc: "It sees what you see. Recall reads text on screen, identifies slides, and recognizes visual cues." },
            { title: "API First Architecture", desc: "Building a platform? Use our REST API to add video search to your own app in minutes." }
          ].map((f, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.03] transition-colors group">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-[#39FF14] transition-colors">{f.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CTA({ email, setEmail, handleSubmit, isLoading, submitted }: any) {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14] rounded-full blur-[200px] opacity-[0.08] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 md:p-24 overflow-hidden">
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent opacity-50" />

        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
          Ready to unlock your data?
        </h2>
        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
          Join the waitlist today and get 3 months of the Pro plan for free when we launch.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-neutral-500 focus:border-[#39FF14] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#39FF14] text-black font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_-5px_rgba(57,255,20,0.5)] transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? 'Wait...' : 'Get Early Access'}
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 text-[#39FF14] font-medium text-xl bg-[#39FF14]/10 px-6 py-3 rounded-full border border-[#39FF14]/20">
            <CheckCircle2 size={24} />
            Thanks! Check your inbox soon.
          </div>
        )}
      </div>
    </section>
  );
}

