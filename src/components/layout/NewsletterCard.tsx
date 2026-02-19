'use client';

import { useState } from 'react';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-black text-white p-8 md:p-10 sticky top-24 shadow-2xl border border-white/5 overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
      
      <h3 className="text-2xl font-serif font-black mb-4 relative z-10">
        Intel Alert
      </h3>
      <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed relative z-10">
        Join <span className="text-white font-black">10,000+</span> elite planners receiving weekly data-driven wedding insights.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER EXECUTIVE EMAIL"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-white/5 border border-white/10 px-4 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50"
        />
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-purple-600 text-white px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:bg-gray-800"
        >
          {status === 'loading' ? 'Processing...' : status === 'success' ? '✓ Data Synced' : 'Subscribe to Intel'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-6 flex items-center gap-2 text-purple-500 font-black text-[10px] uppercase tracking-widest animate-pulse">
          <span className="w-2 h-2 bg-purple-600 rounded-full" />
          Transmission Successful
        </div>
      )}
    </div>
  );
}
