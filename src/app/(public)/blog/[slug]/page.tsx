import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import { getPostBySlug } from '@/lib/wordpress';
import CategoryBadge from '@/components/ui/CategoryBadge';
// DOMPurify removed as we rely on html-react-parser for basic rendering


export const revalidate = 3600;

interface PageProps {
    params: { slug: string };
}

export default async function SinglePostPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const featuredImage = (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.node?.sourceUrl) || '';
    const authorName = post.author?.node?.name;
    const categories = post.categories?.nodes || [];

    return (
        <article className="pb-20">
            {/* Header */}
            <header className="relative py-20 bg-gray-50 text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-center gap-2 mb-6">
                        {categories.map(cat => (
                            <CategoryBadge key={cat.id} name={cat.name} slug={cat.slug} />
                        ))}
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {parse(post.title)}
                    </h1>

                    <div className="flex items-center justify-center text-gray-500 text-sm gap-4">
                        <span>{format(parseISO(post.date), 'MMMM d, yyyy')}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>By {authorName}</span>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {featuredImage && (
                <div className="container mx-auto px-4 -mt-10 mb-12">
                    <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src={featuredImage}
                            alt={post.featuredImage?.node?.altText || post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto prose prose-lg prose-violet prose-headings:font-serif">
                    {parse(post.content)}
                </div>
            </div>

            {/* Navigation back */}
            <div className="container mx-auto px-4 mt-16 text-center">
                <Link href="/blog" className="text-purple-600 hover:text-purple-700 font-semibold">
                    &larr; Back to all stories
                </Link>
            </div>
        </article>
    );
}
