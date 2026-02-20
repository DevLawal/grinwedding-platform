import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${playfair.variable} min-h-screen bg-base font-sans transition-colors duration-500`}>
      <div className="flex">
        {/* Simple Static Admin Sidebar */}
        <aside className="w-64 bg-surface border-r border-editorial min-h-screen fixed left-0 top-0">
          <div className="p-8">
            <h2 className="text-xl font-serif font-black tracking-tighter uppercase italic text-text">Grin Admin</h2>
            <p className="text-[10px] text-text-dim font-black tracking-[0.2em] mt-2">INTEL TERMINAL</p>
          </div>
          
          <nav className="mt-8">
            <a href="/admin" className="block px-8 py-4 text-[11px] font-black uppercase tracking-widest bg-text-dim/5 text-purple border-r-4 border-purple">
              Discovery Ops
            </a>
            <a href="/vendors" className="block px-8 py-4 text-[11px] font-black uppercase tracking-widest text-text-dim hover:text-text hover:bg-text-dim/5 transition-colors">
              Public View
            </a>
          </nav>
        </aside>

        <main className="flex-grow ml-64 p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
