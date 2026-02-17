import { NextResponse } from 'next/server';
import { getVendorInstagramMetrics, calculateVendorScore } from '@/lib/instagram';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle');

    if (!handle) {
        return NextResponse.json({ error: 'Handle is required' }, { status: 400 });
    }

    try {
        const metrics = await getVendorInstagramMetrics(handle);

        if (!metrics) {
            return NextResponse.json({ error: 'Vendor not found on Instagram' }, { status: 404 });
        }

        const score = calculateVendorScore(metrics);

        return NextResponse.json({
            handle,
            metrics,
            score,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Instagram API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch Instagram data' }, { status: 500 });
    }
}
