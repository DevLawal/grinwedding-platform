import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import { getPostBySlug } from '@/lib/wordpress';

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
    const authorName = post.author?.node?.name || 'Grin Editor';
    const categories = post.categories?.nodes || [];

    return (
        <article className="pb-32 bg-ivory min-h-screen">
            {/* Intel Header */}
            <header className="pt-24 pb-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center gap-4 mb-10 items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-plum">
                            {categories[0]?.name || 'Intelligence'}
                        </span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <time className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {format(parseISO(post.date), 'MMM d, yyyy')}
                        </time>
                    </div>

                    <h1 className="font-serif text-4xl md:text-6xl font-black text-charcoal mb-10 leading-[1.1] tracking-tight">
                        {parse(post.title)}
                    </h1>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Authored by</span>
                        <span className="text-sm font-black text-charcoal uppercase tracking-[0.1em]">{authorName}</span>
                    </div>
                </div>
            </header>

            {/* Flat Border Image container */}
            {featuredImage && (
                <div className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="relative aspect-[21/9] border border-gray-100 overflow-hidden">
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

            {/* Editorial Content Zone */}
            <div className="max-w-[700px] mx-auto px-6">
                <div className="prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-black prose-headings:text-charcoal prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-medium">
                    {parse(post.content)}
                </div>

                {/* Footer Nav */}
                <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">End of Intelligence</p>
                    <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal border-b-2 border-plum hover:border-charcoal transition-all pb-1">
                        &larr; Return to Market Streams
                    </Link>
                </div>
            </div>
        </article>
    );
}
