import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="footer" className="mt-32 py-20 bg-surface border-t border-editorial print:hidden">
            <div className="container">
                <div className="grid md:grid-cols-12 gap-16">
                    <div className="md:col-span-5">
                        <Link href="/" className="block mb-8">
                            <img
                                src="/images/logo.png"
                                alt="Grin Weddings"
                                className="h-10 w-auto object-contain dark:brightness-0 dark:invert opacity-80"
                            />
                        </Link>
                        <p className="text-[0.9rem] leading-relaxed max-w-sm font-medium text-text-muted">
                            The authoritative network for data-driven wedding planning.
                            Built for modern couples who value taste, precision, and intelligence.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em] text-purple">
                            The Intel
                        </h4>
                        <ul className="space-y-4 text-[0.85rem] font-bold uppercase tracking-widest text-text-muted">
                            <li>
                                <Link href="/vendors" className="transition-colors hover:text-purple">
                                    Market Leaders
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="transition-colors hover:text-purple">
                                    Latest Insights
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/budget-calculator" className="transition-colors hover:text-purple">
                                    Analytics Tools
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em] text-purple">
                            Support
                        </h4>
                        <p className="text-[0.85rem] mb-6 font-medium leading-relaxed text-text-muted">
                            Questions? Connect with our intelligence team.
                        </p>
                        <Link
                            href="/contact"
                            className="font-black uppercase text-[10px] tracking-widest pb-1 transition-all text-text border-b-2 border-purple"
                        >
                            Contact Support &rarr;
                        </Link>
                    </div>
                </div>

                <div className="mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.25em] border-t border-editorial text-text-dim">
                    <div>&copy; {new Date().getFullYear()} GRIN WEDDINGS. ALL RIGHTS RESERVED.</div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-text-muted transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-text-muted transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
