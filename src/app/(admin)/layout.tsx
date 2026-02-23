import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${playfair.variable} min-h-screen bg-base font-sans`}>
      {children}
    </div>
  );
}
