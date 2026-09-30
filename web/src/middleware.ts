import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "zaryadnastantsiya.com.ua";

function requestHost(req: NextRequest): string {
  const raw =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "";
  return raw.split(",")[0].trim().toLowerCase().split(":")[0];
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = requestHost(req);
  const proto = (
    req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")
  )
    .split(",")[0]
    .trim()
    .toLowerCase();

  let needsRedirect = false;

  if (host === `www.${CANONICAL_HOST}`) {
    url.host = CANONICAL_HOST;
    needsRedirect = true;
  }

  if (proto === "http") {
    url.protocol = "https:";
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
