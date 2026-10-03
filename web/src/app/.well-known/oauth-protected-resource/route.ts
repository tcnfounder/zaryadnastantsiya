import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-dynamic';

/**
 * RFC 9728 OAuth 2.0 Protected Resource Metadata.
 * isitagentready validates `resource` against the scanned site origin.
 */
export async function GET() {
  const origin = site.url;
  return NextResponse.json(
    {
      resource: origin,
      authorization_servers: [origin],
      scopes_supported: ['zaryadna.public.read'],
      bearer_methods_supported: ['header'],
      resource_documentation: `${origin}/auth.md`,
      resource_signing_alg_values_supported: ['none'],
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
