import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, LayoutDashboard, FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="bg-primary-500 rounded-lg p-1.5">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            ResumeAI Pro
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/input" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Optimize
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            My Resumes
          </Link>
          <button className="bg-white text-zinc-950 px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
