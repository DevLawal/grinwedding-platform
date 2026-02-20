import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, AlertCircle, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-4xl mx-auto pt-24 md:pt-14 px-6"
    >
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-purple-dim border border-purple-dim px-4 py-2 rounded-full mb-8"
      >
        <ShieldCheck className="w-4 h-4 text-purple" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">Enterprise Grade Planning</span>
      </motion.div>

      {/* Hero Headline */}
      <h1 className="text-3xl md:text-4xl font-serif font-black text-text mb-8 leading-[1.05] tracking-tight">
        Plan Your Wedding<br /> Without the Stress.
      </h1>

      {/* Value Proposition */}
      <p className="text-xl text-text-muted mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
        Our proprietary algorithm adapts to Nigerian and African market realities, 
        detecting hidden costs before they arise.
      </p>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-xs font-black uppercase tracking-[0.1em] text-text-dim">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple" />
          <span>Used by 10,000+ planners</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple" />
          <span>Verified Market Data</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple" />
          <span>Zero Commission</span>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
        {[
          {
            icon: DollarSign,
            title: "Market Estimates",
            description: "Breakdowns derived from current wedding costs in your specific city."
          },
          {
            icon: AlertCircle,
            title: "Anomaly Alerts",
            description: "Identify and mitigate expenses that couples often fail to project."
          },
          {
            icon: Lightbulb,
            title: "Strategic Insights",
            description: "High-impact tips to optimize spend without sacrificing prestige."
          }
        ].map((feat, idx) => (
          <motion.div 
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="bg-surface p-8 border border-editorial shadow-premium hover:shadow-hover transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple group-hover:text-base dark:group-hover:text-base-dark transition-colors">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-text mb-3">{feat.title}</h3>
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              {feat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="group bg-text text-base dark:text-base-dark px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all shadow-2xl flex items-center gap-4 mx-auto"
      >
        Start Executive Analysis
        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </motion.button>

      {/* Time Estimate */}
      <p className="text-[10px] font-bold text-text-dim mt-8 uppercase tracking-widest">
        Average completion time: 180 seconds
      </p>
    </motion.div>
  );
}
