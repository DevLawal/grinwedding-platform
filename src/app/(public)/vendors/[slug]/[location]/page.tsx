import { Metadata } from 'next';
import { getVendorsList } from '@/lib/vendors';
import { Vendor } from '@/types/vendor';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    slug: string; // This is the niche/category
    location: string;
  };
}

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nicheName = formatTitle(params.slug);
  const locationName = formatTitle(params.location);

  return {
    title: `Best Wedding ${nicheName}s in ${locationName}, Nigeria - Grin Weddings`,
    description: `Discover and compare top-rated wedding ${nicheName.toLowerCase()}s in ${locationName}. Based on real engagement and activity data.`,
    alternates: {
      canonical: `/vendors/${params.slug}/${params.location}`,
    },
  };
}

export default async function VendorListingPage({ params }: Props) {
  const niche = params.slug.replace(/-/g, ' ');
  const location = params.location.replace(/-/g, ' ');

  let vendors: Vendor[] = [];
  try {
    const response = await getVendorsList({ niche, location });
    vendors = response.vendors;
  } catch (error) {
    console.error('Error loading vendors:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 lg:mt-0">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Top Wedding {formatTitle(params.slug)}s in {formatTitle(params.location)}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Handpicked vendors ranked by authenticity, engagement, and consistent quality service in Nigeria.
        </p>
      </div>

      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div key={vendor.username} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-64 w-full">
                {vendor.profilePic ? (
                   <Image 
                    src={vendor.profilePic} 
                    alt={vendor.fullName} 
                    fill 
                    className="object-cover"
                    unoptimized // Instagram URLs might need this
                  />
                ) : (
                  <div className="w-full h-full bg-beige-100 flex items-center justify-center">
                    <span className="text-gray-400 font-serif text-4xl">{vendor.fullName.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gold-600 shadow-sm">
                  Rank #{vendor.ranking.rank}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {vendor.fullName}
                  </h3>
                  {vendor.isVerified && (
                    <span className="text-blue-500" title="Verified Vendor">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {vendor.bio}
                </p>
                
                <div className="flex items-center space-x-4 text-xs font-medium text-gray-400 mb-6">
                  <div className="flex items-center">
                    <span className="mr-1">👥</span>
                    {vendor.metrics.followers.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">🔥</span>
                    {vendor.metrics.avgEngagement.toFixed(1)}% ER
                  </div>
                </div>
                
                <Link 
                  href={`/vendors/${vendor.username}`}
                  className="block w-full text-center py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-4">No vendors found for this location yet.</p>
          <p className="text-sm text-gray-400">Our discovery engine is still exploring this area. Check back soon!</p>
        </div>
      )}

      <div className="mt-16 bg-beige-50 rounded-2xl p-8 border border-beige-100">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How we rank vendors</h2>
        <p className="text-gray-600 mb-6">
          Unlike other platforms, our ranking isn't for sale. We use a data-driven approach that considers follower health, posting consistency, and most importantly, how much their community actually interacts with them.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="p-4 bg-white rounded-lg shadow-xs">
            <span className="font-bold text-gray-900 block mb-1">Authenticity</span>
            We favor vendors with genuine community growth over those with inflated follower counts.
          </div>
          <div className="p-4 bg-white rounded-lg shadow-xs">
            <span className="font-bold text-gray-900 block mb-1">Engagement</span>
            High interaction rates signal quality service and community trust.
          </div>
          <div className="p-4 bg-white rounded-lg shadow-xs">
            <span className="font-bold text-gray-900 block mb-1">Consistency</span>
            Active vendors who post regularly show their current availability and dedication.
          </div>
          <div className="p-4 bg-white rounded-lg shadow-xs">
            <span className="font-bold text-gray-900 block mb-1">Location Focus</span>
            Our inference engine ensures vendors actually serve the Nigerian market.
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-400 italic">
          Disclaimer: Vendor rankings are based on publicly available Instagram activity and do not guarantee service quality.
        </p>
      </div>
    </div>
  );
}
