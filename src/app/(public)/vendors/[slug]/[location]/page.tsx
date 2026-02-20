import { Metadata } from 'next';
import { getVendorsList } from '@/lib/vendors';
import { Vendor } from '@/types/vendor';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{
    slug: string; // This is the niche/category
    location: string;
  }>;
}

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, location } = await params;
  const nicheName = formatTitle(slug);
  const locationName = formatTitle(location);

  return {
    title: `Best Wedding ${nicheName}s in ${locationName} | Grin Intel`,
    description: `The definitive market index for wedding ${nicheName.toLowerCase()}s in ${locationName}. Analyzed for the high-end market.`,
    alternates: {
      canonical: `/vendors/${slug}/${location}`,
    },
  };
}

export default async function VendorListingPage({ params }: Props) {
  const { slug, location: locationParam } = await params;
  const niche = slug.replace(/-/g, ' ');
  const location = locationParam.replace(/-/g, ' ');

  let vendors: Vendor[] = [];
  try {
    const response = await getVendorsList({ niche, location });
    vendors = response.vendors;
  } catch (error) {
    console.error('Error loading vendors:', error);
  }

  return (
    <div className="bg-base min-h-screen py-24">
      <div className="container">
        {/* Intelligence Hub Header */}
        <header className="mb-20 border-b border-editorial pb-16 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple">Market Segment</span>
                <span className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{location} Sector</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-text mb-8 tracking-tight">
                {formatTitle(slug)}s in {formatTitle(locationParam)}.
            </h1>
            <p className="text-xl text-text-muted leading-relaxed font-medium">
                Our inference engine has mapped the most influential {niche} professionals in the {location} region. Rankings are weighted by market authority and historical consistency.
            </p>
        </header>

        {vendors.length > 0 ? (
          <div className="magazine-grid">
            {vendors.map((vendor) => (
              <div key={vendor.username} className="group bg-surface border border-editorial p-8 flex flex-col h-full">
                <div className="relative aspect-[4/5] mb-8 bg-surface-2 overflow-hidden border border-editorial">
                  {vendor.profilePic ? (
                     <Image 
                      src={vendor.profilePic} 
                      alt={vendor.fullName} 
                      fill 
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      unoptimized 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-text-dim/20 font-serif text-6xl font-black">{vendor.fullName.charAt(0)}</span>
                    </div>
                  )}
                   <div className="absolute top-0 right-0 p-4 bg-text text-base dark:text-base-dark text-[10px] font-black uppercase tracking-[0.2em]">
                    Rank #{vendor.ranking.rank}
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-black text-text leading-tight uppercase tracking-tight">
                      <Link href={`/vendors/${vendor.username}`} className="hover:text-purple transition-colors">
                        {vendor.fullName}
                      </Link>
                    </h3>
                  </div>
                  
                  <p className="text-[13px] text-text-muted mb-8 line-clamp-2 leading-relaxed">
                    {vendor.bio}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-editorial flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-text-dim">Engagement</span>
                        <span className="text-xs font-mono font-black text-text">{vendor.metrics.avgEngagement.toFixed(1)}% ER</span>
                    </div>
                    <Link 
                      href={`/vendors/${vendor.username}`}
                      className="text-[9px] font-black text-text uppercase tracking-[0.2em] border-b-2 border-purple hover:border-text transition-all pb-1"
                    >
                      Intel Profile &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-editorial bg-surface">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim">No Intelligence Data Found</p>
          </div>
        )}

        {/* Theoretical Framework */}
        <div className="mt-32 max-w-4xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim mb-12 border-b border-editorial pb-4">Ranking Methodology</h2>
            <p className="text-xl text-text-muted mb-12 font-medium leading-relaxed">
                The Grin Discovery Protocol prioritizes authentic community influence over inflated metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <span className="text-[10px] font-black text-text uppercase tracking-[0.3em] block mb-4">I. Authenticity Verification</span>
                    <p className="text-sm text-text-dim leading-relaxed font-medium text-justify">
                        We audit follower health filters to ensure that only vendors with genuine market reach are featured in the top percentiles.
                    </p>
                </div>
                <div>
                    <span className="text-[10px] font-black text-text uppercase tracking-[0.3em] block mb-4">II. Historical Engagement</span>
                    <p className="text-sm text-text-dim leading-relaxed font-medium text-justify">
                        Interaction density serves as a proxy for client satisfaction and current market relevance.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
