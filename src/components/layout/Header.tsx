import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-ivory/90 backdrop-blur-md border-b border-gray-100">
            <div className="container px-6 py-3 flex justify-between items-center">
                <Link href="/" className="block hover:opacity-70 transition-opacity">
                    <Image 
                        src="/images/logo.png" 
                        alt="Grin Weddings" 
                        width={140} 
                        height={40} 
                        className='w-24 h-auto object-contain grayscale brightness-0 opacity-90' 
                        priority
                    />
                </Link>

                <button className="p-2 text-charcoal hover:text-plum transition-colors">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
