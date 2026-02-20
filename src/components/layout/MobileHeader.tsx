'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Market Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Analysis Tools' },
    { href: '/tools/wedding-playbook', label: 'Wedding Playbook' },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-base/95 border-b border-editorial">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="block w-24 h-8 hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/images/logo.png"
              alt="Grin Weddings"
              className="h-full w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen"
            />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${isMenuOpen ? 'text-purple' : 'text-text-muted'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-72 z-50 flex flex-col pt-20 bg-base border-l border-editorial"
            >
              {/* Purple top glow in drawer */}
              <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none purple-glow-bg opacity-50" />

              <div className="px-8 mb-6">
                <span className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-text-dim">
                  Navigation
                </span>
              </div>

              <nav className="flex flex-col px-8 gap-1">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-3 px-4 rounded-lg text-[0.9rem] font-bold uppercase tracking-wider transition-all ${
                          isActive ? 'text-purple bg-purple-dim' : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto p-8 border-t border-editorial">
                <p className="text-[0.65rem] font-black uppercase tracking-widest mb-1 text-text-dim">
                  Grin Weddings
                </p>
                <p className="text-xs font-medium leading-relaxed text-text-dim/60">
                  Defining the future of wedding intelligence.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
