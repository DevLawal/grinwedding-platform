'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current route is a standalone event page
  // Standalone routes start with a signature that isn't a known main route
  const isStandalone = pathname !== '/' && 
                       !pathname.startsWith('/admin') && 
                       !pathname.startsWith('/dashboard') && 
                       !pathname.startsWith('/blog') && 
                       !pathname.startsWith('/vendors') && 
                       !pathname.startsWith('/tools') &&
                       !pathname.startsWith('/about') &&
                       !pathname.startsWith('/contact') &&
                       !pathname.startsWith('/category');

  if (isStandalone) {
    return (
      <div className="light bg-wedding-50 text-slate-900 min-h-screen flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <MobileHeader />
      <main className="flex-grow lg:ml-64 flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </main>
    </>
  );
}
