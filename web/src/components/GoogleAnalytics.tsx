import Script from "next/script";

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
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Skip /api and affiliate /go redirects — they pollute engagement reports.
          var path = (location && location.pathname) || '';
          if (path.indexOf('/api/') === 0 || path.indexOf('/go/') === 0) {
            /* no page_view */
          } else {
            gtag('config', '${measurementId}', {
              anonymize_ip: true,
              send_page_view: true
            });
          }
        `}
      </Script>
    </>
  );
}
