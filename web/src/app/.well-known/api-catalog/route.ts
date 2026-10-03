import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export async function GET() {
  const origin = site.url;

  const body = {
    linkset: [
      {
        anchor: `${origin}/mcp`,
        'service-desc': [
          {
            href: `${origin}/.well-known/mcp/server-card.json`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${origin}/llms.txt`,
            type: 'text/plain',
          },
          {
            href: `${origin}/auth.md`,
            type: 'text/markdown',
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
          },
        ],
      },
      {
        anchor: `${origin}/api/claim`,
        'service-doc': [
          {
            href: `${origin}/claim`,
            type: 'text/html',
          },
          {
            href: `${origin}/auth.md`,
            type: 'text/markdown',
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
