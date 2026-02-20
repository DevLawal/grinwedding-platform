import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-surface/90 backdrop-blur-md border-b border-editorial">
            <div className="container px-6 py-3 flex justify-between items-center">
                <Link href="/" className="block w-24 h-8 hover:opacity-70 transition-opacity">
                    <img 
                        src="/images/logo.png" 
                        alt="Grin Weddings" 
                        className="h-full w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" 
                    />
                </Link>

                <button className="p-2 text-text hover:text-purple transition-colors">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
