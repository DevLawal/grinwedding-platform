import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-20 z-[1000]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-12 font-sans">
                    <div>
                        <Link href="/" className="block font-serif text-2xl font-bold text-gray-900 mb-6">
                            Grin<span className="text-rose-600">.</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-loose max-w-sm">
                            Data-driven wedding planning for modern couples.
                            Curated rankings, real insights, and powerful tools to help you plan without the stress.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-gray-900 uppercase text-xs tracking-widest">Explore</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/vendors" className="hover:text-rose-600 transition-colors">Vendor Rankings</Link></li>
                            <li><Link href="/blog" className="hover:text-rose-600 transition-colors">Latest Insights</Link></li>
                            <li><Link href="/tools/budget-calculator" className="hover:text-rose-600 transition-colors">Budget Calculator</Link></li>
                            <li><Link href="/about" className="hover:text-rose-600 transition-colors">About Grin</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-gray-900 uppercase text-xs tracking-widest">Connect</h4>
                        <p className="text-gray-500 text-sm mb-4">
                            Questions? We'd love to help.
                        </p>
                        <Link href="/contact" className="text-rose-600 font-medium hover:text-rose-700 transition-colors">
                            Contact Support &rarr;
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-16 pt-8 text-center text-xs text-gray-400 font-mono">
                    &copy; {new Date().getFullYear()} Grin Weddings. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
