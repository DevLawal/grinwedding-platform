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
        <div className="bg-base min-h-screen py-24 md:py-12">
            <div className="container px-4 md:px-12 mx-auto">
                <header className="mb-12 md:mb-20 text-center border-b border-editorial pb-5 md:pb-8">
                    <h1 className="font-serif text-3xl md:text-5xl font-black text-text mb-2 md:mb-3 tracking-tight leading-tight">Wedding Insights.</h1>
                    <p className="text-text-dim font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] max-w-xs md:max-w-none mx-auto">Tracking the evolution of the wedding economy</p>
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
