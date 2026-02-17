import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/wordpress';
import parse from 'html-react-parser';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    // const authorName = post._embedded?.author?.[0]?.name; // Removing author for cleaner look

    return (
        <article className="group flex flex-col md:flex-row gap-6 md:items-start p-4 hover:bg-gray-50 rounded-lg transition-colors -mx-4">
            {/* Thumbnail (Right side on desktop for visual balance, or hidden if desired) 
                 Detailed.com often has no images, but we'll keep a small one for visual interest 
             */}
            {featuredImage && (
                <div className="shrink-0 md:order-2">
                    <Link href={`/blog/${post.slug}`} className="block relative h-32 w-full md:w-32 overflow-hidden rounded-md bg-gray-100">
                        <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                            sizes="(max-width: 768px) 100vw, 128px"
                        />
                    </Link>
                </div>
            )}

            <div className="flex-grow md:order-1 relative">
                <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">
                    {format(parseISO(post.date), 'MMM d, yyyy')}
                </div>

                <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors leading-tight">
                        {parse(post.title.rendered)}
                    </h3>
                </Link>

                <div className="text-gray-600 text-base leading-relaxed line-clamp-3">
                    {parse(post.excerpt.rendered)}
                </div>
            </div>
        </article>
    );
}
