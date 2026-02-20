import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Grin Weddings',
    description: 'Manage your wedding events and guests.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-base font-sans transition-colors duration-500">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-editorial hidden md:flex flex-col">
                <div className="p-6 border-b border-editorial">
                    <Link href="/" className="font-serif text-2xl font-black text-text uppercase tracking-tighter italic">
                        Grin<span className="text-purple">.</span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <Link href="/dashboard" className="flex items-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-purple bg-purple-dim border border-purple/10 rounded-md transition-all">
                        <span className="mr-3 text-lg">📊</span>
                        Overview
                    </Link>
                    <Link href="/dashboard/guests" className="flex items-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text hover:bg-surface-2 border border-transparent rounded-md transition-all">
                        <span className="mr-3 text-lg">👥</span>
                        Guests
                    </Link>
                    <Link href="/dashboard/events" className="flex items-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text hover:bg-surface-2 border border-transparent rounded-md transition-all">
                        <span className="mr-3 text-lg">📅</span>
                        Events
                    </Link>
                    <Link href="/dashboard/vendors" className="flex items-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text hover:bg-surface-2 border border-transparent rounded-md transition-all">
                        <span className="mr-3 text-lg">🏪</span>
                        My Vendors
                    </Link>
                </nav>

                <div className="p-6 border-t border-editorial">
                    <div className="flex items-center gap-4 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-purple-dim border border-purple/10 flex items-center justify-center text-purple font-black text-xs">
                            JD
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest">
                            <p className="text-text">John Doe</p>
                            <p className="text-text-dim opacity-60">john@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-surface border-b border-editorial p-6 flex justify-between items-center sticky top-0 z-10">
                    <Link href="/" className="font-serif text-xl font-black text-text uppercase italic">
                        Grin<span className="text-purple">.</span>
                    </Link>
                    <button className="text-text">
                        <span className="sr-only">Menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
