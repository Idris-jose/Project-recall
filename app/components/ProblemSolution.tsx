import { Search } from 'lucide-react';

function ProblemSolution() {
  return (
    <section 
    id='problems-solved'
    className="py-32 px-6 relative">
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

export default ProblemSolution;
