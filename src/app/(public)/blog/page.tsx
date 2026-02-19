import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/ui/Pagination';
import { getPosts } from '@/lib/wordpress';

export const revalidate = 3600;

interface BlogPageProps {
    searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const currentPage = Number(searchParams.page) || 1;
    const posts = await getPosts(12, currentPage);

    return (
        <div className="bg-ivory min-h-screen py-24">
            <div className="container">
                <header className="mb-20 text-center border-b border-gray-100 pb-16">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-charcoal mb-6 tracking-tight">Intelligence Journal.</h1>
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.4em]">Tracking the evolution of the wedding economy</p>
                </header>

                <div className="magazine-grid">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="mt-24 pt-12 border-t border-gray-50 flex justify-center">
                    {posts.length >= 12 && (
                        <Pagination currentPage={currentPage} totalPages={currentPage + 1} basePath="/blog" />
                    )}
                </div>
            </div>
        </div>
    );
}
