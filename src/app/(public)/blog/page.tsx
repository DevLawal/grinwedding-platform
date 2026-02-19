import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/ui/Pagination';
import { getPosts } from '@/lib/wordpress';

export const revalidate = 3600;

interface BlogPageProps {
    searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const currentPage = Number(searchParams.page) || 1;
    const posts = await getPosts(9, currentPage);
    // Note: WP API header x-wp-totalpages would be needed for true total pages. 
    // For simplicity without custom fetcher return types, we'll assume a "Next" button logic or pass dummy total for now.
    // Ideally getPosts should return { posts, totalPages }.
    // Let's simplified assumption: if we got 9 posts, there might be more.

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-serif text-4xl font-bold text-center mb-12">Latest Wedding Stories</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <div className="mt-12">
                {/* Simplified pagination for MVP */}
                {posts.length >= 9 && (
                    <Pagination currentPage={currentPage} totalPages={currentPage + 1} basePath="/blog" />
                )}
            </div>
        </div>
    );
}
