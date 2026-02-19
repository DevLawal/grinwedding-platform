import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-ivory border-t border-gray-100 mt-32 py-20">
            <div className="container">
                <div className="grid md:grid-cols-12 gap-16">
                    <div className="md:col-span-5">
                        <Link href="/" className="block mb-8">
                            <img 
                                src="/images/logo.png" 
                                alt="Grin Weddings" 
                                className="h-10 w-auto object-contain grayscale brightness-0 opacity-80"
                            />
                        </Link>
                        <p className="text-gray-500 text-[0.9rem] leading-relaxed max-w-sm font-medium">
                            The authoritative network for data-driven wedding planning. 
                            Built for modern couples who value taste, precision, and intelligence.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-black mb-8 text-black uppercase text-[10px] tracking-[0.2em]">The Intel</h4>
                        <ul className="space-y-4 text-[0.85rem] text-gray-500 font-bold uppercase tracking-widest">
                            <li><Link href="/vendors" className="hover:text-black transition-colors">Market Leaders</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">Latest Insights</Link></li>
                            <li><Link href="/tools/budget-calculator" className="hover:text-black transition-colors">Analytics Tools</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="font-black mb-8 text-black uppercase text-[10px] tracking-[0.2em]">Support</h4>
                        <p className="text-gray-500 text-[0.85rem] mb-6 font-medium leading-relaxed">
                            Questions? Connect with our intelligence team.
                        </p>
                        <Link href="/contact" className="text-black font-black uppercase text-[10px] tracking-widest border-b-2 border-plum hover:border-black transition-all pb-1">
                            Contact Support &rarr;
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">
                    <div>&copy; {new Date().getFullYear()} GRIN WEDDINGS. ALL INTEL RESERVED.</div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
