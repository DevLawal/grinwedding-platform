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
      className="text-center max-w-4xl mx-auto py-16 px-6"
    >
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-2 rounded-full mb-8"
      >
        <ShieldCheck className="w-4 h-4 text-purple-600" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">Enterprise Grade Planning</span>
      </motion.div>

      {/* Hero Headline */}
      <h1 className="text-5xl md:text-7xl font-serif font-black text-black mb-8 leading-[1.05] tracking-tight">
        Plan Your Wedding<br />Without the Stress.
      </h1>

      {/* Value Proposition */}
      <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
        Get a realistic, personalized budget breakdown for your wedding. 
        Our proprietary algorithm adapts to Nigerian and African market realities, 
        detecting hidden costs before they arise.
      </p>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-xs font-black uppercase tracking-[0.1em] text-gray-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-600" />
          <span>Used by 10,000+ planners</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-600" />
          <span>Verified Market Data</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-600" />
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
            className="bg-white p-8 border border-gray-100 shadow-premium hover:shadow-hover transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-black mb-3">{feat.title}</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
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
        className="group bg-black text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-purple-600 transition-all shadow-2xl flex items-center gap-4 mx-auto"
      >
        Start Executive Analysis
        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </motion.button>

      {/* Time Estimate */}
      <p className="text-[10px] font-bold text-gray-400 mt-8 uppercase tracking-widest">
        Average completion time: 180 seconds
      </p>
    </motion.div>
  );
}
