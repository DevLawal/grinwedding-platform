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
    <div
      className="p-8 relative overflow-hidden"
      style={{
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '2px',
      }}
    >
      {/* Purple top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #c4b5fd, #a78bfa, #c4b5fd)' }}
      />

      {/* Subtle purple glow */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% -20%, rgba(167,139,250,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="mb-6 relative">
        <p className="font-serif text-lg font-bold mb-2" style={{ color: '#f0f0f2' }}>
          Weekly Intelligence
        </p>
        <p className="text-[0.82rem] font-medium leading-relaxed" style={{ color: '#6b6b75' }}>
          Join <span style={{ color: '#c4b5fd', fontWeight: 800 }}>10,000+</span> planners receiving curated wedding market insights.
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
          className="w-full py-3 px-4 text-[11px] font-bold tracking-widest uppercase focus:outline-none transition-all disabled:opacity-40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f0f0f2',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(196,181,253,0.5)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full py-3 px-4 text-[11px] font-bold tracking-widest uppercase focus:outline-none transition-all disabled:opacity-40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f0f0f2',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(196,181,253,0.5)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50"
          style={{
            background: status === 'success' ? 'rgba(196,181,253,0.15)' : '#c4b5fd',
            color: status === 'success' ? '#c4b5fd' : '#0d0d0d',
          }}
        >
          {status === 'loading' ? 'Processing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe →'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest" style={{ color: '#c4b5fd' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c4b5fd' }} />
          Transmission confirmed.
        </div>
      )}
    </div>
  );
}
