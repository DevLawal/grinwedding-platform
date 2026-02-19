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
    <div className="bg-white border border-gray-100 p-10">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 pb-4 border-b border-gray-50 flex items-center justify-between">
        Market Movers
        <span className="text-[8px] opacity-40">VOL 01</span>
      </h3>
      
      <div className="space-y-12">
        {popularItems.map((item, index) => (
          <div key={index} className="group">
            <Link 
              href={item.href}
              className="block"
            >
              <div className="flex gap-6">
                <span className="font-mono text-xl font-black text-gray-100 group-hover:text-plum transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-[0.9rem] font-black text-charcoal group-hover:opacity-70 transition-opacity mb-2 leading-snug tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-3">
                    <span className="text-plum">{item.metric}</span> {item.metricLabel}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-50 flex justify-center">
        <Link href="/blog" className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-plum transition-all border-b border-transparent hover:border-plum pb-1">
          Full Analytics &rarr;
        </Link>
      </div>
    </div>
  );
}
