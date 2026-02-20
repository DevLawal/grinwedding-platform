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
      className="max-w-3xl pt-18 md:pt-8 mx-auto px-6"
    >
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">Phase 01</span>
            <h2 className="text-2xl font-serif font-black text-white">Foundation Metrics</h2>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted">25% Complete</p>
        </div>
        <div className="h-1 bg-surface-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            className="h-full bg-purple" 
          />
        </div>
      </div>

      <div className="space-y-12">
        {/* City Selection */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-purple" />
            <label htmlFor="city" className="text-sm font-black uppercase tracking-widest text-white">
              Geographic Intersection
            </label>
          </div>
          <select
            id="city"
            value={city}
            onChange={(e) => onCityChange(e.target.value as City)}
            className="w-full bg-surface-2 border-2 border-transparent px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-purple transition-all appearance-none cursor-pointer"
          >
            {Object.entries(CITY_NAMES).map(([value, label]) => (
              <option key={value} value={value} className="bg-surface text-white">
                {label.toUpperCase()} Market
              </option>
            ))}
          </select>
          <p className="text-[10px] text-muted font-bold mt-2 uppercase tracking-tight italic">
            * Market rates fluctuate based on municipal demand and vendor density.
          </p>
        </section>

        {/* Wedding Type */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-purple" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Ceremonial Scope</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(WEDDING_TYPE_NAMES).map(([value, label]) => {
              const isActive = weddingType === value;
              return (
                <button
                  key={value}
                  onClick={() => onWeddingTypeChange(value as WeddingType)}
                  className={`p-6 border-2 text-left transition-all group ${
                    isActive ? 'border-purple bg-purple-dim shadow-2xl scale-[1.02]' : 'border-editorial hover:border-purple-dim bg-surface'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${isActive ? 'bg-purple text-white' : 'bg-surface-2 text-muted group-hover:bg-purple-dim group-hover:text-purple'}`}>
                    {value === 'traditional' && <Heart className="w-4 h-4" />}
                    {value === 'white' && <Church className="w-4 h-4" />}
                    {value === 'both' && <Layout className="w-4 h-4" />}
                  </div>
                  <div className={`font-black text-xs uppercase tracking-widest mb-2 ${isActive ? 'text-white' : 'text-muted'}`}>{label}</div>
                  <div className={`text-[10px] font-medium leading-relaxed ${isActive ? 'text-white/70' : 'text-muted/60'}`}>
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
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-purple" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Volume & Prestige</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
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
                  className={`p-6 border-2 text-left transition-all ${
                    isActive ? 'border-purple bg-purple-dim shadow-2xl scale-[1.02]' : 'border-editorial hover:border-purple-dim bg-surface'
                  }`}
                >
                  <div className={`font-black text-xs uppercase tracking-[0.15em] mb-1 ${isActive ? 'text-white' : 'text-muted'}`}>{scale.label}</div>
                  <div className={`text-[10px] font-bold ${isActive ? 'text-purple' : 'text-muted/60'}`}>
                    {scale.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
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
          Proceed
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
