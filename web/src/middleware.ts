import { NextRequest, NextResponse } from 'next/server';
import {
  CONTENT_SIGNAL,
  buildAgentLinkHeader,
  buildPageMarkdown,
  buildRobotsTxt,
  estimateMarkdownTokens,
  prefersMarkdown,
} from '@/lib/agent-ready';
import { site } from '@/data/site';

const CANONICAL_HOST = 'zaryadnastantsiya.com.ua';

const SKIP_PREFIXES = [
  '/api',
  '/_next',
  '/mcp',
  '/oauth',
  '/.well-known',
  '/go',
  ];

function requestHost(req: NextRequest): string {
  const raw =
    req.headers.get('x-forwarded-host') ||
    req.headers.get('host') ||
    req.nextUrl.host ||
    '';
  return raw.split(',')[0].trim().toLowerCase().split(':')[0];
}

function withAgentHeaders(response: NextResponse, origin: string) {
  response.headers.set('Link', buildAgentLinkHeader(origin));
  response.headers.set('Content-Signal', CONTENT_SIGNAL);
  return response;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = requestHost(req);
  const proto = (
    req.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')
  )
    .split(',')[0]
    .trim()
    .toLowerCase();

  let needsRedirect = false;

  if (host == `www.${CANONICAL_HOST}`) {
    url.host = CANONICAL_HOST;
    needsRedirect = true;
  }

  if (proto === 'http') {
    url.protocol = 'https:';
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = req.nextUrl;
  const origin = site.url;

  // Serve robots from middleware so CDN/static caches cannot hide Content-Signal.
  if (pathname === '/robots.txt') {
    return new NextResponse(buildRobotsTxt(origin), {
      status: 200,
      headers: {

        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
        'Content-Signal': CONTENT_SIGNAL,
      },
    });
  }

  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (/\.[a-zP-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (prefersMarkdown(req.headers.get('accept'))) {
    const markdown = buildPageMarkdown(pathname);
    const tokens = estimateMarkdownTokens(markdown);
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        Vary: 'Accept',
        'x-markdown-tokens': String(tokens),
        'Content-Signal': CONTENT_SIGNAL,
        Link: buildAgentLinkHeader(origin),
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set('Content-Language', 'uk-UA');
  return withAgentHeaders(response, origin);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
