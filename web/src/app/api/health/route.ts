import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'zaryadnastantsiya',
      website: site.url,
      mcp: `${site.url}/mcp`,
      auth: `${site.url}/auth.md`,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
