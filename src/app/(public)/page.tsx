import Link from 'next/link';

const leaderboardStyles = `
  .lb-row:hover { background: #1c1c1c; }
  .lb-vendor:hover { color: #c4b5fd; }
`;
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PopularContentCard from '@/components/layout/PopularContentCard';
import PostCard from '@/components/blog/PostCard';
import parse from 'html-react-parser';
import HeroTypewriter from '@/components/ui/HeroTypewriter';

export const revalidate = 3600;

export default async function Home() {
  const [posts, vendors] = await Promise.all([
    getPosts(4),
    getVendors()
  ]);

  const topVendors = vendors.slice(0, 6);

  return (
    <div className="min-h-screen bg-base">
      {/* Purple Hero Glow */}
      <div className="absolute top-0 left-64 right-0 h-[500px] pointer-events-none purple-glow-bg opacity-30 z-0" />

      <div className="relative flex flex-col lg:flex-row gap-16 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-10 z-1">

        {/* Main Content Stream */}
        <div className="flex-1 min-w-0">

          {/* Hero */}
          <section className="mb-20 pt-4">
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple">
                Grin Weddings · Intelligence Platform
              </span>
            </div>
            <HeroTypewriter />
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl font-medium text-text-muted">
              Join <span className="text-text font-black">10,000+</span> elite planners and couples
              tracking vendor performance, market trends, and wedding intelligence.
            </p>

            {/* CTA Links */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/tools/budget-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all bg-purple text-base dark:text-base-dark"
              >
                Budget Calculator →
              </Link>
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all bg-transparent text-text-dim border border-editorial hover:bg-surface"
              >
                Explore Vendors
              </Link>
            </div>
          </section>

          {/* Divider */}
          <div className="mb-16 h-px bg-border-editorial opacity-30" />

          {/* Latest Intelligence */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">
                Latest Intelligence
              </h2>
              <Link
                href="/blog"
                className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors text-purple"
              >
                Archive &rarr;
              </Link>
            </div>

            <div className="magazine-grid">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Market Leaderboard */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">
                Market Leaderboard
              </h2>
              <Link
                href="/vendors"
                className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors text-purple"
              >
                Full Indices &rarr;
              </Link>
            </div>

            <div className="bg-surface border border-editorial overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[9px] uppercase font-black tracking-[0.2em] bg-surface-2 border-b border-editorial text-text-dim">
                    <th className="py-4 px-6">#</th>
                    <th className="py-4 px-6">Vendor</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6 text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topVendors.map((vendor, index) => (
                    <tr
                      key={vendor.id}
                      className="group transition-all duration-200 border-b border-editorial/50 hover:bg-surface-2"
                    >
                      <td className="py-5 px-6 font-mono text-sm font-black text-purple/40">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-5 px-6">
                        <Link
                          href={`/vendors/${vendor.slug}`}
                          className="font-black uppercase tracking-widest text-[0.8rem] transition-colors text-text-muted group-hover:text-purple"
                        >
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[9px] font-black uppercase tracking-widest text-text-dim">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right font-mono text-sm font-black text-text">
                        {(vendor.rating || 0).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA Block */}
          <section className="p-14 md:p-20 text-center relative overflow-hidden bg-surface-2 border border-editorial shadow-premium">
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none purple-glow-bg opacity-30" />

            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-6 text-purple">
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 tracking-tight text-text">
                The Future of Planning.
              </h2>
              <p className="mb-10 max-w-lg mx-auto font-medium leading-relaxed text-text-muted">
                Access curated intelligence, verified rankings, and precision tools for the modern wedding market.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/tools/budget-calculator"
                  className="px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all bg-purple text-base dark:text-base-dark"
                >
                  Budget Analytics
                </Link>
                <Link
                  href="/vendors"
                  className="px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all bg-transparent text-text-dim border border-editorial hover:bg-surface-3"
                >
                  Market Exploration
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Cards */}
        <aside className="w-full lg:w-72 space-y-8 shrink-0">
          <NewsletterCard />
          <PopularContentCard />
        </aside>
      </div>
    </div>
  );
}
