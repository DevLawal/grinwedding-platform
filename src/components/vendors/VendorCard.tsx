import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '@/types/vendor';

interface VendorCardProps {
    vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
    return (
        <div className="group bg-white overflow-hidden transition-all duration-500 shadow-premium hover:shadow-hover border border-gray-100/50">
            <Link href={`/vendors/${vendor.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
                <Image
                    src={vendor.featuredImage}
                    alt={vendor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest">
                    {vendor.category}
                </div>
            </Link>

            <div className="p-6 md:p-8 border-t border-gray-50">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif font-black text-black leading-tight tracking-tight">
                        <Link href={`/vendors/${vendor.slug}`} className="hover:text-purple-600 transition-colors">
                            {vendor.name}
                        </Link>
                    </h3>
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                        <span className="text-amber-500 text-xs">★</span>
                        <span className="ml-1 text-[11px] font-black text-black">{vendor.rating}</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <svg className="w-3 h-3 mr-1.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {vendor.location}
                </div>

                <p className="text-gray-500 text-xs font-medium line-clamp-2 mb-6 h-8 leading-relaxed italic">
                    {vendor.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">{vendor.priceRange}</span>
                    <Link href={`/vendors/${vendor.slug}`} className="group/btn flex items-center gap-2">
                        <span className="text-[11px] font-black uppercase tracking-tighter text-black border-b-2 border-transparent group-hover/btn:border-black transition-all">
                            View Expert Profile
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
