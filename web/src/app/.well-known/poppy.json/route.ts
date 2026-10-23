import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-static';

/** Personal Agent Protocol discovery. Website-only, no auth surface. */
export async function GET() {
  const host = new URL(site.url).hostname;
  return NextResponse.json(
    {
      pap: '0.1',
      organization: { name: 'ZaryadnaStantsiya', url: site.url },
      domain: host,
      interfaces: { web: {} },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
