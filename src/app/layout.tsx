import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Grin Weddings — Wedding Intelligence Platform",
  description: "The authoritative network for data-driven wedding planning. Vendor rankings, market insights, and planning tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans flex flex-col min-h-screen" style={{ background: '#0d0d0d', color: '#f0f0f2' }}>
        <Sidebar />
        <MobileHeader />
        <main className="flex-grow lg:ml-64 flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </main>
      </body>
    </html>
  );
}
