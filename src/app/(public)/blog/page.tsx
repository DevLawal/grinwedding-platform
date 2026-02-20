import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/ui/Pagination';
import { getPosts } from '@/lib/wordpress';

export const revalidate = 3600;

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const posts = await getPosts(12, currentPage);

    return (
        <div className="bg-base min-h-screen py-24">
            <div className="container">
                <header className="mb-20 text-center border-b border-editorial pb-16">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-text mb-6 tracking-tight">Wedding Insights.</h1>
                    <p className="text-text-dim font-black uppercase text-[10px] tracking-[0.4em]">Tracking the evolution of the wedding economy</p>
                </header>

                <div className="magazine-grid">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="mt-24 pt-12 border-t border-editorial flex justify-center">
                    {posts.length >= 12 && (
                        <Pagination currentPage={currentPage} totalPages={currentPage + 1} basePath="/blog" />
                    )}
                </div>
            </div>
        </div>
    );
}
