export interface Vendor {
  // Common / Legacy fields
  id?: string;
  name?: string;
  slug?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  instagramHandle?: string;
  featuredImage?: string;
  images?: string[];
  priceRange?: string;

  // New Discovery Fields
  username: string;
  fullName: string;
  bio: string;
  niche: string;
  location: string;
  profilePic: string;
  instagramId: string;
  externalUrl?: string;
  metrics: {
    followers: number;
    following: number;
    posts: number;
    avgEngagement: number;
    lastPostDate?: string;
  };
  ranking: {
    score: number;
    rank: number;
    lastUpdated: string;
  };
  confidence: {
    location: number;
    niche: number;
  };
  isVerified: boolean;
}

export interface VendorApiResponse {
  vendors: Vendor[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
