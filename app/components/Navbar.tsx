import { Command, Menu, X } from 'lucide-react';
import { useState } from 'react';

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

export default Navbar;
