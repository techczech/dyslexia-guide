import React, { useState, useEffect, useRef } from 'react';
import { 
  Lightbulb, 
  BookOpen, 
  Keyboard, 
  Eye, 
  Layout, 
  Headphones, 
  Mic, 
  Glasses,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Info,
  Download,
  Plus,
  PenLine,
  Filter,
  CheckSquare,
  Library,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Calendar,
  Trash2,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { jsPDF } from "jspdf";
import { Header } from './components/Header';
import { LessonCard, LessonSection, TopicCard } from './components/LessonCard';
import { NotesSidebar } from './components/NotesSidebar';
import { ViewMode, Highlight, LessonData, BlockData, ContentType, ListItem } from './types';
import { contentData } from './content';

// Icon Map
const iconMap: { [key: string]: React.ReactNode } = {
  Lightbulb: <Lightbulb size={24} />,
  BookOpen: <BookOpen size={24} />,
  Keyboard: <Keyboard size={24} />,
  Eye: <Eye size={24} />,
  Layout: <Layout size={24} />,
  Headphones: <Headphones size={24} />,
  Mic: <Mic size={24} />,
  Glasses: <Glasses size={24} />,
  Info: <Info size={24} />,
  CheckCircle2: <CheckCircle2 size={18} className="text-green-600" />
};

// --- Dynamic Content Renderers ---

const renderContent = (
  blocks: BlockData[], 
  isDyslexiaFriendly: boolean, 
  savedIds: string[], 
  onToggleSave: (id: string) => void,
  parentType?: ContentType
) => {
  return blocks.map((block, index) => (
    <ContentBlock 
      key={block.id || index} 
      block={block} 
      isDyslexiaFriendly={isDyslexiaFriendly}
      savedIds={savedIds}
      onToggleSave={onToggleSave}
      parentType={parentType}
    />
  ));
};

const ContentBlock = ({ 
  block, 
  isDyslexiaFriendly, 
  savedIds, 
  onToggleSave,
  parentType 
}: { 
  block: BlockData, 
  isDyslexiaFriendly: boolean,
  savedIds: string[],
  onToggleSave: (id: string) => void,
  parentType?: ContentType
}) => {
  const commonSpacing = "mb-4";
  
  switch (block.type) {
    case 'paragraph': {
      // For Resource types, we allow bookmarking the whole paragraph if it has an ID
      const isResource = parentType === 'resource' && block.id;
      return (
        <div className={`relative group ${commonSpacing}`}>
          <div className="flex gap-2 items-start">
             <p 
              className={`flex-grow`}
              dangerouslySetInnerHTML={{ __html: block.content || '' }} 
            />
            {isResource && block.id && (
              <button 
                onClick={() => onToggleSave(block.id!)}
                className={`p-1 rounded transition-colors flex-shrink-0 ${
                  savedIds.includes(block.id!)
                    ? 'text-blue-600'
                    : 'text-slate-200 group-hover:text-slate-400'
                }`}
                title="Bookmark resource"
              >
                 {savedIds.includes(block.id!) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            )}
          </div>
        </div>
      );
    }
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={`pl-0 ${commonSpacing} space-y-3`}>
          {block.items?.map((item: ListItem, idx) => (
            <li key={item.id || idx} className="flex gap-3 group items-start">
              {/* Custom bullet/number to allow save button alignment */}
              <div className={`mt-1.5 flex-shrink-0 w-6 flex justify-center font-bold text-slate-400 text-sm ${block.ordered ? '' : ''}`}>
                 {block.ordered ? `${idx + 1}.` : '•'}
              </div>
              
              <div 
                className={`flex-grow ${isDyslexiaFriendly ? 'leading-loose' : ''}`}
                dangerouslySetInnerHTML={{ __html: item.content }} 
              />
              
              <button 
                onClick={() => onToggleSave(item.id)}
                className={`mt-1 p-1 rounded transition-colors flex-shrink-0 ${
                  savedIds.includes(item.id)
                    ? 'text-blue-600'
                    : 'text-slate-200 group-hover:text-slate-400 opacity-0 group-hover:opacity-100'
                }`}
                title="Bookmark item"
              >
                 {savedIds.includes(item.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </li>
          ))}
        </ListTag>
      );
    }
    case 'blockquote':
      return (
        <blockquote className="border-l-4 border-slate-300 pl-4 italic my-4 text-slate-700 bg-slate-50 p-4 rounded-r-lg">
          {block.content}
        </blockquote>
      );
    case 'box':
      return (
        <div className={`mt-8 p-4 rounded-xl border ${block.style === 'blue' ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
          <p dangerouslySetInnerHTML={{ __html: block.content || '' }} />
        </div>
      );
    case 'heading':
      return (
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2 mt-6">
          {block.icon && iconMap[block.icon]}
          {block.content}
        </h4>
      );
    default:
      return null;
  }
};

export default function App() {
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]); // Generic ID storage
  const [userNotes, setUserNotes] = useState('');
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [browserFilter, setBrowserFilter] = useState<ContentType>('activity');
  
  // Selection State
  const [selectionPopup, setSelectionPopup] = useState<{x: number, y: number, text: string, range: Range} | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initial Load - LocalStorage & Deep Linking
  useEffect(() => {
    // Load Saved Data
    const saved = localStorage.getItem('dyslexia_guide_saved');
    if (saved) setSavedIds(JSON.parse(saved));

    const notes = localStorage.getItem('dyslexia_guide_notes');
    if (notes) setUserNotes(notes);

    const savedHighlights = localStorage.getItem('dyslexia_guide_highlights');
    if (savedHighlights) setHighlights(JSON.parse(savedHighlights));

    // Deep Linking
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step');
    
    if (stepParam) {
      const stepIndex = parseInt(stepParam, 10);
      if (!isNaN(stepIndex) && stepIndex >= 0 && stepIndex < contentData.lessons.length) {
        setCurrentStep(stepIndex);
        setViewMode('step');
      }
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dyslexia_guide_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('dyslexia_guide_notes', userNotes);
  }, [userNotes]);

  useEffect(() => {
    localStorage.setItem('dyslexia_guide_highlights', JSON.stringify(highlights));
  }, [highlights]);

  // Handle Text Selection
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      
      if (!selection || selection.isCollapsed) {
        // Only clear if we aren't clicking the popup itself
        const target = e.target as HTMLElement;
        if (!target.closest('#selection-popup')) {
          setSelectionPopup(null);
        }
        return;
      }

      // Ensure selection is within our content area
      if (contentRef.current && contentRef.current.contains(selection.anchorNode)) {
        const text = selection.toString().trim();
        if (text.length > 0) {
          const range = selection.getRangeAt(0).cloneRange(); // Clone the range to persist it
          const rect = range.getBoundingClientRect();
          
          // Position the popup just above the selection
          setSelectionPopup({
            x: rect.left + (rect.width / 2),
            y: rect.top - 10 + window.scrollY, // Add scrollY for absolute positioning
            text: text,
            range: range
          });
        }
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const saveHighlight = () => {
    if (selectionPopup) {
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: selectionPopup.text,
        date: new Date().toISOString()
      };
      
      // Try to visually highlight the text
      try {
        const span = document.createElement('span');
        span.className = 'highlight-visual bg-yellow-200 text-slate-900 border-b-2 border-yellow-400 relative group cursor-pointer rounded-sm px-0.5 mx-0.5';
        span.title = "Click to open notes";
        span.onclick = (e) => {
            e.stopPropagation();
            setIsSidebarOpen(true);
        };
        
        // Add a small visual marker at the end
        const icon = document.createElement('sup');
        icon.className = 'ml-1 text-[10px] text-yellow-600 font-bold select-none';
        icon.innerText = '📝';
        
        selectionPopup.range.surroundContents(span);
        span.appendChild(icon);
      } catch (e) {
        console.warn("Could not visually highlight (likely crosses block boundaries). Saved to notes only.");
      }

      setHighlights(prev => [...prev, newHighlight]);
      setSelectionPopup(null);
      window.getSelection()?.removeAllRanges();
      
      showToastNotification('Saved to notes');
      setIsSidebarOpen(true);
    }
  };

  const deleteHighlight = (id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const baseStyles = isDyslexiaFriendly 
    ? "font-sans text-lg leading-loose bg-[#FEFBF5] text-slate-900" 
    : "font-sans bg-gray-50 text-slate-600";

  const toggleMode = () => setIsDyslexiaFriendly(!isDyslexiaFriendly);
  
  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Clean URL when going home
    if (mode === 'home') {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const nextStep = () => {
    if (currentStep < contentData.lessons.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    handleSetViewMode('step');
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    showToastNotification(savedIds.includes(id) ? 'Removed bookmark' : 'Bookmarked');
  };

  const handleShare = (stepIndex: number) => {
    const url = `${window.location.origin}${window.location.pathname}?step=${stepIndex}`;
    navigator.clipboard.writeText(url).then(() => {
      showToastNotification('Link copied to clipboard!');
    });
  };

  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const exportMarkdown = () => {
    const highlightText = highlights.length > 0 
      ? "## Highlights\n\n" + highlights.map(h => `> ${h.text}\n`).join("\n") + "\n"
      : "";
      
    const fullText = `# Dyslexia Awareness Guide - Notes\n\n${highlightText}## My Reflections\n\n${userNotes}`;
    
    const blob = new Blob([fullText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dyslexia-guide-notes.md';
    a.click();
    URL.revokeObjectURL(url);
    showToastNotification('Downloaded Markdown');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let yPos = 15;
    
    doc.setFontSize(18);
    doc.text("Dyslexia Guide Notes", 15, yPos);
    yPos += 15;

    if (highlights.length > 0) {
      doc.setFontSize(14);
      doc.text("Highlights", 15, yPos);
      yPos += 10;
      doc.setFontSize(11);
      
      highlights.forEach(h => {
        const lines = doc.splitTextToSize(`"${h.text}"`, 180);
        if (yPos + (lines.length * 7) > 280) {
          doc.addPage();
          yPos = 15;
        }
        doc.text(lines, 15, yPos);
        yPos += (lines.length * 7) + 5;
      });
      
      yPos += 10;
    }

    if (yPos > 250) {
      doc.addPage();
      yPos = 15;
    }

    doc.setFontSize(14);
    doc.text("Reflections", 15, yPos);
    yPos += 10;
    doc.setFontSize(11);
    
    const splitNotes = doc.splitTextToSize(userNotes, 180);
    doc.text(splitNotes, 15, yPos);
    
    doc.save("dyslexia-guide-notes.pdf");
    showToastNotification('Downloaded PDF');
  };

  // Helper to render a lesson's content
  const renderLessonContent = (lesson: LessonData) => {
    return (
      <>
        {/* Render Intro Blocks (if any, like in intro) */}
        {lesson.blocks && (
          <div className="mb-8">
            {renderContent(lesson.blocks, isDyslexiaFriendly, savedIds, handleToggleSave)}
          </div>
        )}

        {/* Render Sections (like in Lesson 1-5) */}
        {lesson.sections && lesson.sections.map((section, idx) => (
          <LessonSection 
            key={section.id || idx}
            title={section.title}
            icon={iconMap[section.icon]}
            colorClass={section.colorClass}
            contentType={section.contentType}
          >
            {renderContent(section.blocks, isDyslexiaFriendly, savedIds, handleToggleSave, section.contentType)}
          </LessonSection>
        ))}
      </>
    );
  };

  const getSavedItemDetails = (id: string) => {
    // Search lessons
    const lesson = contentData.lessons.find(l => l.id === id);
    if (lesson) return { 
      id, 
      type: 'lesson', 
      title: lesson.title, 
      snippet: lesson.description, 
      label: 'Full Lesson', 
      linkStep: contentData.lessons.indexOf(lesson),
      icon: iconMap[lesson.icon]
    };

    // Search deeper
    for (let i = 0; i < contentData.lessons.length; i++) {
      const l = contentData.lessons[i];
      // Sections
      const section = l.sections?.find(s => s.id === id);
      if (section) return { 
        id, 
        type: 'section', 
        title: section.title, 
        snippet: `From: ${l.title}`,
        label: `Section`, 
        linkStep: i,
        icon: iconMap[section.icon]
      };

      // Blocks in sections
      if (l.sections) {
        for (const s of l.sections) {
           const block = s.blocks.find(b => b.id === id);
           if (block) return {
             id, type: 'block', title: s.title, snippet: block.content, label: 'Saved Content', linkStep: i, icon: <Bookmark size={16} />
           };
           // Items in blocks
           for (const b of s.blocks) {
             const item = b.items?.find(it => it.id === id);
             if (item) return {
               id, type: 'item', title: s.title, snippet: item.content, label: 'Saved Item', linkStep: i, icon: <CheckSquare size={16} />
             };
           }
        }
      }
      
      // Blocks in lesson (intro)
      if (l.blocks) {
         const block = l.blocks.find(b => b.id === id);
         if (block) return { id, type: 'block', title: l.title, snippet: block.content, label: 'Intro Content', linkStep: i, icon: <Info size={16} /> };
          for (const b of l.blocks) {
             const item = b.items?.find(it => it.id === id);
             if (item) return {
               id, type: 'item', title: l.title, snippet: item.content, label: 'Intro Item', linkStep: i, icon: <Info size={16} />
             };
           }
      }
    }
    return null;
  };

  // Views
  const HomeView = () => {
    const savedItems = savedIds.map(getSavedItemDetails).filter(Boolean);

    return (
      <div className="animate-in fade-in duration-500 space-y-12">
        {/* Hero Section */}
        <div className="text-center py-16 px-4 bg-white rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
              <BookOpen size={16} />
              5 Lessons Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
              Improve anyone's reading and writing by understanding dyslexia
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              A practical 5-step guide to creating accessible documents and building better habits for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => goToStep(0)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105"
              >
                Start Guide <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => handleSetViewMode('plan')}
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                View Learning Plan
              </button>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent -z-0 pointer-events-none"></div>
        </div>

        {/* Bookmarks Section */}
        {savedItems.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                  <BookmarkCheck size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your Bookmarks</h2>
                  <p className="text-slate-500 text-sm">{savedItems.length} saved items</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedItems.map((item: any) => (
                <div key={item.id} className="group relative bg-slate-50 border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-1 rounded shadow-sm">
                      {item.label}
                    </span>
                    <button 
                      onClick={() => handleToggleSave(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-2 line-clamp-1 flex items-center gap-2">
                    {item.icon && <span className="text-slate-400">{item.icon}</span>}
                    {item.title}
                  </h4>
                  
                  <div 
                    className="text-sm text-slate-500 line-clamp-2 mb-4 h-10 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.snippet || '' }} 
                  />
                  
                  <button 
                    onClick={() => goToStep(item.linkStep)}
                    className="w-full mt-auto flex items-center justify-center gap-2 py-2 rounded-lg bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    View <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Lessons Grid */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">All Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentData.lessons.map((item, index) => (
              <TopicCard 
                key={item.id}
                number={index}
                title={item.title}
                description={item.description}
                icon={iconMap[item.icon]}
                onClick={() => goToStep(index)}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={(e) => handleToggleSave(item.id, e)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LearningPlanView = () => {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="mb-8">
            <button 
              onClick={() => handleSetViewMode('home')}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <Calendar size={32} />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Learning Plan
              </h1>
            </div>
            <p className="text-xl text-slate-500 max-w-2xl">
              A structured 5-day plan designed to help you integrate these skills into your practice in just 15 minutes a day.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
           {contentData.lessons.slice(1).map((lesson, idx) => {
              const dayNum = idx + 1;
              const isCompleted = currentStep > idx;
              
              return (
                 <div 
                   key={lesson.id}
                   className="relative group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all"
                 >
                   <div className="flex justify-between items-start w-full mb-4">
                     <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                       Day {dayNum}
                     </span>
                     {savedIds.includes(lesson.id) && <BookmarkCheck size={20} className="text-emerald-500" />}
                   </div>
                   
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800">
                     {lesson.title}
                   </h3>
                   
                   <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                     {lesson.description}
                   </p>
                   
                   <div className="mt-auto">
                     <button 
                       onClick={() => goToStep(idx + 1)}
                       className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-white border-2 border-slate-100 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-all"
                     >
                        {isCompleted ? 'Review Lesson' : 'Start Lesson'} <PlayCircle size={18} />
                     </button>
                   </div>
                 </div>
              )
            })}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="p-4 bg-white rounded-full text-blue-600 shadow-sm">
            <Calendar size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Why 15 minutes?</h3>
            <p className="text-blue-800/80 leading-relaxed">
              Research shows that spaced repetition and micro-learning are more effective for retaining new information than binging content. By taking this course one day at a time, you give yourself space to reflect and apply each concept.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const StepView = () => {
    const item = contentData.lessons[currentStep];
    const isLastStep = currentStep === contentData.lessons.length - 1;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep) / (contentData.lessons.length - 1)) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep) / (contentData.lessons.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <LessonCard 
          id={item.id} 
          number={currentStep} 
          title={item.title} 
          icon={iconMap[item.icon]}
          isSaved={savedIds.includes(item.id)}
          onToggleSave={() => handleToggleSave(item.id)}
          onShare={() => handleShare(currentStep)}
        >
          {renderLessonContent(item)}
        </LessonCard>

        {isLastStep ? (
          // End of course actions
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="mt-8 text-center">
              <div className="inline-flex flex-col items-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Course Completed!</h3>
                <p className="text-slate-500 mt-2">Check the notes sidebar for your highlights and reflection.</p>
                
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Open Notes & Reflection
                </button>
              </div>
            </div>
            
             <button 
              onClick={prevStep}
              className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:shadow-md mx-auto"
            >
              <ArrowLeft size={20} />
              Review Previous Lesson
            </button>
          </div>
        ) : (
          // Standard Navigation
          <div className="mt-8 flex items-center justify-between gap-4">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-1/2 justify-center md:w-auto ${
                currentStep === 0 
                  ? 'opacity-0 cursor-default' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:shadow-md'
              }`}
            >
              <ArrowLeft size={20} />
              Previous
            </button>

            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-1/2 justify-center md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            >
              Next
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const ScrollView = () => (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-700">
      <div className="mb-8">
         <button 
            onClick={() => handleSetViewMode('home')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            5 lessons about dyslexia
          </h1>
          <p className="text-xl text-slate-500">Full guide content</p>
      </div>

      {contentData.lessons.map((item, index) => (
        <div key={item.id} id={item.id}>
           <LessonCard 
              number={index} 
              id={item.id}
              title={item.title} 
              icon={iconMap[item.icon]}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={() => handleToggleSave(item.id)}
              onShare={() => handleShare(index)}
            >
              {renderLessonContent(item)}
            </LessonCard>
        </div>
      ))}

      <div className="text-center pt-12 pb-8">
        <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-6 py-3 rounded-full transition-colors"
          >
            Back to Top
          </button>
      </div>
    </div>
  );

  const ResourceBrowserView = () => {
    // Flatten logic to find all individual items or relevant blocks based on filter
    const flattenedItems = contentData.lessons.flatMap((lesson, lessonIdx) => {
      // Find sections matching the current filter type
      const matchingSections = lesson.sections?.filter(s => s.contentType === browserFilter) || [];
      
      return matchingSections.flatMap(section => {
        // Extract interesting items from blocks
        return section.blocks.flatMap(block => {
           // For Activity/Knowledge, we mostly care about lists
           if ((browserFilter === 'activity' || browserFilter === 'knowledge') && block.type === 'list' && block.items) {
             return block.items.map(item => ({
               id: item.id,
               content: item.content,
               type: 'list-item',
               lessonTitle: lesson.title,
               lessonNumber: lessonIdx,
               sectionTitle: section.title,
               blockId: block.id
             }));
           }
           
           // For Resource, we care about paragraphs (which might contain links) or blockquotes
           if (browserFilter === 'resource') {
             // If it's a paragraph with a link or just meaningful text
             if (block.type === 'paragraph' && block.content) {
                return [{
                  id: block.id,
                  content: block.content,
                  type: 'paragraph',
                  lessonTitle: lesson.title,
                  lessonNumber: lessonIdx,
                  sectionTitle: section.title,
                  blockId: block.id
                }];
             }
           }
           
           return [];
        });
      });
    });

    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
         <div className="mb-8">
            <button 
              onClick={() => handleSetViewMode('home')}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Activities & Resources
            </h1>
            <p className="text-slate-500">
              Browse all individual {browserFilter} items from the course.
            </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-1">
          <button
            onClick={() => setBrowserFilter('activity')}
            className={`px-4 py-2 rounded-t-lg font-bold text-sm flex items-center gap-2 transition-colors ${
              browserFilter === 'activity' 
                ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <CheckSquare size={16} /> Activity Checklist
          </button>
          <button
            onClick={() => setBrowserFilter('knowledge')}
            className={`px-4 py-2 rounded-t-lg font-bold text-sm flex items-center gap-2 transition-colors ${
              browserFilter === 'knowledge' 
                ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Lightbulb size={16} /> Knowledge Base
          </button>
          <button
            onClick={() => setBrowserFilter('resource')}
            className={`px-4 py-2 rounded-t-lg font-bold text-sm flex items-center gap-2 transition-colors ${
              browserFilter === 'resource' 
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Library size={16} /> Reading List
          </button>
        </div>

        {/* Browser List - Flattened */}
        <div className="grid gap-4">
          {flattenedItems.map((item, idx) => (
             <div 
               key={item.id || idx} 
               className={`bg-white rounded-xl shadow-sm border border-slate-200 p-4 transition-all hover:shadow-md group flex gap-4 ${
                 savedIds.includes(item.id!) ? 'bg-blue-50/30 ring-1 ring-blue-100' : ''
               }`}
             >
                <button 
                  onClick={() => item.id && handleToggleSave(item.id)}
                  className={`flex-shrink-0 mt-1 p-2 rounded-lg transition-colors h-fit ${
                    savedIds.includes(item.id!) 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-400'
                  }`}
                  title={savedIds.includes(item.id!) ? "Remove bookmark" : "Bookmark this item"}
                >
                  {savedIds.includes(item.id!) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
                
                <div className="flex-grow">
                   <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span>{item.lessonNumber === 0 ? 'Intro' : `Lesson ${item.lessonNumber}`}</span>
                      <span className="text-slate-300">•</span>
                      <span>{item.lessonTitle}</span>
                      <span className="text-slate-300">•</span>
                      <span>{item.sectionTitle}</span>
                   </div>
                   
                   <div 
                      className={`text-slate-800 leading-relaxed ${browserFilter === 'knowledge' ? 'font-medium' : ''}`}
                      dangerouslySetInnerHTML={{ __html: item.content || '' }} 
                   />
                </div>

                <button 
                  onClick={() => goToStep(item.lessonNumber)}
                  className="flex-shrink-0 self-center p-2 text-slate-300 hover:text-blue-600 transition-colors"
                  title="Go to lesson context"
                >
                  <ArrowRight size={20} />
                </button>
             </div>
          ))}

          {flattenedItems.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>No items found for this category.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${baseStyles}`}>
      <Header 
        isDyslexiaFriendly={isDyslexiaFriendly} 
        toggleMode={toggleMode} 
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        onToggleNotes={() => setIsSidebarOpen(!isSidebarOpen)}
        isNotesOpen={isSidebarOpen}
      />

      <main 
        ref={contentRef}
        className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative"
      >
        {viewMode === 'home' && <HomeView />}
        {viewMode === 'step' && <StepView />}
        {viewMode === 'scroll' && <ScrollView />}
        {viewMode === 'browser' && <ResourceBrowserView />}
        {viewMode === 'plan' && <LearningPlanView />}
      </main>
      
      {/* Floating Selection Popup */}
      {selectionPopup && (
        <div 
          id="selection-popup"
          className="absolute z-50 transform -translate-x-1/2 -translate-y-full mb-2 animate-in fade-in zoom-in-95 duration-200"
          style={{ 
            left: selectionPopup.x, 
            top: selectionPopup.y 
          }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()} // Prevent clearing selection when clicking the button
            onClick={(e) => {
              e.stopPropagation();
              saveHighlight();
            }}
            className="bg-slate-900 text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap arrow-bottom"
          >
            <Plus size={16} />
            Save to Notes
          </button>
          {/* Arrow styling */}
          <div className="w-3 h-3 bg-slate-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5 -z-10"></div>
        </div>
      )}

      {/* Sidebar */}
      <NotesSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        highlights={highlights}
        onDeleteHighlight={deleteHighlight}
        userNotes={userNotes}
        setUserNotes={setUserNotes}
        onExportMarkdown={exportMarkdown}
        onExportPDF={exportPDF}
      />

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 z-[60] flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <CheckCircle2 size={18} className="text-green-400" />
        <span className="font-medium text-sm">{toastMessage}</span>
      </div>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200/50 mt-auto">
        <div className="flex flex-col items-center gap-2">
           <p>© Dyslexia Awareness Guide</p>
           {viewMode !== 'home' && (
             <button onClick={() => handleSetViewMode('home')} className="hover:text-blue-500 transition-colors">
               Return Home
             </button>
           )}
        </div>
      </footer>
    </div>
  );
}