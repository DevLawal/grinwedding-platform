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
                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:border-gray-300 hover:text-gray-800 transition-colors"
                >
                    Previous
                </Link>
            ) : (
                <span className="px-6 py-2 border border-gray-100 text-gray-300 rounded-lg cursor-not-allowed">
                    Previous
                </span>
            )}

            <span className="px-4 py-2 text-gray-500">
                Page {currentPage} of {totalPages}
            </span>

            {nextPage ? (
                <Link
                    href={`${basePath}?page=${nextPage}`}
                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:border-gray-300 hover:text-gray-800 transition-colors"
                >
                    Next
                </Link>
            ) : (
                <span className="px-6 py-2 border border-gray-100 text-gray-300 rounded-lg cursor-not-allowed">
                    Next
                </span>
            )}
        </div>
    );
}
