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
    { href: '/', label: 'Intel Home' },
    { href: '/blog', label: 'Market Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Analysis Tools' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-premium border-b border-gray-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="block hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="/images/logo.png" 
              alt="Grin Weddings" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black hover:bg-gray-100 rounded-full transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col pt-24"
            >
              <div className="px-8 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">The Grin Network</span>
              </div>
              <nav className="flex flex-col px-4 gap-2">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-5 text-2xl font-serif font-black tracking-tight ${
                          isActive ? 'text-purple-600' : 'text-black'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              <div className="mt-auto p-8 border-t border-gray-50 bg-gray-50/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Expert Analysis Service</p>
                <p className="text-xs text-black font-bold italic">Defining the future of wedding planning through data.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
