import Link from 'next/link';

interface CategoryBadgeProps {
    name: string;
    slug: string;
    className?: string;
}

export default function CategoryBadge({ name, slug, className = '' }: CategoryBadgeProps) {
    return (
        <Link
            href={`/category/${slug}`}
            className={`inline-block px-3 py-1 bg-purple-dim text-purple text-[10px] font-black uppercase tracking-widest border border-purple/10 rounded-full hover:bg-purple hover:text-white transition-all ${className}`}
        >
            {name}
        </Link>
    );
}
