'use client';

import { useState } from 'react';
import { triggerDiscovery } from '@/lib/vendors';

const NICHES = [
  'wedding photographer',
  'wedding planner',
  'bridal makeup artist',
  'wedding decorator',
  'wedding videographer',
  'MC / host',
  'cake vendor'
];

const LOCATIONS = [
  'Lagos',
  'Abuja',
  'Port Harcourt'
];

export default function AdminDashboard() {
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const result = await triggerDiscovery(selectedNiche, selectedLocation);
    
    if (result.error) {
      setStatus('error');
      setMessage(result.error);
    } else {
      setStatus('success');
      setMessage(result.message);
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-serif font-black text-charcoal mb-4">Discovery Operations</h1>
        <p className="text-gray-500 font-medium">Trigger and monitor the Grin Intelligence Engine discovery jobs.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Trigger Card */}
        <section className="bg-white p-8 border border-gray-100 shadow-premium">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-50 pb-4">
            New Discovery Job
          </h2>

          <form onSubmit={handleTrigger} className="space-y-6">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                Niche Sector
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-plum transition-colors appearance-none"
              >
                {NICHES.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                Target Hub
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-plum transition-colors appearance-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-charcoal text-white p-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-plum transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'INITIALIZING ENGINE...' : 'TRIGGER DISCOVERY'}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 text-[10px] font-black uppercase tracking-widest border ${
              status === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
            }`}>
              {status === 'success' && <span className="mr-2">✓</span>}
              {message}
            </div>
          )}
        </section>

        {/* Info Card */}
        <section className="space-y-8">
          <div className="bg-plum/5 p-8 border border-plum/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-plum mb-4">Operations Manual</h3>
            <ul className="space-y-4 text-[11px] font-medium text-gray-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-plum font-black">01</span>
                <span>Select a niche and location to begin the automated scraping process.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-plum font-black">02</span>
                <span>The engine will search Instagram for matching hashtags and profiles.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-plum font-black">03</span>
                <span>Data is processed and vendors are ranked using the proprietary engagement algorithm.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-plum font-black">04</span>
                <span>New vendors will automatically appear in the public indices once verified.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 border border-gray-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Engine Status</h3>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">All Systems Operational</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
