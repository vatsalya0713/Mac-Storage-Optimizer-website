"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const KEY = "mdc-analytics-consent";

// Analytics stays off (Google consent mode: denied) until the visitor allows it.
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
    <div role="dialog" aria-label="Analytics preference" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-[380px] z-50 bg-white border border-[rgba(0,0,0,0.08)] shadow-xl rounded-2xl p-5">
      <p className="text-[13px] text-[#1D1D1F] leading-relaxed mb-4">
        We&apos;d like to use anonymous analytics to see which pages help people. No ads, nothing sold. You can say no.
      </p>
      <div className="flex gap-2">
        <button onClick={() => choose(true)} className="flex-1 bg-[#007AFF] text-white text-[13px] font-semibold rounded-full py-2">Allow</button>
        <button onClick={() => choose(false)} className="flex-1 bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-semibold rounded-full py-2">No thanks</button>
      </div>
    </div>
  );
}
