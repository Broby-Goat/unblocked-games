
import React, { useState } from 'react';
import { Game } from '../types';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300">
      <div className={`relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ${isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[85vh]'}`}>
        
        {/* Modal Header Controls */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 glass">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
               <i className="fas fa-gamepad text-xs"></i>
             </div>
             <div>
               <h2 className="font-bold text-lg leading-tight">{game.title}</h2>
               <p className="text-xs text-slate-400 uppercase tracking-widest">{game.category}</p>
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
              title="Fullscreen"
            >
              <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-slate-300"
              title="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Game Iframe Area */}
        <div className="flex-1 bg-black relative">
          <iframe 
            src={game.iframeUrl} 
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; keyboard; gamepad"
            title={game.title}
          />
        </div>

        {/* Info Footer (Only if not fullscreen) */}
        {!isFullscreen && (
          <div className="p-4 bg-slate-800/50 border-t border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-300 italic">
              Pro Tip: Hit the expand icon for the best gaming experience!
            </p>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                 <i className="far fa-heart"></i> Add to Favorites
               </button>
               <button className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                 <i className="fas fa-share-alt"></i> Share
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModal;
