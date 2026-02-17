import { Post, Category, Tag } from "@/types/wordpress";
export type { Post, Category, Tag };

// Mock Data
const MOCK_POSTS: Post[] = [
    {
        id: 1,
        date: new Date().toISOString(),
        slug: 'perfect-summer-wedding',
        title: { rendered: '10 Tips for the Perfect Summer Wedding Preparation For Young Couples' },
        excerpt: { rendered: '<p>Planning a summer wedding? Here are our top tips for beating the heat and creating unforgettable memories.</p>' },
        content: { rendered: '<p>Full content goes here...</p>' },
        _embedded: {
            'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop',
                alt_text: 'Summer wedding decor'
            }],
            author: [{ name: 'Sarah Editor', avatar_urls: {} }]
        },
        featured_media: 1,
        author: 1,
        categories: [1],
        tags: [1]
    },
    {
        id: 2,
        date: new Date().toISOString(),
        slug: 'rustic-charm-decor',
        title: { rendered: 'Rustic Charm: Decor Ideas for 2026. All You Need To Know About Planning Your Wedding' },
        excerpt: { rendered: '<p>Discover the latest trends in rustic wedding decor, from reclaimed wood to wildflower arrangements.</p>' },
        content: { rendered: '<p>Full content goes here...</p>' },
        _embedded: {
            'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
                alt_text: 'Rustic wedding decor'
            }],
            author: [{ name: 'Mike Design', avatar_urls: {} }]
        },
        featured_media: 2,
        author: 2,
        categories: [2],
        tags: [2]
    },
    {
        id: 3,
        date: new Date().toISOString(),
        slug: 'choosing-your-photographer',
        title: { rendered: 'How to Choose Your Wedding Photographer.A Complete Guide For Couples' },
        excerpt: { rendered: '<p>Your wedding photos are forever. Learn what questions to ask to find the perfect photographer for your style.</p>' },
        content: { rendered: '<p>Full content goes here...</p>' },
        _embedded: {
            'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
                alt_text: 'Wedding photographer'
            }],
            author: [{ name: 'Sarah Editor', avatar_urls: {} }]
        },
        featured_media: 3,
        author: 1,
        categories: [1, 4],
        tags: []
    }
];

const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: 'Planning', slug: 'planning', count: 5 },
    { id: 2, name: 'Decor', slug: 'decor', count: 3 },
    { id: 3, name: 'Real Weddings', slug: 'real-weddings', count: 8 },
    { id: 4, name: 'Tips & Tricks', slug: 'tips-tricks', count: 4 }
];

const MOCK_TAGS: Tag[] = [
    { id: 1, name: 'Summer', slug: 'summer', count: 2 },
    { id: 2, name: 'Vintage', slug: 'vintage', count: 1 }
];

export async function getPosts(perPage = 10, page = 1): Promise<Post[]> {
    console.log('Fetching mock posts');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return MOCK_POSTS.slice(start, end);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    console.log(`Fetching mock post: ${slug}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_CATEGORIES;
}

export async function getTags(): Promise<Tag[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_TAGS;
}

export async function getPostsByCategory(categoryId: number, perPage = 10, page = 1): Promise<Post[]> {
    console.log(`Fetching mock posts by category: ${categoryId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const filteredPosts = MOCK_POSTS.filter(post => post.categories.includes(categoryId));
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredPosts.slice(start, end);
}
