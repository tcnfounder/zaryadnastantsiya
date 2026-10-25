/** Fire a GA4 event if gtag is loaded. Safe to call during SSR or with adblock. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  try {
    gtag?.("event", event, params);
  } catch {
    /* analytics must never break the page */
  }
}
