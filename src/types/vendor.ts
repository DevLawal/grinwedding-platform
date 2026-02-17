export interface Vendor {
    id: string;
    name: string;
    slug: string;
    category: string;
    location: string;
    rating: number; // Calculated from Instagram metrics
    reviewCount: number;
    description: string;
    instagramHandle: string;
    featuredImage: string;
    images: string[];
    priceRange: '$' | '$$' | '$$$' | '$$$$';
}
