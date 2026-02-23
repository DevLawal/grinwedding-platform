import { motion } from 'framer-motion';
import { MapPin, Church, Heart, Users, Zap, Layout, ArrowLeft, ArrowRight } from 'lucide-react';
import { City, WeddingType, WeddingScale } from '@/lib/calculator/types';
import { CITY_NAMES, WEDDING_TYPE_NAMES } from '@/lib/calculator/constants';

interface WeddingBasicsStepProps {
  city: City;
  weddingType: WeddingType;
  weddingScale: WeddingScale;
  onCityChange: (city: City) => void;
  onWeddingTypeChange: (type: WeddingType) => void;
  onWeddingScaleChange: (scale: WeddingScale) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WeddingBasicsStep({
  city,
  weddingType,
  weddingScale,
  onCityChange,
  onWeddingTypeChange,
  onWeddingScaleChange,
  onNext,
  onBack,
}: WeddingBasicsStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl pt-12 md:pt-8 mx-auto px-6 pb-12"
    >
      {/* Progress Indicator */}
      <div className="mb-10 md:mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">Phase 01</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-text">Foundation Metrics</h2>
          </div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-dim">25% Complete</p>
        </div>
        <div className="h-1 bg-surface-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            className="h-full bg-purple" 
          />
        </div>
      </div>

      <div className="space-y-10 md:space-y-12">
        {/* City Selection */}
        <section>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <MapPin className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
            <label htmlFor="city" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text">
              Geographic Intersection
            </label>
          </div>
          <select
            id="city"
            value={city}
            onChange={(e) => onCityChange(e.target.value as City)}
            className="w-full bg-surface-2 border-2 border-transparent px-5 md:px-6 py-4 text-[13px] md:text-sm font-bold text-text focus:outline-none focus:border-purple transition-all appearance-none cursor-pointer"
          >
            {Object.entries(CITY_NAMES).map(([value, label]) => (
              <option key={value} value={value} className="bg-surface text-text">
                {label.toUpperCase()} Market
              </option>
            ))}
          </select>
          <p className="text-[9px] md:text-[10px] text-text-dim font-bold mt-2 uppercase tracking-tight italic">
            * Market rates fluctuate based on municipal demand and vendor density.
          </p>
        </section>

        {/* Wedding Type */}
        <section>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Zap className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text">Ceremonial Scope</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(WEDDING_TYPE_NAMES).map(([value, label]) => {
              const isActive = weddingType === value;
              return (
                <button
                  key={value}
                  onClick={() => onWeddingTypeChange(value as WeddingType)}
                  className={`p-5 md:p-6 border-2 text-left transition-all group ${
                    isActive ? 'border-purple bg-purple-dim shadow-2xl scale-[1.02]' : 'border-editorial hover:border-purple-dim bg-surface'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${isActive ? 'bg-purple text-base dark:text-base-dark' : 'bg-surface-2 text-text-dim group-hover:bg-purple-dim group-hover:text-purple'}`}>
                    {value === 'traditional' && <Heart className="w-4 h-4" />}
                    {value === 'white' && <Church className="w-4 h-4" />}
                    {value === 'both' && <Layout className="w-4 h-4" />}
                  </div>
                  <div className={`font-black text-[11px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 ${isActive ? 'text-text' : 'text-text-dim'}`}>{label}</div>
                  <div className={`text-[10px] font-medium leading-relaxed ${isActive ? 'text-text/70' : 'text-text-dim/60'}`}>
                    {value === 'traditional' && 'Native cultural rites only'}
                    {value === 'white' && 'Modern religious/legal ceremony'}
                    {value === 'both' && 'Full multi-day hybrid experience'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Wedding Scale */}
        <section>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Users className="w-3.5 md:w-4 h-3.5 md:h-4 text-purple" />
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text">Volume & Prestige</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'intimate', label: 'Selective', desc: '< 100 Guests' },
              { id: 'standard', label: 'Conventional', desc: '100-300 Guests' },
              { id: 'luxury', label: 'Enterprise', desc: '300+ Guests' },
            ].map((scale) => {
              const isActive = weddingScale === scale.id;
              return (
                <button
                  key={scale.id}
                  onClick={() => onWeddingScaleChange(scale.id as WeddingScale)}
                  className={`p-5 md:p-6 border-2 text-left transition-all ${
                    isActive ? 'border-purple bg-purple-dim shadow-2xl scale-[1.02]' : 'border-editorial hover:border-purple-dim bg-surface'
                  }`}
                >
                  <div className={`font-black text-[11px] md:text-xs uppercase tracking-[0.15em] mb-1 ${isActive ? 'text-text' : 'text-text-dim'}`}>{scale.label}</div>
                  <div className={`text-[10px] font-bold ${isActive ? 'text-purple' : 'text-text-dim/60'}`}>
                    {scale.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
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
          className="w-full sm:flex-1 px-8 py-4 md:py-5 bg-text text-base dark:text-base-dark text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3"
        >
          Proceed
          <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
        </button>
      </div>
    </motion.div>
  );
}
