'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Trophy, Calculator, Command } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Intel Home', icon: Home },
    { href: '/blog', label: 'Market Insights', icon: Newspaper },
    { href: '/vendors', label: 'Top Rankings', icon: Trophy },
    { href: '/tools/budget-calculator', label: 'Analysis Tools', icon: Calculator },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white z-40 transition-all duration-300 shadow-premium">
      {/* Logo Section */}
      <div className="p-6 mb-4">
        <Link href="/" className="block hover:opacity-80 transition-opacity">
          <img 
            src="/images/logo.png" 
            alt="Grin Weddings" 
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-4 gap-2">
        <div className="mb-4 px-2 flex items-center gap-2">
          <Command className="w-4 h-4 text-purple-600" />
          <span className="text-subtle font-black tracking-[0.2em]">The Network</span>
        </div>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-[0.95rem] font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-rose-500' : 'group-hover:text-rose-600'}`} />
                <span className="relative">
                  {item.label}
                  {!isActive && (
                    <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full" />
                  )}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="flex flex-col gap-3">
          <div className="w-12 h-1 bg-purple-600 rounded-full" />
          <p className="text-[0.75rem] font-medium text-gray-500 leading-relaxed uppercase tracking-widest">
            Grin Weddings Premium Authority
          </p>
          <p className="text-[0.65rem] text-gray-400">
            © 2026 Grin platform. Data-driven wedding excellence.
          </p>
        </div>
      </div>
    </aside>
  );
}
