import React from 'react';
import { ArrowRight, Bookmark, BookmarkCheck, Share2 } from 'lucide-react';
import { LessonProps, SectionProps, TopicCardProps } from '../types';

export const LessonCard: React.FC<LessonProps> = ({ 
  id, 
  number, 
  title, 
  icon, 
  children,
  isSaved,
  onToggleSave,
  onShare
}) => {
  return (
    <section id={id} className="scroll-mt-24 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-4 md:gap-6">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm flex-shrink-0">
              {icon}
            </div>
            <div>
              <div className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-1">
                {number === 0 ? 'Introduction' : `Lesson ${number}`}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-center">
            {onShare && (
              <button 
                onClick={onShare}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-blue-100 hover:text-white"
                title="Share this section"
              >
                <Share2 size={20} />
              </button>
            )}
            {onToggleSave && (
              <button 
                onClick={onToggleSave}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isSaved 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white'
                }`}
                title={isSaved ? "Saved to bookmarks" : "Save bookmark"}
              >
                {isSaved ? <BookmarkCheck size={20} className="fill-current" /> : <Bookmark size={20} />}
                <span className="text-sm font-medium hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export const LessonSection: React.FC<SectionProps> = ({ title, icon, colorClass, children }) => {
  return (
    <div className={`rounded-xl border-l-4 ${colorClass} bg-slate-50/50 p-5 md:p-6 transition-all hover:bg-slate-50`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`${colorClass.replace('border-', 'text-')} opacity-90`}>
            {icon}
        </span>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-strong:text-slate-900 prose-li:marker:text-slate-400">
        {children}
      </div>
    </div>
  );
};

export const TopicCard: React.FC<TopicCardProps> = ({ 
  number, 
  title, 
  description, 
  icon, 
  onClick, 
  colorClass = "bg-white",
  isSaved,
  onToggleSave
}) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-blue-200 ${colorClass} flex flex-col h-full bg-white cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {typeof number === 'number' && number > 0 ? `Lesson ${number}` : 'Intro'}
          </span>
          {onToggleSave && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(e);
              }}
              className={`p-1.5 rounded-lg transition-all z-10 ${
                isSaved 
                  ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                  : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
              }`}
              title={isSaved ? "Remove bookmark" : "Bookmark this section"}
            >
              {isSaved ? <BookmarkCheck size={18} className="fill-current" /> : <Bookmark size={18} />}
            </button>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform mt-auto">
        Read section <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};