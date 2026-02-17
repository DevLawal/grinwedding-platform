import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://grin-weddings.vercel.app'; // TODO: Update with real domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/'], // Disallow dashboard and API routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
