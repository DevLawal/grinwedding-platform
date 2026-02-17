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
            className={`inline-block px-3 py-1 bg-rose-50 text-rose-600 text-xs font-semibold rounded-full hover:bg-rose-100 transition-colors ${className}`}
        >
            {name}
        </Link>
    );
}
