import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getVendorBySlug, getVendors } from '@/lib/vendors';

interface VendorProfileProps {
    params: { slug: string };
}

// Generate static params for all vendors
export async function generateStaticParams() {
    const vendors = await getVendors();
    return vendors.map((vendor) => ({
        slug: vendor.slug,
    }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: VendorProfileProps) {
    const vendor = await getVendorBySlug(params.slug);
    if (!vendor) return {};
    return {
        title: `${vendor.name} | Grin Weddings`,
        description: vendor.description,
    };
}

export default async function VendorProfilePage({ params }: VendorProfileProps) {
    const vendor = await getVendorBySlug(params.slug);

    if (!vendor) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[400px]">
                {vendor.featuredImage && (
                    <Image
                        src={vendor.featuredImage}
                        alt={vendor.name || 'Vendor'}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-wide mb-3 inline-block">
                            {vendor.category}
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">{vendor.name}</h1>
                        <p className="text-white/90 text-lg flex items-center">
                            <span className="mr-2">📍</span> {vendor.location}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">About</h2>
                        <div className="prose prose-lg text-gray-600">
                            <p>{vendor.description}</p>
                            <p>
                                NOTE: This is a mock profile. In a real application, this section would contain
                                a rich text description, amenities, and more detailed information about the vendor.
                            </p>
                        </div>
                    </section>

                    {/* Gallery Placeholder */}
                    <section>
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    {/* 
                                        In real app: <Image src={vendor.images[i]} ... />
                                     */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        Image {i}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center text-amber-400 font-bold text-xl">
                                <span>★</span>
                                <span className="ml-1 text-gray-900">{vendor.rating}</span>
                                <span className="text-gray-400 text-sm font-normal ml-2">({vendor.reviewCount} reviews)</span>
                            </div>
                            <div className="text-gray-500 font-medium">{vendor.priceRange}</div>
                        </div>

                        <div className="space-y-4">
                            {vendor.instagramHandle && (
                                <a
                                    href={`https://instagram.com/${vendor.instagramHandle.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>📷</span> Instagram
                                </a>
                            )}
                            <button className="block w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg text-center hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md">
                                Request Quote
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
