import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Gem, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Camera,
  Music,
  Utensils,
  MapPin,
  Palette,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { CategoryPriorities } from '@/lib/calculator/types';
import { CATEGORIES } from '@/lib/calculator/constants';

interface PrioritiesStepProps {
  priorities: CategoryPriorities;
  onPrioritiesChange: (priorities: CategoryPriorities) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIORITY_LABELS = [
  { value: 1, label: 'Minimal', description: 'Economic optimization' },
  { value: 2, label: 'Baseline', description: 'Functional essentials' },
  { value: 3, label: 'Standard', description: 'Market balanced' },
  { value: 4, label: 'Premium', description: 'High-end specialty' },
  { value: 5, label: 'Elite', description: 'Zero-compromise luxury' },
];

const categoryIcons: { [key: string]: any } = {
  venue: MapPin,
  catering: Utensils,
  photography: Camera,
  music: Music,
  decor: Palette,
  attire: Gem,
  planner: Sparkles,
  miscellaneous: Gift,
};

export default function PrioritiesStep({
  priorities,
  onPrioritiesChange,
  onNext,
  onBack,
}: PrioritiesStepProps) {
  const handlePriorityChange = (categoryId: string, value: number) => {
    onPrioritiesChange({
      ...priorities,
      [categoryId]: value,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto px-6"
    >
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">Phase 03</span>
            <h2 className="text-2xl font-serif font-black text-white">Value Calibration</h2>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted">75% Complete</p>
        </div>
        <div className="h-1 bg-surface-2 overflow-hidden">
          <motion.div 
            initial={{ width: '50%' }}
            animate={{ width: '75%' }}
            className="h-full bg-purple" 
          />
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {CATEGORIES.filter(cat => cat.id !== 'miscellaneous').map((category) => {
          const priority = priorities[category.id as keyof CategoryPriorities] || 3;
          const priorityLabel = PRIORITY_LABELS.find(p => p.value === priority);
          const Icon = categoryIcons[category.id] || CheckCircle2;

          return (
            <motion.div 
              key={category.id} 
              variants={item}
              className="bg-surface border-2 border-transparent hover:border-editorial p-8 shadow-premium transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-surface-2 rounded-lg flex items-center justify-center text-muted group-hover:bg-purple group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">{category.name}</h3>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-tight italic decoration-purple decoration-2 underline-offset-4">Sector Focus: {category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-purple-bright uppercase tracking-[0.15em] mb-1">{priorityLabel?.label}</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-tighter italic">{priorityLabel?.description}</p>
                </div>
              </div>

              {/* Advanced Calibration Controls */}
              <div className="relative pt-6">
                 {/* Custom Track */}
                 <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-2 -translate-y-1/2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((priority - 1) / 4) * 100}%` }}
                      className="h-full bg-purple"
                    />
                 </div>

                 {/* Native Range (Hidden but functional) */}
                 <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={priority}
                    onChange={(e) => handlePriorityChange(category.id, parseInt(e.target.value, 10))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Visual Markers */}
                  <div className="relative flex justify-between z-0">
                    {PRIORITY_LABELS.map((label) => {
                      const isActive = priority === label.value;
                      return (
                        <div key={label.value} className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            isActive ? 'bg-purple border-purple scale-150 ring-4 ring-purple/20' : 'bg-surface-2 border-editorial'
                          }`} />
                          <span className={`mt-4 text-[10px] font-black uppercase tracking-widest transition-colors ${
                            isActive ? 'text-white' : 'text-muted'
                          }`}>
                            0{label.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Market Intelligence Alert */}
      <div className="mt-12 p-8 bg-surface-2 border border-editorial relative overflow-hidden italic">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <BarChart3 className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-3">Market Intelligence Advisory</h3>
        <p className="text-xs text-muted font-medium leading-relaxed uppercase tracking-tighter">
          Calibrating sector importance directly influences the variance threshold in your final dossier. 
          Focus capital on segments that drive maximum sentimental or aesthetic ROI for your specific profile.
        </p>
      </div>

      {/* Navigation Suite */}
      <div className="flex gap-6 mt-16 pt-12 border-t border-editorial">
        <button
          onClick={onBack}
          className="flex-1 px-8 py-5 border-2 border-white text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retreat
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-8 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3"
        >
          Execute Analysis
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
