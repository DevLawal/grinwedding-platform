import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import { getCategories, getPostsByCategory } from '@/lib/wordpress';
import Pagination from '@/components/ui/Pagination';

export const revalidate = 3600;

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const [{ slug }, { page }] = await Promise.all([params, searchParams]);
    
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    const currentPage = Number(page) || 1;
    const posts = await getPostsByCategory(category.id, 9);

    return (
        <div className="bg-base min-h-screen py-12">
            <div className="container mx-auto px-4">
            <header className="text-center mb-16">
                <span className="text-purple font-black tracking-[0.3em] text-[10px] uppercase">Category Sector</span>
                <h1 className="font-serif text-4xl font-black text-text mt-4 tracking-tight">{category.name}</h1>
                <div className="w-16 h-1 bg-purple/30 mx-auto mt-8"></div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
                {posts.length === 0 && (
                    <div className="col-span-full text-center text-text-muted py-20 italic">
                        No posts found in this category yet.
                    </div>
                )}
            </div>

            <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={currentPage + 1} basePath={`/category/${slug}`} />
            </div>
            </div>
        </div>
    );
}
