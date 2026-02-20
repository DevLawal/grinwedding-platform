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
  .pop-index { color: rgba(196,181,253,0.15); transition: color 0.3s; }
  .pop-item:hover .pop-index { color: rgba(196,181,253,0.5); }
  .pop-item:hover .pop-title { color: #c4b5fd; }
  .pop-cta { color: #6b6b75; border-bottom: 1px solid transparent; transition: color 0.2s, border-color 0.2s; }
  .pop-cta:hover { color: #c4b5fd; border-bottom-color: #c4b5fd; }
`;

export default function PopularContentCard() {
  return (
    <>
      <style>{styles}</style>
      <div
        className="p-8 relative overflow-hidden"
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '2px',
        }}
      >
        {/* Section header */}
        <div
          className="flex items-center justify-between mb-8 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#6b6b75' }}>
            Market Movers
          </h3>
          <span className="text-[8px] font-black tracking-widest" style={{ color: '#3a3a40' }}>
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
                    <h4 className="pop-title text-[0.87rem] font-bold leading-snug mb-2 transition-colors" style={{ color: '#a0a0a8' }}>
                      {item.title}
                    </h4>
                    <p className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: '#444448' }}>
                      <span style={{ color: '#c4b5fd' }}>{item.metric}</span>
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 flex justify-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/blog" className="pop-cta text-[9px] font-black uppercase tracking-[0.3em] pb-1">
            Full Analytics &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
