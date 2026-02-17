import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://grin-weddings.vercel.app'; // TODO: Update with real domain

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/blog',
        '/vendors',
        '/budget-calculator',
        '/guest-estimator',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }));

    // 2. Blog Posts
    const posts = await getPosts(100);
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 3. Vendor Profiles
    const vendors = await getVendors();
    const vendorRoutes = vendors.map((vendor) => ({
        url: `${baseUrl}/vendors/${vendor.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...staticRoutes, ...postRoutes, ...vendorRoutes];
}
