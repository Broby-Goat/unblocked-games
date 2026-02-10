
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
          <i className="fas fa-gamepad text-xl"></i>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          NOVA<span className="text-white">ARCADE</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-slate-400">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">Trending</a>
        <a href="#" className="hover:text-white transition-colors">New</a>
        <a href="#" className="hover:text-white transition-colors">Categories</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-700 rounded-full transition-colors">
          <i className="fas fa-search"></i>
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
