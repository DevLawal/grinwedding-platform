import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';
import { format, parseISO } from 'date-fns';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PopularContentCard from '@/components/layout/PopularContentCard';
import PostCard from '@/components/blog/PostCard';

export const revalidate = 3600;

export default async function Home() {
  // Fetch data in parallel
  const [posts, vendors] = await Promise.all([
    getPosts(5),
    getVendors()
  ]);

  const topVendors = vendors.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* 3-Column Layout */}
      {/* 3-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        
        {/* Main Content - Center Column */}
        <div className="flex-1">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="mb-4">
              <span className="text-subtle font-black text-purple-600">Premium Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-black mb-6 leading-[1.1] tracking-tight">
              Tracking the rankings & revenue of 3,078 wedding vendors.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Join <span className="font-black text-black">10,000+</span> elite couples following the future of data-driven wedding planning.
            </p>
          </section>

          {/* Latest Insights */}
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-black">
              <h2 className="text-3xl font-serif font-black text-black">Latest Insights</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-10 pt-8 flex justify-center">
              <Link href="/blog" className="px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-purple-600 transition-all shadow-lg">
                View All Intel
              </Link>
            </div>
          </section>

          {/* Vendor Rankings Teaser */}
          <section>
            <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-black">
              <h2 className="text-3xl font-serif font-black text-black">Market Leaders</h2>
              <Link href="/vendors" className="text-xs font-black text-purple-600 uppercase tracking-widest hover:text-black transition-colors">
                Full Rankings →
              </Link>
            </div>

            <div className="bg-white shadow-premium border border-gray-100/50 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase font-black tracking-[0.15em] text-gray-500">
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">Expert Entity</th>
                    <th className="py-4 px-6">Specialty</th>
                    <th className="py-4 px-6 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topVendors.map((vendor, index) => (
                    <tr key={vendor.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                      <td className="py-5 px-6 font-mono text-gray-400 font-bold text-sm">
                        <span className="flex items-center gap-2">
                           {index < 3 ? (
                             <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                           ) : (
                             <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                           )}
                           #{index + 1}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <Link href={`/vendors/${vendor.slug}`} className="font-bold text-black group-hover:text-purple-600 transition-colors uppercase tracking-tight text-sm">
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100/60 px-2 py-1 rounded text-gray-500 italic">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-mono bg-purple-50 text-purple-600 px-3 py-1.5 font-black text-sm border border-purple-100/50">
                          {vendor.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Simple CTA */}
          <section className="bg-black p-10 md:p-16 text-center mt-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-6 tracking-tight">Access the Smarter Network</h2>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
                Join thousands of modern couples leveraging data to secure premium wedding experiences.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/tools/budget-calculator" className="bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                  Budget Calculator
                </Link>
                <Link href="/vendors" className="border-2 border-white/20 text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                  Browse Experts
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar - Cards */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          <NewsletterCard />
          <PopularContentCard />
        </aside>
      </div>
    </div>
  );
}
