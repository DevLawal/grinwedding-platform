import Link from 'next/link';

interface PopularItem {
  title: string;
  href: string;
  metric: string;
  metricLabel: string;
}

const popularItems: PopularItem[] = [
  {
    title: 'How 16 Companies are Dominating Wedding SEO',
    href: '/blog/wedding-seo-domination',
    metric: '541',
    metricLabel: 'comments'
  },
  {
    title: 'The $122Bn Wedding Industry: Success Stories',
    href: '/blog/wedding-industry-success',
    metric: '793',
    metricLabel: 'likes'
  },
  {
    title: 'Top 20 Wedding Blogs & Their Revenue',
    href: '/blog/successful-wedding-blogs',
    metric: '115',
    metricLabel: 'likes'
  },
  {
    title: 'Advanced Wedding Vendor Rankings',
    href: '/vendors',
    metric: '635',
    metricLabel: 'comments'
  }
];

export default function PopularContentCard() {
  return (
    <div className="bg-white border border-gray-100 shadow-premium p-8">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 mb-8 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-purple-600" />
        Market Movers
      </h3>
      
      <div className="space-y-8">
        {popularItems.map((item, index) => (
          <div key={index} className="group relative">
            <Link 
              href={item.href}
              className="block"
            >
              <div className="flex gap-4">
                <span className="font-mono text-xl font-black text-gray-100 group-hover:text-purple-600 transition-colors">
                  0{index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-black text-black group-hover:text-purple-600 transition-colors mb-2 leading-tight tracking-tight underline decoration-gray-100 group-hover:decoration-purple-100 decoration-2 underline-offset-4">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-purple-600">{item.metric}</span> {item.metricLabel}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-50 flex justify-center">
        <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
          View All Analytics →
        </Link>
      </div>
    </div>
  );
}
