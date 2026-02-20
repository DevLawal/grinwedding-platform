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

export const revalidate = 3600;

export default async function Home() {
  const [posts, vendors] = await Promise.all([
    getPosts(4),
    getVendors()
  ]);

  const topVendors = vendors.slice(0, 6);

  return (
    <div className="min-h-screen" style={{ background: '#0d0d0d' }}>
      {/* Purple Hero Glow */}
      <div
        className="absolute top-0 left-64 right-0 h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 60% -10%, rgba(167,139,250,0.1) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      <div className="relative flex flex-col lg:flex-row gap-16 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-10" style={{ zIndex: 1 }}>

        {/* Main Content Stream */}
        <div className="flex-1 min-w-0">

          {/* Hero */}
          <section className="mb-20 pt-4">
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#c4b5fd' }}>
                Grin Weddings · Intelligence Platform
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-black mb-6 leading-[1.1]" style={{ color: '#f0f0f2' }}>
              The Future of<br />
              <span style={{ color: '#c4b5fd' }}>Wedding Planning.</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl font-medium" style={{ color: '#6b6b75' }}>
              Join <span style={{ color: '#f0f0f2', fontWeight: 900 }}>10,000+</span> elite planners and couples
              tracking vendor performance, market trends, and wedding intelligence.
            </p>

            {/* CTA Links */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/tools/budget-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                style={{
                  background: '#c4b5fd',
                  color: '#0d0d0d',
                }}
              >
                Budget Calculator →
              </Link>
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                style={{
                  background: 'transparent',
                  color: '#a0a0a8',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Explore Vendors
              </Link>
            </div>
          </section>

          {/* Divider */}
          <div className="mb-16" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          {/* Latest Intelligence */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#6b6b75' }}>
                Latest Intelligence
              </h2>
              <Link
                href="/blog"
                className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                style={{ color: '#c4b5fd' }}
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
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#6b6b75' }}>
                Market Leaderboard
              </h2>
              <Link
                href="/vendors"
                className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                style={{ color: '#c4b5fd' }}
              >
                Full Indices &rarr;
              </Link>
            </div>

            <style>{leaderboardStyles}</style>
          <div
              className="overflow-hidden"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="text-[9px] uppercase font-black tracking-[0.2em]"
                    style={{
                      background: '#1c1c1c',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      color: '#444448',
                    }}
                  >
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
                      className="lb-row transition-all duration-200"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <td className="py-5 px-6 font-mono text-sm font-black" style={{ color: 'rgba(196,181,253,0.4)' }}>
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-5 px-6">
                        <Link
                          href={`/vendors/${vendor.slug}`}
                          className="lb-vendor font-black uppercase tracking-widest text-[0.8rem] transition-colors"
                          style={{ color: '#a0a0a8' }}
                        >
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#444448' }}>
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right font-mono text-sm font-black" style={{ color: '#f0f0f2' }}>
                        {(vendor.rating || 0).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA Block */}
          <section
            className="p-14 md:p-20 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a0f2e 0%, #0f0a1e 50%, #0d0d0d 100%)',
              border: '1px solid rgba(196,181,253,0.1)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(167,139,250,0.12) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-6" style={{ color: '#c4b5fd' }}>
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 tracking-tight" style={{ color: '#f0f0f2' }}>
                The Future of Planning.
              </h2>
              <p className="mb-10 max-w-lg mx-auto font-medium leading-relaxed" style={{ color: '#6b6b75' }}>
                Access curated intelligence, verified rankings, and precision tools for the modern wedding market.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/tools/budget-calculator"
                  className="px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all"
                  style={{ background: '#c4b5fd', color: '#0d0d0d' }}
                >
                  Budget Analytics
                </Link>
                <Link
                  href="/vendors"
                  className="px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all"
                  style={{
                    background: 'transparent',
                    color: '#a0a0a8',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
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
