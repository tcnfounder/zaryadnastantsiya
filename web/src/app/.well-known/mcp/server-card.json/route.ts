import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export async function GET() {
  const origin = site.url;
  const card = {
    serverInfo: {
      name: 'zaryadna-public',
      version: '1.0.0',
    },
    description:
      'Public MCP server for ZaryadnaStantsiya: site profile, product categories (stations / generators / inverters), and contact / claim paths.',
    url: `${origin}/mcp`,
    endpoint: `${origin}/mcp`,
    transport: {
      type: 'streamable-http',
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
    },
    homepage: origin,
    documentation: `${origin}/llms.txt`,
  };

  return NextResponse.json(card, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
