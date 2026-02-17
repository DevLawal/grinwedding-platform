'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Insights' },
    { href: '/vendors', label: 'Rankings' },
    { href: '/tools/budget-calculator', label: 'Tools' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-gray-100 bg-white p-8 z-40">
      {/* Logo */}
      <Link href="/" className="mb-12 text-2xl font-serif font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
        Grin<span className="text-rose-600">.</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="mt-auto pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400 leading-relaxed">
          Data-driven wedding planning insights
        </p>
      </div>
    </aside>
  );
}
