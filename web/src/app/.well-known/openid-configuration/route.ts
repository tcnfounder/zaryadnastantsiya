import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-dynamic';

/** OpenID Connect Discovery for agents that probe this path first. */
export async function GET() {
  const origin = site.url;
  return NextResponse.json(
    {
      issuer: origin,
      authorization_endpoint: `${origin}/oauth/authorize`,
      token_endpoint: `${origin}/oauth/token`,
      registration_endpoint: `${origin}/oauth/register`,
      jwks_uri: `${origin}/.well-known/jwks.json`,
      response_types_supported: ['token'],
      grant_types_supported: ['client_credentials'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['none'],
      token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
      scopes_supported: ['zaryadna.public.read', 'openid'],
      claims_supported: ['sub'],
      service_documentation: `${origin}/auth.md`,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
