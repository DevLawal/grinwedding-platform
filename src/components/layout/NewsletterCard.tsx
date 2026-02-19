'use client';

import { useState } from 'react';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-charcoal p-10 border border-gray-100/10">
      <div className="mb-10">
        <p className="text-white text-xl font-serif mb-4">Subscribe to Our Newsletter</p>
        <p className="text-white text-[0.85rem] font-medium leading-relaxed">
          Join <span className="text-white font-black">10,000+</span> elite planners receiving weekly intelligence on the wedding economy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER EXECUTIVE EMAIL"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full pl-4 bg-white/5 border border-white/10 px-0 py-4 text-white text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-plum transition-colors disabled:opacity-50 border-x-0 border-t-0 border-b-[1px]"
        />
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-white text-charcoal px-4 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-plum hover:text-white transition-all disabled:bg-gray-800"
        >
          {status === 'loading' ? 'PROCESSING...' : status === 'success' ? '✓ SYSTEM SYNCED' : 'SUBSCRIBE TO INTEL'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-8 flex items-center gap-3 text-plum font-black text-[9px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-plum rounded-full animate-pulse" />
          Transmission successful.
        </div>
      )}
    </div>
  );
}
