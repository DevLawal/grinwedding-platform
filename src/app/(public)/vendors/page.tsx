import Link from 'next/link';
import { getVendors } from '@/lib/vendors';

export const metadata = {
    title: 'Vendor Indices | Grin Weddings Authority',
    description: 'The authoritative database of high-performance wedding vendors in Nigeria. Ranked by real market activity.',
};

export const revalidate = 3600;

export default async function VendorsPage() {
    const vendors = await getVendors();

    return (
        <div className="bg-base min-h-screen py-24">
            <div className="container">
                {/* Authority Header */}
                <header className="mb-20 border-b border-editorial pb-16 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 tracking-tight">
                        Vendor Indices.
                    </h1>
                    <p className="text-xl text-muted leading-relaxed font-medium">
                        A proprietary database of elite wedding professionals, ranked through high-fidelity engagement analysis and market verification.
                        <br />
                        <span className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mt-8 block">
                            Last Intel Update: {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </span>
                    </p>
                </header>

                {/* Categories - Clinical */}
                <div className="flex flex-wrap gap-10 mb-16 border-b border-editorial pb-6 overflow-x-auto no-scrollbar">
                    {['Market All', 'Venues', 'Photography', 'Florists', 'Planners'].map((filter) => (
                        <button
                            key={filter}
                            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors pb-4 ${filter === 'Market All'
                                ? 'text-white border-b-2 border-purple'
                                : 'text-muted hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* The Data Terminal Table */}
                <div className="bg-surface border border-editorial overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-2/50 border-b border-editorial text-[9px] uppercase font-black tracking-[0.25em] text-muted">
                                <th className="py-5 px-8 w-24">Rank</th>
                                <th className="py-5 px-8">Entity & Sector</th>
                                <th className="py-5 px-8 w-40 text-center">Market Rating</th>
                                <th className="py-5 px-8 w-56">Primary Hub</th>
                                <th className="py-5 px-8 w-40 text-right">Segment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-editorial">
                            {vendors.map((vendor, index) => (
                                <tr key={vendor.id} className="group hover:bg-surface-2 transition-all duration-300">
                                    <td className="py-8 px-8 font-mono text-muted/30 font-black text-lg group-hover:text-white transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="py-8 px-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 relative bg-surface-2 border border-editorial overflow-hidden shrink-0">
                                                <img
                                                    src={vendor.featuredImage}
                                                    alt=""
                                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                                />
                                            </div>
                                            <div>
                                                <Link href={`/vendors/${vendor.slug}`} className="block text-[0.9rem] font-black text-white hover:text-purple transition-all uppercase tracking-widest mb-1 leading-tight">
                                                    {vendor.name}
                                                </Link>
                                                <span className="text-[9px] font-black text-muted uppercase tracking-widest">
                                                    {vendor.category} Sector
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-8 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-lg font-mono font-black text-white">{(vendor.rating || 0).toFixed(1)}</span>
                                            <span className="text-[8px] uppercase text-muted font-black tracking-[0.2em]">Scale / 5.0</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-8 text-muted text-[10px] font-black uppercase tracking-widest">
                                        {vendor.location}
                                    </td>
                                    <td className="py-8 px-8 text-right font-mono text-[10px] font-black text-muted uppercase tracking-widest">
                                        {vendor.priceRange} Segment
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12 text-[9px] font-black text-muted uppercase tracking-[0.3em] text-center">
                    Data verified via the Grin Intelligence Engine &bull; {new Date().getFullYear()} GRIN INTEL
                </div>
            </div>
        </div>
    );
}
