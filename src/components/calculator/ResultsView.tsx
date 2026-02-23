import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  DollarSign, 
  Users, 
  PieChart, 
  AlertTriangle, 
  Info, 
  TrendingDown, 
  FileText, 
  Printer, 
  RefreshCcw,
  Target,
  Gem
} from 'lucide-react';
import { BudgetResults } from '@/lib/calculator/types';
import { formatCurrency } from '@/lib/calculator/budgetLogic';
import { CATEGORIES } from '@/lib/calculator/constants';

interface ResultsViewProps {
  results: BudgetResults;
  onStartOver: () => void;
}

export default function ResultsView({ results, onStartOver }: ResultsViewProps) {
  const { totalBudget, estimatedBudget, costPerGuest, categories, warnings, suggestions, hiddenCosts } = results;

  const errors = warnings.filter(w => w.type === 'error');
  const warningsList = warnings.filter(w => w.type === 'warning');
  const infos = warnings.filter(w => w.type === 'info');

  const handlePrint = () => window.print();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      id="printable-area"
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center mb-10 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-text text-base dark:text-base-dark px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6">
          <CheckCircle2 className="w-3 h-3 text-purple" />
          <span>Executive Analysis Complete</span>
        </div>
        <h1 className="text-3xl md:text-6xl font-serif font-black text-text mb-4 md:mb-6 tracking-tight leading-tight px-2">
          Your Market Projections.
        </h1>
        {estimatedBudget && (
          <p className="text-base md:text-lg text-muted font-medium max-w-2xl mx-auto italic px-4">
            "Based on live market data and sector trends. Precision calculated for your specific profile."
          </p>
        )}
      </motion.div>

      {/* Summary Matrix */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {[
          { label: 'Total Capital Outlay', value: formatCurrency(totalBudget), icon: DollarSign, color: 'text-purple', bg: 'bg-purple-dim' },
          { label: 'Cost Per Guest Index', value: formatCurrency(costPerGuest), icon: Users, color: 'text-purple-bright', bg: 'bg-purple-glow' },
          { label: 'Active Cost Centers', value: categories.length, icon: PieChart, color: 'text-purple', bg: 'bg-purple-dim' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface p-6 md:p-8 border border-editorial shadow-hover relative group overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} opacity-20 dark:opacity-20 opacity-10 -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500`} />
            <stat.icon className={`w-4 md:w-5 h-4 md:h-5 ${stat.color} mb-3 md:mb-4`} />
            <p className="text-[9px] md:text-[10px] font-black text-text-muted uppercase tracking-widest mb-1 md:mb-2">{stat.label}</p>
            <p className={`text-2xl md:text-3xl font-serif font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Detailed Breakdown */}
        <motion.div variants={item} className="lg:col-span-2 space-y-8 md:space-y-12">
          {/* Breakdown Card */}
          <div className="bg-surface border border-editorial shadow-hover p-6 md:p-10">
            <div className="flex items-center justify-between mb-8 md:mb-10 pb-3 md:pb-4 border-b-2 border-purple">
              <h2 className="text-xl md:text-2xl font-serif font-black text-text flex items-center gap-2 md:gap-3">
                <Target className="w-5 md:w-6 h-5 md:h-6 text-purple" />
                Capital Allocation
              </h2>
              <span className="text-[8px] md:text-[10px] font-black text-text-muted uppercase tracking-widest hidden sm:inline">Sector Metrics</span>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {categories.map((category) => {
                const categoryDef = CATEGORIES.find(c => c.id === category.id);
                return (
                  <div key={category.id} className="group">
                    <div className="flex items-center justify-between mb-2 md:mb-3 gap-4">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <span className="text-xl md:text-2xl grayscale group-hover:grayscale-0 transition-all shrink-0">{categoryDef?.icon}</span>
                        <div className="min-w-0">
                          <span className="block text-xs md:text-sm font-black text-text uppercase tracking-tight truncate">{category.name}</span>
                          <span className="text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-widest truncate">{category.percentage.toFixed(1)}% weight</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm md:text-[16px] lg:text-lg font-mono font-black text-purple whitespace-nowrap">{formatCurrency(category.amount)}</span>
                      </div>
                    </div>
                    
                    <div className="h-1.5 md:h-2 bg-surface-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-purple group-hover:bg-purple-bright transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hidden Costs Matrix */}
          <div className="bg-surface-2 p-6 md:p-10 border border-editorial italic relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10">
              <AlertTriangle className="w-8 md:w-12 h-8 md:h-12 text-text" />
            </div>
            <h2 className="text-lg md:text-xl font-serif font-black text-text mb-4 md:mb-6 underline decoration-purple decoration-2 underline-offset-8">Invisible Liabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative z-10">
              {hiddenCosts.map((cost, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3 text-text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">{cost}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Intel & Optimization */}
        <motion.div variants={item} className="space-y-6 md:space-y-8">
          {/* Errors/Warnings */}
          {(errors.length > 0 || warningsList.length > 0) && (
            <div className="bg-purple/10 border border-purple p-6 md:p-8 shadow-2xl">
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2 text-purple">
                <AlertTriangle className="w-3.5 md:w-4 h-3.5 md:h-4" />
                Risk Assessment
              </h2>
              <div className="space-y-5 md:space-y-6">
                {[...errors, ...warningsList].map((warning) => (
                  <div key={warning.id} className="border-l-2 border-purple/30 pl-3 md:pl-4">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-tight mb-1 text-text">{warning.title}</p>
                    <p className="text-[9px] md:text-[10px] text-text-muted font-medium leading-relaxed uppercase tracking-tighter">{warning.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Money Saving Intelligence */}
          {suggestions.length > 0 && (
            <div className="p-6 md:p-8 shadow-2xl border border-editorial bg-surface">
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-2 text-purple">
                <TrendingDown className="w-3.5 md:w-4 h-3.5 md:h-4" />
                Capital Optimization
              </h2>
              <div className="space-y-6 md:space-y-8">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="group">
                    <div className="flex items-start gap-3 md:gap-4 mb-2">
                       <Gem className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple mt-0.5 md:mt-1 shrink-0" />
                       <div>
                         <p className="text-[10px] md:text-xs font-black uppercase tracking-tight text-text mb-1.5 md:mb-2">{suggestion.title}</p>
                         <p className="text-[9px] md:text-[10px] text-text-muted font-medium leading-relaxed uppercase tracking-tighter mb-2 md:mb-3">{suggestion.description}</p>
                         {suggestion.potentialSavings && (
                           <span className="inline-block bg-purple-dim border border-purple-dim px-2 py-1 text-[8px] md:text-[9px] font-black text-purple uppercase tracking-[0.1em]">
                             Est. Efficiency: {formatCurrency(suggestion.potentialSavings)}
                           </span>
                         )}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Good to Know */}
          {infos.length > 0 && (
            <div className="bg-surface border border-editorial p-6 md:p-8 shadow-hover">
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text-dim mb-4 md:mb-6 flex items-center gap-2">
                <Info className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
                The Dossier
              </h3>
              <div className="space-y-5 md:space-y-6">
                {infos.map((info) => (
                  <div key={info.id}>
                    <p className="text-[10px] md:text-xs font-black text-text mb-1 uppercase tracking-tight">{info.title}</p>
                    <p className="text-[9px] md:text-[10px] text-text-muted font-medium uppercase tracking-tighter">{info.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action Suite */}
      <motion.div variants={item} className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 md:gap-6 print:hidden border-t-2 border-text pt-10 md:pt-12">
        <button
          onClick={handlePrint}
          className="w-full sm:flex-1 bg-text text-base dark:text-base-dark px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 md:gap-3"
        >
          <Printer className="w-3.5 md:w-4 h-3.5 md:h-4" />
          Export Executive PDF
        </button>
        <button
          onClick={onStartOver}
          className="w-full sm:flex-1 border-2 border-text text-text px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-text hover:text-base hover:dark:text-base-dark transition-all flex items-center justify-center gap-2 md:gap-3"
        >
          <RefreshCcw className="w-3.5 md:w-4 h-3.5 md:h-4" />
          Re-initialize Analysis
        </button>
      </motion.div>

      {/* Global CSS for Print and Perfection */}
      <style jsx global>{`
        @media print {
          /* Hide everything first */
          body * {
            visibility: hidden;
          }

          /* Show only the printable area */
          #printable-area, #printable-area * {
            visibility: visible;
          }

          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Hide UI buttons inside printable area */
          .print\\:hidden, button {
            display: none !important;
          }

          /* Ensure layout and colors are preserved */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            background: white !important;
          }

          .bg-surface { background-color: #f9f9fb !important; }
          .bg-surface-2 { background-color: #f1f1f4 !important; }
          .bg-purple-dim { background-color: rgba(124, 58, 237, 0.08) !important; }
          .text-purple { color: #7c3aed !important; }
          
          .grid {
            display: grid !important;
          }
          
          .shadow-premium, .shadow-hover { 
            box-shadow: none !important; 
            border: 1px solid #eee !important; 
          }

          /* Fix for layout columns */
          .lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .lg\\:col-span-2 {
            grid-column: span 2 / span 2 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
