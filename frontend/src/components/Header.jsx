import React from 'react';
import { Terminal, Brain, Code2, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-card m-4 px-6 py-4 flex items-center justify-between sticky top-4 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
          <Code2 size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold glow-text">CodeForge</h1>
          <p className="text-xs text-slate-400 font-mono">SENIOR ARCHITECT AI</p>
        </div>
      </div>
      
      <nav className="flex items-center gap-8">
        <NavItem icon={<Brain size={18} />} label="Practice" active />
        <NavItem icon={<Sparkles size={18} />} label="Analyze" />
        <NavItem icon={<Terminal size={18} />} label="Mock Interview" />
      </nav>

      <button className="btn-primary flex items-center gap-2">
        <Sparkles size={18} />
        Initialize Session
      </button>
    </header>
  );
};

const NavItem = ({ icon, label, active }) => (
  <a 
    href="#" 
    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400 ${active ? 'text-indigo-400' : 'text-slate-400'}`}
  >
    {icon}
    {label}
  </a>
);

export default Header;
