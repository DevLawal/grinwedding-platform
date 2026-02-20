import Link from 'next/link';

export default function Footer() {
    return (
        <footer
            className="mt-32 py-20"
            style={{
                background: '#0a0a0a',
                borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
        >
            <div className="container">
                <div className="grid md:grid-cols-12 gap-16">
                    <div className="md:col-span-5">
                        <Link href="/" className="block mb-8">
                            <img
                                src="/images/logo.png"
                                alt="Grin Weddings"
                                className="h-10 w-auto object-contain brightness-0 invert opacity-80"
                            />
                        </Link>
                        <p className="text-[0.9rem] leading-relaxed max-w-sm font-medium" style={{ color: '#6b6b75' }}>
                            The authoritative network for data-driven wedding planning.
                            Built for modern couples who value taste, precision, and intelligence.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em]" style={{ color: '#c4b5fd' }}>
                            The Intel
                        </h4>
                        <ul className="space-y-4 text-[0.85rem] font-bold uppercase tracking-widest" style={{ color: '#6b6b75' }}>
                            <li>
                                <Link href="/vendors" className="transition-colors hover:text-[#c4b5fd]" style={{ color: 'inherit' }}>
                                    Market Leaders
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="transition-colors hover:text-[#c4b5fd]" style={{ color: 'inherit' }}>
                                    Latest Insights
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/budget-calculator" className="transition-colors hover:text-[#c4b5fd]" style={{ color: 'inherit' }}>
                                    Analytics Tools
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em]" style={{ color: '#c4b5fd' }}>
                            Support
                        </h4>
                        <p className="text-[0.85rem] mb-6 font-medium leading-relaxed" style={{ color: '#6b6b75' }}>
                            Questions? Connect with our intelligence team.
                        </p>
                        <Link
                            href="/contact"
                            className="font-black uppercase text-[10px] tracking-widest pb-1 transition-all"
                            style={{
                                color: '#f0f0f2',
                                borderBottom: '2px solid #c4b5fd',
                            }}
                        >
                            Contact Support &rarr;
                        </Link>
                    </div>
                </div>

                <div
                    className="mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.25em]"
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        color: '#444448',
                    }}
                >
                    <div>&copy; {new Date().getFullYear()} GRIN WEDDINGS. ALL INTEL RESERVED.</div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-[#a0a0a8] transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-[#a0a0a8] transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
