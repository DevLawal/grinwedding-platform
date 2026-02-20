import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-4 mt-12">
            {prevPage ? (
                <Link
                    href={`${basePath}?page=${prevPage}`}
                    className="px-6 py-2 border border-editorial text-text-muted rounded-lg hover:border-text hover:text-text transition-colors"
                >
                    Previous
                </Link>
            ) : (
                <span className="px-6 py-2 border border-editorial text-text-dim rounded-lg cursor-not-allowed opacity-50">
                    Previous
                </span>
            )}

            <span className="px-4 py-2 text-text-dim font-black uppercase tracking-widest text-[10px]">
                Page {currentPage} / {totalPages}
            </span>

            {nextPage ? (
                <Link
                    href={`${basePath}?page=${nextPage}`}
                    className="px-6 py-2 border border-editorial text-text-muted rounded-lg hover:border-text hover:text-text transition-colors"
                >
                    Next
                </Link>
            ) : (
                <span className="px-6 py-2 border border-editorial text-text-dim rounded-lg cursor-not-allowed opacity-50">
                    Next
                </span>
            )}
        </div>
    );
}
