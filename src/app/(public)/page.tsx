import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';
import { format, parseISO } from 'date-fns';
import NewsletterCard from '@/components/layout/NewsletterCard';
import PopularContentCard from '@/components/layout/PopularContentCard';

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
      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        
        {/* Main Content - Center Column */}
        <div className="flex-1 max-w-3xl">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Wedding insights from tracking the rankings & revenue of 3,078 vendors
            </h1>
            <p className="text-lg text-gray-600">
              Join <span className="font-semibold text-gray-900">10,000+</span> couples following the future of data-driven wedding planning.
            </p>
          </section>

          {/* Latest Insights */}
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Latest Insights</h2>
            </div>

            <div className="space-y-8">
              {posts.map(post => (
                <article key={post.id} className="group pb-8 border-b border-gray-100 last:border-0">
                  <div className="flex gap-6">
                    {/* Featured Image */}
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <Link href={`/blog/${post.slug}`} className="shrink-0">
                        <div className="w-32 h-32 relative overflow-hidden rounded-lg bg-gray-100">
                          <Image 
                            src={post._embedded['wp:featuredmedia'][0].source_url} 
                            alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
                          Planning
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-mono">
                          {format(parseISO(post.date), 'MMM d, yyyy')}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors mb-2 leading-snug">
                          {post.title.rendered}
                        </h3>
                      </Link>

                      <div 
                        className="text-gray-600 leading-relaxed text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link href="/blog" className="text-sm font-semibold text-gray-900 hover:text-rose-600 transition-colors uppercase tracking-wide">
                View all latest updates →
              </Link>
            </div>
          </section>

          {/* Vendor Rankings Teaser */}
          <section>
            <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Top Ranked Vendors</h2>
              <Link href="/vendors" className="text-sm font-semibold text-rose-600 hover:underline">
                View full rankings
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-medium">
                    <th className="py-3 pr-4">Rank</th>
                    <th className="py-3 px-4">Vendor</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topVendors.map((vendor, index) => (
                    <tr key={vendor.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4 pr-4 font-mono text-gray-400 font-bold text-sm">#{index + 1}</td>
                      <td className="py-4 px-4">
                        <Link href={`/vendors/${vendor.slug}`} className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{vendor.category}</td>
                      <td className="py-4 px-4 text-right font-mono text-rose-600 font-medium">{vendor.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Simple CTA */}
          <section className="bg-gray-50 p-8 md:p-12 rounded-lg text-center border border-gray-100 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start planning smarter</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Join thousands of couples using data to plan their weddings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tools/budget-calculator" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors font-medium text-sm">
                Budget Calculator
              </Link>
              <Link href="/vendors" className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-900 transition-colors font-medium text-sm">
                Browse Vendors
              </Link>
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
