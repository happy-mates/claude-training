// Happy Mates — lightweight analytics wrapper
// Dispatches a CustomEvent on window so any analytics integration (GA4, Segment, etc.) can intercept.

export function trackEvent(
  name: string,
  payload?: Record<string, string | number | boolean>,
): void {
  try {
    window.dispatchEvent(
      new CustomEvent("hm:analytics", { detail: { name, ...payload } }),
    );
    // Forward to GA4 / gtag if injected
    const g = (window as unknown as Record<string, unknown>).gtag;
    if (typeof g === "function") {
      (g as (...args: unknown[]) => void)("event", name, payload);
    }
  } catch {
    // analytics must never break the UI
  }
}

const UTM_BASE = "utm_source=landing&utm_medium=cta&utm_campaign=claude-partnership";
export const PARTNERSHIP_FORM_BASE = "https://form.happymates.dk/partner";

/** Returns the full partnership form URL with UTM parameters. */
export function partnershipUrl(utmContent: string): string {
  return `${PARTNERSHIP_FORM_BASE}?${UTM_BASE}&utm_content=${encodeURIComponent(utmContent)}`;
}
