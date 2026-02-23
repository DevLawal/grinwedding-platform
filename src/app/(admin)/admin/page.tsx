'use client';

import { useState, useEffect } from 'react';
import { triggerDiscovery } from '@/lib/vendors';
import ProxyImage from '@/components/ui/ProxyImage';
import { guestManagementService } from '@/lib/guest-management';

const NICHES = [
  'wedding photographer',
  'wedding planner',
  'bridal makeup artist',
  'wedding decorator',
  'wedding videographer',
  'MC / host',
  'cake vendor'
];

const LOCATIONS = ['Lagos', 'Abuja', 'Port Harcourt'];

export default function AdminDashboard() {
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [csvContent, setCsvContent] = useState('');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [rankedResults, setRankedResults] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  const [events, setEvents] = useState<any[]>([]);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    signature: '',
    date: '',
    location: '',
    rsvpCode: '',
  });
  const [isFetchingEvents, setIsFetchingEvents] = useState(false);
  const [eventFetcherError, setEventFetcherError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsFetchingEvents(true);
    setEventFetcherError(null);
    try {
      const data = await guestManagementService.getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setEventFetcherError('Connectivity error');
    } finally {
      setIsFetchingEvents(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEvent(true);
    try {
      await guestManagementService.createEvent(newEvent);
      showToast('✓ Event created successfully');
      setNewEvent({ name: '', signature: '', date: '', location: '', rsvpCode: '' });
      fetchEvents();
    } catch (err) {
      showToast('✗ Failed to create event');
      console.error(err);
    } finally {
      setIsCreatingEvent(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      const reader = new FileReader();
      reader.onload = (event) => setCsvContent(event.target?.result as string);
      reader.readAsText(file);
    } else {
      showToast('⚠ Please drop a valid .csv file');
    }
  };

  const processCsvRanking = async () => {
    if (!csvContent.trim()) return;
    setProcessingStatus('processing');
    setRankedResults([]);

    const lines = csvContent.split('\n').filter(line => line.trim());
    const results = [];

    for (const line of lines) {
      const parts = line.split(',').map(p => p.trim());
      if (!parts.length) continue;

      let name = '', handle = '', externalUrl = '';
      const handleIndex = parts.findIndex(p => p.startsWith('@'));
      const urlIndex = parts.findIndex(p => p.includes('http://') || p.includes('https://') || p.includes('.com') || p.includes('.ng'));

      if (handleIndex !== -1) {
        handle = parts[handleIndex];
        const namePart = parts.find((p, i) => i !== handleIndex && i !== urlIndex);
        name = namePart || handle.replace('@', '');
      } else if (parts.length >= 2) {
        [name, handle] = parts;
      } else {
        handle = parts[0];
        name = handle.replace('@', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }

      if (urlIndex !== -1) {
        externalUrl = parts[urlIndex].startsWith('http') ? parts[urlIndex] : `https://${parts[urlIndex]}`;
      }

      const cleanHandle = handle.replace('@', '');
      if (!cleanHandle) continue;

      try {
        const response = await fetch(`/api/instagram?handle=${encodeURIComponent(cleanHandle)}`);
        const data = await response.json();
        if (!data.error) {
          results.push({
            id: crypto.randomUUID(),
            name: name || cleanHandle,
            slug: cleanHandle,
            category: selectedNiche,
            location: selectedLocation,
            metrics: data.metrics,
            rating: Math.min(3.5 + (data.metrics.followers / 5000), 5.0),
            priceRange: '$$',
            featuredImage: data.metrics.profilePicUrl || `https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400&h=400&seed=${cleanHandle}`,
            instagramHandle: handle.startsWith('@') ? handle : `@${handle}`,
            externalUrl: externalUrl || undefined
          });
        }
      } catch (err) {
        console.error(`Failed to fetch for ${handle}`, err);
      }
    }

    results.sort((a, b) => b.metrics.followers - a.metrics.followers);
    const topResults = results.slice(0, 21);
    setRankedResults(topResults);
    setProcessingStatus('done');
    showToast(`✓ Ranked Top ${topResults.length} vendors successfully`);
  };

  const publishRankings = async () => {
    setIsPublishing(true);
    setPublishStatus('idle');
    try {
      const resolveDynamicUrl = (envUrl?: string) => {
        const defaultUrl = 'http://localhost:5000/api';
        const baseUrl = envUrl || defaultUrl;
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname;
          if ((baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) && 
              hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return baseUrl.replace('localhost', hostname).replace('127.0.0.1', hostname);
          }
        }
        return baseUrl;
      };
      const serviceUrl = resolveDynamicUrl(process.env.NEXT_PUBLIC_VENDOR_SERVICE_URL);
      const response = await fetch(`${serviceUrl}/vendors/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-secret': 'development' },
        body: JSON.stringify(rankedResults),
      });
      if (!response.ok) throw new Error('Failed to publish to database');
      const data = await response.json();
      setPublishStatus('success');
      showToast(`✓ Published ${data.count} vendors to the live index`);
    } catch (err) {
      setPublishStatus('error');
      showToast('✗ Publish failed — check console for details');
      console.error('Publish error:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const lineCount = csvContent.trim() ? csvContent.split('\n').filter(l => l.trim()).length : 0;

  return (
    <div className="w-full min-h-screen bg-base text-text font-sans">

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-surface border border-editorial px-5 py-3 text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
          {toastMessage}
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8">

        {/* Page title */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-purple/60 uppercase tracking-[0.35em] mb-2">Grin Intelligence ·  Market Ranking Terminal</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-text tracking-tight leading-[0.95] break-words">
              Vendor<br className="sm:hidden" /> <span className="text-purple/30">Indexing</span><br />
              Engine
            </h2>
          </div>
          <p className="text-[11px] text-text-dim leading-relaxed max-w-xs shrink-0">
            Ingest CSV data, cross-reference Instagram intelligence, and publish ranked vendor indices to the live product.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* ── Left Column: Config ─────────────────────── */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 sm:space-y-6">

            {/* Config card */}
            <div className="bg-surface border border-editorial overflow-hidden">
              <div className="bg-surface-2 border-b border-editorial px-5 py-3 flex items-center gap-3">
                <div className="w-1 h-4 bg-purple" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dim">01 · Configuration</h3>
              </div>
              <div className="p-5 sm:p-6 space-y-5">
                <div>
                  <label className="block text-[8px] font-black uppercase tracking-[0.25em] text-text-dim/60 mb-2">
                    Sector / Niche
                  </label>
                  <div className="relative">
                    <select
                      value={selectedNiche}
                      onChange={(e) => setSelectedNiche(e.target.value)}
                      className="w-full bg-surface-2 border border-editorial py-3 px-4 pr-8 text-[10px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors appearance-none cursor-pointer hover:border-purple/50"
                    >
                      {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-dim/40 text-xs">▾</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[8px] font-black uppercase tracking-[0.25em] text-text-dim/60 mb-2">
                    Geographic Market
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-surface-2 border border-editorial py-3 px-4 pr-8 text-[10px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors appearance-none cursor-pointer hover:border-purple/50"
                    >
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-dim/40 text-xs">▾</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats card — shows after processing */}
            {rankedResults.length > 0 && (
              <div className="bg-surface border border-editorial overflow-hidden">
                <div className="bg-surface-2 border-b border-editorial px-5 py-3 flex items-center gap-3">
                  <div className="w-1 h-4 bg-green-500" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-green-500/80">Processing Results</h3>
                </div>
                <div className="divide-y divide-editorial/40">
                  {[
                    { label: 'Vendors Ranked', value: rankedResults.length },
                    { label: 'Top Followers', value: Math.max(...rankedResults.map(v => v.metrics.followers)).toLocaleString() },
                    { label: 'Market', value: selectedLocation },
                    { label: 'Sector', value: selectedNiche.split(' ').slice(-1)[0] },
                  ].map(stat => (
                    <div key={stat.label} className="px-5 py-3 flex justify-between items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-text-dim/50">{stat.label}</span>
                      <span className="text-[11px] font-black text-text font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="bg-purple/5 border border-purple/15 p-5 space-y-3">
              <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-purple/70 mb-4">How It Works</h4>
              {[
                { tag: 'CSV', desc: 'Paste or drop: Name, @handle' },
                { tag: 'RANK', desc: 'Ranked by live follower intelligence' },
                { tag: 'LIVE', desc: 'Publishes directly to /vendors index' },
              ].map(item => (
                <div key={item.tag} className="flex items-start gap-3">
                  <span className="text-[8px] font-black text-purple/50 bg-purple/10 px-2 py-0.5 shrink-0 tracking-wider mt-0.5">{item.tag}</span>
                  <span className="text-[10px] text-text-dim leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Managed Events List (Moved Up for Mobile) */}
            <div className="bg-surface border border-editorial overflow-hidden">
              <div className="bg-surface-2 border-b border-editorial px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-4 ${events.length > 0 ? 'bg-green-500' : 'bg-editorial'}`} />
                  <h3 className="text-[10px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-text-dim">Active Managed Events</h3>
                </div>
                {isFetchingEvents && (
                  <div className="w-3 h-3 border-2 border-purple/30 border-t-purple rounded-full animate-spin" />
                )}
              </div>
              
              <div className="divide-y divide-editorial/40">
                {isFetchingEvents && events.length === 0 ? (
                  <div className="p-10 text-center space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dim/40 animate-pulse">Syncing events...</p>
                  </div>
                ) : eventFetcherError ? (
                  <div className="p-8 text-center space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500/60">{eventFetcherError}</p>
                    <button 
                      onClick={fetchEvents}
                      className="px-4 py-2 border border-editorial text-[9px] font-black uppercase tracking-widest hover:bg-surface-2"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : events.length > 0 ? (
                  events.map(event => (
                    <div key={event._id} className="px-5 py-4 flex justify-between items-center group hover:bg-surface-2 transition-colors">
                      <div className="min-w-0 pr-4">
                        <span className="text-[11px] sm:text-[10px] font-black uppercase tracking-wider text-text block truncate">{event.name}</span>
                        <span className="text-[9px] font-mono text-purple/60">/{event.signature}</span>
                      </div>
                      <a 
                        href={`/${event.signature}`} 
                        target="_blank"
                        className="text-[9px] font-black text-purple lg:opacity-0 lg:group-hover:opacity-100 transition-opacity uppercase tracking-widest border border-purple px-3 py-1.5 shrink-0 whitespace-nowrap"
                      >
                        Visit Event
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dim/30">No active events found</p>
                    <p className="text-[8px] text-text-dim/20 leading-relaxed max-w-[180px] mx-auto">Launched systems will appear here once initialized.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-surface-2/50 border-t border-editorial p-3">
                <button 
                  onClick={fetchEvents}
                  className="w-full text-center text-[8px] font-black uppercase tracking-[0.2em] text-text-dim/40 hover:text-purple transition-colors py-1"
                >
                  Force Sync Now
                </button>
              </div>
            </div>

            {/* Event Setup Board */}
            <div className="bg-surface border border-editorial overflow-hidden">
              <div className="bg-surface-2 border-b border-editorial px-5 py-3 flex items-center gap-3">
                <div className="w-1 h-4 bg-purple" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dim">03 · Event Setup</h3>
              </div>
              <form onSubmit={handleCreateEvent} className="p-6 space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[7px] font-black uppercase tracking-widest text-purple/70 ml-1">Event Name / Couple Names</label>
                    <input
                      placeholder="e.g. Adijat & Abdul"
                      value={newEvent.name}
                      onChange={e => setNewEvent({...newEvent, name: e.target.value})}
                      className="w-full bg-surface-2 border border-editorial py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[7px] font-black uppercase tracking-widest text-purple/70 ml-1">Wedding Signature (URL Slug)</label>
                    <div className="flex items-center">
                      <span className="bg-editorial/20 px-3 py-3 text-[10px] text-text-dim border border-editorial border-r-0 font-mono">/</span>
                      <input
                        placeholder="e.g. alhamdulillah-26"
                        value={newEvent.signature}
                        onChange={e => setNewEvent({...newEvent, signature: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                        className="w-full bg-surface-2 border border-editorial py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors"
                        required
                      />
                    </div>
                    <p className="text-[8px] text-text-dim/60 italic px-1">This will be the link: grinweddings.com/signature</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[7px] font-black uppercase tracking-widest text-purple/70 ml-1">Wedding Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full bg-surface-2 border border-editorial py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors appearance-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[7px] font-black uppercase tracking-widest text-purple/70 ml-1">RSVP Code (5 Digits)</label>
                      <input
                        placeholder="12345"
                        value={newEvent.rsvpCode}
                        onChange={e => setNewEvent({...newEvent, rsvpCode: e.target.value})}
                        className="w-full bg-surface-2 border border-editorial py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors"
                        required
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[7px] font-black uppercase tracking-widest text-purple/70 ml-1">Location / Venue</label>
                    <input
                      placeholder="e.g. Lagos, Nigeria"
                      value={newEvent.location}
                      onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                      className="w-full bg-surface-2 border border-editorial py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-text focus:outline-none focus:border-purple transition-colors"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isCreatingEvent}
                  className="w-full py-4 bg-purple text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple/90 transition-all transform active:scale-[0.98] shadow-lg shadow-purple/10 disabled:opacity-50"
                >
                  {isCreatingEvent ? 'Initializing System...' : 'Launch Wedding Application'}
                </button>
              </form>
            </div>
          </div>

          {/* ── Right Column: Input + Preview ───────────── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">

            {/* Input panel */}
            <div className="bg-surface border border-editorial overflow-hidden">
              <div className="bg-surface-2 border-b border-editorial px-5 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-text/30" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dim">02 · Data Ingestion</h3>
                </div>
                <div className="flex items-center gap-3">
                  {lineCount > 0 && (
                    <span className="text-[8px] font-mono text-text-dim/50 bg-editorial/30 px-2 py-1">
                      {lineCount} {lineCount === 1 ? 'entry' : 'entries'} ready
                    </span>
                  )}
                  {processingStatus === 'done' && (
                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                      Complete
                    </span>
                  )}
                  {processingStatus === 'processing' && (
                    <span className="text-[8px] font-black text-purple uppercase tracking-widest flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
                      Processing
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Textarea */}
                <div
                  className={`relative p-5 sm:p-6 border-b md:border-b-0 md:border-r border-editorial flex flex-col gap-4 transition-all duration-200 ${
                    isDragging ? 'bg-purple/5 border-purple/40' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex items-center justify-between">
                    <label className="text-[8px] font-black uppercase tracking-[0.25em] text-text-dim/60">
                      CSV Source
                    </label>
                    {isDragging && (
                      <span className="text-[8px] font-black text-purple animate-pulse uppercase tracking-wider">
                        Release to import
                      </span>
                    )}
                  </div>

                  <div className="relative flex-1">
                    <textarea
                      value={csvContent}
                      onChange={(e) => setCsvContent(e.target.value)}
                      placeholder={`Lush Florals, @lushflorals\nGrin Weddings, @grinweddings\nBella Events, @bellaevents_ng`}
                      className="w-full h-48 sm:h-64 md:h-80 bg-surface-2 border border-editorial p-4 font-mono text-[11px] text-text/90 focus:outline-none focus:border-purple/60 transition-colors resize-none leading-relaxed placeholder:text-text-dim/20 rounded-none"
                    />
                    {!csvContent && !isDragging && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center space-y-1 opacity-20">
                          <div className="text-2xl">↓</div>
                          <p className="text-[9px] font-black uppercase tracking-widest">Drag & Drop CSV</p>
                          <p className="text-[7px] tracking-wider">or paste content above</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={processCsvRanking}
                    disabled={processingStatus === 'processing' || !csvContent.trim()}
                    className="w-full py-4 px-6 text-[9px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden
                      bg-text text-base hover:bg-purple hover:text-white"
                  >
                    {processingStatus === 'processing' ? (
                      <>
                        <div className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        Analyzing Market Data...
                      </>
                    ) : (
                      <>
                        Execute Ranking Engine
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preview / Results */}
                <div className="flex flex-col bg-surface-2">
                  <div className="border-b border-editorial/30 px-5 py-3 flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-widest text-text-dim/40">
                      {rankedResults.length > 0 ? 'Ranked Output' : 'Awaiting Data'}
                    </span>
                    {rankedResults.length > 0 && (
                      <span className="text-[8px] font-mono text-purple/50">{rankedResults.length} entries</span>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto" style={{ maxHeight: '360px' }}>
                    {rankedResults.length > 0 ? (
                      <table className="w-full text-left">
                        <thead className="sticky top-0 bg-surface border-b border-editorial/30 z-10">
                          <tr className="text-[7px] uppercase font-black tracking-widest text-text-dim/40">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-2">Vendor</th>
                            <th className="py-3 px-4 text-right">Followers</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-editorial/10">
                          {rankedResults.map((v, i) => (
                            <tr key={v.id} className="group hover:bg-surface/50 transition-colors">
                              <td className="py-3 px-4 font-mono text-[9px] text-purple/40 shrink-0">
                                {String(i + 1).padStart(2, '0')}
                              </td>
                              <td className="py-3 px-2">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 bg-surface border border-editorial/50 overflow-hidden">
                                    <ProxyImage
                                      src={v.featuredImage}
                                      alt={v.name || ''}
                                      className="object-cover w-full h-full"
                                      fallbackLetter={(v.name || '?').charAt(0)}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-text block truncate max-w-[90px] sm:max-w-[130px]">
                                      {v.name}
                                    </span>
                                    <span className="text-[7px] font-black text-purple/40 block truncate">
                                      {v.instagramHandle}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right shrink-0">
                                <span className="font-mono text-[9px] text-text/70">
                                  {v.metrics.followers.toLocaleString()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="h-full min-h-[200px] flex flex-col items-center justify-center gap-3 p-8 text-center">
                        <div className="w-10 h-10 border border-editorial/30 flex items-center justify-center opacity-30">
                          <span className="font-serif text-lg italic text-text">∅</span>
                        </div>
                        <p className="text-[8px] uppercase font-black tracking-[0.2em] text-text-dim/30 leading-relaxed">
                          Queue data for<br />intel processing
                        </p>
                      </div>
                    )}
                  </div>

                  {rankedResults.length > 0 && (
                    <div className="p-4 sm:p-5 bg-surface/50 border-t border-editorial/30 space-y-3">
                      <button
                        onClick={publishRankings}
                        disabled={isPublishing}
                        className={`w-full py-4 text-[9px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2
                          ${publishStatus === 'success'
                            ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-base'
                            : publishStatus === 'error'
                            ? 'border-red-500/70 text-red-400 hover:bg-red-500/10'
                            : 'border-text text-text hover:bg-text hover:text-base'
                          }`}
                      >
                        {isPublishing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            Publishing...
                          </>
                        ) : publishStatus === 'success' ? (
                          '✓ Published to Live Index'
                        ) : publishStatus === 'error' ? (
                          '✗ Retry Publish'
                        ) : (
                          'Publish to Product Frontend →'
                        )}
                      </button>
                      <p className="text-center text-[7px] font-black text-text-dim/30 uppercase tracking-widest">
                        Destination: /vendors index · {rankedResults.length} vendors
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Debug / Diagnostic Panel (Toggleable) */}
        <div className="border-t border-editorial/30 pt-6 flex flex-col gap-6">
          <details className="group">
            <summary className="text-[8px] font-black uppercase tracking-widest text-text-dim/30 cursor-pointer hover:text-purple transition-colors list-none flex items-center gap-2">
              <span className="group-open:rotate-90 transition-transform">→</span>
              System Diagnostics
            </summary>
            <div className="mt-4 p-4 bg-surface-2 border border-editorial font-mono text-[8px] space-y-2 text-text-dim/60">
              <p>Resolved API Endpoint: {process.env.NEXT_PUBLIC_VENDOR_SERVICE_URL || 'Dynamic Resolution'}</p>
              <p>Current Client Host: {mounted ? window.location.hostname : 'Syncing...'}</p>
              <p>User Agent: {mounted ? navigator.userAgent : 'Syncing...'}</p>
              <p>Active Events Count: {events.length}</p>
            </div>
          </details>

          <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[8px] font-black uppercase tracking-widest text-text-dim/30">
            <span>Grin Intelligence Terminal · Internal Use Only</span>
            <span className="font-mono">Lagos · Abuja · Port Harcourt Hubs</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
