
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';
import { GameCategory } from './types';

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(GameCategory.ALL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('./games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        
        <section className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Infinite Fun, <span className="text-indigo-500">Unblocked.</span>
          </h2>
          <div className="max-w-2xl mx-auto relative group">
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400"></i>
            <input 
              type="text" 
              placeholder="Search for games, tags, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-500"
            />
          </div>
        </section>

        <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-3">
            {Object.values(GameCategory).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-400 font-medium animate-pulse">Initializing arcade session...</p>
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-700">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onSelect={(g) => setSelectedGame(g)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl">
            <i className="fas fa-search text-5xl text-slate-600 mb-6 block"></i>
            <h3 className="text-2xl font-bold mb-2">No Games Found</h3>
            <p className="text-slate-400">We couldn't find any games matching your current filter.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory(GameCategory.ALL);}}
              className="mt-6 text-indigo-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <i className="fas fa-gamepad"></i>
              </div>
              <h1 className="text-xl font-black tracking-tighter">NOVAARCADE</h1>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              NovaArcade is the ultimate destination for unblocked web games. High performance, 
              no ads, and always free. Gaming evolved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-indigo-400">Platform</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Browse Games</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Top Rated</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Ready</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Submit Game</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-indigo-400">Support</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          &copy; 2024 NovaArcade. All rights reserved. Built for gamers.
        </div>
      </footer>

      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
};

export default App;
