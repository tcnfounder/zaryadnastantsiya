import { NextResponse } from "next/server";
import {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  collectIndexNowUrls,
  indexNowKeyLocation,
  submitToIndexNow,
} from "@/lib/indexnow";
import { site } from "@/data/site";

export const runtime = "nodejs";

function authorized(request: Request): boolean {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  const query = new URL(request.url).searchParams.get("secret") ?? "";
  return bearer === secret || query === secret;
}

/** GET — key location + URL count (no submit). */
export async function GET() {
  const urls = collectIndexNowUrls();
  return NextResponse.json({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: indexNowKeyLocation(),
    urlCount: urls.length,
    site: site.url,
  });
}

/**
 * POST — submit sitemap URLs (or provided list) to IndexNow / Bing.
 * Requires Authorization: Bearer $INDEXNOW_SUBMIT_SECRET
 *
 * Body (optional): `{ "urls": ["https://..."] }`
 * Omit body → submit full site URL set.
 */
export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      {
        error:
          "Unauthorized. Set INDEXNOW_SUBMIT_SECRET and send Authorization: Bearer <secret>.",
      },
      { status: 401 },
    );
  }

  let urls = collectIndexNowUrls();
  try {
    const body = (await request.json().catch(() => null)) as {
      urls?: string[];
    } | null;
    if (body?.urls?.length) {
      const hostPrefix = `${site.url}/`;
      urls = body.urls.filter(
        (u) => u === site.url || u === `${site.url}/` || u.startsWith(hostPrefix),
      );
    }
  } catch {
    // empty body = full set
  }

  const results = await submitToIndexNow(urls);
  const ok = results.every((r) => r.ok);
  return NextResponse.json(
    {
      ok,
      keyLocation: indexNowKeyLocation(),
      submitted: urls.length,
      results,
    },
    { status: ok ? 200 : 502 },
  );
}
