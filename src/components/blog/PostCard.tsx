import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/wordpress';
import parse from 'html-react-parser';

interface PostCardProps {
    post: Post;
    className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
    const featuredImage = (typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.node?.sourceUrl) || '';
    const date = format(parseISO(post.date), 'MMM d, yyyy');

    return (
        <article className={`group flex flex-col bg-transparent transition-all duration-300 ${className}`}>
            {/* Image Container - Flat & Clean */}
            <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] overflow-hidden mb-6 block border border-gray-100">
                {featuredImage && typeof featuredImage === 'string' ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImage?.node?.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-200">No Visual</span>
                    </div>
                )}
            </Link>

            {/* Content Segment */}
            <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-plum">
                        {post.categories?.nodes?.[0]?.name || 'Analysis'}
                    </span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <time dateTime={post.date} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {date}
                    </time>
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-4">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal leading-[1.2] transition-opacity group-hover:opacity-80">
                        {parse(post.title)}
                    </h3>
                </Link>

                <p className="text-[0.95rem] text-gray-500 leading-relaxed font-medium mb-6 line-clamp-2">
                    {parse(post.excerpt?.substring(0, 120) + '...')}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal hover:text-plum transition-colors flex items-center gap-2"
                    >
                        Read Full Intel
                        <span className="text-lg leading-none">&rarr;</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
