import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Grin Weddings — Wedding Intelligence Platform",
  description: "The authoritative network for data-driven wedding planning. Vendor rankings, market insights, and planning tools.",
};

import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppLayoutWrapper>
            {children}
          </AppLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
