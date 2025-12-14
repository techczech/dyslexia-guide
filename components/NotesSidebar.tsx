import React from 'react';
import { X, Trash2, Download, Copy, Quote, PenLine } from 'lucide-react';
import { Highlight } from '../types';

interface NotesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: Highlight[];
  onDeleteHighlight: (id: string) => void;
  userNotes: string;
  setUserNotes: (notes: string) => void;
  onExportMarkdown: () => void;
  onExportPDF: () => void;
}

export const NotesSidebar: React.FC<NotesSidebarProps> = ({
  isOpen,
  onClose,
  highlights,
  onDeleteHighlight,
  userNotes,
  setUserNotes,
  onExportMarkdown,
  onExportPDF
}) => {
  const appendHighlightToNotes = (text: string) => {
    const newNotes = userNotes ? `${userNotes}\n\n> "${text}"` : `> "${text}"`;
    setUserNotes(newNotes);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800">
            <PenLine className="text-blue-600" size={20} />
            <h2 className="font-bold text-lg">My Notes & Highlights</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Highlights Section */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Quote size={12} />
              Saved Highlights ({highlights.length})
            </h3>
            
            {highlights.length === 0 ? (
              <div className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                Highlight text on any page and click "Save to Notes" to collect key takeaways.
              </div>
            ) : (
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item.id} className="group bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors relative">
                    <p className="text-sm text-slate-700 italic pr-6 leading-relaxed">"{item.text}"</p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/50">
                      <span className="text-[10px] text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                      <div className="flex-grow"></div>
                      <button 
                        onClick={() => appendHighlightToNotes(item.text)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy to main notes"
                      >
                        <Copy size={12} /> Copy to Reflection
                      </button>
                      <button 
                        onClick={() => onDeleteHighlight(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors absolute top-2 right-2"
                        title="Delete highlight"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <hr className="border-slate-100" />

          {/* Reflection Section */}
          <section className="flex flex-col h-full min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Reflection Journal
            </h3>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Write your thoughts here..."
              className="flex-grow w-full p-4 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none text-slate-700 leading-relaxed text-sm"
              style={{ minHeight: '200px' }}
            />
          </section>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onExportMarkdown}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Download size={16} /> Markdown
            </button>
            <button 
              onClick={onExportPDF}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 border border-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 text-white transition-colors"
            >
              <Download size={16} /> PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};