
import React from 'react';

const GameCard = ({ game, onSelect }) => {
  return (
    <div 
      className="game-card relative group bg-slate-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
      onClick={() => onSelect(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        
        {/* Play Button Overlay */}
        <div className="play-btn absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl">
            <i className="fas fa-play text-white text-2xl ml-1"></i>
          </div>
        </div>

        <span className="absolute top-3 left-3 bg-indigo-600/90 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
          {game.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-1">
          {game.description}
        </p>
        <div className="mt-3 flex gap-2 overflow-hidden">
          {game.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
