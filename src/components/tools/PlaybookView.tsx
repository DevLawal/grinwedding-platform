'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playbookData, PlaybookEntry } from '@/lib/playbook-data';
import { Search, Quote, Heart, Lightbulb, ChevronRight } from 'lucide-react';

type Category = 'quotes' | 'advice' | 'tips';

export default function PlaybookView() {
  const [activeCategory, setActiveCategory] = useState<Category>('quotes');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: 'quotes' as const, label: 'Quotes', icon: Quote, color: 'bg-indigo-600', textColor: 'text-indigo-600', shadow: 'shadow-indigo-500/20' },
    { id: 'advice' as const, label: 'Advice', icon: Heart, color: 'bg-rose-500', textColor: 'text-rose-500', shadow: 'shadow-rose-500/20' },
    { id: 'tips' as const, label: 'Intelligence', icon: Lightbulb, color: 'bg-amber-500', textColor: 'text-amber-500', shadow: 'shadow-amber-500/20' },
  ];

  const categoryConfig = categories.find(c => c.id === activeCategory)!;

  const filteredEntries = useMemo(() => {
    const entries = playbookData[activeCategory];
    if (!searchQuery) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(entry => 
      entry.content.toLowerCase().includes(query) || 
      (entry.source && entry.source.toLowerCase().includes(query))
    );
  }, [activeCategory, searchQuery]);

  // Reset index when category or search changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, searchQuery]);

  const nextCard = () => {
    if (filteredEntries.length === 0) return;
    setCurrentIndex(prev => (prev < filteredEntries.length - 1 ? prev + 1 : 0));
  };

  const prevCard = () => {
    if (filteredEntries.length === 0) return;
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredEntries.length - 1));
  };

  // Get plural set of cards to display in stack (current + 3 next)
  const visibleCards = useMemo(() => {
    if (filteredEntries.length === 0) return [];
    const stack = [];
    for (let i = 0; i < Math.min(4, filteredEntries.length); i++) {
      const index = (currentIndex + i) % filteredEntries.length;
      stack.push({ ...filteredEntries[index], stackIndex: i });
    }
    return stack.reverse(); // Bottom cards first for Z-index
  }, [filteredEntries, currentIndex]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-rose-400 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="mb-12 text-center relative z-10">
        <div className="inline-block mb-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-purple"
          >
            Wedding Playbook · Premium Intelligence
          </motion.span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-black mb-4 text-text tracking-tight">
          The Intelligence <span className="italic serif text-purple">Deck.</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto text-sm font-medium leading-relaxed">
          The ultimate wedding market playbook. Swipe through curated indices, 
          strategic advice, and deep-market inspiration.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-20 relative z-10">
        <div className="flex bg-surface-2/50 backdrop-blur-md p-1.5 border border-editorial rounded-2xl overflow-x-auto no-scrollbar shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? `${cat.color} text-white shadow-lg scale-[1.02]` 
                  : 'text-text-dim hover:text-text hover:bg-surface'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim group-focus-within:text-purple transition-colors" />
          <input
            type="text"
            placeholder="Search the deck..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-surface-2/50 backdrop-blur-md border border-editorial rounded-2xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-purple/20 focus:border-purple/30 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Stacked Cards Area */}
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background Large Text (Inspired by reference) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.05, scale: 1 }}
            key={activeCategory}
            className="text-[12rem] font-black text-text whitespace-nowrap tracking-tighter"
          >
            {activeCategory.toUpperCase()}
          </motion.div>
        </div>

        <div className="relative w-full max-w-sm h-full flex items-center justify-center perspective-[1000px]">
          <AnimatePresence mode="popLayout">
            {filteredEntries.length > 0 ? (
              visibleCards.map((card, index) => {
                const isTop = card.stackIndex === 0;
                // Rotations: 0, 3, -2, 5
                const rotations = [0, 4, -3, 6];
                const rotation = rotations[card.stackIndex] || 0;
                
                return (
                  <motion.div
                    key={`${activeCategory}-${card.id}`}
                    style={{
                      zIndex: 10 - card.stackIndex,
                      transformStyle: "preserve-3d",
                    }}
                    initial={isTop ? { x: 400, opacity: 0, rotate: 15 } : { opacity: 0, scale: 0.8 }}
                    animate={{
                      x: 0,
                      y: card.stackIndex * 15,
                      scale: 1 - card.stackIndex * 0.05,
                      rotate: rotation,
                      opacity: 1 - card.stackIndex * 0.2,
                    }}
                    exit={{ 
                      x: -400, 
                      opacity: 0, 
                      rotate: -15,
                      transition: { duration: 0.4, ease: "circIn" }
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25
                    }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 120) prevCard();
                      else if (info.offset.x < -120) nextCard();
                    }}
                    className={`absolute inset-0 bg-surface rounded-[2rem] p-10 shadow-2xl flex flex-col justify-between border-2 border-editorial/50 cursor-grab active:cursor-grabbing select-none group ${isTop ? 'ring-1 ring-white/10 shadow-premium' : ''}`}
                  >
                    {/* Card Content Decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${categoryConfig.color} opacity-[0.03] blur-3xl rounded-full -mr-16 -mt-16`} />
                    
                    <div className="relative">
                      <div className="flex justify-between items-start mb-10">
                        <div className={`p-3 rounded-2xl ${categoryConfig.color} bg-opacity-10`}>
                          <categoryConfig.icon className={`w-6 h-6 ${categoryConfig.textColor}`} />
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-[10px] font-black tracking-widest text-text-dim opacity-40">
                            ENTRY NO.
                          </span>
                          <span className="font-mono text-xs font-black text-text">
                            {String(currentIndex + 1).padStart(3, '0')}
                          </span>
                        </div>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -left-6 -top-4 w-12 h-12 text-text opacity-[0.03]" />
                        <p className="text-2xl md:text-3xl font-serif font-black leading-tight text-text tracking-tight">
                          {card.content}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8 relative">
                      <div className="flex items-center gap-4">
                        <div className={`h-px flex-1 ${categoryConfig.color} opacity-20`} />
                        {card.source && (
                          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${categoryConfig.textColor} whitespace-nowrap`}>
                            {card.source}
                          </span>
                        )}
                        <div className={`h-1.5 w-1.5 rounded-full ${categoryConfig.color}`} />
                      </div>

                      {/* Stack Progress Indicators */}
                      <div className="flex justify-center gap-2">
                        {Array.from({ length: Math.min(10, filteredEntries.length) }).map((_, i) => (
                          <div 
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              Math.floor((currentIndex / filteredEntries.length) * 10) === i 
                                ? `w-8 ${categoryConfig.color}` 
                                : 'w-2 bg-editorial'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center bg-surface-2 p-12 rounded-[2rem] border border-editorial border-dashed w-full">
                <Search className="w-12 h-12 text-text-dim mx-auto mb-4 opacity-20" />
                <p className="text-text-dim font-black uppercase tracking-widest text-sm">No Results Found</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-[10px] font-black uppercase tracking-widest text-purple hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Enhanced and Positioned */}
        {filteredEntries.length > 1 && (
          <div className="absolute inset-x-0 bottom-[-80px] flex justify-center gap-6 md:contents">
            <button 
              onClick={prevCard}
              className="md:absolute md:left-[-100px] md:top-1/2 md:-translate-y-1/2 p-5 rounded-2xl bg-surface border border-editorial text-text hover:text-purple hover:border-purple/30 transition-all shadow-premium group active:scale-95"
              aria-label="Previous card"
            >
              <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextCard}
              className="md:absolute md:right-[-100px] md:top-1/2 md:-translate-y-1/2 p-5 rounded-2xl bg-surface border border-editorial text-text hover:text-purple hover:border-purple/30 transition-all shadow-premium group active:scale-95"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Manual Swiping Instructions */}
      <footer className="mt-28 text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-editorial/30" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-text-dim/60">
            Flick or use arrows to navigate
          </p>
          <div className="w-12 h-px bg-editorial/30" />
        </div>
        
        <div className="pt-10 border-t border-editorial max-w-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim/40">
            Total Intelligence: {filteredEntries.length} Indices
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim/40 italic">
            Part of the Grin Global Network
          </p>
        </div>
      </footer>
    </div>
  );
}
