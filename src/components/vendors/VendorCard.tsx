import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '@/types/vendor';

interface VendorCardProps {
    vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <Link href={`/vendors/${vendor.slug}`} className="block relative h-48 sm:h-56">
                <Image
                    src={vendor.featuredImage}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                    {vendor.category}
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-gray-900 line-clamp-1">
                        <Link href={`/vendors/${vendor.slug}`} className="hover:text-rose-500 transition-colors">
                            {vendor.name}
                        </Link>
                    </h3>
                    <div className="flex items-center text-amber-400 text-sm font-medium">
                        <span>★</span>
                        <span className="ml-1 text-gray-700">{vendor.rating}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {vendor.location}
                </p>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                    {vendor.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-sm font-medium text-gray-400">{vendor.priceRange}</span>
                    <Link href={`/vendors/${vendor.slug}`} className="text-rose-500 text-sm font-semibold hover:underline">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
