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
    const date = format(parseISO(post.date), 'MMMM d, yyyy');

    return (
        <article className={`group flex flex-col bg-white overflow-hidden transition-all duration-500 shadow-premium hover:shadow-hover border border-gray-100/50 ${className}`}>
            {/* Featured Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                {featuredImage && typeof featuredImage === 'string' ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImage?.node?.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                        <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-0 left-0">
                    <div className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                        {post.categories?.nodes?.[0]?.name || 'Article'}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-8 md:p-10 border-t border-gray-50">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[1px] bg-purple-600" />
                    <time dateTime={post.date} className="text-subtle font-bold text-purple-600">
                        {date}
                    </time>
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-black leading-[1.1] transition-colors group-hover:text-purple-600 tracking-tight">
                        {parse(post.title)}
                    </h3>
                </Link>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50/50">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        5 min read
                    </span>
                    <div className="flex items-center gap-2 group/btn">
                        <span className="text-[11px] font-black uppercase tracking-tighter text-black">
                            Explore
                        </span>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 group-hover/btn:bg-black group-hover/btn:text-white transition-all duration-300">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
