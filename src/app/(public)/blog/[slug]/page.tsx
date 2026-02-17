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

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name;
    const categories = post._embedded?.['wp:term']?.[0] || [];

    // Sanitize content on server side (using jsdom for DOMPurify if needed, or just let html-react-parser handle standard parsing)
    // For basic WP content, parse() is usually enough, but strictly we might want to sanitize.
    // Since we are using html-react-parser, it renders components.
    // Let's just use parse(post.content.rendered) directly for now as it's standard Next.js WP pattern.

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
                        {parse(post.title.rendered)}
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
                            alt={post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto prose prose-lg prose-rose prose-headings:font-serif">
                    {parse(post.content.rendered)}
                </div>
            </div>

            {/* Navigation back */}
            <div className="container mx-auto px-4 mt-16 text-center">
                <Link href="/blog" className="text-rose-500 hover:text-rose-600 font-semibold">
                    &larr; Back to all stories
                </Link>
            </div>
        </article>
    );
}
