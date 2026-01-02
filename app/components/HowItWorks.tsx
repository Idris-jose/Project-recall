import { FileVideo, Zap, Database } from 'lucide-react';

function HowItWorks() {
  const steps = [
    { title: "Upload", desc: "Drag & drop any video or audio file. We support MP4, MOV, MP3.", icon: FileVideo },
    { title: "Analyze", desc: "Gemini watches your video in seconds, indexing every word and frame.", icon: Zap },
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

export default HowItWorks;
