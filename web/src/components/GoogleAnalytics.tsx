import Script from "next/script";
import { CookieBar } from "@/components/CookieBar";

/**
 * Public GA4 measurement ID. Prefer Railway env at build time; keep a
 * hardcoded fallback so Docker prerenders never ship without analytics
 * (NEXT_PUBLIC_* is empty in builder unless ARG/ENV is wired).
 */
const FALLBACK_MEASUREMENT_ID = "G-98W3R3Y0J1";
const CONSENT_KEY = "zaryadna_cookie_consent";

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
          gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
          gtag('set','ads_data_redaction',true);
          gtag('set','url_passthrough',true);
          try{if(localStorage.getItem('${CONSENT_KEY}')==='accepted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
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
