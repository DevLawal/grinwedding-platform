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
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" className="font-serif text-2xl font-bold text-gray-900">
                        Grin<span className="text-purple-600">.</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 bg-gray-50 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        <span className="mr-3">📊</span>
                        Overview
                    </Link>
                    <Link href="/dashboard/guests" className="flex items-center px-4 py-2 text-gray-600 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        <span className="mr-3">👥</span>
                        Guests
                    </Link>
                    <Link href="/dashboard/events" className="flex items-center px-4 py-2 text-gray-600 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        <span className="mr-3">📅</span>
                        Events
                    </Link>
                    <Link href="/dashboard/vendors" className="flex items-center px-4 py-2 text-gray-600 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        <span className="mr-3">🏪</span>
                        My Vendors
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                            JD
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">John Doe</p>
                            <p className="text-gray-500 text-xs">john@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
                    <Link href="/" className="font-serif text-xl font-bold text-gray-900">
                        Grin<span className="text-purple-600">.</span>
                    </Link>
                    <button className="text-gray-500">
                        <span className="sr-only">Menu</span>
                        ☰
                    </button>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
