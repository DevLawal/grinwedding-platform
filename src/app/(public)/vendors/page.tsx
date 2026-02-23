'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Vendor } from '@/types/vendor';
import ProxyImage from '@/components/ui/ProxyImage';


const CATEGORIES = ['Market All', 'Venues', 'Photography', 'Planners', 'Catering', 'Floral', 'Makeup', 'Music & MC'];

const CATEGORY_MAP: Record<string, string[]> = {
    'Photography': ['wedding photographer', 'photography', 'videographer'],
    'Venues': ['venue', 'hall'],
    'Planners': ['wedding planner', 'planner', 'coordinator'],
    'Catering': ['cake', 'food', 'catering'],
    'Floral': ['decorator', 'florist', 'floral'],
    'Makeup': ['makeup', 'bridal makeup artist', 'mua'],
    'Music & MC': ['mc', 'host', 'band', 'dj']
};

export default function VendorsPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [activeFilter, setActiveFilter] = useState('Market All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadVendors() {
            try {
                const response = await fetch('/api/vendors');
                const data = await response.json();
                console.log(`[CLIENT DEBUG] Loaded ${Array.isArray(data) ? data.length : 'NOT AN ARRAY'} vendors`, data);
                setVendors(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to load vendors:', error);
            } finally {
                setLoading(false);
            }
        }
        loadVendors();
    }, []);

    const filteredVendors = activeFilter === 'Market All' 
        ? vendors 
        : vendors.filter(v => {
            const normalizedCategory = (v.category || '').toLowerCase();
            const keywords = CATEGORY_MAP[activeFilter] || [activeFilter.toLowerCase()];
            return keywords.some(kw => normalizedCategory.includes(kw));
        });

    return (
        <div className="bg-base min-h-screen py-16 md:py-24 px-4 md:px-12 lg:px-20">
            <div className="w-full max-w-none">
                {/* Authority Header */}
                <header className="mb-12 md:mb-20 border-b border-editorial pb-10 md:pb-16 max-w-4xl">
                    <h1 className="text-4xl md:text-7xl font-serif font-black text-text mb-6 md:mb-8 tracking-tight leading-tight">
                        Vendor Indices.
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed font-medium">
                        Nigeria's authoritative database of elite wedding professionals, ranked through high-fidelity engagement analysis and market verification.
                        <br />
                        <span className="text-[9px] md:text-[10px] font-black text-text-dim uppercase tracking-[0.3em] md:tracking-[0.4em] mt-6 md:mt-8 block">
                            Last Intel Update: {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </p>
                </header>

                {/* Categories - Clinical Tabs */}
                <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10 mb-12 md:mb-16 border-b border-editorial pb-2 md:pb-6 overflow-x-auto no-scrollbar scroll-smooth">
                    {CATEGORIES.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all pb-4 whitespace-nowrap ${activeFilter === filter
                                ? 'text-text border-b-2 border-purple translate-y-[1px]'
                                : 'text-text-dim hover:text-text hover:translate-y-[-1px]'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* The Data Terminal Table / Cards */}
                <div className="bg-surface border border-editorial overflow-hidden shadow-premium">
                    {loading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-2 border-purple border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Accessing Intel Core...</span>
                        </div>
                    ) : filteredVendors.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-2/50 border-b border-editorial text-[9px] uppercase font-black tracking-[0.25em] text-text-dim">
                                            <th className="py-6 px-10 w-24 text-center">Rank</th>
                                            <th className="py-6 px-10">Entity & Sector</th>
                                            <th className="py-6 px-10">Instagram Handle</th>
                                            <th className="py-6 px-10 w-40 text-right">Access</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-editorial">
                                        {filteredVendors.map((vendor, index) => (
                                            <tr key={vendor.id} className="group hover:bg-surface-2 transition-all duration-300">
                                                <td className="py-10 px-10 font-mono text-text-dim/30 font-black text-xl group-hover:text-purple transition-colors text-center">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="py-10 px-10">
                                                    <div className="flex items-center gap-8">
                                                        <div className="w-16 h-16 relative bg-surface-2 border border-editorial overflow-hidden shrink-0 shadow-sm">
                                                              <ProxyImage
                                                                  src={vendor.featuredImage}
                                                                  alt={vendor.name || ''}
                                                                  className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                                                                  fallbackLetter={(vendor.name || '?').charAt(0)}
                                                              />
                                                        </div>
                                                        <div>
                                                            <div className="block text-[1rem] font-black text-text uppercase tracking-[0.15em] mb-1 leading-tight">
                                                                {vendor.name}
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[9px] font-black text-text-dim uppercase tracking-widest bg-editorial/20 px-1.5 py-0.5">
                                                                    {vendor.category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-10">
                                                    {vendor.instagramHandle ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black uppercase text-text-dim tracking-widest mb-1 opacity-50">Authorized Instagram</span>
                                                            <span className="text-sm font-black text-purple uppercase tracking-widest">
                                                                {vendor.instagramHandle}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] font-black text-text-dim uppercase tracking-widest opacity-30">PENDING VERIFICATION</span>
                                                    )}
                                                </td>
                                                <td className="py-10 px-10 text-right">
                                                    <div className="flex flex-col items-end gap-3">
                                                        {vendor.externalUrl ? (
                                                            <a 
                                                                href={vendor.externalUrl} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-[10px] font-black text-text hover:text-purple transition-all border-b border-text hover:border-purple pb-1 uppercase tracking-widest"
                                                            >
                                                                Visit Website ↗
                                                            </a>
                                                        ) : (
                                                            <span className="text-[9px] font-black text-text-dim/30 uppercase tracking-widest italic">Digital Only</span>
                                                        )}
                                                        <span className="text-[9px] font-mono text-text-dim/40">{vendor.priceRange} Premium Index</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-editorial">
                                {filteredVendors.map((vendor, index) => (
                                    <div key={vendor.id} className="p-8 group hover:bg-surface-2 transition-colors">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="font-mono text-purple font-black text-lg">
                                                #{String(index + 1).padStart(2, '0')}
                                            </span>
                                            {vendor.externalUrl && (
                                                <a 
                                                    href={vendor.externalUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-[9px] font-black text-text border border-editorial px-3 py-1 uppercase tracking-widest"
                                                >
                                                    Website ↗
                                                </a>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-6 mb-8">
                                            <div className="w-20 h-20 relative bg-surface-2 border border-editorial overflow-hidden shrink-0 shadow-sm">
                                                <ProxyImage
                                                    src={vendor.featuredImage}
                                                    alt={vendor.name || ''}
                                                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                                                    fallbackLetter={(vendor.name || '?').charAt(0)}
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="block text-base font-black text-text uppercase tracking-widest mb-1.5 leading-tight">
                                                    {vendor.name}
                                                </div>
                                                <div className="text-[9px] font-black text-purple uppercase tracking-widest mb-2">
                                                    {vendor.category} Sector
                                                </div>
                                                <div className="bg-editorial/10 px-2 py-2 border-l-2 border-purple">
                                                    <span className="text-[8px] font-black text-text-dim uppercase tracking-widest block mb-0.5 opacity-60">Instagram Handle</span>
                                                    <span className="text-[10px] font-black text-text uppercase tracking-widest">{vendor.instagramHandle}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-editorial/30">
                                            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">
                                                {vendor.priceRange} Segment
                                            </span>
                                            <div 
                                                className="bg-text text-base px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-50"
                                            >
                                                Verified Ranking
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-32 flex flex-col items-center justify-center text-center px-8">
                            <div className="w-16 h-16 border border-editorial rounded-full flex items-center justify-center opacity-20 mb-6 font-serif italic text-2xl text-text">!</div>
                            <h3 className="text-lg font-serif font-black text-text mb-2">No Rankings Found</h3>
                            <p className="text-[10px] uppercase font-black tracking-widest text-text-dim max-w-xs leading-relaxed">
                                Our intelligence engine has not yet verified rankings for the {activeFilter} sector.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-16 text-[10px] font-black text-text-dim uppercase tracking-[0.4em] text-center border-t border-editorial/20 pt-10">
                    &copy; {new Date().getFullYear()} GRIN Weddings Intel Terminal &bull; Proprietary Market Data
                </div>
            </div>
        </div>
    );
}
