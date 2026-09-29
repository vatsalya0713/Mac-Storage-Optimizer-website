"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const KEY = "mdc-analytics-consent";

// Analytics stays off (Google consent mode: denied) until the visitor allows it.
// A slim, full-width bar rather than a floating card — reads as a standard
// site-wide disclosure, not an interruption asking for something.
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch {}
    window.gtag?.("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[rgba(0,0,0,0.08)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-[12.5px] text-[#6E6E73] leading-relaxed flex-1">
          This site uses privacy-friendly analytics to see which pages are useful — no ads, no data sold. See our{' '}
          <a href="/privacy" className="text-[#007AFF] font-medium">Privacy Policy</a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose(false)}
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => choose(true)}
            className="px-5 py-2 rounded-full text-[13px] font-semibold text-white bg-[#1D1D1F] hover:bg-black transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
