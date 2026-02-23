import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Wallet, TrendingUp, AlertTriangle, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { City } from '@/lib/calculator/types';
import { COST_PER_GUEST_RANGES, CITY_NAMES } from '@/lib/calculator/constants';

interface GuestBudgetStepProps {
  city: City;
  guestCount: number;
  totalBudget: number | undefined;
  onGuestCountChange: (count: number) => void;
  onTotalBudgetChange: (budget: number | undefined) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GuestBudgetStep({
  city,
  guestCount,
  totalBudget,
  onGuestCountChange,
  onTotalBudgetChange,
  onNext,
  onBack,
}: GuestBudgetStepProps) {
  const [budgetInput, setBudgetInput] = useState(totalBudget?.toString() || '');
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);

  const costPerGuest = totalBudget && guestCount > 0 ? totalBudget / guestCount : 0;
  const costRange = COST_PER_GUEST_RANGES[city];
  const avgCostPerGuest = (costRange.min + costRange.max) / 2;

  useEffect(() => {
    if (totalBudget && guestCount > 0) {
      const cpg = totalBudget / guestCount;
      setShowBudgetWarning(cpg < costRange.min);
    } else {
      setShowBudgetWarning(false);
    }
  }, [totalBudget, guestCount, costRange.min]);

  const handleBudgetChange = (value: string) => {
    setBudgetInput(value);
    if (value === '') {
      onTotalBudgetChange(undefined);
    } else {
      const numValue = parseInt(value.replace(/,/g, ''), 10);
      if (!isNaN(numValue)) {
        onTotalBudgetChange(numValue);
      }
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();
  const canProceed = guestCount > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto px-6 pb-12"
    >
      {/* Progress Indicator */}
      <div className="mb-10 md:mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">Phase 02</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-text">Capital Projection</h2>
          </div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-dim">50% Complete</p>
        </div>
        <div className="h-1 bg-surface-2 overflow-hidden">
          <motion.div 
            initial={{ width: '25%' }}
            animate={{ width: '50%' }}
            className="h-full bg-purple" 
          />
        </div>
      </div>

      <div className="space-y-10 md:space-y-12">
        {/* Guest Count */}
        <section>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Users className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
            <label htmlFor="guestCount" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text">
              Expected Volume
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              id="guestCount"
              value={guestCount || ''}
              onChange={(e) => onGuestCountChange(parseInt(e.target.value, 10) || 0)}
              placeholder="e.g., 200"
              min="1"
              className="w-full bg-surface-2 border-2 border-transparent px-5 md:px-6 py-4 md:py-6 text-xl md:text-2xl font-black text-text focus:outline-none focus:border-purple transition-all"
            />
            <span className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-text-dim">Attendees</span>
          </div>
          <p className="text-[9px] md:text-[10px] text-text-dim font-bold mt-2 uppercase tracking-tight italic">
            * Statistical variance suggests a 15% increase in final list metrics.
          </p>
        </section>

        {/* Total Budget */}
        <section>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Wallet className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
            <label htmlFor="totalBudget" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text">
              Budget Allocation <span className="text-text-dim font-bold">(Target Cap)</span>
            </label>
          </div>
          <div className="relative">
            <span className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-xl md:text-2xl font-black text-text-dim">₦</span>
            <input
              type="text"
              id="totalBudget"
              value={budgetInput}
              onChange={(e) => handleBudgetChange(e.target.value)}
              placeholder="e.g., 5,000,000"
              className="w-full bg-surface-2 border-2 border-transparent pl-10 md:pl-12 pr-5 md:pr-6 py-4 md:py-6 text-xl md:text-2xl font-black text-text focus:outline-none focus:border-purple transition-all"
            />
          </div>
          <p className="text-[9px] md:text-[10px] text-text-dim font-bold mt-2 uppercase tracking-tight px-1">
            Leave blank for automated market-derived projection in {CITY_NAMES[city].toUpperCase()}.
          </p>
        </section>

        {/* Real-time Analysis Panel */}
        <AnimatePresence>
          {guestCount > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-surface p-6 md:p-8 shadow-2xl border border-editorial relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <TrendingUp className="w-8 md:w-12 h-8 md:h-12 text-text/5 group-hover:text-purple/10 transition-colors" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-1 md:mb-2">Cost Per Head Index</p>
                  <p className="text-2xl md:text-4xl font-serif font-black text-text">
                    {totalBudget ? `₦${formatNumber(Math.round(costPerGuest))}` : 'PROJECTION'}
                  </p>
                </div>
                <div className="flex flex-col justify-end md:text-right">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-dim mb-1">{CITY_NAMES[city]} Market Range</p>
                  <p className="text-[10px] md:text-xs font-black text-purple uppercase tracking-widest">
                    ₦{formatNumber(costRange.min)} — ₦{formatNumber(costRange.max)}
                  </p>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-editorial">
                {showBudgetWarning && (
                  <div className="flex gap-3 md:gap-4 items-start text-purple">
                    <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 shrink-0" />
                    <div>
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-tight">Challenge Detected</p>
                      <p className="text-[9px] md:text-[10px] font-medium leading-relaxed uppercase tracking-tighter opacity-80">
                        Input metrics are significantly below market baseline for {CITY_NAMES[city]}.
                        Advisory: Consider volume reduction or capital expansion.
                      </p>
                    </div>
                  </div>
                )}

                {!totalBudget && (
                  <div className="flex gap-3 md:gap-4 items-start text-purple-bright">
                    <Info className="w-4 md:w-5 h-4 md:h-5 shrink-0" />
                    <div>
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-tight">Auto-Projection Active</p>
                      <p className="text-[9px] md:text-[10px] font-medium leading-relaxed uppercase tracking-tighter opacity-80">
                        Based on {guestCount} attendees, we project a functional capital requirement of approximately 
                        ₦{formatNumber(Math.round(guestCount * avgCostPerGuest))}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Suite */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-12 md:mt-16 pt-10 md:pt-12 border-t border-editorial">
        <button
          onClick={onBack}
          className="w-full sm:flex-1 px-8 py-4 md:py-5 border-2 border-text text-text text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-text hover:text-base hover:dark:text-base-dark transition-all flex items-center justify-center gap-3"
        >
          <ArrowLeft className="w-3.5 md:w-4 h-3.5 md:h-4" />
          Retreat
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full sm:flex-1 px-8 py-4 md:py-5 bg-text text-base dark:text-base-dark text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 disabled:bg-surface-2 disabled:text-text-dim disabled:opacity-50"
        >
          Proceed
          <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
        </button>
      </div>
    </motion.div>
  );
}
