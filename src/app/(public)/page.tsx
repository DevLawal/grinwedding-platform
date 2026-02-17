import Link from 'next/link';
import { getPosts } from '@/lib/wordpress';
import { getVendors } from '@/lib/vendors';
import { format, parseISO } from 'date-fns';

export const revalidate = 3600;

export default async function Home() {
  // Fetch data in parallel
  const [posts, vendors] = await Promise.all([
    getPosts(5),
    getVendors()
  ]);

  const topVendors = vendors.slice(0, 5); // Top 5 for teaser

  return (
    <div className="">
      {/* Minimal Hero - WIDER */}
      <div className='flex flex-col'>
        <div className='menu'>

        </div>
        {/* Latest Insights - List View */}
        <section className='px-12 py-12'>

          <div className="space-y-10 pb-4">
            {posts.map(post => (
              <article key={post.id} className="group">
                <div className="flex flex-col gap-2 md:items-baseline">
                  <span className="text-sm text-gray-400 font-mono shrink-0 w-32">
                    {format(parseISO(post.date), 'MMM d, yyyy')}
                  </span>
                  <div className="space-y-2">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                        {post.title.rendered}
                      </h3>
                    </Link>
                    <div
                      className="text-gray-600 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div><div className="flex items-baseline  justify-between mb-8 border-b border-gray-100 pb-2">

            <Link href="/blog" className="text-gray-600 text-sm font-semibold underline">VIEW ALL LATEST UPDATES</Link>
          </div>
        </section>
      </div>

      {/* Vendor Rankings Teaser - Table View */}
      <section>
        <div className="flex items-baseline justify-between mb-8 border-b border-gray-100 pb-2">
          <h2 className="text-2xl font-bold">Top Ranked Vendors</h2>
          <Link href="/vendors" className="text-rose-600 text-sm font-semibold hover:underline">View full rankings</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 font-medium">
                <th className="py-3 pr-4">Rank</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topVendors.map((vendor, index) => (
                <tr key={vendor.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4 font-mono text-gray-400 font-bold">#{index + 1}</td>
                  <td className="py-4 px-4">
                    <Link href={`/vendors/${vendor.slug}`} className="font-bold text-gray-900 group-hover:text-rose-600">
                      {vendor.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{vendor.category}</td>
                  <td className="py-4 px-4 text-right font-mono text-rose-600 font-medium">{vendor.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="bg-gray-50 p-8 md:p-12 rounded-lg text-center border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Start planning smarter</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Join thousands of couples using data to plan their weddings.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/tools/budget-calculator" className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-black transition-colors font-medium">
            Budget Calculator
          </Link>
          <Link href="/vendors" className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded hover:border-gray-900 transition-colors font-medium">
            Browse Vendors
          </Link>
        </div>
      </section>
    </div>
  );
}
