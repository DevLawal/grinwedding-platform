'use client';

import { useState } from 'react';

export default function NewsletterCard() {
  const [name, setName] = useState('');
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
    <div className="p-8 relative overflow-hidden bg-surface border border-editorial rounded-[2px] shadow-premium">
      {/* Purple top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple/50 via-purple to-purple/50" />

      {/* Subtle purple glow */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none purple-glow-bg opacity-30" />

      <div className="mb-6 relative">
        <p className="font-serif text-lg font-bold mb-2 text-text">
          Weekly Intelligence
        </p>
        <p className="text-[0.82rem] font-medium leading-relaxed text-text-muted">
          Join <span className="text-purple font-black">10,000+</span> planners receiving curated wedding market insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full py-3 px-4 text-[11px] font-bold tracking-widest uppercase focus:outline-none transition-all disabled:opacity-40 bg-surface-2 border border-editorial text-text focus:border-purple/50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full py-3 px-4 text-[11px] font-bold tracking-widest uppercase focus:outline-none transition-all disabled:opacity-40 bg-surface-2 border border-editorial text-text focus:border-purple/50"
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50 ${
            status === 'success' ? 'bg-purple/15 text-purple' : 'bg-purple text-base dark:text-base-dark'
          }`}
        >
          {status === 'loading' ? 'Processing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe →'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-purple">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-purple" />
          Transmission confirmed.
        </div>
      )}
    </div>
  );
}
