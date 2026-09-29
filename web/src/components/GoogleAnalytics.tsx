import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

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
