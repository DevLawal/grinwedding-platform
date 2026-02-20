import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

import { ThemeProvider } from "@/components/layout/ThemeProvider";

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar />
          <MobileHeader />
          <main className="flex-grow lg:ml-64 flex flex-col">
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
