import { NextRequest, NextResponse } from 'next/server';

// Allowed image domains (allowlist to prevent abuse)
const ALLOWED_DOMAINS = [
  'cdninstagram.com',
  'fbcdn.net',
  'instagram.com',
  'images.unsplash.com',
];

function isAllowed(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_DOMAINS.some(domain => hostname.endsWith(domain));
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 });
  }

  if (!isAllowed(imageUrl)) {
    return NextResponse.json({ error: 'Domain not permitted' }, { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        // Pretend to be a normal browser visiting instagram.com directly
        'Referer': 'https://www.instagram.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Upstream error: ${response.status}` }, { status: 502 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache for 24 hours so we don't re-proxy on every page load
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('[image-proxy] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
