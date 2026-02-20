'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Wedding Insights' },
    { href: '/vendors', label: 'Top Rankings' },
    { href: '/tools/budget-calculator', label: 'Wedding Tools' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col z-40"
      style={{
        background: '#0d0d0d',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Purple top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% -10%, rgba(167,139,250,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div className="px-8 pt-8 pb-6 relative">
        <Link href="/" className="block hover:opacity-70 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Grin Weddings"
            width={140}
            height={56}
            className="h-16 w-auto object-contain brightness-0 invert opacity-90"
            priority
          />
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-8 mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

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
                    ? 'text-[#c4b5fd]'
                    : 'text-[#6b6b75] hover:text-[#a0a0a8]'
                }`}
                style={isActive ? { background: 'rgba(196,181,253,0.08)' } : {}}
              >
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: '#c4b5fd' }}
                  />
                )}
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-8 relative">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '1.25rem' }} />
        <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: '#6b6b75' }}>
          Grin Weddings
        </p>
        <p className="text-[0.55rem] mt-1" style={{ color: '#444448' }}>
          © 2026 · Data-Driven Excellence
        </p>
      </div>
    </aside>
  );
}
