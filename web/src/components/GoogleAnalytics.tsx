import Script from "next/script";
import { CookieBar } from "@/components/CookieBar";
import { buildGaInitScript, CONSENT_KEY } from "@/lib/ga-init-script";

/**
 * Public GA4 measurement ID. Prefer Railway env at build time; keep a
 * hardcoded fallback so Docker prerenders never ship without analytics
 * (NEXT_PUBLIC_* is empty in builder unless ARG/ENV is wired).
 */
const FALLBACK_MEASUREMENT_ID = "G-98W3R3Y0J1";
const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || FALLBACK_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {buildGaInitScript(measurementId)}
      </Script>
      <CookieBar
        storageKey={CONSENT_KEY}
        lang="uk"
        accent="#c45c26"
        bg="#fffdf8"
        fg="#1c1915"
        muted="#5e574e"
      />
    </>
  );
}
