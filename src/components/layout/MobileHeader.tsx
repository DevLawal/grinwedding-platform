'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Market Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Analysis Tools' },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(13,13,13,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="block hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/images/logo.png"
              alt="Grin Weddings"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-colors"
            style={{ color: isMenuOpen ? '#c4b5fd' : '#a0a0a8' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-72 z-50 flex flex-col pt-20"
              style={{
                background: '#0d0d0d',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Purple top glow in drawer */}
              <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 100% at 100% -10%, rgba(167,139,250,0.1) 0%, transparent 70%)',
                }}
              />

              <div className="px-8 mb-6">
                <span className="text-[0.6rem] font-black uppercase tracking-[0.25em]" style={{ color: '#6b6b75' }}>
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
                        className="block py-3 px-4 rounded-lg text-[0.9rem] font-bold uppercase tracking-wider transition-all"
                        style={{
                          color: isActive ? '#c4b5fd' : '#a0a0a8',
                          background: isActive ? 'rgba(196,181,253,0.08)' : 'transparent',
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto p-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[0.65rem] font-black uppercase tracking-widest mb-1" style={{ color: '#6b6b75' }}>
                  Grin Weddings
                </p>
                <p className="text-xs font-medium leading-relaxed" style={{ color: '#444448' }}>
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
