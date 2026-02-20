import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/wordpress';
import parse from 'html-react-parser';

// Pure-CSS hover — no client-side event handlers needed
const postCardStyles = `
  .post-card-cta { color: var(--text-muted); }
  .post-card-cta:hover { color: var(--purple); }
`;

interface PostCardProps {
    post: Post;
    className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
    const featuredImage = (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.node?.sourceUrl) || '';
    const date = format(parseISO(post.date), 'MMM d, yyyy');

    return (
        <>
        <style>{postCardStyles}</style>
        <article
            className={`group flex flex-col transition-all duration-300 bg-surface border border-editorial ${className}`}
        >
            {/* Image */}
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                {featuredImage && typeof featuredImage === 'string' ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImage?.node?.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim opacity-50">No Image</span>
                    </div>
                )}
                {/* Purple overlay gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none purple-glow-bg opacity-20" />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple">
                        {post.categories?.nodes?.[0]?.name || 'Analysis'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <time dateTime={post.date} className="text-[10px] font-bold uppercase tracking-widest text-text-dim">
                        {date}
                    </time>
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h3 className="text-lg md:text-xl font-serif font-bold leading-[1.25] transition-colors duration-200 text-text">
                        {parse(post.title)}
                    </h3>
                </Link>

                <div className="text-[0.88rem] leading-relaxed mb-6 line-clamp-2 text-text-muted">
                    {parse(post.excerpt?.substring(0, 120) + '...')}
                </div>

                <div className="mt-auto pt-4 border-t border-editorial opacity-50">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="post-card-cta text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors duration-200"
                    >
                        Read Article
                        <span className="text-base leading-none">&rarr;</span>
                    </Link>
                </div>
            </div>
        </article>
        </>
    );
}
