import Link from 'next/link';
import { getVendors } from '@/lib/vendors';
import VendorCard from '@/components/vendors/VendorCard';

export const metadata = {
    title: 'Top Wedding Vendors | Grin Weddings',
    description: 'Discover and connect with the best wedding photographers, venues, and florists for your dream wedding.',
};

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function VendorsPage() {
    const vendors = await getVendors();

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 border-b border-gray-200 pb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Vendor Rankings
                    </h1>
                    <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                        We analyze Instagram engagement, reviews, and pricing to rank the best wedding professionals.
                        <br />
                        <span className="text-sm text-gray-400 mt-2 block font-mono">
                            Last updated: {new Date().toLocaleDateString()}
                        </span>
                    </p>
                </div>

                {/* Filters (Clean Tabs) */}
                <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-4 overflow-x-auto">
                    {['All', 'Venues', 'Photography', 'Florists', 'Planners'].map((filter) => (
                        <button
                            key={filter}
                            className={`px-4 py-2 text-sm font-bold transition-colors uppercase tracking-wider ${filter === 'All'
                                ? 'text-purple-600 border-b-2 border-purple-600'
                                : 'text-gray-400 hover:text-gray-900'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                <th className="py-4 pr-6 w-16">Rank</th>
                                <th className="py-4 px-4">Vendor</th>
                                <th className="py-4 px-4 w-32 text-center">Score</th>
                                <th className="py-4 px-4 w-48">Location</th>
                                <th className="py-4 px-4 w-32 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {vendors.map((vendor, index) => (
                                <tr key={vendor.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-6 pr-6 font-mono text-2xl font-bold text-gray-300 group-hover:text-purple-500">
                                        #{index + 1}
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 relative rounded bg-gray-100 overflow-hidden shrink-0">
                                                {/* Small Thumbnail */}
                                                <img
                                                    src={vendor.featuredImage}
                                                    alt=""
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <Link href={`/vendors/${vendor.slug}`} className="block text-lg font-bold text-gray-900 group-hover:text-purple-600 hover:underline">
                                                    {vendor.name}
                                                </Link>
                                                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                    {vendor.category}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-xl font-bold text-gray-900">{vendor.rating}</span>
                                            <span className="text-[10px] uppercase text-gray-400 font-medium">/ 5.0</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 text-gray-600 text-sm">
                                        {vendor.location}
                                    </td>
                                    <td className="py-6 px-4 text-right font-mono text-gray-400">
                                        {vendor.priceRange}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
