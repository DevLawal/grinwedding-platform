'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Wedding Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Wedding Tools' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-ivory z-40 border-r border-gray-100">
      {/* Logo Section */}
      <div className="px-8 pt-8">
        <Link href="/" className="block hover:opacity-70 transition-opacity">
          <img 
            src="/images/logo.png" 
            alt="Grin Weddings" 
            className="h-20 w-auto object-contain grayscale brightness-0 opacity-90"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-10 gap-6">
        <div className="mb-2">

        </div>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`group relative text-[0.85rem] font-black uppercase tracking-widest transition-opacity duration-300 ${
                  isActive
                    ? 'text-plum'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-plum" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-10">
        <div className="flex flex-col gap-4">
          <div className="w-8 h-[1px] bg-gray-200" />
          <p className="text-[0.65rem] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
            Grin Weddings Premium Authority
          </p>
          <p className="text-[0.6rem] text-gray-300 font-medium">
            © 2026 GRIN. DATA-DRIVEN EXCELLENCE.
          </p>
        </div>
      </div>
    </aside>
  );
}
