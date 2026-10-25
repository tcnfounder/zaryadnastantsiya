import Script from "next/script";
import { CookieBar } from "@/components/CookieBar";

/**
 * Public GA4 measurement ID. Prefer Railway env at build time; keep a
 * hardcoded fallback so Docker prerenders never ship without analytics
 * (NEXT_PUBLIC_* is empty in builder unless ARG/ENV is wired).
 */
const FALLBACK_MEASUREMENT_ID = "G-98W3R3Y0J1";
const CONSENT_KEY = "zaryadna_cookie_consent";
const INTERNAL_KEY = "zaryadna_ga_internal";
/** Regions where analytics cookies require prior opt-in (ePrivacy / GDPR style). */
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
];

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
          // Strict opt-in only where EU-style cookie consent law applies (EEA, UK, CH).
          // Elsewhere (incl. Ukraine) analytics storage is on by default; ads storage stays off everywhere.
          gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});
          gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
          gtag('set','ads_data_redaction',true);
          gtag('set','url_passthrough',true);
          try{var cs=localStorage.getItem('${CONSENT_KEY}');if(cs==='accepted'){gtag('consent','update',{analytics_storage:'granted'});}else if(cs==='rejected'){gtag('consent','update',{analytics_storage:'denied'});}}catch(e){}
          gtag('js', new Date());
          // Skip /api and affiliate /go redirects — they pollute engagement reports.
          var path = (location && location.pathname) || '';
          if (path.indexOf('/api/') === 0 || path.indexOf('/go/') === 0) {
            /* no page_view */
          } else {
            var internal = false;
            try {
              var qs = (location && location.search) || '';
              if (qs.indexOf('ga_internal=1') !== -1) localStorage.setItem('${INTERNAL_KEY}', '1');
              if (qs.indexOf('ga_internal=0') !== -1) localStorage.removeItem('${INTERNAL_KEY}');
              internal = localStorage.getItem('${INTERNAL_KEY}') === '1';
            } catch (e) {}
            // Team devices: open any page once with ?ga_internal=1 → GA fully disabled on that browser
            // (Google's official opt-out flag), so no internal hits reach reports. ?ga_internal=0 re-enables.
            if (internal) window['ga-disable-${measurementId}'] = true;
            gtag('config', '${measurementId}', { anonymize_ip: true, send_page_view: true });
          }
          // Affiliate exits: /go/<id> links are server redirects, so record the click here.
          document.addEventListener('click', function (e) {
            var el = e.target && e.target.closest ? e.target.closest('a[href*="/go/"]') : null;
            if (!el) return;
            var m = (el.getAttribute('href') || '').match(/\/go\/([^/?#]+)/);
            if (!m) return;
            gtag('event', 'affiliate_click', {
              product_id: m[1],
              link_text: (el.textContent || '').trim().slice(0, 80),
              page_path: path,
              transport_type: 'beacon'
            });
          }, true);
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
