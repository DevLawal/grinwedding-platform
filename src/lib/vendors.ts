import { Vendor } from "@/types/vendor";
import { getVendorInstagramMetrics, calculateVendorScore } from "@/lib/instagram";

const MOCK_VENDORS: Vendor[] = [
    {
        id: '1',
        name: 'Elegant Moments Photography',
        slug: 'elegant-moments-photography',
        category: 'Photography',
        location: 'New York, NY',
        rating: 0, // Will be calculated
        reviewCount: 124,
        description: 'Capturing the raw emotion and timeless beauty of your special day.',
        instagramHandle: 'elegantmoments',
        featuredImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
        images: [],
        priceRange: '$$$'
    },
    {
        id: '2',
        name: 'Rosewood Estate',
        slug: 'rosewood-estate',
        category: 'Venues',
        location: 'Hudson Valley, NY',
        rating: 0, // Will be calculated
        reviewCount: 89,
        description: 'A historic estate with sprawling gardens and a grand ballroom.',
        instagramHandle: 'rosewoodestate',
        featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop',
        images: [],
        priceRange: '$$$$'
    },
    {
        id: '3',
        name: 'Floral Dreams',
        slug: 'floral-dreams',
        category: 'Florists',
        location: 'Brooklyn, NY',
        rating: 0, // Will be calculated
        reviewCount: 56,
        description: 'Bespoke floral arrangements for modern romantic weddings.',
        instagramHandle: 'floraldreams_ny',
        featuredImage: 'https://images.unsplash.com/photo-1563241527-3004b7be025e?q=80&w=1000&auto=format&fit=crop',
        images: [],
        priceRange: '$$'
    }
];

export async function getVendors(): Promise<Vendor[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const vendorsWithScores = await Promise.all(MOCK_VENDORS.map(async (vendor) => {
        const metrics = await getVendorInstagramMetrics(vendor.instagramHandle);
        let calculatedRating = 4.5; // Default fallback

        if (metrics) {
            const score = calculateVendorScore(metrics);
            // Map score (0-100+) to 5-star rating (3.0 - 5.0)
            calculatedRating = 3.0 + (Math.min(score, 100) / 100) * 2.0;
        }

        return {
            ...vendor,
            rating: Number(calculatedRating.toFixed(1))
        };
    }));

    return vendorsWithScores.sort((a, b) => b.rating - a.rating);
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_VENDORS.find(v => v.slug === slug) || null;
}
