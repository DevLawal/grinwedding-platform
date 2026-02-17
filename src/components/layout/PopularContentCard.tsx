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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Popular Content
      </h3>
      
      <div className="space-y-4">
        {popularItems.map((item, index) => (
          <div key={index} className="group">
            <Link 
              href={item.href}
              className="block"
            >
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors mb-1 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.metric} {item.metricLabel}
              </p>
            </Link>
            {index < popularItems.length - 1 && (
              <div className="border-b border-gray-100 mt-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
