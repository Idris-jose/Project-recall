import { motion } from 'framer-motion';
import { Sparkles, Search, Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

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
          Stop scrubbing timelines. Recall uses <span className="text-white font-medium">Gemini</span> to let you Ctrl+F inside your raw video footage instantly.
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
                    placeholder="enter your email"
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
          
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-[#39FF14] bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-xl p-4 backdrop-blur-md"
            >
              <CheckCircle2 size={24} />
              <div className="text-left">
                <p className="font-bold">You've been added to the list!</p>
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

           <video
              src="/demo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-3xl border border-white/10 shadow-[0_0_50px_-10px_rgba(57,255,20,0.2)]"
            />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
