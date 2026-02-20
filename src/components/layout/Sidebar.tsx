'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Wedding Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Wedding Tools' },
    { href: '/tools/wedding-playbook', label: 'Wedding Playbook' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col z-40 bg-base border-r border-editorial">
      {/* Purple top glow */}
      <div className="absolute top-0 right-0 h-48 pointer-events-none purple-glow-bg opacity-50" />

      {/* Logo */}
        <Link href="/" className="block w-32 h-32 hover:opacity-70 transition-opacity">
          <img
            src="/images/logo.png"
            alt="Grin Weddings"
            className="h-full w-auto pl-8 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
          />
        </Link>

      {/* Divider */}
      <div className="mx-8 mb-6 h-px bg-border" />

      {/* Navigation */}
      <nav className="flex flex-col px-8 gap-1 relative">
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
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.78rem] font-bold uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? 'text-purple bg-purple-dim'
                    : 'text-text-dim hover:text-text-muted'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-purple" />
                )}
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="h-px flex-grow bg-border" />
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-text-dim">
          Grin Weddings
        </p>
        <p className="text-[0.55rem] mt-1 text-text-dim/60">
          © 2026 · Data-Driven Excellence
        </p>
      </div>
    </aside>
  );
}
