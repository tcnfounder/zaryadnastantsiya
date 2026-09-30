import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "zaryadnastantsiya.com.ua";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = (req.headers.get("host") || url.host || "")
    .toLowerCase()
    .split(":")[0];
  const proto = (
    req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")
  ).toLowerCase();

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
