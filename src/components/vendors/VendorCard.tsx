import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '@/types/vendor';

interface VendorCardProps {
    vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
    return (
        <div className="group bg-transparent transition-all duration-300">
            {/* Image Segment - Flat border */}
            <Link href={`/vendors/${vendor.slug}`} className="relative aspect-[4/3] overflow-hidden mb-6 block border border-gray-100">
                <Image
                    src={vendor.featuredImage}
                    alt={vendor.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm border-l border-b border-gray-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-charcoal">
                    {vendor.category}
                </div>
            </Link>

            {/* Analysis & Details */}
            <div className="flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif font-bold text-charcoal leading-tight">
                        <Link href={`/vendors/${vendor.slug}`} className="hover:opacity-70 transition-opacity">
                            {vendor.name}
                        </Link>
                    </h3>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black tracking-widest text-plum uppercase mb-1">Rank Score</span>
                        <span className="text-lg font-mono font-black text-charcoal">{( (vendor.rating || 0) * 20).toFixed(0)}%</span>
                    </div>
                </div>

                <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    {vendor.location}
                </div>

                <p className="text-[0.9rem] text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                    {vendor.description}
                </p>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {vendor.priceRange} Market Segment
                    </span>
                    <Link 
                        href={`/vendors/${vendor.slug}`} 
                        className="text-[10px] font-black uppercase tracking-widest text-charcoal hover:text-plum transition-all border-b-2 border-plum pb-1"
                    >
                        View Intelligence Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
