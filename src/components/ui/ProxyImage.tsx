'use client';

interface ProxyImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  fallbackLetter?: string;
}

/** Proxies Instagram/Facebook CDN images server-side to bypass CORS restrictions */
function proxyUrl(url?: string | null): string {
  if (!url) return '';
  if (url.includes('cdninstagram.com') || url.includes('fbcdn.net')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export default function ProxyImage({ src, alt = '', className = '', fallbackLetter }: ProxyImageProps) {
  const proxied = proxyUrl(src);

  if (!proxied) {
    return (
      <span className="flex items-center justify-center w-full h-full text-text-dim/30 font-black font-serif">
        {fallbackLetter || '?'}
      </span>
    );
  }

  return (
    <img
      src={proxied}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.currentTarget;
        img.style.display = 'none';
        // Show fallback letter sibling if present
        const parent = img.parentElement;
        if (parent) {
          const fallback = parent.querySelector('[data-fallback]') as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }
      }}
    />
  );
}
