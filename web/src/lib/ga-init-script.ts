/**
 * Inline GA4 bootstrap (consent defaults, config, affiliate_click listener).
 *
 * Kept as a pure function with no imports so `scripts/test-ga-init.mjs` can
 * render it in plain Node and prove it parses + fires the right events.
 * Background: on 2026-10-25 a regex literal in this string ("\/" collapsed to
 * "/") turned into a "//" comment, the whole script failed to parse and GA4
 * recorded nothing for two weeks. Avoid regex literals containing "/" here.
 */
export const CONSENT_KEY = "zaryadna_cookie_consent";
export const INTERNAL_KEY = "zaryadna_ga_internal";

/** Regions where analytics cookies require prior opt-in (ePrivacy / GDPR style). */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
];

export function buildGaInitScript(measurementId: string): string {
  return `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
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
            var cfg = { anonymize_ip: true, send_page_view: true };
            // Team devices: open any page once with ?ga_internal=1 → excluded by GA4 "Internal traffic" filter.
            if (internal) cfg.traffic_type = 'internal';
            gtag('config', '${measurementId}', cfg);
          }
          // Affiliate exits: /go/<id> links are server redirects, so record the click here.
          document.addEventListener('click', function (e) {
            var el = e.target && e.target.closest ? e.target.closest('a[href*="/go/"]') : null;
            if (!el) return;
            var href = el.getAttribute('href') || '';
            var id = (href.split('/go/')[1] || '').split(/[?#]/)[0].split('/')[0];
            if (!id) return;
            gtag('event', 'affiliate_click', {
              product_id: id,
              link_text: (el.textContent || '').trim().slice(0, 80),
              page_path: path,
              transport_type: 'beacon'
            });
          }, true);
        `;
}
