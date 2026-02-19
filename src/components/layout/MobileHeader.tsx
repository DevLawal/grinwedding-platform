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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <Link 
            href="/" 
            className="block hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="/images/logo.png" 
              alt="Grin Weddings" 
              className="h-8 w-auto object-contain grayscale brightness-0 opacity-90"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-charcoal hover:text-plum transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-ivory z-50 shadow-xl flex flex-col pt-24"
            >
              <div className="px-10 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">The Network</span>
              </div>
              <nav className="flex flex-col px-10 gap-8">
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
                        className={`block text-xl font-black uppercase tracking-widest ${
                          isActive ? 'text-plum' : 'text-charcoal'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              <div className="mt-auto p-10 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Authority Portal</p>
                <p className="text-xs text-charcoal font-bold leading-relaxed uppercase tracking-tighter">Defining the future of wedding intelligence.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
