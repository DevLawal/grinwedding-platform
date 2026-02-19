import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-xl transition-all duration-300 shadow-premium">
            <div className="container px-6 py-4 flex justify-between items-center">
                <Link href="/" className="block hover:opacity-80 transition-opacity">
                    <Image 
                        src="/images/logo.png" 
                        alt="Grin Weddings" 
                        width={200} 
                        height={60} 
                        className='w-32 h-auto object-contain' 
                        priority
                    />
                </Link>

                <nav className="hidden md:flex gap-10 items-center">
                    {['Home', 'Insights', 'Rankings', 'Tools'].map((label, idx) => {
                        const hrefs = ['/', '/blog', '/vendors', '/tools/budget-calculator'];
                        return (
                            <Link 
                                key={label}
                                href={hrefs[idx]} 
                                className="group relative text-[0.95rem] font-bold text-gray-900 overflow-hidden"
                            >
                                <span>{label}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                <button className="md:hidden p-2 text-black hover:text-purple-600 transition-colors">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
