import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PostCard from '@/components/blog/PostCard';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export default async function SinglePostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Fetch related/recent posts for the bottom section
    const recentPosts = (await getPosts(3)).filter(p => p.slug !== slug).slice(0, 2);

    const featuredImage = (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.node?.sourceUrl) || '';
    const authorName = post.author?.node?.name || 'Grin Editor';
    const categories = post.categories?.nodes || [];
    const readingTime = calculateReadingTime(post.content || '');

    return (
        <article className="pb-32 bg-base min-h-screen">
            {/* Navigation & Metada Header */}
            <div className="pt-12 md:pt-16 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-dim/50 mb-12">
                        <Link href="/" className="hover:text-text transition-colors">Home</Link>
                        <span className="opacity-30">/</span>
                        <Link href="/blog" className="hover:text-text transition-colors">Insights</Link>
                        <span className="opacity-30">/</span>
                        <span className="text-text-muted truncate max-w-[150px]">{post.title}</span>
                    </nav>

                    <div className="flex gap-4 mb-8 items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple">
                            {categories[0]?.name || 'Intelligence'}
                        </span>
                        <span className="w-1 h-1 bg-border rounded-full" />
                        <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
                            {readingTime} MIN READ
                        </span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-black text-text mb-8 leading-[1.1] tracking-tight">
                        {parse(post.title)}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-editorial">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest mb-1">Authenticated Narrative</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-text uppercase tracking-[0.1em]">{authorName}</span>
                                <span className="text-text-dim/50">|</span>
                                <time className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
                                    {format(parseISO(post.date), 'MMM d, yyyy')}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Centerpiece */}
            {featuredImage && (
                <div className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="relative aspect-[21/9] border border-editorial overflow-hidden">
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

            {/* Primary Content Loop */}
            <div className="container max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-16">
                <div className="md:col-span-8">
                    <div className="prose prose-lg dark:prose-invert prose-neutral prose-headings:font-serif prose-headings:font-black prose-headings:text-text prose-p:text-text-muted prose-p:leading-[1.9] prose-p:font-medium prose-a:text-purple prose-a:no-underline hover:prose-a:underline">
                        {parse(post.content)}
                    </div>

                    {/* Signature */}
                    <div className="mt-24 pt-12 border-t border-editorial flex flex-col gap-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim/50 italic">
                            Verified through the Grin Intelligence Protocol &bull; {format(new Date(), 'yyyy')}
                        </p>
                    </div>
                </div>

                {/* Tactical Sidebar */}
                <aside className="md:col-span-4 space-y-12">
                    <NewsletterCard />
                    
                    <div className="p-8 border border-editorial bg-surface">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim mb-8 pb-4 border-b border-editorial opacity-50">
                            Further Insights
                        </h3>
                        <div className="space-y-10">
                            {recentPosts.map(p => (
                                <div key={p.id} className="group">
                                    <Link href={`/blog/${p.slug}`} className="block">
                                        <h4 className="font-serif text-lg font-black text-text mb-2 leading-tight group-hover:text-purple transition-colors">
                                            {parse(p.title)}
                                        </h4>
                                        <time className="text-[9px] font-bold text-text-dim uppercase tracking-widest">
                                            {format(parseISO(p.date), 'MMM d, yyyy')}
                                        </time>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Nav */}
            <div className="max-w-3xl mx-auto px-6 mt-32 text-center">
                <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-text border-b-2 border-purple hover:border-text transition-all pb-1">
                    &larr; Return to Wedding Insights
                </Link>
            </div>
        </article>
    );
}
