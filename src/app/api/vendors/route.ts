import { NextResponse } from 'next/server';
import { getVendors } from '@/lib/vendors';

export async function GET() {
    try {
        const vendors = await getVendors();
        return NextResponse.json(vendors);
    } catch (error) {
        console.error('Vendor API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
    }
}
