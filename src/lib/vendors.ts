import { Vendor, VendorApiResponse } from '@/types/vendor';

const API_BASE_URL = process.env.NEXT_PUBLIC_VENDOR_SERVICE_URL || 'http://localhost:5000/api';

/**
 * Helper to map new discovery fields to legacy fields for UI compatibility
 */
function mapVendorFields(vendor: any): Vendor {
  return {
    ...vendor,
    name: vendor.fullName,
    slug: vendor.username,
    category: vendor.niche,
    description: vendor.bio,
    featuredImage: vendor.profilePic,
    instagramHandle: `@${vendor.username}`,
    rating: (vendor.ranking?.score / 20) || 4.5, // Map 0-100 to 0-5
    reviewCount: Math.floor(vendor.metrics?.followers / 100) || 0,
    priceRange: '$$'
  };
}

const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Royal Orchid Hall',
    slug: 'royal-orchid-hall',
    category: 'Venues',
    location: 'Lagos, Nigeria',
    rating: 4.8,
    reviewCount: 124,
    description: 'A premium wedding venue in the heart of Lagos.',
    featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
    priceRange: '$$$',
    username: 'royalorchid',
    fullName: 'Royal Orchid Hall',
    bio: 'Premium venue service',
    niche: 'Venues',
    profilePic: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
    instagramId: 'royalorchid',
    metrics: { followers: 5000, following: 200, posts: 50, avgEngagement: 3.2 },
    ranking: { score: 95, rank: 1, lastUpdated: new Date().toISOString() },
    confidence: { location: 1, niche: 1 },
    isVerified: true
  },
  {
    id: '2',
    name: 'Elite Catering',
    slug: 'elite-catering',
    category: 'Catering',
    location: 'Abuja, Nigeria',
    rating: 4.9,
    reviewCount: 89,
    description: 'Exquisite culinary experiences for your special day.',
    featuredImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
    priceRange: '$$',
    username: 'elitecatering',
    fullName: 'Elite Catering Services',
    bio: 'Exquisite catering',
    niche: 'Catering',
    profilePic: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
    instagramId: 'elitecatering',
    metrics: { followers: 3200, following: 150, posts: 120, avgEngagement: 4.5 },
    ranking: { score: 92, rank: 2, lastUpdated: new Date().toISOString() },
    confidence: { location: 1, niche: 1 },
    isVerified: true
  }
];

/**
 * Fetches vendors based on niche and location from the discovery service
 */
export async function getVendorsList(params: {
  niche?: string;
  location?: string;
  page?: number;
  limit?: number;
}): Promise<VendorApiResponse> {
  console.log('>>> [DEBUG] getVendorsList called (MOCK FALLBACK ACTIVE)');
  // Mocking the response for now as per user request to "leave vendor services for now"
  return {
    vendors: MOCK_VENDORS,
    pagination: { total: 2, page: 1, pages: 1 }
  };
}

/**
 * Legacy support for existing getVendors call
 */
export async function getVendors(): Promise<Vendor[]> {
    return MOCK_VENDORS;
}

/**
 * Fetches a single vendor by slug (username)
 */
export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  return MOCK_VENDORS.find(v => v.slug === slug) || null;
}

/**
 * Triggers a new discovery job for a niche and location
 */
export async function triggerDiscovery(niche: string, location: string): Promise<{ message: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/discovery/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ niche, location }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to trigger discovery');
    }

    return data;
  } catch (error: any) {
    console.error('Error triggering discovery:', error);
    return { message: 'Failed to trigger discovery', error: error.message };
  }
}
