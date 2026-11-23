import { NextResponse } from 'next/server';
import { site } from '@/data/site';
import { mailChannels } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'zaryadnastantsiya',
      website: site.url,
      mcp: `${site.url}/mcp`,
      auth: `${site.url}/auth.md`,
      // Which lead-delivery channels are configured (booleans only, never values).
      leads: mailChannels(),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
