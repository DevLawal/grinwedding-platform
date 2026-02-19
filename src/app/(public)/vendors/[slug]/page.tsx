import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getVendorBySlug, getVendors } from '@/lib/vendors';

export async function generateStaticParams() {
    const vendors = await getVendors();
    return vendors.map((vendor) => ({
        slug: vendor.slug,
    }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const vendor = await getVendorBySlug(slug);
    if (!vendor) return {};
    return {
        title: `${vendor.name} | Grin Intel Profile`,
        description: vendor.description,
    };
}

export default async function VendorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const vendor = await getVendorBySlug(slug);

    if (!vendor) {
        notFound();
    }

    return (
        <div className="bg-ivory min-h-screen pb-32">
            {/* The Intelligence Header */}
            <div className="relative pt-24 pb-16 px-6 border-b border-gray-100">
                <div className="container max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="max-w-3xl">
                             <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-plum">
                                    Member of {vendor.category} Niche
                                </span>
                                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                                    Verified Index
                                </span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-7xl font-black text-charcoal mb-4 tracking-tight leading-[1.05]">
                                {vendor.name}
                            </h1>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center">
                                Operating Hub: {vendor.location}
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end bg-white border border-gray-100 p-8 min-w-[200px]">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Market Rating</span>
                            <span className="text-4xl font-mono font-black text-charcoal">{( (vendor.rating || 0) * 20).toFixed(0)}%</span>
                            <span className="text-[8px] font-black text-plum opacity-60 uppercase tracking-widest mt-2">Intelligence rank confirmed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-20">
                {/* Profile Narrative */}
                <div className="lg:col-span-8 space-y-20">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10 border-b border-gray-50 pb-4">Executive Summary</h2>
                        <div className="prose prose-lg prose-neutral prose-p:font-medium prose-p:leading-relaxed prose-p:text-gray-500">
                            <p>{vendor.description}</p>
                            <div className="mt-12 p-10 bg-gray-50 border border-gray-100 italic text-sm text-gray-400">
                                This profile contains clinical market data. Direct engagement metrics and historical service records are derived from the Grin Intelligence Engine.
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10 border-b border-gray-50 pb-4">Portfolio Evidence</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="relative aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden group">
                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-200 group-hover:text-plum transition-colors">
                                        Media Item {String(i).padStart(2, '0')}
                                    </div>
                                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Tactical Sidebar */}
                <aside className="lg:col-span-4 space-y-12">
                    <div className="bg-white p-10 border border-gray-100 sticky top-32">
                        <div className="mb-10 flex flex-col gap-2 pb-6 border-b border-gray-50">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Pricing Tier</span>
                            <span className="text-xl font-mono font-black text-charcoal uppercase tracking-widest">
                                {vendor.priceRange} Segment
                            </span>
                        </div>

                        <div className="space-y-6">
                            {vendor.instagramHandle && (
                                <Link
                                    href={`https://instagram.com/${vendor.instagramHandle.replace('@', '')}`}
                                    target="_blank"
                                    className="block w-full border border-gray-100 text-[10px] font-black uppercase tracking-[0.3em] py-5 text-center hover:bg-gray-50 transition-all uppercase"
                                >
                                    External Feed &rarr;
                                </Link>
                            )}
                            <button className="block w-full bg-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 text-center hover:bg-plum transition-all border border-charcoal">
                                Secure Engagement
                            </button>
                        </div>
                        
                        <div className="mt-10 pt-6 border-t border-gray-50">
                            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                                Engagement with this entity is monitored via the Grin Protocol for quality assurance.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
