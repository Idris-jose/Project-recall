import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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
          Join the waitlist today and be the first to experience the future of data interaction.
        </p>

        {!submitted ? (
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
      </div>
    </section>
  );
}

export default CTA;
