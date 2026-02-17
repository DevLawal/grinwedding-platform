import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
                    Grin<span className="text-rose-600">.</span>
                </Link>

                <nav className="hidden md:flex gap-8 items-center font-medium text-sm tracking-wide">
                    <Link href="/" className="text-gray-600 hover:text-rose-600 transition-colors">Home</Link>
                    <Link href="/blog" className="text-gray-600 hover:text-rose-600 transition-colors">Insights</Link>
                    <Link href="/vendors" className="text-gray-600 hover:text-rose-600 transition-colors">Rankings</Link>
                    <Link href="/tools/budget-calculator" className="text-gray-600 hover:text-rose-600 transition-colors">Tools</Link>
                </nav>

                <button className="md:hidden p-2 text-gray-600 hover:text-rose-600 transition-colors">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
