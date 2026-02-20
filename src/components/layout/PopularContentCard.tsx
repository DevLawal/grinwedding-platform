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

// Pure CSS hovers — no client-side event handlers
const styles = `
  .pop-index { color: var(--purple-dim); opacity: 0.5; transition: color 0.3s; }
  .pop-item:hover .pop-index { color: var(--purple); opacity: 1; }
  .pop-item:hover .pop-title { color: var(--purple); }
  .pop-cta { color: var(--text-dim); border-bottom: 1px solid transparent; transition: color 0.2s, border-color 0.2s; }
  .pop-cta:hover { color: var(--purple); border-bottom-color: var(--purple); }
`;

export default function PopularContentCard() {
  return (
    <>
      <style>{styles}</style>
      <div className="p-8 relative overflow-hidden bg-surface border border-editorial rounded-[2px] shadow-premium">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-editorial opacity-50">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">
            Market Movers
          </h3>
          <span className="text-[8px] font-black tracking-widest text-text-dim/50">
            VOL 01
          </span>
        </div>

        <div className="space-y-8">
          {popularItems.map((item, index) => (
            <div key={index} className="pop-item group">
              <Link href={item.href} className="block">
                <div className="flex gap-5">
                  <span className="pop-index font-mono text-2xl font-black leading-none shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="pop-title text-[0.87rem] font-bold leading-snug mb-2 transition-colors text-text-muted">
                      {item.title}
                    </h4>
                    <p className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2 text-text-dim">
                      <span className="text-purple">{item.metric}</span>
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 flex justify-center border-t border-editorial opacity-50">
          <Link href="/blog" className="pop-cta text-[9px] font-black uppercase tracking-[0.3em] pb-1">
            Full Analytics &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
