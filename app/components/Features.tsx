import { Lock, ArrowRight } from 'lucide-react';

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
            </div>
          </div>

          {/* Feature 2 & 3 */}
          {[
            { title: "Native Multimodality", desc: "It sees what you see. Recall reads text on screen, identifies slides, and recognizes visual cues." },
            { title: "Semantic Deep-Search", desc: "Stop scrubbing through timelines. Search for abstract concepts like 'the part where we discussed the budget' and jump straight to the exact second." }
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

export default Features;
