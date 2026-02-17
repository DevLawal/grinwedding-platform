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
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Join the Newsletter
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Join <span className="font-semibold text-gray-900">10,000+</span> couples getting data-driven wedding insights.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className="text-xs text-green-600 mt-2">
          Thanks for subscribing!
        </p>
      )}
    </div>
  );
}
