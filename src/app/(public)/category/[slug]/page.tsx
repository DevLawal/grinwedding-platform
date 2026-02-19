import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import { getCategories, getPostsByCategory } from '@/lib/wordpress';
import Pagination from '@/components/ui/Pagination';

export const revalidate = 3600;

interface CategoryPageProps {
    params: { slug: string };
    searchParams: { page?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.slug);

    if (!category) {
        notFound();
    }

    const currentPage = Number(searchParams.page) || 1;
    const posts = await getPostsByCategory(category.id, 9);

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-16">
                <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase">Category</span>
                <h1 className="font-serif text-4xl font-bold text-gray-900 mt-2">{category.name}</h1>
                <div className="w-16 h-1 bg-purple-300 mx-auto mt-6"></div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
                {posts.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-20">
                        No posts found in this category yet.
                    </div>
                )}
            </div>

            <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={currentPage + 1} basePath={`/category/${params.slug}`} />
            </div>
        </div>
    );
}
