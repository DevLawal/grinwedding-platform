import Link from 'next/link';
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PopularContentCard from '@/components/layout/PopularContentCard';
import PostCard from '@/components/blog/PostCard';
import parse from 'html-react-parser';

export const revalidate = 3600;

export default async function Home() {
  // Fetch data in parallel
  const [posts, vendors] = await Promise.all([
    getPosts(4),
    getVendors()
  ]);

  const topVendors = vendors.slice(0, 6);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="flex flex-col lg:flex-row gap-20 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-8">
        
        {/* Main Intelligence Stream */}
        <div className="flex-1">
          {/* Hero - Text Driven */}
          <section className="mb-24">
            
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl font-medium">
              Join <span className="text-charcoal font-black">10,000+</span> elite planners and couples tracking vendor performance, market trends, and wedding intelligence.
            </p>
          </section>

          {/* Core Insights */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Latest Intelligence</h2>
              <Link href="/blog" className="text-[10px] font-black text-plum uppercase tracking-[0.2em] hover:text-black transition-colors">
                Archive &rarr;
              </Link>
            </div>

            <div className="magazine-grid">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Performance Rankings */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Market Leaderboard</h2>
              <Link href="/vendors" className="text-[10px] font-black text-plum uppercase tracking-[0.2em] hover:text-black transition-colors">
                Full Indices &rarr;
              </Link>
            </div>

            <div className="bg-white border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[9px] uppercase font-black tracking-[0.2em] text-gray-400">
                    <th className="py-4 px-8">Index</th>
                    <th className="py-4 px-8">Entity</th>
                    <th className="py-4 px-8">Specialty</th>
                    <th className="py-4 px-8 text-right">Rating Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topVendors.map((vendor, index) => (
                    <tr key={vendor.id} className="group hover:bg-gray-50/30 transition-all duration-300">
                      <td className="py-6 px-8 font-mono text-gray-300 font-bold text-xs group-hover:text-charcoal transition-colors">
                         {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-6 px-8">
                        <Link href={`/vendors/${vendor.slug}`} className="font-black text-charcoal hover:text-plum transition-colors uppercase tracking-widest text-[0.8rem]">
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-6 px-8 text-right font-mono text-sm font-black text-charcoal">
                        {(vendor.rating || 0).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Clinical CTA */}
          <section className="bg-charcoal p-16 md:p-24 text-center mt-32 border border-gray-100">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-8 tracking-tight">The Future of Planning.</h2>
            <p className="text-gray-400 mb-12 max-w-lg mx-auto font-medium leading-relaxed">
              Access curated intelligence, verified rankings, and precision tools for the modern wedding market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-10">
              <Link href="/tools/budget-calculator" className="text-[10px] font-black text-white uppercase tracking-[0.3em] border-b-2 border-plum hover:border-white transition-all pb-2">
                Budget Analytics
              </Link>
              <Link href="/vendors" className="text-[10px] font-black text-white uppercase tracking-[0.3em] border-b-2 border-white hover:border-plum transition-all pb-2">
                Market Exploration
              </Link>
            </div>
          </section>
        </div>

        {/* Intelligence Supplements */}
        <aside className="w-full lg:w-80 space-y-12 shrink-0">
          <NewsletterCard />
          <PopularContentCard />
        </aside>
      </div>
    </div>
  );
}
