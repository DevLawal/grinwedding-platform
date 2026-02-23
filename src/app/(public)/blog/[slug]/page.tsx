import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PostCard from '@/components/blog/PostCard';
import CmsContent from '@/components/blog/CmsContent';

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
            {/* Navigation & Metadata Header */}
            <div className="pt-12 md:pt-24 pb-0 px-6">
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

                    <h1 className="font-serif text-4xl md:text-6xl font-black text-text mb-4 leading-[1.05] tracking-tight">
                        {parse(post.title)}
                    </h1>

                    <div className="flex items-center gap-6 py-6 border-y border-editorial">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-text-dim uppercase tracking-widest mb-1.5 opacity-60">Authenticated Narrative</span>
                            <div className="flex items-center gap-2.5">
                                <span className="text-xs font-black text-text uppercase tracking-[0.15em]">{authorName}</span>
                                <span className="w-1 h-1 bg-border rounded-full opacity-30" />
                                <time className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
                                    {format(parseISO(post.date), 'MMMM d, yyyy')}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Primary Content Loop */}
            <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8">
                    <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none 
                        prose-headings:font-serif prose-headings:font-black prose-headings:text-text prose-headings:tracking-tight
                        prose-p:text-text-muted prose-p:leading-[1.9] prose-p:font-medium prose-p:mb-8
                        prose-a:text-purple prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                        prose-strong:text-text prose-strong:font-black
                        prose-li:text-text-muted prose-li:font-medium
                        prose-img:rounded-none prose-img:border prose-img:border-editorial">
                        <CmsContent content={post.content} />
                    </div>

                    {/* Signature */}
                    <div className="mt-24 pt-12 border-t border-editorial flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-purple" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim italic">
                                Verified through the Grin Intelligence Protocol &bull; {format(new Date(), 'yyyy')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tactical Sidebar */}
                <aside className="lg:col-span-4 pt-8 space-y-12">
                    <NewsletterCard />
                    
                    <div className="p-10 border border-editorial bg-surface/50 backdrop-blur-sm sticky top-24">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim mb-8 pb-4 border-b border-editorial opacity-50">
                            Further Insights
                        </h3>
                        <div className="space-y-12">
                            {recentPosts.map(p => (
                                <div key={p.id} className="group">
                                    <Link href={`/blog/${p.slug}`} className="block">
                                        <h4 className="font-serif text-xl font-black text-text mb-3 leading-tight group-hover:text-purple transition-all duration-300">
                                            {parse(p.title)}
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <time className="text-[9px] font-bold text-text-dim uppercase tracking-widest">
                                                {format(parseISO(p.date), 'MMM d, yyyy')}
                                            </time>
                                            <span className="w-1 h-1 bg-border rounded-full" />
                                            <span className="text-[9px] font-bold text-purple uppercase tracking-widest">Read More</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Nav */}
            <div className="max-w-3xl mx-auto px-6 mt-40 text-center">
                <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text group">
                    <span className="w-8 h-[1px] bg-border group-hover:w-12 group-hover:bg-purple transition-all" />
                    <span className="group-hover:text-purple transition-colors italic">Return to Wedding Insights</span>
                </Link>
            </div>
        </article>
    );
}

