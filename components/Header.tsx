import React from 'react';
import { BookOpen, Eye, Type, ScrollText, ListStart, Home, PenLine, Compass, Calendar } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  isDyslexiaFriendly: boolean;
  toggleMode: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onToggleNotes: () => void;
  isNotesOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDyslexiaFriendly, 
  toggleMode,
  viewMode,
  setViewMode,
  onToggleNotes,
  isNotesOpen
}) => {
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${
      isDyslexiaFriendly ? 'bg-[#FEFBF5] border-slate-300' : 'bg-white/90 backdrop-blur-md border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => setViewMode('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className={`p-2 rounded-lg transition-colors ${
            isDyslexiaFriendly 
              ? 'bg-slate-800 text-yellow-100 group-hover:bg-slate-700' 
              : 'bg-blue-600 text-white group-hover:bg-blue-700'
          }`}>
            <BookOpen size={24} />
          </div>
          <span className="font-bold text-lg hidden sm:block group-hover:text-blue-700 transition-colors">Dyslexia Guide</span>
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Navigation Controls */}
          <div className="hidden md:flex bg-slate-100 p-1 rounded-full border border-slate-200 mr-2">
            <button
              onClick={() => setViewMode('home')}
              className={`p-2 rounded-full transition-all ${viewMode === 'home' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              title="Home"
            >
              <Home size={18} />
            </button>
            <div className="w-px bg-slate-300 mx-1 my-1"></div>
            <button
              onClick={() => setViewMode('plan')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'plan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Learning Plan"
            >
              <Calendar size={18} />
              <span className="hidden lg:inline">Plan</span>
            </button>
            <button
              onClick={() => setViewMode('step')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'step' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Step-by-Step View"
            >
              <ListStart size={18} />
              <span className="hidden lg:inline">Steps</span>
            </button>
            <button
              onClick={() => setViewMode('scroll')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'scroll' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Scroll View"
            >
              <ScrollText size={18} />
              <span className="hidden lg:inline">Scroll</span>
            </button>
            <div className="w-px bg-slate-300 mx-1 my-1"></div>
            <button
              onClick={() => setViewMode('browser')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'browser' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Browse Activities & Resources"
            >
              <Compass size={18} />
              <span className="hidden lg:inline">Browse</span>
            </button>
          </div>

          {/* Dyslexia Mode Toggle */}
          <button
            onClick={toggleMode}
            className={`flex items-center gap-2 p-2 md:px-3 md:py-2 rounded-full text-sm font-medium transition-all ${
              isDyslexiaFriendly 
                ? 'bg-slate-800 text-white shadow-md ring-2 ring-slate-400' 
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
            aria-pressed={isDyslexiaFriendly}
            title="Toggle Dyslexia Friendly Mode"
          >
            {isDyslexiaFriendly ? (
              <Type size={18} />
            ) : (
              <Eye size={18} />
            )}
            <span className="hidden lg:inline">{isDyslexiaFriendly ? 'Enhanced' : 'Dyslexia Mode'}</span>
          </button>

          {/* Notes Toggle */}
          <button
            onClick={onToggleNotes}
            className={`flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-full text-sm font-bold transition-all ${
              isNotesOpen
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
            title="Open Notes"
          >
            <PenLine size={18} />
            <span className="hidden md:inline">Notes</span>
          </button>
        </div>
      </div>
    </header>
  );
};