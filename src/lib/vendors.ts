import { Vendor, VendorApiResponse } from '@/types/vendor';

const resolveApiUrl = (envUrl?: string) => {
  const defaultUrl = 'http://localhost:5000/api';
  const baseUrl = envUrl || defaultUrl;
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If the API points to localhost but we are accessing via an IP or another domain
    if ((baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) && 
        hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return baseUrl.replace('localhost', hostname).replace('127.0.0.1', hostname);
    }
  }
  return baseUrl;
};

const API_BASE_URL = resolveApiUrl(process.env.NEXT_PUBLIC_VENDOR_SERVICE_URL);

/**
 * Helper to map new discovery fields to legacy fields for UI compatibility
 */
function mapVendorFields(vendor: any): Vendor {
  return {
    ...vendor,
    id: vendor._id || vendor.id,
    name: vendor.fullName || vendor.name,
    slug: vendor.username || vendor.slug,
    category: vendor.niche || vendor.category,
    description: vendor.bio || vendor.description,
    featuredImage: vendor.profilePic || vendor.featuredImage,
    instagramHandle: vendor.username ? `@${vendor.username}` : vendor.instagramHandle,
    rating: vendor.ranking?.score ? (vendor.ranking.score / 20) : (vendor.rating || 4.5), // Map 0-100 to 0-5
    reviewCount: vendor.metrics?.followers ? Math.floor(vendor.metrics.followers / 100) : (vendor.reviewCount || 0),
    priceRange: vendor.priceRange || '$$'
  };
}

/**
 * Fetches vendors based on niche and location from the discovery service
 */
export async function getVendorsList(params: {
  niche?: string;
  location?: string;
  page?: number;
  limit?: number;
}): Promise<VendorApiResponse> {
  try {
    const query = new URLSearchParams();
    if (params.niche) query.set('niche', params.niche);
    if (params.location) query.set('location', params.location);
    if (params.page) query.set('page', params.page.toString());
    if (params.limit) query.set('limit', params.limit.toString());

    const url = `${API_BASE_URL}/vendors?${query.toString()}`;
    console.log(`[DEBUG] Fetching vendors from: ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 0 } // Disable cache for debug
    });
    
    if (!response.ok) {
      console.error(`[ERROR] Fetch failed with status: ${response.status}`);
      throw new Error('Failed to fetch vendors');
    }

    const data = await response.json();
    console.log(`[DEBUG] Successfully fetched ${data.vendors?.length || 0} vendors`);
    
    return {
      vendors: (data.vendors || []).map(mapVendorFields),
      pagination: data.pagination || { total: 0, page: 1, pages: 1 }
    };
  } catch (error) {
    console.error('[DEBUG] Error fetching vendors list:', error);
    return {
      vendors: [],
      pagination: { total: 0, page: 1, pages: 1 }
    };
  }
}

/**
 * Legacy support for existing getVendors call
 */
export async function getVendors(): Promise<Vendor[]> {
    const result = await getVendorsList({});
    return result.vendors;
}

/**
 * Fetches a single vendor by slug (username)
 */
export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors/${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch vendor');
    }

    const data = await response.json();
    return mapVendorFields(data);
  } catch (error) {
    console.error(`Error fetching vendor ${slug}:`, error);
    return null;
  }
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
